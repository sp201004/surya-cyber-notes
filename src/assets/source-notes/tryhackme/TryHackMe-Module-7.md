# 📘 TryHackMe — Module 7: Attacks and Defenses

> 🗂️ **Rooms:** 🔺 The CIA Triad • 🔐 Cryptography Concepts • ⚔️ Become a Hacker • 🛡️ Become a Defender • 🎁 Mystery Chest

---

# Room 1 — The CIA Triad 🔺

```text
 ██████╗██╗ █████╗
██╔════╝██║██╔══██╗
██║     ██║███████║
██║     ██║██╔══██║
╚██████╗██║██║  ██║
 ╚═════╝╚═╝╚═╝  ╚═╝

   ████████╗██████╗ ██╗ █████╗ ██████╗
   ╚══██╔══╝██╔══██╗██║██╔══██╗██╔══██╗
      ██║   ██████╔╝██║███████║██║  ██║
      ██║   ██╔══██╗██║██╔══██║██║  ██║
      ██║   ██║  ██║██║██║  ██║██████╔╝
      ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝╚═════╝
```

Room

The CIA Triad

Module

Attacks and Defenses

Difficulty

Beginner

Estimated Time

30 Minutes

### Learning Objectives

By the end of this room you will understand

✔ What the CIA Triad is

✔ Why it is important

✔ Confidentiality

✔ Integrity

✔ Availability

✔ Security Mindset

✔ Real-world security examples

## 1. INTRODUCTION

Cyber Security protects

✔ Computers

✔ Servers

✔ Networks

✔ Applications

✔ Data

But...

What exactly are we protecting?

The answer is

Digital Information.

Cyber Security mainly focuses on protecting
three fundamental properties of information.

These three properties are called

            CIA TRIAD

## 2. WHAT IS THE CIA TRIAD?

               CIA TRIAD

```text
                    ▲
                    │
         ┌──────────┼──────────┐
         │          │          │
         │          │          │
         ▼          ▼          ▼
```

 Confidentiality  Integrity  Availability

These are the three pillars
of Cyber Security.

Every security control usually protects
one or more of these pillars.

## 3. WHY IS THE CIA TRIAD IMPORTANT?

Without proper security

Data may be

↓

Viewed by attackers

↓

Modified

↓

Deleted

↓

Unavailable

↓

Lost forever

CIA helps organizations understand

What happened?

Which security property failed?

How to prevent it again?

## 4. DIGITAL WORLD EXAMPLE

Without Security

----------------------------

Sensitive Data

↓

Seen by attacker

↓

Changed

↓

Unavailable

↓

Business Loss

↓

Customer Loss

↓

Legal Problems

↓

Financial Damage

## 5. THE THREE PILLARS

C

Confidentiality

↓

Only authorized people
can access information.

---------------------------------------------------

I

Integrity

↓

Data must remain accurate.

No unauthorized changes.

---------------------------------------------------

A

Availability

↓

Data and services
must be available when needed.

## 6. CONFIDENTIALITY

Definition

Protect information
from unauthorized access.

Goal

Only authorized users
should read sensitive information.

### Real World Example

Imagine

You are discussing private information
with your friend.

Someone secretly listens.

Now

Your private conversation

↓

No longer private.

Confidentiality is broken.

### Digital Example

You connect to

Free Public Wi-Fi

↓

Login to your Gmail

↓

Attacker captures credentials

↓

Account Compromised

Confidentiality Broken

### How Confidentiality is Protected

Encryption

↓

Passwords

↓

Access Control

↓

Authentication

↓

Authorization

↓

VPN

↓

Multi-Factor Authentication

### Examples

❌ Gmail password written on sticky note

Confidentiality

Broken

----------------------------------------------------

✅ Company documents

Only employees with permission

Confidentiality

Maintained

----------------------------------------------------

❌ Personal documents

Publicly available online

Confidentiality

Broken

## 7. INTEGRITY

Definition

Ensure data

is accurate

complete

and unmodified.

### Goal

Prevent

Unauthorized Changes

### Real World Example

Teacher enters your marks.

Later

Someone changes

95

↓

35

Marks become incorrect.

Integrity Broken.

### Digital Example

Bank Transfer

↓

Attacker changes

Receiver Account

↓

Money goes elsewhere

Integrity Broken.

### How Integrity is Protected

Checksums

↓

Hashing

↓

Digital Signatures

↓

File Permissions

↓

Version Control

↓

Audit Logs

### Examples

✅ Data modified after approval

Integrity Maintained

----------------------------------------------------

❌ Attendance records changed

after teacher locked them

Integrity Broken

----------------------------------------------------

❌ Product price changed

before checkout

Integrity Broken

## 8. AVAILABILITY

Definition

Ensure systems

services

applications

and data

are available

when needed.

### Real World Example

Your money is

inside the bank.

But

Bank servers are down.

↓

You cannot withdraw money.

Availability Broken.

### Digital Example

Website

↓

DDoS Attack

↓

Website Offline

↓

Customers cannot access it.

Availability Broken.

### How Availability is Protected

Backups

↓

Load Balancers

↓

Redundant Servers

↓

UPS

↓

Generators

↓

Disaster Recovery

↓

Failover Systems

### Examples

❌ Important services stopped

after software installation

Availability Broken

----------------------------------------------------

❌ Company website offline

during office hours

Availability Broken

----------------------------------------------------

✅ Employees access systems

during working hours

Availability Maintained

## 9. CIA TRIAD VISUAL

                CIA TRIAD

```text
                     ▲

                     │
```

      Confidentiality

```text
                     │

                     │
```

Integrity ---------------- Availability

If one pillar fails

Overall security becomes weaker.

## 10. QUICK COMPARISON

```text
```text
+----------------+----------------------------+
| Pillar         | Purpose                    |
+----------------+----------------------------+
| Confidentiality| Prevent unauthorized view  |
| Integrity      | Prevent unauthorized edit  |
| Availability   | Ensure access when needed  |
+----------------+----------------------------+
```
```

## 11. MEMORY TRICK

C

Can I

SEE

the data?

↓

Unauthorized access

----------------------------------------------------

I

Is the data

CORRECT?

↓

Unauthorized modification

----------------------------------------------------

A

Can I

USE

the data?

↓

Service availability

## 12. QUESTIONS SECURITY PROFESSIONALS ASK

Whenever a security incident occurs

they ask

Was sensitive information exposed?

↓

Confidentiality

----------------------------------------------------

Was information changed?

↓

Integrity

----------------------------------------------------

Could users access the system?

↓

Availability

## 13. CIA CHALLENGE EXAMPLES

CONFIDENTIALITY

✔ Employee salary leaked

✔ Login credentials shared

✔ Customer database leaked

----------------------------------------------------

INTEGRITY

✔ Logs deleted

✔ Financial report altered

✔ Database modified

----------------------------------------------------

AVAILABILITY

✔ Website offline

✔ Email server unavailable

✔ Critical services stopped

## 14. FLAG

Challenge Flag

THM{CIA_IS_ABOUT_BALANCE}

## 15. KEY TERMINOLOGY

Confidentiality

↓

Keep Information Secret

----------------------------------------------------

Integrity

↓

Keep Information Correct

----------------------------------------------------

Availability

↓

Keep Information Accessible

## 16. ROOM SUMMARY

You learned

✔ CIA Triad

✔ Confidentiality

✔ Integrity

✔ Availability

✔ Security Mindset

✔ Real-world Examples

✔ Digital Examples

✔ Security Classification

## 17. ONE SHOT REVISION

                     CIA

```text
          ┌─────────┼─────────┐

          │         │         │

          ▼         ▼         ▼
```

 Confidentiality Integrity Availability

       Secret      Correct     Accessible

      No Leak     No Change    Always Up

## 18. INTERVIEW QUESTIONS

Q1

What is CIA?

Answer

Confidentiality

Integrity

