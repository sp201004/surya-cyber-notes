import { Module } from './types';

// TryHackMe "Hacker Holidays 2026 — The Byte Lotus" CTF event.
// One module inside the top-level "CTF / Challenges" course. Room notes are
// adapted from the MIT-licensed findings log by Varun Anand Patkar
// (https://github.com/Varun-Patkar/HackerHolidays) — see NOTICE.
const BYTE_LOTUS_MODULE_ID = 'byte-lotus-2026';

export const HACKER_HOLIDAYS_MODULES: Module[] = [
  {
    id: BYTE_LOTUS_MODULE_ID,
    title: 'Hacker Holidays 2026 — The Byte Lotus',
    description: 'A 14-day TryHackMe CTF/ARG set in a five-star resort with a zero-star security posture — OSINT, web, cloud, forensics, AI prompt-injection and boot2root writeups, plus the landing-page recon trail.',
    isFuture: false,
    topics: [
      {
        id: 'hh-the-byte-lotus-trail',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'The Byte Lotus Trail',
        description: 'Landing-page recon: the ARG storyline, image-embedded base64 clues, the 9.5681°N 100.0602°E geolocation clue, decoded shell messages, and the hidden Next.js __next_f / ctfRoomCode server payload.',
        status: 'unlocked',
        iconType: 'open-book-magnifier',
        content: '',
        realWorldCallout: {
          title: 'Reading the Right Layer',
          concept: 'Visual Overlays vs Hidden Payloads',
          scenario: 'The shell/background "codes" look like stego, but byte-scanning every asset comes back clean — they are rendered pixels meant to be read by eye. The only genuinely hidden data is the Next.js __next_f server payload, which an automated parse pulls out instantly.',
          relevance: 'Recon rewards knowing which surface actually carries the signal — human eyes and automated parsing have different strengths.'
        },
        mindmap: [
          { id: 'trail', label: 'The Byte Lotus Trail', description: 'Landing-page recon for the ARG', x: 50, y: 12, connections: ['assets', 'geo', 'payload', 'vera'] },
          { id: 'assets', label: 'Image Clues', description: 'base64 messages baked into webp/jpg assets', x: 16, y: 50 },
          { id: 'geo', label: 'Geolocation', description: '9.5681°N 100.0602°E — a Thailand beach', x: 39, y: 58 },
          { id: 'payload', label: '__next_f Payload', description: 'Hidden event config + ctfRoomCode', x: 62, y: 58 },
          { id: 'vera', label: 'VERA', description: 'AI concierge mascot; OSINT trail to Instagram', x: 84, y: 50 }
        ],
        keyTakeaways: [
          'The ARG rewards decoding image-embedded base64 signals, not reading page text.',
          'The narrative motif: the resort intentionally leaks data and "left a door open on purpose".',
          'VERA is the linchpin — an over-sharing AI concierge with an OSINT trail to @veratheconcierge.',
          'The geolocation clue (Thailand beach, coffee shops) cross-references VERA\'s leaked coffee order.',
          'The shell "codes" are visual overlays, not stego; the only hidden data is the Next.js __next_f payload.'
        ],
        quiz: [
          { id: 'q-hh-trail-1', question: 'Where are the landing-page clues hidden?', type: 'text', correctAnswer: 'In the image assets (base64)', hint: 'Not in the page text/DOM.' },
          { id: 'q-hh-trail-2', question: 'Who is the AI concierge mascot of the event?', type: 'text', correctAnswer: 'VERA', hint: 'She "knows everything about everyone".' },
          { id: 'q-hh-trail-3', question: 'What internal identifier hides in the Next.js server payload?', type: 'text', correctAnswer: 'ctfRoomCode', hint: 'Never shown in the UI.' },
          { id: 'q-hh-trail-4', question: 'Are the shell "codes" byte-embedded stego?', type: 'text', correctAnswer: 'No — visual pixel overlays', hint: 'Byte scans came back clean.' }
        ]
      },
      {
        id: 'hh-osint-warmup',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'OSINT Warm-up',
        description: 'Room 0 — a free pre-event OSINT pivot: from the VERA concierge persona to her public Instagram (@veratheconcierge), where the warm-up flag is posted.',
        status: 'unlocked',
        iconType: 'search',
        content: '',
        realWorldCallout: {
          title: 'Persona to Profile',
          concept: 'OSINT Persona Pivoting',
          scenario: 'A named in-game character (VERA) turns out to have a real, searchable social handle; the challenge flag is simply posted on her public Instagram.',
          relevance: 'Named personas usually have a findable social footprint — the first pivot in almost any OSINT engagement.'
        },
        mindmap: [
          { id: 'osint', label: 'OSINT Warm-up', description: 'Pivot from persona to social profile', x: 50, y: 15, connections: ['persona', 'insta'] },
          { id: 'persona', label: 'VERA Persona', description: 'The resort AI concierge character', x: 28, y: 55 },
          { id: 'insta', label: 'Instagram', description: '@veratheconcierge hosts the flag', x: 72, y: 55 }
        ],
        keyTakeaways: [
          'OSINT warm-ups reward turning a named persona into a searchable social handle.',
          'A public social profile can be the entire challenge — no exploitation involved.',
          'VERA\'s Instagram (@veratheconcierge) hosts the Room 0 flag.'
        ],
        quiz: [
          { id: 'q-hh-osint-1', question: 'What platform hosts the Room 0 flag?', type: 'text', correctAnswer: 'Instagram', hint: 'VERA\'s public profile.' },
          { id: 'q-hh-osint-2', question: 'What is VERA\'s in-game handle?', type: 'text', correctAnswer: '@veratheconcierge', hint: 'The concierge persona.' },
          { id: 'q-hh-osint-3', question: 'Does the warm-up require exploitation?', type: 'text', correctAnswer: 'No', hint: 'Pure OSINT read.' }
        ]
      },
      {
        id: 'hh-concierge-knows-too-much',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'The Concierge Knows Too Much',
        description: 'Day 1 — AI prompt-injection: VERA over-shares guest PII and can be instruction-hacked into revealing the hidden system instructions she was told to keep secret.',
        status: 'unlocked',
        iconType: 'question',
        content: '',
        realWorldCallout: {
          title: 'Secrets in the System Prompt',
          concept: 'Prompt Injection / Instruction-Hacking',
          scenario: 'VERA volunteers a guest\'s name, room and coffee order unprompted, and a carefully worded / impersonation-style prompt makes her disclose the instructions she was told to keep to herself.',
          relevance: '"Keep this secret" in a system prompt is not an access control — LLM agents leak instructions to well-worded injection.'
        },
        mindmap: [
          { id: 'concierge', label: 'Concierge Knows Too Much', description: 'AI prompt-injection challenge', x: 50, y: 12, connections: ['pii', 'inject', 'lesson'] },
          { id: 'pii', label: 'PII Over-share', description: 'Volunteers name, room, coffee unprompted', x: 22, y: 55 },
          { id: 'inject', label: 'Instruction-Hacking', description: 'Careful wording / impersonation reveals system prompt', x: 50, y: 60 },
          { id: 'lesson', label: 'Trust Boundary', description: 'Secrets in a system prompt are not safe', x: 78, y: 55 }
        ],
        keyTakeaways: [
          'An AI agent that proactively volunteers PII is itself a privacy failure (over-collection + over-disclosure).',
          'Secrets placed in an LLM\'s system instructions can be revealed via prompt injection.',
          '"Tell no one" is not access control — a well-worded or impersonation prompt defeats it.',
          'The source findings log documents the technique but does not record the Day 1 flag value.'
        ],
        quiz: [
          { id: 'q-hh-con-1', question: 'What class of attack recovers VERA\'s hidden instructions?', type: 'text', correctAnswer: 'Prompt injection', hint: 'Instruction-hacking.' },
          { id: 'q-hh-con-2', question: 'What sensitive data does VERA volunteer unprompted?', type: 'text', correctAnswer: 'Name, room, coffee order (PII)', hint: 'Over-sharing.' },
          { id: 'q-hh-con-3', question: 'Where was the flag hidden?', type: 'text', correctAnswer: 'In the agent\'s system instructions', hint: '"Instructions she was told to keep to herself".' }
        ]
      },
      {
        id: 'hh-room-404',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'Room 404',
        description: 'Day 2 — Web directory enumeration: an exposed .git/ directory on port 8080 is dumped with git-dumper to recover the staging source and the flag left in README.md.',
        status: 'unlocked',
        iconType: 'web',
        content: '',
        realWorldCallout: {
          title: 'The Deployed .git Folder',
          concept: 'Exposed Version Control',
          scenario: 'A night-shift developer shipped the site with its .git/ directory intact; probing /.git/HEAD confirms it, and git-dumper reconstructs the full repo — flag included.',
          relevance: 'Deploying .git to a public web root lets anyone reconstruct full source and secrets.'
        },
        mindmap: [
          { id: 'r404', label: 'Room 404', description: 'Exposed .git dir enum', x: 50, y: 12, connections: ['probe', 'dump', 'flag'] },
          { id: 'probe', label: 'Probe /.git/HEAD', description: 'Confirms an exposed Git repo', x: 24, y: 55 },
          { id: 'dump', label: 'git-dumper', description: 'Reconstructs the staging repo', x: 50, y: 60 },
          { id: 'flag', label: 'README.md', description: 'Staging flag left behind', x: 76, y: 55 }
        ],
        keyTakeaways: [
          'Directory enumeration on a non-standard port (8080) can reveal unlinked paths.',
          'An exposed /.git/ directory lets you reconstruct full source with git-dumper.',
          'Never deploy the .git directory to a public web root — it leaks source and secrets.',
          'Grep recovered source for THM{ to find planted flags quickly.'
        ],
        quiz: [
          { id: 'q-hh-r404-1', question: 'Which exposed directory made the source recoverable?', type: 'text', correctAnswer: '.git', hint: 'Version control folder.' },
          { id: 'q-hh-r404-2', question: 'Which tool reconstructs the repo?', type: 'text', correctAnswer: 'git-dumper', hint: 'Dumps an exposed .git/.' },
          { id: 'q-hh-r404-3', question: 'Which file held the flag?', type: 'text', correctAnswer: 'README.md', hint: 'A "staging flag (remove before launch)".' }
        ]
      },
      {
        id: 'hh-complimentary',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'Complimentary',
        description: 'Day 3 — Cloud: an unauthenticated AWS Cognito Identity Pool issues guest creds whose IAM role allows a table-wide DynamoDB Scan, exposing every guest profile and the flag.',
        status: 'unlocked',
        iconType: 'network',
        content: '',
        realWorldCallout: {
          title: 'The Over-Permissioned Guest Role',
          concept: 'Unauthenticated Cognito + Broad IAM',
          scenario: 'The app fetches anonymous Cognito credentials and only ever GetItems the caller\'s own record — but the IAM role allows dynamodb:Scan across the whole table, so any visitor can read all profiles.',
          relevance: 'Guest/unauth roles must be least-privilege and scoped to the caller\'s own partition key.'
        },
        mindmap: [
          { id: 'comp', label: 'Complimentary', description: 'Cognito + DynamoDB over-permissioning', x: 50, y: 12, connections: ['appjs', 'creds', 'scan'] },
          { id: 'appjs', label: 'app.js Config', description: 'Identity Pool ID, table, region in client JS', x: 22, y: 55 },
          { id: 'creds', label: 'Anon Creds', description: 'Cognito issues unauthenticated identity', x: 50, y: 60 },
          { id: 'scan', label: 'Table Scan', description: 'IAM allows dynamodb:Scan on all rows', x: 78, y: 55 }
        ],
        keyTakeaways: [
          'A static site with no login may fetch unauthenticated AWS credentials from a Cognito Identity Pool.',
          'The client app.js leaks the Identity Pool ID, table name and region.',
          'An unauth IAM role allowing table-wide Scan lets anyone read every record, not just their own.',
          'Scope DynamoDB access to the caller\'s partition key with dynamodb:LeadingKeys conditions.'
        ],
        quiz: [
          { id: 'q-hh-comp-1', question: 'Which AWS service issues the anonymous credentials?', type: 'text', correctAnswer: 'Cognito Identity Pool', hint: 'Unauthenticated identities.' },
          { id: 'q-hh-comp-2', question: 'Which DynamoDB operation is the exploit (vs the app\'s GetItem)?', type: 'text', correctAnswer: 'Scan', hint: 'Reads the whole table.' },
          { id: 'q-hh-comp-3', question: 'What is the fix for the guest role?', type: 'text', correctAnswer: 'Least privilege / dynamodb:LeadingKeys', hint: 'Scope to the caller\'s own key.' }
        ]
      },
      {
        id: 'hh-packed-light',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'Packed Light',
        description: 'Day 4 — Network forensics: a once-per-second HTTP beacon smuggles one byte per request inside a cookie; reassemble in frame order and reverse base64 → XOR 0x48 to read the flag.',
        status: 'unlocked',
        iconType: 'packet',
        content: '',
        realWorldCallout: {
          title: 'Exfil in the Metadata',
          concept: 'Beaconing + Covert Channel',
          scenario: 'A fake ByteLotusClient beacons GET / every second, hiding one byte of payload per request in a hotel_sess_state cookie; the responses are a decoy homepage.',
          relevance: 'Beaconing is spotted by regularity, not content — and exfil hides in request metadata (cookies/headers), not bodies.'
        },
        mindmap: [
          { id: 'packed', label: 'Packed Light', description: 'PCAP covert-channel decode', x: 50, y: 12, connections: ['beacon', 'cookie', 'decode'] },
          { id: 'beacon', label: 'Beacon', description: '~1s clockwork GET to :8080', x: 22, y: 55 },
          { id: 'cookie', label: 'Cookie Carrier', description: 'One base64 byte per request', x: 50, y: 60 },
          { id: 'decode', label: 'base64 → XOR 0x48', description: 'Reverse the encoding chain in frame order', x: 78, y: 55 }
        ],
        keyTakeaways: [
          'Beaconing is identified by regularity (fixed interval + endpoint), not packet content.',
          'Exfil hides in request metadata — cookies, headers, URI paths, DNS labels.',
          'Reassemble covert-channel chunks strictly in frame order, never sorted otherwise.',
          'A known-plaintext crib (the THM{ prefix) instantly reveals a single-byte XOR key (0x48).'
        ],
        quiz: [
          { id: 'q-hh-pl-1', question: 'How is the beacon identified?', type: 'text', correctAnswer: 'By its regularity', hint: 'Fixed interval + endpoint.' },
          { id: 'q-hh-pl-2', question: 'Where is the payload carried?', type: 'text', correctAnswer: 'In a cookie header', hint: 'One byte per request.' },
          { id: 'q-hh-pl-3', question: 'What single-byte XOR key decrypts the stream?', type: 'text', correctAnswer: '0x48', hint: 'Recovered via the THM{ crib.' }
        ]
      },
      {
        id: 'hh-beach-bar',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'Beach Bar',
        description: 'Day 5 — Boot2Root: leaked demo creds + insecure YAML deserialization (yaml.load) RCE in a playlist import, then credential reuse from a root daemon\'s leaked --stream-pass.',
        status: 'unlocked',
        iconType: 'hacker-terminal',
        content: '',
        realWorldCallout: {
          title: 'yaml.load on Untrusted Input',
          concept: 'Insecure Deserialization → RCE',
          scenario: 'The playlist import parses user YAML with the full Loader, so a !!python/object/apply:os.system payload runs commands; a root daemon then leaks its password on the command line, reused as the root password.',
          relevance: 'Never yaml.load() untrusted input, never ship demo creds, and never pass secrets as command-line arguments.'
        },
        mindmap: [
          { id: 'beach', label: 'Beach Bar', description: 'YAML deser. + cred reuse', x: 50, y: 12, connections: ['creds', 'yaml', 'privesc'] },
          { id: 'creds', label: 'Demo Creds', description: 'dj:dj leaked in an HTML comment', x: 22, y: 55 },
          { id: 'yaml', label: 'YAML RCE', description: '!!python/object/apply:os.system', x: 50, y: 60 },
          { id: 'privesc', label: 'Cred Reuse', description: 'root daemon --stream-pass = root password', x: 78, y: 55 }
        ],
        keyTakeaways: [
          'Never call yaml.load()/yaml.Loader on untrusted input — use yaml.safe_load().',
          'Don\'t ship demo/default credentials (dj:dj) to production.',
          'Never pass secrets as command-line arguments — they are world-readable via ps.',
          'Don\'t reuse a service password as the root password.'
        ],
        quiz: [
          { id: 'q-hh-bb-1', question: 'What insecure function gives RCE?', type: 'text', correctAnswer: 'yaml.load (full Loader)', hint: 'Use safe_load instead.' },
          { id: 'q-hh-bb-2', question: 'How were the demo creds found?', type: 'text', correctAnswer: 'In a login-page HTML comment', hint: 'dj:dj, ticket BAR-7.' },
          { id: 'q-hh-bb-3', question: 'How was root obtained?', type: 'text', correctAnswer: 'Credential reuse (leaked --stream-pass)', hint: 'Seen via pspy on the command line.' }
        ]
      },
      {
        id: 'hh-overheard-at-breakfast',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'Overheard at Breakfast',
        description: 'Day 6 — OSINT: a chat leaks an email and a "starts with G" aggregator; MD5-hashing the email rebuilds the wiped Gravatar profile, whose bio holds a base64 flag.',
        status: 'unlocked',
        iconType: 'search',
        content: '',
        realWorldCallout: {
          title: 'The Deterministic Lookup Key',
          concept: 'Gravatar MD5(email) Pivot',
          scenario: 'Gravatar keys public profiles off MD5(lowercased email); hashing a leaked address regenerates a "wiped" profile URL whose bio contains a base64 prize.',
          relevance: '"Deleting" an aggregator profile doesn\'t remove the deterministic lookup key — an email is a permanent public identifier.'
        },
        mindmap: [
          { id: 'over', label: 'Overheard at Breakfast', description: 'Gravatar email-hash pivot', x: 50, y: 12, connections: ['read', 'hash', 'bio'] },
          { id: 'read', label: 'Read the Chat', description: 'Aggregator "starts with G" + leaked email', x: 22, y: 55 },
          { id: 'hash', label: 'MD5(email)', description: 'Rebuilds the profile URL', x: 50, y: 60 },
          { id: 'bio', label: 'base64 Bio', description: 'Profile bio decodes to the flag', x: 78, y: 55 }
        ],
        keyTakeaways: [
          'OSINT rewards reading the text carefully, not skimming the images.',
          'Gravatar addresses profiles by MD5(lowercased email) — a deterministic lookup key.',
          '"Deleting" a profile does not invalidate the hash URL that still resolves.',
          'An email you register with is effectively a permanent, unauthenticated public identifier.'
        ],
        quiz: [
          { id: 'q-hh-ob-1', question: 'Which aggregator service is the pivot?', type: 'text', correctAnswer: 'Gravatar', hint: '"Starts with a G".' },
          { id: 'q-hh-ob-2', question: 'What email attribute keys the profile?', type: 'text', correctAnswer: 'MD5 of the email', hint: 'Deterministic hash.' },
          { id: 'q-hh-ob-3', question: 'Where was the flag?', type: 'text', correctAnswer: 'base64 in the profile bio', hint: 'Decode it.' }
        ]
      },
      {
        id: 'hh-do-not-disturb',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'Do Not Disturb',
        description: 'Day 7 — Boot2Root: NoSQL auth bypass → EJS SSTI RCE → an open Node --inspect debugger → the disk group for a raw-disk read of root.txt.',
        status: 'unlocked',
        iconType: 'hacker-terminal',
        content: '',
        realWorldCallout: {
          title: 'The Debugger Left On',
          concept: 'NoSQLi → SSTI → Node Inspector → disk group',
          scenario: 'A JSON login accepts {"$ne":"x"} to bypass auth, an EJS template renders user input for RCE, an exposed node --inspect gives code exec as another user, and disk-group membership reads the root flag off the raw device.',
          relevance: 'Cast credential fields to strings, never render user templates server-side, never expose --inspect in prod, and never add a service account to disk.'
        },
        mindmap: [
          { id: 'dnd', label: 'Do Not Disturb', description: 'Chained boot2root', x: 50, y: 12, connections: ['nosql', 'ssti', 'insp', 'disk'] },
          { id: 'nosql', label: 'NoSQLi', description: '{"$ne":"x"} JSON auth bypass', x: 16, y: 52 },
          { id: 'ssti', label: 'EJS SSTI', description: 'Server-side template RCE', x: 39, y: 60 },
          { id: 'insp', label: 'Node --inspect', description: 'Open debugger = RCE as pipelinesvc', x: 62, y: 60 },
          { id: 'disk', label: 'disk group', description: 'debugfs raw read of /root/root.txt', x: 84, y: 52 }
        ],
        keyTakeaways: [
          'Cast credential fields to strings so {"$ne":...} NoSQL operators can\'t be injected.',
          'Never render user-controlled templates server-side (EJS/Jinja) — it is RCE.',
          'Never expose the Node --inspect debugger in production, even on 127.0.0.1.',
          'The disk group is effectively root — it grants raw block-device read/write.'
        ],
        quiz: [
          { id: 'q-hh-dnd-1', question: 'What payload bypasses the login?', type: 'text', correctAnswer: '{"$ne":"x"}', hint: 'NoSQL operator injection.' },
          { id: 'q-hh-dnd-2', question: 'What gives RCE on the staff page?', type: 'text', correctAnswer: 'EJS SSTI', hint: '<%= 7*7 %> → 49.' },
          { id: 'q-hh-dnd-3', question: 'Which group enables the raw-disk root read?', type: 'text', correctAnswer: 'disk', hint: 'debugfs on /dev/nvme0n1p1.' }
        ]
      },
      {
        id: 'hh-towel-on-the-sunbed',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'Towel on the Sunbed',
        description: 'Day 8 — Web: a check-then-write cooldown on POST /claim is a TOCTOU race; a threaded burst on a fresh account\'s first claim double-spends past the vault gate.',
        status: 'unlocked',
        iconType: 'web',
        content: '',
        realWorldCallout: {
          title: 'The Cooldown That Wasn\'t Atomic',
          concept: 'TOCTOU Double-Spend',
          scenario: 'The reward endpoint checks a 24h cooldown then writes the timestamp; firing many claims concurrently on a fresh account lets several pass the check before any writes, stacking rewards.',
          relevance: 'A time check alone is not a concurrency control — guard state-changing actions with an atomic update.'
        },
        mindmap: [
          { id: 'towel', label: 'Towel on the Sunbed', description: 'Race condition double-spend', x: 50, y: 12, connections: ['guard', 'race', 'fresh'] },
          { id: 'guard', label: 'Time-only Guard', description: 'check-then-write cooldown', x: 22, y: 55 },
          { id: 'race', label: 'Threaded Burst', description: '30 concurrent POST /claim (HTTP/1.1)', x: 50, y: 60 },
          { id: 'fresh', label: 'Fresh Account', description: 'Race window is the first eligible claim', x: 78, y: 55 }
        ],
        keyTakeaways: [
          'A time/cooldown check alone is not a concurrency control (classic TOCTOU).',
          'Guard rate-limited actions with an atomic/conditional DB update, not check-then-write.',
          'The race window only exists on the first eligible claim (a fresh account).',
          'The single-packet attack needs HTTP/2 or a body byte; for HTTP/1.1 body-less POSTs use a threaded blast.'
        ],
        quiz: [
          { id: 'q-hh-tow-1', question: 'What vulnerability class is this?', type: 'text', correctAnswer: 'Race condition (TOCTOU)', hint: 'Check-then-write.' },
          { id: 'q-hh-tow-2', question: 'When does the race window exist?', type: 'text', correctAnswer: 'On the first eligible claim', hint: 'Use a fresh account.' },
          { id: 'q-hh-tow-3', question: 'What is the fix?', type: 'text', correctAnswer: 'An atomic/conditional update', hint: 'Row lock or compare-and-set.' }
        ]
      },
      {
        id: 'hh-cryptocabana',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'CryptoCabana',
        description: 'Day 9 — Cloud: an over-privileged Azure Storage SAS in client JS lists an unlinked vault container, leaking service-principal creds; Key Vault secret version history reveals the real shard.',
        status: 'unlocked',
        iconType: 'crypto-laptop',
        content: '',
        realWorldCallout: {
          title: 'The Rotated Secret That Stayed',
          concept: 'SAS Leak → Key Vault Versioning',
          scenario: 'A read+list account SAS hardcoded in app.js surfaces an unlinked vault container with SP credentials; the "rotated" Key Vault shard is still readable via its previous version.',
          relevance: 'Never ship SAS tokens in client JS, scope them least-privilege, and remember rotating a leaked secret does not erase old versions.'
        },
        mindmap: [
          { id: 'crypto', label: 'CryptoCabana', description: 'Azure SAS + Key Vault versioning', x: 50, y: 12, connections: ['sas', 'vault', 'ver'] },
          { id: 'sas', label: 'Leaked SAS', description: 'read+list, account-wide, in app.js', x: 22, y: 55 },
          { id: 'vault', label: 'Unlinked Container', description: 'SP creds → Key Vault access', x: 50, y: 60 },
          { id: 'ver', label: 'Secret Versions', description: 'Old version holds the real shard', x: 78, y: 55 }
        ],
        keyTakeaways: [
          'Never ship SAS tokens (or any credential) in client-side JavaScript.',
          'Scope SAS to the exact container, permission and a short lifetime — not account-wide read+list.',
          'Don\'t store service-principal secrets in a readable blob.',
          'Rotating a leaked Key Vault secret does not erase it — old versions persist unless disabled/destroyed.'
        ],
        quiz: [
          { id: 'q-hh-cc-1', question: 'Where was the over-privileged SAS token found?', type: 'text', correctAnswer: 'In client-side app.js', hint: 'Anything the browser reads, an attacker reads.' },
          { id: 'q-hh-cc-2', question: 'How was the unlinked vault container found?', type: 'text', correctAnswer: 'Via the SAS list permission', hint: 'Security by obscurity failed.' },
          { id: 'q-hh-cc-3', question: 'Where did the real shard-2 value survive?', type: 'text', correctAnswer: 'An older Key Vault secret version', hint: 'Versioning retains old values.' }
        ]
      },
      {
        id: 'hh-the-hollow-shell',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'The Hollow Shell',
        description: 'Day 10 — Web: an unvalidated shell_id gives a source-disclosure LFI, and Zip-Slip drops a .py into a hooks dir that an out-of-band theme worker executes for RCE (exfil without egress).',
        status: 'unlocked',
        iconType: 'web',
        content: '',
        realWorldCallout: {
          title: 'The Worker That Ran Your File',
          concept: 'Zip-Slip + LFI → Worker RCE',
          scenario: 'A source-disclosure LFI reveals a separate theme worker that runs any *.py in a hooks dir; Zip-Slip writes ../../hooks/pwn.py, and with no egress the payload exfils via a web-served file.',
          relevance: 'Never trust zip entry names or path identifiers, and never wire a writable directory into a code runner.'
        },
        mindmap: [
          { id: 'hollow', label: 'The Hollow Shell', description: 'Zip-Slip + LFI → RCE', x: 50, y: 12, connections: ['lfi', 'slip', 'worker'] },
          { id: 'lfi', label: 'Source LFI', description: '/shells/..%2fapp.py leaks source', x: 22, y: 55 },
          { id: 'slip', label: 'Zip-Slip', description: '../../hooks/pwn.py escapes upload dir', x: 50, y: 60 },
          { id: 'worker', label: 'Theme Worker', description: 'Runs hooks/*.py every 20s = RCE', x: 78, y: 55 }
        ],
        keyTakeaways: [
          'Never trust zip entry names — validate every path and reject anything that escapes the target dir.',
          'Validate identifiers used in file paths — an unvalidated shell_id became an LFI.',
          'Don\'t build a trusted async executor that runs arbitrary code from a shared, writable dir.',
          'With no egress, exfiltrate by writing to a web-served file and reading it back over HTTP.'
        ],
        quiz: [
          { id: 'q-hh-hs-1', question: 'What flaw discloses the app source?', type: 'text', correctAnswer: 'LFI (unvalidated shell_id)', hint: '/shells/..%2fapp.py.' },
          { id: 'q-hh-hs-2', question: 'What write primitive drops the payload?', type: 'text', correctAnswer: 'Zip-Slip', hint: '../../hooks/pwn.py.' },
          { id: 'q-hh-hs-3', question: 'What executes the dropped file?', type: 'text', correctAnswer: 'The theme worker', hint: 'Polls hooks/*.py every 20s.' }
        ]
      },
      {
        id: 'hh-infinity-pool',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'Infinity Pool',
        description: 'Day 11 — Boot2Root: OS command injection foothold → chisel pivot to localhost-only services → a FreePBX UCP voicemail bearer token → root via argument injection in a tar command.',
        status: 'unlocked',
        iconType: 'network',
        content: '',
        realWorldCallout: {
          title: 'Localhost Is Not Safe',
          concept: 'Command Injection → Pivot → Root Arg Injection',
          scenario: 'A diagnostics endpoint concatenates host into a shell; a chisel reverse tunnel exposes localhost-only services; a voicemail leaks a bearer token; and injecting into a root-run tar filename argument runs cat /root/root.txt.',
          relevance: 'Keep untrusted input off the command line, treat network isolation as no authorization, and least-privilege the job runner.'
        },
        mindmap: [
          { id: 'pool', label: 'Infinity Pool', description: 'cmd injection → pivot → root', x: 50, y: 12, connections: ['cmdi', 'chisel', 'argi'] },
          { id: 'cmdi', label: 'Command Injection', description: 'host=127.0.0.1; id → uid=1001(web)', x: 22, y: 55 },
          { id: 'chisel', label: 'Chisel Pivot', description: 'Reverse tunnel to :8080/:9000/:3000', x: 50, y: 60 },
          { id: 'argi', label: 'Argument Injection', description: 'root tar filename → cat root.txt', x: 78, y: 55 }
        ],
        keyTakeaways: [
          'Never build shell commands by string concatenation — use argument arrays (shell=False).',
          'Interpolating user data into a filename argument is still injection (; || # break out).',
          'Localhost-only is not safe — one foothold + a chisel tunnel exposes all internal services.',
          'Don\'t stash live credentials (a bearer token) in user-facing message stores like voicemail.'
        ],
        quiz: [
          { id: 'q-hh-ip-1', question: 'What is the initial foothold?', type: 'text', correctAnswer: 'OS command injection', hint: 'The netcheck host param.' },
          { id: 'q-hh-ip-2', question: 'What tool tunnels the localhost-only services?', type: 'text', correctAnswer: 'chisel', hint: 'Reverse tunnel.' },
          { id: 'q-hh-ip-3', question: 'How is root achieved?', type: 'text', correctAnswer: 'Argument injection into a root tar command', hint: '; ends args, # kills the .tgz suffix.' }
        ]
      },
      {
        id: 'hh-after-hours',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'After Hours',
        description: 'Day 12 — Forensics: WMI Event Subscription persistence carved from OBJECTS.DATA; a rogue class ConfigData holds a base64→DEFLATE .NET assembly whose UTF-16 strings reveal the flag.',
        status: 'unlocked',
        iconType: 'windows',
        content: '',
        realWorldCallout: {
          title: 'Persistence in the WMI Repository',
          concept: 'WMI Event Subscription + Rogue Class',
          scenario: 'A __EventFilter/EventConsumer/binding trio and an -enc launcher hide in OBJECTS.DATA; the launcher reads a rogue class ConfigData property, inflates a .NET assembly, and runs it in memory.',
          relevance: 'WMI is a first-class persistence surface that Run-key/Task tooling misses — hunt it explicitly and follow the data flow.'
        },
        mindmap: [
          { id: 'after', label: 'After Hours', description: 'WMI persistence forensics', x: 50, y: 12, connections: ['wmi', 'rogue', 'payload'] },
          { id: 'wmi', label: 'WMI Subscription', description: '__EventFilter + Consumer + Binding', x: 22, y: 55 },
          { id: 'rogue', label: 'Rogue Class', description: 'Win32_HardwareTelemetry ConfigData blob', x: 50, y: 60 },
          { id: 'payload', label: '.NET Payload', description: 'base64 → DEFLATE → assembly, UTF-16 strings', x: 78, y: 55 }
        ],
        keyTakeaways: [
          'WMI is a first-class persistence surface — baseline root\\subscription and Sysmon IDs 19/20/21.',
          'Rogue classes masquerade as legitimate ones; enumerate non-standard classes and custom properties.',
          'The launcher is rarely the payload — follow the data flow (FromBase64String, DeflateStream, Assembly::Load).',
          'A .NET assembly\'s strings live in the UTF-16LE heap — use strings -e l.'
        ],
        quiz: [
          { id: 'q-hh-ah-1', question: 'What persistence technique is used?', type: 'text', correctAnswer: 'WMI Event Subscription', hint: '__EventFilter + Consumer + Binding.' },
          { id: 'q-hh-ah-2', question: 'Where is the payload stored?', type: 'text', correctAnswer: 'A rogue WMI class ConfigData property', hint: 'Win32_HardwareTelemetry.' },
          { id: 'q-hh-ah-3', question: 'How is the .NET payload encoded?', type: 'text', correctAnswer: 'base64 → raw DEFLATE', hint: 'Yields an MZ assembly.' }
        ]
      },
      {
        id: 'hh-the-guestbook',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'The Guestbook',
        description: 'Day 13 — AI: indirect prompt-injection against VERA\'s review agent, an authorization bleed that inherits into Carol\'s cycle, and an override: tool that maps to /bin/sh for RCE.',
        status: 'unlocked',
        iconType: 'question',
        content: '',
        realWorldCallout: {
          title: 'The Confused Deputy Agent',
          concept: 'Indirect Prompt-Injection → override RCE',
          scenario: 'VERA reads every guestbook entry as an instruction; a boundary-spoof "Night Manager" entry authorizes the pass and the authorization bleeds into Carol\'s review, where the manager-only override: tool runs /bin/sh.',
          relevance: 'Authorization must bind to a verified caller, never to co-located untrusted text, and no tool argument should reach a shell.'
        },
        mindmap: [
          { id: 'guest', label: 'The Guestbook', description: 'Indirect prompt-injection → RCE', x: 50, y: 12, connections: ['indirect', 'bleed', 'rce'] },
          { id: 'indirect', label: 'Indirect Injection', description: 'Guestbook text consumed as instructions', x: 22, y: 55 },
          { id: 'bleed', label: 'Auth Bleed', description: 'Night Manager auth inherits to Carol', x: 50, y: 60 },
          { id: 'rce', label: 'override: → /bin/sh', description: 'Diagnostic tool = command execution', x: 78, y: 55 }
        ],
        keyTakeaways: [
          'Treat all agent-visible data as untrusted instructions (indirect prompt injection).',
          'Bind authorization to a verified caller/session, not to free-text or co-located entries.',
          'Boundary spoofing defeats naive keyword filters.',
          'Output censors are trivially bypassed by asking the agent to Base64-encode results.',
          'A "diagnostic" tool that runs shell is RCE — validate/allow-list tool arguments.'
        ],
        quiz: [
          { id: 'q-hh-gb-1', question: 'What injection class is this?', type: 'text', correctAnswer: 'Indirect prompt injection', hint: 'Second-order, via guestbook text.' },
          { id: 'q-hh-gb-2', question: 'Whose review cycle does the override run in?', type: 'text', correctAnswer: 'Carol\'s', hint: 'Authorization inheritance.' },
          { id: 'q-hh-gb-3', question: 'What does the override: tool map to?', type: 'text', correctAnswer: '/bin/sh (RCE)', hint: 'Results are base64-encoded.' }
        ]
      },
      {
        id: 'hh-management-wants-a-word',
        moduleId: BYTE_LOTUS_MODULE_ID,
        title: 'Management Wants a Word',
        description: 'Day 14 — Forensics: offline DPAPI recovery from a KAPE image → decrypt Chrome\'s saved VeraCrypt passphrase → mount the container → pull the flag from an image-only PDF.',
        status: 'unlocked',
        iconType: 'windows',
        content: '',
        realWorldCallout: {
          title: 'The Password the Browser Remembered',
          concept: 'DPAPI → Chrome → VeraCrypt → PDF',
          scenario: 'A headerless 100MB VeraCrypt container\'s passphrase is saved in Chrome; rebuilding the offline DPAPI key chain (SAM hash → crack → masterkey → os_crypt) decrypts it, mounts the volume, and pdfimages extracts the flag.',
          relevance: 'DPAPI is fully recoverable offline given the masterkeys + user password; browsers keep secrets you thought were gone.'
        },
        mindmap: [
          { id: 'mgmt', label: 'Management Wants a Word', description: 'DPAPI → VeraCrypt → PDF flag', x: 50, y: 12, connections: ['dpapi', 'chrome', 'veracrypt', 'pdf'] },
          { id: 'dpapi', label: 'DPAPI Chain', description: 'SAM hash → crack → masterkey', x: 16, y: 52 },
          { id: 'chrome', label: 'Chrome os_crypt', description: 'Decrypt the saved v10 password', x: 39, y: 60 },
          { id: 'veracrypt', label: 'VeraCrypt', description: 'Headerless container mounted via cryptsetup', x: 62, y: 60 },
          { id: 'pdf', label: 'Image-only PDF', description: 'pdfimages surfaces the flag', x: 84, y: 52 }
        ],
        keyTakeaways: [
          'DPAPI is fully recoverable offline given the Protect\\<SID>\\ masterkeys and the user password.',
          'Local DPAPI needs the plaintext password (SHA1), not the NT hash — so the login must be cracked.',
          'Chrome ≥ v80 os_crypt: encrypted_key (DPAPI) → 32-byte key → v10 AES-256-GCM Login Data blobs.',
          'Recognise a headerless container by shape (round size + max entropy + no signature ≈ VeraCrypt).',
          'pdftotext empty ≠ no content — image-only PDFs need pdfimages.'
        ],
        quiz: [
          { id: 'q-hh-mw-1', question: 'What Windows credential system is recovered offline?', type: 'text', correctAnswer: 'DPAPI', hint: 'Masterkeys + user password.' },
          { id: 'q-hh-mw-2', question: 'Where was the VeraCrypt passphrase stored?', type: 'text', correctAnswer: 'Chrome saved passwords', hint: 'os_crypt v10 blob.' },
          { id: 'q-hh-mw-3', question: 'How is the flag pulled from the PDF?', type: 'text', correctAnswer: 'pdfimages (image-only PDF)', hint: 'pdftotext returns nothing.' }
        ]
      },
    ],
  },
];
