## 📋 Contents

# Room 5 — Database SQL Basics

```text
██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗
██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗
██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝
████���█╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗
╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝

███████╗ ██████╗ ██╗
██╔════╝██╔═══██╗██║
███████╗██║   ██║██║
╚════██║██║▄▄ ██║██║
███████║╚██████╔╝███████╗
╚══════╝ ╚══▀▀═╝ ╚══════╝
```

## 1. WHAT IS DATA?

Data simply means information.

Examples

Name
Age
Price
Email
Phone Number
Marks
Salary

Example

Surya
21
₹200
surya@gmail.com

All of these are data.

Think:

Computer stores everything as data.

Examples

Facebook Posts
Instagram Likes
WhatsApp Messages
Bank Balance
Amazon Orders
College Marks

Everything is data.

## 2. WHY DO WE NEED DATABASES?

Imagine a small café.

Customer comes.

Owner writes order in notebook.

------------------------------------

Coffee
₹120
10:00 AM

Tea
₹80
10:10 AM

Latte
₹250
10:20 AM

------------------------------------

Looks easy...

Now imagine after

1 Day
100 Orders

1 Month
3000 Orders

1 Year
36,000 Orders

Now customer asks

"How many coffees were sold today?"

Owner has to search thousands of pages.

Very slow.

Very difficult.

Very inefficient.

So...

We need a better way.

That better way is...

DATABASE.

## 3. WHAT IS A DATABASE?

Definition

A Database is an organized collection of data.

OR

A database stores information so that computers can retrieve it quickly.

Simple Definition

Notebook
↓

Digital Notebook

with

Searching
Sorting
Filtering
Editing

### Real Life Examples

Instagram
↓

Users Database

-----------------------------------
Username
Password
Followers
Posts
-----------------------------------

Amazon

-----------------------------------
Product Name
Price
Seller
Rating
-----------------------------------

College

-----------------------------------
Roll Number
Marks
Attendance
CGPA
-----------------------------------

Bank

-----------------------------------
Account Number
Balance
Transactions
-----------------------------------

Hospital

-----------------------------------
Patient Name
Disease
Doctor
Medicine
-----------------------------------

### Advantages of Database

✓ Fast Search

✓ Easy Update

✓ Easy Delete

✓ Secure

✓ Stores Millions of Records

✓ Backup Possible

✓ Multiple Users

✓ Organized Data

### Without Database

Searching

❌ Slow

Storage

❌ Messy

Editing

❌ Difficult

Backup

❌ Hard

### With Database

Searching

✔ Fast

Storage

✔ Organized

Editing

✔ Easy

Backup

✔ Easy

## 4. DATABASE STRUCTURE

Everything inside database is stored in

TABLES

Think

Database

```text
        |
        |
   +-----------+
   | Database  |
   +-----------+
```
      /   \
     /     \
+---------+ +---------+
| Orders  | |  Users  |
+---------+ +---------+
|.........| |.........|
|.........| |.........|
+---------+ +---------+

Database

contains

Multiple Tables

## 5. WHAT IS A TABLE?

A table is like an Excel Sheet.

Example

```text
```
+---------------------------------------------+
| ID | Drink | Price | Time                  |
+---------------------------------------------+
```sql
| 1  | Tea   |  20   | 09:00                 |
| 2  | Coffee|  30   | 09:10                 |
| 3  | Latte | 120   | 09:20                 |
+---------------------------------------------+
```

Everything is stored inside tables.

## 6. WHAT IS A COLUMN?

Columns describe

WHAT TYPE OF DATA

is stored.

Example

ID

stores IDs

Drink

stores drink names

Price

stores prices

Time

stores order time

Visualization

ID

↓

1
2
3
4

Drink

↓

Tea
Coffee
Latte

Price

↓

20
30
120

Each column stores ONE TYPE OF DATA.

Think

Column

=

Category

## 7. WHAT IS A ROW?

Row means

ONE COMPLETE RECORD

Example

