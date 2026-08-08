# 🗃️ SQL Fundamentals
> Cyber Security 101 → Web Hacking → SQL Fundamentals
> Goal: Learn how databases work and use SQL to retrieve/manage data.
> Difficulty: Beginner
> Room Time: ~120 min
> Status: Part 1 — Tasks 1 to 3
> Platform: TryHackMe
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 0. SQL FUNDAMENTALS — BIG PICTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SQL = Structured Query Language
SQL is primarily used to interact with RELATIONAL DATABASES.
A database stores organised information that applications can create,
retrieve, modify, analyse and delete.
CYBERSECURITY CONNECTION:
    Web Application
          │
          ▼
      Backend/API
          │
          ▼
       Database
          │
          ▼
      SQL Queries
          │
          ├──► Retrieve information
          ├──► Insert information
          ├──► Modify information
          ├──► Delete information
          └──► Filter / analyse information
WHY SECURITY PEOPLE NEED SQL:
    Offensive Security
        ├── Understand SQL Injection
        ├── Understand how applications query databases
        ├── Retrieve data from compromised applications
        └── Understand database manipulation
    Defensive Security
        ├── Analyse database activity
        ├── Investigate suspicious records
        ├── Search/filter security-relevant data
        └── Apply access restrictions
KEY IDEA:
    If an application stores data, there is a good chance that a
    database is involved somewhere behind the application.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TASK 1 — INTRODUCTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 1.1 Why Databases Matter
Databases are extremely common in computing and cybersecurity.
Examples of systems that commonly rely on databases:
    • Web applications
    • User authentication systems
    • Access-control systems
    • SOC/SIEM platforms
    • Malware-analysis systems
    • Threat-detection systems
    • Business applications
    • Social-media platforms
    • E-commerce systems
    • Streaming platforms
A security professional therefore needs to understand:
    DATABASE
       │
       ├── How data is stored
       ├── How data is organised
       ├── How data is retrieved
       ├── How data is modified
       └── How data can be protected
### 1.2 SQL in Cybersecurity
SQL knowledge is especially important for understanding:
    SQL Injection
SQL Injection occurs when an application improperly handles
user-controlled input that becomes part of an SQL query.
Understanding normal SQL first makes SQL Injection much easier
to understand later.
Example concept:
    User Input
        │
        ▼
    Application
        │
        ▼
    SQL Query
        │
        ▼
    Database
If the application incorrectly combines user input with SQL,
the attacker may be able to manipulate the query.
IMPORTANT:
    SQL itself is NOT a vulnerability.
    Poorly designed/implemented database interactions can create
    vulnerabilities such as SQL Injection.
### 1.3 Room Learning Objectives
By completing SQL Fundamentals, you should understand:
    1. What databases are
    2. Important database terminology
    3. Different types of databases
    4. What SQL is
    5. SQL CRUD operations
    6. SQL clauses
    7. SQL operators
    8. SQL functions
    9. How these concepts apply to cybersecurity
### 1.4 Prerequisites
The room is designed for beginners.
No significant previous IT knowledge is required.
Helpful background:
    Linux Fundamentals
### TASK 1 ANSWER
Question:
    "Teach me the basics of SQL!"
Answer:
    No Answer Needed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TASK 2 — DATABASES 101
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2.1 What is a Database?
A DATABASE is an organised collection of data/information that
can be accessed, managed, analysed and manipulated.
Think:
    DATABASE
       │
       ├── Stores information
       ├── Organises information
       ├── Allows searching
       ├── Allows modification
       └── Allows analysis
REAL-WORLD EXAMPLES:
    Instagram
        └── Users, posts, comments, likes, messages
    E-commerce
        └── Products, customers, orders, payments
    Banking
        └── Accounts, transactions, customers
    University
        └── Students, courses, marks, attendance
    TryHackMe
        └── Users, rooms, progress, achievements
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2.2 Types of Databases
There are two broad categories introduced in this room:
    ┌───────────────────────────┐
    │        DATABASES          │
    └─────────────┬─────────────┘
                  │
          ┌───────┴────────┐
          ▼                ▼
    RELATIONAL        NON-RELATIONAL
       (SQL)              (NoSQL)
          │                │
          ▼                ▼
    Structured data    Flexible / varying
    Tables             formats
    Rows               Non-tabular models
    Columns
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2.3 Relational Databases
A RELATIONAL DATABASE stores data in structured tables.
Basic structure:
    DATABASE
       │
       ├── Table 1
       │     ├── Columns
       │     └── Rows
       │
       ├── Table 2
       │     ├── Columns
       │     └── Rows
       │
       └── Table 3
             ├── Columns
             └── Rows
Common relational database systems include:
    • MySQL
    • PostgreSQL
    • Microsoft SQL Server
    • Oracle Database
Relational databases are suitable when data follows a reliable,
consistent structure.
EXAMPLE:
    STUDENTS TABLE
    ┌──────────┬────────────┬───────┐
    │ student_id│ name       │ age   │
    ├──────────┼────────────┼───────┤
    │ 101      │ Rahul      │ 20    │
    │ 102      │ Priya      │ 21    │
    │ 103      │ Aman       │ 20    │
    └──────────┴────────────┴───────┘
Every row follows the same general structure.
### WHEN TO USE RELATIONAL DATABASE?
Use a relational database when:
    • Data has a predictable structure
    • Data fits naturally into tables
    • Relationships between data are important
    • Strong consistency is required
    • The schema is relatively well-defined
MEMORY TRICK:
    RELATIONAL = RELATIONSHIPS + STRUCTURED TABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2.4 Non-Relational Databases
A NON-RELATIONAL database does not require data to be stored in
traditional tables consisting strictly of rows and columns.
They are commonly associated with NoSQL databases.
They are useful when data:
    • Has varying formats
    • Is unstructured or semi-structured
    • Changes structure frequently
    • Needs flexible schemas
Examples of data that may vary greatly:
    • Social-media content
    • JSON documents
    • Logs
    • Sensor data
    • User-generated content
Concept:
    RELATIONAL
        → structured
        → tables
        → rows + columns
    NON-RELATIONAL
        → flexible
        → varying formats
        → not restricted to traditional tables
MEMORY TRICK:
    NoSQL ≠ "No SQL" in every context.
    It is commonly understood as "Not Only SQL".
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2.5 Relational vs Non-Relational
    ┌──────────────────────┬─────────────────────────┐
    │ RELATIONAL           │ NON-RELATIONAL          │
    ├──────────────────────┼─────────────────────────┤
    │ Structured data      │ Flexible data           │
    │ Tables               │ Non-tabular models      │
    │ Rows + columns       │ Documents/key-value/etc │
    │ Defined schema       │ Flexible schema         │
    │ Relationships        │ Flexible relationships  │
    │ SQL commonly used    │ NoSQL systems common    │
    └──────────────────────┴─────────────────────────┘
QUESTION:
    Data varies greatly in format?
ANSWER:
    Non-relational database
QUESTION:
    Data reliably follows the same structured format?
ANSWER:
    Relational database
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2.6 Tables
A TABLE is a structured collection of related data inside a
relational database.
Think of a table like a spreadsheet:
    DATABASE
       │
       ▼
    TABLE
       │
       ├── COLUMN
       ├── COLUMN
       ├── COLUMN
       │
       └── ROWS
Example:
    BOOKS
    ┌─────────┬──────────────────┬──────────────┐
    │ id      │ name             │ published    │
    ├─────────┼──────────────────┼──────────────┤
    │ 1       │ Book A           │ 2024-01-10   │
    │ 2       │ Book B           │ 2023-08-20   │
    │ 3       │ Book C           │ 2022-05-15   │
    └─────────┴──────────────────┴──────────────┘
Here:
    BOOKS          = Table
    id/name/date   = Columns
    Each book      = Row / Record
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2.7 Columns
A COLUMN defines a particular attribute/field of the data.
Example:
    BOOKS
    ┌───────┬─────────────┬────────────────┐
    │ id    │ name        │ published_date │
    └───────┴─────────────┴────────────────┘
      ▲          ▲                ▲
      │          │                │
    column     column           column
Each column normally has an associated data type.
Common data types:
    STRING / VARCHAR
        → Text
        → "Surya"
    INTEGER
        → Whole numbers
        → 25
    FLOAT / DECIMAL
        → Decimal numbers
        → 7.25
    DATE
        → Date values
        → 2026-08-08
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2.8 Rows / Records
A ROW represents an individual record in a table.
Example:
    ┌──────┬────────────┬─────┐
    │ id   │ name       │ age │
    ├──────┼────────────┼─────┤
    │ 101  │ Rahul      │ 20  │ ← one ROW / RECORD
    │ 102  │ Priya      │ 21  │ ← one ROW / RECORD
    └──────┴────────────┴─────┘
QUESTION:
    Once a record of a book is inserted into the "Books" table,
    what is it represented as?
ANSWER:
    row
IMPORTANT:
    ROW   = record
    COLUMN = attribute/field
MEMORY TRICK:
    ROW = WHO/WHAT ONE RECORD IS
    COLUMN = WHAT PROPERTY WE STORE ABOUT IT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2.9 Primary Key
A PRIMARY KEY is used to uniquely identify a record within a table.
Example:
    STUDENTS
    ┌────────────┬──────────┬─────┐
    │ student_id │ name     │ age │
    ├────────────┼──────────┼─────┤
    │ 101        │ Rahul    │ 20  │
    │ 102        │ Priya    │ 21  │
    │ 103        │ Aman     │ 20  │
    └────────────┴──────────┴─────┘
    student_id = PRIMARY KEY
Each record should have a unique primary-key value.
PURPOSE:
    PRIMARY KEY
         │
         └──► Uniquely identifies a record
Example:
    student_id = 101
    identifies exactly one student record.
QUESTION:
    Which type of key ensures a record is unique within a table?
ANSWER:
    Primary key
MEMORY TRICK:
    PRIMARY KEY = "WHO ARE YOU?"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2.10 Foreign Key
A FOREIGN KEY creates a relationship/link between tables.
Example:
    AUTHORS
    ┌───────────┬────────────┐
    │ author_id │ name       │
    ├───────────┼────────────┤
    │ 1         │ Author A   │
    │ 2         │ Author B   │
    └───────────┴────────────┘
          ▲
          │
          │ relationship
          │
    BOOKS
    ┌─────────┬────────────┬───────────┐
    │ book_id │ name       │ author_id │
    ├─────────┼────────────┼───────────┤
    │ 101     │ Book A     │ 1         │
    │ 102     │ Book B     │ 2         │
    └─────────┴────────────┴───────────┘
    BOOKS.author_id
          │
          └──► references AUTHORS.author_id
The foreign key allows tables to be related.
QUESTION:
    Which type of key provides a link from one table to another?
ANSWER:
    Foreign key
MEMORY TRICK:
    PRIMARY KEY = IDENTIFY
    FOREIGN KEY = CONNECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 2.11 Primary Key vs Foreign Key
    ┌──────────────────┬──────────────────────────────────┐
    │ PRIMARY KEY      │ FOREIGN KEY                      │
    ├──────────────────┼──────────────────────────────────┤
    │ Identifies row   │ Links tables                     │
    │ Unique value     │ References another table/key    │
    │ "Who is this?"   │ "Which table/record relates?"   │
    └──────────────────┴──────────────────────────────────┘
EXAMPLE:
    users.id
       │
       └── PRIMARY KEY
    orders.user_id
       │
       └── FOREIGN KEY → users.id
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TASK 2 — ANSWERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q1. What type of database should you consider using if the data
    you're going to be storing will vary greatly in its format?
A1. Non-relational database
Q2. What type of database should you consider using if the data
    you're going to be storing will reliably be in the same
    structured format?
A2. Relational database
Q3. Once a record of a book is inserted into the "Books" table,
    it would be represented as a ___ in that table?
A3. Row
Q4. Which type of key provides a link from one table to another?
A4. Foreign key
Q5. Which type of key ensures a record is unique within a table?
A5. Primary key
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TASK 3 — SQL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 3.1 What is SQL?
SQL = Structured Query Language
SQL is a language used to interact with relational databases.
It allows us to perform operations such as:
    • Retrieve data
    • Insert data
    • Update data
    • Delete data
    • Filter data
    • Sort data
    • Group data
    • Create databases/tables
    • Modify database structures
BASIC FLOW:
    USER / APPLICATION
           │
           ▼
       SQL QUERY
           │
           ▼
          DBMS
           │
           ▼
       DATABASE
           │
           ▼
        RESULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 3.2 DBMS
DBMS = Database Management System
A DBMS acts as the interface between the database and the
end user/application.
Concept:
    END USER / APPLICATION
             │
             ▼
           DBMS
             │
             ▼
         DATABASE
             │
             ▼
          DATA
The DBMS manages interaction with the database.
It provides mechanisms to:
    • Create databases
    • Create tables
    • Store data
    • Retrieve data
    • Update data
    • Delete data
    • Manage access
    • Execute queries
Examples of DBMS/database systems commonly encountered:
    • MySQL
    • PostgreSQL
    • Microsoft SQL Server
    • Oracle Database
IMPORTANT:
    SQL = LANGUAGE
    DBMS = SOFTWARE/SYSTEM THAT MANAGES DATABASE INTERACTION
Do NOT confuse these two.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 3.3 SQL vs DBMS
    SQL
      │
      └── Language used to communicate with relational databases
    DBMS
      │
      └── System/software that manages the database
Simple analogy:
    SQL  = Language
    DBMS = Interpreter/management system
    DB   = Actual organised data
FLOW:
    SQL QUERY
       │
       ▼
      DBMS
       │
       ▼
    DATABASE
       │
       ▼
     RESULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 3.4 Basic SQL Query Concept
A simple SQL query can retrieve data from a table:
    SELECT * FROM users;
Meaning:
    SELECT
        → retrieve data
    *
        → all columns
    FROM
        → specify source table
    users
        → table name
    ;
        → end of SQL statement
Conceptually:
    SELECT * FROM users;
           │       │
           │       └── table
           └── all columns
The detailed SQL syntax will be covered in later tasks.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 3.5 Why SQL Matters in Cybersecurity
SQL knowledge helps security professionals understand how
applications communicate with databases.
OFFENSIVE SECURITY:
    SQL
     │
     ├── Understand database queries
     ├── Understand SQL Injection
     ├── Identify unsafe query construction
     └── Understand potential data exposure
DEFENSIVE SECURITY:
    SQL
     │
     ├── Search records
     ├── Investigate suspicious activity
     ├── Analyse data
     ├── Apply restrictions
     └── Understand database access
Example web application:
    Browser
       │
       │ HTTP Request
       ▼
    Web Server
       │
       │ SQL Query
       ▼
      DBMS
       │
       ▼
    Database
Understanding this chain is extremely important for
web-application security.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 3.6 SQL COMMAND FAMILIES — PREVIEW
Later in the room we will work with:
    DATABASE/TABLE STATEMENTS
        CREATE
        SHOW
        USE
        DROP
    CRUD
        INSERT
        SELECT
        UPDATE
        DELETE
    CLAUSES
        WHERE
        ORDER BY
        GROUP BY
        LIMIT
    OPERATORS
        =
        !=
        >
        <
        >=
        <=
        AND
        OR
        LIKE
    FUNCTIONS
        COUNT()
        SUM()
        LENGTH()
        GROUP_CONCAT()
These will be covered in the upcoming tasks.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TASK 3 — ANSWERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q1. What serves as an interface between a database and an end user?
A1. DBMS
Q2. What query language can be used to interact with a relational
    database?
A2. SQL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## QUICK REVISION — PART 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATABASE
    = Organised collection of data
RELATIONAL DATABASE
    = Structured data stored in tables
NON-RELATIONAL DATABASE
    = Flexible/non-tabular data models
TABLE
    = Collection of related records
ROW
    = Individual record
COLUMN
    = Attribute/field
PRIMARY KEY
    = Uniquely identifies a record
FOREIGN KEY
    = Links tables together
SQL
    = Language used to interact with relational databases
DBMS
    = System/software that manages database interaction
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## MOST IMPORTANT MEMORY MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                DATABASE
                   │
          ┌────────┴────────┐
          ▼                 ▼
     RELATIONAL        NON-RELATIONAL
          │                 │
       TABLES           FLEXIBLE DATA
          │
     ┌────┴────┐
     ▼         ▼
   ROWS     COLUMNS
     │
     └── RECORD
          │
          ├── PRIMARY KEY
          │      └── UNIQUE ID
          │
          └── FOREIGN KEY
                 └── TABLE LINK
SQL
  │
  ▼
 DBMS
  │
  ▼
DATABASE
  │
  ▼
RESULT
## Interview Questions

Q1.
What is SQL?

Answer

Structured Query Language used to interact with relational databases.

------------------------------------------------------------

Q2.
What is a database?

Answer

An organised collection of data that can be accessed and managed.

------------------------------------------------------------

Q3.
What is a relational database?

Answer

A database that stores structured data in tables consisting of rows
   and columns.

------------------------------------------------------------

Q4.
What is a non-relational database?

Answer

A database designed for flexible data models that do not require
   traditional relational tables.

------------------------------------------------------------

Q5.
What is a row?

Answer

A single record in a table.

------------------------------------------------------------

Q6.
What is a column?

Answer

A field/attribute describing a property of records.

------------------------------------------------------------

Q7.
What is a primary key?

Answer

A key that uniquely identifies a record within a table.

------------------------------------------------------------

Q8.
What is a foreign key?

Answer

A key used to create a relationship between tables.

------------------------------------------------------------

Q9.
What is a DBMS?

Answer

Database Management System; it provides an interface for managing
   and interacting with databases.

------------------------------------------------------------

Q10.
SQL vs DBMS?

Answer

SQL is the language; DBMS is the system that manages the database
   and executes database operations.

------------------------------------------------------------

## PART 1 COMPLETION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[✓] Task 1 — Introduction
[✓] Task 2 — Databases 101
[✓] Task 3 — SQL
[ ] Task 4 — Database and Table Statements
[ ] Task 5 — CRUD Operations
[ ] Task 6 — Clauses
[ ] Task 7 — Operators
[ ] Task 8 — Functions
[ ] Task 9 — Conclusion

## DATABASE & TABLE STATEMENTS
> Task 4: Database and Table Statements
> Focus: Creating, viewing, selecting, modifying and deleting databases/tables
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 1 RECAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATABASE
    └── Organised collection of data
RELATIONAL DATABASE
    └── Structured data stored in tables
TABLE
    ├── Columns → fields/attributes
    └── Rows → records
PRIMARY KEY
    └── Uniquely identifies a record
FOREIGN KEY
    └── Creates relationships between tables
SQL
    └── Language used to interact with relational databases
DBMS
    └── Software/system that manages database interaction
Now we move from THEORY → PRACTICAL SQL COMMANDS.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TASK 4 — DATABASE AND TABLE STATEMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### 4.1 Time to Learn
In the previous tasks we learned:
    • What databases are
    • Relational vs non-relational databases
    • Tables
    • Rows
    • Columns
    • Primary keys
    • Foreign keys
    • SQL
    • DBMS
Now we start actually interacting with a database.
The first things we need to know are:
    DATABASE STATEMENTS
        ├── CREATE DATABASE
        ├── SHOW DATABASES
        ├── USE
        └── DROP DATABASE
    TABLE STATEMENTS
        ├── CREATE TABLE
        ├── SHOW TABLES
        ├── DESCRIBE
        ├── ALTER TABLE
        └── DROP TABLE
