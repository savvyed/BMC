"""
Generates admin/config.yml for the BMC Digital Health Navigator CMS.
Run from the repo root: python3 generate_config.py
"""
import os

CHALLENGES = [
    {"id": "0",  "file_id": "0",  "prefix": "ch0",  "name": "Challenge 0: Set up your email",          "checklist": 4},
    {"id": "01", "file_id": "01", "prefix": "ch01", "name": "Challenge 1: Set up MyChart",              "checklist": 8},
    {"id": "02", "file_id": "02", "prefix": "ch02", "name": "Challenge 2: Join a video visit",          "checklist": 5},
    {"id": "03", "file_id": "03", "prefix": "ch03", "name": "Challenge 3: Common tasks",                "checklist": 5},
    {"id": "04", "file_id": "04", "prefix": "ch04", "name": "Challenge 4: Family account access",       "checklist": 6},
    {"id": "05", "file_id": "05", "prefix": "ch05", "name": "Challenge 5: Find community resources",    "checklist": 7},
]

LANGUAGES = [
    ("en", "English"),
    ("es", "Espanol"),
    ("pt", "Portugues"),
    ("ht", "Kreyol ayisyen"),
    ("zh", "Zhongwen"),
]

CATEGORIES = [
    ("email",         "Setting up your email"),
    ("mychart-setup", "Setting up MyChart"),
    ("video-visits",  "Video visits"),
    ("medications",   "Medications and refills"),
    ("appointments",  "Appointments"),
    ("messages",      "Messages and your records"),
    ("community",     "Community resources"),
]


def challenge_fields(prefix, checklist_count):
    L = []
    L.append('- label: "Page title"')
    L.append('  name: ' + prefix + 'PageTitle')
    L.append('  widget: string')
    L.append('  hint: "Shown in the browser tab and header. Example: Challenge 02 — Join a video visit"')
    L.append('')
    L.append('# Watch step (Step 1)')
    L.append('- label: "Watch — progress label"')
    L.append('  name: ' + prefix + 'Step1Label')
    L.append('  widget: string')
    L.append('  hint: "Small label above the heading. Example: Step 1 of 3 — Watch"')
    L.append('')
    L.append('- label: "Watch — main heading"')
    L.append('  name: ' + prefix + 'Step1Heading')
    L.append('  widget: string')
    L.append('  hint: "Large heading above the video. Example: How to join a video visit on your phone"')
    L.append('')
    L.append('- label: "Watch — video caption"')
    L.append('  name: ' + prefix + 'Step1VideoPH')
    L.append('  widget: string')
    L.append('  hint: "Text on the video placeholder until the real video is added. Briefly describes what the video covers."')
    L.append('')
    L.append('# Practice step (Step 2)')
    L.append('- label: "Practice — progress label"')
    L.append('  name: ' + prefix + 'Step2Label')
    L.append('  widget: string')
    L.append('  hint: "Example: Step 2 of 3 — Practice"')
    L.append('')
    L.append('- label: "Practice — main heading"')
    L.append('  name: ' + prefix + 'Step2Heading')
    L.append('  widget: string')
    L.append('  hint: "Names the character and the task. Example: Help Marcus join his visit"')
    L.append('')
    L.append('- label: "Practice — scenario, sentence 1"')
    L.append('  name: ' + prefix + 'Step2Intro')
    L.append('  widget: string')
    L.append('  hint: "Introduces the character and their situation. Example: Marcus needs to join a video visit from his phone during his lunch break."')
    L.append('')
    L.append('- label: "Practice — scenario, sentence 2"')
    L.append('  name: ' + prefix + 'Step2Intro2')
    L.append('  widget: string')
    L.append('  hint: "What the patient needs to help the character do. Example: Help him find his appointment and tap Begin Visit."')
    L.append('')
    L.append('# Do it step (Step 3)')
    L.append('- label: "Do it — progress label"')
    L.append('  name: ' + prefix + 'Step3Label')
    L.append('  widget: string')
    L.append('  hint: "Example: Step 3 of 3 — Do it on your phone"')
    L.append('')
    L.append('- label: "Do it — main heading"')
    L.append('  name: ' + prefix + 'Step3Heading')
    L.append('  widget: string')
    L.append('  hint: "Example: Now try it on your own MyChart"')
    L.append('')
    L.append('- label: "Do it — intro text"')
    L.append('  name: ' + prefix + 'Step3Intro')
    L.append('  widget: string')
    L.append('  hint: "Shown above the checklist. Example: Open MyChart on your phone and follow these steps:"')
    L.append('')
    L.append('# Checklist items')
    for i in range(1, checklist_count + 1):
        L.append('- label: "Checklist — item ' + str(i) + '"')
        L.append('  name: ' + prefix + 'Check' + str(i))
        L.append('  widget: text')
        if i == 1:
            L.append('  hint: "Steps the patient checks off. Start with a verb: Tap, Open, Enter, Find... Keep them short."')
        L.append('')
    return "\n".join(L)