```text
+---------------------------------------------+
| ID | Drink | Price | Time                  |
+---------------------------------------------+
| 1  | Tea   | 20    |09:00                  |
+---------------------------------------------+
```

Everything about ONE ORDER

is one row.

Another row

```text
+---------------------------------------------+
| 2 | Coffee |30 |09:10                      |
+---------------------------------------------+
```

Each row

=

One Record

## 8. RECORD

Record

=

One Complete Row

Example

--------------------------------

ID

1

Drink

Coffee

Price

30

Time

09:00

--------------------------------

Entire thing

=

One Record

### Database Hierarchy

Database

↓

Tables

↓

Rows

↓

Columns

↓

Values

Example

Database

Cafe

↓

Orders Table

↓

Row

Coffee

↓

Column

Price

↓

Value

30

## 9. VISUAL UNDERSTANDING

Database

        |
        |
   Orders Table

```text
```
+----------------------------------------------+
|ID|Drink|Price|Time                           |
+----------------------------------------------+
```sql
|1 |Tea  |20   |09:00                          |
|2 |Latte|120  |09:10                          |
|3 |Coffee|30  |09:15                          |
+----------------------------------------------+
```

Columns

↓

ID

Drink

Price

Time

Rows

↓

Tea

↓

Latte

↓

Coffee

## 10. WHAT IS SQL?

SQL

=

Structured Query Language

SQL is

NOT

a database.

SQL is

A LANGUAGE

used to communicate with a database.

Think

Human
↓

SQL
↓

Database

### Analogy

English

↓

Talk to Humans

SQL

↓

Talk to Database

=====================================================================
Examples

Human says

Show me coffee orders.

SQL says

SELECT * FROM Orders
WHERE drink='Coffee';

Database returns

Coffee Orders

## 11. SQL vs DATABASE

DATABASE

Stores Data

SQL

Accesses Data

Database

Like Library

SQL

Like Librarian

Database

Book Storage

SQL

Find Book

## 12. WHY SQL?

Without SQL

Imagine searching

1 Million Orders

Manually

Impossible.

SQL

Can find them

in milliseconds.

=====================================================================
SQL can

Read Data

Insert Data

Delete Data

Update Data

Filter Data

Sort Data

Count Data

## 13. DATABASE EXAMPLES

MySQL

PostgreSQL

SQLite

Oracle

Microsoft SQL Server

MariaDB

MongoDB
(NoSQL)

## 14. SQL IS EVERYWHERE

Facebook

Instagram

Netflix

Amazon

Flipkart

Google

Uber

Paytm

Swiggy

Zomato

Every app uses databases.

## 15. CYBER SECURITY IMPORTANCE

Almost every target has

Database

Examples

Login System

↓

User Database

Bank

↓

Transaction Database

Hospital

↓

Patient Database

Government

↓

Citizen Database

Company

↓

Employee Database

=====================================================================
As Ethical Hackers

We interact with databases.

Examples

Login Testing

SQL Injection

Data Leakage

Broken Authentication

Privilege Escalation

Database Enumeration

=====================================================================
Future Topics

SQL Injection

Authentication Bypass

Dumping Database

Information Disclosure

Blind SQL Injection

Error Based SQLi

UNION SQLi

All require SQL knowledge.

## 16. MEMORY TRICKS

Database

↓

Cupboard

Table

↓

Shelf

Row

↓

One File

Column

↓

Label

Cell

↓

One Value

=====================================================================
Another Trick

Database

↓

School

Table

↓

Class

Row

↓

Student

Column

↓

Student Detail

Example

Roll

Name

CGPA

## 17. KEYWORDS TO REMEMBER

Data

Information

Database

Collection of data

Table

Stores records

Row

One record

Column

One attribute

Record

One row

SQL

Language to communicate with database

## 18. INTERVIEW QUESTIONS

Q1.
What is a database?

Answer

An organized collection of data.

------------------------------------------------------------

Q2.

Difference between SQL and Database?

Answer

Database stores data.

SQL accesses data.

------------------------------------------------------------

Q3.

What is a row?

Answer

One complete record.