Availability

----------------------------------------------------

Q2

Which pillar prevents unauthorized access?

Answer

Confidentiality

----------------------------------------------------

Q3

Which pillar prevents unauthorized modification?

Answer

Integrity

----------------------------------------------------

Q4

Which pillar ensures systems remain usable?

Answer

Availability

----------------------------------------------------

Q5

What happens if customer passwords leak?

Answer

Confidentiality Broken

----------------------------------------------------

Q6

What happens if an attacker changes a bank record?

Answer

Integrity Broken

----------------------------------------------------

Q7

What happens during a DDoS attack?

Answer

Availability Broken

----------------------------------------------------

Q8

Why is CIA important?

Answer

It forms the foundation of all
Cyber Security controls.

## 19. FINAL CHEATSHEET

Confidentiality

↓

Protect Data

↓

Encryption

↓

Passwords

↓

Access Control

--------------------------------------------

Integrity

↓

Protect Accuracy

↓

Hashing

↓

Digital Signatures

↓

Checksums

--------------------------------------------

Availability

↓

Protect Access

↓

Backups

↓

Redundancy

↓

Disaster Recovery

## 20. NEXT STEP

You are now ready to learn

✔ Cryptography Concepts

✔ Become a Hacker

✔ Become a Defender

✔ Authentication

✔ Access Control

✔ Encryption

✔ Network Security

---

# Room 2 — Cryptography Concepts 🔐

#

## WHAT IS CRYPTOGRAPHY?

Cryptography is the science of protecting information by converting
readable data into an unreadable format so that only authorized
people can read it.

Main Goal:
- Protect Confidentiality
- Protect Integrity
- Enable Secure Communication

Without cryptography:
✔ Anyone can read your data
✔ Anyone can modify it
✔ Anyone can steal passwords
✔ Anyone can impersonate websites

With cryptography:
✔ Data becomes unreadable
✔ Only authorized users can decrypt it
✔ Data remains private and secure

------------------------------------------------------------

Real Life Examples

• HTTPS websites
• Online Banking
• WhatsApp Messages
• VPN
• SSH
• WiFi Password
• Password Managers
• Digital Certificates
• Cloud Storage

------------------------------------------------------------

CIA Triad Relation

Confidentiality
→ Prevent unauthorized access.

Integrity
→ Prevent unauthorized modification.

Availability
→ Ensure data is accessible.

Cryptography mainly protects

✔ Confidentiality
✔ Integrity

## BASIC TERMINOLOGIES

------------------------------------------------------------
1. Plaintext
------------------------------------------------------------

Readable message.

Example

HELLO

Patient Name:
Alice Smith

------------------------------------------------------------
2. Ciphertext
------------------------------------------------------------

Encrypted unreadable message.

Example

KHOOR

or

x7$Q@9!a#

Without key:
Meaningless.

------------------------------------------------------------
3. Encryption
------------------------------------------------------------

Converting plaintext into ciphertext.

Plaintext
      ↓
 Encryption
      ↓
Ciphertext

------------------------------------------------------------
4. Decryption
------------------------------------------------------------

Converting ciphertext back into plaintext.

Ciphertext
      ↓
 Decryption
      ↓
Plaintext

------------------------------------------------------------
5. Key
------------------------------------------------------------

Secret value used during encryption and decryption.

Think of it like

Password for the algorithm.

Example

Shift = 3

------------------------------------------------------------
6. Algorithm
------------------------------------------------------------

Public mathematical procedure used to encrypt/decrypt data.

Important

Algorithm can be public.

Key must remain secret.

Security comes from

Keeping the KEY secret.

NOT
Keeping the algorithm secret.

## HOW ENCRYPTION WORKS

Encryption

Plaintext
      +
Algorithm
      +
Secret Key
      ↓
Ciphertext

Decryption

Ciphertext
      +
Algorithm
      +
Same Key
      ↓
Plaintext

## LOCKBOX ANALOGY

Imagine sending a secret letter.

Alice
↓

Writes letter

↓

Puts inside lockbox

↓

Locks box using key

↓

Sends locked box

↓

Bob receives box

↓

Uses same key

↓

Reads message

Anyone intercepting the box

✔ Can see it
✘ Cannot open it

This is

Symmetric Encryption

## PLAINTEXT VS CIPHERTEXT

Plaintext

HELLO

Ciphertext

KHOOR

Without key

KHOOR has no meaning.

With key

HELLO

## CAESAR CIPHER

One of the oldest encryption techniques.

Created by

Julius Caesar

Idea

Shift every letter by fixed positions.

Example

Key = 3

A → D
B → E
C → F

X → A
Y → B
Z → C

Example

HELLO

↓

KHOOR

Decryption

Shift backwards.

K → H
H → E
O → L
O → L
R → O

Result

HELLO

## WHY CAESAR CIPHER IS INSECURE

Only

25 possible keys.

Computer can try all keys instantly.

Brute Force

tries every possible shift.

Real systems

NEVER use Caesar Cipher.

Used only for education.

## SYMMETRIC ENCRYPTION

Definition

Same key encrypts and decrypts data.

Encryption

Alice
     Key
      ↓
Encrypt
      ↓
Ciphertext

Decryption

Ciphertext
      ↓
Decrypt
      ↓
Key
      ↓
Bob

------------------------------------------------------------

Advantages

✔ Extremely fast

✔ Efficient

✔ Perfect for

- Files
- Hard Drives
- Databases
- VPN
- HTTPS Session
- Network Traffic

------------------------------------------------------------

Disadvantages

Key Distribution Problem

How do Alice and Bob share
the secret key securely?

If attacker gets the key

Everything is compromised.

## KEY DISTRIBUTION PROBLEM

Problem

Need same key.

How to send it safely?

If key is sent normally

↓

Attacker steals key

↓

Decrypts everything

Encrypting the key also requires another key.

Infinite loop.

Solution

Asymmetric Encryption.

## ASYMMETRIC ENCRYPTION

Uses

Two keys.

Public Key

Can be shared.

Private Key

Must remain secret.

------------------------------------------------------------

Rule

Encrypt with Public Key

↓

Decrypt with Private Key

------------------------------------------------------------

Example

Alice

↓

Gets Bob's Public Key

↓

Encrypts message

↓

Sends ciphertext

↓

Bob

↓

Uses Private Key

↓

Reads message

Only Bob can decrypt.

## MAILBOX ANALOGY

Public Key

Mailbox Slot

Anyone can insert letters.

Private Key

Mailbox Door

Only owner can open.

This perfectly explains

Public Key Cryptography.

## HTTPS

When visiting

https://google.com

Steps

Browser

↓

Requests Public Key

↓

Server sends Certificate

↓

Browser verifies Certificate

↓

Both create Shared Secret

↓

Switch to Symmetric Encryption

↓

Fast encrypted communication

## DIGITAL CERTIFICATES

Certificate contains

✔ Website Identity

✔ Public Key

✔ Certificate Authority Signature

Used for

Authenticating websites.

## CERTIFICATE AUTHORITY (CA)

Trusted organization.

Examples

Google Trust Services

Let's Encrypt

DigiCert

Sectigo

Role

Verifies websites.

Signs certificates.

Browser trusts CA.

## HYBRID ENCRYPTION

Real systems use BOTH.

Asymmetric Encryption

↓

Safely exchange secret key

↓

Symmetric Encryption

↓

Encrypt all data

Reason

Asymmetric

Secure

But Slow

Symmetric

Very Fast

## SYMMETRIC VS ASYMMETRIC

Symmetric

Keys
One

Speed
Very Fast

Key Sharing
Difficult

Usage
Bulk Data

Examples

AES

ChaCha20

------------------------------------------------------------

Asymmetric

Keys

Two

Speed

Slow

Key Sharing

Easy

Usage

Authentication

Certificates

Examples

RSA

ECC

## REAL WORLD EXAMPLES