BIG PICTURE:
    SQL
     │
     ├── DATABASE MANAGEMENT
     │      ├── CREATE
     │      ├── SHOW
     │      ├── USE
     │      └── DROP
     │
     └── TABLE MANAGEMENT
            ├── CREATE
            ├── SHOW
            ├── DESCRIBE
            ├── ALTER
            └── DROP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.2 STARTING MYSQL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Before executing the SQL commands, we need to access MySQL.
Start the MySQL client:
    $ mysql -u root -p
Arguments:
    mysql
        └── MySQL client
    -u root
        └── Login using the root user
    -p
        └── Prompt for password
On the TryHackMe machine, the room uses:
    Username:
        root
    Password:
        tryhackme
Example:
    user@tryhackme$ mysql -u root -p
    Enter password:
    Welcome to the MySQL monitor.
    Commands end with ; or \g.
    Your MySQL connection id is 8
    Server version: 8.0.39-0ubuntu0.20.04.1 (Ubuntu)
    mysql>
IMPORTANT:
    mysql>
        └── This means we are now inside the MySQL command-line client.
    SQL commands are normally terminated using:
        ;
    or:
        \g
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.3 CREATE DATABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If a new database is needed, we can create one using:
    CREATE DATABASE
SYNTAX:
    CREATE DATABASE database_name;
Example:
    mysql> CREATE DATABASE thm_bookmarket_db;
This creates a new database called:
    thm_bookmarket_db
CONCEPT:
    CREATE DATABASE
           │
           ▼
    New empty database
           │
           ▼
    Tables can later be created inside it
IMPORTANT:
    CREATE = create something new
    DATABASE = what we are creating
    database_name = name of the database
    ; = end of statement
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.4 SHOW DATABASES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
After creating a database, we can view all available databases.
COMMAND:
    SHOW DATABASES;
Example:
    mysql> SHOW DATABASES;
This returns a list of databases available on the MySQL server.
CONCEPT:
    SHOW DATABASES
          │
          ▼
    List all databases
Example structure:
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
MySQL includes some default/system databases.
Common ones:
    information_schema
        └── Metadata about databases, tables, columns, etc.
    mysql
        └── MySQL system database
    performance_schema
        └── Performance-related information
    sys
        └── Helpful views for MySQL administration
IMPORTANT:
    SHOW DATABASES;
        = "Tell me which databases exist."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.5 USE DATABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Creating/listing a database is not enough.
We need to tell MySQL which database we want to work with.
This is done using:
    USE
SYNTAX:
    USE database_name;
Example:
    mysql> USE thm_bookmarket_db;
Expected output:
    Database changed
Now:
    thm_bookmarket_db
        │
        └── ACTIVE DATABASE
Any subsequent table-related queries will operate on this
selected database unless another database is selected.
CONCEPT:
    SHOW DATABASES;
        │
        ▼
    Find database
        │
        ▼
    USE database_name;
        │
        ▼
    Select database
        │
        ▼
    Work with its tables
MEMORY TRICK:
    SHOW = "What exists?"
    USE  = "Which one should I work on?"
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.6 DROP DATABASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If a database is no longer required, it can be removed using:
    DROP DATABASE
SYNTAX:
    DROP DATABASE database_name;
Example:
    mysql> DROP DATABASE database_name;
This removes the database.
WARNING:
    DROP DATABASE
        └── Destructive operation
        └── Removes the database and its contents
        └── Should be used carefully
The TryHackMe room specifically demonstrates the syntax but
does NOT require removing the database being used for the lesson.
IMPORTANT:
    CREATE DATABASE → create
    SHOW DATABASES  → list
    USE             → select
    DROP DATABASE   → remove
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## DATABASE COMMAND CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    CREATE DATABASE database_name;
        → Create a database
    SHOW DATABASES;
        → List databases
    USE database_name;
        → Select active database
    DROP DATABASE database_name;
        → Delete database
FLOW:
    CREATE
      │
      ▼
    SHOW
      │
      ▼
     USE
      │
      ▼
    WORK
      │
      ▼
    DROP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.7 TABLE STATEMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Once we can:
    ✓ Create databases
    ✓ List databases
    ✓ Select databases
    ✓ Remove databases
we can start working with TABLES.
Remember:
    DATABASE
       │
       └── contains TABLES
              │
              ├── Columns
              └── Rows
Table-related commands covered:
    CREATE TABLE
    SHOW TABLES
    DESCRIBE
    ALTER TABLE
    DROP TABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.8 CREATE TABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Before creating a table, make sure the correct database is active.
Example:
    mysql> USE thm_bookmarket_db;
Generic syntax:
    CREATE TABLE example_table_name (
        example_column1 data_type,
        example_column2 data_type,
        example_column3 data_type
    );
Structure:
    CREATE TABLE table_name (
        column_name data_type,
        column_name data_type,
        column_name data_type
    );
Every column normally has:
    • Name
    • Data type
    • Optional constraints
Example:
    mysql> CREATE TABLE example_table_name (
        example_column1 data_type,
        example_column2 data_type,
        example_column3 data_type
    );
SQL supports many columns in a table.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.9 CREATE TABLE — BOOK INVENTORY EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TryHackMe uses a book inventory example.
COMMAND:
    mysql> CREATE TABLE book_inventory (
        book_id INT AUTO_INCREMENT PRIMARY KEY,
        book_name VARCHAR(255) NOT NULL,
        publication_date DATE
    );
This creates:
    TABLE
    book_inventory
       │
       ├── book_id
       │     ├── INT
       │     ├── AUTO_INCREMENT
       │     └── PRIMARY KEY
       │
       ├── book_name
       │     ├── VARCHAR(255)
       │     └── NOT NULL
       │
       └── publication_date
             └── DATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.10 UNDERSTANDING book_id
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Definition:
    book_id INT AUTO_INCREMENT PRIMARY KEY
Breakdown:
    book_id
        └── Column name
    INT
        └── Integer data type
    AUTO_INCREMENT
        └── Automatically generates increasing numbers
    PRIMARY KEY
        └── Uniquely identifies each record
Example:
    First book:
        book_id = 1
    Second book:
        book_id = 2
    Third book:
        book_id = 3
    Fourth book:
        book_id = 4
Instead of manually assigning IDs:
    1 → 2 → 3 → 4 → ...
MySQL can automatically generate them.
CONCEPT:
    AUTO_INCREMENT
        +
    PRIMARY KEY
        ↓
    Automatically generated unique record ID
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.11 UNDERSTANDING book_name
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Definition:
    book_name VARCHAR(255) NOT NULL
Breakdown:
    book_name
        └── Column name
    VARCHAR(255)
        └── Variable-length character/string field
        └── Maximum length = 255 characters
    NOT NULL
        └── Value cannot be NULL
Example:
    Valid:
        "Android Security Internals"
    Invalid:
        NULL
The NOT NULL constraint prevents an empty/NULL value from being
stored in this field.
MEMORY:
    VARCHAR(255)
        = variable-length text up to 255 characters
    NOT NULL
        = value is required
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.12 UNDERSTANDING publication_date
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Definition:
    publication_date DATE
DATE is used to store date values.
Example:
    2014-10-14
The column does not have NOT NULL in this example, so it can
accept NULL unless another constraint is applied.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.13 DATA TYPES USED IN THE TABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    INT
      → Whole numbers
      → Example: 1, 2, 100
    VARCHAR(255)
      → Variable-length text
      → Maximum 255 characters
    DATE
      → Date values
      → Example: 2014-10-14
TABLE:
    book_inventory
    ┌──────────────────┬──────────────┬─────────────────────┐
    │ Column           │ Data Type    │ Constraint           │
    ├──────────────────┼──────────────┼─────────────────────┤
    │ book_id          │ INT          │ AUTO_INCREMENT, PK  │
    │ book_name        │ VARCHAR(255) │ NOT NULL            │
    │ publication_date │ DATE         │ —                   │
    └──────────────────┴──────────────┴─────────────────────┘
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.14 SHOW TABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Just as:
    SHOW DATABASES;
lists databases,
we can use:
    SHOW TABLES;
to list tables in the currently active database.
COMMAND:
    mysql> SHOW TABLES;
CONCEPT:
    USE database_name;
        │
        ▼
    SHOW TABLES;
        │
        ▼
    List tables inside that database
IMPORTANT:
    SHOW TABLES only shows tables for the CURRENT/ACTIVE database.
Example:
    mysql> USE thm_bookmarket_db;
    Database changed
    mysql> SHOW TABLES;
    +-----------------------------+
    | Tables_in_thm_bookmarket_db |
    +-----------------------------+
    | book_inventory              |
    +-----------------------------+
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.15 DESCRIBE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If we want to understand the structure of a table, use:
    DESCRIBE
Syntax:
    DESCRIBE table_name;
Example:
    mysql> DESCRIBE book_inventory;
DESCRIBE can also be shortened to:
    DESC
Example:
    mysql> DESC book_inventory;
Both are used to inspect table structure.
DESCRIBE helps us see:
    • Field/column name
    • Data type
    • Whether NULL is allowed
    • Key information
    • Default value
    • Extra properties
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.16 DESCRIBE OUTPUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example:
    mysql> DESCRIBE book_inventory;
    +------------------+--------------+------+-----+---------+----------------+
    | Field            | Type         | Null | Key | Default | Extra          |
    +------------------+--------------+------+-----+---------+----------------+
    | book_id          | int          | NO   | PRI | NULL    | auto_increment |
    | book_name        | varchar(255) | NO   |     | NULL    |                |
    | publication_date | date         | YES  |     | NULL    |                |
    +------------------+--------------+------+-----+---------+----------------+
    3 rows in set
UNDERSTANDING THE OUTPUT:
    Field
        → Column name
    Type
        → Data type
    Null
        → Whether NULL is allowed
    Key
        → Key information
    Default
        → Default value
    Extra
        → Additional properties
        → e.g. auto_increment
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.17 READING THE DESCRIBE OUTPUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
book_id:
    Type:
        int
    Null:
        NO
    Key:
        PRI
    Extra:
        auto_increment
Meaning:
    book_id is an integer primary key that automatically increments.
book_name:
    Type:
        varchar(255)
    Null:
        NO
Meaning:
    book_name must have a value and can store variable-length text
    up to 255 characters.
publication_date:
    Type:
        date
    Null:
        YES
Meaning:
    publication_date can contain NULL in this table definition.
MEMORY:
    PRI
      → PRIMARY KEY
    NO under Null
      → NULL not allowed
    auto_increment
      → value generated automatically
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.18 ALTER TABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
After creating a table, requirements may change.
Example:
    We already have:
        book_id
        book_name
        publication_date
    But now we also want:
        page_count
We can modify the table using:
    ALTER TABLE
Example:
    mysql> ALTER TABLE book_inventory
        ADD page_count INT;
This adds:
    page_count
        └── INT
to the existing table.
After modification:
    book_inventory
       │
       ├── book_id
       ├── book_name
       ├── publication_date
       └── page_count
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.19 WHAT CAN ALTER DO?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALTER can modify an existing table.
Examples include:
    • Add a column
    • Remove a column
    • Rename a column
    • Change a column's data type
General idea:
    ALTER TABLE table_name
        <modification>;
Example — add:
    ALTER TABLE book_inventory
    ADD page_count INT;
The important idea:
    CREATE TABLE
        → Create the table
    ALTER TABLE
        → Modify an existing table
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.20 DROP TABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Similar to dropping a database, tables can also be removed.
Syntax:
    DROP TABLE table_name;
Example:
    mysql> DROP TABLE table_name;
This removes the table.
WARNING:
    DROP TABLE
        └── Destructive operation
        └── Removes the table and its stored data
Use it carefully.
DATABASE vs TABLE:
    DROP DATABASE database_name;
        → Removes database
    DROP TABLE table_name;
        → Removes table
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.21 DATABASE vs TABLE COMMANDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    DATABASE COMMANDS
    ─────────────────────────────────
    CREATE DATABASE database_name;
        → Create database
    SHOW DATABASES;
        → List databases
    USE database_name;
        → Select database
    DROP DATABASE database_name;
        → Delete database
    TABLE COMMANDS
    ─────────────────────────────────
    CREATE TABLE table_name (...);
        → Create table
    SHOW TABLES;
        → List tables
    DESCRIBE table_name;
        → Show table structure
    ALTER TABLE table_name ...;
        → Modify table
    DROP TABLE table_name;
        → Delete table
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.22 COMPLETE SQL DATABASE WORKFLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
START
  │
  ▼
mysql -u root -p
  │
  ▼
SHOW DATABASES;
  │
  ▼
CREATE DATABASE database_name;
  │
  ▼
USE database_name;
  │
  ▼
CREATE TABLE table_name (...);
  │
  ▼
SHOW TABLES;
  │
  ▼
DESCRIBE table_name;
  │
  ▼
ALTER TABLE table_name ADD column_name datatype;
  │
  ▼
WORK WITH DATA
  │
  ▼
DROP TABLE table_name;
  │
  ▼
DROP DATABASE database_name;
IMPORTANT:
    DROP commands are destructive.
    Do NOT blindly execute them on important databases.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.23 TRYHACKME TASK 4 — PRACTICAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The room provides two questions requiring database enumeration.
QUESTION 1:
    Using the statement you've learned to list all databases,
    it should reveal a database with a flag for a name;
    what is it?
COMMAND:
    mysql> SHOW DATABASES;
Look through the returned database names.
The database whose name itself is the flag:
    THM{575a947132312f97b30ee5aeebba629b723d30f9}
ANSWER:
    THM{575a947132312f97b30ee5aeebba629b723d30f9}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.24 TASK_4_DB ENUMERATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION 2:
    In the list of available databases, you should also see the
    task_4_db database.
    Set this as your active database and list all tables in this
    database.
STEP 1 — SELECT DATABASE:
    mysql> USE task_4_db;
Expected:
    Database changed
STEP 2 — LIST TABLES:
    mysql> SHOW TABLES;
Look through the returned table names.
The flag is present as a table name.
ANSWER:
    THM{692aa7eaec2a2a827f4d1a8bed1f90e5e49d2410}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.25 PRACTICAL ENUMERATION FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    MYSQL
                      │
                      ▼
             SHOW DATABASES;
                      │
                      ▼
              Find task_4_db
                      │
                      ▼
              USE task_4_db;
                      │
                      ▼
               SHOW TABLES;
                      │
                      ▼
             Find flag table
                      │
                      ▼
    THM{692aa7eaec2a2a827f4d1a8bed1f90e5e49d2410}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.26 IMPORTANT SQL SYNTAX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE DATABASE:
    CREATE DATABASE database_name;
SHOW DATABASES:
    SHOW DATABASES;
SELECT DATABASE:
    USE database_name;
DELETE DATABASE:
    DROP DATABASE database_name;
CREATE TABLE:
    CREATE TABLE table_name (
        column_name datatype
    );
SHOW TABLES:
    SHOW TABLES;
DESCRIBE:
    DESCRIBE table_name;
    DESC table_name;
ALTER:
    ALTER TABLE table_name
    ADD column_name datatype;
DELETE TABLE:
    DROP TABLE table_name;
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.27 COMMON DATA TYPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INT
    → Integer / whole number
    → 1, 20, 100
VARCHAR(n)
    → Variable-length string
    → VARCHAR(255)
    → Up to n characters
DATE
    → Date
    → 2026-08-08
DECIMAL
    → Precise decimal number
    → 99.99
FLOAT
    → Floating-point number
BOOLEAN
    → TRUE / FALSE style values
TEXT
    → Larger text content
NOTE:
    Exact supported types and behaviour can vary between DBMSs.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.28 IMPORTANT CONSTRAINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PRIMARY KEY
    → Uniquely identifies records
NOT NULL
    → Value cannot be NULL
AUTO_INCREMENT
    → Automatically generates increasing numeric values
Example:
    book_id INT AUTO_INCREMENT PRIMARY KEY
Means:
    INT
      │
      ├── Number
      │
      ├── AUTO_INCREMENT
      │      └── Automatically generated
      │
      └── PRIMARY KEY
             └── Unique identifier
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.29 COMMON BEGINNER MISTAKES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISTAKE 1:
    SHOW TABLES;
without selecting a database.
FIX:
    USE database_name;
    SHOW TABLES;
MISTAKE 2:
    DESCRIBE database_name;
DESCRIBE is used for TABLE structure.
FIX:
    DESCRIBE table_name;
MISTAKE 3:
    DROP DATABASE when intending to remove a table.
FIX:
    DROP TABLE table_name;
MISTAKE 4:
    Forgetting semicolon:
    SHOW DATABASES
FIX:
    SHOW DATABASES;
MISTAKE 5:
    Using the wrong active database.
FIX:
    USE correct_database;
MISTAKE 6:
    Forgetting that DROP is destructive.
FIX:
    Verify the target before executing DROP.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 4.30 COMMAND DIFFERENCE — VERY IMPORTANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SHOW DATABASES;
    ↓
"What databases exist?"
USE database_name;
    ↓
"Which database should I work in?"
SHOW TABLES;
    ↓
"What tables exist inside the active database?"
DESCRIBE table_name;
    ↓
"What is the structure of this table?"
ALTER TABLE;
    ↓
"How do I modify this table?"
DROP TABLE;
    ↓
"Delete this table."
DROP DATABASE;
    ↓
"Delete this database."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## QUICK REVISION — TASK 4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE DATABASE
    → Creates a database
SHOW DATABASES
    → Lists databases
USE
    → Selects the active database
DROP DATABASE
    → Deletes a database
CREATE TABLE
    → Creates a table
SHOW TABLES
    → Lists tables in active database
DESCRIBE / DESC
    → Displays table structure
ALTER TABLE
    → Modifies table structure
DROP TABLE
    → Deletes a table
## Interview Questions

Q1.
How do you create a database in MySQL?

Answer

CREATE DATABASE database_name;

------------------------------------------------------------

Q2.
How do you list all databases?

Answer

SHOW DATABASES;

------------------------------------------------------------

Q3.
How do you select a database?

Answer

USE database_name;

------------------------------------------------------------

Q4.
How do you delete a database?

Answer

DROP DATABASE database_name;

------------------------------------------------------------

Q5.
How do you create a table?

Answer

CREATE TABLE table_name (...);

------------------------------------------------------------

Q6.
How do you list tables in the active database?

Answer

SHOW TABLES;

------------------------------------------------------------

Q7.
How do you inspect a table's structure?

Answer

DESCRIBE table_name;
or
DESC table_name;

------------------------------------------------------------

Q8.
How do you modify an existing table?

Answer

ALTER TABLE table_name ...;

------------------------------------------------------------

Q9.
How do you add a column?

Answer

ALTER TABLE table_name
ADD column_name datatype;

------------------------------------------------------------

Q10.
How do you delete a table?

Answer

DROP TABLE table_name;

------------------------------------------------------------

Q11.
What does AUTO_INCREMENT do?

Answer

It automatically generates increasing numeric values, commonly
used for unique IDs.

------------------------------------------------------------

Q12.
What does NOT NULL mean?

Answer

The column cannot contain NULL values.

------------------------------------------------------------

Q13.
What does VARCHAR(255) mean?

Answer

A variable-length character/string field with a maximum length
of 255 characters.

------------------------------------------------------------

## TRYHACKME ANSWERS — TASK 4
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q1:
    Using SHOW DATABASES, what is the flag present as a database name?
A:
    THM{575a947132312f97b30ee5aeebba629b723d30f9}
Q2:
    In task_4_db, what flag is present after listing the tables?
A:
    THM{692aa7eaec2a2a827f4d1a8bed1f90e5e49d2410}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATABASE LEVEL:
    CREATE → SHOW → USE → DROP