------------------------------------------------------------

Q4.

What is a column?

Answer

One type of information.

------------------------------------------------------------

Q5.

Can database have multiple tables?

Yes.

------------------------------------------------------------

Q6.

Is SQL a programming language?

No.

It is a query language.

------------------------------------------------------------

Q7.

Why databases are faster than notebooks?

Because they support searching,
sorting,
filtering,
and indexing.

## 19. QUICK REVISION

Data
↓

Information

Database
↓

Collection of Data

Table
↓

Spreadsheet

Column
↓

Attribute

Row
↓

Record

Record
↓

One Complete Entry

SQL
↓

Language to communicate with Database

## 20. ONE-MINUTE CHEATSHEET

```text
Database
    │
    ├── Table
    │      │
    │      ├── Rows (Records)
    │      └── Columns (Attributes)
    │
    └── SQL
           │
           ├── Read
           ├── Insert
           ├── Update
           ├── Delete
           ├── Filter
           └── Sort
```

## 21. WHAT IS A QUERY?

A Query is simply a request made to a database.

Think

You ask a question

↓

Database answers

Example

Show all students.

Show all coffee orders.

Show products under ₹100.

These questions are called

QUERIES

## 22. BASIC SQL QUERY STRUCTURE

Almost every SQL query follows this pattern

SELECT
FROM
WHERE
ORDER BY

Visual

SELECT
    ↓
Choose Data

FROM
    ↓
Choose Table

WHERE
    ↓
Filter Rows

ORDER BY
    ↓
Sort Results

=====================================================================
Query Flow

Database

```text
        │
```
        ▼

SELECT

```text
        │
```

FROM

```text
        │
```

WHERE

```text
        │
```

ORDER BY

```text
        │
```

Result

## 23. SELECT

SELECT tells SQL

"What data do you want?"

Example

SELECT *

Meaning

Show everything.

=====================================================================
Example

Orders Table

```text
```
+--------------------------------------------+
| ID | Drink | Price | Time                 |
+--------------------------------------------+
```sql
|1|Tea|20|09:00|
|2|Coffee|30|09:10|
|3|Latte|120|09:20|
+--------------------------------------------+
```

Query

SELECT *

returns

Everything

## 24. ASTERISK (*)

*

means

ALL COLUMNS

Example

SELECT *

means

Show

ID

Drink

Price

Time

Everything.

## 25. FROM

FROM tells SQL

Which table?

Example

SELECT *

FROM Orders;

Meaning

Show everything

FROM

Orders table.

=====================================================================
Without FROM

Database doesn't know

which table to read.

Wrong

SELECT *

Correct

SELECT *
FROM Orders;

## 26. FIRST SQL QUERY

SELECT *
FROM Orders;

Meaning

Select

↓

Everything

From

↓

Orders table

Result

ID

Drink

Price

Time

All rows

=====================================================================
Memory Trick

SELECT

↓

WHAT

FROM

↓

WHERE FROM

## 27. SELECT SPECIFIC COLUMNS

Sometimes

We don't need every column.

Instead of

SELECT *

Use

SELECT drink, price

Example

SELECT drink, price
FROM Orders;

Output

Drink

Price

Tea

20

Coffee

30

Latte

120

Notice

ID

Time

are hidden.

=====================================================================
Another Example

SELECT drink
FROM Orders;

Only

Drink

Tea

Coffee

Latte

=====================================================================
Multiple Columns

SELECT

drink,
price,
time

FROM Orders;

## 28. WHY SELECT SPECIFIC COLUMNS?

Advantages

Less Data

Faster

Cleaner

Easy to Read

Better Performance

Professional Practice

## 29. WHERE

WHERE

filters rows.

Think

WHERE

means

ONLY SHOW

matching records.

=====================================================================
Example

Orders

Tea

Coffee

Coffee

Latte

Coffee

Query

SELECT *

FROM Orders

WHERE drink='Coffee';

Output

Coffee

Coffee

Coffee

Only coffee rows remain.

=====================================================================
Visual

All Rows

