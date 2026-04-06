# BMC Digital Health Navigator — System Architecture

> **How to use this file:**
> - View on GitHub — Mermaid diagrams render automatically
> - Edit online at [mermaid.live](https://mermaid.live) — paste the code block below
> - Import into Notion, Confluence, or VS Code (with Mermaid extension)
> - To swap in a specific tool, find the placeholder label and update the text

---

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
        GitHub["GitHub Repository\n─────────────\nsavvyed/BMC\nSource of truth for all\ncontent + code"]
    end

    %% ── BUILD & HOSTING ─────────────────────────────────────
    subgraph Hosting["☁️  Build & Hosting  ┄┄ decide: Netlify or Vercel"]
        direction TB
        CI["CI/CD Pipeline\n─────────────\nAuto-triggered on every\ngit push to main\nBuilds in ~30 seconds"]
        CDN["CDN / Edge Network\n─────────────\nServes static HTML, CSS, JS\nGlobal edge locations\nFree SSL included"]
        Identity["Identity / Auth\n─────────────\nNetlify Identity  ← if Netlify\nor Vercel Auth\nGates the /admin/ CMS only\n(not patient-facing)"]
    end

    %% ── PATIENT-FACING SITE ─────────────────────────────────
    subgraph Site["🌐  Patient-Facing Website  (static files)"]
        direction TB
        LangSelector["Language Selector\nindex.html\n─────────────\nEn · Es · Pt · Ht · Zh"]
        Home["Home Screen\nhome.html"]
        Course["📘 Course\n─────────────\nChallenge 0 – 05\n6 guided learning paths"]
        KB["🔍 Knowledge Base\n─────────────\n7 categories · ~28 topics\nVideo + written steps"]
    end

    %% ── EXTERNAL SERVICES ───────────────────────────────────
    subgraph External["🔗  External Services  (open in new tab)"]
        direction LR
        MyChart["🏥 MyChart\nmychart.bmc.org"]
        MassThrive["🌐 MassThrive\nmassthrive.org"]
    end

    %% ── ANALYTICS ───────────────────────────────────────────
    subgraph Analytics_Layer["📊  Analytics  ┄┄ decide: GA4 · Plausible · Netlify Analytics"]
        Analytics["Analytics Platform\n─────────────\nTracks: page views,\nlanguage selected,\ntopic clicks, challenge starts\n\nPrivacy note: avoid PII;\nconsider cookie-free option\n(Plausible / Netlify)\nfor HIPAA alignment"]
    end

    %% ── SMS SUPPORT ─────────────────────────────────────────
    subgraph SMS_Layer["💬  SMS Support  ┄┄ decide: Twilio · SimpleTexting · EZTexting"]
        SMS_Platform["SMS Platform\n─────────────\nPatient texts a shortcode\nor 10-digit number\nfrom the 'Need more help?'\nsection of any topic page"]
        SMS_Inbox["Navigator Inbox\n─────────────\nMessages routed to\nDigital Health Navigator\nvia web dashboard or email"]
    end

    %% ── CONNECTIONS ─────────────────────────────────────────

    %% Content editing flow
    Editor -->|"logs in via browser"| DecapCMS
    DecapCMS -->|"commits changes to Git\n(no manual Git needed)"| GitHub
    GitHub -->|"webhook triggers\nauto-deploy"| CI
    CI -->|"publishes built site"| CDN
    Identity -..->|"protects /admin/ only"| DecapCMS

    %% Patient browsing flow
    Patient -->|"opens site on phone"| LangSelector
    LangSelector -->|"?lang= URL param"| Home
    Home --> Course
    Home --> KB
    Home -->|"opens in new tab"| MyChart
    Home -->|"opens in new tab"| MassThrive
    CDN -->|"serves all pages"| LangSelector

    %% Analytics
    Course -->|"page events"| Analytics
    KB -->|"page events"| Analytics
    Home -->|"language chosen"| Analytics

    %% SMS
    KB -->|"'Text us for help' link\nsms:+1XXXXXXXXXX"| SMS_Platform
    SMS_Platform --> SMS_Inbox
    SMS_Inbox -->|"responds to patient"| Navigator
    Navigator -->|"can also update content\nvia CMS if needed"| DecapCMS

    %% Styling
    classDef person fill:#1a5276,color:#fff,stroke:#0d2d47,rx:8
    classDef cms fill:#148f77,color:#fff,stroke:#0a5c48,rx:8
    classDef hosting fill:#2e86c1,color:#fff,stroke:#1a5276,rx:8
    classDef site fill:#1a5276,color:#fff,stroke:#0d2d47,rx:8
    classDef external fill:#784212,color:#fff,stroke:#4a2a0b,rx:8
    classDef analytics fill:#6c3483,color:#fff,stroke:#4a2360,rx:8
    classDef sms fill:#117a65,color:#fff,stroke:#0a5243,rx:8

    class Editor,Navigator,Patient person
    class DecapCMS,GitHub cms
    class CI,CDN,Identity hosting
    class LangSelector,Home,Course,KB site
    class MyChart,MassThrive external
    class Analytics analytics
    class SMS_Platform,SMS_Inbox sms
```

---

## How Each Layer Works

### 📝 Content Management (Decap CMS + GitHub)
Editors log into `/admin/` in their browser — no coding required. Decap CMS writes changes directly to GitHub as git commits. GitHub is the single source of truth for all text, pages, and media. No database, no server-side CMS.

### ☁️ Build & Hosting (Netlify or Vercel)
Every git push to `main` automatically triggers a rebuild and redeploy — usually live within 30–60 seconds. The site is served as static files from a global CDN, which means fast load times on mobile and no server to maintain. Netlify Identity (or equivalent) gates the `/admin/` route so only staff can edit content.

### 🌐 Patient-Facing Site
Pure HTML/CSS/JS. No login for patients. Language is passed as a URL parameter (`?lang=es`). The site works on any smartphone browser with no app install required.

### 📊 Analytics
A small script on each page tracks anonymous usage: which language is chosen, which topics are viewed, which challenges are started. **Privacy recommendation:** use a cookie-free tool (Plausible or Netlify Analytics) to avoid HIPAA complications with PII in analytics logs.

### 💬 SMS Support
Each Knowledge Base topic has a "Text us for help" link (`sms:` protocol) that opens the patient's native SMS app with the navigator's number pre-filled. The navigator receives and responds via an SMS platform dashboard. No backend needed on the site side.

---

*Last updated: April 2026 · Questions: Tianna Tagami, M.Ed.*