TABLE LEVEL:
    CREATE → SHOW → DESCRIBE → ALTER → DROP
Think:
    CREATE = Make
    SHOW   = See
    USE    = Select
    DESCRIBE = Understand
    ALTER  = Change
    DROP   = Destroy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 2 STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[✓] Task 1 — Introduction
[✓] Task 2 — Databases 101
[✓] Task 3 — SQL
[✓] Task 4 — Database and Table Statements
[ ] Task 5 — CRUD Operations
[ ] Task 6 — Clauses
[ ] Task 7 — Operators
[ ] Task 8 — Functions
[ ] Task 9 — Conclusion

## CRUD OPERATIONS
> Task 5: CRUD Operations
> Focus: INSERT, SELECT, UPDATE, DELETE
> Database used for examples: thm_books
> Practical database: tools_db
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 2 RECAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATABASE STATEMENTS
    CREATE DATABASE
        → Create database
    SHOW DATABASES
        → List databases
    USE
        → Select active database
    DROP DATABASE
        → Delete database

TABLE STATEMENTS
    CREATE TABLE
        → Create table
    SHOW TABLES
        → List tables
    DESCRIBE / DESC
        → View table structure
    ALTER TABLE
        → Modify table structure
    DROP TABLE
        → Delete table

Now we move from managing DATABASE/TABLE STRUCTURE
to managing the actual DATA stored inside tables.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TASK 5 — CRUD OPERATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.1 What is CRUD?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRUD stands for:
    C → CREATE
    R → READ
    U → UPDATE
    D → DELETE

These are the four fundamental operations used to manage
data in a database.

                    CRUD
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       CREATE       READ        UPDATE
       INSERT       SELECT      UPDATE
                      │
                      ▼
                    DELETE
                    DELETE

MEMORY TRICK:
    CREATE → Add
    READ   → View
    UPDATE → Change
    DELETE → Remove

SQL mapping:
    CREATE → INSERT
    READ   → SELECT
    UPDATE → UPDATE
    DELETE → DELETE

IMPORTANT:
    CRUD "Create" is commonly implemented using INSERT.
    CRUD "Read" is commonly implemented using SELECT.
    CRUD "Update" is implemented using UPDATE.
    CRUD "Delete" is implemented using DELETE.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.2 DATABASE USED IN THE EXAMPLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The room uses a database named:
    thm_books

To work with it:
    mysql> USE thm_books;

After selecting the database, we work with the:
    books
table.

CONCEPT:
    MySQL
      │
      ▼
    USE thm_books;
      │
      ▼
    Active Database = thm_books
      │
      ▼
    books table
      │
      ▼
    CRUD Operations
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.3 CREATE OPERATION — INSERT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The CREATE operation adds a NEW RECORD to a table.

In MySQL, this is done using:
    INSERT INTO

GENERAL SYNTAX:
    INSERT INTO table_name (column1, column2, column3)
    VALUES (value1, value2, value3);

STRUCTURE:
    INSERT INTO
        │
        ├── Table name
        │
        ├── Column names
        │
        └── VALUES
              │
              └── Actual data

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.4 INSERT — BOOK EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example from the room:

    mysql> INSERT INTO books
        (id, name, published_date, description)
        VALUES
        (
            1,
            "Android Security Internals",
            "2014-10-14",
            "An In-Depth Guide to Android's Security Architecture"
        );

Expected result:

    Query OK, 1 row affected

This inserts a new record into:
    books

The inserted values are:

    id
        → 1

    name
        → Android Security Internals

    published_date
        → 2014-10-14

    description
        → An In-Depth Guide to Android's Security Architecture

IMPORTANT:
    The room notes that this record already exists in the
    provided database, so there is NO NEED to run the INSERT
    example yourself.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.5 UNDERSTANDING INSERT INTO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query:

    INSERT INTO books
        (id, name, published_date, description)
    VALUES
        (1,
         "Android Security Internals",
         "2014-10-14",
         "An In-Depth Guide to Android's Security Architecture");

BREAKDOWN:

    INSERT INTO
        → We are adding a new record.

    books
        → Target table.

    (id, name, published_date, description)
        → Columns receiving values.

    VALUES
        → Introduces the actual values.

    (1, ...)
        → Data corresponding to the listed columns.

IMPORTANT RULE:
    The order of VALUES should correspond to the order
    of the columns.

Example:

    INSERT INTO users (id, username, age)
    VALUES (1, "surya", 23);

Mapping:

    id
      → 1

    username
      → surya

    age
      → 23

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.6 INSERT — VISUAL FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    INSERT INTO
                         │
                         ▼
                    books table
                         │
                         ▼
              Specify column names
                         │
                         ▼
                     VALUES
                         │
                         ▼
                  Actual values
                         │
                         ▼
                  New record added

BEFORE:

    books
    ┌────┬──────────────┬───────────────┐
    │ id │ name         │ published     │
    ├────┼──────────────┼───────────────┤
    │ 1  │ Book A       │ 2024-01-01    │
    └────┴──────────────┴───────────────┘

INSERT:

    INSERT INTO books (...)
    VALUES (...);

AFTER:

    books
    ┌────┬──────────────┬───────────────┐
    │ id │ name         │ published     │
    ├────┼──────────────┼───────────────┤
    │ 1  │ Book A       │ 2024-01-01    │
    │ 2  │ Book B       │ 2025-01-01    │ ← NEW
    └────┴──────────────┴───────────────┘
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.7 READ OPERATION — SELECT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The READ operation retrieves information from a table.

SQL statement:
    SELECT

GENERAL SYNTAX:

    SELECT column_name
    FROM table_name;

To retrieve ALL columns:

    SELECT * FROM table_name;

`*` means:
    ALL COLUMNS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.8 SELECT ALL COLUMNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example:

    mysql> SELECT * FROM books;

Output:

    +----+----------------------------+----------------+------------------------------------------------------+
    | id | name                       | published_date | description                                          |
    +----+----------------------------+----------------+------------------------------------------------------+
    |  1 | Android Security Internals | 2014-10-14     | An In-Depth Guide to Android's Security Architecture |
    +----+----------------------------+----------------+------------------------------------------------------+

    1 row in set

BREAKDOWN:

    SELECT
        → Retrieve data

    *
        → Retrieve ALL columns

    FROM
        → Specify the source table

    books
        → Table being queried

    ;

        → End SQL statement

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.9 SELECT SPECIFIC COLUMNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
We do NOT always need every column.

For example, if we only want:
    name
    description

Use:

    mysql> SELECT name, description
        FROM books;

Output:

    +----------------------------+------------------------------------------------------+
    | name                       | description                                          |
    +----------------------------+------------------------------------------------------+
    | Android Security Internals | An In-Depth Guide to Android's Security Architecture |
    +----------------------------+------------------------------------------------------+

This returns only the requested columns.

COMPARE:

    SELECT * FROM books;

        → ALL columns

    SELECT name, description FROM books;

        → ONLY name + description

MEMORY TRICK:

    * = EVERYTHING
    name, description = ONLY THESE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.10 SELECT — VISUAL FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    SELECT *
       │
       ▼
    FROM books
       │
       ▼
    Search books table
       │
       ▼
    Return all columns
       │
       ▼
    Result set

SPECIFIC COLUMNS:

    SELECT name, description
       │
       ▼
    FROM books
       │
       ▼
    Search books table
       │
       ▼
    Return only requested columns
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.11 UPDATE OPERATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The UPDATE operation modifies EXISTING data.

SQL statement:
    UPDATE

GENERAL SYNTAX:

    UPDATE table_name
    SET column_name = new_value
    WHERE condition;

STRUCTURE:

    UPDATE
       │
       ▼
    Target table
       │
       ▼
    SET
       │
       ▼
    Column = New Value
       │
       ▼
    WHERE
       │
       ▼
    Which record?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.12 UPDATE — BOOK EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example from the room:

    mysql> UPDATE books
        SET description =
        "An In-Depth Guide to Android's Security Architecture."
        WHERE id = 1;

Expected output:

    Query OK, 1 row affected

    Rows matched: 1
    Changed: 1
    Warnings: 0

This changes the description of the record:
    id = 1

IMPORTANT:
    UPDATE changes EXISTING records.
    It does NOT create a new record.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.13 UNDERSTANDING UPDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query:

    UPDATE books
    SET description =
        "An In-Depth Guide to Android's Security Architecture."
    WHERE id = 1;

BREAKDOWN:

    UPDATE books
        → Modify records in books.

    SET
        → Specify what should change.

    description = "..."
        → New value for description.

    WHERE id = 1
        → Select the record that should be modified.

The WHERE clause is extremely important.

Without WHERE:

    UPDATE books
    SET description = "Something";

This may modify the description of EVERY record in the table.

Therefore:

    UPDATE + WHERE
        → Usually used to target specific records.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.14 WHY WHERE MATTERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SAFE / TARGETED:

    UPDATE users
    SET role = "admin"
    WHERE id = 5;

Only the record matching:
    id = 5

is targeted.

DANGEROUS:

    UPDATE users
    SET role = "admin";

No WHERE condition exists.

Potential result:

    EVERY USER
        │
        ├── user 1 → admin
        ├── user 2 → admin
        ├── user 3 → admin
        ├── user 4 → admin
        └── ...

SECURITY / ADMIN LESSON:

    Always understand the scope of UPDATE before executing it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.15 DELETE OPERATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DELETE removes records from a table.

SQL statement:
    DELETE

GENERAL SYNTAX:

    DELETE FROM table_name
    WHERE condition;

Example:

    DELETE FROM books
    WHERE id = 1;

Expected:

    Query OK, 1 row affected

This removes the record where:
    id = 1

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.16 UNDERSTANDING DELETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query:

    DELETE FROM books
    WHERE id = 1;

BREAKDOWN:

    DELETE
        → Remove data.

    FROM
        → Specify source table.

    books
        → Target table.

    WHERE id = 1
        → Select the record to remove.

IMPORTANT:
    The room explicitly says NOT to run this DELETE example.

WHY?

Because deleting the record would affect examples in
the upcoming tasks.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.17 DELETE WITHOUT WHERE — DANGER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Potentially dangerous:

    DELETE FROM books;

No WHERE condition is provided.

This can remove ALL records from the table.

Therefore:

    DELETE FROM books
    WHERE id = 1;

        → Target specific record

    DELETE FROM books;

        → Potentially delete ALL records

MEMORY TRICK:

    UPDATE without WHERE
        → Change everything

    DELETE without WHERE
        → Delete everything

ALWAYS CHECK THE WHERE CONDITION.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.18 CRUD COMPLETE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    CRUD
                     │
       ┌─────────────┼─────────────┐
       │             │             │
       ▼             ▼             ▼
    CREATE          READ         UPDATE
    INSERT          SELECT       UPDATE
       │             │             │
       ▼             ▼             ▼
    Add data      Read data    Modify data
       │             │             │
       └─────────────┼─────────────┘
                     │
                     ▼
                   DELETE
                   DELETE
                     │
                     ▼
                 Remove data
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.19 CRUD CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE:
    INSERT INTO table_name (columns)
    VALUES (values);

READ:
    SELECT * FROM table_name;

READ SPECIFIC:
    SELECT column1, column2
    FROM table_name;

UPDATE:
    UPDATE table_name
    SET column_name = value
    WHERE condition;

DELETE:
    DELETE FROM table_name
    WHERE condition;
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.20 CRUD — REAL-WORLD EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Imagine a users table:

    users
    ┌────┬──────────┬─────┐
    │ id │ username │ age │
    ├────┼──────────┼─────┤
    │ 1  │ alice    │ 20  │
    │ 2  │ bob      │ 22  │
    └────┴──────────┴─────┘

CREATE:
    INSERT INTO users (id, username, age)
    VALUES (3, "charlie", 25);

READ:
    SELECT * FROM users;

UPDATE:
    UPDATE users
    SET age = 26
    WHERE id = 3;

DELETE:
    DELETE FROM users
    WHERE id = 3;

FLOW:

    INSERT
      │
      ▼
    Record exists
      │
      ▼
    SELECT
      │
      ▼
    View record
      │
      ▼
    UPDATE
      │
      ▼
    Modify record
      │
      ▼
    DELETE
      │
      ▼
    Record removed
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.21 PRACTICAL — tools_db
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The Task 5 questions use:

    DATABASE:
        tools_db

    TABLE:
        hacking_tools

First connect to MySQL:

    $ mysql -u root -p

Then select:

    mysql> USE tools_db;

List tables:

    mysql> SHOW TABLES;

Expected table:

    hacking_tools

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.22 hacking_tools TABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The table contains:

    ┌────┬──────────────────┬──────────────────────┬──────────────────────────────┬────────┐
    │ id │ name             │ category             │ description                  │ amount │
    ├────┼──────────────────┼──────────────────────┼──────────────────────────────┼────────┤
    │ 1  │ Flipper Zero     │ Multi-tool            │ Portable multi-tool...       │ 169    │
    │ 2  │ O.MG cables      │ Cable-based attacks   │ Malicious USB cables...     │ 180    │
    │ 3  │ Wi-Fi Pineapple  │ Wi-Fi hacking         │ MITM attacks on wireless... │ 140    │
    │ 4  │ USB Rubber Ducky │ USB attacks           │ USB keystroke injection...  │ 80     │
    │ 5  │ iCopy-XS         │ RFID cloning          │ RFID reading/cloning...     │ 375    │
    │ 6  │ Lan Turtle       │ Network intelligence  │ Remote access/network...    │ 80     │
    │ 7  │ Bash Bunny       │ USB attacks           │ Multi-function USB attack   │ 120    │
    │ 8  │ Proxmark 3 RDV4  │ RFID cloning          │ RFID reading/writing...     │ 300    │
    └────┴──────────────────┴──────────────────────┴──────────────────────────────┴────────┘

The room's database contains 8 hacking tools. 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.23 INSPECT THE TABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To see all records:

    mysql> SELECT * FROM hacking_tools;

To inspect the structure:

    mysql> DESC hacking_tools;

Structure:

    id
        → INT
        → PRIMARY KEY
        → AUTO_INCREMENT

    name
        → VARCHAR(50)
        → NOT NULL

    category
        → VARCHAR(50)
        → NOT NULL

    description
        → TEXT
        → NULL allowed

    amount
        → INT
        → NOT NULL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.24 QUESTION 1 — MITM TOOL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION:

    Using the tools_db database, what is the name of the tool in
    the hacking_tools table that can be used to perform
    man-in-the-middle attacks on wireless networks?

First:

    mysql> USE tools_db;

Then:

    mysql> SELECT *
        FROM hacking_tools;

Look at the description.

Relevant record:

    name:
        Wi-Fi Pineapple

    category:
        Wi-Fi hacking

    description:
        A device used to perform man-in-the-middle attacks
        on wireless networks

    amount:
        140

ANSWER:

    Wi-Fi Pineapple

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.25 TARGETED QUERY FOR QUESTION 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Instead of reading the entire table, we can filter by description.

Example:

    SELECT name
    FROM hacking_tools
    WHERE description LIKE
        "%man-in-the-middle%";

Concept:

    SELECT name
        │
        └── Return only tool name

    FROM hacking_tools
        │
        └── Search this table

    WHERE
        │
        └── Apply condition

    LIKE "%man-in-the-middle%"
        │
        └── Description contains this phrase

Result:

    Wi-Fi Pineapple

This is an early example of combining:
    SELECT
    FROM
    WHERE
    LIKE

These clauses/operators will be explored more deeply in
the upcoming Tasks.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.26 QUESTION 2 — SHARED CATEGORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION:

    Using the tools_db database, what is the shared category
    for both USB Rubber Ducky and Bash Bunny?

Look at the relevant records:

    USB Rubber Ducky
        category → USB attacks

    Bash Bunny
        category → USB attacks

Therefore:

    ANSWER:
        USB attacks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.27 QUERY FOR QUESTION 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
We can retrieve the names and categories:

    SELECT name, category
    FROM hacking_tools
    WHERE name IN ("USB Rubber Ducky", "Bash Bunny");

Expected result:

    +------------------+-------------+
    | name             | category    |
    +------------------+-------------+
    | USB Rubber Ducky | USB attacks |
    | Bash Bunny       | USB attacks |
    +------------------+-------------+

ANSWER:

    USB attacks

NOTE:
    `IN` will be covered in more detail in the Operators task.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.28 IMPORTANT SQL CONCEPT — WHERE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHERE is used to specify which records should be affected or
returned based on a condition.

Examples:

READ:
    SELECT *
    FROM users
    WHERE id = 5;

UPDATE:
    UPDATE users
    SET role = "admin"
    WHERE id = 5;

DELETE:
    DELETE FROM users
    WHERE id = 5;

Think:

    WHERE
      │
      └── "WHICH RECORD(S)?"

This is one of the most important SQL concepts for both
database administration and security.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.29 CRUD + WHERE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SELECT:
    SELECT *
    FROM books
    WHERE id = 1;

    → Find record(s)

UPDATE:
    UPDATE books
    SET name = "New Name"
    WHERE id = 1;

    → Modify record(s)

DELETE:
    DELETE FROM books
    WHERE id = 1;

    → Remove record(s)

INSERT:
    INSERT INTO books (...)
    VALUES (...);

    → Add record

IMPORTANT:
    INSERT does not normally use WHERE.
    SELECT / UPDATE / DELETE commonly use WHERE
    when targeting specific records.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.30 CRUD SECURITY PERSPECTIVE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRUD operations are directly related to web application security.

Typical web application:

    Browser
       │
       │ HTTP Request
       ▼
    Web Application
       │
       │ SQL Query
       ▼
      DBMS
       │
       ▼
    Database

Examples:

    Registration
        │
        └── INSERT

    Login / Profile page
        │
        └── SELECT

    Edit profile
        │
        └── UPDATE

    Delete account
        │
        └── DELETE

If user-controlled input is improperly inserted into SQL queries,
attackers may manipulate database operations.

This is one reason SQL knowledge is important before learning
SQL Injection.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.31 CRUD + SQL INJECTION CONNECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NORMAL APPLICATION:

    User Input
        │
        ▼
    Application
        │
        ▼
    SQL Query
        │
        ▼
    Database
        │
        ▼
    Result

SECURITY PROBLEM:

    Untrusted Input
        │
        ▼
    Unsafe SQL Construction
        │
        ▼
    Modified SQL Query
        │
        ▼
    Unexpected Database Operation

Possible impact can include:
    • Unauthorised data retrieval
    • Data modification
    • Data deletion
    • Authentication bypass
    • Information disclosure

IMPORTANT:
    SQL Injection is not caused by CRUD itself.
    It occurs when applications construct SQL unsafely from
    untrusted input.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.32 INSERT vs UPDATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INSERT:

    INSERT INTO users (...)
    VALUES (...);

    → Creates a NEW record.

UPDATE:

    UPDATE users
    SET username = "new_name"
    WHERE id = 1;

    → Modifies an EXISTING record.

MEMORY:

    INSERT = NEW
    UPDATE = EXISTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.33 DELETE vs DROP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERY IMPORTANT DIFFERENCE:

DELETE:
    DELETE FROM books
    WHERE id = 1;

    → Removes RECORD(S) from a table.

DROP:
    DROP TABLE books;

    → Removes the ENTIRE TABLE.

Also:

    DROP DATABASE tools_db;

    → Removes the DATABASE itself.

Hierarchy:

    DATABASE
       │
       └── TABLE
              │
              └── ROW / RECORD

DELETE
    → removes rows

DROP TABLE
    → removes table

DROP DATABASE
    → removes database