Tea

Coffee

Latte

Coffee

Tea

↓

WHERE Coffee

↓

Coffee

Coffee

### WHERE Examples

Coffee only

SELECT *
FROM Orders
WHERE drink='Coffee';

Price 20

SELECT *
FROM Orders
WHERE price=20;

ID 5

SELECT *
FROM Orders
WHERE id=5;

### Common Operators

=

Equal

!=

Not Equal

>

Greater Than

<

Less Than

>=

Greater than or equal

<=

Less than or equal

=====================================================================
Examples

Price greater than 100

SELECT *
FROM Orders
WHERE price>100;

Price less than 50

SELECT *
FROM Orders
WHERE price<50;

Price not equal 30

SELECT *
FROM Orders
WHERE price!=30;

## 30. ORDER BY

ORDER BY

sorts data.

Think

Arrange

Small to Large

Large to Small

A to Z

Z to A

=====================================================================
Example

Prices

120

20

50

80

ORDER BY price

Result

20

50

80

120

=====================================================================
SQL

SELECT *

FROM Orders

ORDER BY price;

=====================================================================
Default

Ascending

Small

↓

Large

## 31. ASC

ASC

=

Ascending

Lowest

↓

Highest

Example

SELECT *

FROM Orders

ORDER BY price ASC;

Result

20

30

40

100

120

=====================================================================
ASC also works on text

Apple

Banana

Coffee

Tea

## 32. DESC

DESC

=

Descending

Highest

↓

Lowest

Example

SELECT *

FROM Orders

ORDER BY price DESC;

Output

120

100

50

30

20

=====================================================================
Memory Trick

ASC

A

Ascending

Small

↓

Large

DESC

Descending

Large

↓

Small

## 33. COMBINING WHERE + ORDER BY

Professional queries

combine commands.

Example

SELECT *

FROM Orders

WHERE drink='Coffee'

ORDER BY price DESC;

Meaning

Step 1

Find Coffee

↓

Step 2

Sort highest price first

↓

Display

=====================================================================
Execution

Orders

↓

WHERE

↓

Coffee Only

↓

ORDER BY

↓

Highest Price

↓

Result

## 34. SQL EXECUTION ORDER

Although we write

SELECT

first,

Database processes

FROM

↓

WHERE

↓

SELECT

↓

ORDER BY

Easy way

Read Table

↓

Filter

↓

Choose Columns

↓

Sort

## 35. SQL RULES

SQL keywords

can be written

Uppercase

SELECT

FROM

WHERE

or

lowercase

select

from

where

Both work.

Professional style

UPPERCASE keywords

=====================================================================
Semicolon

;

marks end of query.

Example

SELECT *
FROM Orders;

=====================================================================
Strings

Use

Single Quotes

Correct

'Coffee'

Wrong

Coffee

## 36. COMPLETE EXAMPLES

Show everything

SELECT *
FROM Orders;

---------------------------------------------------

Only drink names

SELECT drink
FROM Orders;

---------------------------------------------------

Drink + Price

SELECT drink,price
FROM Orders;

---------------------------------------------------

Only Coffee

SELECT *
FROM Orders
WHERE drink='Coffee';

---------------------------------------------------

Price High → Low

SELECT *
FROM Orders
ORDER BY price DESC;

---------------------------------------------------

Price Low → High

SELECT *
FROM Orders
ORDER BY price ASC;

---------------------------------------------------

Coffee Highest Price First

SELECT *
FROM Orders
WHERE drink='Coffee'
ORDER BY price DESC;

## 37. COMMON MISTAKES

Wrong

SELECT FROM Orders;

Missing *

--------------------------------

Wrong

SELECT *

Orders;

Missing FROM

--------------------------------

Wrong

WHERE drink=Coffee

Missing quotes

--------------------------------

Correct

WHERE drink='Coffee'

--------------------------------

Wrong

ORDER price

Correct

ORDER BY price

## 38. INTERVIEW QUESTIONS

Q1

What does SELECT do?

Answer

Chooses which columns to display.

