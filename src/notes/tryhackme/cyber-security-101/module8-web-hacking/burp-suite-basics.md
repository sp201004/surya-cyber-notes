| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Web Hacking / Tools |
| **Difficulty** | Easy |
| **Time** | ~60 Minutes |
| **Module** | Web Hacking |

---

## Objective

**Burp Suite** is a collection of tools developed by **PortSwigger** for web application security testing and penetration testing. Its core idea is simple but powerful: Burp sits as an intermediary between your **web browser** and the **target web application**, so instead of only seeing the rendered webpage you can **intercept, inspect and manipulate** the raw HTTP(S) traffic flowing in both directions. That single capability — controlling requests and responses before they reach either side — is what makes Burp the backbone of manual web pentesting.

```text
┌──────────────┐      HTTP/HTTPS       ┌──────────────┐    Modified /     ┌──────────────────┐
│ Web Browser  │ ───────────────────► │   BURP SUITE  │ ── Forwarded ───► │  Target Web App  │
└──────────────┘                       │     PROXY     │    Request        └──────────────────┘
                                        └──────────────┘
```

By the end of this room you will be able to:

- Explain what Burp Suite is and why the Proxy is central to web testing
- Identify Burp's core modules — Proxy, Target, Intruder, Repeater, Decoder, Comparer, Sequencer and more
- Distinguish the **Community** and **Professional** editions
- Configure Burp's Proxy and route a browser through it with **FoxyProxy**
- Intercept, modify, forward and drop live HTTP requests
- Map an application with the **Target → Site map** and define **scope**
- Intercept **HTTPS** traffic by trusting the **PortSwigger CA** certificate
- Bypass client-side validation to demonstrate a stored **XSS** payload

> **Warning:** Only use Burp Suite against systems you own or have **explicit written authorisation** to test, or inside the provided TryHackMe lab. Intercepting and modifying traffic against systems you do not control can violate laws and organisational policy.

---

## Task 1 — What Is Burp Suite?

The most important concept in the entire room is that Burp allows us to **intercept, inspect and manipulate HTTP(S) traffic** between the browser and the target application. In a normal browser flow the request goes straight to the web server and the response comes straight back. With Burp in the middle, a penetration tester gains a control point where every request can be **inspected, modified, forwarded, or dropped** before it continues.

```text
Normal:      Browser ───────────────► Web Server
             Browser ◄─────────────── Web Server

With Burp:   Browser ─► Burp Proxy ─► Web Server
                         │
                         ├── Inspect
                         ├── Modify
                         ├── Forward
                         └── Drop
```

This visibility lets a tester examine HTTP methods, headers, cookies, parameters, authentication tokens, session information, request/response bodies and API endpoints — the underlying communication that a browser normally hides. Burp is used across the whole engagement lifecycle: **reconnaissance → application mapping → request interception → parameter manipulation → vulnerability testing → exploitation/validation → reporting**.

Because it exposes and lets you tamper with every parameter, Burp is used to manually investigate common web vulnerabilities:

- Cross-Site Scripting (XSS)
- SQL Injection
- Authentication and Authorization issues
- IDOR (Insecure Direct Object Reference)
- CSRF and Command Injection
- File Upload, session-management and access-control issues
- API security issues

> **Note:** Remember Burp in one line — **"Burp = Control the Web Traffic."** Everything else in this room is a variation on Capture → Inspect → Modify → Replay → Analyze.

---

## Task 2 — The Burp Suite Modules

Burp Suite is made up of multiple modules shown across the top navigation bar. The exact modules available depend on the edition and version, but the core set you must recognise is below. The **Proxy** is the beating heart of manual testing; the others support it.

| Module | Purpose |
|--------|---------|
| **Dashboard** | Overview of the current project and its activity |
| **Target** | Map and define the application — Site map, Issue definitions, Scope |
| **Proxy** | Intercept and manipulate HTTP/HTTPS requests and responses |
| **Intruder** | Automated/customised attacks — fuzzing, brute-force, enumeration |
| **Repeater** | Manually resend and modify individual HTTP requests |
| **Collaborator** | Detect out-of-band (external) interactions |
| **Sequencer** | Analyze randomness of tokens (session, CSRF, reset tokens) |
| **Decoder** | Encode/decode data (URL, Base64, Hex, and more) |
| **Comparer** | Compare two pieces of data to spot subtle differences |
| **Logger** | Log traffic and events for retrospective analysis |
| **Organizer** | Organise requests and notes during testing |
| **Extensions** | Extend Burp with custom functionality and integrations |

