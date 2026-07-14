## Contents

- [The Filesystem Hierarchy Standard (FHS)](#the-filesystem-hierarchy-standard-fhs)
- [Navigation Commands](#navigation-commands)
- [Reading File Contents](#reading-file-contents)
- [Managing Directories and Files](#managing-directories-and-files)
- [Finding and Filtering Data](#finding-and-filtering-data)
- [Permissions and Security (Authorization)](#permissions-and-security-authorization)
- [User Management (Authentication)](#user-management-authentication)
- [Getting Help in Linux](#getting-help-in-linux)
- [Complete Command Quick-Reference Card](#complete-command-quick-reference-card)

## The Filesystem Hierarchy Standard (FHS)

> **IMPORTANT: Golden Rule: Linux is 100% Case-Sensitive**
> 'Desktop' and 'desktop' are TWO COMPLETELY DIFFERENT directories.
> 'Report.txt' and 'report.txt' are TWO DIFFERENT files.
> This is a constant source of errors for beginners. Always check your case.

> **FHS DIRECTORY TREE — Full Structure**
> **LINUX FILESYSTEM TREE (FHS):**
> **/ (Root -- top of everything. Every file lives under here.)**
> **|**

```
  +-- /home       User personal directories
  |     +-- /home/analyst     Your home directory (you start here)
  |     +-- /home/alice       Another user's home
  |
  +-- /bin        Core binary commands (ls, cat, chmod, grep)
  |
  +-- /etc        System-wide configuration files
  |               (network config, user passwords, services)
  |
  +-- /var        Variable data that changes frequently
  |     +-- /var/log          System and application log files
  |     +-- /var/mail         Email storage
  |
  +-- /tmp        Temporary files (cleared on reboot)
  |               SECURITY NOTE: World-writable. Malware often
  |               writes here. Monitor /tmp closely.
  |
  +-- /usr        User programs and libraries
  |     +-- /usr/bin          Most user-installed commands
  |     +-- /usr/lib          Shared libraries
  |
  +-- /root       Root user's home directory (NOT /home/root)
  |
  +-- /proc       Virtual filesystem -- live kernel/process info
                  (not real files on disk, generated in memory)
```

| **Path Type** | **Definition** | **Example** |
| --- | --- | --- |
| **Absolute Path** | Starts from root (/). Works from ANY directory. Always unambiguous. | /home/analyst/logs/access.txt |
| **Relative Path** | Starts from your CURRENT directory. Shorter but context-dependent. | If you are in /home/analyst: just use logs/access.txt |
| **~  (Tilde)** | Shortcut for your home directory. Expands to /home/username. | cd ~ is same as cd /home/analyst |
| **.  (Single dot)** | Represents the CURRENT directory. | ./script.sh runs script in current folder |
| **.. (Double dot)** | Represents the PARENT directory (one level up). | cd .. moves from /home/analyst to /home |

## Navigation Commands

```bash
pwd — Print Working Directory — shows your exact current location
Syntax: pwd
$ pwd   →  /home/analyst/projects  (you are HERE)
```

```bash
ls — List — shows contents of a directory
Syntax: ls [options] [directory]
$ ls   → Lists files and folders in current directory
$ ls /etc   → Lists contents of /etc (absolute path)
$ ls -a   → Lists ALL files including HIDDEN files (names starting with .)
$ ls -l   → Long format: permissions, owner, group, size, date, name
$ ls -la   → Combined: ALL files in LONG format (most useful for security)
$ ls -l /var/log   → Long listing of /var/log directory
```

> **EXAMPLE: Reading ls -l Output**
> **-rw-r--r-- 1 analyst security 4096 May 15 09:32 report.txt**
> **|          | |       |        |    |              |**

```
  |          | |       |        |    |              +-- Filename
  |          | |       |        |    +-- Date last modified
  |          | |       |        +-- File size in bytes
  |          | |       +-- Group name
  |          | +-- Owner (username)
  |          +-- Number of hard links
  +-- Permission string (see the Permissions section for full explanation)
```

```bash
cd — Change Directory — move to a different folder
Syntax: cd [destination]
$ cd logs   → Move into 'logs' folder (relative path)
$ cd /etc   → Move to /etc (absolute path)
$ cd ..   → Go UP one level to parent directory
$ cd ~   → Go directly to your home directory
$ cd -   → Go back to the PREVIOUS directory you were in
$ cd /var/log/apache2   → Move directly to apache2 logs (absolute)
```

## Reading File Contents

```bash
cat — Concatenate — dumps entire file contents to screen
Syntax: cat [file]
$ cat report.txt   → Prints entire file. Good for SHORT files.
$ cat file1.txt file2.txt   → Prints both files one after the other
$ cat /etc/passwd   → Reads the user account file (analyst use case)
```

```bash
head / tail — Show first (head) or last (tail) N lines of a file (default: 10 lines)
Syntax: head/tail [-n N] [file]
$ head access.log   → Shows first 10 lines of access log
$ tail access.log   → Shows last 10 lines (most recent entries)
$ tail -n 20 syslog   → Shows last 20 lines
$ tail -f /var/log/syslog   → FOLLOW mode: shows new lines in REAL-TIME as they are written
```

> **TIP: tail -f for Live Log Monitoring**
> tail -f /var/log/auth.log
> The -f (follow) flag makes tail CONTINUOUSLY update as new lines are written to the file.
> Security use: Monitor authentication logs LIVE during a suspected brute-force attack.
> Every failed or successful login attempt appears on screen in real-time as it happens.
> Press CTRL+C to stop following.

```bash
less — View large files one page at a time — prevents screen flooding
Syntax: less [file]
$ less massive_access.log   → Opens file for paged reading
$    →    Spacebar: next page, b: previous page,  q: quit,  /search: search in file
```

## Managing Directories and Files

| **Command** | **Syntax** | **What It Does** | **Key Notes** |
| --- | --- | --- | --- |
| **mkdir** | mkdir [name] | Creates a new directory (folder). | mkdir drafts  \|  mkdir -p a/b/c (creates nested dirs) |
| **rmdir** | rmdir [name] | Deletes an EMPTY directory. | Safety feature: ONLY works if dir is empty. Use rm -r for non-empty. |
| **touch** | touch [filename] | Creates a new EMPTY file. | touch report.txt  \|  Also updates file timestamp if file exists. |
| **rm** | rm [file] | Permanently DELETES a file. NO recycle bin. | rm report.txt  \|  rm -r folder (recursively delete folder + contents)  \|  WARNING: rm -rf / destroys everything! |
| **cp** | cp [source] [dest] | Copies a file or directory. | cp report.txt /backup/  \|  cp -r folder/ /backup/ (recursive for dirs) |
| **mv** | mv [source] [dest] | Moves file OR renames it (same dir). | mv old.txt /archive/  (move)  \|  mv old.txt new.txt (rename) |
| **nano** | nano [file] | Opens beginner-friendly text editor. | CTRL+O = Save  \|  CTRL+X = Exit  \|  CTRL+W = Search  \|  CTRL+K = Cut line |

### Output Redirection — Writing Command Output to Files

```bash
OUTPUT REDIRECTION — > vs >>

OVERWRITE (>): Replaces entire file content
echo 'Incident detected at 14:32' > incident_log.txt
ls /etc > etc_contents.txt

APPEND (>>): Adds to END of file without deleting existing content
echo 'Follow-up action taken at 15:00' >> incident_log.txt
ps aux >> running_processes.txt

REDIRECT + CREATE: If file doesn't exist, both > and >> create it.

ANALOGY:
> is like CTRL+A then DELETE then type (wipes everything, starts fresh)
>> is like pressing END then Enter then type (adds to the bottom)
```

## Finding and Filtering Data

> **KEY CONCEPT: The Analyst's Core Task**
> Security analysts spend enormous time finding specific information inside massive datasets.
> Typical scenario: A 50GB log file has 50 million lines. You need lines containing one specific IP address.
> Manual reading is impossible. grep, find, and pipe are the tools that make this feasible.

```bash
grep — Search INSIDE files for lines matching a pattern — prints matching lines only
Syntax: grep [options] 'pattern' [file]
$ grep 'ERROR' system.log   → Find all error lines in system.log
$ grep 'FAILED' /var/log/auth.log   → Find all failed login attempts
$ grep -i 'error' system.log   → -i = case-insensitive (matches ERROR, Error, error)
$ grep -r 'password' /etc   → -r = search recursively in ALL files under /etc
$ grep -n 'ERROR' system.log   → -n = show LINE NUMBERS next to matches
$ grep -v 'INFO' system.log   → -v = INVERT: show lines that do NOT contain 'INFO'
$ grep '192.168.1.100' access.log   → Find all requests from a specific IP address
$ grep -c 'FAILED' auth.log   → -c = count how many lines matched (no output of lines)
```

```bash
| — PIPE — sends output of first command as input to second command
Syntax: command1 | command2
$ ls /etc | grep 'network'   → List /etc then filter for 'network' in filenames
$ ps aux | grep 'apache'   → Show running processes then find apache processes
$ cat auth.log | grep 'FAILED' | grep '192.168.1.50'   → multi-filter: find failed logins FROM specific IP
$ ls -l | grep '^d'   → List only DIRECTORIES (entries starting with 'd')
$ history | grep 'sudo'   → Find all previously used sudo commands
```

> **TIP: Pipe Analogy**
> Think of pipe as a physical plumbing pipe:
> First command produces water (output). Pipe carries that water. Second command receives and filters it.
> You can chain MULTIPLE pipes:
> cat access.log | grep 'POST' | grep '500' | grep '2024-05-15'
> = Find all HTTP POST requests that returned a 500 error on May 15, 2024
> Each pipe narrows the dataset further -- from millions of lines to exactly what you need.

```bash
find — Search the FILESYSTEM for files/directories matching conditions
Syntax: find [path] [criteria]
$ find /home -name '*.log'   → Find all .log files under /home
$ find / -name 'secret.txt'   → Search entire filesystem for secret.txt (case-sensitive)
$ find / -iname 'secret.txt'   → -iname = case-INSENSITIVE search
$ find /var/log -mtime -3   → Files MODIFIED in the last 3 days
$ find /tmp -mtime -1   → Files modified in the last 1 day in /tmp (check for recent malware drops)
$ find / -perm -4000   → Find SUID files (potential privilege escalation targets)
$ find / -size +100M   → Find files larger than 100 MB (data exfiltration indicator)
$ find /home -user analyst   → Find all files owned by user 'analyst'
```

## Permissions and Security (Authorization)

> **KEY CONCEPT: Principle of Least Privilege**
> Users should have ONLY the exact access they need to do their jobs -- nothing more.
> This is the most fundamental security principle applied at the filesystem level.
> Example: A web server process should be able to READ website files but NOT WRITE to them.
> If the web server is compromised, the attacker cannot modify website content.

### Understanding the 10-Character Permission String

> **PERMISSION STRING — Full Breakdown**
> **PERMISSION STRING FORMAT from ls -l:**
> **drwxrwxrwx**
> **|   |   |   |**

```
  |   |   |   +-- OTHER permissions (positions 8-10: everyone else)
  |   |   +------- GROUP permissions (positions 5-7: file's group)
  |   +----------- USER/OWNER permissions (positions 2-4)
  +--------------- FILE TYPE (position 1)

  POSITION 1 -- FILE TYPE:
  -  = Regular file
  d  = Directory
  l  = Symbolic link (shortcut)

  PERMISSION LETTERS (positions 2-10):
  r  = Read    (value: 4)
  w  = Write   (value: 2)
  x  = Execute (value: 1)
  -  = Permission NOT granted (value: 0)

  FULL EXAMPLES:
  -rw-r--r--  = Regular file. Owner can read+write. Group can read. Others can read.
  drwxr-xr-x  = Directory. Owner can rwx. Group can r-x. Others can r-x.
  -rwx------  = File. Owner can do everything. Group and Others have ZERO access.
  -rwxrwxrwx  = World-writable file. DANGEROUS: anyone can read, modify, execute.
```

### Numeric (Octal) Permission Notation

> **OCTAL PERMISSIONS — Number to Letter Translation**
> **Each permission group (owner/group/other) converts to a number:**
> **r=4, w=2, x=1, -=0**
> **rwx = 4+2+1 = 7   (full access)**
> **rw- = 4+2+0 = 6   (read + write, no execute)**
> **r-x = 4+0+1 = 5   (read + execute, no write)**
> **r-- = 4+0+0 = 4   (read only)**
> **--- = 0+0+0 = 0   (no access)**
> **COMMON PERMISSION SETS:**
> **chmod 755 script.sh   =  rwxr-xr-x  (owner full, others read+execute)**
> **chmod 644 report.txt  =  rw-r--r--  (owner read+write, others read only)**

```
  chmod 600 private.key =  rw-------  (ONLY owner can read+write -- SSH keys)
  chmod 700 script.sh   =  rwx------  (ONLY owner can do anything)
  chmod 777 file.txt    =  rwxrwxrwx  (world-writable -- AVOID in production)
```

```bash
chmod — Change file permissions (read/write/execute for user/group/other)
Syntax: chmod [who][+/-/=][permissions] [file]   OR   chmod [octal] [file]
$ chmod g+w reports.txt   →  ADD write permission for GROUP
$ chmod o-rwx secret.txt   →  REMOVE all permissions from OTHERS
$ chmod u+x script.sh   →  ADD execute permission for OWNER (to run a script)
$ chmod u=rwx,g=r,o=r pub.txt   →  SET exactly: owner full, group read-only, others read-only
$ chmod 755 deploy.sh   →  Octal: owner rwx, group r-x, others r-x
$ chmod 600 ~/.ssh/id_rsa   →  SSH private key: ONLY owner can read/write -- required by SSH
$ chmod 777 /tmp/test.txt   →  World-writable -- AVOID (security risk)
```

```bash
chown — Change file owner and/or group (requires sudo)
Syntax: chown [user]:[group] [file]
$ sudo chown alice data.txt   → Transfer ownership to user 'alice'
$ sudo chown :hr_team data.txt   →  Change GROUP to 'hr_team' (colon prefix = group)
$ sudo chown alice:hr_team data.txt   → Change BOTH owner to alice AND group to hr_team
$ sudo chown -R analyst /var/log/app   → Recursively change all files in folder
```

## User Management (Authentication)

> **IMPORTANT: sudo — Super User Do**
> **Logging in DIRECTLY as root is a massive security risk:**
> * Every command runs with unlimited power -- a typo can destroy the system.
> * Root login creates no user-level accountability (who did what?).
> * Root account is the #1 brute-force target.
> 
> sudo is the correct approach: grants ROOT privileges for ONE specific command only.
> After the command, privileges revert to normal user level automatically.
> sudo logs EVERY elevated command to /var/log/auth.log -- full accountability.
> 
> sudo apt update          (run apt as root for this one command only)
> sudo chmod 600 key.pem   (change permissions with root authority)

```bash
useradd — Create a new user account
Syntax: sudo useradd [options] [username]
$ sudo useradd jsmith   →  Create basic user account (no home dir by default on some systems)
$ sudo useradd -m jsmith   →  -m: create home directory /home/jsmith automatically
$ sudo useradd -g security jsmith   →  -g: set PRIMARY group to 'security'
$ sudo useradd -G admin,finance jsmith   →  -G: add to SUPPLEMENTAL groups 'admin' and 'finance'
$ sudo useradd -g security -G admin,finance -m jsmith   →  Full creation: home dir + primary + supplemental groups
```

```bash
usermod — Modify an existing user account's settings
Syntax: sudo usermod [options] [username]
$ sudo usermod -aG marketing jsmith   →  APPEND to group 'marketing' (the -a flag is CRITICAL)
$ sudo usermod -L jsmith   →  -L: LOCK account (user cannot login -- for departing employees)
$ sudo usermod -U jsmith   →  -U: UNLOCK a previously locked account
$ sudo usermod -g developers jsmith   →  Change PRIMARY group to 'developers'
```

> **IMPORTANT: CRITICAL: Always use -a with -G**
> WRONG: sudo usermod -G marketing jsmith
> This REPLACES all secondary groups with ONLY 'marketing'.
> If jsmith was in admin, finance, devops -- all gone instantly.
> 
> CORRECT: sudo usermod -aG marketing jsmith
> The -a flag means APPEND -- adds marketing WITHOUT removing existing groups.
> This is one of the most common and most damaging Linux user management mistakes.

```bash
userdel — Delete a user account from the system
Syntax: sudo userdel [options] [username]
$ sudo userdel jsmith   →  Delete user account. Home directory and files are PRESERVED.
$ sudo userdel -r jsmith   →  -r: Delete user AND permanently wipe home directory + mail spool.
```

### Viewing User and Group Information

```bash
USER INFORMATION COMMANDS
id [username]          # Show user's UID, GID, and all group memberships
id jsmith              # Output: uid=1001(jsmith) gid=1001(security) groups=...

whoami                 # Show CURRENT user's username

cat /etc/passwd        # List ALL user accounts on the system
# Format: username:x:UID:GID:comment:home:shell
# Example: analyst:x:1000:1000:Analyst User:/home/analyst:/bin/bash

cat /etc/group         # List ALL groups and their members
# Format: groupname:x:GID:member1,member2

cat /etc/shadow        # Hashed passwords (requires sudo -- security sensitive)
```

## Getting Help in Linux

```bash
man — Manual pages — complete official documentation for any command
Syntax: man [command]
$ man ls   →  Open full manual for the ls command (use q to quit)
$ man chmod   →  Read all chmod options and usage examples
$ man grep   →  Comprehensive grep documentation with all flags
$ man -k 'user'   →  Search all manuals for keyword 'user' (same as apropos)
```

```bash
whatis — One-line summary of what a command does
Syntax: whatis [command]
$ whatis cat   →  Output: concatenate files and print on the standard output
$ whatis chmod   →  Output: change file mode bits
$ whatis grep   →  Output: print lines that match patterns
```

```bash
apropos — Search ALL man pages for a keyword — use when you forgot the command name
Syntax: apropos [-a] [keyword(s)]
$ apropos password   →  Find all commands related to password management
$ apropos -a change password   →  Find commands related to BOTH 'change' AND 'password'
$ apropos network   →  Find all network-related commands and tools
$ apropos -a list user   →  Find commands for listing user information
```

## Complete Command Quick-Reference Card

### Navigation & File Reading

| **Command** | **Purpose** | **Key Options** |
| --- | --- | --- |
| **pwd** | Show current directory | (no options needed) |
| **ls** | List directory contents | -a (all/hidden), -l (long format), -la (both combined) |
| **cd [path]** | Change directory | .. (up), ~ (home), / (root), - (previous) |
| **cat [file]** | Print entire file | Combine files: cat file1 file2 |
| **head [file]** | First N lines (default 10) | -n 5 (show 5 lines) |
| **tail [file]** | Last N lines (default 10) | -n 5 (show 5 lines), -f (follow live output) |
| **less [file]** | Paged file viewing | Spacebar=next, q=quit, /=search |

### File & Directory Management

| **Command** | **Purpose** | **Key Example** |
| --- | --- | --- |
| **mkdir [name]** | Create directory | mkdir reports  \|  mkdir -p a/b/c |
| **rmdir [name]** | Remove EMPTY directory | rmdir oldreports |
| **touch [name]** | Create empty file | touch incident.txt |
| **rm [file]** | Delete file (permanent) | rm report.txt  \|  rm -r folder/  (use with caution) |
| **cp [src] [dst]** | Copy file or directory | cp file.txt /backup/  \|  cp -r folder/ /backup/ |
| **mv [src] [dst]** | Move or rename | mv old.txt /archive/  \|  mv old.txt new.txt |
| **nano [file]** | Text editor | CTRL+O save, CTRL+X exit, CTRL+W search |
| **echo 'text' > file** | Write to file (overwrite) | echo 'start' > log.txt |
| **echo 'text' >> file** | Append to file | echo 'more' >> log.txt |

### Finding & Filtering

| **Command** | **Purpose** | **Key Example** |
| --- | --- | --- |
| **grep 'pattern' file** | Search inside file for text | grep 'ERROR' sys.log  \|  grep -i -r 'password' /etc |
| **cmd1 \| cmd2** | Pipe output to next command | ls /etc \| grep 'conf'  \|  cat auth.log \| grep 'FAILED' |
| **find [path] [criteria]** | Find files on filesystem | find /tmp -mtime -1  \|  find / -name '*.log' |

### Permissions

| **Command** | **Purpose** | **Key Example** |
| --- | --- | --- |
| **ls -l** | View permissions | drwxr-xr-x  (d=dir, rwx=owner, r-x=group, r-x=others) |
| **chmod [mode] file** | Change permissions | chmod 600 key.pem  \|  chmod g+w report.txt |
| **chown [user:grp] file** | Change owner/group | sudo chown alice:team data.txt |

### User Management

| **Command** | **Purpose** | **Key Example** |
| --- | --- | --- |
| **sudo [command]** | Run as root (one command only) | sudo apt update  \|  sudo chmod 600 key |
| **useradd [options] user** | Create user | sudo useradd -m -g security jsmith |
| **usermod [options] user** | Modify user | sudo usermod -aG marketing jsmith  \|  -L (lock) |
| **userdel [-r] user** | Delete user | sudo userdel -r jsmith (-r removes home dir) |
| **id [user]** | View user's groups/UID | id jsmith |
| **whoami** | Show current username | (no options) |

### Getting Help

| **Command** | **Purpose** | **Key Example** |
| --- | --- | --- |
| **man [cmd]** | Full manual page | man chmod  (q to quit) |
| **whatis [cmd]** | One-line description | whatis grep |
| **apropos [keyword]** | Find command by keyword | apropos password  \|  apropos -a change password |

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What does pwd do?** | Print Working Directory -- shows your exact current location in the filesystem. Always run it if you are unsure where you are. |
| **ls -la vs ls?** | ls: basic listing. ls -l: long format with permissions, owner, size, date. ls -a: includes hidden files (dot-files). ls -la: combines both. |
| **Absolute vs. relative path?** | Absolute: starts from / (root), works from anywhere (e.g., /home/analyst/logs). Relative: starts from current directory (e.g., logs/access.txt). |
| **What does tail -f do?** | Follow mode: continuously displays NEW lines added to a file in real-time. Used to watch live logs during an active incident. Stop with CTRL+C. |
| **grep vs. find?** | grep: searches INSIDE files for text patterns. find: searches the FILESYSTEM for files/directories by name, date, size, permissions, etc. |
| **What does pipe ( \| ) do?** | Sends output of first command as input to second command. Enables chained filtering. E.g., cat auth.log \| grep 'FAILED' \| grep '10.0.0.5' |
| **chmod 600 key.pem -- what does this mean?** | Owner can read+write (6=rw). Group has NO access (0). Others have NO access (0). Required for SSH private keys -- SSH will refuse to use a key with wider permissions. |
| **Why -a flag matters in usermod -aG?** | Without -a: ALL existing supplemental groups are REPLACED by the new one. With -aG: new group is APPENDED, existing groups preserved. Forgetting -a causes accidental privilege removal. |
| **man vs. apropos vs. whatis?** | man [cmd]: full detailed manual page. whatis [cmd]: one-line description. apropos [keyword]: search all man pages for keyword (when you forgot the command name). |
