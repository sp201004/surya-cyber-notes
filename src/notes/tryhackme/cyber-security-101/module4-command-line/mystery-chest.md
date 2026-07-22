| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Command Line / Bonus Revision |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | Command Line |

---

## Objective

This Mystery Chest is a **bonus revision vault** for the entire Command Line module. It consolidates the most-used commands across the three environments you met in the rooms — Windows Command Prompt (CMD), Windows PowerShell, and Linux shells — plus bash scripting syntax, into one quick-reference place.

Use it as a lookup reference before a lab, an exam, or an interview. Everything here was covered across the module: the Windows CMD room, the Windows PowerShell room, and the Linux shells room.

---

## Windows Command Prompt (CMD) Reference

The default command line interpreter on Windows is `cmd.exe`. These are the core commands grouped by task.

### System Information

| Command | Purpose |
|---------|---------|
| `set` | Display environment variables. |
| `ver` | Display the Windows version. |
| `systeminfo` | Display detailed system information. |
| `help` | Display command help. |
| `cls` | Clear the terminal screen. |
| `command /?` | Display help for a specific command. |

### Networking

| Command | Purpose |
|---------|---------|
| `ipconfig` | Basic network configuration. |
| `ipconfig /all` | Detailed configuration including MAC and DNS. |
| `ping target` | Test network connectivity. |
| `tracert target` | Trace the network path to a destination. |
| `nslookup domain` | Perform a DNS lookup. |
| `nslookup domain DNS_SERVER` | Query a specific DNS server. |
| `netstat -a` | Active connections and listening ports. |
| `netstat -b` | Show associated executables. |
| `netstat -o` | Show the owning process ID (PID). |
| `netstat -n` | Show numerical addresses and ports. |
| `netstat -abon` | Connections, ports, executables, PIDs, numeric addresses. |

### Directory & File Management

| Command | Purpose |
|---------|---------|
| `cd directory` | Change directory (`cd ..` moves to parent). |
| `dir` | List directory contents (`dir /a` includes hidden/system files). |
| `dir /s` | Recursively list files in subdirectories. |
| `tree` | Display the directory hierarchy. |
| `mkdir folder` | Create a directory. |
| `rmdir folder` | Remove a directory. |
| `type file.txt` | Display file contents. |
| `more file.txt` | Read a long text file page by page. |
| `copy source destination` | Copy a file. |
| `move source destination` | Move a file. |
| `del file` / `erase file` | Delete a file. |

### Process, Maintenance & Power

| Command | Purpose |
|---------|---------|
| `tasklist` | List running processes. |
| `tasklist /FI "imagename eq process.exe"` | Filter processes by image name. |
| `taskkill /PID PID` | Terminate a process by PID. |
| `chkdsk` | Check disks and the file system. |
| `driverquery` | Display installed device drivers. |
| `sfc /scannow` | Scan and repair corrupted system files. |
| `shutdown /s` | Shut down the system. |
| `shutdown /r` | Restart the system. |
| `shutdown /a` | Abort a scheduled shutdown. |

Typical enumeration sequence on a Windows host:

```cmd
systeminfo
ipconfig /all
netstat -abon
tasklist
dir /a
```

> **Security relevance:** Command line knowledge matters because security professionals frequently work without a GUI. The same enumeration commands used for troubleshooting and system administration are equally valuable for defensive security, incident response, and authorized penetration testing.

---

## Windows PowerShell Reference

PowerShell commands are **cmdlets** that follow a consistent `Verb-Noun` naming convention (for example `Get-Content`, `Set-Location`). Many classic CMD and Linux commands exist as aliases mapped onto these cmdlets.

### Discovery & Help

| Cmdlet | Purpose |
|--------|---------|
| `Get-Command` | List available commands. |
| `Get-Command -CommandType "Function"` | List commands of a given type. |
| `Get-Command -Name Remove*` | Find commands by name pattern. |
| `Get-Help Get-Date` | Show help for a cmdlet. |
| `Get-Help Get-Date -Examples` | Show usage examples. |
| `Get-Help Get-Date -Full` | Show full help. |
| `Get-Alias` | List cmdlet aliases. |

### File System & Modules

