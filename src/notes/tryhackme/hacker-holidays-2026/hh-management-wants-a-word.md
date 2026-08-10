| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 14 |
| **Room** | Management Wants a Word |
| **Category** | Forensics / DPAPI recovery → Chrome password → VeraCrypt → PDF image flag |
| **Flag format** | `THM{...}` |

---

## Objective

**Management Wants a Word** is a Hard-rated **forensics** challenge built on a **KAPE triage image** of guest "Vera"'s laptop (Room 214), pulled by IT before the machine was wiped. The image carries the `SAM`/`SYSTEM`/`SECURITY` registry hives, Vera's **DPAPI masterkeys** (`…\Roaming\Microsoft\Protect\<SID>\`), her **Google Chrome for Testing** profile (`Local State` + `Login Data`), and a 100 MB file at `…\Documents\backup`. That `backup` file is exactly `104,857,600` bytes of high-entropy data with **no magic header** — the tell-tale shape of a **VeraCrypt container** (note the pun: *Vera*Crypt). Its passphrase lives in Chrome's saved passwords (`VeraSecretVault`), but that entry is DPAPI-encrypted, so the whole offline key chain has to be rebuilt to reach it. The objective: hunt the scattered artifacts, recover a password Vera never meant to leave behind, and open the "door" she was keeping quiet.

By the end of this room you will be able to:

- Recognise a **headerless encrypted container** by shape — exact round size, near-maximum entropy, no signature ≈ VeraCrypt/TrueCrypt
- Dump a local account's **NT hash** from offline `SAM`/`SYSTEM` hives with `impacket-secretsdump`
- Crack the Windows login password (`john --format=nt` + rockyou) because local **DPAPI** is keyed by `SHA1(UTF16LE(password))`, not the NT hash
- Decrypt a user's **DPAPI masterkey** offline with `impacket-dpapi` using the SID and cracked password
- Rebuild the **Chrome ≥ v80 `os_crypt` chain** — unwrap `Local State.os_crypt.encrypted_key`, then decrypt a `v10` AES-256-GCM `Login Data` blob
- Mount a **VeraCrypt** volume with no vendor tool via `cryptsetup --type tcrypt --veracrypt`
- Extract a flag from an **image-only PDF** with `pdfimages` when `pdftotext` comes back empty

---

## Story Hook

> _"A browser will remember things for you that you never told anyone else… not every hidden file needs a password cracker, some just need a really good memory… version number 1.26.29."_

@0xMia's PSA is the whole room in one breath: the `backup` blob isn't cracked, it's *remembered* — its passphrase was typed once into Chrome and never spoken aloud again, and `1.26.29` quietly points at **VeraCrypt 1.26.x**. Management wanted a quiet word about what Vera was really doing on that host; the answer is sitting in her saved passwords, wrapped in DPAPI, waiting for anyone patient enough to rebuild her key chain offline.

---

## Attack Path

| **1** | **Triage the image**<br>`backup` = 100 MB, entropy ~8.0, no header → VeraCrypt volume. Chrome `Login Data` holds a saved login for `http://bytelotus.thm:8080` as user `VeraSecretVault` with a `v10` (AES-GCM) password blob. `Local State` holds `os_crypt.encrypted_key` = a `DPAPI`-wrapped AES key. |
| --- | --- |

| **2** | **Dump the account hash**<br>`impacket-secretsdump -sam SAM -system SYSTEM LOCAL` → `vera:1000:…:1241186a4aac4f34f4bf7ace71b396a8:::` (same hash as `Administrator`). |
| --- | --- |

| **3** | **Crack it (Windows login, not the vault)**<br>`john --format=nt` + rockyou → `minivera`. A local account's DPAPI masterkey is keyed by `SHA1(UTF16LE(password))`, so the NT hash alone isn't enough — this one crack is required. |
| --- | --- |

| **4** | **Decrypt the DPAPI masterkey**<br>`impacket-dpapi masterkey -file <mk> -sid <SID> -password minivera` → `Decrypted key with User Key (SHA1)`. |
| --- | --- |

| **5** | **Unwrap Chrome's AES key + decrypt the saved password**<br>Base64-decode `encrypted_key`, strip the 5-byte `DPAPI` prefix, decrypt the DPAPI blob with the masterkey → 32-byte AES-256-GCM key. Apply it to the `v10` blob (`v10 \|\| 12B nonce \|\| ct \|\| 16B tag`) → `Wh4t1sV3raD0inG0nTh1sH0st`. |
| --- | --- |

| **6** | **Mount the VeraCrypt container**<br>No GUI needed — `cryptsetup open --type tcrypt --veracrypt backup veracnt` with that passphrase, then `mount -o ro`. Inside: `secret_financial_documents/` with `transactions_q3.csv` (a planted `"Image asset correction" / Archived` row) and `important_invoice_byte_lotus.pdf`. |
| --- | --- |

| **7** | **Extract the flag from the PDF**<br>The PDF has no text layer (image-based). `pdfimages -all` pulls out the invoice PNG; the flag is printed as a line item. |
| --- | --- |

---

## Walkthrough

All offline, on Kali (KAPE tree mounted at `/mnt/d/Projects/HackerHolidays/KAPE`):

```bash
$ cd KAPE/C/Windows/System32/config

# 1) Vera's NT hash from the SAM
$ impacket-secretsdump -sam SAM -system SYSTEM LOCAL
#   vera:1000:...:1241186a4aac4f34f4bf7ace71b396a8:::

# 2) Crack the Windows login (needed to unlock local DPAPI)
$ echo 'vera:$NT$1241186a4aac4f34f4bf7ace71b396a8' > nt.john
$ john --format=nt --wordlist=/usr/share/wordlists/rockyou.txt nt.john   # -> minivera

$ cd ../../../../..   # back to KAPE root
$ MK="C/Users/vera/AppData/Roaming/Microsoft/Protect/S-1-5-21-2529683458-431225740-1723070931-1000/c90719ef-5b98-474e-b934-136d606a702a"
$ SID="S-1-5-21-2529683458-431225740-1723070931-1000"

# 3) Decrypt the DPAPI masterkey
$ impacket-dpapi masterkey -file "$MK" -sid "$SID" -password minivera
#   Decrypted key: 0x5e5715ec...9d40

# 4) Unwrap Chrome's AES key and decrypt the saved password
$ cp "C/Users/vera/AppData/Local/Google/Chrome For Testing/User Data/Default/Login Data" /tmp/LoginData
$ python3 - <<'PY'
import json, base64, sqlite3
from impacket.dpapi import DPAPI_BLOB
try:    from Crypto.Cipher import AES
except ImportError: from Cryptodome.Cipher import AES
MK = bytes.fromhex('5e5715ec9b6df5a86e97902692a66d28e691f05d5bc1e04d0159cfe960e94c978c07e5004a0179d3a96df2468885a28175b0b02cc064445f116a752d2b3e9d40')
ls = json.load(open('C/Users/vera/AppData/Local/Google/Chrome For Testing/User Data/Local State'))
key = DPAPI_BLOB(base64.b64decode(ls['os_crypt']['encrypted_key'])[5:]).decrypt(MK)
for origin, user, pw in sqlite3.connect('/tmp/LoginData').execute(
        'select origin_url, username_value, password_value from logins'):
    if pw[:3] == b'v10':
        n, ct, tag = pw[3:15], pw[15:-16], pw[-16:]
        print(user, '=>', AES.new(key, AES.MODE_GCM, nonce=n).decrypt_and_verify(ct, tag).decode())
PY
#   VeraSecretVault => Wh4t1sV3raD0inG0nTh1sH0st

# 5) Mount the VeraCrypt "backup" container (no GUI)
$ sudo cryptsetup open --type tcrypt --veracrypt "C/Users/vera/Documents/backup" veracnt   # passphrase above
$ sudo mkdir -p /mnt/vera && sudo mount -o ro /dev/mapper/veracnt /mnt/vera

# 6) Flag lives in the invoice image inside the PDF
$ pdfimages -all "/mnt/vera/secret_financial_documents/important_invoice_byte_lotus.pdf" /tmp/img
#   open /tmp/img-000.png  ->  Flag: THM{1t_w4s_V3r4_A11_Al0ng?!}

# cleanup
$ sudo umount /mnt/vera && sudo cryptsetup close veracnt
```

---

## Flag

> **🚩 Flag**
>
> `THM{1t_w4s_V3r4_A11_Al0ng?!}`

---

## Key Takeaways

- **DPAPI is fully recoverable offline** given the profile's `Protect\<SID>\` masterkeys + the user's password (or its SHA1). KAPE grabs all of it; the only "live" secret you need is the login password, which the SAM/SYSTEM hives hand you (cracked, since local DPAPI needs the plaintext, not the NT hash).
- **Chrome ≥ v80 os_crypt chain:** `Local State.os_crypt.encrypted_key` (DPAPI, `DPAPI`-prefixed) → 32-byte key → `Login Data` `v10`/`v11` blobs are AES-256-GCM (`nonce=bytes[3:15]`, `tag=last 16`). No app-bound encryption here — the key was plain `DPAPI`, not `app_bound_encrypted_key`.
- **Recognise a headerless container by shape.** Exact round size + max entropy + no signature ≈ VeraCrypt/TrueCrypt. `cryptsetup --veracrypt` mounts them without the vendor tool.
- **`pdftotext` empty ≠ no content.** Image-only PDFs hide their payload in embedded images — always run `pdfimages`/`pdfdetach` before giving up.
- **Read leetspeak carefully.** `V3r4` (not `V3ra`) and `Al0ng` (zero, not `O`) — the first submission bounced purely on an `a` vs `4` glyph misread off the invoice image.

---

## Final Takeaway

**Management Wants a Word** is an offline **DPAPI credential-recovery** puzzle disguised as a wiped-laptop triage. The headerless 100 MB `backup` gives itself away by **shape** — exact round size, near-max entropy, no magic bytes — marking it a **VeraCrypt** container whose passphrase was never cracked, only *remembered* by Chrome. Reaching that memory means rebuilding the whole key chain from the **KAPE** image: dump Vera's **NT hash** from the `SAM`/`SYSTEM` hives, crack the login (`minivera`) because local DPAPI is keyed by `SHA1(UTF16LE(password))`, decrypt her **DPAPI masterkey**, then walk the **Chrome os_crypt chain** to unwrap the AES-256-GCM `v10` blob into `Wh4t1sV3raD0inG0nTh1sH0st`. `cryptsetup --veracrypt` mounts the volume with no GUI, and since the invoice is an **image-only PDF**, `pdftotext` returns nothing while `pdfimages` surfaces the PNG that literally prints the flag. The recurring lesson: browsers keep secrets you thought you'd forgotten, and a careful **leetspeak** read (`V3r4`, `Al0ng`) is the difference between a submitted and a bounced flag.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
