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
  // Future modules are appended here, one object at a time.
];
