import re
import json

with open('/Users/sp2010/.gemini/antigravity-ide/brain/8856246e-6dd3-4c6a-bb79-23c82855cc26/scratch/Course1_beautiful.md', 'r') as f:
    text = f.read()

# 1. Split out MODULE 1
parts = text.split('**MODULE 1**')
intro = parts[0]
rest1 = parts[1]

# 2. Split out MODULE 2
parts2 = rest1.split('**MODULE 2**')
room1_text = parts2[0].strip()
rest2 = parts2[1]

# 3. Split out MODULE 3
parts3 = rest2.split('**MODULE 3**')
room2_text = parts3[0].strip()
rest3 = parts3[1]

# 4. Split out MASTER GLOSSARY
parts4 = rest3.split('**MASTER GLOSSARY**')
room3_text = parts4[0].strip()
rest4 = parts4[1]

# 5. Split out FLASHCARD REVIEW
parts5 = rest4.split('## Complete Flashcard Review --- All Modules')
room4_text = parts5[0].strip()
room5_text = '## Complete Flashcard Review --- All Modules\n\n' + parts5[1].strip()

# Clean up text by escaping backticks and ${
texts = [room1_text, room2_text, room3_text, room4_text, room5_text]
for i in range(len(texts)):
    texts[i] = texts[i].replace('`', '\\`').replace('${', '\\${')

# Construct data
topics = []
titles = [
    "Core Cybersecurity Foundations",
    "Historical Attacks & Threat Classification",
    "Frameworks, Controls & Ethics",
    "Master Glossary",
    "Mystery Chest: Rapid Revision"
]
ids = [
    "core-cyber-foundations",
    "historical-attacks",
    "frameworks-ethics",
    "master-glossary",
    "mystery-chest"
]
icons = [
    "cia-prism",
    "warning-shield-skull",
    "scales-of-justice",
    "open-book-magnifier",
    "mystery-chest"
]

for i in range(5):
    topics.append({
        "id": ids[i],
        "moduleId": "google-course-1",
        "title": titles[i],
        "description": titles[i] + " module notes.",
        "status": "unlocked",
        "iconType": icons[i],
        "content": texts[i],
        "mindmap": [],
        "realWorldCallout": {},
        "keyTakeaways": [],
        "quiz": []
    })

# Room 1
topics[0]['realWorldCallout'] = {
    "title": "Case Study",
    "concept": "The CIA Triad & Phishing",
    "scenario": "A hospital network was hit by ransomware delivered via a phishing email targeting an IT administrator. The ransomware encrypted patient records (Availability loss) and threatened to publish them (Confidentiality loss). The blue team used their SIEM to detect impossible travel anomalies just before the encryption phase, allowing them to isolate the affected segment (Containment) and restore from offline backups (Integrity & Availability).",
    "relevance": "This demonstrates how attackers exploit human psychology (urgency/fear) and how defense-in-depth and the CIA Triad are applied to mitigate massive damage."
}
topics[0]['keyTakeaways'] = [
    "The CIA Triad (Confidentiality, Integrity, Availability) is the foundation of all cybersecurity.",
    "Internal threats can be more dangerous than external threats due to existing legitimate access.",
    "Social engineering relies on human psychology: urgency, fear, and authority impersonation.",
    "PII vs SPII: SPII requires maximum protection (e.g. SSNs, biometrics, credentials).",
    "SIEM provides centralized telemetry and anomaly detection; IDS focuses on network intrusions."
]
topics[0]['quiz'] = [
    {"id": "g-c1-r1-q1", "question": "Which component of the CIA Triad ensures that data remains accurate and unaltered?", "type": "text", "correctAnswer": "Integrity", "hint": "Think of keeping things complete and unmodified."},
    {"id": "g-c1-r1-q2", "question": "What is an impossible travel anomaly in a SIEM?", "type": "text", "correctAnswer": "A user logging in from two distant locations in a physically impossible timeframe.", "hint": "Think of logging in from New York and Tokyo 10 minutes apart."},
    {"id": "g-c1-r1-q3", "question": "What are the three psychological triggers most commonly exploited in phishing?", "type": "text", "correctAnswer": "Urgency, Fear/Consequences, Authority Impersonation.", "hint": "Think about why people panic and click links."},
    {"id": "g-c1-r1-q4", "question": "What is the difference between a Blue Team and a Red Team?", "type": "text", "correctAnswer": "Blue Team defends and monitors; Red Team attacks and tests defenses.", "hint": "Defense vs Offense colors."}
]

