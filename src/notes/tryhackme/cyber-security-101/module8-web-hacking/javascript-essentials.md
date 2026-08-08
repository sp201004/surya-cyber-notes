# 🟢 JavaScript Essentials

> Module: Cyber Security 101 → Web Hacking
> Room: JavaScript Essentials
> Status: ✅ Completed — 100%
> Focus: JavaScript Fundamentals + Web Security
> Difficulty: Beginner
>
> Goal:
> Understand JavaScript from a cybersecurity perspective and learn how
> attackers can abuse legitimate JavaScript functionality.

---

## 🧠 0. Room Overview

JavaScript (JS) is a scripting language mainly used to make websites
interactive and dynamic.

HTML  → Structure
CSS   → Styling
JS    → Behaviour / Interactivity

Example:

    HTML → Creates a button
    CSS  → Makes the button look good
    JS   → Decides what happens when the button is clicked

JavaScript is extremely important in web security because it runs inside
the user's browser and can interact with:

    ├── HTML / DOM
    ├── User input
    ├── Cookies
    ├── Browser APIs
    ├── Web requests
    ├── Authentication logic
    └── Client-side application logic

From an attacker's perspective:

    Website
       │
       ├── HTML
       ├── CSS
       └── JavaScript
              │
              ├── Visible source code
              ├── Client-side validation
              ├── Authentication logic
              ├── API endpoints
              └── Sensitive information

Anything delivered to the browser should generally be considered
accessible to the user.

---

## 🎯 Learning Objectives

By completing this room we learned:

    [1] JavaScript fundamentals
    [2] Variables and data types
    [3] Functions
    [4] Loops
    [5] Control flow
    [6] JavaScript + HTML integration
    [7] alert(), prompt(), confirm()
    [8] Client-side validation weaknesses
    [9] JavaScript source-code inspection
    [10] Minification
    [11] Obfuscation
    [12] Deobfuscation
    [13] Secure JavaScript practices

---

## 🟩 TASK 1 — Introduction

### What is JavaScript?

JavaScript is a scripting/programming language commonly used to add
interactivity and dynamic behaviour to web pages.

A normal website can be thought of as:

    ┌─────────────────────────────┐
    │          Website            │
    ├─────────────────────────────┤
    │ HTML → Structure            │
    │ CSS  → Presentation         │
    │ JS   → Behaviour            │
    └─────────────────────────────┘

Examples of JavaScript functionality:

    • Form validation
    • Button click actions
    • Dynamic page updates
    • Animations
    • Popups
    • API requests
    • Interactive menus
    • Client-side authentication logic

---

### Why is JavaScript important for cybersecurity?

JavaScript is executed on the client side in the browser.

Therefore, a penetration tester can often inspect JavaScript code using:

    • View Page Source
    • Developer Tools
    • Sources tab
    • Console
    • Network tab

This can reveal:

    • Hidden functionality
    • API endpoints
    • Client-side validation
    • Hardcoded credentials
    • Tokens
    • Debugging information
    • Application logic

#### Security Mindset

Never assume:

    "The user cannot see this because it is JavaScript."

If JavaScript is sent to the browser, the user can potentially inspect it.

---

## 🟩 TASK 2 — Essential Concepts

JavaScript has several fundamental building blocks.

---

## 2.1 Variables

A variable is a container used to store data.

Example:

    let name = "Surya";
    let age = 24;

JavaScript commonly uses:

    var
    let
    const

---

### let

`let` creates a block-scoped variable.

Example:

    let age = 24;
    age = 25;

The value can be changed.

---

### const

`const` creates a variable whose binding cannot be reassigned.

Example:

    const username = "admin";

This is not allowed:

    username = "root";

---

### var

`var` is the older variable declaration mechanism.

Example:

    var age = 24;

Modern JavaScript generally prefers:

    let
    const

because they provide more predictable scoping.

---

## 2.2 Data Types

Common JavaScript data types include:

    String
    Number
    Boolean
    Null
    Undefined
    Object

Example:

    let username = "admin";       // String
    let age = 24;                 // Number
    let authenticated = true;     // Boolean
    let token = null;             // Null
    let result;                   // Undefined

Check a type:

    typeof username

Example:

    console.log(typeof username);

Output:

    string

---

## 2.3 Functions

A function is a reusable block of code.

Example:

    function greet(name) {
        console.log("Hello " + name);
    }

Call the function:

    greet("Surya");

Output:

    Hello Surya

