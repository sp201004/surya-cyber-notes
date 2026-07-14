## Contents

- [File Operations — Reading and Writing Security Logs](#file-operations--reading-and-writing-security-logs)
- [Parsing — Converting Data for Processing](#parsing--converting-data-for-processing)
- [Portfolio Project — IP Allow-List Automation Engine](#portfolio-project--ip-allow-list-automation-engine)
- [Debugging — Finding and Fixing Errors](#debugging--finding-and-fixing-errors)
- [Python in Cybersecurity — Real-World Automation Use Cases](#python-in-cybersecurity--real-world-automation-use-cases)

## File Operations — Reading and Writing Security Logs

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

## Parsing — Converting Data for Processing

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

## Portfolio Project — IP Allow-List Automation Engine

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

## Debugging — Finding and Fixing Errors

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

## Python in Cybersecurity — Real-World Automation Use Cases

| **Security Task** | **Python Automation Approach** | **Key Functions Used** |
| --- | --- | --- |
| **Parse auth.log for failed logins** | Open file, read line by line, grep for 'FAILED' using regex or 'in', extract username and IP. | open(), .read(), .split(), re.findall(), for loop |
| **IP allowlist management** | Read allowlist file, convert to list, remove flagged IPs, write back. | open(), .read(), .split(), .remove(), .join(), .write() |
| **Log timestamp normalization** | Parse raw timestamp strings, convert to datetime objects, standardize format across sources. | from datetime import datetime, .split(), str() |
| **Duplicate alert deduplication** | Load alert IDs into a set (auto-removes duplicates), compare against previous set for new alerts only. | set(), .add(), set difference operations |
| **Automated account lockout** | Check login attempt count per user, lock accounts exceeding threshold, log actions to file. | dict, for loop, conditional, open(), .write() |
| **CI/CD Security Scanning** | Integrate Python scripts into pipeline to run SAST/DAST checks on each code commit automatically. | subprocess, os, re, API calls with requests lib |
| **Threat Intel Enrichment** | Query VirusTotal/AbuseIPDB API with suspicious IPs, parse JSON response, flag malicious entries. | import requests, json, re.findall(), dict |
