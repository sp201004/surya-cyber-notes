import re
with open('/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/generate_google_ts_5.py', 'r') as f:
    text = f.read()

text = text.replace("parts = re.split(r'\\*\\*MODULE 1\\*\\*', text)", "parts = text.split('**MODULE 1**')")
text = text.replace("parts2 = re.split(r'\\*\\*MODULE 2\\*\\*', rest1)", "parts2 = rest1.split('**MODULE 2**')")
text = text.replace("parts3 = re.split(r'\\*\\*MODULE 3\\*\\*', rest2)", "parts3 = rest2.split('**MODULE 3**')")
text = text.replace("parts4 = re.split(r'\\*\\*MASTER GLOSSARY\\*\\*', rest3)", "parts4 = rest3.split('**MASTER GLOSSARY**')")

# Fix the broken line
import sys
lines = text.split('\n')
for i, line in enumerate(lines):
    if "parts5 = re.split" in line:
        lines[i] = "parts5 = rest4.split('## Complete Flashcard Review --- All Modules')"
    if 'room5_text = "**Complete Flashcard Review --- All Modules**\\n\\n" + parts5[1].strip()' in line:
        lines[i] = "room5_text = '## Complete Flashcard Review --- All Modules\\n\\n' + parts5[1].strip()"

with open('/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/generate_google_ts_5.py', 'w') as f:
    f.write('\n'.join(lines))
