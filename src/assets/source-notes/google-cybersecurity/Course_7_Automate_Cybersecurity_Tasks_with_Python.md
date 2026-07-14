**GOOGLE CYBERSECURITY CERTIFICATE**

**Course 7**

**Automate Cybersecurity Tasks**

**with Python**

Study Notes  |  Modules 1 – 4

Deep Understanding Edition | With Code Examples, Diagrams & Real-World Security Scripts

| **Module** | **Title** | **Topics Covered** |
| --- | --- | --- |
| Module 1 | Introduction to Python | Automation · Data Types · Variables · Conditionals · for/while Loops · break/continue |
| Module 2 | Write Effective Python Code | Functions · Parameters vs Arguments · return · Scope · Libraries · PEP 8 Style |
| Module 3 | Data Structures & Algorithms | Strings · Indexing · Slicing · Lists · Mutability · Regex · re.findall() |
| Module 4 | Python in Practice | File I/O · open() · read/write/append · .split() · .join() · Debugging · IP Allow-List |

**MODULE 1**

# Introduction to Python

## 1.1 Why Python for Cybersecurity?

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

## 1.2 How Python Code Executes

> **HOW PYTHON EXECUTES — Interpreter Model**  
> **YOUR PYTHON CODE (.py file)       INTERPRETER       MACHINE OUTPUT**

```
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

## 1.3 Data Types — The Foundation of All Python Code

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

## 1.4 Variables — Named Memory Containers

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

## 1.5 Conditional Statements — Decision Logic

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

## 1.6 Loops — Automating Repetition

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

## 1.7 Module 1 Quick Review

| **Question** | **Answer** |
| --- | --- |
| **What is automation?** | Using technology to reduce human and manual effort for common, repetitive tasks. Essential for processing millions of security logs daily. |
| **What does the Python interpreter do?** | Translates human-readable Python code into binary machine instructions, LINE BY LINE at runtime. |
| **String vs. Integer -- key difference?** | String: text in quotes, can contain numbers but CANNOT do math. Integer: whole number, NO quotes, can do math. '443' != 443. |
| **What is** **snake_case?** | Variable naming convention using lowercase letters and underscores. Example: failed_login_attempts. PEP 8 requires this for Python. |
| **What is 'in' operator?** | Checks if a value EXISTS inside a list, string, or other sequence. Returns True/False. Example: ip in blocklist. |
| **for vs. while loop?** | for: iterates a KNOWN sequence (list, range). while: iterates based on a BOOLEAN CONDITION. Use for when you know how many iterations, while when you don't. |
| **What is** **range(0,5,2)?** | Generates sequence: 0, 2, 4. Start=0 (inclusive), Stop=5 (EXCLUSIVE), Step=2 (increment). Stop is NEVER included in the output. |
| **break vs. continue?** | break: EXITS the entire loop immediately. continue: SKIPS the current iteration only, loop continues with the next item. |

**MODULE 2**

# Write Effective Python Code

## 2.1 Defining and Calling Functions

> **KEY CONCEPT: Why Functions?**
> **Without functions:** If you need the same logic in 10 different places, you copy-paste 10 times.
> **With functions:** Define the logic ONCE. Call it anywhere. Change it in ONE place and it updates everywhere.
> **Functions** = the foundation of maintainable, reusable security automation scripts.

> **DEFINING AND CALLING FUNCTIONS**

```python
# DEFINING a function (creates the blueprint, does NOT run yet)
# Syntax: def function_name(parameters):   <-- colon required
#             (indented body -- 4 spaces)   <-- body must be indented

def greet_analyst(name):
    print('Welcome to the SOC,', name)

# CALLING a function (executes the blueprint with actual data)
greet_analyst('Alice')      # Output: Welcome to the SOC, Alice
greet_analyst('Bob')        # Output: Welcome to the SOC, Bob

# Security example: check if login count is within limits
def check_login_limit(max_attempts, total_attempts):
    remaining = max_attempts - total_attempts
    print('Remaining attempts:', remaining)

check_login_limit(5, 3)     # Output: Remaining attempts: 2
check_login_limit(5, 5)     # Output: Remaining attempts: 0
```

## 2.2 Parameters vs. Arguments

> **NOTE**
> **PARAMETER:** A placeholder variable in the function DEFINITION. Like a labeled empty slot.
> **ARGUMENT:** The actual REAL DATA passed into the function when it is CALLED.
> Python maps arguments to parameters by POSITION (left to right).

> **PARAMETERS vs. ARGUMENTS — Positional Mapping**  
> **DEFINITION (Parameters = placeholders):**  
> **def remaining_login_attempts(maximum_attempts, total_attempts):**  
> **|                 |**  
> **Param 1           Param 2**  
> **CALL (Arguments = real data):**  
> **remaining_login_attempts(5, 3)**  
> **|  |**  
> **Arg1: 5 maps to maximum_attempts**  
> **Arg2: 3 maps to total_attempts**  
> **ORDER MATTERS: Arguments are mapped by POSITION.**  
> **remaining_login_attempts(3, 5) would give a different result!**  
> **3 -> maximum_attempts, 5 -> total_attempts  (5 - 3 = 2, not 5 - 3 = 2 ... wait)**  
> **Actually: 5(max) - 3(used) = 2 remaining vs 3(max) - 5(used) = -2 (over limit)**

```

```

## 2.3 The return Statement

> **RULE: What return Does**
> return sends data BACK OUT of a function to the code that called it.
> When Python hits return, it IMMEDIATELY exits the function -- no more lines run.
> The returned value can be stored in a variable for further processing.
> RULE: Use 'return x' NOT 'return(x)' -- return is a keyword, not a function.

```python
return STATEMENT — Exit and Send Data Back
# Function that RETURNS a calculated value
def remaining_login_attempts(maximum_attempts, total_attempts):
    return maximum_attempts - total_attempts
    print('This NEVER runs -- return exits immediately!')  # Dead code!

# CAPTURE the returned value in a variable
remaining = remaining_login_attempts(5, 5)

# Now USE the returned value in conditional logic
if remaining <= 0:
    print('Account locked.')     # Output: Account locked.

