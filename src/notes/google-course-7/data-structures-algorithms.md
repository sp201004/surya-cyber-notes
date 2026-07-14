## Contents

- [String Operations — The Most Common Security Data Type](#string-operations--the-most-common-security-data-type)
- [List Operations — Mutable Ordered Collections](#list-operations--mutable-ordered-collections)
- [Algorithms — Solving Problems Step by Step](#algorithms--solving-problems-step-by-step)
- [Regular Expressions (Regex) — Pattern Matching for Log Parsing](#regular-expressions-regex--pattern-matching-for-log-parsing)
- [Quick Revision](#quick-revision)

## String Operations — The Most Common Security Data Type

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

## List Operations — Mutable Ordered Collections

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

## Algorithms — Solving Problems Step by Step

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

## Regular Expressions (Regex) — Pattern Matching for Log Parsing

> **KEY CONCEPT: Why Regex is Essential for Security Analysts**
> Log files contain millions of lines in unstructured text format.
> You need to find ALL instances of IP addresses, emails, hashes, timestamps across the entire file.
> Regex lets you define a PATTERN and extract every match automatically -- no matter the exact value.

| **Regex Symbol** | **What It Matches** | **Example Pattern** | **What It Finds** |
| --- | --- | --- | --- |
| `\w` | Any single alphanumeric char OR underscore | `\w` | a, B, 5, _, Z (one at a time) |
| `\d` | Any single digit (0-9) | `\d` | 0,1,2,3,4,5,6,7,8,9 |
| `\s` | Any single whitespace (space, tab, newline) | `\s` | ' ' (a space character) |
| `.` | ANY single character (except newline) | `a.b` | acb, aXb, a5b (any char between a and b) |
| `\.` | Literal period character (escaped dot) | `\d+\.\d+` | 3.14, 192.168, 0.5 |
| `+` | ONE or MORE consecutive occurrences | `\d+` | 1, 42, 192, 168 (chunks of digits) |
| `*` | ZERO or more consecutive occurrences | `\d*` | '' (empty) or any digits |
| `{n}` | EXACTLY n occurrences | `\d{3}` | 192, 168, 001 (exactly 3 digits) |
| `{m,n}` | Between m and n occurrences | `\w{3,5}` | abc, abcd, abcde |
| `\w+@\w+\.\w+` | Email address pattern | `\w+@\w+\.\w+` | user@domain.com |

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

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **String indexing -- what is index 0?** | Index 0 = the FIRST character (leftmost). Index -1 = the LAST character. Python is 0-indexed -- counting starts at zero. |
| **Slicing [0:3] -- what does it return?** | Characters at indices 0, 1, and 2. The stop index (3) is EXCLUSIVE -- never included. 'h32rb17'[0:3] = 'h32'. |
| **String vs. List mutability?** | String: IMMUTABLE (cannot change characters in place). List: MUTABLE (can modify, add, remove items in place). |
| **.append() vs. .insert()?** | .append(item): adds to END of list. .insert(index, item): inserts at specific position, shifting existing items right. Neither overwrites. |
| **.remove() works by what?** | By VALUE -- finds and removes the FIRST occurrence of that specific value. NOT by index. If value not found, raises ValueError. |
| **What is re.findall()?** | Returns a LIST of ALL non-overlapping matches of a regex pattern in a string. Requires 'import re' first. |
| **\w+ vs \d+?** | \w+ = one or more alphanumeric characters or underscores (words). \d+ = one or more digits (numbers). + means 'one or more'. |
| **How to find all IPs in a log?** | import re, then: re.findall(r'\d+\.\d+\.\d+\.\d+', log_text) -- matches 4 groups of digits separated by literal dots. |
