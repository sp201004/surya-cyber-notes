with open('/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/src/dataGoogleCyber.ts', 'r') as f:
    text = f.read()

import re
# Insert "content": "", right after "iconType": "...",
text = re.sub(r'("iconType":\s*"[^"]+",)', r'\1\n        "content": "",', text)

with open('/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/src/dataGoogleCyber.ts', 'w') as f:
    f.write(text)