A few modules deserve a closer look because the room returns to them:

> **1. Proxy**
> Intercepts HTTP/HTTPS traffic between browser and server. Its key areas are **Intercept**, **HTTP history**, **WebSockets history** and **Proxy settings**. A tester can Inspect, Modify, Forward or Drop each request.

> **2. Repeater**
> Takes a captured request and lets you resend and tweak it repeatedly: Capture → Send to Repeater → Modify → Send → Analyze response → Modify again. Ideal for manually probing parameters, headers, cookies and application logic.

> **3. Intruder**
> Sends a request with selected **attack positions** and iterates payloads across them for fuzzing, enumeration and brute-force-style testing. Available in Community but rate-limited compared to Professional.

> **4. Decoder**
> Transforms data — for example URL-encoding `<script>` into `%3Cscript%3E`, or handling Base64/Hex. Important when a payload must be encoded to survive an HTTP request.

> **5. Comparer**
> Feeds two requests or responses in and highlights the differences — useful for authentication responses and payload results (`Request A + Request B → Comparer → Differences`).

An intercepted request looks like a normal HTTP message, and the tester can change any value before forwarding it:

```http
GET / HTTP/2
Host: target.example
User-Agent: Mozilla/5.0
Accept: text/html
Cookie: session=XXXXXXXX
```

> **Tip:** A handy memory hook for the core components is **P T I R D C S** — **P**roxy (pause traffic), **T**arget (track target), **I**ntruder (inject payloads), **R**epeater (replay requests), **D**ecoder (decode data), **C**omparer (compare data), **S**equencer (study randomness).

---

## Task 3 — Features of Burp Community

Burp Suite ships in different editions; the two discussed in the room are **Community** (free) and **Professional** (paid). Community focuses on **manual testing** and provides the core tooling needed to learn the fundamentals, while Professional adds advanced automation — most notably the **automated vulnerability scanner** and a more powerful, un-throttled **Intruder**.

| Feature | Community (Free) | Professional (Paid) |
|---------|------------------|---------------------|
| **Cost** | Free | Paid licence |
| **Focus** | Manual testing, core tooling | Advanced + automated testing |
| **Core tools** | Proxy, Target, Repeater, Intruder, Decoder, Comparer, Sequencer, Site Map, Scope, HTTP/WebSockets history | Everything in Community |
| **Automated scanner** | ✗ Not included | ✓ Full vulnerability scanning |
| **Intruder** | Rate-limited | Full speed |
| **Save projects** | ✗ Temporary only | ✓ Saved projects |

The Community Edition's biggest strength is **manual testing**. A typical workflow captures a request in the Proxy, sends it to Repeater, modifies parameters, sends it, analyses the response and identifies a vulnerability. Because manual testing is a huge part of real penetration testing, Community is far from useless just because it lacks the scanner.

Burp exposes the actual HTTP request the browser generates, letting you inspect the **method → URL/path → headers → cookies → parameters → request body**:

```http
GET /login HTTP/1.1
Host: 10.48.155.152
User-Agent: Mozilla/5.0
Accept: text/html
Cookie: session=abc123
```

You can then change values before sending — for example turning `GET /profile?id=10` into `GET /profile?id=11` to test **IDOR**, access control, input validation and parameter manipulation. The same applies to cookies, headers, query/POST parameters, JSON values and form data.

> **Security relevance:** Community edition cannot save projects, so any project-specific configuration in a **temporary project** is lost when Burp closes. Plan your testing session accordingly.

---

## Task 4 — Installation and Projects

Burp Suite runs on **Linux, Windows and macOS**. On TryHackMe, the **AttackBox** is a browser-based security environment that already ships with Burp Suite, Firefox and FoxyProxy, so you usually do not need to install anything. To install locally, download the installer from PortSwigger's official distribution, run it, choose options, launch Burp, then create or open a project and start testing.

When Burp starts it offers a choice of project. A **Temporary Project** is the simplest option for learning and TryHackMe labs — no need to preserve state permanently. A Burp **project** can hold target information, the site map, proxy history, settings and captured requests/responses, letting a tester maintain state during an engagement.

Burp separates two kinds of settings, and knowing which is which matters before you change anything:

| Setting type | Scope | Persistence |
|--------------|-------|-------------|
| **User / Global settings** | Entire Burp installation | Apply across every session and startup |
| **Project settings** | Current project only | Lost when Community closes a temporary project |