# WITHOUT return: function output is lost
def bad_function(x, y):
    result = x + y              # Calculated but NEVER returned
    # Nothing is returned -- caller gets 'None'

# WITH return: caller gets the result
def good_function(x, y):
    return x + y               # Caller receives the sum

total = good_function(10, 5)   # total = 15
```

## 2.4 Variable Scope — Global vs. Local

> **KEY CONCEPT: Scope = Where a Variable Exists and Can Be Accessed**
> **GLOBAL variable:** Defined OUTSIDE all functions. Available EVERYWHERE in the script.
> **LOCAL variable**: Defined INSIDE a function. ONLY exists inside that function. DESTROYED when function ends.
> Calling a local variable from outside its function = NameError crash.

> **GLOBAL vs. LOCAL SCOPE — With Shadowing Example**

```python
# GLOBAL variable -- defined outside all functions
device_id = '7ad2130bd'        # Global: accessible everywhere

def log_audit():
    print('Auditing:', device_id)  # Can READ global variable

log_audit()   # Output: Auditing: 7ad2130bd

# LOCAL variable -- defined inside a function
def check_user(name):
    greeting = 'Welcome ' + name   # greeting is LOCAL
    return greeting

result = check_user('Alice')        # greeting is returned before being destroyed
# print(greeting)   # CRASH: NameError -- greeting no longer exists!

# NAMESPACE MASKING (Shadowing) -- dangerous bug source!
username = 'elarson'               # Global variable
print('1:', username)              # Output: 1: elarson

def greet():
    username = 'bmoreno'           # NEW LOCAL variable (different from global!)
    print('2:', username)          # Output: 2: bmoreno (local)

greet()
print('3:', username)              # Output: 3: elarson (global UNCHANGED)
# Key insight: same name, two completely separate variables in different scopes
```

## 2.5 Built-in Functions Reference

| **Function** | **What It Does** | **Security Example** | **Output** |
| --- | --- | --- | --- |
| **print ()** | Outputs to screen. Accepts any number of mixed types. | print('Failed login from:', ip, 'at port:', port) | Failed login from: 10.0.0.5 at port: 22 |
| **type ()** | Returns the data type of input. Accepts EXACTLY 1 argument. | print(type(443)) | <class 'int'> |
| **str ()** | Converts input to string data type. | str(443) converts port number to '443' for string operations. | '443' |
| **int ()** | Converts string/float to integer. | int('403') converts HTTP status string to integer for comparison. | 403 |
| **len** **()** | Returns number of elements in string/list. | len('192.168.1.1') validates IPv4 length (max 15 chars). | 11 |
| **max ()** | Returns largest value. Open parameter limit. | max(3, 9, 6) finds highest risk score. | 9 |
| **min ()** | Returns smallest value. Open parameter limit. | min(3, 9, 6) finds lowest priority item. | 3 |
| **sorted ()** | Returns sorted list. Alphabetical or numeric. | sorted(['tshah','bmoreno','elarson']) sorts analyst names. | ['bmoreno','elarson','tshah'] |
| **range(s,e,step)** | Generates integer sequence. Stop is EXCLUSIVE. | range(1, 6) generates 1,2,3,4,5 for loop iteration. | 1,2,3,4,5 |

> **BUILT-IN FUNCTIONS — Nesting and Security Examples**

```python
# Function NESTING -- innermost executes first
print(type('Hello'))           # Step 1: type('Hello') -> <class 'str'>
                               # Step 2: print(<class 'str'>) -> outputs it
# Output: <class 'str'>

# sorted() with security data
usernames = ['tshah', 'bmoreno', 'elarson']
print(sorted(usernames))
# Output: ['bmoreno', 'elarson', 'tshah']   (alphabetical)

risk_scores = [8.5, 3.2, 9.9, 1.0]
print(sorted(risk_scores))
# Output: [1.0, 3.2, 8.5, 9.9]             (lowest to highest)

# max() and min() with multiple variables
a, b, c = 3, 9, 6
print(max(a, b, c))  # Output: 9
print(min(a, b, c))  # Output: 3
```

## 2.6 Importing Libraries & Modules

| **Module** | **Import Syntax** | **What It Provides** | **Security Use** |
| --- | --- | --- | --- |
| **re** | import re | Regular expressions for pattern matching. | Extract IPs, emails, hashes from log files. Critical for log parsing. |
| **csv** | import csv | Read and write comma-separated value files. | Parse security logs exported as CSV from SIEMs and firewalls. |
| **os** | import os | Interact with the operating system filesystem. | List files in a directory, check file permissions, navigate paths. |
| **glob** | import glob | Find files matching wildcard patterns. | Find all *.log files in a directory for batch processing. |
| **datetime** | from datetime import datetime | Date and time operations. | Normalize timestamps across logs from different timezones. |
| **statistics** | from statistics import mean, median | Statistical calculations. | Calculate average login attempts, median response times. |

> **IMPORTING MODULES — Global vs. Targeted Import**

```python
# Full module import -- access via module.function()
import statistics
avg = statistics.mean([3, 5, 7, 9])
print(avg)   # Output: 6.0

# Targeted import -- access function directly without prefix
from statistics import mean, median
print(mean([3, 5, 7, 9]))    # Output: 6.0
print(median([3, 5, 7, 9]))  # Output: 6.0

