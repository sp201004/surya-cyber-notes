## Contents

- [Overview](#overview)
- [How Websites Work](#how-websites-work)
- [Website Components](#website-components)
- [Technologies Used](#technologies-used)
- [HTML (HyperText Markup Language)](#html-hypertext-markup-language)
- [Common HTML Tags](#common-html-tags)
- [HTML Attributes](#html-attributes)
- [Viewing Website Source](#viewing-website-source)
- [JavaScript (JS)](#javascript-js)
- [JavaScript Events](#javascript-events)
- [JavaScript Placement](#javascript-placement)
- [Sensitive Data Exposure](#sensitive-data-exposure)
- [HTML Injection](#html-injection)
- [HTML vs CSS vs JavaScript](#html-vs-css-vs-javascript)
- [Complete Website Architecture](#complete-website-architecture)
- [Final Summary](#final-summary)

## Overview
To exploit a website, you must first understand how websites are built and how browsers communicate with web servers. This room introduces: Website Architecture · Frontend vs Backend · HTML · JavaScript · Sensitive Data Exposure · HTML Injection.

## How Websites Work
1. Browser sends a request.
2. Internet routes the request.
3. Web Server processes it.
4. Server sends a response.
5. Browser renders the webpage.

```text
Browser  ---- HTTP Request ---->  Web Server
Browser  <--- HTTP Response ----  Web Server
```

## Website Components
| Part | Runs | Responsible For | Examples |
|---|---|---|---|
| **Frontend (Client Side)** | Browser | UI, layout, styling, user interaction | HTML, CSS, JavaScript, images, buttons, forms |
| **Backend (Server Side)** | Server | Authentication, databases, business logic, file storage, request processing | Node.js, PHP, Python, Java, .NET |

## Technologies Used
| Technology | Purpose |
|---|---|
| HTML | Structure |
| CSS | Styling |
| JavaScript | Interactivity |

## HTML (HyperText Markup Language)
HTML defines the **structure** of a webpage — what is a heading, paragraph, where images/buttons appear. It uses **Tags (Elements)**.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>
  <h1>Hello</h1>
  <p>Welcome</p>
</body>
</html>
```

| Part | Meaning |
|---|---|
| `<!DOCTYPE html>` | Defines an HTML5 document |
| `<html>` | Root element; everything is inside it |
| `<head>` | Metadata (title, CSS links, JS files, meta tags) |
| `<body>` | Visible content (text, images, forms, buttons, videos) |
| `<h1>`–`<h6>` | Headings (h1 = largest) |
| `<p>` | Paragraph |

### Common HTML Tags
| Tag | Purpose | Tag | Purpose |
|---|---|---|---|
| html | Root Document | a | Hyperlink |
| head | Metadata | form | Form |
| title | Page Title | input | Input Field |
| body | Visible Content | div | Container |
| h1 | Heading | img | Image |
| p | Paragraph | button | Button |

## HTML Attributes
Attributes provide extra information to elements, e.g. `<img src="cat.jpg">` (`src` is the attribute).

| Attribute | Purpose | Example |
|---|---|---|
| `src` | Image/file location | `<img src="cat.jpg">` |
| `href` | Hyperlink destination | `<a href="https://google.com">` |
| `class` | Styling multiple elements (shared) | `<p class="bold">` |
| `id` | Unique identifier (one per page); used by JS | `<p id="demo">` |

## Viewing Website Source
Inspect HTML using **Right Click → View Page Source** or **Ctrl + U**. Useful during penetration testing.

## JavaScript (JS)
JavaScript makes websites interactive (buttons, animations, forms, live updates, dynamic content).

```javascript
document.getElementById("demo").innerHTML = "Hack the Planet";
```
Meaning: find the element with ID `demo` and change its HTML content.

### JavaScript Events
| Event | Trigger |
|---|---|
| onclick | Mouse click |
| onmouseover | Hover |
| onkeyup | Keyboard input |
| onchange | Value changed |

```html
<button onclick="alert('Hello')">Click</button>
```

### JavaScript Placement
- **Inline:** `<button onclick="...">`
- **Internal:** `<script>...</script>`
- **External:** `<script src="script.js"></script>`

## Sensitive Data Exposure
Occurs when developers accidentally leave confidential info in frontend code — passwords, API keys, tokens, hidden URLs, credentials, internal comments.
```html
<!--
Username: admin
Password: password123
-->
```
Anyone viewing page source can read this. **Why dangerous?** Attackers may obtain login credentials, hidden admin panels, internal APIs, API tokens, or database credentials. Always inspect **View Source** during web assessments.

## HTML Injection
Occurs when user input is displayed without validation. Instead of showing plain text, the browser executes the HTML.

```text
User enters: <h1>Hacked</h1>
Page renders: Hacked  (as an actual heading)
```
Example: entering `<a href="http://hacker.com">Click Here</a>` produces a real clickable malicious link if input isn't sanitized.

**Why it happens:** developer inserts user input directly:
```javascript
element.innerHTML = userInput;   // unsafe
```

**Risks:** fake login pages · defacement · phishing links · malicious content · social engineering.

**Prevention:** validate input · sanitize HTML · escape special characters · never trust user input. Use `textContent` instead of `innerHTML` when displaying user input.

## HTML vs CSS vs JavaScript
| HTML | CSS | JavaScript |
|---|---|---|
| Structure | Design | Functionality |
| Tags | Styles | Logic |
| Static | Appearance | Dynamic |

## Complete Website Architecture
```text
User → Browser (HTML + CSS + JS) → HTTP Request → Internet
→ Web Server (Backend Application) → Database
→ HTTP Response → Browser Renders Webpage
```

## Final Summary

- Websites follow a Client → Server → Client communication model.
- Frontend handles presentation; Backend handles processing.
- HTML defines structure, CSS styles it, JavaScript adds functionality.
- Elements use attributes like `id`, `class`, `src`, `href`.
- Never expose sensitive information in frontend source code.
- HTML Injection occurs when user input is rendered without sanitization.
- Always validate and sanitize user input to prevent web vulnerabilities.
