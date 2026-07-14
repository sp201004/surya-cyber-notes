## Contents

- [Why Python for Cybersecurity?](#why-python-for-cybersecurity)
- [How Python Code Executes](#how-python-code-executes)
- [Data Types — The Foundation of All Python Code](#data-types--the-foundation-of-all-python-code)
- [Variables — Named Memory Containers](#variables--named-memory-containers)
- [Conditional Statements — Decision Logic](#conditional-statements--decision-logic)
- [Loops — Automating Repetition](#loops--automating-repetition)
- [Quick Revision](#quick-revision)

## Why Python for Cybersecurity?

> **KEY CONCEPT: The Scale Problem**
> Security analysts must process MILLIONS of log entries, IP addresses, and events daily.
> Manually reading and analyzing this data is mathematically impossible.
> Python automation makes it feasible -- a 3-line script can filter 10M log lines in seconds.

| **Use Case** | **What Python Automates** | **Without Python** |
| --- | --- | --- |
| **Log Parsing** | Filter megabytes of event logs for IoCs (malicious IPs, failed logins, unusual times) in seconds. | Analyst manually reads thousands of lines -- takes hours. Attackers have time to cause damage. |
| **Access Control** | Script that reads a user list, checks permissions, and revokes unauthorized access automatically. | IT manually reviews each user account. Outdated accounts stay active long after employees leave. |
| **Network Scanning** | Script that pings every IP in a range, logs open ports, flags unexpected services. | Manual port scanning is slow and inconsistent. Threats on unexpected ports go undetected. |
| **Malware Analysis** | Automate extraction of strings, hashes, and network IOCs from suspicious binaries. | Forensic analysis takes days manually. Scripts do it in minutes in an isolated sandbox. |

## How Python Code Executes

> **HOW PYTHON EXECUTES — Interpreter Model**

```
YOUR PYTHON CODE (.py file)       INTERPRETER       MACHINE OUTPUT

  device_id = 'h32rb17'  ---------> Python reads     ---------> CPU executes
  print(device_id)                  line by line                binary instructions
  if len(device_id) > 5:            Translates to               Results printed
      print('Long ID')              machine code                to terminal

  The INTERPRETER translates human-readable Python into binary (0s and 1s) at runtime.
  Translation happens LINE BY LINE (not all at once like compiled languages).
  If any line has a SYNTAX ERROR, the interpreter stops there and shows an error.

  SYNTAX = The strict grammar rules of Python.
  Breaking syntax rules = interpreter crashes immediately with SyntaxError.
```

## Data Types — The Foundation of All Python Code

| **Data Type** | **Keyword** | **What It Stores** | **Example Values** | **Security Use Case** |
| --- | --- | --- | --- | --- |
| **String** | str | Text characters. Always in quotes. | '192.168.1.1'  'admin'  'ERROR' | IP addresses, usernames, log entries, file paths. |
| **Integer** | int | Whole numbers. No quotes. No decimal. | 443  0  -5  65535 | Port numbers, login attempt counts, status codes. |
| **Float** | float | Decimal numbers. No quotes. | 3.14  0.005  99.9 | Risk scores, percentage calculations, thresholds. |
| **Boolean** | bool | Exactly True or False. Case-sensitive. | True  False | Account locked status, permission flags, scan results. |
| **List** | list | Ordered, mutable collection. Square brackets. | ['user1','user2','user3'] | IP blocklists, approved user lists, log entries. |
| **Dictionary** | dict | Key-value pairs. Curly braces. | {'user':'admin','role':'superuser'} | User profiles, device attributes, config settings. |
| **Tuple** | tuple | Ordered, IMMUTABLE collection. Round brackets. | (255, 255, 255, 0) | Fixed network masks, constant configurations. |
| **Set** | set | Unordered, UNIQUE values only. Curly braces. |   {80, 443, 8080} | Port sets (auto-deduplicates), unique IP collections. |

> **DATA TYPES — Code Examples**

```python
# String -- text data (always in quotes)
device_id = 'h32rb17'
ip_address = '192.168.1.100'

# Integer -- whole numbers
port = 443
failed_attempts = 5

# Float -- decimal numbers
risk_score = 8.7

# Boolean -- True or False (capital T and F!)
is_locked = True
is_admin = False

# List -- mutable ordered collection
blocklist = ['192.168.1.50', '10.0.0.99', '172.16.0.1']

# Dictionary -- key:value pairs
user = {'username': 'bmoreno', 'role': 'analyst', 'active': True}
print(user['username'])  # Output: bmoreno

# Tuple -- immutable (cannot change after creation)
subnet_mask = (255, 255, 255, 0)

# Set -- unique values only (auto-removes duplicates)
allowed_ports = {80, 443, 8080, 443}  # 443 appears twice
print(allowed_ports)  # Output: {80, 8080, 443}  (duplicate removed)
```

## Variables — Named Memory Containers

> **RULE: Variable Rules (PEP 8 Style Guide)**
> * Use snake_case: failed_login_attempts (NOT failedLoginAttempts)
> * Only letters, numbers, underscores. Cannot start with a number.
> * **Case-sensitive:** 'Time' and 'time' are DIFFERENT variables.
> * **Do NOT use reserved keywords:** True, False, if, for, while, return, print...
> * **Be descriptive:** 'login_count' is better than 'lc' or 'x'.

> **VARIABLES — Assignment, Reassignment, Type Casting**

```python
# ASSIGNMENT -- = operator stores data in named container
device_id = 'h32rb17'         # Assign string to variable
failed_count = 0              # Assign integer

# REASSIGNMENT -- completely overwrites previous value
device_id = 'n73ab07'         # Now device_id holds new value
failed_count = failed_count + 1  # Increment by 1 (now = 1)
failed_count += 1             # Same thing (shorthand)

# CHECK TYPE of any variable
print(type(device_id))        # Output: <class 'str'>
print(type(failed_count))     # Output: <class 'int'>

# TYPE CASTING -- convert between types
port_str = '443'              # This is a string
port_int = int(port_str)      # Convert to integer for math
port_back = str(port_int)     # Convert back to string
```

## Conditional Statements — Decision Logic

| **Operator** | **Meaning** | **Example** | **Evaluates To** |
| --- | --- | --- | --- |
| **==** | Equal to | status_code == 200 | True if status_code is 200 |
| **!=** | Not equal to | username != 'guest' | True if not 'guest' |
| **>** | Greater than | attempts > 5 | True if attempts is 6 or more |
| **<** | Less than | risk_score < 3.0 | True if below 3.0 |
| **>=** | Greater than or equal | port >= 1024 | True if 1024 or above |
| **<=** | Less than or equal | ttl <= 0 | True if 0 or negative |
| **and** | BOTH must be True | attempts > 3 and country != 'US' | True only if BOTH conditions True |
| **or** | EITHER must be True | port == 80 or port == 443 | True if port is 80 OR 443 |
| **not** | Inverts result | not account_active | True if account_active is False |
| **in** | Value exists in sequence | ip in blocklist | True if ip is in the blocklist |

> **CONDITIONAL STATEMENTS — if / elif / else with Security Examples**

```python
# Basic if / elif / else structure
# Rule: Header ends with COLON. Body is INDENTED (4 spaces).

status_code = 403

if status_code == 200:
    print('Connection successful.')         # Runs ONLY if True
elif status_code == 403:
    print('Alert: Forbidden access attempt.')  # Runs if first False AND this True
else:
    print('Unknown network event.')         # Runs if ALL above False

# Real security example: check login attempts
attempts = 6
max_attempts = 5
country = 'RU'

if attempts > max_attempts and country != 'US':
    print('ALERT: Suspicious login from foreign IP. Locking account.')
elif attempts > max_attempts:
    print('WARNING: Too many attempts. Temporary lockout.')
else:
    print('Login within normal parameters.')

# 'in' operator -- check membership in a list
blocklist = ['192.168.50.0', '10.0.0.99']
incoming_ip = '10.0.0.99'
if incoming_ip in blocklist:
    print('BLOCKED: IP is on blocklist.')
```

## Loops — Automating Repetition

### for Loop — Iterate Through a Sequence

> **for LOOP — Syntax and Examples**

```python
# Syntax: for [loop_variable] in [sequence]:
#         (indented body runs once per item)

# Example 1: Iterate through a list of usernames
for username in ['admin', 'root', 'guest', 'analyst']:
    print('Auditing account:', username)
# Output: Auditing account: admin
#         Auditing account: root  ... etc.

# Example 2: range(stop) -- 0 up to (but NOT including) stop
for i in range(5):         # Generates 0, 1, 2, 3, 4
    print('Ping attempt:', i)

# Example 3: range(start, stop, step)
for port in range(0, 1024, 2):   # Even numbers 0-1022
    print('Scanning port:', port)

# range() STOP IS EXCLUSIVE -- range(5) gives 0,1,2,3,4 (NOT 5)
# range(1, 6) gives 1,2,3,4,5  (NOT 6)
```

### while Loop — Iterate Based on Condition

```python
while LOOP — Syntax, Increment Rule, Security Example
# Syntax: while [condition]:
#         (runs as long as condition is True)
# WARNING: You MUST update the loop variable inside or you get an INFINITE LOOP

attempts = 1               # Step 1: Initialize OUTSIDE the loop

while attempts <= 3:       # Step 2: Condition (stops when False)
    print('Warning attempt:', attempts, 'of 3')
    attempts += 1          # Step 3: INCREMENT (MANDATORY -- prevents infinite loop!)

# Output: Warning attempt: 1 of 3
#         Warning attempt: 2 of 3
#         Warning attempt: 3 of 3

# Real security example: lock account after N failed logins
max_attempts = 5
failed = 0
account_locked = False

while failed < max_attempts and not account_locked:
    # (simulate login check here)
    failed += 1
    if failed >= max_attempts:
        account_locked = True
        print('Account locked after', failed, 'failed attempts.')
```

### break and continue — Loop Flow Controllers

> **break AND continue — Loop Flow Controllers**

```python
# break -- IMMEDIATELY exits the entire loop
blocklist = ['192.168.1.50', '10.0.0.99', '172.16.0.1']
target = '10.0.0.99'

for ip in blocklist:
    if ip == target:
        print('FOUND:', ip, '-- Blocking immediately.')
        break               # Stop looping -- no need to check rest

# continue -- SKIP this iteration and go to the NEXT one
log_entries = ['INFO login', 'ERROR failed', 'INFO logout', 'ERROR timeout']

for entry in log_entries:
    if 'INFO' in entry:
        continue            # Skip INFO lines -- only want ERRORs
    print('Investigating:', entry)
# Output: Investigating: ERROR failed
#         Investigating: ERROR timeout
```

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What is automation?** | Using technology to reduce human and manual effort for common, repetitive tasks. Essential for processing millions of security logs daily. |
| **What does the Python interpreter do?** | Translates human-readable Python code into binary machine instructions, LINE BY LINE at runtime. |
| **String vs. Integer -- key difference?** | String: text in quotes, can contain numbers but CANNOT do math. Integer: whole number, NO quotes, can do math. '443' != 443. |
| **What is snake_case?** | Variable naming convention using lowercase letters and underscores. Example: failed_login_attempts. PEP 8 requires this for Python. |
| **What is 'in' operator?** | Checks if a value EXISTS inside a list, string, or other sequence. Returns True/False. Example: ip in blocklist. |
| **for vs. while loop?** | for: iterates a KNOWN sequence (list, range). while: iterates based on a BOOLEAN CONDITION. Use for when you know how many iterations, while when you don't. |
| **What is range(0,5,2)?** | Generates sequence: 0, 2, 4. Start=0 (inclusive), Stop=5 (EXCLUSIVE), Step=2 (increment). Stop is NEVER included in the output. |
| **break vs. continue?** | break: EXITS the entire loop immediately. continue: SKIPS the current iteration only, loop continues with the next item. |