#### Why functions matter in security

Functions may contain:

    • Authentication logic
    • Validation
    • API calls
    • Data processing
    • Security checks

When reviewing JavaScript, inspect interesting functions carefully.

---

## 2.4 Loops

A loop executes a block of code repeatedly.

Common loops:

    for
    while
    do...while

Example:

    for (let i = 0; i < 5; i++) {
        console.log(i);
    }

Output:

    0
    1
    2
    3
    4

#### Memory Trick

    LOOP = Repeat

If code needs to execute repeatedly, think:

    LOOP

---

### Security relevance

Loops can become dangerous when abused.

Example:

    for (let i = 0; i < 500; i++) {
        alert("Hacked");
    }

This repeatedly displays popup dialogs.

Potential result:

    User
      ↓
    Opens malicious HTML
      ↓
    JavaScript executes
      ↓
    Loop
      ↓
    Hundreds of popups
      ↓
    Poor user experience / browser disruption

---

## 2.5 Request-Response Cycle

Web applications generally work using a request-response model.

    Browser
       │
       │ HTTP Request
       ▼
    Web Server
       │
       │ HTTP Response
       ▼
    Browser

JavaScript can participate in this process by making requests to APIs
and processing returned data.

---

## ❓ Task 2 Answer

Question:

What term allows you to run a code block multiple times as long as
it is a condition?

Answer:

    loop

---

## 🟩 TASK 3 — JavaScript Overview

## 3.1 JavaScript Execution

JavaScript is commonly described as an interpreted language.

The browser contains a JavaScript engine that executes JavaScript code.

Modern engines perform advanced optimisations internally, but from a
beginner/security perspective JS is treated as an interpreted language.

Example:

    console.log("Hello, World!");

The browser executes the JavaScript and produces output.

---

## 3.2 Basic JavaScript Program

Example:

    console.log("Hello, World!");

    let age = 25;

    if (age >= 18) {
        console.log("You are an adult.");
    } else {
        console.log("You are a minor.");
    }

    function greet(name) {
        console.log("Hello, " + name + "!");
    }

    greet("Bob");

Breakdown:

    console.log()
        ↓
    Prints output

    let
        ↓
    Creates variable

    if / else
        ↓
    Conditional logic

    function
        ↓
    Reusable code

---

## 3.3 Running JavaScript in Chrome

Open Chrome.

Then:

    Ctrl + Shift + I

or:

    Right Click → Inspect → Console

Then execute:

    console.log("Hello THM");

You can directly interact with JavaScript through the browser console.

---

## 3.4 Addition Example

Example:

    let x = 5;
    let y = 10;

    console.log("The result is: " + (x + y));

Output:

    The result is: 15

If x is changed to 10:

    let x = 10;
    let y = 10;

Output:

    The result is: 20

---

## 🔐 Why the Browser Console Matters

The browser console is extremely useful during web application
security testing.

A tester can use it to:

    • Test JavaScript functions
    • Modify variables
    • Inspect DOM elements
    • Test client-side validation
    • Execute JavaScript in the current page context
    • Debug application behaviour

Example:

    document.body.innerHTML = "Test";

This changes the current page content locally.

IMPORTANT:

Client-side changes do not automatically mean the server has been
compromised.

The important question is:

    "Does the server trust data that was controlled by the client?"

---

## ⚠️ Interpreted vs Typosquatting

These are two completely different concepts.

### Interpreted

Describes how JavaScript is executed.

    JavaScript → Browser → JavaScript Engine → Execution

### Typosquatting

A cybersecurity technique where attackers register domain names that
look similar to legitimate domains.

Example:

    legitimate:
    example.com

    malicious lookalike:
    examp1e.com

or:

    example.com
    examplle.com

The goal can be:

    • Phishing
    • Credential theft
    • Malware delivery
    • Brand impersonation

#### Memory Trick

    Interpreted = JavaScript execution

    Typosquatting = Fake/lookalike domain

---

## 🟩 TASK 4 — Integrating JavaScript in HTML

There are two main ways to integrate JavaScript into HTML:

    1. Internal JavaScript
    2. External JavaScript

---

## 4.1 Internal JavaScript

JavaScript is placed directly inside the HTML file using:

    <script>

Example:

    <!DOCTYPE html>
    <html>
    <head>
        <title>Internal JS</title>
    </head>

    <body>
        <h1>Addition of Two Numbers</h1>
        <p id="result"></p>

        <script>
            let x = 5;
            let y = 10;
            let result = x + y;

            document.getElementById("result").innerHTML =
                "The result is: " + result;
        </script>
    </body>
    </html>