# Import re for log parsing
import re
log = 'Failed login from 192.168.1.50 at 02:15:33'
# Find all IPs in the log
ips = re.findall(r'd+.d+.d+.d+', log)
print(ips)   # Output: ['192.168.1.50']
```

## 2.7 PEP 8 Style Guide — Writing Clean Code

> **NOTE: Why PEP 8 Matters**
> Code is READ far more often than it is written.
> Security scripts are shared across teams, reviewed during audits, and maintained for years.
> PEP 8 ensures ALL Python developers read each other's code with minimal friction.

| **PEP 8 Rule** | **Standard** | **Bad Example** | **Good Example** |
| --- | --- | --- | --- |
| **Variable naming** | snake_case (lowercase + underscores) | failedLoginAttempts | failed_login_attempts |
| **Indentation** | Exactly 4 spaces per level. NEVER tabs. | 2 spaces or 1 tab | 4 spaces consistently |
| **Line length** | Max 79 characters per line. | One very long line with all logic... | Break into multiple readable lines |
| **Comments** | Explain WHY, not WHAT. Above the code. | # Print i | # Skip INFO entries -- only investigate ERRORs |
| **Blank lines** | 2 blank lines between functions. 1 line between logical blocks. | Functions jammed together | Two blank lines between each function |
| **Docstrings** | Triple quotes for multi-line function docs. | # this function does stuff | """Checks if IP is on blocklist. Returns True/False.""" |

> **PEP 8 COMPLIANT CODE — Complete Example**  
> **"""**  
> **Example of well-formatted, PEP 8 compliant security function.**  
> **This function checks if a login attempt exceeds the allowed limit**  
> **and returns True if the account should be locked.**  
> **"""**

```python
# ---- Global Constants (UPPERCASE for constants) ----
MAX_LOGIN_ATTEMPTS = 5

def should_lock_account(username, attempt_count):
    """
    Returns True if attempt_count exceeds MAX_LOGIN_ATTEMPTS.
    Logs a warning message with username and count.
    """
    # Check if attempts exceed the maximum threshold
    if attempt_count >= MAX_LOGIN_ATTEMPTS:
        print('WARNING: Locking account for', username)
        return True
    return False

def analyze_logins(login_data):
    """Iterates through login data and flags accounts to lock."""
    # Use 4-space indentation consistently
    for username, count in login_data:
        if should_lock_account(username, count):
            print('Account locked:', username)
```

## 2.8 Module 2 Quick Review

| **Question** | **Answer** |
| --- | --- |
| **Parameter vs. Argument?** | Parameter: placeholder in function DEFINITION. Argument: actual data passed at function CALL. Mapped by position (left to right). |
| **What does return do?** | Sends data back out of a function AND immediately exits the function. All code after return in same function = never runs. |
| **Global vs. Local scope?** | Global: defined outside all functions, accessible everywhere. Local: defined inside a function, exists ONLY during that function's execution. Destroyed after. |
| **What is namespace masking?** | Using the same variable name inside a function as a global variable. Python creates a SEPARATE local variable -- the global is NOT modified. Can cause hidden bugs. |
| **What does** **sorted() return?** | A NEW sorted list (alphabetical for strings, numeric for numbers). Does NOT modify the original list in place. |
| **import** **vs. from X import Y?** | import module: access via module.function(). from module import function: access function directly without prefix. Use 'from' for frequently used functions. |
| **PEP 8 indentation rule?** | Exactly 4 SPACES per indentation level. Never use tabs. Every nested block adds 4 more spaces. |
| **What is a docstring?** | A multi-line comment using triple quotes ("""...""") placed at the start of a function. Documents what the function does, its parameters, and what it returns. |

**MODULE 3**

# Data Structures, Algorithms & Regular Expressions

## 3.1 String Operations — The Most Common Security Data Type

> **KEY CONCEPT: Why Strings Dominate Security Work**
> Almost ALL data coming from logs, network packets, and APIs arrives as STRINGS:
> IP addresses, usernames, timestamps, URLs, file paths, error messages, device IDs.
> Mastering string manipulation is essential for log parsing and incident analysis.

> **STRING INDEXING AND SLICING**

```python
# String indexing -- each character has a position (index)
# Positive index: starts at 0 from the LEFT
# Negative index: starts at -1 from the RIGHT

device_id = 'h32rb17'
#            0123456   <- positive indices
#           -7654321   <- negative indices

print(device_id[0])    # Output: h   (first character)
print(device_id[-1])   # Output: 7   (last character)
print(device_id[3])    # Output: r   (4th character, 0-indexed)

# String SLICING -- extract a substring [start:stop]
# START is INCLUSIVE, STOP is EXCLUSIVE
print(device_id[0:3])  # Output: h32  (indices 0,1,2 -- NOT 3)
print(device_id[3:])   # Output: rb17 (from index 3 to end)
print(device_id[:3])   # Output: h32  (from start to index 2)

# Real use: extract network prefix from IP address
ip = '192.168.50.100'
network = ip[0:7]      # Get '192.168' to identify the subnet
print(network)         # Output: 192.168
```

> **STRING METHODS — upper, lower, index, len, str()**

```python
# String METHODS -- functions bound to string objects (dot notation)

log_entry = '  FAILED LOGIN: User admin at 14:32  '

# .upper() -- convert to all uppercase
print(log_entry.upper())
# Output: '  FAILED LOGIN: USER ADMIN AT 14:32  '

# .lower() -- convert to all lowercase
print(log_entry.lower())
# Output: '  failed login: user admin at 14:32  '

# .index() -- find FIRST occurrence of substring, return position
username = 'bmoreno'
print(username.index('m'))  # Output: 1  (first 'm' is at index 1)
# WARNING: If substring not found -> ValueError crash!

# String TYPE CASTING
port_num = 443
port_str = str(port_num)   # Convert int to string
message = 'Scanning port: ' + port_str  # String concatenation
print(message)  # Output: Scanning port: 443

# len() -- count characters
ip = '192.168.100.254'
print(len(ip))  # Output: 15  (validate max IPv4 length)
```

## 3.2 List Operations — Mutable Ordered Collections

> **NOTE: String vs. List — Key Difference**
> **STRING:** IMMUTABLE. Cannot change individual characters. Must create a new string.
> **LIST:**   MUTABLE. Can change, add, or remove items IN PLACE without creating a new list.
> Both use 0-based indexing and slicing with the same [start:stop] syntax.

> **LIST OPERATIONS — Access, Modify, append, insert, remove**

```python
# List creation and basic access
blocklist = ['192.168.1.50', '10.0.0.99', '172.16.0.1', '203.0.113.5']
#             index 0          index 1       index 2        index 3

print(blocklist[0])    # Output: 192.168.1.50
print(blocklist[-1])   # Output: 203.0.113.5 (last item)
print(blocklist[1:3])  # Output: ['10.0.0.99', '172.16.0.1'] (slice)