def build_config():
    L = []
    L.append("backend:")
    L.append("  name: git-gateway")
    L.append("  branch: main")
    L.append("")
    L.append("site_url: https://tiny-hamster-9bcc46.netlify.app")
    L.append("display_url: https://tiny-hamster-9bcc46.netlify.app")
    L.append("")
    L.append("media_folder: media")
    L.append("public_folder: /media")
    L.append("")
    L.append("# ── COLLECTIONS ─────────────────────────────────────────────────────────────")
    L.append("collections:")
    L.append("")

    # Course challenges
    L.append("  # ── Course Challenges ──────────────────────────────────────────────────────")
    L.append("  # One file per challenge. All five languages are in each file.")
    L.append("  # To translate: open the challenge, find your language section,")
    L.append("  # and fill in each field. Leave a field blank to fall back to English.")
    L.append("  - name: challenges")
    L.append('    label: "Course Challenges"')
    L.append("    files:")
    L.append("")

    for ch in CHALLENGES:
        prefix     = ch["prefix"]
        file_id    = ch["file_id"]
        ch_name    = ch["name"]
        checklist  = ch["checklist"]

        L.append('      - name: "challenge_' + file_id + '"')
        L.append('        label: "' + ch_name + '"')
        L.append('        file: content/challenge-' + file_id + '.json')
        L.append('        fields:')
        L.append('')

        for lang_code, lang_label in LANGUAGES:
            collapsed = "true" if lang_code != "en" else "false"
            L.append('          - label: "' + lang_label + '"')
            L.append('            name: ' + lang_code)
            L.append('            widget: object')
            L.append('            collapsed: ' + collapsed)
            if lang_code != "en":
                L.append('            hint: "Leave any field blank to fall back to the English text."')
            L.append('            fields:')
            for field_line in challenge_fields(prefix, checklist).splitlines():
                L.append('              ' + field_line)
            L.append('')

    # How-To Topics
    L.append("  # ── How-To Topics and Knowledge Base ────────────────────────────────────────")
    L.append("  # Step-by-step instructions shown in the Knowledge Base AND in challenge pages.")
    L.append("  # Edit here once — changes appear in both places automatically.")
    L.append("  #")
    L.append("  # IMPORTANT: Do not change the URL identifier on any topic.")
    L.append("  # It is used in page links throughout the site. Changing it will break links.")
    L.append("  - name: topics")
    L.append('    label: "How-To Topics"')
    L.append("    files:")
    L.append("")
    L.append("      - name: topics")
    L.append('        label: "All Topics"')
    L.append("        file: content/topics.json")
    L.append("        fields:")
    L.append("")
    L.append("          # challengeTopicRefs is intentionally not shown here.")
    L.append("          # It controls which topics appear in each challenge and is developer-managed.")
    L.append("          - label: \"Topic catalog\"")
    L.append("            name: catalog")
    L.append("            widget: object")
    L.append("            fields:")
    L.append("")

    for cat_slug, cat_label in CATEGORIES:
        L.append('              - label: "' + cat_label + '"')
        L.append('                name: "' + cat_slug + '"')
        L.append('                widget: object')
        L.append('                fields:')
        L.append('                  - label: "Topics in this category"')
        L.append('                    name: topics')
        L.append('                    widget: list')
        L.append('                    label_singular: "Topic"')
        L.append('                    fields:')
        L.append('                      - label: "Title"')
        L.append('                        name: title')
        L.append('                        widget: string')
        L.append('                        hint: "Plain-language title shown on the topic page and in the challenge Watch step."')
        L.append('                      - label: "URL identifier"')
        L.append('                        name: slug')
        L.append('                        widget: string')
        L.append('                        hint: "Do not change — this value is used in page links throughout the site."')
        L.append('                      - label: "Step-by-step instructions"')
        L.append('                        name: steps')
        L.append('                        widget: list')
        L.append('                        label_singular: "Step"')
        L.append('                        summary: "{{fields.text}}"')
        L.append('                        fields:')
        L.append('                          - label: "Step instruction"')
        L.append('                            name: text')
        L.append('                            widget: string')
        L.append('                            hint: "Start with a verb: Tap, Open, Enter, Find..."')
        L.append('                          - label: "Media (optional)"')
        L.append('                            name: mediaType')
        L.append('                            widget: select')
        L.append('                            default: ""')
        L.append('                            required: false')
        L.append('                            hint: "Choose whether this step has a video, an image, or no media."')
        L.append('                            options:')
        L.append('                              - label: "No media"')
        L.append('                                value: ""')
        L.append('                              - label: "Video"')
        L.append('                                value: "video"')
        L.append('                              - label: "Image"')
        L.append('                                value: "image"')
        L.append('                          - label: "Media URL"')
        L.append('                            name: mediaUrl')
        L.append('                            widget: string')
        L.append('                            required: false')
        L.append('                            hint: "Paste the URL of the video or image. Leave blank if no media selected above."')
        L.append('')

    return "\n".join(L)


out_path = "C:/Users/ttian/BMC/admin/config.yml"
config = build_config()
with open(out_path, "w", encoding="utf-8", newline="\n") as f:
    f.write(config)

lines = config.count("\n")
print(f"Written {out_path}")
print(f"  {lines} lines")
print(f"  {len(CHALLENGES)} challenges x {len(LANGUAGES)} languages")
print(f"  {len(CATEGORIES)} topic categories")
