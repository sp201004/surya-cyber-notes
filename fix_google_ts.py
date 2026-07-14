import json

with open('/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/src/dataGoogleCyber.ts', 'r') as f:
    # Read the file and strip the variable declaration to get raw json
    content = f.read()
    json_str = content.replace("import { Module } from './types';\n\nexport const GOOGLE_CYBER_MODULES: Module[] = ", "").replace(";\n", "")
    
modules = json.loads(json_str)

mod1 = modules[0]

for t in mod1['topics']:
    # remove 'type'
    if 'type' in t:
        del t['type']
    # add required fields
    t['moduleId'] = mod1['id']
    t['description'] = t['title'] + " description."
    t['status'] = 'unlocked'

ts_content = "import { Module } from './types';\n\nexport const GOOGLE_CYBER_MODULES: Module[] = " + json.dumps(modules, indent=2) + ";\n"

with open('/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/src/dataGoogleCyber.ts', 'w') as f:
    f.write(ts_content)

print("Fixed src/dataGoogleCyber.ts successfully.")
