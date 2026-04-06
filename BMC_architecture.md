# BMC Digital Health Navigator — System Architecture

> **How to use this file:**
> - View on GitHub — Mermaid diagrams render automatically
> - Edit online at [mermaid.live](https://mermaid.live) — paste the code block below
> - Import into Notion, Confluence, or VS Code (with Mermaid extension)
> - To swap in a specific tool, find the placeholder label and update the text

---

## Diagram 1 — Full System Overview

```mermaid
flowchart TD

    %% ── PEOPLE ──────────────────────────────────────────────
    subgraph People["👥  People"]
        direction LR
        Editor["🖊️ Content Editor\n(BMC / SavvyEd staff)"]
        Navigator["🩺 Digital Health Navigator\n(patient support staff)"]
        Patient["📱 Patient\n(mobile browser)"]
    end

    %% ── CONTENT MANAGEMENT ──────────────────────────────────
    subgraph CMS_Layer["📝  Content Management"]
        direction TB
        DecapCMS["Decap CMS\n─────────────\nBrowser-based editor\nLives at /admin/\nRequires Netlify Identity login"]
        GitHub["GitHub Repository\n─────────────\nsavvyed/BMC\nSource of truth for\nall content + code"]
    end

    %% ── SHARED CONTENT POOL ─────────────────────────────────
    subgraph ContentPool["🗂️  Shared Content Pool  (single source of truth)"]
        direction TB
        HowToTopics["How-To Topics\n─────────────\n7 categories · ~28 topics\nEach topic:\n  • How-to video\n  • Step-by-step text\n  • Category tag\nEdited ONCE · used in both\nKnowledge Base AND Challenges"]
        H5P["H5P Interactions\n─────────────\nCharacter scenario per challenge\n(Elena / Marcus / Rosa / Victor)\nAuthored in Lumi Desktop\nExported as HTML5 bundle\nStored in /media/interactions/\nLoaded inline by JS — no iframe"]
        ChallengeText["Challenge Connecting Text\n─────────────\ncontent/challenges.json\nIntro text · scenario framing\nChecklist items · UI labels\n5 languages · CMS-editable"]
    end

    %% ── BUILD & HOSTING ─────────────────────────────────────
    subgraph Hosting["☁️  Build & Hosting  ┄┄ Netlify (configured) · Vercel (option)"]
        direction TB
        CI["CI/CD Pipeline\n─────────────\nAuto-triggered on git push\nLive in ~30–60 seconds"]
        CDN["CDN / Edge Network\n─────────────\nServes all static files\nFree SSL · Global edge"]
        Identity["Netlify Identity\n─────────────\nGates /admin/ only\n(no patient login)"]
    end

    %% ── PATIENT-FACING SITE ─────────────────────────────────
    subgraph Site["🌐  Patient-Facing Website"]
        direction LR

        subgraph CoursePages["📘 Course  (content assembler pages)"]
            Challenge["Challenge page\n─────────────\n① Intro text\n② ↓ How-to video + steps\n③ Scenario framing text\n④ ↓ H5P interaction\n⑤ Checklist\n\nPulls ②④ from shared pool\nWraps with ①③⑤ connecting text"]
        end

        subgraph KBPages["🔍 Knowledge Base  (direct topic access)"]
            KBTopic["Topic page\n─────────────\n↓ Same how-to video\n↓ Same step-by-step text\n+ SMS 'need more help?' link\n\nSame content atom as ②\ndisplayed standalone"]
        end

        LangSelector["Language Selector\nindex.html"]
        Home["Home Screen\nhome.html"]
    end

    %% ── EXTERNAL SERVICES ───────────────────────────────────
    subgraph External["🔗  External Services  (new tab)"]
        direction LR
        MyChart["🏥 MyChart"]
        MassThrive["🌐 MassThrive"]
    end

    %% ── ANALYTICS ───────────────────────────────────────────
    subgraph Analytics_Layer["📊  Analytics  ┄┄ decide: GA4 · Plausible · Netlify Analytics"]
        Analytics["Analytics Platform\n─────────────\nPage views · language · topic clicks\nChallenge step completions\n⚠️ Use cookie-free for HIPAA"]
    end

    %% ── SMS SUPPORT ─────────────────────────────────────────
    subgraph SMS_Layer["💬  SMS Support  ┄┄ decide: Twilio · SimpleTexting · EZTexting"]
        SMS_Platform["SMS Platform\n─────────────\nsms: link on every topic page"]
        SMS_Inbox["Navigator Inbox"]
    end

    %% ── CONNECTIONS ─────────────────────────────────────────

    Editor -->|"edits via /admin/"| DecapCMS
    DecapCMS -->|"commits to Git"| GitHub
    GitHub -->|"auto-deploy"| CI
    CI --> CDN
    Identity -..->|"protects /admin/"| DecapCMS

    GitHub -..->|"contains"| HowToTopics
    GitHub -..->|"contains"| ChallengeText
    Lumi["🖊️ Lumi Desktop\n─────────────\nWYSIWYG H5P editor\nRuns on staff machine\nExports HTML5 bundle\n(.h5p → HTML + JS + CSS)"]
    Lumi -->|"staff exports bundle,\ncommits to /media/interactions/"| GitHub
    GitHub -..->|"contains"| H5P

    HowToTopics -->|"rendered as standalone topic"| KBTopic
    HowToTopics -->|"embedded as step ② in challenge"| Challenge
    H5P -->|"embedded as step ④ in challenge"| Challenge
    ChallengeText -->|"wraps content as ①③⑤"| Challenge

    CDN -->|"serves pages"| LangSelector
    Patient --> LangSelector
    LangSelector --> Home
    Home --> Challenge
    Home --> KBTopic
    Home -->|"new tab"| MyChart
    Home -->|"new tab"| MassThrive

    Challenge -->|"events"| Analytics
    KBTopic -->|"events"| Analytics
    KBTopic -->|"sms: link"| SMS_Platform
    SMS_Platform --> SMS_Inbox
    SMS_Inbox --> Navigator
    Navigator -->|"edits content"| DecapCMS

    classDef person    fill:#1a5276,color:#fff,stroke:#0d2d47
    classDef cms       fill:#148f77,color:#fff,stroke:#0a5c48
    classDef pool      fill:#1e8449,color:#fff,stroke:#145a32
    classDef hosting   fill:#2e86c1,color:#fff,stroke:#1a5276
    classDef site      fill:#1a5276,color:#fff,stroke:#0d2d47
    classDef external  fill:#784212,color:#fff,stroke:#4a2a0b
    classDef analytics fill:#6c3483,color:#fff,stroke:#4a2360
    classDef sms       fill:#117a65,color:#fff,stroke:#0a5243

    class Editor,Navigator,Patient person
    class DecapCMS,GitHub cms
    class Lumi cms
    class HowToTopics,H5P,ChallengeText pool
    class CI,CDN,Identity hosting
    class LangSelector,Home,Challenge,KBTopic site
    class MyChart,MassThrive external
    class Analytics analytics
    class SMS_Platform,SMS_Inbox sms
```

---

## Diagram 2 — Challenge Page Assembly Model
*A challenge page is not a monolithic document — it's a series of content containers with connecting text woven between them*

```mermaid
flowchart TD

    subgraph Sources["🗂️  Content Sources"]
        direction LR
        TopicPool["Shared How-To Topic\n(from topic catalog)\n─────────────\n• How-to video\n• Step-by-step text\nSame content shown\nin Knowledge Base"]
        H5PSource["H5P Interaction\n(external embed)\n─────────────\n• Character scenario\n• Elena / Marcus /\n  Rosa / Victor"]
        ConnText["Connecting Text\n(from challenges.json)\n─────────────\n• Intro framing\n• Scenario setup\n• Checklist items\n• 5 languages"]
    end

    subgraph ChallengePage["📘  Challenge Page  (assembled at render time)"]
        direction TB
        A["① Intro text\n(connecting text — CMS-editable)"]
        B["② How-to video + step-by-step text\n(pulled from shared topic catalog)\n↑ Same content atom as KB topic page"]
        C["③ Scenario framing text\ncharacter intro · context\n(connecting text — CMS-editable)"]
        D["④ H5P interaction\ncharacter scenario embed\n(iframe / JS — external host)"]
        E["⑤ Instructional wrap-up text + self checklist\n(connecting text + checklist items — CMS-editable)"]

        A --> B --> C --> D --> E
    end

    subgraph KBPage["🔍  Knowledge Base Topic Page\n(same content atom, displayed standalone)"]
        KB_Vid["How-to video"]
        KB_Steps["Step-by-step text"]
        KB_SMS["'Text us for help' link"]
        KB_Vid --> KB_Steps --> KB_SMS
    end

    TopicPool -->|"embedded in step ②"| B
    TopicPool -->|"displayed directly"| KB_Vid
    TopicPool -->|"displayed directly"| KB_Steps
    H5PSource -->|"embedded in step ④"| D
    ConnText -->|"rendered into ①③⑤"| A
    ConnText -->|"rendered into ①③⑤"| C
    ConnText -->|"rendered into ①③⑤"| E

    style B fill:#1e8449,color:#fff,stroke:#145a32
    style D fill:#1e8449,color:#fff,stroke:#145a32
    style A fill:#1a5276,color:#fff,stroke:#0d2d47
    style C fill:#1a5276,color:#fff,stroke:#0d2d47
    style E fill:#1a5276,color:#fff,stroke:#0d2d47
```

**Legend:**
- 🟦 **Blue containers** — connecting text (unique to each challenge, CMS-editable, 5 languages)
- 🟩 **Green containers** — shared content atoms (live once, referenced by both Challenge and KB pages)

---

## Diagram 3 — Content Flow at Runtime
*How the browser assembles a challenge page from multiple sources*

```mermaid
sequenceDiagram
    actor Patient as 📱 Patient
    participant Browser as Browser
    participant HTML as challenge-02.html
    participant JS as main.js
    participant JSON as content/challenges.json
    participant Catalog as topicCatalog (in JS)
    participant H5P as H5P Host

    Patient->>Browser: Opens challenge-02.html?lang=es
    Browser->>HTML: Loads HTML skeleton (content containers only)
    Browser->>JS: Loads main.js
    JS->>JSON: XHR fetch /content/challenges.json
    JSON-->>JS: Returns CMS-edited strings (all languages)
    JS->>JS: Merges CMS strings over JS fallback strings
    JS->>HTML: applyStrings() fills [data-string-key] elements
    Note over HTML: Intro text ①, scenario text ③,<br/>checklist items ⑤ now visible
    JS->>Catalog: initChallenge() looks up topic reference
    Catalog-->>HTML: Injects how-to video + steps into container ②
    Note over HTML: How-to content ② now visible
    Browser->>H5P: Loads iframe for H5P interaction ④
    H5P-->>HTML: Interaction renders in container ④
    Note over HTML: Full challenge page now assembled
    Patient->>HTML: Reads intro → watches video → does scenario → checks off steps
```

---

## How the Content Model Works

### The Core Principle: Write Once, Appear Twice
A how-to video and its accompanying step-by-step text live in **one place** — the shared topic catalog. That same content atom appears in two contexts:
- **Knowledge Base:** displayed on its own topic page, with an SMS help link below it
- **Challenge:** embedded as step ② inside a challenge page, with connecting text around it

An editor updates the video or steps once, and the change appears in both places automatically.

### Three Content Types

| Type | What it is | Edited by | Exists in 5 languages? |
|---|---|---|---|
| **How-to topics** | Video + numbered steps for a specific task | Content editor via CMS | Yes (target) |
| **H5P interactions** | Character scenario — interactive practice activity | Course designer in **Lumi Desktop** (exports HTML5) | Yes (H5P handles internally) |
| **Connecting text** | Intro framing, scenario setup, checklist items | Content editor via CMS | Yes |

### What a Challenge Page Actually Contains
A challenge is a **sequence of containers**, not a wall of content:

```
┌─────────────────────────────────────┐
│ ① Intro text           [connecting] │
├─────────────────────────────────────┤
│ ② How-to video                      │
│    Step-by-step text   [shared atom]│
├─────────────────────────────────────┤
│ ③ Scenario framing     [connecting] │
├─────────────────────────────────────┤
│ ④ H5P interaction      [embedded]   │
├─────────────────────────────────────┤
│ ⑤ Wrap-up text                      │
│    Self checklist      [connecting] │
└─────────────────────────────────────┘
```

### How H5P Interactions Are Authored and Delivered

H5P interactions are built in **[Lumi Desktop](https://lumi.education/)** — a free WYSIWYG editor that runs on a staff machine (no account needed). The workflow:

1. Course designer opens Lumi, builds the character scenario interaction
2. Lumi exports a self-contained **HTML5 bundle** (folder with `index.html`, JS, CSS, and content data)
3. Staff commits that folder to `/media/interactions/ch0X-scenario/` in the GitHub repo
4. On the challenge page, a JS function (`loadInteraction()`) **fetches the bundle's HTML and injects it inline** into the `#interaction-XX` container — no iframe needed
5. Netlify deploys, and the interaction is live

> **Why no iframe?** Iframes create focus-management and accessibility issues on mobile, and can cause scroll-jail on older Android browsers — both problems for this patient population. Loading the bundle inline avoids both.

> **Lumi note:** Lumi saves `.lumi` project files (keep these in a separate `/lumi-source/` folder in the repo so interactions can be re-edited later). Only the exported HTML5 folder needs to go in `/media/interactions/`.

### Current State vs. Target State

| | Current prototype | Target |
|---|---|---|
| How-to topics | Hardcoded in `main.js → topicCatalog{}` | JSON file, CMS-editable |
| Challenge content | `content/challenges.json` (connecting text only) | Same + topic references |
| Challenge pages pull from topic catalog? | No — content is duplicated | Yes — one source, two surfaces |
| H5P interactions | Placeholder `<div>` | Live H5P embed via iframe |
| Languages | 5 (en full, others partial) | 5 (all complete) |

> **Next step:** Convert `topicCatalog` from hardcoded JS into a JSON file managed by the CMS. Each challenge page config would then include a list of topic references (e.g. `"topicRefs": ["join-video-phone", "setup-camera"]`) that tell the page assembler which how-to atoms to pull in.

---

*Last updated: April 2026 · Questions: Tianna Tagami, M.Ed.*
