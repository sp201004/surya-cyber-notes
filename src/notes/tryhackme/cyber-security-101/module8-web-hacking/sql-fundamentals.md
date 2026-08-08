| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Web Hacking / Databases |
| **Difficulty** | Beginner |
| **Time** | ~90 Minutes |
| **Module** | Web Hacking |

---

## Objective

This room teaches the fundamentals of **SQL (Structured Query Language)** — the language used to interact with **relational databases** — from the ground up. It starts with what a database is, moves through the building blocks (tables, rows, columns, primary and foreign keys), and then works hands-on inside **MySQL**: creating and inspecting databases and tables, running the four **CRUD** operations (`INSERT`, `SELECT`, `UPDATE`, `DELETE`), filtering and shaping results with **clauses** and **operators**, and finishing with **SQL functions**. Databases sit behind almost every application, so understanding how queries are built is essential groundwork for web-application security and **SQL Injection**.

By the end of this room you will be able to:

- Explain what databases are and distinguish relational (SQL) from non-relational (NoSQL) databases
- Identify tables, rows, columns, primary keys, and foreign keys
- Describe the difference between **SQL** (the language) and a **DBMS** (the system that runs it)
- Manage databases and tables with `CREATE`, `SHOW`, `USE`, `DESCRIBE`, `ALTER`, and `DROP`
- Perform CRUD with `INSERT`, `SELECT`, `UPDATE`, and `DELETE`, and target rows safely with `WHERE`
- Shape results with `DISTINCT`, `GROUP BY`, `ORDER BY`, and `HAVING`
- Filter with comparison, logical, pattern (`LIKE`), membership (`IN`), range (`BETWEEN`), and `NULL` operators
- Use functions such as `LENGTH()`, `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`, and `GROUP_CONCAT()`

> **Security relevance:** Poorly designed or unsafely constructed database interactions create vulnerabilities such as **SQL Injection**. You cannot understand how a query is abused until you understand how it is built — which is exactly what this room provides.

---

## Task 1 — Introduction

Databases are extremely common in computing and cybersecurity — social media, e-commerce, banking, universities, and platforms like TryHackMe all rely on them behind the scenes. A **database** stores, organises, and lets you search, modify, and analyse information, so whenever an application handles users, posts, products, or transactions, a database is involved somewhere.

For security professionals, SQL knowledge underpins several areas: understanding **SQL Injection**, spotting unsafe query construction, investigating suspicious activity in logs, and understanding how data can be exposed or protected. This room is designed for beginners — no significant prior IT knowledge is required, though **Linux Fundamentals** is helpful background.

By completing SQL Fundamentals you should understand what databases are, relational vs non-relational databases, tables/rows/columns, primary and foreign keys, SQL and the DBMS, CRUD operations, clauses, operators, SQL functions, and how these apply to cybersecurity.

> **Note:** The room's Task 1 has no answer to submit — its prompt is simply *"Teach me the basics of SQL!"*

---

## Task 2 — Databases 101

A **DATABASE** is an organised collection of data that can be accessed, managed, analysed, and manipulated. Real-world examples include Instagram (users, posts, comments, likes, messages), e-commerce (products, customers, orders, payments), banking (accounts, transactions, customers), universities (students, courses, marks), and TryHackMe (users, rooms, progress, achievements).

### Two Broad Categories

Databases split into two broad types introduced in this room — relational and non-relational:

| Relational (SQL) | Non-Relational (NoSQL) |
|------------------|------------------------|
| Structured data | Flexible / varying formats |
| Tables, rows, columns | Non-tabular models (documents, key-value, etc.) |
| Defined schema | Flexible schema |
| Relationships between data | Flexible relationships |
| SQL commonly used | NoSQL systems common |

A **RELATIONAL DATABASE** stores data in structured tables, where every row follows the same general structure. Common systems include **MySQL**, **PostgreSQL**, **Microsoft SQL Server**, and **Oracle Database**. Use one when data has a predictable structure, fits naturally into tables, relationships matter, and strong consistency is required.

```text
STUDENTS TABLE
┌──────────┬────────────┬───────┐
│ student_id│ name       │ age   │
├──────────┼────────────┼───────┤
│ 101      │ Rahul      │ 20    │
│ 102      │ Priya      │ 21    │
│ 103      │ Aman       │ 20    │
└──────────┴────────────┴───────┘
```

A **NON-RELATIONAL** database does not require data to be stored in traditional rows and columns. Commonly associated with **NoSQL**, it suits data that has varying formats or is unstructured/semi-structured — social-media content, JSON documents, logs, sensor data, and user-generated content.

> **Tip:** NoSQL is commonly understood as *"Not Only SQL"*, not literally "no SQL". Memory trick: **RELATIONAL = RELATIONSHIPS + STRUCTURED TABLES**.

### Core Building Blocks

The pieces of a relational database build on each other, from the table down to the keys that link records:

> **1. Table**
> A structured collection of related data inside a relational database — think of it like a spreadsheet. A `BOOKS` table has columns `id`, `name`, `published`, and each book is a row/record.

> **2. Column**
> Defines a particular attribute/field of the data (e.g. `id`, `name`, `published_date`). Each column normally has a **data type**: `STRING`/`VARCHAR` (text, `"Surya"`), `INTEGER` (whole numbers, `25`), `FLOAT`/`DECIMAL` (decimals, `7.25`), `DATE` (`2026-08-08`).

> **3. Row / Record**
> An individual record in a table. In a students table, `101 | Rahul | 20` is one row. **ROW = the record; COLUMN = the property stored about it.**

> **4. Primary Key**
> Uniquely identifies a record within a table. In `STUDENTS`, `student_id` is the primary key — `student_id = 101` identifies exactly one student. Memory trick: **PRIMARY KEY = "WHO ARE YOU?"**

> **5. Foreign Key**
> Creates a relationship/link between tables. If `BOOKS.author_id` references `AUTHORS.author_id`, the foreign key connects the two tables. Memory trick: **PRIMARY KEY = IDENTIFY, FOREIGN KEY = CONNECT.**

| | Primary Key | Foreign Key |
|---|-------------|-------------|
| **Role** | Identifies a row | Links tables |
| **Value** | Unique value | References another table/key |
| **Question** | "Who is this?" | "Which table/record relates?" |

### Task 2 — Answers

| Question | Answer |
|---|---|
| **Q1. What type of database should you use if the stored data will vary greatly in its format?** | Non-relational database |
| **Q2. What type of database should you use if the data will reliably be in the same structured format?** | Relational database |
| **Q3. Once a record of a book is inserted into the "Books" table, it is represented as a ___ in that table?** | Row |
| **Q4. Which type of key provides a link from one table to another?** | Foreign key |
| **Q5. Which type of key ensures a record is unique within a table?** | Primary key |

---

## Task 3 — SQL and the DBMS

**SQL = Structured Query Language**, a language used to interact with relational databases. It lets you retrieve, insert, update, delete, filter, sort, and group data, as well as create databases/tables and modify database structures. A basic query retrieves data from a table:

```sql
SELECT * FROM users;
```

Here `SELECT` retrieves data, `*` means all columns, `FROM` specifies the source table, `users` is the table name, and `;` ends the statement.

A **DBMS (Database Management System)** acts as the interface between the database and the end user or application. It manages interaction with the database — creating databases and tables, storing, retrieving, updating, and deleting data, managing access, and executing queries. Examples include **MySQL**, **PostgreSQL**, **Microsoft SQL Server**, and **Oracle Database**.

> **Note:** Do not confuse the two — **SQL is the LANGUAGE**, and the **DBMS is the SOFTWARE/SYSTEM** that manages database interaction. The analogy: SQL = language, DBMS = interpreter/management system, DB = the actual organised data.

The full request path through a web application runs `Browser → (HTTP Request) → Web Server → (SQL Query) → DBMS → Database`, and the result travels back. Understanding this chain matters for both offensive security (understanding SQL Injection, unsafe query construction, data exposure) and defensive security (searching records, investigating suspicious activity, applying restrictions).

The room previews the SQL command families covered in later tasks: **database/table statements** (`CREATE`, `SHOW`, `USE`, `DROP`), **CRUD** (`INSERT`, `SELECT`, `UPDATE`, `DELETE`), **clauses** (`WHERE`, `ORDER BY`, `GROUP BY`, `LIMIT`), **operators** (`=`, `!=`, `>`, `<`, `>=`, `<=`, `AND`, `OR`, `LIKE`), and **functions** (`COUNT()`, `SUM()`, `LENGTH()`, `GROUP_CONCAT()`).

### Task 3 — Answers

| Question | Answer |
|---|---|
| **Q1. What serves as an interface between a database and an end user?** | DBMS |
| **Q2. What query language can be used to interact with a relational database?** | SQL |

### Interview Questions — Databases & SQL

| Question | Answer |
|---|---|
| **Q1. What is SQL?** | Structured Query Language used to interact with relational databases. |
| **Q2. What is a database?** | An organised collection of data that can be accessed and managed. |
| **Q3. What is a relational database?** | A database that stores structured data in tables consisting of rows and columns. |
| **Q4. What is a non-relational database?** | A database designed for flexible data models that do not require traditional relational tables. |
| **Q5. What is a row?** | A single record in a table. |
| **Q6. What is a column?** | A field/attribute describing a property of records. |
| **Q7. What is a primary key?** | A key that uniquely identifies a record within a table. |
| **Q8. What is a foreign key?** | A key used to create a relationship between tables. |
| **Q9. What is a DBMS?** | Database Management System; it provides an interface for managing and interacting with databases. |
| **Q10. SQL vs DBMS?** | SQL is the language; DBMS is the system that manages the database and executes database operations. |

---

## Task 4 — Database and Table Statements

Now we move from theory to practical SQL. Two families of statements manage structure: **database statements** (`CREATE DATABASE`, `SHOW DATABASES`, `USE`, `DROP DATABASE`) and **table statements** (`CREATE TABLE`, `SHOW TABLES`, `DESCRIBE`, `ALTER TABLE`, `DROP TABLE`).

### Starting MySQL

Before running any SQL, access the MySQL client. On the TryHackMe machine the room uses username `root` and password `tryhackme`:

```bash
$ mysql -u root -p
Enter password:
Welcome to the MySQL monitor.
Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.39-0ubuntu0.20.04.1 (Ubuntu)
mysql>
```

Here `mysql` is the client, `-u root` logs in as the root user, and `-p` prompts for the password. The `mysql>` prompt means you are inside the client. SQL commands are terminated with `;` or `\g`.

### Database Statements

Create a new database, list all databases, select one to work on, and remove one when no longer needed:

```sql
CREATE DATABASE thm_bookmarket_db;
SHOW DATABASES;
USE thm_bookmarket_db;
DROP DATABASE database_name;
```

`SHOW DATABASES;` returns every database on the server, including MySQL's default/system databases:

```text
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
| thm_bookmarket_db  |
| ...                |
+--------------------+
```

`information_schema` holds metadata about databases/tables/columns, `mysql` is the system database, `performance_schema` holds performance info, and `sys` holds helpful admin views. After `USE thm_bookmarket_db;` MySQL replies `Database changed`, and all subsequent table queries operate on that active database.

> **Warning:** `DROP DATABASE` is a destructive operation — it removes the database and all its contents. The room demonstrates the syntax but does **not** require you to remove the lesson database. Always verify the target before executing any `DROP`.

> **Tip:** Memory map — `SHOW` = "What exists?", `USE` = "Which one should I work on?", `CREATE` = make, `DROP` = destroy.

### Table Statements

With a database selected, you can work with tables. The generic `CREATE TABLE` syntax lists each column with a name, a data type, and optional constraints:

```sql
CREATE TABLE example_table_name (
    example_column1 data_type,
    example_column2 data_type,
    example_column3 data_type
);
```

The room's book-inventory example:

```sql
CREATE TABLE book_inventory (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    book_name VARCHAR(255) NOT NULL,
    publication_date DATE
);
```

Each column definition carries meaning:

> **1. `book_id INT AUTO_INCREMENT PRIMARY KEY`**
> An integer column that MySQL fills with automatically increasing numbers (1, 2, 3, 4, …) and uses as the unique record identifier — no need to assign IDs manually.

> **2. `book_name VARCHAR(255) NOT NULL`**
> A variable-length text field up to 255 characters that is required — `"Android Security Internals"` is valid, `NULL` is rejected.

> **3. `publication_date DATE`**
> Stores date values such as `2014-10-14`. It has no `NOT NULL`, so it can accept `NULL` unless another constraint is applied.

### Inspecting Tables

`SHOW TABLES;` lists the tables in the **current active database** only, and `DESCRIBE` (short form `DESC`) shows a table's structure:

```sql
SHOW TABLES;
DESCRIBE book_inventory;
DESC book_inventory;
```

```text
mysql> SHOW TABLES;
+-----------------------------+
| Tables_in_thm_bookmarket_db |
+-----------------------------+
| book_inventory              |
+-----------------------------+

mysql> DESCRIBE book_inventory;
+------------------+--------------+------+-----+---------+----------------+
| Field            | Type         | Null | Key | Default | Extra          |
+------------------+--------------+------+-----+---------+----------------+
| book_id          | int          | NO   | PRI | NULL    | auto_increment |
| book_name        | varchar(255) | NO   |     | NULL    |                |
| publication_date | date         | YES  |     | NULL    |                |
+------------------+--------------+------+-----+---------+----------------+
3 rows in set
```

Reading the output: `Field` is the column name, `Type` the data type, `Null` whether NULL is allowed, `Key` key info (`PRI` = primary key), `Default` the default value, and `Extra` additional properties (e.g. `auto_increment`).

### Modifying and Deleting Tables

`ALTER TABLE` modifies an existing table — it can add, remove, or rename a column, or change a column's data type. To add a `page_count` column:

```sql
ALTER TABLE book_inventory
ADD page_count INT;
```

`DROP TABLE` removes a table and its stored data, while `DROP DATABASE` removes the whole database:

```sql
DROP TABLE table_name;
DROP DATABASE database_name;
```

> **Warning:** `DELETE` removes rows/records; `DROP TABLE` removes the entire table; `DROP DATABASE` removes the database. `DROP` operations are destructive and irreversible — verify the target first.

### Data Types and Constraints

| Data Type | Meaning | Example |
|-----------|---------|---------|
| **`INT`** | Integer / whole number | `1`, `20`, `100` |
| **`VARCHAR(n)`** | Variable-length string up to `n` characters | `VARCHAR(255)` |
| **`DATE`** | Date value | `2026-08-08` |
| **`DECIMAL`** | Precise decimal number | `99.99` |
| **`FLOAT`** | Floating-point number | — |
| **`BOOLEAN`** | TRUE / FALSE style values | — |
| **`TEXT`** | Larger text content | — |

| Constraint | Meaning |
|------------|---------|
| **`PRIMARY KEY`** | Uniquely identifies records |
| **`NOT NULL`** | Value cannot be NULL |
| **`AUTO_INCREMENT`** | Automatically generates increasing numeric values |

> **Note:** Exact supported types and behaviour can vary between different DBMSs.

### Practical — Enumeration

The room provides two flag-hunting questions solved purely by enumeration. Work down from the database list into a specific database's tables:

| **1** | **List all databases**<br>Run `SHOW DATABASES;` — one of the returned database *names* is itself the flag. |
| --- | --- |

| **2** | **Enumerate `task_4_db`**<br>Run `USE task_4_db;` (MySQL replies `Database changed`) then `SHOW TABLES;` — the flag appears as a table *name*. |
| --- | --- |

```sql
SHOW DATABASES;
USE task_4_db;
SHOW TABLES;
```

Flags recovered:

```text
Q1 (database name):  THM{575a947132312f97b30ee5aeebba629b723d30f9}
Q2 (table name):     THM{692aa7eaec2a2a827f4d1a8bed1f90e5e49d2410}
```

> **Note:** Common beginner mistakes — running `SHOW TABLES;` without selecting a database first (fix with `USE database_name;`), using `DESCRIBE database_name;` when `DESCRIBE` is for tables, forgetting the `;`, or working in the wrong active database.

### Interview Questions — Statements

| Question | Answer |
|---|---|
| **Q1. How do you create a database in MySQL?** | `CREATE DATABASE database_name;` |
| **Q2. How do you list all databases?** | `SHOW DATABASES;` |
| **Q3. How do you select a database?** | `USE database_name;` |
| **Q4. How do you delete a database?** | `DROP DATABASE database_name;` |
| **Q5. How do you create a table?** | `CREATE TABLE table_name (...);` |
| **Q6. How do you list tables in the active database?** | `SHOW TABLES;` |
| **Q7. How do you inspect a table's structure?** | `DESCRIBE table_name;` or `DESC table_name;` |
| **Q8. How do you modify an existing table?** | `ALTER TABLE table_name ...;` |
| **Q9. How do you add a column?** | `ALTER TABLE table_name ADD column_name datatype;` |
| **Q10. How do you delete a table?** | `DROP TABLE table_name;` |
| **Q11. What does `AUTO_INCREMENT` do?** | Automatically generates increasing numeric values, commonly used for unique IDs. |
| **Q12. What does `NOT NULL` mean?** | The column cannot contain NULL values. |
| **Q13. What does `VARCHAR(255)` mean?** | A variable-length character/string field with a maximum length of 255 characters. |

---

## Task 5 — CRUD Operations

**CRUD** is the four fundamental operations for managing data, each mapped to a SQL statement:

| CRUD | SQL | Purpose |
|------|-----|---------|
| **Create** | `INSERT` | Add new record |
| **Read** | `SELECT` | Retrieve records |
| **Update** | `UPDATE` | Modify existing records |
| **Delete** | `DELETE` | Remove records |

The room's examples use the `thm_books` database (`USE thm_books;`) and its `books` table.

### Create — INSERT

`INSERT INTO` adds a new record. List the columns, then the matching `VALUES` in the same order:

```sql
INSERT INTO books (id, name, published_date, description)
VALUES (
    1,
    "Android Security Internals",
    "2014-10-14",
    "An In-Depth Guide to Android's Security Architecture"
);
```

MySQL replies `Query OK, 1 row affected`. The values map column-for-column: `id → 1`, `name → Android Security Internals`, `published_date → 2014-10-14`, `description → An In-Depth Guide to Android's Security Architecture`.

> **Note:** The order of `VALUES` must correspond to the order of the listed columns — `INSERT INTO users (id, username, age) VALUES (1, "surya", 23);` maps `id → 1`, `username → surya`, `age → 23`. The room notes this book record already exists, so there is no need to run the `INSERT` yourself.

### Read — SELECT

`SELECT` retrieves data. Use `*` for all columns or name specific columns:

```sql
SELECT * FROM books;
SELECT name, description FROM books;
```

```text
mysql> SELECT * FROM books;
+----+----------------------------+----------------+------------------------------------------------------+
| id | name                       | published_date | description                                          |
+----+----------------------------+----------------+------------------------------------------------------+
|  1 | Android Security Internals | 2014-10-14     | An In-Depth Guide to Android's Security Architecture |
+----+----------------------------+----------------+------------------------------------------------------+
1 row in set
```

`*` returns everything; naming columns (`name, description`) returns only those and can make results easier to read while reducing unnecessary data retrieval.

### Update — UPDATE

`UPDATE` modifies existing records. `SET` names the new value and `WHERE` targets the record:

```sql
UPDATE books
SET description = "An In-Depth Guide to Android's Security Architecture."
WHERE id = 1;
```

```text
Query OK, 1 row affected
Rows matched: 1  Changed: 1  Warnings: 0
```

> **Warning:** The `WHERE` clause is critical. `UPDATE books SET description = "Something";` with **no** `WHERE` may modify the description of **every** record in the table. Safe/targeted: `UPDATE users SET role = "admin" WHERE id = 5;`. Dangerous: `UPDATE users SET role = "admin";` — every user becomes admin.

### Delete — DELETE

`DELETE FROM` removes records; again `WHERE` decides which:

```sql
DELETE FROM books WHERE id = 1;
```

> **Warning:** `DELETE FROM books;` with no `WHERE` can remove **all** records. Memory trick: **UPDATE without WHERE → change everything; DELETE without WHERE → delete everything.** The room explicitly says *not* to run this `DELETE`, because removing the record would break later examples.

### WHERE — "Which record(s)?"

`WHERE` specifies which records are affected or returned based on a condition, and it applies across `SELECT`, `UPDATE`, and `DELETE`:

```sql
SELECT * FROM users WHERE id = 5;
UPDATE users SET role = "admin" WHERE id = 5;
DELETE FROM users WHERE id = 5;
```