MEMORY TRICK:

    DELETE = Data
    DROP   = Structure
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.34 CRUD SUMMARY TABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    ┌────────┬────────┬─────────────────────────────────────┐
    │ CRUD   │ SQL    │ Purpose                             │
    ├────────┼────────┼─────────────────────────────────────┤
    │ Create │ INSERT │ Add new record                     │
    │ Read   │ SELECT │ Retrieve records                   │
    │ Update │ UPDATE │ Modify existing records            │
    │ Delete │ DELETE │ Remove records                     │
    └────────┴────────┴─────────────────────────────────────┘
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.35 COMMAND CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CREATE:
    INSERT INTO users (name, age)
    VALUES ("Surya", 23);

READ ALL:
    SELECT * FROM users;

READ SPECIFIC:
    SELECT name, age
    FROM users;

READ WITH CONDITION:
    SELECT *
    FROM users
    WHERE id = 1;

UPDATE:
    UPDATE users
    SET age = 24
    WHERE id = 1;

DELETE:
    DELETE FROM users
    WHERE id = 1;
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.36 COMMON BEGINNER MISTAKES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISTAKE 1:
    INSERT columns and VALUES in the wrong order.

BAD:
    INSERT INTO users (name, age)
    VALUES (23, "Surya");

FIX:
    INSERT INTO users (name, age)
    VALUES ("Surya", 23);

MISTAKE 2:
    Forgetting WHERE in UPDATE.

DANGEROUS:
    UPDATE users
    SET password = "test";

Potentially modifies every record.

MISTAKE 3:
    Forgetting WHERE in DELETE.

DANGEROUS:
    DELETE FROM users;

Potentially removes every record.

MISTAKE 4:
    Confusing DELETE and DROP.

    DELETE → rows/records
    DROP TABLE → entire table

MISTAKE 5:
    Using SELECT * when only a few columns are required.

Instead of:

    SELECT * FROM users;

Prefer when appropriate:

    SELECT username, email
    FROM users;

This can make results easier to read and can reduce unnecessary
data retrieval.
## Interview Questions

Q1.
What does CRUD stand for?

Answer

Create, Read, Update, Delete.

------------------------------------------------------------

Q2.
What SQL statement implements CRUD Create?

Answer

INSERT.

------------------------------------------------------------

Q3.
What SQL statement implements CRUD Read?

Answer

SELECT.

------------------------------------------------------------

Q4.
What SQL statement implements CRUD Update?

Answer

UPDATE.

------------------------------------------------------------

Q5.
What SQL statement implements CRUD Delete?

Answer

DELETE.

------------------------------------------------------------

Q6.
How do you insert a record?

Answer

INSERT INTO table_name (columns)
VALUES (values);

------------------------------------------------------------

Q7.
How do you retrieve all columns?

Answer

SELECT * FROM table_name;

------------------------------------------------------------

Q8.
What does * mean in SELECT?

Answer

It means all columns.

------------------------------------------------------------

Q9.
How do you retrieve specific columns?

Answer

SELECT column1, column2
FROM table_name;

------------------------------------------------------------

Q10.
How do you modify an existing record?

Answer

UPDATE table_name
SET column = value
WHERE condition;

------------------------------------------------------------

Q11.
How do you delete a specific record?

Answer

DELETE FROM table_name
WHERE condition;

------------------------------------------------------------

Q12.
Why is WHERE important in UPDATE?

Answer

It restricts which records are modified.

------------------------------------------------------------

Q13.
Why is WHERE important in DELETE?

Answer

It restricts which records are deleted.

------------------------------------------------------------

Q14.
What can happen if UPDATE is used without WHERE?

Answer

The update can affect all records in the table.

------------------------------------------------------------

Q15.
What can happen if DELETE is used without WHERE?

Answer

All records in the table can be deleted.

------------------------------------------------------------

Q16.
Difference between DELETE and DROP TABLE?

Answer

DELETE removes records; DROP TABLE removes the entire table.

------------------------------------------------------------

Q17.
What tool in the TryHackMe hacking_tools table performs MITM attacks on wireless networks?

Answer

Wi-Fi Pineapple.

------------------------------------------------------------

Q18.
What category is shared by USB Rubber Ducky and Bash Bunny?

Answer

USB attacks.

------------------------------------------------------------

## 5.38 PRACTICAL ANSWERS — TASK 5
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q1:
    Using tools_db, what tool can perform man-in-the-middle
    attacks on wireless networks?

ANSWER:
    Wi-Fi Pineapple

Q2:
    What is the shared category for USB Rubber Ducky
    and Bash Bunny?

ANSWER:
    USB attacks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.39 MOST IMPORTANT MEMORY MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    CRUD
                      │
       ┌──────────────┼──────────────┐
       │              │              │
       ▼              ▼              ▼
    CREATE           READ          UPDATE
       │              │              │
    INSERT          SELECT        UPDATE
       │              │              │
       ▼              ▼              ▼
     ADD            VIEW          CHANGE
       │              │              │
       └──────────────┼──────────────┘
                      │
                      ▼
                    DELETE
                      │
                    DELETE
                      │
                      ▼
                    REMOVE

WHERE:
    "WHICH RECORD?"

    SELECT + WHERE
        → Find specific records

    UPDATE + WHERE
        → Change specific records

    DELETE + WHERE
        → Remove specific records
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 5.40 COMPLETE SQL LEARNING FLOW SO FAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATABASE
   │
   ▼
TABLE
   │
   ▼
ROWS + COLUMNS
   │
   ▼
SQL
   │
   ├── DATABASE/TABLE STATEMENTS
   │      ├── CREATE
   │      ├── SHOW
   │      ├── USE
   │      ├── DESCRIBE
   │      ├── ALTER
   │      └── DROP
   │
   └── CRUD
          ├── INSERT
          ├── SELECT
          ├── UPDATE
          └── DELETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 3 STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[✓] Task 1 — Introduction
[✓] Task 2 — Databases 101
[✓] Task 3 — SQL
[✓] Task 4 — Database and Table Statements
[✓] Task 5 — CRUD Operations
[ ] Task 6 — Clauses
[ ] Task 7 — Operators
[ ] Task 8 — Functions
[ ] Task 9 — Conclusion

## SQL CLAUSES
> Task 6: Clauses
> Focus: DISTINCT, GROUP BY, ORDER BY, HAVING
> Database used: thm_books / tools_db
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 3 RECAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRUD OPERATIONS
    CREATE
        └── INSERT
    READ
        └── SELECT
    UPDATE
        └── UPDATE
    DELETE
        └── DELETE

We also learned:
    FROM
        → Specifies the table
    WHERE
        → Specifies which records should be used

Now we learn additional SQL CLAUSES:
    DISTINCT
    GROUP BY
    ORDER BY
    HAVING

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TASK 6 — CLAUSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A CLAUSE is a part of an SQL statement that helps specify the
criteria for how data should be manipulated, retrieved, grouped,
filtered or sorted.

Previously we already used:

    FROM
        → Specifies the table being accessed.

    WHERE
        → Specifies which records should be used.

This task focuses on:

    DISTINCT
        → Remove duplicate values from results

    GROUP BY
        → Group records based on a column/value

    ORDER BY
        → Sort returned records

    HAVING
        → Filter grouped/aggregated results

BIG PICTURE:

    SQL QUERY
        │
        ├── FROM
        │      └── Which table?
        │
        ├── WHERE
        │      └── Which rows?
        │
        ├── GROUP BY
        │      └── Which groups?
        │
        ├── HAVING
        │      └── Which groups survive?
        │
        └── ORDER BY
               └── In what order?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.1 DISTINCT CLAUSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DISTINCT is used to avoid duplicate values in query results.

It returns UNIQUE values.

SYNTAX:

    SELECT DISTINCT column_name
    FROM table_name;

Think:

    DISTINCT
        =
    "Give me each value only once."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.2 DISTINCT — WITHOUT DISTINCT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The room uses the books table.

Query:

    mysql> SELECT * FROM books;

Example output:

    +----+----------------------------+----------------+--------------------------------------------------------+
    | id | name                       | published_date | description                                            |
    +----+----------------------------+----------------+--------------------------------------------------------+
    |  1 | Android Security Internals | 2014-10-14     | An In-Depth Guide to Android's Security Architecture   |
    |  2 | Bug Bounty Bootcamp        | 2021-11-16     | The Guide to Finding and Reporting Web Vulnerabilities |
    |  3 | Car Hacker's Handbook      | 2016-02-25     | A Guide for the Penetration Tester                     |
    |  4 | Designing Secure Software  | 2021-12-21     | A Guide for Developers                                 |
    |  5 | Ethical Hacking            | 2021-11-02     | A Hands-on Introduction to Breaking In                 |
    |  6 | Ethical Hacking            | 2021-11-02     |                                                        |
    +----+----------------------------+----------------+--------------------------------------------------------+

    6 rows in set

Notice:

    Ethical Hacking
    Ethical Hacking

appears twice.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.3 DISTINCT — REMOVE DUPLICATES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query:

    mysql> SELECT DISTINCT name
        FROM books;

Output:

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

The duplicate:

    Ethical Hacking
    Ethical Hacking

is returned only once.

IMPORTANT:

    SELECT name FROM books;

        → Can return duplicate names.

    SELECT DISTINCT name FROM books;

        → Returns each unique name once.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.4 DISTINCT — VISUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INPUT:

    Android Security Internals
    Bug Bounty Bootcamp
    Car Hacker's Handbook
    Designing Secure Software
    Ethical Hacking
    Ethical Hacking

              │
              ▼
          DISTINCT

              │
              ▼

OUTPUT:

    Android Security Internals
    Bug Bounty Bootcamp
    Car Hacker's Handbook
    Designing Secure Software
    Ethical Hacking

DUPLICATE → REMOVED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.5 DISTINCT — REAL-WORLD USE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Suppose:

    users
    ┌────┬──────────┬──────────────┐
    │ id │ name     │ country      │
    ├────┼──────────┼──────────────┤
    │ 1  │ Alice    │ India        │
    │ 2  │ Bob      │ India        │
    │ 3  │ Charlie  │ USA          │
    │ 4  │ David    │ India        │
    │ 5  │ Eve      │ UK           │
    └────┴──────────┴──────────────┘

Query:

    SELECT DISTINCT country
    FROM users;

Result:

    India
    USA
    UK

Without DISTINCT:

    India
    India
    USA
    India
    UK

MEMORY:

    DISTINCT = UNIQUE VALUES ONLY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.6 GROUP BY CLAUSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GROUP BY groups records based on one or more columns.

It is especially useful with AGGREGATE FUNCTIONS.

Common aggregate functions:

    COUNT()
    SUM()
    AVG()
    MIN()
    MAX()

GENERAL SYNTAX:

    SELECT column_name, COUNT(*)
    FROM table_name
    GROUP BY column_name;

Think:

    GROUP BY
        =
    "Put similar values into groups."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.7 GROUP BY — BASIC EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query:

    mysql> SELECT name, COUNT(*)
        FROM books
        GROUP BY name;

Output:

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

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.8 UNDERSTANDING GROUP BY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Original records:

    Android Security Internals
        → 1

    Bug Bounty Bootcamp
        → 1

    Car Hacker's Handbook
        → 1

    Designing Secure Software
        → 1

    Ethical Hacking
        → 2 records

GROUP BY name:

                    BOOK NAMES
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
      Name A         Name B         Ethical Hacking
         │              │                 │
         ▼              ▼                 ▼
       COUNT=1        COUNT=1           COUNT=2

The duplicate Ethical Hacking records become one group:

    Ethical Hacking → 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.9 GROUP BY + COUNT()
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query:

    SELECT name, COUNT(*)
    FROM books
    GROUP BY name;

Breakdown:

    SELECT name
        → Display group name

    COUNT(*)
        → Count records in each group

    FROM books
        → Source table

    GROUP BY name
        → Create groups based on name

Example:

    Ethical Hacking
          │
          ├── Record 5
          └── Record 6
                  │
                  ▼
              COUNT(*) = 2

MEMORY:

    GROUP BY = Make groups
    COUNT()  = Count records in each group

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.10 DISTINCT vs GROUP BY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DISTINCT:

    SELECT DISTINCT name
    FROM books;

Purpose:

    → Return unique names.

GROUP BY:

    SELECT name, COUNT(*)
    FROM books
    GROUP BY name;

Purpose:

    → Group names and allow aggregation.

COMPARE:

    DISTINCT
        → Remove duplicate output values

    GROUP BY
        → Create groups for analysis/aggregation

Example:

    DISTINCT:
        Ethical Hacking

    GROUP BY:
        Ethical Hacking | 2

MEMORY:

    DISTINCT = UNIQUE
    GROUP BY = GROUP + ANALYSE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.11 ORDER BY CLAUSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ORDER BY sorts records returned by a query.

It can sort in:

    ASC
        → Ascending

    DESC
        → Descending

GENERAL SYNTAX:

    SELECT *
    FROM table_name
    ORDER BY column_name ASC;

or:

    SELECT *
    FROM table_name
    ORDER BY column_name DESC;

IMPORTANT:

    ASC
        → Small → Large
        → A → Z
        → Old → New

    DESC
        → Large → Small
        → Z → A
        → New → Old

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.12 ASCENDING ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query:

    mysql> SELECT *
        FROM books
        ORDER BY published_date ASC;

Output:

    +----+----------------------------+----------------+--------------------------------------------------------+
    | id | name                       | published_date | description                                            |
    +----+----------------------------+----------------+--------------------------------------------------------+
    |  1 | Android Security Internals | 2014-10-14     | An In-Depth Guide to Android's Security Architecture   |
    |  3 | Car Hacker's Handbook      | 2016-02-25     | A Guide for the Penetration Tester                     |
    |  5 | Ethical Hacking            | 2021-11-02     | A Hands-on Introduction to Breaking In                 |
    |  6 | Ethical Hacking            | 2021-11-02     |                                                        |
    |  2 | Bug Bounty Bootcamp        | 2021-11-16     | The Guide to Finding and Reporting Web Vulnerabilities |
    |  4 | Designing Secure Software  | 2021-12-21     | A Guide for Developers                                 |
    +----+----------------------------+----------------+--------------------------------------------------------+

Oldest date:

    2014-10-14

Newest date:

    2021-12-21

So ASC arranged dates:

    OLD → NEW

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.13 DESCENDING ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query:

    mysql> SELECT *
        FROM books
        ORDER BY published_date DESC;

Output:

    +----+----------------------------+----------------+--------------------------------------------------------+
    | id | name                       | published_date | description                                            |
    +----+----------------------------+----------------+--------------------------------------------------------+
    |  4 | Designing Secure Software  | 2021-12-21     | A Guide for Developers                                 |
    |  2 | Bug Bounty Bootcamp        | 2021-11-16     | The Guide to Finding and Reporting Web Vulnerabilities |
    |  5 | Ethical Hacking            | 2021-11-02     | A Hands-on Introduction to Breaking In                 |
    |  6 | Ethical Hacking            | 2021-11-02     |                                                        |
    |  3 | Car Hacker's Handbook      | 2016-02-25     | A Guide for the Penetration Tester                     |
    |  1 | Android Security Internals | 2014-10-14     | An In-Depth Guide to Android's Security Architecture   |
    +----+----------------------------+----------------+--------------------------------------------------------+

DESC arranged dates:

    NEW → OLD

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.14 ASC vs DESC
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ASC:

    1
    2
    3
    4
    5

    A → Z
    LOW → HIGH
    OLD → NEW

DESC:

    5
    4
    3
    2
    1

    Z → A
    HIGH → LOW
    NEW → OLD

MEMORY:

    ASC  = Ascending = Up
    DESC = Descending = Down

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.15 ORDER BY — STRING EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query:

    SELECT *
    FROM hacking_tools
    ORDER BY name ASC;

This sorts names alphabetically:

    A
    B
    C
    ...

DESC:

    SELECT *
    FROM hacking_tools
    ORDER BY name DESC;

This sorts:

    Z
    Y
    X
    ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.16 ORDER BY DEFAULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If ASC/DESC is not specified, ORDER BY normally uses ascending
order by default.

Example:

    SELECT *
    FROM books
    ORDER BY published_date;

is equivalent to:

    SELECT *
    FROM books
    ORDER BY published_date ASC;

Still, explicitly writing ASC/DESC is often clearer.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.17 HAVING CLAUSE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HAVING is used to filter GROUPED/AGGREGATED results.

This is especially important with:

    GROUP BY
    COUNT()
    SUM()
    AVG()
    MAX()
    MIN()

GENERAL SYNTAX:

    SELECT column_name, COUNT(*)
    FROM table_name
    GROUP BY column_name
    HAVING condition;

IMPORTANT DIFFERENCE:

    WHERE
        → Filters individual records BEFORE grouping/aggregation.

    HAVING
        → Filters groups/results AFTER grouping/aggregation.

MEMORY:

    WHERE  = Which ROWS?
    HAVING = Which GROUPS?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.18 HAVING — ROOM EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query:

    mysql> SELECT name, COUNT(*)
        FROM books
        GROUP BY name
        HAVING name LIKE '%Hack%';

Output:

    +-----------------------+----------+
    | name                  | COUNT(*) |
    +-----------------------+----------+
    | Car Hacker's Handbook |        1 |
    | Ethical Hacking       |        2 |
    +-----------------------+----------+

    2 rows in set

The query:

    1. Reads books
    2. Groups them by name
    3. Counts each group
    4. Applies HAVING
    5. Keeps names containing "Hack"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.19 UNDERSTANDING HAVING STEP-BY-STEP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUERY:

    SELECT name, COUNT(*)
    FROM books
    GROUP BY name
    HAVING name LIKE '%Hack%';

STEP 1:
    FROM books

        ↓

    Get records from books.

STEP 2:
    GROUP BY name

        ↓

    Create groups:

        Android Security Internals → 1
        Bug Bounty Bootcamp       → 1
        Car Hacker's Handbook     → 1
        Designing Secure Software → 1
        Ethical Hacking           → 2

STEP 3:
    HAVING name LIKE '%Hack%'

        ↓

    Keep only:

        Car Hacker's Handbook
        Ethical Hacking

STEP 4:
    COUNT(*)

        ↓

        Car Hacker's Handbook → 1
        Ethical Hacking       → 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.20 WHERE vs HAVING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHERE:

    SELECT *
    FROM books
    WHERE name LIKE '%Hack%';

Purpose:

    Filter individual rows.

HAVING:

    SELECT name, COUNT(*)
    FROM books
    GROUP BY name
    HAVING name LIKE '%Hack%';

Purpose:

    Filter grouped results.

CORE DIFFERENCE:

    WHERE
       │
       ▼
    ROW FILTER
       │
       ▼
    GROUP BY
       │
       ▼
    GROUP FILTER
       │
       ▼
    HAVING

MEMORY:

    WHERE  → Before GROUP BY
    HAVING → After GROUP BY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.21 WHY HAVING EXISTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Suppose we want:

    "Show book names that appear more than once."

We need:

    GROUP BY name

because we need to create groups.

Then:

    HAVING COUNT(*) > 1

to keep only groups with more than one record.

Query:

    SELECT name, COUNT(*)
    FROM books
    GROUP BY name
    HAVING COUNT(*) > 1;

Expected:

    Ethical Hacking | 2

This is a very common SQL pattern.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.22 FOUR CLAUSES — ONE VIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DISTINCT
    │
    └── Remove duplicate values

GROUP BY
    │
    └── Create groups

ORDER BY
    │
    └── Sort results

HAVING
    │
    └── Filter groups

