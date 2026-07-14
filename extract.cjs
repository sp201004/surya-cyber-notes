const fs = require('fs');
const path = require('path');
const ts = require('typescript');

let code = fs.readFileSync('src/data.ts', 'utf-8');
code = code.replace(/import\s+.*?from\s+['"].*?\.md\?raw['"];/g, '');
code = code.replace(/content:\s*m3[a-zA-Z0-9]+/g, "content: ''");

const transpiled = ts.transpile(code, { module: ts.ModuleKind.CommonJS });

fs.writeFileSync('temp_data.cjs', transpiled);
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
