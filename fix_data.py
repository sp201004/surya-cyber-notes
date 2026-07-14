import re

with open('/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/src/dataGoogleCyber.ts', 'r') as f:
    text = f.read()

# Replace the topic ID
text = text.replace('"id": "mystery-chest",\n        "moduleId": "google-course-1",', '"id": "mystery-chest-gc1",\n        "moduleId": "google-course-1",')

# Remove content fields using regex. 
# They look like: "content": "...",
# Be careful because JSON dumps writes it as one huge string with escaped quotes
text = re.sub(r'\s*"content":\s*".*?",\n', '\n', text)

with open('/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/src/dataGoogleCyber.ts', 'w') as f:
    f.write(text)