# Room 2
topics[1]['realWorldCallout'] = {
    "title": "Case Study",
    "concept": "Unpatched Vulnerabilities & Ransomware",
    "scenario": "In 2017, Equifax suffered a massive breach due to an unpatched Apache Struts vulnerability. Despite a patch being available months prior, it wasn't applied. Attackers infiltrated the network and extracted SPII for 143 million users, leading to a $575M regulatory settlement.",
    "relevance": "History proves that neglecting patch management is an invitation to attackers. Known CVEs are actively scanned for by organized cybercrime."
}
topics[1]['keyTakeaways'] = [
    "Historical attacks (Brain, Morris, ILOVEYOU) shaped modern defense mechanisms.",
    "Viruses require user action to spread; Worms replicate autonomously.",
    "Social engineering is often the most exploitable vulnerability vector.",
    "Unpatched known vulnerabilities are a massive risk (e.g., Equifax breach)."
]
topics[1]['quiz'] = [
    {"id": "g-c1-r2-q1", "question": "What was the primary difference between the Brain Virus and the Morris Worm?", "type": "text", "correctAnswer": "The Morris Worm spread autonomously without user interaction, while the Brain Virus required physical floppy disks.", "hint": "Think about network spreading vs user action."},
    {"id": "g-c1-r2-q2", "question": "How does ransomware differ from spyware?", "type": "text", "correctAnswer": "Ransomware encrypts data and demands payment; spyware silently monitors and harvests data.", "hint": "One holds your files hostage, the other watches what you do."},
    {"id": "g-c1-r2-q3", "question": "What is Whaling?", "type": "text", "correctAnswer": "A targeted spear phishing attack against high-profile executives like CEOs or CFOs.", "hint": "Going after the biggest 'fish' in the company."},
    {"id": "g-c1-r2-q4", "question": "What was the core defensive lesson learned from the ILOVEYOU attack?", "type": "text", "correctAnswer": "Human error is the most exploitable vector; email filtering and training are essential.", "hint": "It spread because humans clicked an email attachment."}
]

# Room 3
topics[2]['realWorldCallout'] = {
    "title": "Case Study",
    "concept": "Framework Implementation & Breach Notification",
    "scenario": "A European e-commerce company discovered a database breach exposing user PII. Because they followed the NIST CSF, they quickly Identified the scope and Responded. They adhered to GDPR requirements by notifying the supervisory authority within 72 hours, avoiding massive fines.",
    "relevance": "Frameworks provide a blueprint for defense, while regulations like GDPR enforce strict timelines for accountability and transparency."
}
topics[2]['keyTakeaways'] = [
    "Frameworks (like NIST CSF) are blueprints; Controls are operational safeguards.",
    "The 6 functions of NIST CSF 2.0: Govern, Identify, Protect, Detect, Respond, Recover.",
    "GDPR requires breach notification within 72 hours; HIPAA requires it within 60 days.",
    "Hacking back is strictly illegal under the CFAA. Never engage in criminal vigilantism.",
    "The Principle of Least Privilege limits the blast radius of a compromise."
]
topics[2]['quiz'] = [
    {"id": "g-c1-r3-q1", "question": "What is the difference between a Framework and a Control?", "type": "text", "correctAnswer": "A Framework is a strategic blueprint; a Control is a specific tool or process.", "hint": "Blueprint vs the actual lock on the door."},
    {"id": "g-c1-r3-q2", "question": "What is the GDPR breach notification window?", "type": "text", "correctAnswer": "72 hours.", "hint": "Three days."},
    {"id": "g-c1-r3-q3", "question": "Is hacking back legal if a company has been attacked?", "type": "text", "correctAnswer": "No, it is strictly illegal and considered criminal vigilantism.", "hint": "Vigilantism is against the law."},
    {"id": "g-c1-r3-q4", "question": "What should you do if an executive demands unauthorized access to sensitive data?", "type": "text", "correctAnswer": "Refuse, require documented legal channels, and escalate to Legal if necessary.", "hint": "Don't break the law just because your boss tells you to."}
]

