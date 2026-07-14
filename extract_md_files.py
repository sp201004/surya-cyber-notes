import re
import os

with open('/Users/sp2010/.gemini/antigravity-ide/brain/8856246e-6dd3-4c6a-bb79-23c82855cc26/scratch/Course1_beautiful.md', 'r') as f:
    text = f.read()

parts = text.split('**MODULE 1**')
rest1 = parts[1]

parts2 = rest1.split('**MODULE 2**')
room1_text = parts2[0].strip()
rest2 = parts2[1]

parts3 = rest2.split('**MODULE 3**')
room2_text = parts3[0].strip()
rest3 = parts3[1]

parts4 = rest3.split('**MASTER GLOSSARY**')
room3_text = parts4[0].strip()
rest4 = parts4[1]

parts5 = rest4.split('## Complete Flashcard Review --- All Modules')
room4_text = parts5[0].strip()
room5_text = "## Complete Flashcard Review --- All Modules\n\n" + parts5[1].strip()

# Save them raw and unescaped
base_dir = '/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/src/notes/google-course-1'

files = {
    'core-cyber-foundations.md': room1_text,
    'historical-attacks.md': room2_text,
    'frameworks-ethics.md': room3_text,
    'master-glossary.md': room4_text,
    'mystery-chest.md': room5_text
}

for filename, content in files.items():
    with open(os.path.join(base_dir, filename), 'w') as out_f:
        out_f.write(content)

print("Created 5 markdown files in src/notes/google-course-1/")