-----------------------------------------------------

Q2

What does FROM do?

Answer

Specifies the table.

-----------------------------------------------------

Q3

What does WHERE do?

Answer

Filters rows.

-----------------------------------------------------

Q4

Difference between ASC and DESC?

ASC

Lowest → Highest

DESC

Highest → Lowest

-----------------------------------------------------

Q5

Meaning of *

All Columns

-----------------------------------------------------

Q6

Can WHERE and ORDER BY be used together?

Yes.

Very common.

-----------------------------------------------------

Q7

Default ORDER BY?

Ascending

## 39. CYBER SECURITY CONNECTION

Attackers

also use SQL.

Examples

SELECT username,password FROM users;

SELECT *

FROM information_schema.tables;

SELECT version();

These are used during

SQL Injection.

Learning basic SQL

is mandatory

before learning

SQLi.

## 40. ONE PAGE CHEATSHEET

SELECT

Choose Columns

--------------------------------

FROM

Choose Table

--------------------------------

WHERE

Filter Rows

--------------------------------

ORDER BY

Sort Results

--------------------------------

ASC

Lowest → Highest

--------------------------------

DESC

Highest → Lowest

--------------------------------

*

All Columns

### QUERY FLOW

```text
```
```text
```
SELECT
      │
```sql
      ▼
FROM
      │
```
      ▼
WHERE
      │
```sql
      ▼
ORDER BY
      │
```
      ▼
RESULT

### MOST COMMON SQL COMMANDS

SELECT *

FROM table;

--------------------------------

SELECT column

FROM table;

--------------------------------

SELECT column1,column2

FROM table;

--------------------------------

SELECT *

FROM table

WHERE column='value';

--------------------------------

SELECT *

FROM table

ORDER BY column;

--------------------------------

SELECT *

FROM table

ORDER BY column DESC;

--------------------------------

SELECT *

FROM table

WHERE column='value'

ORDER BY column DESC;

## 41. COMPLETE DATABASE HIERARCHY

```text
```
                        DATABASE
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
```sql
     USERS               ORDERS             PRODUCTS
      TABLE               TABLE               TABLE
        │                   │                   │
   ┌────┴────┐         ┌────┴────┐        ┌────┴────┐
   │ Rows    │         │ Rows    │        │ Rows    │
   └────┬────┘         └────┬────┘        └────┬────┘
        │                   │                  │
     Columns             Columns           Columns
        │                   │                  │
```
      Values              Values            Values

## 42. COMPLETE SQL QUERY FLOW

Write Query

```text
        │
```

        ▼

FROM

Read Table

```text
        │
```

        ▼

WHERE

Filter Records

```text
        │
```

        ▼

SELECT

Choose Columns

```text
        │
```

        ▼

ORDER BY

Sort Results

```text
        │
```

        ▼

Display Output

## 43. DATABASE VOCABULARY

Data

↓

Information

---------------------------------------------------

Database

↓

Collection of Tables

---------------------------------------------------

Table

↓

Collection of Rows

---------------------------------------------------

Row

↓

One Record

---------------------------------------------------

Column

↓

One Attribute

---------------------------------------------------

Cell

↓

One Value

---------------------------------------------------

SQL

↓

Language to Query Database

## 44. SQL COMMAND CHEATSHEET

Show everything

SELECT *
FROM Orders;

-----------------------------------------------------

Show one column

SELECT drink
FROM Orders;

-----------------------------------------------------

Show multiple columns

SELECT drink, price
FROM Orders;

-----------------------------------------------------

Filter

SELECT *
FROM Orders
WHERE drink='Coffee';

-----------------------------------------------------

Sort

SELECT *
FROM Orders
ORDER BY price;

-----------------------------------------------------

Sort Descending

SELECT *
FROM Orders
ORDER BY price DESC;

-----------------------------------------------------

Sort Ascending

SELECT *
FROM Orders
ORDER BY price ASC;

-----------------------------------------------------

Filter + Sort

SELECT *
FROM Orders
WHERE drink='Coffee'
ORDER BY price DESC;

