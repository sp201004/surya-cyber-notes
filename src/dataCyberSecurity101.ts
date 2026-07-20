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
  // Future modules are appended here, one object at a time.
];