| Cmdlet | Purpose |
|--------|---------|
| `Get-ChildItem` | List directory contents (like `dir`/`ls`). |
| `Set-Location -Path ".\Documents"` | Change directory. |
| `New-Item -Path ".\folder" -ItemType "Directory"` | Create a folder. |
| `New-Item -Path ".\file.txt" -ItemType "File"` | Create a file. |
| `Remove-Item -Path ".\file.txt"` | Delete an item. |
| `Copy-Item -Path .\file.txt -Destination .\file2.txt` | Copy a file. |
| `Move-Item -Path .\file.txt -Destination .\folder` | Move a file. |
| `Get-Content -Path ".\file.txt"` | Display file contents. |
| `Find-Module -Name "PowerShell*"` | Search for modules. |
| `Install-Module -Name "PowerShellGet"` | Install a module. |

### Piping, Filtering & Analysis

Cmdlets pass objects (not just text) down the pipeline, so you filter and sort on properties:

```powershell
Get-ChildItem | Sort-Object Length -Descending
Get-ChildItem | Where-Object -Property "Extension" -eq ".txt"
Get-ChildItem | Where-Object -Property "Name" -like "ship*"
Get-ChildItem | Where-Object -Property Length -gt 100
Get-ChildItem | Select-Object Name,Length
Get-ChildItem | Sort-Object Length -Descending | Select-Object -First 1
Select-String -Path ".\file.txt" -Pattern "text"
```

Common system, network, real-time, and remote cmdlets:

```powershell
Get-ComputerInfo
Get-LocalUser
Get-NetIPConfiguration
Get-NetIPAddress
Get-NetTCPConnection
Get-Process
Get-Service
Get-FileHash -Path .\file.txt
Get-Item -Path "C:\path\file.txt" -Stream *
Invoke-Command -ComputerName RoyalFortune -ScriptBlock { Get-Service }
```

> **Security relevance:** PowerShell works with structured objects rather than plain text, which makes filtering, hashing, and remote execution powerful for both administrators and attackers. `Get-FileHash` supports integrity checks, while `Invoke-Command` enables remote actions across hosts.

---

## Linux Shells & Commands

A shell is the interpreter between the user and the operating system. Bash is the common default; Zsh is a popular alternative.

| Command | Purpose |
|---------|---------|
| `pwd` | Print the current working directory. |
| `cd` | Change directory. |
| `ls` | List directory contents. |
| `cat` | Display file contents. |
| `grep` | Search for text or patterns. |
| `echo $SHELL` | Display the current/default shell path. |
| `cat /etc/shells` | List valid installed login shells. |
| `zsh` | Start the Zsh shell. |
| `chsh -s /usr/bin/zsh` | Change the default login shell. |
| `history` | Display command history. |
| `nano file.sh` | Create or edit a shell script. |
| `chmod +x file.sh` | Add executable permission. |
| `./file.sh` | Execute a script from the current directory. |
| `sudo su` | Switch to a root shell. |

Creating and running a script follows a consistent pattern:

```bash
nano file.sh
chmod +x file.sh
./file.sh
```

> **Security relevance:** Checking the active shell with `echo $SHELL` and listing valid shells in `/etc/shells` matters during investigations — attackers sometimes set unusual or non-interactive login shells to maintain or hide access. Making a script executable with `chmod +x` before running it is a routine but important step.

---

## Bash Scripting Syntax

Every bash script starts with a **shebang** telling the system which interpreter to use.

| Element | Syntax |
|---------|--------|
| **Shebang** | `#!/bin/bash` |
| **Comment** | `# This is a comment` |
| **Variable** | `name="John"` |
| **Access variable** | `echo "$name"` |
| **User input** | `read name` |

Control flow and loops:

```bash
#!/bin/bash
# For loop
for i in {1..10}; do
    echo "$i"
done
```

```bash
# If / Elif / Else
if [ condition1 ]; then
    command1
elif [ condition2 ]; then
    command2
else
    command3
fi
```

String and numeric comparisons, plus multiple conditions:

```bash
# String comparison
if [ "$name" = "John" ]; then
    echo "Match"
fi

# Numeric equality
if [ "$i" -eq 1 ]; then
    echo "i is 1"
fi

# Multiple conditions using AND
if [ "$username" = "John" ] && [ "$pin" = "7385" ]; then
    echo "Authentication Successful"
fi
```

