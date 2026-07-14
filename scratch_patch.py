import re
filepath = "/Users/sp2010/Downloads/TryHackMe Notes/pre-security---study-notes/src/components/ModuleMap.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("const isHovered = hoveredTopicId === topic.id;", "const isCompleted = false;\n                        const isHovered = hoveredTopicId === topic.id;")

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