HTTPS

Public Key
→ Key Exchange

AES
→ Data Encryption

------------------------------------------------------------

WhatsApp

Public Keys

↓

Shared Secret

↓

AES

------------------------------------------------------------

SSH

RSA/ECDSA

↓

Session Key

↓

AES

## IMPORTANT DIFFERENCES

Encryption

Readable

↓

Unreadable

Decryption

Unreadable

↓

Readable

------------------------------------------------------------

Plaintext

Readable

Ciphertext

Unreadable

------------------------------------------------------------

Algorithm

Public

Key

Secret

## COMMON ALGORITHMS

Symmetric

AES

DES (Old)

3DES

ChaCha20

------------------------------------------------------------

Asymmetric

RSA

ECC

Diffie-Hellman

## ADVANTAGES OF CRYPTOGRAPHY

✔ Confidentiality

✔ Integrity

✔ Authentication

✔ Secure Communication

✔ Privacy

✔ Digital Signatures

✔ Secure Banking

✔ VPN

✔ Password Storage

## LIMITATIONS

Weak Keys

↓

Broken Security

Old Algorithms

↓

Vulnerable

Poor Key Storage

↓

Compromise

Human Errors

↓

Security Failure

## TRYHACKME GAME ANSWERS

Level 1

Cipher

DWWDFN WRPRUURZ

Answer

ATTACK TOMORROW

------------------------------------------------------------

Level 2

Encrypt

SECRET

Shift

5

Answer

XJHWJY

------------------------------------------------------------

Level 3

Cipher

ESP DJDEPX TD LE CTDV

Answer

THE SYSTEM IS AT RISK

------------------------------------------------------------

Level 4

Cipher

XLMW MW XLI JMREP GSHI

Answer

THIS IS THE FINAL CODE

## TASK ANSWERS

Task 2

Flag

THM{CAESAR_CIPHER_MASTER_2026}

CYBER (Shift 5)

HDGJW

FVZCYR PNRFNE PVCURE

↓

SIMPLE CAESAR CIPHER

------------------------------------------------------------

Task 3

Secret Key

private key

Alice encrypts using Bob's Public Key?

Yay

Problem solved?

key distribution

Bulk Data Encryption?

symmetric

## INTERVIEW QUESTIONS

Q1.
What is Cryptography?

Protecting data using encryption.

------------------------------------------------------------

Q2.
Difference between Encryption and Encoding?

Encoding
→ Readability

Encryption
→ Security

------------------------------------------------------------

Q3.
Plaintext?

Original readable data.

------------------------------------------------------------

Q4.
Ciphertext?

Encrypted unreadable data.

------------------------------------------------------------

Q5.
Difference between Symmetric and Asymmetric?

Symmetric

One key

Fast

Asymmetric

Two keys

Slow

------------------------------------------------------------

Q6.
Why not use Caesar Cipher?

Easy brute-force attack.

Only 25 keys.

------------------------------------------------------------

Q7.
What protects HTTPS?

Hybrid Encryption

Asymmetric

+

Symmetric

------------------------------------------------------------

Q8.
What is Public Key?

Shared openly.

------------------------------------------------------------

Q9.
What is Private Key?

Never shared.

## MEMORY TRICKS

Plaintext

P = Plain

Ciphertext

C = Confused

Public Key

Public = Everyone knows

Private Key

Private = Only Owner

Symmetric

Same Key

Asymmetric

Different Keys

Algorithm

Public

Key

Secret

HTTPS

Public Key

↓

Session Key

↓

AES

## EXAM REVISION

✔ Cryptography protects confidentiality.

✔ Plaintext = Readable.

✔ Ciphertext = Encrypted.

✔ Encryption converts plaintext to ciphertext.

✔ Decryption converts ciphertext to plaintext.

✔ Algorithm is public.

✔ Key is secret.

✔ Caesar Cipher is educational only.

✔ Symmetric uses one key.

✔ Asymmetric uses two keys.

✔ Public key encrypts.

✔ Private key decrypts.

✔ HTTPS uses both.

✔ Certificates verify identity.

✔ CA signs certificates.

✔ AES is fast.

✔ RSA/ECC exchange keys.

---

# Room 3 — Become a Hacker ⚔️

## SECTION 1 : WHAT IS OFFENSIVE SECURITY?

Offensive Security is the practice of proactively attacking systems,
applications, or networks in a legal and authorized manner to discover
security weaknesses before real attackers do.

Instead of waiting for hackers to attack...

Organizations hire ethical hackers to attack them first.

Goal:

Find Weaknesses
        ↓
Exploit Weaknesses
        ↓
Report Weaknesses
        ↓
Fix Weaknesses
        ↓
Improve Security

--------------------------------------------------------------------

Simple Definition

Offensive Security =
Thinking like an attacker to protect a system.

--------------------------------------------------------------------

Real World Example

Imagine your house.

Instead of waiting for a thief...

You hire a security expert.

He checks

✔ Doors
✔ Windows
✔ Locks
✔ CCTV
✔ Alarm

Then tells you

"This window is weak."
"This lock is easy to break."

You fix them before thieves arrive.

Exactly same concept in cybersecurity.

## WHY OFFENSIVE SECURITY?

Main Objectives

✔ Discover vulnerabilities

✔ Test existing security

✔ Prevent future attacks

✔ Understand attacker behavior

✔ Improve organization's security posture

## OFFENSIVE SECURITY PROCESS

```text
                Information Gathering
                         │
                         ▼
                  Find Weaknesses
                         │
                         ▼
                 Exploit Weaknesses
                         │
                         ▼
                 Gain Authorized Access
                         │
                         ▼
                    Report Findings
                         │
                         ▼
                    Security Improved
```

## LEARNING OBJECTIVES

After completing this room you should understand

✔ Offensive Security

✔ Common Terminology

✔ Ethical Hacking Process

✔ Vulnerabilities

✔ Enumeration

✔ Exploitation

✔ Dictionary Attacks

✔ Hydra Basics

✔ Hacker Mindset

## ETHICAL HACKING

Ethical Hacking means

Trying to hack a system

WITH PERMISSION.

Without permission

= Illegal Hacking

With permission

= Ethical Hacking

## ETHICAL HACKER RESPONSIBILITIES

✔ Find vulnerabilities

✔ Never damage systems

✔ Never steal information

✔ Report findings responsibly

✔ Stay inside scope

✔ Help improve security

## REAL ATTACKER vs ETHICAL HACKER

Real Attacker

Goal

Steal
Destroy
Encrypt
Extort

-------------------------------------------------

Ethical Hacker

Goal

Find
Report
Improve
Protect

## IMPORTANT RULE

Permission is everything.

Without permission

Illegal

With permission

Legal Penetration Test

## CORE TERMINOLOGY

-------------------------------------------------
1. Red Team
-------------------------------------------------

A Red Team simulates real attackers.

Goal

Break into systems
Avoid detection
Test security controls

Think of Red Team as

"The Fake Hacker Team."

-------------------------------------------------
2. Penetration Test
-------------------------------------------------

Penetration Testing (Pentest)

An authorized security assessment
performed against a target.

Purpose

Find vulnerabilities

Demonstrate impact

Suggest fixes

Output

Security Report

-------------------------------------------------
3. Vulnerability
-------------------------------------------------

Definition

A weakness in

Software

Hardware

Configuration

Authentication

Design

that attackers can abuse.

Examples

Weak Password

SQL Injection

Open Port

Old Software

Default Credentials

Sensitive File Exposure

-------------------------------------------------
4. Exploit
-------------------------------------------------

Exploit

Technique or code used to take advantage
of a vulnerability.

Example

Weak password

↓

Password Guessing

↓

Unauthorized Login

Exploit = Password Guessing

-------------------------------------------------
5. Scope
-------------------------------------------------

Scope defines

What you ARE allowed to test.

What you are NOT allowed to test.

Example

