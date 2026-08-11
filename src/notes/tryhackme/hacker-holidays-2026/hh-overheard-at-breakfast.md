| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 6 |
| **Room** | Overheard at Breakfast |
| **Category** | OSINT / Gravatar email-hash pivot |
| **Flag format** | `THM{...}` |

---

## Objective

**Overheard at Breakfast** is a very-easy OSINT pivot built on a single downloadable task file — a screenshot of a breakfast chat. No lab machine is needed. The trick is to *read* the conversation instead of skimming it: a target named "Lambo" is fished for a social handle by an influencer, and while deflecting he leaks the details that rebuild an account he thought he had erased. The clues resolve to **Gravatar**, an aggregator that keys public profiles off the **MD5 hash of a lowercased email address** — so hashing the leaked email regenerates the "wiped" profile URL and exposes a base64 prize hidden in the bio.

By the end of this room you will be able to:

- Extract identifying details from a text-based social conversation instead of skimming the images
- Recognise an aggregator "tell" — a free tool to upload a profile and link other media accounts that "starts with a G" → **Gravatar**
- Explain how Gravatar addresses public profiles via `MD5(lowercased email)`
- Compute the **MD5** of an email in PowerShell and rebuild the deterministic profile URL
- Understand why "deleting" an aggregator profile does not remove the lookup key
- Decode a **base64** blob from a profile bio to recover a `THM{...}` flag

---

## Story Hook

@0xMia's in-game post sets the whole room up:

> _"the breakfast crowd really said the quiet part out loud this morning... y'all need to actually READ what they said, not just skim it #HackerHolidays"_

The clues live in the **text** of the chat, not the images. In the conversation, "Ponzi – Influencer" fishes "Lambo" for a social handle. Lambo deflects, but leaks three tells: he used to use a free tool that let you upload a profile and link other media accounts (an aggregator), that tool "started with a **G**" (→ **Gravatar**), and he "wiped everything" (deleted the profile). His best contact drops too: `lambobytelotushotel@gmail.com`.

---

## Attack Path

| **1** | **Read, don't skim**<br>@0xMia's hint says the identifying details are in the chat text, not the screenshots. |
| --- | --- |

| **2** | **Spot the aggregator tell**<br>Lambo used a free tool to upload a profile and link other media accounts that "started with a G" → **Gravatar**. |
| --- | --- |

| **3** | **Grab the leaked email**<br>Lambo's best contact drops in the chat: `lambobytelotushotel@gmail.com`. |
| --- | --- |

| **4** | **Hash the email**<br>Gravatar keys public profiles on `MD5(lowercased email)` → `d4a5fc5d3128890778667e24617d7cc0`. |
| --- | --- |

| **5** | **Visit the hash URL**<br>`https://gravatar.com/<md5>` still resolves despite "wiping everything" — the bio holds a base64 "prize". |
| --- | --- |

| **6** | **Decode the prize**<br>Base64-decode the bio blob → the flag. |
| --- | --- |

Compact flow: `Read the chat → Gravatar tell → leaked email → MD5(email) → hash profile URL → base64 bio → flag`.

---

## Walkthrough

**1. Read the chat, don't skim it** (@0xMia's hint). The identifying details are: an aggregator tool "starting with G" = **Gravatar**, and the email `lambobytelotushotel@gmail.com`.

**2. Hash the email** — Gravatar addresses profiles by the MD5 of the email, so compute it in PowerShell:

```powershell
PS C:\> $e = "lambobytelotushotel@gmail.com"
PS C:\> $md5 = [System.Security.Cryptography.MD5]::Create()
PS C:\> ($md5.ComputeHash([Text.Encoding]::UTF8.GetBytes($e)) | ForEach-Object { $_.ToString("x2") }) -join ""
# -> d4a5fc5d3128890778667e24617d7cc0
```

**3. Visit the Gravatar profile** at `https://gravatar.com/d4a5fc5d3128890778667e24617d7cc0`. The profile (name "Lambo · Byte Lotus Hotel") is still reachable even though Lambo "wiped everything", and the bio reads _"Funny thing about email hashes, they follow you places you didn't expect... Here is your prize:"_ followed by a base64 blob: `VEhNe1MzY3JlVF9QcjBmaWwzX0g0c19iMzNuX0lkZW50MWZpM2R9`.

**4. Decode the base64** to recover the flag:

```powershell
PS C:\> [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String("VEhNe1MzY3JlVF9QcjBmaWwzX0g0c19iMzNuX0lkZW50MWZpM2R9"))
# -> THM{S3creT_Pr0fil3_H4s_b33n_Ident1fi3d}
```

**5. Submit** the flag. (Difficulty: very easy — a straight OSINT read-and-hash pivot.)

---

## Flag

> **🚩 Flag**
>
> `THM{S3creT_Pr0fil3_H4s_b33n_Ident1fi3d}`

---

## Clue Chain

| Clue in task files | Resolves to |
|---|---|
| "free tool… upload profile, link other media accounts" | a profile aggregator |
| "Started with a **G**" | **Gravatar** |
| room tag **Hashing** | Gravatar keys profiles on `MD5(email)` |
| `lambobytelotushotel@gmail.com` | `MD5` → `d4a5fc5d3128890778667e24617d7cc0` |
| "wiped everything" | profile deleted, but hash URL still resolves |
| base64 in bio | `THM{S3creT_Pr0fil3_H4s_b33n_Ident1fi3d}` |

---

## Key Takeaways

- "Deleting" a profile on an aggregator service does not delete the **deterministic lookup key**.
- Gravatar (and many services) address accounts by `MD5(email)` / `SHA-256(email)`, so anyone who overhears the email can reconstruct the profile URL directly.
- An email address is effectively a **permanent, unauthenticated public identifier**.
- Never assume a wiped social profile is unreachable.
- Never leak an email you use to register aggregator accounts.

---

## Final Takeaway

This room is a reminder that **OSINT** is about *reading*, not skimming — the whole pivot hinges on catching three throwaway "tells" in a chat: an **aggregator** that "starts with a G" (**Gravatar**), the fact the target "wiped everything", and a leaked **email** address. The sting is that Gravatar keys public profiles off the **MD5 hash** of a lowercased email, a **deterministic lookup key** that a deleted profile never invalidates. Hashing `lambobytelotushotel@gmail.com` regenerates the profile URL, and a **base64**-encoded bio hands over the flag. The lesson carries well beyond this box: an email you register with is a permanent, unauthenticated public identifier, so treat "delete" as "hidden", never "gone".

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
