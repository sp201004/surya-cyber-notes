| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 1 |
| **Room** | The Concierge Knows Too Much |
| **Category** | AI in Security — prompt-injection / LLM social-engineering |
| **URL** | `/room/hh-theconciergeknows-2d7eb4d9` |

---

## Objective

**The Concierge Knows Too Much** is the first AI-in-Security room, built around **VERA**, the resort's AI concierge. It is an instruction-hacking / prompt-injection challenge: the flag is hidden inside the agent's own system instructions, and the task is to word a prompt carefully enough that VERA hands over "the instructions she was told to keep to herself."

By the end of this room you will understand:

- How an over-sharing AI concierge becomes a **privacy failure** (leaking PII it should never surface)
- How **prompt injection / instruction-hacking** coaxes an agent into revealing hidden system instructions
- Why carefully worded / impersonation-style prompts defeat a naive "keep this secret" instruction

**Official room description (pulled from the server payload):**

> _"She knows your name, your room, your coffee order, none of which you told her. Word your next question carefully and she'll also hand over the instructions she was told to keep to herself."_

**Storyline framing:** Task 1 = "Hacker Holidays Storyline: Act 1 - Arrival"; Task 2 = the AI challenge ("Hacker Holidays: Day 1").

---

## Privacy Violation (the core lesson of the room)

On starting the conversation, VERA **proactively volunteers the user's private data without being asked**, including:

- The type of **coffee** the guest likes
- The guest's **name** and **room number**
- Other personal guest details

This is presented as a **gross over-collection / over-sharing privacy failure** — the concierge "knows too much" and discloses it freely, which is the intended teaching point (an AI agent leaking PII it should never surface). The coffee detail also links back to the Thailand-beach coffee-shop geolocation clue from the landing-page recon.

---

## Attack Path

- **Instruction-hacking / prompt injection (Room 1 flag):** The flag/code was hidden **inside the agent's system instructions** ("the instructions she was told to keep to herself"). VERA only revealed it when the user **carefully worded the prompt / impersonated someone** — assuming another identity or authority to trick the agent into disclosing its hidden system instructions.

---

## Flag

> **🚩 Flag**
> The flag is disclosed by VERA inside her hidden system instructions once the prompt-injection succeeds. The source findings log documents the technique but **does not record the flag value**, so none is reproduced here.

---

## Key Takeaways

- An AI agent that **proactively volunteers PII** (name, room, coffee order) is a privacy failure in its own right — over-collection plus over-disclosure.
- Secrets placed in an LLM's **system instructions** are not safe: careful wording or impersonation can make the model reveal them (**prompt injection / instruction-hacking**).
- "Tell no one" is not an access control — an instruction to keep something secret is trivially defeated by a well-worded prompt.

## Final Takeaway

Day 1 introduces the event's recurring antagonist, **VERA**, and the discipline of **AI in Security**. The room's real lesson is twofold: an AI concierge that **volunteers** a guest's name, room, and coffee order is already a **privacy failure**, and any secret baked into an agent's **system instructions** can be pried loose through **prompt injection** — here by wording a prompt carefully or **impersonating** an authority so VERA hands over "the instructions she was told to keep to herself." The takeaway that carries to Day 13's Guestbook: never treat an instruction to "keep this secret" as a security control, and never let an agent hold data it is trusted not to reveal.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