Allowed

example.com

Not Allowed

mail.example.com

Without scope

You must NOT attack anything.

## RELATIONSHIP BETWEEN TERMS

```text
Weakness
    │
    ▼
Vulnerability
    │
    ▼
Exploit
    │
    ▼
Gain Access
    │
    ▼
Report
```

## SECTION 2 : FINDING WEAKNESSES

Before attacking anything...

We first understand the target.

Questions every hacker asks

• What is exposed?

• What services exist?

• Hidden pages?

• Login portal?

• Admin panel?

• Open ports?

• Technologies used?

This process is called

Enumeration.

## ENUMERATION

Definition

Collecting information
about a target before attacking it.

Remember

Good hackers don't guess.

They enumerate.

## ENUMERATION EXAMPLES

Finding

Hidden Pages

Login Panels

Directories

Subdomains

Users

Emails

Software Versions

Open Services

## PRACTICAL EXAMPLE

Website

http://www.onlineshop.thm

Suppose homepage looks normal.

Now try

/sitemap

/mail

/register

/login

/admin

Possible Results

200 OK

→ Page Exists

404 Not Found

→ Doesn't Exist

403 Forbidden

→ Exists but Access Denied

## WHY HIDDEN PAGES MATTER

Many developers forget to remove

Admin Pages

Test Pages

Backup Files

Old Login Panels

Debug Pages

Attackers search these first.

## EXAMPLE

Homepage

↓

Nothing Interesting

↓

Try

/login

↓

Login Found

↓

Try Default Credentials

↓

Access Granted

This is exactly how many real attacks begin.

## IMPORTANT CONCEPT

Small weaknesses

↓

Become

Big security incidents

when combined together.

Example

Hidden Login

+

Weak Password

+

No MFA

=

Full System Access

## KEY TAKEAWAYS

✔ Offensive Security attacks systems legally.

✔ Ethical hackers always require permission.

✔ Red Team simulates real attackers.

✔ Pentesting identifies vulnerabilities.

✔ Vulnerability = Weakness.

✔ Exploit = Method to abuse weakness.

✔ Scope defines testing boundaries.

✔ Enumeration comes BEFORE exploitation.

✔ Hidden pages often reveal valuable targets.

✔ Never attack systems without authorization.

## INTERVIEW QUESTIONS

Q1. What is Offensive Security?

Answer:

Offensive Security is the practice of legally simulating attacks on
systems to identify vulnerabilities before malicious attackers exploit
them.

-------------------------------------------------

Q2. What is a Vulnerability?

Answer:

A weakness in software, hardware, configuration, or processes that can
be exploited by attackers.

-------------------------------------------------

Q3. Difference between Vulnerability and Exploit?

Vulnerability

Weakness.

Exploit

Technique used to abuse that weakness.

-------------------------------------------------

Q4. Why is Enumeration Important?

Because understanding the target before attacking greatly increases the
success rate and reduces unnecessary actions.

-------------------------------------------------

Q5. What is Scope?

Scope defines what assets are authorized for testing during a penetration
test.

## SECTION 3 : EXPLOITING WEAKNESSES

Finding a vulnerability is only half of the job.

The next step is to determine whether that weakness can actually be
used to gain unauthorized access.

This process is called

Exploitation.

Flow

```text
Find Vulnerability
        │
        ▼
Verify Vulnerability
        │
        ▼
Exploit Vulnerability
        │
        ▼
Gain Access
        │
        ▼
Document Findings
```

--------------------------------------------------------------------

Real World Example

Imagine a house.

You discover

✔ Window unlocked

This is a Vulnerability.

Now you climb through the window.

That action is the Exploit.

## THINK LIKE A HACKER

Hackers never assume a system is secure.

Instead they constantly ask

• What if this feature fails?

• What if developers forgot something?

• What happens if I enter unexpected input?

• Is there another way inside?

• Can two small weaknesses be combined?

This mindset separates attackers from normal users.

--------------------------------------------------------------------

Important Principles

✔ Question everything

✔ Never trust assumptions

✔ Try unexpected inputs

✔ Test edge cases

✔ Combine multiple weaknesses

## CHAINING VULNERABILITIES

One vulnerability alone may not be dangerous.

But multiple small vulnerabilities together can become critical.

Example

Hidden Login Page
        +
Weak Password
        +
No Account Lockout
        +
Admin Account

        ↓

Complete System Compromise

Think of Dominoes

One domino

↓

Falls

↓

Knocks another

↓

Entire chain collapses

## VALUABLE TARGETS

Attackers usually target

✔ Login Portals

✔ Admin Panels

✔ Databases

✔ User Accounts

✔ API Endpoints

✔ Sensitive Files

Because these provide access to valuable information.

## WHAT CAN AN ATTACKER ACCESS?

After successful authentication

Possible Targets

• Personal Information

• Email Addresses

• Password Hashes

• Financial Records

• Admin Dashboard

• Internal Settings

• Hidden Features

• Customer Data

• System Configuration

## AUTHENTICATION

Authentication answers one question

"Who are you?"

Examples

Username + Password

PIN

OTP

Biometric

Security Key

--------------------------------------------------------------------

Authentication verifies identity.

Authorization determines

"What are you allowed to do?"

Remember

Authentication

↓

Identity

Authorization

↓

Permissions

## CREDENTIALS

Credentials

Information used to prove identity.

Examples

Username

Password

PIN

Token

Certificate

Private Key

Example

Username

admin

Password

qwerty

Together

↓

Credentials

## MANUAL LOGIN TESTING

Suppose a login page exists.

Username

admin

Try common passwords

abc123

123456

password

qwerty

654321

Eventually

admin : qwerty

↓

Login Successful

This is a Manual Dictionary Attack.

## WHAT IS A DICTIONARY ATTACK?

Dictionary Attack

Trying passwords from a predefined list.

Unlike brute force

Dictionary Attack

Only tests likely passwords.

Therefore

✔ Faster

✔ More Practical

✔ Commonly Used

## BRUTE FORCE vs DICTIONARY ATTACK

Brute Force

Attempts every possible password.

Example

aaaa

aaab

aaac

...

Advantages

Guaranteed eventually.

Disadvantages

Very Slow.

-----------------------------------------------------

Dictionary Attack

Attempts passwords from a wordlist.

Example

password

admin

welcome

qwerty

football

Advantages

Fast

Realistic

Common

Disadvantages

Fails if password isn't in list.

## AUTOMATING THE ATTACK

Trying passwords manually is slow.

Real penetration testers automate repetitive work.

Popular Tools

Hydra

Medusa

Ncrack

Burp Suite

## HYDRA

Hydra

A fast login password cracking tool.

Supports many protocols

HTTP

HTTPS

FTP

SSH

RDP

SMTP

POP3

MySQL

PostgreSQL

Telnet

and many more.

Purpose

Automatically test many username/password combinations.

## HYDRA COMMAND

Example

hydra -l admin -P passlist.txt www.onlineshop.thm \
http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect" -V

## COMMAND BREAKDOWN

hydra

↓

Starts Hydra.

----------------------------------------------------

-l admin

↓

Single Username

admin

----------------------------------------------------

-L users.txt

↓

Multiple Usernames

----------------------------------------------------

-P passlist.txt

↓

Password Wordlist

----------------------------------------------------

-p password123

↓

Single Password

----------------------------------------------------

www.onlineshop.thm

↓

Target Website

----------------------------------------------------

http-post-form

↓

Attacking an HTTP POST login form.

----------------------------------------------------

/login

↓

Login Endpoint

----------------------------------------------------

username=^USER^

↓

Hydra inserts username here.

----------------------------------------------------

password=^PASS^

↓

Hydra inserts password here.

----------------------------------------------------

F=incorrect

↓

If response contains

"incorrect"

Hydra knows login failed.

----------------------------------------------------

-V

↓

Verbose Mode

Displays every attempt.

