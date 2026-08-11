---
inclusion: always
---

# Study-Notes Content Authoring Checklist

Rules for creating or importing course room `.md` files (TryHackMe / Google
Cybersecurity notes). These render through the `NotesView.tsx` markdown
pipeline. Follow every item so new modules match the established site style.

## Q&A / Question sections (MANDATORY styled table)

Every question section — regardless of heading (**Interview Questions**,
**Interview Notes**, **Interview Practice**, Practice Questions, Review
Questions, Quiz, Q&A, Knowledge Check, Flashcard Review, Real Life Examples,
etc.) — MUST render via the shared styled Q&A table, never as plain text,
bullet lists, `Q:`/`A:` lines, or bold-`**Q1.**` paragraphs.

**Detection must be content-based, not heading-based:** Any section whose body
contains 3+ question→answer pairs (bold question followed by answer, regardless
of formatting) must use the styled table.

Author it as a two-column markdown table with the literal `Question | Answer`
header (the classifier keys on these words to apply the green header + bold
first column + alternating rows):

```markdown
## Interview Questions

| Question | Answer |
|---|---|
| **What is X?** | Verbatim answer text. Inline `code` chips are fine. |
| **Q2. What is Y?** | Answer. Multi-line/bullet answers join with `<br>`. |
```

Guidelines:
- **Question** cell: bold (`**...**`). Keep any existing `Q1.`/`Q.` numbering verbatim — do not invent, rewrite, or shorten wording.
- **Answer** cell: plain text; inline code chips (`` `cmd` ``) allowed. For a
  multi-line or list answer, join lines with `<br>`. Convert single-command
  fenced blocks to inline code chips.
- An answer that is itself a comparison table: flatten each row into the cell
  with `<br>` and a non-pipe separator (` — `), preserving the header row and
  every value verbatim. If it genuinely cannot fit, leave it and flag it —
  never invent content.
- Multiple question sections in one room → each becomes its own table.
- Never place a raw pipe `|` inside a cell (escape as `\|` or use inline code).
- A pure topic-prompt list with no answers is NOT a Q&A table (do not fabricate answers) — leave as-is and note it.

## Final Takeaway / summary sections

- Bold the key domain terms on first occurrence (match older rooms' emphasis).
  This is authored, not automated — do not ship a plain-text takeaway.

## Numbered concept-block sections (cards)

Numbered concept sequences (3+ items, each with title + multi-line description +
optional Example line) MUST render as green-bordered styled cards. Author them as
blockquote callouts — one callout per numbered item:

```markdown
> **1. Title**
> Description paragraph(s). Inline `code` chips and existing bold/emphasis preserved.
> **Example:** ...

> **2. Next Title**
> Description...
```

**NEVER** use the `| **N** | **Title**<br>desc |` table format for concept blocks —
the preprocessor flattens these into plain text. Multi-column tables (with 3+
columns like `| Phase | Name | Action |`) are fine and work correctly.

Examples needing card format: CISSP 8 domains, IR 6 phases, PASTA 7 stages, risk
management strategies, numbered security principles.

## General pipeline treatment (existing conventions)

- Numbered step sequences → step-cards (`| **N** | **Title**<br>desc |` + `| --- | --- |`, cell MUST contain `<br>`). Genuine diagrams (packet flow, topology, key-exchange, OSI stack, handshakes) stay as fenced cards — do NOT table-ify.
- Terminal blocks tagged with the correct language. Only these tags render in the styled terminal component (header bar + label + highlighting): `bash`, `sh`, `shell`, `python`, `sql`, `xml`, `json`, `yaml`, `http`, `spl`, `yara`. Any other tag — including `text`, `cmd`, and `powershell` — renders as a plain monospace "diagram card". Use `text` ONLY for genuine ASCII diagrams; put real commands/code in a terminal-tagged block (e.g. shell → `bash`, Python/pwntools/C exploit code → `python`, YARA rules → `yara`).
- Redesigned revision sections (no keyword ↓-chains). Exploded vertical ↓-chains that are process/workflow sequences → compact single-line arrow flows (`A → B → C`); structural/directional diagrams (memory/stack layouts, before/after byte illustrations, box/tree art, side-by-side comparisons) stay as fenced diagram cards.
- Console output cards must be single-spaced (no blank line between output lines), like a real console.
- Cheat-sheet/reference blocks (comment + command lists, no output): insert one blank line before each `# comment` group (except the first) for readability. Merged command+output session blocks remain single-spaced.
- No status emojis (✅ ❌ ⚠️ etc.) in tables or notes — use plain text (Yes / No / Limited / Moderate). Warning/note callouts (`> **⚠️ ...**`) are the established exception and stay.
- Mobile 375px: tables use horizontal scroll with hidden scrollbar (existing CSS).
- Additive module adds: git diff = only new files + minimal wiring.

## Command + output as terminal sessions (NEW modules)

For NEW modules (module 7 Exploitation Basics onward), author each command together with its output as ONE realistic terminal session in a single terminal-tagged block (`bash`), so it reads like a real console:

- Prefix each TYPED command line with a realistic prompt, then show its output directly below, single-spaced, in the SAME block.
- Prompt mapping: msfconsole → `msf6 > `; meterpreter → `meterpreter > `; Linux/bash → `$ `; Windows cmd → the shown path prompt, e.g. `C:\Windows\System32> `. Interleave exactly like a real session (e.g. `meterpreter > shell` → `C:\Windows\System32> whoami` → `nt authority\system`).
- If a command's output is not actually shown, just prompt-prefix the command; never invent output.
- Do NOT prompt-prefix or merge: source-code files (C/Python/pwntools → `python`), HTML snippets, genuine diagrams, reference/function-name lists, shellcode hex listings, Wireshark filter lists, and Cheat-Sheet command references.
- Verbatim guard: the only additions allowed are prompt prefixes and block-merging/single-spacing. Stripping the prompt prefixes must reproduce the original command lines exactly, and every output line must stay byte-identical.
- **Modules 1–6 intentionally use the older separate style** (command block + separate single-spaced output card, no prompt prefix) and are LEFT AS-IS — do not retrofit them.

## Verify before commit

- `npm run lint` (0 errors) and `npm run build` (0 errors, "N modules transformed").
- Re-run the Q&A audit on new rooms → zero plain question sections.
- Delete any temp scan/convert scripts (never commit them).