MEMORY:

    DISTINCT → UNIQUE
    GROUP BY → GROUP
    HAVING   → FILTER GROUPS
    ORDER BY → SORT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.23 COMPLETE QUERY EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example:

    SELECT category, COUNT(*)
    FROM hacking_tools
    WHERE amount >= 100
    GROUP BY category
    HAVING COUNT(*) >= 1
    ORDER BY COUNT(*) DESC;

Concept:

    FROM
        ↓
    hacking_tools

    WHERE
        ↓
    amount >= 100

    GROUP BY
        ↓
    category

    HAVING
        ↓
    Keep groups satisfying condition

    ORDER BY
        ↓
    Sort final groups

This combines multiple SQL concepts together.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.24 SQL QUERY WRITING ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When WRITING a normal SELECT query, the common clause order is:

    SELECT
    FROM
    WHERE
    GROUP BY
    HAVING
    ORDER BY

Example:

    SELECT category, COUNT(*)
    FROM hacking_tools
    WHERE amount > 100
    GROUP BY category
    HAVING COUNT(*) > 1
    ORDER BY COUNT(*) DESC;

IMPORTANT:

    Syntax order ≠ logical execution order.

The SQL engine logically processes the query approximately as:

    FROM
      ↓
    WHERE
      ↓
    GROUP BY
      ↓
    HAVING
      ↓
    SELECT
      ↓
    ORDER BY

This distinction becomes useful when understanding why aliases,
aggregation and filtering behave differently.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.25 CLAUSE FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                     DATABASE
                         │
                         ▼
                       TABLE
                         │
                         ▼
                       FROM
                         │
                         ▼
                      WHERE
                         │
                         ▼
                     GROUP BY
                         │
                         ▼
                      HAVING
                         │
                         ▼
                       SELECT
                         │
                         ▼
                     ORDER BY
                         │
                         ▼
                       RESULT

NOTE:
    Not every query needs every clause.

Example:

    SELECT * FROM books;

Only needs:
    SELECT
    FROM

Another query may use:

    SELECT
    FROM
    WHERE
    GROUP BY
    HAVING
    ORDER BY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.26 DISTINCT + tools_db
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Task 6 uses:

    DATABASE:
        tools_db

    TABLE:
        hacking_tools

First:

    mysql> USE tools_db;

Then:

    mysql> SELECT DISTINCT category
        FROM hacking_tools;

This retrieves unique categories.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.27 DISTINCT CATEGORIES — OUTPUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query:

    SELECT DISTINCT(category)
    FROM hacking_tools;

Output:

    +----------------------+
    | category             |
    +----------------------+
    | Multi-tool           |
    | Cable-based attacks  |
    | Wi-Fi hacking        |
    | USB attacks          |
    | RFID cloning         |
    | Network intelligence |
    +----------------------+

Total:

    6 rows

Therefore:

    DISTINCT CATEGORIES = 6

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.28 TASK 6 — QUESTION 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION:

    Using the tools_db database, what is the total number of
    distinct categories in the hacking_tools table?

QUERY:

    mysql> USE tools_db;

    mysql> SELECT DISTINCT(category)
        FROM hacking_tools;

Categories:

    1. Multi-tool
    2. Cable-based attacks
    3. Wi-Fi hacking
    4. USB attacks
    5. RFID cloning
    6. Network intelligence

ANSWER:

    6

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.29 ORDER BY — TOOLS_DB
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Now sort the hacking_tools table by NAME.

Ascending:

    SELECT *
    FROM hacking_tools
    ORDER BY name ASC;

This sorts names:

    A → Z

Descending:

    SELECT *
    FROM hacking_tools
    ORDER BY name DESC;

This sorts:

    Z → A

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.30 ASCENDING TOOL ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tools alphabetically:

    Bash Bunny
    Flipper Zero
    iCopy-XS
    Lan Turtle
    O.MG cables
    Proxmark 3 RDV4
    USB Rubber Ducky
    Wi-Fi Pineapple

Therefore, FIRST tool alphabetically:

    Bash Bunny

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.31 TASK 6 — QUESTION 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION:

    Using the tools_db database, what is the first tool
    (by name) in ascending order from the hacking_tools table?

COMMAND:

    mysql> SELECT *
        FROM hacking_tools
        ORDER BY name ASC;

Sorted result begins:

    Bash Bunny
    Flipper Zero
    iCopy-XS
    ...

ANSWER:

    Bash Bunny

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.32 DESCENDING TOOL ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Descending alphabetical order:

    Wi-Fi Pineapple
    USB Rubber Ducky
    Proxmark 3 RDV4
    O.MG cables
    Lan Turtle
    iCopy-XS
    Flipper Zero
    Bash Bunny

Therefore, FIRST tool in descending order:

    Wi-Fi Pineapple

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.33 TASK 6 — QUESTION 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION:

    Using the tools_db database, what is the first tool
    (by name) in descending order from the hacking_tools table?

COMMAND:

    mysql> SELECT *
        FROM hacking_tools
        ORDER BY name DESC;

Sorted result begins:

    Wi-Fi Pineapple
    USB Rubber Ducky
    Proxmark 3 RDV4
    ...

ANSWER:

    Wi-Fi Pineapple

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.34 TASK 6 — ALL ANSWERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q1:
    Total number of distinct categories?

A:
    6

Q2:
    First tool by name in ascending order?

A:
    Bash Bunny

Q3:
    First tool by name in descending order?

A:
    Wi-Fi Pineapple

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.35 CLAUSE CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DISTINCT:

    SELECT DISTINCT column
    FROM table;

    → Remove duplicate values from result.

GROUP BY:

    SELECT column, COUNT(*)
    FROM table
    GROUP BY column;

    → Group records for aggregation.

ORDER BY:

    SELECT *
    FROM table
    ORDER BY column ASC;

    → Sort ascending.

    SELECT *
    FROM table
    ORDER BY column DESC;

    → Sort descending.

HAVING:

    SELECT column, COUNT(*)
    FROM table
    GROUP BY column
    HAVING COUNT(*) > 1;

    → Filter groups after aggregation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.36 DISTINCT vs GROUP BY vs HAVING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DISTINCT:

    "I only want unique values."

GROUP BY:

    "I want to create groups."

HAVING:

    "I only want groups matching a condition."

ORDER BY:

    "I want the result sorted."

Example:

    SELECT category, COUNT(*)
    FROM hacking_tools
    GROUP BY category
    HAVING COUNT(*) > 1
    ORDER BY COUNT(*) DESC;

Translation:

    GROUP BY
        → Make category groups.

    COUNT
        → Count tools per category.

    HAVING
        → Keep categories matching condition.

    ORDER BY
        → Sort the final result.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.37 COMMON BEGINNER MISTAKES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISTAKE 1:
    Using DISTINCT when you actually need counts.

    SELECT DISTINCT category
    FROM hacking_tools;

    → Gives unique categories.

    SELECT category, COUNT(*)
    FROM hacking_tools
    GROUP BY category;

    → Gives category + count.

MISTAKE 2:
    Confusing WHERE and HAVING.

    WHERE
        → Filters rows.

    HAVING
        → Filters groups.

MISTAKE 3:
    Using ORDER BY before GROUP BY in SQL syntax.

WRONG:

    SELECT category, COUNT(*)
    FROM hacking_tools
    ORDER BY category
    GROUP BY category;

CORRECT:

    SELECT category, COUNT(*)
    FROM hacking_tools
    GROUP BY category
    ORDER BY category;

MISTAKE 4:
    Confusing ASC and DESC.

    ASC
        → A → Z
        → Low → High

    DESC
        → Z → A
        → High → Low

MISTAKE 5:
    Thinking DISTINCT modifies the original database.

It does NOT.

    SELECT DISTINCT category
    FROM hacking_tools;

Only the QUERY RESULT is made unique.
The original table remains unchanged.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.38 SECURITY / SOC USE CASE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Clauses are useful during security investigations.

Example:

    logs
    ┌──────────┬────────────┬─────────────┐
    │ user     │ event      │ source_ip   │
    ├──────────┼────────────┼─────────────┤
    │ alice    │ login      │ 10.0.0.5    │
    │ bob      │ login      │ 10.0.0.5    │
    │ charlie  │ login      │ 10.0.0.8    │
    │ alice    │ login      │ 10.0.0.5    │
    └──────────┴────────────┴─────────────┘

Unique IPs:

    SELECT DISTINCT source_ip
    FROM logs;

Count events per IP:

    SELECT source_ip, COUNT(*)
    FROM logs
    GROUP BY source_ip;

Sort by most events:

    SELECT source_ip, COUNT(*)
    FROM logs
    GROUP BY source_ip
    ORDER BY COUNT(*) DESC;

Only suspicious/high-volume IPs:

    SELECT source_ip, COUNT(*)
    FROM logs
    GROUP BY source_ip
    HAVING COUNT(*) > 100;

This pattern is useful for:
    • SOC investigations
    • Log analysis
    • Threat hunting
    • Database analysis
    • Incident response

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.39 SQL INJECTION CONNECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Understanding clauses is important for understanding SQL Injection.

Example normal query:

    SELECT *
    FROM users
    WHERE username = 'alice';

Here:

    SELECT
        → What to return

    FROM
        → Where to retrieve it

    WHERE
        → Which records

An attacker studying SQL Injection needs to understand how
these clauses change the behaviour of a query.

Therefore:

    SQL BASICS
        ↓
    SELECT
        ↓
    WHERE
        ↓
    CLAUSES
        ↓
    OPERATORS
        ↓
    FUNCTIONS
        ↓
    SQL INJECTION

## Interview Questions

Q1.
What is a SQL clause?

Answer

A part of an SQL statement used to specify criteria for
retrieving, filtering, grouping, sorting or manipulating data.

------------------------------------------------------------

Q2.
What does DISTINCT do?

Answer

It removes duplicate values from the query result.

------------------------------------------------------------

Q3.
What does GROUP BY do?

Answer

It groups records with the same values, commonly for use
with aggregate functions.

------------------------------------------------------------

Q4.
What does ORDER BY do?

Answer

It sorts query results in ascending or descending order.

------------------------------------------------------------

Q5.
What does ASC mean?

Answer

Ascending order.

------------------------------------------------------------

Q6.
What does DESC mean?

Answer

Descending order.

------------------------------------------------------------

Q7.
What does HAVING do?

Answer

It filters grouped/aggregated results.

------------------------------------------------------------

Q8.
WHERE vs HAVING?

Answer

WHERE filters rows before grouping; HAVING filters groups
after grouping/aggregation.

------------------------------------------------------------

Q9.
DISTINCT vs GROUP BY?

Answer

DISTINCT returns unique values; GROUP BY creates groups,
usually for aggregation.

------------------------------------------------------------

Q10.
What is the default ORDER BY direction?

Answer

Ascending (ASC).

------------------------------------------------------------

Q11.
Why is GROUP BY commonly used with COUNT()?

Answer

GROUP BY creates groups and COUNT() calculates how many
records belong to each group.

------------------------------------------------------------

Q12.
How do you find unique categories?

Answer

SELECT DISTINCT category
FROM hacking_tools;

------------------------------------------------------------

Q13.
How do you count records per category?

Answer

SELECT category, COUNT(*)
FROM hacking_tools
GROUP BY category;

------------------------------------------------------------

Q14.
How do you filter groups?

Answer

Use HAVING.

------------------------------------------------------------

Q15.
How do you sort results alphabetically?

Answer

ORDER BY column_name ASC;

------------------------------------------------------------

## 6.41 REAL-WORLD QUERY PATTERNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
### UNIQUE VALUES

    SELECT DISTINCT category
    FROM hacking_tools;

### COUNT PER CATEGORY

    SELECT category, COUNT(*)
    FROM hacking_tools
    GROUP BY category;

### SORT A → Z

    SELECT *
    FROM hacking_tools
    ORDER BY name ASC;

### SORT Z → A

    SELECT *
    FROM hacking_tools
    ORDER BY name DESC;

### GROUP + FILTER

    SELECT category, COUNT(*)
    FROM hacking_tools
    GROUP BY category
    HAVING COUNT(*) > 1;

### FILTER + GROUP + SORT

    SELECT category, COUNT(*)
    FROM hacking_tools
    WHERE amount >= 100
    GROUP BY category
    HAVING COUNT(*) > 1
    ORDER BY COUNT(*) DESC;

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.42 MASTER MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                SQL CLAUSES

    DISTINCT
       │
       └── UNIQUE

    GROUP BY
       │
       └── GROUP

    HAVING
       │
       └── FILTER GROUPS

    ORDER BY
       │
       └── SORT

Remember:

    D → DISTINCT → Duplicate hatao
    G → GROUP BY → Groups banao
    H → HAVING → Groups filter karo
    O → ORDER BY → Order/sort karo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.43 ONE-LINE REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DISTINCT
    → Unique values

GROUP BY
    → Group similar records

ORDER BY
    → Sort results

ASC
    → Low → High / A → Z

DESC
    → High → Low / Z → A

HAVING
    → Filter groups

WHERE
    → Filter rows

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 6.44 TASK 6 FINAL REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUERY:

    SELECT DISTINCT category
    FROM hacking_tools;

PURPOSE:

    Find unique categories.

ANSWER:

    6

──────────────────────────────────────────────────────────────────────

QUERY:

    SELECT *
    FROM hacking_tools
    ORDER BY name ASC;

PURPOSE:

    Sort tools alphabetically.

FIRST:

    Bash Bunny

──────────────────────────────────────────────────────────────────────

QUERY:

    SELECT *
    FROM hacking_tools
    ORDER BY name DESC;

PURPOSE:

    Sort tools reverse-alphabetically.

FIRST:

    Wi-Fi Pineapple

──────────────────────────────────────────────────────────────────────

QUERY:

    SELECT name, COUNT(*)
    FROM books
    GROUP BY name
    HAVING name LIKE '%Hack%';

PURPOSE:

    Group books by name and keep matching groups.

RESULT:

    Car Hacker's Handbook → 1
    Ethical Hacking       → 2

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 4 STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[✓] Task 1 — Introduction
[✓] Task 2 — Databases 101
[✓] Task 3 — SQL
[✓] Task 4 — Database and Table Statements
[✓] Task 5 — CRUD Operations
[✓] Task 6 — Clauses
[ ] Task 7 — Operators
[ ] Task 8 — Functions
[ ] Task 9 — Conclusion

## SQL OPERATORS
> Task 7: Operators
> Focus: Comparison Operators, Logical Operators, LIKE, AND, OR
> Database: tools_db
> Table: hacking_tools
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 4 RECAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SQL CLAUSES

    DISTINCT
        → Remove duplicate values from result

    GROUP BY
        → Group records

    HAVING
        → Filter groups

    ORDER BY
        → Sort results

We also know:

    WHERE
        → Filter individual rows

Now we use OPERATORS to make WHERE conditions more powerful.

Example:

    SELECT *
    FROM hacking_tools
    WHERE amount >= 300;

Here:

    WHERE
        → Filters records

    >=
        → Operator used to compare amount

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TASK 7 — OPERATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SQL OPERATORS are symbols/keywords used to perform operations
on values and expressions.

They allow us to:

    • Compare values
    • Combine conditions
    • Search for patterns
    • Perform calculations
    • Filter records
    • Build more complex SQL queries

Basic idea:

    SELECT
        │
        ▼
    FROM table
        │
        ▼
    WHERE
        │
        ▼
    OPERATOR
        │
        ▼
    CONDITION
        │
        ▼
    RESULT

Example:

    SELECT *
    FROM hacking_tools
    WHERE amount >= 300;

    amount >= 300
          │
          └── Comparison operator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.1 TYPES OF OPERATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Important SQL operator categories:

    1. Comparison Operators
    2. Logical Operators
    3. Pattern Matching Operators
    4. Arithmetic Operators
    5. Other useful operators

Common operators:

    =       Equal to
    !=      Not equal to
    <>      Not equal to
    >       Greater than
    <       Less than
    >=      Greater than or equal to
    <=      Less than or equal to

Logical:

    AND
    OR
    NOT

Pattern matching:

    LIKE
    NOT LIKE
    %

Membership/range:

    IN
    NOT IN
    BETWEEN

NULL:

    IS NULL
    IS NOT NULL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.2 COMPARISON OPERATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Comparison operators compare two values.

    ┌────────┬─────────────────────────────┐
    │ OP     │ MEANING                     │
    ├────────┼─────────────────────────────┤
    │ =      │ Equal                       │
    │ !=     │ Not equal                   │
    │ <>     │ Not equal                   │
    │ >      │ Greater than                │
    │ <      │ Less than                  │
    │ >=     │ Greater than or equal      │
    │ <=     │ Less than or equal         │
    └────────┴─────────────────────────────┘

Example:

    WHERE amount = 100

Means:

    amount is exactly 100

Example:

    WHERE amount > 100

Means:

    amount is greater than 100

Example:

    WHERE amount <= 100

Means:

    amount is less than or equal to 100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.3 EQUAL TO (=)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Operator:

    =

Meaning:

    Equal to

Example:

    SELECT *
    FROM hacking_tools
    WHERE category = 'Multi-tool';

This means:

    category
        │
        ▼
    must exactly equal
        │
        ▼
    Multi-tool

Possible result:

    Flipper Zero

IMPORTANT:

    =
        → Comparison

    It does NOT mean assignment in a WHERE condition.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.4 NOT EQUAL (!= / <>)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Two commonly supported not-equal operators are:

    !=
    <>

Example:

    SELECT *
    FROM hacking_tools
    WHERE category != 'USB attacks';

Meaning:

    Return tools whose category is NOT USB attacks.

The alternative:

    WHERE category <> 'USB attacks';

has the same general meaning in MySQL.

MEMORY:

    =
        → Equal

    != / <>
        → Not equal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.5 GREATER THAN (>)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Operator:

    >

Example:

    SELECT *
    FROM hacking_tools
    WHERE amount > 100;

Meaning:

    Return tools whose amount is greater than 100.

IMPORTANT:

    100 is NOT included.

Example:

    amount > 100

Matches:

    101
    120
    169
    300

Does NOT match:

    100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.6 LESS THAN (<)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Operator:

    <

Example:

    SELECT *
    FROM hacking_tools
    WHERE amount < 100;

Meaning:

    Return tools whose amount is less than 100.

IMPORTANT:

    100 is NOT included.

Example:

    amount < 100

Matches:

    80

Does NOT match:

    100

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.7 GREATER THAN OR EQUAL (>=)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Operator:

    >=

Meaning:

    Greater than OR equal to

Example:

    SELECT *
    FROM hacking_tools
    WHERE amount >= 300;

This matches:

    300
    301
    302
    ...

IMPORTANT:

    300 IS INCLUDED.

Compare:

    > 300

    → 300 excluded

    >= 300

    → 300 included

MEMORY:

    >  = strictly greater

    >= = greater + equal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.8 LESS THAN OR EQUAL (<=)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Operator:

    <=

Meaning:

    Less than OR equal to

Example:

    SELECT *
    FROM hacking_tools
    WHERE amount <= 100;

This matches:

    100
    99
    98
    ...

IMPORTANT:

    100 IS INCLUDED.

Compare:

    < 100
        → 100 excluded

    <= 100
        → 100 included

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.9 COMPARISON OPERATOR MEMORY MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    amount = 100
        ↓
    EXACTLY 100

    amount != 100
        ↓
    NOT 100

    amount > 100
        ↓
    MORE THAN 100

    amount < 100
        ↓
    LESS THAN 100

    amount >= 100
        ↓
    100 OR MORE

    amount <= 100
        ↓
    100 OR LESS

