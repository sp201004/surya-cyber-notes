import fs from 'fs';
import path from 'path';
import { MODULES_DATA } from './src/data';

try {
  console.log("Loaded modules:", MODULES_DATA.length);

  for (let i = 0; i < MODULES_DATA.length; i++) {
    const mod = MODULES_DATA[i];
    const modDir = path.join(process.cwd(), 'src/notes', 'module' + (i + 1));
    fs.mkdirSync(modDir, { recursive: true });
    
    for (const topic of mod.topics) {
      if (topic.content) {
        fs.writeFileSync(path.join(modDir, topic.id + '.md'), topic.content);
        console.log("Wrote", topic.id);
      }
    }
  }
} catch (e) {
  console.error("Failed to load data.ts:", e.message);
}
