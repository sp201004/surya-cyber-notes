| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Linux / Shells & Scripting |
| **Difficulty** | Beginner |
| **Time** | ~45 Minutes |
| **Module** | Command Line |

---

## Objective

This room explains what a Linux shell is, how to interact with one, and how to turn everyday commands into automated **shell scripts**. It moves from the basics of the command line into real Bash scripting with variables, loops, and conditionals.

By the end of this room you will be able to:

- Explain what a shell is and how it sits between the user and the OS
- Use core commands: `pwd`, `cd`, `ls`, `cat`, and `grep`
- Compare Bash, Fish, and Zsh, and switch or change your default shell
- Write Bash scripts using a shebang, variables, user input, loops, and conditionals
- Make scripts executable and run them
- Solve the Locker Script and the practical log-searching exercise

---

## Task 1 — Introduction to Linux Shells

### What is a Shell?

A **shell** acts as an interface or facilitator between the **user** and the **Operating System (OS)**. It lets you interact with the OS by entering commands through a **Command Line Interface (CLI)** instead of relying on the **Graphical User Interface (GUI)**.

```text
User
  │
  ▼
Shell
  │
  ▼
Operating System
  │
  ▼
Hardware / System Resources
```

### GUI vs CLI

| Interface | Characteristics |
|-----------|-----------------|
| **GUI** | Graphical interaction, mouse clicks, menus and buttons; easier for regular users. |
| **CLI** | Text-based commands; faster for admin tasks, more control, resource-efficient, and useful for automation. |

A simple analogy: think of the OS as a **kitchen**. The GUI is ordering food from a menu, the CLI is going into the kitchen yourself, and the shell helps you prepare the food using instructions and recipes.

Shells are especially important for Linux administration, cybersecurity, penetration testing, incident response, automation, DevOps, server management, and scripting.

> **Tip:** Using a CLI gives you more direct power and control over system operations than clicking through a GUI ever will.

The facilitator between the user and the OS is the **Shell**.

---

## Task 2 — How To Interact With a Shell

Most Linux distributions use **Bash (Bourne Again Shell)** as the commonly available default shell. A typical shell prompt looks like this:

```bash
user@tryhackme:~$
```

The prompt breaks down as follows:

| Part | Meaning |
|------|---------|
| **user** | Current username |
| **tryhackme** | Hostname |
| **~** | Current directory (home directory) |
| **$** | Regular user prompt |
| **#** | Usually the root user prompt |

An example root prompt looks like this:

```bash
root@tryhackme:/home/user#
```

### Basic Linux Shell Commands

**Print Working Directory — `pwd`** shows the directory you are currently inside:

```bash
user@tryhackme:~$ pwd
/home/user
```

**Change Directory — `cd`** moves you between directories:

```bash
cd Documents
cd /var/log
cd ..
cd ~
```

| Command | Meaning |
|---------|---------|
| `cd Documents` | Enter the Documents directory. |
| `cd /var/log` | Go to `/var/log` using an absolute path. |
| `cd ..` | Move one directory up. |
| `cd ~` | Go to the home directory. |

**List Directory Contents — `ls`** displays files and directories:

```bash
ls
```

```text
Desktop
Documents
Downloads
Music
Pictures
Public
Templates
Videos
```

**Display File Contents — `cat`** reads a file:

```bash
cat filename.txt
```

```text
this is a sample file
this is the second line of the file
```

**Search Inside Files — `grep`** searches for a word or pattern inside files:

```bash
grep THM dictionary.txt
```

```text
The flag is THM
```

> **Security relevance:** `grep` is invaluable when working with large log files, configuration files, and security logs, or when hunting for specific strings and flags during an investigation or CTF.

The default shell in most Linux distributions is **Bash**, `ls` lists directory contents, and `grep` searches for content inside a file.

---

## Task 3 — Types of Linux Shells

Linux supports multiple shells, each offering different features for scripting, command history, tab completion, customization, syntax highlighting, and auto-correction. This room focuses on **Bash**, **Fish**, and **Zsh**.

### Checking, Listing, and Switching Shells

Display the current shell path with the `$SHELL` environment variable:

```bash
user@tryhackme:~$ echo $SHELL
/bin/bash
```

The file `/etc/shells` contains the valid installed login shells. View it with:

```bash
cat /etc/shells
```

```text
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/bin/dash
/usr/bin/dash
/usr/bin/tmux
/usr/bin/screen
/bin/zsh
/usr/bin/zsh
```

