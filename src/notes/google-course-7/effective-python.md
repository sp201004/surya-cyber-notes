## Contents

- [Defining and Calling Functions](#defining-and-calling-functions)
- [Parameters vs. Arguments](#parameters-vs-arguments)
- [The return Statement](#the-return-statement)
- [Variable Scope — Global vs. Local](#variable-scope--global-vs-local)
- [Built-in Functions Reference](#built-in-functions-reference)
- [Importing Libraries & Modules](#importing-libraries--modules)
- [PEP 8 Style Guide — Writing Clean Code](#pep-8-style-guide--writing-clean-code)
- [Quick Revision](#quick-revision)

## Defining and Calling Functions

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

## Parameters vs. Arguments

> **NOTE**
> **PARAMETER:** A placeholder variable in the function DEFINITION. Like a labeled empty slot.
> **ARGUMENT:** The actual REAL DATA passed into the function when it is CALLED.
> Python maps arguments to parameters by POSITION (left to right).

> **PARAMETERS vs. ARGUMENTS — Positional Mapping**

```
DEFINITION (Parameters = placeholders):
def remaining_login_attempts(maximum_attempts, total_attempts):
                             |                 |
                             Param 1           Param 2

CALL (Arguments = real data):
remaining_login_attempts(5, 3)
                         |  |
                         Arg1: 5 maps to maximum_attempts
                         Arg2: 3 maps to total_attempts

ORDER MATTERS: Arguments are mapped by POSITION.
remaining_login_attempts(3, 5) would give a different result!
3 -> maximum_attempts, 5 -> total_attempts  (5 - 3 = 2, not 5 - 3 = 2 ... wait)
Actually: 5(max) - 3(used) = 2 remaining vs 3(max) - 5(used) = -2 (over limit)
```

## The return Statement

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

## Variable Scope — Global vs. Local

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

## Built-in Functions Reference

| **Function** | **What It Does** | **Security Example** | **Output** |
| --- | --- | --- | --- |
| **print ()** | Outputs to screen. Accepts any number of mixed types. | print('Failed login from:', ip, 'at port:', port) | Failed login from: 10.0.0.5 at port: 22 |
| **type ()** | Returns the data type of input. Accepts EXACTLY 1 argument. | print(type(443)) | <class 'int'> |
| **str ()** | Converts input to string data type. | str(443) converts port number to '443' for string operations. | '443' |
| **int ()** | Converts string/float to integer. | int('403') converts HTTP status string to integer for comparison. | 403 |
| **len ()** | Returns number of elements in string/list. | len('192.168.1.1') validates IPv4 length (max 15 chars). | 11 |
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

## Importing Libraries & Modules

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

## PEP 8 Style Guide — Writing Clean Code

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

```python
"""
Example of well-formatted, PEP 8 compliant security function.
This function checks if a login attempt exceeds the allowed limit
and returns True if the account should be locked.
"""
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

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **Parameter vs. Argument?** | Parameter: placeholder in function DEFINITION. Argument: actual data passed at function CALL. Mapped by position (left to right). |
| **What does return do?** | Sends data back out of a function AND immediately exits the function. All code after return in same function = never runs. |
| **Global vs. Local scope?** | Global: defined outside all functions, accessible everywhere. Local: defined inside a function, exists ONLY during that function's execution. Destroyed after. |
| **What is namespace masking?** | Using the same variable name inside a function as a global variable. Python creates a SEPARATE local variable -- the global is NOT modified. Can cause hidden bugs. |
| **What does sorted() return?** | A NEW sorted list (alphabetical for strings, numeric for numbers). Does NOT modify the original list in place. |
| **import vs. from X import Y?** | import module: access via module.function(). from module import function: access function directly without prefix. Use 'from' for frequently used functions. |
| **PEP 8 indentation rule?** | Exactly 4 SPACES per indentation level. Never use tabs. Every nested block adds 4 more spaces. |
| **What is a docstring?** | A multi-line comment using triple quotes ("""...""") placed at the start of a function. Documents what the function does, its parameters, and what it returns. |