Output:

    Addition of Two Numbers

    The result is: 15

---

## 4.2 DOM Interaction

This code:

    document.getElementById("result")

finds the HTML element with:

    id="result"

Then:

    .innerHTML

changes its content.

Example:

    document.getElementById("result").innerHTML = "Hello";

HTML:

    <p id="result"></p>

After JS executes:

    <p id="result">Hello</p>

---

## 4.3 External JavaScript

JavaScript can also be stored in a separate `.js` file.

Example:

    script.js

Contents:

    let x = 5;
    let y = 10;
    let result = x + y;

    document.getElementById("result").innerHTML =
        "The result is: " + result;

Then HTML loads it:

    <script src="script.js"></script>

---

## 4.4 Internal vs External

    INTERNAL

    HTML
      │
      └── <script>
              JavaScript
          </script>

    EXTERNAL

    HTML
      │
      └── <script src="script.js">
          </script>
                    │
                    ▼
                script.js

---

## Why External JavaScript is Better for Reuse

Suppose we have:

    page1.html
    page2.html
    page3.html

Instead of copying the same JavaScript into every HTML file:

    page1 → JS
    page2 → JS
    page3 → JS

we can use:

    page1 ─┐
    page2 ─┼──→ script.js
    page3 ─┘

Benefits:

    • Reusable
    • Easier maintenance
    • Cleaner HTML
    • Centralised code
    • Easier updates

---

## 4.5 src Attribute

The `src` attribute tells the browser where the external JavaScript
file is located.

Example:

    <script src="script.js"></script>

Remember:

    src = source

---

## 4.6 Identifying Internal or External JS

Use:

    Right Click
        ↓
    View Page Source

Look for:

Internal:

    <script>
        ...
    </script>

External:

    <script src="script.js"></script>

#### Pentesting Tip

When reviewing a website, search the source for:

    <script

Then inspect:

    src=

This can reveal JavaScript files that may contain useful information.

---

## 📌 Task 4 Answers

    Q1. Which type places JS directly within HTML?
    A: Internal

    Q2. Better method for reusing JS across multiple pages?
    A: External

    Q3. External JS file called by external_test.html?
    A: thm_external.js

    Q4. Attribute used to link an external JS file?
    A: src

---

## 🟩 TASK 5 — Abusing Dialogue Functions

JavaScript provides built-in dialogue functions:

    alert()
    prompt()
    confirm()

These are useful for user interaction but can also be abused.

---

## 5.1 alert()

`alert()` displays a message box.

Example:

    alert("Hello THM");

Browser:

    ┌──────────────────────┐
    │ chrome says          │
    │                      │
    │ Hello THM            │
    │                      │
    │              [ OK ]  │
    └──────────────────────┘

Purpose:

    Display information
    Display warnings
    Notify the user

---

## 5.2 prompt()

`prompt()` asks the user for input.

Example:

    let name = prompt("What is your name?");

If user enters:

    Surya

then:

    name = "Surya"

Example:

    let name = prompt("What is your name?");
    alert("Hello " + name);

Flow:

    prompt()
       ↓
    User input
       ↓
    Variable
       ↓
    Application uses value

---

## 5.3 confirm()

`confirm()` asks the user for confirmation.

Example:

    confirm("Do you want to proceed?");

It returns:

    OK     → true

    Cancel → false

Example:

    let answer = confirm("Are you sure?");

    if (answer) {
        console.log("User accepted");
    } else {
        console.log("User cancelled");
    }

---

## 🧠 Dialogue Functions Cheat Sheet

    ┌────────────┬───────────────────────────────┐
    │ Function   │ Purpose                       │
    ├────────────┼───────────────────────────────┤
    │ alert()    │ Show message                 │
    │ prompt()   │ Get user input               │
    │ confirm()  │ Get OK/Cancel confirmation   │
    └────────────┴───────────────────────────────┘

Memory trick:

    A → Alert → Announce
    P → Prompt → Provide input
    C → Confirm → Confirm decision

---

## 5.4 Abusing alert()

Consider:

    for (let i = 0; i < 5; i++) {
        alert("Hacked");
    }

The loop executes 5 times.

Therefore:

    Hacked
    Hacked
    Hacked
    Hacked
    Hacked

The user has to dismiss each popup.

