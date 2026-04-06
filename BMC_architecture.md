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
        DecapCMS["Decap CMS\n─────────────\nBrowser-based editor\nLives at /admin/\nRequires Netlify Identity login\n~150 editable text fields"]
        GitHub["GitHub Repository\n─────────────\nsavvyed/BMC\nSource of truth for\nall content + code"]
    end

    %% ── CONTENT LIBRARY ─────────────────────────────────────
    subgraph ContentLib["🗂️  Content Library  (inside the repo)"]
        direction TB
        ChallengesJSON["content/challenges.json\n─────────────\nAll translatable strings\nfor Challenges 0–05\n~300 keys × 5 languages\nEditable via Decap CMS"]
        TopicCatalog["shared/js/main.js  ← topicCatalog\n─────────────\nKnowledge Base structure\n7 categories · ~28 topics\n~200+ step-by-step items\nHardcoded — not yet CMS-editable"]
        MainStrings["shared/js/main.js  ← strings{}\n─────────────\nUI labels, buttons, headings\nfor all 5 languages\nFallback if JSON unavailable\nOverridden by CMS JSON at runtime"]
    end

    %% ── BUILD & HOSTING ─────────────────────────────────────
    subgraph Hosting["☁️  Build & Hosting  ┄┄ Netlify (configured) · Vercel (option)"]
        direction TB
        CI["CI/CD Pipeline\n─────────────\nAuto-triggered on every\ngit push to main\nLive in ~30–60 seconds"]
        CDN["CDN / Edge Network\n─────────────\nServes static HTML, CSS, JS, JSON\nGlobal edge locations · Free SSL"]
        Identity["Identity / Auth\n─────────────\nNetlify Identity\nGates /admin/ only\n(no patient login)"]
    end

    %% ── PATIENT-FACING SITE ─────────────────────────────────
    subgraph Site["🌐  Patient-Facing Website  (static files, no server)"]
        direction TB
        LangSelector["Language Selector\nindex.html\n─────────────\nEn · Es · Pt · Ht · Zh"]
        Home["Home Screen\nhome.html"]
        Course["📘 Course\n─────────────\nChallenge 0–05\n6 challenge pages\nWatch · Practice · Do it"]
        KB["🔍 Knowledge Base\n─────────────\n7 categories · ~28 topics\n1 template page renders all"]
    end

    %% ── EXTERNAL SERVICES ───────────────────────────────────
    subgraph External["🔗  External Services  (open in new tab)"]
        direction LR
        MyChart["🏥 MyChart\nmychart.bmc.org"]
        MassThrive["🌐 MassThrive\nmassthrive.org"]
    end

    %% ── ANALYTICS ───────────────────────────────────────────
    subgraph Analytics_Layer["📊  Analytics  ┄┄ decide: GA4 · Plausible · Netlify Analytics"]
        Analytics["Analytics Platform\n─────────────\nTracks: page views,\nlanguage selected,\ntopic clicks, challenge starts\n\n⚠️ Privacy note: use cookie-free\noption (Plausible / Netlify)\nfor HIPAA alignment"]
    end

    %% ── SMS SUPPORT ─────────────────────────────────────────
    subgraph SMS_Layer["💬  SMS Support  ┄┄ decide: Twilio · SimpleTexting · EZTexting"]
        SMS_Platform["SMS Platform\n─────────────\nPatient texts shortcode\nfrom 'Need more help?'\nlink on every topic page\n(sms: protocol — no app needed)"]
        SMS_Inbox["Navigator Inbox\n─────────────\nMessages route to\nDigital Health Navigator\nvia dashboard or email"]
    end

    %% ── CONNECTIONS ─────────────────────────────────────────

    %% Content editing flow
    Editor -->|"logs into /admin/ in browser"| DecapCMS
    DecapCMS -->|"commits to Git\n(no coding needed)"| GitHub
    GitHub -->|"auto-deploy webhook"| CI
    CI -->|"publishes site"| CDN
    Identity -..->|"protects /admin/ only"| DecapCMS

    %% Content library sits inside the repo
    GitHub -..->|"contains"| ChallengesJSON
    GitHub -..->|"contains"| TopicCatalog
    GitHub -..->|"contains"| MainStrings

    %% Runtime content loading
    CDN -->|"serves all pages"| LangSelector
    ChallengesJSON -->|"XHR fetch at page load\nmerges over fallback strings"| Course
    ChallengesJSON -->|"XHR fetch at page load"| Home
    TopicCatalog -->|"JS renders page from\n?cat= and ?topic= URL params"| KB
    MainStrings -->|"fallback if JSON unavailable\n(e.g. local dev)"| Course

    %% Patient browsing flow
    Patient -->|"opens site on phone"| LangSelector
    LangSelector -->|"?lang= URL param\ncarried on every link"| Home
    Home --> Course
    Home --> KB
    Home -->|"new tab"| MyChart
    Home -->|"new tab"| MassThrive

    %% Analytics
    Course -->|"page events"| Analytics
    KB -->|"page events"| Analytics
    Home -->|"language chosen"| Analytics

    %% SMS
    KB -->|"'Text us for help'\nsms:+1XXXXXXXXXX"| SMS_Platform
    SMS_Platform --> SMS_Inbox
    SMS_Inbox -->|"navigator responds\nto patient"| Navigator
    Navigator -->|"can edit content\nvia CMS"| DecapCMS

    %% Styling
    classDef person   fill:#1a5276,color:#fff,stroke:#0d2d47
    classDef cms      fill:#148f77,color:#fff,stroke:#0a5c48
    classDef content  fill:#1e8449,color:#fff,stroke:#145a32
    classDef hosting  fill:#2e86c1,color:#fff,stroke:#1a5276
    classDef site     fill:#1a5276,color:#fff,stroke:#0d2d47
    classDef external fill:#784212,color:#fff,stroke:#4a2a0b
    classDef analytics fill:#6c3483,color:#fff,stroke:#4a2360
    classDef sms      fill:#117a65,color:#fff,stroke:#0a5243

    class Editor,Navigator,Patient person
    class DecapCMS,GitHub cms
    class ChallengesJSON,TopicCatalog,MainStrings content
    class CI,CDN,Identity hosting
    class LangSelector,Home,Course,KB site
    class MyChart,MassThrive external
    class Analytics analytics
    class SMS_Platform,SMS_Inbox sms