MEMORY:

    >  = MORE
    <  = LESS
    =  = SAME
    >= = MORE + SAME
    <= = LESS + SAME
    != = NOT SAME

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.10 LOGICAL OPERATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Logical operators allow us to combine multiple conditions.

Main logical operators:

    AND
    OR
    NOT

Example:

    WHERE category = 'USB attacks'
    AND amount < 100;

Two conditions exist:

    Condition 1:
        category = 'USB attacks'

    Condition 2:
        amount < 100

AND requires BOTH conditions to be true.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.11 AND OPERATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AND means:

    ALL specified conditions must be TRUE.

Syntax:

    WHERE condition1
    AND condition2;

Example:

    SELECT *
    FROM hacking_tools
    WHERE category = 'Network intelligence'
    AND amount < 100;

The record must satisfy:

    category = Network intelligence
              AND
    amount < 100

Both must be true.

LOGIC:

    TRUE AND TRUE
        → TRUE

    TRUE AND FALSE
        → FALSE

    FALSE AND TRUE
        → FALSE

    FALSE AND FALSE
        → FALSE

MEMORY:

    AND = BOTH

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.12 AND — VISUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
             CONDITION 1
                  │
                  ▼
              category
                  │
                  ▼
       Network intelligence
                  │
                  AND
                  │
                  ▼
             CONDITION 2
                  │
                  ▼
              amount < 100
                  │
                  ▼
              RESULT

Only records satisfying BOTH conditions survive.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.13 OR OPERATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OR means:

    At least ONE condition must be TRUE.

Example:

    SELECT *
    FROM hacking_tools
    WHERE category = 'USB attacks'
    OR category = 'RFID cloning';

A record can match either:

    USB attacks

OR:

    RFID cloning

LOGIC:

    TRUE OR TRUE
        → TRUE

    TRUE OR FALSE
        → TRUE

    FALSE OR TRUE
        → TRUE

    FALSE OR FALSE
        → FALSE

MEMORY:

    OR = ANY ONE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.14 AND vs OR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AND:

    WHERE amount > 100
    AND amount < 300;

Means:

    amount must satisfy BOTH.

Result range:

    100 < amount < 300

OR:

    WHERE amount < 100
    OR amount > 300;

Means:

    amount can satisfy either condition.

MEMORY:

    AND → BOTH
    OR  → EITHER / AT LEAST ONE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.15 NOT OPERATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOT reverses a condition.

Example:

    SELECT *
    FROM hacking_tools
    WHERE NOT category = 'USB attacks';

Meaning:

    Return tools whose category is NOT USB attacks.

Another form:

    WHERE category != 'USB attacks';

or:

    WHERE category <> 'USB attacks';

MEMORY:

    NOT = opposite

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.16 LIKE OPERATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIKE is used for pattern matching.

Instead of checking for an exact value:

    category = 'USB attacks'

we can search for a pattern.

Example:

    description LIKE '%pentesters%'

This means:

    Find descriptions containing:
        pentesters

LIKE is especially useful for searching text.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.17 WILDCARD %
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The `%` symbol is a wildcard.

It represents:

    Zero or more characters.

Examples:

    LIKE 'Hack%'

Means:

    Starts with "Hack"

Possible matches:

    Hacker
    Hacking
    HackTools

Example:

    LIKE '%Hack'

Means:

    Ends with "Hack"

Possible:

    SQLHack
    WebHack

Example:

    LIKE '%Hack%'

Means:

    Contains "Hack" anywhere.

Possible:

    Hacker
    Ethical Hacking
    Car Hacker's Handbook

MEMORY:

    %text%
        → text anywhere

    text%
        → starts with text

    %text
        → ends with text

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.18 LIKE EXAMPLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STARTS WITH:

    WHERE name LIKE 'USB%';

Meaning:

    name starts with USB.

ENDS WITH:

    WHERE name LIKE '%Ducky';

Meaning:

    name ends with Ducky.

CONTAINS:

    WHERE description LIKE '%pentesters%';

Meaning:

    description contains pentesters.

EXACT:

    WHERE name = 'Flipper Zero';

Meaning:

    exact comparison.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.19 LIKE vs =
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXACT MATCH:

    WHERE name = 'Flipper Zero';

Only:

    Flipper Zero

PATTERN MATCH:

    WHERE name LIKE '%Flipper%';

Could match any value containing:

    Flipper

IMPORTANT:

    =
        → Exact comparison

    LIKE
        → Pattern matching

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.20 IN OPERATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IN allows us to compare a value against multiple possible values.

Instead of:

    WHERE category = 'USB attacks'
    OR category = 'RFID cloning'
    OR category = 'Wi-Fi hacking';

We can write:

    WHERE category IN
        ('USB attacks',
         'RFID cloning',
         'Wi-Fi hacking');

Meaning:

    category must match ANY value in the list.

MEMORY:

    IN = "Is it one of these?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.21 NOT IN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOT IN is the opposite of IN.

Example:

    SELECT *
    FROM hacking_tools
    WHERE category NOT IN
        ('USB attacks', 'RFID cloning');

Meaning:

    Return records whose category is not in the specified list.

MEMORY:

    IN
        → one of these

    NOT IN
        → none of these

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.22 BETWEEN OPERATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BETWEEN checks whether a value lies within a range.

Syntax:

    WHERE amount BETWEEN 100 AND 300;

Meaning:

    amount is between 100 and 300.

In SQL, BETWEEN is generally inclusive of the endpoints.

So:

    BETWEEN 100 AND 300

includes:

    100
    300

as well as values between them.

Equivalent conceptual condition:

    amount >= 100
    AND amount <= 300

MEMORY:

    BETWEEN = RANGE

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.23 IS NULL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NULL represents the absence of a value.

To test for NULL:

    IS NULL

Example:

    SELECT *
    FROM books
    WHERE description IS NULL;

This returns records where:

    description
        = NULL

IMPORTANT:

DO NOT use:

    description = NULL

for NULL checking.

Use:

    description IS NULL

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.24 IS NOT NULL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To find values that are NOT NULL:

    SELECT *
    FROM books
    WHERE description IS NOT NULL;

Meaning:

    Return records where description contains a value.

MEMORY:

    IS NULL
        → Missing/NULL

    IS NOT NULL
        → Has a value

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.25 ARITHMETIC OPERATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SQL also supports arithmetic operators.

    +     Addition
    -     Subtraction
    *     Multiplication
    /     Division
    %     Modulo / Remainder

Examples:

    SELECT 10 + 5;
        → 15

    SELECT 10 - 5;
        → 5

    SELECT 10 * 5;
        → 50

    SELECT 10 / 5;
        → 2

    SELECT 10 % 3;
        → 1

IMPORTANT:

    % returns the remainder.

Example:

    20 % 10 = 0
    21 % 10 = 1
    25 % 10 = 5

This becomes useful when checking whether a number ends in
a certain digit or is divisible by another number.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.26 OPERATOR CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPARISON:

    =       Equal
    !=      Not equal
    <>      Not equal
    >       Greater than
    <       Less than
    >=      Greater than/equal
    <=      Less than/equal

LOGICAL:

    AND     All conditions
    OR      At least one condition
    NOT     Reverse condition

PATTERN:

    LIKE        Pattern matching
    NOT LIKE    Pattern does not match
    %
        → Wildcard

MEMBERSHIP:

    IN
        → Match one of listed values

    NOT IN
        → Exclude listed values

RANGE:

    BETWEEN
        → Value within range

NULL:

    IS NULL
    IS NOT NULL

ARITHMETIC:

    +
    -
    *
    /
    %

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.27 TOOLS_DB — DATASET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Database:

    tools_db

Table:

    hacking_tools

Important records:

    ┌────┬──────────────────┬──────────────────────┬─────────────────────────────────────────────────────┬────────┐
    │ id │ name             │ category             │ description                                         │ amount │
    ├────┼──────────────────┼──────────────────────┼─────────────────────────────────────────────────────┼────────┤
    │ 1  │ Flipper Zero     │ Multi-tool           │ A portable multi-tool for pentesters and geeks... │ 169    │
    │ 2  │ O.MG cables      │ Cable-based attacks  │ Malicious USB cables...                            │ 180    │
    │ 3  │ Wi-Fi Pineapple  │ Wi-Fi hacking        │ A device used for man-in-the-middle attacks...    │ 140    │
    │ 4  │ USB Rubber Ducky │ USB attacks          │ A USB keystroke injection tool...                  │ 80     │
    │ 5  │ iCopy-XS         │ RFID cloning         │ A tool used for reading and cloning RFID cards... │ 375    │
    │ 6  │ Lan Turtle       │ Network intelligence │ A covert tool for remote access...                │ 80     │
    │ 7  │ Bash Bunny       │ USB attacks          │ A multi-function USB attack device...             │ 120    │
    │ 8  │ Proxmark 3 RDV4  │ RFID cloning         │ A powerful RFID tool...                            │ 300    │
    └────┴──────────────────┴──────────────────────┴─────────────────────────────────────────────────────┴────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.28 TASK 7 — QUESTION 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION:

    Using the tools_db database, which tool falls under the
    Multi-tool category and is useful for pentesters and geeks?

We know:

    category:
        Multi-tool

and the description contains:

    pentesters and geeks

QUERY:

    SELECT name
    FROM hacking_tools
    WHERE category = 'Multi-tool'
    AND description LIKE '%pentesters%';

Result:

    +--------------+
    | name         |
    +--------------+
    | Flipper Zero |
    +--------------+

ANSWER:

    Flipper Zero

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.29 QUESTION 1 — QUERY BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUERY:

    SELECT name
    FROM hacking_tools
    WHERE category = 'Multi-tool'
    AND description LIKE '%pentesters%';

STEP 1:

    SELECT name

    → Return only the tool name.

STEP 2:

    FROM hacking_tools

    → Search the hacking_tools table.

STEP 3:

    category = 'Multi-tool'

    → Only Multi-tool category.

STEP 4:

    AND

    → Both conditions must be true.

STEP 5:

    description LIKE '%pentesters%'

    → Description contains "pentesters".

FINAL RESULT:

    Flipper Zero

This is an excellent example of combining:

    =
    AND
    LIKE
    %

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.30 QUESTION 1 — ALTERNATIVE QUERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
We could also search for "geeks":

    SELECT name
    FROM hacking_tools
    WHERE category = 'Multi-tool'
    AND description LIKE '%geeks%';

Or both words together:

    SELECT name
    FROM hacking_tools
    WHERE category = 'Multi-tool'
    AND description LIKE '%pentesters and geeks%';

The important idea is:

    category = 'Multi-tool'
        AND
    description matches required text

ANSWER:

    Flipper Zero

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.31 TASK 7 — QUESTION 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION:

    Using the tools_db database, what is the category of tools
    with an amount greater than or equal to 300?

Condition:

    amount >= 300

QUERY:

    SELECT category
    FROM hacking_tools
    WHERE amount >= 300;

Result:

    +--------------+
    | category     |
    +--------------+
    | RFID cloning |
    | RFID cloning |
    +--------------+

The two matching records are:

    iCopy-XS
        amount = 375
        category = RFID cloning

    Proxmark 3 RDV4
        amount = 300
        category = RFID cloning

Therefore:

    ANSWER:
        RFID cloning

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.32 QUESTION 2 — IMPORTANT >= CONCEPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Condition:

    amount >= 300

Means:

    amount > 300
        OR
    amount = 300

So both:

    375
    300

match.

This is why both RFID cloning records appear.

Compare:

    amount > 300

would exclude:

    300

while:

    amount >= 300

includes:

    300

MEMORY:

    >= = boundary included

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.33 TASK 7 — QUESTION 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION:

    Using the tools_db database, which tool falls under the
    Network intelligence category with an amount less than 100?

Conditions:

    category = 'Network intelligence'

AND:

    amount < 100

QUERY:

    SELECT name
    FROM hacking_tools
    WHERE category = 'Network intelligence'
    AND amount < 100;

Result:

    +------------+
    | name       |
    +------------+
    | Lan Turtle |
    +------------+

ANSWER:

    Lan Turtle

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.34 QUESTION 3 — QUERY BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUERY:

    SELECT name
    FROM hacking_tools
    WHERE category = 'Network intelligence'
    AND amount < 100;

CONDITION 1:

    category = 'Network intelligence'

Condition 2:

    amount < 100

AND:

    BOTH conditions must be TRUE.

Record:

    Lan Turtle
        │
        ├── category = Network intelligence ✓
        │
        └── amount = 80
                │
                └── 80 < 100 ✓

Therefore:

    Lan Turtle

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.35 TASK 7 — ALL ANSWERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q1:
    Multi-tool + useful for pentesters and geeks?

A:
    Flipper Zero

──────────────────────────────────────────────────────────────────────

Q2:
    Category of tools with amount >= 300?

A:
    RFID cloning

──────────────────────────────────────────────────────────────────────

Q3:
    Network intelligence + amount < 100?

A:
    Lan Turtle

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.36 COMBINING OPERATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SQL becomes powerful when multiple operators are combined.

Example:

    SELECT name
    FROM hacking_tools
    WHERE category = 'USB attacks'
    AND amount < 150;

Here:

    =
        → Exact category

    AND
        → Both conditions required

    <
        → Numeric comparison

The query means:

    "Give me the name of tools that are in the USB attacks
     category AND have an amount below 150."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.37 COMPLEX CONDITION EXAMPLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example:

    SELECT *
    FROM hacking_tools
    WHERE
        (category = 'USB attacks'
         OR category = 'RFID cloning')
    AND amount >= 100;

Parentheses help make the intended logic clear.

Concept:

                ┌── USB attacks
                │
    category ────┤
                │
                └── RFID cloning
                       │
                      OR
                       │
                       ▼
                 amount >= 100
                       │
                       ▼
                     RESULT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.38 OPERATOR PRECEDENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When combining:

    AND
    OR

use parentheses when the intended logic needs to be explicit.

Example:

    WHERE category = 'USB attacks'
    OR category = 'RFID cloning'
    AND amount > 100;

SQL generally evaluates AND before OR.

So it is interpreted approximately as:

    category = 'USB attacks'
    OR
    (
        category = 'RFID cloning'
        AND amount > 100
    )

If you mean:

    (
        category = 'USB attacks'
        OR category = 'RFID cloning'
    )
    AND amount > 100

write the parentheses explicitly.

BEST PRACTICE:

    Use parentheses when mixing AND and OR.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.39 LIKE + AND
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Example:

    SELECT name
    FROM hacking_tools
    WHERE category = 'Multi-tool'
    AND description LIKE '%pentesters%';

Translation:

    category must be Multi-tool
                AND
    description must contain "pentesters"

Result:

    Flipper Zero

This exact pattern appears in Task 7 Question 1.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.40 IN vs OR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LONG:

    WHERE category = 'USB attacks'
    OR category = 'RFID cloning'
    OR category = 'Wi-Fi hacking';

SHORTER:

    WHERE category IN
        ('USB attacks',
         'RFID cloning',
         'Wi-Fi hacking');

Both represent:

    category matches one of these values.

MEMORY:

    OR OR OR
       ↓
      IN

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.41 BETWEEN vs >= AND <=
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Using comparison operators:

    WHERE amount >= 100
    AND amount <= 300;

Using BETWEEN:

    WHERE amount BETWEEN 100 AND 300;

Conceptually equivalent for ordinary numeric filtering.

BETWEEN:

    100
     │
     ├── included
     │
     ▼
    300
     │
     └── included

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.42 COMMON BEGINNER MISTAKES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISTAKE 1:
    Confusing > and >=

    > 300
        → 300 excluded

    >= 300
        → 300 included

MISTAKE 2:
    Confusing < and <=

    < 100
        → 100 excluded

    <= 100
        → 100 included

MISTAKE 3:
    Using = when pattern matching is needed.

    name = '%USB%'

    WRONG for wildcard matching.

Use:

    name LIKE '%USB%'

MISTAKE 4:
    Forgetting the wildcard in LIKE.

    LIKE 'pentesters'

    → exact pattern

    LIKE '%pentesters%'

    → contains pentesters

MISTAKE 5:
    Using = NULL.

    WHERE description = NULL

    WRONG.

Use:

    WHERE description IS NULL

MISTAKE 6:
    Forgetting AND means BOTH.

    category = 'Network intelligence'
    AND amount < 100

Both conditions must match.

MISTAKE 7:
    Mixing AND and OR without parentheses.

When logic gets complicated:

    Use (parentheses)

to make the intended condition explicit.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.43 SECURITY USE CASE — DATABASE FILTERING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Operators are heavily useful in security data analysis.

Imagine:

    auth_logs
    ┌─────────┬──────────┬────────────┐
    │ user    │ status   │ attempts   │
    ├─────────┼──────────┼────────────┤
    │ alice   │ success  │ 1          │
    │ bob     │ failed   │ 8          │
    │ admin   │ failed   │ 12         │
    │ charlie │ success  │ 1          │
    └─────────┴──────────┴────────────┘

Find suspicious failed attempts:

    SELECT *
    FROM auth_logs
    WHERE status = 'failed'
    AND attempts >= 5;

This demonstrates:

    =
    AND
    >=

The same concepts apply to:

    • SOC investigation
    • Authentication logs
    • Threat hunting
    • Incident response
    • Security analytics
    • Database monitoring

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.44 SQL INJECTION CONNECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Operators are especially important when learning SQL Injection.

Normal query:

    SELECT *
    FROM users
    WHERE username = 'alice'
    AND password = 'password';

Here:

    =
        → Comparison

    AND
        → Combines conditions

An attacker trying to manipulate SQL syntax needs to understand
how operators change the logical meaning of a query.

Therefore:

    SQL BASICS
        ↓
    SELECT
        ↓
    WHERE
        ↓
    OPERATORS
        ↓
    LOGIC
        ↓
    SQL INJECTION

IMPORTANT:

    Understanding operators is educational groundwork for
    understanding how SQL queries can be manipulated.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.45 OPERATOR MASTER TABLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    ┌──────────────┬──────────────────────────────────────────┐
    │ Operator     │ Meaning                                  │
    ├──────────────┼──────────────────────────────────────────┤
    │ =            │ Equal                                    │
    │ !=           │ Not equal                                │
    │ <>           │ Not equal                                │
    │ >            │ Greater than                             │
    │ <            │ Less than                                │
    │ >=           │ Greater than or equal                    │
    │ <=           │ Less than or equal                       │
    │ AND          │ All conditions must be true              │
    │ OR           │ At least one condition must be true      │
    │ NOT          │ Reverses condition                       │
    │ LIKE         │ Pattern matching                         │
    │ NOT LIKE     │ Pattern does not match                   │
    │ IN           │ Matches one value from a list            │
    │ NOT IN       │ Does not match listed values             │
    │ BETWEEN      │ Within a range                           │
    │ IS NULL      │ Value is NULL                            │
    │ IS NOT NULL  │ Value is not NULL                        │
    │ %            │ Modulo/remainder OR LIKE wildcard        │
    └──────────────┴──────────────────────────────────────────┘

NOTE:

    % has TWO important SQL contexts:

    LIKE '%text%'
        → Wildcard

    amount % 10
        → Modulo/remainder

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.46 QUICK OPERATOR MEMORY TRICKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPARISON:

    =       SAME
    !=      DIFFERENT
    >       MORE
    <       LESS
    >=      MORE OR SAME
    <=      LESS OR SAME

LOGIC:

    AND     BOTH
    OR      ANY
    NOT     OPPOSITE

PATTERN:

    LIKE    SEARCH PATTERN
    %       ANY NUMBER OF CHARACTERS

LIST:

    IN      ONE OF THESE

RANGE:

    BETWEEN RANGE