If the loop were much larger:

    for (let i = 0; i < 500; i++) {
        alert("Hacked");
    }

the browser could become extremely annoying or difficult to use.

---

## Security Scenario

Imagine receiving:

    invoice.html

from an unknown person.

You open it.

The HTML contains:

    <script>
        for (...) {
            alert("Hacked");
        }
    </script>

The JavaScript executes locally in your browser.

#### Lesson

Never blindly open unknown:

    • HTML files
    • JS files
    • Office documents
    • Scripts
    • Attachments

---

## 5.5 Why Dialogue Functions Matter in Security

Attackers can abuse JavaScript functionality to:

    • Spam users
    • Disrupt browser interaction
    • Create malicious pages
    • Trick users
    • Collect input
    • Create phishing-like interactions

`prompt()` is especially important because it accepts user input.

---

## 📌 Task 5 Answers

    Q1. In invoice.html, how many times does the code show "Hacked"?
    A: 5

    Q2. Which JS function displays a dialogue box asking for input?
    A: prompt

    Q3. If the user enters Tesla, what is stored in carName?
    A: Tesla

---

## 🟩 TASK 6 — Bypassing Control Flow Statements

JavaScript uses control-flow statements to decide which code executes.

Common examples:

    if
    else
    switch
    for
    while
    do...while

---

## 6.1 if / else

Example:

    if (age >= 18) {
        console.log("Adult");
    } else {
        console.log("Minor");
    }

Flow:

                age >= 18?
                  /   \
                YES    NO
                 |      |
              Adult   Minor

---

## 6.2 Age Verification Example

Example:

    age = prompt("What is your age");

    if (age >= 18) {
        document.getElementById("message").innerHTML =
            "You are an adult.";
    } else {
        document.getElementById("message").innerHTML =
            "You are a minor.";
    }

If:

    age = 21

Result:

    You are an adult.

If:

    age = 15

Result:

    You are a minor.

---

## 🔥 The Security Problem

Suppose a developer implements a security check entirely in JavaScript:

    if (isAdmin) {
        showAdminPanel();
    }

or:

    if (password === "secret") {
        login();
    }

The JavaScript is delivered to the client.

Therefore, an attacker can inspect it.

    Browser
       ↓
    JavaScript downloaded
       ↓
    DevTools
       ↓
    Source code visible
       ↓
    Logic discovered

This is why client-side checks should NOT be treated as the final
security boundary.

---

## 6.3 Client-Side Authentication

Example:

    let username = prompt("Enter your username:");
    let password = prompt("Enter your password:");

    if (username === "admin" &&
        password === "ComplexPassword") {

        document.write("You are successfully authenticated!");

    } else {

        document.write(
            "Authentication failed."
        );
    }

The username and password are literally present in the JavaScript.

Therefore an attacker can inspect the source.

Password:

    ComplexPassword

---

## 🚨 Critical Security Lesson

Never implement real authentication like:

    if (username === "admin" &&
        password === "secret") {
        allowAccess();
    }

inside client-side JavaScript.

Why?

Because:

    Client = attacker-controlled environment

The attacker can:

    • View the source
    • Modify JavaScript
    • Change variables
    • Alter conditions
    • Disable client-side checks
    • Call APIs directly

---

## Correct Architecture

Instead of:

    Browser
       │
       └── "Is password correct?"
                ↓
             JavaScript

Use:

    Browser
       │
       │ Credentials
       ▼
    Server
       │
       ├── Validate credentials
       ├── Check permissions
       └── Create session/token
       │
       ▼
    Response

The server must enforce authorization.

---

## Client-Side vs Server-Side Validation

    CLIENT-SIDE

    User
      ↓
    Browser
      ↓
    JavaScript
      ↓
    Validation

    Fast UX
    BUT NOT TRUSTED

    SERVER-SIDE

    User
      ↓
    Browser
      ↓
    Server
      ↓
    Validation
      ↓
    Database

    Trusted security boundary

Best practice:

    Client-side validation = UX

    Server-side validation = Security

---

## 📌 Task 6 Answers

    Q1. Message when age < 18?
    A: You are a minor.

    Q2. Password for admin?
    A: ComplexPassword

---

## 🟩 TASK 7 — Exploring Minified Files

Production JavaScript is often difficult to read.

Two important concepts:

    Minification
    Obfuscation

They are related but NOT the same.

---

## 7.1 Minification

Minification reduces JavaScript file size.