## HYDRA EXECUTION FLOW

```text
Read Username
        │
        ▼
Read Password List
        │
        ▼
Send Login Request
        │
        ▼
Check Response
        │
        ▼
Failure?
        │
        ├── Yes → Try Next Password
        │
        └── No
              │
              ▼
      Credentials Found
```

## WHY AUTOMATION?

Imagine

100,000 passwords.

Manual

Several days.

Hydra

Few minutes.

Automation saves

Time

Effort

Human Error

## REAL-WORLD LOGIN SECURITY

Modern websites defend against dictionary attacks.

Common Protections

✔ MFA

✔ CAPTCHA

✔ Rate Limiting

✔ Account Lockout

✔ Password Complexity

✔ IP Blocking

✔ Behavioral Detection

## COMMON MISTAKES

New Pentesters often

✘ Attack outside scope

✘ Forget permission

✘ Ignore robots.txt

✘ Skip enumeration

✘ Use wrong endpoint

✘ Misread Hydra output

## REAL ATTACK FLOW

```text
Target Website
        │
        ▼
Enumeration
        │
        ▼
Hidden Login Page
        │
        ▼
Common Username
        │
        ▼
Dictionary Attack
        │
        ▼
Credentials Found
        │
        ▼
Login
        │
        ▼
Access Sensitive Area
        │
        ▼
Report Findings
```

## HYDRA CHEAT SHEET

Single User

hydra -l admin -P passwords.txt ssh://IP

----------------------------------------------------

Multiple Users

hydra -L users.txt -P passwords.txt ssh://IP

----------------------------------------------------

HTTP Login

hydra http-post-form ...

----------------------------------------------------

Verbose

-V

----------------------------------------------------

Stop After First Success

-f

----------------------------------------------------

Threads

-t 16

## INTERVIEW QUESTIONS

Q1. What is Exploitation?

Using a vulnerability to gain unauthorized access or demonstrate impact.

----------------------------------------------------

Q2. What is a Dictionary Attack?

Testing passwords from a predefined wordlist.

----------------------------------------------------

Q3. Difference between Brute Force and Dictionary Attack?

Brute Force tries every possible combination.

Dictionary Attack only tests likely passwords.

----------------------------------------------------

Q4. What is Hydra?

A fast network login cracker used for password testing against multiple
protocols.

----------------------------------------------------

Q5. Why do attackers automate attacks?

Automation saves time, scales better, and reduces manual effort.

## KEY TAKEAWAYS

✔ Exploitation comes after Enumeration.

✔ Small weaknesses can become critical when combined.

✔ Authentication verifies identity.

✔ Credentials prove identity.

✔ Dictionary attacks use predefined passwords.

✔ Hydra automates login testing.

✔ Always stay within authorized scope.

## SECTION 4 : WHERE TO GO FROM HERE

Completing this room means you've taken your first practical step into
Offensive Security.

You have learned

✔ Ethical Hacking

✔ Vulnerability Discovery

✔ Enumeration

✔ Exploitation

✔ Authentication

✔ Dictionary Attacks

✔ Hydra

Now it's time to continue learning.

Cybersecurity is a huge field.

Choose one area and master it.

## IMPORTANT TERMINOLOGY REVISION

Scope
------

Defines what systems are allowed to be tested.

----------------------------------------------------

Enumeration
-----------

Collecting information about a target before attacking it.

----------------------------------------------------

Vulnerability
-------------

A weakness that attackers can abuse.

----------------------------------------------------

Exploit
-------

Technique used to abuse a vulnerability.

----------------------------------------------------

Credentials
-----------

Information used for authentication.

Examples

Username

Password

Token

Certificate

----------------------------------------------------

Authentication
--------------

Verifies identity.

"Who are you?"

----------------------------------------------------

Authorization
-------------

Determines permissions.

"What can you do?"

----------------------------------------------------

Dictionary Attack
-----------------

Testing passwords from a predefined wordlist.

## OFFENSIVE SECURITY WORKFLOW

```text
Reconnaissance
      │
      ▼
Enumeration
      │
      ▼
Find Weaknesses
      │
      ▼
Validate Vulnerability
      │
      ▼
Exploit
      │
      ▼
Gain Access
      │
      ▼
Privilege Escalation (Later)
      │
      ▼
Post Exploitation
      │
      ▼
Reporting
```

## ETHICAL HACKING METHODOLOGY

1. Get Permission

2. Understand Scope

3. Gather Information

4. Enumerate Target

5. Find Vulnerabilities

6. Exploit Carefully

7. Document Everything

8. Report Findings

9. Help Fix Issues

## CAREER PATHS

Penetration Tester
------------------

Finds vulnerabilities in systems.

Daily Work

• Web Testing

• Network Testing

• Wireless Testing

• Reporting

----------------------------------------------------

Red Team Operator
-----------------

Simulates real attackers.

Focus

Stealth

Persistence

Realistic Attacks

----------------------------------------------------

Vulnerability Researcher
------------------------

Discovers new software vulnerabilities.

Works with

Operating Systems

Applications

Browsers

Firmware

----------------------------------------------------

Security Consultant
-------------------

Helps companies improve security.

Responsibilities

Assess

Recommend

Implement

Review

----------------------------------------------------

SOC Analyst (Blue Team)
-----------------------

Detects attacks.

Responds to incidents.

Monitors SIEM.

## REAL-WORLD ATTACK CHAIN

```text
Website Found
      │
      ▼
Collect Information
      │
      ▼
Find Login Page
      │
      ▼
Test Authentication
      │
      ▼
Weak Password Found
      │
      ▼
Login Success
      │
      ▼
Access Sensitive Data
      │
      ▼
Escalate Privileges
      │
      ▼
Complete Assessment
      │
      ▼
Write Report
```

## BEST PRACTICES

Always

✔ Obtain Permission

✔ Respect Scope

✔ Document Everything

✔ Verify Findings

✔ Avoid Damaging Systems

✔ Report Responsibly

✔ Protect User Privacy

✔ Follow Laws

## COMMON MISTAKES

❌ Scanning unauthorized targets

❌ Ignoring scope

❌ Forgetting screenshots

❌ Poor documentation

❌ Running dangerous exploits

❌ Assuming vulnerability without proof

❌ Skipping enumeration

## REAL-WORLD TOOLS

Recon

whois

nslookup

dig

theHarvester

Recon-ng

----------------------------------------------------

Scanning

Nmap

Masscan

Rustscan

----------------------------------------------------

Web Enumeration

Gobuster

Dirsearch

Feroxbuster

ffuf

Nikto

----------------------------------------------------

Password Attacks

Hydra

Medusa

John the Ripper

Hashcat

----------------------------------------------------

Proxy

Burp Suite

OWASP ZAP

----------------------------------------------------

Exploitation

Metasploit

Searchsploit

SQLMap

## CHEAT SHEET

Enumeration

↓

Understand Target

----------------------------------------------------

Vulnerability

↓

Weakness

----------------------------------------------------

Exploit

↓

Abuse Weakness

----------------------------------------------------

Authentication

↓

Verify Identity

----------------------------------------------------

Authorization

↓

Access Rights

----------------------------------------------------

Credentials

↓

Username + Password

----------------------------------------------------

Dictionary Attack

↓

Try Common Passwords

----------------------------------------------------

Hydra

↓

Automated Password Testing

## INTERVIEW QUESTIONS

Q1.

What is Offensive Security?

Answer

Testing systems proactively to identify vulnerabilities before attackers
can exploit them.

----------------------------------------------------

Q2.

Difference between Red Team and Penetration Testing?

Penetration Test

Focused assessment.

Red Team

Full attacker simulation.

----------------------------------------------------

Q3.

What is Enumeration?

Collecting information about the target before exploitation.

----------------------------------------------------

Q4.

What is Scope?

Defines authorized systems and actions during a security assessment.

----------------------------------------------------

