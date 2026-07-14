const fs = require('fs');
const ts = require('typescript');

let code = fs.readFileSync('src/data.ts', 'utf-8');

// The imports for raw md are already at the top, let's remove them
code = code.replace(/import\s+.*?from\s+['"].*?\.md\?raw['"];/g, '');

const sourceFile = ts.createSourceFile('data.ts', code, ts.ScriptTarget.Latest, true);

function visit(node) {
  if (ts.isPropertyAssignment(node) && node.name.text === 'content') {
    // we want to return a dummy string or remove it. We can't just return undefined in AST transform easily without a full transformer.
    // Instead we'll collect the start and end positions to slice them out.
    replacements.push({ start: node.getStart(), end: node.getEnd() });
  }
  ts.forEachChild(node, visit);
}

const replacements = [];
visit(sourceFile);

// apply from back to front
replacements.sort((a, b) => b.start - a.start);
for (const r of replacements) {
  code = code.substring(0, r.start) + "content: ''" + code.substring(r.end);
}

fs.writeFileSync('src/data.ts', code);
console.log("Stripped content from data.ts");
