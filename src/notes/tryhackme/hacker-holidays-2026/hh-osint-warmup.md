| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 0 |
| **Room** | OSINT warm-up |
| **Category** | OSINT — "Pick up your key before the check-in" |
| **Flag format** | THM{...} |

---

## Objective

The **OSINT warm-up** (Room 0) is a free challenge unlocked *before* the event — "your peek through the keyhole." The goal is pure open-source intel: find the flag by pivoting from **VERA**, the resort's AI concierge persona, to her public social presence.

By the end of this room you will be able to:

- Pivot from a named in-game persona (VERA) to her real social footprint
- Recognise that a public profile can host a challenge flag directly, with no exploitation involved

---

## Attack Path

- **Flag location:** VERA has a public **Instagram account — `@veratheconcierge`** — which contained the **flag for the warm-up room (Room 0)**.
- Pure OSINT: no exploitation, just pivoting from the VERA persona to her social presence and reading the posted flag.

---

## Flag

> **🚩 Flag**
> The flag is posted on VERA's public Instagram (`@veratheconcierge`). The source findings log records the location but does not capture the flag value itself.

---

## Key Takeaways

- OSINT warm-ups reward **persona pivoting** — turn a named character into a searchable social handle.
- A public social profile can be the entire challenge: no exploit, just careful reading.

## Final Takeaway

The Room 0 warm-up is a gentle **OSINT** primer for the whole event: the only move is to pivot from the **VERA** concierge persona to her public **Instagram** (`@veratheconcierge`) and read the flag she posted there. No exploitation, no tooling — just the reminder that a named character in a story usually has a findable social footprint, and that footprint is often where the first clue lives.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