Q5.

Why is Enumeration Important?

Because attackers need information before exploiting systems.

----------------------------------------------------

Q6.

What is Authentication?

Process of verifying identity.

----------------------------------------------------

Q7.

What is Authorization?

Determines what an authenticated user is allowed to do.

----------------------------------------------------

Q8.

Explain Dictionary Attack.

A password guessing attack using a predefined list of common passwords.

----------------------------------------------------

Q9.

Why is Hydra Popular?

Because it supports many protocols and automates login testing.

----------------------------------------------------

Q10.

Why is Permission Important?

Without authorization, penetration testing becomes illegal.

## MEMORY TRICKS

Enumeration

=

Collect Information

----------------------------------

Vulnerability

=

Weakness

----------------------------------

Exploit

=

Use Weakness

----------------------------------

Authentication

=

Who Are You?

----------------------------------

Authorization

=

What Can You Do?

----------------------------------

Hydra

=

Automated Password Guesser

## ROOM QUESTIONS (ANSWERS)

Task 1

No answer needed

----------------------------------------------------

Task 2

Hidden Pages

sitemap

mail

register

login

admin

----------------------------------------------------

Task 3

Password

qwerty

Flag

THM{born_to_hack!}

Failed Attempts

17

----------------------------------------------------

Task 4

No answer needed

## ONE-PAGE REVISION

Offensive Security

↓

Find Weaknesses

↓

Exploit Weaknesses

↓

Improve Security

----------------------------------------------------

Workflow

Recon

↓

Enumeration

↓

Vulnerability Discovery

↓

Exploitation

↓

Reporting

----------------------------------------------------

Core Concepts

✔ Red Team

✔ Pentesting

✔ Enumeration

✔ Scope

✔ Vulnerability

✔ Exploit

✔ Authentication

✔ Authorization

✔ Credentials

✔ Dictionary Attack

✔ Hydra

----------------------------------------------------

Remember

Enumeration ALWAYS comes before Exploitation.

Permission ALWAYS comes before Enumeration.

Documentation ALWAYS comes after Exploitation.

## KEY TAKEAWAYS

✔ Think like an attacker.

✔ Always stay inside scope.

✔ Enumeration is critical.

✔ Small weaknesses combine into larger attacks.

✔ Authentication protects identity.

✔ Weak passwords remain one of the biggest risks.

✔ Automation saves time.

✔ Hydra is a password testing tool.

✔ Ethical hacking improves security—not damages it.

✔ Report vulnerabilities responsibly.

Next Room Recommendation

Become a Defender
↓

Web Fundamentals
↓

Linux Fundamentals
↓

Nmap
↓

Burp Suite
↓

OWASP Top 10
↓

Jr Penetration Tester Path 🚀

---

# Room 4 — Become a Defender 🛡️

Room:
Become a Defender

Difficulty:
Beginner

Estimated Time:
~30 Minutes

Module:
Pre Security → Attacks & Defenses

Goal:
Understand Defensive Security and how defenders protect systems,
monitor attacks, detect threats, and respond to incidents.

## TASK 1 — What is Defensive Security?

Defensive Security focuses on:

✔ Preventing attacks
✔ Detecting attacks
✔ Reducing damage
✔ Recovering after attacks

Instead of attacking systems,

Defenders protect systems.

------------------------------------------------------------

Main Goal

Protect

    Confidentiality
    Integrity
    Availability

(CIA Triad)

------------------------------------------------------------

Unlike Offensive Security,

Offensive Security asks

"How can I break this?"

Defensive Security asks

"How do I stop someone from breaking this?"

------------------------------------------------------------

Blue Team

Blue Team = Defenders

Responsibilities

• Monitor systems
• Detect attacks
• Configure firewalls
• Update software
• Analyze logs
• Investigate incidents
• Respond to attacks
• Recover systems

------------------------------------------------------------

Think Like a Defender

A defender constantly asks:

What do I need to protect?

What systems are important?

Can I detect attacks?

Can I stop attackers?

If something happens...

Can I recover quickly?

## Learning Objectives

✔ Understand Defensive Security

✔ Understand Visibility

✔ Identify Infrastructure

✔ Learn Protection Methods

✔ Begin Defensive Journey

## Prerequisites

Recommended Knowledge

✔ CIA Triad

✔ Computer Types

✔ Basic Networking

✔ Basic Linux

## DEFENSIVE SECURITY LIFE CYCLE

```text
                ATTACK
                   │
                   ▼
           Can we stop it?
                   │
         Yes ─────────────► Prevent
                   │
                  No
                   ▼
          Can we detect it?
                   │
         Yes ─────────────► Detect
                   │
                  No
                   ▼
            Damage Happens
                   │
                   ▼
               Mitigate
                   │
                   ▼
               Investigate
                   │
                   ▼
           Improve Defenses
```

## TASK 2 — Understanding Your Environment

Before protecting anything,

You must know

WHAT exists.

WHERE it exists.

WHY it exists.

If you don't know your systems,

You cannot defend them.

------------------------------------------------------------

Think of Cyber Security

Like Protecting a City.

Every building has a purpose.

Similarly,

Every server has a purpose.

## CITY ANALOGY

Cyber Infrastructure

↓

Imagine a City

Homes
↓

Employee Devices

--------------------------------

Public Buildings

↓

Web Servers

--------------------------------

Post Office

↓

Mail Server

--------------------------------

City Gate

↓

Firewall

--------------------------------

Outside City

↓

Internet

## Why Visibility Matters

Question

"What am I protecting?"

↓

Servers

Workstations

Users

Applications

Data

------------------------------------------------------------

Question

"Can I see what is happening?"

↓

Logs

Alerts

Monitoring

Network Traffic

------------------------------------------------------------

Question

"What looks suspicious?"

↓

Repeated Login Attempts

Unknown IP Addresses

Malware

Unusual Network Activity

## Five Core Defensive Activities

1. Prevention

Stop attacks BEFORE they happen.

Examples

✔ Firewall

✔ Antivirus

✔ Software Updates

✔ MFA

✔ Strong Passwords

------------------------------------------------------------

2. Detection

Notice attacks quickly.

Examples

✔ Logs

✔ Alerts

✔ IDS

✔ SIEM

✔ Monitoring

------------------------------------------------------------

3. Mitigation

Reduce attack damage.

Examples

✔ Disconnect infected device

✔ Block IP

✔ Disable account

✔ Kill malicious process

------------------------------------------------------------

4. Analysis

Understand

What happened?

How?

When?

Who?

Why?

Examples

✔ Log Analysis

✔ Event Timeline

✔ Packet Analysis

✔ Malware Investigation

------------------------------------------------------------

5. Response & Improvement

Recover

Fix

Improve

Examples

✔ Patch Systems

✔ Restore Backup

✔ Improve Firewall Rules

✔ User Training

✔ Incident Report

## UNDERSTANDING SCOPE

Defenders

DO NOT

Protect the whole Internet.

They only protect

Their Organization.

------------------------------------------------------------

Example Scope

Company Network

Company Servers

Employees

Databases

Email Server

Applications

## Infrastructure Components

Employee Devices

Purpose

Employees work here.

Examples

Laptop

Desktop

Tablet

------------------------------------------------------------

Web Server

Purpose

Hosts Website

Examples

Company Website

Customer Portal

Shopping Site

------------------------------------------------------------

Mail Server

Purpose

Handles Emails

Examples

Gmail Server

Exchange

SMTP

------------------------------------------------------------

Firewall

Purpose

Controls Incoming & Outgoing Traffic

Like

Security Guard

------------------------------------------------------------

Internet

Purpose

Everything outside your organization.

Potential Threat Source.

## How a Defender Thinks

What systems exist?

↓

Which systems are important?

↓

Can I monitor them?

↓

Can attackers reach them?

↓

Can I stop attacks?

↓

Can I recover?

## Memory Trick

