import { Module, Topic } from './types';
import { offensiveSecurityIntroRoom, defensiveSecurityIntroRoom } from './data/sharedIntroRooms';

const START_MODULE_ID = 'start-your-cyber-security-journey';

// Room 3 — Search Skills (new, verbatim note body from source_notes).
// The sidebar metadata below (mindmap / key takeaways / practice questions /
// real-world scenario) is authored from the room's structure.
const searchSkillsRoom: Topic = {
  id: 'search-skills',
  moduleId: START_MODULE_ID,
  title: 'Search Skills',
  description: 'Master the search engines and OSINT resources every analyst relies on: Shodan, VirusTotal, CVE/NVD, Linux MAN pages, and GitHub.',
  status: 'unlocked',
  iconType: 'search',
  content: '',
  realWorldCallout: {
    title: 'The Exposed Apache Server',
    concept: 'OSINT-Driven Vulnerability Discovery',
    scenario: 'A company accidentally exposes a server running Apache 2.4.49. An attacker searches Shodan for "Apache 2.4.49", instantly finds thousands of matching hosts, cross-references the CVE database, discovers CVE-2021-41773, downloads a public proof-of-concept, and attempts exploitation.',
    relevance: 'It shows why organisations must continuously monitor their Internet-facing assets — the same search tools defenders use for asset discovery are used by attackers for reconnaissance.'
  },
  mindmap: [
    { id: 'search-skills', label: 'Search Skills', description: 'Knowing where to find answers beats memorising tools', x: 50, y: 12, connections: ['shodan', 'virustotal', 'cve', 'docs', 'github'] },
    { id: 'shodan', label: 'Shodan', description: 'Search engine for Internet-connected devices; banner grabbing reveals software/versions', x: 12, y: 48 },
    { id: 'virustotal', label: 'VirusTotal', description: 'Analyses files, URLs, domains, IPs and hashes with many AV engines; detection ratio', x: 33, y: 55 },
    { id: 'cve', label: 'CVE / NVD', description: 'Catalog of known vulnerabilities; MITRE assigns IDs, NVD adds CVSS severity', x: 55, y: 55 },
    { id: 'docs', label: 'Documentation', description: 'Linux MAN pages and --help are the authoritative quick reference', x: 76, y: 55 },
    { id: 'github', label: 'GitHub', description: 'Hosts tools, PoCs, detection rules; always review code before running', x: 88, y: 48 }
  ],
  keyTakeaways: [
    'Search skill matters more than memorisation — good investigators know where to find everything.',
    'Google searches content; Shodan searches devices (servers, cameras, routers, IoT) via banner grabbing.',
    'Common Shodan filters include country:, port:, hostname:, org:, and product:.',
    'VirusTotal aggregates many antivirus engines; a higher detection ratio means higher confidence a file is malicious. SHA256 is the standard hash.',
    'CVE uniquely identifies a vulnerability (MITRE assigns IDs); the NVD adds CVSS severity scores from 0.0 to 10.0.',
    'Linux MAN pages (man <command>) and --help are authoritative documentation; only run GitHub PoC code after reviewing it in an isolated lab.'
  ],
  quiz: [
    {
      id: 'q-ss-1',
      question: 'Which search engine indexes Internet-connected devices rather than web content?',
      type: 'text',
      correctAnswer: 'Shodan',
      hint: 'Think "Google = books, this = buildings/devices".'
    },
    {
      id: 'q-ss-2',
      question: 'What is the term for information a service returns that reveals its software name and version?',
      type: 'text',
      correctAnswer: 'Banner',
      hint: 'Collecting it is called banner grabbing.'
    },
    {
      id: 'q-ss-3',
      question: 'Which platform analyses files, URLs, IPs and hashes using multiple antivirus engines?',
      type: 'text',
      correctAnswer: 'VirusTotal',
      hint: 'It reports a detection ratio such as 52/70.'
    },
    {
      id: 'q-ss-4',
      question: 'What does CVE stand for?',
      type: 'text',
      correctAnswer: 'Common Vulnerabilities and Exposures',
      hint: 'A globally recognised catalog of publicly disclosed vulnerabilities maintained by MITRE.'
    },
    {
      id: 'q-ss-5',
      question: 'Which Linux command opens the built-in manual for another command?',
      type: 'text',
      correctAnswer: 'man',
      hint: 'Usage: man <command>, e.g. man grep.'
    },
    {
      id: 'q-ss-6',
      question: 'Which hash algorithm is the industry standard most commonly used in cybersecurity today?',
      type: 'text',
      correctAnswer: 'SHA256',
      hint: 'MD5 = old, SHA1 = older, this = modern.'
    }
  ]
};

// Room 4 — Mystery Chest (new, follows the existing Mystery Chest pattern).
const mysteryChestRoom: Topic = {
  id: 'mystery-chest-cs101',
  moduleId: START_MODULE_ID,
  title: 'Mystery Chest',
  description: 'A quick-reference vault of search-skill cheat sheets, OSINT resources, and investigation workflow tips.',
  status: 'unlocked',
  iconType: 'chest',
  content: '',
  realWorldCallout: {
    title: 'The Analyst\'s Bookmark Bar',
    concept: 'Curated Resource Recall',
    scenario: 'During a live incident, a SOC analyst needs to check an unknown IP fast. Instead of hunting through search engines, they open pre-saved bookmarks — Shodan, VirusTotal, AbuseIPDB, the NVD — and triage the indicator in under a minute.',
    relevance: 'Knowing the right resource and its exact filters ahead of time turns a slow guess into a fast, confident decision under pressure.'
  },
  mindmap: [
    { id: 'chest', label: 'Search Cheat Sheet', description: 'The essential OSINT resources at a glance', x: 50, y: 15, connections: ['devices', 'malware', 'vulns'] },
    { id: 'devices', label: 'Shodan', description: 'shodan.io — filters: country:, port:, hostname:, org:, product:', x: 20, y: 50 },
    { id: 'malware', label: 'VirusTotal', description: 'virustotal.com — files, URLs, domains, IPs, hashes', x: 50, y: 55 },
    { id: 'vulns', label: 'CVE / NVD', description: 'cve.mitre.org & nvd.nist.gov — IDs and CVSS scores', x: 80, y: 50 }
  ],
  keyTakeaways: [
    'Keep a bookmarked toolkit: Shodan, VirusTotal, NVD, MITRE CVE, and GitHub.',
    'Memorise the high-value Shodan filters: country:, port:, hostname:, org:, product:.',
    'IOC = Indicator of Compromise (malicious IP, hash, domain, URL, registry key, process).',
    'Always execute suspicious files inside a sandbox and review GitHub code before running it.'
  ],
  quiz: [
    {
      id: 'q-mc101-1',
      question: 'What does OSINT stand for?',
      type: 'text',
      correctAnswer: 'Open Source Intelligence',
      hint: 'Intelligence gathered from publicly available sources.'
    },
    {
      id: 'q-mc101-2',
      question: 'What is an isolated environment used to safely execute suspicious files called?',
      type: 'text',
      correctAnswer: 'Sandbox',
      hint: 'It contains the file so it cannot harm the real system.'
    },
    {
      id: 'q-mc101-3',
      question: 'Which organisation maintains the National Vulnerability Database (NVD)?',
      type: 'text',
      correctAnswer: 'NIST',
      hint: 'It expands CVE records with CVSS scores and technical details.'
    },
    {
      id: 'q-mc101-4',
      question: 'What does IOC stand for?',
      type: 'text',
      correctAnswer: 'Indicator of Compromise',
      hint: 'Evidence such as a malicious IP, file hash, or domain.'
    }
  ]
};

const LINUX_FUNDAMENTALS_MODULE_ID = 'linux-fundamentals';

// Module 2 · Room 1 — Linux Fundamentals Part 1 (terminal basics + navigation).
const linuxFund1Room: Topic = {
  id: 'linux-fundamentals-1',
  moduleId: LINUX_FUNDAMENTALS_MODULE_ID,
  title: 'Linux Fundamentals Part 1',
  description: 'Take your first steps into Linux: what it is, how to interact with the terminal, and the core commands for exploring the filesystem.',
  status: 'unlocked',
  iconType: 'linux-cli',
  content: '',
  realWorldCallout: {
    title: 'First Moments on a Compromised Server',
    concept: 'Baseline Situational Awareness',
    scenario: 'A SOC analyst gains SSH access to a suspicious Linux web server. Before anything else they run whoami to confirm the account, pwd to locate themselves, and ls to reveal unexpected files dropped in the web root.',
    relevance: 'The very first commands you learn in Part 1 are the exact commands used to orient yourself during a live investigation.'
  },
  mindmap: [
    { id: 'linux1', label: 'Linux Basics', description: 'Interacting with the system through the terminal', x: 50, y: 12, connections: ['shell', 'nav', 'read'] },
    { id: 'shell', label: 'Terminal & Shell', description: 'The shell (Bash) interprets the commands you type at the prompt', x: 20, y: 50 },
    { id: 'nav', label: 'Navigation', description: 'ls, cd, and pwd move you around the filesystem tree', x: 50, y: 58 },
    { id: 'read', label: 'Reading', description: 'echo prints text; cat prints file contents', x: 80, y: 50 }
  ],
  keyTakeaways: [
    'Linux is an open-source OS family built on the Linux kernel, packaged as distributions like Ubuntu, Debian, and Kali.',
    'The terminal is the text interface; the shell (Bash) interprets your commands.',
    'The prompt reveals your user, hostname, current directory, and privilege level ($ = user, # = root).',
    'echo prints text and whoami shows the current user.',
    'ls, cd, pwd, and cat are the core commands for navigating and reading the filesystem.',
    'Paths start at the root /, and ~ is a shortcut for your home directory. Linux is case-sensitive.'
  ],
  quiz: [
    { id: 'q-lf1-1', question: 'Which command prints the current user\'s name?', type: 'text', correctAnswer: 'whoami', hint: 'It literally asks "who am I".' },
    { id: 'q-lf1-2', question: 'Which command prints the full path of your current directory?', type: 'text', correctAnswer: 'pwd', hint: 'Print Working Directory.' },
    { id: 'q-lf1-3', question: 'Which command lists the contents of a directory?', type: 'text', correctAnswer: 'ls', hint: 'Two letters, short for "list".' },
    { id: 'q-lf1-4', question: 'What symbol represents your home directory in a path?', type: 'text', correctAnswer: '~', hint: 'It sits above the Tab key on most keyboards.' },
    { id: 'q-lf1-5', question: 'Which command displays the contents of a text file?', type: 'text', correctAnswer: 'cat', hint: 'Short for "concatenate".' }
  ]
};