# IN-PLACE MODIFICATION via bracket notation (strings cannot do this!)
blocklist[1] = 'REMOVED'   # Overwrite index 1
print(blocklist)  # ['192.168.1.50', 'REMOVED', '172.16.0.1', '203.0.113.5']

# .append(item) -- add to END of list
blocklist.append('8.8.8.8')
print(blocklist[-1])  # Output: 8.8.8.8 (now at end)

# .insert(index, item) -- insert at specific position (shifts others right)
users = ['elarson', 'fgarcia', 'tshah']
users.insert(1, 'bmoreno')   # Insert at index 1
print(users)  # ['elarson', 'bmoreno', 'fgarcia', 'tshah']

# .remove(value) -- remove FIRST occurrence of value (NOT by index)
users.remove('elarson')      # Finds 'elarson' and removes it
print(users)  # ['bmoreno', 'fgarcia', 'tshah']

# 'in' operator works on lists too!
print('tshah' in users)    # Output: True
print('admin' in users)   # Output: False

# List concatenation with +
list1 = ['elarson', 'bmoreno']
list2 = ['tshah', 'btang']
combined = list1 + list2
print(combined)  # ['elarson', 'bmoreno', 'tshah', 'btang']
```

## 3.3 Algorithms — Solving Problems Step by Step

> **KEY CONCEPT: What is an Algorithm?**
> A set of precise, step-by-step instructions designed to solve a specific problem.
> Every algorithm has: Input data -> Processing steps -> Output result.
> Good algorithm design: Break a large problem into small, manageable sub-steps.

> **ALGORITHM — IP Network Prefix Extraction**

```python
# ALGORITHM: Extract network prefix from a list of IP addresses
# Input:  List of IP addresses
# Output: List of first-3-digit network prefixes

# Step 1: Define input data
ip_list = ['192.567.3.100', '205.123.0.45', '172.001.0.1', '192.567.8.200']

# Step 2: Initialize empty result container
networks = []

# Step 3: Process each IP (extract first 3 characters)
for address in ip_list:
    prefix = address[0:3]      # Slice first 3 chars
    networks.append(prefix)    # Add to results list

# Step 4: Output and analyze results
print(networks)  # Output: ['192', '205', '172', '192']

# Extended: Count how many IPs are in the 192.x.x.x network
count_192 = 0
for net in networks:
    if net == '192':
        count_192 += 1
print('IPs in 192 network:', count_192)  # Output: 2
```

## 3.4 Regular Expressions (Regex) — Pattern Matching for Log Parsing

> **KEY CONCEPT: Why Regex is Essential for Security Analysts**
> Log files contain millions of lines in unstructured text format.
> You need to find ALL instances of IP addresses, emails, hashes, timestamps across the entire file.
> Regex lets you define a PATTERN and extract every match automatically -- no matter the exact value.

| **Regex Symbol** | **What It Matches** | **Example Pattern** | **What It Finds** |
| --- | --- | --- | --- |
| **\w** | Any single alphanumeric char OR underscore | \w | a, B, 5, _, Z (one at a time) |
| **\d** | Any single digit (0-9) | \d | 0,1,2,3,4,5,6,7,8,9 |
| **\s** | Any single whitespace (space, tab, newline) | \s | ' ' (a space character) |
| **.** | ANY single character (except newline) | a.b | acb, aXb, a5b (any char between a and b) |
| **\.** | Literal period character (escaped dot) | \d+\.\d+ | 3.14, 192.168, 0.5 |
| **+** | ONE or MORE consecutive occurrences | \d+ | 1, 42, 192, 168 (chunks of digits) |
| * | ZERO or more consecutive occurrences | \d* | '' (empty) or any digits |
| **{n}** | EXACTLY n occurrences | \d{3} | 192, 168, 001 (exactly 3 digits) |
| **{m,n}** | Between m and n occurrences | \w{3,5} | abc, abcd, abcde |
| **\w+@\w+\.\w+** | Email address pattern | \w+@\w+\.\w+ | user@domain.com |

> **REGULAR EXPRESSIONS — re.findall() with Security Examples**

```python
import re

# re.findall(pattern, string) -- returns LIST of all matches

# Example 1: Find all digits
log = 'Port 22 blocked. Port 443 allowed. Port 8080 open.'
ports = re.findall(r'\d+', log)   # \d+ = one or more digits
print(ports)  # Output: ['22', '443', '8080']

# Example 2: Extract email addresses from a log
incident_log = 'Alert sent to analyst1@corp.com and soc@security.org at 14:00.'
emails = re.findall(r'\w+@\w+\.\w+', incident_log)
print(emails)  # Output: ['analyst1@corp.com', 'soc@security.org']

# Example 3: Extract IPv4 addresses (4 groups of digits separated by dots)
firewall_log = 'BLOCKED 192.168.1.50 -> 10.0.0.1 port 22'
ips = re.findall(r'\d+\.\d+\.\d+\.\d+', firewall_log)
print(ips)  # Output: ['192.168.1.50', '10.0.0.1']

# Example 4: Extract device IDs (letter + 2 digits + 2 letters + 2 digits)
log = 'Devices: h32rb17 and n73ab07 accessed the system.'
device_ids = re.findall(r'[a-z]\d{2}[a-z]{2}\d{2}', log)
print(device_ids)  # Output: ['h32rb17', 'n73ab07']

# Example 5: Build an email extraction tool for incident reports
def extract_emails(text):
    """Extract all email addresses from a text string."""
    return re.findall(r'\w+@\w+\.\w+', text)

