# 🛡️ Burp Suite: The Basics
> Complete Handbook Notes | Web Application Pentesting | Burp Suite
> Room: Burp Suite: The Basics
> Status: ✅ Completed — 100%
> Format: Terminal / Hacker Style
> Platform: TryHackMe

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 INTRODUCTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 1.1 What is Burp Suite?

Burp Suite is a collection of tools developed by PortSwigger for
web application security testing and penetration testing.

It acts as an intermediary between:

    ┌──────────────┐
    │ Web Browser  │
    └──────┬───────┘
           │
           │ HTTP / HTTPS
           ▼
    ┌──────────────────┐
    │   BURP SUITE     │
    │      PROXY       │
    └──────┬───────────┘
           │
           │ Modified / Forwarded Request
           ▼
    ┌──────────────────┐
    │  Target Web App  │
    └──────────────────┘

The most important concept is that Burp allows us to intercept,
inspect and manipulate HTTP(S) traffic between the browser and
the target application.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 WHY BURP SUITE IS IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Normal browser flow:

    Browser ────────────────► Web Server
    Browser ◄──────────────── Web Server

With Burp:

    Browser
       │
       ▼
    ┌───────────────┐
    │  Burp Proxy   │
    │               │
    │ Inspect       │
    │ Modify        │
    │ Forward       │
    │ Drop          │
    └───────┬───────┘
            │
            ▼
       Web Server

This gives a penetration tester control over web requests and
responses.

For example, a tester can inspect:

    • HTTP methods
    • Headers
    • Cookies
    • Parameters
    • Authentication tokens
    • Session information
    • Request bodies
    • Response bodies
    • API endpoints

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔬 WHAT CAN BURP BE USED FOR?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite can be used during different stages of web application
penetration testing.

Typical workflow:

    Reconnaissance
         │
         ▼
    Application Mapping
         │
         ▼
    Request Interception
         │
         ▼
    Parameter Manipulation
         │
         ▼
    Vulnerability Testing
         │
         ▼
    Exploitation / Validation
         │
         ▼
    Reporting

Common vulnerabilities that can be manually investigated using
Burp include:

    • Cross-Site Scripting (XSS)
    • SQL Injection
    • Authentication issues
    • Authorization issues
    • IDOR
    • CSRF
    • Command Injection
    • File Upload vulnerabilities
    • Session-management issues
    • Access-control problems
    • API security issues

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 PART 1.2 — BURP SUITE COMPONENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite contains multiple modules.

Important modules include:

    Dashboard
    Target
    Proxy
    Intruder
    Repeater
    Collaborator
    Sequencer
    Decoder
    Comparer
    Logger
    Organizer
    Extensions
    Settings

The exact modules/features available can depend on the Burp Suite
edition and version.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 PROXY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Proxy is one of the most important Burp modules.

It allows us to intercept HTTP/HTTPS requests and responses.

Basic workflow:

    Browser
       │
       │ Request
       ▼
    Burp Proxy
       │
       ├── Inspect
       ├── Modify
       ├── Forward
       └── Drop
       │
       ▼
    Target Server

The Proxy module contains important areas such as:

    • Intercept
    • HTTP history
    • WebSockets history
    • Proxy settings

Example intercepted request:

    GET / HTTP/2
    Host: target.example
    User-Agent: Mozilla/5.0
    Accept: text/html
    Cookie: session=XXXXXXXX

The tester can modify values before forwarding the request.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 TARGET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Target module helps us understand and define the target
application.

Important areas include:

    • Site map
    • Issue definitions
    • Scope settings

The Site Map can build a representation of the application based
on traffic observed by Burp.

Example:

    Target
      │
      └── Site map
           ├── /
           ├── /login
           ├── /register
           ├── /api
           │    ├── /users
           │    └── /products
           └── /admin

This becomes especially useful during enumeration.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔨 INTRUDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Intruder is designed for automated/customised attacks against
requests.

Typical uses include:

    • Parameter fuzzing
    • Brute-force testing
    • Payload testing
    • Input validation testing
    • Enumeration

A request can be sent to Intruder and specific parameters can be
selected as attack positions.

Conceptually:

    Original request
           │
           ▼
    ┌────────────────┐
    │ Intruder        │
    └───────┬────────┘
            │
       ┌────┼────┬────┐
       ▼    ▼    ▼    ▼
      P1   P2   P3   P4
       │    │    │    │
       └────┴────┴────┘
            │
            ▼
       Analyze results

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 REPEATER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Repeater is used to manually resend and modify HTTP requests.

Typical workflow:

    Capture Request
          │
          ▼
    Send to Repeater
          │
          ▼
    Modify Request
          │
          ▼
    Send
          │
          ▼
    Analyze Response
          │
          └────► Modify again

Repeater is extremely useful when manually testing parameters,
headers, cookies and application logic.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🤝 COLLABORATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Collaborator is used to detect certain types of
out-of-band interactions.

It can help identify vulnerabilities where the application causes
an external interaction.

Conceptually:

    Tester
      │
      ▼
    Target Application
      │
      │ External interaction
      ▼
    Collaborator
      │
      ▼
    Interaction detected

This can be useful when testing blind/out-of-band behaviour.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎲 SEQUENCER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sequencer is used to analyze the quality of tokens and other
values that should be unpredictable.

Examples:

    • Session tokens
    • CSRF tokens
    • Password reset tokens
    • Random identifiers

The objective is to determine whether generated values appear
sufficiently random.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 DECODER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Decoder provides encoding/decoding functionality useful during
web security testing.

Common transformations include:

    • URL encoding
    • URL decoding
    • Base64
    • Hex
    • Other supported transformations

Example:

    Original:
        <script>

    URL encoded:
        %3Cscript%3E

Encoding can be important when manipulating HTTP requests.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚖️ COMPARER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Comparer allows two pieces of data to be compared.

Useful for identifying subtle differences between:

    • Requests
    • Responses
    • Payload results
    • Authentication responses

Example:

    Request A ──┐
                ├──► Comparer ──► Differences
    Request B ──┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📝 LOGGER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Logger provides logging functionality for traffic and events,
depending on the Burp version/configuration.

This can help with retrospective analysis.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗂️ ORGANIZER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Organizer can help organise items such as requests and notes
during testing.

This is useful when a penetration test contains a large number
of requests and observations.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 EXTENSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp supports extensions that can extend its functionality.

Extensions can add:

    • New functionality
    • Custom integrations
    • Automation
    • Additional analysis
    • Custom tooling

The extension ecosystem is especially useful for advanced
penetration-testing workflows.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 KEY TAKEAWAYS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Burp Suite is a web application security testing platform.

2. Burp Proxy is central to manual web testing because it allows
   HTTP(S) traffic to be intercepted and manipulated.

3. Target helps map and define the application being tested.

4. Intruder is useful for automated/customised payload attacks.

5. Repeater is useful for manually modifying and replaying requests.

6. Sequencer helps analyze token randomness.

7. Decoder helps with encoding/decoding transformations.

8. Comparer helps identify differences between requests/responses.

9. Extensions allow Burp functionality to be extended.

10. Burp should only be used against systems for which you have
    explicit authorization.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ QUICK REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Proxy       → Intercept / modify traffic
Target      → Map application + define scope
Intruder    → Automated/customised attacks
Repeater    → Manual request replay
Collaborator→ Out-of-band interaction testing
Sequencer   → Token randomness analysis
Decoder     → Encode/decode data
Comparer    → Compare requests/responses
Logger      → Traffic/event logging
Organizer   → Organise testing items
Extensions  → Extend Burp functionality

## Interview Questions

Q1.
What is Burp Suite?

Answer

Burp Suite is a web application security testing platform used
to intercept, inspect, modify and analyze HTTP/HTTPS traffic and
to test web applications for security vulnerabilities.

------------------------------------------------------------

Q2.
What is Burp Proxy?

Answer

Burp Proxy acts as an intermediary between the browser and the
target server, allowing a tester to intercept and manipulate
HTTP/HTTPS requests and responses.

------------------------------------------------------------

Q3.
What is the difference between Proxy and Repeater?

Answer

Proxy:
    Used mainly to intercept live browser traffic.

Repeater:
    Used to manually resend and modify a captured request
    multiple times.

------------------------------------------------------------

Q4.
What is Intruder used for?

Answer

Intruder is used for automated/customised attacks such as
parameter fuzzing, enumeration and payload testing.

------------------------------------------------------------

Q5.
Why is Burp useful for web penetration testing?

Answer

It provides detailed visibility and control over application
traffic, making it possible to test how an application behaves
when requests, parameters, headers, cookies and other values
are modified.

------------------------------------------------------------

## 🧠 MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

P → Proxy → Pause traffic
T → Target → Track target
I → Intruder → Inject payloads
R → Repeater → Replay requests
D → Decoder → Decode data
C → Comparer → Compare data
S → Sequencer → Study randomness

Think:

    "P T I R D C S"

These are some of the most important Burp components to remember.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 FEATURES OF BURP COMMUNITY + INSTALLATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🟢 TASK 3 — FEATURES OF BURP COMMUNITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 3.1 Burp Suite Editions

Burp Suite is available in different editions.

The two important editions discussed in the room are:

    ┌───────────────────────────────┐
    │        BURP SUITE             │
    ├─────────────────┬─────────────┤
    │ Community       │ Professional│
    ├─────────────────┼─────────────┤
    │ Free            │ Paid        │
    │ Manual testing  │ Advanced    │
    │ Core tooling    │ automation  │
    │ Limited         │ More tools  │
    └─────────────────┴─────────────┘

The Community Edition is sufficient for learning the fundamentals
of web application penetration testing.

The Professional Edition provides additional functionality,
particularly for more advanced and automated testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔧 IMPORTANT BURP COMMUNITY FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Community Edition provides several important tools that are
useful for manual penetration testing.

Core functionality includes:

    • Proxy
    • Target
    • Repeater
    • Intruder
    • Decoder
    • Comparer
    • Sequencer
    • Site Map
    • Scope management
    • HTTP history
    • WebSockets history

These tools allow a tester to manually inspect and manipulate
web application traffic.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕵️ MANUAL TESTING WITH BURP COMMUNITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

One of the biggest strengths of Burp Community is manual testing.

A typical workflow:

    Browser
       │
       ▼
    Burp Proxy
       │
       ▼
    Capture Request
       │
       ├──────────────► Target
       │
       ▼
    Repeater
       │
       ▼
    Modify Parameters
       │
       ▼
    Send Request
       │
       ▼
    Analyze Response
       │
       ▼
    Identify Vulnerability

This makes Burp especially useful when learning how web
applications communicate with servers.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📡 HTTP REQUEST INSPECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp allows us to see the actual HTTP request generated by the
browser.

Example:

    GET /login HTTP/1.1
    Host: 10.48.155.152
    User-Agent: Mozilla/5.0
    Accept: text/html
    Cookie: session=abc123

Instead of only seeing the webpage, we can inspect the underlying
communication.

Important request components:

    METHOD
      ↓
    URL / PATH
      ↓
    HEADERS
      ↓
    COOKIES
      ↓
    PARAMETERS
      ↓
    REQUEST BODY

This is fundamental to web application penetration testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔄 REQUEST MODIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp allows us to change values before sending the request.

Example:

    Original:

    GET /profile?id=10 HTTP/1.1

    Modified:

    GET /profile?id=11 HTTP/1.1

This is useful for testing:

    • IDOR
    • Access control
    • Input validation
    • Authentication logic
    • Parameter manipulation

The same principle applies to:

    • Cookies
    • Headers
    • Query parameters
    • POST parameters
    • JSON values
    • Form data

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 REPEATER — MANUAL REQUEST TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A captured request can be sent to Repeater.

Workflow:

    Capture request
         │
         ▼
    Send to Repeater
         │
         ▼
    Modify request
         │
         ▼
    Send
         │
         ▼
    Inspect response
         │
         ▼
    Modify again
         │
         └──────────────► Repeat

This makes Repeater one of the most useful Burp tools for manual
testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 INTRUDER IN COMMUNITY EDITION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Intruder is available in Burp Community, but its functionality
is more limited than in Burp Professional.

It can still be useful for learning and performing controlled
manual/customised attacks.

Typical use cases:

    • Fuzzing
    • Parameter testing
    • Payload testing
    • Enumeration
    • Brute-force-style testing

Concept:

    Request
       │
       ▼
    Select attack position
       │
       ▼
    Choose payload
       │
       ▼
    Send requests
       │
       ▼
    Compare responses

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗺️ SITE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Site Map is an important Burp feature.

It records web application resources observed through Burp.

Example:

    TARGET
      │
      ├── /
      ├── /login
      ├── /register
      ├── /dashboard
      ├── /admin
      └── /api
           ├── /users
           ├── /products
           └── /orders

This helps testers understand the structure of the target.

The Site Map can also expose API endpoints that were accessed
during testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ BURP COMMUNITY VS PROFESSIONAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A key distinction:

    Community Edition
          │
          ├── Manual testing
          ├── Proxy
          ├── Repeater
          ├── Target
          ├── Intruder
          ├── Decoder
          ├── Comparer
          └── Other core functionality

    Professional Edition
          │
          ├── Everything needed for advanced testing
          ├── Additional automation
          ├── Automated vulnerability scanning
          ├── More powerful Intruder functionality
          └── Additional professional features

IMPORTANT:

Burp Community is not useless because it lacks the automated
scanner.

Manual testing is a major part of penetration testing, and the
Community Edition provides many tools needed to learn those
fundamentals.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 KEY CONCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Community is primarily valuable for:

    CAPTURE
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    REPLAY
       ↓
    ANALYZE

Remember:

    "Burp = Control the Web Traffic"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟢 TASK 4 — INSTALLATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite can be installed on common operating systems including:

    • Linux
    • Windows
    • macOS

The installation process depends on the operating system.

For the TryHackMe environment, the AttackBox already provides the
tools required for the room.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🐧 ATTACKBOX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TryHackMe's AttackBox is a browser-based security environment
that contains many tools required for security training.

For Burp Suite exercises, this means we do not necessarily need
to install Burp Suite manually on our own machine.

Basic environment:

    TryHackMe
       │
       ▼
    AttackBox
       │
       ├── Burp Suite
       ├── Firefox
       ├── FoxyProxy
       └── Other security tools

This makes the AttackBox convenient for completing the room.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 💻 INSTALLING BURP SUITE LOCALLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If Burp Suite needs to be installed locally, the appropriate
installer should be obtained from PortSwigger's official
distribution.

General process:

    Download installer
          │
          ▼
    Run installer
          │
          ▼
    Select installation options
          │
          ▼
    Complete installation
          │
          ▼
    Launch Burp Suite
          │
          ▼
    Create / Open project
          │
          ▼
    Start testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚀 STARTING BURP SUITE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When Burp Suite starts, it presents options related to the
project/session.

A temporary project is useful for quick testing.

Conceptually:

    Launch Burp
       │
       ▼
    Select Project
       │
       ├── Temporary Project
       │
       └── Existing Project
       │
       ▼
    Configure settings
       │
       ▼
    Burp Dashboard
       │
       ▼
    Begin testing

For TryHackMe exercises, a temporary project is commonly enough.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📁 BURP PROJECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A Burp project contains information related to a testing session.

Depending on the project configuration, this can include:

    • Target information
    • Site map
    • Proxy history
    • Settings
    • Requests
    • Responses
    • Testing data

This allows a penetration tester to maintain state during an
engagement.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ PROJECT SETTINGS VS USER SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp provides different types of settings.

Important distinction:

    PROJECT SETTINGS
         │
         └── Apply to the current project

    USER SETTINGS
         │
         └── Apply to the user/environment

This distinction becomes important when configuring Burp.

Example:

    Project-specific:
        Target scope
        Project configuration

    User/global:
        Interface preferences
        User-level behaviour
        Some tool preferences

Always check whether a setting is project-specific or global before
changing it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 TEMPORARY PROJECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A temporary project is useful when:

    • Learning Burp
    • Performing quick testing
    • Working in a TryHackMe lab
    • You don't need to preserve the project permanently

Basic flow:

    Start Burp
       │
       ▼
    Temporary Project
       │
       ▼
    Use default configuration
       │
       ▼
    Start Burp

For learning environments this is generally the simplest choice.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 WHY PROXY CONFIGURATION MATTERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Installing Burp alone does not automatically mean that browser
traffic will pass through Burp.

The browser must be configured to use Burp as a proxy.

Basic architecture:

    Firefox
       │
       │ HTTP/HTTPS
       ▼
    127.0.0.1:8080
       │
       ▼
    Burp Proxy
       │
       ▼
    Target

This is why the next part of the room focuses heavily on
configuring and using the Burp Proxy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 IMPORTANT DEFAULT PROXY VALUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The room uses:

    Proxy IP:
        127.0.0.1

    Proxy Port:
        8080

Combined:

    127.0.0.1:8080

Meaning:

    Browser
       │
       ▼
    127.0.0.1:8080
       │
       ▼
    Burp Suite Proxy

`127.0.0.1` refers to the local machine (localhost).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔥 WHY 127.0.0.1?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

`127.0.0.1` is the IPv4 loopback address.

It refers back to the same machine.

Common loopback references:

    127.0.0.1
    localhost

Therefore:

    127.0.0.1:8080

means:

    "Connect to port 8080 on this machine."

In this room, Burp listens there for proxy traffic.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧭 INSTALLATION → PROXY WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Install / Launch Burp
            │
            ▼
    Start Burp Project
            │
            ▼
    Burp Proxy listening
            │
            ▼
    Configure Browser
            │
            ▼
    Browser → 127.0.0.1:8080
            │
            ▼
       Burp Proxy
            │
            ▼
       Target Server
            │
            ▼
       HTTP Response
            │
            ▼
       Browser

This is the foundation for the rest of the room.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 IMPORTANT TERMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Community
    → Free edition focused on manual testing.

Burp Professional
    → Paid edition with additional advanced/automated features.

AttackBox
    → TryHackMe's browser-based security workstation.

Proxy
    → Intermediary between browser and target.

Loopback
    → Address that refers to the local machine.

127.0.0.1
    → IPv4 loopback address.

8080
    → Proxy port used in this room.

Temporary Project
    → Convenient project type for short-lived testing sessions.

Site Map
    → Tree representation of observed target resources.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ QUICK REVISION — PART 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Community
    ↓
Manual web security testing

AttackBox
    ↓
Preconfigured TryHackMe security environment

Burp Proxy
    ↓
Intercept HTTP/HTTPS traffic

127.0.0.1
    ↓
Localhost / loopback

8080
    ↓
Proxy port used by the room

Browser
    ↓
127.0.0.1:8080
    ↓
Burp
    ↓
Target

## Interview Questions

Q1.
What is the difference between Burp Community and Burp Professional?

Answer

Burp Community provides the core tools required for manual web
application testing, while Professional provides additional
advanced and automated capabilities, including automated
vulnerability scanning and enhanced testing functionality.

------------------------------------------------------------

Q2.
Why is Burp Proxy important?

Answer

It allows a penetration tester to intercept, inspect and modify
HTTP/HTTPS traffic between the client and server.

------------------------------------------------------------

Q3.
What does 127.0.0.1 mean?

Answer

It is the IPv4 loopback address and refers to the local machine.

------------------------------------------------------------

Q4.
Why is port 8080 used?

Answer

In this TryHackMe setup, Burp Proxy is configured to listen on
port 8080, so the browser sends proxy traffic to
127.0.0.1:8080.

------------------------------------------------------------

Q5.
Does installing Burp automatically intercept browser traffic?

Answer

No. The browser must be configured to send its traffic through
the Burp proxy.

------------------------------------------------------------

Q6.
What is the AttackBox?

Answer

It is TryHackMe's browser-based virtual security environment
containing tools needed for completing security labs.

------------------------------------------------------------

## 🧠 MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Remember:

    C → Community → Core/manual testing
    P → Professional → Powerful/advanced features
    A → AttackBox → All-in-one lab environment
    P → Proxy → Pass traffic through Burp
    L → Localhost → 127.0.0.1
    8 → Proxy → 8080

Final mental model:

    Browser
       ↓
    127.0.0.1:8080
       ↓
    Burp Proxy
       ↓
    Target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 BURP DASHBOARD, NAVIGATION & OPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🟢 TASK 5 — THE DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Burp Suite Dashboard provides an overview of the current
Burp project and its activity.

It acts as the central place from which we can monitor what Burp
is doing and access different modules.

General Burp Suite structure:

    ┌─────────────────────────────────────────────────────────┐
    │ Dashboard │ Target │ Proxy │ Intruder │ Repeater │ ... │
    └─────────────────────────────────────────────────────────┘
                         │
                         ▼
                  Selected Module
                         │
                         ▼
                    Sub-tabs

The Dashboard is useful for getting an overview before moving
into specific Burp tools.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧭 BURP SUITE MAIN MODULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The main navigation bar contains the major Burp modules.

    Dashboard
    Target
    Proxy
    Intruder
    Repeater
    Collaborator
    Sequencer
    Decoder
    Comparer
    Logger
    Organizer
    Extensions
    Settings

Depending on the Burp edition/version, the exact available modules
or layout may differ.

Important modules for beginner web testing:

    Target
      → Understand the target and site map

    Proxy
      → Intercept and inspect traffic

    Repeater
      → Manually modify and resend requests

    Intruder
      → Perform customised automated/manual attacks

    Decoder
      → Encode/decode data

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟢 TASK 6 — NAVIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite navigation is primarily performed using the top
navigation menu.

There are TWO levels of navigation:

    MAIN MENU
         │
         ▼
    MODULE
         │
         ▼
    SECOND MENU
         │
         ▼
    SUB-TAB

Example:

    Proxy
      │
      ├── Intercept
      ├── HTTP history
      ├── WebSockets history
      └── Proxy settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.1 MODULE SELECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The top row of the menu displays the available Burp modules.

Clicking a module switches the main workspace to that module.

Example:

    Dashboard → Dashboard
    Target    → Target functionality
    Proxy     → Proxy functionality
    Intruder  → Intruder functionality
    Repeater  → Repeater functionality

Example from the room:

    Dashboard
    Target
    Proxy  ← selected
    Intruder
    Repeater
    Collaborator
    Sequencer
    Decoder
    Comparer
    Logger
    Organizer
    Extensions
    Settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.2 SUB-TABS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Some Burp modules contain multiple sub-tabs.

These appear directly below the main navigation bar.

Example:

    ┌──────────────────────────────────────────────────────┐
    │ Dashboard Target Proxy Intruder Repeater ...         │
    ├──────────────────────────────────────────────────────┤
    │ Intercept │ HTTP history │ WebSockets history │ ... │
    └──────────────────────────────────────────────────────┘

For the Proxy module:

    Proxy
      │
      ├── Intercept
      ├── HTTP history
      ├── WebSockets history
      └── Proxy settings

The selected sub-tab determines what functionality is displayed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.3 DETACHING TABS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp allows tabs/modules to be detached into separate windows.

This can be useful when working with multiple Burp modules
simultaneously.

To detach a module:

    Window
       │
       ▼
    Detach
       │
       ▼
    Select module
       │
       ▼
    Module opens in separate window

Example options shown in the room:

    Detach Dashboard
    Detach Target
    Detach Proxy
    Detach Intruder
    Detach Repeater
    Detach Collaborator
    Detach Sequencer
    Detach Decoder
    Detach Comparer
    Detach Logger
    Detach Organizer
    Detach Extensions

A detached tab can later be reattached using the same interface.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.4 KEYBOARD SHORTCUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp provides keyboard shortcuts for quickly switching between
important modules.

Default shortcuts shown in the room:

    ┌──────────────────────┬─────────────────┐
    │ Shortcut             │ Tab             │
    ├──────────────────────┼─────────────────┤
    │ Ctrl + Shift + D     │ Dashboard       │
    │ Ctrl + Shift + T     │ Target          │
    │ Ctrl + Shift + P     │ Proxy           │
    │ Ctrl + Shift + I     │ Intruder        │
    │ Ctrl + Shift + R     │ Repeater        │
    └──────────────────────┴─────────────────┘

Memory:

    D → Dashboard
    T → Target
    P → Proxy
    I → Intruder
    R → Repeater

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 ROOM QUESTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Question:

    Which tab Ctrl + Shift + P will switch us to?

Answer:

    Proxy tab

Reason:

    Ctrl + Shift + P
           ↓
        Proxy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟢 TASK 7 — OPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before using the Burp Proxy, it is important to understand
Burp's configuration options.

Burp has TWO main types of settings:

    ┌─────────────────────────────────────────────┐
    │                 BURP SETTINGS               │
    ├──────────────────────┬──────────────────────┤
    │ Global / User        │ Project              │
    │ Settings             │ Settings             │
    ├──────────────────────┼──────────────────────┤
    │ Entire installation  │ Current project      │
    │ Persist across       │ Project-specific     │
    │ application starts   │ configuration        │
    └──────────────────────┴──────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.1 GLOBAL / USER SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Global settings are also referred to as User settings.

They affect the entire Burp Suite installation and are applied
whenever Burp is started.

Concept:

    User / Global Settings
            │
            ▼
    Entire Burp installation
            │
            ▼
    Applied across sessions

These provide a baseline configuration for the Burp environment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.2 PROJECT SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Project settings are specific to the current Burp project.

They apply only during the current project/session.

IMPORTANT:

Burp Suite Community Edition does NOT support saving projects.

Therefore, project-specific options in a Community Edition
temporary project will be lost when Burp is closed.

Concept:

    Project Settings
          │
          ▼
    Current Project
          │
          ▼
    Session
          │
          ▼
    Close Burp
          │
          ▼
    Project-specific configuration is lost
    (Community Edition)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.3 OPENING SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Settings button is located in the top navigation bar.

    Burp Suite
        │
        ▼
    Settings
        │
        ▼
    Separate Settings Window

The settings window provides access to many configurable options.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ SETTINGS WINDOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Settings window contains a menu on the left-hand side.

The room highlights three important navigation mechanisms:

    1. Search
    2. Type filter
    3. Categories

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.4 SEARCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Search field allows us to quickly find a specific setting
using keywords.

Example:

    Search:
        proxy

Burp will display settings related to the searched keyword.

This is useful because Burp contains a large number of
configuration options.

Memory:

    Need setting?
        ↓
    Search keyword
        ↓
    Find relevant option

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.5 TYPE FILTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The settings interface provides filters for:

    All
    User
    Project

Meaning:

    All
      → Show all available settings

    User
      → Show settings affecting the entire Burp installation

    Project
      → Show settings specific to the current project

Example:

    [ All ] [ User ] [ Project ]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.6 CATEGORIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Settings can also be accessed by category.

The room's example includes categories such as:

    Tools
      ├── Proxy
      ├── Intruder
      ├── Repeater
      ├── Sequencer
      └── Burp's browser

    Project
      ├── Scope
      ├── Collaborator
      ├── Tasks
      ├── Automatic backup
      └── Logging

    Sessions

    Network
      ├── Connections
      ├── TLS
      └── HTTP

    User interface
      ├── Inspector and message editor
      ├── Hotkeys
      └── Display

    Suite
      ├── REST API
      ├── Updates
      ├── Performance feedback
      └── Temporary files location

    Extensions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 EXAMPLE — TARGET SCOPE SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The room demonstrates:

    Project
       │
       ▼
    Scope
       │
       ▼
    Target scope

The Target scope configuration can define exactly which hosts
and URLs constitute the target for the current work.

Example:

    Include in scope:

        https://tryhackme.com/

The scope can contain:

    INCLUDE
       │
       └── Hosts / URLs we want to test

    EXCLUDE
       │
       └── Hosts / URLs we do NOT want to test

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟦 INCLUDE IN SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Include in scope section defines which targets are part of
the testing scope.

Example:

    Include in scope
         │
         └── https://tryhackme.com/

This tells Burp that this target belongs to the defined scope.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟥 EXCLUDE FROM SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Exclude from scope section allows specific hosts or URLs to
be excluded from the defined target scope.

Concept:

    Scope
      │
      ├── INCLUDE
      │     ├── target.com
      │     └── api.target.com
      │
      └── EXCLUDE
            └── target.com/logout

This is useful when certain endpoints should not be tested.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ QUICK ACCESS TO SPECIFIC SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Many Burp modules provide shortcuts directly to their relevant
settings.

For example:

    Proxy
      │
      └── Proxy settings

Clicking Proxy settings opens the settings window directly at
the relevant Proxy configuration section.

This avoids manually searching through the entire settings menu.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 PROXY SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Proxy module contains a:

    Proxy settings

button.

This provides direct access to configuration options controlling
the Proxy's behaviour and functionality.

Important Proxy configuration areas include:

    • Proxy listeners
    • Request interception rules
    • Response interception rules
    • Match and Replace
    • Other Proxy behaviour

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📡 PROXY LISTENERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Proxy uses proxy listeners to receive incoming HTTP requests
from the browser.

A listener can be configured with:

    Interface
       +
    Port

Example from the room:

    127.0.0.1:8080

Concept:

    Browser
       │
       │ HTTP request
       ▼
    127.0.0.1:8080
       │
       ▼
    Burp Proxy Listener

The browser must be configured to use one of Burp's listeners
as its proxy server.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 BURP CA CERTIFICATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Each Burp installation generates its own Certificate Authority
(CA) certificate.

The proxy listener can use this certificate when negotiating
TLS connections.

The CA certificate can be:

    • Imported
    • Exported
    • Regenerated

This becomes especially important when intercepting HTTPS traffic.

The HTTPS/TLS certificate process is covered later in the room.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 REQUEST INTERCEPTION RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Request interception rules control which requests are stalled
for viewing/editing in the Intercept tab.

The settings allow rules based on conditions such as:

    • File extension
    • Request
    • HTTP method
    • URL
    • Whether URL is in target scope

Example:

    Request
       │
       ▼
    Interception Rules
       │
       ├── Match file extension?
       ├── Match HTTP method?
       ├── Match request?
       └── Is URL in target scope?
              │
              ▼
          Intercept?

This allows Burp to avoid stopping every request.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔄 RESPONSE INTERCEPTION RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

By default, Burp does not intercept server responses unless
explicitly requested on a per-request basis.

The Response interception rules section can be enabled to control
which responses are stalled in the Intercept tab.

Rules can be based on conditions such as:

    • Content-Type header
    • Request modification status
    • Whether request was intercepted
    • Status code
    • URL / target scope

Example:

    Server Response
          │
          ▼
    Response Rules
          │
          ├── Content-Type = text?
          ├── Request modified?
          ├── Request intercepted?
          ├── Status code?
          └── URL in target scope?
                 │
                 ▼
             Intercept?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 MATCH AND REPLACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Match and Replace section allows regular expressions
(REGEX) to dynamically modify incoming and outgoing requests.

This can be useful for:

    • Modifying User-Agent
    • Manipulating cookies
    • Changing request headers
    • Automatically modifying traffic

Concept:

    Original Traffic
          │
          ▼
    Match condition
          │
          ▼
    Regex / replacement
          │
          ▼
    Modified Traffic
          │
          ▼
    Target

Example concept:

    User-Agent: Original
            │
            ▼
       Match & Replace
            │
            ▼
    User-Agent: Modified

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 TASK 7 — QUESTIONS & ANSWERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q1. In which category can you find a reference to a
"Cookie jar"?

    Answer:
    Sessions

Why?

    Settings
       ↓
    Sessions
       ↓
    Cookie jar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q2. In which base category can you find the "Updates"
sub-category, which controls the Burp Suite update behaviour?

    Answer:
    Suite

Path:

    Suite
      ↓
    Updates

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q3. What is the name of the sub-category which allows you
to change the keybindings for shortcuts in Burp Suite?

    Answer:
    Hotkeys

Path:

    User interface
          ↓
       Hotkeys
          ↓
    Change keybindings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Q4. If we have uploaded Client-Side TLS certificates, can we
override these on a per-project basis?

    Answer:
    Yes

Meaning:

    Client-Side TLS Certificates
             │
             ▼
    Can be overridden per project
             │
             ▼
           YES

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 IMPORTANT SETTINGS PATHS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Remember these paths from the room:

    Settings
       ├── Sessions
       │     └── Cookie jar
       │
       ├── Suite
       │     └── Updates
       │
       ├── User interface
       │     └── Hotkeys
       │
       └── Tools
             └── Proxy
                   └── Proxy settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ QUICK REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BURP NAVIGATION:

    Main Module
         ↓
    Sub-tab
         ↓
    Functionality

Example:

    Proxy
      ↓
    HTTP history
      ↓
    Review captured requests

KEY SHORTCUTS:

    Ctrl + Shift + D → Dashboard
    Ctrl + Shift + T → Target
    Ctrl + Shift + P → Proxy
    Ctrl + Shift + I → Intruder
    Ctrl + Shift + R → Repeater

SETTINGS:

    Global/User
        ↓
    Entire Burp installation

    Project
        ↓
    Current project/session

SETTINGS NAVIGATION:

    Search
      ↓
    Type Filter
      ↓
    Categories

PROXY:

    Browser
       ↓
    Proxy Listener
       ↓
    Request Interception
       ↓
    Target

IMPORTANT PROXY FEATURES:

    Proxy Listeners
    Request Interception Rules
    Response Interception Rules
    Match and Replace
    CA Certificate

SCOPE:

    Include in scope
          +
    Exclude from scope
          ↓
    Define testing target

## Interview Questions

Q1.
What are Burp's two main setting types?

Answer

User/global settings and project settings.

------------------------------------------------------------

Q2.
What happens to project-specific settings in Burp Community when Burp is closed?

Answer

Community Edition does not support saving projects, so
project-specific options are lost when the temporary project
is closed.

------------------------------------------------------------

Q3.
What is a Proxy Listener?

Answer

It is a Burp endpoint that listens for incoming HTTP/HTTPS
traffic from a configured client such as a browser.

------------------------------------------------------------

Q4.
What is the purpose of interception rules?

Answer

They determine which requests or responses should be stalled
for inspection and modification.

------------------------------------------------------------

Q5.
What does Match and Replace do?

Answer

It uses matching conditions, including regular expressions,
to automatically modify incoming or outgoing traffic.

------------------------------------------------------------

Q6.
Why is scope important?

Answer

It restricts testing and traffic analysis to the intended target,
reducing unnecessary traffic and helping prevent accidental
testing of out-of-scope systems.

------------------------------------------------------------

## 🧠 MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BURP NAVIGATION =

    M → Module
    S → Sub-tab
    D → Detach
    K → Keyboard shortcut

