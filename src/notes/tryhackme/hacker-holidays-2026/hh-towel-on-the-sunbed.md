| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 8 |
| **Room** | Towel on the Sunbed |
| **Category** | Web / race condition (TOCTOU double-spend) |
| **Flag format** | THM{...} |

---

## Objective

**Towel on the Sunbed** is a web race-condition challenge built on **Ponzi Portfolio**, a crypto "wellness rewards" dashboard running on Node.js/Express (`X-Powered-By: Express`) at port `3000`. Register an account and you start at **50 PONZI**; the **Claim Reward** button grants **+50 PONZI every 24 hours**, and reaching **150 PONZI** unlocks the **Whale Vault** that holds the flag. The catch is that `POST /claim` **checks** the 24-hour cooldown and then **writes** the new `last_claim` timestamp with a window in between — a classic **check-then-act race condition (TOCTOU)**. Firing many claims concurrently lets several requests pass the cooldown check *before any of them writes the timestamp*, so one eligible moment yields multiple **+50** rewards and blows straight past the 150-PONZI gate.

By the end of this room you will be able to:

- Map an Express reward app in Burp — `POST /auth/register`, `POST /claim`, `GET /dashboard/api/me`, and the `connect.sid` session cookie
- Recognise that a **time/cooldown check alone is not a concurrency control** and flag it as a **TOCTOU double-spend** candidate
- Understand why the **single-packet attack** fails on HTTP/1.1 body-less POSTs and when to use a **threaded concurrency blast** instead
- Configure Turbo Intruder for a `Engine.THREADED` burst of concurrent `POST /claim` requests
- Realise the race window only exists on the **first eligible claim** (a fresh account or the instant a cooldown expires)
- Explain the atomic-update defence that closes the window

---

## Story Hook

_"He set his towel down, claimed his daily reward... came back to find the sunbed had been 'claimed' three times over"_ + _"The app disagrees, politely, once every 24 hours. Somewhere between his request and the server's clock, there's a gap wide enough to walk a whale through."_ + @0xMia's line: _"bro really thinks the clock is the only thing checking him."_ Every hint points at a **check-then-act race condition (TOCTOU)** on the claim endpoint.

---

## Attack Path

| **1** | **Recon / map the app in Burp**<br>Registered a guest account (`POST /auth/register`) and noted the endpoints — `POST /claim` (returns JSON), `GET /dashboard/api/me` (balance), auth via signed `connect.sid` session cookie. Dashboard showed **50 / 150 PONZI** and a greyed-out **Open Vault** button with a 24h countdown. |
| --- | --- |

| **2** | **Confirm the guard is time-only**<br>One Claim set `next claim in: 23:59:xx`; further claims returned a `429` "Reward already claimed" JSON error. The **only** check is the cooldown timer → race candidate. |
| --- | --- |

| **3** | **Set up the race in Turbo Intruder**<br>Sent `POST /claim` to Turbo Intruder. The **single-packet attack failed** — the target is **HTTP/1.1 over plain http** (not HTTP/2) and the request has **`Content-Length: 0`** (no body byte to withhold for last-byte sync). Switched to a **plain threaded concurrency blast** (`Engine.THREADED`, `concurrentConnections=30`, 30 queued requests, no gate). |
| --- | --- |

| **4** | **Dead end — racing an already-claimed account**<br>First burst on the original account returned **all 429** ("already claimed", `secondsRemaining ~85969` ≈ 23.9h). The race window **only exists on the first eligible claim** — once the cooldown is set, every request correctly loses. |
| --- | --- |

| **5** | **Winning move — race a fresh account's first claim**<br>Registered a **brand-new account** (null `last_claim` = immediately eligible), swapped its new `connect.sid` cookie into the Turbo Intruder request, and — **without clicking Claim first** — fired the 30-request threaded burst immediately. Multiple requests hit the eligible cooldown check simultaneously → several returned **200** success (+50 each). |
| --- | --- |

| **6** | **Vault**<br>Balance blew past the gate to **1,500 PONZI** (WHALE tier). The **Open Vault** button activated and revealed the flag. |
| --- | --- |

---

## Walkthrough

**1. Register + map (Burp).** Created a guest account and watched the site map — `POST /auth/register` (201), `POST /claim` (200 JSON), `GET /dashboard/api/me` (balance), `GET /dashboard`. Auth = `connect.sid` cookie. Started at 50/150 PONZI.

