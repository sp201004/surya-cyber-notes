## Contents

- [What is Generative AI?](#what-is-generative-ai)
- [The TCREI Prompting Framework](#the-tcrei-prompting-framework)
- [AI Workflows for Security Analysts](#ai-workflows-for-security-analysts)
- [AI Safety & Governance — The Non-Negotiable Rules](#ai-safety--governance--the-non-negotiable-rules)
- [Career Preparation — Cover Letters & Interviews](#career-preparation--cover-letters--interviews)

## What is Generative AI?

| **Term** | **Definition** | **Example** |
| --- | --- | --- |
| **Artificial Intelligence (AI)** | Computer programs designed to perform cognitive tasks typically associated with human intelligence (learning, problem-solving, pattern recognition). | SIEM correlation engines, anomaly detection systems, automated threat classification. |
| **Generative AI (Gen AI)** | A specific type of AI capable of creating ENTIRELY NEW CONTENT (text, code, images, summaries) based on user instructions. | Google Gemini, ChatGPT, Claude, Microsoft Copilot. Ask it to write code, explain a concept, or draft an email. |
| **Prompt** | The natural language input (instructions) you provide to an AI model to tell it exactly what to generate. | 'Act as a senior security analyst and explain Zero Trust Architecture in 3 bullet points for a new hire.' |
| **AI Hallucination** | When an AI model generates confident-sounding but factually incorrect or fabricated information. | AI claims a CVE number is for a specific software product when it is actually for a completely different product. |
| **AI Bias** | Risks arising when AI training data contains biases, leading to unfair, inaccurate, or skewed outputs. | An AI trained mostly on Western threat data may underperform when analyzing threat patterns from other regions. |

## The TCREI Prompting Framework

> **KEY CONCEPT: Mnemonic: Thoughtfully Create Really Excellent Inputs**
> To get highly accurate and useful results, you must structure prompts effectively.
> Vague prompts produce vague results. Detailed prompts produce actionable results.

| **Letter** | **Component** | **What It Means** | **Example Application** |
| --- | --- | --- | --- |
| **T** | **TASK** | Tell the AI exactly WHAT to do. Include the PERSONA ('Act as...') and FORMAT ('Provide a bulleted list' / 'Create a table'). | 'Act as a Senior Security Architect. Create a bulleted list of the top 5 controls for preventing ransomware.' |
| **C** | **CONTEXT** | Provide BACKGROUND details. Tell the AI WHO you are and what the specific situation is. | 'I am a junior analyst explaining malware to a non-technical HR department. Keep technical jargon minimal.' |
| **R** | **REFERENCES** | Give the AI an EXAMPLE to copy. Show it the format, style, or structure you want. | 'Write an incident report matching the exact layout of this example: [Insert example report here].' |
| **E** | **EVALUATE** | Critically READ the AI's output. Did it answer your question? Is it accurate? Is the format correct? | Read every word. Cross-reference facts against official documentation (NIST, CVE database). |
| **I** | **ITERATE** | If the output isn't perfect, REFINE the prompt. Ask it to expand, go deeper, or change the tone. | 'Great start. Now go deeper into the network layer mechanics of why this mitigation works.' |

> **EXAMPLE: Example of a Strong TCREI Prompt**
> Act as a Lead Security Analyst (Task/Persona).
> I am a newly hired junior analyst, and I need to understand Zero Trust Architecture (Context).
> Please break this down using a real-world analogy of a high-security building (Reference/Style).
> Provide the output in exactly 3 short bullet points (Task/Format).
> 
> Why this works: Specific persona + clear context + formatting requirement + style reference.
> Compare to: 'Explain Zero Trust.' (Vague. AI may explain at wrong level with wrong format.)

## AI Workflows for Security Analysts

| **#** | **Workflow** |
| --- | --- |
| **1** | **Decoding Dense Security Frameworks**  Frameworks like NIST SP 800-53 have 490+ pages of dense government jargon. Use AI as a translator. Tell it your EXACT environment first. Prompt: 'Explain control SI-5 from NIST 800-53. I am working on a non-federal commercial system. Explain like I am a brand-new analyst.' The AI converts jargon to actionable steps relevant to YOUR context. |
| **2** | **Code Debugging & Optimization**  Security analysts write scripts to automate log analysis. AI excels at finding EDGE CASES humans miss. Example: Your script divides logins by average daily logins to detect spikes. New employee has average of 0. Division by zero crashes the script. AI spots this immediately and rewrites to handle zero gracefully. Also use: 'Add inline comments explaining what every line does and suggest 3 optimization improvements.' RULE: Keep code prompts BRIEF. Code is precise -- excessive narrative context distracts the AI. |
| **3** | **Vulnerability Research**  When a new CVE drops (SSRF, SQL Injection, Broken Access Control), use AI as a judgment-free tutor. Ask it to: define the vulnerability, explain its potential impact on a corporate network, and list immediate mitigations to apply BEFORE an official patch is released. Iterate for depth: 'Why does this specific mitigation work at the network layer?' |
| **4** | **Alert Prioritization & SOC Triage**  SOCs receive floods of IDS alerts. Paste sanitized alert logs into AI and ask it to prioritize from highest to lowest severity with reasoning. Advanced: AI can spot tactics humans miss -- like identifying a noisy SYN Flood as a DIVERSIONARY TACTIC masking a quiet data exfiltration happening simultaneously. CRITICAL RULE: Always check your formal Incident Response Plan FIRST. Only use AI to draft a response if the specific threat is completely absent from official playbooks. |

## AI Safety & Governance — The Non-Negotiable Rules

| **Rule** | **What It Means** | **Why It Matters** |
| --- | --- | --- |
| **Human-in-the-Loop** | NEVER trust AI blindly. Always read, verify, and test AI-generated code in a SANDBOX before live deployment. | AI lacks real-world context. Hallucinations (confident fabrications) can introduce new vulnerabilities into your security infrastructure. |
| **No PII or Secrets** | NEVER paste customer data, source code, IP addresses, cryptographic keys, employee records, or company-specific identifiers into a public AI tool. | Violates NDAs. Data submitted to public AI tools is processed by the vendor and may appear in future training data. One paste = company-wide data leak. |
| **Sanitize Inputs** | Anonymize ALL logs and remove company-specific identifiers BEFORE asking AI for help. | Replace real IPs with placeholder IPs (10.0.0.x). Replace real names with 'User A', 'User B'. Keep the analytical question intact while protecting the data. |
| **Verify AI Code** | Run AI-generated scripts in an isolated VM or sandbox environment first. Review the logic manually. | AI can write syntactically correct code that has logical flaws, security vulnerabilities, or unexpected side effects on your systems. |
| **Check Official IR Plan First** | Never let AI override your formal Incident Response Playbook during an active incident. | Playbooks are vetted by legal and compliance teams. AI suggestions may violate regulatory requirements or evidence-handling procedures. |

## Career Preparation — Cover Letters & Interviews

### Crafting a Narrative-Driven Cover Letter

| **Element** | **What to Include** | **What to Avoid** |
| --- | --- | --- |
| **The Hook** | Opening sentence that shows genuine interest in THIS company specifically. Reference their product, mission, or a recent initiative. | 'I am writing to apply for the position of...' (generic, reads like every other applicant) |
| **Your Story** | Why cybersecurity excites you. What in your background (even non-technical) prepared you for this field. | Listing the same achievements already in your resume. Cover letter should add context, not repeat facts. |
| **The Pivot** | If transitioning from another field (sales, HR, retail, military), explain HOW those skills apply to security. | Apologizing for your non-traditional background. Your diverse experience is an ASSET, not a gap. |
| **Customization** | Research the company. Weave their specific mission or challenges into your narrative. | Sending the same boilerplate letter to every company. Hiring managers can tell immediately. |

### Mastering the Technical Interview

| **Technique** | **How to Apply It** | **Why It Works** |
| --- | --- | --- |
| **Know Core Fundamentals** | OSI Model (7 layers), TCP/IP Model, SIEM tools (Splunk), packet analysis (Wireshark), incident response lifecycle. Know WHY they exist, not just WHAT they are. | Interviewers test understanding, not memorization. Explaining WHY shows genuine comprehension. |
| **Ask Clarifying Questions** | When asked a vague question, NEVER dive straight into an answer. Ask: 'Can you clarify the scale of the network?' or 'Are we assuming the attacker already has internal access?' | Shows structured analytical thinking. Demonstrates you approach problems methodically before acting. |
| **Think Out Loud** | Narrate your reasoning as you work through a technical problem. | Interviewer can see your thought process and guide you if you go off track. Silence is worse than an imperfect answer. |
| **Write It Down** | For multi-part technical questions, write down each part before answering. | Prevents skipping steps. Demonstrates organizational discipline -- critical for incident response. |
| **STAR Method** | Answer behavioral questions with: Situation, Task, Action, Result. | Provides a complete, structured narrative that directly answers what the interviewer is evaluating. |
| **Honesty on Unknowns** | 'I don't know the exact answer, but here is the process I would use to figure it out.' | Shows intellectual honesty and curiosity. Hiring managers hire people who can learn, not people who pretend to know everything. |
