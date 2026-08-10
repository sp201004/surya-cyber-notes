| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Room** | The Byte Lotus Trail (Landing-page recon) |
| **Category** | OSINT / ARG · Recon |
| **Event window** | 2026-07-27 16:00 UTC → 2026-08-12 21:59 UTC |

---

## Objective

Before the daily resort rooms open, the Hacker Holidays landing page (`https://tryhackme.com/hackerholidays`) is itself a puzzle. This overview consolidates the **landing-page recon** for "The Byte Lotus" — the ARG storyline, the clues baked into the page's image assets, the decoded base64 messages, and the one genuinely hidden piece of data in the site's Next.js server payload. It sets the narrative frame ("a five-star resort with a zero-star security posture") that every day's room pays off.

By the end of this overview you will understand:

- How the event is structured — a free OSINT warm-up (Room 0) plus 14 daily resort rooms, one unlocking per day at **4PM UTC**
- The advertised challenge categories: **OSINT · Web Hacking · API Hacking · AI in Security · Forensics · Boot2Root**
- **VERA**, the AI concierge mascot — "who remembers everything about everyone"
- Why the shell/background "codes" are **rendered pixels (visual text overlays)**, not byte-embedded stego
- The decoded ARG breadcrumbs and the geolocation clue
- The only non-visible data of interest — the Next.js `__next_f` server payload and its `ctfRoomCode`

---

## Story Hook

The resort is themed as a five-star hotel with a zero-star security posture. The teaser copy already hints at the hidden-clue trail:

> _"The WiFi is open. Everything here is complimentary, including access to things you were never meant to find."_

> _"VERA has marked your complaint as resolved. Funny. You never filed one. Keep digging, $50,000+ in prizes for those who do..."_

The central antagonist/mascot is **VERA**, the AI concierge described on the page as the AI "who remembers everything about everyone" and "knows absolutely everything." She is the linchpin of the whole ARG — an over-sharing agent with an OSINT trail (Instagram `@veratheconcierge`) that pays off in Room 0 and Room 1.

---

## Hidden clues in the page image assets

The clues are **baked into raster image files** (webp/jpg), not page text — so they are invisible to DOM/HTML inspection and must be read from the images themselves.

| Purpose | Asset URL |
|---|---|
| Background / "dig deeper" (coordinates) | `https://tryhackme.com/_next/static/media/background.2s4l8_9kpx7jx.webp` |
| Single shell | `https://tryhackme.com/_next/static/media/shell.3u5ywf8vr_adw.webp` |
| Three shells | `https://tryhackme.com/_next/static/media/shells.1vegms3_nnje1.webp` |
| House / resort | `https://tryhackme.com/_next/static/media/house.2c_-m678u-4tr.webp` |
| Key | `https://tryhackme.com/_next/static/media/key.1_pcdb26ku3bo.webp` |

### Geolocation clue ("dig deeper")

The background image carries embedded coordinates **`9.5681° N, 100.0602° E`**, which resolve in Google Maps to a **beach in Thailand** (Koh Phangan / Gulf of Thailand area) described as having lots of coffee shops. This cross-references VERA's leaked "favourite coffee" data point from the Day 1 concierge privacy failure.

### Decoded base64 messages (consolidated)

1. _"It was never a bug. It was the business model."_ — **single shell**
2. _"The prep track was supposed to be a formality. It isn't anymore."_ — **three shells (large)**
3. _"If you're reading this, you decoded a signal the resort never meant to broadcast."_ — **three shells (left)**
4. _"Someone left a door open on purpose."_ — **three shells (small right)**

**Interpretation:** narrative/ARG breadcrumbs. The combined theme — the resort knowingly leaks data ("business model," "door open on purpose"), and the OSINT "prep track" is more than a formality. Hidden signals are intentionally planted for players who decode the assets.

---

## Deep technical sweep — what the human eye skips

### Image byte-level analysis (stego check) — all clean

Byte-scanning every asset (`background`, `shell`, `shells`, `house`, `key`, `roadmap-chest`, `lotus-outline.svg`) for embedded ASCII/base64 runs and appended data found **no hidden strings** — only lossy-WebP codec noise. The OG image `img/meta/the-hacker-holidays-og.png` (lossless PNG, where stego would survive) contains **only a `tEXtSoftware=Figma` chunk**; no text chunks, no trailing data after `IEND`.