It removes unnecessary characters such as:

    • Spaces
    • Line breaks
    • Comments
    • Sometimes long variable names

Example:

Readable:

    function hello() {
        console.log("Hello");
    }

Minified:

    function hello(){console.log("Hello")}

The code still performs the same operation.

---

## Why Minify?

Smaller files mean:

    Smaller size
        ↓
    Faster transfer
        ↓
    Faster page loading

Especially useful for production websites.

---

## 7.2 Obfuscation

Obfuscation attempts to make code difficult for humans to understand.

Techniques can include:

    • Renaming variables
    • Renaming functions
    • Adding unnecessary code
    • Encoding strings
    • Changing program structure
    • Using confusing expressions

Example:

Readable:

    function hi() {
        alert("Welcome to THM");
    }

    hi();

Obfuscated code might look like:

    function _0x1234() {
        ...
    }

with complicated expressions and meaningless names.

---

## Minification vs Obfuscation

    ┌────────────────┬───────────────────────────────┐
    │ Minification   │ Obfuscation                   │
    ├────────────────┼───────────────────────────────┤
    │ Reduce size    │ Hide understanding            │
    │ Improve speed  │ Make analysis harder          │
    │ Remove spaces  │ Rename variables/functions    │
    │ Remove comments│ Add confusing structures     │
    └────────────────┴───────────────────────────────┘

Important:

    Minification ≠ Security

    Obfuscation ≠ Encryption

Obfuscated JavaScript can still be reverse-engineered.

---

## 7.3 Practical Example

HTML:

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Obfuscated JS Code</title>
    </head>
    <body>

        <h1>Obfuscated JS Code</h1>

        <script src="hello.js"></script>

    </body>
    </html>

JavaScript:

    function hi() {
        alert("Welcome to THM");
    }

    hi();

When opening the page:

    Welcome to THM

appears.

---

## 7.4 Inspecting JavaScript with DevTools

Steps:

    1. Open the page
    2. Right-click
    3. Select Inspect
    4. Open Sources
    5. Locate hello.js

The JavaScript source can be viewed.

This is extremely important during web penetration testing.

---

## Pentesting Workflow

    Website
       ↓
    Inspect
       ↓
    Sources
       ↓
    Find .js files
       ↓
    Read JavaScript
       ↓
    Search for interesting strings
       ↓
    Understand application logic
       ↓
    Test server-side behaviour

Useful search terms:

    password
    username
    admin
    token
    api
    key
    secret
    endpoint
    fetch
    XMLHttpRequest
    authorization
    bearer
    login

---

## 7.5 Obfuscation in Action

The room demonstrates converting readable JavaScript into heavily
obfuscated JavaScript.

Readable:

    function hi() {
        alert("Welcome to THM");
    }

    hi();

Obfuscated:

    Complicated variables
    Hex values
    Unnecessary expressions
    Confusing functions
    Encoded strings

But the browser can still execute it.

This proves:

    Human-readable code
           ↓
       Obfuscation
           ↓
    Harder to understand
           ↓
       Browser
           ↓
       Executes it

---

## 7.6 Deobfuscation

Deobfuscation is the reverse process.

Goal:

    Obfuscated code
          ↓
    Analyse / simplify
          ↓
    Human-readable code

Useful techniques:

    • Beautify code
    • Rename variables
    • Convert hexadecimal
    • Remove dead code
    • Trace function calls
    • Inspect string arrays
    • Use browser DevTools
    • Use JavaScript analysis tools

---

## 7.7 Hexadecimal in Obfuscated Code

Example:

    0x35

Hexadecimal → Decimal:

    0x35 = 53

Another:

    0x2e = 46

Therefore:

    0x35 * -0x2e

becomes:

    53 * -46

which equals:

    -2438

---

## 7.8 Task Example

Given:

    age = 0x1 * 0x247e
        + 0x35 * -0x2e
        + -0x1ae3;

Convert:

    0x1    = 1
    0x247e = 9342
    0x35   = 53
    0x2e   = 46
    0x1ae3 = 6883

Now calculate:

    age = (1 × 9342)
        + (53 × -46)
        + (-6883)

    age = 9342
        - 2438
        - 6883

    age = 21

Therefore:

    age = 21

---

## 7.9 Important Security Lesson

Obfuscation should NEVER be treated as a secure way to store secrets.

Bad:

    const password = "MySecretPassword";

Even if the code is obfuscated:

    const _0x123 = "...";

