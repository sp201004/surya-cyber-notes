## Contents

```text
██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗
██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗
██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝
██████╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗
╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝

███████╗ ██████╗ ██╗
██╔════╝██╔═══██╗██║
███████╗██║   ██║██║
╚════██║██║▄▄ ██║██║
███████║╚██████╔╝███████╗
╚══════╝ ╚══▀▀═╝ ╚══════╝
```

---

## 1. What is Data?

Data simply means information. Computers store everything as data.

**Examples:**
- Name (Surya)
- Age (21)
- Price (₹200)
- Email (surya@gmail.com)

**Real World Examples:** Facebook Posts, Instagram Likes, WhatsApp Messages, Bank Balance, Amazon Orders.

---

## 2. Why Do We Need Databases?

Imagine a small café. The owner writes orders in a notebook.

| Drink | Price | Time |
|---|---|---|
| Coffee | ₹120 | 10:00 AM |
| Tea | ₹80 | 10:10 AM |
| Latte | ₹250 | 10:20 AM |

This works for a few orders. Now imagine after 1 Year: **36,000 Orders**.
If a customer asks "How many coffees were sold today?", the owner has to search thousands of pages. Very slow. Very difficult.

So we need a better way. That better way is a **DATABASE**.

---

## 3. What is a Database?

**Definition:** A Database is an organized collection of data, allowing computers to retrieve it quickly.

**Simple Definition:**
```text
Notebook → Digital Notebook (with Searching, Sorting, Filtering, Editing)
```

### Real Life Examples

| App/Service | What it stores |
|---|---|
| **Instagram** | Username, Password, Followers, Posts |
| **Amazon** | Product Name, Price, Seller, Rating |
| **College** | Roll Number, Marks, Attendance, CGPA |
| **Bank** | Account Number, Balance, Transactions |
| **Hospital** | Patient Name, Disease, Doctor, Medicine |

### Why Databases are Better

| Feature | Without Database | With Database |
|---|---|---|
| **Searching** | Slow | Fast |
| **Storage** | Messy | Organized |
| **Editing** | Difficult | Easy |
| **Backup** | Hard | Easy |

---

## 4. Database Structure

Everything inside a database is stored in **TABLES**.

**Visual Structure:**
```text
       +-----------+
       | Database  |
       +-----------+
         /       \
+---------+     +---------+
| Orders  |     |  Users  |
| Table   |     |  Table  |
+---------+     +---------+
```
A Database contains **Multiple Tables**.

---

## 5. Understanding Tables, Columns, and Rows

### What is a Table?
A table is like an Excel Sheet. It stores records.

```text
+---------------------------------------------+
| ID | Drink  | Price | Time                  |
+---------------------------------------------+
| 1  | Tea    |  20   | 09:00                 |
| 2  | Coffee |  30   | 09:10                 |
| 3  | Latte  | 120   | 09:20                 |
+---------------------------------------------+
```

### What is a Column?
Columns describe **WHAT TYPE OF DATA** is stored. (Think: Column = Category / Attribute)

- **ID:** stores IDs
- **Drink:** stores drink names
- **Price:** stores prices
- **Time:** stores order time

### What is a Row / Record?
Row means **ONE COMPLETE RECORD**. (Think: Row = One Complete Entry)

```text
+---------------------------------------------+
| ID | Drink  | Price | Time                  |
+---------------------------------------------+
| 1  | Tea    | 20    | 09:00                 |  <-- This is ONE ROW (Record)
+---------------------------------------------+
```
Everything about ONE ORDER is one row.

---

## 6. Database Hierarchy Summary

```text
Database (Cafe)
↓
Tables (Orders Table)
↓
Rows (One full order)
↓
Columns (Categories like Price)
↓
Values (e.g., 30)
```

---

## 7. What is SQL?

**SQL = Structured Query Language**

SQL is **NOT** a database. SQL is **A LANGUAGE** used to communicate with a database.

**Analogy:**
- English → Talk to Humans
- SQL → Talk to Database

**Example:**
- **Human says:** "Show me coffee orders."
- **SQL says:** `SELECT * FROM Orders WHERE drink='Coffee';`
- **Database returns:** Coffee Orders

### SQL vs Database
| Concept | Role | Analogy |
|---|---|---|
| **DATABASE** | Stores Data | Library (Book Storage) |
| **SQL** | Accesses Data | Librarian (Find Book) |

### What SQL Can Do
Read Data, Insert Data, Delete Data, Update Data, Filter Data, Sort Data, Count Data.

---

## 8. Common Databases

| Database | Description |
|---|---|
| **MySQL** | Most popular |
| **PostgreSQL** | Enterprise |
| **SQLite** | Small Applications |
| **Oracle** | Large Enterprises |
| **Microsoft SQL Server** | Windows Environment |
| **MariaDB** | MySQL Alternative |
| **MongoDB** | NoSQL Database |

Every app uses databases (Facebook, Instagram, Netflix, Uber, etc.).

---

## 9. Cyber Security Importance

Almost every target has a database (Login System → User Database, Bank → Transaction Database).

As Ethical Hackers, we interact with databases to perform:
- Login Testing
- SQL Injection
- Data Leakage
- Broken Authentication
- Privilege Escalation
- Database Enumeration

Learning basic SQL is **mandatory** before learning SQL Injection (SQLi).

---