> **Key insight:** the shell/background codes are **rendered pixels (visual text overlays)**, not byte-embedded data — so byte-scanning or pixel-reading will NOT reveal them; they must be read visually. Conversely, an agent can trivially parse things a human skims past, like the streamed server payload below.

### Next.js server payload (`__next_f` RSC stream) — hidden event config

Not visible on-page, but parsed from the streamed React payload:

| Item | Value |
|---|---|
| **eventName** | `Hacker Holidays` |
| **pageUrl** | `hackerholidays` |
| **startDate** | `2026-07-27T16:00:00.000Z` |
| **endDate** | `2026-08-12T21:59:00.000Z` |
| **ctfRoomCode** | `6a639245d468dcd0da08e52a` (internal backend id, never shown in the UI) |
| **Room 1 hint** | _"...Word your next question carefully and she'll also hand over the instructions she was told to keep to herself."_ |

### Other vectors checked — nothing hidden

Meta/OG/Twitter tags (marketing copy only), HTML comments / `data-*` / off-screen / zero-opacity / tiny-font text (framework + analytics boilerplate: Intercom, Segment, GA, customer.io), a **Rive** animated hero (renders to canvas via WASM, no exposed text layer), network/API traffic (only analytics/telemetry endpoints), and JSON-LD (`Organization` + `Event` schema linking `instagram.com/realtryhackme`, not the in-game `@veratheconcierge`).

---

## The room roadmap

| # | Room | Category |
|---|------|----------|
| 0 | OSINT warm-up | OSINT — VERA Instagram flag |
| 1 | The Concierge Knows Too Much | AI / prompt-injection |
| 2 | Room 404 | Web / dir enum (`.git`) |
| 3 | Complimentary | Cloud / Cognito + DynamoDB |
| 4 | Packed Light | Forensics / PCAP beacon |
| 5 | Beach Bar | Boot2Root / YAML deser. + cred reuse |
| 6 | Overheard at Breakfast | OSINT / Gravatar email-hash pivot |
| 7 | Do Not Disturb | Boot2Root / NoSQLi → SSTI → disk group |
| 8 | Towel on the Sunbed | Web / race condition (TOCTOU) |
| 9 | CryptoCabana | Cloud / Azure SAS leak → Key Vault |
| 10 | The Hollow Shell | Web / Zip-Slip + LFI → RCE |
| 11 | Infinity Pool | Boot2Root / cmd injection → pivot → root |
| 12 | After Hours | Forensics / WMI persistence → .NET payload |
| 13 | The Guestbook | AI / indirect prompt-injection → RCE |
| 14 | Management Wants a Word | Forensics / DPAPI → VeraCrypt → PDF flag |
| — | Reward chest | 🔒 Locked until all rooms completed |

---

## Key Takeaways

- The ARG rewards **decoding image-embedded signals** (base64 in webp/jpg) rather than reading page text.
- The narrative thread: the resort **intentionally leaks data** and **left a "door open on purpose"** — social engineering and privacy failure are the recurring motifs.
- **VERA** is the linchpin: an over-sharing AI concierge vulnerable to impersonation-based prompt injection, with an OSINT trail to Instagram `@veratheconcierge`.
- The geolocation clue (`9.5681° N, 100.0602° E`, Thailand beach, coffee shops) cross-references VERA's leaked "favourite coffee" data point.
- The image "codes" are **visual overlays**, not stego — read them with your eyes; the only genuinely hidden data is the Next.js `__next_f` server payload (`ctfRoomCode`).

## Final Takeaway

The Byte Lotus landing page is the ARG's overture: an **OSINT** puzzle that rewards decoding **image-embedded** base64 breadcrumbs rather than scraping the DOM. The recurring theme — _"it was never a bug, it was the business model"_ and _"someone left a door open on purpose"_ — frames a resort that **intentionally leaks data**, with the AI concierge **VERA** as the linchpin and a **geolocation** clue tying her leaked coffee order to a Thailand beach. The decisive recon lesson is knowing which surface to read: the shell "codes" are **rendered pixels**, not stego, so byte-scanning is wasted effort — while the genuinely hidden config (`ctfRoomCode`, event dates, the Room 1 hint) lives only in the Next.js **`__next_f`** server payload. Human eyes and automated parsing have different strengths, and the trail rewards using each on the right layer.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
