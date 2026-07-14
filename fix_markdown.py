import re

with open('/Users/sp2010/.gemini/antigravity-ide/brain/8856246e-6dd3-4c6a-bb79-23c82855cc26/scratch/Course1.md', 'r') as f:
    text = f.read()

lines = text.split('\n')
out_lines = []
in_grid_table = False
grid_table_buffer = []

def process_grid_table(buffer):
    content_lines = []
    for line in buffer:
        if line.startswith('+---') or line.startswith('+==='):
            continue
        stripped = line.strip()
        if stripped.startswith('|'): stripped = stripped[1:]
        if stripped.endswith('|'): stripped = stripped[:-1]
        
        # unescape pandoc escapes
        stripped = stripped.replace(r'\|', '|').replace(r'\-', '-').replace(r'\_', '_').replace(r'\*', '*')
        
        content_lines.append(stripped.strip())
        
    full_text = '\n'.join(content_lines).strip()
    
    if full_text.startswith('**KEY CONCEPT') or full_text.startswith('**IMPORTANT') or full_text.startswith('**RULE'):
        # Blockquote, remove empty lines
        clean_lines = [line for line in full_text.split('\n') if line.strip() != '']
        return '> ' + '\n> '.join(clean_lines)
    else:
        # ASCII diagram: remove empty lines and fix spacing
        clean_lines = [line for line in content_lines if line.strip() != '']
        ascii_text = '\n'.join(clean_lines)
        return '```text\n' + ascii_text + '\n```'

i = 0
while i < len(lines):
    line = lines[i]
    
    if re.match(r'^\*\*([0-9]+\.[0-9]+ [^*]+)\*\*$', line.strip()):
        out_lines.append('## ' + line.strip()[2:-2])
        i += 1
        continue
        
    if line.strip() in [
        '**Core Cybersecurity Foundations**',
        '**Historical Attacks & Threat Classification**',
        '**Frameworks, Controls, Ethics & Global Compliance**',
        '**Course 1 — Complete Master Glossary**'
    ]:
        out_lines.append('# ' + line.strip()[2:-2])
        i += 1
        continue

    if line.strip() == '**Complete Flashcard Review --- All Modules**':
        out_lines.append('## Complete Flashcard Review --- All Modules')
        i += 1
        continue

    if line.startswith('+---'):
        in_grid_table = True
        grid_table_buffer = [line]
        i += 1
        while i < len(lines):
            grid_table_buffer.append(lines[i])
            if lines[i].startswith('+---') and (i+1 == len(lines) or lines[i+1].strip() == ''):
                break
            i += 1
        out_lines.append(process_grid_table(grid_table_buffer))
        i += 1
        continue
        
    if line.startswith('  ---') or line.startswith('---'):
        table_buffer = [line]
        i += 1
        while i < len(lines):
            table_buffer.append(lines[i])
            if lines[i].startswith('  ---') or lines[i].startswith('---'):
                if i+1 == len(lines) or lines[i+1].strip() == '':
                    break
            i += 1
            
        header_sep = None
        for r in table_buffer:
            if r.strip().startswith('---') and ' ' in r.strip():
                header_sep = r
                break
                
        if header_sep:
            pipe_table = []
            for r in table_buffer:
                if r.strip().startswith('---'): continue
                cells = re.split(r'\s{2,}', r.strip())
                if len(cells) > 1:
                    # Clean pandoc escapes
                    row = '| ' + ' | '.join(cells) + ' |'
                    row = row.replace(r'\|', '|').replace(r'\-', '-').replace(r'\_', '_').replace(r'\*', '*')
                    pipe_table.append(row)
            if len(pipe_table) > 0:
                header = pipe_table[0]
                sep = '|' + '|'.join(['---'] * (header.count('|') - 1)) + '|'
                pipe_table.insert(1, sep)
            out_lines.extend(pipe_table)
        i += 1
        continue

    out_lines.append(line.replace(r'\|', '|').replace(r'\-', '-').replace(r'\_', '_'))
    i += 1

with open('/Users/sp2010/.gemini/antigravity-ide/brain/8856246e-6dd3-4c6a-bb79-23c82855cc26/scratch/Course1_beautiful.md', 'w') as f:
    f.write('\n'.join(out_lines))
