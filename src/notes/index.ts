import offSecIntro from './module1/offensive-security-intro.md?raw';
import defSecIntro from './module1/defensive-security-intro.md?raw';
import careersInCyber from './module1/careers-in-cyber.md?raw';
import mysteryChest1 from './module1/mystery-chest.md?raw';

import whatIsNetworking from './module2/what-is-networking.md?raw';
import introToLan from './module2/intro-to-lan.md?raw';
import osiModel from './module2/osi-model.md?raw';
import packetsAndFrames from './module2/packets-and-frames.md?raw';
import extendingYourNetwork from './module2/extending-your-network.md?raw';
import mysteryChest2 from './module2/mystery-chest-net.md?raw';

import dnsInDetail from './module3/dns-in-detail.md?raw';
import httpInDetail from './module3/http-in-detail.md?raw';
import howWebsitesWork from './module3/how-websites-work.md?raw';
import puttingItAllTogether from './module3/putting-it-all-together.md?raw';
import mysteryChest3 from './module3/mystery-chest.md?raw';

import insideAComputerSystem from './module4-comp-fund/inside-a-computer-system.md?raw';
import computerTypes from './module4-comp-fund/computer-types.md?raw';
import clientServerBasics from './module4-comp-fund/client-server-basics.md?raw';
import virtualisationBasics from './module4-comp-fund/virtualisation-basics.md?raw';
import cloudComputingFundamentals from './module4-comp-fund/cloud-computing-fundamentals.md?raw';
import mysteryChestComp from './module4-comp-fund/mystery-chest-comp.md?raw';

import gc1CoreCyber from './google-course-1/core-cyber-foundations.md?raw';
import gc1HistAttacks from './google-course-1/historical-attacks.md?raw';
import gc1FrameEthics from './google-course-1/frameworks-ethics.md?raw';
import gc1Glossary from './google-course-1/master-glossary.md?raw';
import gc1Chest from './google-course-1/mystery-chest.md?raw';

import gc2Domains from './google-course-2/security-domains-risk.md?raw';
import gc2Frameworks from './google-course-2/frameworks-controls-audits.md?raw';
import gc2Siem from './google-course-2/siem-tools-logs.md?raw';
import gc2Incident from './google-course-2/incident-response-playbooks.md?raw';
import gc2Chest from './google-course-2/mystery-chest.md?raw';

import gc3Architecture from './google-course-3/network-architecture.md?raw';
import gc3Protocols from './google-course-3/network-protocols-tools.md?raw';
import gc3Attacks from './google-course-3/attack-tactics.md?raw';
import gc3Hardening from './google-course-3/security-hardening.md?raw';
import gc3Chest from './google-course-3/mystery-chest.md?raw';

import gc4Os from './google-course-4/intro-operating-systems.md?raw';
import gc4Linux from './google-course-4/linux-operating-system.md?raw';
import gc4Bash from './google-course-4/linux-bash-commands.md?raw';
import gc4Sql from './google-course-4/databases-sql.md?raw';
import gc4Chest from './google-course-4/mystery-chest.md?raw';

import gc5Asset from './google-course-5/intro-asset-security.md?raw';
import gc5Protect from './google-course-5/protecting-assets.md?raw';
import gc5Vuln from './google-course-5/vulnerabilities-systems.md?raw';
import gc5Threats from './google-course-5/threats-asset-security.md?raw';
import gc5Chest from './google-course-5/mystery-chest.md?raw';

import gc6Detection from './google-course-6/detection-incident-response.md?raw';
import gc6NetMon from './google-course-6/network-monitoring.md?raw';
import gc6Investig from './google-course-6/incident-investigation.md?raw';
import gc6IdsSiem from './google-course-6/ids-siem-tools.md?raw';
import gc6Chest from './google-course-6/mystery-chest.md?raw';

import gc7Intro from './google-course-7/intro-python.md?raw';
import gc7Effective from './google-course-7/effective-python.md?raw';
import gc7DataStruct from './google-course-7/data-structures-algorithms.md?raw';
import gc7Practice from './google-course-7/python-practice.md?raw';
import gc7Chest from './google-course-7/mystery-chest.md?raw';

import gc8Protect from './google-course-8/protect-data-communicate.md?raw';
import gc8Escalate from './google-course-8/escalate-incidents.md?raw';
import gc8Stakeholders from './google-course-8/communicate-stakeholders.md?raw';
import gc8Community from './google-course-8/engage-community.md?raw';
import gc8Ai from './google-course-8/utilize-ai.md?raw';
import gc8Chest from './google-course-8/mystery-chest.md?raw';

import osIntro from './module5-os-basics/os-intro.md?raw';
import winBasics from './module5-os-basics/win-basics.md?raw';
import linuxCli from './module5-os-basics/linux-cli.md?raw';
import winCli from './module5-os-basics/win-cli.md?raw';
import osSec from './module5-os-basics/os-sec.md?raw';
import mysteryChestOs from './module5-os-basics/mystery-chest.md?raw';

