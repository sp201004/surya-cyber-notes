---
inclusion: always
---

# Study-Notes Content Authoring Checklist

Rules for creating or importing course room `.md` files (TryHackMe / Google
Cybersecurity notes). These render through the `NotesView.tsx` markdown
pipeline. Follow every item so new modules match the established site style.

## Q&A / Question sections (MANDATORY styled table)

Every question section — regardless of heading (**Interview Questions**,
Practice Questions, Review Questions, Quiz, Q&A, Knowledge Check, Flashcard
Review, etc.) — MUST render via the shared styled Q&A table, never as plain
text, bullet lists, `Q:`/`A:` lines, or bold-`**Q1.**` paragraphs.

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
- Terminal blocks tagged with the correct language (bash/powershell/cmd/text/http).
- Redesigned revision sections (no keyword ↓-chains).
- Mobile 375px: tables use horizontal scroll with hidden scrollbar (existing CSS).
- Additive module adds: git diff = only new files + minimal wiring.

## Verify before commit

- `npm run lint` (0 errors) and `npm run build` (0 errors, "N modules transformed").
- Re-run the Q&A audit on new rooms → zero plain question sections.
- Delete any temp scan/convert scripts (never commit them).
