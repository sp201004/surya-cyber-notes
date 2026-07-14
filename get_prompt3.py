import json

log_path = "/Users/sp2010/.gemini/antigravity-ide/brain/8856246e-6dd3-4c6a-bb79-23c82855cc26/.system_generated/logs/transcript_full.jsonl"
with open(log_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get("type") == "USER_INPUT":
            content = data.get("content", "")
            if "Issue 3" in content:
                print(content[-1500:]) # print last 1500 chars to see issue 3