`INSERT` does not normally use `WHERE`. Two other key distinctions: **`INSERT` = new record, `UPDATE` = existing record**; and **`DELETE` removes rows (data), `DROP` removes structure** (`DROP TABLE books;` removes the table, `DROP DATABASE tools_db;` removes the database).

### Practical — tools_db

The Task 5 questions use the `tools_db` database and its `hacking_tools` table:

```sql
USE tools_db;
SHOW TABLES;
SELECT * FROM hacking_tools;
DESC hacking_tools;
```

The table holds 8 hacking tools with columns `id` (INT, PRIMARY KEY, AUTO_INCREMENT), `name` (VARCHAR(50), NOT NULL), `category` (VARCHAR(50), NOT NULL), `description` (TEXT, NULL allowed), and `amount` (INT, NOT NULL):

```text
┌────┬──────────────────┬──────────────────────┬──────────────────────────────┬────────┐
│ id │ name             │ category             │ description                  │ amount │
├────┼──────────────────┼──────────────────────┼──────────────────────────────┼────────┤
│ 1  │ Flipper Zero     │ Multi-tool           │ Portable multi-tool...       │ 169    │
│ 2  │ O.MG cables      │ Cable-based attacks  │ Malicious USB cables...      │ 180    │
│ 3  │ Wi-Fi Pineapple  │ Wi-Fi hacking        │ MITM attacks on wireless...  │ 140    │
│ 4  │ USB Rubber Ducky │ USB attacks          │ USB keystroke injection...   │ 80     │
│ 5  │ iCopy-XS         │ RFID cloning         │ RFID reading/cloning...      │ 375    │
│ 6  │ Lan Turtle       │ Network intelligence │ Remote access/network...     │ 80     │
│ 7  │ Bash Bunny       │ USB attacks          │ Multi-function USB attack    │ 120    │
│ 8  │ Proxmark 3 RDV4  │ RFID cloning         │ RFID reading/writing...      │ 300    │
└────┴──────────────────┴──────────────────────┴──────────────────────────────┴────────┘
```

**Question 1** asks which tool performs man-in-the-middle attacks on wireless networks. Instead of reading the whole table, filter by description (an early preview of `WHERE` + `LIKE`):

```sql
SELECT name
FROM hacking_tools
WHERE description LIKE "%man-in-the-middle%";
```

The result is **Wi-Fi Pineapple** (category *Wi-Fi hacking*, amount 140). **Question 2** asks the shared category of `USB Rubber Ducky` and `Bash Bunny`:

```sql
SELECT name, category
FROM hacking_tools
WHERE name IN ("USB Rubber Ducky", "Bash Bunny");
```

```text
+------------------+-------------+
| name             | category    |
+------------------+-------------+
| USB Rubber Ducky | USB attacks |
| Bash Bunny       | USB attacks |
+------------------+-------------+
```

Both share the category **USB attacks**. (`IN` is covered fully in the Operators task.)

> **Security relevance:** CRUD maps directly onto web apps — registration is `INSERT`, login/profile is `SELECT`, edit profile is `UPDATE`, delete account is `DELETE`. If user-controlled input is inserted into SQL unsafely, an attacker can manipulate these operations, enabling unauthorised retrieval, modification, deletion, authentication bypass, and information disclosure. SQL Injection is not caused by CRUD itself — it occurs when applications construct SQL unsafely from untrusted input.

### Interview Questions — CRUD

| Question | Answer |
|---|---|
| **Q1. What does CRUD stand for?** | Create, Read, Update, Delete. |
| **Q2. What SQL statement implements CRUD Create?** | `INSERT`. |
| **Q3. What SQL statement implements CRUD Read?** | `SELECT`. |
| **Q4. What SQL statement implements CRUD Update?** | `UPDATE`. |
| **Q5. What SQL statement implements CRUD Delete?** | `DELETE`. |
| **Q6. How do you insert a record?** | `INSERT INTO table_name (columns) VALUES (values);` |
| **Q7. How do you retrieve all columns?** | `SELECT * FROM table_name;` |
| **Q8. What does `*` mean in SELECT?** | It means all columns. |
| **Q9. How do you retrieve specific columns?** | `SELECT column1, column2 FROM table_name;` |
| **Q10. How do you modify an existing record?** | `UPDATE table_name SET column = value WHERE condition;` |
| **Q11. How do you delete a specific record?** | `DELETE FROM table_name WHERE condition;` |
| **Q12. Why is WHERE important in UPDATE?** | It restricts which records are modified. |
| **Q13. Why is WHERE important in DELETE?** | It restricts which records are deleted. |
| **Q14. What can happen if UPDATE is used without WHERE?** | The update can affect all records in the table. |
| **Q15. What can happen if DELETE is used without WHERE?** | All records in the table can be deleted. |
| **Q16. Difference between DELETE and DROP TABLE?** | DELETE removes records; DROP TABLE removes the entire table. |
| **Q17. What tool in the `hacking_tools` table performs MITM attacks on wireless networks?** | Wi-Fi Pineapple. |
| **Q18. What category is shared by USB Rubber Ducky and Bash Bunny?** | USB attacks. |

---

## Task 6 — Clauses

A **clause** is part of an SQL statement that specifies how data should be retrieved, grouped, filtered, or sorted. We have already used `FROM` (which table) and `WHERE` (which rows). This task adds four more: `DISTINCT` (unique values), `GROUP BY` (create groups), `ORDER BY` (sort), and `HAVING` (filter groups). The examples again use the `books` table (`thm_books`) and later `tools_db`.

### DISTINCT — Unique Values

`DISTINCT` removes duplicate values from results. Given a `books` table where `Ethical Hacking` appears twice:

```sql
SELECT DISTINCT name FROM books;
```

```text
+----------------------------+
| name                       |
+----------------------------+
| Android Security Internals |
| Bug Bounty Bootcamp        |
| Car Hacker's Handbook      |
| Designing Secure Software  |
| Ethical Hacking            |
+----------------------------+
5 rows in set
```

`SELECT name FROM books;` can return duplicates; `SELECT DISTINCT name FROM books;` returns each unique name once. Memory trick: **DISTINCT = UNIQUE VALUES ONLY**.

### GROUP BY — Create Groups

`GROUP BY` groups records that share a column value, and is especially useful with **aggregate functions** (`COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`):

```sql
SELECT name, COUNT(*)
FROM books
GROUP BY name;
```

```text
+----------------------------+----------+
| name                       | COUNT(*) |
+----------------------------+----------+
| Android Security Internals |        1 |
| Bug Bounty Bootcamp        |        1 |
| Car Hacker's Handbook      |        1 |
| Designing Secure Software  |        1 |
| Ethical Hacking            |        2 |
+----------------------------+----------+
5 rows in set
```

The two `Ethical Hacking` records collapse into one group with `COUNT(*) = 2`. Compared to `DISTINCT` (which just returns unique output values), `GROUP BY` creates groups for analysis and aggregation.

### ORDER BY — Sort Results