Installing Burp does **not** automatically send browser traffic through it — the browser must be configured to use Burp as a proxy. The room uses the loopback address and default port throughout:

```text
Browser ──► 127.0.0.1:8080 ──► Burp Proxy ──► Target
```

`127.0.0.1` is the IPv4 **loopback address** (also `localhost`) — it refers back to the same machine — and **8080** is the port Burp listens on for proxy traffic. So `127.0.0.1:8080` means "connect to port 8080 on this machine," where Burp is waiting.

> **Note:** For TryHackMe exercises a **Temporary Project** with default configuration is almost always the right choice — start Burp, pick Temporary Project, and go.

---

## Task 5 — The Dashboard

The **Dashboard** provides an overview of the current Burp project and its activity, acting as the central place to monitor what Burp is doing before you dive into a specific tool. The top navigation bar holds the major modules; selecting one switches the main workspace, and most modules then expose their own **sub-tabs** beneath.

```text
┌──────────────────────────────────────────────────────────────┐
│ Dashboard │ Target │ Proxy │ Intruder │ Repeater │ ...        │
└──────────────────────────────────────────────────────────────┘
                         │
                         ▼  Selected Module
                         ▼  Sub-tabs
```

For beginner web testing the priority modules are **Target** (understand the app and site map), **Proxy** (intercept and inspect), **Repeater** (modify and resend), **Intruder** (customised attacks) and **Decoder** (encode/decode).

---

## Task 6 — Navigation

Burp navigation has two levels: the **main menu** selects a module, and a **second menu** of sub-tabs selects the functionality within it. For the Proxy module, for example, the sub-tabs are **Intercept**, **HTTP history**, **WebSockets history** and **Proxy settings**.

Modules can be **detached** into separate windows via the **Window → Detach** menu, which is handy when working across several tools at once; a detached tab reattaches through the same interface. Burp also provides default **keyboard shortcuts** for jumping between the most-used modules:

| Shortcut | Tab |
|----------|-----|
| **Ctrl + Shift + D** | Dashboard |
| **Ctrl + Shift + T** | Target |
| **Ctrl + Shift + P** | Proxy |
| **Ctrl + Shift + I** | Intruder |
| **Ctrl + Shift + R** | Repeater |

| Question | Answer |
|---|---|
| **Which tab will `Ctrl + Shift + P` switch us to?** | The **Proxy** tab. |

---

## Task 7 — Options (Settings)

Before using the Proxy it helps to understand Burp's configuration. Burp has two main setting types: **Global / User settings** (affect the entire installation and persist across starts) and **Project settings** (specific to the current project/session). Note that Community Edition does **not** support saving projects, so project-specific options in a temporary project are lost on close.

The **Settings** button in the top navigation bar opens a separate Settings window with a left-hand menu. The room highlights three ways to find a setting:

> **1. Search**
> Type a keyword (for example `proxy`) to instantly filter to related settings — invaluable given how many options Burp has.

> **2. Type filter**
> Toggle between `All`, `User` and `Project` to show every setting, only installation-wide settings, or only current-project settings.

