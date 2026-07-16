import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { ArrowLeft, BookOpen, CheckCircle, HelpCircle, Lightbulb, ShieldAlert, Sparkles, Terminal, Award, Brain } from 'lucide-react';
import { Topic, MindmapNode } from '../types';
import { notesByTopicId } from '../notes';

// Set at the top of each NotesView render pass. The `pre` renderer (defined at
// module scope) reads this to decide whether the "fake diagram" rule applies.
// ReactMarkdown renders synchronously within NotesView, so this is always the
// current page's value while its code blocks are being rendered.
let googlePageActive = false;

const generateAnchorId = (text?: string) => {
  if (!text) return '';
  let id = text.toLowerCase().trim();
  if (id.includes('room 1')) return 'room-1--offensive-security-intro';
  if (id.includes('room 2')) return 'room-2--defensive-security-intro';
  if (id.includes('room 3') && id.includes('extra')) return 'room-3-extra--interactive-career-quiz';
  if (id.includes('room 3')) return 'room-3--careers-in-cyber';
  
  return id
    .replace(/[–—]/g, '-')
    .replace(/[()]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const emojiToNumberMap: Record<string, string> = {
  '1️⃣': '01',
  '2️⃣': '02',
  '3️⃣': '03',
  '4️⃣': '04',
  '5️⃣': '05',
  '6️⃣': '06',
  '7️⃣': '07',
  '8️⃣': '08',
  '9️⃣': '09',
  '0️⃣': '00',
};

const parseHeading = (rawText: string) => {
  let text = rawText.trim();
  let sectionNumber = '';

  for (const [emoji, num] of Object.entries(emojiToNumberMap)) {
    if (text.startsWith(emoji)) {
      sectionNumber = num;
      text = text.substring(emoji.length).trim();
      break;
    }
  }

  text = text
    .replace(/^#+\s*/, '')
    .replace(/[*_`]/g, '')
    .trim();

  return { text, sectionNumber };
};

const extractText = (children: React.ReactNode): string => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  if (React.isValidElement(children)) {
    const props = children.props as any;
    if (props && props.children) {
      return extractText(props.children);
    }
  }
  return '';
};

const renderBashLines = (code: string) => {
  return code.split('\n').map((line, idx) => {
    if (line.trim().startsWith('#')) {
      return (
        <div key={idx} className="text-gray-500 font-mono select-none">
          {line}
        </div>
      );
    }
    const parts = line.split(' ');
    const cmd = parts[0];
    const rest = parts.slice(1).join(' ');
    if (cmd === 'dirb' || cmd === 'python3' || cmd === 'docker' || cmd === 'nmap') {
      return (
        <div key={idx} className="font-mono">
          <span className="text-[#9fef00] font-bold">{cmd}</span>{' '}
          <span className="text-emerald-200">{rest}</span>
        </div>
      );
    }
    return (
      <div key={idx} className="text-emerald-300 font-mono">
        {line}
      </div>
    );
  });
};

// Python keyword / builtin sets for syntax highlighting.
const PY_KEYWORDS = new Set([
  'if', 'elif', 'else', 'for', 'while', 'def', 'return', 'in', 'not', 'and',
  'or', 'import', 'from', 'as', 'with', 'try', 'except', 'finally', 'raise',
  'class', 'lambda', 'pass', 'break', 'continue', 'is', 'global', 'nonlocal',
  'yield', 'assert', 'del', 'True', 'False', 'None',
]);
const PY_BUILTINS = new Set([
  'print', 'type', 'str', 'int', 'float', 'bool', 'len', 'max', 'min',
  'sorted', 'range', 'open', 'list', 'dict', 'set', 'tuple', 'input',
  'sum', 'abs', 'round', 'enumerate', 'zip', 'map', 'filter',
]);

// A folded code fence often begins with a plain title line (e.g.
// "CONDITIONAL STATEMENTS — if / elif / else..." or "DEFINING AND CALLING
// FUNCTIONS"). Such a line is NOT Python — keep it plain. Detect it as the
// first line only: it either contains an em dash, or is a heading-like line
// with no code punctuation. Real code lines never contain an em dash.
const isPythonTitleLine = (line: string): boolean => {
  const t = line.trim();
  if (!t) return false;
  if (t.startsWith('#')) return false;
  if (/[—–]/.test(t)) return true;
  // All-caps heading style: only uppercase letters, digits, spaces, and a few
  // punctuation marks, with no assignment/expression punctuation.
  if (/^[A-Z0-9][A-Z0-9 ,.&:/'()\-]*$/.test(t) && !/[=;{}[\]]/.test(t) && t.split(/\s+/).length > 1) {
    return true;
  }
  return false;
};

// Tokenize and color a single line of Python (no triple-string state here).
const tokenizePythonLine = (line: string, keyPrefix: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  // Whole-line comment
  if (line.trim().startsWith('#')) {
    return [<span key={keyPrefix} className="text-gray-500 italic">{line}</span>];
  }
  const tokenRe = /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|#.*$|\d+\.\d+|\d+|[A-Za-z_]\w*|\s+|[^\sA-Za-z_0-9])/g;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = tokenRe.exec(line)) !== null) {
    const tok = m[0];
    const key = `${keyPrefix}-${k++}`;
    if (tok.startsWith('#')) {
      nodes.push(<span key={key} className="text-gray-500 italic">{tok}</span>);
    } else if (tok[0] === '"' || tok[0] === "'") {
      nodes.push(<span key={key} className="text-amber-300">{tok}</span>);
    } else if (/^\d/.test(tok)) {
      nodes.push(<span key={key} className="text-orange-400">{tok}</span>);
    } else if (/^[A-Za-z_]/.test(tok)) {
      if (PY_KEYWORDS.has(tok)) {
        nodes.push(<span key={key} className="text-pink-400 font-semibold">{tok}</span>);
      } else if (PY_BUILTINS.has(tok)) {
        nodes.push(<span key={key} className="text-cyan-300">{tok}</span>);
      } else {
        nodes.push(<span key={key} className="text-gray-200">{tok}</span>);
      }
    } else {
      // operators, punctuation, whitespace
      nodes.push(<span key={key} className="text-sky-300/80">{tok}</span>);
    }
  }
  return nodes;
};

// Render a full Python code block with per-line syntax highlighting.
// Preserves indentation exactly (whitespace-pre on the container). Tracks
// multi-line triple-quoted strings (docstrings) across lines. The first line
// is kept plain when it is a folded diagram/section title.
const renderPythonLines = (code: string) => {
  const lines = code.split('\n');
  let inTriple = false;
  let tripleDelim = '';
  return lines.map((line, idx) => {
    // Plain title line (only the very first line of the block)
    if (idx === 0 && !inTriple && isPythonTitleLine(line)) {
      return (
        <div key={idx} className="text-gray-400 font-semibold select-none">
          {line}
        </div>
      );
    }

    if (inTriple) {
      const closeIdx = line.indexOf(tripleDelim);
      if (closeIdx === -1) {
        return <div key={idx} className="text-amber-300">{line || '\u00a0'}</div>;
      }
      const strPart = line.slice(0, closeIdx + 3);
      const rest = line.slice(closeIdx + 3);
      inTriple = false;
      return (
        <div key={idx}>
          <span className="text-amber-300">{strPart}</span>
          {tokenizePythonLine(rest, `${idx}-r`)}
        </div>
      );
    }

    // Detect a triple-quote that opens but does not close on this line
    const openMatch = /"""|'''/.exec(line);
    if (openMatch) {
      const delim = openMatch[0];
      const p = openMatch.index;
      const closeIdx = line.indexOf(delim, p + 3);
      if (closeIdx === -1) {
        const before = line.slice(0, p);
        const strPart = line.slice(p);
        inTriple = true;
        tripleDelim = delim;
        return (
          <div key={idx}>
            {tokenizePythonLine(before, `${idx}-b`)}
            <span className="text-amber-300">{strPart}</span>
          </div>
        );
      }
    }

    const rendered = tokenizePythonLine(line, `${idx}`);
    return <div key={idx}>{rendered.length ? rendered : '\u00a0'}</div>;
  });
};

// SQL keyword / function sets for syntax highlighting (matched case-insensitively).
const SQL_KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'LIKE', 'BETWEEN', 'IN', 'IS',
  'NULL', 'ORDER', 'BY', 'GROUP', 'HAVING', 'JOIN', 'INNER', 'LEFT', 'RIGHT',
  'FULL', 'OUTER', 'CROSS', 'ON', 'AS', 'INSERT', 'INTO', 'VALUES', 'UPDATE',
  'SET', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'DATABASE', 'VIEW',
  'INDEX', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'DISTINCT', 'LIMIT',
  'OFFSET', 'ASC', 'DESC', 'UNION', 'ALL', 'EXISTS', 'CASE', 'WHEN', 'THEN',
  'ELSE', 'END', 'DEFAULT', 'CONSTRAINT', 'ADD', 'COLUMN', 'INT', 'VARCHAR',
  'TEXT', 'DATE', 'DATETIME', 'BOOLEAN', 'LEFT OUTER', 'USING',
]);
const SQL_FUNCTIONS = new Set([
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'ROUND', 'UPPER', 'LOWER', 'LENGTH',
  'NOW', 'SUBSTRING', 'CONCAT', 'COALESCE', 'CAST', 'TRIM',
]);

// The first line of a folded SQL fence is often a heading/annotation (e.g.
// "BASIC QUERY STRUCTURE:", "WHERE EXAMPLES (...):", "LOGICAL OPERATORS — ...").
// Keep it plain so it reads like a caption, not code.
const isSqlTitleLine = (line: string): boolean => {
  const t = line.trim();
  if (!t) return false;
  if (/[—–]/.test(t)) return true;
  if (t.endsWith(':') && !t.includes(';') && !/\bSELECT\b/i.test(t) && t.split(/\s+/).length > 1) return true;
  if (/^[A-Z0-9][A-Z0-9 ,.&:/'()\-]*$/.test(t) && !/[=;]/.test(t) && t.split(/\s+/).length > 1) return true;
  return false;
};

// Tokenize and color a single line of SQL. `--` starts a line comment; single
// quotes are string literals; keywords are matched case-insensitively.
const tokenizeSqlLine = (line: string, keyPrefix: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  if (line.trimStart().startsWith('--')) {
    return [<span key={keyPrefix} className="text-gray-500 italic">{line}</span>];
  }
  const tokenRe = /(--.*$|'(?:[^'\\]|\\.)*'|\d+\.\d+|\d+|[A-Za-z_]\w*|\s+|[^\sA-Za-z_0-9])/g;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = tokenRe.exec(line)) !== null) {
    const tok = m[0];
    const key = `${keyPrefix}-${k++}`;
    if (tok.startsWith('--')) {
      nodes.push(<span key={key} className="text-gray-500 italic">{tok}</span>);
    } else if (tok[0] === "'") {
      nodes.push(<span key={key} className="text-amber-300">{tok}</span>);
    } else if (/^\d/.test(tok)) {
      nodes.push(<span key={key} className="text-orange-400">{tok}</span>);
    } else if (/^[A-Za-z_]/.test(tok)) {
      const up = tok.toUpperCase();
      if (SQL_KEYWORDS.has(up)) {
        nodes.push(<span key={key} className="text-pink-400 font-semibold">{tok}</span>);
      } else if (SQL_FUNCTIONS.has(up)) {
        nodes.push(<span key={key} className="text-cyan-300">{tok}</span>);
      } else {
        nodes.push(<span key={key} className="text-gray-200">{tok}</span>);
      }
    } else {
      nodes.push(<span key={key} className="text-sky-300/80">{tok}</span>);
    }
  }
  return nodes;
};

// Render a full SQL code block with per-line syntax highlighting, preserving
// indentation exactly. First line kept plain when it is a caption/heading.
const renderSqlLines = (code: string) => {
  const lines = code.split('\n');
  return lines.map((line, idx) => {
    if (idx === 0 && isSqlTitleLine(line)) {
      return (
        <div key={idx} className="text-gray-400 font-semibold select-none">
          {line}
        </div>
      );
    }
    const rendered = tokenizeSqlLine(line, `${idx}`);
    return <div key={idx}>{rendered.length ? rendered : '\u00a0'}</div>;
  });
};

// Render XML with per-line highlighting: comments grey, tag names pink,
// attribute names cyan, quoted values amber, brackets/`=` sky, text grey-200.
const renderXmlLines = (code: string) => {
  const re = /(<!--[\s\S]*?-->|<\/?|\/?>|[A-Za-z_][\w:.\-]*|"[^"]*"|'[^']*'|=|[^<>="']+)/g;
  return code.split('\n').map((line, idx) => {
    const nodes: React.ReactNode[] = [];
    let m: RegExpExecArray | null; let k = 0; let inTag = false; let expectName = false;
    while ((m = re.exec(line)) !== null) {
      const t = m[0]; const key = `${idx}-${k++}`;
      if (t.startsWith('<!--')) { nodes.push(<span key={key} className="text-gray-500 italic">{t}</span>); continue; }
      if (t === '<' || t === '</') { inTag = true; expectName = true; nodes.push(<span key={key} className="text-sky-300/80">{t}</span>); continue; }
      if (t === '>' || t === '/>' ) { inTag = false; nodes.push(<span key={key} className="text-sky-300/80">{t}</span>); continue; }
      if (t === '=') { nodes.push(<span key={key} className="text-sky-300/80">{t}</span>); continue; }
      if (t[0] === '"' || t[0] === "'") { nodes.push(<span key={key} className="text-amber-300">{t}</span>); continue; }
      if (inTag && /^[A-Za-z_]/.test(t)) {
        if (expectName) { expectName = false; nodes.push(<span key={key} className="text-pink-400 font-semibold">{t}</span>); }
        else nodes.push(<span key={key} className="text-cyan-300">{t}</span>);
        continue;
      }
      nodes.push(<span key={key} className="text-gray-200">{t}</span>);
    }
    return <div key={idx}>{nodes.length ? nodes : '\u00a0'}</div>;
  });
};

// Render JSON with per-line highlighting: keys cyan, string values amber,
// numbers orange, literals pink, punctuation sky.
const renderJsonLines = (code: string) => {
  const re = /("(?:[^"\\]|\\.)*"|\btrue\b|\bfalse\b|\bnull\b|-?\d+\.?\d*|[{}[\],:]|\s+|[^\s{}[\],:"]+)/g;
  return code.split('\n').map((line, idx) => {
    const toks: string[] = [];
    let m: RegExpExecArray | null;
    while ((m = re.exec(line)) !== null) toks.push(m[0]);
    const nodes = toks.map((t, ti) => {
      const key = `${idx}-${ti}`;
      if (t[0] === '"') {
        let n = ti + 1;
        while (n < toks.length && toks[n].trim() === '') n++;
        const isKey = toks[n] === ':';
        return <span key={key} className={isKey ? 'text-cyan-300' : 'text-amber-300'}>{t}</span>;
      }
      if (/^(true|false|null)$/.test(t)) return <span key={key} className="text-pink-400">{t}</span>;
      if (/^-?\d/.test(t)) return <span key={key} className="text-orange-400">{t}</span>;
      if (/^[{}[\],:]$/.test(t)) return <span key={key} className="text-sky-300/80">{t}</span>;
      return <span key={key} className="text-gray-200">{t}</span>;
    });
    return <div key={idx}>{nodes.length ? nodes : '\u00a0'}</div>;
  });
};

// Languages that render inside the terminal-style code component (never as a
// bare monospace card or callout). Maps each to a highlighter + display label.
const CODE_LANG_LABEL: Record<string, string> = {
  bash: 'Bash Terminal', sh: 'Bash Terminal', shell: 'Bash Terminal',
  spl: 'Splunk SPL', python: 'Python', sql: 'SQL', xml: 'XML', json: 'JSON',
  yaml: 'YAML', yml: 'YAML', http: 'HTTP',
};
const renderCodeLines = (lang: string, content: string): React.ReactNode => {
  switch (lang) {
    case 'python': return renderPythonLines(content);
    case 'sql': return renderSqlLines(content);
    case 'xml': return renderXmlLines(content);
    case 'json': return renderJsonLines(content);
    default: return renderBashLines(content); // bash/sh/shell/spl → prompt styling, # comments
  }
};

// Wide ASCII diagrams (e.g. an annotated Suricata rule line ~120 cols) overflow
// at the default text-xs, cutting off content behind a scrollbar. Shrink the
// font responsively so the whole diagram fits on desktop while staying readable
// (and horizontally scrollable) on mobile. Alignment is preserved — the block
// stays whitespace-pre monospace, so column-aligned annotations line up.
const diagramFontClass = (text: string): string => {
  const maxLen = text.split('\n').reduce((m, l) => Math.max(m, l.length), 0);
  if (maxLen > 110) return 'text-[10px] md:text-[11px]';
  if (maxLen > 84) return 'text-[11px] md:text-xs';
  return 'text-xs';
};

// Does a fenced block contain GENUINE diagram structure (boxes, flows, trees,
// aligned columns)? If so it must stay an atomic monospace card. This is the
// guardrail for the "fake diagram" rule below — when in doubt this returns
// true so the safe monospace default wins.
const hasDiagramStructure = (content: string): boolean => {
  const lines = content.split('\n');
  const markers = [
    /\+[-=]{2,}\+/,                              // closed box border  +----+
    /--+>|<--+/,                                 // ascii flow arrows  --> <--
    /[│┃┌┐└┘├┤┬┴┼─━►▶◄→←↑↓⟶⟵]/,                   // unicode box / arrows
  ];
  if (markers.some(re => re.test(content))) return true;
  // A line that is ONLY a flow connector (| v ^) indicates a flow diagram.
  if (lines.some(l => /^\s*[|vV^]\s*$/.test(l))) return true;
  // Two or more pipes on a single line = columns / box walls.
  if (lines.some(l => (l.match(/\|/g) || []).length >= 2)) return true;
  return false;
};

// ---------------------------------------------------------------------------
// SEGMENT-LEVEL SPLIT: a single fenced card may contain BOTH a real diagram
// (box-drawing / flow) AND trailing prose sentences or bullet lists. Only the
// diagram belongs in a monospace card; the prose/list content must render as
// native styled markdown. We segment the block into blank-line-separated
// chunks, classify each as diagram vs prose, and (only when the block is truly
// mixed) return ordered segments. Pure diagrams, flowcharts, logs and code all
// return null here → they keep the untouched atomic-card behaviour.
// ---------------------------------------------------------------------------
const isBoxLine = (l: string): boolean =>
  (l.match(/\|/g) || []).length >= 2 ||
  /\+[-]{3,}/.test(l) ||
  /[┌┐└┘├┤┬┴┼─│╔╗╚╝║═╠╣╦╩╬]/.test(l);

const isFlowLine = (l: string): boolean =>
  /--+>|<--+|──|=>|[↓↑→←▼▲⟶⟵►◄]/.test(l) ||
  /(^|[^A-Za-z])->([^A-Za-z]|$)/.test(l) ||
  /^\s*[|vV^]\s*$/.test(l);

// ASCII / unicode TREE lines: branch connectors and pipe trunks. Trees are
// diagrams and must stay inside the monospace card (never extracted as prose).
const isTreeLine = (l: string): boolean =>
  /\+-{1,}|\|--|`--|\\--/.test(l) ||          // +--, |--, `--, \-- branches
  /[├└│┌┐┘┤┬┴┼┏┓┗┛┣┫┳┻╋]/.test(l) ||          // unicode tree/box connectors
  /^\s*\|/.test(l);                            // leading pipe trunk (| ...)

// Any structural (non-prose) line: box wall/border, flow arrow, or tree branch.
const isStructuralLine = (l: string): boolean =>
  isBoxLine(l) || isFlowLine(l) || isTreeLine(l);

// A "prose" line: a real sentence, an asterisk bullet, or a LABEL: clause.
// Structural (box/flow/tree) lines and short node labels are excluded.
const isProseLine = (l: string): boolean => {
  const s = l.trim();
  if (!s) return false;
  if (isStructuralLine(l)) return false;
  if (/^\*\s+\S/.test(s)) return true;
  const words = s.split(/\s+/);
  if (words.length >= 5 && /[.!?]$/.test(s)) return true;
  if (s.includes(':') && words.length >= 6 && /[a-z]/.test(s)) return true;
  return false;
};

// Log / code lines that legitimately belong in a monospace card (never split).
const LOGCODE_RE = /^\s*\$ |^\s*<\d+>|CEF:|^\s*alert (http|tcp|udp|ip) |\| stats |\| search |index=|sourcetype=/i;

type BlockSeg = { type: 'diagram' | 'prose'; text: string };

// Returns ordered segments ONLY when the block mixes a diagram with a separate
// prose/bullet chunk; otherwise null (caller keeps the single atomic card).
const segmentDiagramProse = (content: string): BlockSeg[] | null => {
  const allLines = content.split('\n');
  if (allLines.some(l => LOGCODE_RE.test(l))) return null;

  // Group into blank-line-separated chunks.
  const chunks: string[][] = [];
  let cur: string[] = [];
  for (const l of allLines) {
    if (l.trim() === '') { if (cur.length) { chunks.push(cur); cur = []; } }
    else cur.push(l);
  }
  if (cur.length) chunks.push(cur);
  if (chunks.length < 2) return null;

  // A chunk is PROSE only when it has NO structural (box/flow/tree) line at all
  // and carries >=2 real prose lines. Any diagram/tree/flow content → diagram
  // (stays in the atomic monospace card).
  const classify = (c: string[]): 'diagram' | 'prose' => {
    const prose = c.filter(isProseLine).length;
    const structural = c.filter(isStructuralLine).length;
    return structural === 0 && prose >= 2 ? 'prose' : 'diagram';
  };

  const typed = chunks.map(c => ({ t: classify(c), c }));
  if (!typed.some(x => x.t === 'diagram') || !typed.some(x => x.t === 'prose')) return null;

  // Merge consecutive same-type chunks (preserve blank line between them).
  const segs: BlockSeg[] = [];
  for (const { t, c } of typed) {
    const text = c.join('\n');
    if (segs.length && segs[segs.length - 1].type === t) {
      segs[segs.length - 1].text += '\n\n' + text;
    } else {
      segs.push({ type: t, text });
    }
  }
  return segs;
};

// Known title-case / mixed-case lead-in labels (bolded when they start a line).
const LEAD_IN_LABELS = new Set([
  'example','for example','note','reason','mitigation','result','tip','important','warning',
  'remember','definition','goal','fix','cause','impact','analogy','key insight','real example',
  'real-world example','bottom line','takeaway','summary','pro tip','caution','objective',
  'prerequisite','syntax','output','meaning','key concept','use case','scenario','relevance',
  'problem','solution','why','how','when','where','who','what','best practice','rule','memory trick',
  'step','phase','stage','indicator','lesson learned',
]);

// Small connectives that don't break a Title-Case label, and sentence-lead
// words that signal a prose line (not a label). Used by rule 4 below.
const MIXED_CONN = new Set([
  'a','an','the','of','to','in','for','and','or','as','vs','on','by','with','without','at','from','per',
]);
const MIXED_STOP_LEAD = new Set([
  'the','you','we','they','it','this','these','those','i','an','a','each','every','if','when',
  'use','used','using','think','imagine','suppose','now','today','because','after','before',
  'during','unlike','both','many','most','some','all','there','here','that',
]);

// Bold a leading LABEL on a single line (label part only; text after the colon
// stays normal weight). Handles four cases, and never touches sentence colons:
//   1. ALL-CAPS labels ending in ':' or '?:'  — "INDICATOR 1:", "STEP 3:", "PHASE 2 (RECON):"
//   2. Known title-case lead-ins              — "Example:", "For Example:", "Note:", "Reason:"
//   3. Single-word definition terms           — "libpcap: ...", "SHA256: ..."
//   4. (blockquote-only) mixed-case callout labels — "WITHOUT a SIEM Dashboard:",
//      "Step 1 — SIEM Collects:", "Real Impact:", "Metrics that flagged this:".
// Skips lines already bold / headings / table rows.
const boldInlineLabel = (line: string, allowMixedCase = false): string => {
  const s = line;
  if (s.startsWith('**') || s.startsWith('#') || s.startsWith('|') || s.startsWith('> ')) return line;

  // 1. ALL-CAPS label, optionally with a mixed-case parenthetical, ending in
  //    ':' or '?:'. e.g. "INDICATOR 1:", "STOP THE HEMORRHAGING (Containment):",
  //    "PHASE 1 (Preparation):". The text OUTSIDE parentheses must be all-caps
  //    (no lowercase), <= 8 words — so normal sentences with colons are skipped.
  const ci = s.indexOf(':');
  if (ci > 0) {
    const cand = s.slice(0, ci);
    const outside = cand.replace(/\([^)]*\)/g, '');
    if (/^[A-Z0-9]/.test(cand.trim()) && /[A-Z]/.test(outside) && !/[a-z]/.test(outside)
        && cand.trim().split(/\s+/).length <= 8) {
      return `**${cand}:**${s.slice(ci + 1)}`;
    }
  }
  // 2. Known lead-in label (case-insensitive), optionally with a number.
  let m = s.match(/^([A-Za-z][A-Za-z '\-]{0,40}?)(\s\d+)?:(\s|$)/);
  if (m) {
    const base = m[1].trim().toLowerCase();
    if (LEAD_IN_LABELS.has(base)) {
      const lbl = m[1] + (m[2] || '') + ':';
      return `**${lbl}**${s.slice(lbl.length)}`;
    }
  }
  // 3. Single-word definition term followed by ": <definition>".
  m = s.match(/^([A-Za-z][\w.\-]{1,30}):(\s+\S)/);
  if (m) {
    return `**${m[1]}:**${s.slice(m[1].length + 1)}`;
  }
  // 4. (blockquote-only) Mixed-case callout label. Two accepted shapes, both
  //    guarded so ordinary prose colons stay untouched:
  //      A. Title-Case / ALL-CAPS phrase — every content word capitalised
  //         (connectives ignored). Catches "Real Impact:", "The Reality:",
  //         "WITHOUT a SIEM Dashboard:", "Port 22 (SSH):", "Step 1 — SIEM Collects:".
  //      B. Short (<=4 word) label with an inline value, not led by a sentence
  //         word. Catches "Metrics that flagged this:", "What this means:",
  //         "Why this works:", "Also called:".
  //    Requires: starts [A-Z0-9], no sentence punctuation in the label, colon
  //    followed by whitespace-or-end (excludes "https://", "12:04"), <=6 words.
  if (allowMixedCase) {
    const ci2 = s.indexOf(':');
    if (ci2 > 0) {
      const cand = s.slice(0, ci2);
      const after = s.slice(ci2 + 1);
      if (/^[A-Z0-9]/.test(cand) && !/[.!?]/.test(cand) && (after === '' || /^\s/.test(after))) {
        const core = cand.replace(/\([^)]*\)/g, ' ').trim();
        const words = core.split(/\s+/).filter(w => w !== '');
        if (words.length > 0 && words.length <= 6) {
          const content = words.filter(w => /[A-Za-z]/.test(w) && !MIXED_CONN.has(w.toLowerCase()));
          const allCap = content.length > 0 && content.every(w => /^[A-Z]/.test(w));
          const lead = words[0].toLowerCase().replace(/[^a-z]/g, '');
          const shortLabel = words.length <= 4 && !MIXED_STOP_LEAD.has(lead) && after.trim() !== '';
          if (allCap || shortLabel) return `**${cand}:**${after}`;
        }
      }
    }
  }
  return line;
};

// Numbered "step cards" are authored as malformed single-row tables:
//   | **1** | **Title**<br>Description...<br>**Example:** ... |
//   | --- | --- |
// Because the delimiter sits AFTER the content, the step text became a table
// HEADER (uppercase/mono/green) and the literal <br> was never parsed. Convert
// each into a bold "N. Title" line + normal sentence-case description
// paragraph(s), split on <br>. Runs outside fenced code.
const fixStepCards = (md: string): string => {
  const lines = md.split('\n');
  const out: string[] = [];
  let inFence = false;
  const rowRe = /^\s*\|\s*\*\*(\d+)\*\*\s*\|\s*(.*?)\s*\|\s*$/;
  const delimRe = /^\s*\|[\s:|-]*-{2,}[\s:|-]*\|\s*$/;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('```')) { inFence = !inFence; out.push(line); continue; }
    const m = !inFence ? line.match(rowRe) : null;
    if (m && /<br\s*\/?>/i.test(m[2])) {
      const num = m[1];
      const parts = m[2].split(/<br\s*\/?>/i).map(p => p.trim()).filter(p => p !== '');
      const title = (parts.shift() || '').replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
      if (out.length && out[out.length - 1].trim() !== '') out.push('');
      out.push(`**${num}. ${title}**`);
      for (const p of parts) { out.push(''); out.push(p); }
      out.push('');
      // consume the following malformed delimiter row, if present
      if (i + 1 < lines.length && delimRe.test(lines[i + 1])) i++;
      continue;
    }
    out.push(line);
  }
  return out.join('\n');
};

// Convert raw bullet glyphs (●, •) at line start (outside fenced code) into
// markdown list markers so they render as styled bullets, not literal chars.
const fixRawBullets = (md: string): string => {
  const lines = md.split('\n');
  let inFence = false;
  return lines.map(line => {
    if (line.trim().startsWith('```')) { inFence = !inFence; return line; }
    if (inFence) return line;
    const m = line.match(/^(\s*(?:>\s?)*)[●•]\s+(.*)$/);
    return m ? `${m[1]}- ${m[2]}` : line;
  }).join('\n');
};

// Stopwords for fuzzy heading/title matching.
const TITLE_STOP = new Set(['the','and','a','an','of','to','in','for','vs','comparison','key','differences','difference','feature','reference','at','glance','detailed','with','examples','example','core','side','by','how','it','works','model','full','structure','its','on','their','into']);
const titleTokens = (t: string): Set<string> =>
  new Set(t.replace(/[*>#`]/g, '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(w => w && !TITLE_STOP.has(w)));

// Conversion cleanup: an all-bold, body-less title blockquote sitting directly
// ABOVE a markdown table is a leftover from a comparison-box→table conversion.
// If it just restates the section heading → drop it; otherwise → unwrap it into
// a bold caption paragraph (never leave a lone title-only callout).
const fixConversionTitleCallouts = (md: string): string => {
  const lines = md.split('\n');
  const out: string[] = [];
  let inFence = false;
  const precedingHeading = (): string | null => {
    for (let k = out.length - 1; k >= 0; k--) {
      const s = out[k].trim();
      if (s === '') continue;
      if (/^#{1,6}\s/.test(s)) return s.replace(/^#+\s*/, '');
      return null;
    }
    return null;
  };
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith('```')) { inFence = !inFence; out.push(line); i++; continue; }
    if (!inFence && line.trim().startsWith('>')) {
      let j = i;
      const grp: string[] = [];
      while (j < lines.length && lines[j].trim().startsWith('>')) { grp.push(lines[j]); j++; }
      const nonEmpty = grp.filter(g => g.replace(/^\s*>\s?/, '').trim() !== '');
      const allBold = nonEmpty.length > 0 && nonEmpty.every(g => /^\s*>\s*\*\*.+\*\*\s*$/.test(g));
      let k = j;
      while (k < lines.length && lines[k].trim() === '') k++;
      const nextIsTable = k < lines.length && lines[k].trim().startsWith('|');
      if (allBold && nextIsTable) {
        const hd = precedingHeading();
        const g = titleTokens(nonEmpty.join(' '));
        const h = hd ? titleTokens(hd) : new Set<string>();
        const shared = [...g].filter(t => h.has(t)).length;
        const dup = g.size > 0 && shared >= Math.ceil(0.6 * g.size);
        if (dup) { i = k; continue; }                 // drop — heading already says it
        for (const gl of nonEmpty) out.push(gl.replace(/^\s*>\s?/, ''));  // unwrap to bold caption
        out.push('');
        i = k; continue;
      }
      for (let x = i; x < j; x++) out.push(lines[x]);
      i = j; continue;
    }
    out.push(line); i++;
  }
  return out.join('\n');
};

// Site-wide pass: bold label lines everywhere (paragraphs, blockquotes, list
// items) EXCEPT inside fenced code blocks and table rows. One place, applies to
// all rooms.
const boldLabelsGlobally = (md: string): string => {
  const lines = md.split('\n');
  let inFence = false;
  return lines.map(line => {
    if (line.trim().startsWith('```')) { inFence = !inFence; return line; }
    if (inFence) return line;
    const m = line.match(/^(\s*(?:>\s?)*(?:[-*]\s+|\d+[.)]\s+)?)(.*)$/);
    if (!m) return line;
    const prefix = m[1], rest = m[2];
    if (!rest || rest.startsWith('|')) return line;
    // Mixed-case callout labels are only bolded inside blockquotes (callouts),
    // where "Label: value" lines are the norm — never in free prose paragraphs.
    const inBlockquote = /^\s*(?:>\s?)+/.test(line);
    const out = boldInlineLabel(rest, inBlockquote);
    return out === rest ? line : prefix + out;
  }).join('\n');
};

// Course-agnostic pass: bold a standalone LEAD-IN line that directly introduces
// a list or a table (e.g. "The open ports mean:", "Common sources:", "From this
// banner we learn:"). These were rendering as plain body text. Runs for EVERY
// room in the render pipeline, so every current AND future course gets it.
// Guards keep ordinary prose untouched: the line must be short (<=8 words),
// start upper/number, contain NO sentence punctuation (only an optional trailing
// ':'), be standalone (preceded by a blank line or a heading), and the next
// non-blank line must be a list item or a table row.
const boldLeadIns = (md: string): string => {
  const lines = md.split('\n');
  const isListOrTable = (s: string) => /^(?:[-*+]\s+|\d+[.)]\s+|\|)/.test(s.trim());
  let inFence = false;
  return lines.map((line, i) => {
    if (line.trim().startsWith('```')) { inFence = !inFence; return line; }
    if (inFence) return line;
    const m = line.match(/^(\s*)(\S.*)$/);
    if (!m) return line;
    const indent = m[1], s = m[2].trim();
    if (/^(?:\*\*|#|>|\||[-*+]\s|\d+[.)]\s|`)/.test(s)) return line;   // already styled/structural
    if (!/^[A-Z0-9]/.test(s)) return line;
    if (s.includes('`')) return line;                                  // inline code → leave
    const core = s.replace(/:$/, '');
    if (/[.!?]/.test(core)) return line;                               // no sentence punctuation
    if (core.split(/\s+/).length > 8) return line;
    // standalone: previous line blank or a heading
    const prev = i > 0 ? lines[i - 1].trim() : '';
    if (prev !== '' && !/^#{1,6}\s/.test(prev)) return line;
    // next non-blank line must be a list or table
    let j = i + 1;
    while (j < lines.length && lines[j].trim() === '') j++;
    if (j >= lines.length || !isListOrTable(lines[j])) return line;
    return `${indent}**${s}**`;
  }).join('\n');
};

// Convert a pulled-out prose segment into clean markdown: dedent, '* ' -> '- ',
// and bold a leading label via the shared helper. Verbatim words preserved.
const normalizeProseSegment = (text: string): string =>
  text.split('\n').map(l => {
    let s = l.replace(/^\s+/, '');
    if (/^\*\s+/.test(s)) return '- ' + boldInlineLabel(s.replace(/^\*\s+/, ''));
    return boldInlineLabel(s);
  }).join('\n');

// "FAKE DIAGRAM" = a fenced block that is only prose + simple bullet markers
// (+--, *, -) with NO visual structure. These read like a raw .md dump inside a
// monospace card, so we render them as native styled content instead. Trigger
// requires at least one bullet marker; pure-prose blocks (which may rely on
// column alignment) keep the monospace default.
const isFakeDiagram = (content: string): boolean => {
  if (hasDiagramStructure(content)) return false;
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  if (lines.length < 2) return false;
  const hasBullets = lines.some(l => /^\s*(\+--|\*|-)\s+\S/.test(l));
  return hasBullets;
};

// Render a fake-diagram block as native styled content:
//   heading lines (LABEL: ...) -> bold lead-ins
//   +-- / * / - items          -> styled bullet list
//   RULE / summary lines       -> green-bordered callout
// Every word verbatim, order unchanged.
const renderFakeDiagram = (content: string): React.ReactNode => {
  const rawLines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];
  let key = 0;

  const flushBullets = () => {
    if (bullets.length) {
      const items = bullets.slice();
      blocks.push(
        <ul key={`fd-ul-${key++}`} className="list-disc pl-5 space-y-1.5 my-2 text-gray-300 text-xs md:text-sm leading-relaxed">
          {items.map((b, i) => <li key={i} className="leading-relaxed">{b}</li>)}
        </ul>
      );
      bullets = [];
    }
  };

  rawLines.forEach((raw) => {
    const line = raw.trim();
    if (!line) { flushBullets(); return; }

    const bulletMatch = line.match(/^(\+--|\*|-)\s+(.*)$/);
    if (bulletMatch) { bullets.push(bulletMatch[2]); return; }

    flushBullets();

    // Rule / summary / solution line -> green-bordered callout
    if (/\bRULE\b\s*:/i.test(line) || /^(RULE|STANDARD|SOLUTION|KEY|NOTE)\b[^:]*:/i.test(line)) {
      blocks.push(
        <div key={`fd-rule-${key++}`} className="bg-[#1c2538]/60 border-l-4 border-[#9fef00] px-3 py-2 my-2 rounded-r text-xs md:text-sm text-gray-200 font-medium leading-relaxed shadow-[0_0_15px_rgba(159,239,0,0.03)] border-y border-r border-[#2d3a54]/40">
          {line}
        </div>
      );
      return;
    }

    // Heading / label lead-in: ends with a colon, or an ALL-CAPS label followed
    // by a colon, or the folded card title (contains an em/en dash).
    const isHeading = /:$/.test(line)
      || /^[A-Z0-9][A-Z0-9 \-\/&.()']*:/.test(line)
      || /[—–]/.test(line);
    if (isHeading) {
      blocks.push(
        <p key={`fd-h-${key++}`} className="text-white font-bold text-xs md:text-sm mt-3 mb-1 leading-relaxed">
          {line}
        </p>
      );
      return;
    }

    // Plain prose
    blocks.push(
      <p key={`fd-p-${key++}`} className="text-gray-300 text-xs md:text-sm leading-relaxed my-1">
        {line}
      </p>
    );
  });
  flushBullets();

  return (
    <div className="my-4 bg-[#161c2c]/40 border border-[#2d3a54]/40 rounded-lg px-4 py-3">
      {blocks}
    </div>
  );
};

// Detect if content is a PURE ASCII grid table (all-or-nothing).
// A block only qualifies if EVERY non-empty line is part of the grid — either an
// ASCII border line (+---+) or an ASCII pipe row (|...|). If ANY line is prose,
// a diagram fragment, or box-drawing art, the whole block stays as a monospace
// diagram card (safe default). This guarantees we never partially convert a block
// or drop trailing prose.
const isAsciiTable = (content: string): boolean => {
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  if (lines.length < 3) return false;

  const isBorderLine = (l: string) => {
    const t = l.trim();
    return t.startsWith('+') && t.endsWith('+') && /^[+\-]+$/.test(t.replace(/\s/g, ''));
  };
  const isPipeRow = (l: string) => {
    const t = l.trim();
    // ASCII pipe row: starts and ends with '|' and contains no box-drawing chars
    return t.startsWith('|') && t.endsWith('|');
  };

  let borderCount = 0;
  let rowCount = 0;
  for (const line of lines) {
    if (isBorderLine(line)) {
      borderCount++;
    } else if (isPipeRow(line)) {
      rowCount++;
    } else {
      // Any non-grid line (prose, diagram fragment, box-drawing) disqualifies the block
      return false;
    }
  }

  // Need real borders and at least a header + one data row
  return borderCount >= 1 && rowCount >= 2;
};

// Parse ASCII table into structured data
// Handles multi-line cells by joining wrapped text
const parseAsciiTable = (content: string): { headers: string[], rows: string[][] } | null => {
  const lines = content.split('\n').filter(l => l.trim().length > 0);
  
  // Find first border line
  let startIdx = lines.findIndex(l => {
    const trimmed = l.trim();
    return trimmed.startsWith('+') && trimmed.includes('---') && trimmed.endsWith('+');
  });
  
  if (startIdx === -1) return null;
  
  // Find header row (first row with | separators after the border)
  let headerIdx = -1;
  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes('|') && !line.startsWith('+')) {
      headerIdx = i;
      break;
    }
  }
  
  if (headerIdx === -1) return null;
  
  // Parse headers
  const headerLine = lines[headerIdx];
  const headers = headerLine
    .split('|')
    .map(h => h.trim())
    .filter((h, idx, arr) => {
      // Filter out empty cells at start/end from outer pipes
      if (idx === 0 && h === '') return false;
      if (idx === arr.length - 1 && h === '') return false;
      return h.length > 0;
    });
  
  // Parse rows, combining multi-line cells
  const rows: string[][] = [];
  let currentRow: string[] | null = null;
  
  for (let i = headerIdx + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip border lines
    if (line.startsWith('+')) {
      // If we have a current row, push it
      if (currentRow && currentRow.length > 0) {
        rows.push(currentRow);
        currentRow = null;
      }
      continue;
    }
    
    // Skip non-table lines
    if (!line.includes('|')) continue;
    
    // Parse cells
    const cells = line
      .split('|')
      .map(c => c.trim())
      .filter((c, idx, arr) => {
        // Filter out empty cells at start/end from outer pipes
        if (idx === 0 && c === '') return false;
        if (idx === arr.length - 1 && c === '') return false;
        return true;
      });
    
    if (cells.length === 0) continue;
    
    // If this looks like a new row (has content in first cell), start new row
    if (cells[0].length > 0 && cells.length === headers.length) {
      if (currentRow && currentRow.length > 0) {
        rows.push(currentRow);
      }
      currentRow = cells;
    } else if (currentRow) {
      // This might be a continuation line - append to current row
      for (let j = 0; j < cells.length && j < currentRow.length; j++) {
        if (cells[j].length > 0) {
          currentRow[j] = currentRow[j] + ' ' + cells[j];
        }
      }
    }
  }
  
  // Push final row
  if (currentRow && currentRow.length > 0) {
    rows.push(currentRow);
  }
  
  return { headers, rows };
};

// Extract prose/notes that appear after ASCII tables
const extractTrailingProse = (content: string): string[] => {
  const lines = content.split('\n');
  const proseLines: string[] = [];
  let inTable = false;
  let tableEnded = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Detect table boundaries
    if (trimmed.startsWith('+') || trimmed.startsWith('|')) {
      inTable = true;
      continue;
    }
    
    // After table ends, collect prose
    if (inTable && trimmed.length > 0 && !trimmed.startsWith('+') && !trimmed.startsWith('|')) {
      tableEnded = true;
    }
    
    if (tableEnded && trimmed.length > 0) {
      proseLines.push(trimmed);
    }
  }
  
  return proseLines;
};

// Extract plain text from a hast node (for table-header classification).
const hastText = (n: any): string => {
  if (!n) return '';
  if (n.type === 'text') return n.value || '';
  if (Array.isArray(n.children)) return n.children.map(hastText).join('');
  return '';
};
const getTableHeaders = (node: any): string[] => {
  const thead = node?.children?.find((c: any) => c.tagName === 'thead');
  const tr = thead?.children?.find((c: any) => c.tagName === 'tr');
  if (!tr) return [];
  return (tr.children || []).filter((c: any) => c.tagName === 'th').map((th: any) => hastText(th).trim());
};
// Typical KEY/VALUE headers. If a 2-col table has one of these, col 1 is a
// label column and stays bold. Anything else with exactly 2 columns is a
// side-by-side COMPARISON (both columns equal weight).
const KEY_FIRST = new Set(['field','term','feature','category','pillar','type','threat type','name','question','concept','aspect','metric','command','flag','port','port number','property','key','attribute','setting','parameter','step','stage','layer','algorithm','ip version','header field','join type','service model','psychological trigger','scenario','item','use case','role','phase','level','function','method','tool','resource','goal','model','control','indicator','technique','tactic','protocol','service','action','event','distro','factor','principle','domain','framework','standard','record type','status','state','difficulty','os','hash','filter','keyword','sensor','component','area','topic','concept/term']);
const VALUE_SECOND = new Set(['definition','detail','details','answer','purpose','meaning','description','example','examples','value','function','notes','note','use case','security context','why it matters','why analysts watch it','security note','what it contains','what you get','how it works','returns','explanation','result']);

// Average word count of the first two body columns (for label→value detection).
const tableColAvgWords = (node: any): { c0: number; c1: number } => {
  const tbody = node?.children?.find((c: any) => c.tagName === 'tbody');
  const rows = (tbody?.children || []).filter((c: any) => c.tagName === 'tr');
  let s0 = 0, s1 = 0, n = 0;
  for (const tr of rows) {
    const tds = (tr.children || []).filter((c: any) => c.tagName === 'td');
    if (tds.length < 2) continue;
    s0 += hastText(tds[0]).trim().split(/\s+/).filter(Boolean).length;
    s1 += hastText(tds[1]).trim().split(/\s+/).filter(Boolean).length;
    n++;
  }
  return n ? { c0: s0 / n, c1: s1 / n } : { c0: 0, c1: 0 };
};

// Extract a comparison table's headers and per-column NON-EMPTY cell texts.
const getComparisonModel = (node: any): { headers: string[]; cols: string[][] } => {
  const headers = getTableHeaders(node);
  const tbody = node?.children?.find((c: any) => c.tagName === 'tbody');
  const rows = (tbody?.children || []).filter((c: any) => c.tagName === 'tr');
  const cols: string[][] = headers.map(() => []);
  for (const tr of rows) {
    const tds = (tr.children || []).filter((c: any) => c.tagName === 'td');
    tds.forEach((td: any, idx: number) => {
      const t = hastText(td).trim();
      if (t && idx < cols.length) cols[idx].push(t);
    });
  }
  return { headers, cols };
};

// Decide if a table should render as N side-by-side titled PANELS instead of a
// row-matched table: parallel columns of short list items with UNEQUAL fill
// (independent lists, not row-paired tuples). Handles 2-column comparisons
// (External/Internal) and 3-column structures (HEADER/PAYLOAD/FOOTER). Returns
// the column count (2 or 3) or 0.
const panelColumns = (node: any): number => {
  const { headers, cols } = getComparisonModel(node);
  const n = headers.length;
  if (n < 2 || n > 3) return 0;
  const hl = headers.map(h => h.toLowerCase());
  if (hl.some(h => VALUE_SECOND.has(h))) return 0;            // key/value table
  const first = headers[0].replace(/\*/g, '').trim();
  if (first === '' || /^\d+$/.test(first)) return 0;          // numbered/blank
  if (n === 2 && KEY_FIRST.has(hl[0])) return 0;
  const lens = cols.map(c => c.length);
  const avg = cols.map(c => c.length ? c.reduce((s, x) => s + x.trim().split(/\s+/).length, 0) / c.length : 0);
  if (avg.some(a => a > 6)) return 0;                          // long descriptions = table
  // UNEQUAL column fill ⟹ independent lists (row-paired tables always fill every
  // cell). This is the safe signal for panels vs a real table.
  const unequal = new Set(lens.filter(l => l > 0)).size > 1;
  if (!unequal) return 0;
  if (n === 2) return lens.some(l => l >= 3) ? 2 : 0;
  return 3;   // 3-col unequal = independent-list structure (e.g. HEADER/PAYLOAD/FOOTER)
};

// A 2-column table is a COMPARISON (equal-weight columns) unless:
//  - its headers look key/value (KEY_FIRST / VALUE_SECOND), or
//  - column 1 is a short label and column 2 is a long description
//    (e.g. numbered/step tables: "1" → paragraph).
// >2 columns is always key/value (bold first column).
// A narrow leading INDEX/NUMBER column — header like "#" / "No." / "Rank", or
// every first-column cell numeric. The real label lives in column 2, so bold
// must target column 2 (not the index column).
const INDEX_HEADERS = new Set([
  '#', '#.', 'no', 'no.', 'num', 'num.', 'sno', 's.no', 's.no.', 'sr', 'sr.',
  'sl', 'sl.', 'rank',
]);
const isIndexFirstColumn = (node: any): boolean => {
  const h = getTableHeaders(node);
  if (h.length < 2) return false;
  const first = h[0].replace(/\*/g, '').trim().toLowerCase();
  const { cols } = getComparisonModel(node);
  const c0 = cols[0] || [];
  const allNum = c0.length >= 2 && c0.every(x => /^\d+[.)]?$/.test(x.trim()));
  if (!allNum) return false;   // numeric cells required for an index column
  // A consecutive integer run starting at 1/0 is a true row counter (# / Step),
  // NOT a meaningful numeric KEY like Port 22/80, Code 200/404, EventID 4624.
  const nums = c0.map(x => parseInt(x, 10));
  const sequential = nums.every((v, k) => v === nums[0] + k) && (nums[0] === 0 || nums[0] === 1);
  return sequential || INDEX_HEADERS.has(first);
};

const isComparisonTable = (node: any): boolean => {
  const h = getTableHeaders(node);
  const first = h.length ? h[0].replace(/\*/g, '').trim() : '';
  if (first === '' || /^\d+$/.test(first)) return false;   // numbered/step or blank-header = key/value
  const hl = h.map(x => x.toLowerCase());
  if (h.length === 2) {
    if (KEY_FIRST.has(hl[0]) || VALUE_SECOND.has(hl[1])) return false;
    const { c0, c1 } = tableColAvgWords(node);
    if (c0 <= 3 && c1 >= 6) return false;   // label → description = key/value
    return true;
  }
  // 3 parallel columns of short items (no key/value header) → equal weight,
  // e.g. Administrative/Technical/Physical Controls. Term|Definition|Example
  // (long col) or Feature|A|B (key header) stay key/value with bold col 1.
  if (h.length === 3) {
    if (hl.some(x => VALUE_SECOND.has(x)) || KEY_FIRST.has(hl[0])) return false;
    const { headers, cols } = getComparisonModel(node);
    void headers;
    const avg = cols.map(c => c.length ? c.reduce((s, x) => s + x.trim().split(/\s+/).length, 0) / c.length : 0);
    return avg.every(a => a <= 6);
  }
  return false;
};

// Shared wrapper that makes ANY table horizontally scrollable on MOBILE without
// changing desktop. On phones a wide table (e.g. 4-column CIA Triad) would be
// clipped mid-word; here it scrolls with smooth touch scrolling. A right-edge
// fade gradient hints there's more to scroll — shown only while overflowing and
// not yet scrolled to the end, and never on desktop (md:hidden). On desktop the
// table is w-full so it fits and no scrollbar appears — behaviour unchanged.
const ScrollableTable: React.FC<{ innerClassName?: string; children: React.ReactNode }> = ({ innerClassName = '', children }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [showFade, setShowFade] = useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const overflowing = el.scrollWidth > el.clientWidth + 1;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      setShowFade(overflowing && !atEnd);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    let ro: ResizeObserver | undefined;
    if (typeof ResizeObserver !== 'undefined') { ro = new ResizeObserver(update); ro.observe(el); }
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      ro?.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [children]);
  return (
    <div className="relative my-6">
      <div
        ref={ref}
        className={`no-scrollbar overflow-x-auto [-webkit-overflow-scrolling:touch] rounded-xl border border-[#2d3a54] shadow-md shadow-black/20 ${innerClassName}`}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-xl bg-gradient-to-l from-[#0d1117] to-transparent transition-opacity duration-200 md:hidden ${showFade ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

const markdownComponents: import('react-markdown').Components = {
  h1: ({node, children, ...props}) => {
    const rawText = extractText(children);
    const { text: cleanText, sectionNumber } = parseHeading(rawText);
    return (
      <h1 className="text-xl md:text-2xl font-extrabold text-white border-l-4 border-[#9fef00] pl-3 mt-8 mb-4 font-sans scroll-mt-24 flex items-center flex-wrap gap-2" id={generateAnchorId(rawText)}>
        {sectionNumber && (
          <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-mono font-bold bg-[#9fef00]/10 text-[#9fef00] border border-[#9fef00]/30 rounded">
            {sectionNumber}
          </span>
        )}
        <span>{cleanText}</span>
      </h1>
    );
  },
  h2: ({node, children, ...props}) => {
    const rawText = extractText(children);
    const { text: cleanText, sectionNumber } = parseHeading(rawText);
    return (
      <h2 className="text-lg md:text-xl font-bold text-white border-b border-[#2d3a54] pb-2 mt-8 mb-4 font-sans scroll-mt-24 flex items-center flex-wrap gap-2" id={generateAnchorId(rawText)}>
        <span className="text-[#9fef00] mr-1">✦</span>
        {sectionNumber && (
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#9fef00]/10 text-[#9fef00] border border-[#9fef00]/30 rounded">
            {sectionNumber}
          </span>
        )}
        <span>{cleanText}</span>
      </h2>
    );
  },
  h3: ({node, children, ...props}) => {
    const rawText = extractText(children);
    const { text: cleanText, sectionNumber } = parseHeading(rawText);
    return (
      <h3 className="text-base font-bold text-[#9fef00] mt-6 mb-3 font-sans scroll-mt-24 flex items-center flex-wrap gap-2" id={generateAnchorId(rawText)}>
        {sectionNumber && (
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#9fef00]/10 text-[#9fef00] border border-[#9fef00]/20 rounded">
            {sectionNumber}
          </span>
        )}
        <span>{cleanText}</span>
      </h3>
    );
  },
  // TryHackMe rooms use #### / ##### for sub-headings (Google rooms stop at
  // ###). Without these renderers h4/h5/h6 fell back to unstyled body text.
  // h4 = bold white sub-heading (green ▸), h5/h6 = progressively lighter.
  h4: ({node, children, ...props}) => {
    const rawText = extractText(children);
    const { text: cleanText, sectionNumber } = parseHeading(rawText);
    return (
      <h4 className="text-sm md:text-base font-bold text-white mt-5 mb-2 font-sans scroll-mt-24 flex items-center flex-wrap gap-2" id={generateAnchorId(rawText)}>
        <span className="text-[#9fef00] mr-1">▸</span>
        {sectionNumber && (
          <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#9fef00]/10 text-[#9fef00] border border-[#9fef00]/20 rounded">
            {sectionNumber}
          </span>
        )}
        <span>{cleanText}</span>
      </h4>
    );
  },
  h5: ({node, children, ...props}) => {
    const rawText = extractText(children);
    const { text: cleanText } = parseHeading(rawText);
    return (
      <h5 className="text-sm font-semibold text-gray-100 mt-4 mb-2 font-sans scroll-mt-24 flex items-center flex-wrap gap-2" id={generateAnchorId(rawText)}>
        <span className="text-[#9fef00]/70 mr-1">•</span>
        <span>{cleanText}</span>
      </h5>
    );
  },
  h6: ({node, children, ...props}) => {
    const rawText = extractText(children);
    const { text: cleanText } = parseHeading(rawText);
    return (
      <h6 className="text-xs font-semibold text-gray-300 uppercase tracking-wide mt-3 mb-1 font-sans scroll-mt-24" id={generateAnchorId(rawText)}>
        {cleanText}
      </h6>
    );
  },
    pre: ({node, children, ...props}: any) => {
    let lang = '';
    let className = '';

    // Check if the child is a code element and extract language
    if (children && typeof children === 'object' && 'props' in children && children.props.className) {
      className = children.props.className;
      const match = /language-(\w+)/.exec(className);
      if (match) lang = match[1].toLowerCase();
    }

    const content = extractText(children).replace(/\n$/, '');

    // CODE / QUERIES / LOG SAMPLES / CONFIG (bash, spl, python, sql, xml, json)
    // render inside the terminal-style component with the right language —
    // never as a bare monospace card or callout.
    if (lang in CODE_LANG_LABEL) {
      return (
        <div className="bg-[#0b0f19] rounded-xl border border-[#2d3a54] my-6 overflow-hidden shadow-xl font-mono text-xs leading-relaxed select-all">
          <div className="bg-[#111827] px-4 py-2 flex items-center justify-between border-b border-[#2d3a54]/80">
            <div className="flex space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/75" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/75" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/75" />
            </div>
            <span className="text-[10px] text-gray-400 font-bold select-none tracking-wider uppercase">{CODE_LANG_LABEL[lang]}</span>
            <span className="w-12" />
          </div>
          <pre className="p-4 overflow-x-auto whitespace-pre leading-relaxed bg-[#0b0f19] font-mono select-all">
            {renderCodeLines(lang, content)}
          </pre>
        </div>
      );
    }

    // Check if this is an ASCII table (tabular data with borders)
    if (isAsciiTable(content)) {
      const tableData = parseAsciiTable(content);
      
      if (tableData) {
        const acols = tableData.headers.length;
        const aMinW = acols >= 4 ? "min-w-[44rem] md:min-w-0 " : acols === 3 ? "min-w-[32rem] md:min-w-0 " : "";
        return (
          <ScrollableTable>
            <table className={`${aMinW}w-full text-left border-collapse font-sans text-xs`}>
              <thead className="bg-[#9fef00]/10 border-b border-[#9fef00]/20 text-[#9fef00]">
                <tr>
                  {tableData.headers.map((header, idx) => (
                    <th key={idx} className="px-4 py-3 font-bold uppercase tracking-wider font-mono">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2d3a54]/50">
                {tableData.rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="even:bg-[#1c2538]/40 odd:bg-[#161c2c]/40 hover:bg-[#1c2538]/60 transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className={`px-4 py-3 leading-relaxed ${cellIdx === 0 ? 'font-semibold text-gray-100' : 'text-gray-300'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </ScrollableTable>
        );
      }
    }
    
    // THIRD RULE: a "fake diagram" (prose + simple bullets, no visual
    // structure) renders as NATIVE styled content, not a monospace card.
    // Scoped to Google course pages; genuine diagrams stay monospace.
    if (googlePageActive && isFakeDiagram(content)) {
      return renderFakeDiagram(content);
    }

    // SEGMENT-LEVEL RULE: if the card mixes a real diagram with a separate
    // prose/bullet chunk, split it — diagram stays a monospace card, prose/list
    // content renders as native styled markdown, original order preserved.
    const segs = segmentDiagramProse(content);
    if (segs) {
      return (
        <>
          {segs.map((seg, i) =>
            seg.type === 'diagram' ? (
              <div
                key={i}
                className={`font-mono ${diagramFontClass(seg.text)} bg-[#111827]/90 border-l-4 border-[#9fef00] p-4 rounded-r-lg my-4 overflow-x-auto whitespace-pre leading-relaxed text-gray-300 shadow-[0_0_15px_rgba(159,239,0,0.03)] border-y border-r border-[#2d3a54]/40 select-all`}
              >
                {seg.text}
              </div>
            ) : (
              <div key={i} className="my-4">
                <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>
                  {normalizeProseSegment(seg.text)}
                </ReactMarkdown>
              </div>
            )
          )}
        </>
      );
    }

    // ATOMIC RULE: every other fenced code block renders byte-for-byte in one
    // monospace diagram card. No line dropping, joining, or reformatting — the
    // content is preserved exactly as written in the source. Horizontal scroll
    // (whitespace-pre) keeps ASCII alignment intact for diagrams.
    return (
      <div className={`font-mono ${diagramFontClass(content)} bg-[#111827]/90 border-l-4 border-[#9fef00] p-4 rounded-r-lg my-4 overflow-x-auto whitespace-pre leading-relaxed text-gray-300 shadow-[0_0_15px_rgba(159,239,0,0.03)] border-y border-r border-[#2d3a54]/40 select-all`}>
        {content}
      </div>
    );
  },
  code: ({node, className, children, ...props}: any) => {
    return (
      <code className="bg-[#9fef00]/10 text-[#9fef00] px-1.5 py-0.5 rounded font-mono text-xs mx-0.5 border border-[#9fef00]/20 font-medium select-all" {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({node, children, ...props}) => (
    <div className="bg-[#1c2538]/60 border-l-4 border-[#9fef00] p-4 my-5 rounded-r-lg shadow-[0_0_15px_rgba(159,239,0,0.03)] border-y border-r border-[#2d3a54]/40">
      <div className="flex items-start space-x-2.5">
        <div className="mt-0.5 text-[#9fef00] select-none font-sans font-bold">💡</div>
        <div className="text-xs md:text-sm font-sans text-gray-300 leading-relaxed italic blockquote-content">
          {children}
        </div>
      </div>
    </div>
  ),
  table: ({node, children, ...props}) => {
    // Independent-list tables (2-col comparisons, 3-col structures) → titled
    // panels, each its own bullet list. No empty cells. Stacks on mobile.
    const pcols = panelColumns(node);
    if (pcols) {
      const { headers, cols } = getComparisonModel(node);
      const grid = pcols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
      return (
        <div className={`my-6 grid grid-cols-1 ${grid} gap-4`}>
          {cols.map((col, i) => (
            <div key={i} className="rounded-xl border border-[#2d3a54] overflow-hidden shadow-md shadow-black/20 bg-[#161c2c]/40">
              <div className="bg-[#9fef00]/10 border-b border-[#9fef00]/20 text-[#9fef00] px-4 py-3 font-bold uppercase tracking-wider font-mono text-xs">
                {headers[i]}
              </div>
              <ul className="p-4 pl-6 space-y-1.5 text-xs text-gray-300 list-disc marker:text-[#9fef00]/60 font-sans leading-relaxed">
                {col.map((cell, j) => <li key={j}>{cell}</li>)}
              </ul>
            </div>
          ))}
        </div>
      );
    }

    // Key/value tables bold the label column; comparison tables keep both
    // columns equal weight. When the first column is a narrow index/number
    // column ("#", "No.", numeric), the label lives in column 2 — bold that,
    // but only when column 2 is a SHORT label (not a label+description cell,
    // e.g. numbered workflow tables whose col 2 is a whole paragraph).
    const indexFirst = isIndexFirstColumn(node);
    let boldSecond = false;
    if (indexFirst) {
      const c1 = (getComparisonModel(node).cols[1]) || [];
      const avg1 = c1.length ? c1.reduce((s, x) => s + x.trim().split(/\s+/).length, 0) / c1.length : 0;
      boldSecond = avg1 > 0 && avg1 <= 6;
    }
    const boldFirst = !indexFirst && !isComparisonTable(node);
    const boldCls =
      (boldFirst ? "[&_tbody_td:first-child]:font-semibold [&_tbody_td:first-child]:text-gray-100 " : "") +
      (boldSecond ? "[&_tbody_td:nth-child(2)]:font-semibold [&_tbody_td:nth-child(2)]:text-gray-100" : "");
    // Give wide tables (3+ columns) a mobile min-width so columns stay readable
    // and the wrapper scrolls; reset on desktop (md:min-w-0) so nothing changes.
    const ncols = getTableHeaders(node).length;
    const minW = ncols >= 4 ? "min-w-[44rem] md:min-w-0 " : ncols === 3 ? "min-w-[32rem] md:min-w-0 " : "";
    return (
      <ScrollableTable innerClassName={boldCls}>
        <table className={`${minW}w-full text-left border-collapse font-sans text-xs`} {...props}>
          {children}
        </table>
      </ScrollableTable>
    );
  },
  thead: ({node, children, ...props}) => (
    <thead className="bg-[#9fef00]/10 border-b border-[#9fef00]/20 text-[#9fef00]" {...props}>
      {children}
    </thead>
  ),
  tbody: ({node, children, ...props}) => (
    <tbody className="divide-y divide-[#2d3a54]/50" {...props}>
      {children}
    </tbody>
  ),
  tr: ({node, children, ...props}) => (
    <tr className="even:bg-[#1c2538]/40 odd:bg-[#161c2c]/40 hover:bg-[#1c2538]/60 transition-colors" {...props}>
      {children}
    </tr>
  ),
  th: ({node, children, ...props}) => (
    <th className="px-4 py-3 font-bold uppercase tracking-wider font-mono" {...props}>
      {children}
    </th>
  ),
  td: ({node, children, ...props}) => {
    // Empty cells (e.g. shorter column in an uneven comparison table) render an
    // em-dash placeholder instead of a blank gap.
    const isEmpty = extractText(children).trim() === '';
    return (
      <td className="px-4 py-3 text-gray-300 leading-relaxed" {...props}>
        {isEmpty ? <span className="text-gray-600">—</span> : children}
      </td>
    );
  },
  hr: () => (
    <hr className="border-[#2d3a54] my-8 border-t-[1.5px] opacity-50" />
  ),
  p: ({node, children, ...props}) => {
    // If the paragraph only contains an image, we can style it differently, but default is fine.
    return (
      <p className="text-gray-300 text-xs md:text-sm leading-relaxed my-3 font-sans" {...props}>
        {children}
      </p>
    );
  },
  ul: ({node, children, ...props}) => (
    <ul className="list-disc pl-5 space-y-2.5 my-4 text-gray-300 text-xs md:text-sm leading-relaxed" {...props}>
      {children}
    </ul>
  ),
  ol: ({node, children, ...props}) => (
    <ol className="list-decimal pl-5 space-y-2.5 my-4 text-gray-300 text-xs md:text-sm leading-relaxed" {...props}>
      {children}
    </ol>
  ),
  li: ({node, children, ...props}) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  a: ({node, children, ...props}) => (
    <a className="text-[#9fef00] hover:underline font-semibold font-mono" target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ),
  strong: ({node, children, ...props}) => (
    <strong className="text-white font-semibold" {...props}>
      {children}
    </strong>
  ),
};

interface ParsedSection {
  type: 'markdown' | 'revision';
  content: string;
  title?: string;
}

// Google notes author diagram titles/column-headers as a blockquote placed
// immediately before the diagram's fenced code block. To keep each diagram
// ATOMIC (title + labels + art in ONE aligned monospace card), we fold such a
// title blockquote into the top of its following code fence. This is applied
// ONLY to Google course pages; TryHackMe rendering is left untouched.
//
// Heuristic (reliable for Google notes): a blockquote whose next non-blank line
// opens a code fence is a diagram title. Genuine prose callouts are always
// followed by tables/headings/other blockquotes, never directly by a fence.
const foldDiagramTitlesIntoFences = (md: string): string => {
  const lines = md.split('\n');
  const out: string[] = [];
  let i = 0;
  const isBlockquote = (l: string) => /^\s*>/.test(l);
  const isFence = (l: string) => l.trim().startsWith('```');

  // A diagram title/label line is authored fully bold (e.g. **THREE CONTROL
  // CATEGORIES**). Prose callouts have a bold header followed by plain-text
  // sentences, so they are NOT fully bold on every line — those must stay as
  // callouts, never folded into a diagram.
  const stripQuote = (l: string) => l.replace(/^\s*>\s?/, '').replace(/\s+$/, '');
  const isFullyBold = (l: string) => /^\*\*.*\*\*$/.test(stripQuote(l).trim());

  while (i < lines.length) {
    if (isBlockquote(lines[i])) {
      // Gather the consecutive blockquote lines
      const bq: string[] = [];
      while (i < lines.length && isBlockquote(lines[i])) {
        bq.push(lines[i]);
        i++;
      }
      // Look ahead past blank lines for a fence
      let j = i;
      while (j < lines.length && lines[j].trim() === '') j++;

      // Only fold when this is truly a diagram title: it directly precedes a
      // fence AND every non-empty line is fully bold (a title/label, not prose).
      const nonEmpty = bq.filter(l => stripQuote(l).trim().length > 0);
      const allBold = nonEmpty.length > 0 && nonEmpty.every(isFullyBold);

      if (j < lines.length && isFence(lines[j]) && allBold) {
        // Diagram title → fold into the fence
        const fenceOpen = lines[j];
        let k = j + 1;
        const body: string[] = [];
        while (k < lines.length && !isFence(lines[k])) {
          body.push(lines[k]);
          k++;
        }
        const fenceClose = k < lines.length ? lines[k] : '```';

        // Strip '> ' prefixes and bold markers so the title reads cleanly in monospace
        const titleLines = bq.map(l =>
          l.replace(/^\s*>\s?/, '').replace(/\*\*/g, '').replace(/\s+$/, '')
        );
        while (titleLines.length && titleLines[titleLines.length - 1].trim() === '') {
          titleLines.pop();
        }

        out.push(fenceOpen);
        for (const t of titleLines) out.push(t);
        out.push('');
        for (const b of body) out.push(b);
        out.push(fenceClose);
        i = k + 1;
        continue;
      }

      // Not a diagram title — emit the blockquote unchanged
      for (const b of bq) out.push(b);
      continue;
    }

    out.push(lines[i]);
    i++;
  }

  return out.join('\n');
};

// remark-gfm does NOT parse a markdown table that is indented as the lazy
// continuation of a list item (no blank line, extra indent) — it leaks as raw
// "| a | b |" text. This detaches such tables: it finds a run of indented
// table rows (a header + a delimiter row) that is NOT inside a code fence,
// dedents it, normalizes the delimiter to the header's column count, and
// separates it with blank lines so it renders as a proper block table right
// below its bullet. Content is untouched — only layout/whitespace changes.
const detachNestedTables = (md: string): string => {
  const lines = md.split('\n');
  const out: string[] = [];
  let inFence = false;
  const isFence = (l: string) => l.trim().startsWith('```');
  const trimmedIsRow = (l: string) => {
    const t = l.trim();
    return t.startsWith('|') && t.length > 1;
  };
  const isIndentedRow = (l: string) => /^\s+\|/.test(l) && trimmedIsRow(l);
  const isDelim = (l: string) => {
    let t = l.trim();
    if (t.startsWith('|')) t = t.slice(1);
    if (t.endsWith('|')) t = t.slice(0, -1);
    const cells = t.split('|');
    return cells.length > 0 && cells.every(c => /^\s*:?-{1,}:?\s*$/.test(c));
  };
  const countCells = (l: string) => {
    let t = l.trim();
    if (t.startsWith('|')) t = t.slice(1);
    if (t.endsWith('|')) t = t.slice(0, -1);
    return t.split('|').length;
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (isFence(line)) { inFence = !inFence; out.push(line); i++; continue; }

    if (!inFence && isIndentedRow(line)) {
      const block: string[] = [];
      let j = i;
      while (j < lines.length && !isFence(lines[j]) && isIndentedRow(lines[j])) {
        block.push(lines[j]);
        j++;
      }
      // A real markdown table needs a delimiter row as its 2nd line.
      if (block.length >= 2 && isDelim(block[1])) {
        const dedented = block.map(r => r.trim());
        const cols = countCells(dedented[0]);
        dedented[1] = '|' + Array(cols).fill('---').join('|') + '|';
        if (out.length && out[out.length - 1].trim() !== '') out.push('');
        for (const d of dedented) out.push(d);
        out.push('');
        i = j;
        continue;
      }
      for (const b of block) out.push(b);
      i = j;
      continue;
    }

    out.push(line);
    i++;
  }
  return out.join('\n');
};

// Unlabeled ``` fences that clearly hold shell / query / log content are tagged
// so they render in the terminal component instead of a bare monospace card.
// Conservative: requires a strong code signal (a `#` comment PLUS a query, or a
// shell prompt / known command) AND no ASCII-diagram lines — so genuine
// diagrams and label/display cards (e.g. "DNS: Name → IP") are never touched.
const CODE_DIAGRAM_RE = /\+[-]{2,}|[┌┐└┘├┤┬┴┼─│╔╗╚╝║═╠╣╦╩╬►◄▶◀▲▼⟶⟵→←↑↓]|--+>|<--+/;
const tagCodeFences = (md: string): string => {
  const lines = md.split('\n');
  const out: string[] = [];
  const isFence = (l: string) => l.trim().startsWith('```');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (isFence(line)) {
      // Consume this fence as one opener→closer unit (labeled or not) so a
      // labeled fence's closing ``` is never mistaken for a new opener.
      const openerLang = line.trim().slice(3).trim();
      const body: string[] = [];
      let j = i + 1;
      while (j < lines.length && !isFence(lines[j])) { body.push(lines[j]); j++; }
      const closing = j < lines.length ? lines[j] : '```';
      const nonEmpty = body.filter(b => b.trim() !== '');
      const hasDiagram = body.some(b => CODE_DIAGRAM_RE.test(b) || /^\s*[|+][|+\-vV^<>\s]*[|+]\s*$/.test(b));
      const hasComment = nonEmpty.some(b => b.trim().startsWith('#'));
      const hasQuery = nonEmpty.some(b => /\b\w+=\w|index=|sourcetype=|EventCode=|\|\s*(stats|table|chart|search|head|sort|dedup|eval|where|rex)\b/.test(b));
      const hasPrompt = nonEmpty.some(b => /^\s*\$\s/.test(b) || /^\s*(sudo|jq|nmap|curl|grep|awk|sed|tcpdump|cat)\s/.test(b.trim()));
      const qualifies = openerLang === '' && !hasDiagram && nonEmpty.length >= 2
        && ((hasComment && hasQuery) || hasPrompt);
      out.push(qualifies ? '```spl' : line);
      for (const b of body) out.push(b);
      out.push(closing);
      i = j + 1;
      continue;
    }
    out.push(line);
    i++;
  }
  return out.join('\n');
};

const parseIntoSections = (rawContent: string): ParsedSection[] => {
  const lines = rawContent.split('\n');
  const sections: ParsedSection[] = [];
  let currentMarkdownLines: string[] = [];
  let i = 0;

  while (i < lines.length) {
    if (lines[i].startsWith('## ') && lines[i].includes('Contents')) {
      i++;
      while (i < lines.length && !lines[i].startsWith('## ') && !lines[i].startsWith('# ')) {
        i++;
      }
      continue;
    }
    if (lines[i].startsWith('## ') && lines[i].includes('Revision')) {
      if (currentMarkdownLines.length > 0) {
        sections.push({ type: 'markdown', content: currentMarkdownLines.join('\n') });
        currentMarkdownLines = [];
      }
      const revTitle = lines[i].substring(3).trim();
      let revLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('## ') && !lines[i].startsWith('# ')) {
        revLines.push(lines[i]);
        i++;
      }
      sections.push({ type: 'revision', content: revLines.join('\n'), title: revTitle });
      continue;
    }
    currentMarkdownLines.push(lines[i]);
    i++;
  }

  if (currentMarkdownLines.length > 0) {
    sections.push({ type: 'markdown', content: currentMarkdownLines.join('\n') });
  }

  return sections;
};

interface NotesViewProps {
  topic: Topic;
  onBack: () => void;
  onCompleteTopic?: (topicId: string, earnedPoints: number) => void;
  userPoints: number;
  pathwayLabel?: string;
}

export default function NotesView({
  topic,
  onBack,
  userPoints,
  pathwayLabel = 'Pre Security Pathway',
}: NotesViewProps) {
  const rawContentSource = notesByTopicId[topic.id] || topic.content || '';
  const isGoogleCourse = (topic.moduleId || '').startsWith('google-course-');
  googlePageActive = isGoogleCourse;
  const foldedContent = isGoogleCourse
    ? foldDiagramTitlesIntoFences(rawContentSource)
    : rawContentSource;
  // Detach any markdown tables nested inside list items so they render as
  // styled tables instead of leaking raw pipes (applies site-wide). Then bold
  // label lines everywhere (outside fenced code / tables).
  const rawContent = boldLabelsGlobally(
    boldLeadIns(
      fixConversionTitleCallouts(
        fixRawBullets(
          fixStepCards(detachNestedTables(tagCodeFences(foldedContent)))
        )
      )
    )
  );
  const sections = parseIntoSections(rawContent);
  const [isTocExpanded, setIsTocExpanded] = useState(false);

  // TOC parsing
  const tocItems: any[] = [];
  rawContent.split('\n').forEach(line => {
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      const rawText = line.substring(3).trim();
      if (rawText.includes('Contents')) return;
      const { text: cleanText } = parseHeading(rawText);
      tocItems.push({
        rawText,
        cleanText,
        anchor: generateAnchorId(rawText)
      });
    }
  });

  const renderTOC = () => {
    if (tocItems.length <= 1) return null;
    
    const itemsToShow = isTocExpanded ? tocItems : tocItems.slice(0, 8);
    const hasMore = tocItems.length > 8;
    
    return (
      <div className="bg-[#161c2c]/80 border border-[#2d3a54] rounded-xl p-5 mb-8 text-left backdrop-blur-md">
        <div className="flex items-center space-x-2 text-[#9fef00] font-mono text-xs font-bold uppercase tracking-wider mb-3">
          <Terminal className="w-4 h-4" />
          <span>Table of Contents</span>
        </div>
        <ul className="space-y-1.5">
          {itemsToShow.map((item, idx) => (
            <li 
              key={idx} 
              className="pl-2 text-gray-400 hover:text-[#9fef00] transition-colors text-[11px] font-sans border-l border-[#2d3a54] hover:border-[#9fef00]"
            >
              <a 
                href={`#${item.anchor}`} 
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(item.anchor);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="hover:underline flex items-center space-x-2 py-0.5"
              >
                <span>{item.cleanText}</span>
              </a>
            </li>
          ))}
        </ul>
        {hasMore && (
          <button
            onClick={() => setIsTocExpanded(!isTocExpanded)}
            className="mt-4 text-[10px] font-mono text-gray-400 hover:text-[#9fef00] transition-colors flex items-center space-x-1"
          >
            <span>{isTocExpanded ? 'Collapse list' : `Show all (${tocItems.length} sections) ▾`}</span>
          </button>
        )}
      </div>
    );
  };

  // Measured mindmap container size — drives aspect-fill so the tree fills the
  // card identically regardless of how many nodes / how deep the tree is.
  const mindmapContainerRef = React.useRef<HTMLDivElement>(null);
  const [mmSize, setMmSize] = useState<{ w: number; h: number }>({ w: 640, h: 400 });
  React.useEffect(() => {
    const el = mindmapContainerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const update = () => setMmSize({ w: el.clientWidth || 640, h: el.clientHeight || 400 });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ---- Tidy-tree layout for the mindmap (self-contained, no dependency) ----
  // Reingold–Tilford style: leaves are slotted sequentially, internal nodes are
  // centered on their children. Produces an overlap-free horizontal tree. After
  // layout, spacing (never node size) is stretched so the tree's bounding box
  // matches the container aspect ratio — so meet-scaling then fills the card the
  // same way for a flat 5-node tree or a deep 15-node one.
  const treeLayout = React.useMemo(() => {
    const nodes = topic.mindmap || [];
    if (nodes.length === 0) {
      return { positioned: [] as any[], edges: [] as any[], parentOf: {} as Record<string, string>, width: 100, height: 100, rootId: '' };
    }

    const byId: Record<string, MindmapNode> = {};
    nodes.forEach(n => { byId[n.id] = n; });

    const childrenMap: Record<string, string[]> = {};
    const parentOf: Record<string, string> = {};
    nodes.forEach(n => { childrenMap[n.id] = []; });
    nodes.forEach(n => {
      (n.connections || []).forEach(cid => {
        if (byId[cid] && cid !== n.id) childrenMap[n.id].push(cid);
      });
    });

    // Root = a node never referenced as someone's child
    const referenced = new Set<string>();
    nodes.forEach(n => (n.connections || []).forEach(c => referenced.add(c)));
    const root = nodes.find(n => !referenced.has(n.id)) || nodes[0];

    // Longest-path depth from root so that convergent (multi-parent) nodes
    // land in the deepest column — never in the same column as a parent.
    const depthOf: Record<string, number> = {};
    nodes.forEach(n => { depthOf[n.id] = 0; });
    for (let iter = 0; iter <= nodes.length; iter++) {
      let changed = false;
      nodes.forEach(n => {
        for (const cid of childrenMap[n.id]) {
          if (depthOf[cid] < depthOf[n.id] + 1) { depthOf[cid] = depthOf[n.id] + 1; changed = true; }
        }
      });
      if (!changed) break;
    }

    // Spanning tree for vertical slotting: each non-root node gets exactly ONE
    // layout parent (a connector one level shallower). All original edges are
    // still drawn — this only decides which parent owns the node's row slot.
    const slotChildren: Record<string, string[]> = {};
    nodes.forEach(n => { slotChildren[n.id] = []; });
    nodes.forEach(n => {
      if (n.id === root.id) return;
      let chosen: string | undefined;
      nodes.forEach(p => {
        if (!chosen && childrenMap[p.id].includes(n.id) && depthOf[p.id] === depthOf[n.id] - 1) chosen = p.id;
      });
      if (!chosen) nodes.forEach(p => { if (!chosen && childrenMap[p.id].includes(n.id)) chosen = p.id; });
      if (!chosen) { chosen = root.id; depthOf[n.id] = Math.max(depthOf[n.id], 1); }
      parentOf[n.id] = chosen;
      slotChildren[chosen].push(n.id);
    });

    // Word-wrap a label into up to 2 lines
    const wrap = (label: string): string[] => {
      const words = (label || '').split(/\s+/);
      const lines: string[] = [];
      let cur = '';
      const MAX = 15;
      for (const w of words) {
        if (cur && (cur + ' ' + w).length > MAX) { lines.push(cur); cur = w; }
        else { cur = cur ? cur + ' ' + w : w; }
      }
      if (cur) lines.push(cur);
      if (lines.length > 2) return [lines[0], lines.slice(1).join(' ')];
      return lines.length ? lines : [''];
    };

    const CHAR_W = 6.2, PAD_X = 14, LINE_H = 13;
    const H_GAP = 46;                       // horizontal gap between columns
    const ROW_STEP = LINE_H * 2 + 16 + 22;  // tallest node + vertical gap

    type P = MindmapNode & { depth: number; lines: string[]; w: number; h: number; cx: number; cy: number };
    const meta: Record<string, P> = {};
    nodes.forEach(n => {
      const lines = wrap(n.label);
      const longest = Math.max(...lines.map(l => l.length), 1);
      const w = Math.min(200, Math.max(66, longest * CHAR_W + PAD_X * 2));
      const h = lines.length * LINE_H + 16;
      meta[n.id] = { ...n, depth: depthOf[n.id], lines, w, h, cx: 0, cy: 0 };
    });

    const maxDepth = Math.max(...nodes.map(n => depthOf[n.id]));
    const colW: number[] = [];
    for (let d = 0; d <= maxDepth; d++) {
      colW[d] = Math.max(40, ...nodes.filter(n => depthOf[n.id] === d).map(n => meta[n.id].w));
    }
    const colCenterX: number[] = [];
    let acc = 24;
    for (let d = 0; d <= maxDepth; d++) {
      colCenterX[d] = acc + colW[d] / 2;
      acc += colW[d] + H_GAP;
    }

    // Assign y by DFS leaf-slotting; parents centered on their children
    let leafCursor = 0;
    const assignY = (id: string): number => {
      const kids = slotChildren[id];
      if (!kids || kids.length === 0) {
        const yy = 34 + leafCursor * ROW_STEP;
        meta[id].cy = yy;
        leafCursor += 1;
        return yy;
      }
      const ys = kids.map(assignY);
      meta[id].cy = (ys[0] + ys[ys.length - 1]) / 2;
      return meta[id].cy;
    };
    assignY(root.id);
    nodes.forEach(n => { meta[n.id].cx = colCenterX[meta[n.id].depth]; });

    const positioned = nodes.map(n => meta[n.id]);
    const height = 34 + Math.max(1, leafCursor) * ROW_STEP - (ROW_STEP - 40);
    const width = acc - H_GAP + 24;

    const edges = nodes.flatMap(n =>
      childrenMap[n.id].map(cid => ({ from: n.id, to: cid, depth: depthOf[n.id] }))
    );

    return { positioned, edges, parentOf, width, height, rootId: root.id };
  }, [topic.mindmap]);

  // Deterministic fit: 1 viewBox unit == 1 px at scale 1. Only scale DOWN to
  // fit an oversized tree (cap = 1, never inflate). Node/font/stroke sizes are
  // fixed units, so a small tree renders at its natural (Google) size and the
  // card height shrinks to hug it — identical look on both sides.
  const MM_MAX_H = 460, MM_MIN_H = 200, MM_PAD = 24;
  const mmFit = React.useMemo(() => {
    const availW = Math.max(200, (mmSize.w || 640) - MM_PAD);
    let scale = Math.min(1, availW / treeLayout.width);
    if (treeLayout.height * scale > MM_MAX_H) scale = MM_MAX_H / treeLayout.height;
    const renderedH = Math.min(MM_MAX_H, Math.max(MM_MIN_H, treeLayout.height * scale + MM_PAD));
    return { scale, renderedH };
  }, [mmSize, treeLayout]);

  const [selectedNode, setSelectedNode] = useState<MindmapNode | null>(topic.mindmap[0] || null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [hintsShown, setHintsShown] = useState<{ [id: string]: boolean }>({});

  // The set of nodes + edges on the path from the selected node back to the root
  const highlight = React.useMemo(() => {
    const ids = new Set<string>();
    const edgeKeys = new Set<string>();
    if (selectedNode) {
      let cur: string | undefined = selectedNode.id;
      ids.add(cur);
      while (cur && treeLayout.parentOf[cur]) {
        const p = treeLayout.parentOf[cur];
        edgeKeys.add(`${p}->${cur}`);
        ids.add(p);
        cur = p;
      }
    }
    return { ids, edgeKeys };
  }, [selectedNode, treeLayout]);

  const toggleHint = (qId: string) => {
    setHintsShown(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="flex-1 flex flex-col space-y-8" id="notes-view-root">
      <div className="flex items-center justify-between border-b border-[#2d3a54] pb-5 text-left" id="notes-header">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-[#9fef00] transition-colors font-mono text-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Learning Path</span>
        </button>
        <div className="text-right">
          <span className="text-[10px] text-[#9fef00] font-mono uppercase tracking-widest block">{pathwayLabel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 text-left">
        <div className="xl:col-span-2 space-y-8" id="notes-study-column">
          <div className="bg-[#1c2538]/60 backdrop-blur-md rounded-xl border border-[#2d3a54] p-6 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-5 w-44 pointer-events-none select-none">
              <BookOpen className="w-32 h-32 text-white" />
            </div>

            <div className="flex items-center space-x-2 text-[#9fef00] font-mono text-xs font-bold uppercase tracking-widest">
              <Terminal className="w-4 h-4" />
              <span>Cyber Study Notes Room</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1.5 font-sans leading-tight">
              {topic.title}
            </h1>
            <p className="text-gray-400 text-sm mt-1.5 font-mono">
              Topic Room Description: {topic.description}
            </p>

            {renderTOC()}

            <article className="mt-8 prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6 text-sm">
              {sections.map((section, idx) => {
                if (section.type === 'revision') {
                  return (
                    <div key={idx} className="bg-gradient-to-br from-[#1c2538] to-[#161c2c] border-2 border-dashed border-[#9fef00]/30 rounded-xl p-6 my-8 relative overflow-hidden shadow-xl shadow-[#9fef00]/5">
                      <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-9xl text-[#9fef00]/5 select-none font-sans font-bold pointer-events-none">
                        REV
                      </div>
                      <div className="flex items-center space-x-2 text-[#9fef00] font-sans font-extrabold text-base uppercase tracking-wider mb-4 border-b border-[#2d3a54] pb-2">
                        <Award className="w-5 h-5 text-[#9fef00]" />
                        <span>{section.title}</span>
                      </div>
                      <div className="space-y-4">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>
                          {section.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  );
                }

                return (
                  <ReactMarkdown key={idx} remarkPlugins={[remarkGfm, remarkBreaks]} components={markdownComponents}>
                    {section.content}
                  </ReactMarkdown>
                );
              })}
            </article>
          </div>

          <div className="bg-[#1c2538]/60 backdrop-blur-md rounded-xl border border-[#2d3a54] p-6 shadow-xl text-left">
            <h3 className="text-white font-bold text-lg flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#9fef00]" />
              <span>Interactive Notes Mindmap</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Explore the conceptual flowchart. Click on any node below to load its dedicated note details in the explorer panel.
            </p>

            <div className="mt-6">
              <div ref={mindmapContainerRef} className="relative bg-[#111622] rounded-xl border border-[#2d3a54]/60 overflow-hidden shadow-inner flex items-center justify-center" style={{ height: mmFit.renderedH }}>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#9fef00_1px,transparent_1px)] [background-size:20px_20px]"></div>

                {treeLayout.positioned.length > 0 && (
                  <svg
                    className="relative z-10"
                    width={treeLayout.width * mmFit.scale}
                    height={treeLayout.height * mmFit.scale}
                    viewBox={`0 0 ${treeLayout.width} ${treeLayout.height}`}
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Connectors: node edge -> node edge, bezier, accent green */}
                    {treeLayout.edges.map((e: any) => {
                      const p = treeLayout.positioned.find((n: any) => n.id === e.from);
                      const c = treeLayout.positioned.find((n: any) => n.id === e.to);
                      if (!p || !c) return null;
                      const x1 = p.cx + p.w / 2, y1 = p.cy;
                      const x2 = c.cx - c.w / 2, y2 = c.cy;
                      const mx = (x1 + x2) / 2;
                      const isOn = highlight.edgeKeys.has(`${e.from}->${e.to}`);
                      const sw = Math.max(1.3, 3.2 - e.depth * 0.7); // thicker near root
                      return (
                        <path
                          key={`${e.from}-${e.to}`}
                          d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                          fill="none"
                          stroke="#9fef00"
                          strokeWidth={isOn ? sw + 1 : sw}
                          strokeLinecap="round"
                          opacity={isOn ? 1 : 0.3}
                          filter={isOn ? 'drop-shadow(0 0 3px rgba(159,239,0,0.8))' : 'none'}
                          className="transition-all duration-300"
                        />
                      );
                    })}

                    {/* Nodes: root (green filled) > section (bordered) > child */}
                    {treeLayout.positioned.map((n: any) => {
                      const isSel = selectedNode?.id === n.id;
                      const isHover = hoveredNodeId === n.id;
                      const onPath = highlight.ids.has(n.id);
                      const isRoot = n.depth === 0;
                      const isSection = n.depth === 1;
                      let fill = '#161c2c', stroke = '#2d3a54', textFill = '#cbd5e1';
                      if (isRoot) { fill = '#16250f'; stroke = '#9fef00'; textFill = '#e9ffd6'; }
                      else if (isSection) { fill = '#1c2538'; stroke = '#3f6f2a'; textFill = '#e2e8f0'; }
                      if (onPath && !isSel) stroke = '#9fef00';
                      if (isSel) { fill = '#9fef00'; stroke = '#9fef00'; textFill = '#0b1220'; }
                      const fontSize = isRoot ? 11.5 : isSection ? 10.5 : 10;
                      return (
                        <g
                          key={n.id}
                          className="cursor-pointer transition-all duration-200"
                          onClick={() => setSelectedNode(n)}
                          onMouseEnter={() => setHoveredNodeId(n.id)}
                          onMouseLeave={() => setHoveredNodeId(null)}
                        >
                          <rect
                            x={n.cx - n.w / 2}
                            y={n.cy - n.h / 2}
                            width={n.w}
                            height={n.h}
                            rx={isRoot ? 9 : 7}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth={isSel || onPath ? 2 : isRoot ? 1.8 : 1.2}
                            filter={isSel || isHover ? 'drop-shadow(0 0 6px rgba(159,239,0,0.55))' : 'none'}
                          />
                          {n.lines.map((ln: string, i: number) => (
                            <text
                              key={i}
                              x={n.cx}
                              y={n.cy - (n.lines.length - 1) * 6.5 + i * 13 + 3.6}
                              textAnchor="middle"
                              fontFamily="ui-monospace, monospace"
                              fontSize={fontSize}
                              fontWeight={isRoot ? 800 : 600}
                              fill={textFill}
                              style={{ pointerEvents: 'none' }}
                            >
                              {ln}
                            </text>
                          ))}
                        </g>
                      );
                    })}
                  </svg>
                )}

                <div className="absolute top-2 left-3 flex items-center space-x-1.5 pointer-events-none z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9fef00]" />
                  <span className="text-[9px] text-gray-500 font-mono uppercase tracking-wider">Root → Sections → Topics</span>
                </div>
              </div>

              {/* Explorer Panel */}
              <div className="mt-3 bg-[#1c2538]/95 backdrop-blur-md rounded-lg border border-[#2d3a54]/80 p-4 text-left shadow-md shadow-black/40">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9fef00] animate-pulse" />
                  <span className="text-[10px] text-[#9fef00] font-mono uppercase tracking-wider font-bold">Explorer Panel</span>
                </div>
                <h4 className="text-white text-xs font-bold font-mono mt-1 flex items-center space-x-2">
                  <span>{selectedNode ? selectedNode.label : 'Select a node to inspect...'}</span>
                </h4>
                <p className="text-[11px] text-gray-300 mt-1 leading-relaxed">
                  {selectedNode ? selectedNode.description : 'Click any node in the mindmap to reveal its core study details here.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6" id="notes-interactive-column">
          {topic.realWorldCallout && (
            <div className="bg-[#1c2538]/60 backdrop-blur-md rounded-xl border-l-4 border-l-[#9fef00] border-y border-r border-[#2d3a54] p-5 shadow-lg relative">
              <h4 className="text-[#9fef00] text-sm font-bold flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Real-World Scenario</span>
              </h4>
              <div className="mt-3 text-left">
                <h5 className="text-white text-xs font-extrabold font-mono uppercase tracking-wide">
                  Case Study: {topic.realWorldCallout.title}
                </h5>
                <div className="bg-[#161c2c]/60 rounded p-3 border border-[#2d3a54] mt-2 space-y-2">
                  <p className="text-[11px] text-[#00b2ff] font-mono uppercase leading-none">The Attack Concept:</p>
                  <p className="text-xs text-gray-300 font-semibold leading-relaxed">
                    {topic.realWorldCallout.concept}
                  </p>
                  <p className="text-[11px] text-orange-400 font-mono uppercase leading-none pt-1">The Practical Scenario:</p>
                  <p className="text-xs text-gray-400 leading-relaxed italic">
                    "{topic.realWorldCallout.scenario}"
                  </p>
                </div>
                <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
                  <strong className="text-white">Significance:</strong> {topic.realWorldCallout.relevance}
                </p>
              </div>
            </div>
          )}

          {topic.keyTakeaways && topic.keyTakeaways.length > 0 && (
            <div className="bg-[#1c2538]/60 backdrop-blur-md rounded-xl border border-[#2d3a54] p-5 shadow-lg text-left">
              <h4 className="text-white text-sm font-bold flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-[#9fef00]" />
                <span>Key Takeaways</span>
              </h4>
              <ul className="mt-3.5 space-y-3">
                {topic.keyTakeaways?.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs text-gray-300">
                    <span className="text-[#9fef00] font-bold mt-0.5 select-none">&bull;</span>
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-[#1c2538]/60 backdrop-blur-md rounded-xl border border-[#2d3a54] p-5 shadow-lg text-left">
            <h4 className="text-white text-sm font-bold flex items-center space-x-2 mb-4">
              <Brain className="w-4 h-4 text-sky-400" />
              <span>Practice Questions</span>
            </h4>
            <div className="space-y-6">
              {topic.quiz.map((question, qIdx) => {
                const isHintOpen = !!hintsShown[question.id];
                return (
                  <div key={question.id} className="p-4 rounded-lg border transition-all duration-150 bg-[#161c2c]/60 backdrop-blur-md border-[#2d3a54]">
                    <span className="text-[10px] text-gray-400 font-mono block">QUESTION {qIdx + 1}</span>
                    <p className="text-xs text-white font-bold mt-1 leading-relaxed">
                      {question.question}
                    </p>
                    <div className="mt-3 flex items-center space-x-3">
                      <button
                        onClick={() => toggleHint(question.id)}
                        className="text-[10px] font-mono text-gray-400 hover:text-white flex items-center space-x-1 cursor-pointer"
                      >
                        <Lightbulb className="w-3 h-3 text-yellow-500" />
                        <span>{isHintOpen ? 'Hide Hint' : 'Show Hint'}</span>
                      </button>
                    </div>
                    {isHintOpen && (
                      <div className="mt-2 bg-[#1c2538]/60 backdrop-blur-md p-2 rounded-md border border-[#2d3a54] text-[11px] text-yellow-400 font-mono">
                        <span className="font-bold uppercase text-[9px] block text-gray-400 mb-0.5">Hint:</span>
                        {question.hint || 'No hint available. Check the notes text block for answers!'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
