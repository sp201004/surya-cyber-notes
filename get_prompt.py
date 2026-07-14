import json

log_path = "/Users/sp2010/.gemini/antigravity-ide/brain/8856246e-6dd3-4c6a-bb79-23c82855cc26/.system_generated/logs/transcript_full.jsonl"
with open(log_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get("type") == "USER_INPUT":
            content = data.get("content", "")
            if "COURSE 1 MARKDOWN (paste below this line):" in content:
                md_start = content.find("COURSE 1 MARKDOWN (paste below this line):")
                print("FOUND!")
                # Write to brain scratch
                out_path = "/Users/sp2010/.gemini/antigravity-ide/brain/8856246e-6dd3-4c6a-bb79-23c82855cc26/scratch/user_prompt_md.txt"
                with open(out_path, 'w') as out_f:
                    out_f.write(content[md_start:])
                break
