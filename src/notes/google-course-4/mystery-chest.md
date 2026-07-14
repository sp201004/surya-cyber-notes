## Contents

- [Complete Course 4 Glossary](#complete-course-4-glossary)
- [Module 4 Glossary — SQL](#module-4-glossary--sql)
- [Complete Course 4 Flashcard Review](#complete-course-4-flashcard-review)

## Complete Course 4 Glossary

| **Term** | **Definition** |
| --- | --- |
| **Absolute file path** | The complete file path starting from root (/). Works from any location. Example: /home/analyst/logs/access.txt |
| **APT (Advanced Package Tool)** | CLI package management tool for Debian-based systems (Ubuntu, Kali). Installs, updates, and removes software. Command: apt install/update/upgrade/remove. |
| **Application** | A program that performs a specific task (browser, text editor, nmap, Wireshark). |
| **Argument (Linux)** | Specific information provided to a command telling it what to act on. Example: in 'cat report.txt', 'report.txt' is the argument. |
| **Authentication** | The process of verifying who someone is before granting access to a system. |
| **Authorization** | The process of determining what a verified user is allowed to access or do on a system. |
| **Bash** | Bourne-Again Shell. The default shell in most Linux distributions. Standard for security scripting and automation. |
| **BIOS** | Basic Input/Output System. Older firmware (pre-2007) that initializes hardware on boot. Replaced by UEFI on modern systems. |
| **Bootloader** | Software that loads the operating system into memory during the boot process. Examples: GRUB (Linux), Windows Boot Manager. |
| **CLI** | Command-Line Interface. Text-based interface for interacting with the OS. Preferred by security analysts for speed, automation, and forensic history. |
| **chmod** | Change Mode. Linux command for modifying file permissions (read/write/execute) for owner, group, and others. |
| **chown** | Change Owner. Linux command for transferring file ownership to a different user or group. |
| **CPU** | Central Processing Unit. The main processor executing all computations and logic in a computer. |
| **Directory** | A container in the filesystem that organizes and stores files and other directories (equivalent to a folder). |
| **Distribution (Distro)** | A complete Linux operating system built around the Linux kernel with specific pre-installed tools and interfaces (Kali, Ubuntu, RHEL, etc.). |
| **FHS** | Filesystem Hierarchy Standard. The standardized directory structure all Linux systems follow, defining where specific types of files live (/bin, /etc, /var, /home, etc.). |
| **File path** | The location of a file or directory in the filesystem. Can be absolute (from root) or relative (from current directory). |
| **Filtering** | Selecting only data that matches a specified condition. Core analyst skill using grep, find, and pipes. |
| **grep** | Global Regular Expression Print. Command that searches inside files for lines matching a specified text pattern. Core analysis tool. |
| **GUI** | Graphical User Interface. Visual interface using windows, icons, and menus. Intuitive but limited for security work compared to CLI. |
| **Hard Drive** | Hardware component for long-term (persistent) storage. Data survives power cycles. Slower than RAM but much larger capacity. |
| **Hardware** | Physical components of a computer: CPU, RAM, hard drive, NIC, GPU, and peripheral devices. |
| **Hypervisor** | Software that creates and manages Virtual Machines on a physical host. Type 1 (bare-metal): ESXi, KVM, Hyper-V. Type 2 (hosted): VirtualBox, VMware Workstation. |
| **Kali Linux** | Debian-based Linux distribution purpose-built for penetration testing and digital forensics. Pre-loaded with security tools. Always run in a VM. |
| **Kernel** | The core engine of the Linux OS. Manages process scheduling, RAM allocation, hardware drivers, and system security enforcement. |
| **KVM** | Kernel-based Virtual Machine. Open-source hypervisor built directly into the Linux kernel. Used in enterprise cloud infrastructure. |
| **Legacy OS** | An outdated operating system still in use, no longer receiving security patches. Permanently vulnerable to any newly discovered exploits. |
| **Linux** | Open-source operating system created by Linus Torvalds (1991). Powers 96%+ of web servers. THE foundation of cybersecurity tooling. |
| **nano** | A simple, beginner-friendly command-line text editor. CTRL+O saves, CTRL+X exits. |
| **Operating System (OS)** | Core software bridging user and hardware. Translates human actions into binary hardware instructions. Manages all computer resources. |
| **Options (flags)** | Modifiers added to commands (usually starting with -) that change behavior. Example: ls -la adds 'all' and 'long format' to ls. |
| **Package** | A compressed archive containing an application's files, metadata, and dependency information for installation on Linux. |
| **Package Manager** | A tool that automates installing, updating, and removing software packages while automatically resolving dependencies (APT, YUM, dpkg, RPM). |
| **Permissions** | The access rights (read/write/execute) granted to the owner, group, and others for a specific file or directory. |
| **Pipe ( \| )** | A shell operator that takes the output of one command and feeds it directly as input to the next command. Enables complex multi-step filtering. |
| **Principle of Least Privilege** | Users and processes should have ONLY the minimum access required to perform their function -- nothing more. Limits blast radius of compromise. |
| **RAM** | Random Access Memory. Short-term, high-speed workspace. Cleared completely when power is off. OS uses it for running processes. |
| **Relative file path** | A file path starting from the current working directory (not from root). Shorter but context-dependent. |
| **Root directory ( / )** | The topmost directory in the Linux filesystem. Every single file and directory on the system exists somewhere under root. |
| **Root user** | The superuser account with unlimited system privileges. The # prompt indicates root. Should only be accessed via sudo, not direct login. |
| **Shell** | The command-line interpreter that receives typed commands and translates them into OS instructions. Bash is the standard. |
| **Standard error (stderr)** | Stream 2. Error messages returned when a command fails. Can be redirected with 2>. |
| **Standard input (stdin)** | Stream 0. Data entering the shell, typically from keyboard input or piped command output. |
| **Standard output (stdout)** | Stream 1. Successful command output displayed on screen. Can be redirected with > or >>. |
| **sudo** | Super User Do. Executes a single command with root privileges. Logs all usage to /var/log/auth.log. Safer than direct root login. |
| **UEFI** | Unified Extensible Firmware Interface. Modern replacement for BIOS. Supports Secure Boot, larger disks, faster boot times, enhanced security. |
| **Ubuntu** | User-friendly Debian-based Linux distribution. Widely used in cloud computing, enterprise desktops, and development environments. |
| **useradd** | Linux command for creating new user accounts. Key options: -m (create home dir), -g (primary group), -G (supplemental groups). |
| **userdel** | Linux command for deleting user accounts. -r flag also removes home directory and mail spool. |
| **usermod** | Linux command for modifying existing user accounts. -aG (append to groups), -L (lock), -U (unlock). |
| **Virtual Machine (VM)** | A software-defined computer running inside a physical host machine. Fully isolated from host and other VMs. Essential for safe malware analysis. |
| **Virtualization** | Using software to create virtual representations of physical hardware. Enables multiple OS environments on a single physical machine. |
| **whatis** | Command providing a one-line description of another command. Quick reference without opening full manual. |
| **World-writable file** | A file that ANY user on the system can read, write, or execute. Represented by rwxrwxrwx permissions. Security risk -- should be avoided. |

## Module 4 Glossary — SQL

| **Term** | **Definition** |
| --- | --- |
| **ASC** | Ascending sort order. A-Z for text, oldest-to-newest for dates, 0-9 for numbers. |
| **BETWEEN** | SQL operator filtering rows within a specified range (inclusive of both boundary values). |
| **COUNT ()** | Aggregate function returning the total number of rows in a query result. |
| **Database** | An organized collection of information or data, designed for efficient storage and retrieval. |
| **Date/Time Data** | Data representing dates or timestamps. Must be wrapped in single quotes in SQL queries. |
| **DESC** | Descending sort order. Z-A for text, newest-to-oldest for dates, 9-0 for numbers. |
| **Filtering** | Selecting only data records that match a specified condition (using WHERE in SQL). |
| **Foreign Key (FK)** | A column in one table that references the Primary Key of another table. Creates the link between tables. Can have duplicates and NULL values. |
| **FULL OUTER JOIN** | Returns ALL records from both tables. Matches where possible, fills unmatched rows with NULL. |
| **INNER JOIN** | Returns only records that have a matching value in BOTH joined tables. |
| **LEFT JOIN** | Returns ALL records from the left table plus matching records from the right table (NULLs where no right match). |
| **LIKE** | SQL operator used with wildcards (% and _) to search for patterns within text values. |
| **Log** | A record of events occurring within an organization's systems. Often stored in databases for SQL analysis. |
| **NULL** | The absence of any value in a database field. Represents unknown or missing data (not zero, not empty string). |
| **Numeric Data** | Data consisting of numbers. Never wrapped in quotes in SQL queries. Used for mathematical comparisons. |
| **ORDER BY** | SQL clause that sorts query results by one or more columns in ascending (ASC) or descending (DESC) order. |
| **Operator** | A symbol or keyword representing an operation in SQL (=, <>, >, <, LIKE, AND, OR, NOT, BETWEEN). |
| **Primary Key (PK)** | A column where every row has a unique, non-NULL value. Uniquely identifies each record in a table. One per table. |
| **Query** | A formal request for specific data from a database, written in SQL. |
| **Relational Database** | A structured database containing tables that are connected (related) to each other via Primary and Foreign Keys. |
| **RIGHT JOIN** | Returns ALL records from the right table plus matching records from the left table (NULLs where no left match). |
| **SQL** | Structured Query Language. Standard programming language for creating, querying, and managing relational databases. |
| **String Data** | Data consisting of text characters. Must always be wrapped in single quotes in SQL queries. |
| **SUM ()** | Aggregate function returning the total sum of all values in a numeric column. |
| **AVG ()** | Aggregate function returning the mathematical average (mean) of all values in a numeric column. |
| **Wildcard** | A special character substituting for other characters in LIKE patterns. % = any number of chars. _ = exactly one char. |

## Complete Course 4 Flashcard Review

| **Question** | **Answer** |
| --- | --- |
| **What does an OS do?** | Bridges user and hardware. Translates human actions into binary hardware instructions. Manages CPU, RAM, storage, and I/O for all running programs. |
| **BIOS vs. UEFI?** | BIOS: older (pre-2007), basic, limited security. UEFI: modern, 64-bit, Secure Boot, faster, supports large disks. Advanced malware targets firmware -- survives OS wipes. |
| **GUI vs. CLI for security?** | CLI preferred: faster, scriptable for automation, auto-logs ALL commands in bash_history (forensics), full remote server management via SSH. |
| **What does a hypervisor do?** | Creates and manages Virtual Machines. Type 1 (bare-metal): KVM, ESXi. Type 2 (hosted): VirtualBox. Each VM is isolated -- malware in one VM cannot reach others. |
| **Linux architecture layers?** | User -> Application -> Shell -> FHS -> Kernel -> Hardware. Each passes instructions to the layer below it. |
| **Kali Linux vs. Ubuntu?** | Kali: penetration testing/forensics, pre-loaded offensive tools, run in VM. Ubuntu: user-friendly, general use/cloud, clean install. |
| **APT vs. YUM?** | APT: Debian family (Kali, Ubuntu). YUM/DNF: Red Hat family (RHEL, AlmaLinux). Both auto-resolve dependencies and apply security patches. |
| **$ vs. # in prompt?** | $ = regular user (limited). # = root/superuser (maximum privileges -- all commands have full system access). Always be extra careful with #. |
| **stdin/stdout/stderr?** | stdin (0): your typed input. stdout (1): successful output on screen (redirect with >). stderr (2): error messages (redirect with 2>). |
| **ls -la output?** | ls: basic list. -l: long format (permissions, owner, size, date). -a: include hidden files (dot-files). -la: combined -- most useful for security. |
| **chmod 600 key.pem?** | Owner: read+write (6=rw). Group: NO access (0). Others: NO access (0). SSH requires private keys to have exactly these permissions. |
| **sudo vs. root login?** | sudo: one command with root privileges, then reverts. Logged to auth.log. Root login: every command at max power. No per-command accountability. Avoid direct root. |
| **-aG in usermod?** | WITHOUT -a: ALL existing secondary groups REPLACED by new one (dangerous!). WITH -aG: new group APPENDED, all existing groups preserved. |
| **userdel vs. userdel -r?** | userdel: removes account, PRESERVES home directory. userdel -r: removes account AND permanently deletes home directory and files. |
| **grep vs. find?** | grep: searches INSIDE file content for text patterns. find: searches the FILESYSTEM for files by name, date, size, permissions, etc. |
| **What does pipe ( \| ) do?** | Passes output of first command as input to second command. Chain for multi-step filtering: cat auth.log \| grep 'FAILED' \| grep '192.168.1.5' |
| **Absolute vs. relative path?** | Absolute: starts from / root, works from anywhere (/home/analyst/logs). Relative: starts from current directory (logs/access.txt). |
| **What is a Primary Key?** | A column with a unique, non-NULL value in EVERY row. Uniquely identifies each record. One per table. Example: employee_id. |
| **Primary Key vs. Foreign Key?** | Primary Key: unique identifier within its own table. Foreign Key: references another table's PK. Creates the link between tables. Can have duplicates/NULLs. |
| **SQL vs. Linux for filtering?** | SQL: structured data in tables, can JOIN multiple tables, best for database logs. Linux grep/find: unstructured text files, cannot cross-reference files. |
| **SELECT * FROM employees?** | Returns ALL columns from every row in the employees table. * wildcard = all columns. Semicolon required to end the statement. |
| **LIKE 'East%' vs. LIKE 'N_'?** | East% = starts with 'East' followed by ANY characters (0 or more). N_ = starts with N followed by EXACTLY ONE character. |
| **AND vs. OR operator?** | AND: BOTH conditions must be true (narrows results). OR: EITHER condition can be true (broadens results). |
| **INNER JOIN vs. LEFT JOIN?** | INNER JOIN: only rows matching in BOTH tables. LEFT JOIN: ALL rows from left table + matching from right (NULLs where no match). Use LEFT JOIN to find employees without machines. |
| **FULL OUTER JOIN?** | Returns ALL rows from BOTH tables. Matches where possible. NULL fills unmatched sides. Use to get complete picture of employees AND machines with no exclusions. |