To switch to another installed shell for the current session, simply enter its name:

```bash
zsh
```

To permanently change your default login shell, use `chsh` (change shell) with the `-s` flag to specify the new shell:

```bash
chsh -s /usr/bin/zsh
```

### Bash — Bourne Again Shell

**Bash** stands for *Bourne Again Shell*. It is one of the most widely used Linux shells and the default on many systems, built as an enhanced replacement for older Unix shells.

- Widely used with broad compatibility
- Powerful scripting capabilities and large amount of documentation
- Tab completion and command history

While typing a command or file name, press **TAB** to auto-complete or list possible matches. Bash also tracks previously executed commands, viewable with `history` and navigable with the ↑ Up and ↓ Down arrow keys:

```bash
history
```

### Fish — Friendly Interactive Shell

**Fish** stands for *Friendly Interactive Shell*. It focuses heavily on user-friendliness and is generally not the default shell in most distributions.

- Beginner-friendly syntax and auto spell correction
- Customizable command prompt and advanced tab completion
- Command history and scripting support

Its major advantage is that **syntax highlighting is built in**, displaying different command components differently to make commands easier to read and mistakes easier to spot.

### Zsh — Z Shell

**Zsh** stands for *Z Shell*. It is a modern shell combining functionality from several older shells and can be highly customized using frameworks and plugins.

- Advanced tab completion and powerful scripting
- Auto spell correction and extensive customization
- Command history, plugin support, and syntax highlighting through plugins

### Bash vs Fish vs Zsh

| Feature | Bash | Fish | Zsh |
|---|---|---|---|
| Full Name | Bourne Again Shell | Friendly Interactive Shell | Z Shell |
| Scripting | Excellent & widely compatible | More limited than Bash/Zsh | Excellent |
| Tab Completion | Basic | Advanced suggestions | Advanced and extensible |
| Customization | Basic | Interactive tools | Highly customizable |
| User Friendliness | Traditional | Very user-friendly | Highly user-friendly when customized |
| Auto Spell Correction | No | Yes | Yes |
| Syntax Highlighting | Not built-in | Built-in | Available through plugins |

The shell with out-of-the-box syntax highlighting is **Fish**, the shell without auto spell correction is **Bash**, and the command that displays all previously executed commands of the current session is **history**.

---

## Task 4 — Shell Scripting and Components

A **shell script** is a file containing a sequence of commands that can be executed automatically. Instead of typing several commands one by one, you place them in a script and run it once.

Shell scripts bring automation, save time, reduce repetitive manual work, reduce human errors, and are valuable for both system administration and cybersecurity. Bash scripts normally use the `.sh` extension (for example, `first_script.sh`).

### Creating a Script

Create or edit a script with the Nano text editor:

```bash
nano first_script.sh
```

### Shebang

A script generally begins with a **shebang**, which starts with `#!` and specifies which interpreter should execute the script. For Bash:

```bash
#!/bin/bash
```

This line means "execute this script using the Bash interpreter."

### Variables

A **variable** stores a value that can be reused later. Assign a value and access it with the `$` prefix:

```bash
name="John"
echo $name
```

### Taking User Input

The `read` command takes input from the user and stores it in a variable:

```bash
#!/bin/bash

echo "Hey, what's your name?"
read name
echo "Welcome, $name"
```

Running the script produces:

```text
Hey, what's your name?
John
Welcome, John
```

### Script Permissions & Execution

Before executing a script directly, it needs executable permission. Use `chmod` with `+x` to add the execute permission:

```bash
chmod +x first_script.sh
./first_script.sh
```

The `./` tells the shell to execute the script located in the current directory. Without `./`, the shell searches the directories defined in the `PATH` environment variable instead.

### Loops

Loops perform repetitive or iterative tasks. This loop prints the numbers 1 to 10:

```bash
#!/bin/bash

for i in {1..10};
do
    echo $i
done
```

| Element | Purpose |
|---------|---------|
| `for i in {1..10}` | Iterate `i` over the values 1 through 10. |
| `do` | Start of the loop body. |
| `echo $i` | Action performed each iteration. |
| `done` | End of the loop. |

Make it executable and run it:

```bash
chmod +x loop_script.sh
./loop_script.sh
```

```text
1
2
3
4
5
6
7
8
9
10
```

### Conditional Statements

Conditional statements execute code depending on whether a condition is true or false:

