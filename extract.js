const fs = require('fs');
const path = require('path');
const ts = require('typescript');

let code = fs.readFileSync('src/data.ts', 'utf-8');
// Remove the raw imports which Node doesn't understand
code = code.replace(/import\s+.*?from\s+['"].*?\.md\?raw['"];/g, '');
// For any content: m3r1 etc, replace with content: ''
code = code.replace(/content:\s*m3[a-zA-Z0-9]+/g, "content: ''");

// We need to export MODULES_DATA in commonjs or esm
// Just evaluate it in an IIFE
const toEval = ts.transpile(code, { module: ts.ModuleKind.CommonJS });

// run it in a new context or just write and require
fs.writeFileSync('temp_data.cjs', toEval);
const { MODULES_DATA } = require('./temp_data.cjs');

console.log("Loaded modules:", MODULES_DATA.length);

for (let i = 0; i < MODULES_DATA.length; i++) {
  const mod = MODULES_DATA[i];
  const modDir = path.join(process.cwd(), 'src/notes', 'module' + (i + 1));
  fs.mkdirSync(modDir, { recursive: true });
  
  for (const topic of mod.topics) {
    if (topic.content) {
      fs.writeFileSync(path.join(modDir, topic.id + '.md'), topic.content);
      console.log("Wrote", path.join('module' + (i + 1), topic.id + '.md'));
    }
  }
}
