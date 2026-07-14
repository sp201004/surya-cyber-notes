import fs from 'fs';

interface Block {
  type: string;
  text?: string;
  lang?: string;
  rows?: string[][];
  listType?: string;
  items?: string[];
}

const parseMarkdownToBlocks = (content: string): Block[] => {
  const lines = content.split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const lang = line.substring(3).trim();
      let codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: 'code', lang, text: codeLines.join('\n') });
      continue;
    }

    if (line.startsWith('>')) {
      let bqLines: string[] = [];
      while (i < lines.length && (lines[i].startsWith('>') || lines[i].trim() === '')) {
        const clean = lines[i].startsWith('>') ? lines[i].substring(1).trim() : lines[i].trim();
        if (clean || bqLines.length > 0) {
          bqLines.push(clean);
        }
        i++;
      }
      blocks.push({ type: 'blockquote', text: bqLines.join(' ') });
      continue;
    }

    if (line.startsWith('# ')) {
      blocks.push({ type: 'h1', text: line.substring(2).trim() });
      i++;
      continue;
    }
    if (line.startsWith('## ')) {
      const headingText = line.substring(3).trim();
      if (headingText.includes('Revision')) {
        let revLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith('## ') && !lines[i].startsWith('# ')) {
          revLines.push(lines[i]);
          i++;
        }
        blocks.push({ type: 'revision', text: headingText, lang: revLines.join('\n') });
        continue;
      } else {
        blocks.push({ type: 'h2', text: headingText });
        i++;
        continue;
      }
    }
    if (line.startsWith('### ') || line.match(/^#{4,6}\s/)) {
      const match = line.match(/^#+\s/);
      const prefixLen = match ? match[0].length : 4;
      blocks.push({ type: 'h3', text: line.substring(prefixLen).trim() });
      i++;
      continue;
    }

    if (line.startsWith('|')) {
      let tableRows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        const rowLine = lines[i];
        const cells = rowLine.split('|').map((c: string) => c.trim()).filter((_: any, idx: number, arr: any[]) => idx > 0 && idx < arr.length - 1);
        if (!cells.every((c: string) => /^[-:]+$/.test(c))) {
          tableRows.push(cells);
        }
        i++;
      }
      if (tableRows.length > 0) {
        blocks.push({ type: 'table', rows: tableRows });
      }
      continue;
    }

    if (line.startsWith('- ') || line.startsWith('* ') || /^\d+\.\s/.test(line)) {
      const isOrdered = /^\d+\.\s/.test(line);
      let listItems: string[] = [];
      let currentItem = '';

      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* ') || /^\d+\.\s/.test(lines[i]) || lines[i].startsWith(' ') || lines[i].startsWith('\t'))) {
        const currentLine = lines[i];
        const isNewItem = currentLine.startsWith('- ') || currentLine.startsWith('* ') || /^\d+\.\s/.test(currentLine);

        if (isNewItem) {
          if (currentItem) {
            listItems.push(currentItem);
          }
          currentItem = currentLine.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '').trim();
        } else {
          currentItem += '\n' + currentLine.trim();
        }
        i++;
      }
      if (currentItem) {
        listItems.push(currentItem);
      }
      blocks.push({ type: 'list', listType: isOrdered ? 'ordered' : 'unordered', items: listItems });
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    let paraLines: string[] = [];
    while (i < lines.length && 
           !lines[i].startsWith('#') && 
           !lines[i].startsWith('>') && 
           !lines[i].startsWith('|') && 
           !lines[i].startsWith('- ') && 
           !lines[i].startsWith('* ') && 
           !/^\d+\.\s/.test(lines[i]) && 
           !lines[i].startsWith('```') && 
           lines[i].trim() !== '') {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: 'paragraph', text: paraLines.join(' ') });
    } else {
      i++;
    }
  }

  return blocks;
};

const m3r1 = fs.readFileSync('src/notes/module3/dns-in-detail.md', 'utf-8');
const m3r2 = fs.readFileSync('src/notes/module3/http-in-detail.md', 'utf-8');
const m3r3 = fs.readFileSync('src/notes/module3/how-websites-work.md', 'utf-8');
const m3r4 = fs.readFileSync('src/notes/module3/putting-it-all-together.md', 'utf-8');
const m3chest = fs.readFileSync('src/notes/module3/mystery-chest.md', 'utf-8');

const all = [m3r1, m3r2, m3r3, m3r4, m3chest];
try {
  all.forEach((md, idx) => {
    console.log('parsing idx', idx);
    const blocks = parseMarkdownToBlocks(md);
    // check revision blocks
    blocks.filter(b => b.type === 'revision').forEach(b => {
      parseMarkdownToBlocks(b.lang || '');
    });
  });
  console.log('SUCCESS!');
} catch(e: any) {
  console.error("ERROR", e);
}