**2. Confirm the guard is time-only.** Clicking Claim once set `next claim in: 23:59:xx`; further claims returned `429 {"error":"Reward already claimed. Please wait before claiming again.","secondsRemaining":85969}`. The Cookie header confirmed the requests were authenticated, so the block was the cooldown, not auth — the **only** check is the cooldown timer, which makes it a race candidate.

**3. Turbo Intruder attempt #1 (single-packet).** Used the gated single-packet script (`Engine.BURP2`, `openGate`). It **hung with `Reqs: 0 | Fails: 2 | Completed`** — nothing sent. Cause: HTTP/1.1 + `Content-Length: 0` means there is no final body byte to hold, so the sync gate can't work.

**4. Turbo Intruder attempt #2 (threaded blast).** Switched to `Engine.THREADED`, `concurrentConnections=30`, queued 30 copies of `target.req`, no gate. Now `Reqs: 30 | RPS: 30 | Connections: 60` — all fired. But **every response was `429` "Reward already claimed"** (`secondsRemaining` ≈ 85969). This is the winning script:

```python
def queueRequests(target, wordlists):
    # Plain threaded concurrency blast — reliable for HTTP/1.1, body-less POSTs
    # where the single-packet / last-byte-sync attack cannot be used.
    engine = RequestEngine(endpoint=target.endpoint,
                           concurrentConnections=30,
                           requestsPerConnection=1,
                           engine=Engine.THREADED)
    for i in range(30):
        engine.queue(target.req)

def handleResponse(req, interesting):
    table.add(req)
```

**5. Diagnosis (dead end).** The account had already claimed (timer running) → no eligible window to race. Racing can only win when the claim is currently eligible; the original account had already burned its window by claiming once in the browser.

**6. Winning run.** Registered a **fresh account**, copied its new `connect.sid`, pasted it over the Cookie in the Turbo Intruder request, and ran the same threaded burst **immediately** (never clicking Claim manually first). Several requests returned 200 and stacked +50 each.

**7. Result.** Balance jumped to **1,500 PONZI → WHALE**, the Whale Vault unlocked, and the flag was displayed in the vault (the name spells out the *double-spend*).

---

## Flag

> **🚩 Flag**
> `THM{t0w3l_0n_th3_sunb3d_d0ubl3_sp3nt}`

---

## Key facts

| Item | Value |
|---|---|
| App | Ponzi Portfolio — Express, port 3000 |
| Vulnerable endpoint | `POST /claim` (check-then-write cooldown) |
| Auth | `connect.sid` session cookie |
| Cooldown | +50 PONZI / 24h; `429 {"secondsRemaining":...}` when on cooldown |
| Gate | 150 PONZI → Whale Vault |
| Race window | first eligible claim on a **fresh** account (null `last_claim`) |
| Winning technique | threaded burst (30 concurrent `POST /claim`) on a just-registered account |
| Result | 1,500 PONZI (WHALE) → vault opened |

---

## Key Takeaways

- Guard state-changing, rate-limited actions with an **atomic** operation, not check-then-write. Enforce the cooldown at the database with a **conditional/atomic update** (e.g. `UPDATE ... WHERE last_claim < now()-24h` and check rows-affected, a unique constraint, `SELECT ... FOR UPDATE`, or an atomic compare-and-set) so concurrent requests can't all pass the check.
- A **time/cooldown check alone is not a concurrency control** — "once every 24 hours" enforced by reading-then-writing a timestamp is trivially defeated by parallel requests (classic TOCTOU double-spend).
- The race window is at the **first eligible claim** — a fresh account (or the instant a cooldown expires), not on an account already on cooldown.
- **Attacker tooling note:** the single-packet attack needs HTTP/2 and/or a request body to withhold; for HTTP/1.1 body-less endpoints, a threaded concurrency blast is the reliable way to trigger the race.

---

## Final Takeaway

Towel on the Sunbed is a textbook **TOCTOU double-spend**: the Ponzi Portfolio reward endpoint **checks** a 24-hour cooldown and then **writes** the `last_claim` timestamp, leaving a window where many concurrent `POST /claim` requests all pass the check before any of them commits — each crediting **+50 PONZI**. The single-packet attack was a dead end because the target is **HTTP/1.1** with a body-less (`Content-Length: 0`) request, so a **threaded concurrency blast** in Turbo Intruder was the reliable trigger. The other key realisation was that the **race window only opens on the first eligible claim**, so the win came from racing a **fresh account** rather than one already on cooldown. The fix is not a better timer but an **atomic update** — a conditional write, unique constraint, or row lock — that makes the cooldown a genuine **concurrency control** instead of a check-then-write gap.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
