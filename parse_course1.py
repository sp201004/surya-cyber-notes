import re
import json

with open('/Users/sp2010/.gemini/antigravity-ide/brain/8856246e-6dd3-4c6a-bb79-23c82855cc26/scratch/Course1.md', 'r') as f:
    text = f.read()

# Split the text by "**MODULE" and "**Master Glossary" or similar
parts = re.split(r'\*\*MODULE (\d+)\*\*', text)
# parts[0] is intro
# parts[1] is '1', parts[2] is text for mod 1
# parts[3] is '2', parts[4] is text for mod 2
# parts[5] is '3', parts[6] is text for mod 3
# Inside parts[6], there is "**Complete Flashcard Review --- All Modules**"

# We'll split parts[6] by "Complete Flashcard Review --- All Modules"
mod3_parts = re.split(r'\*\*Complete Flashcard Review \-\-\- All Modules\*\*', parts[6])
mod3_text = mod3_parts[0]
mod4_text = "**Complete Flashcard Review --- All Modules**" + mod3_parts[1]

# Now we have 4 texts for the 4 topics
texts = [parts[2], parts[4], mod3_text, mod4_text]

titles = [
    "Core Cybersecurity Foundations",
    "Historical Attacks & Threat Classification",
    "Frameworks, Controls & Ethics",
    "Master Glossary & Review"
]

topics = []
ids = ["core-cyber-foundations", "historical-attacks", "frameworks-ethics", "master-glossary"]
icons = ["google-shield-server", "google-timeline", "google-scales", "google-chest"]

for i in range(4):
    content = texts[i].strip()
    
    # We need to escape backticks and ${
    content = content.replace('`', '\\`').replace('${', '\\${')
    
    topics.append({
        "id": ids[i],
        "title": titles[i],
        "content": content,
        "type": "topic" if i < 3 else "mystery-chest",
        "iconType": icons[i],
        "realWorldCallout": "To be added...",
        "keyTakeaways": ["To be added..."],
        "quiz": []
    })

module = {
    "id": "google-course-1",
    "title": "Course 1: Foundations of Cybersecurity",
    "topics": topics
}

with open('/Users/sp2010/.gemini/antigravity-ide/brain/8856246e-6dd3-4c6a-bb79-23c82855cc26/scratch/course1.json', 'w') as f:
    json.dump([module], f, indent=2)

print("Parsed successfully.")