// Module 2 · Room 2 — Linux Fundamentals Part 2 (flags, file ops, search, permissions).
const linuxFund2Room: Topic = {
  id: 'linux-fundamentals-2',
  moduleId: LINUX_FUNDAMENTALS_MODULE_ID,
  title: 'Linux Fundamentals Part 2',
  description: 'Shape the system: use flags, create and manage files, search with find and grep, chain commands with operators, and read the Linux permission model.',
  status: 'unlocked',
  iconType: 'linux-cli',
  content: '',
  realWorldCallout: {
    title: 'The World-Writable Root Script',
    concept: 'Permissions as an Attack Surface',
    scenario: 'During a review, an analyst runs ls -l and spots a script owned by root but writable by everyone. An attacker could edit that script to run their own code with root privileges the next time it executes.',
    relevance: 'Reading permission strings — the core skill of Part 2 — is what turns a harmless-looking file listing into the discovery of a privilege-escalation path.'
  },
  mindmap: [
    { id: 'linux2', label: 'Shaping the System', description: 'Manipulating files and understanding access', x: 50, y: 12, connections: ['flags', 'files', 'search', 'perms'] },
    { id: 'flags', label: 'Flags', description: 'Switches like -a and -l change how a command behaves', x: 15, y: 50 },
    { id: 'files', label: 'File Ops', description: 'touch, mkdir, cp, mv, rm create and manage files', x: 38, y: 58 },
    { id: 'search', label: 'Search', description: 'find locates files; grep searches inside them', x: 62, y: 58 },
    { id: 'perms', label: 'Permissions', description: 'r/w/x for owner, group, and others govern access', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'Flags (switches) like -a, -l, and -h extend what a command does.',
    'touch and mkdir create files and directories; cp, mv, and rm copy, move, and delete them.',
    'find locates files by name, type, or size; grep searches for text inside files.',
    'Operators >, >>, |, &, and && redirect and combine commands.',
    'Every file has an owner, a group, and read/write/execute permissions.',
    'Misconfigured permissions are a classic privilege-escalation risk.'
  ],
  quiz: [
    { id: 'q-lf2-1', question: 'Which ls flag reveals hidden files?', type: 'text', correctAnswer: '-a', hint: 'Hidden files start with a dot; the flag is short for "all".' },
    { id: 'q-lf2-2', question: 'Which command searches for a text pattern inside files?', type: 'text', correctAnswer: 'grep', hint: 'It is not find — this one looks INSIDE files.' },
    { id: 'q-lf2-3', question: 'Which command creates a new directory?', type: 'text', correctAnswer: 'mkdir', hint: '"make directory".' },
    { id: 'q-lf2-4', question: 'Which operator appends output to a file without overwriting it?', type: 'text', correctAnswer: '>>', hint: 'Double the single redirect symbol.' },
    { id: 'q-lf2-5', question: 'In a permission string, what does the letter x grant?', type: 'text', correctAnswer: 'Execute', hint: 'It lets you run the file as a program.' }
  ]
};

// Module 2 · Room 3 — Linux Fundamentals Part 3 (editors, utilities, processes, cron, apt, logs).
const linuxFund3Room: Topic = {
  id: 'linux-fundamentals-3',
  moduleId: LINUX_FUNDAMENTALS_MODULE_ID,
  title: 'Linux Fundamentals Part 3',
  description: 'Operate Linux like a pro: edit files in the terminal, transfer data, manage processes and services, schedule tasks with cron, install software, and read logs.',
  status: 'unlocked',
  iconType: 'linux-cli',
  content: '',
  realWorldCallout: {
    title: 'Cron-Based Persistence',
    concept: 'Detecting Attacker Foothold',
    scenario: 'After an incident, a responder inspects crontabs and finds a hidden job that re-downloads malware every hour. Removing the malware without removing the cron job would let the infection return after the next schedule tick.',
    relevance: 'Process, cron, and log skills from Part 3 are exactly what defenders use to find and fully evict an attacker\'s persistence mechanisms.'
  },
  mindmap: [
    { id: 'linux3', label: 'Operating Linux', description: 'Running a real working environment', x: 50, y: 12, connections: ['edit', 'proc', 'auto', 'logs'] },
    { id: 'edit', label: 'Editors', description: 'nano and vim edit files without a GUI', x: 16, y: 50 },
    { id: 'proc', label: 'Processes', description: 'ps, top, kill, and systemctl manage running programs', x: 39, y: 58 },
    { id: 'auto', label: 'Automation', description: 'cron schedules jobs; apt installs software', x: 62, y: 58 },
    { id: 'logs', label: 'Logs', description: '/var/log records system and auth events', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'nano is beginner-friendly; vim is powerful and mode-based (Esc then :wq to save and quit).',
    'wget downloads files, scp copies over SSH, and Python can serve a directory over HTTP.',
    'Processes have PIDs; view them with ps/top and stop them with kill.',
    'systemctl manages long-running services (start, stop, status, enable).',
    'cron schedules automated jobs and is often abused by attackers for persistence.',
    'apt installs and updates software; logs under /var/log record system events.'
  ],
  quiz: [
    { id: 'q-lf3-1', question: 'How do you save and quit in vim?', type: 'text', correctAnswer: ':wq', hint: 'Press Esc first, then a colon command.' },
    { id: 'q-lf3-2', question: 'Which command stops a process using its PID?', type: 'text', correctAnswer: 'kill', hint: 'It signals the process to terminate.' },
    { id: 'q-lf3-3', question: 'Which tool schedules automated recurring tasks?', type: 'text', correctAnswer: 'cron', hint: 'You edit it with crontab -e.' },
    { id: 'q-lf3-4', question: 'Which command installs software on Debian/Ubuntu?', type: 'text', correctAnswer: 'apt', hint: 'Run it with sudo, e.g. sudo apt install.' },
    { id: 'q-lf3-5', question: 'In which directory are most Linux logs stored?', type: 'text', correctAnswer: '/var/log', hint: 'Includes syslog and auth.log.' }
  ]
};

// Module 2 · Room 4 — Mystery Chest (Bonus Revision) for Linux Fundamentals.
const linuxChestRoom: Topic = {
  id: 'mystery-chest-linux',
  moduleId: LINUX_FUNDAMENTALS_MODULE_ID,
  title: 'Mystery Chest',
  description: 'A bonus revision vault for the whole Linux Fundamentals module: command cheat sheets, the permission model, key directories, and an investigation workflow.',
  status: 'unlocked',
  iconType: 'mystery-chest',
  content: '',
  realWorldCallout: {
    title: 'The One-Page Field Guide',
    concept: 'Fast Recall Under Pressure',
    scenario: 'Mid-lab, an analyst forgets the exact find syntax. Instead of context-switching to a browser, they glance at their curated command sheet and keep moving — permissions, operators, and key paths all in one place.',
    relevance: 'Consolidating the module into a single reference turns hesitation into muscle memory during time-boxed labs and interviews.'
  },
  mindmap: [
    { id: 'chest-linux', label: 'Linux Cheat Sheet', description: 'The whole module at a glance', x: 50, y: 15, connections: ['cmds', 'perm', 'dirs'] },
    { id: 'cmds', label: 'Commands', description: 'Navigation, file ops, search, processes, automation', x: 20, y: 52 },
    { id: 'perm', label: 'Permissions', description: 'r/w/x for owner, group, and others', x: 50, y: 58 },
    { id: 'dirs', label: 'Key Directories', description: '/, /home, /etc, /var/log, /tmp', x: 80, y: 52 }
  ],
  keyTakeaways: [
    'Navigate with pwd, ls, cd, and cat; manage files with touch, mkdir, cp, mv, rm.',
    'find locates files; grep searches their contents.',
    'ps, top, kill, and systemctl control programs and services.',
    'cron automates tasks; apt manages software.',
    'Permissions (r/w/x for owner, group, others) decide who can act on each file.',
    'Key directories: / (root), /home, /etc, /var/log, /tmp.'
  ],
  quiz: [
    { id: 'q-mcl-1', question: 'Which command prints your current directory?', type: 'text', correctAnswer: 'pwd', hint: 'Print Working Directory.' },
    { id: 'q-mcl-2', question: 'Which command searches for text inside files?', type: 'text', correctAnswer: 'grep', hint: 'e.g. grep "error" log.txt.' },
    { id: 'q-mcl-3', question: 'Which directory holds system logs?', type: 'text', correctAnswer: '/var/log', hint: 'Includes auth.log and syslog.' },
    { id: 'q-mcl-4', question: 'Which command lists every running process?', type: 'text', correctAnswer: 'ps aux', hint: 'ps with three classic flags.' }
  ]
};

const WINDOWS_AD_MODULE_ID = 'windows-and-ad-fundamentals';

// Module 3 · Room 1 — Windows Fundamentals 1 (editions, GUI, NTFS, accounts, UAC, Task Manager).
const winFund1Room: Topic = {
  id: 'windows-fundamentals-1',
  moduleId: WINDOWS_AD_MODULE_ID,
  title: 'Windows Fundamentals 1',
  description: 'Get oriented in Windows: editions, the desktop GUI, the NTFS file system and permissions, the System32 directory, user accounts and profiles, UAC, and Task Manager.',
  status: 'unlocked',
  iconType: 'windows',
  content: '',
  realWorldCallout: {
    title: 'Judging a Suspicious Process',
    concept: 'Context Over Filename',
    scenario: 'An analyst spots a process called svchost.exe using unusual network connections. Instead of trusting the name, they check its path, parent process, user account, digital signature, and command-line arguments to decide whether it is the real Windows binary or malware masquerading as it.',
    relevance: 'Windows Fundamentals 1 teaches the exact structures — System32 paths, accounts, Task Manager details — an investigator uses to tell a legitimate process from an impostor.'
  },
  mindmap: [
    { id: 'win1', label: 'Windows Basics', description: 'How Windows is organised for users and security', x: 50, y: 12, connections: ['gui', 'ntfs', 'accounts', 'uac'] },
    { id: 'gui', label: 'Desktop & GUI', description: 'Start Menu, Taskbar, Search, Task View, System Tray', x: 16, y: 50 },
    { id: 'ntfs', label: 'NTFS', description: 'Journaling file system with permissions, EFS, and Alternate Data Streams', x: 39, y: 58 },
    { id: 'accounts', label: 'Accounts', description: 'Administrator vs Standard User; least privilege; profiles under C:\\Users', x: 62, y: 58 },
    { id: 'uac', label: 'UAC & Tools', description: 'User Account Control, Settings, Control Panel, Task Manager', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'Windows ships in editions (Home, Pro, Enterprise, Education, Server), each exposing different features.',
    'GUI = Graphical User Interface; the Taskbar Notification Area is also called the System Tray.',
    'NTFS is the modern Windows file system: journaling, permissions, compression, and EFS encryption.',
    'Alternate Data Streams (ADS) hide extra data inside NTFS files and store Mark of the Web metadata.',
    'C:\\Windows (referenced by %windir%) holds System32; accounts are Administrator or Standard User.',
    'Follow the Principle of Least Privilege; UAC prompts before privileged actions; Task Manager opens with Ctrl+Shift+Esc.'
  ],
  quiz: [
    { id: 'q-wf1-1', question: 'What does GUI stand for?', type: 'text', correctAnswer: 'Graphical User Interface', hint: 'The visual way to interact with Windows.' },
    { id: 'q-wf1-2', question: 'What is the modern Windows file system called?', type: 'text', correctAnswer: 'NTFS', hint: 'New Technology File System.' },
    { id: 'q-wf1-3', question: 'Which NTFS feature can hide extra data streams inside a file?', type: 'text', correctAnswer: 'ADS', hint: 'Alternate Data Streams.' },
    { id: 'q-wf1-4', question: 'Which environment variable points to the Windows installation directory?', type: 'text', correctAnswer: '%windir%', hint: 'Wrapped in percent signs.' },
    { id: 'q-wf1-5', question: 'Which keyboard shortcut opens Task Manager directly?', type: 'text', correctAnswer: 'Ctrl + Shift + Esc', hint: 'Three keys, bottom-left plus Esc.' },
    { id: 'q-wf1-6', question: 'What does UAC stand for?', type: 'text', correctAnswer: 'User Account Control', hint: 'It prompts before privileged actions.' }
  ]
};

// Module 3 · Room 2 — Windows Fundamentals 2 (msconfig, Computer Management, CMD, Registry).
const winFund2Room: Topic = {
  id: 'windows-fundamentals-2',
  moduleId: WINDOWS_AD_MODULE_ID,
  title: 'Windows Fundamentals 2',
  description: 'Master the built-in Windows tools: System Configuration (msconfig), UAC levels, Computer Management, System Information, Resource Monitor, core CMD commands, and the Registry.',
  status: 'unlocked',
  iconType: 'windows',
  content: '',
  realWorldCallout: {
    title: 'Enumerating a Freshly Accessed Host',
    concept: 'Native Tooling Recon',
    scenario: 'After gaining a shell, a responder runs whoami, hostname, ipconfig /all, and netstat -ano to map the identity, network, and active connections of the machine before deciding the next move.',
    relevance: 'The Command Prompt and management consoles in this room are the same native tools defenders use to investigate and attackers abuse to Live Off The Land.'
  },
  mindmap: [
    { id: 'win2', label: 'Built-in Tools', description: 'Configuring, monitoring, and investigating Windows', x: 50, y: 12, connections: ['msconfig', 'compmgmt', 'cmd', 'registry'] },
    { id: 'msconfig', label: 'msconfig', description: 'System Configuration: General, Boot, Services, Startup, Tools', x: 16, y: 50 },
    { id: 'compmgmt', label: 'Computer Mgmt', description: 'Task Scheduler, Event Viewer, Shared Folders, Services', x: 39, y: 58 },
    { id: 'cmd', label: 'Command Prompt', description: 'hostname, whoami, ipconfig, netstat, net', x: 62, y: 58 },
    { id: 'registry', label: 'Registry', description: 'Five root keys; a common persistence target', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'System Configuration (msconfig) troubleshoots startup and boot through General, Boot, Services, Startup, and Tools tabs.',
    'UAC has four levels: Always Notify, Notify for Apps (default), Notify Without Dimming, and Never Notify.',
    'Computer Management (compmgmt.msc) groups System Tools, Storage, and Services and Applications.',
    'Event Viewer, Task Scheduler, and Services are key persistence and investigation points.',
    'Core CMD commands: hostname, whoami, ipconfig /all, netstat -ano, net user.',
    'The Registry has five root keys (HKCR, HKCU, HKLM, HKU, HKCC) and is a frequent persistence target.'
  ],
  quiz: [
    { id: 'q-wf2-1', question: 'Which command opens the System Configuration utility?', type: 'text', correctAnswer: 'msconfig', hint: 'Short for Microsoft System Configuration.' },
    { id: 'q-wf2-2', question: 'Which command opens Computer Management?', type: 'text', correctAnswer: 'compmgmt.msc', hint: 'An .msc management console.' },
    { id: 'q-wf2-3', question: 'Which CMD command shows the current logged-in user?', type: 'text', correctAnswer: 'whoami', hint: 'Same idea as on Linux.' },
    { id: 'q-wf2-4', question: 'Which netstat option set shows all connections with the owning PID?', type: 'text', correctAnswer: 'netstat -ano', hint: 'All, numeric, owner PID.' },
    { id: 'q-wf2-5', question: 'How many root keys does the Windows Registry have?', type: 'text', correctAnswer: '5', hint: 'HKCR, HKCU, HKLM, HKU, HKCC.' }
  ]
};

// Module 3 · Room 3 — Windows Fundamentals 3 (Windows security features).
const winFund3Room: Topic = {
  id: 'windows-fundamentals-3',
  moduleId: WINDOWS_AD_MODULE_ID,
  title: 'Windows Fundamentals 3',
  description: 'Tour the built-in Windows defences: Windows Update, Windows Security, Microsoft Defender, the firewall, SmartScreen, exploit mitigations, TPM, BitLocker, and Volume Shadow Copy.',
  status: 'unlocked',
  iconType: 'windows',
  content: '',
  realWorldCallout: {
    title: 'Breaking the Ransomware Chain',
    concept: 'Defense in Depth',
    scenario: 'A ransomware operator exploits a missing patch, uses built-in tools to stay hidden, deletes Volume Shadow Copies, then encrypts files. Each Windows security layer — patching, Defender, behaviour monitoring, and off-site backups — breaks a different link in that chain.',
    relevance: 'Windows Fundamentals 3 shows how overlapping defences combine so that no single failure exposes the whole system.'
  },
  mindmap: [
    { id: 'win3', label: 'Windows Security', description: 'Layered built-in defences (Defense in Depth)', x: 50, y: 12, connections: ['update', 'defender', 'firewall', 'crypto'] },
    { id: 'update', label: 'Updates', description: 'Windows Update and Patch Tuesday close known vulnerabilities', x: 16, y: 50 },
    { id: 'defender', label: 'Defender', description: 'Antivirus scans, real-time and ransomware protection', x: 39, y: 58 },
    { id: 'firewall', label: 'Firewall & SmartScreen', description: 'Domain/Private/Public profiles; DEP, CFG, ASLR mitigations', x: 62, y: 58 },
    { id: 'crypto', label: 'TPM & BitLocker', description: 'Hardware keys, drive encryption, VSS restore points', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'Windows Update patches vulnerabilities; Patch Tuesday is the second Tuesday of each month.',
    'Windows Security is the central dashboard; red status means immediate action is required.',
    'Microsoft Defender offers Quick, Full, and Custom scans and quarantines threats; keep Real-Time Protection on.',
    'The firewall has Domain, Private, and Public profiles; untrusted Wi-Fi uses the Public profile.',
    'SmartScreen blocks suspicious apps and downloads; DEP, CFG, and ASLR make exploitation harder.',
    'TPM stores keys in hardware, BitLocker encrypts drives, and VSS enables restore points — ransomware deletes shadow copies, so keep off-site backups.'
  ],
  quiz: [
    { id: 'q-wf3-1', question: 'On which day of the month does Microsoft traditionally release updates (Patch Tuesday)?', type: 'text', correctAnswer: 'Second Tuesday', hint: 'A specific Tuesday each month.' },
    { id: 'q-wf3-2', question: 'Which Defender setting continuously monitors the system and should stay enabled?', type: 'text', correctAnswer: 'Real-time protection', hint: 'It acts as threats occur, not just on scans.' },
    { id: 'q-wf3-3', question: 'Which firewall profile applies on untrusted airport or cafe Wi-Fi?', type: 'text', correctAnswer: 'Public', hint: 'The most restrictive of the three profiles.' },
    { id: 'q-wf3-4', question: 'What does TPM stand for?', type: 'text', correctAnswer: 'Trusted Platform Module', hint: 'A hardware cryptographic processor.' },
    { id: 'q-wf3-5', question: 'What does VSS stand for?', type: 'text', correctAnswer: 'Volume Shadow Copy Service', hint: 'It creates point-in-time snapshots.' }
  ]
};

// Module 3 · Room 4 — Active Directory Basics (domains, OUs, GPOs, Kerberos/NetNTLM, trusts).
const activeDirectoryRoom: Topic = {
  id: 'active-directory-basics',
  moduleId: WINDOWS_AD_MODULE_ID,
  title: 'Active Directory Basics',
  description: 'Understand the enterprise backbone: Windows domains, Domain Controllers, Organizational Units, delegation, Group Policy, Kerberos vs NetNTLM authentication, and trees, forests, and trusts.',
  status: 'unlocked',
  iconType: 'network',
  content: '',
  realWorldCallout: {
    title: 'One Misconfiguration, Whole Domain',
    concept: 'Centralised Control, Centralised Risk',
    scenario: 'Because a Domain Controller holds authentication and policy for every machine, a single weak GPO, over-privileged delegation, or exposed admin account can hand an attacker control of the entire domain.',
    relevance: 'Active Directory Basics explains the structures — DCs, OUs, GPOs, Kerberos — that defenders harden and attackers pivot through in enterprise networks.'
  },
  mindmap: [
    { id: 'ad', label: 'Active Directory', description: 'Centralised identity and policy for a Windows domain', x: 50, y: 12, connections: ['dc', 'ou', 'gpo', 'auth', 'forest'] },
    { id: 'dc', label: 'Domain Controller', description: 'Runs AD DS; authenticates users/computers and enforces policy', x: 12, y: 50 },
    { id: 'ou', label: 'OUs & Delegation', description: 'Containers that organise objects, target GPOs, and delegate rights', x: 33, y: 58 },
    { id: 'gpo', label: 'Group Policy', description: 'GPOs configure users and computers; distributed via SYSVOL', x: 55, y: 58 },
    { id: 'auth', label: 'Authentication', description: 'Kerberos (ticket-based) and NetNTLM (challenge-response)', x: 76, y: 55 },
    { id: 'forest', label: 'Trees & Forests', description: 'Namespaces, forests, and cross-domain trust relationships', x: 88, y: 48 }
  ],
  keyTakeaways: [
    'Active Directory centrally manages users, computers, groups, and policies in a Windows domain.',
    'Domain Controllers run AD DS and authenticate users and computers.',
    'Organizational Units organise objects, allow GPO targeting, and support delegation (least privilege).',
    'GPOs configure Computer and User settings, distribute through SYSVOL, and refresh with gpupdate /force.',
    'Kerberos is modern and ticket-based (TGT then TGS); NetNTLM is legacy challenge-response; neither sends the password over the network.',
    'A Tree shares one namespace, a Forest holds one or more trees, and Trusts enable cross-domain authentication but not automatic access.'
  ],
  quiz: [
    { id: 'q-ad-1', question: 'What is the server that runs AD DS and authenticates the domain called?', type: 'text', correctAnswer: 'Domain Controller', hint: 'Abbreviated DC.' },
    { id: 'q-ad-2', question: 'What does OU stand for in Active Directory?', type: 'text', correctAnswer: 'Organizational Unit', hint: 'A container for organising objects.' },
    { id: 'q-ad-3', question: 'What is the default, modern, ticket-based Windows domain authentication protocol?', type: 'text', correctAnswer: 'Kerberos', hint: 'It uses TGTs and service tickets.' },
    { id: 'q-ad-4', question: 'Which command forces an immediate Group Policy refresh?', type: 'text', correctAnswer: 'gpupdate /force', hint: 'Run it on the target machine.' },
    { id: 'q-ad-5', question: 'What is a collection of one or more AD trees called?', type: 'text', correctAnswer: 'Forest', hint: 'Trees grow in one of these.' }
  ]
};

// Module 3 · Room 5 — Mystery Chest (Bonus Revision) for Windows and AD Fundamentals.
const winChestRoom: Topic = {
  id: 'mystery-chest-windows',
  moduleId: WINDOWS_AD_MODULE_ID,
  title: 'Mystery Chest',
  description: 'A bonus revision vault for the whole Windows and AD Fundamentals module: CMD/PowerShell references, key paths, NTFS permissions, security features, and Active Directory essentials.',
  status: 'unlocked',
  iconType: 'mystery-chest',
  content: '',
  realWorldCallout: {
    title: 'The Windows Field Reference',
    concept: 'Fast Recall Under Pressure',
    scenario: 'Mid-investigation, an analyst needs the right console command or the meaning of a Kerberos ticket type. Instead of switching to a browser, they glance at a single consolidated sheet covering CMD, PowerShell, paths, and AD terms.',
    relevance: 'Consolidating four dense rooms into one reference turns hesitation into muscle memory during labs, exams, and interviews.'
  },
  mindmap: [
    { id: 'chest-win', label: 'Windows Cheat Sheet', description: 'The whole module at a glance', x: 50, y: 15, connections: ['cmds', 'sec', 'ad'] },
    { id: 'cmds', label: 'Commands & Paths', description: 'CMD, PowerShell, .msc consoles, key directories', x: 20, y: 52 },
    { id: 'sec', label: 'Security Features', description: 'Defender, firewall, SmartScreen, TPM, BitLocker, VSS', x: 50, y: 58 },
    { id: 'ad', label: 'Active Directory', description: 'DC, OU, GPO, Kerberos vs NetNTLM, trees and forests', x: 80, y: 52 }
  ],
  keyTakeaways: [
    'Key consoles: msconfig, compmgmt.msc, lusrmgr.msc, msinfo32, resmon, regedit.',
    'Core CMD: hostname, whoami, ipconfig /all, netstat -ano, net user.',
    'NTFS permissions run from Read up to Full Control; %windir% points to C:\\Windows.',
    'Windows security layers: Update, Defender, Firewall, SmartScreen, TPM, BitLocker, VSS (Defense in Depth).',
    'Active Directory essentials: Domain Controller, OU, GPO (SYSVOL, gpupdate /force).',
    'Kerberos is ticket-based (TGT/TGS); NetNTLM is legacy challenge-response.'
  ],
  quiz: [
    { id: 'q-mcw-1', question: 'Which command opens Local Users and Groups management?', type: 'text', correctAnswer: 'lusrmgr.msc', hint: 'An .msc console.' },
    { id: 'q-mcw-2', question: 'Which hardware chip securely stores cryptographic keys for BitLocker?', type: 'text', correctAnswer: 'TPM', hint: 'Trusted Platform Module.' },
    { id: 'q-mcw-3', question: 'Which Kerberos ticket is used to request further service tickets?', type: 'text', correctAnswer: 'TGT', hint: 'Ticket Granting Ticket.' },
    { id: 'q-mcw-4', question: 'Through which network share are GPOs distributed to domain machines?', type: 'text', correctAnswer: 'SYSVOL', hint: 'A default domain share.' }
  ]
};

const COMMAND_LINE_MODULE_ID = 'command-line';

// Module 4 · Room 1 — Windows Command Line (cmd.exe: system info, networking, files, processes).
const winCmdRoom: Topic = {
  id: 'windows-command-line',
  moduleId: COMMAND_LINE_MODULE_ID,
  title: 'Windows Command Line',
  description: 'Master the Windows Command Prompt (cmd.exe): system information, network troubleshooting, file and disk management, process control, and maintenance commands.',
  status: 'unlocked',
  iconType: 'win-cli',
  content: '',
  realWorldCallout: {
    title: 'Enumerating a Headless Server',
    concept: 'GUI-Free Investigation',
    scenario: 'Connected over SSH to a Windows server with no desktop, an analyst runs systeminfo, ipconfig /all, netstat -abon, and tasklist to map the OS build, network, listening ports, and running processes before deciding the next move.',
    relevance: 'The Windows Command Line is often the only interface available on servers and remote sessions — the same commands drive administration, troubleshooting, and security enumeration.'
  },
  mindmap: [
    { id: 'wincmd', label: 'Windows CLI', description: 'cmd.exe — the traditional Windows command interpreter', x: 50, y: 12, connections: ['sys', 'net', 'files', 'proc'] },
    { id: 'sys', label: 'System Info', description: 'set, ver, systeminfo, help, cls', x: 16, y: 50 },
    { id: 'net', label: 'Networking', description: 'ipconfig, ping, tracert, nslookup, netstat', x: 39, y: 58 },
    { id: 'files', label: 'Files & Disk', description: 'cd, dir, tree, mkdir, type, copy, move, del', x: 62, y: 58 },
    { id: 'proc', label: 'Processes', description: 'tasklist and taskkill manage running processes', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'cmd.exe is the default Windows command-line interpreter; a CLI is faster, lighter, and scriptable versus a GUI.',
    'set shows environment variables, ver the version, and systeminfo the full system detail.',
    'ipconfig /all reveals MAC/DNS/DHCP; ping tests reachability; tracert maps the route; nslookup resolves DNS.',
    'netstat -abon correlates ports, connections, executables, and PIDs.',
    'cd, dir, tree, mkdir, rmdir, type, more, copy, move, del, and erase manage files and directories.',
    'tasklist lists processes and taskkill /PID terminates them; /? shows help for any command.'
  ],
  quiz: [
    { id: 'q-wcmd-1', question: 'What is the default command-line interpreter in Windows?', type: 'text', correctAnswer: 'cmd.exe', hint: 'The traditional Command Prompt executable.' },
    { id: 'q-wcmd-2', question: 'Which command shows detailed network config including the MAC address?', type: 'text', correctAnswer: 'ipconfig /all', hint: 'Look at the Physical Address field.' },
    { id: 'q-wcmd-3', question: 'Which command lists running processes with their PIDs?', type: 'text', correctAnswer: 'tasklist', hint: 'Its counterpart is taskkill.' },
    { id: 'q-wcmd-4', question: 'Which switch aborts a scheduled shutdown?', type: 'text', correctAnswer: 'shutdown /a', hint: '/a = abort.' },
    { id: 'q-wcmd-5', question: 'Which netstat option set shows connections, executables, and PIDs numerically?', type: 'text', correctAnswer: 'netstat -abon', hint: 'Four flags combined.' }
  ]
};

// Module 4 · Room 2 — Windows PowerShell (object-oriented shell, cmdlets, pipeline).
const powershellRoom: Topic = {
  id: 'windows-powershell',
  moduleId: COMMAND_LINE_MODULE_ID,
  title: 'Windows PowerShell',
  description: 'Learn the object-oriented PowerShell shell: Verb-Noun cmdlets, discovery and help, the object pipeline for sorting/filtering, and real-time analysis of processes, connections, hashes, and ADS.',
  status: 'unlocked',
  iconType: 'win-cli',
  content: '',
  realWorldCallout: {
    title: 'Tracing a Rogue Connection',
    concept: 'Object Pipeline Investigation',
    scenario: 'An analyst spots an unexpected outbound connection with Get-NetTCPConnection, reads its OwningProcess property, and pipes it to Get-Process to reveal the exact program responsible — no text parsing needed.',
    relevance: 'PowerShell passes structured objects through the pipeline, giving defenders precise, scriptable visibility into processes, connections, file hashes, and hidden data streams.'
  },
  mindmap: [
    { id: 'ps', label: 'PowerShell', description: 'Object-oriented shell and scripting language', x: 50, y: 12, connections: ['verbnoun', 'discover', 'pipe', 'analysis'] },
    { id: 'verbnoun', label: 'Verb-Noun', description: 'Cmdlets like Get-Process, Set-Location', x: 16, y: 50 },
    { id: 'discover', label: 'Discovery', description: 'Get-Command, Get-Help, Get-Alias', x: 39, y: 58 },
    { id: 'pipe', label: 'Object Pipeline', description: 'Sort-Object, Where-Object, Select-Object, Select-String', x: 62, y: 58 },
    { id: 'analysis', label: 'Live Analysis', description: 'Get-Process, Get-Service, Get-NetTCPConnection, Get-FileHash', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'PowerShell is object-oriented: the pipeline passes structured objects (properties + methods), not plain text.',
    'Cmdlets follow the Verb-Noun convention (e.g. Get-Process, Set-Location, Remove-Item).',
    'Get-Command, Get-Help, and Get-Alias discover commands and explain usage.',
    'Sort-Object, Where-Object, Select-Object, and Select-String sort, filter, select, and search objects.',
    'Get-ComputerInfo, Get-LocalUser, Get-NetIPConfiguration enumerate the system and network.',
    'Live analysis: Get-Process, Get-Service, Get-NetTCPConnection (OwningProcess), Get-FileHash, and Get-Item -Stream *; Invoke-Command runs remotely.'
  ],
  quiz: [
    { id: 'q-ps-1', question: 'What data model makes PowerShell different from traditional text shells?', type: 'text', correctAnswer: 'Object-oriented', hint: 'It passes these through the pipeline instead of text.' },
    { id: 'q-ps-2', question: 'What naming convention do PowerShell cmdlets follow?', type: 'text', correctAnswer: 'Verb-Noun', hint: 'e.g. Get-Process.' },
    { id: 'q-ps-3', question: 'Which cmdlet is aliased by "echo"?', type: 'text', correctAnswer: 'Write-Output', hint: 'echo → this cmdlet.' },
    { id: 'q-ps-4', question: 'Which Get-NetTCPConnection property identifies the process behind a connection?', type: 'text', correctAnswer: 'OwningProcess', hint: 'Correlate it with Get-Process.' },
    { id: 'q-ps-5', question: 'Which cmdlet computes a file hash (SHA256 by default)?', type: 'text', correctAnswer: 'Get-FileHash', hint: 'Used for integrity checks.' }
  ]
};

// Module 4 · Room 3 — Linux Shells (shells, Bash/Fish/Zsh, shell scripting).
const linuxShellsRoom: Topic = {
  id: 'linux-shells',
  moduleId: COMMAND_LINE_MODULE_ID,
  title: 'Linux Shells',
  description: 'Understand Linux shells and scripting: core commands, Bash vs Fish vs Zsh, and writing Bash scripts with shebangs, variables, user input, loops, and conditionals.',
  status: 'unlocked',
  iconType: 'linux-cli',
  content: '',
  realWorldCallout: {
    title: 'Automating the Log Hunt',
    concept: 'Scripting Repetitive Work',
    scenario: 'Instead of manually grepping dozens of files, an analyst writes a short Bash script that loops over every .log file in /var/log searching for a keyword, turning a tedious manual task into one reusable command.',
    relevance: 'Shell scripting converts everyday commands into automated tools — the same automation administrators and security professionals rely on daily.'
  },
  mindmap: [
    { id: 'shell', label: 'Linux Shells', description: 'The interface between the user and the OS', x: 50, y: 12, connections: ['cmds', 'types', 'script'] },
    { id: 'cmds', label: 'Core Commands', description: 'pwd, cd, ls, cat, grep', x: 20, y: 52 },
    { id: 'types', label: 'Shell Types', description: 'Bash (default), Fish (friendly), Zsh (customizable)', x: 50, y: 58 },
    { id: 'script', label: 'Scripting', description: 'shebang, variables, read, loops, conditionals', x: 80, y: 52 }
  ],
  keyTakeaways: [
    'A shell is the interface between the user and the OS via the CLI; Bash is the common default.',
    'Core commands: pwd, cd, ls, cat, grep; check the shell with echo $SHELL and /etc/shells.',
    'Bash is powerful and portable, Fish is friendly with built-in syntax highlighting, Zsh is highly customizable.',
    'Scripts start with the shebang #!/bin/bash, use $variables and read for input.',
    'Make a script executable with chmod +x, then run it with ./script.sh.',
    'Loops use for/do/done, conditionals use if/elif/else/fi, and && chains conditions with logical AND.'
  ],
  quiz: [
    { id: 'q-ls-1', question: 'What is the facilitator between the user and the operating system called?', type: 'text', correctAnswer: 'Shell', hint: 'The topic of this room.' },
    { id: 'q-ls-2', question: 'What is the default shell on most Linux distributions?', type: 'text', correctAnswer: 'Bash', hint: 'Bourne Again Shell.' },
    { id: 'q-ls-3', question: 'Which shell has built-in syntax highlighting out of the box?', type: 'text', correctAnswer: 'Fish', hint: 'Friendly Interactive Shell.' },
    { id: 'q-ls-4', question: 'What is the shebang used in a Bash script?', type: 'text', correctAnswer: '#!/bin/bash', hint: 'First line of the script.' },
    { id: 'q-ls-5', question: 'Which command gives a script executable permission?', type: 'text', correctAnswer: 'chmod +x', hint: 'Then run with ./script.sh.' }
  ]
};

// Module 4 · Room 4 — Mystery Chest (Bonus Revision) for the Command Line module.
const cliChestRoom: Topic = {
  id: 'mystery-chest-cli',
  moduleId: COMMAND_LINE_MODULE_ID,
  title: 'Mystery Chest',
  description: 'A bonus revision vault for the whole Command Line module: Windows CMD, PowerShell, and Linux shell references, bash scripting syntax, and a cross-environment command comparison.',
  status: 'unlocked',
  iconType: 'mystery-chest',
  content: '',
  realWorldCallout: {
    title: 'The Cross-Platform Cheat Card',
    concept: 'Transferable CLI Skills',
    scenario: 'Landing on an unfamiliar host, an analyst recalls that listing a directory is dir in CMD, Get-ChildItem in PowerShell, and ls in Bash — so they can enumerate the system whatever shell is available.',
    relevance: 'The same core jobs recur in every environment, so knowing how CMD, PowerShell, and Bash map to each other lets you operate on any command line.'
  },
  mindmap: [
    { id: 'chest-cli', label: 'CLI Cheat Sheet', description: 'The whole module at a glance', x: 50, y: 15, connections: ['cmd', 'pwsh', 'bash'] },
    { id: 'cmd', label: 'Windows CMD', description: 'cmd.exe — systeminfo, ipconfig, netstat, tasklist', x: 20, y: 52 },
    { id: 'pwsh', label: 'PowerShell', description: 'Verb-Noun cmdlets and the object pipeline', x: 50, y: 58 },
    { id: 'bash', label: 'Linux / Bash', description: 'Shell commands and bash scripting syntax', x: 80, y: 52 }
  ],
  keyTakeaways: [
    'CMD interpreter is cmd.exe; enumerate with systeminfo, ipconfig /all, netstat -abon, tasklist.',
    'PowerShell cmdlets follow Verb-Noun and pass objects through the pipeline (Where-Object, Sort-Object).',
    'Linux: check the shell with echo $SHELL and /etc/shells; make scripts runnable with chmod +x then ./script.sh.',
    'Bash scripts open with #!/bin/bash; use = for string comparison and -eq for numeric comparison.',
    'Core tasks (list dir, read file, network config, search text) map across CMD, PowerShell, and Bash.',
    'Command-line skills transfer between operating systems and are central to enumeration and investigation.'
  ],
  quiz: [
    { id: 'q-mcli-1', question: 'What is the default command-line interpreter on Windows?', type: 'text', correctAnswer: 'cmd.exe', hint: 'The Command Prompt.' },
    { id: 'q-mcli-2', question: 'What naming convention do PowerShell cmdlets use?', type: 'text', correctAnswer: 'Verb-Noun', hint: 'e.g. Get-Content.' },
    { id: 'q-mcli-3', question: 'Which Bash operator compares numbers (not strings)?', type: 'text', correctAnswer: '-eq', hint: '= is for strings.' },
    { id: 'q-mcli-4', question: 'Which PowerShell cmdlet is the equivalent of grep / findstr?', type: 'text', correctAnswer: 'Select-String', hint: 'Searches inside files.' }
  ]
};

const NETWORKING_MODULE_ID = 'networking';

// Module 5 · Room 1 — Networking Concepts (OSI/TCP-IP, IP addressing, TCP/UDP, encapsulation).
const netConceptsRoom: Topic = {
  id: 'networking-concepts',
  moduleId: NETWORKING_MODULE_ID,
  title: 'Networking Concepts',
  description: 'The foundation of networking: the OSI and TCP/IP models, IPv4 addressing and CIDR, private/public IP and NAT, routing, ports, TCP vs UDP, the three-way handshake, and encapsulation.',
  status: 'unlocked',
  iconType: 'osi',
  content: '',
  realWorldCallout: {
    title: 'Reading a Packet Layer by Layer',
    concept: 'The Layered Mental Model',
    scenario: 'When a connection misbehaves, an analyst reasons in layers — is it a physical link, an IP routing issue at Layer 3, a TCP problem at Layer 4, or an application fault at Layer 7? The OSI model turns a vague "it is slow" into a precise place to look.',
    relevance: 'Every later networking, web, and security topic builds on the layered model, addressing, and transport concepts introduced here.'
  },
  mindmap: [
    { id: 'net', label: 'Networking', description: 'How devices communicate across networks', x: 50, y: 12, connections: ['models', 'ip', 'transport', 'encap'] },
    { id: 'models', label: 'OSI & TCP/IP', description: '7 conceptual layers vs 4 practical layers', x: 16, y: 50 },
    { id: 'ip', label: 'IP & CIDR', description: 'IPv4 addressing, CIDR, private/public, NAT, routing', x: 39, y: 58 },
    { id: 'transport', label: 'TCP & UDP', description: 'Ports, reliable TCP handshake vs fast UDP', x: 62, y: 58 },
    { id: 'encap', label: 'Encapsulation', description: 'Headers added down the stack, removed going up', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'OSI has 7 conceptual layers; TCP/IP has 4 practical layers that run the Internet.',
    'Layer 2 uses MAC addresses (switch); Layer 3 uses IP addresses (router).',
    'IPv4 is 32 bits in 4 octets; CIDR /24 = 255.255.255.0; private ranges are 10/8, 172.16/12, 192.168/16.',
    'NAT maps private IPs to public; ports identify applications (80 HTTP, 443 HTTPS, 22 SSH, 53 DNS).',
    'TCP is reliable and connection-oriented (three-way handshake SYN/SYN-ACK/ACK); UDP is fast and connectionless.',
    'Encapsulation adds headers going down the stack; decapsulation removes them going up.'
  ],
  quiz: [
    { id: 'q-nc-1', question: 'How many layers does the OSI model have?', type: 'text', correctAnswer: '7', hint: 'TCP/IP has 4.' },
    { id: 'q-nc-2', question: 'Which layer does a router operate at?', type: 'text', correctAnswer: 'Layer 3', hint: 'The Network layer (IP).' },
    { id: 'q-nc-3', question: 'What does CIDR /24 equal as a subnet mask?', type: 'text', correctAnswer: '255.255.255.0', hint: 'First 24 bits are network.' },
    { id: 'q-nc-4', question: 'Which protocol performs the three-way handshake?', type: 'text', correctAnswer: 'TCP', hint: 'Reliable and connection-oriented.' },
    { id: 'q-nc-5', question: 'Which port does HTTPS use?', type: 'text', correctAnswer: '443', hint: 'HTTP is 80.' }
  ]
};

// Module 5 · Room 2 — Networking Essentials (DHCP, ARP, ICMP, routing, NAT).
const netEssentialsRoom: Topic = {
  id: 'networking-essentials',
  moduleId: NETWORKING_MODULE_ID,
  title: 'Networking Essentials',
  description: 'The core protocols that make networks work: DHCP (the DORA process), ARP (IP-to-MAC), ICMP with ping and traceroute, routing and best-path selection, and NAT.',
  status: 'unlocked',
  iconType: 'network',
  content: '',
  realWorldCallout: {
    title: 'Joining a Network in Seconds',
    concept: 'Protocols Working Together',
    scenario: 'Connect a laptop to Wi-Fi and within seconds DHCP assigns an address, ARP resolves the gateway MAC, routing forwards packets, ICMP confirms connectivity, and NAT lets it reach the Internet — all automatically.',
    relevance: 'These five protocols move a packet from your device to any server and back, and each is a common troubleshooting and attack surface.'
  },
  mindmap: [
    { id: 'ess', label: 'Core Protocols', description: 'The protocols that deliver a packet end to end', x: 50, y: 12, connections: ['dhcp', 'arp', 'icmp', 'route', 'nat'] },
    { id: 'dhcp', label: 'DHCP', description: 'Automatic IP config via DORA (UDP 67/68)', x: 12, y: 50 },
    { id: 'arp', label: 'ARP', description: 'Resolves IP to MAC (broadcast request, unicast reply)', x: 33, y: 58 },
    { id: 'icmp', label: 'ICMP', description: 'Diagnostics: ping (Type 8/0), traceroute (Type 11)', x: 55, y: 58 },
    { id: 'route', label: 'Routing', description: 'Best-path selection; RIP, OSPF, EIGRP, BGP', x: 76, y: 55 },
    { id: 'nat', label: 'NAT', description: 'Many private IPs share one public IP', x: 88, y: 48 }
  ],
  keyTakeaways: [
    'DHCP automatically assigns IP, subnet, gateway, and DNS using the DORA process (Discover, Offer, Request, Acknowledge) over UDP 67/68.',
    'ARP resolves an IP address to a MAC address with a broadcast request and unicast reply, and caches the result.',
    'ICMP is a Layer 3 diagnostic protocol with no ports; ping uses Type 8/0 and traceroute relies on Type 11.',
    'Traceroute increases TTL step by step so each router returns a Time Exceeded message.',
    'Routing selects the best path via routing tables and metrics; RIP uses hop count, OSPF uses cost, BGP runs the Internet.',
    'NAT lets many private devices share one public IP; home routers use PAT.'
  ],
  quiz: [
    { id: 'q-ne-1', question: 'What are the four steps of the DHCP DORA process?', type: 'text', correctAnswer: 'Discover, Offer, Request, Acknowledge', hint: 'D-O-R-A.' },
    { id: 'q-ne-2', question: 'Which protocol resolves an IP address to a MAC address?', type: 'text', correctAnswer: 'ARP', hint: 'Address Resolution Protocol.' },
    { id: 'q-ne-3', question: 'Which ICMP message type does traceroute rely on?', type: 'text', correctAnswer: 'Type 11', hint: 'Time Exceeded (TTL expired).' },
    { id: 'q-ne-4', question: 'Which routing protocol powers the Internet between ISPs?', type: 'text', correctAnswer: 'BGP', hint: 'Border Gateway Protocol.' },
    { id: 'q-ne-5', question: 'What does NAT stand for?', type: 'text', correctAnswer: 'Network Address Translation', hint: 'Private to public IP.' }
  ]
};

// Module 5 · Room 3 — Networking Core Protocols (DNS, WHOIS, HTTP(S), FTP, email).
const netCoreRoom: Topic = {
  id: 'networking-core-protocols',
  moduleId: NETWORKING_MODULE_ID,
  title: 'Networking Core Protocols',
  description: 'The Application-Layer protocols of everyday Internet use: DNS and WHOIS, HTTP and HTTPS with methods and status codes, FTP, and the email trio SMTP, POP3, and IMAP — each with its default port.',
  status: 'unlocked',
  iconType: 'web',
  content: '',
  realWorldCallout: {
    title: 'What Really Happens on "Enter"',
    concept: 'Application-Layer Conversations',
    scenario: 'Typing a URL triggers a DNS lookup to find the IP, a TCP connection, then an HTTP or HTTPS request and response — one of many client-server conversations that also power email (SMTP/POP3/IMAP) and file transfer (FTP).',
    relevance: 'Knowing each protocol\'s job, default port, and whether it encrypts data underpins web, email, and network security work.'
  },
  mindmap: [
    { id: 'core', label: 'Application Protocols', description: 'Client-server request/response conversations', x: 50, y: 12, connections: ['dns', 'http', 'ftp', 'email'] },
    { id: 'dns', label: 'DNS & WHOIS', description: 'Resolve names to IPs (53); look up domain ownership', x: 16, y: 50 },
    { id: 'http', label: 'HTTP / HTTPS', description: 'Web traffic on 80 / 443; methods and status codes', x: 39, y: 58 },
    { id: 'ftp', label: 'FTP', description: 'File transfer on port 21 (control + data)', x: 62, y: 58 },
    { id: 'email', label: 'Email', description: 'SMTP send (25), POP3 download (110), IMAP sync (143)', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'DNS resolves domain names to IPs on port 53 (UDP by default); records include A, AAAA, CNAME, MX, TXT, NS.',
    'WHOIS shows domain ownership and registration details; DNS gives location, WHOIS gives identity.',
    'HTTP (80) is plain text; HTTPS (443) adds TLS. Methods map to CRUD: GET, POST, PUT, DELETE.',
    'HTTP status codes group by first digit: 2xx success, 3xx redirect, 4xx client error, 5xx server error.',
    'FTP (21) transfers files over separate control and data channels and is unencrypted.',
    'Email splits by job: SMTP sends (25), POP3 downloads (110), IMAP synchronises (143).'
  ],
  quiz: [
    { id: 'q-ncp-1', question: 'Which port does DNS use?', type: 'text', correctAnswer: '53', hint: 'UDP by default.' },
    { id: 'q-ncp-2', question: 'Which DNS record maps a domain to its mail server?', type: 'text', correctAnswer: 'MX', hint: 'Mail eXchange.' },
    { id: 'q-ncp-3', question: 'Which port does HTTPS use?', type: 'text', correctAnswer: '443', hint: 'HTTP + TLS.' },
    { id: 'q-ncp-4', question: 'Which email protocol synchronises mail across multiple devices?', type: 'text', correctAnswer: 'IMAP', hint: 'Keeps mail on the server (port 143).' },
    { id: 'q-ncp-5', question: 'Which HTTP method retrieves data without modifying it?', type: 'text', correctAnswer: 'GET', hint: 'The "read" of CRUD.' }
  ]
};

// Module 5 · Room 4 — Networking Secure Protocols (TLS, HTTPS, secure email, SSH, VPN).
const netSecureRoom: Topic = {
  id: 'networking-secure-protocols',
  moduleId: NETWORKING_MODULE_ID,
  title: 'Networking Secure Protocols',
  description: 'How encryption is added to networking: the CIA triad, SSL vs TLS, certificates and CAs, HTTPS and the TLS handshake, secure email (SMTPS/POP3S/IMAPS), SSH, SFTP, FTPS, and VPNs.',
  status: 'unlocked',
  iconType: 'shield',
  content: '',
  realWorldCallout: {
    title: 'From Plaintext to Ciphertext',
    concept: 'Wrapping Legacy Protocols',
    scenario: 'On open Wi-Fi, plain HTTP or IMAP would expose passwords to anyone sniffing packets. Wrapping the same traffic in TLS turns readable credentials into ciphertext, and Wireshark then shows only "Application Data".',
    relevance: 'Secure protocols add confidentiality, integrity, and authentication to legacy protocols — the backbone of safe web browsing, email, remote access, and file transfer.'
  },
  mindmap: [
    { id: 'sec', label: 'Secure Protocols', description: 'Adding confidentiality, integrity, authentication', x: 50, y: 12, connections: ['tls', 'https', 'ssh', 'vpn'] },
    { id: 'tls', label: 'TLS & Certs', description: 'Replaced SSL; CA-signed certificates prove identity', x: 16, y: 50 },
    { id: 'https', label: 'HTTPS & Email', description: 'HTTPS 443; SMTPS 465/587, POP3S 995, IMAPS 993', x: 39, y: 58 },
    { id: 'ssh', label: 'SSH / SFTP', description: 'Encrypted remote login (22) and file transfer', x: 62, y: 58 },
    { id: 'vpn', label: 'VPN', description: 'Encrypted tunnels: site-to-site and remote-access', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'The CIA triad — Confidentiality, Integrity, Authentication — defines secure communication.',
    'TLS replaced the obsolete SSL; it encrypts only application data, leaving TCP and IP unchanged.',
    'Certificates prove server identity: a CA signs them via a CSR; self-signed certs are untrusted.',
    'HTTPS = HTTP + TLS on 443, with a TCP handshake then a TLS handshake; Wireshark needs the key log to decrypt.',
    'Secure email: SMTPS 465/587, POP3S 995, IMAPS 993; SSH (22) replaced Telnet (23).',
    'SFTP uses SSH (22), FTPS uses TLS (990); VPNs create encrypted tunnels (site-to-site and remote-access).'
  ],
  quiz: [
    { id: 'q-nsp-1', question: 'Which modern protocol replaced the obsolete SSL?', type: 'text', correctAnswer: 'TLS', hint: 'Transport Layer Security.' },
    { id: 'q-nsp-2', question: 'What are the three parts of the CIA triad?', type: 'text', correctAnswer: 'Confidentiality, Integrity, Authentication', hint: 'C-I-A.' },
    { id: 'q-nsp-3', question: 'Which port does HTTPS use?', type: 'text', correctAnswer: '443', hint: 'HTTP over TLS.' },
    { id: 'q-nsp-4', question: 'Which secure protocol replaced Telnet for remote login?', type: 'text', correctAnswer: 'SSH', hint: 'Port 22.' },
    { id: 'q-nsp-5', question: 'Does SFTP use SSH or TLS?', type: 'text', correctAnswer: 'SSH', hint: 'FTPS uses TLS; SFTP uses this.' }
  ]
};

// Module 5 · Room 5 — Wireshark: The Basics.
const wiresharkRoom: Topic = {
  id: 'wireshark-basics',
  moduleId: NETWORKING_MODULE_ID,
  title: 'Wireshark: The Basics',
  description: 'Analyse captured traffic with Wireshark: the three-pane interface, packet dissection through the OSI layers, display filters, Follow Stream, Export Objects, and Expert Information.',
  status: 'unlocked',
  iconType: 'search',
  content: '',
  realWorldCallout: {
    title: 'Seeing the Attack in the Packets',
    concept: 'Evidence, Not Assumptions',
    scenario: 'A user reports a slow machine. The analyst opens the PCAP, checks Expert Information, filters to HTTP, follows the stream, finds a malware download, and uses Export Objects to pull the file out for analysis.',
    relevance: 'Wireshark turns invisible traffic into readable evidence — a foundational skill for SOC, incident response, malware analysis, and forensics.'
  },
  mindmap: [
    { id: 'ws', label: 'Wireshark', description: 'GUI network protocol analyzer', x: 50, y: 12, connections: ['panes', 'filters', 'stream', 'expert'] },
    { id: 'panes', label: 'Three Panes', description: 'Packet List, Packet Details, Packet Bytes', x: 16, y: 50 },
    { id: 'filters', label: 'Display Filters', description: 'http, tcp.port==80, ip.addr==... narrow the capture', x: 39, y: 58 },
    { id: 'stream', label: 'Follow Stream', description: 'Reconstructs a full TCP/UDP/HTTP conversation', x: 62, y: 58 },
    { id: 'expert', label: 'Export & Expert Info', description: 'Recover files and auto-flag anomalies', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'Wireshark is a GUI packet analyzer; a PCAP file stores captured packets for later analysis.',
    'The interface has three panes: Packet List (summary), Packet Details (decoded layers), Packet Bytes (raw hex/ASCII).',
    'Packet dissection maps to OSI: HTTP over TCP over IPv4 over Ethernet.',
    'Capture filters run before capture; display filters run after and only change the view.',
    'Follow Stream reconstructs a whole TCP/UDP/HTTP conversation; Export Objects recovers transferred files.',
    'Expert Information automatically highlights anomalies (retransmissions, duplicate ACKs, malformed packets).'
  ],
  quiz: [
    { id: 'q-ws-1', question: 'What file format stores captured packets?', type: 'text', correctAnswer: 'PCAP', hint: 'Packet Capture (.pcap/.pcapng).' },
    { id: 'q-ws-2', question: 'Which display filter shows only HTTP traffic?', type: 'text', correctAnswer: 'http', hint: 'Just the protocol name.' },
    { id: 'q-ws-3', question: 'Which feature reconstructs a full conversation into readable text?', type: 'text', correctAnswer: 'Follow Stream', hint: 'Works on TCP/UDP/HTTP.' },
    { id: 'q-ws-4', question: 'Which feature recovers transferred files from a capture?', type: 'text', correctAnswer: 'Export Objects', hint: 'Works on HTTP, SMB, TFTP.' },
    { id: 'q-ws-5', question: 'What is the difference between a capture filter and a display filter?', type: 'text', correctAnswer: 'Capture filter runs before capture; display filter runs after', hint: 'One limits recording, one limits the view.' }
  ]
};

// Module 5 · Room 6 — Tcpdump: The Basics.
const tcpdumpRoom: Topic = {
  id: 'tcpdump-basics',
  moduleId: NETWORKING_MODULE_ID,
  title: 'Tcpdump: The Basics',
  description: 'Capture and filter packets from the command line with tcpdump: interfaces, saving/reading PCAPs, host/port/protocol filters, logical operators, TCP-flag filtering, and display formats.',
  status: 'unlocked',
  iconType: 'packet',
  content: '',
  realWorldCallout: {
    title: 'Capturing on a Headless Server',
    concept: 'CLI Packet Capture',
    scenario: 'During an incident on a server with no GUI, a responder runs tcpdump to capture suspicious traffic to a PCAP, filters it by host and port, then hands the file to Wireshark for deeper analysis.',
    relevance: 'tcpdump is the go-to capture tool wherever a GUI is unavailable, and its filter concepts carry straight over to Wireshark and tshark.'
  },
  mindmap: [
    { id: 'td', label: 'tcpdump', description: 'Command-line packet analyzer (libpcap)', x: 50, y: 12, connections: ['capture', 'filter', 'flags', 'display'] },
    { id: 'capture', label: 'Capture', description: '-i interface, -w write, -r read, -c count', x: 16, y: 50 },
    { id: 'filter', label: 'Filters', description: 'host, src/dst, port, protocol, and/or/not', x: 39, y: 58 },
    { id: 'flags', label: 'TCP Flags', description: 'Match SYN/ACK to spot scans and handshakes', x: 62, y: 58 },
    { id: 'display', label: 'Display', description: '-q, -e, -A, -xx, -X output formats', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'tcpdump is a command-line packet analyzer built on libpcap; capture needs sudo (raw socket access).',
    'Core flags: -i interface, -w write, -r read, -c count, -n/-nn numeric, -v verbose.',
    'Filter by host, src/dst host, port, and protocol (tcp, udp, icmp, arp).',
    'Combine or exclude conditions with and, or, not.',
    'Advanced filters target packet length (greater/less), header bytes (proto[offset:size]), and TCP flags.',
    'Display formats: -q quick, -e MAC header, -A ASCII, -xx hex, -X hex plus ASCII.'
  ],
  quiz: [
    { id: 'q-td-1', question: 'Which library does tcpdump use to capture packets?', type: 'text', correctAnswer: 'libpcap', hint: 'Windows uses WinPcap/Npcap.' },
    { id: 'q-td-2', question: 'Which flag writes captured packets to a file?', type: 'text', correctAnswer: '-w', hint: '-r reads them back.' },
    { id: 'q-td-3', question: 'Which flag limits the number of captured packets?', type: 'text', correctAnswer: '-c', hint: 'e.g. -c 20.' },
    { id: 'q-td-4', question: 'Which flag disables hostname and port-name resolution?', type: 'text', correctAnswer: '-nn', hint: 'Double n for numeric.' },
    { id: 'q-td-5', question: 'Which flag shows hex and ASCII together?', type: 'text', correctAnswer: '-X', hint: 'Best for investigations.' }
  ]
};

// Module 5 · Room 7 — Nmap: The Basics.
const nmapRoom: Topic = {
  id: 'nmap-basics',
  moduleId: NETWORKING_MODULE_ID,
  title: 'Nmap: The Basics',
  description: 'Reconnaissance with Nmap: host discovery, TCP connect and SYN stealth scans, UDP scans, service version and OS detection, timing templates, and saving reports.',
  status: 'unlocked',
  iconType: 'search',
  content: '',
  realWorldCallout: {
    title: 'Mapping an Unknown Network',
    concept: 'Reconnaissance First',
    scenario: 'Facing 500 hosts, a tester runs a ping scan to find the ~42 that are live, then SYN-scans those for open ports, detects service versions, and researches each version for known CVEs before going further.',
    relevance: 'You cannot secure or attack what you have not discovered — Nmap is the first tool in almost every engagement.'
  },
  mindmap: [
    { id: 'nm', label: 'Nmap', description: 'Network scanning and security auditing', x: 50, y: 12, connections: ['host', 'port', 'detect', 'output'] },
    { id: 'host', label: 'Host Discovery', description: '-sn ping scan; ARP on LAN, probes on remote', x: 16, y: 50 },
    { id: 'port', label: 'Port Scanning', description: '-sT connect, -sS stealth, -sU UDP, -p/-p-', x: 39, y: 58 },
    { id: 'detect', label: 'Detection', description: '-sV versions, -O OS, -A aggressive', x: 62, y: 58 },
    { id: 'output', label: 'Timing & Output', description: '-T0..T5 timing; -oN/-oX/-oG/-oA reports', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'Nmap discovers live hosts, open ports, services, versions, and operating systems; run with sudo for raw-packet scans.',
    '-sn does host discovery only; -sL lists targets without sending packets.',
    '-sT completes the TCP handshake; -sS is the stealthy half-open default for privileged users; -sU scans UDP.',
    '-F scans 100 common ports, -p selects ports, -p- scans all 65,535.',
    '-sV detects versions, -O guesses the OS, and -A bundles OS + version + scripts + traceroute; -Pn skips host discovery.',
    'Timing runs -T0 (paranoid) to -T5 (insane), default -T3; save results with -oA. Only scan authorised targets.'
  ],
  quiz: [
    { id: 'q-nm-1', question: 'Which Nmap option performs host discovery only?', type: 'text', correctAnswer: '-sn', hint: 'Ping scan, no port scan.' },
    { id: 'q-nm-2', question: 'Which scan is the stealthy half-open default for privileged users?', type: 'text', correctAnswer: '-sS', hint: 'SYN scan.' },
    { id: 'q-nm-3', question: 'Which option detects service versions?', type: 'text', correctAnswer: '-sV', hint: 'Maps a port to software + version.' },
    { id: 'q-nm-4', question: 'Which option scans all 65,535 TCP ports?', type: 'text', correctAnswer: '-p-', hint: 'Dash p dash.' },
    { id: 'q-nm-5', question: 'Which option saves output in all formats at once?', type: 'text', correctAnswer: '-oA', hint: 'Normal + XML + grepable.' }
  ]
};

// Module 5 · Room 8 — Mystery Chest (Bonus Revision) for the Networking module.
const netChestRoom: Topic = {
  id: 'mystery-chest-networking',
  moduleId: NETWORKING_MODULE_ID,
  title: 'Mystery Chest',
  description: 'A bonus revision vault for the whole Networking module: OSI/TCP-IP, ports, CIDR and NAT, core and secure protocols, plus Wireshark, tcpdump, and Nmap references.',
  status: 'unlocked',
  iconType: 'mystery-chest',
  content: '',
  realWorldCallout: {
    title: 'One Page, Every Layer',
    concept: 'Pattern Recognition',
    scenario: 'Before a lab or interview, an analyst skims a single sheet covering the layer models, port tables, CIDR rules, protocol ports, and the three analysis tools — enough to read a capture or plan a scan without hesitation.',
    relevance: 'Networking rewards pattern recognition; consolidating the module into one reference makes reading captures and planning scans second nature.'
  },
  mindmap: [
    { id: 'chest-net', label: 'Networking Cheat Sheet', description: 'The whole module at a glance', x: 50, y: 15, connections: ['fund', 'proto', 'tools'] },
    { id: 'fund', label: 'Fundamentals', description: 'OSI/TCP-IP, ports, CIDR, NAT, TCP vs UDP', x: 20, y: 52 },
    { id: 'proto', label: 'Protocols', description: 'DNS/HTTP/FTP/email + secure variants and ports', x: 50, y: 58 },
    { id: 'tools', label: 'Analysis Tools', description: 'Wireshark filters, tcpdump options, Nmap flags', x: 80, y: 52 }
  ],
  keyTakeaways: [
    'OSI 7 layers vs TCP/IP 4 layers; routing is Layer 3, transport is Layer 4.',
    'Core ports: 22 SSH, 25 SMTP, 53 DNS, 80 HTTP, 110 POP3, 143 IMAP, 443 HTTPS; secure 465/587, 990, 993, 995.',
    'Private ranges 10/8, 172.16/12, 192.168/16; CIDR /24 = 255.255.255.0; NAT hides private hosts.',
    'DHCP (DORA), ARP (IP to MAC), ICMP (ping/traceroute) are the essential support protocols.',
    'Wireshark uses display filters; tcpdump captures from the CLI (-w/-r); Nmap scans (-sS/-sV/-p-).',
    'Secure protocols wrap plaintext ones in TLS or SSH for confidentiality, integrity, and authentication.'
  ],
  quiz: [
    { id: 'q-mcn-1', question: 'Which OSI layer performs routing?', type: 'text', correctAnswer: 'Layer 3', hint: 'The Network layer.' },
    { id: 'q-mcn-2', question: 'Which port does SSH use?', type: 'text', correctAnswer: '22', hint: 'Telnet is 23.' },
    { id: 'q-mcn-3', question: 'Which tool captures packets from the command line?', type: 'text', correctAnswer: 'tcpdump', hint: 'Built on libpcap.' },
    { id: 'q-mcn-4', question: 'Which Nmap flag runs a stealth SYN scan?', type: 'text', correctAnswer: '-sS', hint: 'Half-open scan.' }
  ]
};

const CRYPTOGRAPHY_MODULE_ID = 'cryptography';
const EXPLOITATION_MODULE_ID = 'exploitation-basics';
const WEB_HACKING_MODULE_ID = 'web-hacking';
const OFFENSIVE_TOOLING_MODULE_ID = 'offensive-security-tooling';
const DEFENSIVE_SECURITY_MODULE_ID = 'defensive-security';

// Module 6 · Room 1 — Cryptography Basics.
const cryptoBasicsRoom: Topic = {
  id: 'cryptography-basics',
  moduleId: CRYPTOGRAPHY_MODULE_ID,
  title: 'Cryptography Basics',
  description: 'The foundation of cryptography: the CIA goals, plaintext/ciphertext/cipher/key, the encryption-decryption cycle, the Caesar cipher, symmetric vs asymmetric encryption, and the XOR and modulo math beneath it all.',
  status: 'unlocked',
  iconType: 'crypto-laptop',
  content: '',
  realWorldCallout: {
    title: 'A Password Across the Wire',
    concept: 'Confidentiality in Transit',
    scenario: 'Without cryptography, a password typed into a login form travels the network in plain text for any eavesdropper to read. Encrypted, the same password becomes meaningless ciphertext that only the receiver\'s key can unlock.',
    relevance: 'Every secure system — HTTPS, SSH, VPNs, password storage — rests on these building blocks, so the fundamentals here underpin the whole module.'
  },
  mindmap: [
    { id: 'crypto', label: 'Cryptography', description: 'Turning readable data into protected ciphertext', x: 50, y: 12, connections: ['goals', 'terms', 'types', 'math'] },
    { id: 'goals', label: 'CIA + Auth', description: 'Confidentiality, Integrity, Authentication, Non-repudiation', x: 16, y: 50 },
    { id: 'terms', label: 'Core Terms', description: 'Plaintext, ciphertext, cipher, key; encryption cycle', x: 39, y: 58 },
    { id: 'types', label: 'Sym vs Asym', description: 'AES (shared key) vs RSA/ECC (key pair)', x: 62, y: 58 },
    { id: 'math', label: 'XOR & Modulo', description: 'The math operations beneath modern ciphers', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'Cryptography converts readable plaintext into ciphertext so only authorized users with the key can read it.',
    'The four goals are confidentiality, integrity, authentication, and non-repudiation.',
    'The algorithm (cipher) is public; only the key must stay secret.',
    'The Caesar cipher shifts letters by a fixed key and has only 25 keys, so brute force breaks it instantly.',
    'Symmetric encryption uses one shared key (AES, DES, 3DES); asymmetric uses a public/private pair (RSA, ECC, Diffie-Hellman).',
    'XOR is reversible with the same key; modulo returns a remainder and is one-way — both are core to modern algorithms.'
  ],
  quiz: [
    { id: 'q-cb-1', question: 'What are the four goals of cryptography?', type: 'text', correctAnswer: 'Confidentiality, Integrity, Authentication, Non-repudiation', hint: 'CIA + one more.' },
    { id: 'q-cb-2', question: 'In cryptography, what must stay secret — the cipher or the key?', type: 'text', correctAnswer: 'The key', hint: 'The algorithm is public.' },
    { id: 'q-cb-3', question: 'How many usable keys does the Caesar cipher have?', type: 'text', correctAnswer: '25', hint: '26-letter alphabet minus the no-shift.' },
    { id: 'q-cb-4', question: 'Which encryption type uses one shared secret key?', type: 'text', correctAnswer: 'Symmetric', hint: 'AES is an example.' },
    { id: 'q-cb-5', question: 'Which bitwise operation is reversible by applying the same key twice?', type: 'text', correctAnswer: 'XOR', hint: 'A XOR A = 0.' }
  ]
};

// Module 6 · Room 2 — Public Key Cryptography Basics.
const publicKeyRoom: Topic = {
  id: 'public-key-crypto-basics',
  moduleId: CRYPTOGRAPHY_MODULE_ID,
  title: 'Public Key Cryptography Basics',
  description: 'Public/private key pairs and how they solve secure key exchange: hybrid encryption, RSA, Diffie-Hellman, SSH key authentication, digital signatures, certificates/PKI, and PGP/GPG.',
  status: 'unlocked',
  iconType: 'shield',
  content: '',
  realWorldCallout: {
    title: 'Sharing a Secret in the Open',
    concept: 'The Key Exchange Problem',
    scenario: 'Two people who have never met need a shared key over a network an attacker is watching. Diffie-Hellman lets them compute the same secret without ever sending it, and RSA lets anyone encrypt a message only the private-key holder can open.',
    relevance: 'Public key cryptography underpins HTTPS, SSH, VPNs, signed software, and secure email — the trust layer of the entire Internet.'
  },
  mindmap: [
    { id: 'pk', label: 'Public Key Crypto', description: 'Public/private key pairs for exchange and identity', x: 50, y: 12, connections: ['hybrid', 'rsa', 'ssh', 'sig'] },
    { id: 'hybrid', label: 'Hybrid & Key Exchange', description: 'Asymmetric shares a symmetric key; RSA vs Diffie-Hellman', x: 16, y: 50 },
    { id: 'rsa', label: 'RSA & DH', description: 'Factoring and discrete-log hard problems', x: 39, y: 58 },
    { id: 'ssh', label: 'SSH Keys', description: 'ssh-keygen, authorized_keys, key-based auth', x: 62, y: 58 },
    { id: 'sig', label: 'Signatures & PKI', description: 'Sign a hash; certificates, CAs, PGP/GPG', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'Asymmetric cryptography uses a public key to encrypt/verify and a private key to decrypt/sign; the private key is never shared.',
    'Hybrid encryption uses asymmetric crypto to exchange a symmetric key, then fast AES encrypts the data (HTTPS, SSH, VPNs).',
    'RSA security rests on prime factorization; Diffie-Hellman computes a shared secret without transmitting it (discrete log).',
    'SSH uses asymmetric authentication (ssh-keygen, authorized_keys, known_hosts) then symmetric session encryption.',
    'Digital signatures sign a hash with the private key and verify with the public key — integrity, authentication, non-repudiation.',
    'Certificates, CAs, and PKI bind identities to public keys; PGP/GPG secure email via a decentralised web of trust.'
  ],
  quiz: [
    { id: 'q-pk-1', question: 'Which key encrypts data in asymmetric cryptography, public or private?', type: 'text', correctAnswer: 'Public', hint: 'The private key decrypts.' },
    { id: 'q-pk-2', question: 'What hard problem is RSA security based on?', type: 'text', correctAnswer: 'Prime factorization', hint: 'Easy to multiply, hard to factor.' },
    { id: 'q-pk-3', question: 'Which algorithm lets two parties compute a shared secret without sending it?', type: 'text', correctAnswer: 'Diffie-Hellman', hint: 'A key-exchange algorithm.' },
    { id: 'q-pk-4', question: 'Which key creates a digital signature?', type: 'text', correctAnswer: 'Private key', hint: 'The public key verifies it.' },
    { id: 'q-pk-5', question: 'What binds an identity to a public key on the web?', type: 'text', correctAnswer: 'Certificate', hint: 'Signed by a CA.' }
  ]
};

// Module 6 · Room 3 — Hashing Basics.
const hashingRoom: Topic = {
  id: 'hashing-basics',
  moduleId: CRYPTOGRAPHY_MODULE_ID,
  title: 'Hashing Basics',
  description: 'One-way hashing for integrity and password storage: hash properties and the avalanche effect, MD5/SHA families, collisions, salting, rainbow tables, bcrypt/Argon2, recognising hashes, HMAC, and hashing vs encoding vs encryption.',
  status: 'unlocked',
  iconType: 'search',
  content: '',
  realWorldCallout: {
    title: 'Storing Passwords the Right Way',
    concept: 'One-Way by Design',
    scenario: 'A breached database of plaintext passwords compromises every user instantly. Stored as salted Argon2 or bcrypt hashes, the same leak yields little — the hashes cannot be reversed and each is unique even for identical passwords.',
    relevance: 'Hashing verifies integrity and protects credentials across logins, downloads, Git, and TLS, making it a pillar of practical security.'
  },
  mindmap: [
    { id: 'hash', label: 'Hashing', description: 'One-way, fixed-size digest of data', x: 50, y: 12, connections: ['props', 'algos', 'pw', 'hmac'] },
    { id: 'props', label: 'Properties', description: 'Deterministic, one-way, avalanche effect, collision-resistant', x: 16, y: 50 },
    { id: 'algos', label: 'Algorithms', description: 'MD5/SHA1 broken; SHA-256/512 secure', x: 39, y: 58 },
    { id: 'pw', label: 'Password Storage', description: 'Salting + slow hashes (bcrypt, Argon2); rainbow tables', x: 62, y: 58 },
    { id: 'hmac', label: 'Integrity & HMAC', description: 'File verification; HMAC = hash + secret key', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'Hashing is one-way and produces a fixed-size digest with no keys — it cannot be reversed.',
    'The avalanche effect means one changed bit produces a completely different hash, the basis of integrity checking.',
    'MD5 (128-bit) and SHA-1 (160-bit) are broken; SHA-256 and SHA-512 are secure.',
    'Never store plaintext or encrypted passwords; use salting plus a slow hash — Argon2id, bcrypt, scrypt, or PBKDF2.',
    'Salting defeats rainbow tables by making identical passwords hash differently; recognise hashes by prefix and length.',
    'HMAC combines a hash with a secret key for integrity and authentication; hashing is not encoding or encryption.'
  ],
  quiz: [
    { id: 'q-hb-1', question: 'Is hashing reversible?', type: 'text', correctAnswer: 'No', hint: 'It is a one-way function.' },
    { id: 'q-hb-2', question: 'What is the effect where one changed bit completely changes the hash?', type: 'text', correctAnswer: 'Avalanche effect', hint: 'Key to integrity checking.' },
    { id: 'q-hb-3', question: 'What random value is added to a password before hashing to defeat rainbow tables?', type: 'text', correctAnswer: 'Salt', hint: 'Makes identical passwords hash differently.' },
    { id: 'q-hb-4', question: 'Name a modern slow password-hashing algorithm.', type: 'text', correctAnswer: 'Argon2', hint: 'Also bcrypt, scrypt, PBKDF2.' },
    { id: 'q-hb-5', question: 'What does HMAC combine with a hash function?', type: 'text', correctAnswer: 'A secret key', hint: 'Adds authentication to integrity.' }
  ]
};

// Module 6 · Room 4 — John the Ripper: The Basics.
const johnRoom: Topic = {
  id: 'john-the-ripper-basics',
  moduleId: CRYPTOGRAPHY_MODULE_ID,
  title: 'John the Ripper: The Basics',
  description: 'Offline password cracking with John: dictionary attacks and rockyou.txt, specifying hash formats, cracking NTLM and /etc/shadow hashes, single crack mode, custom rules, and cracking ZIP/RAR/SSH-key passwords.',
  status: 'unlocked',
  iconType: 'skull',
  content: '',
  realWorldCallout: {
    title: 'From Captured Hash to Password',
    concept: 'Offline Cracking',
    scenario: 'After gaining a foothold, a tester dumps /etc/shadow or a SAM database — files that hold only hashes. John hashes candidate passwords and compares, recovering weak passwords offline with no lockouts or network delay.',
    relevance: 'John is a core password-auditing tool that turns weak, reused, or name-based passwords into concrete evidence for strengthening policy.'
  },
  mindmap: [
    { id: 'john', label: 'John the Ripper', description: 'Offline password cracker', x: 50, y: 12, connections: ['dict', 'formats', 'modes', 'helpers'] },
    { id: 'dict', label: 'Dictionary', description: 'rockyou.txt of real leaked passwords', x: 16, y: 50 },
    { id: 'formats', label: 'Hash Formats', description: '--format raw-md5 / nt / sha512crypt', x: 39, y: 58 },
    { id: 'modes', label: 'Modes', description: 'Single, rules, incremental attacks', x: 62, y: 58 },
    { id: 'helpers', label: 'Helper Tools', description: 'unshadow, zip2john, rar2john, ssh2john', x: 85, y: 50 }
  ],
  keyTakeaways: [
    'John cracks offline: it hashes candidate passwords and compares them to a stored hash — it never decrypts.',
    'Start with a dictionary attack using rockyou.txt; auto-detection can be wrong, so set --format (raw-md5, nt, sha512crypt).',
    'Windows NTLM hashes (SAM / NTDS.dit) crack with --format=nt; Linux $6$ hashes use --format=sha512crypt.',
    'unshadow merges /etc/passwd and /etc/shadow because John needs both username and hash.',
    'Single Crack Mode uses usernames and GECOS; Rules mutate dictionary words; incremental is brute-force last resort.',
    'Helper tools zip2john, rar2john, and ssh2john extract crackable hashes from archives and keys. Only crack authorised targets.'
  ],
  quiz: [
    { id: 'q-jtr-1', question: 'Does John the Ripper decrypt hashes?', type: 'text', correctAnswer: 'No', hint: 'It guesses and compares.' },
    { id: 'q-jtr-2', question: 'Which famous wordlist comes from a 2009 breach?', type: 'text', correctAnswer: 'rockyou.txt', hint: 'Millions of real passwords.' },
    { id: 'q-jtr-3', question: 'Which --format value cracks Windows NTLM hashes?', type: 'text', correctAnswer: 'nt', hint: 'Not "ntlm".' },
    { id: 'q-jtr-4', question: 'Which tool merges /etc/passwd and /etc/shadow for John?', type: 'text', correctAnswer: 'unshadow', hint: 'John needs both files combined.' },
    { id: 'q-jtr-5', question: 'Which helper extracts a crackable hash from an SSH private key?', type: 'text', correctAnswer: 'ssh2john', hint: 'It targets the passphrase.' }
  ]
};

// Module 6 · Room 5 — Mystery Chest (Bonus Revision) for the Cryptography module.
const cryptoChestRoom: Topic = {
  id: 'mystery-chest-crypto',
  moduleId: CRYPTOGRAPHY_MODULE_ID,
  title: 'Mystery Chest',
  description: 'A bonus revision vault for the whole Cryptography module: core terms, symmetric vs asymmetric, algorithms, hashing and password storage, digital signatures/PKI, and OpenSSL/GPG/John references.',
  status: 'unlocked',
  iconType: 'mystery-chest',
  content: '',
  realWorldCallout: {
    title: 'The Crypto Field Card',
    concept: 'Fast Recall Under Pressure',
    scenario: 'Mid-lab, an analyst needs the right hash prefix or the correct John format flag. Instead of switching to a browser, they glance at a single consolidated sheet covering encryption, hashing, signatures, and cracking commands.',
    relevance: 'Cryptography reduces to three jobs — confidentiality, integrity, authenticity — and one reference that ties the algorithms, hashes, and tools together makes them stick.'
  },
  mindmap: [
    { id: 'chest-crypto', label: 'Crypto Cheat Sheet', description: 'The whole module at a glance', x: 50, y: 15, connections: ['enc', 'hash', 'tools'] },
    { id: 'enc', label: 'Encryption', description: 'Symmetric/asymmetric, RSA/DH/ECC, signatures & PKI', x: 20, y: 52 },
    { id: 'hash', label: 'Hashing', description: 'MD5/SHA, bcrypt/Argon2, prefixes & lengths', x: 50, y: 58 },
    { id: 'tools', label: 'Tools', description: 'openssl, gpg, ssh-keygen, John the Ripper', x: 80, y: 52 }
  ],
  keyTakeaways: [
    'Encryption is reversible with a key; hashing is one-way; encoding (Base64) is neither and offers no protection.',
    'Symmetric (AES) is fast for bulk data; asymmetric (RSA, DH, ECC) handles key exchange, signatures, and identity.',
    'MD5/SHA-1 are broken; SHA-256/512 are secure; passwords need slow salted hashes (Argon2id, bcrypt).',
    'Recognise hashes by prefix/length: $2b$ bcrypt, $6$ SHA-512crypt, 32 hex MD5, 64 hex SHA-256.',
    'Digital signatures use the private key to sign and the public key to verify; PKI and CAs bind identities.',
    'John cracks offline (dictionary/single/rules/incremental); zip2john, ssh2john, and unshadow prepare crackable hashes.'
  ],
  quiz: [
    { id: 'q-mcc-1', question: 'Which is one-way — hashing or encryption?', type: 'text', correctAnswer: 'Hashing', hint: 'Encryption is reversible with a key.' },
    { id: 'q-mcc-2', question: 'Which symmetric algorithm is the modern standard?', type: 'text', correctAnswer: 'AES', hint: 'DES/3DES are dead.' },
    { id: 'q-mcc-3', question: 'Which hash prefix indicates SHA-512crypt on Linux?', type: 'text', correctAnswer: '$6$', hint: 'Seen in /etc/shadow.' },
    { id: 'q-mcc-4', question: 'Is Base64 encryption?', type: 'text', correctAnswer: 'No', hint: 'It is reversible encoding, no key.' }
  ]
};

export const CYBER_SECURITY_101_MODULES: Module[] = [
  {
    id: START_MODULE_ID,
    title: 'Start Your Cyber Security Journey',
    description: 'Begin with the essential mindset and tools: offensive vs defensive security, and the search skills every analyst relies on.',
    isFuture: false,
    topics: [
      { ...offensiveSecurityIntroRoom, moduleId: START_MODULE_ID },
      { ...defensiveSecurityIntroRoom, moduleId: START_MODULE_ID },
      searchSkillsRoom,
      mysteryChestRoom,
    ],
  },
  {
    id: LINUX_FUNDAMENTALS_MODULE_ID,
    title: 'Linux Fundamentals',
    description: 'Learn to operate Linux from the command line — navigation, file management, permissions, processes, automation, and logs across three hands-on rooms plus a bonus revision chest.',
    isFuture: false,
    topics: [
      linuxFund1Room,
      linuxFund2Room,
      linuxFund3Room,
      linuxChestRoom,
    ],
  },
  {
    id: WINDOWS_AD_MODULE_ID,
    title: 'Windows and AD Fundamentals',
    description: 'Learn to navigate, administer, and secure Windows — the desktop and file system, built-in management tools, Windows security features, and Active Directory — across four rooms plus a bonus revision chest.',
    isFuture: false,
    topics: [
      winFund1Room,
      winFund2Room,
      winFund3Room,
      activeDirectoryRoom,
      winChestRoom,
    ],
  },
  {
    id: COMMAND_LINE_MODULE_ID,
    title: 'Command Line',
    description: 'Get fluent at the terminal across platforms — the Windows Command Prompt, object-oriented PowerShell, and Linux shells with Bash scripting — across three hands-on rooms plus a bonus revision chest.',
    isFuture: false,
    topics: [
      winCmdRoom,
      powershellRoom,
      linuxShellsRoom,
      cliChestRoom,
    ],
  },
  {
    id: NETWORKING_MODULE_ID,
    title: 'Networking',
    description: 'Master networking end to end — the OSI/TCP-IP models and addressing, the core and secure protocols, and the essential traffic-analysis and scanning tools Wireshark, tcpdump, and Nmap — across seven rooms plus a bonus revision chest.',
    isFuture: false,
    topics: [
      netConceptsRoom,
      netEssentialsRoom,
      netCoreRoom,
      netSecureRoom,
      wiresharkRoom,
      tcpdumpRoom,
      nmapRoom,
      netChestRoom,
    ],
  },
  {
    id: CRYPTOGRAPHY_MODULE_ID,
    title: 'Cryptography',
    description: 'Understand how data is protected — encryption fundamentals, public key cryptography and digital signatures, one-way hashing and secure password storage, and offline password cracking with John the Ripper — across four rooms plus a bonus revision chest.',
    isFuture: false,
    topics: [
      cryptoBasicsRoom,
      publicKeyRoom,
      hashingRoom,
      johnRoom,
      cryptoChestRoom,
    ],
  },
  {
    id: EXPLOITATION_MODULE_ID,
    title: 'Exploitation Basics',
    description: 'Learn exploitation fundamentals — CVE analysis, Metasploit reconnaissance and exploitation, post-exploitation with Meterpreter, and real Windows CTFs — across six hands-on rooms plus a bonus revision chest.',
    isFuture: false,
    topics: [
      {
        id: 'moniker-link',
        moduleId: EXPLOITATION_MODULE_ID,
        title: 'Moniker Link (CVE-2024-21413)',
        description: 'Analyze and exploit a critical Microsoft Outlook vulnerability that abuses Moniker Links to bypass Protected View and leak NetNTLMv2 credentials.',
        status: 'unlocked',
        iconType: 'shield',
        content: '',
        realWorldCallout: {
          title: 'One Click, Stolen Credentials',
          concept: 'Zero-Attachment Credential Theft',
          scenario: 'An employee receives a normal-looking email and clicks a single hyperlink. With no attachment, macro, or executable, Outlook silently forces Windows to authenticate to an attacker-controlled SMB server, handing over the user\'s NetNTLMv2 hash for offline cracking or relay.',
          relevance: 'CVE-2024-21413 shows how a design flaw in trusted software turns a one-click link into full credential disclosure — which is why patching, disabling SMB egress, and user awareness all matter.'
        },
        mindmap: [
          { id: 'moniker', label: 'Moniker Link', description: 'CVE-2024-21413 — Outlook Protected View bypass', x: 50, y: 12, connections: ['cve', 'bypass', 'smb', 'detect'] },
          { id: 'cve', label: 'The CVE', description: 'Critical Outlook flaw, CVSS 9.8, disclosed Feb 2024', x: 16, y: 50 },
          { id: 'bypass', label: 'The Trick', description: 'A `!` character in a file:// link bypasses Protected View', x: 39, y: 58 },
          { id: 'smb', label: 'SMB + NTLM', description: 'Windows auto-authenticates to attacker SMB, leaking NetNTLMv2', x: 62, y: 58 },
          { id: 'detect', label: 'Detect & Mitigate', description: 'Responder capture, YARA, Wireshark; patch and block SMB egress', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'CVE-2024-21413 is a critical (CVSS 9.8) Microsoft Outlook vulnerability disclosed in February 2024.',
          'It abuses Moniker Links: adding a `!` character to a file:// hyperlink bypasses Outlook Protected View.',
          'The exploit needs only one click — no attachment, macro, or executable.',
          'Windows then auto-authenticates to an attacker-controlled SMB server (TCP 445), leaking the NetNTLMv2 hash.',
          'Captured hashes can be cracked offline or relayed; under some conditions the flaw can lead to RCE.',
          'Detect with Responder, YARA rules, and Wireshark; mitigate by patching Outlook and blocking outbound SMB.'
        ],
        quiz: [
          { id: 'q-ml-1', question: 'Which CVE identifier is the Moniker Link vulnerability?', type: 'text', correctAnswer: 'CVE-2024-21413', hint: 'Disclosed in February 2024.' },
          { id: 'q-ml-2', question: 'Which single character in the hyperlink bypasses Protected View?', type: 'text', correctAnswer: '!', hint: 'An exclamation mark acts as the object separator.' },
          { id: 'q-ml-3', question: 'Which type of credential hash is leaked by the exploit?', type: 'text', correctAnswer: 'NetNTLMv2', hint: 'Sent during SMB authentication.' },
          { id: 'q-ml-4', question: 'Which TCP port does the leaked SMB authentication use?', type: 'text', correctAnswer: '445', hint: 'The standard SMB port.' },
          { id: 'q-ml-5', question: 'What is the CVSS score of CVE-2024-21413?', type: 'text', correctAnswer: '9.8', hint: 'Critical severity, 9.0–10.0 range.' }
        ]
      },
      {
        id: 'metasploit-intro',
        moduleId: EXPLOITATION_MODULE_ID,
        title: 'Metasploit: Introduction',
        description: 'Master the Metasploit Framework — architecture, module types, payloads and Meterpreter, and driving msfconsole to search, load, configure, and run modules.',
        status: 'unlocked',
        iconType: 'search',
        content: '',
        realWorldCallout: {
          title: 'The Penetration Tester\'s Swiss Army Knife',
          concept: 'Unified Exploitation Framework',
          scenario: 'A tester needs to scan for a service, find a matching exploit, deliver a payload, and manage the resulting session — all consistently. Instead of juggling separate tools, they use Metasploit\'s modular framework to do every step from one console.',
          relevance: 'Metasploit is the industry-standard framework, so knowing its architecture and msfconsole workflow is foundational for both offensive testing and understanding how attacks are automated.'
        },
        mindmap: [
          { id: 'msf', label: 'Metasploit', description: 'Modular exploitation framework', x: 50, y: 12, connections: ['modules', 'payloads', 'console', 'workflow'] },
          { id: 'modules', label: 'Modules', description: 'Exploit, Payload, Auxiliary, Post, Encoder, NOP', x: 16, y: 50 },
          { id: 'payloads', label: 'Payloads', description: 'Singles, stagers, stages; Meterpreter is a payload', x: 39, y: 58 },
          { id: 'console', label: 'msfconsole', description: 'The interactive CLI; msfvenom generates payloads', x: 62, y: 58 },
          { id: 'workflow', label: 'Workflow', description: 'search → use → show options → set → run', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'Metasploit is a modular exploitation framework with six module types: Exploit, Payload, Auxiliary, Post, Encoder, and NOP.',
          'msfconsole is the interactive interface; msfvenom is the standalone payload generator.',
          'A payload is what runs after an exploit succeeds; Meterpreter is an advanced payload, not a module type.',
          'Payloads are staged (a slash, delivered in two phases) or stageless (an underscore, sent at once).',
          'The core workflow is search → use → show options → set → run.',
          'EternalBlue (MS17-010) is a famous exploit module included with the framework.'
        ],
        quiz: [
          { id: 'q-mi-1', question: 'Which Metasploit module type contains the code that runs after a successful exploit?', type: 'text', correctAnswer: 'Payload', hint: 'Not the exploit itself.' },
          { id: 'q-mi-2', question: 'What is the interactive Metasploit command-line interface called?', type: 'text', correctAnswer: 'msfconsole', hint: 'You launch it by name.' },
          { id: 'q-mi-3', question: 'Which tool generates standalone payloads?', type: 'text', correctAnswer: 'msfvenom', hint: 'Combines the old msfpayload and msfencode.' },
          { id: 'q-mi-4', question: 'Which command loads a module in msfconsole?', type: 'text', correctAnswer: 'use', hint: 'e.g. use exploit/windows/smb/ms17_010_eternalblue.' },
          { id: 'q-mi-5', question: 'Is Meterpreter a module type or a payload?', type: 'text', correctAnswer: 'Payload', hint: 'It is an advanced one delivered after exploitation.' }
        ]
      },
      {
        id: 'metasploit-exploitation',
        moduleId: EXPLOITATION_MODULE_ID,
        title: 'Metasploit: Exploitation',
        description: 'Use Metasploit end to end — search and configure exploit modules, run auxiliary scanners, use the database and workspaces, choose reverse vs bind payloads, and generate payloads with MSFvenom.',
        status: 'unlocked',
        iconType: 'sword',
        content: '',
        realWorldCallout: {
          title: 'From Open Port to Shell',
          concept: 'Structured Exploitation',
          scenario: 'After recon reveals a vulnerable service, a tester loads the matching exploit, sets RHOSTS and a compatible payload, and runs it — landing a session. Auxiliary scanners and the Metasploit database keep large engagements organised across many hosts.',
          relevance: 'Turning a discovered vulnerability into a working session is the core skill of exploitation, and doing it methodically with payload choice and record-keeping is what separates a pro from a script-runner.'
        },
        mindmap: [
          { id: 'exploit', label: 'Exploitation', description: 'Turning a vulnerability into a session', x: 50, y: 12, connections: ['find', 'config', 'payload', 'venom'] },
          { id: 'find', label: 'Find & Scan', description: 'search modules; auxiliary scanners; db_nmap', x: 16, y: 50 },
          { id: 'config', label: 'Configure', description: 'show options; set RHOSTS/LHOST; workspaces', x: 39, y: 58 },
          { id: 'payload', label: 'Payloads', description: 'Reverse vs bind; run to open a session', x: 62, y: 58 },
          { id: 'venom', label: 'MSFvenom', description: 'Generate standalone payloads; catch with multi/handler', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'The exploitation workflow: search for a module, use it, show options, set parameters, and run.',
          'RHOSTS is the target; LHOST/LPORT define where a reverse connection comes back to.',
          'Auxiliary modules scan and enumerate without exploiting; the Metasploit database and workspaces organise results.',
          'A reverse shell has the victim connect back (firewall-friendly); a bind shell listens on the victim.',
          'MSFvenom generates standalone payloads, which are caught with the multi/handler module.',
          'A successful exploit can return a plain command shell or a Meterpreter session.'
        ],
        quiz: [
          { id: 'q-me-1', question: 'Which option sets the target host(s) for an exploit module?', type: 'text', correctAnswer: 'RHOSTS', hint: 'R for remote.' },
          { id: 'q-me-2', question: 'Which shell type has the victim connect back to the attacker?', type: 'text', correctAnswer: 'Reverse shell', hint: 'Firewall-friendly; the opposite of bind.' },
          { id: 'q-me-3', question: 'Which tool generates standalone payloads outside the console?', type: 'text', correctAnswer: 'MSFvenom', hint: 'msfvenom on the command line.' },
          { id: 'q-me-4', question: 'Which module catches connections from a standalone payload?', type: 'text', correctAnswer: 'multi/handler', hint: 'exploit/multi/handler.' },
          { id: 'q-me-5', question: 'Which module type scans and enumerates without exploiting?', type: 'text', correctAnswer: 'Auxiliary', hint: 'Scanners and fuzzers live here.' }
        ]
      },
      {
        id: 'metasploit-meterpreter',
        moduleId: EXPLOITATION_MODULE_ID,
        title: 'Metasploit: Meterpreter',
        description: 'Post-exploitation with Meterpreter — the in-memory payload, process injection and migration, file/network/system commands, privilege escalation, and credential dumping with hashdump and Kiwi.',
        status: 'unlocked',
        iconType: 'linux-cli',
        content: '',
        realWorldCallout: {
          title: 'A Mini OS Inside the Victim',
          concept: 'In-Memory Post-Exploitation',
          scenario: 'After an exploit lands, the tester drops into Meterpreter — enumerating the host, dumping SAM hashes with hashdump, escalating to SYSTEM with getsystem, and migrating into a stable process, all from memory without writing a file to disk.',
          relevance: 'Meterpreter is the standard post-exploitation agent; understanding its in-memory, injected nature is key for both operators and the defenders whose EDR must catch it.'
        },
        mindmap: [
          { id: 'met', label: 'Meterpreter', description: 'Advanced in-memory post-exploitation payload', x: 50, y: 12, connections: ['memory', 'session', 'creds', 'migrate'] },
          { id: 'memory', label: 'In Memory', description: 'Runs in RAM, injects into a legit process, encrypted C2', x: 16, y: 50 },
          { id: 'session', label: 'Session', description: 'help, file/network/system commands, extensions', x: 39, y: 58 },
          { id: 'creds', label: 'Credentials', description: 'getsystem → SYSTEM; hashdump; Kiwi (Mimikatz)', x: 62, y: 58 },
          { id: 'migrate', label: 'Migrate', description: 'Move into a stable, same-privilege process', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'Meterpreter is an advanced Metasploit payload that runs entirely in the target\'s memory after exploitation.',
          'It injects into a legitimate process (e.g. spoolsv.exe) via reflective loading — "fileless" but not undetectable.',
          'Encrypted C2 evades signature-based IDS/IPS, but behavioural EDR still detects it.',
          'Sessions provide built-in commands, loadable extensions (kiwi, python), and post modules; start with help.',
          'getsystem escalates to NT AUTHORITY\\SYSTEM; hashdump reads NTLM hashes from the SAM.',
          'The Kiwi extension is the Meterpreter version of Mimikatz; migrate moves into a stable process.'
        ],
        quiz: [
          { id: 'q-mm-1', question: 'Where does Meterpreter run to avoid writing to disk?', type: 'text', correctAnswer: 'Memory', hint: 'In RAM.' },
          { id: 'q-mm-2', question: 'Which command attempts to escalate to the SYSTEM account?', type: 'text', correctAnswer: 'getsystem', hint: 'Reaches NT AUTHORITY\\SYSTEM.' },
          { id: 'q-mm-3', question: 'Which command dumps password hashes from the SAM?', type: 'text', correctAnswer: 'hashdump', hint: 'Requires SYSTEM/Administrator.' },
          { id: 'q-mm-4', question: 'Which Meterpreter extension is the built-in Mimikatz?', type: 'text', correctAnswer: 'Kiwi', hint: 'Load it with load kiwi.' },
          { id: 'q-mm-5', question: 'Which command moves Meterpreter into another process?', type: 'text', correctAnswer: 'migrate', hint: 'migrate <PID>.' }
        ]
      },
      {
        id: 'blue',
        moduleId: EXPLOITATION_MODULE_ID,
        title: 'Blue',
        description: 'A guided Windows CTF: scan with Nmap, exploit EternalBlue (MS17-010) with Metasploit, upgrade to Meterpreter, escalate to SYSTEM, dump NTLM hashes, crack them with John, and capture the flags.',
        status: 'unlocked',
        iconType: 'windows',
        content: '',
        realWorldCallout: {
          title: 'How WannaCry Spread',
          concept: 'Unpatched SMB, Total Compromise',
          scenario: 'A Windows host still runs SMBv1 and is missing the MS17-010 patch. An attacker scans it, fires EternalBlue, lands as SYSTEM, dumps NTLM hashes, and cracks a weak password offline — the exact chain that let WannaCry and NotPetya devastate networks worldwide in 2017.',
          relevance: 'Blue turns the theory into a hands-on walkthrough, showing why disabling SMBv1, patching promptly, and enforcing strong passwords are non-negotiable defences.'
        },
        mindmap: [
          { id: 'blue', label: 'Blue', description: 'Windows CTF via EternalBlue', x: 50, y: 12, connections: ['recon', 'exploit', 'escalate', 'crack'] },
          { id: 'recon', label: 'Recon', description: 'nmap -sC -sV finds SMB on 445; ms17-010 vulnerable', x: 16, y: 50 },
          { id: 'exploit', label: 'Exploit', description: 'ms17_010_eternalblue + reverse_tcp → shell', x: 39, y: 58 },
          { id: 'escalate', label: 'Escalate', description: 'shell_to_meterpreter; getsystem → SYSTEM; migrate', x: 62, y: 58 },
          { id: 'crack', label: 'Loot & Crack', description: 'hashdump NTLM; John cracks; find three flags', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'Recon with nmap -sC -sV reveals SMB on port 445 and flags the host vulnerable to ms17-010.',
          'EternalBlue is MS17-010 / CVE-2017-0144, an unauthenticated RCE in SMBv1 that runs as SYSTEM.',
          'Exploit it with exploit/windows/smb/ms17_010_eternalblue, set RHOSTS, and run.',
          'Upgrade the shell with post/multi/manage/shell_to_meterpreter, then getsystem for SYSTEM.',
          'hashdump extracts NTLM hashes from the SAM; the non-default user is Jon (RID 1000).',
          'John the Ripper cracks Jon\'s hash to alqfna22; NTLM is unsalted and cracks fast.'
        ],
        quiz: [
          { id: 'q-bl-1', question: 'Which Windows protocol/service does EternalBlue exploit?', type: 'text', correctAnswer: 'SMB', hint: 'SMBv1, on port 445.' },
          { id: 'q-bl-2', question: 'Which Microsoft bulletin patches EternalBlue?', type: 'text', correctAnswer: 'MS17-010', hint: 'CVE-2017-0144.' },
          { id: 'q-bl-3', question: 'Which module upgrades a shell to Meterpreter?', type: 'text', correctAnswer: 'shell_to_meterpreter', hint: 'post/multi/manage/shell_to_meterpreter.' },
          { id: 'q-bl-4', question: 'Which non-default user account is found on the box?', type: 'text', correctAnswer: 'Jon', hint: 'RID 1000.' },
          { id: 'q-bl-5', question: 'What password does John recover for that user?', type: 'text', correctAnswer: 'alqfna22', hint: 'Cracked from the NTLM hash.' }
        ]
      },
      {
        id: 'trypwnme-one',
        moduleId: EXPLOITATION_MODULE_ID,
        title: 'TryPwnMe One',
        description: 'A hands-on binary exploitation (PWN) challenge series — the stack and process memory, buffer overflows, variable overwrites, shellcode, Ret2Win, address leaks, libc/PIE, and automation with Pwntools.',
        status: 'unlocked',
        iconType: 'skull',
        content: '',
        realWorldCallout: {
          title: 'Why C Programs Get Owned',
          concept: 'Memory Corruption',
          scenario: 'A program reads user input into a fixed buffer with gets(). An attacker sends far more data than it holds, overwrites the saved return address, and redirects execution to a win() function — spawning a shell without any legitimate credentials.',
          relevance: 'Buffer overflows remain a root cause of critical vulnerabilities; understanding the stack, return addresses, and protections like NX/ASLR/PIE is foundational to both exploitation and secure coding.'
        },
        mindmap: [
          { id: 'pwn', label: 'Binary Exploitation', description: 'Abusing memory bugs in compiled programs', x: 50, y: 12, connections: ['stack', 'overflow', 'techniques', 'tools'] },
          { id: 'stack', label: 'The Stack', description: 'Locals, saved RBP, return address; grows down', x: 16, y: 50 },
          { id: 'overflow', label: 'Buffer Overflow', description: 'gets() has no bounds check; overwrite adjacent memory', x: 39, y: 58 },
          { id: 'techniques', label: 'Techniques', description: 'Variable overwrite, shellcode, Ret2Win, leaks vs ASLR/PIE', x: 62, y: 58 },
          { id: 'tools', label: 'Pwntools', description: 'remote, cyclic, p32/p64, interactive', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'Binary exploitation (PWN) abuses programming mistakes in compiled programs to control execution.',
          'Process memory splits into Text, Data, BSS, Heap, and Stack; the stack grows down and holds the return address.',
          'gets() and oversized read() calls have no bounds checking, so input overflows into adjacent memory.',
          'Overwriting a nearby variable changes logic; overwriting the return address (Ret2Win) hijacks control flow.',
          'Shellcode injects new code (blocked by NX); Ret2Win reuses existing code and needs no executable memory.',
          'ASLR and PIE randomise addresses; leaking one address plus fixed offsets defeats them. Pwntools automates it all.'
        ],
        quiz: [
          { id: 'q-tp-1', question: 'Which unsafe C function has no bounds checking and causes overflows?', type: 'text', correctAnswer: 'gets', hint: 'gets(buf).' },
          { id: 'q-tp-2', question: 'What saved value on the stack do overflow attacks aim to overwrite?', type: 'text', correctAnswer: 'Return address', hint: 'It decides where execution resumes.' },
          { id: 'q-tp-3', question: 'What is the technique of overwriting the return address to reach an existing win() function called?', type: 'text', correctAnswer: 'Ret2Win', hint: 'Return-to-Win.' },
          { id: 'q-tp-4', question: 'Which protection randomises memory addresses each run?', type: 'text', correctAnswer: 'ASLR', hint: 'Address Space Layout Randomization.' },
          { id: 'q-tp-5', question: 'Which Python framework automates exploit development?', type: 'text', correctAnswer: 'Pwntools', hint: 'from pwn import *.' }
        ]
      },
      {
        id: 'mystery-chest-exploitation',
        moduleId: EXPLOITATION_MODULE_ID,
        title: 'Mystery Chest',
        description: 'A bonus revision vault for the whole Exploitation Basics module: the exploitation lifecycle, Metasploit and Meterpreter command references, key CVEs, and binary-exploitation concepts.',
        status: 'unlocked',
        iconType: 'mystery-chest',
        content: '',
        realWorldCallout: {
          title: 'The Exploitation Field Card',
          concept: 'Fast Recall Under Pressure',
          scenario: 'Mid-lab, an analyst needs the exact msfconsole loop, a Meterpreter command, or the CVE behind EternalBlue. Instead of switching to a browser, they glance at one consolidated sheet covering the lifecycle, Metasploit, Meterpreter, CVEs, and binary-exploitation concepts.',
          relevance: 'Exploitation rewards a repeatable methodology; consolidating the module into a single reference makes the workflow, commands, and concepts stick for labs and interviews.'
        },
        mindmap: [
          { id: 'chest-exploit', label: 'Exploitation Cheat Sheet', description: 'The whole module at a glance', x: 50, y: 15, connections: ['life', 'msf', 'pwn'] },
          { id: 'life', label: 'Lifecycle', description: 'Recon → Vuln ID → Exploit → Post-Exploit → Document', x: 20, y: 52 },
          { id: 'msf', label: 'Metasploit', description: 'Modules, msfconsole loop, Meterpreter commands', x: 50, y: 58 },
          { id: 'pwn', label: 'Binary & CVEs', description: 'EternalBlue, Moniker Link; overflows and protections', x: 80, y: 52 }
        ],
        keyTakeaways: [
          'The exploitation lifecycle: Reconnaissance → Vulnerability Identification → Exploitation → Post-Exploitation → Documentation.',
          'Metasploit modules: Exploit, Payload, Auxiliary, Post, Encoder, NOP; the console loop is search → use → show options → set → run.',
          'Meterpreter is an in-memory payload; key commands include getsystem, hashdump, migrate, shell, and search -f.',
          'EternalBlue (MS17-010, CVE-2017-0144) is an unauthenticated SMBv1 RCE; Moniker Link (CVE-2024-21413) leaks NetNTLMv2 from Outlook.',
          'Binary exploitation overwrites the return address; Ret2Win reuses existing code and shellcode injects new code.',
          'Protections NX, ASLR, PIE, Stack Canary, and RELRO force attackers to leak an address first; Pwntools automates the attack.'
        ],
        quiz: [
          { id: 'q-mce-1', question: 'What is the first phase of the exploitation lifecycle?', type: 'text', correctAnswer: 'Reconnaissance', hint: 'Discover the attack surface.' },
          { id: 'q-mce-2', question: 'What is the standard msfconsole workflow loop?', type: 'text', correctAnswer: 'search, use, show options, set, run', hint: 'Five steps from finding to firing a module.' },
          { id: 'q-mce-3', question: 'Which CVE identifies EternalBlue?', type: 'text', correctAnswer: 'CVE-2017-0144', hint: 'MS17-010.' },
          { id: 'q-mce-4', question: 'Which protection is bypassed by leaking a memory address?', type: 'text', correctAnswer: 'ASLR', hint: 'Also PIE.' }
        ]
      },
    ],
  },
  {
    id: WEB_HACKING_MODULE_ID,
    title: 'Web Hacking',
    description: 'Learn how web applications work and how they break — web application fundamentals, JavaScript, SQL and injection, and the Burp Suite proxy — across four hands-on rooms plus a bonus revision chest.',
    isFuture: false,
    topics: [
      {
        id: 'web-application-basics',
        moduleId: WEB_HACKING_MODULE_ID,
        title: 'Web Application Basics',
        description: 'How web applications are built: front end vs back end, HTML/CSS/JavaScript, HTTP requests and responses, and how the browser and server communicate.',
        status: 'unlocked',
        iconType: 'web',
        content: '',
        realWorldCallout: {
          title: 'Reading What the Browser Reveals',
          concept: 'The Client Is Never Trusted',
          scenario: 'A tester opens a login page, views the page source, and finds a developer comment leaking an internal admin path and a hidden form field controlling the user role — none of which the server re-checks.',
          relevance: 'Everything sent to the browser is visible to the user, so understanding the front-end/back-end split is the foundation of every web attack and defence.'
        },
        mindmap: [
          { id: 'web', label: 'Web App Basics', description: 'How the browser and server build a page together', x: 50, y: 12, connections: ['front', 'back', 'http', 'trust'] },
          { id: 'front', label: 'Front End', description: 'HTML structure, CSS style, JavaScript behaviour — runs in the browser', x: 16, y: 50 },
          { id: 'back', label: 'Back End', description: 'Server language + database + web server software', x: 39, y: 58 },
          { id: 'http', label: 'HTTP', description: 'Requests (GET/POST) and responses (2xx/3xx/4xx/5xx)', x: 62, y: 58 },
          { id: 'trust', label: 'Trust Boundary', description: 'Client is fully visible; enforce security on the server', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'A web app splits into a front end (browser) and a back end (server + database) that talk over HTTP/HTTPS.',
          'The front end is HTML (structure), CSS (style), and JavaScript (behaviour) — all visible to the user.',
          'The back end runs the application language, database, and web-server software the user never sees.',
          'HTTP methods: GET reads, POST submits, PUT creates/replaces, DELETE removes.',
          'Status codes group into 2xx success, 3xx redirect, 4xx client error, 5xx server error.',
          'Never trust the client — all validation and authorisation must be enforced on the back end.'
        ],
        quiz: [
          { id: 'q-wab-1', question: 'Which language provides the structure and content of a web page?', type: 'text', correctAnswer: 'HTML', hint: 'CSS styles it, JS adds behaviour.' },
          { id: 'q-wab-2', question: 'Which HTTP method is used to submit data to the server?', type: 'text', correctAnswer: 'POST', hint: 'GET retrieves; this one sends.' },
          { id: 'q-wab-3', question: 'Which HTTP status code means "Not Found"?', type: 'text', correctAnswer: '404', hint: 'A 4xx client error.' },
          { id: 'q-wab-4', question: 'Where must security validation be enforced — front end or back end?', type: 'text', correctAnswer: 'Back end', hint: 'The client is always visible/editable.' },
          { id: 'q-wab-5', question: 'What does the front end run inside?', type: 'text', correctAnswer: 'The browser', hint: 'Client-side.' }
        ]
      },
      {
        id: 'javascript-essentials',
        moduleId: WEB_HACKING_MODULE_ID,
        title: 'JavaScript Essentials',
        description: 'The language of the browser: variables, functions, events, the DOM, and how JavaScript manipulates pages — plus why client-side code can never be trusted for security.',
        status: 'unlocked',
        iconType: 'js-demo',
        content: '',
        realWorldCallout: {
          title: 'Bypassing the Disabled Button',
          concept: 'Client-Side Controls Are Optional',
          scenario: 'A form disables its submit button until "terms" are accepted using JavaScript. A tester simply removes the check in the browser console — or sends the request directly — and the server accepts it because it never re-validated.',
          relevance: 'JavaScript drives every modern web page, and understanding that it runs on the client is what lets you see why front-end restrictions are trivial to bypass.'
        },
        mindmap: [
          { id: 'js', label: 'JavaScript', description: 'The programming language of the browser', x: 50, y: 12, connections: ['syntax', 'dom', 'events', 'sec'] },
          { id: 'syntax', label: 'Syntax', description: 'Variables, types, functions, conditionals, loops', x: 16, y: 50 },
          { id: 'dom', label: 'The DOM', description: 'JS reads and modifies the page structure live', x: 39, y: 58 },
          { id: 'events', label: 'Events', description: 'Respond to clicks, input, and page load', x: 62, y: 58 },
          { id: 'sec', label: 'Security', description: 'Client-side code is readable and tamperable — never a control', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'JavaScript is the programming language that runs in the browser and makes pages interactive.',
          'It declares variables (let, const, var), functions, conditionals, and loops like other languages.',
          'The DOM (Document Object Model) is the page as objects; JavaScript reads and modifies it live.',
          'Event handlers respond to user actions such as clicks, key presses, and page load.',
          'JavaScript can make background HTTP requests (fetch/XHR) without reloading the page.',
          'Because JS is delivered to and runs in the browser, users can read and tamper with it — client-side checks are not security.'
        ],
        quiz: [
          { id: 'q-js-1', question: 'What does DOM stand for?', type: 'text', correctAnswer: 'Document Object Model', hint: 'The page represented as objects JS can change.' },
          { id: 'q-js-2', question: 'Which keyword declares a constant in modern JavaScript?', type: 'text', correctAnswer: 'const', hint: 'let is reassignable; this one is not.' },
          { id: 'q-js-3', question: 'Where does JavaScript run in a normal web page?', type: 'text', correctAnswer: 'The browser', hint: 'Client-side.' },
          { id: 'q-js-4', question: 'Can client-side JavaScript validation be trusted as a security control?', type: 'text', correctAnswer: 'No', hint: 'The user can read and bypass it.' },
          { id: 'q-js-5', question: 'What is triggered when a user clicks a button or types in a field?', type: 'text', correctAnswer: 'An event', hint: 'Handled by event handlers.' }
        ]
      },
      {
        id: 'sql-fundamentals',
        moduleId: WEB_HACKING_MODULE_ID,
        title: 'SQL Fundamentals',
        description: 'How databases power web apps: tables and relationships, the core SQL statements (SELECT/INSERT/UPDATE/DELETE), clauses and operators, and why unsafe queries lead to SQL injection.',
        status: 'unlocked',
        iconType: 'sql-basics',
        content: '',
        realWorldCallout: {
          title: 'One Quote Breaks the Query',
          concept: 'Untrusted Input in a Query',
          scenario: 'A login form builds its SQL by pasting the username straight into the query string. Entering \' OR \'1\'=\'1 turns the WHERE clause always-true, and the attacker logs in as the first user without a password.',
          relevance: 'Almost every web back end is a database, so understanding SQL is what lets you both query data correctly and recognise the injection flaws that come from building queries unsafely.'
        },
        mindmap: [
          { id: 'sql', label: 'SQL', description: 'The language of relational databases', x: 50, y: 12, connections: ['tables', 'crud', 'clauses', 'inj'] },
          { id: 'tables', label: 'Tables', description: 'Rows and columns; databases hold related tables', x: 16, y: 50 },
          { id: 'crud', label: 'Statements', description: 'SELECT, INSERT, UPDATE, DELETE', x: 39, y: 58 },
          { id: 'clauses', label: 'Clauses', description: 'WHERE, ORDER BY, LIMIT, LIKE, UNION', x: 62, y: 58 },
          { id: 'inj', label: 'SQL Injection', description: 'Unsafe input in queries; fix with parameterised queries', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'Relational databases store data in tables of rows and columns, queried with SQL.',
          'The four core statements are SELECT (read), INSERT (add), UPDATE (modify), and DELETE (remove).',
          'Clauses shape results: WHERE filters, ORDER BY sorts, LIMIT caps, LIKE pattern-matches.',
          'UNION combines the results of two SELECT statements and is central to injection attacks.',
          'SQL injection occurs when untrusted user input is concatenated into a query.',
          'The primary defence is parameterised queries (prepared statements), which separate code from data.'
        ],
        quiz: [
          { id: 'q-sql-1', question: 'Which SQL statement reads rows from a table?', type: 'text', correctAnswer: 'SELECT', hint: 'The read operation.' },
          { id: 'q-sql-2', question: 'Which clause filters which rows a query returns?', type: 'text', correctAnswer: 'WHERE', hint: 'e.g. WHERE id = 5.' },
          { id: 'q-sql-3', question: 'Which keyword combines the results of two SELECT queries?', type: 'text', correctAnswer: 'UNION', hint: 'Common in injection attacks.' },
          { id: 'q-sql-4', question: 'What vulnerability comes from concatenating user input into a query?', type: 'text', correctAnswer: 'SQL injection', hint: 'SQLi.' },
          { id: 'q-sql-5', question: 'What is the main defence against SQL injection?', type: 'text', correctAnswer: 'Parameterised queries', hint: 'Also called prepared statements.' }
        ]
      },
      {
        id: 'burp-suite-basics',
        moduleId: WEB_HACKING_MODULE_ID,
        title: 'Burp Suite: The Basics',
        description: 'The web pentester\'s core tool: the intercepting proxy, the Burp browser and scope, and the Proxy, Target, Repeater, Intruder, Decoder, and Comparer tools.',
        status: 'unlocked',
        iconType: 'search',
        content: '',
        realWorldCallout: {
          title: 'Editing the Request in Flight',
          concept: 'Intercept, Modify, Replay',
          scenario: 'A price field is fixed in the browser, but a tester intercepts the checkout request in Burp Proxy, changes the price to 1, forwards it, and the server — trusting the request — processes the discounted order.',
          relevance: 'Burp Suite is the standard tool for web testing; intercepting and replaying requests is how nearly every web vulnerability is found and confirmed.'
        },
        mindmap: [
          { id: 'burp', label: 'Burp Suite', description: 'Intercepting proxy for web testing', x: 50, y: 12, connections: ['proxy', 'repeater', 'intruder', 'tools'] },
          { id: 'proxy', label: 'Proxy', description: 'Intercept and modify requests/responses in transit', x: 16, y: 50 },
          { id: 'repeater', label: 'Repeater', description: 'Manually tweak and resend a single request', x: 39, y: 58 },
          { id: 'intruder', label: 'Intruder', description: 'Automate and fuzz a request across payloads', x: 62, y: 58 },
          { id: 'tools', label: 'Decoder & More', description: 'Target scope, Decoder, Comparer', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'Burp Suite is an intercepting proxy that sits between the browser and the web server.',
          'The Proxy intercepts, views, and modifies requests and responses in transit.',
          'Target maps the application and defines the scope of testing.',
          'Repeater resends a single request with manual tweaks; Intruder automates and fuzzes across payloads.',
          'Decoder encodes/decodes data (URL, Base64, hex) and Comparer diffs two responses.',
          'Point the browser at Burp (the bundled browser or a proxy add-on) so all traffic flows through it.'
        ],
        quiz: [
          { id: 'q-burp-1', question: 'What type of tool is Burp Suite at its core?', type: 'text', correctAnswer: 'Intercepting proxy', hint: 'It sits between browser and server.' },
          { id: 'q-burp-2', question: 'Which Burp tool resends a single request with manual edits?', type: 'text', correctAnswer: 'Repeater', hint: 'Tweak and resend one request.' },
          { id: 'q-burp-3', question: 'Which Burp tool automates/fuzzes a request across many payloads?', type: 'text', correctAnswer: 'Intruder', hint: 'Payload positions.' },
          { id: 'q-burp-4', question: 'Which Burp tool encodes and decodes data like Base64 and URL?', type: 'text', correctAnswer: 'Decoder', hint: 'Encode/decode utility.' },
          { id: 'q-burp-5', question: 'Which Burp feature intercepts and modifies traffic in transit?', type: 'text', correctAnswer: 'Proxy', hint: 'The heart of Burp.' }
        ]
      },
      {
        id: 'mystery-chest-web-hacking',
        moduleId: WEB_HACKING_MODULE_ID,
        title: 'Mystery Chest',
        description: 'A bonus revision vault for the whole Web Hacking module: web app structure, HTTP, the front-end trio, SQL and injection, and the Burp Suite workflow.',
        status: 'unlocked',
        iconType: 'mystery-chest',
        content: '',
        realWorldCallout: {
          title: 'The Web Pentest Field Card',
          concept: 'Fast Recall Under Pressure',
          scenario: 'Mid-lab, a tester needs the right HTTP status meaning, an SQL clause, or which Burp tool to reach for. Instead of switching to a browser, they glance at one consolidated sheet covering web structure, HTTP, SQL, and Burp.',
          relevance: 'Web hacking rewards knowing where the trust boundary sits; consolidating the module into a single reference makes the workflow and concepts stick for labs and interviews.'
        },
        mindmap: [
          { id: 'chest-web', label: 'Web Hacking Cheat Sheet', description: 'The whole module at a glance', x: 50, y: 15, connections: ['struct', 'data', 'tool'] },
          { id: 'struct', label: 'Structure', description: 'Front end (HTML/CSS/JS) vs back end; HTTP methods & codes', x: 20, y: 52 },
          { id: 'data', label: 'Data', description: 'SQL statements/clauses and SQL injection', x: 50, y: 58 },
          { id: 'tool', label: 'Tooling', description: 'Burp Suite proxy, Repeater, Intruder', x: 80, y: 52 }
        ],
        keyTakeaways: [
          'A web app is a front end (browser: HTML/CSS/JavaScript) plus a back end (server + database) over HTTP/HTTPS.',
          'HTTP methods (GET/POST/PUT/DELETE) and status families (2xx/3xx/4xx/5xx) describe every interaction.',
          'The front end is always visible to the user, so security must be enforced on the back end.',
          'SQL reads and writes the database with SELECT/INSERT/UPDATE/DELETE plus WHERE, ORDER BY, and UNION.',
          'SQL injection comes from concatenating input into queries; parameterised queries are the fix.',
          'Burp Suite is an intercepting proxy (Proxy, Repeater, Intruder, Decoder, Comparer) for testing web traffic.'
        ],
        quiz: [
          { id: 'q-mcw-1', question: 'What are the three front-end browser languages?', type: 'text', correctAnswer: 'HTML, CSS, JavaScript', hint: 'Structure, style, behaviour.' },
          { id: 'q-mcw-2', question: 'Which HTTP status family means server error?', type: 'text', correctAnswer: '5xx', hint: 'e.g. 500.' },
          { id: 'q-mcw-3', question: 'What is the main defence against SQL injection?', type: 'text', correctAnswer: 'Parameterised queries', hint: 'Prepared statements.' },
          { id: 'q-mcw-4', question: 'Which tool is an intercepting proxy for web testing?', type: 'text', correctAnswer: 'Burp Suite', hint: 'Proxy, Repeater, Intruder.' }
        ]
      },
    ],
  },
  {
    id: OFFENSIVE_TOOLING_MODULE_ID,
    title: 'Offensive Security Tooling',
    description: 'Get hands-on with the core offensive tools: Hydra for password brute forcing, Gobuster for content and DNS enumeration, an overview of reverse/bind/web shells, and SQLMap for automated SQL injection — across four hands-on rooms plus a bonus revision chest.',
    isFuture: false,
    topics: [
      {
        id: 'hydra',
        moduleId: OFFENSIVE_TOOLING_MODULE_ID,
        title: 'Hydra',
        description: 'Brute-force live login services with Hydra: single vs list credentials, threads and ports, and attacking SSH, FTP, and HTTP POST web forms with placeholders and failure strings.',
        status: 'unlocked',
        iconType: 'sword',
        content: '',
        realWorldCallout: {
          title: 'The Password That Was Never Changed',
          concept: 'Weak and Default Credentials',
          scenario: 'A service still uses a default or common password. Hydra runs a username against rockyou.txt over SSH and lands a valid login in minutes — no exploit needed, just a guessable credential.',
          relevance: 'Online password brute force is one of the most common initial-access techniques, and understanding it is what motivates strong passwords, lockout, rate limiting, and MFA.'
        },
        mindmap: [
          { id: 'hydra', label: 'Hydra', description: 'Fast online password brute-force tool', x: 50, y: 12, connections: ['creds', 'services', 'web', 'defend'] },
          { id: 'creds', label: 'Credentials', description: '-l/-L usernames, -p/-P passwords, wordlists', x: 16, y: 50 },
          { id: 'services', label: 'Services', description: 'SSH, FTP, and many network login protocols', x: 39, y: 58 },
          { id: 'web', label: 'Web Forms', description: 'http-post-form with ^USER^/^PASS^ and F= failure string', x: 62, y: 58 },
          { id: 'defend', label: 'Defence', description: 'Strong passwords, lockout, rate limiting, MFA', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'Hydra performs online brute force by trying username/password combinations against a live service.',
          'Use -l for a single username and -L for a username list; -p for a single password and -P for a password list.',
          'The rockyou.txt wordlist (/usr/share/wordlists/rockyou.txt) is the classic password list.',
          'Hydra supports many services including ssh, ftp, and http-post-form.',
          'Web-form attacks use ^USER^/^PASS^ placeholders and an F= failure string to detect a rejected login.',
          'Online brute force is defeated by strong passwords, account lockout, rate limiting, and MFA.'
        ],
        quiz: [
          { id: 'q-hydra-1', question: 'Which Hydra flag specifies a password wordlist?', type: 'text', correctAnswer: '-P', hint: 'Uppercase P; lowercase -p is a single password.' },
          { id: 'q-hydra-2', question: 'Which classic password wordlist is commonly used with Hydra?', type: 'text', correctAnswer: 'rockyou.txt', hint: 'Found under /usr/share/wordlists/.' },
          { id: 'q-hydra-3', question: 'In an http-post-form attack, what marks the failure condition?', type: 'text', correctAnswer: 'F=', hint: 'Tells Hydra a login attempt was rejected.' },
          { id: 'q-hydra-4', question: 'Which placeholder does Hydra substitute for the username in a web form?', type: 'text', correctAnswer: '^USER^', hint: 'Password uses ^PASS^.' },
          { id: 'q-hydra-5', question: 'Name one defence against online password brute force.', type: 'text', correctAnswer: 'MFA', hint: 'Also: strong passwords, lockout, rate limiting.' }
        ]
      },
      {
        id: 'gobuster-the-basics',
        moduleId: OFFENSIVE_TOOLING_MODULE_ID,
        title: 'Gobuster: The Basics',
        description: 'Enumerate what a target does not advertise: directory and file discovery, DNS subdomain enumeration, and virtual host discovery — wordlists, status codes, and filtering out false positives.',
        status: 'unlocked',
        iconType: 'search',
        content: '',
        realWorldCallout: {
          title: 'The Directory That Was Never Linked',
          concept: 'Content Discovery',
          scenario: 'A site homepage links nothing sensitive, but Gobuster brute-forces a wordlist and finds /secret, which contains a JavaScript file leaking a flag. None of it was reachable by browsing.',
          relevance: 'Enumeration maps the real attack surface — the hidden directories, subdomains, and virtual hosts that manual browsing never reveals — which is the foundation of every web engagement.'
        },
        mindmap: [
          { id: 'gob', label: 'Gobuster', description: 'Go-based wordlist enumeration tool', x: 50, y: 12, connections: ['dir', 'dns', 'vhost', 'codes'] },
          { id: 'dir', label: 'dir mode', description: 'Discover directories and files (-u, -w, -x)', x: 16, y: 50 },
          { id: 'dns', label: 'dns mode', description: 'Brute-force DNS subdomains (-d, -w)', x: 39, y: 58 },
          { id: 'vhost', label: 'vhost mode', description: 'Find virtual hosts via the Host header', x: 62, y: 58 },
          { id: 'codes', label: 'Responses', description: 'Read status codes; filter false positives', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'Gobuster combines each wordlist entry with a target, sends a request, and analyses the response.',
          'dir mode discovers directories and files using -u (URL) and -w (wordlist); -x tests extensions.',
          'dns mode brute-forces DNS subdomains for a domain using -d and -w.',
          'vhost mode discovers virtual hosts by sending different Host headers to the same server.',
          'Gobuster dir mode is not recursive — re-scan discovered directories manually.',
          'A 403 can mean a resource exists but is protected, while a 200 can be a generic false positive.'
        ],
        quiz: [
          { id: 'q-gob-1', question: 'Which Gobuster flag specifies the wordlist?', type: 'text', correctAnswer: '-w', hint: 'The wordlist to iterate.' },
          { id: 'q-gob-2', question: 'Which mode enumerates DNS subdomains?', type: 'text', correctAnswer: 'dns', hint: 'Uses -d for the domain.' },
          { id: 'q-gob-3', question: 'Which mode discovers virtual hosts via the Host header?', type: 'text', correctAnswer: 'vhost', hint: 'Same IP, different Host header.' },
          { id: 'q-gob-4', question: 'Which flag tests file extensions in dir mode?', type: 'text', correctAnswer: '-x', hint: 'e.g. -x php,js.' },
          { id: 'q-gob-5', question: 'Is Gobuster dir mode recursive by default?', type: 'text', correctAnswer: 'No', hint: 'Re-scan discovered directories manually.' }
        ]
      },
      {
        id: 'shells-overview',
        moduleId: OFFENSIVE_TOOLING_MODULE_ID,
        title: 'Shells Overview',
        description: 'Turn a foothold into command execution: reverse vs bind vs web shells, Netcat listeners and payloads, Bash/PHP/Python one-liners, and stabilising a raw shell into a usable PTY.',
        status: 'unlocked',
        iconType: 'hacker-terminal',
        content: '',
        realWorldCallout: {
          title: 'Calling Home Through the Firewall',
          concept: 'Reverse Shells Beat Inbound Filtering',
          scenario: 'A target blocks all inbound connections, so a bind shell fails. The attacker instead runs a reverse-shell payload; the target connects OUT to a waiting Netcat listener, and outbound traffic sails through the firewall.',
          relevance: 'A shell is the bridge between exploitation and everything after it — enumeration, privilege escalation, and pivoting — so understanding shell types and listeners is core to offensive work.'
        },
        mindmap: [
          { id: 'shell', label: 'Shells', description: 'Command-line access on a compromised host', x: 50, y: 12, connections: ['rev', 'bind', 'listen', 'stab'] },
          { id: 'rev', label: 'Reverse Shell', description: 'Target connects back to the attacker (beats firewalls)', x: 16, y: 50 },
          { id: 'bind', label: 'Bind Shell', description: 'Target listens; attacker connects in', x: 39, y: 58 },
          { id: 'listen', label: 'Listener + Payload', description: 'nc -lvnp waits; payload runs on the target', x: 62, y: 58 },
          { id: 'stab', label: 'Stabilisation', description: 'Upgrade raw shell to a PTY with python3 + stty', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'A shell interprets commands and runs with the privileges of whatever obtained it — often not root.',
          'A reverse shell has the target connect back to the attacker, which beats inbound firewall rules.',
          'A bind shell has the target open a listening port for the attacker to connect to.',
          'A Netcat listener (nc -lvnp) waits on the attacker; the payload runs on the target.',
          'Payloads come in Bash (/dev/tcp, mkfifo pipe), PHP (system/exec), and Python (socket/subprocess) forms.',
          'Stabilise a raw shell into a PTY with python3 -c pty.spawn plus stty raw -echo and TERM.'
        ],
        quiz: [
          { id: 'q-shell-1', question: 'In a reverse shell, who initiates the connection?', type: 'text', correctAnswer: 'The target', hint: 'It connects back to the attacker.' },
          { id: 'q-shell-2', question: 'Which tool is the classic listener for catching a shell?', type: 'text', correctAnswer: 'Netcat', hint: 'nc -lvnp PORT.' },
          { id: 'q-shell-3', question: 'What do the flags in nc -lvnp mean (l)?', type: 'text', correctAnswer: 'Listen', hint: 'v=verbose, n=no DNS, p=port.' },
          { id: 'q-shell-4', question: 'Which Python module spawns a PTY to stabilise a shell?', type: 'text', correctAnswer: 'pty', hint: "python3 -c 'import pty; pty.spawn(\"/bin/bash\")'." },
          { id: 'q-shell-5', question: 'Does shell stabilisation grant privilege escalation?', type: 'text', correctAnswer: 'No', hint: 'It only improves usability.' }
        ]
      },
      {
        id: 'sqlmap-the-basics',
        moduleId: OFFENSIVE_TOOLING_MODULE_ID,
        title: 'SQLMap: The Basics',
        description: 'Automate SQL injection with SQLMap: test a target with -u, fingerprint the DBMS, and walk the database from --dbs down to --dump, plus handling POST and authenticated requests.',
        status: 'unlocked',
        iconType: 'sql-basics',
        content: '',
        realWorldCallout: {
          title: 'One Parameter, The Whole Database',
          concept: 'Automated SQL Injection',
          scenario: 'A search page passes cat=1 straight into a query. SQLMap confirms the injection, fingerprints MySQL, and walks --dbs → --tables → --dump to pull credentials out of the database — automatically.',
          relevance: 'SQL injection remains one of the highest-impact web flaws, and SQLMap is the standard tool for finding and exploiting it — which makes parameterized queries the defence you must understand.'
        },
        mindmap: [
          { id: 'sqlmap', label: 'SQLMap', description: 'Automated SQL injection tool', x: 50, y: 12, connections: ['test', 'enum', 'dump', 'req'] },
          { id: 'test', label: 'Test', description: 'sqlmap -u "URL" detects injection and DBMS', x: 16, y: 50 },
          { id: 'enum', label: 'Enumerate', description: '--dbs → -D → --tables → -T → --columns', x: 39, y: 58 },
          { id: 'dump', label: 'Dump', description: '-C selects columns; --dump extracts records', x: 62, y: 58 },
          { id: 'req', label: 'Requests', description: 'POST/auth via -r, --cookie, -H', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'SQLMap automates detecting and exploiting SQL injection and fingerprints the back-end DBMS.',
          'Test a GET parameter with sqlmap -u "URL" — quote the URL because of special characters.',
          'The enumeration hierarchy is --dbs → -D → --tables → -T → --columns → -C → --dump.',
          'The four SQLi techniques are Boolean-based blind, Error-based, Time-based blind, and UNION-based.',
          'Handle POST and authenticated endpoints with -r (raw request file), --cookie, and -H.',
          '--level controls testing depth; --risk controls payload riskiness; the fix for SQLi is parameterized queries.'
        ],
        quiz: [
          { id: 'q-sqlmap-1', question: 'Which flag specifies the target URL to test?', type: 'text', correctAnswer: '-u', hint: 'Quote the URL.' },
          { id: 'q-sqlmap-2', question: 'Which flag enumerates the databases?', type: 'text', correctAnswer: '--dbs', hint: 'The first enumeration step.' },
          { id: 'q-sqlmap-3', question: 'Which flag extracts records from a selected table?', type: 'text', correctAnswer: '--dump', hint: 'GIVE ME DATA.' },
          { id: 'q-sqlmap-4', question: 'Which flag loads a raw HTTP request from a file (for POST/auth)?', type: 'text', correctAnswer: '-r', hint: 'Preserves headers, cookies, body.' },
          { id: 'q-sqlmap-5', question: 'What is the primary defence against SQL injection?', type: 'text', correctAnswer: 'Parameterized queries', hint: 'Prepared statements.' }
        ]
      },
      {
        id: 'mystery-chest-offensive-tooling',
        moduleId: OFFENSIVE_TOOLING_MODULE_ID,
        title: 'Mystery Chest',
        description: 'A bonus revision vault for the whole Offensive Security Tooling module: Hydra brute forcing, Gobuster enumeration, reverse/bind/web shells and stabilisation, and the SQLMap injection workflow.',
        status: 'unlocked',
        iconType: 'mystery-chest',
        content: '',
        realWorldCallout: {
          title: 'The Offensive Tooling Field Card',
          concept: 'Fast Recall Under Pressure',
          scenario: 'Mid-lab, a tester needs the right Hydra flag, a Gobuster mode, the reverse-shell one-liner, or the SQLMap enumeration order. Instead of switching tabs, they glance at one consolidated sheet covering all four tools.',
          relevance: 'Offensive work rewards knowing the exact flag or workflow at the right moment; consolidating the module into one reference makes the whole enumerate-attack-access pipeline stick for labs and interviews.'
        },
        mindmap: [
          { id: 'chest-off', label: 'Offensive Tooling Cheat Sheet', description: 'The whole module at a glance', x: 50, y: 15, connections: ['enum', 'attack', 'access'] },
          { id: 'enum', label: 'Enumerate', description: 'Gobuster dir/dns/vhost content discovery', x: 20, y: 52 },
          { id: 'attack', label: 'Attack', description: 'Hydra credential brute force; SQLMap SQL injection', x: 50, y: 58 },
          { id: 'access', label: 'Access', description: 'Reverse/bind/web shells and stabilisation', x: 80, y: 52 }
        ],
        keyTakeaways: [
          'Hydra brute-forces live login services with -l/-L usernames, -p/-P passwords, and web-form placeholders.',
          'Gobuster enumerates hidden content in three modes: dir (paths/files), dns (subdomains), vhost (Host header).',
          'Shells come as reverse (target connects out), bind (target listens), and web (over HTTP), caught with nc -lvnp.',
          'Stabilise a raw shell into a PTY with python3 -c pty.spawn plus stty raw -echo and the right TERM.',
          'SQLMap automates SQL injection: test with -u then walk --dbs → -D → --tables → -T → --columns → -C → --dump.',
          'The offensive workflow is enumerate → attack → gain access → validate impact, always in authorised scope.'
        ],
        quiz: [
          { id: 'q-mco-1', question: 'Which tool brute-forces login credentials against a live service?', type: 'text', correctAnswer: 'Hydra', hint: '-l/-L and -p/-P.' },
          { id: 'q-mco-2', question: 'Which Gobuster mode finds directories and files?', type: 'text', correctAnswer: 'dir', hint: 'Uses -u and -w.' },
          { id: 'q-mco-3', question: 'Which shell type has the target connect back to the attacker?', type: 'text', correctAnswer: 'Reverse shell', hint: 'Beats inbound firewalls.' },
          { id: 'q-mco-4', question: 'What is the SQLMap flag to extract records?', type: 'text', correctAnswer: '--dump', hint: 'After selecting -D/-T.' }
        ]
      },
    ],
  },
  {
    id: DEFENSIVE_SECURITY_MODULE_ID,
    title: 'Defensive Security',
    description: 'The blue-team fundamentals: the SOC and its detection/response workflow, digital forensics and evidence handling, the incident-response lifecycle, and reading the logs that tie it all together — plus the reused Defensive Security Intro and a bonus revision chest.',
    isFuture: false,
    topics: [
      { ...defensiveSecurityIntroRoom, moduleId: DEFENSIVE_SECURITY_MODULE_ID },
      {
        id: 'soc-fundamentals',
        moduleId: DEFENSIVE_SECURITY_MODULE_ID,
        title: 'SOC Fundamentals',
        description: 'What a Security Operations Center is: the People/Process/Technology pillars, detection and response, SOC roles and tiers, alert triage with the 5 Ws, and the core tooling (SIEM, EDR, IDS/IPS, SOAR).',
        status: 'unlocked',
        iconType: 'network',
        content: '',
        realWorldCallout: {
          title: 'The 2 AM Port Scan',
          concept: 'Alert Triage — Evidence Over Assumption',
          scenario: 'A SOC receives a "Possible Port Scan" alert from 10.10.10.50. Instead of assuming an attack, the L1 analyst applies the 5 Ws, discovers the source is the scheduled VULN-SCANNER-01 owned by the security team, documents it as an authorised scan, and closes it — no escalation needed.',
          relevance: 'An alert is the beginning of an investigation, not the conclusion — the same activity can be benign or malicious depending on context.'
        },
        mindmap: [
          { id: 'soc', label: 'SOC', description: '24/7 monitoring, detection and response', x: 50, y: 12, connections: ['people', 'process', 'tech', 'detect'] },
          { id: 'people', label: 'People', description: 'CISO → SOC Manager → L1 → L2 → L3', x: 16, y: 50 },
          { id: 'process', label: 'Process', description: 'Alert triage, the 5 Ws, escalation, IR', x: 39, y: 58 },
          { id: 'tech', label: 'Technology', description: 'SIEM, EDR, IDS/IPS, XDR, SOAR', x: 62, y: 58 },
          { id: 'detect', label: 'Detect + Respond', description: 'Find the threat, then handle it', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'A SOC continuously monitors and rests on three pillars — People, Process, Technology.',
          'Its two core capabilities are Detection (find the threat) and Response (handle it).',
          'Roles run CISO → SOC Manager → L1 (triage) → L2 (investigate) → L3 (hunt/forensics).',
          'Alert triage uses the 5 Ws — Who, What, When, Where, Why — and an alert is not a confirmed attack.',
          'SIEM centralises and correlates logs; EDR watches endpoints; IDS detects, IPS prevents; SOAR automates.'
        ],
        quiz: [
          { id: 'q-soc-1', question: 'What does SOC stand for?', type: 'text', correctAnswer: 'Security Operations Center', hint: 'The 24/7 monitoring team.' },
          { id: 'q-soc-2', question: 'What are the three pillars of a SOC?', type: 'text', correctAnswer: 'People, Process, Technology', hint: 'All three are required.' },
          { id: 'q-soc-3', question: 'Which SOC tier performs initial alert triage?', type: 'text', correctAnswer: 'L1', hint: 'L2 investigates, L3 hunts.' },
          { id: 'q-soc-4', question: 'What are the 5 Ws of alert triage?', type: 'text', correctAnswer: 'Who, What, When, Where, Why', hint: 'A structured investigation framework.' },
          { id: 'q-soc-5', question: 'What tool centralises and correlates logs from many sources?', type: 'text', correctAnswer: 'SIEM', hint: 'Security Information and Event Management.' }
        ]
      },
      {
        id: 'digital-forensics-fundamentals',
        moduleId: DEFENSIVE_SECURITY_MODULE_ID,
        title: 'Digital Forensics Fundamentals',
        description: 'Collecting and analysing digital evidence: the NIST methodology, types of forensics, legal acquisition with chain of custody and write blockers, Windows artifacts, and CLI tooling (file, pdfinfo, exiftool, sha256sum, strings).',
        status: 'unlocked',
        iconType: 'search',
        content: '',
        realWorldCallout: {
          title: 'The Ransom Letter\'s Author',
          concept: 'Metadata Is a Lead, Not Proof',
          scenario: 'Investigating ransom-letter.pdf, an analyst runs pdfinfo and finds Author: Ann Gree Shepherd. Rather than concluding guilt, they treat it as an investigative lead to correlate with user accounts, login records and file-system activity.',
          relevance: 'Digital evidence must be preserved (work on copies), tracked in chain of custody, and corroborated — metadata can be forged.'
        },
        mindmap: [
          { id: 'df', label: 'Digital Forensics', description: 'Collect, preserve, examine, analyse evidence', x: 50, y: 12, connections: ['nist', 'coc', 'volatility', 'tools'] },
          { id: 'nist', label: 'NIST Phases', description: 'Collection → Examination → Analysis → Reporting', x: 16, y: 50 },
          { id: 'coc', label: 'Chain of Custody', description: 'Who/when/where; write blockers protect integrity', x: 39, y: 58 },
          { id: 'volatility', label: 'Order of Volatility', description: 'RAM before disk — capture volatile first', x: 62, y: 58 },
          { id: 'tools', label: 'Tools', description: 'FTK Imager, Autopsy, DumpIt, Volatility; file/exiftool/strings', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'The NIST methodology is Collection → Examination → Analysis → Reporting.',
          'Examination extracts/filters relevant data; Analysis correlates it to draw conclusions.',
          'Evidence acquisition needs authorization, a chain of custody, and a write blocker to protect integrity.',
          'Follow the order of volatility — capture RAM and volatile data before disk.',
          'CLI triage uses file, pdfinfo, exiftool, sha256sum, strings and grep — but metadata is a lead, not proof.'
        ],
        quiz: [
          { id: 'q-df-1', question: 'What are the four NIST digital forensics phases?', type: 'text', correctAnswer: 'Collection, Examination, Analysis, Reporting', hint: 'C → E → A → R.' },
          { id: 'q-df-2', question: 'Which phase correlates the data to draw conclusions?', type: 'text', correctAnswer: 'Analysis', hint: 'Examination extracts; Analysis interprets.' },
          { id: 'q-df-3', question: 'What document records the full history of collected evidence?', type: 'text', correctAnswer: 'Chain of custody', hint: 'Who handled it, when and where.' },
          { id: 'q-df-4', question: 'What tool prevents writes to a device during acquisition?', type: 'text', correctAnswer: 'Write blocker', hint: 'Protects evidence integrity.' },
          { id: 'q-df-5', question: 'Which command identifies a file\'s type from its contents?', type: 'text', correctAnswer: 'file', hint: 'Useful when the extension is missing/misleading.' }
        ]
      },
      {
        id: 'incident-response-fundamentals',
        moduleId: DEFENSIVE_SECURITY_MODULE_ID,
        title: 'Incident Response Fundamentals',
        description: 'Handling an attack end to end: events/alerts/incidents and severity, incident types, the SANS PICERL and NIST lifecycles, IR plans/playbooks/runbooks, IR tooling, and investigation with the WHO/WHAT/WHEN/WHERE/HOW/WHY framework.',
        status: 'unlocked',
        iconType: 'sword',
        content: '',
        realWorldCallout: {
          title: 'Deleting the Malware Isn\'t Enough',
          concept: 'Containment → Eradication → Recovery',
          scenario: 'After isolating a malware-infected host (containment), the team removes the malware but the attacker returns — because the unpatched vulnerability and stolen credentials remained. True eradication must address the root cause before recovery.',
          relevance: 'IR is a lifecycle, not a single action: contain (stop), eradicate (remove + root cause), recover (restore + validate), then learn.'
        },
        mindmap: [
          { id: 'ir', label: 'Incident Response', description: 'Handle an attack from detection to learning', x: 50, y: 12, connections: ['event', 'sans', 'nist', 'docs'] },
          { id: 'event', label: 'Event → Incident', description: 'Event → Log → Alert → FP / TP (incident)', x: 16, y: 50 },
          { id: 'sans', label: 'SANS PICERL', description: 'Prep → Identify → Contain → Eradicate → Recover → Learn', x: 39, y: 58 },
          { id: 'nist', label: 'NIST', description: 'Prep → Detect & Analyse → C/E/R → Post-Incident', x: 62, y: 58 },
          { id: 'docs', label: 'Plan/Playbook/Runbook', description: 'Strategy → per-incident → technical steps', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'Incident Response is both proactive (preparation) and reactive (handling the attack).',
          'An event becomes an incident only after investigation confirms a true positive.',
          'SANS PICERL: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned.',
          'NIST groups Containment/Eradication/Recovery into one phase, but the three stay distinct.',
          'Containment stops/limits, Eradication removes the threat and root cause, Recovery restores and validates.'
        ],
        quiz: [
          { id: 'q-ir-1', question: 'What does the SANS PICERL lifecycle stand for?', type: 'text', correctAnswer: 'Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned', hint: 'Six phases that loop back to preparation.' },
          { id: 'q-ir-2', question: 'What is the difference between containment and eradication?', type: 'text', correctAnswer: 'Containment stops/limits; eradication removes the threat and root cause', hint: 'Then recovery restores.' },
          { id: 'q-ir-3', question: 'When does an alert become an incident?', type: 'text', correctAnswer: 'When investigation confirms it is a true positive', hint: 'Not every alert is an incident.' },
          { id: 'q-ir-4', question: 'Which document gives step-by-step technical instructions for one task?', type: 'text', correctAnswer: 'Runbook', hint: 'Plan → Playbook → Runbook.' },
          { id: 'q-ir-5', question: 'What does IOC stand for?', type: 'text', correctAnswer: 'Indicator of Compromise', hint: 'IOA = Indicator of Attack.' }
        ]
      },
      {
        id: 'logs-fundamentals',
        moduleId: DEFENSIVE_SECURITY_MODULE_ID,
        title: 'Logs Fundamentals',
        description: 'Logs as the digital footprints of a system: the six log types, Windows Event Logs and key Event IDs, Apache access-log structure, and analysing logs on Linux with cat, grep, less and the pipe.',
        status: 'unlocked',
        iconType: 'clipboard',
        content: '',
        realWorldCallout: {
          title: 'The Account Named "hacked"',
          concept: 'Correlate, Don\'t Assume',
          scenario: 'Investigating a breach in Windows Event Viewer, an analyst finds account "hacked" (Event 4720) created by Administrator, enabled 6/7/2024, with a password reset (4724). The suspicious name is a lead — but they correlate creator, timestamps and logon activity before concluding.',
          relevance: 'Logs are the evidence behind every investigation; build a timeline and correlate sources rather than trusting a single indicator.'
        },
        mindmap: [
          { id: 'logs', label: 'Logs', description: 'Digital footprints of system activity', x: 50, y: 12, connections: ['types', 'win', 'web', 'linux'] },
          { id: 'types', label: 'Six Types', description: 'System, Security, Application, Audit, Network, Access', x: 16, y: 50 },
          { id: 'win', label: 'Windows Events', description: 'Event Viewer; 4624 logon, 4625 fail, 4720 create', x: 39, y: 58 },
          { id: 'web', label: 'Access Logs', description: '/var/log/apache2/access.log — IP, time, method, URL, status', x: 62, y: 58 },
          { id: 'linux', label: 'Linux Tools', description: 'cat, grep, less and the pipe to filter logs', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'Logs are the digital footprints of a system — the evidence behind detection and investigation.',
          'The six log types are System, Security, Application, Audit, Network and Access (S S A A N A).',
          'Windows Event IDs: 4624 logon, 4625 failed logon, 4720 account created, 4724 password reset.',
          'Apache access logs at /var/log/apache2/access.log record IP, timestamp, method, URL, status and User-Agent.',
          'Analyse logs on Linux with cat, less and grep, chaining filters with the pipe; check rotated logs and correlate.'
        ],
        quiz: [
          { id: 'q-log-1', question: 'What are the six main types of logs?', type: 'text', correctAnswer: 'System, Security, Application, Audit, Network, Access', hint: 'Mnemonic: S S A A N A.' },
          { id: 'q-log-2', question: 'Which Windows Event ID indicates a successful logon?', type: 'text', correctAnswer: '4624', hint: '4625 is a failed logon.' },
          { id: 'q-log-3', question: 'Which Windows Event ID indicates an account was created?', type: 'text', correctAnswer: '4720', hint: '4724 is a password reset.' },
          { id: 'q-log-4', question: 'Where do Apache access logs typically live on Debian/Ubuntu?', type: 'text', correctAnswer: '/var/log/apache2/access.log', hint: 'error.log sits alongside it.' },
          { id: 'q-log-5', question: 'Which Linux command searches a file for a pattern?', type: 'text', correctAnswer: 'grep', hint: 'Chain filters with the pipe |.' }
        ]
      },
      {
        id: 'mystery-chest-defensive-security',
        moduleId: DEFENSIVE_SECURITY_MODULE_ID,
        title: 'Mystery Chest',
        description: 'A bonus revision vault for the whole Defensive Security module: the SOC workflow, digital forensics and evidence handling, the incident-response lifecycle, and reading logs.',
        status: 'unlocked',
        iconType: 'mystery-chest',
        content: '',
        realWorldCallout: {
          title: 'The Blue-Team Field Card',
          concept: 'Fast Recall Under Pressure',
          scenario: 'Mid-incident, an analyst needs the SANS phases, a Windows Event ID, the NIST forensics order, or the right grep filter. Instead of switching tabs, they glance at one consolidated sheet covering SOC, forensics, IR and logs.',
          relevance: 'Defensive work rewards knowing the right framework, Event ID or command at the right moment; consolidating the module makes it stick for labs and interviews.'
        },
        mindmap: [
          { id: 'chest-def', label: 'Defensive Security Cheat Sheet', description: 'The whole module at a glance', x: 50, y: 15, connections: ['soc', 'df', 'ir', 'logs'] },
          { id: 'soc', label: 'SOC', description: 'People/Process/Technology; detect + respond', x: 18, y: 55 },
          { id: 'df', label: 'Forensics', description: 'NIST C→E→A→R; chain of custody', x: 39, y: 60 },
          { id: 'ir', label: 'Incident Response', description: 'PICERL / NIST; contain, eradicate, recover', x: 61, y: 60 },
          { id: 'logs', label: 'Logs', description: 'Six types; Windows Event IDs; grep/less', x: 82, y: 55 }
        ],
        keyTakeaways: [
          'A SOC rests on People/Process/Technology and delivers Detection + Response.',
          'Digital forensics follows NIST Collection → Examination → Analysis → Reporting with chain of custody.',
          'Incident response (SANS PICERL / NIST) separates containment, eradication and recovery.',
          'Logs are the shared evidence — six types, Windows Event IDs, and Linux grep/less filtering.',
          'The blue-team discipline: investigate, correlate, determine scope, then respond — suspicious is not malicious.'
        ],
        quiz: [
          { id: 'q-mcd-1', question: 'What are the three pillars of a SOC?', type: 'text', correctAnswer: 'People, Process, Technology', hint: 'All three required.' },
          { id: 'q-mcd-2', question: 'What is the NIST digital forensics order?', type: 'text', correctAnswer: 'Collection, Examination, Analysis, Reporting', hint: 'C → E → A → R.' },
          { id: 'q-mcd-3', question: 'In IR, what does containment do versus eradication?', type: 'text', correctAnswer: 'Containment stops/limits; eradication removes the threat', hint: 'Recovery then restores.' },
          { id: 'q-mcd-4', question: 'Which Windows Event ID is a successful logon?', type: 'text', correctAnswer: '4624', hint: '4625 is a failed logon.' }
        ]
      },
    ],
  },
  // Future modules are appended here, one object at a time.
];