```

---

## Diagram 2 — Content Library Detail
*How content gets from the file into the patient's browser*

```mermaid
flowchart LR

    subgraph Files["📁  Files in the Repo"]
        JSON["content/challenges.json\n─────────────\nAll editable strings\nChallenges 0–05\n~300 keys × 5 languages\n\nExample key:\nch02Step1Heading:\n'How to join a video visit\non your phone'"]
        JS_Strings["main.js → strings{}\n─────────────\nHardcoded fallback\nfor all UI labels\nand challenge text.\nUsed if JSON fails\n(e.g. offline / local dev)"]
        JS_Catalog["main.js → topicCatalog{}\n─────────────\nKnowledge Base structure.\nAll 7 categories,\n~28 topics, ~200 steps.\nNot yet CMS-editable."]
    end

    subgraph Runtime["⚙️  Runtime (in the browser)"]
        XHR["Synchronous XHR fetch\n/content/challenges.json\n─────────────\nRuns before page renders.\nMerges CMS data\nover JS fallback strings."]
        T["t(key) function\n─────────────\nLooks up current language,\nreturns translated string.\nFalls back en → key name."]
        ApplyStrings["applyStrings()\n─────────────\nScans DOM for\n[data-string-key] elements.\nReplaces text content\nwith translated value."]
        InitTopic["initTopic() / initCategory()\n─────────────\nReads ?cat= and ?topic=\nURL params.\nBuilds topic page HTML\nfrom topicCatalog data."]
    end

    subgraph DOM["🖥️  What the Patient Sees"]
        HTML["HTML element\n─────────────\n&lt;h1 data-string-key=\n'ch02Step1Heading'&gt;\nHow to join a\nvideo visit...\n&lt;/h1&gt;"]
        TopicPage["Rendered topic page\n─────────────\nHeading · Video placeholder\nNumbered steps · SMS link\nAll from topicCatalog"]
    end

    JSON -->|"fetched at page load"| XHR
    JS_Strings -->|"loaded as fallback"| T
    XHR -->|"Object.assign() merges\nCMS data over fallback"| T
    T --> ApplyStrings
    ApplyStrings -->|"updates text content"| HTML

    JS_Catalog --> InitTopic
    InitTopic -->|"builds page from URL params"| TopicPage
```

---

## How Each Layer Works

### 📝 Content Management (Decap CMS + GitHub)
Editors log into `/admin/` in any browser — no coding or Git knowledge needed. Decap CMS saves changes directly to GitHub as commits. GitHub is the single source of truth for all content and code. Decap CMS on Netlify is already configured in this repo.

### 🗂️ Content Library — Two types of content

| Content | Where it lives | Who edits it | How it loads |
|---|---|---|---|
| **Challenge text** — titles, headings, step instructions, checklists, character names | `content/challenges.json` | Anyone via Decap CMS | Fetched by XHR at page load, merged over fallback |
| **Knowledge Base** — 7 categories, ~28 topics, ~200 steps | `main.js → topicCatalog{}` | Developer only (for now) | JS reads URL params (`?cat=`, `?topic=`) and builds the page |
| **UI labels & buttons** | `main.js → strings{}` | Developer, or CMS (overrides) | Hardcoded in JS; CMS JSON replaces at runtime |

> **Phase 2 note:** The Knowledge Base (`topicCatalog`) is currently hardcoded in JavaScript. Moving it into editable JSON (like the challenges) is the natural next step once content is finalized.

### ⚙️ How Content Gets on Screen
1. Patient loads a page (e.g. `course/challenge-02.html?lang=es`)
2. `main.js` runs a **synchronous fetch** of `content/challenges.json`
3. CMS-edited strings are **merged** over the JS fallback strings
4. `applyStrings()` scans the DOM for every `data-string-key` attribute and swaps in the right translation
5. All links with `data-lang-href` get `?lang=es` appended automatically
6. For Knowledge Base pages: `initTopic()` reads `?cat=` and `?topic=` from the URL and **builds the entire page** from the `topicCatalog` object

### ☁️ Build & Hosting (Netlify — already configured)
Every git push to `main` auto-deploys. Site URL is `tiny-hamster-9bcc46.netlify.app`. Netlify Identity gates the `/admin/` CMS route — no patient login needed or used.

### 🌐 Patient-Facing Site
Pure HTML/CSS/JS. No login, no app install, no cookies. Language selection is preserved via `?lang=` URL parameters on every link throughout the site.

### 📊 Analytics
Tracking script on each page captures anonymous usage — language chosen, pages viewed, challenges started, topics clicked. **Privacy recommendation:** Use a cookie-free tool (Plausible or Netlify Analytics) to avoid HIPAA complications.

### 💬 SMS Support
Each Knowledge Base topic page has a "Text us for help" link using the `sms:` protocol — it opens the patient's native SMS app with the navigator's number pre-filled. No backend is required on the site side.

---

*Last updated: April 2026 · Questions: Tianna Tagami, M.Ed.*