report = 'Phishing email from attacker@evil.ru to victim@company.com'
print(extract_emails(report))
# Output: ['attacker@evil.ru', 'victim@company.com']
```

## 3.5 Module 3 Quick Review

| **Question** | **Answer** |
| --- | --- |
| **String indexing -- what is index 0?** | Index 0 = the FIRST character (leftmost). Index -1 = the LAST character. Python is 0-indexed -- counting starts at zero. |
| **Slicing [0:3] -- what does it return?** | Characters at indices 0, 1, and 2. The stop index (3) is EXCLUSIVE -- never included. 'h32rb17'[0:3] = 'h32'. |
| **String vs. List mutability?** | String: IMMUTABLE (cannot change characters in place). List: MUTABLE (can modify, add, remove items in place). |
| **.append() vs. .insert()?** | .append(item): adds to END of list. .insert(index, item): inserts at specific position, shifting existing items right. Neither overwrites. |
| **.remove() works by what?** | By VALUE -- finds and removes the FIRST occurrence of that specific value. NOT by index. If value not found, raises ValueError. |
| **What is** **re.findall()?** | Returns a LIST of ALL non-overlapping matches of a regex pattern in a string. Requires 'import re' first. |
| **\w+ vs \d+?** | \w+ = one or more alphanumeric characters or underscores (words). \d+ = one or more digits (numbers). + means 'one or more'. |
| **How** **to** **find all IPs in a log?** | import re, then: re.findall(r'\d+\.\d+\.\d+\.\d+', log_text) -- matches 4 groups of digits separated by literal dots. |

**MODULE 4**

# Python in Practice — File I/O, Parsing & Debugging

## 4.1 File Operations — Reading and Writing Security Logs

> **KEY CONCEPT: Why File I/O is Essential for Security Automation**
> Security logs live in files: /var/log/auth.log, access_log.txt, firewall.csv
> Python can open, read, parse, modify, and write these files automatically.
> Example workflow: Read allow_list.txt -> Remove banned IPs -> Write updated list back.

> **FILE OPEN MODES — r / w / a**

```python
# THE with STATEMENT -- context manager for safe file handling
# Automatically CLOSES the file when the indented block ends.
# Prevents resource leaks (open file handles drain RAM).

# SYNTAX:
# with open('filename', 'mode') as variable_name:
#     (indented operations on the file)

# FILE OPEN MODES:
# 'r' = READ   -- can only read. Protects file from accidental changes.
# 'w' = WRITE  -- OVERWRITES entire file (or creates new file).
# 'a' = APPEND -- adds to END of file. Does NOT delete existing content.
```

> **FILE OPERATIONS — read(), write(), append()**

```python
# READING a file -- .read() converts file to one big string
with open('login_logs.txt', 'r') as file:
    log_content = file.read()       # Entire file as one string
                                    # File auto-closes after 'with' block

print(log_content)  # Print all log contents
print(type(log_content))  # Output: <class 'str'>

# WRITING to a file -- .write() sends string to file
# 'w' mode OVERWRITES existing content!
with open('incident_report.txt', 'w') as file:
    file.write('INCIDENT REPORT\n')
    file.write('Date: 2024-05-15\n')
    file.write('Severity: CRITICAL\n')

# APPENDING to a file -- adds without deleting existing
new_entry = 'jrafael,192.168.243.140,04:56:27,True\n'
with open('access_log.txt', 'a') as file:
    file.write(new_entry)  # Added to END of existing log

# RELATIVE vs. ABSOLUTE paths
# Relative: file in SAME directory as script
with open('update_log.txt', 'r') as file:   # relative path
    data = file.read()

# Absolute: full path from root
with open('/home/analyst/logs/access_log.txt', 'r') as file:  # absolute
    data = file.read()
```

## 4.2 Parsing — Converting Data for Processing

### .split() — String to List

> **split() — String to List Conversion**

```python
# .split(delimiter) -- cuts a string into a list at each delimiter
# Default (no argument): splits at ALL whitespace (spaces, newlines, tabs)

# Example 1: Split comma-separated allowed users
approved_users = 'elarson,bmoreno,tshah,wjaffrey'
user_list = approved_users.split(',')   # Split at every comma
print(user_list)  # Output: ['elarson', 'bmoreno', 'tshah', 'wjaffrey']

# Example 2: Split at whitespace (default)
log_line = 'FAILED LOGIN admin 192.168.1.50 02:15:33'
parts = log_line.split()   # No argument = split at spaces
print(parts)
# Output: ['FAILED', 'LOGIN', 'admin', '192.168.1.50', '02:15:33']

# Example 3: Parse a file into a list (split at newlines)
with open('allow_list.txt', 'r') as file:
    content = file.read()           # One big string with \n characters

ip_addresses = content.split()      # Split at whitespace/newlines
print(ip_addresses)  # ['192.168.1.1', '10.0.0.1', '172.16.0.1', ...]
```

### .join() — List to String

> **join() — List to String Conversion**

```python
# .join(list) -- joins list elements INTO a string
# SYNTAX: 'connector_string'.join(list)
# The connector goes BETWEEN each element

# Example 1: Join list back to comma-separated string
user_list = ['elarson', 'bmoreno', 'tshah']
csv_string = ','.join(user_list)
print(csv_string)  # Output: elarson,bmoreno,tshah

# Example 2: Join with newlines (for writing back to file)
ip_list = ['192.168.1.1', '10.0.0.5', '172.16.0.1']
file_ready = '\n'.join(ip_list)
print(file_ready)
# Output:
# 192.168.1.1
# 10.0.0.5
# 172.16.0.1

# join() is the INVERSE of split()
original = 'elarson,bmoreno,tshah'
as_list = original.split(',')          # String -> List
back_to_string = ','.join(as_list)     # List -> String
print(back_to_string == original)      # Output: True
```

## 4.3 Portfolio Project — IP Allow-List Automation Engine

> **EXAMPLE: The Real-World Problem**
> You maintain an allow_list.txt file containing approved IP addresses.
> When IPs become suspicious, they must be REMOVED from the allow list.
> Manually editing the file for each IP is slow and error-prone at scale.
> This Python script automates the entire process reliably.

> **COMPLETE: IP ALLOW-LIST AUTOMATION ENGINE**

```python
# IP ALLOW-LIST AUTOMATION ENGINE
# Reads allow list, removes flagged IPs, writes updated file back

# Configuration
import_file = 'allow_list.txt'
remove_list = ['192.168.97.225', '192.168.158.170', '192.168.201.207']