P D M A R

P

Prevent

D

Detect

M

Mitigate

A

Analyze

R

Respond

Remember

"Please Don't Make Attackers Relax."

## Another Memory Trick

CITY

Homes

↓

Employee Devices

Buildings

↓

Servers

Post Office

↓

Mail Server

Gate

↓

Firewall

Outside

↓

Internet

## Quick Revision

Blue Team

↓

Protect Systems

--------------------------------

Visibility

↓

Know what's happening

--------------------------------

Scope

↓

Know what belongs to you

--------------------------------

Firewall

↓

Blocks unwanted traffic

--------------------------------

Logs

↓

Record events

--------------------------------

Alerts

↓

Notify suspicious activity

--------------------------------

Detection

↓

Find attacks

--------------------------------

Mitigation

↓

Reduce damage

--------------------------------

Analysis

↓

Understand attack

--------------------------------

Response

↓

Recover systems

## Interview Questions

Q1.

What is Defensive Security?

Answer

Protecting systems by preventing,
detecting and responding to attacks.

------------------------------------------------------------

Q2.

Who is the Blue Team?

Answer

Cybersecurity professionals responsible
for protecting systems and responding to attacks.

------------------------------------------------------------

Q3.

Why is Visibility important?

Answer

Because defenders cannot protect
systems they cannot see or monitor.

------------------------------------------------------------

Q4.

Difference between Prevention and Detection?

Prevention

Stops attacks before they happen.

Detection

Finds attacks after they begin.

------------------------------------------------------------

Q5.

What is Scope?

Answer

The systems and assets
you are responsible for protecting.

## CHEAT SHEET

Blue Team

↓

Protection

Firewall

↓

Traffic Control

Logs

↓

Evidence

Alerts

↓

Warnings

Detection

↓

Finding Threats

Mitigation

↓

Reducing Damage

Analysis

↓

Understanding Incident

Response

↓

Recovery

CIA

↓

Confidentiality

Integrity

Availability

## TASK 2 (Remaining) — Mapping Your Environment

Once you understand what systems exist,

your next job is to

MAP THEM.

Knowing where everything lives helps you

✔ Monitor correctly
✔ Protect correctly
✔ Respond faster
✔ Reduce attack surface

------------------------------------------------------------

Imagine a Company Network

```text
                     Internet
                         │
                         │
                   +-------------+
                   | Firewall    |
                   +-------------+
                         │
        ------------------------------------
        │                │                │
        ▼                ▼                ▼
```

   Web Server      Mail Server      Employee PCs

```text
        │
        ▼
```

     Database

------------------------------------------------------------

Every system has

✔ Purpose

✔ Users

✔ Risks

✔ Security Controls

## Infrastructure Mapping

Employee Devices

Purpose

Where employees work.

Examples

Laptop

Desktop

Mobile

Risks

Malware

Phishing

USB attacks

Weak passwords

------------------------------------------------------------

Web Server

Purpose

Hosts websites and applications.

Risks

SQL Injection

XSS

File Upload

Remote Code Execution

------------------------------------------------------------

Mail Server

Purpose

Send and receive emails.

Risks

Spam

Phishing

Malicious Attachments

Business Email Compromise

------------------------------------------------------------

Firewall

Purpose

Controls incoming and outgoing traffic.

Acts like

Security Guard

Risks

Wrong Rules

Open Ports

Misconfiguration

------------------------------------------------------------

Internet

Everything outside the organization.

Contains

Users

Hackers

Bots

Attackers

Malicious Traffic

## Why Mapping Matters

Without Mapping

×

Unknown Assets

×

Forgotten Servers

×

Hidden Services

×

Poor Visibility

×

Security Gaps

------------------------------------------------------------

With Mapping

✔ Better Monitoring

✔ Faster Incident Response

✔ Easier Asset Management

✔ Better Risk Assessment

## TASK 3 — Defending Your Environment

Now that you know

WHAT exists

You must learn

HOW to protect it.

## The Defender Mindset

A Defender never assumes

"It won't happen."

Instead they ask

"What if?"

"What can go wrong?"

"How would an attacker attack?"

------------------------------------------------------------

Think Like This

Attacker

↓

Finds Weakness

↓

Gets Access

↓

Moves Laterally

↓

Steals Data

↓

Controls Systems

------------------------------------------------------------

Defender

↓

Identify Assets

↓

Protect Assets

↓

Monitor Assets

↓

Detect Attack

↓

Contain Attack

↓

Recover Systems

## Attack Chain

Example

Employee opens malicious email

↓

Malware installed

↓

Credentials stolen

↓

Attacker accesses Mail Server

↓

Attacker reaches Database

↓

Sensitive Data Stolen

------------------------------------------------------------

Defender Goal

Break this chain

as early as possible.

## Key Defender Principles

1.

Threat Anticipation

Ask

"What if?"

"What could happen?"

Prepare before attacks occur.

------------------------------------------------------------

2.

Attack Awareness

Understand

How attacks happen.

Study

Attack Paths

Kill Chains

MITRE ATT&CK

Common Exploits

------------------------------------------------------------

3.

Risk Prioritization

Every system is NOT equally important.

Protect

High Value Assets

First.

Examples

Database

Domain Controller

Authentication Server

------------------------------------------------------------

4.

Continuous Adaptation

Security is never finished.

New

Threats

Malware

Exploits

Techniques

appear every day.

Keep Updating

Software

Rules

Monitoring

Training

## Available Defenses

Employee Devices

Possible Problems

↓

Malware

Unsafe Downloads

Fake Software

Protection

↓

Antivirus

EDR

Regular Updates

Application Control

------------------------------------------------------------

Web Server

Possible Problems

↓

Website Attacks

SQL Injection

Brute Force

Protection

↓

HTTPS

Firewall

Input Validation

Patching

Secure Coding

------------------------------------------------------------

Mail Server

Possible Problems

↓

Spam

Phishing

Malicious Attachments

Protection

↓

Spam Filter

Attachment Scanning

Email Security

DMARC

SPF

DKIM

------------------------------------------------------------

Firewall

Possible Problems

↓

Unauthorized Access

Open Ports

Scanning

Protection

↓

Firewall Rules

IP Blocking

Network Segmentation

ACL

------------------------------------------------------------

Internet

Possible Problems

↓

External Threats

Bots

Hackers

Malware

Protection

↓

Traffic Monitoring

IDS

IPS

Rate Limiting

Threat Intelligence

## Layered Security

Never rely on

ONE SECURITY TOOL.

Use Multiple Layers.

Example

Internet

↓

Firewall

↓

IDS

↓

Web Server

↓

Authentication

↓

Database Encryption

↓

Backups

If one layer fails,

another still protects you.

This concept is called

Defense in Depth

## Risk Prioritization

Not every asset

has equal value.

Highest Priority

↓

Domain Controller

Database

Authentication Server

Payment Server

------------------------------------------------------------

Medium Priority

↓

File Server

Application Server

Mail Server

------------------------------------------------------------

Lower Priority

↓

Test Systems

Demo Servers

## Defender Workflow

Know Assets

↓

Find Risks

↓

Apply Controls

↓

Monitor

↓

Detect

↓

Respond

↓

Recover

↓

Improve

## Memory Tricks

Think

CITY

Homes

↓

Employee Devices

Stores

↓

Web Server

Post Office

↓

Mail Server

Gate

↓

Firewall

Outside World

↓

Internet

## Another Memory Trick

Think

P D M A R

Prevent

Detect

Mitigate

Analyze

Respond

## Interview Questions

Q1.

What is Defense in Depth?

Answer

Using multiple security layers so that
if one control fails, another still protects the system.

------------------------------------------------------------

Q2.

Why should defenders prioritize risks?

Answer

Because limited resources should protect
the most valuable systems first.

------------------------------------------------------------

Q3.

What is Threat Anticipation?

Answer