import dataRepresentation from './module6-software-basics/data-representation.md?raw';
import dataEncoding from './module6-software-basics/data-encoding.md?raw';
import pythonSimpleDemo from './module6-software-basics/python-simple-demo.md?raw';
import javascriptSimpleDemo from './module6-software-basics/javascript-simple-demo.md?raw';
import databaseSqlBasics from './module6-software-basics/database-sql-basics.md?raw';
import mysteryChestSoftwareBasics from './module6-software-basics/mystery-chest.md?raw';


import theCiaTriad from './module7-attacks-and-defenses/the-cia-triad.md?raw';
import cryptographyConcepts from './module7-attacks-and-defenses/cryptography-concepts.md?raw';
import becomeAHacker from './module7-attacks-and-defenses/become-a-hacker.md?raw';
import becomeADefender from './module7-attacks-and-defenses/become-a-defender.md?raw';
import mysteryChestAttacks from './module7-attacks-and-defenses/mystery-chest.md?raw';

import cs101SearchSkills from './cyber-security-101/search-skills.md?raw';
import cs101MysteryChest from './cyber-security-101/mystery-chest.md?raw';

export const notesByTopicId: Record<string, string> = {
  'offensive-security-intro': offSecIntro,
  'defensive-security-intro': defSecIntro,
  'careers-in-cyber': careersInCyber,
  'mystery-chest': mysteryChest1,

  'what-is-networking': whatIsNetworking,
  'intro-to-lan': introToLan,
  'osi-model': osiModel,
  'packets-and-frames': packetsAndFrames,
  'extending-your-network': extendingYourNetwork,
  'mystery-chest-net': mysteryChest2,

  'dns-in-detail': dnsInDetail,
  'http-in-detail': httpInDetail,
  'how-websites-work': howWebsitesWork,
  'putting-it-all-together': puttingItAllTogether,
  'mystery-chest-web': mysteryChest3,

  'inside-a-computer-system': insideAComputerSystem,
  'computer-types': computerTypes,
  'client-server-basics': clientServerBasics,
  'virtualisation-basics': virtualisationBasics,
  'cloud-computing-fundamentals': cloudComputingFundamentals,
  'mystery-chest-comp': mysteryChestComp,

  'core-cyber-foundations': gc1CoreCyber,
  'historical-attacks': gc1HistAttacks,
  'frameworks-ethics': gc1FrameEthics,
  'master-glossary': gc1Glossary,
  'mystery-chest-gc1': gc1Chest,

  'security-domains-risk': gc2Domains,
  'frameworks-controls-audits': gc2Frameworks,
  'siem-tools-logs': gc2Siem,
  'incident-response-playbooks': gc2Incident,
  'mystery-chest-gc2': gc2Chest,

  'network-architecture': gc3Architecture,
  'network-protocols-tools': gc3Protocols,
  'attack-tactics': gc3Attacks,
  'security-hardening': gc3Hardening,
  'mystery-chest-gc3': gc3Chest,

  'intro-operating-systems': gc4Os,
  'linux-operating-system': gc4Linux,
  'linux-bash-commands': gc4Bash,
  'databases-sql': gc4Sql,
  'mystery-chest-gc4': gc4Chest,

  'intro-asset-security': gc5Asset,
  'protecting-assets': gc5Protect,
  'vulnerabilities-systems': gc5Vuln,
  'threats-asset-security': gc5Threats,
  'mystery-chest-gc5': gc5Chest,

  'detection-incident-response': gc6Detection,
  'network-monitoring': gc6NetMon,
  'incident-investigation': gc6Investig,
  'ids-siem-tools': gc6IdsSiem,
  'mystery-chest-gc6': gc6Chest,

  'intro-python': gc7Intro,
  'effective-python': gc7Effective,
  'data-structures-algorithms': gc7DataStruct,
  'python-practice': gc7Practice,
  'mystery-chest-gc7': gc7Chest,

  'protect-data-communicate': gc8Protect,
  'escalate-incidents': gc8Escalate,
  'communicate-stakeholders': gc8Stakeholders,
  'engage-community': gc8Community,
  'utilize-ai': gc8Ai,
  'mystery-chest-gc8': gc8Chest,

  'os-intro': osIntro,
  'win-basics': winBasics,
  'linux-cli': linuxCli,
  'win-cli': winCli,
  'os-sec': osSec,
  'mystery-chest-os': mysteryChestOs,

  'data-representation': dataRepresentation,
  'data-encoding': dataEncoding,
  'python-simple-demo': pythonSimpleDemo,
  'javascript-simple-demo': javascriptSimpleDemo,
  'database-sql-basics': databaseSqlBasics,
  'mystery-chest-software-basics': mysteryChestSoftwareBasics,
  'the-cia-triad': theCiaTriad,
  'cryptography-concepts': cryptographyConcepts,
  'become-a-hacker': becomeAHacker,
  'become-a-defender': becomeADefender,
  'mystery-chest-attacks': mysteryChestAttacks,

  'search-skills': cs101SearchSkills,
  'mystery-chest-cs101': cs101MysteryChest,
};