# STEP 1: Open file and read all IP addresses
with open(import_file, 'r') as file:
    ip_addresses = file.read()   # Entire file as one string

# STEP 2: Convert string to list (split at whitespace/newlines)
ip_addresses = ip_addresses.split()
# ip_addresses is now a list: ['192.168.10.1', '192.168.97.225', ...]

# STEP 3: Remove each flagged IP from the list
for element in remove_list:
    if element in ip_addresses:    # Only try to remove if it exists
        ip_addresses.remove(element)
        print('Removed:', element)
    else:
        print('Not found (already removed):', element)

# STEP 4: Convert list back to newline-separated string
ip_addresses = '\n'.join(ip_addresses)

# STEP 5: Overwrite the file with the cleaned list
with open(import_file, 'w') as file:
    file.write(ip_addresses)
    print('Allow list updated successfully.')

# COMPLETE FLOW:
# File (text) -> .read() -> string -> .split() -> list
#   -> .remove() loop -> list -> .join() -> string -> .write() -> file
```

## 4.4 Debugging — Finding and Fixing Errors

> **KEY CONCEPT: Three Categories of Python Errors**
> SYNTAX ERRORS: Code structure is invalid. Interpreter cannot even read the code.
> EXCEPTIONS: Code structure is valid but runtime encounter is impossible to complete.
> LOGIC ERRORS: Code runs perfectly without any error message but produces WRONG results.

| **Error Type** | **What Causes It** | **Error Message** | **How to Fix** |
| --- | --- | --- | --- |
| **SyntaxError: EOL** | Missing closing quote at end of a string. | SyntaxError: EOL while scanning string literal | Add the missing closing quote mark. |
| **SyntaxError: EOF** | Unclosed parenthesis, bracket, or string at end of file. | SyntaxError: unexpected EOF while parsing | Find and close the unclosed bracket/paren. |
| **IndentationError** | Wrong indentation level. Too many or too few spaces. | IndentationError: unexpected indent | Use exactly 4 spaces per level. Never mix tabs and spaces. |
| **NameError** | Using a variable or function that hasn't been defined yet, or a typo. | NameError: name 'username' is not defined | Check spelling. Make sure variable is assigned before use. |
| **IndexError** | Accessing an index that doesn't exist in the sequence. | IndexError: list index out of range | Check list length with len(). Use len()-1 for last item. |
| **TypeError** | Using an operation on the wrong data type (e.g., string + int). | TypeError: can only concatenate str to str | Use str() to convert, or ensure types match before operation. |
| **ValueError** | Function receives correct type but invalid value. | ValueError: substring not found | Check that the value exists before calling (use 'in' first). |
| **FileNotFoundError** | Trying to open a file that doesn't exist at that path. | FileNotFoundError: [Errno 2] No such file | Verify the file path spelling and that the file exists. |
| **Logic Error** | Code runs but produces wrong output. No error raised. | (None -- code runs without error) | Use print() trace statements. Use a debugger with breakpoints. |

> **DEBUGGING TECHNIQUES — print() Traces and Common Fixes**

```python
# DEBUGGING TECHNIQUE 1: print() trace statements
# Insert print() at key points to track execution flow

def update_allowlist(import_file, remove_list):
    print('DEBUG: Starting function')          # Trace point 1
    
    with open(import_file, 'r') as file:
        ip_addresses = file.read()
    print('DEBUG: File read. Length:', len(ip_addresses))  # Trace 2
    
    ip_addresses = ip_addresses.split()
    print('DEBUG: IP list:', ip_addresses)     # Trace point 3
    
    for element in remove_list:
        if element in ip_addresses:
            ip_addresses.remove(element)
            print('DEBUG: Removed', element)  # Trace inside loop
    
    print('DEBUG: Final list:', ip_addresses)  # Trace point 4
    return ip_addresses

# If trace point 2 prints but trace 3 does not -> crash is between them
# This isolates WHERE the bug is occurring

# DEBUGGING TECHNIQUE 2: Common TypeError fix
failed_count = 5
# print('Failed: ' + failed_count)  # TypeError: str + int
print('Failed: ' + str(failed_count))  # Fix: convert int to str first

# DEBUGGING TECHNIQUE 3: Prevent IndexError
log_list = ['entry1', 'entry2']
# print(log_list[5])   # IndexError: index 5 doesn't exist
# Safe access:
target_index = 5
if target_index < len(log_list):
    print(log_list[target_index])
else:
    print('Index out of range. List has', len(log_list), 'items.')
