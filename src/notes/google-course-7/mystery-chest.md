## Contents

- [Complete Course 7 Glossary](#complete-course-7-glossary)
- [Complete Flashcard Review — All Modules](#complete-flashcard-review--all-modules)

## Complete Course 7 Glossary

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
| `\d` | Regex token matching any single digit (0-9). |
| `\s` | Regex token matching any single whitespace character (space, tab, newline). |
| `\w` | Regex token matching any alphanumeric character (A-Z, a-z, 0-9) or underscore. |
| `\.` | Regex escaped dot -- matches a LITERAL period character (not any character like unescaped dot). |
| `+`  (regex) | Regex quantifier: ONE or more consecutive occurrences of the preceding token. |
| `{n}`  (regex) | Regex quantifier: EXACTLY n consecutive occurrences of the preceding token. |

## Complete Flashcard Review — All Modules

| **Question** | **Answer** |
| --- | --- |
| **What is automation in cybersecurity?** | Using Python scripts to reduce manual effort for repetitive tasks. Example: automatically filtering millions of log lines for IOCs instead of reading manually. |
| **String vs Integer -- key difference?** | String: text in quotes, cannot do math ('443'). Integer: whole number, no quotes, can do math (443). '443' + 1 = TypeError. 443 + 1 = 444. |
| **What is PEP 8's indentation rule?** | Exactly 4 SPACES per indentation level. Never use tabs. Every nested block (inside if, for, while, def) adds 4 more spaces. |
| **for vs. while loop?** | for: iterates a KNOWN sequence (list, range) - number of iterations known upfront. while: iterates based on a BOOLEAN condition - runs until condition becomes False. |
| **What does range(1, 6) generate?** | 1, 2, 3, 4, 5 -- start (1) is inclusive, stop (6) is EXCLUSIVE (never included). Total of 5 values. |
| **break vs. continue?** | break: EXITS entire loop immediately (no more iterations). continue: SKIPS current iteration only, loop continues normally with next item. |
| **Parameter vs. Argument?** | Parameter: named placeholder in function DEFINITION header. Argument: actual real data passed when function is CALLED. Mapped by position. |
| **What does return do?** | Sends value back to the caller AND immediately exits the function. Code after return in same function = dead code (never executes). |
| **Global vs. Local variable?** | Global: outside all functions, accessible everywhere. Local: inside a function, only exists during that function call, destroyed when function ends. |
| **What is namespace masking?** | Using the same name inside a function as a global variable. Creates a SEPARATE local variable. Global is NOT modified. Hidden bug source. |
| **String indexing -- device_id[0]?** | Returns the FIRST character (index 0). device_id[-1] returns the LAST character. Python counts from 0. |
| **Slicing [0:3] on 'h32rb17'?** | Returns 'h32' -- indices 0,1,2 included. Stop index 3 is EXCLUSIVE (not included). Start inclusive, stop exclusive always. |
| **String mutable or immutable?** | IMMUTABLE -- cannot change individual characters in place. Must create a new string. Lists are MUTABLE (can change in place). |
| **.append() vs. .insert()?** | .append(item): adds to END only. .insert(index, item): inserts at specific position, shifts existing items right. Neither overwrites. |
| **.remove() works by what?** | By VALUE -- finds and removes the FIRST occurrence of that specific value. NOT by index position. ValueError if value not found. |
| **What does re.findall() return?** | A LIST of ALL non-overlapping matches of the regex pattern in the string. Empty list [] if no matches found. |
| **\w+ vs \d+ in regex?** | \w+: one or more alphanumeric chars or underscores (matches words/IDs). \d+: one or more digits (matches numbers). + = one or more. |
| **File mode 'r' vs 'w' vs 'a'?** | 'r' = read only (safe). 'w' = write (OVERWRITES entire file -- destructive!). 'a' = append (adds to END without deleting existing content). |
| **Why use 'with open()' instead of just open()?** | 'with' automatically closes the file when the indented block ends. Prevents resource leaks (open file handles consume RAM and file descriptors). |
| **What does .read() do?** | Converts the entire open file object into a single Python STRING. Use then .split() to convert to a list for processing. |
| **What does .split() do?** | Converts a string into a LIST by cutting at each delimiter (default: whitespace). 'a,b,c'.split(',') = ['a','b','c']. |
| **What does .join() do?** | Inverse of split(). Joins list elements INTO a string with a connector: ','.join(['a','b','c']) = 'a,b,c'. |
| **SyntaxError vs. Exception vs. Logic Error?** | Syntax: code structure invalid, interpreter cannot parse. Exception: valid syntax but runtime impossible (NameError, TypeError, IndexError). Logic: runs but wrong result. |
| **How to debug a logic error?** | Insert print() trace statements at key points to track execution flow. If a print doesn't appear, crash happened before that line. Use IDE debugger for breakpoints. |
| **TypeError: can only concatenate str to str?** | Caused by trying to join a string with a non-string type. Fix: wrap the non-string in str() first. 'Port: ' + str(443). |