NULL:

    IS NULL
        → EMPTY/UNKNOWN VALUE

    IS NOT NULL
        → VALUE EXISTS

## Interview Questions

Q1.
What is a SQL operator?

Answer

An operator is a symbol or keyword used to perform a comparison,
logical operation, pattern match or calculation in SQL.

------------------------------------------------------------

Q2.
What does = mean?

Answer

Equal to.

------------------------------------------------------------

Q3.
Difference between > and >=?

Answer

> excludes the boundary value; >= includes it.

------------------------------------------------------------

Q4.
What does AND do?

Answer

Requires all specified conditions to be true.

------------------------------------------------------------

Q5.
What does OR do?

Answer

Requires at least one condition to be true.

------------------------------------------------------------

Q6.
What does NOT do?

Answer

Reverses a condition.

------------------------------------------------------------

Q7.
What is LIKE?

Answer

LIKE performs pattern matching on values, commonly strings.

------------------------------------------------------------

Q8.
What does % mean in LIKE?

Answer

It is a wildcard representing zero or more characters.

------------------------------------------------------------

Q9.
Difference between = and LIKE?

Answer

= performs an equality comparison; LIKE performs pattern matching.

------------------------------------------------------------

Q10.
What does IN do?

Answer

Checks whether a value matches one of the values in a list.

------------------------------------------------------------

Q11.
What does BETWEEN do?

Answer

Checks whether a value falls within a specified range.

------------------------------------------------------------

Q12.
How do you check for NULL?

Answer

IS NULL.

------------------------------------------------------------

Q13.
How do you check that a value is not NULL?

Answer

IS NOT NULL.

------------------------------------------------------------

Q14.
What is the modulo operator?

Answer

%; it returns the remainder of a division.

------------------------------------------------------------

Q15.
What does amount >= 300 mean?

Answer

Amount is 300 or greater.

------------------------------------------------------------

Q16.
What does amount < 100 mean?

Answer

Amount is strictly less than 100.

------------------------------------------------------------

Q17.
What is the difference between AND and OR?

Answer

AND requires all conditions; OR requires at least one condition.

------------------------------------------------------------

## 7.48 PRACTICAL QUERY PATTERNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXACT MATCH:

    SELECT *
    FROM hacking_tools
    WHERE category = 'USB attacks';

──────────────────────────────────────────────────────────────────────

NOT EQUAL:

    SELECT *
    FROM hacking_tools
    WHERE category != 'USB attacks';

──────────────────────────────────────────────────────────────────────

GREATER:

    SELECT *
    FROM hacking_tools
    WHERE amount > 100;

──────────────────────────────────────────────────────────────────────

GREATER OR EQUAL:

    SELECT *
    FROM hacking_tools
    WHERE amount >= 300;

──────────────────────────────────────────────────────────────────────

LESS:

    SELECT *
    FROM hacking_tools
    WHERE amount < 100;

──────────────────────────────────────────────────────────────────────

AND:

    SELECT *
    FROM hacking_tools
    WHERE category = 'USB attacks'
    AND amount < 150;

──────────────────────────────────────────────────────────────────────

OR:

    SELECT *
    FROM hacking_tools
    WHERE category = 'USB attacks'
    OR category = 'RFID cloning';

──────────────────────────────────────────────────────────────────────

LIKE:

    SELECT *
    FROM hacking_tools
    WHERE description LIKE '%pentesters%';

──────────────────────────────────────────────────────────────────────

IN:

    SELECT *
    FROM hacking_tools
    WHERE category IN
        ('USB attacks', 'RFID cloning');

──────────────────────────────────────────────────────────────────────

BETWEEN:

    SELECT *
    FROM hacking_tools
    WHERE amount BETWEEN 100 AND 300;

──────────────────────────────────────────────────────────────────────

NULL:

    SELECT *
    FROM books
    WHERE description IS NULL;

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.49 TASK 7 — COMPLETE SOLUTION FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
START
  │
  ▼
mysql -u root -p
  │
  ▼
USE tools_db;
  │
  ▼
SHOW TABLES;
  │
  ▼
hacking_tools
  │
  ├──────────────────────────────────────────────┐
  │                                              │
  ▼                                              ▼
Q1                                           Q2 / Q3
  │                                              │
  ▼                                              ▼
category = 'Multi-tool'                    amount >= 300
  │                                              │
  AND                                             │
  │                                              ▼
  ▼                                         category
description LIKE '%pentesters%'                  │
  │                                              ▼
  ▼                                         RFID cloning
Flipper Zero
  │
  │
  └──────────────────────────────────────────────┐
                                                 │
                                                 ▼
                                        category =
                                        'Network intelligence'
                                                 │
                                                 AND
                                                 │
                                                 ▼
                                            amount < 100
                                                 │
                                                 ▼
                                            Lan Turtle

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.50 TASK 7 — FINAL ANSWERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q1:
    Which Multi-tool is useful for pentesters and geeks?

    QUERY:

        SELECT name
        FROM hacking_tools
        WHERE category = 'Multi-tool'
        AND description LIKE '%pentesters%';

    ANSWER:

        Flipper Zero

──────────────────────────────────────────────────────────────────────

Q2:
    What category has tools with amount >= 300?

    QUERY:

        SELECT category
        FROM hacking_tools
        WHERE amount >= 300;

    ANSWER:

        RFID cloning

──────────────────────────────────────────────────────────────────────

Q3:
    Which Network intelligence tool has amount < 100?

    QUERY:

        SELECT name
        FROM hacking_tools
        WHERE category = 'Network intelligence'
        AND amount < 100;

    ANSWER:

        Lan Turtle

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## MASTER REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SQL OPERATORS:

    =       → Equal
    !=      → Not equal
    <>      → Not equal

    >       → Greater
    <       → Less
    >=      → Greater/equal
    <=      → Less/equal

    AND     → BOTH
    OR      → ANY
    NOT     → OPPOSITE

    LIKE    → Pattern
    %       → Wildcard

    IN      → One from list
    BETWEEN → Range

    IS NULL
        → NULL check

    IS NOT NULL
        → Non-NULL check

    %
        → Modulo when used with numbers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 7.51 COMPLETE SQL KNOWLEDGE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    SQL
                     │
        ┌────────────┴────────────┐
        │                         │
     DATABASE                   DATA
        │                         │
        ▼                         ▼
    CREATE/USE                 CRUD
    SHOW/DROP                    │
        │                  ┌─────┼─────┐
        │                  ▼     ▼     ▼
        │                INSERT SELECT UPDATE DELETE
        │
        ▼
      TABLES
        │
        ├── CREATE
        ├── SHOW
        ├── DESCRIBE
        ├── ALTER
        └── DROP

SELECT QUERY
    │
    ├── FROM
    │
    ├── WHERE
    │      │
    │      └── OPERATORS
    │             ├── =
    │             ├── >
    │             ├── <
    │             ├── >=
    │             ├── <=
    │             ├── AND
    │             ├── OR
    │             ├── LIKE
    │             ├── IN
    │             └── BETWEEN
    │
    ├── GROUP BY
    │
    ├── HAVING
    │
    └── ORDER BY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 5 STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[✓] Task 1 — Introduction
[✓] Task 2 — Databases 101
[✓] Task 3 — SQL
[✓] Task 4 — Database and Table Statements
[✓] Task 5 — CRUD Operations
[✓] Task 6 — Clauses
[✓] Task 7 — Operators
[ ] Task 8 — Functions
[ ] Task 9 — Conclusion

## SQL FUNCTIONS
> Task 8: Functions
> Focus: LENGTH(), SUM(), GROUP_CONCAT(), AS, %, ORDER BY
> Database: tools_db
> Table: hacking_tools
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 5 RECAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SQL OPERATORS

    =       → Equal
    !=      → Not equal
    >       → Greater than
    <       → Less than
    >=      → Greater than or equal
    <=      → Less than or equal

    AND     → Both conditions
    OR      → At least one condition
    NOT     → Reverse condition

    LIKE    → Pattern matching
    %       → Wildcard / modulo depending on context

    IN      → Match from a list
    BETWEEN → Match a range

    IS NULL
        → Check for NULL

    IS NOT NULL
        → Check for non-NULL

Now we move to:

                    SQL FUNCTIONS
                         │
                         ├── LENGTH()
                         ├── SUM()
                         ├── GROUP_CONCAT()
                         └── Other built-in functions
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## TASK 8 — FUNCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SQL FUNCTIONS are built-in operations that allow us to perform
calculations, transformations, aggregations and other operations
on data.

Examples:

    LENGTH()
        → Count characters

    SUM()
        → Add numeric values

    COUNT()
        → Count records/values

    AVG()
        → Calculate average

    MIN()
        → Find minimum

    MAX()
        → Find maximum

    GROUP_CONCAT()
        → Combine multiple values into one string

Functions can be used inside SQL queries.

GENERAL IDEA:

    TABLE
      │
      ▼
    FUNCTION
      │
      ▼
    CALCULATION / TRANSFORMATION
      │
      ▼
    RESULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.1 TYPES OF SQL FUNCTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
A useful way to understand functions is:

    ┌──────────────────────────────┐
    │        SQL FUNCTIONS         │
    └──────────────┬───────────────┘
                   │
          ┌────────┴─────────┐
          ▼                  ▼
       SCALAR             AGGREGATE
          │                  │
          ▼                  ▼
    Work with a row     Work across rows
          │                  │
          ├── LENGTH()       ├── COUNT()
          └── etc.           ├── SUM()
                             ├── AVG()
                             ├── MIN()
                             └── MAX()

The room's Task 8 particularly demonstrates:

    LENGTH()
    SUM()
    GROUP_CONCAT()

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.2 LENGTH()
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LENGTH() returns the length of a string in bytes in MySQL.

For ordinary ASCII characters, the byte length and character
count are the same.

SYNTAX:

    LENGTH(string);

Example:

    SELECT LENGTH('Hello');

Result:

    5

Because:

    H e l l o
    1 2 3 4 5

IMPORTANT:

    In MySQL:

    LENGTH()
        → Byte length

    CHAR_LENGTH()
        → Number of characters

For normal ASCII text such as the tool names in this room,
the result is the same.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.3 LENGTH() WITH A COLUMN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
We can apply LENGTH() to a table column.

Example:

    SELECT name, LENGTH(name)
    FROM hacking_tools;

This returns:

    name
        +
    length of name

Example concept:

    Flipper Zero
        → 12

    Bash Bunny
        → 10

    USB Rubber Ducky
        → 16

The function is executed for each returned row.

FLOW:

    hacking_tools
          │
          ▼
        name
          │
          ▼
      LENGTH(name)
          │
          ▼
    Number of characters/bytes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.4 ALIAS WITH AS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When using a function, the output column may have an awkward
generated name.

Example:

    SELECT name, LENGTH(name)
    FROM hacking_tools;

The result may show:

    name
    LENGTH(name)

We can give the calculated column a custom name using:

    AS

Example:

    SELECT name, LENGTH(name) AS name_length
    FROM hacking_tools;

Now the output becomes:

    +------------------+-------------+
    | name             | name_length |
    +------------------+-------------+
    | Flipper Zero     | 12          |
    | ...              | ...         |
    +------------------+-------------+

MEMORY:

    AS
        → "Give this result another name."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.5 AS — ALIAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
General syntax:

    expression AS alias_name

Examples:

    COUNT(*) AS total

    SUM(amount) AS total_amount

    LENGTH(name) AS name_length

Aliases make query results:

    • Easier to read
    • Easier to understand
    • Easier to reference in some contexts

Example:

    SELECT SUM(amount) AS total
    FROM hacking_tools;

Output:

    +-------+
    | total |
    +-------+
    | 1444  |
    +-------+

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.6 ORDER BY FUNCTION RESULT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
We can sort using a function result.

Example:

    SELECT name, LENGTH(name)
    FROM hacking_tools
    ORDER BY LENGTH(name) DESC;

Meaning:

    1. Get tool names.
    2. Calculate length of each name.
    3. Sort by length.
    4. Put longest names first.

DESC:

    Longest
       ↓
    Shortest

ASC:

    Shortest
       ↓
    Longest

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.7 TASK 8 — QUESTION 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION:

    Using the tools_db database, what is the tool with the
    longest name based on character length?

First:

    mysql> USE tools_db;

Then:

    mysql> SELECT name, LENGTH(name)
        FROM hacking_tools
        ORDER BY LENGTH(name) DESC;

Expected beginning of result:

    +------------------+---------------+
    | name             | LENGTH(name)  |
    +------------------+---------------+
    | USB Rubber Ducky | 16            |
    | Wi-Fi Pineapple  | 15            |
    | Proxmark 3 RDV4  | 15            |
    | Flipper Zero     | 12            |
    | ...              | ...           |
    +------------------+---------------+

Longest:

    USB Rubber Ducky

ANSWER:

    USB Rubber Ducky

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.8 QUESTION 1 — WHY USB RUBBER DUCKY?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Calculate:

    LENGTH('USB Rubber Ducky')

Characters:

    U
    S
    B
    [space]
    R
    u
    b
    b
    e
    r
    [space]
    D
    u
    c
    k
    y

Total:

    16

Compare:

    USB Rubber Ducky
        → 16

    Wi-Fi Pineapple
        → 15

    Proxmark 3 RDV4
        → 15

    Flipper Zero
        → 12

Therefore:

    USB Rubber Ducky
        → Longest name

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.9 QUESTION 1 — BETTER QUERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The simplest room-style query:

    SELECT name
    FROM hacking_tools
    ORDER BY LENGTH(name) DESC;

This returns the longest name first.

If we only want the first result, MySQL can use:

    SELECT name
    FROM hacking_tools
    ORDER BY LENGTH(name) DESC
    LIMIT 1;

Result:

    USB Rubber Ducky

IMPORTANT:

    LIMIT 1
        → Return only one row.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.10 SUM()
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUM() is an aggregate function.

It calculates the total of numeric values.

SYNTAX:

    SUM(column_name)

Example:

    SELECT SUM(amount)
    FROM hacking_tools;

If values are:

    169
    180
    140
    80
    375
    80
    120
    300

Then:

    169
    + 180
    + 140
    + 80
    + 375
    + 80
    + 120
    + 300
    ─────────
    1444

Result:

    1444

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.11 SUM() — VISUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                hacking_tools
                      │
                      ▼
                    amount
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
       169           180           140
        │             │             │
        ├─────────────┼─────────────┤
        │             │
        ▼             ▼
       ...           300
                      │
                      ▼
                   SUM()
                      │
                      ▼
                     1444
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.12 SUM() + AS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Instead of:

    SELECT SUM(amount)
    FROM hacking_tools;

Use:

    SELECT SUM(amount) AS total
    FROM hacking_tools;

Output:

    +-------+
    | total |
    +-------+
    | 1444  |
    +-------+

Here:

    SUM(amount)
        → Calculates total.

    AS total
        → Names the result column "total".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.13 TASK 8 — QUESTION 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION:

    Using the tools_db database, what is the total sum of all
    tools?

QUERY:

    SELECT SUM(amount) AS total
    FROM hacking_tools;

Result:

    +-------+
    | total |
    +-------+
    | 1444  |
    +-------+

ANSWER:

    1444

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.14 COUNT()
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COUNT() counts records/values.

Examples:

    SELECT COUNT(*)
    FROM hacking_tools;

This counts rows.

If the table contains:

    8 tools

Result:

    8

COUNT(column):

    SELECT COUNT(name)
    FROM hacking_tools;

This counts non-NULL values in name.

IMPORTANT:

    COUNT(*)
        → Counts rows.

    COUNT(column)
        → Counts non-NULL values in that column.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.15 AVG()
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AVG() calculates the average.

Example:

    SELECT AVG(amount)
    FROM hacking_tools;

Concept:

    SUM(amount)
    ───────────
      COUNT

For this dataset:

    SUM = 1444
    COUNT = 8

Average:

    1444 / 8
        = 180.5

So:

    AVG(amount) = 180.5

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.16 MIN()
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MIN() returns the smallest value.

Example:

    SELECT MIN(amount)
    FROM hacking_tools;

Dataset:

    169
    180
    140
    80
    375
    80
    120
    300

Minimum:

    80

Therefore:

    MIN(amount)
        → 80

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.17 MAX()
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MAX() returns the largest value.

Example:

    SELECT MAX(amount)
    FROM hacking_tools;

Largest amount:

    375

Therefore:

    MAX(amount)
        → 375

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.18 AGGREGATE FUNCTION CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    COUNT()
        → Count

    SUM()
        → Total

    AVG()
        → Average

    MIN()
        → Smallest

    MAX()
        → Largest

MEMORY:

    COUNT = HOW MANY?
    SUM   = HOW MUCH TOTAL?
    AVG   = WHAT AVERAGE?
    MIN   = WHAT SMALLEST?
    MAX   = WHAT LARGEST?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.19 GROUP_CONCAT()
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GROUP_CONCAT() combines values from multiple rows into one
concatenated string.

Example table:

    name
    ─────────────────
    Flipper Zero
    iCopy-XS
    Lan Turtle

Query:

    SELECT GROUP_CONCAT(name)
    FROM hacking_tools;

Result concept:

    Flipper Zero,iCopy-XS,Lan Turtle,...

Instead of returning multiple rows:

    Flipper Zero
    iCopy-XS
    Lan Turtle

we can produce:

    Flipper Zero,iCopy-XS,Lan Turtle

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.20 GROUP_CONCAT() WITH SEPARATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
By default, GROUP_CONCAT() uses a comma separator.

We can specify a custom separator.

Syntax:

    GROUP_CONCAT(
        column_name
        SEPARATOR 'separator'
    )

Example:

    SELECT GROUP_CONCAT(name SEPARATOR ' & ')
    FROM hacking_tools;

Instead of:

    Flipper Zero,iCopy-XS,Lan Turtle

we get:

    Flipper Zero & iCopy-XS & Lan Turtle

IMPORTANT:

    SEPARATOR
        → Defines how concatenated values are separated.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.21 GROUP_CONCAT() — VISUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ROWS:

    Flipper Zero
         │
    iCopy-XS
         │
    Lan Turtle
         │
         ▼
    GROUP_CONCAT()
         │
         ▼
    Flipper Zero,iCopy-XS,Lan Turtle

WITH CUSTOM SEPARATOR:

    GROUP_CONCAT(name SEPARATOR ' & ')

         │
         ▼

    Flipper Zero & iCopy-XS & Lan Turtle
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.22 MODULO OPERATOR (%) RECAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
The `%` operator calculates the remainder of division.

Examples:

    10 % 10
        → 0

    11 % 10
        → 1

    15 % 10
        → 5

    20 % 10
        → 0

This can be used to determine whether a number ends in 0.

For a positive integer:

    amount % 10 = 0

means:

    The number is divisible by 10.

For example:

    80 % 10 = 0
    120 % 10 = 0
    300 % 10 = 0

But:

    169 % 10 = 9
    375 % 10 = 5

Therefore:

    amount % 10 <> 0

means:

    The amount does NOT end in 0.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.23 TASK 8 — QUESTION 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUESTION:

    Using the tools_db database, what are the tool names where
    the amount does not end in 0, and group the tool names
    concatenated by " & ".

We need to solve TWO requirements:

    1. Find amounts that do NOT end in 0.
    2. Concatenate their names using " & ".

First condition:

    amount % 10 <> 0

Then:

    GROUP_CONCAT(name SEPARATOR ' & ')

Complete query:

    SELECT GROUP_CONCAT(name SEPARATOR ' & ') AS grouped
    FROM hacking_tools
    WHERE amount % 10 <> 0;

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.24 QUESTION 3 — STEP 1
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
First inspect the amounts:

    SELECT name, amount
    FROM hacking_tools;