the secret may still be recoverable.

If the browser needs the secret, the attacker may be able to retrieve it.

---

## 📌 Task 7 Answers

    Q1. Alert message after running hello.html?
    A: Welcome to THM

    Q2. Value of age?
    A: 21

---

## 🟩 TASK 8 — Best Practices

This task focuses on securing JavaScript applications.

---

## 8.1 Do NOT Rely Only on Client-Side Validation

Bad:

    if (age >= 18) {
        allowAccess();
    }

Client-side JavaScript can be modified.

Correct approach:

    Client validation
          ↓
       UX only
          ↓
    Server validation
          ↓
       Security

Always validate important security decisions on the server.

---

## 8.2 Avoid Untrusted Libraries

JavaScript allows developers to load external scripts:

    <script src="https://example.com/script.js"></script>

The problem:

    External source
          ↓
    Download JavaScript
          ↓
    Execute in browser

If the source becomes malicious or compromised, the website users
may execute malicious code.

Therefore:

     Blindly trust random libraries

Instead:

    ✅ Use trusted sources
    ✅ Verify dependencies
    ✅ Keep libraries updated
    ✅ Review dependencies
    ✅ Use integrity controls where appropriate
    ✅ Remove unnecessary libraries

---

## 8.3 Avoid Hardcoded Secrets

NEVER place sensitive information directly into client-side JavaScript.

Bad:

    const privateAPIKey = "pk_TryHackMe-1337";

Anyone who receives the JavaScript may inspect it.

Potential secrets include:

    • API keys
    • Access tokens
    • Passwords
    • Private credentials
    • Internal endpoints
    • Secret configuration

---

## Why Hardcoded Secrets Are Dangerous

    Developer
       ↓
    JavaScript
       ↓
    Server
       ↓
    Browser
       ↓
    Attacker
       ↓
    DevTools / Source
       ↓
    Secret exposed

The browser is not a secure storage location for server secrets.

---

## 8.4 Minify and Obfuscate Production JavaScript

Minification:

    • Reduces file size
    • Improves load performance

Obfuscation:

    • Makes reverse engineering harder
    • Makes source code harder to understand

But:

    Obfuscation ≠ Encryption

    Obfuscation ≠ Secret Storage

A determined attacker can still analyse JavaScript.

---

## 8.5 Security Principles

Remember:

    Client = Untrusted

    Server = Security Enforcement

Never trust:

    • Client-side variables
    • Client-side validation
    • Hidden HTML fields
    • JavaScript-only authentication
    • Obfuscated secrets

---

## 📌 Task 8 Answer

Question:

Is it a good practice to blindly include JS in your code from any source?

Answer:

    nay

Reason:

A malicious or compromised library can expose the web application and
its users to security threats.

---

## 🟩 TASK 9 — Conclusion

The room covered the major JavaScript concepts required for beginner
web security testing.

Topics covered:

    JavaScript fundamentals
          ↓
    Variables
          ↓
    Data types
          ↓
    Functions
          ↓
    Loops
          ↓
    Control flow
          ↓
    HTML integration
          ↓
    Dialogue functions
          ↓
    Client-side validation
          ↓
    Minification
          ↓
    Obfuscation
          ↓
    Deobfuscation
          ↓
    Secure development practices

---

## 🔥 CYBERSECURITY TAKEAWAYS

### 1. JavaScript is Client-Side Code

If JavaScript is sent to the browser:

    User → Browser → JS

the user can potentially inspect it.

---

### 2. Never Trust Client-Side Security

Client-side:

    if (isAdmin) {
        showAdminPanel();
    }

does NOT provide real authorization.

The server must verify authorization.

---

### 3. Inspect JavaScript During Pentesting

Always check:

    View Source
    DevTools
    Sources
    Network
    Console

Look for:

    /api/
    login
    admin
    token
    password
    key
    secret
    fetch()
    XMLHttpRequest
    Authorization

---

### 4. Hardcoded Secrets Are Exposed

If a secret is inside:

    .js

and that JS reaches the browser:

    attacker → downloads JS → searches source → finds secret

Therefore:

     Don't store secrets in frontend code.

---

### 5. Obfuscation Is Not Security

Obfuscation:

    Makes code harder to understand

It does NOT:

    Make code impossible to read

It does NOT:

    Encrypt secrets

It does NOT:

    Prevent reverse engineering

---

### 6. Client-Side Validation Can Be Bypassed