> **3. Categories**
> Browse by category: **Tools** (Proxy, Intruder, Repeater, Sequencer, Burp's browser), **Project** (Scope, Collaborator, Tasks, Automatic backup, Logging), **Sessions**, **Network** (Connections, TLS, HTTP), **User interface** (Inspector and message editor, Hotkeys, Display), **Suite** (REST API, Updates, Performance feedback, Temporary files location) and **Extensions**.

Many modules also offer a shortcut straight to their own settings — for example **Proxy → Proxy settings** opens the window directly at the Proxy section, avoiding a manual search. The important Proxy configuration areas are **Proxy listeners**, **Request interception rules**, **Response interception rules** and **Match and Replace**.

**Proxy listeners** receive incoming HTTP requests from the browser and are defined by an interface + port — the room uses `127.0.0.1:8080`. Each Burp installation also generates its own **CA certificate**, which the listener uses when negotiating TLS (covered fully in Task 13).

**Request interception rules** decide which requests are stalled in the Intercept tab, based on conditions such as file extension, HTTP method, the request itself, and whether the URL is in target scope — so Burp needn't stop every request. **Response interception rules** are off by default and can be enabled to stall responses based on Content-Type, whether the request was modified/intercepted, status code, or scope. **Match and Replace** uses **regular expressions (REGEX)** to dynamically rewrite incoming/outgoing traffic — for example changing the **User-Agent**, manipulating cookies, or altering headers.

An example scope configuration under **Project → Scope → Target scope** defines exactly which hosts and URLs are the target, with an **Include in scope** list (e.g. `https://tryhackme.com/`) and an **Exclude from scope** list for endpoints you must not touch.

| Question | Answer |
|---|---|
| **Q1. In which category can you find a reference to a "Cookie jar"?** | **Sessions** (`Settings → Sessions → Cookie jar`). |
| **Q2. In which base category can you find the "Updates" sub-category that controls update behaviour?** | **Suite** (`Settings → Suite → Updates`). |
| **Q3. What is the name of the sub-category that lets you change the keybindings for shortcuts?** | **Hotkeys** (`Settings → User interface → Hotkeys`). |
| **Q4. If we have uploaded Client-Side TLS certificates, can we override these on a per-project basis?** | **Yes.** |

---

## Task 8 — Introduction to the Burp Proxy

The **Burp Proxy** is the most fundamental tool in the suite. It captures HTTP/HTTPS requests and responses between the browser and the target server, letting a tester capture, inspect, modify, forward or drop requests, send them to other Burp tools, and review previous traffic.

When **Intercept is on** (in **Proxy → Intercept**), Burp holds matching requests before they reach the server — so the browser may appear to hang because the request has not been allowed to continue. From the Intercept tab you can:

```text
Browser ─► Burp Proxy ─► INTERCEPT
                             ├── Forward → request continues to Target
                             ├── Drop    → request discarded
                             ├── Edit    → modify then forward
                             └── Action  → send to another Burp module
```

Click **Forward** to allow the request, **Drop** to discard it, or the **"Intercept is on"** button to toggle to **Intercept is off**. An intercepted request can be edited before forwarding — for example changing `GET /profile?id=10` to `GET /profile?id=11` — which is one of the Proxy's most important capabilities and is invaluable when testing authentication, authorization, session handling, input validation and access controls.

Crucially, Burp **captures and logs requests by default even when interception is off**. Those requests appear in **Proxy → HTTP history**, giving a searchable record with the host, method, URL, parameters, status code, response length, MIME type, extension, title and request number:

```http
Host                   Method   URL
assets.tryhackme.com   GET      /js/popper.min.js
assets.tryhackme.com   GET      /js/jquery.min.js
tryhackme.com          GET      /about
tryhackme.com          GET      /business
```

Burp also logs real-time **WebSocket** communication under **Proxy → WebSockets history**. Both histories let you review, analyse, modify and forward captured traffic to other modules — you don't have to intercept everything live.

Two Proxy settings recur throughout the room. **Response interception** is enabled with *"Intercept responses based on the following rules"* and uses conditions such as `Content-Type header → Matches → text`, `Request → Was modified`, `Request → Was intercepted`, `Status code → Does not match → ^304$` and `URL → Is in target scope`. **Match and Replace** applies REGEX to rewrite requests automatically.

> **Tip:** The Proxy mental model to burn in is **CAPTURE → INSPECT → MODIFY → FORWARD/DROP → ANALYSE.** If the browser freezes, your first check is always "is Intercept on?"

---

## Task 9 — Connecting Through the Proxy (FoxyProxy)

To route a normal browser through Burp, the browser must redirect its traffic to Burp's listener. This task uses **Firefox** with the **FoxyProxy** extension (already installed on the AttackBox). The instructions are Firefox-specific; other browsers need a different proxy method. The room's proxy values are `127.0.0.1:8080`.

| **1** | **Install / locate FoxyProxy**<br>Install the **FoxyProxy Basic** extension. On the TryHackMe AttackBox it is already installed. |
| --- | --- |

| **2** | **Open FoxyProxy Options**<br>Click the **FoxyProxy** icon at the top-right of Firefox, then choose **Options** to open the configuration page. |
| --- | --- |

| **3** | **Add a new configuration**<br>Inside FoxyProxy Options click **Add** to create a new proxy configuration. |
| --- | --- |

| **4** | **Enter the proxy details**<br>Title: `Burp`, Proxy Type: `HTTP`, Proxy IP address / DNS name: `127.0.0.1`, Port: `8080`. Username/password are optional and not needed here. |
| --- | --- |

| **5** | **Save the configuration**<br>Click **Save**. The Burp proxy configuration is now stored in FoxyProxy. |
| --- | --- |

| **6** | **Activate the Burp proxy**<br>Click the FoxyProxy icon and select **Burp** to redirect browser traffic through `127.0.0.1:8080`. Burp Suite must be running or requests will fail. |
| --- | --- |

| **7** | **Enable Burp Intercept**<br>Switch to Burp, go to **Proxy → Intercept**, and ensure **Intercept is on**. If off, requests pass through without being held. |
| --- | --- |

| **8** | **Test the proxy**<br>Open Firefox and visit `http://10.48.155.152/`. The browser may appear to hang (Burp is holding the request); click **Forward** to let it continue. |
| --- | --- |

> **Note:** When FoxyProxy = Burp **and** Intercept = ON, the browser stops on every intercepted request — so don't leave interception enabled when you aren't inspecting. On the AttackBox, consider closing other browser tabs first, or you may capture their **WebSocket** traffic instead of the target VM's requests.

---

## Task 10 — Site Map and Issue Definitions

The **Target** tab does more than manage scope; it contains three sub-tabs: **Site map**, **Issue definitions** and **Scope settings**. The **Site map** builds a tree representation of the application from the traffic Burp observes — every page you visit while the proxy is active can appear there, revealing the app's structure and, importantly, any **API endpoints** that were accessed:

```text
Target → Site map
           ├── /
           ├── /login
           ├── /about
           ├── /admin
           └── /api
                 ├── /users
                 └── /products
```

Burp Professional can **automatically crawl** to build the site map, but even Community accumulates site-map data as you browse. So the enumeration mindset is: **browse the app → Burp captures requests → the Site map grows → discover endpoints.**

**Issue definitions** (**Target → Issue definitions**) list the vulnerabilities Burp's scanner looks for, along with names, descriptions and references. Community lacks the automated scanner but still exposes this reference list — useful for writing reports, understanding findings, and researching a vulnerability manually. **Scope settings** control which domains/IPs count as the target, to focus testing and reduce accidental out-of-scope requests.

**Task 10 challenge:** visit `http://10.48.155.152/`, browse every page linked from the homepage, then check **Target → Site map**, identify an **unusual endpoint**, and visit it to obtain the flag.

```text
THM{NmNIZTINGE1MWU1ZTQzMzgzNmFiNWVk}
```

> **Security relevance:** The Site map is a passive recon goldmine — simply browsing an app populates a structured map of pages and hidden API endpoints an attacker would otherwise have to guess at.

---

## Task 11 — The Burp Suite Browser

Burp ships with its own built-in **Chromium-based browser** that is already configured to use the Burp Proxy — so unlike Firefox + FoxyProxy, no manual proxy setup is needed. Launch it via **Proxy → Open browser**; any request made inside it automatically passes through Burp.

There is one catch: when Burp runs on **Linux as the root user** (as on the AttackBox), the Burp Browser may fail to start because of its sandbox environment. The room gives two solutions:

> **Solution 1 — Smart option (recommended)**
> Create a new low-privilege user and run Burp Suite under that account. This preserves the browser sandbox and follows the principle of least privilege.

> **Solution 2 — Easy option**
> Go to **Settings → Tools → Burp's browser** and enable **"Allow Burp's browser to run without a sandbox."** This is disabled by default for security: without the sandbox, a compromised browser could give an attacker access to the whole machine. It is less concerning in the isolated AttackBox but should still be used responsibly.

> **Warning:** Running the Burp Browser without a sandbox trades isolation for convenience. `No sandbox → less isolation → higher security risk.` Prefer running Burp as a low-privilege user whenever possible.

---

## Task 12 — Scoping and Targeting

Scoping is one of the most important aspects of using the Proxy. If Burp captures and logs *everything*, the traffic view is quickly overwhelmed with Google, Cloudflare, background requests and WebSockets. **Scope** restricts Burp to the application(s) you actually want to test, giving a much cleaner view.

```text
Without scope:  Browser ─► [target + Google + Cloudflare + background + WebSockets] ─► Burp (huge noise)
With scope:     Browser ─► target traffic ─► Burp
                        └► other traffic  ─► ignored
```

The easiest way to add a target is via the Site map: **Target → Site map → right-click the target → Add to scope**. Burp then asks whether to stop logging anything out of scope — in most cases choose **Yes**. Scope can also be edited under **Target → Scope settings**, where you **Include** and **Exclude** domains/IPs (`INCLUDE = test this`, `EXCLUDE = do not test this`).

Critically, **scope does not automatically stop interception**. Even with out-of-scope logging disabled, Burp can still intercept everything, so you must also configure an interception rule. Go to **Settings → Tools → Proxy → Request interception rules** and use the condition **`URL → Is in target scope`**:

```text
Browser Request ─► Is URL in target scope?
                        ├── YES ─► Intercept ─► Burp
                        └── NO  ─► Ignore
```

**Task 12 practical:** add `http://10.48.155.152/` to Burp's scope, then change the Proxy settings so only in-scope traffic is intercepted, and observe how much cleaner the traffic becomes.

> **Tip:** The clean-traffic recipe is: **define scope → add target to scope → stop logging out-of-scope traffic → set the `URL is in target scope` interception rule.** The result is less noise, better focus and a lower risk of accidentally testing something out of scope.

---

## Task 13 — Proxying HTTPS

So far the Proxy has handled HTTP, but modern applications use **HTTPS**, which encrypts communication between browser and server. Without extra configuration Burp cannot read the encrypted contents. To inspect HTTPS, Burp must act as a trusted **Certificate Authority (CA)** for the browser: it creates one TLS connection with the browser and a separate one with the target, so the browser must trust Burp's CA.

Each Burp installation generates its own CA certificate — the **PortSwigger CA** — which it uses to generate per-site certificates on the fly. Once the browser trusts it, Burp can intercept HTTPS without the browser rejecting the connection.

| **1** | **Access the certificate**<br>With the browser proxied through Burp, open `http://burp/` and select **CA Certificate**, or go straight to `http://burp/cert`. The room uses `http://burp/cert`. |
| --- | --- |

| **2** | **Download `cert.der`**<br>The certificate downloads as `cert.der` — this is Burp's CA certificate. |
| --- | --- |

| **3** | **Open Firefox certificate manager**<br>Go to **Firefox → Settings → Privacy & Security → Certificates → View Certificates**. |
| --- | --- |

| **4** | **Import into Authorities**<br>Under the **Authorities** tab click **Import** and select `cert.der`. |
| --- | --- |

| **5** | **Trust the CA**<br>Enable **"Trust this CA to identify websites"** and confirm. The imported CA is the **PortSwigger CA**. |
| --- | --- |

After import, Firefox accepts Burp-generated certificates, so HTTPS requests flow `Browser → Burp Proxy (decrypts/inspects) → new TLS connection → Target Server` and back. To verify: keep FoxyProxy on Burp, keep Burp running, confirm the PortSwigger CA is trusted, open an HTTPS site, and watch the request appear in the Proxy.

> **Warning:** Installing a CA certificate grants it significant trust — the **PortSwigger CA** can then issue certificates your browser accepts. Only do this in an **authorised testing environment**, and never install an unknown CA into your normal system without understanding and trusting its source.

---

## Task 14 — Example Attack (XSS via Client-Side Bypass)

The final practical shows Burp modifying a request to test a real vulnerability: **Cross-Site Scripting (XSS)** against a support/contact form that relies on **client-side validation**. XSS is a web vulnerability where attacker-controlled input is interpreted as **JavaScript** by a victim's browser (`User Input → Web App → Unsafe Output → Browser → JavaScript executes`).

The teaching point is that **client-side validation is not a trusted security boundary**. The browser may block "invalid" input with JavaScript, but a tester can intercept the HTTP request *after* the browser has built it and modify it before it reaches the server — sailing straight past the browser-side filter.

```text
Browser ─► Client-side filter ─► HTTP Request ─► BURP ─► (modify) ─► Server
```

The hands-on flow: turn **Intercept on**, submit the support form, and Burp captures the request:

```http
POST /support HTTP/1.1
Host: 10.48.155.152
Content-Type: application/x-www-form-urlencoded

...
```

Locate the parameter holding the form data and replace it with an XSS payload — proving attacker JavaScript can reach the app despite the filter:

```xml
<script>
    JavaScript
</script>
```

Special characters often need to be **URL encoded** first. Burp's shortcut **`Ctrl + U`** URL-encodes the selected text, so `<` becomes `%3C` and `>` becomes `%3E`. After modifying (and encoding if required), click **Forward**; the application processes the modified input and the challenge confirms success:

```text
Succ3ssful XSS
```

This single exercise demonstrates that browser traffic can be intercepted, HTTP requests can be modified, client-side validation can be bypassed, and therefore **server-side input validation is essential**. Defensively, developers should validate input on the server, encode output with context-aware escaping, avoid unsafe HTML injection, apply a Content Security Policy, treat **all client input as untrusted**, and test controls independently of browser behaviour.

> **Security relevance:** `Client-side validation ≠ trusted security boundary.` It is fine for user experience and instant feedback, but anything enforced only by JavaScript, browser UI or HTML validation can be bypassed with a proxy. Security-sensitive checks must live on the server.

---

## Task 15 — Conclusion and Complete Workflow

You have completed **Burp Suite: The Basics** and now understand the core concepts needed to begin web application security testing with Burp. The complete practical workflow ties every task together:

```text
Start Burp → Temporary Project → Firefox + FoxyProxy (127.0.0.1:8080)
   → Proxy → Intercept ON → browse http://10.48.155.152/
   → Intercept request → Forward
   → Review Proxy → HTTP history
   → Review Target → Site map
   → Add target to scope → set "URL is in target scope"
   → HTTPS: http://burp/cert → download cert.der → import into Firefox Authorities → trust PortSwigger CA
   → Intercept & modify authorised requests (e.g. Ctrl + U to URL-encode an XSS payload)
```

To learn next: move deeper into **Repeater** and **Intruder**, explore **Decoder/Comparer/Sequencer**, study the vulnerability classes listed in **Issue definitions**, and practise on authorised targets.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Burp Suite** | PortSwigger toolkit that sits between browser and target to intercept/modify HTTP(S) |
| **Core module** | **Proxy** — Capture → Inspect → Modify → Forward/Drop → Analyse |
| **Editions** | Community (free, manual, no scanner, no saved projects) vs Professional (paid, automated scanner) |
| **Proxy address** | `127.0.0.1:8080` (loopback + default listener port) |
| **Browser routing** | Firefox + **FoxyProxy** → `127.0.0.1:8080`; or Burp's built-in Chromium browser |
| **Intercept** | **Proxy → Intercept**; Forward / Drop / Edit; browser hangs while a request is held |
| **HTTP history** | Logged even when Intercept is off (**Proxy → HTTP history**) |
| **Target** | **Site map**, **Issue definitions**, **Scope settings** |
| **Scope** | Add via right-click → Add to scope; restrict interception with `URL → Is in target scope` |
| **HTTPS** | Trust the **PortSwigger CA** — `http://burp/cert` → `cert.der` → Firefox Authorities |
| **URL encode** | **Ctrl + U** (`<` → `%3C`, `>` → `%3E`) |
| **Example attack** | Bypass client-side validation → XSS → `Succ3ssful XSS` |

**Key idea:** Burp gives a tester a control point in the middle of web traffic — everything from mapping and scoping to HTTPS interception and modifying an XSS payload flows from that one capability.

---

## 30-Second Revision

- **Burp Suite** (PortSwigger) intercepts and manipulates HTTP(S) between the browser and the target; the **Proxy** is the core module.
- Core modules: **Proxy, Target, Intruder, Repeater, Collaborator, Sequencer, Decoder, Comparer, Logger, Organizer, Extensions.**
- **Community** = free, manual testing, no automated scanner, no saved projects; **Professional** = paid, scanner + full Intruder.
- Route Firefox through Burp with **FoxyProxy** at **`127.0.0.1:8080`**, or use Burp's built-in browser (may need to run as a low-privilege user on Linux root).
- **Intercept** holds requests (Forward/Drop/Edit); **HTTP history** logs traffic even when Intercept is off.
- **Target → Site map** maps pages and API endpoints; add targets to **scope** and use `URL → Is in target scope` to intercept only what matters.
- Intercept **HTTPS** by downloading **`cert.der`** from **`http://burp/cert`** and trusting the **PortSwigger CA** in Firefox's Authorities.
- The example attack bypasses **client-side validation** to land an **XSS** payload (URL-encode with **Ctrl + U**) → **Succ3ssful XSS**; server-side validation is essential.

---

## Cheat Sheet

### Key Values from the Room

| Item | Value |
|------|-------|
| **Proxy** | `127.0.0.1:8080` |
| **Target VM** | `http://10.48.155.152/` |
| **Site map flag** | `THM{NmNIZTINGE1MWU1ZTQzMzgzNmFiNWVk}` |
| **Certificate URL** | `http://burp/cert` |
| **Certificate file** | `cert.der` |
| **Burp CA** | PortSwigger CA |
| **XSS success text** | `Succ3ssful XSS` |
| **URL encode shortcut** | `Ctrl + U` |

### Keyboard Shortcuts

| Shortcut | Tab |
|----------|-----|
| `Ctrl + Shift + D` | Dashboard |
| `Ctrl + Shift + T` | Target |
| `Ctrl + Shift + P` | Proxy |
| `Ctrl + Shift + I` | Intruder |
| `Ctrl + Shift + R` | Repeater |
| `Ctrl + U` | URL-encode selected text |

### Important Settings Paths

| Setting | Path |
|---------|------|
| **Cookie jar** | `Settings → Sessions → Cookie jar` |
| **Updates** | `Settings → Suite → Updates` |
| **Hotkeys** | `Settings → User interface → Hotkeys` |
| **Proxy** | `Settings → Tools → Proxy` |
| **Burp's browser** | `Settings → Tools → Burp's browser` |
| **Scope** | `Target → Scope settings` |
| **Intercept only in scope** | `Settings → Tools → Proxy → Request interception rules → URL → Is in target scope` |

### Core Modules

| Module | One-liner |
|--------|-----------|
| **Target** | Map the application (Site map, Issue definitions, Scope) |
| **Proxy** | Intercept and modify traffic |
| **Repeater** | Replay + manually modify a request |
| **Intruder** | Payload testing / fuzzing |
| **Decoder** | Encode / decode data |
| **Comparer** | Compare requests or responses |
| **Sequencer** | Token randomness analysis |
| **Collaborator** | Out-of-band interaction detection |

### Common Mistakes → Checks

| Symptom | Check |
|---------|-------|
| Browser traffic not visible | FoxyProxy set to **Burp** → `127.0.0.1:8080` |
| Browser appears frozen | Is **Intercept** on? If so, **Forward** the request |
| HTTPS certificate warning | Is the **PortSwigger CA** imported and trusted? |
| Too much traffic in HTTP history | Define a **target scope** |
| Burp Browser won't start | Linux root/sandbox issue — run Burp as a low-privilege user |
| Burp intercepts unwanted requests | Set `URL → Is in target scope` |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is Burp Suite?** | A web application security testing platform by PortSwigger used to intercept, inspect, modify and analyze HTTP/HTTPS traffic and test web apps for vulnerabilities. |
| **Q2. What is Burp Proxy?** | It acts as an intermediary between the browser and the target server, allowing a tester to intercept and manipulate HTTP/HTTPS requests and responses. |
| **Q3. What is the difference between Proxy and Repeater?** | **Proxy** intercepts live browser traffic; **Repeater** manually resends and modifies a captured request multiple times. |
| **Q4. What is the difference between Burp Community and Professional?** | Community provides core manual-testing tools (no automated scanner, no saved projects); Professional adds automated vulnerability scanning and a full-speed Intruder. |
| **Q5. What does `127.0.0.1` mean and why port `8080`?** | `127.0.0.1` is the IPv4 loopback address (localhost); Burp's Proxy listener is configured on port `8080`, so the browser sends traffic to `127.0.0.1:8080`. |
| **Q6. Does installing Burp automatically intercept browser traffic?** | No — the browser must be configured (e.g. with FoxyProxy) to send its traffic through the Burp proxy. |
| **Q7. Why does Burp need a CA certificate for HTTPS?** | HTTPS is encrypted, so Burp must act as a trusted CA (the **PortSwigger CA**) that the browser trusts in order to decrypt and inspect the traffic. |
| **Q8. Why is scoping important?** | It restricts Burp to the intended target, producing a cleaner traffic view and reducing the risk of accidentally testing out-of-scope systems. |
| **Q9. What lesson does the XSS example teach?** | Client-side validation can be bypassed by intercepting and modifying the request, so server-side validation is essential. |

## Final Takeaway

**Burp Suite** turns a browser into a controllable pentesting instrument by placing its **Proxy** between the client and the target, where every request can be captured, inspected, modified, forwarded or dropped. The free **Community** edition covers the manual-testing essentials — routing a browser through **FoxyProxy** at **`127.0.0.1:8080`**, intercepting and editing requests, reviewing **HTTP history**, mapping the application with **Target → Site map**, and tightening focus with **scope** and the `URL → Is in target scope` rule. Intercepting **HTTPS** is unlocked by trusting the **PortSwigger CA** (`http://burp/cert` → `cert.der` → Firefox Authorities), and the example attack proves the room's central security lesson: **client-side validation is not a security boundary** — a tester can bypass it, URL-encode an **XSS** payload with **`Ctrl + U`**, and land **`Succ3ssful XSS`**, which is why real protection must be enforced by **server-side validation**. Master the loop **Capture → Inspect → Modify → Replay → Analyze**, always work within **authorised scope**, and Burp becomes the foundation for everything else in web hacking.
