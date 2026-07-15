## Contents

- [What is a Database?](#what-is-a-database)
- [Introduction to SQL](#introduction-to-sql)
- [Basic SQL Queries — SELECT & FROM](#basic-sql-queries--select--from)
- [Filtering with WHERE Clause](#filtering-with-where-clause)
- [Advanced Filtering — Logical Operators](#advanced-filtering--logical-operators)
- [Sorting & Aggregate Functions](#sorting--aggregate-functions)
- [Joining Tables — The Most Powerful SQL Feature](#joining-tables--the-most-powerful-sql-feature)
- [Complete SQL Query Structure](#complete-sql-query-structure)
- [SQL Quick-Reference Cheat Sheet](#sql-quick-reference-cheat-sheet)

## What is a Database?

> **KEY CONCEPT: Database vs. Spreadsheet**
> A database is an organized collection of information designed for multiple simultaneous users, massive data volumes, and complex queries.
> 
> Spreadsheet (Google Sheets/Excel): Single user or small team. Small data. Simple calculations.
> Database (SQL): Many concurrent users. Millions of rows. Complex filtering, joining, and analysis.
> 
> Security Analyst Context: Security logs can contain MILLIONS of events per day.
> A database lets you write one SQL query and instantly find the 3 suspicious login events
> out of 5 million records -- in seconds. Manually scanning a spreadsheet would take days.

```
RELATIONAL DATABASE STRUCTURE:
TABLE: employees                    TABLE: machines

  +-----------+----------+---------+  +-----------+-------------------+----------+
  |employee_id| username |device_id|  | device_id | operating_system  | username |
  |(PK)       |          |(FK)     |  | (PK)      |                   |          |
  +-----------+----------+---------+  +-----------+-------------------+----------+
  | 1001      | jsmith   | D-104   |  | D-104     | Windows 10        | jsmith   |
  | 1002      | agarcia  | D-207   |  | D-207     | macOS 13          | agarcia  |
  | 1003      | tchen    | NULL    |  | D-350     | Ubuntu 22.04      | NULL     |
  +-----------+----------+---------+  +-----------+-------------------+----------+
                    |                         ^
                    +----[device_id FK]-------+ (Foreign Key connects the two tables)

  PRIMARY KEY (PK): Unique identifier. No duplicates. No NULL. One per table.
  FOREIGN KEY (FK): Links to another table's PK. CAN have duplicates and NULLs.
  A table can have ONE Primary Key but MULTIPLE Foreign Keys.
```

## Introduction to SQL

> **NOTE: What is SQL?**
> SQL (Structured Query Language) is the standard language for creating, querying, and managing relational databases.
> A QUERY is a formal request asking the database to return specific data.
> 
> Security analysts use SQL to:
> * Find all login attempts from a specific IP address in a 50M-row log table.
> * Identify machines missing a critical security patch.
> * Find all accounts with admin privileges that should not have them.
> * Cross-reference suspicious devices with their assigned employees.

| **Feature** | **Linux Filtering (grep/find)** | **SQL Filtering (SELECT/WHERE)** |
| --- | --- | --- |
| **Data Structure** | Free-form unstructured text files (.log, .txt). No defined columns. | Structured rows and columns in tables. Every field has a defined type. |
| **Joining Sources** | Cannot natively cross-reference between separate files. | JOIN multiple tables together to combine related data in one query. |
| **Best Use Case** | Web server dumps errors into a raw text log file. | Authentication events stored in a managed database (MySQL, PostgreSQL). |
| **Example** | grep 'FAILED' /var/log/auth.log | SELECT * FROM log_in_attempts WHERE success = 0; |

## Basic SQL Queries — SELECT & FROM

> **TIP: Golden Syntax Rules**
> 1. Keywords in ALL CAPS: Not required, but universal best practice for readability.
> 2. Semicolon at end: Always end queries with ; to signal the statement is complete.
> 3. Case-insensitive: SQL keywords work in any case, but data values are often case-sensitive.

```sql
BASIC QUERY STRUCTURE:

SELECT  column1, column2        <-- WHAT columns to return
FROM    table_name;             <-- WHERE to get the data

SELECT *                        <-- * wildcard = ALL columns
FROM    log_in_attempts;

REAL ANALYST EXAMPLES:

-- Get employee IDs and their assigned device IDs:
SELECT employee_id, device_id
FROM employees;

-- Get everything from the login attempts log:
SELECT *
FROM log_in_attempts;

-- Get just usernames from employees table:
SELECT username
FROM employees;
```

## Filtering with WHERE Clause

> **KEY CONCEPT: What is WHERE?**
> WHERE adds a condition to your query -- only rows matching the condition are returned.
> Without WHERE: database returns ALL millions of rows.
> With WHERE: database returns only the rows you actually need.

### Data Types & Quoting Rules

| **Data Type** | **Description** | **Quotation Rule** | **Example Value** |
| --- | --- | --- | --- |
| **String** | Text characters, names, IDs. | MUST use single quotes | 'USA'  \|  'analyst10'  \|  'Windows 10' |
| **Date / Time** | Dates and timestamps. | MUST use single quotes | '2023-01-31'  \|  '18:00'  \|  '2024-05-15 09:30' |
| **Numeric** | Numbers for calculation/comparison. | NEVER use quotes | 42  \|  18.00  \|  0  \|  1 |

### Comparison Operators

| **Operator** | **Meaning** | **Example** |
| --- | --- | --- |
| **=** | Exactly equal to | WHERE country = 'USA' |
| **<>  or  !=** | Not equal to | WHERE status <> 'active' |
| **>** | Greater than / Later than | WHERE time > '18:00' |
| **<** | Less than / Earlier than | WHERE login_count < 5 |
| **>=** | Greater than OR equal to | WHERE age >= 18 |
| **<=** | Less than OR equal to | WHERE priority_score <= 3 |

```sql
WHERE EXAMPLES (Real Security Analyst Queries):

-- Find all login attempts AFTER business hours (6PM):
SELECT *
FROM log_in_attempts
WHERE time > '18:00';

-- Find all machines NOT running Windows:
SELECT *
FROM machines
WHERE operating_system <> 'Windows 10';

-- Find all employees in department 'Sales':
SELECT *
FROM employees
WHERE department = 'Sales';

-- Find failed logins (success = 0 means failed):
SELECT *
FROM log_in_attempts
WHERE success = 0;
```

### Pattern Matching with LIKE

> **NOTE**
> Use LIKE when you know PART of the value but not the exact full string.
> 
> WILDCARDS:
> %  (Percent)    = Substitutes ANY number of characters (zero or more).
> _ (Underscore) = Substitutes EXACTLY ONE character.

```sql
LIKE PATTERN EXAMPLES:

-- Find all offices in the East building (East-120, East-290, East-450):
SELECT *
FROM employees
WHERE office LIKE 'East%';
-- 'East%' = starts with 'East', followed by ANYTHING

-- Find emails at any gmail address:
SELECT *
FROM users
WHERE email LIKE '%@gmail.com';
-- '%@gmail.com' = ANYTHING before @gmail.com

-- Find states starting with N followed by exactly ONE character (NY, NJ, NV):
SELECT *
FROM locations
WHERE state LIKE 'N_';
-- 'N_' = N + exactly 1 character

-- Find usernames containing 'admin' anywhere in the name:
SELECT *
FROM employees
WHERE username LIKE '%admin%';
-- '%admin%' = ANYTHING before AND after 'admin'
```

## Advanced Filtering — Logical Operators

> **KEY CONCEPT: Real Security Questions Need Multiple Conditions**
> Single WHERE conditions are often too broad. Logical operators combine conditions:
> AND = BOTH conditions must be true (narrows results)
> OR   = EITHER condition can be true (broadens results)
> NOT = EXCLUDE records matching a condition

```sql
LOGICAL OPERATORS — AND, OR, NOT, BETWEEN

AND OPERATOR -- Both conditions must be TRUE simultaneously:

-- Find failed logins (success=0) from outside the USA:
SELECT *
FROM log_in_attempts
WHERE success = 0
AND country <> 'USA';

-- Find machines in Finance department running Windows 10:
SELECT *
FROM machines
WHERE department = 'Finance'
AND operating_system = 'Windows 10';

-------------------------------------------------------
OR OPERATOR -- Either condition can be TRUE:

-- Find logins from Canada OR USA:
SELECT *
FROM log_in_attempts
WHERE country = 'Canada'
OR country = 'USA';

-- Find machines running Windows 7 OR Windows XP (EOL / dangerous):
SELECT *
FROM machines
WHERE operating_system = 'Windows 7'
OR operating_system = 'Windows XP';

-------------------------------------------------------
NOT OPERATOR -- Exclude matching records:

-- Find all employees NOT in the IT department:
SELECT *
FROM employees
WHERE NOT department = 'IT';

BETWEEN OPERATOR -- Range filtering (inclusive on both ends):

-- Find machines with patches applied between two dates:
SELECT *
FROM machines
WHERE OS_patch_date BETWEEN '2021-03-01' AND '2021-09-01';

-- Find employees hired between 2020 and 2022:
SELECT *
FROM employees
WHERE hire_year BETWEEN 2020 AND 2022;
```

## Sorting & Aggregate Functions

```sql
ORDER BY -- Sort results by a column:

-- Sort employees alphabetically by last name (A to Z):
SELECT *
FROM employees
ORDER BY last_name ASC;     -- ASC = Ascending (A-Z, 0-9, oldest-newest)

-- Sort login attempts newest first:
SELECT *
FROM log_in_attempts
ORDER BY login_date DESC;   -- DESC = Descending (Z-A, 9-0, newest-oldest)

-- Sort by multiple columns (department first, then last name within dept):
SELECT *
FROM employees
ORDER BY department ASC, last_name ASC;
```

### Aggregate Functions — Math on Entire Columns

| **Function** | **What It Returns** | **Security Analyst Example** |
| --- | --- | --- |
| **COUNT (column)** | Total number of rows (records) in the result. | COUNT(*) to see how many login attempts happened today. |
| **AVG (column)** | Average (mean) value of a numeric column. | AVG(session_duration) to find average time attackers spent on the system. |
| **SUM (column)** | Total sum of all values in a numeric column. | SUM(bytes_transferred) to detect large data exfiltration by total volume. |
| **MIN (column)** | Smallest value in a numeric or date column. | MIN(patch_date) to find the oldest unpatched machine on the network. |
| **MAX (column)** | Largest value in a numeric or date column. | MAX(failed_attempts) to find the account being brute-forced most aggressively. |

```sql
AGGREGATE FUNCTION EXAMPLES:

-- Count total login attempts today:
SELECT COUNT(*)
FROM log_in_attempts
WHERE login_date = '2024-05-15';

-- Count how many FAILED logins:
SELECT COUNT(event_id)
FROM log_in_attempts
WHERE success = 0;

-- Find average number of login attempts per user:
SELECT AVG(login_count)
FROM log_in_attempts;
```

## Joining Tables — The Most Powerful SQL Feature

> **KEY CONCEPT: Why JOIN?**
> Security data is rarely in one table. Employee info is in 'employees'. Device info is in 'machines'. Login events are in 'log_in_attempts'.
> To answer, 'Which employee owns the machine that had suspicious logins?' you MUST JOIN tables.
> 
> SYNTAX RULE: When two tables share a column name (e.g., both have 'device_id'),
> specify the table using dot notation: employees.device_id vs machines.device_id
> Without this, SQL does not know which table's column you mean.

```
THE FOUR JOIN TYPES -- VISUAL COMPARISON:
TABLE A (employees)    TABLE B (machines)

  +-------+              +-------+
  | D-101 |              | D-101 | <- matched in both
  | D-102 |              | D-102 | <- matched in both
  | D-103 | (no machine) | D-350 | <- only in machines
  +-------+              +-------+

  INNER JOIN: Only rows with MATCH in BOTH tables
  Result: D-101, D-102  (D-103 excluded, D-350 excluded)

  LEFT JOIN: ALL rows from LEFT table + matches from right
  Result: D-101, D-102, D-103 (D-103 has NULL for machine columns)

  RIGHT JOIN: ALL rows from RIGHT table + matches from left
  Result: D-101, D-102, D-350 (D-350 has NULL for employee columns)

  FULL OUTER JOIN: ALL rows from BOTH tables
  Result: D-101, D-102, D-103, D-350 (NULLs where no match)
```

| **JOIN Type** | **Returns** | **Security Analyst Use Case** | **NULL Behavior** |
| --- | --- | --- | --- |
| **INNER JOIN** | Only rows with a MATCH in BOTH tables. | Find employees who HAVE assigned machines -- exclude employees with no device and unassigned machines. | No NULLs from the join condition. All rows have matching data. |
| **LEFT JOIN** | ALL rows from LEFT table + matching rows from right (NULLs for no match). | Get ALL employees and show their machine info -- employees with no machine show NULL. Identifies employees without assigned devices. | Right table columns show NULL when no match found in right table. |
| **RIGHT JOIN** | ALL rows from RIGHT table + matching rows from left (NULLs for no match). | Get ALL machines and show assigned employee -- unassigned machines (D-350) show NULL. Identifies rogue or untracked devices. | Left table columns show NULL when no match found in left table. |
| **FULL OUTER JOIN** | ALL rows from BOTH tables merged. Matches where possible. | Complete picture: every employee and every machine. Identifies both employees without devices AND devices without employees. | Both sides can have NULL where no match exists. |

```sql
JOIN SYNTAX EXAMPLES:

-- INNER JOIN: Only employees with matched machines:
SELECT username, operating_system, device_id
FROM employees
INNER JOIN machines ON employees.device_id = machines.device_id;

-- LEFT JOIN: All employees, show machine info where available:
SELECT employees.employee_id, employees.username,
machines.operating_system
FROM employees
LEFT JOIN machines ON employees.device_id = machines.device_id;

-- RIGHT JOIN: All machines, show assigned employee:
SELECT machines.device_id, machines.operating_system,
employees.username
FROM employees
RIGHT JOIN machines ON employees.device_id = machines.device_id;

-- FULL OUTER JOIN: Everything from both tables:
SELECT *
FROM employees
FULL OUTER JOIN machines ON employees.device_id = machines.device_id;

-- COMBINING JOIN + WHERE (most real queries do this):
-- Find all failed logins and the employee's department:
SELECT log_in_attempts.username, employees.department,
log_in_attempts.time, log_in_attempts.country
FROM log_in_attempts
INNER JOIN employees ON log_in_attempts.username = employees.username
WHERE log_in_attempts.success = 0
AND log_in_attempts.country <> 'USA';
```

## Complete SQL Query Structure

```sql
FULL QUERY ANATOMY (all clauses in correct order):

SELECT   column1, column2, COUNT(*)
FROM     primary_table
INNER JOIN secondary_table ON primary_table.key = secondary_table.key
WHERE    condition1 = 'value'
AND      condition2 > 0
OR       condition3 LIKE '%pattern%'
ORDER BY column1 ASC
LIMIT    100;

CLAUSE ORDER IS MANDATORY -- always in this sequence:
1. SELECT  (what columns)
2. FROM    (which table)
3. JOIN    (add another table)
4. WHERE   (filter rows)
5. ORDER BY (sort results)
6. LIMIT   (max rows to return)

REAL COMPREHENSIVE SECURITY QUERY:
-- Find all failed logins after 6PM from outside USA,
-- with the employee's department, sorted by time:

SELECT log_in_attempts.username,
log_in_attempts.time,
log_in_attempts.country,
employees.department
FROM log_in_attempts
INNER JOIN employees
ON log_in_attempts.username = employees.username
WHERE log_in_attempts.success = 0
AND log_in_attempts.time > '18:00'
AND log_in_attempts.country <> 'USA'
ORDER BY log_in_attempts.time DESC;
```

## SQL Quick-Reference Cheat Sheet

| **Clause / Operator** | **Syntax** | **Purpose** | **Example** |
| --- | --- | --- | --- |
| **SELECT** | SELECT col1, col2 FROM table | Choose which columns to return. | SELECT username, time FROM log_in_attempts; |
| **SELECT *** | SELECT * FROM table | Return ALL columns. | SELECT * FROM employees; |
| **WHERE** | WHERE column = 'value' | Filter rows by condition. | WHERE country = 'USA' |
| **LIKE + %** | WHERE col LIKE 'East%' | Match pattern: % = any chars. | WHERE office LIKE 'East%' |
| **LIKE + _** | WHERE col LIKE 'N_' | Match pattern: _ = one char. | WHERE state LIKE 'N_' |
| **AND** | WHERE cond1 AND cond2 | BOTH conditions must be true. | WHERE success = 0 AND country <> 'USA' |
| **OR** | WHERE cond1 OR cond2 | EITHER condition can be true. | WHERE country = 'CA' OR country = 'USA' |
| **NOT** | WHERE NOT column = 'val' | Exclude matching records. | WHERE NOT department = 'IT' |
| **BETWEEN** | WHERE col BETWEEN a AND b | Inclusive range filter. | WHERE date BETWEEN '2024-01-01' AND '2024-12-31' |
| **ORDER BY ASC** | ORDER BY column ASC | Sort A-Z / oldest-newest. | ORDER BY last_name ASC |
| **ORDER BY DESC** | ORDER BY column DESC | Sort Z-A / newest-oldest. | ORDER BY login_time DESC |
| **COUNT()** | SELECT COUNT(col) FROM table | Count number of rows. | SELECT COUNT(*) FROM log_in_attempts |
| **AVG()** | SELECT AVG(col) FROM table | Average of numeric column. | SELECT AVG(session_duration) FROM sessions |
| **SUM()** | SELECT SUM(col) FROM table | Total sum of numeric column. | SELECT SUM(bytes) FROM transfers |
| **INNER JOIN** | FROM t1 INNER JOIN t2 ON t1.key=t2.key | Rows matching in BOTH tables. | employees INNER JOIN machines ON employees.device_id = machines.device_id |
| **LEFT JOIN** | FROM t1 LEFT JOIN t2 ON t1.key=t2.key | All left + matching right. | employees LEFT JOIN machines ON employees.device_id = machines.device_id |
| **RIGHT JOIN** | FROM t1 RIGHT JOIN t2 ON t1.key=t2.key | Matching left + all right. | employees RIGHT JOIN machines ON employees.device_id = machines.device_id |
| **FULL OUTER JOIN** | FROM t1 FULL OUTER JOIN t2 ON t1.key=t2.key | All rows from BOTH tables. | employees FULL OUTER JOIN machines ON employees.device_id = machines.device_id |

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What is a Primary Key?** | A column with a unique, non-NULL value in EVERY row. Uniquely identifies each record. One per table. Example: employee_id. |
| **Primary Key vs. Foreign Key?** | Primary Key: unique identifier within its own table. Foreign Key: references another table's PK. Creates the link between tables. Can have duplicates/NULLs. |
| **SQL vs. Linux for filtering?** | SQL: structured data in tables, can JOIN multiple tables, best for database logs. Linux grep/find: unstructured text files, cannot cross-reference files. |
| **SELECT * FROM employees?** | Returns ALL columns from every row in the employees table. * wildcard = all columns. Semicolon required to end the statement. |
| **LIKE 'East%' vs. LIKE 'N_'?** | East% = starts with 'East' followed by ANY characters (0 or more). N_ = starts with N followed by EXACTLY ONE character. |
| **AND vs. OR operator?** | AND: BOTH conditions must be true (narrows results). OR: EITHER condition can be true (broadens results). |
| **INNER JOIN vs. LEFT JOIN?** | INNER JOIN: only rows matching in BOTH tables. LEFT JOIN: ALL rows from left table + matching from right (NULLs where no match). Use LEFT JOIN to find employees without machines. |
| **FULL OUTER JOIN?** | Returns ALL rows from BOTH tables. Matches where possible. NULL fills unmatched sides. Use to get complete picture of employees AND machines with no exclusions. |