```

## 4.5 Python in Cybersecurity — Real-World Automation Use Cases

| **Security Task** | **Python Automation Approach** | **Key Functions Used** |
| --- | --- | --- |
| **Parse auth.log for failed logins** | Open file, read line by line, grep for 'FAILED' using regex or 'in', extract username and IP. | open(), .read(), .split(), re.findall(), for loop |
| **IP allowlist management** | Read allowlist file, convert to list, remove flagged IPs, write back. | open(), .read(), .split(), .remove(), .join(), .write() |
| **Log timestamp normalization** | Parse raw timestamp strings, convert to datetime objects, standardize format across sources. | from datetime import datetime, .split(), str() |
| **Duplicate alert deduplication** | Load alert IDs into a set (auto-removes duplicates), compare against previous set for new alerts only. | set(), .add(), set difference operations |
| **Automated account lockout** | Check login attempt count per user, lock accounts exceeding threshold, log actions to file. | dict, for loop, conditional, open(), .write() |
| **CI/CD Security Scanning** | Integrate Python scripts into pipeline to run SAST/DAST checks on each code commit automatically. | subprocess, os, re, API calls with requests lib |
| **Threat Intel Enrichment** | Query VirusTotal/AbuseIPDB API with suspicious IPs, parse JSON response, flag malicious entries. | import requests, json, re.findall(), dict |

## 4.6 Complete Course 7 Glossary

| **Term** | **Definition** |
| --- | --- |
| **Algorithm** | A set of precise, step-by-step rules or instructions designed to solve a specific problem. Has defined input, processing, and output. |
| **Argument** | The actual literal data passed INTO a function at the moment it is called. Mapped to parameters by position. |
| **Automation** | Using technology (Python scripts) to reduce human effort for common, repetitive tasks like log parsing or access control updates. |
| **Boolean** | A data type with exactly two values: True or False (case-sensitive). Used for flags, conditions, and logical operations. |
| **break** | A loop control keyword that immediately exits the entire loop, regardless of how many iterations remain. |
| **Built-in Function** | A pre-engineered function natively available in Python without importing anything (print, type, len, max, min, sorted, range, str, int). |
| **Comment** | A line starting with # that Python ignores at runtime. Used to explain WHY code does something. |
| **Conditional Statement** | An if/elif/else code block that evaluates conditions and executes different code branches based on True/False results. |
| **continue** | A loop control keyword that skips the rest of the current iteration and jumps to the next one. |
| **Data Type** | A category classifying what kind of data an item is and how the computer handles it (str, int, float, bool, list, dict, tuple, set). |
| **def** | Keyword used to define (create) a user-defined function. Followed by function name, parameters in parentheses, and a colon. |
| **Debugger** | A software tool (in IDEs) that pauses execution at breakpoints to let developers inspect memory state and variable values step by step. |
| **Debugging** | The practice of identifying and fixing errors in code. Three types: Syntax, Exceptions, and Logic errors. |
| **Dictionary** | A mutable data structure of key:value pairs in curly braces. Access values via keys. Example: {'username': 'admin', 'role': 'superuser'}. |
| **Docstring** | A multi-line comment using triple quotes ("""...""") placed at the start of a function to document its purpose, parameters, and return value. |
| **Exception** | A runtime error in syntactically valid code. Examples: NameError, IndexError, TypeError, ValueError, FileNotFoundError. |
| **FileNotFoundError** | Exception raised when attempting to open a file that doesn't exist at the specified path. |
| **Float** | A data type representing decimal numbers (3.14, 0.005, 99.9). No quotes. Can do math. |
| **for loop** | An iterative statement that cycles through each item in a known sequence (list, string, range). Runs once per item. |
| **Function** | A reusable, named block of code defined with 'def'. Called by name to execute its body. Reduces duplication. |
| **Global Variable** | A variable defined OUTSIDE all functions. Accessible from anywhere in the script. Persists for the program's lifetime. |
| **IDE** | Integrated Development Environment. Software for writing code with features like auto-completion, syntax highlighting, and debugging tools. |
| **Immutable** | An object that cannot be changed after creation. Strings and tuples are immutable. Modifying requires creating a new object. |
| **Indentation** | Whitespace at the start of a line defining code block membership. PEP 8 mandates exactly 4 spaces per level. |
| **IndexError** | Exception raised when accessing an index that doesn't exist in a sequence (beyond list length or string length). |
| **Index** | A numeric position assigned to each character in a string or element in a list. Starts at 0 (first item) or -1 (last item). |
| **Integer** | A whole number data type with no decimal point (443, 0, -5). No quotes. Can do math. |
| **Interpreter** | The Python runtime program that translates Python code into machine-executable binary instructions, line by line. |
| **Library** | A collection of modules providing pre-written code for specific purposes (re, csv, os, statistics, datetime). |
| **List** | A mutable, ordered, bracket-enclosed collection. Can contain mixed types. Supports indexing, slicing, append, insert, remove. |
| **Local Variable** | A variable defined INSIDE a function body. Only accessible within that function. Destroyed when function ends. |
| **Logic Error** | Code that runs without any error message but produces incorrect results due to flawed logic (wrong operator, wrong variable). |
| **Loop** | An iterative statement that repeatedly executes a code block. Types: for (known sequence) and while (boolean condition). |
| **Method** | A function bound to a specific data type, accessed via dot notation. Example: string_var.split(), list_var.append(item). |
| **Module** | A Python file containing functions, variables, and classes. Imported with 'import' to extend script capabilities. |
| **Mutable** | An object that CAN be modified in place after creation. Lists and dictionaries are mutable. |
| **NameError** | Exception raised when using a variable or function name that hasn't been defined, or due to a typo in the name. |
| **Notebook** | An interactive online environment (Jupyter, Google Colab) for writing and running Python code incrementally with markdown explanations. |
| **open()** | Built-in function that opens a file. Takes filename and mode ('r','w','a') as arguments. Used inside a 'with' statement. |
| **Parameter** | A placeholder variable in a function DEFINITION header. Receives the corresponding argument when the function is called. |
| **PEP 8** | Python Enhancement Proposal 8. The official Python style guide covering naming, indentation (4 spaces), line length (79 chars), and comments. |
| **Parsing** | Converting unstructured data (a raw string log) into a structured format (a list) for programmatic processing. |
| **re.findall()** | Function from the 're' module that returns a list of ALL regex pattern matches found in a string. |
| **Regex** | Regular Expression. A sequence of characters defining a text pattern. Used to find IPs, emails, hashes in log files. |
| **return** | Keyword that sends a value back OUT of a function to the caller AND immediately exits the function. All code after it = never runs. |
| **Scope** | The part of a program where a variable is accessible. Global scope = entire program. Local scope = inside one function only. |
| **Set** | An unordered collection of UNIQUE values in curly braces. Automatically removes duplicates. No indexing (unordered). |
| **Slice** | Extracting a sub-section of a string or list using [start:stop] notation. Start is inclusive, stop is EXCLUSIVE. |
| **snake_case** | Python naming convention: lowercase words joined by underscores. Example: failed_login_attempts. Required by PEP 8. |
| **sorted()** | Built-in function returning a NEW sorted list. Alphabetical for strings, numeric for numbers. Original list unchanged. |
| **String** | A sequence of characters enclosed in single or double quotes. Immutable. Used for text data like IPs, usernames, log lines. |
| **Syntax** | The formal grammar rules of Python. Breaking syntax rules causes a SyntaxError and prevents any code from running. |
| **SyntaxError** | Error raised when the Python interpreter cannot parse code due to invalid syntax (missing colon, unclosed bracket, etc.). |
| **Tuple** | An immutable, ordered, parenthesis-enclosed collection. Cannot be modified after creation. Use for fixed data like subnet masks. |
| **TypeError** | Exception raised when applying an operation to an incompatible data type (e.g., adding an integer to a string). |
| **Type Casting** | Converting a value from one data type to another using str(), int(), float(), bool() functions. |
| **Variable** | A named container in memory that stores data. Created via assignment (device_id = 'h32rb17'). Can be reassigned. |
| **ValueError** | Exception raised when a function receives the correct data type but an invalid value (e.g., .index() on a non-existent substring). |
| **while loop** | An iterative statement that continues executing as long as a boolean condition remains True. MUST include an increment to prevent infinite loops. |
| **with statement** | Python context manager for file operations. Automatically closes the file and releases resources when the indented block ends. |
| **\d** | Regex token matching any single digit (0-9). |
| **\s** | Regex token matching any single whitespace character (space, tab, newline). |
| **\w** | Regex token matching any alphanumeric character (A-Z, a-z, 0-9) or underscore. |
| **\.** | Regex escaped dot -- matches a LITERAL period character (not any character like unescaped dot). |
| **+  (regex)** | Regex quantifier: ONE or more consecutive occurrences of the preceding token. |
| **{n}  (regex)** | Regex quantifier: EXACTLY n consecutive occurrences of the preceding token. |

## 4.7 Complete Flashcard Review — All Modules

| **Question** | **Answer** |
| --- | --- |
| **What is automation in cybersecurity?** | Using Python scripts to reduce manual effort for repetitive tasks. Example: automatically filtering millions of log lines for IOCs instead of reading manually. |
| **String vs Integer -- key difference?** | String: text in quotes, cannot do math ('443'). Integer: whole number, no quotes, can do math (443). '443' + 1 = TypeError. 443 + 1 = 444. |
| **What is PEP 8's indentation rule?** | Exactly 4 SPACES per indentation level. Never use tabs. Every nested block (inside if, for, while, def) adds 4 more spaces. |
| **for vs. while loop?** | for: iterates a KNOWN sequence (list, range) - number of iterations known upfront. while: iterates based on a BOOLEAN condition - runs until condition becomes False. |
| **What does** **range(1, 6) generate?** | 1, 2, 3, 4, 5 -- start (1) is inclusive, stop (6) is EXCLUSIVE (never included). Total of 5 values. |
| **break vs. continue?** | break: EXITS entire loop immediately (no more iterations). continue: SKIPS current iteration only, loop continues normally with next item. |
| **Parameter vs. Argument?** | Parameter: named placeholder in function DEFINITION header. Argument: actual real data passed when function is CALLED. Mapped by position. |
| **What does return do?** | Sends value back to the caller AND immediately exits the function. Code after return in same function = dead code (never executes). |
| **Global vs. Local variable?** | Global: outside all functions, accessible everywhere. Local: inside a function, only exists during that function call, destroyed when function ends. |
| **What is namespace masking?** | Using the same name inside a function as a global variable. Creates a SEPARATE local variable. Global is NOT modified. Hidden bug source. |
| **String indexing --** **device_id[0]?** | Returns the FIRST character (index 0). device_id[-1] returns the LAST character. Python counts from 0. |
| **Slicing [0:3] on 'h32rb17'?** | Returns 'h32' -- indices 0,1,2 included. Stop index 3 is EXCLUSIVE (not included). Start inclusive, stop exclusive always. |
| **String mutable or immutable?** | IMMUTABLE -- cannot change individual characters in place. Must create a new string. Lists are MUTABLE (can change in place). |
| **.append() vs. .insert()?** | .append(item): adds to END only. .insert(index, item): inserts at specific position, shifts existing items right. Neither overwrites. |
| **.remove() works by what?** | By VALUE -- finds and removes the FIRST occurrence of that specific value. NOT by index position. ValueError if value not found. |
| **What does** **re.findall() return?** | A LIST of ALL non-overlapping matches of the regex pattern in the string. Empty list [] if no matches found. |
| **\w+ vs \d+ in regex?** | \w+: one or more alphanumeric chars or underscores (matches words/IDs). \d+: one or more digits (matches numbers). + = one or more. |
| **File mode 'r' vs 'w' vs 'a'?** | 'r' = read only (safe). 'w' = write (OVERWRITES entire file -- destructive!). 'a' = append (adds to END without deleting existing content). |
| **Why use 'with** **open()' instead of just open()?** | 'with' automatically closes the file when the indented block ends. Prevents resource leaks (open file handles consume RAM and file descriptors). |
| **What** **does .read() do?** | Converts the entire open file object into a single Python STRING. Use then .split() to convert to a list for processing. |
| **What** **does .split() do?** | Converts a string into a LIST by cutting at each delimiter (default: whitespace). 'a,b,c'.split(',') = ['a','b','c']. |
| **What** **does .join() do?** | Inverse of split(). Joins list elements INTO a string with a connector: ','.join(['a','b','c']) = 'a,b,c'. |
| **SyntaxError** **vs. Exception vs. Logic Error?** | Syntax: code structure invalid, interpreter cannot parse. Exception: valid syntax but runtime impossible (NameError, TypeError, IndexError). Logic: runs but wrong result. |
| **How** **to** **debug a logic error?** | Insert print() trace statements at key points to track execution flow. If a print doesn't appear, crash happened before that line. Use IDE debugger for breakpoints. |
| **TypeError: can only concatenate str to str?** | Caused by trying to join a string with a non-string type. Fix: wrap the non-string in str() first. 'Port: ' + str(443). |

> **Course 7 Complete!**
> *Automate Cybersecurity Tasks with Python*
> Topics Mastered: Python Fundamentals * Data Types *  Variables  *  Conditionals  *  Loops
> Functions * Parameters vs Arguments *  return  *  Scope  *  Libraries  *  PEP 8
> Strings * Indexing & Slicing  *  Lists  *  Algorithms  *  Regular Expressions  *  re.findall()
> File I/O *  open/read/write/append  *  split/join  *  IP Allow-List Project  *  Debugging
> **Google Cybersecurity Certificate -- All 8 Courses Complete!**