> **Security relevance:** Bash scripts automate enumeration and repetitive tasks, but they also appear in malware and simple authentication checks. Note that string comparison uses `=` while numeric comparison uses `-eq`; mixing them is a common source of logic bugs.

---

## CMD vs PowerShell vs Bash Comparison

Many everyday tasks map cleanly across all three environments:

| Task | CMD | PowerShell | Bash |
|------|-----|------------|------|
| List directory | `dir` | `Get-ChildItem` | `ls` |
| Change directory | `cd` | `Set-Location` | `cd` |
| Display file | `type` | `Get-Content` | `cat` |
| Copy file | `copy` | `Copy-Item` | `cp` |
| Move file | `move` | `Move-Item` | `mv` |
| Delete file | `del` / `rmdir` | `Remove-Item` | `rm` |
| System info | `systeminfo` | `Get-ComputerInfo` | `uname -a` |
| Network config | `ipconfig` | `Get-NetIPConfiguration` | `ip addr` |
| Search text | `findstr` | `Select-String` | `grep` |

> **Security relevance:** Knowing the equivalents across environments means you can enumerate, read files, and inspect the network on any host you land on, regardless of operating system or which shell is available.

---

## Quick Revision

| Concept | Recall |
|---------|--------|
| CMD interpreter | `cmd.exe` |
| CMD enumeration | `systeminfo`, `ipconfig /all`, `netstat -abon`, `tasklist` |
| PowerShell naming | `Verb-Noun` cmdlets, e.g. `Get-Content` |
| PowerShell discovery | `Get-Command`, `Get-Help`, `Get-Alias` |
| PowerShell pipeline | Passes objects; filter with `Where-Object`, sort with `Sort-Object` |
| Linux shell check | `echo $SHELL`, `cat /etc/shells` |
| Run a script | `chmod +x file.sh` then `./file.sh` |
| Bash comparisons | `=` for strings, `-eq` for numbers |

**Key idea:** Every environment does the same core jobs — inspect the system, read files, check the network, automate work — so learning how CMD, PowerShell, and bash map to each other lets you operate anywhere.

---

## 30-Second Revision

- CMD's default interpreter is `cmd.exe`; enumerate with `systeminfo`, `ipconfig /all`, `netstat -abon`, and `tasklist`.
- PowerShell cmdlets follow `Verb-Noun`; discover them with `Get-Command`, `Get-Help`, and `Get-Alias`.
- PowerShell pipes objects, so you filter with `Where-Object` and sort with `Sort-Object` on real properties.
- Linux shells sit between you and the OS; check the active shell with `echo $SHELL` and installed shells with `cat /etc/shells`.
- Make a script runnable with `chmod +x file.sh`, then execute it with `./file.sh`.
- Bash scripts open with the shebang `#!/bin/bash`; use `=` for string comparison and `-eq` for numeric comparison.
- Core tasks map across CMD, PowerShell, and bash, so command line skills transfer between operating systems.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is the default command line interpreter on Windows?** | `cmd.exe` is the default Command Prompt interpreter, while PowerShell is the more advanced modern shell. |
| **Q2. What naming convention do PowerShell cmdlets follow?** | They use a `Verb-Noun` format, such as `Get-Content`, `Set-Location`, and `Remove-Item`, which makes commands predictable and discoverable. |
| **Q3. Why is the PowerShell pipeline different from CMD or bash piping?** | PowerShell passes structured objects down the pipeline rather than plain text, so you can filter and sort on object properties with cmdlets like `Where-Object` and `Sort-Object`. |
| **Q4. How do you make a bash script executable and run it?** | Add execute permission with `chmod +x file.sh`, then run it from the current directory with `./file.sh`. |
| **Q5. What is the difference between `=` and `-eq` in bash conditions?** | `=` compares strings while `-eq` compares numbers; using the wrong one is a common logic error in scripts. |

## Final Takeaway

The Mystery Chest is your one-page memory aid for the Command Line module. Skim it before any task at a terminal: the CMD commands, PowerShell cmdlets, Linux shell commands, and bash scripting syntax here cover the vast majority of what you will meet on Windows or Linux. Because the same core jobs recur in every environment, mastering how they map to one another is what makes you comfortable on any command line you encounter.