```bash
if [ condition ]; then
    # Code if condition is true
else
    # Code if condition is false
fi
```

| Keyword | Purpose |
|---------|---------|
| `if` | Starts the condition. |
| `then` | Code to execute if the condition is true. |
| `elif` | Check another condition. |
| `else` | Execute if previous conditions fail. |
| `fi` | Ends the conditional block. |

Example — a user authorization check:

```bash
#!/bin/bash

echo "Please enter your name first:"
read name

if [ "$name" = "Stewart" ]; then
    echo "Welcome Stewart! Here is the secret: THM_Script"
else
    echo "Sorry! You are not authorized to access the secret."
fi
```

Authorized input returns the secret, while any other name is denied:

```text
Please enter your name first:
Stewart
Welcome, Stewart! Here is the secret: THM_Script
```

```text
Please enter your name first:
Alex
Sorry! You are not authorized to access the secret.
```

### Comments

Comments explain code and do not affect execution. Single-line comments start with `#`. They improve readability, explain complex logic, and help others understand the code:

```bash
#!/bin/bash

# Ask the user for their name
echo "Please enter your name first:"

# Store user input
read name

# Check whether the user is authorized
if [ "$name" = "Stewart" ]; then
    # Authorized user
    echo "Welcome Stewart! Here is the secret: THM_Script"
else
    # Unauthorized user
    echo "Sorry! You are not authorized to access the secret."
fi
```

The shebang used in a Bash script is **`#!/bin/bash`**, the command that gives executable permissions to a script is **`chmod +x`**, and the scripting functionality that helps configure iterative tasks is **loops**.

---

## Task 5 — The Locker Script

The Locker challenge combines variables, loops, conditional statements, and user input into a single authentication script. The script asks for a **Username**, **Company Name**, and **PIN**, and only grants access when all three match.

| Field | Correct value |
|-------|---------------|
| **Username** | John |
| **Company Name** | Tryhackme |
| **PIN** | 7385 |

```bash
#!/bin/bash

# Defining the variables
username=""
companyname=""
pin=""

# Defining the loop
for i in {1..3}; do

    # Defining the conditional statements
    if [ "$i" -eq 1 ]; then

        echo "Enter your Username:"
        read username

    elif [ "$i" -eq 2 ]; then

        echo "Enter your Company name:"
        read companyname

    else

        echo "Enter your PIN:"
        read pin

    fi

done

# Checking if the user entered the correct details
if [ "$username" = "John" ] && [ "$companyname" = "Tryhackme" ] && [ "$pin" = "7385" ]; then
    echo "Authentication Successful. You can now access your locker, John."
else
    echo "Authentication Denied!!"
fi
```

### How the Locker Script Works

The script first initializes three empty variables (`username`, `companyname`, `pin`), then loops three times to collect one value per iteration:

| Iteration | Condition | Prompt |
|-----------|-----------|--------|
| `i = 1` | `if [ "$i" -eq 1 ]` | Enter your Username: |
| `i = 2` | `elif [ "$i" -eq 2 ]` | Enter your Company name: |
| `i = 3` | `else` | Enter your PIN: |

Finally, the `&&` operator (logical **AND**) requires all three values to be correct at once:

```text
Username Correct
      AND
Company Correct
      AND
PIN Correct
      │
      ▼
Authentication Successful
```

If even one value is incorrect, the script prints **Authentication Denied!!**. The correct PIN to authenticate in the locker script is **7385**.

---

## Task 6 — Practical Exercise

A script placed inside `/home/user` searches for a specific keyword inside files with the `.log` extension in a specified directory. To search across directories where a regular user may lack permissions, first become the root user:

```bash
sudo su
```

```text
user@tryhackme:~$ sudo su
[sudo] password for user:
root@tryhackme:/home/user#
```

> **Warning:** Use root privileges carefully. Root has unrestricted control over the system.

The script must be configured with these values by finding the empty double quotes (`""`) inside the provided script and filling them in without adding unwanted spaces:

| Setting | Value |
|---------|-------|
| **Flag/keyword** | thm-flag01-script |
| **Directory** | /var/log |

Conceptually, the script scans `/var/log`, finds the `.log` files, searches each for the keyword `thm-flag01-script`, and returns the matching file.

The file that contains the keyword is **authentication.log**, and the cat is sleeping **under the table**.

---

## Quick Revision

