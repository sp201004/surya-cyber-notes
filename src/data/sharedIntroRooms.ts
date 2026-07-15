import { Topic } from '../types';

// Single source of truth for the two intro rooms shared between the
// TryHackMe Pre-Security course and the TryHackMe Cyber Security 101 course.
// Content is moved byte-identically from the previous inline definitions in
// MODULES_DATA (Pre-Security, Module 1). This module has NO dependency on
// data.ts, so importing it from both course files avoids a circular import.

export const offensiveSecurityIntroRoom: Topic = {
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
};

export const defensiveSecurityIntroRoom: Topic = {
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
};
