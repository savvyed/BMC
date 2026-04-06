# BMC Digital Health Navigator
## Content Management System — Editor Guide

*April 2026 · For BMC and SavvyEd content staff*

---

## Table of Contents

1. [Overview](#1-overview)
2. [Accessing the CMS](#2-accessing-the-cms)
3. [Collections](#3-collections)
4. [Editing Challenge Content](#4-editing-challenge-content)
5. [Editing How-To Topics](#5-editing-how-to-topics)
6. [Adding and Updating Translations](#6-adding-and-updating-translations)
7. [What Not to Change](#7-what-not-to-change)
8. [How Publishing Works](#8-how-publishing-works)
9. [Full Schema Reference](#9-full-schema-reference)
10. [Getting Help](#10-getting-help)

---

## 1  Overview

The BMC Digital Health Navigator site uses Decap CMS — a browser-based content editor that lets you update text, steps, and scenario content without touching any code. Changes you save are published to the live site automatically, usually within 60 seconds.

The CMS manages two types of content:

- **Course Challenges** — the text that appears in each of the six learning challenges (Watch, Practice, and Do it steps), in all five languages.
- **How-To Topics** — the step-by-step instructions and topic titles that appear in the Knowledge Base and are also pulled into challenge Watch steps automatically.

> **Note:** The CMS does not manage videos, H5P interactions, or site layout. Those are handled separately by a developer.

---

## 2  Accessing the CMS

### 2.1  URL

Open the CMS in any browser at:

**https://tiny-hamster-9bcc46.netlify.app/admin/**

### 2.2  Logging in

1. Go to the URL above.
2. Click **Log in with Netlify Identity**.
3. Enter your email address and password. (If this is your first time, check your email for an invite from Netlify.)
4. You will land on the CMS dashboard.

> **First-time setup:** If you have not received a login invite, contact your site administrator. Only accounts approved in Netlify Identity can log in — the CMS is not accessible to the public.

### 2.3  Navigating the interface

Once logged in, you will see:

- **Sidebar** — the collection list. Click a collection name to open it.
- **Content area** — the list of items in the selected collection, or the editing form for a selected item.
- **Publish button** (top right) — or Save Draft for unpublished changes.

---

## 3  Collections

The CMS has two collections, shown in the left sidebar:

| Collection | What it contains | How often updated |
|---|---|---|
| Course Challenges | Text for all 6 challenges × 5 languages — headings, scenario text, checklist items, progress labels, and video captions. | Regularly during content development |
| How-To Topics | Step-by-step instructions for ~28 topics across 7 categories. Shown in the Knowledge Base and pulled into challenge Watch steps. | Regularly during content development |

---

## 4  Editing Challenge Content

### 4.1  Opening a challenge

1. Click **Course Challenges** in the left sidebar.
2. Click the challenge you want to edit, e.g. *Challenge 2: Join a video visit*.
3. The editing form opens. Each challenge has five language sections: English, Español, Português, Kreyòl ayisyen, and 中文. English is expanded by default; other languages are collapsed.
4. Click a language section header to expand it.

### 4.2  Field reference — one challenge

Every challenge has the same set of fields, organised by step. The table below describes each field, what it does, and where it appears on screen.

| Field name | Where it appears | Notes |
|---|---|---|
| **Page title** | Browser tab and page header bar | Example: Challenge 02 — Join a video visit |
| **Watch — progress label** | Small text directly above the main heading on Step 1 | Example: Step 1 of 3 — Watch |
| **Watch — main heading** | Large H1 heading above the video on Step 1 | Example: How to join a video visit on your phone |
| **Watch — video caption** | Text shown on the video placeholder until the real video is added | Briefly describes what the video covers |
| **Practice — progress label** | Small text above the heading on Step 2 | Example: Step 2 of 3 — Practice |
| **Practice — main heading** | Large heading on Step 2 | Names the character and the task they need help with |
| **Practice — scenario, sentence 1** | First sentence of the character intro on Step 2 | Describes the character's situation. End with a period. |
| **Practice — scenario, sentence 2** | Second sentence of the character intro on Step 2 | Tells the patient what to help the character do. End with a period. |
| **Do it — progress label** | Small text above the heading on Step 3 | Example: Step 3 of 3 — Do it on your phone |
| **Do it — main heading** | Large heading on Step 3 | Example: Now try it on your own MyChart |
| **Do it — intro text** | Short sentence shown above the checklist on Step 3 | Example: Open MyChart on your phone and follow these steps: |
| **Checklist — item 1, item 2, …** | Individual checkbox items the patient checks off on Step 3 | Start each item with a verb: Tap, Open, Enter, Find... |

### 4.3  Saving and publishing

1. Make your edits in the form fields.
2. Click **Save draft** to save without publishing, or **Publish** to save and push the change to the live site.
3. After publishing, Netlify automatically rebuilds and redeploys the site. This takes approximately 30–60 seconds. Refresh the live site to see your changes.

> **Tip:** Use Save draft while you are still reviewing or getting translations approved. Publish only when the content is final.

---

## 5  Editing How-To Topics

### 5.1  Opening a topic

1. Click **How-To Topics** in the left sidebar.
2. Click **All Topics**.
3. Expand the **Topic catalog** section, then expand the category you want to edit (e.g. *Video visits*).
4. Find the topic in the **Topics in this category** list and click **Edit**.

### 5.2  Field reference — one topic

| Field name | Where it appears | Notes |
|---|---|---|
| **Title** | Topic page heading in the Knowledge Base, and as the label in the challenge Watch step | Plain language. Example: Join a video visit on your phone |
| ⚠️ **URL identifier** | Used in page links throughout the site | ⚠️ Do not change. Changing this will break links in the Knowledge Base and in challenge pages. |
| **Step-by-step instructions** | Numbered list on the topic page and in the challenge Watch step | Each item has two sub-fields: a step instruction and an optional video URL (see below). |

#### Step sub-fields

Each step in the list has two fields:

| Sub-field | Required | Notes |
|---|---|---|
| **Step instruction** | Yes | One instruction per step. Start with a verb: Tap, Open, Enter, Find... |
| **Video URL (optional)** | No | Paste the full URL of the video that goes with this step. Leave blank if the step has no video. A video placeholder will appear on the page automatically when a URL is present. |

### 5.3  Adding and removing steps

Each topic's step list has Add step and remove (×) controls in the CMS. Steps can also be dragged to reorder them.

- Click **Add step** to add a new step at the bottom of the list. Each step shows a "Step instruction" field and a "Video URL (optional)" field.
- Click the **×** icon next to any step to remove it.
- Drag the handle (**⠿**) on any step to change its order.

> **Remember:** How-To Topics are a shared content pool. When you edit a topic here, the change appears in **both** the Knowledge Base topic page **and** in the corresponding challenge Watch step automatically. You only need to edit it once.

---

## 6  Adding and Updating Translations

### 6.1  How language fallback works

If a field in a non-English language section is left blank, the site automatically falls back to the English text for that field. This means partial translations are safe — patients will see English for any untranslated fields rather than a blank or broken page.

### 6.2  Adding a translation

1. Open the challenge or topic you want to translate.
2. Click the language section header (e.g. *Español*) to expand it.
3. Fill in each field with the translated text. Leave a field blank if the translation is not yet ready.
4. Click **Publish** when the translation is approved.

> **Translation scope:** The How-To Topics catalog does not currently have per-language fields. Topic step text is in English only and displayed to all patients. Full translation of topics is planned for a future phase.

### 6.3  Supported languages

| Language | Code | Status in prototype |
|---|---|---|
| English | en | Complete |
| Español | es | Partial — to be completed |
| Português | pt | Placeholder — to be completed |
| Kreyòl ayisyen | ht | Placeholder — to be completed |
| 中文 | zh | Placeholder — to be completed |

---

## 7  What Not to Change

Some fields in the CMS are technical identifiers that must stay unchanged. Editing them will break links or cause content to disappear from the site.

| Field | Where | Why it must not change |
|---|---|---|
| ⚠️ URL identifier | Any topic in How-To Topics | Used in URLs throughout the site. Changing it breaks Knowledge Base and challenge page links. |
| ⚠️ Challenge topic refs | Not shown in CMS — developer-managed only | Controls which topics appear in each challenge Watch step. Contact your developer to make changes. |

> **When in doubt:** If you are unsure whether a change is safe, save as a draft and check with your developer before publishing.

---

## 8  How Publishing Works

When you click **Publish** in the CMS, the following happens automatically:

| Step | What happens | Time |
|---|---|---|
| 1 | Decap CMS saves your changes as a commit to the GitHub repository. | Instant |
| 2 | Netlify detects the new commit and starts a site rebuild. | ~5 seconds |
| 3 | The updated site is built and deployed to Netlify's global CDN. | ~30–60 seconds |
| 4 | Patients loading the site anywhere in the world see the new content. | Immediately after step 3 |

There is no separate deploy step — publishing in the CMS and going live are the same action. Use **Save draft** if you need to review before making a change public.

---

## 9  Full Schema Reference

### Challenge 0: Set up your email

*File: `content/challenge-0.json` · Languages: en, es, pt, ht, zh*

| Field | Widget | Languages |
|---|---|---|
| Page title | string | All 5 |
| Watch — progress label | string | All 5 |
| Watch — main heading | string | All 5 |
| Watch — video caption | string | All 5 |
| Practice — progress label | string | All 5 |
| Practice — main heading | string | All 5 |
| Practice — scenario, sentence 1 | string | All 5 |
| Practice — scenario, sentence 2 | string | All 5 |
| Do it — progress label | string | All 5 |
| Do it — main heading | string | All 5 |
| Do it — intro text | string | All 5 |
| Checklist — item 1 | text (multi-line) | All 5 |
| Checklist — item 2 | text (multi-line) | All 5 |
| Checklist — item 3 | text (multi-line) | All 5 |
| Checklist — item 4 | text (multi-line) | All 5 |

### Challenge 1: Set up MyChart

*File: `content/challenge-01.json` · Languages: en, es, pt, ht, zh*

| Field | Widget | Languages |
|---|---|---|
| Page title | string | All 5 |
| Watch — progress label | string | All 5 |
| Watch — main heading | string | All 5 |
| Watch — video caption | string | All 5 |
| Practice — progress label | string | All 5 |
| Practice — main heading | string | All 5 |
| Practice — scenario, sentence 1 | string | All 5 |
| Practice — scenario, sentence 2 | string | All 5 |
| Do it — progress label | string | All 5 |
| Do it — main heading | string | All 5 |
| Do it — intro text | string | All 5 |
| Checklist — item 1 | text (multi-line) | All 5 |
| Checklist — item 2 | text (multi-line) | All 5 |
| Checklist — item 3 | text (multi-line) | All 5 |
| Checklist — item 4 | text (multi-line) | All 5 |
| Checklist — item 5 | text (multi-line) | All 5 |
| Checklist — item 6 | text (multi-line) | All 5 |
| Checklist — item 7 | text (multi-line) | All 5 |
| Checklist — item 8 | text (multi-line) | All 5 |

### Challenge 2: Join a video visit

*File: `content/challenge-02.json` · Languages: en, es, pt, ht, zh*

| Field | Widget | Languages |
|---|---|---|
| Page title | string | All 5 |
| Watch — progress label | string | All 5 |
| Watch — main heading | string | All 5 |
| Watch — video caption | string | All 5 |
| Practice — progress label | string | All 5 |
| Practice — main heading | string | All 5 |
| Practice — scenario, sentence 1 | string | All 5 |
| Practice — scenario, sentence 2 | string | All 5 |
| Do it — progress label | string | All 5 |
| Do it — main heading | string | All 5 |
| Do it — intro text | string | All 5 |
| Checklist — item 1 | text (multi-line) | All 5 |
| Checklist — item 2 | text (multi-line) | All 5 |
| Checklist — item 3 | text (multi-line) | All 5 |
| Checklist — item 4 | text (multi-line) | All 5 |
| Checklist — item 5 | text (multi-line) | All 5 |

### Challenge 3: Common tasks

*File: `content/challenge-03.json` · Languages: en, es, pt, ht, zh*

| Field | Widget | Languages |
|---|---|---|
| Page title | string | All 5 |
| Watch — progress label | string | All 5 |
| Watch — main heading | string | All 5 |
| Watch — video caption | string | All 5 |
| Practice — progress label | string | All 5 |
| Practice — main heading | string | All 5 |
| Practice — scenario, sentence 1 | string | All 5 |
| Practice — scenario, sentence 2 | string | All 5 |
| Do it — progress label | string | All 5 |
| Do it — main heading | string | All 5 |
| Do it — intro text | string | All 5 |
| Checklist — item 1 | text (multi-line) | All 5 |
| Checklist — item 2 | text (multi-line) | All 5 |
| Checklist — item 3 | text (multi-line) | All 5 |
| Checklist — item 4 | text (multi-line) | All 5 |
| Checklist — item 5 | text (multi-line) | All 5 |

### Challenge 4: Family account access

*File: `content/challenge-04.json` · Languages: en, es, pt, ht, zh*

| Field | Widget | Languages |
|---|---|---|
| Page title | string | All 5 |
| Watch — progress label | string | All 5 |
| Watch — main heading | string | All 5 |
| Watch — video caption | string | All 5 |
| Practice — progress label | string | All 5 |
| Practice — main heading | string | All 5 |
| Practice — scenario, sentence 1 | string | All 5 |
| Practice — scenario, sentence 2 | string | All 5 |
| Do it — progress label | string | All 5 |
| Do it — main heading | string | All 5 |
| Do it — intro text | string | All 5 |
| Checklist — item 1 | text (multi-line) | All 5 |
| Checklist — item 2 | text (multi-line) | All 5 |
| Checklist — item 3 | text (multi-line) | All 5 |
| Checklist — item 4 | text (multi-line) | All 5 |
| Checklist — item 5 | text (multi-line) | All 5 |
| Checklist — item 6 | text (multi-line) | All 5 |

### Challenge 5: Find community resources

*File: `content/challenge-05.json` · Languages: en, es, pt, ht, zh*

| Field | Widget | Languages |
|---|---|---|
| Page title | string | All 5 |
| Watch — progress label | string | All 5 |
| Watch — main heading | string | All 5 |
| Watch — video caption | string | All 5 |
| Practice — progress label | string | All 5 |
| Practice — main heading | string | All 5 |
| Practice — scenario, sentence 1 | string | All 5 |
| Practice — scenario, sentence 2 | string | All 5 |
| Do it — progress label | string | All 5 |
| Do it — main heading | string | All 5 |
| Do it — intro text | string | All 5 |
| Checklist — item 1 | text (multi-line) | All 5 |
| Checklist — item 2 | text (multi-line) | All 5 |
| Checklist — item 3 | text (multi-line) | All 5 |
| Checklist — item 4 | text (multi-line) | All 5 |
| Checklist — item 5 | text (multi-line) | All 5 |
| Checklist — item 6 | text (multi-line) | All 5 |
| Checklist — item 7 | text (multi-line) | All 5 |

### How-To Topics

*File: `content/topics.json` · Languages: en only (translations planned)*

| Field | Widget | Languages |
|---|---|---|
| Setting up your email — Title | string | English only |
| Setting up your email — URL identifier | ⚠️ Do not change | — |
| Setting up your email — Steps (instruction + video URL per step) | list of objects (instruction + optional video URL per step) | English only |
| Setting up MyChart — Title | string | English only |
| Setting up MyChart — URL identifier | ⚠️ Do not change | — |
| Setting up MyChart — Steps (instruction + video URL per step) | list of objects (instruction + optional video URL per step) | English only |
| Video visits — Title | string | English only |
| Video visits — URL identifier | ⚠️ Do not change | — |
| Video visits — Steps (instruction + video URL per step) | list of objects (instruction + optional video URL per step) | English only |
| Medications and refills — Title | string | English only |
| Medications and refills — URL identifier | ⚠️ Do not change | — |
| Medications and refills — Steps (instruction + video URL per step) | list of objects (instruction + optional video URL per step) | English only |
| Appointments — Title | string | English only |
| Appointments — URL identifier | ⚠️ Do not change | — |
| Appointments — Steps (instruction + video URL per step) | list of objects (instruction + optional video URL per step) | English only |
| Messages and your records — Title | string | English only |
| Messages and your records — URL identifier | ⚠️ Do not change | — |
| Messages and your records — Steps (instruction + video URL per step) | list of objects (instruction + optional video URL per step) | English only |
| Community resources — Title | string | English only |
| Community resources — URL identifier | ⚠️ Do not change | — |
| Community resources — Steps (instruction + video URL per step) | list of objects (instruction + optional video URL per step) | English only |

---

## 10  Getting Help

For questions about content and editorial decisions, contact Tianna Tagami.
For technical issues with the CMS or site, contact your developer.

| Issue | Who to contact |
|---|---|
| CMS login problems | Site administrator / developer |
| Content question — what to write | Tianna Tagami, M.Ed. |
| Translation question | Tianna Tagami, M.Ed. |
| Topic or challenge not showing correctly | Developer |
| Want to add a new challenge or topic | Developer |
| URL identifier accidentally changed | Developer — revert immediately |

---

*BMC Digital Health Navigator · CMS Editor Guide · April 2026*