`ORDER BY` sorts records **ASC** (ascending: small→large, A→Z, old→new) or **DESC** (descending: large→small, Z→A, new→old):

```sql
SELECT * FROM books ORDER BY published_date ASC;
SELECT * FROM books ORDER BY published_date DESC;
```

Ascending puts the oldest date (`2014-10-14`) first and the newest (`2021-12-21`) last; descending reverses it. If neither `ASC` nor `DESC` is given, `ORDER BY` defaults to ascending — `ORDER BY published_date;` equals `ORDER BY published_date ASC;`.

### HAVING — Filter Groups

`HAVING` filters **grouped/aggregated** results, whereas `WHERE` filters individual rows *before* grouping. The room's example keeps only groups whose name contains `Hack`:

```sql
SELECT name, COUNT(*)
FROM books
GROUP BY name
HAVING name LIKE '%Hack%';
```

```text
+-----------------------+----------+
| name                  | COUNT(*) |
+-----------------------+----------+
| Car Hacker's Handbook |        1 |
| Ethical Hacking       |        2 |
+-----------------------+----------+
2 rows in set
```

The query runs step by step, and the logical processing order differs from the written order:

| **1** | **`FROM books`**<br>Read the records from the `books` table. |
| --- | --- |

| **2** | **`GROUP BY name`**<br>Create one group per name; `Ethical Hacking` groups its two rows together. |
| --- | --- |

| **3** | **`HAVING name LIKE '%Hack%'`**<br>Keep only the groups whose name contains `Hack` (`Car Hacker's Handbook`, `Ethical Hacking`). |
| --- | --- |

| **4** | **`COUNT(*)`**<br>Report the count per surviving group (`1` and `2`). |
| --- | --- |

A very common pattern is finding names that appear more than once: `... GROUP BY name HAVING COUNT(*) > 1;` returns `Ethical Hacking | 2`. Memory trick: **WHERE = which ROWS (before GROUP BY); HAVING = which GROUPS (after GROUP BY).**

### Clause Order

When *writing* a `SELECT`, the clause order is `SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY`, but the engine *logically* processes it as `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`. A query combining everything:

```sql
SELECT category, COUNT(*)
FROM hacking_tools
WHERE amount >= 100
GROUP BY category
HAVING COUNT(*) >= 1
ORDER BY COUNT(*) DESC;
```