## 10. Memory Tricks for DB Vocabulary

| Term | Analogy / Meaning |
|---|---|
| **Database** | Cupboard / School |
| **Table** | Shelf / Class (Collection of Rows) |
| **Row** | One File / Student (One Record) |
| **Column** | Label / Student Detail (One Attribute) |
| **Cell** | One Value |

---

## 11. What is a Query?

A Query is simply a request made to a database.
You ask a question → Database answers.

**Examples:** "Show all students", "Show products under ₹100". These are **QUERIES**.

---

## 12. Basic SQL Query Structure

Almost every SQL query follows this pattern:

```text
SELECT   → Choose Columns
FROM     → Choose Table
WHERE    → Filter Rows
ORDER BY → Sort Results
```

**Query Execution Order (How DB reads it):**
`FROM` (Read Table) → `WHERE` (Filter) → `SELECT` (Choose Columns) → `ORDER BY` (Sort)

---

## 13. SELECT and FROM

**`SELECT`** tells SQL "What columns do you want?".
**`FROM`** tells SQL "From which table?".

- `*` means **ALL COLUMNS**.

**Example:**
```sql
SELECT * FROM Orders;
```
**Meaning:** Show everything from the Orders table.

### Select Specific Columns
To read faster and cleaner, select only what you need:
```sql
SELECT drink, price FROM Orders;
```
(ID and Time are hidden).

---

## 14. WHERE (Filtering)

`WHERE` filters rows. It means **ONLY SHOW matching records.**

**Example:**
```sql
SELECT * FROM Orders WHERE drink='Coffee';
```
Output: Only coffee rows remain.

### Common Operators

| Operator | Meaning | Example |
|---|---|---|
| `=` | Equal | `WHERE price=20` |
| `!=` | Not Equal | `WHERE price!=30` |
| `>` | Greater Than | `WHERE price>100` |
| `<` | Less Than | `WHERE price<50` |
| `>=` | Greater or equal | `WHERE price>=20` |
| `<=` | Less or equal | `WHERE price<=30` |

---

## 15. ORDER BY (Sorting)

`ORDER BY` sorts data.

- **ASC** = Ascending (Lowest → Highest, A → Z). This is the **Default**.
- **DESC** = Descending (Highest → Lowest, Z → A).

**Example:**
```sql
SELECT * FROM Orders ORDER BY price DESC;
```
Output: `120, 100, 50, 30, 20`

---

## 16. Combining WHERE + ORDER BY

Professional queries combine commands.

**Example:**
```sql
SELECT * 
FROM Orders 
WHERE drink='Coffee' 
ORDER BY price DESC;
```

**Execution Flow:** Find Coffee → Sort highest price first → Display.

---

## 17. SQL Rules & Best Practices

1. SQL keywords can be Uppercase (`SELECT`) or lowercase (`select`). **Professional style uses UPPERCASE.**
2. **Semicolon (`;`)** marks the end of a query. Example: `SELECT * FROM Orders;`
3. **Strings use Single Quotes (`' '`)**. Correct: `'Coffee'`. Wrong: `Coffee`.
4. Read queries before execution.

---

## 18. Common Beginner Mistakes

| Mistake | Correct Way |
|---|---|
| `SELECT FROM Orders;` | Missing `*` or column names |
| `SELECT * Orders;` | Missing `FROM` |
| `WHERE drink=Coffee` | Missing single quotes (`'Coffee'`) |
| `ORDER price` | Should be `ORDER BY price` |
| Using `DESC` before `ORDER BY` | `ORDER BY price DESC` |
| `SELECT FROM` | Choose columns first! |

---

## 19. One Page Cheatsheet

```text
DATABASE
    │
    ├── TABLE
    │      │
    │      ├── ROW (Record / Complete Entry)
    │      │      │
    │      │      └── VALUES (Cells)
    │      │
    │      └── COLUMN (Attribute / Category)
    │
    └── SQL (Language to communicate)
           │
           ├── SELECT (Choose Columns)
           ├── FROM (Choose Table)
           ├── WHERE (Filter Rows)
           ├── ORDER BY (Sort Results)
           ├── ASC (Lowest → Highest)
           └── DESC (Highest → Lowest)
```

---

## 20. Interview Questions

| Question | Answer |
|---|---|
| **What is a database?** | An organized collection of data. |
| **Difference between SQL and Database?** | Database stores data. SQL accesses data. |
| **What is a row?** | One complete record. |
| **What is a column?** | One type of information / attribute. |
| **Is SQL a programming language?** | No. It is a query language. |
| **Difference between ASC and DESC?** | ASC = Low to High. DESC = High to Low. |
| **Can WHERE and ORDER BY be used together?** | Yes. Very common. |
| **Default sorting?** | Ascending. |
| **Meaning of * ?** | All Columns. |
| **Why do hackers learn SQL?** | To understand databases and perform security testing like SQL Injection. |

---

## End of Database SQL Basics

**Room Complete **

**Knowledge Gained:**
- Database Fundamentals (Data, Table, Row, Column, Record)
- SQL Basics (SELECT, FROM, WHERE, ORDER BY, ASC, DESC)
- Filtering and Sorting Data
- Writing Simple Queries
- Foundation for SQL Injection

**Next Recommended TryHackMe Rooms:**
→ SQL Injection
→ OWASP Top 10
→ Burp Suite Basics
→ Web Exploitation