Thinking ahead about how attackers
may compromise systems before they attack.

------------------------------------------------------------

Q4.

Why is Continuous Adaptation important?

Answer

Because attackers constantly develop
new techniques and vulnerabilities.

------------------------------------------------------------

Q5.

Why should organizations map infrastructure?

Answer

To understand what assets exist,
where they are,
and how to protect them effectively.

## CHEAT SHEET

Threat Anticipation

↓

Prepare Early

Attack Awareness

↓

Know Attacker Methods

Risk Prioritization

↓

Protect Critical Assets

Continuous Adaptation

↓

Keep Improving

Defense in Depth

↓

Multiple Security Layers

Firewall

↓

Traffic Control

Antivirus

↓

Stops Malware

Spam Filter

↓

Stops Phishing

Monitoring

↓

Find Suspicious Activity

## TASK 4 — Where To Go From Here

Congratulations!

You now understand

✔ Defensive Security

✔ Visibility

✔ Infrastructure

✔ Security Controls

✔ Risk Prioritization

✔ Defender Mindset

✔ Protection Strategies

This room builds the foundation of

Blue Team Security.

## KEY TERMINOLOGY

Blue Team

↓

Defenders

Protect systems.

------------------------------------------------------------

Client Infrastructure

↓

Everything that belongs
to the organization.

Examples

Servers

Network

Applications

Employees

Database

------------------------------------------------------------

Visibility

↓

Being able to see

Logs

Events

Traffic

Alerts

System Activity

------------------------------------------------------------

Threat

↓

Anything capable of causing damage.

Examples

Hackers

Malware

Phishing

Ransomware

Insider Threat

------------------------------------------------------------

Prevention

↓

Stopping attacks

BEFORE

they happen.

------------------------------------------------------------

Detection

↓

Finding attacks

as early as possible.

------------------------------------------------------------

Mitigation

↓

Reducing damage

after an attack.

------------------------------------------------------------

Risk

↓

Likelihood

×

Impact

## WHAT DID YOU LEARN?

First

Understand your systems.

↓

Map your infrastructure.

↓

Identify valuable assets.

↓

Understand attackers.

↓

Apply protections.

↓

Monitor systems.

↓

Detect attacks.

↓

Respond quickly.

↓

Recover.

↓

Improve security.

## COMPLETE SECURITY FLOW

Assets

↓

Visibility

↓

Monitoring

↓

Detection

↓

Alert

↓

Investigation

↓

Containment

↓

Recovery

↓

Lessons Learned

↓

Improved Security

## COMPLETE DEFENDER WORKFLOW

Know

↓

What exists

↓

Understand risks

↓

Protect assets

↓

Monitor continuously

↓

Detect attacks

↓

Respond quickly

↓

Recover

↓

Improve

## OFFENSIVE vs DEFENSIVE

OFFENSIVE SECURITY

Goal

Find weaknesses.

Questions

How can I break in?

Can I exploit this?

Can I escalate privileges?

Can I steal data?

Examples

Pen Testing

Red Team

Bug Bounty

Exploit Development

------------------------------------------------------------

DEFENSIVE SECURITY

Goal

Protect systems.

Questions

Can I stop attacks?

Can I detect attacks?

Can I recover?

Can I improve?

Examples

SOC

Blue Team

Incident Response

Threat Hunting

Monitoring

## RED TEAM vs BLUE TEAM

Red Team

Think Like

Attacker

Goal

Break Systems

Uses

Enumeration

Scanning

Exploitation

Privilege Escalation

------------------------------------------------------------

Blue Team

Think Like

Defender

Goal

Protect Systems

Uses

Logs

SIEM

Firewall

Antivirus

Monitoring

Incident Response

## ATTACK LIFECYCLE

Attacker

↓

Reconnaissance

↓

Scanning

↓

Finding Vulnerability

↓

Exploitation

↓

Persistence

↓

Privilege Escalation

↓

Lateral Movement

↓

Data Theft

------------------------------------------------------------

Defender

↓

Visibility

↓

Monitoring

↓

Alert

↓

Detection

↓

Containment

↓

Recovery

↓

Hardening

## COMMON SECURITY CONTROLS

Firewall

↓

Blocks unauthorized traffic.

------------------------------------------------------------

Antivirus

↓

Detects malware.

------------------------------------------------------------

IDS

↓

Detects suspicious traffic.

------------------------------------------------------------

IPS

↓

Blocks malicious traffic.

------------------------------------------------------------

SIEM

↓

Collects and analyzes logs.

------------------------------------------------------------

EDR

↓

Monitors endpoint activity.

------------------------------------------------------------

MFA

↓

Adds another authentication factor.

------------------------------------------------------------

Patch Management

↓

Fixes vulnerabilities.

## CORE PRINCIPLES

Visibility

↓

Know what is happening.

------------------------------------------------------------

Prevention

↓

Stop attacks.

------------------------------------------------------------

Detection

↓

Find attacks.

------------------------------------------------------------

Mitigation

↓

Reduce damage.

------------------------------------------------------------

Recovery

↓

Restore operations.

------------------------------------------------------------

Continuous Improvement

↓

Learn from every incident.

## MEMORY TRICKS

Blue Team

Protect

Monitor

Respond

Recover

------------------------------------------------------------

PDMAR

P

Prevent

D

Detect

M

Mitigate

A

Analyze

R

Respond

------------------------------------------------------------

Think

CITY

Homes

↓

Employee Devices

Buildings

↓

Servers

Post Office

↓

Mail Server

Gate

↓

Firewall

Outside

↓

Internet

## INTERVIEW QUESTIONS

Q1

What is Defensive Security?

Answer

Protecting systems by preventing,
detecting and responding to attacks.

------------------------------------------------------------

Q2

Who is Blue Team?

Answer

Security professionals responsible
for protecting infrastructure.

------------------------------------------------------------

Q3

What is Visibility?

Answer

The ability to monitor systems,
logs, events and traffic.

------------------------------------------------------------

Q4

Difference between Prevention and Detection?

Prevention

Stops attacks.

Detection

Finds attacks.

------------------------------------------------------------

Q5

What is Mitigation?

Answer

Reducing damage during
or after an attack.

------------------------------------------------------------

Q6

What is Risk Prioritization?

Answer

Protecting the most valuable
assets first.

------------------------------------------------------------

Q7

What is Defense in Depth?

Answer

Using multiple security layers.

## CHEAT SHEET

Blue Team

↓

Protect

Firewall

↓

Traffic Filtering

Logs

↓

Evidence

Alerts

↓

Warnings

Detection

↓

Find Threats

Mitigation

↓

Reduce Damage

Analysis

↓

Understand Attack

Recovery

↓

Restore Systems

## ROOM ANSWERS

Task 1

No answer required

------------------------------------------------------------

Task 2

Q1

What is the goal when a defender puts
security controls in place before any
damage occurs?

Answer

Prevention

------------------------------------------------------------

Q2

What process involves reviewing logs
and evidence to understand how an
incident happened?

Answer

Analysis

------------------------------------------------------------

Q3

Flag

THM{mapping_infrastructure!}

------------------------------------------------------------

Task 3

Q1

Which defender principle focuses on
identifying the most critical systems?

Answer

Risk Prioritization

------------------------------------------------------------

Q2

Flag

THM{defensive_techniques!}

------------------------------------------------------------

Task 4

No answer required

## 30-SECOND REVISION

Blue Team

↓

Protect

Know Assets

↓

Visibility

↓

Monitoring

↓

Detection

↓

Response

↓

Recovery

↓

Improvement

## NEXT RECOMMENDED ROOMS

✔ Cyber Security 101

✔ SOC Level 1

✔ Jr Penetration Tester

✔ Introduction to SIEM

✔ Intro to IDS

✔ Linux Fundamentals

✔ Windows Fundamentals

✔ Network Fundamentals

## 🏁 END OF ROOM