Example:

    if (age >= 18) {
        allow();
    }

An attacker controls the browser.

Therefore security decisions must be verified server-side.

---

## 🧠 IMPORTANT JAVASCRIPT CHEAT SHEET

### Variables

    let x = 10;
    const y = 20;
    var z = 30;

---

### Output

    console.log("Hello");

---

### Data Type

    typeof variable

Example:

    typeof "hello"

Output:

    string

---

### Function

    function greet(name) {
        console.log("Hello " + name);
    }

    greet("Surya");

---

### Condition

    if (age >= 18) {
        console.log("Adult");
    } else {
        console.log("Minor");
    }

---

### Loop

    for (let i = 0; i < 5; i++) {
        console.log(i);
    }

---

### Alert

    alert("Hello");

---

### Prompt

    let name = prompt("Enter your name");

---

### Confirm

    let result = confirm("Are you sure?");

---

### DOM

    document.getElementById("result")

---

### Modify HTML

    document.getElementById("result").innerHTML = "Hello";

---

### External JavaScript

    <script src="script.js"></script>

---

## 🛡️ WEB PENTESTING JS CHECKLIST

When testing a web application:

    [ ] Open View Page Source
    [ ] Open DevTools
    [ ] Check Sources
    [ ] Identify JavaScript files
    [ ] Search for API endpoints
    [ ] Search for authentication logic
    [ ] Search for hardcoded secrets
    [ ] Search for tokens
    [ ] Search for admin functionality
    [ ] Check client-side validation
    [ ] Check hidden functionality
    [ ] Inspect Network requests
    [ ] Look for minified JS
    [ ] Beautify difficult JavaScript
    [ ] Analyse obfuscated code
    [ ] Verify important controls server-side

---