SETTINGS =

    S → Search
    T → Type filter
    C → Category

PROXY =

    L → Listener
    R → Request interception
    R → Response interception
    M → Match & Replace

Think:

    "Burp first finds the traffic,
     then controls the traffic."

Covered:

    ✓ Task 5 — The Dashboard
    ✓ Task 6 — Navigation
    ✓ Module selection
    ✓ Sub-tabs
    ✓ Detaching tabs
    ✓ Keyboard shortcuts
    ✓ Task 7 — Options
    ✓ Global/User settings
    ✓ Project settings
    ✓ Settings search/filter/categories
    ✓ Scope settings
    ✓ Proxy listeners
    ✓ CA certificates
    ✓ Request interception rules
    ✓ Response interception rules
    ✓ Match and Replace
    ✓ All Task 7 answers
    ✓ Quick revision
    ✓ Interview/practical questions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 BURP PROXY, FOXYPROXY, SITE MAP, BROWSER & SCOPING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🟢 TASK 8 — INTRODUCTION TO THE BURP PROXY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Burp Proxy is one of the most fundamental and important tools
inside Burp Suite.

Its main purpose is to capture HTTP/HTTPS requests and responses
between the user/browser and the target web server.

Basic architecture:

    Browser / Client
          │
          │ HTTP / HTTPS
          ▼
    ┌─────────────────┐
    │   Burp Proxy    │
    └─────────────────┘
          │
          │ HTTP / HTTPS
          ▼
    Target Web Server

Burp sits between the browser and the target.

This allows a penetration tester to:

    • Capture requests
    • Inspect requests
    • Modify requests
    • Forward requests
    • Drop requests
    • Send requests to other Burp tools
    • Capture and analyse responses
    • Review previous traffic

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 INTERCEPTING REQUESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When requests are made through the Burp Proxy, they can be
intercepted and held before reaching the target server.

The intercepted request appears in:

    Proxy
      ↓
    Intercept

While a request is intercepted, we can perform actions such as:

    Forward
    Drop
    Edit
    Send to another Burp module
    Other actions

Basic flow:

    Browser
       │
       ▼
    Burp Proxy
       │
       ▼
    INTERCEPT
       │
       ├── Forward → Target
       │
       ├── Drop → Request discarded
       │
       ├── Edit → Modify request
       │
       └── Action → Send/use request elsewhere

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔘 "INTERCEPT IS ON"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When:

    Intercept is on

Burp will hold matching requests in the Proxy → Intercept tab.

The browser may appear to hang because the request has not yet
been allowed to continue.

To allow the request to continue:

    Click "Forward"

To discard it:

    Click "Drop"

To stop intercepting requests:

    Click "Intercept is on"

which changes the state to:

    Intercept is off

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✏️ MODIFYING AN INTERCEPTED REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

An intercepted HTTP request can be modified before forwarding it.

Example:

    GET /profile?id=10 HTTP/1.1
    Host: target.local
    Cookie: session=abc123

Can be modified to:

    GET /profile?id=11 HTTP/1.1
    Host: target.local
    Cookie: session=abc123

Then:

    Modified Request
          │
          ▼
       Forward
          │
          ▼
    Target Server

This is one of the most important capabilities of Burp Proxy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎛️ TAKING CONTROL OF WEB TRAFFIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Intercepting requests gives penetration testers significant
control over web traffic.

This is particularly valuable when testing:

    • Authentication
    • Authorization
    • Session handling
    • Input validation
    • Parameter manipulation
    • Access controls
    • Web application logic

Mental model:

    Normal browser:

    Browser ───────────────────► Server

    With Burp:

    Browser
       │
       ▼
    Burp
       │
       ├── Inspect
       ├── Modify
       ├── Drop
       └── Forward
       │
       ▼
    Server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📜 CAPTURE & LOGGING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite captures and logs requests made through the proxy
by default, even when interception is turned off.

This means:

    Intercept OFF
         │
         ▼
    Requests still pass through Burp
         │
         ▼
    Burp can log them
         │
         ▼
    HTTP history

This is extremely useful for later analysis.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕘 HTTP HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Captured HTTP requests can be viewed in:

    Proxy
      ↓
    HTTP history

HTTP history provides a record of requests that passed through
the proxy.

Typical information includes:

    • Host
    • Method
    • URL
    • Parameters
    • Status code
    • Response length
    • MIME type
    • Extension
    • Title
    • Request number

Example:

    Host                 Method    URL
    ─────────────────────────────────────────
    assets.tryhackme.com GET      /js/popper.min.js
    assets.tryhackme.com GET      /js/jquery.min.js
    tryhackme.com        GET      /about
    tryhackme.com        GET      /business

This allows retrospective analysis of application traffic.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔌 WEBSOCKET SUPPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite can also capture and log WebSocket communication.

WebSockets are commonly used for real-time communication.

Examples:

    Browser
       │
       │ WebSocket
       ▼
    Burp Proxy
       │
       ▼
    Web Application

WebSocket traffic can be reviewed in:

    Proxy
      ↓
    WebSockets history

This is useful when analysing applications that use real-time
communication.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📚 LOGS AND HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp provides:

    HTTP history
          +
    WebSockets history

These allow previously captured traffic to be:

    • Reviewed
    • Analysed
    • Modified
    • Sent to other Burp modules

This is important because not every request needs to be intercepted
in real time.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ PROXY SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Proxy-specific settings can be accessed through:

    Proxy
      ↓
    Proxy settings

These settings provide extensive control over the behaviour and
functionality of the Burp Proxy.

Important sections include:

    • Proxy listeners
    • Request interception rules
    • Response interception rules
    • Match and Replace

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 RESPONSE INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

By default, Burp does NOT intercept server responses unless
explicitly requested on a per-request basis.

Response interception can be enabled using:

    Intercept responses based on the following rules

Then rules can define which responses should be stalled for
viewing/editing.

Example rule conditions shown in the room include:

    Content-Type header → Matches → text

    Request → Was modified

    Request → Was intercepted

    Status code → Does not match → ^304$

    URL → Is in target scope

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 MATCH AND REPLACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Match and Replace section allows regular expressions
(REGEX) to modify incoming and outgoing requests.

This can be used for dynamic changes such as:

    • Modifying User-Agent
    • Manipulating cookies
    • Changing headers
    • Altering request data

Flow:

    Incoming / Outgoing Request
              │
              ▼
        Match condition
              │
              ▼
        Regex / Replace
              │
              ▼
        Modified traffic

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 TASK 8 — KEY TAKEAWAYS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Proxy provides:

    ✓ Request interception
    ✓ Request modification
    ✓ Request forwarding
    ✓ Request dropping
    ✓ HTTP history
    ✓ WebSocket history
    ✓ Response interception
    ✓ Match and Replace
    ✓ Traffic logging