Relevant values:

    Flipper Zero
        → 169

    O.MG cables
        → 180

    Wi-Fi Pineapple
        → 140

    USB Rubber Ducky
        → 80

    iCopy-XS
        → 375

    Lan Turtle
        → 80

    Bash Bunny
        → 120

    Proxmark 3 RDV4
        → 300

Now identify values NOT ending in 0.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.25 QUESTION 3 — STEP 2
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Check:

    Flipper Zero
        169 % 10 = 9
        → NOT 0
        ✓

    O.MG cables
        180 % 10 = 0
        → ends in 0
        ✗

    Wi-Fi Pineapple
        140 % 10 = 0
        → ends in 0
        ✗

    USB Rubber Ducky
        80 % 10 = 0
        → ends in 0
        ✗

    iCopy-XS
        375 % 10 = 5
        → NOT 0
        ✓

    Lan Turtle
        80 % 10 = 0
        → ends in 0
        ✗

    Bash Bunny
        120 % 10 = 0
        → ends in 0
        ✗

    Proxmark 3 RDV4
        300 % 10 = 0
        → ends in 0
        ✗

Remaining tools:

    Flipper Zero
    iCopy-XS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.26 QUESTION 3 — STEP 3
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Now concatenate:

    Flipper Zero
    iCopy-XS

using:

    ' & '

Query:

    SELECT GROUP_CONCAT(
        name SEPARATOR ' & '
    ) AS grouped
    FROM hacking_tools
    WHERE amount % 10 <> 0;

Result:

    Flipper Zero & iCopy-XS

ANSWER:

    Flipper Zero & iCopy-XS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.27 QUESTION 3 — QUERY BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
QUERY:

    SELECT GROUP_CONCAT(name SEPARATOR ' & ') AS grouped
    FROM hacking_tools
    WHERE amount % 10 <> 0;

PART 1:

    FROM hacking_tools

    → Search the hacking_tools table.

PART 2:

    WHERE amount % 10 <> 0

    → Keep amounts whose remainder after division by 10
      is NOT zero.

PART 3:

    GROUP_CONCAT(name ...)

    → Combine the matching tool names.

PART 4:

    SEPARATOR ' & '

    → Put " & " between names.

PART 5:

    AS grouped

    → Name the resulting column "grouped".

FINAL:

    Flipper Zero & iCopy-XS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.28 TASK 8 — ALL ANSWERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q1:
    Tool with the longest name based on character length?

A:
    USB Rubber Ducky

QUERY:

    SELECT name
    FROM hacking_tools
    ORDER BY LENGTH(name) DESC
    LIMIT 1;

──────────────────────────────────────────────────────────────────────

Q2:
    Total sum of all tools?

A:
    1444

QUERY:

    SELECT SUM(amount) AS total
    FROM hacking_tools;

──────────────────────────────────────────────────────────────────────

Q3:
    Tool names where amount does not end in 0, concatenated by " & "?

A:
    Flipper Zero & iCopy-XS

QUERY:

    SELECT GROUP_CONCAT(name SEPARATOR ' & ') AS grouped
    FROM hacking_tools
    WHERE amount % 10 <> 0;

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.29 FUNCTIONS — COMPLETE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                    SQL FUNCTIONS
                          │
          ┌───────────────┴────────────────┐
          │                                │
          ▼                                ▼
      STRING / ROW                    AGGREGATE
          │                                │
          ├── LENGTH()                     ├── COUNT()
          │                                ├── SUM()
          │                                ├── AVG()
          │                                ├── MIN()
          │                                └── MAX()
          │
          └── GROUP_CONCAT()
                  │
                  └── Combine values
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.30 LENGTH vs COUNT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LENGTH():

    LENGTH(name)

Answers:

    "How long is this string?"

COUNT():

    COUNT(*)

Answers:

    "How many rows are there?"

Example:

    SELECT LENGTH('Flipper Zero');
        → 12

    SELECT COUNT(*)
    FROM hacking_tools;
        → 8

MEMORY:

    LENGTH = HOW LONG?
    COUNT  = HOW MANY?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.31 SUM vs COUNT vs AVG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COUNT:

    SELECT COUNT(*)
    FROM hacking_tools;

    → 8

SUM:

    SELECT SUM(amount)
    FROM hacking_tools;

    → 1444

AVG:

    SELECT AVG(amount)
    FROM hacking_tools;

    → 180.5

MEMORY:

    COUNT
        → Number of records

    SUM
        → Total value

    AVG
        → Average value

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.32 MIN vs MAX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MIN:

    SELECT MIN(amount)
    FROM hacking_tools;

    → 80

MAX:

    SELECT MAX(amount)
    FROM hacking_tools;

    → 375

MEMORY:

    MIN = Smallest
    MAX = Largest

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.33 AGGREGATE FUNCTIONS + GROUP BY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Aggregate functions become especially powerful when combined
with GROUP BY.

Example:

    SELECT category, COUNT(*)
    FROM hacking_tools
    GROUP BY category;

Meaning:

    Group tools by category
          +
    Count tools in each category

Another example:

    SELECT category, SUM(amount)
    FROM hacking_tools
    GROUP BY category;

Meaning:

    Group by category
          +
    Calculate total amount per category

Another:

    SELECT category, AVG(amount)
    FROM hacking_tools
    GROUP BY category;

Meaning:

    Group by category
          +
    Calculate average amount per category

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.34 FUNCTIONS + WHERE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Functions can be combined with WHERE.

Example:

    SELECT SUM(amount)
    FROM hacking_tools
    WHERE category = 'RFID cloning';

Meaning:

    First filter:
        category = RFID cloning

    Then calculate:
        SUM(amount)

Concept:

    FROM
      │
      ▼
    WHERE
      │
      ▼
    FUNCTION
      │
      ▼
    RESULT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.35 FUNCTIONS + ORDER BY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Functions can also be used with ORDER BY.

Example:

    SELECT name, LENGTH(name)
    FROM hacking_tools
    ORDER BY LENGTH(name) DESC;

Meaning:

    Calculate name length
          │
          ▼
    Sort longest → shortest

This is exactly the technique used in Question 1.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.36 FUNCTIONS + AS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Examples:

    SELECT SUM(amount) AS total
    FROM hacking_tools;

    SELECT LENGTH(name) AS name_length
    FROM hacking_tools;

    SELECT GROUP_CONCAT(name SEPARATOR ' & ') AS grouped
    FROM hacking_tools;

`AS` creates an alias for the expression/result.

MEMORY:

    FUNCTION + AS
        =
    "Calculate this and give the result a readable name."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.37 FUNCTION EXECUTION THINKING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When reading a query, identify:

    1. SOURCE
       FROM

    2. FILTER
       WHERE

    3. GROUP
       GROUP BY

    4. CALCULATION
       FUNCTION

    5. OUTPUT NAME
       AS

    6. SORT
       ORDER BY

Example:

    SELECT category, SUM(amount) AS total
    FROM hacking_tools
    WHERE amount >= 100
    GROUP BY category
    ORDER BY total DESC;

Think:

    FROM
      ↓
    WHERE
      ↓
    GROUP BY
      ↓
    SUM()
      ↓
    AS total
      ↓
    ORDER BY
      ↓
    RESULT

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.38 SECURITY USE CASES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SQL functions are useful in security analysis.

LOG ANALYSIS:

    SELECT COUNT(*)
    FROM login_logs
    WHERE status = 'failed';

Question:

    How many failed login attempts?

──────────────────────────────────────────────────────────────────────

TOTAL DATA:

    SELECT SUM(bytes)
    FROM network_logs;

Question:

    How many bytes were transferred?

──────────────────────────────────────────────────────────────────────

LONGEST VALUE:

    SELECT username, LENGTH(username)
    FROM users
    ORDER BY LENGTH(username) DESC;

Question:

    Which username is longest?

──────────────────────────────────────────────────────────────────────

TOP ACTIVITY:

    SELECT source_ip, COUNT(*) AS attempts
    FROM login_logs
    GROUP BY source_ip
    ORDER BY attempts DESC;

Question:

    Which IP generated the most login attempts?

──────────────────────────────────────────────────────────────────────

COMBINE RESULTS:

    SELECT GROUP_CONCAT(source_ip SEPARATOR ' & ')
    FROM login_logs
    WHERE status = 'failed';

Question:

    Combine matching IPs into one readable result.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.39 SQL INJECTION CONNECTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Understanding SQL functions is also important for understanding
SQL Injection and database enumeration.

SQL functions can reveal information such as:

    • Number of records
    • String lengths
    • Numeric totals
    • Minimum/maximum values
    • Combined values

This is why functions are important when studying how attackers
may extract or analyse information from databases.

Concept:

    SQL
      │
      ▼
    SELECT
      │
      ▼
    WHERE
      │
      ▼
    OPERATORS
      │
      ▼
    FUNCTIONS
      │
      ▼
    DATABASE INFORMATION

IMPORTANT:

    The legitimate use of SQL functions is normal database
    functionality. Security problems arise when applications
    improperly expose or construct database queries.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.40 COMMON BEGINNER MISTAKES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MISTAKE 1:
    Using COUNT() when SUM() is required.

    COUNT(amount)
        → Number of non-NULL amounts

    SUM(amount)
        → Total of amounts

MISTAKE 2:
    Confusing LENGTH(name) with COUNT(name).

    LENGTH(name)
        → Length of each name

    COUNT(name)
        → Number of non-NULL names

MISTAKE 3:
    Forgetting DESC in the longest-name query.

    ORDER BY LENGTH(name)

    → Shortest first by default.

For longest first:

    ORDER BY LENGTH(name) DESC

MISTAKE 4:
    Forgetting GROUP_CONCAT() when the question asks to
    concatenate values.

    SELECT name
    FROM hacking_tools
    WHERE amount % 10 <> 0;

This returns multiple rows.

Question asks for one concatenated value:

    GROUP_CONCAT(name SEPARATOR ' & ')

MISTAKE 5:
    Forgetting the custom separator.

    GROUP_CONCAT(name)

    → comma-separated by default.

Required:

    GROUP_CONCAT(name SEPARATOR ' & ')

MISTAKE 6:
    Misunderstanding modulo.

    amount % 10 = 0

    → Ends in 0 for positive integer amounts.

    amount % 10 <> 0

    → Does NOT end in 0.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.41 FUNCTION CHEAT SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LENGTH:

    SELECT LENGTH(name)
    FROM hacking_tools;

    → String length.

COUNT:

    SELECT COUNT(*)
    FROM hacking_tools;

    → Number of rows.

SUM:

    SELECT SUM(amount)
    FROM hacking_tools;

    → Total.

AVG:

    SELECT AVG(amount)
    FROM hacking_tools;

    → Average.

MIN:

    SELECT MIN(amount)
    FROM hacking_tools;

    → Smallest.

MAX:

    SELECT MAX(amount)
    FROM hacking_tools;

    → Largest.

GROUP_CONCAT:

    SELECT GROUP_CONCAT(name)
    FROM hacking_tools;

    → Combine values.

CUSTOM SEPARATOR:

    SELECT GROUP_CONCAT(name SEPARATOR ' & ')
    FROM hacking_tools;

    → Combine using " & ".

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.42 TASK 8 — PRACTICAL COMMANDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LOGIN:

    mysql -u root -p

SELECT DATABASE:

    USE tools_db;

QUESTION 1:

    SELECT name, LENGTH(name)
    FROM hacking_tools
    ORDER BY LENGTH(name) DESC;

LONGEST:

    USB Rubber Ducky

──────────────────────────────────────────────────────────────────────

QUESTION 2:

    SELECT SUM(amount) AS total
    FROM hacking_tools;

TOTAL:

    1444

──────────────────────────────────────────────────────────────────────

QUESTION 3:

    SELECT GROUP_CONCAT(name SEPARATOR ' & ') AS grouped
    FROM hacking_tools
    WHERE amount % 10 <> 0;

RESULT:

    Flipper Zero & iCopy-XS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.43 TASK 8 — COMPLETE ANSWER SHEET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q1:
    Using tools_db, what is the tool with the longest name
    based on character length?

    ANSWER:
        USB Rubber Ducky

    QUERY:
        SELECT name
        FROM hacking_tools
        ORDER BY LENGTH(name) DESC
        LIMIT 1;

──────────────────────────────────────────────────────────────────────

Q2:
    Using tools_db, what is the total sum of all tools?

    ANSWER:
        1444

    QUERY:
        SELECT SUM(amount) AS total
        FROM hacking_tools;

──────────────────────────────────────────────────────────────────────

Q3:
    Which tool names have an amount that does not end in 0,
    concatenated using " & "?

    ANSWER:
        Flipper Zero & iCopy-XS

    QUERY:
        SELECT GROUP_CONCAT(name SEPARATOR ' & ') AS grouped
        FROM hacking_tools
        WHERE amount % 10 <> 0;

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.44 MASTER MEMORY TRICK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SQL FUNCTIONS:

    LENGTH()
        → HOW LONG?

    COUNT()
        → HOW MANY?

    SUM()
        → HOW MUCH TOTAL?

    AVG()
        → WHAT AVERAGE?

    MIN()
        → WHAT SMALLEST?

    MAX()
        → WHAT LARGEST?

    GROUP_CONCAT()
        → COMBINE THEM

MEMORY LINE:

    LENGTH = Length
    COUNT  = Count
    SUM    = Total
    AVG    = Average
    MIN    = Minimum
    MAX    = Maximum
    GROUP_CONCAT = Join values

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.45 IMPORTANT COMBINATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LONGEST:

    ORDER BY LENGTH(name) DESC

TOTAL:

    SUM(amount)

AVERAGE:

    AVG(amount)

COUNT:

    COUNT(*)

MINIMUM:

    MIN(amount)

MAXIMUM:

    MAX(amount)

FILTER NUMBERS NOT ENDING IN ZERO:

    amount % 10 <> 0

CONCATENATE:

    GROUP_CONCAT(name SEPARATOR ' & ')

ALIAS:

    AS total

## Interview Questions

Q1.
What is a SQL function?

Answer

A built-in operation used to calculate, transform or aggregate
data.

------------------------------------------------------------

Q2.
What does LENGTH() do?

Answer

It returns the length of a string in bytes in MySQL.

------------------------------------------------------------

Q3.
What does COUNT() do?

Answer

It counts rows or non-NULL values depending on its usage.

------------------------------------------------------------

Q4.
What does COUNT(*) count?

Answer

Rows in the result set.

------------------------------------------------------------

Q5.
What does SUM() do?

Answer

Calculates the total of numeric values.

------------------------------------------------------------

Q6.
What does AVG() do?

Answer

Calculates the average of numeric values.

------------------------------------------------------------

Q7.
What does MIN() do?

Answer

Returns the smallest value.

------------------------------------------------------------

Q8.
What does MAX() do?

Answer

Returns the largest value.

------------------------------------------------------------

Q9.
What does GROUP_CONCAT() do?

Answer

Combines values from multiple rows into one concatenated string.

------------------------------------------------------------

Q10.
What does SEPARATOR do in GROUP_CONCAT()?

Answer

Specifies the string used between concatenated values.

------------------------------------------------------------

Q11.
What does AS do?

Answer

Creates an alias for a column or expression.

------------------------------------------------------------

Q12.
What does amount % 10 do?

Answer

Returns the remainder after dividing amount by 10.

------------------------------------------------------------

Q13.
What does amount % 10 = 0 indicate for positive integer amounts?

Answer

The amount ends in 0 / is divisible by 10.

------------------------------------------------------------

Q14.
What does amount % 10 <> 0 indicate?

Answer

The amount does not end in 0.

------------------------------------------------------------

Q15.
How do you find the longest string in a column?

Answer

ORDER BY LENGTH(column) DESC, optionally with LIMIT 1.

------------------------------------------------------------

Q16.
How do you calculate the total of a numeric column?

Answer

SUM(column).

------------------------------------------------------------

## 8.47 SQL FUNCTIONS — COMPLETE FLOW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         TABLE
                           │
                           ▼
                        SELECT
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
          LENGTH()       SUM()       GROUP_CONCAT()
             │             │             │
             ▼             ▼             ▼
        String size      Total       Combine values
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                         RESULT

OTHER IMPORTANT FUNCTIONS:

    COUNT()
    AVG()
    MIN()
    MAX()

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.48 COMPLETE SQL KNOWLEDGE MAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                         SQL
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
    DATABASE            TABLE             DATA
        │                 │                 │
        │                 │                 └── CRUD
        │                 │                      │
        │                 │                      ├── INSERT
        │                 │                      ├── SELECT
        │                 │                      ├── UPDATE
        │                 │                      └── DELETE
        │                 │
        │                 ├── CREATE
        │                 ├── SHOW
        │                 ├── DESCRIBE
        │                 ├── ALTER
        │                 └── DROP
        │
        ├── CREATE
        ├── SHOW
        ├── USE
        └── DROP

SELECT
  │
  ├── FROM
  │
  ├── WHERE
  │      │
  │      └── OPERATORS
  │             ├── =
  │             ├── !=
  │             ├── >
  │             ├── <
  │             ├── >=
  │             ├── <=
  │             ├── AND
  │             ├── OR
  │             ├── NOT
  │             ├── LIKE
  │             ├── IN
  │             └── BETWEEN
  │
  ├── GROUP BY
  │
  ├── HAVING
  │
  ├── FUNCTIONS
  │      ├── COUNT()
  │      ├── SUM()
  │      ├── AVG()
  │      ├── MIN()
  │      ├── MAX()
  │      ├── LENGTH()
  │      └── GROUP_CONCAT()
  │
  └── ORDER BY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 8.49 TASK 8 FINAL REVISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Q1:
    Longest tool name?

    LENGTH(name)
    +
    ORDER BY ... DESC

    → USB Rubber Ducky

──────────────────────────────────────────────────────────────────────

Q2:
    Total of all amounts?

    SUM(amount)

    → 1444

──────────────────────────────────────────────────────────────────────

Q3:
    Amount does not end in 0?

    amount % 10 <> 0

    Matching tools:

        Flipper Zero
        iCopy-XS

    Combine:

        GROUP_CONCAT(name SEPARATOR ' & ')

    → Flipper Zero & iCopy-XS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 6 STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[✓] Task 1 — Introduction
[✓] Task 2 — Databases 101
[✓] Task 3 — SQL
[✓] Task 4 — Database and Table Statements
[✓] Task 5 — CRUD Operations
[✓] Task 6 — Clauses
[✓] Task 7 — Operators
[✓] Task 8 — Functions
[ ] Task 9 — Conclusion

DATABASE
  ↓
TABLE → ROWS + COLUMNS
  ↓
SQL
  ↓
CRUD
  ├── INSERT  = ADD
  ├── SELECT  = READ
  ├── UPDATE  = CHANGE
  └── DELETE  = REMOVE
  ↓
CLAUSES
  ├── WHERE    = ROW FILTER
  ├── DISTINCT = UNIQUE
  ├── GROUP BY = GROUP
  ├── HAVING   = GROUP FILTER
  └── ORDER BY = SORT
  ↓
OPERATORS
  ├── = != > < >= <=
  ├── AND / OR / NOT
  ├── LIKE / %
  ├── IN
  └── BETWEEN
  ↓
FUNCTIONS
  ├── COUNT
  ├── SUM
  ├── AVG
  ├── MIN
  ├── MAX
  ├── LENGTH
  └── GROUP_CONCAT
  ↓
WEB APPLICATION SECURITY
  ↓
SQL INJECTION