# Room 4
topics[3]['realWorldCallout'] = {
    "title": "Case Study",
    "concept": "The Security Glossary in Action",
    "scenario": "During an active incident response, a Junior Security Analyst uses precise terminology (e.g., 'SPII exfiltration' vs 'PII breach', 'Spear Phishing' vs 'Whaling') to brief the CISO and Legal teams. This exactness ensures Legal knows exactly which notification window (GDPR 72-hour vs HIPAA 60-day) applies.",
    "relevance": "Using standardized terminology ensures clear, unambiguous communication across technical, legal, and executive teams during high-stress situations."
}
topics[3]['keyTakeaways'] = [
    "A shared vocabulary is essential for effective incident response.",
    "Terms like APT, Zero-Day, and Threat Actor have precise definitions that dictate response playbooks.",
    "Understanding the exact difference between data classifications (PII vs SPII) dictates handling."
]
topics[3]['quiz'] = [
    {"id": "g-c1-r4-q1", "question": "What does APT stand for?", "type": "text", "correctAnswer": "Advanced Persistent Threat.", "hint": "Nation-state threat actor."},
    {"id": "g-c1-r4-q2", "question": "What is the primary difference between PII and SPII?", "type": "text", "correctAnswer": "SPII (Sensitive PII) requires stricter handling because its exposure causes greater harm (e.g., SSN vs Name).", "hint": "One is more sensitive and dangerous if exposed."},
    {"id": "g-c1-r4-q3", "question": "What is the definition of a Zero-Day?", "type": "text", "correctAnswer": "A vulnerability that is previously unknown to the vendor, meaning there is zero days of notice or patch available.", "hint": "No time to fix it."},
    {"id": "g-c1-r4-q4", "question": "What is the purpose of Data Classification?", "type": "text", "correctAnswer": "To categorize data by sensitivity to determine the required handling and protection requirements.", "hint": "Organizing data by how much it needs to be protected."}
]

# Room 5
topics[4]['realWorldCallout'] = {
    "title": "Case Study",
    "concept": "The Cybersecurity Mindset",
    "scenario": "Reviewing all concepts from Course 1 builds a holistic foundation. Security analysts must fluidly combine knowledge of threats (Worms, APTs), frameworks (NIST), and tools (SIEM, IDS) to effectively protect an organization.",
    "relevance": "Mastery of terminology ensures clear communication during high-stress incident response scenarios."
}
topics[4]['keyTakeaways'] = [
    "Consistent revision of foundational concepts is crucial for professional exams and job interviews.",
    "The CIA Triad dictates all security decisions.",
    "Internal and external threats both require comprehensive defense-in-depth strategies."
]
topics[4]['quiz'] = [
    {"id": "g-c1-r5-q1", "question": "What are the three incident management priorities in order?", "type": "text", "correctAnswer": "Containment, Root Cause Investigation, Execute Playbook.", "hint": "Stop the bleeding first."},
    {"id": "g-c1-r5-q2", "question": "How does an IDS anomaly detection differ from signature detection?", "type": "text", "correctAnswer": "Anomaly detects deviations from baselines (catching zero-days); signature matches known attack patterns.", "hint": "Unknown deviations vs known patterns."},
    {"id": "g-c1-r5-q3", "question": "What is an APT?", "type": "text", "correctAnswer": "Advanced Persistent Threat; a nation-state group that stays undetected for long periods.", "hint": "Nation-state level actors."},
    {"id": "g-c1-r5-q4", "question": "What is the purpose of the Principle of Least Privilege?", "type": "text", "correctAnswer": "To grant users only the minimum access required, limiting the potential damage of a compromise.", "hint": "Only giving people the keys they absolutely need."}
]

# Generate modules
modules = [{
    "id": "google-course-1",
    "title": "Course 1: Foundations of Cybersecurity",
    "description": "Core foundational concepts of cybersecurity including the CIA triad, threats, and frameworks.",
    "isFuture": False,
    "topics": topics
}]

# Create Course 2 to 8
for i in range(2, 9):
    modules.append({
        "id": f"google-course-{i}",
        "title": f"Course {i}: Coming Soon",
        "description": "Coming soon.",
        "isFuture": True,
        "topics": []
    })

modules[1]["title"] = "Course 2: Play It Safe: Manage Security Risks"
modules[2]["title"] = "Course 3: Connect and Protect: Networks and Network Security"
modules[3]["title"] = "Course 4: Tools of the Trade: Linux and SQL"
modules[4]["title"] = "Course 5: Assets, Threats, and Vulnerabilities"
modules[5]["title"] = "Course 6: Sound the Alarm: Detection and Response"
modules[6]["title"] = "Course 7: Automate Cybersecurity Tasks with Python"
modules[7]["title"] = "Course 8: Put It to Work: Prepare for Cybersecurity Jobs"

ts_content = "import { Module } from './types';\n\nexport const GOOGLE_CYBER_MODULES: Module[] = " + json.dumps(modules, indent=2) + ";\n"

with open('/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/src/dataGoogleCyber.ts', 'w') as f:
    f.write(ts_content)

print("Generated src/dataGoogleCyber.ts successfully.")