## 45. SQL KEYWORDS SUMMARY

SELECT

Choose Data

-----------------------------------

FROM

Choose Table

-----------------------------------

WHERE

Filter Data

-----------------------------------

ORDER BY

Sort Data

-----------------------------------

ASC

Lowest → Highest

-----------------------------------

DESC

Highest → Lowest

-----------------------------------

*

All Columns

## 46. SQL OPERATORS

=

Equal

-----------------------------------

!=

Not Equal

-----------------------------------

>

Greater Than

-----------------------------------

<

Less Than

-----------------------------------

>=

Greater Than or Equal

-----------------------------------

<=

Less Than or Equal

=====================================================================
Examples

price = 50

price > 50

price < 100

price >= 20

price <= 30

drink != 'Tea'

## 47. SQL EXECUTION EXAMPLES

Example 1

SELECT *
FROM Orders;

Meaning

Read every row
Return every column

---------------------------------------------------

Example 2

SELECT drink
FROM Orders;

Meaning

Return only drink names

---------------------------------------------------

Example 3

SELECT *
FROM Orders
WHERE drink='Tea';

Meaning

Filter only Tea orders

---------------------------------------------------

Example 4

SELECT *
FROM Orders
ORDER BY price DESC;

Meaning

Highest price appears first

---------------------------------------------------

Example 5

SELECT drink,price
FROM Orders
WHERE price>50
ORDER BY price;

Meaning

Show drink and price

Only drinks above ₹50

Sort from cheapest to expensive

## 48. SQL IN CYBER SECURITY

Databases exist almost everywhere.

Examples

Login Systems

↓

User Accounts

---------------------------------------------------

Banking

↓

Transactions

---------------------------------------------------

Hospitals

↓

Patient Records

---------------------------------------------------

E-Commerce

↓

Orders

Products

Payments

---------------------------------------------------

Government

↓

Citizen Data

## 49. WHY HACKERS LEARN SQL?

Hackers don't attack SQL.

They attack

Applications

that use SQL.

Examples

Login Pages

Search Boxes

Comment Forms

Forgot Password

Feedback Forms

Admin Panels

## 50. SQL INJECTION (INTRODUCTION)

One of the most famous web attacks

is

SQL Injection (SQLi)

SQL Injection happens when

User Input

↓

Becomes SQL Code

Example

Application

SELECT *
FROM users
WHERE username='admin'
AND password='123';

If application

doesn't validate input,

attacker may change query.

This can

Read Data

Modify Data

Delete Data

Bypass Login

### SQL Injection Types

Error Based SQLi

Union SQLi

Boolean SQLi

Time Based SQLi

Blind SQLi

Out of Band SQLi

These will be covered later in
Web Exploitation rooms.

## 51. WHY ETHICAL HACKERS MUST KNOW SQL

Because SQL helps understand

Authentication

Databases

Web Applications

Backend Logic

Data Storage

Without SQL

SQL Injection becomes difficult.

## 52. COMMON DATABASES

MySQL

Most popular

-----------------------------------

PostgreSQL

Enterprise

-----------------------------------

SQLite

Small Applications

-----------------------------------

Oracle

Large Enterprises

-----------------------------------

Microsoft SQL Server

Windows Environment

-----------------------------------

MariaDB

MySQL Alternative

## 53. SQL BEST PRACTICES

Use uppercase keywords

SELECT

FROM

WHERE

ORDER BY

-----------------------------------

Use meaningful formatting

-----------------------------------

Terminate query using ;

-----------------------------------

Use quotes for strings

'Coffee'

-----------------------------------

Read queries before execution

## 54. COMMON BEGINNER MISTAKES

❌ Forgetting FROM

❌ Missing semicolon

❌ Missing quotes

❌ Wrong table name

❌ Wrong column name

❌ ORDER instead of ORDER BY

❌ Using DESC before ORDER BY

❌ Typing SELECT FROM

## 55. MEMORY TRICKS

SELECT

↓

Select Data

-----------------------------------

FROM

↓