## 🔍 Useful Strings to Search in JS

    password
    passwd
    username
    admin
    login
    auth
    token
    accessToken
    refreshToken
    secret
    apiKey
    key
    bearer
    authorization
    endpoint
    api
    /api/
    fetch(
    XMLHttpRequest
    document.cookie
    localStorage
    sessionStorage

---

## 🧩 COMMON MISTAKES

### Mistake 1

Thinking:

    "JavaScript is hidden, so users cannot see it."

Reality:

    Browser → Downloads JS → User can inspect it

---

### Mistake 2

Using client-side authentication.

Bad:

    if (username === "admin" &&
        password === "secret") {
        login();
    }

Reality:

    Credentials are visible in source code.

---

### Mistake 3

Hardcoding API keys.

Bad:

    const apiKey = "SECRET";

Reality:

    Frontend code is accessible to users.

---

### Mistake 4

Thinking obfuscation protects secrets.

Reality:

    Obfuscation only increases analysis difficulty.

---

### Mistake 5

Blindly including external JavaScript.

Reality:

    A compromised dependency can execute malicious code
    in users' browsers.

---

## 🧠 MEMORY TRICKS

### JavaScript + Web

    HTML → Structure
    CSS  → Style
    JS   → Behaviour

---

### Dialogues

    alert()   → Tell
    prompt()  → Ask
    confirm() → Confirm

---

### JS Integration

    Internal → Inside HTML

    External → External .js file

    src → Source

---

### Security

    Client = Untrusted

    Server = Trust Boundary

---

### Code Transformation

    Minify
       ↓
    Smaller

    Obfuscate
       ↓
    Harder to Understand

    Deobfuscate
       ↓
    Understand Again

---

## Interview Questions

Q1.
What is JavaScript?

Answer

JavaScript is a programming/scripting language commonly used in web
browsers to add dynamic behaviour and interactivity to web pages.

------------------------------------------------------------

Q2.
What is the difference between internal and external JavaScript?

Answer

Internal JavaScript is written directly inside HTML using `<script>`
tags.

External JavaScript is stored in a separate `.js` file and loaded
using the `src` attribute.

------------------------------------------------------------

Q3.
Why is external JavaScript preferred?

Answer

Because it provides:

    • Reusability
    • Better organisation
    • Easier maintenance
    • Cleaner HTML

------------------------------------------------------------

Q4.
What is client-side validation?

Answer

Validation performed inside the user's browser before data is sent
to the server.

It improves user experience but should not be considered a security
boundary.

------------------------------------------------------------

Q5.
Why can client-side authentication be bypassed?

Answer

Because the attacker controls the browser and can inspect or modify
the JavaScript.

------------------------------------------------------------

Q6.
What is minification?

Answer

Minification reduces JavaScript file size by removing unnecessary
characters such as whitespace and comments.

------------------------------------------------------------

Q7.
What is obfuscation?

Answer

Obfuscation transforms code to make it difficult for humans to
understand while preserving its functionality.

------------------------------------------------------------

Q8.
Is obfuscation encryption?

Answer

No.

Obfuscation makes code harder to understand; it does not provide
cryptographic confidentiality.

------------------------------------------------------------

Q9.
What is hardcoded secret exposure?

Answer

It occurs when sensitive information such as API keys, passwords, or
tokens is directly included in source code.

------------------------------------------------------------

Q10.
Why should external JS libraries be trusted carefully?

Answer

Because a malicious or compromised library can execute attacker-
controlled JavaScript in the user's browser.

------------------------------------------------------------

## ⚡ QUICK REVISION — 2 MINUTES

    JavaScript
        ↓
    Makes websites interactive

    Variables
        ↓
    let / const / var

    Data Types
        ↓
    string / number / boolean / null / undefined / object

    Function
        ↓
    Reusable code

    Loop
        ↓
    Repeated execution

    if / else
        ↓
    Decision making

    alert()
        ↓
    Display message

    prompt()
        ↓
    Get input

    confirm()
        ↓
    true / false confirmation

    Internal JS
        ↓
    <script>...</script>

    External JS
        ↓
    <script src="script.js"></script>

    Client-side validation
        ↓
    NOT a security boundary

    Minification
        ↓
    Smaller code

    Obfuscation
        ↓
    Harder-to-read code

    Deobfuscation
        ↓
    Recover understandable logic

    Hardcoded secrets
        ↓
    NEVER put sensitive credentials in frontend JS

    Server-side validation
        ↓
    Required for security decisions

---

## 🚩 TRYHACKME ANSWERS — QUICK LOOK

### Task 2

    Q: What term allows you to run a code block multiple times?
    A: loop

### Task 3

    Q: Output when x = 10?
    A: The result is: 20

    Q: What describes registering misspelt/lookalike domains?
    A: typosquatting

    Note:
    "Interpreted" describes JavaScript execution, not the domain-registration
    technique.

### Task 4

    Q: JS directly inside HTML?
    A: Internal

    Q: Better for reuse across pages?
    A: External

    Q: External JS file?
    A: thm_external.js

    Q: Attribute?
    A: src

### Task 5

    Q: Number of "Hacked" alerts?
    A: 5

    Q: Dialogue asking for input?
    A: prompt

    Q: Input Tesla stored as?
    A: Tesla

### Task 6

    Q: Message when age < 18?
    A: You are a minor.

    Q: Admin password?
    A: ComplexPassword

### Task 7

    Q: Alert message?
    A: Welcome to THM

    Q: age value?
    A: 21

### Task 8

    Q: Blindly include JS from any source?
    A: nay

### Task 9

    Q: Completion?
    A: No answer needed

---

## 🏁 FINAL TAKEAWAY

The most important lesson from this room is not simply learning
JavaScript syntax.

The real cybersecurity lesson is:

    ┌────────────────────────────────────────────┐
    │       NEVER TRUST THE CLIENT               │
    ├────────────────────────────────────────────┤
    │ JavaScript can be inspected                │
    │ JavaScript can be modified                 │
    │ Client-side checks can be bypassed         │
    │ Frontend secrets can be exposed            │
    │ Obfuscation can be reversed                │
    │ Server-side validation is essential       │
    └────────────────────────────────────────────┘

For a penetration tester:

    Learn JavaScript
         ↓
    Understand application logic
         ↓
    Inspect source
         ↓
    Find client-side assumptions
         ↓
    Identify security weaknesses
         ↓
    Test whether the SERVER actually enforces
    the security requirement

---

## 🏆 ROOM STATUS

    TryHackMe: JavaScript Essentials

    Tasks Completed:
        [✓] Task 1 — Introduction
        [✓] Task 2 — Essential Concepts
        [✓] Task 3 — JavaScript Overview
        [✓] Task 4 — Integrating JavaScript in HTML
        [✓] Task 5 — Abusing Dialogue Functions
        [✓] Task 6 — Bypassing Control Flow Statements
        [✓] Task 7 — Exploring Minified Files
        [✓] Task 8 — Best Practices
        [✓] Task 9 — Conclusion

    Room Progress:
        ████████████████████ 100%

    Status:
        ✅ COMPLETED