Most important mental model:

    CAPTURE
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    FORWARD / DROP
       ↓
    ANALYSE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟢 TASK 9 — CONNECTING THROUGH THE PROXY (FOXYPROXY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To use Burp Proxy with a normal web browser, the browser needs
to redirect its traffic through Burp.

This task demonstrates configuring Firefox using the
FoxyProxy extension.

NOTE:

    The instructions in this task are specific to Firefox.

If another browser is being used, an alternative proxy
configuration method may be required.

The TryHackMe AttackBox already has FoxyProxy installed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🦊 FOXYPROXY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FoxyProxy is a browser extension that makes it easier to manage
and switch proxy configurations.

Architecture:

    Firefox
       │
       ▼
    FoxyProxy
       │
       ▼
    Burp Proxy
       │
       ▼
    Target

The room uses:

    Proxy IP:
        127.0.0.1

    Port:
        8080

Therefore:

    127.0.0.1:8080

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 9.1 INSTALL FOXYPROXY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Install the FoxyProxy Basic extension.

However:

    AttackBox
       ↓
    FoxyProxy already installed

Therefore, when using the TryHackMe AttackBox, installation is
already handled.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 9.2 OPEN FOXYPROXY OPTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After installation, a FoxyProxy button appears at the top-right
of Firefox.

Click the FoxyProxy icon.

Then:

    FoxyProxy
       ↓
    Options

This opens the FoxyProxy configuration page.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 9.3 CREATE BURP PROXY CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Inside FoxyProxy Options:

    Click:
        Add

This creates a new proxy configuration.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 9.4 ADD PROXY DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Enter:

    Title:
        Burp

    Proxy Type:
        HTTP

    Proxy IP address / DNS name:
        127.0.0.1

    Port:
        8080

Username/password are optional and are not required for the
configuration used in this room.

Final configuration:

    ┌──────────────────────────────┐
    │ Name:       Burp             │
    │ Type:       HTTP             │
    │ IP:         127.0.0.1        │
    │ Port:       8080             │
    └──────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 9.5 SAVE CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Click:

    Save

The Burp proxy configuration is now stored in FoxyProxy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 9.6 ACTIVATE BURP PROXY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Click the FoxyProxy icon in Firefox.

Select:

    Burp

This redirects browser traffic through:

    127.0.0.1:8080

IMPORTANT:

    Burp Suite must be running.

Otherwise, the browser will not be able to successfully send
requests through the configured proxy.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 9.7 ENABLE BURP INTERCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Switch back to Burp Suite.

Go to:

    Proxy
      ↓
    Intercept

Make sure:

    Intercept is on

If it is off, requests will normally pass through without being
held in the Intercept tab.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 9.8 TEST THE PROXY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open Firefox and access the target:

    http://10.48.155.152/

Expected behaviour:

    Firefox
       │
       ▼
    FoxyProxy
       │
       ▼
    127.0.0.1:8080
       │
       ▼
    Burp
       │
       ▼
    Intercept
       │
       ▼
    Request appears in Burp

The browser may appear to hang.

This is expected because Burp is holding the request.

Click:

    Forward

to allow it to continue.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ IMPORTANT FOXYPROXY REMINDERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When:

    FoxyProxy = Burp
    +
    Burp Intercept = ON

The browser will appear to hang whenever a request is intercepted.

Therefore:

    Intercept ON
        ↓
    Browser requests can stop
        ↓
    Inspect / Modify
        ↓
    Forward

Do NOT accidentally leave interception enabled when you are not
trying to inspect requests.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📝 RIGHT-CLICK ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Right-clicking a request in Burp provides various actions.

These can include:

    • Forwarding
    • Dropping
    • Sending to other tools
    • Other request-related actions

This is useful when moving captured traffic between Burp modules.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ ATTACKBOX NOTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When using the AttackBox, other browser tabs may generate their
own WebSocket traffic.

Therefore, the room recommends considering closing other
AttackBox browser tabs before enabling interception.

Otherwise, you may receive WebSocket requests instead of the
requests from the target VM.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟢 TASK 10 — SITE MAP AND ISSUE DEFINITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Target tab provides more than simply controlling the scope
of testing.

It contains three important sub-tabs:

    Target
      │
      ├── Site map
      ├── Issue definitions
      └── Scope settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗺️ 10.1 SITE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Site map maps the web application into a tree structure.

Every page visited while the proxy is active can appear in the
site map.

Example:

    Target
      │
      └── Site map
            │
            ├── /
            ├── /login
            ├── /about
            ├── /admin
            └── /api
                  ├── /users
                  └── /products

This allows us to understand the application's structure.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕷️ AUTOMATED CRAWLING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

In Burp Suite Professional, the Site map can also be used for
automated crawling.

Professional functionality can:

    Start at target
          │
          ▼
    Explore links
          │
          ▼
    Discover pages
          │
          ▼
    Build site map

However, even Burp Community can accumulate data in the Site map
while we browse through the application.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔌 SITE MAP & APIs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The Site map is particularly useful for API enumeration.

If a web application accesses an API endpoint through Burp,
that endpoint can be captured and represented in the Site map.

Example:

    Website
       │
       ├── /login
       ├── /dashboard
       └── /api
             ├── /users
             ├── /products
             └── /orders

Therefore:

    Browse application
          ↓
    Capture requests
          ↓
    Site map grows
          ↓
    Discover endpoints

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📋 10.2 ISSUE DEFINITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite Community does not include the full vulnerability
scanning functionality available in Burp Professional.

However, Community still provides access to the list of
vulnerabilities that the scanner looks for.

This is available through:

    Target
      ↓
    Issue definitions

Issue definitions provide:

    • Vulnerability names
    • Descriptions
    • References
    • Information useful for understanding vulnerabilities

This can be useful when:

    • Writing reports
    • Understanding vulnerabilities
    • Describing findings
    • Researching a vulnerability manually

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 10.3 SCOPE SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scope settings control which domains/IPs are considered part
of the target.

Concept:

    Scope
      │
      ├── Include targets
      │
      └── Exclude targets

Purpose:

    Focus testing
       +
    Avoid unnecessary traffic
       +
    Reduce accidental out-of-scope requests

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 TASK 10 CHALLENGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Target:

    http://10.48.155.152/

The room asks us to:

    1. Visit the target.
    2. Visit every other page linked from the homepage.
    3. Check the Site map.
    4. Identify an unusual endpoint.
    5. Visit the unusual endpoint.
    6. Obtain the flag.

The unusual endpoint contains the room's flag.

Flag shown in the completed task:

    THM{NmNIZTINGE1MWU1ZTQzMzgzNmFiNWVk}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 SITE MAP ENUMERATION WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Target
      │
      ▼
    http://10.48.155.152/
      │
      ▼
    Browse homepage
      │
      ▼
    Visit linked pages
      │
      ▼
    Burp captures requests
      │
      ▼
    Target → Site map
      │
      ▼
    Inspect endpoints
      │
      ▼
    Find unusual endpoint
      │
      ▼
    Visit endpoint
      │
      ▼
    Flag

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟢 TASK 11 — THE BURP SUITE BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite includes its own built-in Chromium-based browser.

This browser is already configured to use the Burp Proxy.

Therefore, unlike Firefox + FoxyProxy, no manual browser proxy
configuration is required.

Architecture:

    Burp Browser
         │
         ▼
    Burp Proxy
         │
         ▼
    Target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 OPEN BURP BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To start the built-in browser:

    Proxy
      ↓
    Open browser

A Chromium window will open.

Any requests made inside this browser will automatically pass
through Burp.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ BURP BROWSER & LINUX ROOT USER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When running Burp Suite on Linux as the root user, the Burp
Browser may fail to start.

The reason is related to the browser's sandbox environment.

The TryHackMe AttackBox runs Burp in an environment where this
issue may occur.

The room gives TWO solutions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧑‍💻 SOLUTION 1 — SMART OPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create a new user and run Burp Suite under a low-privilege account.

Concept:

    Root user
       │
       ▼
    Create normal user
       │
       ▼
    Run Burp as low-privilege user
       │
       ▼
    Burp Browser sandbox works normally

This is considered the smarter option because it preserves the
browser sandbox and follows the principle of least privilege.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ SOLUTION 2 — EASY OPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Navigate to:

    Settings
      ↓
    Tools
      ↓
    Burp's browser

Enable:

    Allow Burp's browser to run without a sandbox

This allows the browser to start without a sandbox.

However:

    ⚠️ This option is disabled by default for security reasons.

Why?

If the browser becomes compromised while running without a
sandbox, an attacker may potentially gain access to the entire
machine.

Therefore:

    No sandbox
        ↓
    Less isolation
        ↓
    Higher security risk

The room notes that this is less concerning in the isolated
AttackBox training environment, but it should still be used
responsibly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟢 TASK 12 — SCOPING AND TARGETING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scoping is one of the most important aspects of using the
Burp Proxy.

If Burp captures and logs everything, the amount of traffic can
quickly become overwhelming.

Scoping allows us to restrict Burp to the web application(s)
that we actually want to test.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 WHY SCOPING MATTERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Without scope:

    Browser
       │
       ├── Target traffic
       ├── Google
       ├── Cloudflare
       ├── Other websites
       ├── Background requests
       ├── WebSockets
       └── Other services
              │
              ▼
            BURP
              │
              ▼
       Huge amount of traffic

With scope:

    Browser
       │
       ├── Target traffic ─────► Burp
       │
       └── Other traffic ──────► Ignore

This results in a much cleaner traffic view.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ➕ ADD TARGET TO SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The easiest method described in the room:

    Target
      ↓
    Site map
      ↓
    Right-click target
      ↓
    Add to scope

Burp will ask whether we want to stop logging anything that is
not in scope.

In most cases, select:

    Yes

Example:

    https://tryhackme.com/
          │
          ▼
    Right-click
          │
          ▼
    Add to scope
          │
          ▼
    Target becomes in-scope

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗂️ SCOPE SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scope can also be managed from:

    Target
      ↓
    Scope settings

The Scope settings window allows us to:

    Include domains/IPs
          +
    Exclude domains/IPs

This provides detailed control over the testing scope.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟦 INCLUDE / EXCLUDE SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Example:

    INCLUDE:

        target.com
        api.target.com

    EXCLUDE:

        target.com/logout
        target.com/static

The actual scope depends on the engagement requirements.

The key idea is:

    INCLUDE = Test this

    EXCLUDE = Do not test this

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 IMPORTANT — SCOPE DOES NOT AUTOMATICALLY STOP
## INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Even if logging for out-of-scope traffic is disabled, Burp can
still intercept traffic.

Therefore, another setting is required.

Go to:

    Settings
      ↓
    Tools
      ↓
    Proxy
      ↓
    Request interception rules

Then enable/use:

    URL
       ↓
    Is in target scope

This ensures that interception is restricted to the defined
scope.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 INTERCEPT ONLY IN-SCOPE TRAFFIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The relevant interception rule is:

    URL → Is in target scope

Concept:

    Browser Request
          │
          ▼
    Is URL in target scope?
          │
       ┌──┴──┐
      YES    NO
       │      │
       ▼      ▼
    Intercept  Ignore
       │
       ▼
      Burp

This prevents Burp from unnecessarily stopping traffic that is
outside the target.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧹 SCOPE + PROXY = CLEAN TRAFFIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Best practice:

    1. Define target scope
           │
           ▼
    2. Add target to scope
           │
           ▼
    3. Disable/stop logging out-of-scope traffic
           │
           ▼
    4. Configure interception rule
           │
           ▼
    5. URL is in target scope
           │
           ▼
    6. Intercept only target traffic

Result:

    Cleaner Burp traffic
          +
    Less noise
          +
    Better focus
          +
    Lower risk of accidental testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 TASK 12 PRACTICAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Target:

    http://10.48.155.152/

The task asks us to:

    1. Add the target to Burp's scope.
    2. Change Proxy settings so that only traffic to
       in-scope targets is intercepted.
    3. Observe the difference in traffic before and after
       limiting the scope.

Target:

    http://10.48.155.152/

Scope:

    INCLUDE
       │
       └── http://10.48.155.152/

Interception:

    URL
       ↓
    Is in target scope
       ↓
    Intercept

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 COMPLETE PART 4 FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Browser
       │
       ▼
    FoxyProxy
       │
       ▼
    127.0.0.1:8080
       │
       ▼
    Burp Proxy
       │
       ├── Intercept
       │
       ├── HTTP History
       │
       ├── WebSockets History
       │
       └── Proxy Settings
       │
       ▼
    Target
       │
       ▼
    Site Map
       │
       ├── Pages
       ├── Endpoints
       └── APIs
       │
       ▼
    Define Scope
       │
       ▼
    URL is in target scope
       │
       ▼
    Intercept only target traffic

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ QUICK REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BURP PROXY:

    Browser
       ↓
    Burp
       ↓
    Target

INTERCEPT:

    Intercept ON
       ↓
    Request is held
       ↓
    Forward / Drop / Modify

HISTORY:

    HTTP History
       ↓
    Review HTTP traffic

    WebSockets History
       ↓
    Review WebSocket traffic

FOXYPROXY:

    Firefox
       ↓
    FoxyProxy
       ↓
    127.0.0.1:8080
       ↓
    Burp

SITE MAP:

    Browse target
       ↓
    Requests captured
       ↓
    Site Map
       ↓
    Discover pages/endpoints/APIs

ISSUE DEFINITIONS:

    Target
       ↓
    Issue definitions
       ↓
    Vulnerability references/descriptions

BURP BROWSER:

    Chromium
       ↓
    Built-in Burp Proxy
       ↓
    No manual proxy setup

SCOPING:

    Target
       ↓
    Add to scope
       ↓
    Include / Exclude
       ↓
    URL is in target scope
       ↓
    Intercept only intended traffic

## Interview Questions

Q1.
What is Burp Proxy?

Answer

It is an intermediary proxy that allows a security tester to
capture, inspect, modify and forward HTTP/HTTPS traffic between
a client and a target server.

------------------------------------------------------------

Q2.
What is the difference between Intercept and HTTP History?

Answer

Intercept holds requests for immediate inspection/modification,
while HTTP History records requests for later analysis.

------------------------------------------------------------

Q3.
Does Burp log traffic when Intercept is off?

Answer

Yes. Burp can still capture and log requests in HTTP history even
when interception is disabled.

------------------------------------------------------------

Q4.
What is FoxyProxy used for?

Answer

It provides an easy way to configure Firefox to send traffic
through a proxy such as Burp Suite.

------------------------------------------------------------

Q5.
What proxy configuration is used in this room?

Answer

127.0.0.1:8080

------------------------------------------------------------

Q6.
Why does the browser hang when Intercept is enabled?

Answer

Because Burp has intercepted the request and is waiting for the
tester to forward or drop it.

------------------------------------------------------------

Q7.
What is the Burp Site Map?

Answer

It is a tree representation of resources and endpoints discovered
while browsing a target through Burp.

------------------------------------------------------------

Q8.
Why is the Site Map useful for API testing?

Answer

API endpoints accessed by the web application can appear in the
Site Map, helping testers discover and map API functionality.

------------------------------------------------------------

Q9.
What are Issue definitions?

Answer

They provide information, descriptions and references for
vulnerability types that Burp's scanner can look for.

------------------------------------------------------------

Q10.
Why is scope important?

Answer

It limits testing and traffic analysis to intended targets,
reducing noise and helping prevent accidental out-of-scope
testing.

------------------------------------------------------------

Q11.
Does adding a target to scope automatically stop all out-of-scope interception?

Answer

No. The Proxy interception rules should also be configured so
that the URL is required to be in the target scope.

------------------------------------------------------------

Q12.
What rule can be used to intercept only in-scope URLs?

Answer

URL → Is in target scope

------------------------------------------------------------

Q13.
Why might Burp Browser fail when Burp is running as root on Linux?

Answer

The browser may be unable to create its required sandbox
environment.

------------------------------------------------------------

Q14.
What is the safer solution for the Burp Browser sandbox problem?

Answer

Run Burp under a low-privilege user instead of root.

------------------------------------------------------------

Q15.
What is the easy workaround?

Answer

Enable:

    Settings → Tools → Burp's browser
    → Allow Burp's browser to run without a sandbox

But this reduces browser isolation and therefore has security
implications.

------------------------------------------------------------

## 🧠 MEMORY TRICKS — PART 4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROXY:

    I → Intercept
    H → HTTP History
    W → WebSocket History
    S → Settings

FOXYPROXY:

    F → Firefox
    F → FoxyProxy
    B → Burp
    T → Target

SITE MAP:

    B → Browse
    C → Capture
    M → Map
    F → Find endpoints

SCOPE:

    I → Include
    E → Exclude
    T → Target
    I → Intercept only in-scope

Remember:

    "MAP FIRST → SCOPE SECOND → TEST THIRD"

Covered:

    ✓ Task 8 — Introduction to Burp Proxy
    ✓ Request interception
    ✓ Forward / Drop / Modify
    ✓ Intercept ON/OFF
    ✓ Request logging
    ✓ HTTP history
    ✓ WebSocket history
    ✓ Response interception
    ✓ Match and Replace
    ✓ Task 9 — FoxyProxy
    ✓ FoxyProxy configuration
    ✓ 127.0.0.1:8080
    ✓ Activating proxy
    ✓ Testing intercepted traffic
    ✓ AttackBox WebSocket note
    ✓ Task 10 — Site Map
    ✓ Automated crawling concept
    ✓ API endpoint mapping
    ✓ Issue definitions
    ✓ Scope settings
    ✓ Task 10 unusual endpoint challenge
    ✓ Flag
    ✓ Task 11 — Burp Suite Browser
    ✓ Chromium-based browser
    ✓ Root/sandbox issue
    ✓ Smart solution
    ✓ Easy solution
    ✓ Task 12 — Scoping and Targeting
    ✓ Add to scope
    ✓ Include/exclude scope
    ✓ Out-of-scope traffic
    ✓ In-scope interception rule
    ✓ Practical workflow
    ✓ Interview questions
    ✓ Quick revision
    ✓ Memory tricks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 PROXYING HTTPS + EXAMPLE ATTACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🟢 TASK 13 — PROXYING HTTPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

So far, Burp Proxy has been used to intercept HTTP traffic.

However, modern web applications primarily use:

    HTTPS

HTTPS encrypts communication between the browser and the server.

Without additional configuration:

    Browser
       │
       │ HTTPS / Encrypted
       ▼
    Burp Proxy
       │
       ▼
    Target

Burp cannot simply read the encrypted HTTPS contents.

To inspect HTTPS traffic, Burp needs to act as a trusted
Certificate Authority (CA) for the browser.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 13.1 WHY HTTPS NEEDS SPECIAL CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Normal HTTPS communication:

    Browser
       │
       │ Encrypted TLS connection
       ▼
    Web Server

The browser verifies that the server's certificate is trusted.

When Burp is placed in the middle:

    Browser
       │
       │ HTTPS
       ▼
    BURP
       │
       │ HTTPS
       ▼
    Web Server

Burp creates a TLS connection with the browser and another TLS
connection with the target server.

Conceptually:

    Browser
       │
       │ TLS
       ▼
    Burp CA / Burp Proxy
       │
       │ TLS
       ▼
    Target Server

Therefore, the browser must trust Burp's CA certificate.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ 13.2 BURP CERTIFICATE AUTHORITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Each Burp Suite installation generates its own Certificate
Authority certificate.

This certificate allows Burp to generate certificates for
websites being intercepted.

The browser must trust:

    PortSwigger CA

Once trusted, Burp can intercept HTTPS traffic without the
browser rejecting the connection.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 13.3 ACCESSING THE BURP CERTIFICATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With the browser configured to use Burp, open:

    http://burp/

This is a special local page provided by Burp.

From this page, select:

    CA Certificate

The certificate is downloaded as:

    cert.der

Important:

    http://burp/cert

can also be used to access the certificate directly.

The room uses:

    http://burp/cert

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📥 13.4 DOWNLOAD cert.der
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Workflow:

    Firefox
       │
       ▼
    http://burp/cert
       │
       ▼
    Download certificate
       │
       ▼
    cert.der

The downloaded file is Burp's CA certificate.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🦊 13.5 IMPORT CERTIFICATE INTO FIREFOX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open Firefox settings.

Navigate to:

    Firefox
       ↓
    Settings
       ↓
    Privacy & Security
       ↓
    Certificates
       ↓
    View Certificates

This opens Firefox's certificate management interface.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📜 13.6 CERTIFICATE AUTHORITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Inside the certificate manager:

    Authorities
       ↓
    Import

Select:

    cert.der

Firefox will ask whether the certificate should be trusted.

Enable:

    Trust this CA to identify websites.

Then confirm the import.

The important CA is:

    PortSwigger CA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 TRUST CHAIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before importing:

    Firefox
       │
       ▼
    HTTPS Certificate
       │
       ▼
    Burp-generated certificate
       │
       ▼
     CA not trusted

After importing:

    Firefox
       │
       ▼
    PortSwigger CA
       │
       ▼
    Burp-generated certificate
       │
       ▼
    ✅ Trusted

Now Firefox accepts Burp-generated certificates for intercepted
HTTPS connections.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔄 13.7 HTTPS INTERCEPTION FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After the CA certificate has been trusted:

    Browser
       │
       │ HTTPS Request
       ▼
    Burp Proxy
       │
       │ TLS connection with Browser
       ▼
    Browser trusts PortSwigger CA
       │
       ▼
    Burp decrypts/inspects traffic
       │
       │ New TLS connection
       ▼
    Target Server

Response:

    Target Server
       │
       ▼
    Burp
       │
       │ Inspect / modify
       ▼
    Browser

Therefore:

    HTTPS
      ↓
    Burp CA
      ↓
    Certificate trusted
      ↓
    HTTPS interception works

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 13.8 SECURITY IMPLICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Installing a CA certificate gives that CA significant trust
within the browser.

Therefore:

    PortSwigger CA
         ↓
    Can issue certificates trusted by Firefox
         ↓
    Burp can intercept HTTPS traffic

This is powerful and should only be done in an authorised
testing environment.

Never install an unknown CA certificate into your normal system
without understanding and trusting its source.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 13.9 VERIFY HTTPS INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After importing the certificate:

    1. Keep FoxyProxy configured for Burp.
    2. Keep Burp running.
    3. Ensure the PortSwigger CA is trusted.
    4. Open an HTTPS website.
    5. Observe the request in Burp Proxy.

Expected flow:

    HTTPS Website
         │
         ▼
    Firefox
         │
         ▼
    FoxyProxy
         │
         ▼
    127.0.0.1:8080
         │
         ▼
    Burp Proxy
         │
         ▼
    Intercept HTTPS Request
         │
         ▼
    Target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 TASK 13 — KEY TAKEAWAYS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTPS traffic is encrypted.

Burp needs a trusted CA certificate to intercept HTTPS.

Certificate:

    PortSwigger CA

Download:

    http://burp/cert

File:

    cert.der

Firefox path:

    Settings
       ↓
    Privacy & Security
       ↓
    Certificates
       ↓
    View Certificates
       ↓
    Authorities
       ↓
    Import

Trust option:

    Trust this CA to identify websites

Result:

    HTTPS traffic can be intercepted by Burp.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟢 TASK 14 — EXAMPLE ATTACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The final practical section demonstrates how Burp can be used
to modify a request and test a web application vulnerability.

The example focuses on:

    Cross-Site Scripting
        ↓
    XSS

The target application contains a support/contact form.

The form has client-side validation/filtering.

Burp allows us to intercept and modify the request before it
reaches the server.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 14.1 WHAT IS XSS?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cross-Site Scripting (XSS) is a web vulnerability where
attacker-controlled input can be interpreted as JavaScript
by a victim's browser.

Basic concept:

    User Input
        │
        ▼
    Web Application
        │
        ▼
    Unsafe Output
        │
        ▼
    Browser
        │
        ▼
    JavaScript Executes

XSS can potentially allow malicious script execution in the
security context of the vulnerable web application.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 14.2 CLIENT-SIDE VALIDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Web applications may perform validation in the browser.

Example:

    User
      │
      ▼
    Form
      │
      ▼
    JavaScript validation
      │
      ├── Valid → Submit
      │
      └── Invalid → Block
      │
      ▼
    Server

A security tester should not assume that client-side validation
is sufficient protection.

Why?

Because the tester can intercept the HTTP request after the
browser has created it and modify it before forwarding it.

Concept:

    Browser
       │
       ▼
    Client-side filter
       │
       ▼
    Request
       │
       ▼
    BURP
       │
       ├── Modify
       │
       ▼
    Server

This demonstrates an important security principle:

    Client-side validation
        ≠
    Trusted security boundary

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 14.3 SUPPORT FORM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The target contains a support/contact form.

The browser performs validation on the input.

The exercise demonstrates how Burp can bypass the browser-side
restriction by modifying the intercepted HTTP request.

General workflow:

    Open support form
          │
          ▼
    Enter input
          │
          ▼
    Submit form
          │
          ▼
    Burp intercepts request
          │
          ▼
    Modify request
          │
          ▼
    Forward request
          │
          ▼
    Application processes modified input

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 14.4 INTERCEPT THE REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before submitting the form:

    Burp
      ↓
    Proxy
      ↓
    Intercept
      ↓
    Intercept is ON

Then submit the form.

The request will be captured by Burp.

Example conceptual request:

    POST /support HTTP/1.1
    Host: 10.48.155.152
    Content-Type: application/x-www-form-urlencoded

    ...

The exact request structure depends on the application.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✏️ 14.5 MODIFY THE REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Once the request is intercepted, locate the parameter containing
the submitted form data.

The tester can modify that value directly in Burp.

This bypasses restrictions that exist only in the browser.

Concept:

    Original:

    User Input
        ↓
    Browser Validation
        ↓
    HTTP Request
        ↓
    Burp

Modified:

    HTTP Request
        ↓
    Burp
        ↓
    Modify Parameter
        ↓
    Forward
        ↓
    Server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 💥 14.6 XSS PAYLOAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The room demonstrates an XSS payload through the intercepted
request.

The purpose is to prove that attacker-controlled JavaScript can
reach the vulnerable application despite client-side filtering.

Conceptually:

    <script>
        JavaScript
    </script>

The exact payload used in the exercise is submitted through the
intercepted request.

IMPORTANT:

    The key lesson is not simply memorising the payload.

    The important concept is:

        Client-side filter
             ↓
        Request interception
             ↓
        Modify request
             ↓
        Server receives modified input
             ↓
        Vulnerability demonstrated

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔡 14.7 URL ENCODING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Special characters can be URL encoded before sending a request.

Burp provides a shortcut:

    Ctrl + U

This performs URL encoding on selected text.

Example:

    <

becomes:

    %3C

and:

    >

becomes:

    %3E

Therefore:

    <script>

contains characters that can be represented using URL encoding.

General idea:

    Raw data
       │
       ▼
    URL Encode
       │
       ▼
    HTTP request
       │
       ▼
    Server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔄 14.8 SEND THE MODIFIED REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After modifying the request:

    Modified Request
          │
          ▼
       Forward
          │
          ▼
    Target Server
          │
          ▼
    Application processes input
          │
          ▼
    XSS behaviour demonstrated

The browser/application produces the success result shown in
the room.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 14.9 "SUCC3SSFUL XSS"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The challenge indicates success with:

    Succ3ssful XSS

This confirms that the XSS payload was successfully processed.

The important takeaway is:

    Browser-side protection
            ↓
       Can be bypassed
            ↓
       Using intercepted request
            ↓
       Server-side validation is essential

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 14.10 SECURITY LESSON — CLIENT VS SERVER VALIDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A critical web security principle:

    NEVER TRUST CLIENT-SIDE VALIDATION ALONE.

Why?

The client is controlled by the user.

Anything enforced only by:

    • JavaScript
    • Browser UI
    • HTML validation
    • Client-side filters

can potentially be bypassed or modified.

Security-sensitive validation should occur on the server.

Correct architecture:

    User Input
       │
       ▼
    Client Validation
       │
       ▼
    HTTP Request
       │
       ▼
    SERVER-SIDE VALIDATION
       │
       ▼
    Safe Processing
       │
       ▼
    Database / Output

Client-side validation is useful for:

    • User experience
    • Immediate feedback
    • Reducing invalid submissions

But it should NOT be the only security control.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 14.11 BURP + XSS ATTACK FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    User opens form
          │
          ▼
    Enter input
          │
          ▼
    Client-side filter
          │
          ▼
    HTTP Request
          │
          ▼
    Burp Proxy
          │
          ▼
    Intercept
          │
          ▼
    Modify parameter
          │
          ▼
    URL encode if required
          │
          ▼
    Forward
          │
          ▼
    Server
          │
          ▼
    Application processes input
          │
          ▼
    XSS executes
          │
          ▼
    "Succ3ssful XSS"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔍 14.12 WHAT THIS ATTACK TEACHES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This example demonstrates several important concepts at once.

    1. Browser traffic can be intercepted.

    2. HTTP requests can be modified.

    3. Client-side validation can be bypassed.

    4. Parameters should not be trusted simply because the
       browser validated them.

    5. Server-side input validation is required.

    6. Burp can be used to verify whether security controls
       actually work.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 14.13 DEFENSIVE VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Developers should:

    ✓ Validate input on the server
    ✓ Properly encode output
    ✓ Use context-aware escaping
    ✓ Avoid unsafe HTML injection
    ✓ Implement appropriate Content Security Policy
    ✓ Treat all client input as untrusted
    ✓ Test security controls independently of browser behaviour

Security model:

    Client input
         │
         ▼
    UNTRUSTED
         │
         ▼
    Server validation
         │
         ▼
    Safe processing
         │
         ▼
    Proper output encoding
         │
         ▼
    Browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🟢 TASK 15 — CONCLUSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Congratulations!

You have completed:

    BURP SUITE: THE BASICS

The room introduced the core concepts required to begin using
Burp Suite for web application security testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📚 15.1 WHAT WAS LEARNED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Throughout the room we learned:

    ✓ What Burp Suite is
    ✓ Burp Suite Community Edition
    ✓ Burp Suite Professional
    ✓ Burp Dashboard
    ✓ Burp navigation
    ✓ Burp settings
    ✓ Global/User settings
    ✓ Project settings
    ✓ Proxy
    ✓ Proxy listeners
    ✓ Request interception
    ✓ Response interception
    ✓ HTTP history
    ✓ WebSocket history
    ✓ Match and Replace
    ✓ FoxyProxy
    ✓ 127.0.0.1:8080
    ✓ Site Map
    ✓ Issue definitions
    ✓ Burp Suite Browser
    ✓ Browser sandbox
    ✓ Scoping
    ✓ HTTPS interception
    ✓ PortSwigger CA
    ✓ cert.der
    ✓ XSS testing
    ✓ Client-side validation bypass
    ✓ URL encoding
    ✓ Request manipulation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 15.2 COMPLETE BURP WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    START
                      │
                      ▼
               Launch Burp Suite
                      │
                      ▼
               Create Project
                      │
                      ▼
               Configure Proxy
                      │
                      ▼
              Browser → Burp
                      │
                      ▼
                 Define Scope
                      │
                      ▼
                Browse Target
                      │
                      ▼
                 HTTP History
                      │
                      ▼
                  Site Map
                      │
                      ▼
              Discover Endpoints
                      │
                      ▼
              Intercept Requests
                      │
                      ▼
              Modify Parameters
                      │
                      ▼
              Send to Repeater
                      │
                      ▼
             Test Application Logic
                      │
                      ▼
            Validate Vulnerability
                      │
                      ▼
                   REPORT
                      │
                      ▼
                     END

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚀 15.3 WHAT TO LEARN NEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The room specifically points towards:

    Burp Suite Repeater

Repeater is one of the most important tools for manual web
application testing.

Learning path:

    Burp Basics
         │
         ▼
    Proxy
         │
         ▼
    Repeater
         │
         ▼
    Manual Request Manipulation
         │
         ▼
    Web Application Vulnerabilities
         │
         ▼
    Advanced Burp Workflows

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 FINAL TAKEAWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The most important lesson from this room is:

    "Burp gives you control over web application traffic."

Instead of only interacting with a web application through its
visible interface, Burp allows you to inspect what is actually
being sent between the client and server.

    Browser
       │
       ▼
    HTTP Request
       │
       ▼
    BURP
       │
       ├── Read
       ├── Modify
       ├── Replay
       ├── Drop
       └── Analyse
       │
       ▼
    Server

This is the foundation of manual web application penetration
testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ QUICK REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTPS:

    HTTPS
      ↓
    Encrypted traffic
      ↓
    Burp CA required
      ↓
    Download cert.der
      ↓
    Import into Firefox
      ↓
    Trust PortSwigger CA
      ↓
    HTTPS interception works

CERTIFICATE:

    URL:
        http://burp/cert

    File:
        cert.der

    CA:
        PortSwigger CA

    Firefox:
        Settings
        → Privacy & Security
        → Certificates
        → View Certificates
        → Authorities
        → Import

XSS:

    Input
      ↓
    Client-side validation
      ↓
    HTTP request
      ↓
    Burp
      ↓
    Modify request
      ↓
    Forward
      ↓
    Server
      ↓
    XSS

IMPORTANT:

    Client-side validation
        ≠
    Security boundary

## Interview Questions

Q1.
Why is a CA certificate required for HTTPS interception?

Answer

Because HTTPS traffic is encrypted using TLS. Burp needs to
establish trusted TLS connections with the browser and generate
certificates for intercepted sites. The browser must therefore
trust Burp's CA certificate.

------------------------------------------------------------

Q2.
What certificate does Burp use?

Answer

PortSwigger CA

------------------------------------------------------------

Q3.
Where can the Burp CA certificate be downloaded?

Answer

http://burp/cert

------------------------------------------------------------

Q4.
What is the downloaded certificate file called?

Answer

cert.der

------------------------------------------------------------

Q5.
What does importing the PortSwigger CA into Firefox allow?

Answer

It allows Firefox to trust certificates generated by Burp,
enabling HTTPS traffic interception.

------------------------------------------------------------

Q6.
Why should client-side validation not be trusted for security?

Answer

Because the client is controlled by the user and requests can be
modified before reaching the server.

------------------------------------------------------------

Q7.
What is XSS?

Answer

Cross-Site Scripting is a vulnerability where attacker-controlled
input can be interpreted as executable script in a victim's
browser.

------------------------------------------------------------

Q8.
How does Burp help test XSS?

Answer

It allows the tester to intercept and modify the HTTP request,
including parameters containing user input, and then forward the
modified request to the server.

------------------------------------------------------------

Q9.
What is the purpose of URL encoding in Burp?

Answer

It converts characters into URL-safe encoded representations
that can be transmitted as part of an HTTP request.

------------------------------------------------------------

Q10.
What shortcut is used for URL encoding in the room?

Answer

Ctrl + U

------------------------------------------------------------

## 🧠 MEMORY TRICKS — PART 5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTPS:

    C → CA
    D → cert.der
    I → Import
    T → Trust
    H → HTTPS interception

Remember:

    "CA → DER → IMPORT → TRUST → INTERCEPT"

XSS:

    I → Input
    F → Filter
    B → Burp
    M → Modify
    F → Forward
    X → XSS

Remember:

    "INPUT → BURP → MODIFY → FORWARD → TEST"

DEFENSIVE:

    Client validation
          ↓
       Helpful
          ↓
    NOT sufficient

    Server validation
          ↓
       Required

Covered:

    ✓ Task 13 — Proxying HTTPS
    ✓ HTTPS encryption
    ✓ TLS interception
    ✓ PortSwigger CA
    ✓ http://burp/cert
    ✓ cert.der
    ✓ Firefox certificate management
    ✓ Authorities
    ✓ Trust CA to identify websites
    ✓ HTTPS interception workflow
    ✓ CA security implications
    ✓ Task 14 — Example Attack
    ✓ XSS
    ✓ Support form
    ✓ Client-side validation
    ✓ Request interception
    ✓ Request modification
    ✓ URL encoding
    ✓ Ctrl + U
    ✓ Successful XSS demonstration
    ✓ Client-side vs server-side validation
    ✓ Defensive considerations
    ✓ Task 15 — Conclusion
    ✓ Complete Burp workflow
    ✓ Next learning step: Repeater
    ✓ Interview questions
    ✓ Quick revision
    ✓ Memory tricks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 BURP SUITE: THE BASICS — ROOM COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASKS:

    ✓ Task 1  — Introduction
    ✓ Task 2  — What is Burp Suite?
    ✓ Task 3  — Features of Burp Community
    ✓ Task 4  — Installation
    ✓ Task 5  — The Dashboard
    ✓ Task 6  — Navigation
    ✓ Task 7  — Options
    ✓ Task 8  — Introduction to Burp Proxy
    ✓ Task 9  — Connecting through the Proxy
    ✓ Task 10 — Site Map and Issue Definitions
    ✓ Task 11 — The Burp Suite Browser
    ✓ Task 12 — Scoping and Targeting
    ✓ Task 13 — Proxying HTTPS
    ✓ Task 14 — Example Attack
    ✓ Task 15 — Conclusion

STATUS:

    ████████████████████████████████████████ 100%

CORE SKILL ACQUIRED:

    Browser
       ↓
    Proxy
       ↓
    Intercept
       ↓
    Inspect
       ↓
    Modify
       ↓
    Forward
       ↓
    Analyse
       ↓
    Test
       ↓
    Secure

NEXT:

    → Burp Suite Repeater
    → Manual Web Application Testing
    → Advanced Web Security

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 COMPLETE BURP SUITE CHEAT SHEET + FINAL REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎯 PURPOSE OF THIS PART
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This section combines the most important practical concepts from
the complete:

    BURP SUITE: THE BASICS

room into one quick-reference handbook.

Main objective:

    Understand
        ↓
    Configure
        ↓
    Proxy
        ↓
    Intercept
        ↓
    Scope
        ↓
    Analyse
        ↓
    Modify
        ↓
    Test

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 1. BURP SUITE — CORE CONCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite is a web application security testing platform
developed by PortSwigger.

The most important idea:

    BURP = CONTROL WEB TRAFFIC

Normal:

    Browser ───────────────────────► Server
    Browser ◄─────────────────────── Server

Using Burp:

    Browser
       │
       ▼
    ┌──────────────┐
    │ BURP PROXY   │
    └──────┬───────┘
           │
           ▼
        Server

Burp allows a tester to:

    • Intercept
    • Inspect
    • Modify
    • Forward
    • Drop
    • Replay
    • Analyse

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 2. IMPORTANT BURP MODULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Dashboard
        → Overview of Burp project/activity

    Target
        → Site map, scope, issue definitions

    Proxy
        → Intercept HTTP/HTTPS traffic

    Intruder
        → Automated/customised payload testing

    Repeater
        → Manually modify and resend requests

    Collaborator
        → Out-of-band interaction testing

    Sequencer
        → Analyse randomness of tokens

    Decoder
        → Encode/decode data

    Comparer
        → Compare requests/responses

    Logger
        → Log traffic/events

    Organizer
        → Organise testing items

    Extensions
        → Extend Burp functionality

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚦 3. BURP TESTING WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    START
                      │
                      ▼
               Launch Burp Suite
                      │
                      ▼
                 Create Project
                      │
                      ▼
              Configure Browser
                      │
                      ▼
                 Define Scope
                      │
                      ▼
                Browse Target
                      │
                      ▼
             Capture HTTP Traffic
                      │
                      ▼
                 Site Map
                      │
                      ▼
              Discover Endpoints
                      │
                      ▼
             Intercept Requests
                      │
                      ▼
              Inspect Parameters
                      │
                      ▼
               Modify Request
                      │
                      ▼
              Forward / Drop
                      │
                      ▼
             Analyse Response
                      │
                      ▼
               Test Behaviour
                      │
                      ▼
                  Validate
                      │
                      ▼
                   REPORT
                      │
                      ▼
                    END

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 4. PROXY ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Browser
       │
       │ HTTP / HTTPS
       ▼
    127.0.0.1:8080
       │
       ▼
    ┌──────────────────┐
    │    BURP PROXY    │
    └────────┬─────────┘
             │
             │ HTTP / HTTPS
             ▼
        Target Server

IMPORTANT:

    127.0.0.1
        → Localhost / loopback

    8080
        → Proxy port used in the room

    127.0.0.1:8080
        → Burp Proxy endpoint used by the browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🦊 5. FOXYPROXY CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Firefox:

    FoxyProxy
       ↓
    Options
       ↓
    Add
       ↓
    Create proxy

Configuration:

    Name:
        Burp

    Proxy Type:
        HTTP

    IP Address:
        127.0.0.1

    Port:
        8080

    Save
       ↓
    Activate Burp profile

Final:

    Firefox
       ↓
    FoxyProxy
       ↓
    127.0.0.1:8080
       ↓
    Burp
       ↓
    Target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 6. INTERCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Go to:

    Proxy
      ↓
    Intercept

Enable:

    Intercept is ON

Then:

    Browser Request
          │
          ▼
       Burp Proxy
          │
          ▼
       INTERCEPT
          │
       ┌──┴──────────┐
       ▼             ▼
    Forward         Drop
       │
       ▼
     Server

Forward:

    → Allow request to continue

Drop:

    → Discard request

Modify:

    → Change request before forwarding

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔄 7. INTERCEPT ON vs OFF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTERCEPT ON:

    Request
       ↓
    Burp
       ↓
    HOLD
       ↓
    Tester decides
       ├── Forward
       ├── Drop
       └── Modify

INTERCEPT OFF:

    Request
       ↓
    Burp
       ↓
    Target

The traffic can still be logged in:

    Proxy → HTTP history

Therefore:

    Intercept OFF
        ≠
    Burp completely disabled

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📜 8. HTTP HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
      ↓
    HTTP history

Used to review requests that have passed through Burp.

Useful information includes:

    • Host
    • Method
    • URL
    • Parameters
    • Status code
    • Response length
    • MIME type
    • Extension
    • Title
    • Request number

Workflow:

    Browse
       ↓
    Requests pass through Burp
       ↓
    HTTP history
       ↓
    Analyse previous traffic

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔌 9. WEBSOCKET HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
      ↓
    WebSockets history

Useful for applications that use real-time communication.

Concept:

    Browser
       │
       │ WebSocket
       ▼
    Burp
       │
       ▼
    Web Application

WebSocket messages can be reviewed after passing through Burp.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗺️ 10. TARGET — SITE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Target
      ↓
    Site map

The Site Map represents discovered application resources as a
tree.

Example:

    Target
      │
      └── Site map
            ├── /
            ├── /login
            ├── /register
            ├── /dashboard
            ├── /admin
            └── /api
                  ├── /users
                  ├── /products
                  └── /orders

Main purpose:

    Browse
      ↓
    Capture
      ↓
    Map
      ↓
    Discover endpoints

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔍 11. ISSUE DEFINITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Target
      ↓
    Issue definitions

Provides information about vulnerabilities that Burp's scanner
can identify.

Can contain:

    • Vulnerability names
    • Descriptions
    • References
    • Related information

Useful for:

    • Learning vulnerabilities
    • Understanding findings
    • Reporting
    • Manual testing research

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 12. SCOPING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scope determines which targets belong to the current test.

Basic model:

    TARGET SCOPE
       │
       ├── INCLUDE
       │
       └── EXCLUDE

Example:

    Include:
        target.com

    Exclude:
        target.com/logout

MEMORY:

    INCLUDE
        → Test this

    EXCLUDE
        → Do not test this

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ➕ 13. ADD TARGET TO SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fast workflow:

    Target
      ↓
    Site map
      ↓
    Right-click target
      ↓
    Add to scope
      ↓
    Confirm

Example:

    http://10.48.155.152/
             │
             ▼
        Add to scope

Then manage it through:

    Target
      ↓
    Scope settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 14. INTERCEPT ONLY IN-SCOPE TRAFFIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scope alone is not enough to control interception.

Configure:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Request interception rules
       ↓
    URL
       ↓
    Is in target scope

Concept:

    Request
       │
       ▼
    Is URL in target scope?
       │
      ┌┴───────┐
     YES       NO
      │         │
      ▼         ▼
    Intercept  Ignore

This reduces unwanted interception.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧹 15. WHY SCOPE IS IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Without scope:

    Browser
       │
       ├── Target
       ├── Search engines
       ├── CDN
       ├── Background requests
       ├── Other websites
       └── WebSockets
              │
              ▼
             BURP
              │
              ▼
         Huge traffic

With scope:

    Browser
       │
       ├── Target ───────► Burp
       │
       └── Other traffic ─► Ignore

Benefits:

    ✓ Less noise
    ✓ Easier analysis
    ✓ Better organisation
    ✓ Lower chance of accidental testing
    ✓ Focus on intended target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 16. BURP SUITE BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp includes a built-in Chromium-based browser.

Open:

    Proxy
      ↓
    Open browser

Architecture:

    Burp Browser
         ↓
    Burp Proxy
         ↓
    Target

Advantage:

    No manual FoxyProxy configuration required.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 17. BURP BROWSER SANDBOX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When Burp runs as root on Linux, the Burp Browser may fail because
of sandbox restrictions.

Two solutions:

    OPTION 1 — Recommended
        ↓
    Run Burp as a low-privilege user

    OPTION 2 — Easy workaround
        ↓
    Settings
      ↓
    Tools
      ↓
    Burp's browser
      ↓
    Allow browser to run without a sandbox

Security consideration:

    No sandbox
       ↓
    Less browser isolation
       ↓
    Increased risk if browser is compromised

Therefore, the low-privilege approach is preferable.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 18. HTTPS INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTPS encrypts traffic.

Burp needs its own CA certificate to intercept HTTPS.

Flow:

    Browser
       │
       │ HTTPS
       ▼
    Burp
       │
       │ HTTPS
       ▼
    Server

The browser must trust:

    PortSwigger CA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ 19. PORTSWIGGER CA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Each Burp installation generates a CA certificate.

Download:

    http://burp/cert

Certificate:

    cert.der

Then import into Firefox.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🦊 20. FIREFOX CA IMPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Firefox:

    Settings
       ↓
    Privacy & Security
       ↓
    Certificates
       ↓
    View Certificates
       ↓
    Authorities
       ↓
    Import
       ↓
    cert.der
       ↓
    Trust this CA to identify websites

Certificate:

    PortSwigger CA

Result:

    Firefox
       ↓
    Trust PortSwigger CA
       ↓
    Burp-generated certificate
       ↓
    HTTPS interception
       ↓
    Traffic visible in Burp

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 21. CA SECURITY WARNING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A trusted CA has significant authority.

A browser trusting a CA can accept certificates issued by it.

Therefore:

    CA installation
        ↓
    Major trust decision

Only install CA certificates from trusted sources and in
appropriate testing environments.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 22. XSS — EXAMPLE ATTACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The room demonstrates an XSS attack using a support form.

Concept:

    User Input
       ↓
    Client-side validation
       ↓
    HTTP Request
       ↓
    Burp
       ↓
    Modify
       ↓
    Server
       ↓
    Vulnerable output
       ↓
    XSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 💥 23. CROSS-SITE SCRIPTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

XSS occurs when attacker-controlled input is interpreted as
executable script in a browser.

Conceptual example:

    User-controlled input
            ↓
    Application processes input
            ↓
    Unsafe output
            ↓
    Browser
            ↓
    JavaScript executes

Potential impact can include:

    • Unauthorised actions in the victim's context
    • Data exposure
    • Session-related attacks
    • UI manipulation
    • Phishing-style content

Actual impact depends on the application and vulnerability.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 24. CLIENT-SIDE VALIDATION BYPASS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Critical lesson:

    CLIENT-SIDE VALIDATION
           ≠
    SECURITY CONTROL

Why?

The client is controlled by the user.

Example:

    Browser
       ↓
    JavaScript filter
       ↓
    Request
       ↓
    Burp
       ↓
    Modify
       ↓
    Server

The request can be changed after the client-side validation has
already occurred.

Therefore:

    Server-side validation
        ↓
    REQUIRED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✏️ 25. REQUEST MODIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp allows modification of:

    • Query parameters
    • Form parameters
    • Headers
    • Cookies
    • JSON values
    • Request body
    • Other request data

Example:

    Original:

    GET /user?id=10 HTTP/1.1

    Modified:

    GET /user?id=11 HTTP/1.1

Workflow:

    Capture
       ↓
    Inspect
       ↓
    Modify
       ↓
    Forward
       ↓
    Analyse

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔡 26. URL ENCODING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp provides URL encoding functionality.

Shortcut:

    Ctrl + U

Example:

    <

becomes:

    %3C

    >

becomes:

    %3E

This is useful when sending characters that need URL encoding.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 27. SUCCESSFUL XSS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The room's example attack produces:

    Succ3ssful XSS

This confirms the exercise's XSS payload was successfully
processed.

Main lesson:

    Browser-side restriction
          ↓
    Intercept request
          ↓
    Modify request
          ↓
    Forward
          ↓
    Server processes input
          ↓
    XSS demonstrated

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 28. DEFENSIVE LESSON FROM XSS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Developers should never rely solely on browser-side validation.

Use:

    ✓ Server-side validation
    ✓ Context-aware output encoding
    ✓ Proper escaping
    ✓ Secure application design
    ✓ Appropriate Content Security Policy
    ✓ Safe handling of untrusted input

Security architecture:

    Untrusted Input
          │
          ▼
    Server-side validation
          │
          ▼
    Safe processing
          │
          ▼
    Output encoding
          │
          ▼
    Browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⌨️ 29. IMPORTANT KEYBOARD SHORTCUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ctrl + Shift + D
        → Dashboard

    Ctrl + Shift + T
        → Target

    Ctrl + Shift + P
        → Proxy

    Ctrl + Shift + I
        → Intruder

    Ctrl + Shift + R
        → Repeater

    Ctrl + U
        → URL encode selected text

MEMORY:

    D → Dashboard
    T → Target
    P → Proxy
    I → Intruder
    R → Repeater

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 30. IMPORTANT BURP SETTINGS PATHS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cookie jar:

    Settings
      ↓
    Sessions
      ↓
    Cookie jar

Updates:

    Settings
      ↓
    Suite
      ↓
    Updates

Hotkeys:

    Settings
      ↓
    User interface
      ↓
    Hotkeys

Proxy:

    Settings
      ↓
    Tools
      ↓
    Proxy

Burp Browser:

    Settings
      ↓
    Tools
      ↓
    Burp's browser

Scope:

    Target
      ↓
    Scope settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 31. TASK ANSWERS / IMPORTANT ROOM VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TASK 6:

    Q:
    Which tab does Ctrl + Shift + P switch to?

    Answer:
        Proxy

TASK 7:

    Q1:
    Category containing Cookie jar?

    Answer:
        Sessions

    Q2:
    Base category containing Updates?

    Answer:
        Suite

    Q3:
    Sub-category for shortcut keybindings?

    Answer:
        Hotkeys

    Q4:
    Can uploaded Client-Side TLS certificates be overridden
    on a per-project basis?

    Answer:
        Yes

TASK 10:

    Target:
        http://10.48.155.152/

    Unusual endpoint challenge flag:

        THM{NmNIZTINGE1MWU1ZTQzMzgzNmFiNWVk}

TASK 14:

    Successful result:

        Succ3ssful XSS

TASK 13:

    Burp CA:

        PortSwigger CA

    Certificate:

        cert.der

    Certificate URL:

        http://burp/cert

    Burp proxy:

        127.0.0.1:8080

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 32. COMPLETE PRACTICAL SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1:

    Start Burp Suite

STEP 2:

    Create temporary project

STEP 3:

    Start Burp

STEP 4:

    Configure Firefox/FoxyProxy:

        127.0.0.1:8080

STEP 5:

    Enable:

        Proxy → Intercept → Intercept is ON

STEP 6:

    Browse target:

        http://10.48.155.152/

STEP 7:

    Intercept request

STEP 8:

    Click:

        Forward

STEP 9:

    Review:

        Proxy → HTTP history

STEP 10:

    Review:

        Target → Site map

STEP 11:

    Add target to scope

STEP 12:

    Configure:

        URL → Is in target scope

STEP 13:

    For HTTPS:

        http://burp/cert

STEP 14:

    Download:

        cert.der

STEP 15:

    Import into Firefox:

        Authorities

STEP 16:

    Trust:

        PortSwigger CA

STEP 17:

    Test HTTPS interception

STEP 18:

    Use Burp to inspect/modify authorised requests

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔥 33. ONE-LINE BURP COMMAND MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    TARGET
      ↓
    Map the application

    PROXY
      ↓
    Intercept traffic

    HTTP HISTORY
      ↓
    Review traffic

    WEBSOCKET HISTORY
      ↓
    Review WebSocket traffic

    REPEATER
      ↓
    Replay + manually modify

    INTRUDER
      ↓
    Payload testing

    DECODER
      ↓
    Encode / Decode

    COMPARER
      ↓
    Compare

    SEQUENCER
      ↓
    Token randomness

    COLLABORATOR
      ↓
    Out-of-band interactions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 34. BURP MEMORY PALACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                  BURP SUITE
                      │
          ┌───────────┼───────────┐
          │           │           │
          ▼           ▼           ▼
       TARGET       PROXY      REPEATER
          │           │           │
          │           │           └── Replay
          │           │
          │           ├── Intercept
          │           ├── History
          │           └── Modify
          │
          ├── Site Map
          ├── Scope
          └── Issues

                    PROXY
                      │
                      ▼
              127.0.0.1:8080
                      │
                      ▼
                  Browser
                      │
                      ▼
                   Target

HTTPS:

    Browser
       ↓
    PortSwigger CA
       ↓
    Burp
       ↓
    HTTPS Target

XSS:

    Input
       ↓
    Client Validation
       ↓
    Burp
       ↓
    Modify
       ↓
    Server
       ↓
    XSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 35. MOST IMPORTANT CONCEPTS FOR INTERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. What is Burp Suite?

    A web application security testing platform used to inspect,
    manipulate and analyse web traffic.

2. What is Burp Proxy?

    An intermediary between the client and server that allows
    HTTP/HTTPS traffic to be intercepted and modified.

3. What is Repeater?

    A tool for manually modifying and repeatedly sending HTTP
    requests.

4. What is Intruder?

    A tool for customised automated payload testing.

5. What is Site Map?

    A tree representation of resources discovered on the target.

6. What is scope?

    The set of hosts/URLs included or excluded from testing.

7. Why use scope?

    To reduce noise and prevent accidental out-of-scope testing.

8. What is FoxyProxy?

    A browser extension used to manage proxy configurations.

9. What is 127.0.0.1?

    IPv4 loopback address / localhost.

10. Why port 8080?

    It is the Burp Proxy listener port used in this room.

11. Why import Burp's CA?

    To allow the browser to trust Burp-generated certificates
    during HTTPS interception.

12. What is XSS?

    A vulnerability where attacker-controlled input can execute
    script in a browser.

13. Why is client-side validation insufficient?

    Because users control the client and can modify requests
    before they reach the server.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 36. OFFENSIVE SECURITY VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp helps a penetration tester:

    Discover
       ↓
    Intercept
       ↓
    Manipulate
       ↓
    Replay
       ↓
    Observe
       ↓
    Validate

Examples:

    Parameter manipulation
    Authentication testing
    Authorization testing
    Session testing
    Input validation testing
    XSS testing
    API testing
    Access-control testing

Always perform testing only against systems for which you have
explicit authorization.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 37. DEFENSIVE SECURITY VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A defender should assume:

    HTTP requests
        ↓
    CAN BE MODIFIED

Therefore:

    Never trust:
        • Browser validation
        • Hidden form fields
        • Client-side JavaScript
        • Client-controlled parameters
        • Client-controlled headers

Instead:

    Validate on server
        ↓
    Authorize on server
        ↓
    Sanitize/encode appropriately
        ↓
    Process safely

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 38. COMMON BEGINNER MISTAKES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MISTAKE 1:

    Burp is running but browser traffic is not visible.

CHECK:

    FoxyProxy
       ↓
    Burp
       ↓
    127.0.0.1:8080

MISTAKE 2:

    Browser appears frozen.

CHECK:

    Is Intercept ON?

If yes:

    Forward the request.

MISTAKE 3:

    HTTPS gives certificate warning.

CHECK:

    PortSwigger CA imported?

MISTAKE 4:

    HTTP history contains too much traffic.

CHECK:

    Define target scope.

MISTAKE 5:

    Burp Browser doesn't start.

CHECK:

    Linux root/sandbox issue.

Preferred:

    Run Burp as low-privilege user.

MISTAKE 6:

    HTTPS still cannot be inspected.

CHECK:

    Firefox trusts PortSwigger CA.

MISTAKE 7:

    Burp intercepts unwanted requests.

CHECK:

    Request interception rule:

        URL → Is in target scope

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ 39. 30-SECOND REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP
      ↓
    Web Security Testing
      ↓
    PROXY
      ↓
    127.0.0.1:8080
      ↓
    INTERCEPT
      ↓
    INSPECT
      ↓
    MODIFY
      ↓
    FORWARD
      ↓
    HTTP HISTORY
      ↓
    SITE MAP
      ↓
    SCOPE
      ↓
    HTTPS
      ↓
    PortSwigger CA
      ↓
    cert.der
      ↓
    XSS
      ↓
    Client-side validation can be bypassed
      ↓
    Server-side validation is required

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 40. FINAL ROOM CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[✓] Understand Burp Suite

[✓] Understand Burp Community

[✓] Understand Burp Professional

[✓] Understand Dashboard

[✓] Navigate Burp modules

[✓] Use keyboard shortcuts

[✓] Understand User settings

[✓] Understand Project settings

[✓] Configure Proxy

[✓] Understand Proxy listeners

[✓] Intercept requests

[✓] Forward requests

[✓] Drop requests

[✓] Modify requests

[✓] Review HTTP history

[✓] Review WebSocket history

[✓] Configure FoxyProxy

[✓] Understand 127.0.0.1:8080

[✓] Understand Site Map

[✓] Understand Issue definitions

[✓] Define target scope

[✓] Include/exclude targets

[✓] Intercept only in-scope URLs

[✓] Use Burp's built-in browser

[✓] Understand browser sandbox

[✓] Configure HTTPS interception

[✓] Download cert.der

[✓] Import PortSwigger CA

[✓] Understand TLS interception

[✓] Understand XSS

[✓] Modify intercepted requests

[✓] URL encode with Ctrl + U

[✓] Understand client-side validation bypass

[✓] Understand server-side validation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏆 BURP SUITE: THE BASICS — FINAL TAKEAWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    WEB APPLICATION
                           │
                           ▼
                       BROWSER
                           │
                           ▼
                    FOXYPROXY / BURP
                           │
                           ▼
                    127.0.0.1:8080
                           │
                           ▼
                      BURP PROXY
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
         INTERCEPT      HISTORY        SCOPE
             │             │             │
             ▼             ▼             ▼
          MODIFY         ANALYSE       FILTER
             │
             ▼
          FORWARD
             │
             ▼
          SERVER
             │
             ▼
          RESPONSE
             │
             ▼
          ANALYSE
             │
             ▼
       VULNERABILITY TEST

HTTPS:

    PortSwigger CA
         ↓
    cert.der
         ↓
    Firefox Trust
         ↓
    HTTPS Interception

WEB SECURITY:

    Client Input
         ↓
    NEVER TRUST
         ↓
    Server Validation
         ↓
    Secure Processing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✅ ROOM COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP SUITE: THE BASICS

    Tasks Completed:

    ✓ 01 — Introduction
    ✓ 02 — What is Burp Suite?
    ✓ 03 — Features of Burp Community
    ✓ 04 — Installation
    ✓ 05 — The Dashboard
    ✓ 06 — Navigation
    ✓ 07 — Options
    ✓ 08 — Introduction to the Burp Proxy
    ✓ 09 — Connecting through the Proxy
    ✓ 10 — Site Map and Issue Definitions
    ✓ 11 — The Burp Suite Browser
    ✓ 12 — Scoping and Targeting
    ✓ 13 — Proxying HTTPS
    ✓ 14 — Example Attack
    ✓ 15 — Conclusion

    STATUS:
        ████████████████████████████████████████ 100%

    CORE SKILL:

        Browser
          ↓
        Proxy
          ↓
        Intercept
          ↓
        Inspect
          ↓
        Modify
          ↓
        Forward
          ↓
        Analyse
          ↓
        Test

    NEXT:
        → Burp Suite Repeater
        → Manual Web Application Security Testing
        → Advanced Web Application Security

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔥 END OF BURP SUITE: THE BASICS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 BURP SUITE: THE BASICS — MASTER QUICK REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> FINAL REVISION PART
> Use this section before attempting Burp-related TryHackMe rooms,
> web application security labs, CTFs, or interviews.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 1. BURP SUITE IN ONE DIAGRAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                         WEB APPLICATION
                                ▲
                                │
                                │ HTTP / HTTPS
                                │
                         ┌──────┴──────┐
                         │   BURP      │
                         │   PROXY     │
                         └──────┬──────┘
                                ▲
                                │
                                │
                         ┌──────┴──────┐
                         │   BROWSER   │
                         └─────────────┘

Burp acts as a middle layer between the browser and the target.

The tester can:

    INTERCEPT
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    FORWARD / DROP
       ↓
    ANALYSE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 2. COMPLETE BURP TRAFFIC FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Firefox
       │
       │ HTTP / HTTPS
       ▼
    FoxyProxy
       │
       │ 127.0.0.1:8080
       ▼
    Burp Proxy
       │
       ├── Intercept
       ├── HTTP History
       ├── WebSocket History
       ├── Match & Replace
       └── Proxy Settings
       │
       ▼
    Target Web Application
       │
       ▼
    HTTP / HTTPS Response
       │
       ▼
    Burp
       │
       ▼
    Browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 3. CORE BURP MODULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    ┌────────────────┬────────────────────────────────────────┐
    │ MODULE         │ PURPOSE                                │
    ├────────────────┼────────────────────────────────────────┤
    │ Dashboard      │ Project/activity overview              │
    │ Target         │ Site map + scope + issue definitions   │
    │ Proxy          │ Intercept HTTP/HTTPS traffic            │
    │ Intruder       │ Customised payload testing              │
    │ Repeater       │ Replay and manually modify requests     │
    │ Collaborator   │ Out-of-band interaction testing        │
    │ Sequencer      │ Token randomness analysis               │
    │ Decoder        │ Encode/decode data                      │
    │ Comparer       │ Compare requests/responses              │
    │ Logger         │ Traffic/event logging                   │
    │ Organizer      │ Organise testing items                  │
    │ Extensions     │ Extend Burp functionality               │
    └────────────────┴────────────────────────────────────────┘

MEMORY:

    Target  → MAP
    Proxy   → INTERCEPT
    Repeater→ REPLAY
    Intruder→ PAYLOADS
    Decoder → ENCODE
    Comparer→ COMPARE
    Sequencer→ RANDOMNESS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🦊 4. FOXYPROXY — COMPLETE SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Firefox
   │
   ▼
FoxyProxy
   │
   ▼
Options
   │
   ▼
Add
   │
   ▼
Create proxy profile
   │
   ├── Name:
   │      Burp
   │
   ├── Type:
   │      HTTP
   │
   ├── IP:
   │      127.0.0.1
   │
   └── Port:
          8080
   │
   ▼
Save
   │
   ▼
Activate Burp profile

FINAL:

    127.0.0.1:8080
          ↓
      Burp Proxy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔥 5. INTERCEPT — MASTER FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Browser
       │
       ▼
    HTTP Request
       │
       ▼
    Burp Proxy
       │
       ▼
    Intercept
       │
       ├───────────────┐
       │               │
       ▼               ▼
    Modify           Drop
       │
       ▼
    Forward
       │
       ▼
    Target

IMPORTANT:

    Intercept ON
        → Burp holds matching requests.

    Intercept OFF
        → Requests continue normally,
          but can still appear in HTTP history.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📜 6. HTTP HISTORY vs INTERCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTERCEPT:

    Real-time
       ↓
    Request is paused
       ↓
    Modify / Forward / Drop

HTTP HISTORY:

    Request already passed through Burp
       ↓
    Stored/logged
       ↓
    Review later

MEMORY:

    Intercept = NOW
    History   = BEFORE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔌 7. WEBSOCKET HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WebSockets provide persistent communication between client and
server and are commonly used for real-time applications.

Flow:

    Browser
       │
       │ WebSocket
       ▼
    Burp
       │
       ▼
    Target

Review through:

    Proxy
      ↓
    WebSockets history

Useful for:

    • Chat applications
    • Real-time dashboards
    • Notifications
    • Live updates
    • Other real-time functionality

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗺️ 8. SITE MAP — ENUMERATION MINDSET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Start Target
        │
        ▼
    Browse Website
        │
        ▼
    Burp Captures Requests
        │
        ▼
    Target → Site map
        │
        ├── Pages
        ├── Directories
        ├── Parameters
        ├── APIs
        └── Endpoints
        │
        ▼
    Application Map

Think:

    "Every request can reveal another piece of the application."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 9. SCOPE — THE GOLDEN RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before serious testing:

    DEFINE THE SCOPE

Flow:

    Target
      ↓
    Site map
      ↓
    Right-click target
      ↓
    Add to scope
      ↓
    Scope settings
      ↓
    Include / Exclude
      ↓
    Proxy interception rules
      ↓
    URL is in target scope

Final behaviour:

    Target request
        ↓
    IN SCOPE
        ↓
    Intercept

    Other request
        ↓
    OUT OF SCOPE
        ↓
    Do not intercept/log unnecessarily

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 10. WHY SCOPE MATTERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Without scope:

    Burp
      │
      ├── Target
      ├── Search engines
      ├── CDNs
      ├── Browser background traffic
      ├── Other websites
      └── WebSockets

Result:

    Massive amount of unnecessary traffic.

With scope:

    Burp
      │
      └── Target
            │
            ▼
         Useful traffic

Benefits:

    ✓ Cleaner history
    ✓ Easier analysis
    ✓ Less noise
    ✓ Better organisation
    ✓ Reduced accidental testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 11. HTTPS — COMPLETE CONCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTP:

    Browser
       │
       ▼
    Burp
       │
       ▼
    Server

HTTPS:

    Browser
       │
       │ Encrypted TLS
       ▼
    Burp
       │
       │ TLS
       ▼
    Server

Burp needs to establish trusted TLS communication with the
browser.

Therefore:

    Burp CA
       ↓
    Browser trusts CA
       ↓
    Burp can generate trusted certificates
       ↓
    HTTPS can be inspected

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ 12. BURP CA CERTIFICATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Certificate authority:

    PortSwigger CA

Download:

    http://burp/cert

Certificate file:

    cert.der

Firefox:

    Settings
       ↓
    Privacy & Security
       ↓
    Certificates
       ↓
    View Certificates
       ↓
    Authorities
       ↓
    Import
       ↓
    cert.der
       ↓
    Trust this CA to identify websites

Result:

    HTTPS interception enabled.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 13. IMPORTANT CA SECURITY CONCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A CA is highly trusted.

If a browser trusts a CA, certificates issued by that CA can
be accepted as trusted.

Therefore:

    Installing a CA
          ↓
    Creates a trust relationship
          ↓
    Burp can intercept HTTPS
          ↓
    Powerful capability

Only trust CA certificates from sources you intentionally trust.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 14. BURP BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp provides a built-in Chromium-based browser.

Open:

    Proxy
      ↓
    Open browser

Advantages:

    ✓ Already configured for Burp
    ✓ No FoxyProxy configuration required
    ✓ Convenient for testing

Flow:

    Burp Browser
        ↓
    Burp Proxy
        ↓
    Target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 15. BURP BROWSER SANDBOX ISSUE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Problem:

    Burp running as root
          ↓
    Chromium sandbox restrictions
          ↓
    Burp Browser may fail to launch

SMART SOLUTION:

    Run Burp as low-privilege user.

EASY SOLUTION:

    Settings
      ↓
    Tools
      ↓
    Burp's browser
      ↓
    Allow browser to run without a sandbox

WARNING:

    No sandbox
       ↓
    Less isolation
       ↓
    Greater security risk

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 16. XSS — ATTACK MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    User Input
        │
        ▼
    Client-side Validation
        │
        ▼
    HTTP Request
        │
        ▼
    Burp
        │
        ▼
    Modify Parameter
        │
        ▼
    Forward
        │
        ▼
    Server
        │
        ▼
    Vulnerable Output
        │
        ▼
    Browser
        │
        ▼
    JavaScript Execution

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 17. CLIENT-SIDE VALIDATION IS NOT SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A browser is controlled by the user.

Therefore:

    Browser-side validation
         ↓
    Can be modified/bypassed
         ↓
    HTTP request can be manipulated
         ↓
    Server receives unexpected input

Correct security architecture:

    Client validation
         ↓
    UX / convenience

    +

    Server validation
         ↓
    SECURITY

MEMORY:

    CLIENT = UNTRUSTED
    SERVER = SECURITY BOUNDARY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔡 18. URL ENCODING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp shortcut:

    Ctrl + U

Example:

    <   →   %3C
    >   →   %3E

Purpose:

    Represent special characters in URL-encoded form.

Workflow:

    Select text
        ↓
    Ctrl + U
        ↓
    Encoded value
        ↓
    Send request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 19. EXAMPLE ATTACK — COMPLETE FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Open support form
          │
          ▼
    Enter input
          │
          ▼
    Submit
          │
          ▼
    Burp intercepts
          │
          ▼
    Locate parameter
          │
          ▼
    Modify parameter
          │
          ▼
    URL encode if required
          │
          ▼
    Forward
          │
          ▼
    Server processes input
          │
          ▼
    XSS demonstrated
          │
          ▼
    "Succ3ssful XSS"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 20. DEFENSIVE XSS MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DO NOT:

    Trust browser validation
    Trust hidden fields
    Trust client-controlled parameters
    Trust client-side JavaScript
    Assume browser restrictions cannot be bypassed

DO:

    ✓ Validate input server-side
    ✓ Encode output
    ✓ Escape data according to context
    ✓ Treat user input as untrusted
    ✓ Use suitable CSP
    ✓ Test controls independently

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 21. IMPORTANT SETTINGS MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Settings
       │
       ├── Sessions
       │     └── Cookie jar
       │
       ├── Suite
       │     └── Updates
       │
       ├── User interface
       │     └── Hotkeys
       │
       └── Tools
             ├── Proxy
             └── Burp's browser

Scope:

    Target
       └── Scope settings

Proxy:

    Proxy
       └── Proxy settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⌨️ 22. SHORTCUT CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ctrl + Shift + D
        → Dashboard

    Ctrl + Shift + T
        → Target

    Ctrl + Shift + P
        → Proxy

    Ctrl + Shift + I
        → Intruder

    Ctrl + Shift + R
        → Repeater

    Ctrl + U
        → URL encode selected text

MEMORY:

    D = Dashboard
    T = Target
    P = Proxy
    I = Intruder
    R = Repeater

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📌 23. IMPORTANT VALUES FROM THE ROOM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp proxy:

    127.0.0.1:8080

Target:

    http://10.48.155.152/

Burp certificate:

    http://burp/cert

Certificate filename:

    cert.der

Certificate authority:

    PortSwigger CA

XSS success message:

    Succ3ssful XSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 24. COMPLETE ROOM TASK MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    TASK 1
      ↓
    Introduction

    TASK 2
      ↓
    What is Burp Suite?

    TASK 3
      ↓
    Features of Burp Community

    TASK 4
      ↓
    Installation

    TASK 5
      ↓
    Dashboard

    TASK 6
      ↓
    Navigation

    TASK 7
      ↓
    Options

    TASK 8
      ↓
    Burp Proxy

    TASK 9
      ↓
    FoxyProxy

    TASK 10
      ↓
    Site Map + Issue Definitions

    TASK 11
      ↓
    Burp Suite Browser

    TASK 12
      ↓
    Scoping + Targeting

    TASK 13
      ↓
    Proxying HTTPS

    TASK 14
      ↓
    Example Attack

    TASK 15
      ↓
    Conclusion

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 25. WHAT EACH TASK TEACHES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    T1
      → Introduction to web security testing

    T2
      → Burp Suite fundamentals

    T3
      → Community Edition capabilities

    T4
      → Installation / setup

    T5
      → Dashboard

    T6
      → Navigation + shortcuts

    T7
      → Settings + configuration

    T8
      → Proxy fundamentals

    T9
      → Browser → Burp connection

    T10
      → Site mapping + vulnerability definitions

    T11
      → Built-in Burp browser

    T12
      → Scope control

    T13
      → HTTPS interception

    T14
      → Practical XSS testing

    T15
      → Final recap

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 26. 10 THINGS YOU MUST REMEMBER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    01.
    Burp = Web application security testing platform.

    02.
    Proxy = Intercept and manipulate traffic.

    03.
    127.0.0.1:8080 = Proxy used in this room.

    04.
    Intercept ON = Requests are paused.

    05.
    HTTP History = Review previously observed requests.

    06.
    Site Map = Map the target application.

    07.
    Scope = Define what you are allowed/intending to test.

    08.
    PortSwigger CA = Required for HTTPS interception.

    09.
    cert.der = Burp CA certificate file.

    10.
    Client-side validation alone is NOT a security boundary.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 27. ONE-MINUTE INTERVIEW ANSWER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"Burp Suite is a web application security testing platform from
PortSwigger. Its Proxy acts as an intermediary between the browser
and the target application, allowing a tester to intercept, inspect,
modify and forward HTTP/HTTPS traffic. The Target module helps map
the application and define scope, while Repeater is useful for
manually replaying and modifying requests and Intruder is used for
customised payload testing. For HTTPS interception, Burp's
PortSwigger CA must be trusted by the browser. Burp is especially
useful because it lets testers verify application behaviour beyond
what is visible through the normal browser interface."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 28. TROUBLESHOOTING FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEM:
    Browser traffic not appearing in Burp

CHECK:

    Burp running?
       ↓
    Proxy listener active?
       ↓
    127.0.0.1:8080 configured?
       ↓
    FoxyProxy activated?
       ↓
    Browser using correct profile?
       ↓
    Intercept / History checked?

──────────────────────────────────────────────────────────────

PROBLEM:
    Browser appears frozen

CHECK:

    Intercept ON?
       ↓
    Request held?
       ↓
    Click Forward

──────────────────────────────────────────────────────────────

PROBLEM:
    HTTPS certificate error

CHECK:

    http://burp/cert
       ↓
    Download cert.der
       ↓
    Firefox Authorities
       ↓
    Import
       ↓
    Trust PortSwigger CA

──────────────────────────────────────────────────────────────

PROBLEM:
    Too much traffic

CHECK:

    Define scope
       ↓
    Add target to scope
       ↓
    Use:
        URL → Is in target scope

──────────────────────────────────────────────────────────────

PROBLEM:
    Burp Browser does not launch

CHECK:

    Running as root?
       ↓
    Sandbox problem?
       ↓
    Preferred:
        Run Burp as low-privilege user
       ↓
    Alternative:
        Disable browser sandbox

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 29. PROFESSIONAL PENTEST MINDSET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before testing:

    ┌─────────────────────────────┐
    │ 1. GET AUTHORIZATION        │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ 2. DEFINE SCOPE              │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ 3. MAP APPLICATION           │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ 4. CAPTURE TRAFFIC           │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ 5. TEST CAREFULLY            │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ 6. VALIDATE FINDINGS         │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ 7. DOCUMENT / REPORT         │
    └─────────────────────────────┘

IMPORTANT:

    Only test systems where you have explicit authorization.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏆 30. FINAL MEMORY FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                         BURP SUITE
                             │
                             ▼
                       WEB SECURITY
                             │
                             ▼
                         PROXY
                             │
                             ▼
                    127.0.0.1:8080
                             │
                             ▼
                         INTERCEPT
                             │
                    ┌────────┼────────┐
                    ▼        ▼        ▼
                 INSPECT   MODIFY    DROP
                    │
                    ▼
                  FORWARD
                    │
                    ▼
                  TARGET
                    │
                    ▼
                RESPONSE
                    │
                    ▼
                  ANALYSE
                    │
          ┌─────────┼──────────┐
          ▼         ▼          ▼
       SITE MAP   HISTORY    SCOPE
          │
          ▼
     ENDPOINTS / APIs
          │
          ▼
      VULNERABILITY
          │
          ▼
       VALIDATION

HTTPS:

    PortSwigger CA
          ↓
       cert.der
          ↓
       Firefox
          ↓
       Trust CA
          ↓
    HTTPS Interception

XSS:

    User Input
          ↓
    Client Filter
          ↓
        Burp
          ↓
       Modify
          ↓
      Forward
          ↓
       Server
          ↓
        XSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔥 FINAL TAKEAWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The most important skill from this room is NOT memorising
individual Burp buttons.

The real skill is understanding the traffic flow:

    CLIENT
      ↓
    REQUEST
      ↓
    BURP
      ↓
    INSPECT
      ↓
    MODIFY
      ↓
    FORWARD
      ↓
    SERVER
      ↓
    RESPONSE
      ↓
    ANALYSE

Once this mental model is clear, Burp's individual tools become
much easier to understand.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 BURP SUITE: THE BASICS — FINAL STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    ┌────────────────────────────────────────────────────┐
    │             BURP SUITE: THE BASICS                 │
    │                                                    │
    │  Tasks Completed: 15 / 15                         │
    │                                                    │
    │  Status: ████████████████████████ 100%            │
    │                                                    │
    │  Core Skill: Web Application Traffic Analysis     │
    └────────────────────────────────────────────────────┘

NEXT STEP:

    BURP SUITE REPEATER
         ↓
    Manual Request Manipulation
         ↓
    Web Application Security
         ↓
    Advanced Burp Workflows

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ END OF BURP SUITE: THE BASICS — MASTER NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 BURP SUITE: THE BASICS — PRACTICAL CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎯 PART 8 PURPOSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This section is a compact practical reference for using Burp Suite
during authorised web application security testing.

The complete mental model:

    BROWSER
       ↓
    PROXY
       ↓
    INTERCEPT
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    FORWARD
       ↓
    RESPONSE
       ↓
    ANALYSE
       ↓
    TEST

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 1. NORMAL WEB REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Without Burp:

    Browser
       │
       │ HTTP / HTTPS Request
       ▼
    Web Server
       │
       │ Response
       ▼
    Browser

The browser directly communicates with the web server.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛠️ 2. WEB REQUEST WITH BURP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

With Burp:

    Browser
       │
       ▼
    Burp Proxy
       │
       ├── Intercept
       ├── Inspect
       ├── Modify
       ├── Drop
       └── Forward
       │
       ▼
    Web Server
       │
       ▼
    Burp
       │
       ▼
    Browser

This is the foundation of Burp Suite.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🦊 3. FIREFOX + FOXYPROXY + BURP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Firefox
   │
   ▼
FoxyProxy
   │
   ▼
HTTP Proxy
   │
   ▼
127.0.0.1:8080
   │
   ▼
Burp Proxy
   │
   ▼
Target

FoxyProxy configuration:

    Name:
        Burp

    Type:
        HTTP

    Address:
        127.0.0.1

    Port:
        8080

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 4. BASIC PROXY TEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1:

    Start Burp Suite.

STEP 2:

    Configure Firefox/FoxyProxy:

        127.0.0.1:8080

STEP 3:

    Go to:

        Proxy → Intercept

STEP 4:

    Enable:

        Intercept is ON

STEP 5:

    Visit an authorised target.

STEP 6:

    Burp should capture the request.

STEP 7:

    Inspect the request.

STEP 8:

    Click:

        Forward

STEP 9:

    Observe the response in the browser.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 5. IF THE BROWSER APPEARS TO HANG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Do not immediately assume the connection is broken.

Check:

    Proxy
      ↓
    Intercept
      ↓
    Is Intercept ON?
      ↓
      YES
      ↓
    Request is probably being held.

Action:

    Forward

or:

    Drop

Mental model:

    Browser waiting
         ↓
    Burp holding request
         ↓
    Tester decides what happens

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📜 6. HTTP HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
      ↓
    HTTP history

Use HTTP History when you want to inspect requests that have
already passed through Burp.

Typical information:

    Request #
    Host
    Method
    URL
    Parameters
    Status
    Length
    MIME type
    Extension
    Title

Example:

    GET /login
    POST /login
    GET /dashboard
    GET /api/users
    GET /api/products

This can reveal how the application actually communicates.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔍 7. WHAT TO LOOK FOR IN HTTP HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When reviewing traffic, look for:

    • Login requests
    • Authentication endpoints
    • Session cookies
    • API endpoints
    • Parameters
    • IDs
    • Redirects
    • Error responses
    • Interesting status codes
    • Administrative endpoints
    • File paths
    • JSON responses

Concept:

    HTTP History
         ↓
    Understand application behaviour
         ↓
    Identify interesting requests
         ↓
    Test authorised functionality

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗺️ 8. SITE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Target
      ↓
    Site map

Site Map provides a structured representation of resources
discovered through Burp.

Example:

    target.local
       │
       ├── /
       ├── /login
       ├── /register
       ├── /dashboard
       ├── /profile
       ├── /admin
       └── /api
             ├── /users
             ├── /products
             └── /orders

Think:

    HTTP History = Traffic log

    Site Map = Application structure

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 9. TARGET SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before testing, define the target scope.

Workflow:

    Target
       ↓
    Site map
       ↓
    Right-click target
       ↓
    Add to scope
       ↓
    Scope settings
       ↓
    Include / Exclude

Example:

    INCLUDE:

        http://10.48.155.152/

    EXCLUDE:

        Unwanted resources/endpoints as appropriate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 10. INTERCEPT ONLY IN-SCOPE TRAFFIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Configure:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Request interception rules
       ↓
    URL
       ↓
    Is in target scope

Logic:

    Request
       │
       ▼
    URL in target scope?
       │
       ├── YES → Intercept
       │
       └── NO  → Do not intercept

This helps reduce background browser traffic.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 11. HTTPS TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTPS adds TLS encryption.

Without trusting Burp's CA:

    Browser
       │
       ▼
    Burp
       │
       ▼
    Certificate warning / TLS problem

With PortSwigger CA trusted:

    Browser
       │
       ▼
    PortSwigger CA trusted
       │
       ▼
    Burp
       │
       ▼
    HTTPS Target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ 12. BURP CA CERTIFICATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open:

    http://burp/cert

Download:

    cert.der

Then Firefox:

    Settings
       ↓
    Privacy & Security
       ↓
    Certificates
       ↓
    View Certificates
       ↓
    Authorities
       ↓
    Import
       ↓
    cert.der
       ↓
    Trust this CA to identify websites

CA:

    PortSwigger CA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 13. HTTPS INTERCEPTION FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Browser
       │
       │ HTTPS
       ▼
    Burp
       │
       │ Burp-generated certificate
       ▼
    Browser trusts PortSwigger CA
       │
       ▼
    Burp inspects traffic
       │
       │ New TLS connection
       ▼
    Target Server

Return path:

    Target
       ↓
    Burp
       ↓
    Inspect / Modify
       ↓
    Browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 14. CA SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A trusted CA has significant authority.

Therefore:

    CA certificate
       ↓
    Trust decision
       ↓
    HTTPS certificates can be accepted
       ↓
    Burp can inspect HTTPS

Only use trusted certificates in authorised environments.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 15. BURP'S BUILT-IN BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp provides a Chromium-based browser.

Open:

    Proxy
      ↓
    Open browser

Advantages:

    ✓ Already configured for Burp
    ✓ No FoxyProxy setup required
    ✓ Convenient for testing

Flow:

    Burp Browser
       ↓
    Burp Proxy
       ↓
    Target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 16. BURP BROWSER + ROOT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

On Linux, running Burp as root can cause the browser sandbox
to prevent the built-in browser from starting.

Preferred solution:

    Run Burp as a normal / low-privilege user.

Alternative:

    Settings
       ↓
    Tools
       ↓
    Burp's browser
       ↓
    Allow Burp's browser to run without a sandbox

Security trade-off:

    Disable sandbox
       ↓
    Less isolation
       ↓
    Higher risk

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 17. REQUEST STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A typical HTTP request contains:

    METHOD /path HTTP/version
    Host: target
    Header: value
    Header: value

    Request Body

Example:

    GET /profile?id=10 HTTP/1.1
    Host: target.local
    Cookie: session=abc123

Important components:

    METHOD
       ↓
    URL / PATH
       ↓
    HEADERS
       ↓
    COOKIES
       ↓
    BODY / PARAMETERS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✏️ 18. MODIFYING PARAMETERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Original:

    GET /profile?id=10 HTTP/1.1

Modified:

    GET /profile?id=11 HTTP/1.1

Workflow:

    Capture
       ↓
    Locate parameter
       ↓
    Change value
       ↓
    Forward
       ↓
    Observe response

This is useful for testing authorised application behaviour,
including parameter handling and access-control logic.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🍪 19. COOKIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cookies are commonly used for session management.

Example:

    Cookie: session=abc123

In Burp, cookies can be viewed and modified as part of HTTP
requests.

Important concept:

    Browser
       ↓
    Cookie
       ↓
    HTTP Request
       ↓
    Burp
       ↓
    Server

The room also introduces the:

    Sessions
       ↓
    Cookie jar

setting.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 20. MATCH AND REPLACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Match and Replace

Purpose:

    Automatically modify matching traffic.

Concept:

    Request
       ↓
    Match
       ↓
    Replacement
       ↓
    Modified Request

Possible uses:

    • Modify headers
    • Modify User-Agent
    • Modify cookies
    • Modify request data

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 21. RESPONSE INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

By default, Burp does not automatically intercept every response.

Response interception can be configured using rules.

Example conditions:

    Content-Type
    Status code
    Request modification
    Whether request was intercepted
    Target scope

Flow:

    Server Response
       ↓
    Response interception rules
       ↓
    Match?
       │
       ├── YES → Intercept
       └── NO  → Continue

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 22. XSS PRACTICAL MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Support Form
         ↓
    User Input
         ↓
    Client-side Validation
         ↓
    HTTP Request
         ↓
    Burp Intercept
         ↓
    Modify Parameter
         ↓
    Forward
         ↓
    Server
         ↓
    Application
         ↓
    XSS

The exercise demonstrates:

    Succ3ssful XSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 23. WHY CLIENT-SIDE VALIDATION CAN BE BYPASSED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Client:

    Browser
       ↓
    JavaScript
       ↓
    Validation
       ↓
    Request

But Burp sits after the browser has produced the request:

    Browser
       ↓
    Client-side validation
       ↓
    HTTP Request
       ↓
    BURP
       ↓
    Modify
       ↓
    Server

Therefore:

    Client-side validation
          ≠
    Trusted security boundary

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 24. SECURE APPLICATION MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    User Input
       ↓
    Client-side validation
       ↓
    HTTP Request
       ↓
    SERVER-SIDE VALIDATION
       ↓
    Authorisation
       ↓
    Safe processing
       ↓
    Output encoding
       ↓
    Browser

Remember:

    Client = Untrusted

    Server = Security boundary

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔡 25. URL ENCODING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp shortcut:

    Ctrl + U

Example:

    <  →  %3C
    >  →  %3E

Purpose:

    Encode special characters into URL-encoded form.

Workflow:

    Select text
       ↓
    Ctrl + U
       ↓
    Encoded text
       ↓
    Send request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 26. SETTINGS QUICK MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COOKIE JAR:

    Settings
       ↓
    Sessions
       ↓
    Cookie jar

UPDATES:

    Settings
       ↓
    Suite
       ↓
    Updates

HOTKEYS:

    Settings
       ↓
    User interface
       ↓
    Hotkeys

PROXY:

    Settings
       ↓
    Tools
       ↓
    Proxy

BURP BROWSER:

    Settings
       ↓
    Tools
       ↓
    Burp's browser

SCOPE:

    Target
       ↓
    Scope settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⌨️ 27. SHORTCUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ctrl + Shift + D
        → Dashboard

    Ctrl + Shift + T
        → Target

    Ctrl + Shift + P
        → Proxy

    Ctrl + Shift + I
        → Intruder

    Ctrl + Shift + R
        → Repeater

    Ctrl + U
        → URL encode

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 28. ROOM-SPECIFIC VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Proxy:

    127.0.0.1:8080

Target:

    http://10.48.155.152/

Certificate:

    http://burp/cert

Certificate:

    cert.der

CA:

    PortSwigger CA

XSS success:

    Succ3ssful XSS

Unusual endpoint challenge flag:

    THM{NmNIZTINGE1MWU1ZTQzMzgzNmFiNWVk}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 29. BURP MODULE MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    TARGET
       ↓
    "Where is everything?"

    PROXY
       ↓
    "What is happening?"

    REPEATER
       ↓
    "Send it again."

    INTRUDER
       ↓
    "Try many values."

    DECODER
       ↓
    "What does this encoded data mean?"

    COMPARER
       ↓
    "What changed?"

    SEQUENCER
       ↓
    "How random is this token?"

    COLLABORATOR
       ↓
    "Did the target interact with my external endpoint?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 30. PROXY MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    L → Listener
    I → Intercept
    H → History
    W → WebSockets
    M → Match & Replace

Remember:

    "LISTEN → INTERCEPT → HISTORY → WEBSOCKET → MODIFY"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 31. TARGET MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    S → Site Map
    I → Issue Definitions
    S → Scope

Remember:

    "MAP → ISSUES → SCOPE"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 32. HTTPS MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    C → CA
    D → Download
    I → Import
    T → Trust
    I → Intercept

Remember:

    "CA → DOWNLOAD → IMPORT → TRUST → INTERCEPT"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 33. XSS MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    I → Input
    F → Filter
    B → Burp
    M → Modify
    F → Forward
    X → XSS

Remember:

    "INPUT → FILTER → BURP → MODIFY → FORWARD → XSS"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 34. COMMON TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROBLEM:

    Burp receives no browser traffic.

CHECK:

    Burp running?
       ↓
    Listener active?
       ↓
    Browser proxy configured?
       ↓
    127.0.0.1:8080 correct?
       ↓
    FoxyProxy enabled?
       ↓
    Correct browser/profile?

──────────────────────────────────────────────────────────────

PROBLEM:

    Browser hangs.

CHECK:

    Intercept ON?
       ↓
    Forward request.

──────────────────────────────────────────────────────────────

PROBLEM:

    HTTPS certificate error.

CHECK:

    PortSwigger CA imported?
       ↓
    Firefox Authorities?
       ↓
    cert.der trusted?

──────────────────────────────────────────────────────────────

PROBLEM:

    Too much traffic.

CHECK:

    Define scope.
       ↓
    Add target to scope.
       ↓
    Intercept only:
        URL → Is in target scope

──────────────────────────────────────────────────────────────

PROBLEM:

    Burp Browser does not launch.

CHECK:

    Running Burp as root?
       ↓
    Sandbox issue?
       ↓
    Use low-privilege user.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 35. PRACTICAL CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before testing:

    [ ] Authorization confirmed
    [ ] Target identified
    [ ] Scope defined
    [ ] Burp started
    [ ] Proxy listener verified
    [ ] Browser proxy configured
    [ ] HTTPS CA configured if required

During testing:

    [ ] Intercept useful requests
    [ ] Review HTTP history
    [ ] Review Site Map
    [ ] Identify interesting endpoints
    [ ] Inspect parameters
    [ ] Test authorised functionality
    [ ] Record findings

After testing:

    [ ] Validate findings
    [ ] Preserve evidence
    [ ] Document impact
    [ ] Document reproduction steps
    [ ] Report responsibly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 36. PROFESSIONAL SECURITY MINDSET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Always think:

    "What does the browser send?"

instead of only:

    "What does the website show me?"

Because the browser UI is only one representation of the
application.

Burp exposes the underlying HTTP communication.

Therefore:

    UI
      ↓
    HTTP Request
      ↓
    Burp
      ↓
    Actual application behaviour

This is why Burp is so important for web security testing.

## Interview Questions

Q1.
What is Burp Suite?

Answer

A web application security testing platform developed by
PortSwigger.

------------------------------------------------------------

Q2.
What is Burp Proxy?

Answer

An intermediary that allows HTTP/HTTPS traffic to be
intercepted, inspected and modified.

------------------------------------------------------------

Q3.
What is Intercept?

Answer

A feature that pauses matching requests/responses for inspection
and modification.

------------------------------------------------------------

Q4.
What is HTTP History?

Answer

A record of HTTP requests and responses that passed through Burp.

------------------------------------------------------------

Q5.
What is Site Map?

Answer

A structured representation of discovered application resources.

------------------------------------------------------------

Q6.
What is scope?

Answer

The set of targets included or excluded from testing.

------------------------------------------------------------

Q7.
Why configure scope?

Answer

To reduce traffic noise and avoid unintended testing.

------------------------------------------------------------

Q8.
Why install PortSwigger CA?

Answer

To allow the browser to trust Burp-generated certificates for
HTTPS interception.

------------------------------------------------------------

Q9.
What is FoxyProxy?

Answer

A browser extension for managing proxy configurations.

------------------------------------------------------------

Q10.
What is Repeater?

Answer

A tool for manually modifying and repeatedly sending requests.

------------------------------------------------------------

Q11.
What is Intruder?

Answer

A tool for customised automated payload testing.

------------------------------------------------------------

Q12.
Why is client-side validation insufficient?

Answer

Because the client is controlled by the user and HTTP requests
can be modified before reaching the server.

------------------------------------------------------------

## 🏆 38. FINAL BURP MINDSET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                    TARGET
                      │
                      ▼
                    SCOPE
                      │
                      ▼
                  BROWSER
                      │
                      ▼
                    PROXY
                      │
                      ▼
                 INTERCEPT
                      │
                      ▼
                   INSPECT
                      │
                      ▼
                   MODIFY
                      │
                      ▼
                   FORWARD
                      │
                      ▼
                    SERVER
                      │
                      ▼
                  RESPONSE
                      │
                      ▼
                  ANALYSE
                      │
                      ▼
                VULNERABILITY
                      │
                      ▼
                  VALIDATE
                      │
                      ▼
                   REPORT

This workflow is the foundation for manual web application
penetration testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔥 39. FINAL ONE-PAGE CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BURP:

    Web Security Testing Platform

PROXY:

    Browser ↔ Burp ↔ Server

LISTENER:

    127.0.0.1:8080

INTERCEPT:

    ON  → Pause
    OFF → Pass through

HISTORY:

    Review captured HTTP traffic

SITE MAP:

    Map application structure

SCOPE:

    Include / Exclude targets

HTTPS:

    PortSwigger CA
       ↓
    cert.der
       ↓
    Firefox Trust
       ↓
    HTTPS interception

FOXYPROXY:

    HTTP
    127.0.0.1
    8080

BURP BROWSER:

    Built-in Chromium browser

XSS:

    Client validation
       ↓
    Burp intercept
       ↓
    Modify request
       ↓
    Server
       ↓
    XSS

ENCODING:

    Ctrl + U

IMPORTANT:

    CLIENT = UNTRUSTED

    SERVER = SECURITY BOUNDARY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 PART 8 COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP SUITE: THE BASICS
             │
             ▼
    ┌─────────────────────────┐
    │  UNDERSTAND             │
    │  CONFIGURE              │
    │  PROXY                  │
    │  INTERCEPT              │
    │  SCOPE                  │
    │  ANALYSE               │
    │  MODIFY                 │
    │  TEST                   │
    └─────────────────────────┘
             │
             ▼
       CORE BURP SKILL
             │
             ▼
       NEXT: REPEATER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 BURP SUITE: THE BASICS — FINAL REVISION & PRACTICAL WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎯 PART 9 PURPOSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This section is the final practical revision of the Burp Suite
Basics room.

The main objective is to connect all concepts into one workflow:

    TARGET
      ↓
    SCOPE
      ↓
    BROWSER
      ↓
    PROXY
      ↓
    INTERCEPT
      ↓
    INSPECT
      ↓
    MODIFY
      ↓
    FORWARD
      ↓
    RESPONSE
      ↓
    ANALYSE
      ↓
    VALIDATE
      ↓
    REPORT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 1. BURP SUITE — COMPLETE MENTAL MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Think of Burp as a controlled middleman.

Without Burp:

    Browser
       │
       ▼
    Web Server

With Burp:

    Browser
       │
       ▼
    ┌───────────────┐
    │  BURP PROXY   │
    └───────┬───────┘
            │
            ▼
       Web Server

Burp allows us to see and control the communication.

    REQUEST:
        Browser → Burp → Server

    RESPONSE:
        Server → Burp → Browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 2. COMPLETE WEB TESTING ARCHITECTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                         TARGET APPLICATION
                                ▲
                                │
                         HTTP / HTTPS
                                │
                         ┌──────┴──────┐
                         │ BURP PROXY  │
                         └──────┬──────┘
                                ▲
                                │
                         127.0.0.1:8080
                                ▲
                                │
                         ┌──────┴──────┐
                         │   BROWSER   │
                         └─────────────┘

The browser can be:

    OPTION 1:
        Firefox + FoxyProxy

    OPTION 2:
        Burp's built-in Chromium browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🦊 3. FIREFOX + FOXYPROXY — QUICK SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Firefox
       ↓
    FoxyProxy
       ↓
    Options
       ↓
    Add
       ↓
    Name = Burp
       ↓
    Type = HTTP
       ↓
    IP = 127.0.0.1
       ↓
    Port = 8080
       ↓
    Save
       ↓
    Activate

Final:

    Firefox
       ↓
    FoxyProxy
       ↓
    127.0.0.1:8080
       ↓
    Burp
       ↓
    Target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 4. FIRST TROUBLESHOOTING CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If Burp does not receive traffic:

    CHECK 1:
        Is Burp running?

    CHECK 2:
        Is the proxy listener active?

    CHECK 3:
        Is Firefox using FoxyProxy?

    CHECK 4:
        Is the proxy:

            127.0.0.1:8080

    CHECK 5:
        Is traffic actually being generated?

    CHECK 6:
        Is the correct target being accessed?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 5. INTERCEPT TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Browser appears stuck:

    Browser
       ↓
    Request
       ↓
    Burp
       ↓
    Intercept ON
       ↓
    Request held

Solution:

    Click Forward

or:

    Click Drop

Remember:

    "Browser hanging does not always mean networking is broken."

It may simply mean Burp is waiting for your decision.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📜 6. HTTP HISTORY — INVESTIGATION FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Browse application
          ↓
    Requests pass through Burp
          ↓
    Proxy → HTTP history
          ↓
    Review requests
          ↓
    Identify interesting endpoints
          ↓
    Select request
          ↓
    Inspect request/response

Things to investigate:

    /login
    /register
    /admin
    /api
    /profile
    /users
    /settings
    /logout

Also look for:

    Parameters
    Cookies
    Headers
    IDs
    JSON
    Redirects
    Error messages

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗺️ 7. SITE MAP — APPLICATION DISCOVERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Start at homepage
          ↓
    Browse links
          ↓
    Burp captures traffic
          ↓
    Target → Site map
          ↓
    Application tree
          ↓
    Identify interesting resources

Example:

    target.local
       │
       ├── /
       ├── /login
       ├── /register
       ├── /dashboard
       ├── /profile
       ├── /admin
       └── /api
             ├── /users
             ├── /orders
             └── /products

IMPORTANT:

    Site Map = Application structure

    HTTP History = Traffic history

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 8. SCOPING — ALWAYS DEFINE YOUR TARGET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scope:

    INCLUDE
       +
    EXCLUDE

Example:

    INCLUDE:

        http://10.48.155.152/

Then:

    Target
       ↓
    Site map
       ↓
    Right-click
       ↓
    Add to scope

Manage through:

    Target
       ↓
    Scope settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 9. SCOPE + INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Adding a target to scope does not by itself mean Burp will
automatically intercept only that traffic.

Configure:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Request interception rules
       ↓
    URL
       ↓
    Is in target scope

Final logic:

    Request
       │
       ▼
    In scope?
       │
       ├── YES → Intercept
       │
       └── NO  → Do not intercept

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧹 10. WHY SCOPE REDUCES NOISE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Modern websites can generate many requests.

Examples:

    HTML
    JavaScript
    CSS
    Images
    Fonts
    APIs
    Analytics
    WebSockets
    Third-party resources

Without scope:

    Browser
       ↓
    Many requests
       ↓
    Burp
       ↓
    Huge history

With scope:

    Browser
       ↓
    Many requests
       ↓
    Scope filter
       ↓
    Relevant target traffic

Result:

    Cleaner
    Faster
    Easier
    Safer

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 11. HTTPS — FINAL UNDERSTANDING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTP:

    Browser
       ↓
    Burp
       ↓
    Server

HTTPS:

    Browser
       ↓
    TLS
       ↓
    Burp
       ↓
    TLS
       ↓
    Server

For Burp to intercept HTTPS, the browser must trust the
PortSwigger CA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ 12. PORTSWIGGER CA — COMPLETE SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open:

    http://burp/cert

Download:

    cert.der

Firefox:

    Settings
       ↓
    Privacy & Security
       ↓
    Certificates
       ↓
    View Certificates
       ↓
    Authorities
       ↓
    Import
       ↓
    cert.der
       ↓
    Trust this CA to identify websites

CA:

    PortSwigger CA

Result:

    Firefox
       ↓
    Trust PortSwigger CA
       ↓
    Burp-generated certificates accepted
       ↓
    HTTPS traffic can be inspected

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 13. HTTPS CERTIFICATE WARNING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If HTTPS does not work:

    CHECK:

    Is FoxyProxy active?
       ↓
    Is Burp running?
       ↓
    Is proxy 127.0.0.1:8080?
       ↓
    Is PortSwigger CA imported?
       ↓
    Is CA trusted?
       ↓
    Is browser using the correct certificate store?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 14. BURP BROWSER — ALTERNATIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Instead of configuring Firefox:

    Burp
      ↓
    Proxy
      ↓
    Open browser

Burp's browser is Chromium-based and already configured for
Burp Proxy.

Therefore:

    No FoxyProxy setup required.

Flow:

    Burp Browser
       ↓
    Burp Proxy
       ↓
    Target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 15. BURP BROWSER SANDBOX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Potential issue:

    Burp running as root
       ↓
    Chromium sandbox
       ↓
    Browser may fail to launch

Preferred solution:

    Use a low-privilege user.

Alternative:

    Settings
       ↓
    Tools
       ↓
    Burp's browser
       ↓
    Allow browser to run without a sandbox

Security:

    Sandbox ON
       ↓
    Better isolation

    Sandbox OFF
       ↓
    Reduced isolation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 16. REQUEST ANATOMY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A typical HTTP request contains:

    METHOD
       ↓
    PATH / URL
       ↓
    HEADERS
       ↓
    COOKIES
       ↓
    PARAMETERS
       ↓
    BODY

Example:

    POST /login HTTP/1.1
    Host: target.local
    Content-Type: application/x-www-form-urlencoded
    Cookie: session=abc123

    username=user&password=password

When testing, understand every part of the request.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔎 17. WHAT TO INSPECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REQUEST:

    • Method
    • URL
    • Query parameters
    • Headers
    • Cookies
    • Body
    • Content-Type
    • Authentication information

RESPONSE:

    • Status code
    • Headers
    • Cookies
    • Response body
    • Redirects
    • Error messages
    • Content-Type

Mental model:

    Request
       ↓
    "What am I sending?"

    Response
       ↓
    "What did the server return?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✏️ 18. REQUEST MODIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp allows a tester to modify request data.

Example:

    Original:

    GET /profile?id=10 HTTP/1.1

    Modified:

    GET /profile?id=11 HTTP/1.1

Flow:

    Capture
       ↓
    Inspect
       ↓
    Modify
       ↓
    Forward
       ↓
    Observe
       ↓
    Compare behaviour

This is the basic method behind many manual web security tests.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 19. MATCH AND REPLACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Match and Replace automates repetitive request modifications.

Flow:

    Request
       ↓
    Match condition
       ↓
    Replacement
       ↓
    Modified request
       ↓
    Target

Examples:

    Header modification
    User-Agent modification
    Cookie modification
    Request data modification

Use carefully and only within authorised scope.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 20. RESPONSE INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Response interception can be configured using rules.

Concept:

    Server
       ↓
    Response
       ↓
    Burp
       ↓
    Response rule
       │
       ├── Match → Intercept
       │
       └── No match → Continue
       ↓
    Browser

Possible matching conditions include:

    Content-Type
    Status code
    Request properties
    Target scope

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🍪 21. COOKIES & SESSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Cookies commonly identify sessions.

Example:

    Cookie: session=abc123

Burp can inspect cookies as part of captured requests.

Settings category:

    Sessions
       ↓
    Cookie jar

Mental model:

    Login
       ↓
    Session created
       ↓
    Cookie assigned
       ↓
    Browser sends cookie
       ↓
    Server identifies session

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 22. XSS — FINAL PRACTICAL MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The room demonstrates an XSS example through a support form.

Flow:

    Open form
       ↓
    Enter input
       ↓
    Submit
       ↓
    Burp intercepts request
       ↓
    Locate parameter
       ↓
    Modify value
       ↓
    Forward
       ↓
    Server processes input
       ↓
    XSS demonstrated

Result shown by the room:

    Succ3ssful XSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 23. CLIENT-SIDE VALIDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Example:

    Browser
       ↓
    JavaScript validation
       ↓
    Reject malicious input
       ↓
    Request

But with Burp:

    Browser
       ↓
    Client-side validation
       ↓
    HTTP Request
       ↓
    BURP
       ↓
    Modify
       ↓
    Server

Therefore:

    Client-side validation
          ↓
    Can be bypassed

IMPORTANT:

    Client-side controls improve UX.

    They should NOT be treated as the application's
    primary security boundary.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 24. SERVER-SIDE SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Correct:

    User Input
       ↓
    Server
       ↓
    Validate
       ↓
    Authorise
       ↓
    Process safely
       ↓
    Encode output
       ↓
    Browser

Wrong:

    User Input
       ↓
    Browser JavaScript
       ↓
    "Looks safe"
       ↓
    Trust input blindly

Security principle:

    ALL CLIENT INPUT IS UNTRUSTED.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔡 25. URL ENCODING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Shortcut:

    Ctrl + U

Example:

    <  →  %3C
    >  →  %3E

Use:

    Select text
       ↓
    Ctrl + U
       ↓
    URL encoded value

This is useful when working with HTTP request data containing
characters that need URL encoding.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎛️ 26. BURP SETTINGS — QUICK MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    SETTINGS
       │
       ├── Sessions
       │     └── Cookie jar
       │
       ├── Suite
       │     └── Updates
       │
       ├── User interface
       │     └── Hotkeys
       │
       └── Tools
             ├── Proxy
             └── Burp's browser

Target:

    Target
       └── Scope settings

Proxy:

    Proxy
       ├── Intercept
       ├── HTTP history
       ├── WebSockets history
       └── Proxy settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⌨️ 27. KEYBOARD SHORTCUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ctrl + Shift + D
        → Dashboard

    Ctrl + Shift + T
        → Target

    Ctrl + Shift + P
        → Proxy

    Ctrl + Shift + I
        → Intruder

    Ctrl + Shift + R
        → Repeater

    Ctrl + U
        → URL encode selected text

MEMORY:

    D = Dashboard
    T = Target
    P = Proxy
    I = Intruder
    R = Repeater

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 28. ROOM-SPECIFIC VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BURP PROXY:

    127.0.0.1:8080

TARGET:

    http://10.48.155.152/

BURP CERTIFICATE:

    http://burp/cert

CERTIFICATE FILE:

    cert.der

CERTIFICATE AUTHORITY:

    PortSwigger CA

XSS SUCCESS MESSAGE:

    Succ3ssful XSS

SITE MAP CHALLENGE FLAG:

    THM{NmNIZTINGE1MWU1ZTQzMzgzNmFiNWVk}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 29. BURP MODULE CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    TARGET
       ↓
    Map the application

    PROXY
       ↓
    Intercept traffic

    REPEATER
       ↓
    Replay manually

    INTRUDER
       ↓
    Automated/custom payload testing

    DECODER
       ↓
    Encode/decode

    COMPARER
       ↓
    Compare data

    SEQUENCER
       ↓
    Analyse token randomness

    COLLABORATOR
       ↓
    Out-of-band interactions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔥 30. BURP PROXY CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Proxy
       │
       ├── Intercept
       │     └── Pause / Modify / Forward / Drop
       │
       ├── HTTP History
       │     └── Review requests
       │
       ├── WebSockets History
       │     └── Review WebSocket traffic
       │
       └── Proxy Settings
             ├── Listeners
             ├── Interception rules
             ├── Response rules
             └── Match & Replace

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 31. TARGET CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Target
       │
       ├── Site Map
       │     └── Application structure
       │
       ├── Issue Definitions
       │     └── Vulnerability information
       │
       └── Scope
             ├── Include
             └── Exclude

MEMORY:

    TARGET = MAP + ISSUES + SCOPE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 32. HTTPS CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    HTTPS
      ↓
    TLS encryption
      ↓
    Burp needs trusted CA
      ↓
    http://burp/cert
      ↓
    cert.der
      ↓
    Firefox Authorities
      ↓
    Import
      ↓
    Trust PortSwigger CA
      ↓
    HTTPS interception

MEMORY:

    CA
     ↓
    DER
     ↓
    IMPORT
     ↓
    TRUST
     ↓
    INTERCEPT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 33. XSS CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    INPUT
      ↓
    CLIENT FILTER
      ↓
    REQUEST
      ↓
    BURP
      ↓
    MODIFY
      ↓
    FORWARD
      ↓
    SERVER
      ↓
    XSS

Key lesson:

    Client-side validation ≠ server-side security.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 34. COMMON BEGINNER ERRORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ERROR 1:

    Burp running but no traffic.

FIX:

    Check:

        FoxyProxy
        127.0.0.1:8080
        Proxy listener
        Correct browser

──────────────────────────────────────────────────────────────

ERROR 2:

    Browser freezes.

FIX:

    Check Intercept.

    If ON:

        Forward request.

──────────────────────────────────────────────────────────────

ERROR 3:

    HTTPS certificate warning.

FIX:

    Import PortSwigger CA.

──────────────────────────────────────────────────────────────

ERROR 4:

    Too much traffic.

FIX:

    Define scope.

──────────────────────────────────────────────────────────────

ERROR 5:

    Burp Browser does not launch.

FIX:

    Avoid running Burp as root.

    Prefer a low-privilege user.

──────────────────────────────────────────────────────────────

ERROR 6:

    Unwanted requests are intercepted.

FIX:

    Configure:

        URL → Is in target scope

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 35. PRACTICAL TESTING CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEFORE TESTING:

    [✓] Have authorization
    [✓] Know target
    [✓] Know scope
    [✓] Start Burp
    [✓] Configure browser
    [✓] Configure HTTPS CA if needed

DURING TESTING:

    [✓] Browse target
    [✓] Check HTTP history
    [✓] Check Site Map
    [✓] Identify endpoints
    [✓] Inspect parameters
    [✓] Inspect cookies
    [✓] Inspect headers
    [✓] Modify authorised requests
    [✓] Analyse responses

AFTER TESTING:

    [✓] Validate finding
    [✓] Record evidence
    [✓] Document impact
    [✓] Document reproduction
    [✓] Report responsibly

## Interview Questions

Q1.
What is Burp Suite?

Answer

A web application security testing platform developed by
PortSwigger.

------------------------------------------------------------

Q2.
What does Burp Proxy do?

Answer

It acts as an intermediary between client and server and allows
HTTP/HTTPS traffic to be intercepted, inspected and modified.

------------------------------------------------------------

Q3.
What is a Proxy Listener?

Answer

A local endpoint where Burp listens for incoming proxy traffic.

------------------------------------------------------------

Q4.
What is 127.0.0.1?

Answer

The IPv4 loopback address, commonly called localhost.

------------------------------------------------------------

Q5.
What is HTTP History?

Answer

A record of requests and responses that passed through Burp.

------------------------------------------------------------

Q6.
What is Site Map?

Answer

A structured representation of resources discovered on a target.

------------------------------------------------------------

Q7.
What is scope?

Answer

The defined set of hosts/URLs that are intended to be tested.

------------------------------------------------------------

Q8.
What is FoxyProxy?

Answer

A browser extension for managing proxy configurations.

------------------------------------------------------------

Q9.
Why install the PortSwigger CA?

Answer

To allow the browser to trust Burp-generated certificates during
HTTPS interception.

------------------------------------------------------------

Q10.
What is Repeater?

Answer

A tool used to manually modify and resend HTTP requests.

------------------------------------------------------------

Q11.
What is Intruder?

Answer

A tool used for customised automated payload testing.

------------------------------------------------------------

Q12.
Why is client-side validation insufficient?

Answer

Because the client is under the user's control and requests can
be modified before reaching the server.

------------------------------------------------------------

## 🧠 37. FINAL MEMORY PALACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BURP:

    CONTROL WEB TRAFFIC

PROXY:

    Browser ↔ Burp ↔ Server

INTERCEPT:

    Pause

FORWARD:

    Continue

DROP:

    Discard

HISTORY:

    Review

SITE MAP:

    Discover

SCOPE:

    Limit

HTTPS:

    Trust CA

XSS:

    Test input handling

SERVER:

    Validate everything

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏆 38. COMPLETE BURP WORKFLOW — ONE SCREEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    ┌───────────────────────────────────────┐
    │          1. AUTHORISATION             │
    └───────────────────┬───────────────────┘
                        ▼
    ┌───────────────────────────────────────┐
    │             2. DEFINE SCOPE            │
    └───────────────────┬───────────────────┘
                        ▼
    ┌───────────────────────────────────────┐
    │             3. START BURP              │
    └───────────────────┬───────────────────┘
                        ▼
    ┌───────────────────────────────────────┐
    │          4. CONFIGURE BROWSER          │
    │              127.0.0.1:8080           │
    └───────────────────┬───────────────────┘
                        ▼
    ┌───────────────────────────────────────┐
    │             5. BROWSE TARGET           │
    └───────────────────┬───────────────────┘
                        ▼
    ┌───────────────────────────────────────┐
    │            6. CAPTURE TRAFFIC          │
    └───────────────────┬───────────────────┘
                        ▼
    ┌───────────────────────────────────────┐
    │           7. BUILD SITE MAP            │
    └───────────────────┬───────────────────┘
                        ▼
    ┌───────────────────────────────────────┐
    │          8. INSPECT REQUESTS           │
    └───────────────────┬───────────────────┘
                        ▼
    ┌───────────────────────────────────────┐
    │          9. MODIFY / REPLAY             │
    └───────────────────┬───────────────────┘
                        ▼
    ┌───────────────────────────────────────┐
    │          10. ANALYSE RESPONSE          │
    └───────────────────┬───────────────────┘
                        ▼
    ┌───────────────────────────────────────┐
    │          11. VALIDATE FINDING          │
    └───────────────────┬───────────────────┘
                        ▼
    ┌───────────────────────────────────────┐
    │             12. REPORT                │
    └───────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 39. PROFESSIONAL RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RULE 1:

    Always verify authorization.

RULE 2:

    Define scope before testing.

RULE 3:

    Treat client-controlled data as untrusted.

RULE 4:

    Do not assume browser validation is security.

RULE 5:

    Use server-side validation.

RULE 6:

    Understand the request before modifying it.

RULE 7:

    Keep testing within scope.

RULE 8:

    Preserve evidence for validated findings.

RULE 9:

    Report responsibly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ 40. 30-SECOND REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP
      ↓
    Proxy
      ↓
    127.0.0.1:8080
      ↓
    Browser
      ↓
    Target
      ↓
    Intercept
      ↓
    Inspect
      ↓
    Modify
      ↓
    Forward
      ↓
    History
      ↓
    Site Map
      ↓
    Scope
      ↓
    HTTPS
      ↓
    PortSwigger CA
      ↓
    cert.der
      ↓
    Test
      ↓
    Validate
      ↓
    Report

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 PART 9 COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP SUITE: THE BASICS

    CORE CONCEPT:

        Browser
           ↓
        Burp
           ↓
        Target

    CORE ACTIONS:

        Intercept
        Inspect
        Modify
        Forward
        Drop
        Analyse

    CORE MODULES:

        Target
        Proxy
        Repeater
        Intruder
        Decoder
        Comparer
        Sequencer
        Collaborator

    CORE CONFIGURATION:

        127.0.0.1:8080
        FoxyProxy
        PortSwigger CA
        cert.der
        Scope

    CORE SECURITY LESSON:

        CLIENT INPUT
             ↓
        NEVER TRUST
             ↓
        SERVER-SIDE VALIDATION
             ↓
        SECURE PROCESSING

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏆 BURP SUITE: THE BASICS — MASTERED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    ████████████████████████████████████████ 100%

    ✓ Proxy
    ✓ Intercept
    ✓ HTTP History
    ✓ WebSocket History
    ✓ Site Map
    ✓ Scope
    ✓ FoxyProxy
    ✓ Burp Browser
    ✓ HTTPS
    ✓ PortSwigger CA
    ✓ Request Modification
    ✓ Match & Replace
    ✓ XSS
    ✓ Client-side Validation
    ✓ Server-side Validation
    ✓ Troubleshooting
    ✓ Practical Workflow
    ✓ Interview Revision

    NEXT SKILL:

        → Burp Suite Repeater
        → Manual Request Manipulation
        → Advanced Web Application Testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 BURP SUITE: THE BASICS — MASTER CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎯 PURPOSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This is the final compact revision section for:

    BURP SUITE: THE BASICS

The complete concept:

    BROWSER
       ↓
    PROXY
       ↓
    INTERCEPT
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    FORWARD
       ↓
    SERVER
       ↓
    RESPONSE
       ↓
    ANALYSE
       ↓
    VALIDATE
       ↓
    REPORT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 1. BURP SUITE — ONE-LINE DEFINITION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite is a web application security testing platform
developed by PortSwigger.

Its most important capability:

    CONTROL + ANALYSE WEB TRAFFIC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 2. BURP PROXY — CORE IDEA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Normal:

    Browser
       │
       ▼
    Server

With Burp:

    Browser
       │
       ▼
    BURP PROXY
       │
       ▼
    Server

Burp becomes the middleman.

This allows the tester to:

    ✓ Intercept
    ✓ Inspect
    ✓ Modify
    ✓ Forward
    ✓ Drop
    ✓ Analyse

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔥 3. COMPLETE TRAFFIC FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    ┌───────────┐
    │  BROWSER  │
    └─────┬─────┘
          │
          ▼
    ┌───────────────┐
    │ FOXYPROXY     │
    └──────┬────────┘
           │
           ▼
    127.0.0.1:8080
           │
           ▼
    ┌───────────────┐
    │ BURP PROXY    │
    └──────┬────────┘
           │
           ├── Intercept
           ├── Inspect
           ├── Modify
           ├── Forward
           └── Drop
           │
           ▼
    ┌───────────────┐
    │ TARGET SERVER │
    └───────────────┘

Response:

    Server
       ↓
    Burp
       ↓
    Browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🦊 4. FOXYPROXY QUICK CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Name:
        Burp

    Proxy Type:
        HTTP

    IP:
        127.0.0.1

    Port:
        8080

Final:

    127.0.0.1:8080
          ↓
      Burp Proxy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 5. INTERCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
      ↓
    Intercept

Enable:

    Intercept is ON

Flow:

    Browser
       ↓
    Request
       ↓
    Burp
       ↓
    HOLD
       │
       ├── Modify
       ├── Forward
       └── Drop

Meaning:

    Forward
        → Send request to target

    Drop
        → Discard request

    Modify
        → Change request before sending

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📜 6. HTTP HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
      ↓
    HTTP history

Purpose:

    Review requests/responses that passed through Burp.

Look for:

    • GET / POST
    • URLs
    • Parameters
    • Headers
    • Cookies
    • Status codes
    • Content types
    • API endpoints
    • Redirects
    • Error messages

Memory:

    INTERCEPT = NOW

    HTTP HISTORY = PAST TRAFFIC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔌 7. WEBSOCKET HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
      ↓
    WebSockets history

Used to inspect WebSocket communication.

Useful for:

    • Real-time applications
    • Chat
    • Notifications
    • Live updates
    • Interactive web applications

Flow:

    Browser
       ↓
    WebSocket
       ↓
    Burp
       ↓
    Server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗺️ 8. TARGET — SITE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Target
      ↓
    Site map

Site Map shows discovered application resources.

Example:

    target
      │
      ├── /
      ├── /login
      ├── /register
      ├── /dashboard
      ├── /profile
      ├── /admin
      └── /api
            ├── /users
            ├── /orders
            └── /products

MEMORY:

    HTTP History
        = What happened?

    Site Map
        = What exists?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 9. TARGET SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scope defines what should be tested.

Workflow:

    Target
       ↓
    Site map
       ↓
    Select target
       ↓
    Add to scope
       ↓
    Scope settings

Concept:

    INCLUDE
       +
    EXCLUDE

Example:

    INCLUDE:
        http://10.48.155.152/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 10. SCOPE + INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To intercept only in-scope traffic:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Request interception rules
       ↓
    URL
       ↓
    Is in target scope

Logic:

    Request
       ↓
    In scope?
       │
       ├── YES → Intercept
       │
       └── NO  → Ignore

Benefits:

    ✓ Less noise
    ✓ Better focus
    ✓ Cleaner history
    ✓ Reduced accidental testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 11. BURP SUITE BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp provides a built-in Chromium-based browser.

Open:

    Proxy
      ↓
    Open browser

Flow:

    Burp Browser
       ↓
    Burp Proxy
       ↓
    Target

Advantages:

    ✓ Already configured
    ✓ No FoxyProxy required
    ✓ Convenient for testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 12. BURP BROWSER SANDBOX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Potential problem:

    Burp running as root
       ↓
    Chromium sandbox
       ↓
    Browser may fail

Preferred:

    Run Burp as a low-privilege user.

Alternative:

    Settings
       ↓
    Tools
       ↓
    Burp's browser
       ↓
    Allow browser without sandbox

Security trade-off:

    Sandbox ON
        → Better isolation

    Sandbox OFF
        → Reduced isolation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 13. HTTPS INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTPS uses TLS encryption.

Burp needs a trusted CA to inspect HTTPS traffic.

Flow:

    Browser
       │
       │ HTTPS
       ▼
    Burp
       │
       │ HTTPS
       ▼
    Server

Browser must trust:

    PortSwigger CA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ 14. PORTSWIGGER CA SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open:

    http://burp/cert

Download:

    cert.der

Firefox:

    Settings
       ↓
    Privacy & Security
       ↓
    Certificates
       ↓
    View Certificates
       ↓
    Authorities
       ↓
    Import
       ↓
    cert.der
       ↓
    Trust this CA to identify websites

Result:

    HTTPS
       ↓
    Burp
       ↓
    Browser trusts Burp certificate
       ↓
    HTTPS interception works

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 15. CA SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A trusted CA has significant authority.

Therefore:

    CA
       ↓
    Trust
       ↓
    Certificates issued by CA
       ↓
    Browser accepts them

Only install a CA certificate from a source you intentionally
trust and only where appropriate.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 16. HTTP REQUEST ANATOMY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Typical request:

    METHOD /path HTTP/version
    Host: target
    Header: value
    Cookie: value

    Body

Important parts:

    METHOD
       ↓
    URL / PATH
       ↓
    PARAMETERS
       ↓
    HEADERS
       ↓
    COOKIES
       ↓
    BODY

Example:

    GET /profile?id=10 HTTP/1.1
    Host: target.local
    Cookie: session=abc123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔎 17. REQUEST vs RESPONSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REQUEST:

    "What am I sending?"

    Inspect:
        • Method
        • URL
        • Parameters
        • Headers
        • Cookies
        • Body

RESPONSE:

    "What did the server return?"

    Inspect:
        • Status code
        • Headers
        • Cookies
        • Body
        • Redirects
        • Errors
        • Content type

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✏️ 18. MODIFYING REQUESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Example:

    Original:

    GET /profile?id=10 HTTP/1.1

    Modified:

    GET /profile?id=11 HTTP/1.1

Workflow:

    Capture
       ↓
    Inspect
       ↓
    Modify
       ↓
    Forward
       ↓
    Analyse response

This is one of the fundamental Burp testing techniques.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 19. MATCH AND REPLACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Match and Replace

Purpose:

    Automatically modify matching traffic.

Flow:

    Request
       ↓
    Match
       ↓
    Replace
       ↓
    Modified Request
       ↓
    Target

Possible uses:

    • Headers
    • User-Agent
    • Cookies
    • Request values

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 20. RESPONSE INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Flow:

    Server
       ↓
    Response
       ↓
    Burp
       ↓
    Response interception rule
       │
       ├── Match → Intercept
       └── No match → Continue
       ↓
    Browser

Useful when a tester needs to inspect or modify selected
responses during authorised testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🍪 21. COOKIES + SESSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Example:

    Cookie: session=abc123

Cookies often carry session identifiers.

Concept:

    Login
       ↓
    Session
       ↓
    Cookie
       ↓
    Browser
       ↓
    Server recognises session

Burp setting:

    Settings
       ↓
    Sessions
       ↓
    Cookie jar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 22. XSS EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The room's example uses a support form.

Flow:

    Support Form
       ↓
    User Input
       ↓
    Client-side Validation
       ↓
    HTTP Request
       ↓
    Burp
       ↓
    Modify Parameter
       ↓
    Forward
       ↓
    Server
       ↓
    Application
       ↓
    XSS

Room result:

    Succ3ssful XSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 23. CLIENT-SIDE VALIDATION BYPASS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Important security lesson:

    CLIENT-SIDE VALIDATION
            ≠
    SECURITY BOUNDARY

Why?

Because:

    Client
       ↓
    Controlled by user

Therefore:

    Browser validation
       ↓
    Can be bypassed
       ↓
    Request modified
       ↓
    Server receives modified input

Correct:

    Client-side validation
       +
    Server-side validation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 24. SERVER-SIDE VALIDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Secure architecture:

    User Input
       ↓
    Client Validation
       ↓
    HTTP Request
       ↓
    Server Validation
       ↓
    Authorization
       ↓
    Safe Processing
       ↓
    Output Encoding
       ↓
    Browser

Golden rule:

    NEVER TRUST CLIENT INPUT.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔡 25. URL ENCODING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp shortcut:

    Ctrl + U

Example:

    <  →  %3C

    >  →  %3E

Workflow:

    Select text
       ↓
    Ctrl + U
       ↓
    URL encoded
       ↓
    Send request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 26. IMPORTANT SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COOKIE JAR:

    Settings
      ↓
    Sessions
      ↓
    Cookie jar

UPDATES:

    Settings
      ↓
    Suite
      ↓
    Updates

HOTKEYS:

    Settings
      ↓
    User interface
      ↓
    Hotkeys

PROXY:

    Settings
      ↓
    Tools
      ↓
    Proxy

BURP BROWSER:

    Settings
      ↓
    Tools
      ↓
    Burp's browser

SCOPE:

    Target
      ↓
    Scope settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⌨️ 27. SHORTCUT CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ctrl + Shift + D
        → Dashboard

    Ctrl + Shift + T
        → Target

    Ctrl + Shift + P
        → Proxy

    Ctrl + Shift + I
        → Intruder

    Ctrl + Shift + R
        → Repeater

    Ctrl + U
        → URL Encode

MEMORY:

    D → Dashboard
    T → Target
    P → Proxy
    I → Intruder
    R → Repeater

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 28. IMPORTANT ROOM VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROXY:

    127.0.0.1:8080

TARGET:

    http://10.48.155.152/

BURP CA:

    PortSwigger CA

CERTIFICATE:

    cert.der

CERTIFICATE URL:

    http://burp/cert

XSS SUCCESS:

    Succ3ssful XSS

CHALLENGE FLAG:

    THM{NmNIZTINGE1MWU1ZTQzMzgzNmFiNWVk}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 29. BURP MODULE MEMORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    TARGET
       ↓
    MAP

    PROXY
       ↓
    INTERCEPT

    REPEATER
       ↓
    REPLAY

    INTRUDER
       ↓
    PAYLOADS

    DECODER
       ↓
    ENCODE / DECODE

    COMPARER
       ↓
    COMPARE

    SEQUENCER
       ↓
    RANDOMNESS

    COLLABORATOR
       ↓
    OUT-OF-BAND

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔥 30. COMPLETE PRACTICAL WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1:

    Get authorization.

STEP 2:

    Identify target.

STEP 3:

    Define scope.

STEP 4:

    Start Burp.

STEP 5:

    Configure browser.

STEP 6:

    Verify:

        127.0.0.1:8080

STEP 7:

    Browse target.

STEP 8:

    Capture request.

STEP 9:

    Inspect request.

STEP 10:

    Review HTTP History.

STEP 11:

    Review Site Map.

STEP 12:

    Identify interesting endpoints.

STEP 13:

    Modify authorised requests.

STEP 14:

    Forward.

STEP 15:

    Analyse response.

STEP 16:

    Validate finding.

STEP 17:

    Document.

STEP 18:

    Report.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 31. PRACTICAL TROUBLESHOOTING TREE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NO TRAFFIC:

    Burp running?
       │
       ├── NO → Start Burp
       │
       └── YES
            ↓
    Listener active?
            │
            ├── NO → Enable listener
            │
            └── YES
                 ↓
    Browser proxy correct?
                 │
                 ├── NO → 127.0.0.1:8080
                 │
                 └── YES
                      ↓
                   Traffic?

──────────────────────────────────────────────────────────────

BROWSER HANGS:

    Intercept ON?
       │
       ├── YES → Forward / Drop
       │
       └── NO → Investigate other issue

──────────────────────────────────────────────────────────────

HTTPS ERROR:

    PortSwigger CA installed?
       │
       ├── NO → Download cert.der
       │
       └── YES
            ↓
       Trusted in Firefox?
            │
            ├── NO → Import + Trust
            │
            └── YES → Continue troubleshooting

──────────────────────────────────────────────────────────────

TOO MUCH TRAFFIC:

    Define scope
       ↓
    Add target to scope
       ↓
    Use:
        URL → Is in target scope

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 32. WHAT TO REMEMBER FOR CTFs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When a TryHackMe web challenge starts:

    1. Start Burp.

    2. Configure browser.

    3. Confirm proxy:

        127.0.0.1:8080

    4. Browse target.

    5. Turn Intercept ON when you need to manipulate a request.

    6. Use HTTP History to find previous requests.

    7. Use Site Map to understand the application.

    8. Define scope.

    9. Inspect parameters.

    10. Look at cookies and headers.

    11. Modify requests carefully.

    12. Analyse responses.

    13. Use Repeater when repeated manual testing is required.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 33. HTTP HISTORY vs SITE MAP vs REPEATER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTP HISTORY:

    "What requests have I seen?"

SITE MAP:

    "What resources have I discovered?"

REPEATER:

    "How does the application respond if I resend/modify this?"

Flow:

    HTTP History
         ↓
    Find interesting request
         ↓
    Send to Repeater
         ↓
    Modify
         ↓
    Send
         ↓
    Compare response

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 34. INTERCEPT vs REPEATER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTERCEPT:

    Real-time traffic control.

    Browser
       ↓
    Burp
       ↓
    Pause
       ↓
    Modify
       ↓
    Forward

REPEATER:

    Manual request testing.

    Existing request
       ↓
    Repeater
       ↓
    Modify
       ↓
    Send
       ↓
    Analyse
       ↓
    Modify again
       ↓
    Send again

MEMORY:

    Intercept = Catch it.

    Repeater = Test it repeatedly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 35. WHY BURP IS POWERFUL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Without Burp:

    Browser UI
       ↓
    Limited visibility

With Burp:

    Browser
       ↓
    Raw HTTP
       ↓
    Headers
       ↓
    Cookies
       ↓
    Parameters
       ↓
    Request body
       ↓
    Response
       ↓
    Full traffic analysis

Therefore:

    BURP EXPOSES THE APPLICATION'S
    UNDERLYING HTTP COMMUNICATION.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 36. SECURITY PRINCIPLES LEARNED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRINCIPLE 1:

    Never trust client input.

PRINCIPLE 2:

    Client-side validation is not sufficient.

PRINCIPLE 3:

    Server-side validation is required.

PRINCIPLE 4:

    Define testing scope.

PRINCIPLE 5:

    HTTPS requires proper certificate trust for interception.

PRINCIPLE 6:

    Understand requests before modifying them.

PRINCIPLE 7:

    Validate security findings before reporting.

PRINCIPLE 8:

    Test only systems you are authorised to test.

## Interview Questions

Q1.
What is Burp Suite?

Answer

A web application security testing platform by PortSwigger.

------------------------------------------------------------

Q2.
What is a proxy?

Answer

An intermediary through which traffic passes between a client and
server.

------------------------------------------------------------

Q3.
What is Burp Proxy?

Answer

Burp's component for intercepting and analysing HTTP/HTTPS traffic.

------------------------------------------------------------

Q4.
What is the default proxy address used in the room?

Answer

127.0.0.1:8080

------------------------------------------------------------

Q5.
What does Intercept do?

Answer

It pauses matching traffic so the tester can inspect, modify,
forward or drop it.

------------------------------------------------------------

Q6.
What is HTTP History?

Answer

A record of traffic that has passed through Burp.

------------------------------------------------------------

Q7.
What is Site Map?

Answer

A tree representing discovered resources on the target.

------------------------------------------------------------

Q8.
What is scope?

Answer

The hosts/URLs intended to be included or excluded from testing.

------------------------------------------------------------

Q9.
Why is scope important?

Answer

It reduces noise and helps prevent accidental testing outside the
authorised target.

------------------------------------------------------------

Q10.
What is FoxyProxy?

Answer

A browser extension used to configure and switch proxy settings.

------------------------------------------------------------

Q11.
Why is PortSwigger CA needed?

Answer

To make the browser trust certificates generated by Burp during
HTTPS interception.

------------------------------------------------------------

Q12.
What is cert.der?

Answer

The Burp CA certificate file downloaded for browser trust setup.

------------------------------------------------------------

Q13.
What is Repeater?

Answer

A tool for manually modifying and repeatedly sending requests.

------------------------------------------------------------

Q14.
What is Intruder?

Answer

A tool for customised automated payload testing.

------------------------------------------------------------

Q15.
Why can client-side validation be bypassed?

Answer

Because the client is controlled by the user and the HTTP request
can be modified before reaching the server.

------------------------------------------------------------

## 🧠 38. MASTER MEMORY DIAGRAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                         BURP SUITE
                              │
                              ▼
                       WEB SECURITY
                              │
                              ▼
                           TARGET
                              │
                              ▼
                            SCOPE
                              │
                              ▼
                           BROWSER
                              │
                              ▼
                            PROXY
                              │
                              ▼
                         INTERCEPT
                              │
                  ┌───────────┼───────────┐
                  ▼           ▼           ▼
               INSPECT      MODIFY       DROP
                  │           │
                  └─────┬─────┘
                        ▼
                     FORWARD
                        │
                        ▼
                      SERVER
                        │
                        ▼
                     RESPONSE
                        │
                        ▼
                     ANALYSE
                        │
                        ▼
                   VULNERABILITY
                        │
                        ▼
                     VALIDATE
                        │
                        ▼
                      REPORT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ 39. 15-SECOND REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Burp
      ↓
    Proxy
      ↓
    127.0.0.1:8080
      ↓
    Intercept
      ↓
    Inspect
      ↓
    Modify
      ↓
    Forward
      ↓
    History
      ↓
    Site Map
      ↓
    Scope
      ↓
    HTTPS
      ↓
    PortSwigger CA
      ↓
    cert.der
      ↓
    Test
      ↓
    Validate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏆 40. FINAL ROOM CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[✓] Burp Suite purpose

[✓] Community Edition

[✓] Professional Edition

[✓] Dashboard

[✓] Navigation

[✓] Settings

[✓] Proxy

[✓] Proxy listener

[✓] FoxyProxy

[✓] 127.0.0.1:8080

[✓] Intercept

[✓] Forward

[✓] Drop

[✓] HTTP History

[✓] WebSocket History

[✓] Match & Replace

[✓] Site Map

[✓] Issue Definitions

[✓] Scope

[✓] Targeting

[✓] Burp Browser

[✓] Browser sandbox

[✓] HTTPS interception

[✓] PortSwigger CA

[✓] cert.der

[✓] Request modification

[✓] URL encoding

[✓] XSS

[✓] Client-side validation bypass

[✓] Server-side validation

[✓] Troubleshooting

[✓] Practical workflow

[✓] Interview revision

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 FINAL TAKEAWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The most important thing to remember from the entire room is:

    WEB APPLICATION
          │
          ▼
       BROWSER
          │
          ▼
        BURP
          │
          ▼
       REQUEST
          │
          ▼
      INTERCEPT
          │
          ▼
       INSPECT
          │
          ▼
       MODIFY
          │
          ▼
       FORWARD
          │
          ▼
       SERVER
          │
          ▼
      RESPONSE
          │
          ▼
       ANALYSE

Burp gives a security tester visibility and control over the
communication between the client and web application.

The browser UI is only the surface.

The HTTP request/response is what the application actually
processes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚀 NEXT LEARNING PATH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP SUITE: THE BASICS
             │
             ▼
        PROXY BASICS
             │
             ▼
          REPEATER
             │
             ▼
     REQUEST MANIPULATION
             │
             ▼
      WEB VULNERABILITIES
             │
             ▼
        ADVANCED BURP
             │
             ▼
      WEB PENTESTING

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 BURP SUITE: THE BASICS — COMPLETE PRACTICAL HANDBOOK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎯 FROM BEGINNER TO PRACTICAL USAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The most important concept from the entire room:

    WEB APPLICATION
          │
          ▼
       BROWSER
          │
          ▼
      BURP PROXY
          │
          ▼
       REQUEST
          │
          ▼
     INTERCEPT
          │
          ▼
       INSPECT
          │
          ▼
       MODIFY
          │
          ▼
       FORWARD
          │
          ▼
       SERVER
          │
          ▼
      RESPONSE
          │
          ▼
       ANALYSE

Burp Suite gives the tester visibility and control over the
HTTP/HTTPS communication between the browser and the application.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 1. BURP SUITE — CORE CONCEPTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BURP:

    Web application security testing platform.

PROXY:

    Intermediary between browser and server.

INTERCEPT:

    Pause traffic before it reaches its destination.

FORWARD:

    Allow intercepted traffic to continue.

DROP:

    Discard intercepted traffic.

HISTORY:

    Review traffic that already passed through Burp.

SITE MAP:

    Understand discovered application resources.

SCOPE:

    Define what should and should not be tested.

REPEATER:

    Manually resend and modify requests.

INTRUDER:

    Perform customised automated payload testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 2. THE COMPLETE REQUEST/RESPONSE MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REQUEST:

    Browser
       │
       ▼
    FoxyProxy
       │
       ▼
    127.0.0.1:8080
       │
       ▼
    Burp
       │
       ▼
    Target Server

RESPONSE:

    Target Server
       │
       ▼
    Burp
       │
       ▼
    Browser

The key idea:

    Burp sits between the client and server.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 3. BURP LISTENER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp must listen for proxy connections.

The room uses:

    127.0.0.1:8080

Meaning:

    127.0.0.1
        → Localhost / loopback

    8080
        → Burp proxy port

Complete:

    Browser
       ↓
    127.0.0.1:8080
       ↓
    Burp Listener
       ↓
    Target

If the browser is configured for another address/port,
traffic may not reach Burp.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🦊 4. FOXYPROXY — PRACTICAL SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Firefox
   ↓
FoxyProxy
   ↓
Options
   ↓
Add Proxy
   ↓
Name = Burp
   ↓
Type = HTTP
   ↓
Host = 127.0.0.1
   ↓
Port = 8080
   ↓
Save
   ↓
Activate

Final:

    HTTP Proxy
        |
        +-- Host: 127.0.0.1
        |
        +-- Port: 8080

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 5. INTERCEPT — PRACTICAL DECISION TREE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Browser sends request
            │
            ▼
        Burp Proxy
            │
            ▼
       Intercept ON?
          /     \
        YES      NO
         │        │
         ▼        ▼
       HOLD    Continue
         │
      ┌──┼───────┐
      ▼  ▼       ▼
    Edit Forward Drop

IMPORTANT:

    Intercept ON
        → Request pauses.

    Intercept OFF
        → Request continues normally.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📜 6. HTTP HISTORY — INVESTIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
      ↓
    HTTP history

Use it to answer:

    "What traffic has already passed through Burp?"

Review:

    ┌─────────────────────────────────────┐
    │ METHOD                              │
    │ URL                                 │
    │ HOST                                │
    │ STATUS                              │
    │ PARAMETERS                          │
    │ HEADERS                             │
    │ COOKIES                             │
    │ BODY                                │
    │ RESPONSE                            │
    └─────────────────────────────────────┘

Common interesting requests:

    GET /login
    POST /login
    GET /profile
    GET /admin
    GET /api/...
    POST /api/...
    GET /logout

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗺️ 7. SITE MAP — APPLICATION RECONSTRUCTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Target
      ↓
    Site map

Example:

    target
      │
      ├── /
      ├── /login
      ├── /register
      ├── /dashboard
      ├── /profile
      ├── /settings
      ├── /admin
      └── /api
            ├── /users
            ├── /products
            └── /orders

Think:

    HTTP History
        → Traffic

    Site Map
        → Structure

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 8. SCOPING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scope tells Burp which targets are part of the assessment.

Workflow:

    Target
       ↓
    Site map
       ↓
    Select target
       ↓
    Add to scope
       ↓
    Scope settings

Concept:

    INCLUDE
       │
       ├── Target
       ├── APIs
       └── Required resources

    EXCLUDE
       │
       ├── Unwanted hosts
       └── Unauthorised resources

Golden rule:

    TEST ONLY WHAT YOU ARE AUTHORISED TO TEST.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 9. SCOPE + PROXY RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To reduce unnecessary interception:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Request interception rules
       ↓
    URL
       ↓
    Is in target scope

Logic:

    Request
       │
       ▼
    Is target in scope?
       │
       ├── YES → Intercept
       │
       └── NO  → Ignore

This keeps testing focused.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 10. HTTPS — WHY BURP NEEDS A CA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTPS uses TLS encryption.

Without Burp's CA being trusted:

    Browser
       ↓
    HTTPS
       ↓
    Burp
       ↓
    Certificate trust problem

With the CA trusted:

    Browser
       ↓
    Trust PortSwigger CA
       ↓
    Burp-generated certificate
       ↓
    HTTPS interception

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ 11. PORTSWIGGER CA SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open:

    http://burp/cert

Download:

    cert.der

Firefox:

    Settings
       ↓
    Privacy & Security
       ↓
    Certificates
       ↓
    View Certificates
       ↓
    Authorities
       ↓
    Import
       ↓
    cert.der
       ↓
    Trust this CA to identify websites

CA:

    PortSwigger CA

Result:

    HTTPS traffic
        ↓
    Burp
        ↓
    Browser trusts Burp's certificate
        ↓
    Traffic can be inspected

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 12. CERTIFICATE SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A trusted CA is powerful.

Trusting a CA means:

    Browser
       ↓
    Trust CA
       ↓
    Accept certificates issued by CA

Therefore:

    Only install trusted CA certificates.

For Burp:

    Use the PortSwigger CA
    in an authorised testing environment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 13. BURP BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp provides its own Chromium-based browser.

Open:

    Proxy
      ↓
    Open browser

Flow:

    Burp Browser
       ↓
    Burp Proxy
       ↓
    Target

Advantage:

    Browser is already configured to work with Burp.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 14. BURP BROWSER SANDBOX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Potential problem:

    Burp running as root
       ↓
    Chromium sandbox
       ↓
    Browser may not start

Preferred:

    Run Burp as a normal / low-privilege user.

Alternative:

    Settings
       ↓
    Tools
       ↓
    Burp's browser
       ↓
    Allow browser to run without sandbox

Security consideration:

    Sandbox ON
        → Better isolation

    Sandbox OFF
        → Reduced isolation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 15. HTTP REQUEST ANATOMY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A request can contain:

    METHOD
       ↓
    PATH
       ↓
    QUERY PARAMETERS
       ↓
    HEADERS
       ↓
    COOKIES
       ↓
    BODY

Example:

    GET /profile?id=10 HTTP/1.1
    Host: target.local
    Cookie: session=abc123

Important questions:

    What method?

    Which endpoint?

    Which parameters?

    Which cookies?

    Which headers?

    Is there a request body?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔎 16. HTTP RESPONSE ANATOMY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Response:

    STATUS CODE
       ↓
    HEADERS
       ↓
    COOKIES
       ↓
    RESPONSE BODY

Example:

    HTTP/1.1 200 OK
    Content-Type: text/html

    <html>...</html>

Useful status codes:

    200
        → OK

    301 / 302
        → Redirect

    400
        → Bad Request

    401
        → Unauthorised

    403
        → Forbidden

    404
        → Not Found

    500
        → Server Error

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✏️ 17. REQUEST MODIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Original:

    GET /profile?id=10 HTTP/1.1

Modified:

    GET /profile?id=11 HTTP/1.1

Flow:

    Capture
       ↓
    Inspect
       ↓
    Modify
       ↓
    Forward
       ↓
    Observe response

This is the foundation of manual request testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 18. REPEATER — NEXT IMPORTANT SKILL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Repeater is used when you want to repeatedly test a request.

Flow:

    HTTP History
         ↓
    Interesting Request
         ↓
    Send to Repeater
         ↓
    Modify
         ↓
    Send
         ↓
    Analyse
         ↓
    Modify again
         ↓
    Send again

Memory:

    INTERCEPT
        = Catch the request

    REPEATER
        = Experiment with the request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 19. INTERCEPT vs REPEATER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTERCEPT:

    Browser
       ↓
    Request
       ↓
    Burp
       ↓
    Pause
       ↓
    Modify
       ↓
    Forward

REPEATER:

    Existing Request
       ↓
    Repeater
       ↓
    Modify
       ↓
    Send
       ↓
    Analyse
       ↓
    Modify
       ↓
    Send Again

Therefore:

    Intercept = Real-time control

    Repeater = Manual experimentation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 20. MATCH AND REPLACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Match and Replace

Concept:

    Incoming Request
          ↓
        MATCH
          ↓
       REPLACE
          ↓
    Modified Request
          ↓
       Target

Useful for repetitive modifications.

Examples:

    Headers
    User-Agent
    Cookies
    Request values

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 21. RESPONSE INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Server
       ↓
    Response
       ↓
    Burp
       ↓
    Rule Check
       │
       ├── Match
       │     ↓
       │  Intercept
       │
       └── No Match
             ↓
          Continue
             ↓
          Browser

This gives the tester control over selected responses.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🍪 22. COOKIES & SESSION MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Typical flow:

    Login
       ↓
    Server creates session
       ↓
    Browser receives cookie
       ↓
    Browser sends cookie
       ↓
    Server identifies session

Example:

    Cookie: session=abc123

Burp setting:

    Settings
       ↓
    Sessions
       ↓
    Cookie jar

Important:

    Session cookies can be part of the application's
    authentication/session mechanism.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 23. XSS — ROOM EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The room demonstrates XSS through a support form.

Flow:

    Support Form
       ↓
    Input
       ↓
    Client-side validation
       ↓
    HTTP request
       ↓
    Burp intercept
       ↓
    Modify parameter
       ↓
    Forward
       ↓
    Server
       ↓
    Application
       ↓
    XSS

Result:

    Succ3ssful XSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 24. WHY THE XSS EXAMPLE MATTERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The important lesson is not simply the payload.

The important lesson is:

    Client-side restriction
          ↓
    HTTP request
          ↓
    Burp
          ↓
    Request manipulation
          ↓
    Server
          ↓
    Application behaviour

Therefore:

    Client-side filtering
        ≠
    Security boundary

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 25. SECURE XSS DEFENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Application should:

    ✓ Treat input as untrusted
    ✓ Validate input server-side
    ✓ Encode output correctly
    ✓ Escape data according to context
    ✓ Avoid unsafe HTML injection
    ✓ Use appropriate security headers/CSP
    ✓ Test security controls independently

Secure model:

    USER INPUT
       ↓
    SERVER VALIDATION
       ↓
    SAFE PROCESSING
       ↓
    OUTPUT ENCODING
       ↓
    BROWSER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔡 26. URL ENCODING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp shortcut:

    Ctrl + U

Example:

    <  →  %3C

    >  →  %3E

Flow:

    Select text
       ↓
    Ctrl + U
       ↓
    URL encoded
       ↓
    Request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 27. IMPORTANT BURP MODULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Dashboard
        → Overall project/activity

    Target
        → Site map + scope + issue definitions

    Proxy
        → HTTP/HTTPS interception

    Repeater
        → Manual request testing

    Intruder
        → Customised automated payload testing

    Decoder
        → Encode/decode

    Comparer
        → Compare data

    Sequencer
        → Token randomness

    Collaborator
        → Out-of-band interactions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 28. MODULE MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    TARGET
       ↓
    MAP

    PROXY
       ↓
    CATCH

    REPEATER
       ↓
    REPLAY

    INTRUDER
       ↓
    PAYLOADS

    DECODER
       ↓
    DECODE

    COMPARER
       ↓
    DIFFERENCE

    SEQUENCER
       ↓
    RANDOMNESS

    COLLABORATOR
       ↓
    OUT-OF-BAND

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 29. SETTINGS MEMORY MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Settings
       │
       ├── Sessions
       │     └── Cookie jar
       │
       ├── Suite
       │     └── Updates
       │
       ├── User interface
       │     └── Hotkeys
       │
       └── Tools
             ├── Proxy
             └── Burp's browser

Target:

    Target
       └── Scope settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⌨️ 30. SHORTCUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ctrl + Shift + D
        → Dashboard

    Ctrl + Shift + T
        → Target

    Ctrl + Shift + P
        → Proxy

    Ctrl + Shift + I
        → Intruder

    Ctrl + Shift + R
        → Repeater

    Ctrl + U
        → URL Encode

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 31. ROOM VALUES — QUICK REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BURP PROXY:

    127.0.0.1:8080

TARGET:

    http://10.48.155.152/

BURP CERTIFICATE:

    http://burp/cert

CERTIFICATE:

    cert.der

CA:

    PortSwigger CA

XSS RESULT:

    Succ3ssful XSS

CHALLENGE FLAG:

    THM{NmNIZTINGE1MWU1ZTQzMzgzNmFiNWVk}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 32. COMPLETE TRYHACKME WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Start Room
       ↓
    Start Machine
       ↓
    Identify Target IP
       ↓
    Start Burp
       ↓
    Configure Browser
       ↓
    Set Proxy
       ↓
    Confirm:
        127.0.0.1:8080
       ↓
    Browse Target
       ↓
    Capture Traffic
       ↓
    HTTP History
       ↓
    Site Map
       ↓
    Add Target to Scope
       ↓
    Identify Interesting Requests
       ↓
    Inspect Parameters
       ↓
    Modify Authorised Requests
       ↓
    Forward / Repeater
       ↓
    Analyse Response
       ↓
    Find Flag / Vulnerability
       ↓
    Submit Answer

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 33. HOW TO READ A REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Whenever you see a request, ask:

    1. WHAT METHOD?

        GET?
        POST?
        PUT?
        DELETE?

    2. WHAT ENDPOINT?

        /login?
        /api/users?
        /admin?

    3. WHAT PARAMETERS?

        id=
        user=
        search=
        file=

    4. WHAT HEADERS?

        Authorization?
        Content-Type?
        Cookie?

    5. WHAT COOKIES?

        session?
        authentication?

    6. WHAT BODY?

        Form?
        JSON?
        XML?

    7. WHAT RESPONSE?

        Status?
        Redirect?
        Error?
        Data?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔎 34. HOW TO READ A RESPONSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ask:

    STATUS?
       ↓
    200 / 3xx / 4xx / 5xx

    HEADERS?
       ↓
    Server
    Content-Type
    Set-Cookie
    Security headers

    BODY?
       ↓
    HTML
    JSON
    Error
    Data

    REDIRECT?
       ↓
    Location header

The response often reveals more information than the visible
browser page.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 35. COMMON BEGINNER MISTAKES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MISTAKE:

    Burp running but no traffic.

CHECK:

    Proxy configuration
    127.0.0.1:8080
    Listener
    FoxyProxy

──────────────────────────────────────────────────────────────

MISTAKE:

    Browser stuck.

CHECK:

    Intercept ON?

FIX:

    Forward.

──────────────────────────────────────────────────────────────

MISTAKE:

    HTTPS warning.

CHECK:

    PortSwigger CA.

FIX:

    Import cert.der.

──────────────────────────────────────────────────────────────

MISTAKE:

    Too much traffic.

FIX:

    Define scope.

──────────────────────────────────────────────────────────────

MISTAKE:

    Built-in browser doesn't launch.

FIX:

    Prefer low-privilege Burp execution.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 36. PROFESSIONAL TESTING RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    RULE 01:
        Obtain explicit authorization.

    RULE 02:
        Define scope.

    RULE 03:
        Keep testing inside scope.

    RULE 04:
        Understand requests before modifying them.

    RULE 05:
        Do not rely on client-side controls.

    RULE 06:
        Validate findings.

    RULE 07:
        Preserve evidence.

    RULE 08:
        Document impact and reproduction.

    RULE 09:
        Report responsibly.

## Interview Questions

Q1.
What is Burp Suite?

Answer

A web application security testing platform developed by
PortSwigger.

------------------------------------------------------------

Q2.
What is Burp Proxy?

Answer

A proxy that sits between client and server and allows traffic
to be intercepted and analysed.

------------------------------------------------------------

Q3.
What is Intercept?

Answer

It pauses traffic so the tester can inspect, modify, forward or
drop it.

------------------------------------------------------------

Q4.
What is Site Map?

Answer

A structured representation of resources discovered on the target.

------------------------------------------------------------

Q5.
What is HTTP History?

Answer

A record of HTTP traffic that passed through Burp.

------------------------------------------------------------

Q6.
What is Scope?

Answer

The defined set of targets that are included or excluded from
testing.

------------------------------------------------------------

Q7.
Why use a scope?

Answer

To reduce noise and prevent accidental out-of-scope testing.

------------------------------------------------------------

Q8.
Why is the PortSwigger CA required?

Answer

To make the browser trust certificates generated by Burp during
HTTPS interception.

------------------------------------------------------------

Q9.
What is Repeater?

Answer

A tool for repeatedly sending manually modified requests.

------------------------------------------------------------

Q10.
What is Intruder?

Answer

A tool for customised automated payload testing.

------------------------------------------------------------

Q11.
Why can't client-side validation be trusted?

Answer

Because the client is controlled by the user and requests can be
modified before reaching the server.

------------------------------------------------------------

## 🧠 38. MASTER MEMORY DIAGRAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                         BURP SUITE
                              │
                              ▼
                           TARGET
                              │
                              ▼
                            SCOPE
                              │
                              ▼
                           BROWSER
                              │
                              ▼
                            PROXY
                              │
                              ▼
                         INTERCEPT
                              │
                    ┌─────────┼─────────┐
                    ▼         ▼         ▼
                 INSPECT    MODIFY     DROP
                    │         │
                    └────┬────┘
                         ▼
                      FORWARD
                         │
                         ▼
                       SERVER
                         │
                         ▼
                      RESPONSE
                         │
                         ▼
                       ANALYSE
                         │
                         ▼
                    VALIDATION
                         │
                         ▼
                       REPORT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ 39. 10-SECOND REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Burp
      ↓
    Proxy
      ↓
    127.0.0.1:8080
      ↓
    Intercept
      ↓
    Inspect
      ↓
    Modify
      ↓
    Forward
      ↓
    History
      ↓
    Site Map
      ↓
    Scope
      ↓
    HTTPS
      ↓
    PortSwigger CA
      ↓
    cert.der
      ↓
    Repeater
      ↓
    Test
      ↓
    Validate

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏆 40. FINAL CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[✓] Understand Burp Suite

[✓] Understand Proxy

[✓] Configure 127.0.0.1:8080

[✓] Configure FoxyProxy

[✓] Use Intercept

[✓] Forward requests

[✓] Drop requests

[✓] Read HTTP History

[✓] Read WebSocket History

[✓] Understand Site Map

[✓] Define Scope

[✓] Use Burp Browser

[✓] Understand browser sandbox

[✓] Configure HTTPS interception

[✓] Import PortSwigger CA

[✓] Understand cert.der

[✓] Inspect requests

[✓] Inspect responses

[✓] Modify parameters

[✓] Understand Match & Replace

[✓] Understand cookies/sessions

[✓] Understand XSS

[✓] Understand client-side validation bypass

[✓] Understand server-side validation

[✓] Understand Repeater

[✓] Understand Intruder

[✓] Troubleshoot proxy issues

[✓] Follow authorised testing workflow

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 FINAL TAKEAWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite is fundamentally about controlling and understanding
web application traffic.

The complete mental model is:

    REQUEST
       ↓
    BURP
       ↓
    INTERCEPT
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    FORWARD
       ↓
    RESPONSE
       ↓
    ANALYSE
       ↓
    VALIDATE

Once this flow becomes natural, tools such as Proxy, Repeater,
Intruder, Target, Decoder and Comparer become much easier to use.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚀 NEXT STEP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP SUITE: THE BASICS
             │
             ▼
          PROXY
             │
             ▼
         REPEATER
             │
             ▼
     REQUEST MANIPULATION
             │
             ▼
      WEB VULNERABILITIES
             │
             ▼
       ADVANCED BURP
             │
             ▼
      WEB PENTESTING

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 BURP SUITE: THE BASICS — FINAL MASTER REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎯 COMPLETE ROOM RECAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This part connects the complete Burp Suite workflow into one
practical mental model.

The core idea:

    BROWSER
       ↓
    BURP PROXY
       ↓
    REQUEST
       ↓
    INTERCEPT
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    FORWARD
       ↓
    SERVER
       ↓
    RESPONSE
       ↓
    ANALYSE
       ↓
    VALIDATE
       ↓
    REPORT

Burp Suite gives a security tester visibility and control over
web application HTTP/HTTPS traffic.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 1. BURP SUITE IN ONE DIAGRAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                         WEB APPLICATION
                                ▲
                                │
                         HTTP / HTTPS
                                │
                         ┌──────┴──────┐
                         │    BURP     │
                         │    PROXY    │
                         └──────┬──────┘
                                ▲
                                │
                         127.0.0.1:8080
                                ▲
                                │
                         ┌──────┴──────┐
                         │   BROWSER   │
                         └─────────────┘

Burp acts as a middleman.

This allows:

    INTERCEPT
        ↓
    INSPECT
        ↓
    MODIFY
        ↓
    FORWARD / DROP
        ↓
    ANALYSE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 2. NORMAL REQUEST VS BURP REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WITHOUT BURP:

    Browser
       │
       ▼
    Web Server
       │
       ▼
    Browser

WITH BURP:

    Browser
       │
       ▼
    Burp Proxy
       │
       ├── Intercept
       ├── Inspect
       ├── Modify
       ├── Forward
       └── Drop
       │
       ▼
    Web Server
       │
       ▼
    Burp
       │
       ▼
    Browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 3. PROXY CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Room configuration:

    Proxy Type:
        HTTP

    Host:
        127.0.0.1

    Port:
        8080

Final:

    127.0.0.1:8080

Meaning:

    127.0.0.1
        → Localhost / loopback

    8080
        → Burp proxy listener port

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🦊 4. FOXYPROXY CONFIGURATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Firefox
   ↓
FoxyProxy
   ↓
Options
   ↓
Add
   ↓
Name = Burp
   ↓
Type = HTTP
   ↓
Host = 127.0.0.1
   ↓
Port = 8080
   ↓
Save
   ↓
Activate

Final flow:

    Firefox
       ↓
    FoxyProxy
       ↓
    127.0.0.1:8080
       ↓
    Burp
       ↓
    Target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 5. INTERCEPT — COMPLETE BEHAVIOUR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Browser
       ↓
    HTTP Request
       ↓
    Burp Proxy
       ↓
    Intercept
       │
       ├── ON
       │    ↓
       │  Request paused
       │    ↓
       │  Inspect
       │    ↓
       │  Modify
       │    ↓
       │  Forward / Drop
       │
       └── OFF
            ↓
        Request continues

IMPORTANT:

    Intercept ON
        = Pause matching traffic

    Intercept OFF
        = Allow traffic to continue normally

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔀 6. FORWARD VS DROP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORWARD:

    Request
       ↓
    Burp
       ↓
    Forward
       ↓
    Server

Meaning:

    "Send this request to the destination."

DROP:

    Request
       ↓
    Burp
       ↓
    Drop
       ↓
    Request discarded

Meaning:

    "Do not send this request."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📜 7. HTTP HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
       ↓
    HTTP history

Purpose:

    Review HTTP requests and responses that have already passed
    through Burp.

Useful information:

    Method
    Host
    URL
    Parameters
    Status
    Length
    Content type
    Headers
    Cookies
    Request body
    Response body

Memory:

    INTERCEPT
        = NOW

    HTTP HISTORY
        = PAST TRAFFIC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔌 8. WEBSOCKET HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
       ↓
    WebSockets history

WebSockets allow persistent communication between client and
server.

Common uses:

    • Chat
    • Live notifications
    • Real-time dashboards
    • Live updates
    • Interactive applications

Flow:

    Browser
       ↓
    WebSocket
       ↓
    Burp
       ↓
    Server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗺️ 9. TARGET — SITE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Target
       ↓
    Site map

Site Map helps understand the application's structure.

Example:

    target.local
       │
       ├── /
       ├── /login
       ├── /register
       ├── /dashboard
       ├── /profile
       ├── /settings
       ├── /admin
       └── /api
             ├── /users
             ├── /products
             └── /orders

Memory:

    HTTP History
        → What happened?

    Site Map
        → What exists?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 10. SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scope determines what should be included or excluded from
testing.

Workflow:

    Target
       ↓
    Site Map
       ↓
    Select target
       ↓
    Add to scope
       ↓
    Scope settings

Concept:

    INCLUDE
       +
    EXCLUDE

Room target:

    http://10.48.155.152/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 11. WHY SCOPE MATTERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Modern websites can generate a large amount of traffic.

Examples:

    HTML
    CSS
    JavaScript
    Images
    Fonts
    APIs
    Analytics
    WebSockets
    Third-party resources

Without scope:

    Browser
       ↓
    Huge amount of traffic
       ↓
    Burp
       ↓
    Noise

With scope:

    Browser
       ↓
    Burp
       ↓
    Target scope
       ↓
    Relevant traffic

Benefits:

    ✓ Cleaner history
    ✓ Easier analysis
    ✓ Less noise
    ✓ Better organisation
    ✓ Reduced accidental testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 12. INTERCEPT ONLY IN-SCOPE REQUESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Configure:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Request interception rules
       ↓
    URL
       ↓
    Is in target scope

Logic:

    Request
       ↓
    Is target in scope?
       │
       ├── YES → Intercept
       │
       └── NO  → Do not intercept

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 13. HTTPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTP:

    Browser
       ↓
    Burp
       ↓
    Server

HTTPS:

    Browser
       ↓
    TLS
       ↓
    Burp
       ↓
    TLS
       ↓
    Server

For Burp to inspect HTTPS, the browser needs to trust the
PortSwigger CA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ 14. PORTSWIGGER CA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open:

    http://burp/cert

Download:

    cert.der

Firefox:

    Settings
       ↓
    Privacy & Security
       ↓
    Certificates
       ↓
    View Certificates
       ↓
    Authorities
       ↓
    Import
       ↓
    cert.der
       ↓
    Trust this CA to identify websites

CA:

    PortSwigger CA

Final:

    Browser
       ↓
    Trust PortSwigger CA
       ↓
    Burp-generated certificate
       ↓
    HTTPS interception

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 15. HTTPS TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

If HTTPS fails:

    Burp running?
       ↓
    Proxy listener active?
       ↓
    Browser configured?
       ↓
    127.0.0.1:8080 correct?
       ↓
    PortSwigger CA downloaded?
       ↓
    cert.der imported?
       ↓
    CA trusted?
       ↓
    Correct browser certificate store?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 16. BURP BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp includes a Chromium-based browser.

Open:

    Proxy
       ↓
    Open browser

Flow:

    Burp Browser
       ↓
    Burp Proxy
       ↓
    Target

Advantages:

    ✓ Already configured
    ✓ No FoxyProxy setup required
    ✓ Convenient for testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 17. BURP BROWSER SANDBOX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Potential issue:

    Burp running as root
       ↓
    Chromium sandbox
       ↓
    Browser may fail to launch

Preferred:

    Run Burp as a normal / low-privilege user.

Alternative:

    Settings
       ↓
    Tools
       ↓
    Burp's browser
       ↓
    Allow browser to run without sandbox

Security:

    Sandbox ON
       ↓
    Better isolation

    Sandbox OFF
       ↓
    Reduced isolation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 18. HTTP REQUEST ANATOMY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Typical request:

    METHOD /path HTTP/version
    Host: target
    Header: value
    Cookie: value

    Request Body

Important components:

    METHOD
       ↓
    URL / PATH
       ↓
    PARAMETERS
       ↓
    HEADERS
       ↓
    COOKIES
       ↓
    BODY

Example:

    GET /profile?id=10 HTTP/1.1
    Host: target.local
    Cookie: session=abc123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔎 19. HTTP RESPONSE ANATOMY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Response:

    STATUS CODE
       ↓
    HEADERS
       ↓
    COOKIES
       ↓
    BODY

Important status codes:

    200
        → OK

    301 / 302
        → Redirect

    400
        → Bad Request

    401
        → Unauthorised

    403
        → Forbidden

    404
        → Not Found

    500
        → Server Error

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✏️ 20. REQUEST MODIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Original:

    GET /profile?id=10 HTTP/1.1

Modified:

    GET /profile?id=11 HTTP/1.1

Workflow:

    Capture
       ↓
    Inspect
       ↓
    Modify
       ↓
    Forward
       ↓
    Observe
       ↓
    Analyse

This is one of the most important manual Burp techniques.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 21. REPEATER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Repeater is used for repeated manual request testing.

Workflow:

    HTTP History
       ↓
    Interesting request
       ↓
    Send to Repeater
       ↓
    Modify
       ↓
    Send
       ↓
    Analyse
       ↓
    Modify again
       ↓
    Send again

MEMORY:

    INTERCEPT
        = Catch it

    REPEATER
        = Test it repeatedly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 22. INTERCEPT vs REPEATER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTERCEPT:

    Browser
       ↓
    Request
       ↓
    Burp
       ↓
    Pause
       ↓
    Modify
       ↓
    Forward

REPEATER:

    Existing Request
       ↓
    Repeater
       ↓
    Modify
       ↓
    Send
       ↓
    Analyse
       ↓
    Modify
       ↓
    Send again

Memory:

    Intercept = Real-time

    Repeater = Manual testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 23. MATCH AND REPLACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Match and Replace

Flow:

    Request
       ↓
    Match
       ↓
    Replace
       ↓
    Modified Request
       ↓
    Target

Can be used for repetitive modifications such as:

    • Headers
    • User-Agent
    • Cookies
    • Request values

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 24. RESPONSE INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Server
       ↓
    Response
       ↓
    Burp
       ↓
    Rule
       │
       ├── Match
       │     ↓
       │  Intercept
       │
       └── No Match
             ↓
          Continue
             ↓
          Browser

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🍪 25. COOKIES & SESSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Typical flow:

    Login
       ↓
    Server creates session
       ↓
    Cookie returned
       ↓
    Browser stores cookie
       ↓
    Browser sends cookie
       ↓
    Server identifies session

Example:

    Cookie: session=abc123

Burp setting:

    Settings
       ↓
    Sessions
       ↓
    Cookie jar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 26. XSS — PRACTICAL FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Room example:

    Support Form
       ↓
    Input
       ↓
    Client-side validation
       ↓
    HTTP Request
       ↓
    Burp
       ↓
    Modify parameter
       ↓
    Forward
       ↓
    Server
       ↓
    Application
       ↓
    XSS

Result:

    Succ3ssful XSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 27. CLIENT-SIDE VALIDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Important:

    CLIENT-SIDE VALIDATION
            ≠
    SECURITY BOUNDARY

Reason:

    Browser
       ↓
    Controlled by user
       ↓
    Request generated
       ↓
    Burp
       ↓
    Request can be modified
       ↓
    Server

Therefore:

    Never rely only on client-side validation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 28. SECURE SERVER-SIDE MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    USER INPUT
       ↓
    CLIENT VALIDATION
       ↓
    HTTP REQUEST
       ↓
    SERVER VALIDATION
       ↓
    AUTHORISATION
       ↓
    SAFE PROCESSING
       ↓
    OUTPUT ENCODING
       ↓
    BROWSER

Golden rule:

    CLIENT = UNTRUSTED

    SERVER = SECURITY BOUNDARY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔡 29. URL ENCODING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Shortcut:

    Ctrl + U

Example:

    <  →  %3C
    >  →  %3E

Workflow:

    Select text
       ↓
    Ctrl + U
       ↓
    Encoded value
       ↓
    Send request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 30. BURP MODULES — FINAL CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    DASHBOARD
        → Project/activity overview

    TARGET
        → Site Map + Scope + Issue Definitions

    PROXY
        → Intercept HTTP/HTTPS traffic

    INTRUDER
        → Customised payload testing

    REPEATER
        → Manual request replay/testing

    COLLABORATOR
        → Out-of-band interaction testing

    SEQUENCER
        → Token randomness analysis

    DECODER
        → Encode/decode data

    COMPARER
        → Compare requests/responses

    LOGGER
        → Logging

    ORGANIZER
        → Organise testing items

    EXTENSIONS
        → Extend Burp functionality

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 31. MODULE MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    TARGET
       ↓
    MAP

    PROXY
       ↓
    CATCH

    REPEATER
       ↓
    REPLAY

    INTRUDER
       ↓
    PAYLOADS

    DECODER
       ↓
    DECODE

    COMPARER
       ↓
    DIFFERENCE

    SEQUENCER
       ↓
    RANDOMNESS

    COLLABORATOR
       ↓
    OUT-OF-BAND

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 32. SETTINGS MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    SETTINGS
       │
       ├── Sessions
       │     └── Cookie jar
       │
       ├── Suite
       │     └── Updates
       │
       ├── User interface
       │     └── Hotkeys
       │
       └── Tools
             ├── Proxy
             └── Burp's browser

TARGET:

    Target
       └── Scope settings

PROXY:

    Proxy
       ├── Intercept
       ├── HTTP History
       ├── WebSockets History
       └── Proxy Settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⌨️ 33. SHORTCUT CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ctrl + Shift + D
        → Dashboard

    Ctrl + Shift + T
        → Target

    Ctrl + Shift + P
        → Proxy

    Ctrl + Shift + I
        → Intruder

    Ctrl + Shift + R
        → Repeater

    Ctrl + U
        → URL Encode

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 34. ROOM-SPECIFIC VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROXY:

    127.0.0.1:8080

TARGET:

    http://10.48.155.152/

BURP CERTIFICATE:

    http://burp/cert

CERTIFICATE FILE:

    cert.der

CA:

    PortSwigger CA

XSS SUCCESS:

    Succ3ssful XSS

CHALLENGE FLAG:

    THM{NmNIZTINGE1MWU1ZTQzMzgzNmFiNWVk}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 35. COMPLETE TRYHACKME WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    START ROOM
       ↓
    START MACHINE
       ↓
    GET TARGET IP
       ↓
    START BURP
       ↓
    CONFIGURE BROWSER
       ↓
    127.0.0.1:8080
       ↓
    OPEN TARGET
       ↓
    CAPTURE REQUEST
       ↓
    HTTP HISTORY
       ↓
    SITE MAP
       ↓
    ADD TARGET TO SCOPE
       ↓
    IDENTIFY INTERESTING REQUEST
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    FORWARD / REPEATER
       ↓
    ANALYSE RESPONSE
       ↓
    FIND VULNERABILITY / FLAG
       ↓
    SUBMIT ANSWER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔍 36. REQUEST ANALYSIS CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Whenever you capture a request:

    [ ] HTTP method
    [ ] URL
    [ ] Endpoint
    [ ] Query parameters
    [ ] Headers
    [ ] Cookies
    [ ] Authentication
    [ ] Content-Type
    [ ] Request body
    [ ] IDs
    [ ] User-controlled values

Then ask:

    "Which values can I legitimately test?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔎 37. RESPONSE ANALYSIS CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Check:

    [ ] Status code
    [ ] Location header
    [ ] Set-Cookie
    [ ] Content-Type
    [ ] Security headers
    [ ] Response body
    [ ] Error messages
    [ ] JSON data
    [ ] Redirect behaviour
    [ ] Application-specific messages

Question:

    "How did the application respond to my request?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 38. TROUBLESHOOTING TREE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NO TRAFFIC:

    Burp running?
       │
       ├── NO → Start Burp
       │
       └── YES
            ↓
    Listener active?
            │
            ├── NO → Enable
            │
            └── YES
                 ↓
    Browser proxy correct?
                 │
                 ├── NO → 127.0.0.1:8080
                 │
                 └── YES
                      ↓
                    Test

──────────────────────────────────────────────────────────────

BROWSER HANGS:

    Intercept ON?
       │
       ├── YES → Forward / Drop
       │
       └── NO → Continue troubleshooting

──────────────────────────────────────────────────────────────

HTTPS ERROR:

    CA installed?
       │
       ├── NO → Download cert.der
       │
       └── YES
            ↓
       CA trusted?
            │
            ├── NO → Import + Trust
            │
            └── YES → Continue troubleshooting

──────────────────────────────────────────────────────────────

TOO MUCH TRAFFIC:

    Define scope
       ↓
    Add target to scope
       ↓
    Intercept only in-scope traffic

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 39. PROFESSIONAL SECURITY MINDSET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before testing:

    ┌─────────────────────────────┐
    │ AUTHORIZATION               │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ SCOPE                       │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ RECON / SITE MAP            │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ CAPTURE TRAFFIC             │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ ANALYSE                     │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ TEST                        │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ VALIDATE                    │
    └──────────────┬──────────────┘
                   ▼
    ┌─────────────────────────────┐
    │ REPORT                      │
    └─────────────────────────────┘

Always test only systems for which you have explicit
authorization.

## Interview Questions

Q1.
What is Burp Suite?

Answer

A web application security testing platform developed by
PortSwigger.

------------------------------------------------------------

Q2.
What is Burp Proxy?

Answer

A proxy that sits between the client and server and allows
HTTP/HTTPS traffic to be intercepted and analysed.

------------------------------------------------------------

Q3.
What is Intercept?

Answer

A feature that pauses matching requests/responses so they can
be inspected, modified, forwarded or dropped.

------------------------------------------------------------

Q4.
What is HTTP History?

Answer

A record of HTTP traffic that has passed through Burp.

------------------------------------------------------------

Q5.
What is Site Map?

Answer

A structured map of resources discovered on the target.

------------------------------------------------------------

Q6.
What is scope?

Answer

The defined set of targets that are included or excluded from
testing.

------------------------------------------------------------

Q7.
Why use scope?

Answer

To reduce noise and prevent accidental testing outside the
authorised target.

------------------------------------------------------------

Q8.
What is FoxyProxy?

Answer

A browser extension used to manage proxy configurations.

------------------------------------------------------------

Q9.
Why install the PortSwigger CA?

Answer

To allow the browser to trust Burp-generated certificates for
HTTPS interception.

------------------------------------------------------------

Q10.
What is Repeater?

Answer

A tool for repeatedly sending manually modified HTTP requests.

------------------------------------------------------------

Q11.
What is Intruder?

Answer

A tool for customised automated payload testing.

------------------------------------------------------------

Q12.
Why is client-side validation insufficient?

Answer

Because the client is controlled by the user and requests can be
modified before reaching the server.

------------------------------------------------------------

## 🧠 41. FINAL MEMORY PALACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BURP:

    CONTROL WEB TRAFFIC

PROXY:

    Browser ↔ Burp ↔ Server

INTERCEPT:

    PAUSE

FORWARD:

    CONTINUE

DROP:

    DISCARD

HISTORY:

    REVIEW

SITE MAP:

    DISCOVER

SCOPE:

    LIMIT

HTTPS:

    TRUST CA

REPEATER:

    REPLAY

INTRUDER:

    PAYLOADS

XSS:

    TEST INPUT HANDLING

SERVER:

    VALIDATE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ 42. 30-SECOND REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP
      ↓
    PROXY
      ↓
    127.0.0.1:8080
      ↓
    BROWSER
      ↓
    TARGET
      ↓
    INTERCEPT
      ↓
    INSPECT
      ↓
    MODIFY
      ↓
    FORWARD
      ↓
    HTTP HISTORY
      ↓
    SITE MAP
      ↓
    SCOPE
      ↓
    HTTPS
      ↓
    PORTSWIGGER CA
      ↓
    cert.der
      ↓
    REPEATER
      ↓
    TEST
      ↓
    VALIDATE
      ↓
    REPORT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏆 43. FINAL ROOM CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[✓] Burp Suite purpose
[✓] Burp Proxy
[✓] Proxy listener
[✓] 127.0.0.1:8080
[✓] FoxyProxy
[✓] Intercept
[✓] Forward
[✓] Drop
[✓] HTTP History
[✓] WebSocket History
[✓] Site Map
[✓] Scope
[✓] Scope filtering
[✓] Burp Browser
[✓] Browser sandbox
[✓] HTTPS
[✓] PortSwigger CA
[✓] cert.der
[✓] Request anatomy
[✓] Response anatomy
[✓] Request modification
[✓] Match & Replace
[✓] Response interception
[✓] Cookies
[✓] Sessions
[✓] URL encoding
[✓] XSS
[✓] Client-side validation
[✓] Server-side validation
[✓] Repeater
[✓] Intruder
[✓] Troubleshooting
[✓] Practical workflow
[✓] Interview revision

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 44. FINAL TAKEAWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite is not just a tool for clicking "Intercept".

The real skill is understanding what happens underneath a
web application:

    USER ACTION
       ↓
    BROWSER
       ↓
    HTTP REQUEST
       ↓
    BURP
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    SERVER
       ↓
    RESPONSE
       ↓
    ANALYSE
       ↓
    SECURITY DECISION

Once this flow becomes natural, Burp becomes much easier to use.

The browser shows the application.

Burp shows the communication behind the application.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚀 45. NEXT LEARNING PATH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP SUITE: THE BASICS
             │
             ▼
           PROXY
             │
             ▼
         REPEATER
             │
             ▼
    REQUEST MANIPULATION
             │
             ▼
      WEB VULNERABILITIES
             │
             ▼
        ADVANCED BURP
             │
             ▼
      WEB PENTESTING
             │
             ▼
       BUG BOUNTY / CTF
             │
             ▼
     PROFESSIONAL APPSEC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 BURP SUITE: THE BASICS — FINAL QUICK REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎯 1. BURP SUITE — CORE IDEA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite is a web application security testing platform
developed by PortSwigger.

Main purpose:

    OBSERVE
       ↓
    INTERCEPT
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    FORWARD
       ↓
    ANALYSE

Core architecture:

    BROWSER
       ↓
    BURP PROXY
       ↓
    TARGET
       ↓
    BURP
       ↓
    BROWSER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 2. PROXY — MOST IMPORTANT CONCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Without Burp:

    Browser
       ↓
    Web Server

With Burp:

    Browser
       ↓
    Burp Proxy
       ↓
    Web Server

Burp becomes the middleman.

This gives the tester control over HTTP/HTTPS traffic.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 3. DEFAULT BURP PROXY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Host:
        127.0.0.1

    Port:
        8080

Therefore:

    127.0.0.1:8080

Meaning:

    127.0.0.1
        → Localhost / loopback

    8080
        → Burp proxy listener

Traffic:

    Browser
       ↓
    127.0.0.1:8080
       ↓
    Burp
       ↓
    Target

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🦊 4. FOXYPROXY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Firefox
   ↓
FoxyProxy
   ↓
HTTP Proxy
   ↓
127.0.0.1:8080
   ↓
Burp
   ↓
Target

Configuration:

    Type:
        HTTP

    Host:
        127.0.0.1

    Port:
        8080

Activate the Burp proxy profile before browsing the target.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛑 5. INTERCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
       ↓
    Intercept

When:

    Intercept is ON

Flow:

    Browser
       ↓
    Request
       ↓
    Burp
       ↓
    PAUSE
       ↓
    ┌───────────────┐
    │ Inspect       │
    │ Modify        │
    │ Forward       │
    │ Drop          │
    └───────────────┘

When:

    Intercept is OFF

Traffic continues normally.

MEMORY:

    ON  = STOP
    OFF = PASS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ▶️ 6. FORWARD vs DROP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORWARD:

    Request
       ↓
    Burp
       ↓
    Forward
       ↓
    Server

Meaning:

    Send the request.

DROP:

    Request
       ↓
    Burp
       ↓
    Drop
       ↓
    Request discarded

Meaning:

    Do not send the request.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📜 7. HTTP HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
       ↓
    HTTP history

Purpose:

    Review traffic that has already passed through Burp.

Look for:

    GET
    POST
    PUT
    DELETE

    URLs
    Parameters
    Headers
    Cookies
    Request bodies
    Responses
    Status codes

MEMORY:

    INTERCEPT
        = CURRENT REQUEST

    HTTP HISTORY
        = PREVIOUS REQUESTS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔌 8. WEBSOCKET HISTORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Proxy
       ↓
    WebSockets history

WebSockets provide persistent communication between a browser
and server.

Common examples:

    Chat
    Live notifications
    Real-time dashboards
    Live updates

Flow:

    Browser
       ↓
    WebSocket
       ↓
    Burp
       ↓
    Server

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🗺️ 9. SITE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Target
       ↓
    Site map

Purpose:

    Understand the application's discovered structure.

Example:

    TARGET
      │
      ├── /
      ├── /login
      ├── /register
      ├── /dashboard
      ├── /profile
      ├── /settings
      ├── /admin
      └── /api
            ├── /users
            ├── /products
            └── /orders

MEMORY:

    HTTP History
        = Traffic

    Site Map
        = Structure

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 10. SCOPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Scope defines which targets are included in testing.

Workflow:

    Target
       ↓
    Site Map
       ↓
    Select target
       ↓
    Add to scope
       ↓
    Scope settings

Concept:

    INCLUDE
       +
    EXCLUDE

Room target:

    http://10.48.155.152/

IMPORTANT:

    Always stay within authorised scope.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧹 11. WHY SCOPE IS IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A browser can generate a large amount of background traffic.

Examples:

    HTML
    CSS
    JavaScript
    Images
    Fonts
    APIs
    Analytics
    WebSockets
    Third-party resources

Without scope:

    Lots of traffic
       ↓
    Burp
       ↓
    Noise

With scope:

    Traffic
       ↓
    Scope
       ↓
    Relevant target
       ↓
    Cleaner testing

Benefits:

    ✓ Less noise
    ✓ Easier analysis
    ✓ Better organisation
    ✓ Reduced accidental testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 12. INTERCEPT ONLY IN-SCOPE TRAFFIC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Configure:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Request interception rules
       ↓
    URL
       ↓
    Is in target scope

Logic:

    REQUEST
       ↓
    IN SCOPE?
       │
       ├── YES → INTERCEPT
       │
       └── NO  → IGNORE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 13. HTTPS INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTPS uses TLS encryption.

Burp needs the browser to trust the Burp CA.

Flow:

    Browser
       ↓
    HTTPS
       ↓
    Burp
       ↓
    HTTPS
       ↓
    Server

Required:

    PortSwigger CA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ 14. PORTSWIGGER CA SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Open:

    http://burp/cert

Download:

    cert.der

Firefox:

    Settings
       ↓
    Privacy & Security
       ↓
    Certificates
       ↓
    View Certificates
       ↓
    Authorities
       ↓
    Import
       ↓
    cert.der
       ↓
    Trust this CA to identify websites

Result:

    Browser trusts PortSwigger CA
       ↓
    Burp-generated certificates trusted
       ↓
    HTTPS traffic can be inspected

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 15. HTTPS TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HTTPS not working?

    CHECK
       ↓
    Burp running?
       ↓
    Listener active?
       ↓
    Browser proxy correct?
       ↓
    127.0.0.1:8080?
       ↓
    cert.der downloaded?
       ↓
    CA imported?
       ↓
    CA trusted?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 16. BURP'S BUILT-IN BROWSER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp provides a Chromium-based browser.

Open:

    Proxy
       ↓
    Open browser

Flow:

    Burp Browser
       ↓
    Burp Proxy
       ↓
    Target

Advantages:

    ✓ Already configured
    ✓ No FoxyProxy setup required
    ✓ Convenient for testing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚠️ 17. BROWSER SANDBOX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Potential problem:

    Burp running as root
       ↓
    Chromium sandbox
       ↓
    Browser may not launch

Preferred:

    Run Burp as a low-privilege user.

Alternative:

    Settings
       ↓
    Tools
       ↓
    Burp's browser
       ↓
    Allow browser without sandbox

Security:

    Sandbox ON
        → Better isolation

    Sandbox OFF
        → Reduced isolation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 18. HTTP REQUEST ANATOMY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Typical request:

    METHOD /path HTTP/version
    Host: target
    Header: value
    Cookie: value

    Body

Break it down:

    METHOD
       ↓
    URL / PATH
       ↓
    PARAMETERS
       ↓
    HEADERS
       ↓
    COOKIES
       ↓
    BODY

Example:

    GET /profile?id=10 HTTP/1.1
    Host: target.local
    Cookie: session=abc123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔎 19. RESPONSE ANATOMY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Response:

    STATUS CODE
       ↓
    HEADERS
       ↓
    COOKIES
       ↓
    BODY

Common status codes:

    200
        → OK

    301 / 302
        → Redirect

    400
        → Bad Request

    401
        → Unauthorised

    403
        → Forbidden

    404
        → Not Found

    500
        → Server Error

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✏️ 20. MODIFYING A REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Original:

    GET /profile?id=10 HTTP/1.1

Modified:

    GET /profile?id=11 HTTP/1.1

Workflow:

    Capture
       ↓
    Inspect
       ↓
    Modify
       ↓
    Forward
       ↓
    Observe
       ↓
    Analyse

This is the foundation of manual web application testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 21. REPEATER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Repeater allows manual repeated testing of an existing request.

Flow:

    HTTP History
       ↓
    Select request
       ↓
    Send to Repeater
       ↓
    Modify
       ↓
    Send
       ↓
    Analyse
       ↓
    Modify
       ↓
    Send again

MEMORY:

    INTERCEPT
        = Catch

    REPEATER
        = Experiment

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 22. INTERCEPT vs REPEATER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTERCEPT:

    Browser
       ↓
    Request
       ↓
    Burp
       ↓
    Pause
       ↓
    Modify
       ↓
    Forward

REPEATER:

    Existing Request
       ↓
    Repeater
       ↓
    Modify
       ↓
    Send
       ↓
    Analyse
       ↓
    Modify again
       ↓
    Send again

MEMORY:

    Intercept = Real-time

    Repeater = Manual replay

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 23. MATCH AND REPLACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Location:

    Settings
       ↓
    Tools
       ↓
    Proxy
       ↓
    Match and Replace

Flow:

    Request
       ↓
    Match
       ↓
    Replace
       ↓
    Modified Request
       ↓
    Target

Useful for repetitive changes to:

    Headers
    User-Agent
    Cookies
    Request values

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🍪 24. COOKIES & SESSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Typical authentication/session flow:

    Login
       ↓
    Server
       ↓
    Session created
       ↓
    Cookie returned
       ↓
    Browser stores cookie
       ↓
    Browser sends cookie
       ↓
    Server identifies session

Example:

    Cookie: session=abc123

Burp setting:

    Settings
       ↓
    Sessions
       ↓
    Cookie jar

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 25. XSS — PRACTICAL FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Room example:

    Support Form
       ↓
    Input
       ↓
    Client-side validation
       ↓
    HTTP Request
       ↓
    Burp
       ↓
    Modify parameter
       ↓
    Forward
       ↓
    Server
       ↓
    Application
       ↓
    XSS

Room result:

    Succ3ssful XSS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 26. CLIENT-SIDE VALIDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Important:

    CLIENT-SIDE VALIDATION
             ≠
    SECURITY BOUNDARY

Why?

    Browser
       ↓
    Controlled by user
       ↓
    Request generated
       ↓
    Burp
       ↓
    Request modified
       ↓
    Server

Therefore:

    Client-side validation can be bypassed.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 27. SERVER-SIDE SECURITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Secure model:

    USER INPUT
       ↓
    CLIENT VALIDATION
       ↓
    HTTP REQUEST
       ↓
    SERVER VALIDATION
       ↓
    AUTHORISATION
       ↓
    SAFE PROCESSING
       ↓
    OUTPUT ENCODING
       ↓
    BROWSER

Golden rule:

    CLIENT = UNTRUSTED

    SERVER = SECURITY BOUNDARY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔡 28. URL ENCODING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Shortcut:

    Ctrl + U

Example:

    <  →  %3C
    >  →  %3E

Workflow:

    Select text
       ↓
    Ctrl + U
       ↓
    URL encoded value
       ↓
    Send request

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 29. BURP MODULE CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    TARGET
        → Application map + scope

    PROXY
        → Intercept traffic

    REPEATER
        → Manual replay

    INTRUDER
        → Payload testing

    DECODER
        → Encode / Decode

    COMPARER
        → Compare

    SEQUENCER
        → Token randomness

    COLLABORATOR
        → Out-of-band interaction

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 30. MODULE MEMORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    TARGET
       ↓
    MAP

    PROXY
       ↓
    CATCH

    REPEATER
       ↓
    REPLAY

    INTRUDER
       ↓
    PAYLOAD

    DECODER
       ↓
    DECODE

    COMPARER
       ↓
    DIFFERENCE

    SEQUENCER
       ↓
    RANDOMNESS

    COLLABORATOR
       ↓
    OUT-OF-BAND

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚙️ 31. SETTINGS MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    SETTINGS
       │
       ├── Sessions
       │     └── Cookie jar
       │
       ├── Suite
       │     └── Updates
       │
       ├── User interface
       │     └── Hotkeys
       │
       └── Tools
             ├── Proxy
             └── Burp's browser

TARGET:

    Target
       └── Scope settings

PROXY:

    Proxy
       ├── Intercept
       ├── HTTP History
       ├── WebSockets History
       └── Proxy Settings

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⌨️ 32. SHORTCUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ctrl + Shift + D
        → Dashboard

    Ctrl + Shift + T
        → Target

    Ctrl + Shift + P
        → Proxy

    Ctrl + Shift + I
        → Intruder

    Ctrl + Shift + R
        → Repeater

    Ctrl + U
        → URL Encode

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 33. ROOM VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PROXY:

    127.0.0.1:8080

TARGET:

    http://10.48.155.152/

CERTIFICATE:

    http://burp/cert

CERTIFICATE FILE:

    cert.der

CA:

    PortSwigger CA

XSS RESULT:

    Succ3ssful XSS

CHALLENGE FLAG:

    THM{NmNIZTINGE1MWU1ZTQzMzgzNmFiNWVk}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 34. TRYHACKME PRACTICAL WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    START ROOM
       ↓
    START MACHINE
       ↓
    GET TARGET IP
       ↓
    START BURP
       ↓
    CONFIGURE BROWSER
       ↓
    127.0.0.1:8080
       ↓
    OPEN TARGET
       ↓
    CAPTURE REQUEST
       ↓
    HTTP HISTORY
       ↓
    SITE MAP
       ↓
    DEFINE SCOPE
       ↓
    FIND INTERESTING REQUEST
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    FORWARD / REPEATER
       ↓
    ANALYSE RESPONSE
       ↓
    VALIDATE
       ↓
    FIND FLAG / VULNERABILITY
       ↓
    SUBMIT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔍 35. REQUEST ANALYSIS CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When you capture a request:

    [ ] Method
    [ ] Endpoint
    [ ] URL
    [ ] Query parameters
    [ ] Headers
    [ ] Cookies
    [ ] Authentication
    [ ] Content-Type
    [ ] Body
    [ ] IDs
    [ ] User-controlled values

Ask:

    "Which values are controlled by the client?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔎 36. RESPONSE ANALYSIS CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Check:

    [ ] Status code
    [ ] Location
    [ ] Set-Cookie
    [ ] Content-Type
    [ ] Security headers
    [ ] Response body
    [ ] Errors
    [ ] JSON
    [ ] Redirects
    [ ] Application messages

Ask:

    "How did the server react?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 37. TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NO TRAFFIC:

    Burp running?
       ↓
    Listener active?
       ↓
    Browser proxy configured?
       ↓
    127.0.0.1:8080?
       ↓
    FoxyProxy enabled?
       ↓
    Generate traffic

──────────────────────────────────────────────────────────────

BROWSER HANGS:

    Intercept ON?
       ↓
    Forward / Drop

──────────────────────────────────────────────────────────────

HTTPS ERROR:

    PortSwigger CA?
       ↓
    cert.der?
       ↓
    Imported?
       ↓
    Trusted?

──────────────────────────────────────────────────────────────

TOO MUCH TRAFFIC:

    Define scope
       ↓
    Add target
       ↓
    Intercept only in-scope traffic

──────────────────────────────────────────────────────────────

BURP BROWSER FAILS:

    Check whether Burp is running as root.
       ↓
    Prefer low-privilege execution.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 38. PROFESSIONAL TESTING RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    01. Obtain authorization.

    02. Define scope.

    03. Stay inside scope.

    04. Understand the request.

    05. Treat client input as untrusted.

    06. Validate findings.

    07. Preserve evidence.

    08. Document impact.

    09. Document reproduction steps.

    10. Report responsibly.

## Interview Questions

Q1.
What is Burp Suite?

Answer

A web application security testing platform developed by
PortSwigger.

------------------------------------------------------------

Q2.
What is Burp Proxy?

Answer

An intermediary that allows HTTP/HTTPS traffic between the client
and server to be intercepted and analysed.

------------------------------------------------------------

Q3.
What is Intercept?

Answer

It pauses matching traffic for inspection, modification,
forwarding or dropping.

------------------------------------------------------------

Q4.
What is HTTP History?

Answer

A record of HTTP traffic that has passed through Burp.

------------------------------------------------------------

Q5.
What is Site Map?

Answer

A structured representation of discovered application resources.

------------------------------------------------------------

Q6.
What is Scope?

Answer

The defined set of targets included or excluded from testing.

------------------------------------------------------------

Q7.
Why is scope important?

Answer

It reduces noise and helps prevent unintended out-of-scope
testing.

------------------------------------------------------------

Q8.
What is Repeater?

Answer

A tool for manually modifying and repeatedly sending requests.

------------------------------------------------------------

Q9.
What is Intruder?

Answer

A tool for customised automated payload testing.

------------------------------------------------------------

Q10.
Why install the PortSwigger CA?

Answer

To allow the browser to trust Burp-generated certificates for
HTTPS interception.

------------------------------------------------------------

Q11.
Why can't client-side validation be trusted?

Answer

Because the client is controlled by the user and HTTP requests
can be modified before reaching the server.

------------------------------------------------------------

## 🧠 40. FINAL MEMORY PALACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP
      ↓
    CONTROL

    PROXY
      ↓
    MIDDLEMAN

    INTERCEPT
      ↓
    PAUSE

    FORWARD
      ↓
    CONTINUE

    DROP
      ↓
    DISCARD

    HISTORY
      ↓
    REVIEW

    SITE MAP
      ↓
    DISCOVER

    SCOPE
      ↓
    LIMIT

    HTTPS
      ↓
    TRUST CA

    REPEATER
      ↓
    REPLAY

    INTRUDER
      ↓
    PAYLOADS

    XSS
      ↓
    INPUT HANDLING

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ 41. 30-SECOND REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP
      ↓
    127.0.0.1:8080
      ↓
    BROWSER
      ↓
    TARGET
      ↓
    INTERCEPT
      ↓
    INSPECT
      ↓
    MODIFY
      ↓
    FORWARD
      ↓
    HTTP HISTORY
      ↓
    SITE MAP
      ↓
    SCOPE
      ↓
    HTTPS
      ↓
    PortSwigger CA
      ↓
    cert.der
      ↓
    REPEATER
      ↓
    ANALYSE
      ↓
    VALIDATE
      ↓
    REPORT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏆 42. FINAL CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[✓] Burp Suite

[✓] Proxy

[✓] Proxy listener

[✓] 127.0.0.1:8080

[✓] FoxyProxy

[✓] Intercept

[✓] Forward

[✓] Drop

[✓] HTTP History

[✓] WebSocket History

[✓] Site Map

[✓] Scope

[✓] Scope filtering

[✓] Burp Browser

[✓] Browser sandbox

[✓] HTTPS interception

[✓] PortSwigger CA

[✓] cert.der

[✓] Request anatomy

[✓] Response anatomy

[✓] Request modification

[✓] Repeater

[✓] Match & Replace

[✓] Cookies

[✓] Sessions

[✓] URL encoding

[✓] XSS

[✓] Client-side validation

[✓] Server-side validation

[✓] Intruder

[✓] Troubleshooting

[✓] Practical workflow

[✓] Interview revision

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 43. FINAL TAKEAWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The real skill is not memorising Burp's interface.

Understand the traffic:

    USER ACTION
       ↓
    BROWSER
       ↓
    HTTP REQUEST
       ↓
    BURP
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    SERVER
       ↓
    RESPONSE
       ↓
    ANALYSE
       ↓
    SECURITY DECISION

The browser shows the application.

Burp exposes the communication behind the application.

That is the foundation of manual web application security testing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚀 44. NEXT LEARNING PATH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP SUITE: THE BASICS
             │
             ▼
           PROXY
             │
             ▼
         REPEATER
             │
             ▼
    REQUEST MANIPULATION
             │
             ▼
      WEB VULNERABILITIES
             │
             ▼
        ADVANCED BURP
             │
             ▼
      WEB PENTESTING
             │
             ▼
        CTF / LABS
             │
             ▼
         APPSEC

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 BURP SUITE: THE BASICS — PRACTICAL WEB TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎯 PRACTICAL MINDSET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Burp Suite becomes useful when we stop thinking about the UI
and start thinking about the application's HTTP traffic.

The core mindset:

    USER ACTION
       ↓
    REQUEST
       ↓
    BURP
       ↓
    INSPECT
       ↓
    MODIFY
       ↓
    SEND
       ↓
    RESPONSE
       ↓
    COMPARE
       ↓
    UNDERSTAND APPLICATION BEHAVIOUR

The objective is to understand:

    WHAT?
      ↓
    HOW?
      ↓
    WHERE?
      ↓
    WHY?
      ↓
    WHAT CHANGES?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 1. THINK IN HTTP, NOT IN WEB PAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When a webpage shows:

    Login

Do not only think:

    "There is a login page."

Think:

    Browser
       ↓
    GET /login
       ↓
    Response
       ↓
    Login form
       ↓
    POST /login
       ↓
    username=
    password=
       ↓
    Server
       ↓
    Response
       ↓
    Session cookie

The visible webpage is only the interface.

The actual application communicates through requests
and responses.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔍 2. FINDING INTERESTING REQUESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Browse the application normally.

Then:

    Proxy
       ↓
    HTTP History
       ↓
    Review requests
       ↓
    Identify interesting endpoints
       ↓
    Inspect parameters

Interesting locations can include:

    /login
    /register
    /admin
    /dashboard
    /profile
    /settings
    /api/
    /upload
    /search
    /download
    /logout

Interesting parameters:

    id=
    user=
    username=
    file=
    path=
    url=
    search=
    redirect=
    page=
    token=

These are not automatically vulnerabilities.

They are simply places where application behaviour may
need investigation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧭 3. APPLICATION DISCOVERY WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Open target
       ↓
    Browse homepage
       ↓
    Follow links
       ↓
    Submit normal forms
       ↓
    Observe traffic
       ↓
    HTTP History
       ↓
    Site Map
       ↓
    Identify endpoints
       ↓
    Identify parameters
       ↓
    Identify authentication/session behaviour
       ↓
    Begin authorised testing

MEMORY:

    BROWSE → CAPTURE → MAP → ANALYSE → TEST

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 4. TARGET SCOPE BEFORE TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before manipulating requests:

    Confirm:
        ✓ Target
        ✓ Scope
        ✓ Authorisation

Then:

    Target
       ↓
    Scope
       ↓
    Proxy
       ↓
    Testing

Never assume that because traffic is visible in Burp,
it is automatically authorised to test.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 5. REQUEST COMPARISON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

One of the most useful habits:

    NORMAL REQUEST
          ↓
    MODIFY ONE THING
          ↓
    SEND
          ↓
    COMPARE RESPONSE

Example:

    Request A:

    GET /profile?id=10

    Request B:

    GET /profile?id=11

Then compare:

    Status code
    Response length
    Response body
    Redirect
    Error
    Returned data

Why modify one thing at a time?

    ONE CHANGE
       ↓
    CLEAR RESULT
       ↓
    EASIER ANALYSIS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 6. REPEATER — PRACTICAL WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    HTTP History
       ↓
    Select request
       ↓
    Right-click
       ↓
    Send to Repeater
       ↓
    Repeater
       ↓
    Modify request
       ↓
    Send
       ↓
    Observe response
       ↓
    Change one value
       ↓
    Send again
       ↓
    Compare

Repeater is ideal for:

    • Manual experimentation
    • Parameter testing
    • Header testing
    • Response comparison
    • Reproducing behaviour

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 7. WHY REPEATER IS IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Browser testing:

    Click
       ↓
    Page
       ↓
    Click
       ↓
    Page

Repeater:

    Request
       ↓
    Modify
       ↓
    Send
       ↓
    Modify
       ↓
    Send
       ↓
    Compare
       ↓
    Repeat

Therefore:

    Browser
        → User experience

    Repeater
        → HTTP-level experimentation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔬 8. PARAMETER ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Suppose:

    GET /profile?id=10

Break it down:

    Endpoint:
        /profile

    Parameter:
        id

    Value:
        10

Testing mindset:

    What does this parameter control?

Possible behaviour:

    id=10
       ↓
    User 10

    id=11
       ↓
    User 11

The important question is:

    Does the server properly enforce authorisation?

Do not assume a parameter is vulnerable merely because
changing it changes the response.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🍪 9. SESSION ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Look for:

    Cookie
    Authorization header
    Session identifiers
    Tokens

Example:

    Cookie: session=abc123

Ask:

    Where is authentication represented?

    Is the session maintained using a cookie?

    Does the application issue a new session after login?

    What happens after logout?

    What happens when the session expires?

The goal is understanding application behaviour before
drawing security conclusions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 10. HEADERS — WHAT TO LOOK FOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REQUEST HEADERS:

    Host
    User-Agent
    Cookie
    Authorization
    Content-Type
    Referer
    Origin

RESPONSE HEADERS:

    Content-Type
    Set-Cookie
    Location
    Server
    Content-Security-Policy
    Strict-Transport-Security
    X-Content-Type-Options

Headers can reveal:

    Authentication
    Session management
    Content handling
    Redirect behaviour
    Security controls

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 11. AUTHENTICATION REQUEST FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Typical:

    GET /login
       ↓
    Login form
       ↓
    POST /login
       ↓
    Server validates credentials
       ↓
    Authentication succeeds
       ↓
    Session created
       ↓
    Set-Cookie
       ↓
    Browser stores cookie
       ↓
    Authenticated requests

Burp lets us observe this entire flow.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚪 12. LOGOUT FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Typical:

    User clicks Logout
       ↓
    Request
       ↓
    Server invalidates session
       ↓
    Response
       ↓
    Browser no longer authenticated

Testing mindset:

    Login
       ↓
    Capture session
       ↓
    Logout
       ↓
    Observe session behaviour

Always perform this only within an authorised lab or target.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 13. ONE-VARIABLE TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Bad approach:

    Change:
        ID
        Cookie
        Header
        Method
        Body
        Parameter

    all at once.

Result:

    Hard to understand what caused the behaviour.

Better:

    Original request
          ↓
    Change ONE value
          ↓
    Send
          ↓
    Observe
          ↓
    Record
          ↓
    Next change

MEMORY:

    ONE CHANGE
       =
    ONE CLEAR EXPERIMENT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📊 14. RESPONSE COMPARISON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Compare:

    STATUS
       ↓
    LENGTH
       ↓
    HEADERS
       ↓
    BODY
       ↓
    REDIRECT
       ↓
    ERROR
       ↓
    DATA

Example:

    Request A
       ↓
    200 OK
       ↓
    5 KB

    Request B
       ↓
    403 Forbidden
       ↓
    1 KB

This difference may tell you that the application treats
the requests differently.

It is evidence for investigation, not automatically proof
of a vulnerability.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 15. STATUS CODE MEMORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    200
      → Success

    201
      → Resource created

    204
      → Success, no content

    301
      → Permanent redirect

    302
      → Temporary redirect

    400
      → Bad request

    401
      → Authentication required

    403
      → Forbidden

    404
      → Not found

    405
      → Method not allowed

    500
      → Internal server error

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧱 16. CONTENT TYPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Common request/response content types:

    text/html

        HTML page

    application/json

        JSON API data

    application/x-www-form-urlencoded

        Traditional form submission

    multipart/form-data

        File/form uploads

    text/plain

        Plain text

Understanding Content-Type helps determine how the application
expects the body to be formatted.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📦 17. JSON REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Example:

    POST /api/profile HTTP/1.1

    Content-Type: application/json

    {
        "username": "surya",
        "role": "user"
    }

Burp allows the tester to inspect the complete JSON body.

Testing mindset:

    Which values are user-controlled?

    Which values are server-controlled?

    Does the server validate them?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📝 18. FORM REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Example:

    POST /login HTTP/1.1

    Content-Type:
    application/x-www-form-urlencoded

    username=user&password=test

Burp displays the request in raw HTTP form.

This allows precise inspection of:

    username
    password
    cookies
    headers
    parameters

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📁 19. FILE UPLOAD REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File uploads commonly use:

    multipart/form-data

Concept:

    Browser
       ↓
    Upload form
       ↓
    HTTP request
       ↓
    multipart/form-data
       ↓
    Burp
       ↓
    Server

Important areas for authorised testing:

    Filename
    Content-Type
    File contents
    Form parameters
    Server response

Do not assume client-side file restrictions are sufficient.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 20. CLIENT vs SERVER TRUST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT:

    User-controlled

    Browser
       ↓
    JavaScript
       ↓
    UI restrictions

SERVER:

    Security boundary

    Request
       ↓
    Authentication
       ↓
    Authorisation
       ↓
    Validation
       ↓
    Processing

Golden rule:

    Never trust security decisions made only by the client.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 21. XSS CONNECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The XSS example demonstrates:

    Browser restriction
          ↓
    HTTP request
          ↓
    Burp
          ↓
    Request modification
          ↓
    Server
          ↓
    Application behaviour

Lesson:

    A browser can enforce UI restrictions.

    A security boundary must exist on the server.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔡 22. ENCODING vs DECODING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Encoding:

    Original data
       ↓
    Encoded representation

Decoding:

    Encoded representation
       ↓
    Original data

Burp Decoder helps work with common transformations.

Examples:

    URL encoding
    Base64
    HTML encoding
    Hexadecimal

Important:

    Encoding ≠ Encryption

Encoding is generally reversible and is not intended to
provide confidentiality.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 23. URL ENCODING MEMORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Examples:

    <  →  %3C
    >  →  %3E
    space → %20

Burp shortcut:

    Ctrl + U

Use URL encoding when data needs to be represented safely
inside a URL/query context.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 24. MATCH AND REPLACE — WHEN TO USE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Use Match and Replace when the same modification must happen
repeatedly.

Flow:

    Request
       ↓
    Match condition
       ↓
    Replacement
       ↓
    Modified request
       ↓
    Target

Examples:

    Replace User-Agent
    Add/replace a header
    Modify a cookie
    Replace a recurring value

For one-off changes:

    Intercept / Repeater

For repeated automatic changes:

    Match and Replace

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 25. TOOL SELECTION CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Need to catch a live request?

    → Proxy / Intercept

Need to review previous traffic?

    → HTTP History

Need to understand application structure?

    → Target / Site Map

Need to repeatedly test one request?

    → Repeater

Need automated payload testing?

    → Intruder

Need encoding/decoding?

    → Decoder

Need to compare data?

    → Comparer

Need token randomness analysis?

    → Sequencer

Need out-of-band testing?

    → Collaborator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 26. PRACTICAL MINI-WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    1. Start Burp
          ↓
    2. Configure browser
          ↓
    3. Confirm proxy
          ↓
    4. Open target
          ↓
    5. Browse normally
          ↓
    6. Open HTTP History
          ↓
    7. Identify interesting request
          ↓
    8. Send to Repeater
          ↓
    9. Change one value
          ↓
   10. Send
          ↓
   11. Compare response
          ↓
   12. Understand behaviour
          ↓
   13. Validate finding
          ↓
   14. Document

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔍 27. PRACTICAL ANALYSIS QUESTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

For every interesting request ask:

    ┌────────────────────────────────────┐
    │ What endpoint is this?             │
    ├────────────────────────────────────┤
    │ What method is being used?         │
    ├────────────────────────────────────┤
    │ What parameters exist?             │
    ├────────────────────────────────────┤
    │ Which values are user-controlled?  │
    ├────────────────────────────────────┤
    │ What authentication is present?    │
    ├────────────────────────────────────┤
    │ What session is being used?        │
    ├────────────────────────────────────┤
    │ What does the response contain?    │
    ├────────────────────────────────────┤
    │ What happens if one value changes? │
    └────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 28. DO NOT CONFUSE BEHAVIOUR WITH VULNERABILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Example:

    id=10
       ↓
    User A

    id=11
       ↓
    User B

This proves:

    The parameter influences the response.

It does NOT automatically prove:

    IDOR

To establish a security issue, you need to determine whether
access control is improperly enforced.

General principle:

    OBSERVATION
       ↓
    HYPOTHESIS
       ↓
    TEST
       ↓
    EVIDENCE
       ↓
    VALIDATED FINDING

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 29. BURP TESTING LOOP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    OBSERVE
       ↓
    HYPOTHESISE
       ↓
    MODIFY
       ↓
    SEND
       ↓
    OBSERVE
       ↓
    COMPARE
       ↓
    VALIDATE
       ↓
    DOCUMENT

Repeat:

    ┌──────────────────────────────┐
    │                              │
    │   OBSERVE → TEST → COMPARE   │
    │      ↑              │        │
    │      └──────────────┘        │
    │                              │
    └──────────────────────────────┘

This is the fundamental manual testing loop.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 30. FINAL MEMORY MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    TARGET
       ↓
    SCOPE
       ↓
    BROWSER
       ↓
    PROXY
       ↓
    INTERCEPT
       ↓
    HTTP HISTORY
       ↓
    SITE MAP
       ↓
    INTERESTING REQUEST
       ↓
    REPEATER
       ↓
    MODIFY ONE VALUE
       ↓
    SEND
       ↓
    RESPONSE
       ↓
    COMPARE
       ↓
    VALIDATE
       ↓
    REPORT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ 31. RAPID REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    127.0.0.1:8080
        → Burp Proxy

    Intercept
        → Pause traffic

    Forward
        → Send traffic

    Drop
        → Discard traffic

    HTTP History
        → Previous traffic

    Site Map
        → Application structure

    Scope
        → Testing boundary

    Repeater
        → Manual replay

    Intruder
        → Automated payload testing

    Decoder
        → Encode/decode

    PortSwigger CA
        → HTTPS interception trust

    cert.der
        → Burp CA certificate

    Ctrl + U
        → URL encode

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏆 32. FINAL PRACTICAL CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[✓] Start Burp
[✓] Configure browser
[✓] Verify 127.0.0.1:8080
[✓] Define target scope
[✓] Browse application
[✓] Capture requests
[✓] Review HTTP History
[✓] Review Site Map
[✓] Identify parameters
[✓] Inspect cookies
[✓] Inspect headers
[✓] Inspect request body
[✓] Inspect response
[✓] Send interesting request to Repeater
[✓] Change one value
[✓] Send request
[✓] Compare response
[✓] Validate behaviour
[✓] Document evidence
[✓] Stay within authorised scope

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 33. PART 14 TAKEAWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The most important practical skill is:

    SEE THE REQUEST
          ↓
    UNDERSTAND THE REQUEST
          ↓
    CHANGE ONE THING
          ↓
    SEND IT
          ↓
    READ THE RESPONSE
          ↓
    COMPARE
          ↓
    VALIDATE

Do not blindly modify requests.

Do not blindly assume a difference is a vulnerability.

Instead:

    OBSERVE
       ↓
    UNDERSTAND
       ↓
    TEST
       ↓
    PROVE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 BURP SUITE: THE BASICS — PRACTICAL REQUEST ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 🎯 CORE OBJECTIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The real purpose of learning Burp Suite is not memorising where
buttons are.

The goal is to understand HTTP communication at a level where you
can answer:

    WHAT REQUEST WAS SENT?
           ↓
    WHY WAS IT SENT?
           ↓
    WHAT DATA DID IT CONTAIN?
           ↓
    WHAT DID THE SERVER DO?
           ↓
    WHAT CHANGED WHEN I MODIFIED IT?
           ↓
    IS THE BEHAVIOUR SECURE?

Core loop:

    OBSERVE
       ↓
    UNDERSTAND
       ↓
    MODIFY
       ↓
    SEND
       ↓
    ANALYSE
       ↓
    VALIDATE
       ↓
    DOCUMENT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 1. THINK LIKE A WEB SECURITY TESTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A normal user thinks:

    "I clicked Login."

A security tester thinks:

    Browser
       ↓
    GET /login
       ↓
    Login form
       ↓
    POST /login
       ↓
    username=
    password=
       ↓
    Server
       ↓
    Response
       ↓
    Set-Cookie
       ↓
    Authenticated session

The visible interface is only one layer.

Burp allows you to inspect the underlying communication.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🌐 2. REQUEST → SERVER → RESPONSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Complete model:

    ┌───────────┐
    │  BROWSER  │
    └─────┬─────┘
          │
          │ HTTP REQUEST
          ▼
    ┌───────────────┐
    │ BURP PROXY    │
    └──────┬────────┘
           │
           │ Request
           ▼
    ┌───────────────┐
    │ SERVER        │
    └──────┬────────┘
           │
           │ Response
           ▼
    ┌───────────────┐
    │ BURP PROXY    │
    └──────┬────────┘
           │
           │ Response
           ▼
    ┌───────────┐
    │  BROWSER  │
    └───────────┘

Burp can sit between both directions.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 3. REQUEST ANALYSIS — STEP BY STEP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Suppose Burp captures:

    GET /profile?id=10 HTTP/1.1
    Host: target.local
    Cookie: session=abc123

Analyse it:

    METHOD:
        GET

    PATH:
        /profile

    PARAMETER:
        id

    VALUE:
        10

    HOST:
        target.local

    SESSION:
        abc123

Now ask:

    What does /profile do?

    What does id control?

    What does the session cookie represent?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔎 4. REQUEST COMPONENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A request may contain:

    METHOD
       ↓
    PATH
       ↓
    QUERY PARAMETERS
       ↓
    HEADERS
       ↓
    COOKIES
       ↓
    BODY

Example:

    POST /api/profile HTTP/1.1
    Host: target.local
    Content-Type: application/json
    Cookie: session=abc123

    {
        "name":"Surya",
        "role":"user"
    }

Potentially interesting values:

    name
    role
    id
    token
    redirect
    file
    path
    URL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 5. USER-CONTROLLED DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A critical security question:

    "Which values can the user control?"

Examples:

    Query parameters:

        ?id=10

    Form fields:

        username=user

    JSON:

        {"role":"user"}

    Headers:

        User-Agent: Firefox

    Cookies:

        session=abc123

The fact that a value is user-controlled does NOT automatically
mean it is vulnerable.

It means:

    "This is something worth understanding and testing."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔬 6. ONE-CHANGE TESTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Best manual testing habit:

    ORIGINAL REQUEST
          ↓
    CHANGE ONE VALUE
          ↓
    SEND
          ↓
    OBSERVE RESPONSE
          ↓
    COMPARE

Example:

    Original:

    GET /profile?id=10

    Test:

    GET /profile?id=11

Do not change multiple unrelated values at once.

Why?

    One change
       ↓
    One variable
       ↓
    Clear observation
       ↓
    Easier conclusion

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📊 7. RESPONSE COMPARISON
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

After modifying a request, compare:

    STATUS CODE
       ↓
    RESPONSE LENGTH
       ↓
    HEADERS
       ↓
    COOKIES
       ↓
    REDIRECT
       ↓
    RESPONSE BODY
       ↓
    ERROR MESSAGE
       ↓
    RETURNED DATA

Example:

    Request A
       ↓
    200 OK
       ↓
    User data returned

    Request B
       ↓
    403 Forbidden
       ↓
    Access denied

This tells you that the application treated the requests
differently.

It does not automatically prove a vulnerability.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 8. OBSERVATION ≠ VULNERABILITY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Example:

    id=10
       ↓
    User A

    id=11
       ↓
    User B

Observation:

    The ID changes the returned object.

Possible hypothesis:

    "Could access control be missing?"

Next:

    Test authorised behaviour
       ↓
    Verify ownership/access rules
       ↓
    Compare expected vs actual
       ↓
    Collect evidence
       ↓
    Determine whether vulnerability exists

Memory:

    OBSERVATION
       ↓
    HYPOTHESIS
       ↓
    TEST
       ↓
    EVIDENCE
       ↓
    FINDING

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔐 9. AUTHENTICATION vs AUTHORISATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AUTHENTICATION:

    "Who are you?"

Example:

    Username + Password
       ↓
    Login
       ↓
    Identity established

AUTHORISATION:

    "What are you allowed to access?"

Example:

    User A
       ↓
    Access own profile
       ↓
    Allowed

    User A
       ↓
    Access another user's private resource
       ↓
    Should be denied

Memory:

    AUTHENTICATION
        = WHO?

    AUTHORISATION
        = WHAT ARE YOU ALLOWED TO DO?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🍪 10. SESSION MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Typical flow:

    Login
       ↓
    Credentials validated
       ↓
    Session created
       ↓
    Session identifier
       ↓
    Cookie
       ↓
    Browser sends cookie
       ↓
    Server recognises session

Example:

    Cookie: session=abc123

When analysing sessions, understand:

    Login
    Session creation
    Authenticated requests
    Logout
    Session expiration

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 11. AUTHENTICATION FLOW IN BURP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Open /login
       ↓
    GET /login
       ↓
    Login form
       ↓
    POST /login
       ↓
    Credentials
       ↓
    Server response
       ↓
    Set-Cookie
       ↓
    Authenticated request
       ↓
    Cookie sent
       ↓
    Protected resource

Burp allows you to inspect each stage.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚪 12. LOGOUT ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Typical:

    Authenticated user
       ↓
    Logout
       ↓
    Request
       ↓
    Server invalidates session
       ↓
    Response
       ↓
    User becomes unauthenticated

Security testing question:

    Does the application actually invalidate the session?

Always test such behaviour only in an authorised environment.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧩 13. HEADERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Important REQUEST headers:

    Host
    User-Agent
    Cookie
    Authorization
    Content-Type
    Referer
    Origin

Important RESPONSE headers:

    Content-Type
    Set-Cookie
    Location
    Server
    Content-Security-Policy
    Strict-Transport-Security
    X-Content-Type-Options

Headers can reveal:

    Authentication
    Session management
    Content handling
    Redirect behaviour
    Security controls

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📝 14. CONTENT-TYPE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Common types:

    text/html
        → HTML

    application/json
        → JSON

    application/x-www-form-urlencoded
        → Standard form data

    multipart/form-data
        → File/form upload

    text/plain
        → Plain text

The Content-Type tells the server how to interpret the body.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📦 15. JSON REQUEST ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Example:

    POST /api/profile HTTP/1.1

    Content-Type: application/json

    {
        "username":"surya",
        "role":"user"
    }

Analyse:

    Endpoint:
        /api/profile

    Content-Type:
        application/json

    Parameters:
        username
        role

Security question:

    Does the server independently validate important values?

Do not assume that changing a JSON field proves a vulnerability.

The server's response and access-control behaviour must be
validated.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📝 16. FORM REQUEST ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Example:

    POST /login HTTP/1.1

    Content-Type:
    application/x-www-form-urlencoded

    username=user&password=test

Burp allows you to inspect:

    username
    password
    headers
    cookies
    session information
    response

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📁 17. MULTIPART / FILE UPLOAD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

File uploads commonly use:

    multipart/form-data

Flow:

    Browser
       ↓
    Upload form
       ↓
    Multipart request
       ↓
    Burp
       ↓
    Server

Things to understand:

    Filename
    Content-Type
    File content
    Form parameters
    Server response

Important security lesson:

    Browser-side restrictions are not enough.

The server must validate uploaded content appropriately.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 18. CLIENT-SIDE vs SERVER-SIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CLIENT:

    User-controlled
       ↓
    Browser
       ↓
    JavaScript
       ↓
    UI restrictions

SERVER:

    Security boundary
       ↓
    Request
       ↓
    Authentication
       ↓
    Authorisation
       ↓
    Validation
       ↓
    Processing

Golden rule:

    NEVER TRUST CLIENT-SIDE SECURITY CONTROLS.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🕸️ 19. XSS — CONNECTION TO BURP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Room concept:

    User input
       ↓
    Client-side restriction
       ↓
    HTTP request
       ↓
    Burp
       ↓
    Request modification
       ↓
    Server
       ↓
    Application
       ↓
    XSS behaviour

The important lesson:

    Client-side validation can be bypassed.

Therefore:

    Server-side validation + safe output handling
    are required.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔡 20. ENCODING vs ENCRYPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ENCODING:

    Data
      ↓
    Encoded representation

Usually reversible.

Examples:

    URL encoding
    Base64
    Hex

ENCRYPTION:

    Plaintext
       ↓
    Cryptographic algorithm
       ↓
    Ciphertext

Purpose:

    Confidentiality

Important:

    Encoding ≠ Encryption

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔄 21. BURP DECODER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Decoder is useful when data needs to be transformed between
representations.

Examples:

    URL encoding
    Base64
    Hexadecimal
    HTML encoding

Concept:

    Encoded data
       ↓
    Decoder
       ↓
    Original representation

Or:

    Original data
       ↓
    Decoder
       ↓
    Encoded representation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔁 22. MATCH AND REPLACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Match and Replace is useful when the same modification needs
to happen repeatedly.

Flow:

    Request
       ↓
    MATCH
       ↓
    REPLACE
       ↓
    Modified Request
       ↓
    Target

Examples:

    Header replacement
    User-Agent replacement
    Cookie replacement
    Repeated request-value modification

MEMORY:

    One-time change
        → Intercept / Repeater

    Repeated automatic change
        → Match & Replace

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📨 23. RESPONSE INTERCEPTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    SERVER
       ↓
    RESPONSE
       ↓
    BURP
       ↓
    RULE
       │
       ├── MATCH
       │     ↓
       │  INTERCEPT
       │
       └── NO MATCH
             ↓
          CONTINUE
             ↓
          BROWSER

This provides controlled inspection of selected responses.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 24. TOOL SELECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Need to catch a request?

    → Proxy / Intercept

Need to see previous requests?

    → HTTP History

Need application structure?

    → Target / Site Map

Need repeated manual testing?

    → Repeater

Need automated/custom payload testing?

    → Intruder

Need encode/decode?

    → Decoder

Need compare two results?

    → Comparer

Need token randomness analysis?

    → Sequencer

Need out-of-band interaction?

    → Collaborator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔄 25. BURP TESTING LOOP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    OBSERVE
       ↓
    IDENTIFY
       ↓
    HYPOTHESISE
       ↓
    MODIFY
       ↓
    SEND
       ↓
    OBSERVE RESPONSE
       ↓
    COMPARE
       ↓
    VALIDATE
       ↓
    DOCUMENT

Repeat where necessary.

This is the core manual testing methodology.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔬 26. PRACTICAL REPEATER EXERCISE MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    HTTP History
       ↓
    Select interesting request
       ↓
    Send to Repeater
       ↓
    Record original response
       ↓
    Change ONE value
       ↓
    Send
       ↓
    Record response
       ↓
    Compare
       ↓
    Restore original
       ↓
    Test next variable

MEMORY:

    BASELINE
       ↓
    CHANGE
       ↓
    TEST
       ↓
    COMPARE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📊 27. BASELINE IS IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before changing a request:

    Send original request.

Record:

    Status
    Response length
    Body
    Headers
    Cookies
    Redirect

Then:

    Modify one value
       ↓
    Send again
       ↓
    Compare against baseline

Why?

    Without baseline
        ↓
    Harder to know what changed

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 28. COMMON TESTING MISTAKE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BAD:

    Change ID
    Change cookie
    Change method
    Change header
    Change body
    Send

Problem:

    Too many variables changed.

GOOD:

    Original request
       ↓
    Change ID
       ↓
    Send
       ↓
    Analyse
       ↓
    Restore
       ↓
    Change next value

Result:

    Clearer evidence
    Easier debugging
    Better conclusions

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 29. SECURITY TESTING MINDSET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Do not ask only:

    "Can I change this?"

Ask:

    "What should happen if I change this?"

Then:

    Expected behaviour
          vs
    Actual behaviour

If they differ:

    Investigate further.

Final conclusion should be based on:

    Evidence

not:

    Guessing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🛡️ 30. AUTHORISATION MODEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Before testing:

    AUTHORIZATION
          ↓
       SCOPE
          ↓
       TARGET
          ↓
        TEST
          ↓
      VALIDATE
          ↓
       REPORT

Important:

    Burp can technically send traffic anywhere,
    but technical capability does not equal permission.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 31. COMPLETE BURP WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    01. Obtain authorization
             ↓
    02. Identify target
             ↓
    03. Define scope
             ↓
    04. Start Burp
             ↓
    05. Configure browser
             ↓
    06. Verify 127.0.0.1:8080
             ↓
    07. Configure HTTPS if required
             ↓
    08. Browse application
             ↓
    09. Review HTTP History
             ↓
    10. Review Site Map
             ↓
    11. Identify interesting requests
             ↓
    12. Analyse parameters
             ↓
    13. Send request to Repeater
             ↓
    14. Establish baseline
             ↓
    15. Change one value
             ↓
    16. Send request
             ↓
    17. Compare response
             ↓
    18. Validate behaviour
             ↓
    19. Document evidence
             ↓
    20. Report responsibly

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧪 32. TRYHACKME CHEAT FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    START MACHINE
       ↓
    GET TARGET IP
       ↓
    START BURP
       ↓
    START BROWSER
       ↓
    PROXY = 127.0.0.1:8080
       ↓
    OPEN TARGET
       ↓
    CAPTURE TRAFFIC
       ↓
    HTTP HISTORY
       ↓
    SITE MAP
       ↓
    FIND ENDPOINT
       ↓
    FIND PARAMETER
       ↓
    SEND TO REPEATER
       ↓
    CHANGE ONE VALUE
       ↓
    SEND
       ↓
    READ RESPONSE
       ↓
    FIND BEHAVIOUR
       ↓
    VALIDATE
       ↓
    FLAG / ANSWER

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔍 33. REQUEST ANALYSIS CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    [ ] Method
    [ ] URL
    [ ] Endpoint
    [ ] Query parameters
    [ ] Headers
    [ ] Cookies
    [ ] Authentication
    [ ] Content-Type
    [ ] Request body
    [ ] IDs
    [ ] Tokens
    [ ] User-controlled values

Ask:

    "What does each value actually control?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔎 34. RESPONSE ANALYSIS CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    [ ] Status code
    [ ] Response length
    [ ] Headers
    [ ] Set-Cookie
    [ ] Location
    [ ] Content-Type
    [ ] Response body
    [ ] Error messages
    [ ] Returned data
    [ ] Redirect behaviour

Ask:

    "What changed compared with the baseline?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚨 35. TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NO TRAFFIC:

    Burp running?
       ↓
    Listener active?
       ↓
    Browser proxy correct?
       ↓
    127.0.0.1:8080?
       ↓
    FoxyProxy active?
       ↓
    Generate traffic

──────────────────────────────────────────────────────────────

BROWSER HANGS:

    Intercept ON?
       ↓
    Forward / Drop

──────────────────────────────────────────────────────────────

HTTPS ERROR:

    PortSwigger CA installed?
       ↓
    cert.der imported?
       ↓
    CA trusted?
       ↓
    Retry

──────────────────────────────────────────────────────────────

TOO MUCH TRAFFIC:

    Define scope
       ↓
    Use in-scope interception rules

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⌨️ 36. IMPORTANT SHORTCUTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Ctrl + Shift + D
        → Dashboard

    Ctrl + Shift + T
        → Target

    Ctrl + Shift + P
        → Proxy

    Ctrl + Shift + I
        → Intruder

    Ctrl + Shift + R
        → Repeater

    Ctrl + U
        → URL Encode

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🎯 37. ROOM QUICK VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP PROXY:
        127.0.0.1:8080

    TARGET:
        http://10.48.155.152/

    CERTIFICATE:
        http://burp/cert

    CERTIFICATE FILE:
        cert.der

    CA:
        PortSwigger CA

    XSS RESULT:
        Succ3ssful XSS

    ROOM FLAG:
        THM{NmNIZTINGE1MWU1ZTQzMzgzNmFiNWVk}

## Interview Questions

Q1.
Why is Burp Proxy useful?

Answer

It provides visibility and control over HTTP/HTTPS communication
between a client and web server.

------------------------------------------------------------

Q2.
Why use Repeater?

Answer

To repeatedly send and modify a request while observing how the
server responds.

------------------------------------------------------------

Q3.
Why change one parameter at a time?

Answer

To isolate the effect of each change and make analysis clearer.

------------------------------------------------------------

Q4.
What is a baseline response?

Answer

The response from the original request used as a reference for
comparison.

------------------------------------------------------------

Q5.
What is the difference between authentication and authorisation?

Answer

Authentication establishes identity; authorisation determines
what that identity is allowed to access or perform.

------------------------------------------------------------

Q6.
Why isn't client-side validation enough?

Answer

Because the client is controlled by the user and requests can be
modified before reaching the server.

------------------------------------------------------------

Q7.
What is Site Map?

Answer

A structured view of discovered resources within the target.

------------------------------------------------------------

Q8.
What is HTTP History?

Answer

A record of requests and responses observed by Burp.

------------------------------------------------------------

## 🧠 39. MASTER MEMORY PALACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    TARGET
       ↓
    SCOPE
       ↓
    BROWSER
       ↓
    PROXY
       ↓
    REQUEST
       ↓
    INTERCEPT
       ↓
    HISTORY
       ↓
    SITE MAP
       ↓
    INTERESTING REQUEST
       ↓
    REPEATER
       ↓
    BASELINE
       ↓
    CHANGE ONE VALUE
       ↓
    SEND
       ↓
    RESPONSE
       ↓
    COMPARE
       ↓
    VALIDATE
       ↓
    REPORT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⚡ 40. 20-SECOND REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    127.0.0.1:8080
        → Proxy

    Intercept
        → Pause

    Forward
        → Continue

    Drop
        → Discard

    HTTP History
        → Previous traffic

    Site Map
        → Application structure

    Scope
        → Testing boundary

    Repeater
        → Manual replay

    Intruder
        → Payload testing

    Decoder
        → Encode / decode

    PortSwigger CA
        → HTTPS trust

    cert.der
        → Burp CA certificate

    XSS
        → Input handling

    Server-side validation
        → Security boundary

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏆 41. PART 15 CHECKLIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[✓] Think in HTTP

[✓] Understand request/response flow

[✓] Identify interesting requests

[✓] Analyse parameters

[✓] Identify user-controlled values

[✓] Understand authentication

[✓] Understand authorisation

[✓] Understand sessions

[✓] Analyse cookies

[✓] Analyse headers

[✓] Understand Content-Type

[✓] Understand JSON requests

[✓] Understand form requests

[✓] Understand multipart requests

[✓] Understand client/server trust

[✓] Understand XSS connection

[✓] Understand encoding

[✓] Use Decoder

[✓] Use Match & Replace

[✓] Understand Repeater

[✓] Establish baseline

[✓] Change one value

[✓] Compare responses

[✓] Validate findings

[✓] Troubleshoot Burp

[✓] Follow scope

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏁 42. FINAL TAKEAWAY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The strongest Burp Suite skill is the ability to turn a
browser action into an HTTP-level investigation.

    CLICK
      ↓
    REQUEST
      ↓
    BURP
      ↓
    UNDERSTAND
      ↓
    MODIFY
      ↓
    SEND
      ↓
    RESPONSE
      ↓
    COMPARE
      ↓
    PROVE

Do not blindly hunt for vulnerabilities.

First understand the application.

Then create a hypothesis.

Then test one variable at a time.

Then use the response as evidence.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🚀 NEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    BURP BASICS
       ↓
    HTTP ANALYSIS
       ↓
    REPEATER
       ↓
    PARAMETER TESTING
       ↓
    AUTHENTICATION
       ↓
    AUTHORISATION
       ↓
    WEB VULNERABILITIES
       ↓
    ADVANCED BURP
       ↓
    WEB PENTESTING