> **Tip:** Syntax order ≠ logical execution order. This distinction explains why aliases, aggregation, and filtering behave as they do — and why `WHERE` cannot filter on an aggregate (that is `HAVING`'s job).

### Practical — tools_db

Task 6 questions run against `tools_db` / `hacking_tools`:

```sql
SELECT DISTINCT(category) FROM hacking_tools;
SELECT * FROM hacking_tools ORDER BY name ASC;
SELECT * FROM hacking_tools ORDER BY name DESC;
```

The distinct categories are `Multi-tool`, `Cable-based attacks`, `Wi-Fi hacking`, `USB attacks`, `RFID cloning`, and `Network intelligence` — **6** in total. Sorting names ascending starts with `Bash Bunny`; descending starts with `Wi-Fi Pineapple`.

```text
Q1 (distinct categories):        6
Q2 (first name, ascending):      Bash Bunny
Q3 (first name, descending):     Wi-Fi Pineapple
```

> **Security relevance:** These clauses drive SOC/log analysis. Against a `logs` table you can list unique source IPs (`SELECT DISTINCT source_ip FROM logs;`), count events per IP (`GROUP BY source_ip`), sort by volume (`ORDER BY COUNT(*) DESC`), and isolate high-volume attackers (`HAVING COUNT(*) > 100`) — the backbone of threat hunting and incident response.

> **Note:** Common mistakes — using `DISTINCT` when you actually need counts (`GROUP BY` + `COUNT(*)`), confusing `WHERE` (rows) with `HAVING` (groups), writing `ORDER BY` before `GROUP BY`, and assuming `DISTINCT` changes the table (it only affects the result).

### Interview Questions — Clauses

| Question | Answer |
|---|---|
| **Q1. What is a SQL clause?** | A part of an SQL statement used to specify criteria for retrieving, filtering, grouping, sorting or manipulating data. |
| **Q2. What does DISTINCT do?** | It removes duplicate values from the query result. |
| **Q3. What does GROUP BY do?** | It groups records with the same values, commonly for use with aggregate functions. |
| **Q4. What does ORDER BY do?** | It sorts query results in ascending or descending order. |
| **Q5. What does ASC mean?** | Ascending order. |
| **Q6. What does DESC mean?** | Descending order. |
| **Q7. What does HAVING do?** | It filters grouped/aggregated results. |
| **Q8. WHERE vs HAVING?** | WHERE filters rows before grouping; HAVING filters groups after grouping/aggregation. |
| **Q9. DISTINCT vs GROUP BY?** | DISTINCT returns unique values; GROUP BY creates groups, usually for aggregation. |
| **Q10. What is the default ORDER BY direction?** | Ascending (ASC). |
| **Q11. Why is GROUP BY commonly used with COUNT()?** | GROUP BY creates groups and COUNT() calculates how many records belong to each group. |
| **Q12. How do you find unique categories?** | `SELECT DISTINCT category FROM hacking_tools;` |
| **Q13. How do you count records per category?** | `SELECT category, COUNT(*) FROM hacking_tools GROUP BY category;` |
| **Q14. How do you filter groups?** | Use `HAVING`. |
| **Q15. How do you sort results alphabetically?** | `ORDER BY column_name ASC;` |

---

## Task 7 — Operators

SQL **operators** are symbols or keywords that compare values, combine conditions, search patterns, and perform calculations — the engine of the `WHERE` clause. They fall into comparison, logical, pattern-matching, membership/range, NULL, and arithmetic categories.

### Comparison Operators

| Operator | Meaning |
|----------|---------|
| **`=`** | Equal |
| **`!=`** / **`<>`** | Not equal |
| **`>`** | Greater than |
| **`<`** | Less than |
| **`>=`** | Greater than or equal |
| **`<=`** | Less than or equal |

```sql
SELECT * FROM hacking_tools WHERE category = 'Multi-tool';
SELECT * FROM hacking_tools WHERE category != 'USB attacks';
SELECT * FROM hacking_tools WHERE amount > 100;
SELECT * FROM hacking_tools WHERE amount >= 300;
SELECT * FROM hacking_tools WHERE amount <= 100;
```

The boundary matters: `amount > 100` matches `101, 120, 169, 300` but **not** `100`, while `amount >= 300` **includes** `300`. In a `WHERE` condition, `=` is a comparison, not an assignment. Memory: `>` MORE, `<` LESS, `=` SAME, `>=` MORE+SAME, `<=` LESS+SAME, `!=` NOT SAME.

### Logical Operators — AND / OR / NOT

`AND` requires **all** conditions true, `OR` requires **at least one**, and `NOT` reverses a condition:

```sql
SELECT * FROM hacking_tools WHERE category = 'Network intelligence' AND amount < 100;
SELECT * FROM hacking_tools WHERE category = 'USB attacks' OR category = 'RFID cloning';
SELECT * FROM hacking_tools WHERE NOT category = 'USB attacks';
```

For example `WHERE amount > 100 AND amount < 300` keeps the range `100 < amount < 300`, while `WHERE amount < 100 OR amount > 300` keeps the extremes. `NOT category = 'USB attacks'` is equivalent to `category != 'USB attacks'`. Memory: **AND = BOTH, OR = ANY, NOT = OPPOSITE.**

### Pattern Matching — LIKE and %

`LIKE` matches patterns instead of exact values, using `%` as a wildcard for zero or more characters:

```sql
SELECT * FROM hacking_tools WHERE name LIKE 'USB%';
SELECT * FROM hacking_tools WHERE name LIKE '%Ducky';
SELECT * FROM hacking_tools WHERE description LIKE '%pentesters%';
```

The wildcard position controls the match: `'Hack%'` starts with Hack, `'%Hack'` ends with Hack, `'%Hack%'` contains Hack anywhere. In contrast, `=` is an exact match (`WHERE name = 'Flipper Zero'` matches only that value), whereas `LIKE '%Flipper%'` matches any value containing `Flipper`.

### Membership, Range, and NULL

`IN` checks whether a value matches any item in a list (a compact alternative to chained `OR`s); `NOT IN` is the opposite; `BETWEEN` checks an inclusive range; `IS NULL` / `IS NOT NULL` test for absent values:

```sql
SELECT * FROM hacking_tools WHERE category IN ('USB attacks', 'RFID cloning', 'Wi-Fi hacking');
SELECT * FROM hacking_tools WHERE category NOT IN ('USB attacks', 'RFID cloning');
SELECT * FROM hacking_tools WHERE amount BETWEEN 100 AND 300;
SELECT * FROM books WHERE description IS NULL;
SELECT * FROM books WHERE description IS NOT NULL;
```

`BETWEEN 100 AND 300` includes both endpoints — equivalent to `amount >= 100 AND amount <= 300`.

> **Warning:** Do **not** use `description = NULL` to test for NULL — it does not work. Always use `description IS NULL` / `IS NOT NULL`.

### Arithmetic Operators

```sql
SELECT 10 + 5;   -- 15
SELECT 10 - 5;   -- 5
SELECT 10 * 5;   -- 50
SELECT 10 / 5;   -- 2
SELECT 10 % 3;   -- 1
```

The **modulo** `%` returns the remainder: `20 % 10 = 0`, `21 % 10 = 1`, `25 % 10 = 5`. This is useful for checking divisibility or the last digit — `amount % 10 = 0` means the value ends in 0.

### Combining Operators and Precedence

SQL evaluates `AND` before `OR`, so use parentheses to make mixed logic explicit:

```sql
SELECT *
FROM hacking_tools
WHERE (category = 'USB attacks' OR category = 'RFID cloning')
AND amount >= 100;
```

Without the parentheses, `category = 'USB attacks' OR category = 'RFID cloning' AND amount > 100` is read as `category = 'USB attacks' OR (category = 'RFID cloning' AND amount > 100)`.

### Practical — tools_db

The Task 7 questions combine operators against `hacking_tools`:

```sql
SELECT name FROM hacking_tools WHERE category = 'Multi-tool' AND description LIKE '%pentesters%';
SELECT category FROM hacking_tools WHERE amount >= 300;
SELECT name FROM hacking_tools WHERE category = 'Network intelligence' AND amount < 100;
```

Question 1 combines `=`, `AND`, `LIKE`, and `%` to return **Flipper Zero**. Question 2 (`amount >= 300`) returns two `RFID cloning` records — `iCopy-XS` (375) and `Proxmark 3 RDV4` (300) — because `>=` includes the boundary 300. Question 3 returns **Lan Turtle** (category *Network intelligence*, amount 80 < 100).

```text
Q1 (Multi-tool, useful for pentesters and geeks):   Flipper Zero
Q2 (category of tools with amount >= 300):          RFID cloning
Q3 (Network intelligence, amount < 100):            Lan Turtle
```

> **Security relevance:** Operators drive security data analysis. Against an `auth_logs` table, `SELECT * FROM auth_logs WHERE status = 'failed' AND attempts >= 5;` surfaces suspicious brute-force activity. And because SQL Injection is fundamentally about manipulating the logical meaning of a query, understanding `=`, `AND`, `OR`, and `LIKE` is the groundwork for understanding how a `WHERE username = 'alice' AND password = '...'` check can be subverted.

> **Note:** The `%` symbol has two contexts — a **LIKE wildcard** (`LIKE '%text%'`) and the **modulo** operator (`amount % 10`). Common mistakes: confusing `>`/`>=` and `<`/`<=` boundaries, using `=` where `LIKE` is needed, forgetting the wildcard (`LIKE 'pentesters'` vs `LIKE '%pentesters%'`), using `= NULL`, and mixing `AND`/`OR` without parentheses.

### Interview Questions — Operators

| Question | Answer |
|---|---|
| **Q1. What is a SQL operator?** | A symbol or keyword used to perform a comparison, logical operation, pattern match or calculation in SQL. |
| **Q2. What does `=` mean?** | Equal to. |
| **Q3. Difference between `>` and `>=`?** | `>` excludes the boundary value; `>=` includes it. |
| **Q4. What does AND do?** | Requires all specified conditions to be true. |
| **Q5. What does OR do?** | Requires at least one condition to be true. |
| **Q6. What does NOT do?** | Reverses a condition. |
| **Q7. What is LIKE?** | LIKE performs pattern matching on values, commonly strings. |
| **Q8. What does `%` mean in LIKE?** | It is a wildcard representing zero or more characters. |
| **Q9. Difference between `=` and LIKE?** | `=` performs an equality comparison; LIKE performs pattern matching. |
| **Q10. What does IN do?** | Checks whether a value matches one of the values in a list. |
| **Q11. What does BETWEEN do?** | Checks whether a value falls within a specified range. |
| **Q12. How do you check for NULL?** | `IS NULL`. |
| **Q13. How do you check that a value is not NULL?** | `IS NOT NULL`. |
| **Q14. What is the modulo operator?** | `%`; it returns the remainder of a division. |
| **Q15. What does `amount >= 300` mean?** | Amount is 300 or greater. |
| **Q16. What does `amount < 100` mean?** | Amount is strictly less than 100. |
| **Q17. What is the difference between AND and OR?** | AND requires all conditions; OR requires at least one condition. |

---

## Task 8 — Functions

SQL **functions** are built-in operations that calculate, transform, or aggregate data. They split into **scalar** functions that work on a single row's value (e.g. `LENGTH()`) and **aggregate** functions that work across many rows (`COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`). Task 8 particularly demonstrates `LENGTH()`, `SUM()`, and `GROUP_CONCAT()`.

### LENGTH() and the AS Alias

`LENGTH()` returns the length of a string in **bytes** (for ordinary ASCII text this equals the character count; `CHAR_LENGTH()` counts characters). `AS` gives a calculated column a readable name:

```sql
SELECT LENGTH('Hello');
SELECT name, LENGTH(name) AS name_length FROM hacking_tools;
SELECT SUM(amount) AS total FROM hacking_tools;
```

`LENGTH('Hello')` returns `5`. The alias turns an awkward `LENGTH(name)` header into `name_length`. You can also sort by a function's result — `ORDER BY LENGTH(name) DESC` lists the longest names first.

### Aggregate Functions

| Function | Returns | On `hacking_tools.amount` |
|----------|---------|---------------------------|
| **`COUNT()`** | How many | `COUNT(*)` = 8 rows |
| **`SUM()`** | Total | `SUM(amount)` = 1444 |
| **`AVG()`** | Average | `AVG(amount)` = 180.5 |
| **`MIN()`** | Smallest | `MIN(amount)` = 80 |
| **`MAX()`** | Largest | `MAX(amount)` = 375 |

```sql
SELECT COUNT(*) FROM hacking_tools;
SELECT SUM(amount) FROM hacking_tools;
SELECT AVG(amount) FROM hacking_tools;
SELECT MIN(amount) FROM hacking_tools;
SELECT MAX(amount) FROM hacking_tools;
```

`SUM(amount)` adds `169 + 180 + 140 + 80 + 375 + 80 + 120 + 300 = 1444`; `AVG` is `1444 / 8 = 180.5`. Note `COUNT(*)` counts rows, while `COUNT(column)` counts non-NULL values in that column.

### GROUP_CONCAT()

`GROUP_CONCAT()` combines values from multiple rows into one string (comma-separated by default), and `SEPARATOR` sets a custom delimiter:

```sql
SELECT GROUP_CONCAT(name) FROM hacking_tools;
SELECT GROUP_CONCAT(name SEPARATOR ' & ') FROM hacking_tools;
```

The first yields `Flipper Zero,iCopy-XS,Lan Turtle,...`; the second yields `Flipper Zero & iCopy-XS & Lan Turtle`.

### Practical — tools_db

The three Task 8 questions bring together `LENGTH()`, `SUM()`, modulo, and `GROUP_CONCAT()`:

```sql
SELECT name FROM hacking_tools ORDER BY LENGTH(name) DESC LIMIT 1;
SELECT SUM(amount) AS total FROM hacking_tools;
SELECT GROUP_CONCAT(name SEPARATOR ' & ') AS grouped FROM hacking_tools WHERE amount % 10 <> 0;
```

Question 1 (longest name) — `USB Rubber Ducky` is 16 characters, longer than `Wi-Fi Pineapple`/`Proxmark 3 RDV4` (15) and `Flipper Zero` (12); `LIMIT 1` returns just the top row. Question 2 (total) is **1444**. Question 3 asks for names whose amount does **not** end in 0: only `Flipper Zero` (169 % 10 = 9) and `iCopy-XS` (375 % 10 = 5) survive `amount % 10 <> 0`, concatenated with ` & `.

```text
Q1 (longest tool name):                        USB Rubber Ducky
Q2 (total sum of all tools):                    1444
Q3 (names where amount not ending in 0, "&"):   Flipper Zero & iCopy-XS
```

> **Security relevance:** `GROUP_CONCAT()` is heavily used in SQL Injection to collapse many rows (table names, column names, dumped data) into a single response string — which is exactly why it appears in this fundamentals room. Aggregate functions also power log analytics: counting events, summing bytes, and finding min/max timestamps during investigations.

> **Note:** Common mistakes — expecting `LENGTH()` to always equal character count (it is bytes; use `CHAR_LENGTH()` for multibyte text), forgetting `SEPARATOR` defaults to a comma, and confusing `COUNT(*)` (rows) with `COUNT(column)` (non-NULL values).

### Interview Questions — Functions

| Question | Answer |
|---|---|
| **Q1. What is a SQL function?** | A built-in operation used to calculate, transform or aggregate data. |
| **Q2. What does LENGTH() do?** | It returns the length of a string in bytes in MySQL. |
| **Q3. What does COUNT() do?** | It counts rows or non-NULL values depending on its usage. |
| **Q4. What does COUNT(*) count?** | Rows in the result set. |
| **Q5. What does SUM() do?** | Calculates the total of numeric values. |
| **Q6. What does AVG() do?** | Calculates the average of numeric values. |
| **Q7. What does MIN() do?** | Returns the smallest value. |
| **Q8. What does MAX() do?** | Returns the largest value. |
| **Q9. What does GROUP_CONCAT() do?** | Combines values from multiple rows into one concatenated string. |
| **Q10. What does SEPARATOR do in GROUP_CONCAT()?** | Specifies the string used between concatenated values. |
| **Q11. What does AS do?** | Creates an alias for a column or expression. |
| **Q12. What does `amount % 10` do?** | Returns the remainder after dividing amount by 10. |
| **Q13. What does `amount % 10 = 0` indicate for positive integers?** | The amount ends in 0 / is divisible by 10. |
| **Q14. What does `amount % 10 <> 0` indicate?** | The amount does not end in 0. |
| **Q15. How do you find the longest string in a column?** | `ORDER BY LENGTH(column) DESC`, optionally with `LIMIT 1`. |
| **Q16. How do you calculate the total of a numeric column?** | `SUM(column)`. |

---

## Task 9 — Conclusion

This room built SQL from the ground up: from what a database is, through the structural statements that create and inspect databases and tables, to the CRUD operations that manage data, and finally the clauses, operators, and functions that shape and analyse results. The whole knowledge map flows as **DATABASE → TABLE (rows + columns) → SQL → CRUD → CLAUSES → OPERATORS → FUNCTIONS**, and it all feeds directly into web-application security and **SQL Injection**.

The recurring security theme is that a database is only as safe as the queries built against it. `WHERE`, operators, and functions decide exactly what a query does — so when an application constructs SQL unsafely from untrusted input, an attacker can rewrite that logic to retrieve, modify, or delete data, or bypass authentication. Understanding these fundamentals is the prerequisite for understanding, detecting, and preventing SQL Injection.

> **Security relevance:** The learning ladder is `SQL BASICS → SELECT → WHERE → CLAUSES → OPERATORS → FUNCTIONS → SQL INJECTION`. Every layer you now understand is a layer an attacker manipulates and a defender protects.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Database** | Organised collection of data; relational (SQL, tables) vs non-relational (NoSQL, flexible). |
| **Structure** | Table = rows + columns; primary key identifies a row, foreign key links tables. |
| **SQL vs DBMS** | SQL is the language; the DBMS (MySQL, PostgreSQL…) runs it against the database. |
| **Databases** | `CREATE DATABASE`, `SHOW DATABASES`, `USE`, `DROP DATABASE`. |
| **Tables** | `CREATE TABLE`, `SHOW TABLES`, `DESCRIBE`/`DESC`, `ALTER TABLE`, `DROP TABLE`. |
| **CRUD** | `INSERT` (create), `SELECT` (read), `UPDATE` (modify), `DELETE` (remove). |
| **WHERE** | Targets rows in `SELECT`/`UPDATE`/`DELETE`; omitting it affects every row. |
| **Clauses** | `DISTINCT` (unique), `GROUP BY` (group), `HAVING` (filter groups), `ORDER BY` (sort ASC/DESC). |
| **Operators** | `= != <> > < >= <=`, `AND OR NOT`, `LIKE %`, `IN`, `BETWEEN`, `IS NULL`. |
| **Functions** | `LENGTH()`, `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`, `GROUP_CONCAT()`, alias with `AS`. |

**Key idea:** SQL manages relational data through structural statements, CRUD operations, and result-shaping clauses/operators/functions — and mastering how a query is built is the foundation for understanding how it can be attacked.

---

## 30-Second Revision

- A **database** organises data; **relational** databases (SQL) use tables of rows and columns, **non-relational** (NoSQL) use flexible formats.
- A **primary key** uniquely identifies a row; a **foreign key** links tables. **SQL** is the language; the **DBMS** runs it.
- Manage structure with `CREATE`/`SHOW`/`USE`/`DROP` (databases) and `CREATE`/`SHOW`/`DESCRIBE`/`ALTER`/`DROP` (tables).
- **CRUD** = `INSERT`, `SELECT`, `UPDATE`, `DELETE`; always use `WHERE` to target rows — without it, `UPDATE`/`DELETE` hit every record.
- Shape results with `DISTINCT`, `GROUP BY`, `HAVING`, and `ORDER BY` (ASC/DESC); logical order is `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`.
- Filter with `= != > < >= <=`, `AND`/`OR`/`NOT`, `LIKE` + `%`, `IN`, `BETWEEN`, and `IS NULL`; `%` is also modulo.
- Functions include `LENGTH()`, `COUNT()`, `SUM()`, `AVG()`, `MIN()`, `MAX()`, and `GROUP_CONCAT()`; name results with `AS`.
- Unsafe query construction from untrusted input leads to **SQL Injection** — these fundamentals are the groundwork for web-app security.

---

## Cheat Sheet

### Access MySQL

```bash
$ mysql -u root -p
```

### Database & Table Statements

```sql
CREATE DATABASE database_name;
SHOW DATABASES;
USE database_name;
DROP DATABASE database_name;

CREATE TABLE table_name (
    column_name datatype
);
SHOW TABLES;
DESCRIBE table_name;
ALTER TABLE table_name ADD column_name datatype;
DROP TABLE table_name;
```

### CRUD

```sql
INSERT INTO table_name (columns) VALUES (values);
SELECT * FROM table_name;
SELECT column1, column2 FROM table_name;
UPDATE table_name SET column = value WHERE condition;
DELETE FROM table_name WHERE condition;
```

### Clauses

```sql
SELECT DISTINCT column FROM table;
SELECT column, COUNT(*) FROM table GROUP BY column;
SELECT * FROM table ORDER BY column ASC;
SELECT * FROM table ORDER BY column DESC;
SELECT column, COUNT(*) FROM table GROUP BY column HAVING COUNT(*) > 1;
```

### Operators

| Category | Operators |
|----------|-----------|
| **Comparison** | `=`, `!=`, `<>`, `>`, `<`, `>=`, `<=` |
| **Logical** | `AND`, `OR`, `NOT` |
| **Pattern** | `LIKE`, `NOT LIKE`, `%` (wildcard) |
| **Membership** | `IN`, `NOT IN` |
| **Range** | `BETWEEN … AND …` |
| **NULL** | `IS NULL`, `IS NOT NULL` |
| **Arithmetic** | `+`, `-`, `*`, `/`, `%` (modulo) |

### Functions

```sql
SELECT LENGTH(name) AS name_length FROM hacking_tools;
SELECT COUNT(*) FROM hacking_tools;
SELECT SUM(amount) AS total FROM hacking_tools;
SELECT AVG(amount) FROM hacking_tools;
SELECT MIN(amount) FROM hacking_tools;
SELECT MAX(amount) FROM hacking_tools;
SELECT GROUP_CONCAT(name SEPARATOR ' & ') FROM hacking_tools;
```

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is SQL, and what is a DBMS?** | SQL is the language used to interact with relational databases; the DBMS (e.g. MySQL) is the system that manages the database and executes SQL. |
| **Q2. Relational vs non-relational database?** | Relational stores structured data in tables (rows/columns) with a defined schema; non-relational (NoSQL) uses flexible, non-tabular models. |
| **Q3. Primary key vs foreign key?** | A primary key uniquely identifies a record within a table; a foreign key creates a link to another table. |
| **Q4. Which statements manage databases and tables?** | Databases: `CREATE`/`SHOW`/`USE`/`DROP`. Tables: `CREATE`/`SHOW`/`DESCRIBE`/`ALTER`/`DROP`. |
| **Q5. What is CRUD in SQL?** | Create=`INSERT`, Read=`SELECT`, Update=`UPDATE`, Delete=`DELETE`. |
| **Q6. Why is WHERE critical in UPDATE and DELETE?** | It restricts which rows are affected; without it, the operation hits every record in the table. |
| **Q7. WHERE vs HAVING?** | WHERE filters individual rows before grouping; HAVING filters groups after aggregation. |
| **Q8. Difference between `=` and LIKE?** | `=` is an exact equality comparison; LIKE performs pattern matching with the `%` wildcard. |
| **Q9. What does GROUP_CONCAT() do and why does it matter for security?** | It combines many rows into one string; attackers use it in SQL Injection to dump table/column data in a single response. |
| **Q10. How do the fundamentals relate to SQL Injection?** | Injection manipulates the logical meaning of a query built from untrusted input, so understanding `WHERE`, operators, and functions is the groundwork for exploiting and defending against it. |

## Final Takeaway

**SQL (Structured Query Language)** is the language for interacting with **relational databases**, which a **DBMS** such as **MySQL** runs against structured **tables** of rows and columns linked by **primary** and **foreign keys**. This room walks the full workflow: managing structure with statements like `CREATE`, `USE`, `ALTER`, and `DROP`; manipulating data with the four **CRUD** operations `INSERT`, `SELECT`, `UPDATE`, and `DELETE`; and shaping results with **clauses** (`DISTINCT`, `GROUP BY`, `HAVING`, `ORDER BY`), **operators** (`=`, `AND`, `OR`, `LIKE`, `IN`, `BETWEEN`, `IS NULL`), and **functions** (`LENGTH()`, `COUNT()`, `SUM()`, `GROUP_CONCAT()`). The `WHERE` clause is the constant safety net — omitting it makes `UPDATE` and `DELETE` affect every row. Above all, these fundamentals are the direct groundwork for **SQL Injection**: because a query's behaviour is decided by how it is constructed, understanding SQL is what lets you recognise, exploit responsibly, and defend against unsafe database interactions.
