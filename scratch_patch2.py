filepath = "/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/src/data.ts"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("},,", "},")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