From Which Table

-----------------------------------

WHERE

↓

Where Condition

-----------------------------------

ORDER BY

↓

Arrange Results

-----------------------------------

ASC

↓

A = Ascending

-----------------------------------

DESC

↓

Descending

## 56. QUICK TABLE REFERENCE

```text
```
+------------+------------------------------+
| Keyword    | Purpose                      |
+------------+------------------------------+
```sql
| SELECT     | Choose columns               |
| FROM       | Choose table                 |
| WHERE      | Filter rows                  |
| ORDER BY   | Sort rows                    |
| ASC        | Low → High                   |
| DESC       | High → Low                   |
| *          | All columns                  |
+------------+------------------------------+
```

## 57. INTERVIEW QUESTIONS

Q1

What is SQL?

Answer

Structured Query Language.

--------------------------------------------------

Q2

Is SQL a programming language?

Answer

No.

It is a Query Language.

--------------------------------------------------

Q3

Difference between Table and Database?

Database contains tables.

Table contains rows and columns.

--------------------------------------------------

Q4

Difference between Row and Column?

Row

One Record

Column

One Attribute

--------------------------------------------------

Q5

What does WHERE do?

Filters rows.

--------------------------------------------------

Q6

What does ORDER BY do?

Sorts rows.

--------------------------------------------------

Q7

Default sorting?

Ascending

--------------------------------------------------

Q8

Difference between ASC and DESC?

ASC

Low → High

DESC

High → Low

--------------------------------------------------

Q9

Meaning of *

All Columns

--------------------------------------------------

Q10

Why do hackers learn SQL?

To understand databases and perform
security testing like SQL Injection.

## 58. ROOM SUMMARY

In this room you learned

✔ What is Data

✔ Database

✔ Table

✔ Row

✔ Column

✔ Record

✔ SQL

✔ SELECT

✔ FROM

✔ WHERE

✔ ORDER BY

✔ ASC

✔ DESC

✔ Filtering

✔ Sorting

✔ Combining Queries

These are the building blocks
for every SQL database.

## 59. ONE-SHOT REVISION

```text
DATABASE
    │
    ├── TABLE
    │      │
    │      ├── ROW
    │      │      │
    │      │      └── VALUES
    │      │
    │      └── COLUMN
    │
    └── SQL
           │
           ├── SELECT
           ├── FROM
           ├── WHERE
           ├── ORDER BY
           ├── ASC
           └── DESC
```

## 60. COMPLETE SQL FLOW

Database

↓

Table

↓

Rows

↓

Columns

↓

Write SQL

↓

SELECT

↓

FROM

↓

WHERE

↓

ORDER BY

↓

Results

## 61. PREPARATION FOR NEXT ROOMS

You are now ready to learn

✔ SQL Injection

✔ Authentication Bypass

✔ Login Vulnerabilities

✔ UNION Queries

✔ Database Enumeration

✔ Information Disclosure

✔ Web Exploitation

✔ OWASP Top 10

✔ Burp Suite

✔ Advanced SQL

## 62. FINAL CHEATSHEET

SELECT *

FROM table;

-------------------------------------------------

SELECT column

FROM table;

-------------------------------------------------

SELECT col1,col2

FROM table;

-------------------------------------------------

SELECT *

FROM table

WHERE condition;

-------------------------------------------------

SELECT *

FROM table

ORDER BY column;

-------------------------------------------------

SELECT *

FROM table

ORDER BY column DESC;

-------------------------------------------------

SELECT *

FROM table

WHERE condition

ORDER BY column DESC;

## 🏁 END OF DATABASE SQL BASICS

Room Complete ✔

Knowledge Gained

✓ Database Fundamentals

✓ SQL Basics

✓ Reading Data

✓ Filtering Data

✓ Sorting Data

✓ Writing Simple Queries

✓ Foundation for SQL Injection

Next Recommended TryHackMe Rooms

→ SQL Injection
→ OWASP Top 10
→ Burp Suite Basics
→ Jr Penetration Tester
→ Web Fundamentals