| Area | Key points |
|------|-----------|
| **Shell** | Interface between the user and the OS via the CLI. |
| **Core commands** | `pwd`, `cd`, `ls`, `cat`, `grep`. |
| **Shell management** | `echo $SHELL`, `cat /etc/shells`, `chsh -s`. |
| **Shell types** | Bash (default, powerful), Fish (friendly, built-in highlighting), Zsh (customizable). |
| **Scripting basics** | `#!/bin/bash`, variables, `read`, `chmod +x`, `./script.sh`. |
| **Constructs** | `for`/`do`/`done` loops, `if`/`elif`/`else`/`fi` conditionals, `#` comments. |

**Key idea:** A shell turns typed commands into a controllable interface to the OS, and shell scripting lets you chain those commands into reusable, automated programs with variables, loops, and conditionals.

---

## 30-Second Revision

- A shell is the facilitator between the user and the OS; the default on most distros is Bash.
- `pwd` prints the directory, `cd` changes it, `ls` lists contents, `cat` reads files, and `grep` searches inside them.
- Check your shell with `echo $SHELL`, list installed shells with `cat /etc/shells`, and change the default with `chsh -s`.
- Fish has built-in syntax highlighting; Bash has no auto spell correction; `history` shows past commands.
- Scripts start with the shebang `#!/bin/bash`, use `$variables`, `read` for input, need `chmod +x`, and run with `./script.sh`.
- Loops use `for`/`do`/`done`, conditionals use `if`/`elif`/`else`/`fi`, and `&&` chains conditions with logical AND.

---

## Cheat Sheet

| Command / Syntax | Purpose |
|------------------|---------|
| `pwd` | Print current working directory. |
| `cd` | Change directory. |
| `ls` | List directory contents. |
| `cat` | Display file contents. |
| `grep` | Search for text or patterns. |
| `echo $SHELL` | Display the current/default shell path. |
| `cat /etc/shells` | List valid installed login shells. |
| `chsh -s /usr/bin/zsh` | Change the default login shell. |
| `history` | Display command history. |
| `nano file.sh` | Create or edit a shell script. |
| `chmod +x file.sh` | Add executable permission. |
| `./file.sh` | Execute a script from the current directory. |
| `sudo su` | Switch to a root shell. |
| `#!/bin/bash` | Bash shebang line. |
| `name="John"` | Assign a variable. |
| `echo "$name"` | Access a variable. |
| `read name` | Take user input. |
| `for i in {1..10}; do ... done` | For loop. |
| `if [ ... ]; then ... fi` | Conditional block. |
| `[ "$i" -eq 1 ]` | Numeric equality test. |
| `[ "$name" = "John" ]` | String comparison. |
| `[ ... ] && [ ... ]` | Combine conditions with logical AND. |

---

## Interview Questions

**Q1. What is a shell and where does it sit?**
A shell is an interface between the user and the operating system. It accepts typed commands through the CLI and passes them to the OS, which in turn controls the hardware.

**Q2. How do you check and permanently change your default shell?**
Run `echo $SHELL` to see the current shell path and `cat /etc/shells` to list installed shells. Use `chsh -s /usr/bin/zsh` to permanently change the default login shell.

**Q3. What is the difference between Bash, Fish, and Zsh?**
Bash is the widely-used default with powerful, portable scripting. Fish is very user-friendly with built-in syntax highlighting and auto-correction. Zsh is highly customizable with advanced completion and plugin support.

**Q4. What does the shebang do?**
The shebang (`#!/bin/bash`) is the first line of a script and tells the system which interpreter should execute the file.

**Q5. Why do you run a script with `./script.sh` instead of just `script.sh`?**
The `./` tells the shell to run the script from the current directory. Without it, the shell only searches the directories listed in the `PATH` environment variable.

**Q6. How does the Locker Script enforce all three credentials?**
It uses the `&&` (logical AND) operator so the username, company name, and PIN must all match at once; if any single value is wrong, authentication is denied.

---

## Final Takeaway

Linux shells are the gateway between you and the operating system, and mastering them means both using the CLI fluently and automating it with scripts. Starting from core commands like `pwd`, `cd`, `ls`, `cat`, and `grep`, this room builds up through the Bash, Fish, and Zsh shells into full Bash scripting with shebangs, variables, user input, loops, and conditionals. The Locker Script and the log-searching exercise show how those pieces combine into real tools for authentication and investigation — exactly the kind of automation that system administrators and security professionals rely on every day.
