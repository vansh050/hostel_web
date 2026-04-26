# Learning Journal

This file tracks the user's web dev + GenAI learning journey. Read this at the start of every session to pick up where we left off.

**Learner:** Pratik — hostel owner in Ranchi, strong DSA, newbie to dev
**Time budget:** ~6 hours/week
**Stack path:** Python + Flask (primary) → Node.js (middle) → GenAI projects
**Training ground:** The hostel website in this repo (Next.js frontend + Python/Flask backend)

---

## Roadmap — "Expanded Hostel Ecosystem" (locked 2026-04-24)

**User's goal:** Deep mastery of backend architecture, system design, and GenAI (LLMs + RAG).
**Approach:** One coherent layered project (NOT separate projects) that grows with each phase.
**Pace:** 6 hrs/week.
**Target completion:** ~November 2026 (~6-7 months from kickoff).

Architecture growing across phases:
```
🌐 Next.js website
🔌 Flask API gateway (middleware, auth)
💾 Postgres DB + Redis cache
🧵 Celery background jobs
🤖 GenAI services (chatbot, RAG, agents, WhatsApp)
📊 Admin dashboard
```

### Phase 1 — Web App Foundation (~1.5 weeks remaining)
- [x] **M1:** Lead-capture Flask API ✅ COMPLETE 2026-04-23
- [x] **M2:** Connect Next.js frontend to Flask backend ✅ COMPLETE 2026-04-26 — popup modal on Call/WhatsApp buttons captures name+phone, POSTs to Flask, opens tel:/wa.me on success. CORS solved via flask-cors (first middleware encounter). Validation (10-digit phone, 2+ char name) + loading state + error banner + state reset.
- [ ] **M3 (was M7):** Deploy Flask backend + Next.js frontend LIVE on the internet (Vercel + Render/Railway free tiers)

🎯 **Phase 1 checkpoint:** Site live at your own domain, capturing real leads (May 2026)

### Phase 2 — Backend Deep Dive (~3 weeks)
- [ ] Middleware (Flask `@before_request`, `@after_request`, error handlers)
- [ ] Custom middleware from scratch — request logger, rate limiter, simple auth
- [ ] JWT authentication for admin endpoints
- [ ] Rate limiting (Flask-Limiter)
- [ ] Structured logging (stdlib `logging` + JSON formatter)
- [ ] Proper error handling — 4xx vs 5xx, consistent error shape
- [ ] Input validation (marshmallow or pydantic)

🎯 **Phase 2 checkpoint:** Hardened backend with login, rate limits, logs (June 2026)

### Phase 3 — Database + System Design (~5 weeks)
- [ ] PostgreSQL install + basics (SQL review)
- [ ] SQLAlchemy ORM — models, relationships, queries
- [ ] Alembic migrations
- [ ] Schema design for: hostels, rooms, bookings, leads, users, remarks
- [ ] Data migration from Google Sheets → Postgres
- [ ] Redis for caching hot queries
- [ ] Indexes, EXPLAIN plans, N+1 problem
- [ ] Observability basics: request logs, latency metrics, Sentry for errors

🎯 **Phase 3 checkpoint:** Real DB with relational schema + caching (July 2026)

### Phase 4 — Distributed Systems (~4 weeks)
- [ ] Celery + Redis as message broker
- [ ] Async tasks (send WhatsApp confirmation, generate reports)
- [ ] Scheduled jobs via Celery Beat (daily unactioned leads digest, weekly reports)
- [ ] Retry policies, dead-letter queues
- [ ] Monitoring: Prometheus-style metrics or simpler (Grafana Cloud free tier)
- [ ] Idempotency and eventual consistency concepts

🎯 **Phase 4 checkpoint:** Background jobs running, auto-reports to you (August 2026)

### Phase 5 — GenAI Deep Dive (~8 weeks) — THE BIG ONE
- [ ] LLM API basics: Claude/OpenAI/Gemini client libraries
- [ ] Prompt engineering — system prompts, few-shot, structured output
- [ ] Simple chatbot on hostel site (answers generic questions)
- [ ] Function calling / tool use — chatbot can query hostel data live
- [ ] Embeddings: what they are, OpenAI/Cohere/local models
- [ ] Vector DB: Chroma (local) first, then Pinecone/Weaviate
- [ ] **RAG pipeline** — chunking strategies, retrieval quality, re-ranking
- [ ] RAG over hostel policy docs, rental agreements, FAQs
- [ ] Agent loops — multi-step reasoning, planner + executor pattern
- [ ] Evaluation: how to know your RAG is good (golden datasets, LLM-as-judge)
- [ ] Guardrails: prompt injection defense, PII filtering
- [ ] WhatsApp Business API integration — webhook handler + AI auto-reply

🎯 **Phase 5 checkpoint:** AI-powered hostel site with chatbot, RAG, WhatsApp agent (October 2026)

### Phase 6 — Productization (~2-3 weeks)
- [ ] Admin dashboard (new Next.js app) — view leads, AI insights, analytics
- [ ] AI-generated daily summary on dashboard
- [ ] Role-based access (you vs staff)
- [ ] Polish, bug bash, documentation

🎯 **Phase 6 checkpoint: FULL PRODUCT DONE (November 2026)** 🏆

---

**Total: ~135 hours = ~24 weeks (6-7 months at 6 hrs/week)**

**Middleware teaching plan** (woven across phases):
- M2: First touch — `flask-cors` as example of middleware (~5 min)
- Phase 2: Custom middleware deep-dive (logger, rate limiter, auth)
- Phase 2 → optional Express detour: middleware as core architecture

---

## Session log

### Session 1 — 2026-04-22
**Status:** Phase 1, Milestone 1 in progress.

**Decisions made:**
- Python + Flask for backend
- Next.js existing site will become the frontend that calls the backend
- 6 hrs/week
- Learn-by-doing style: user types code, AI guides + explains
- First real feature = lead capture system (popup when user clicks Call/WhatsApp → POST to Flask → write to Google Sheets). 3 sheet tabs for Muskan/Sanskriti/Sankalp hostels with columns: time, name, phone, action, actioned?, remarks.

**Completed:**
- ✅ **M1.1** — Created `backend/` folder, set up Python 3.11 venv at `backend/venv/`, activated it. Verified `python --version` = 3.11.9 inside venv.
- ✅ Updated `.gitignore` to exclude `backend/venv/`, Python caches, and future credentials/secrets.
- ✅ **M1.2** — Installed Flask 3.1.3 in venv. Wrote first `app.py` with two routes: `GET /` (health check) and `GET /hostels` (list of 3 hostel names). Fixed initial typo `--name--` → `__name__`. No errors.
- ✅ Fixed PyCharm interpreter to point at `backend/venv/Scripts/python.exe` (not Anaconda's 3.10).
- ✅ Learned: `mkdir` makes folders not files — use IDE "New File" for files; venv isolation means global installs don't count; dunder `__name__` is a built-in Python variable.

- ✅ **M1.3** — Ran `python app.py`, visited `http://localhost:5000/` and `/hostels` in browser, saw JSON responses. First real web server running end-to-end.
- ✅ **M1.4** — Built `POST /lead` endpoint with full validation: missing fields, unknown hostel allowlist, unknown action allowlist, non-JSON body rejection. Proper 400/201 status codes. Wrote `backend/test_api.py` using the `requests` library with 7 test cases — all passing. PyCharm Community Edition doesn't have built-in HTTP Client (Pro-only), so went with Python `requests` — better learning anyway.
- ✅ **M1.5** — Lead capture is now LIVE. Set up Google Cloud project `lalpur-hostels-backend`, enabled Sheets + Drive APIs, created service account `hostel-bot` with JSON key stored in `backend/credentials.json` (gitignored). Shared sheet with service account as Editor. Installed `gspread` + `python-dotenv`. Created `backend/.env` with `SHEET_ID`. Wrote `backend/sheets.py` module with `append_lead()` helper using `Credentials.from_service_account_file` + `gspread.open_by_key` + `worksheet.append_row`. Replaced `print(...)` in `capture_lead()` with `sheets.append_lead(...)`. Tested with inline `python -c` command — real row appeared in Muskan Girls Hostel tab with all 6 columns populated (timestamp, name, phone, action, "NotActioned" default, empty remarks).

- ✅ **M1.6** — Final verification pass. Extended `test_api.py` from 7 to 9 tests by adding valid-lead cases for Sanskriti (Priya Kumari) and Sankalp (Amit Raj). All 9 tests green. Rows verified in all 3 sheet tabs (Muskan / Sanskriti / Sankalp). No failing test creates a row (wrong hostel and invalid action bail early with 400 before reaching `sheets.append_lead`).

### 🏆 M1 COMPLETE (2026-04-23)

**Lead capture system summary:**
- Flask backend with `GET /`, `GET /hostels`, `POST /lead` endpoints
- Validation allowlist for 3 hostels + 2 actions (call/whatsapp)
- Writes timestamped row to correct Google Sheet tab with `NotActioned` default
- Service account + JSON credentials (gitignored) for secure auth
- `.env` file for config (SHEET_ID), gitignored
- 9 automated test cases via `test_api.py`
- Clean separation: `app.py` (HTTP layer) + `sheets.py` (data layer)

**Files in `backend/`:**
```
app.py              — HTTP routes + validation
sheets.py           — Google Sheets integration
test_api.py         — 9 automated tests
requirements.txt    — Flask, gspread, python-dotenv, requests, + deps
.env                — SHEET_ID (gitignored)
credentials.json    — service account key (gitignored)
venv/               — Python 3.11 venv (gitignored)
```

**What's next (M2 — tomorrow):** Connect Next.js frontend to Flask backend. Build a lead-capture popup component that intercepts Call/WhatsApp button clicks, collects name+phone, POSTs to `/lead`, then opens the actual `tel:` or `wa.me/...` URL. Introduces: React `useState`, controlled forms, `fetch`/`axios`, **CORS + middleware concept** (user explicitly asked to learn middleware). See "Middleware teaching plan" at top of file for how middleware is woven across Phase 1-2.

### Session 4 — 2026-04-25 (partial)
**Status:** M2.2 nearly done — Build error resolved, awaiting visual confirmation that all 4 buttons trigger modal.

**Completed:**
- ✅ Created `src/components/HostelContactButtons.tsx` — client component with `useState<"call" | "whatsapp" | null>(null)`, `variant` prop ("header" | "sidebar"), conditional Tailwind classes per variant, renders 2 buttons + LeadCaptureModal as fragment.
- ✅ All 3 edits to `src/app/hostel/[id]/page.tsx`:
  - Edit 1 (line 18): import added
  - Edit 2 (line 221): sticky header buttons replaced with `<HostelContactButtons variant="header" />`
  - Edit 3 (line 342): sidebar booking buttons replaced with `<HostelContactButtons variant="sidebar" />`
  - Staff contact list (line 349 onwards) untouched per Option A choice.
- ✅ Debugged 2 real-world errors via Next.js build error screen:
  - "Module not found" (HostelContactButtons.tsx had not been created — gave them code, they pasted it)
  - "Unterminated string constant" (long className string was broken across lines — fixed by joining lines)
- ✅ Taught: how to find code to change in a real codebase (`grep` for unique strings like `tel:`/`wa.me`, read context, map to UI), why strings can't span lines without backticks/concat, why "Module not found" means the file doesn't physically exist where the import says.

**Resume from here next session:** Have user verify all 4 buttons (top header WhatsApp+Call, sidebar Book via WhatsApp + Call to book) trigger modal with correct hostel name. If yes → mark M2.2 complete, move to M2.3 (form validation). If no → debug the failing button.

### Session 3 — 2026-04-24 (partial)
**Status:** M2 started. M2.1 complete.

**Decisions made:**
- Option A chosen for lead capture scope: ONLY hostel detail page buttons (sticky top + booking sidebar) trigger modal. Floating WhatsApp + individual staff phone links stay direct. Reason: reduce friction fatigue, capture at high-intent moments.

**Completed:**
- ✅ **M2.1** — Built `src/components/LeadCaptureModal.tsx` — a React client component with props (isOpen, onClose, hostelName, action), useState for name+phone, controlled inputs, backdrop click-to-close, X button, ternary for Call vs WhatsApp icon (Phone/MessageCircle from lucide-react), form submit placeholder (`console.log("TODO: submit", ...)`). Built temporary test page at `src/app/test-modal/page.tsx` with Test Call / Test WhatsApp buttons. Verified in browser at http://localhost:3000/test-modal — modal opens, state flows (typed text appears in inputs), icons switch, backdrop closes, all 4 initial typos fixed (lucide-react casing, curly braces in JSX interp, `Phone` vs `phone` shadowing, `e.target` typo).
- Debugged 4 common React/JSX typos live via the Next.js build-error page — user learned the error-driven development workflow.

**What's next (M2.2 tomorrow):** Delete the test page, then wire the modal into the actual hostel detail page (`src/app/hostel/[id]/page.tsx`). That page has 2 sets of Call/WhatsApp buttons (sticky top header + booking sidebar) — both need to open the modal with correct hostel context + action. Will need to make the page a client component (add `"use client"`) or split into client+server parts.

**Known polish items (fix later):**
- Line 22: `"call"` should be `"Call"` for consistent capitalization in button label.
- Indentation in LeadCaptureModal.tsx is slightly inconsistent — run Ctrl+Alt+L to auto-format.

### How to resume next session (READ THIS FIRST)

**User's opening message will be something like** *"let's continue"* / *"resume"* / *"what were we doing"*.

**What to do, in order:**

1. **Read this whole journal file.** The checklists + "What's next" tell you where we are.
2. **Verify the environment is still healthy** before resuming:
   ```bash
   ls "E:/HOTEL WEB/backend/"   # should show: app.py, sheets.py, test_api.py, requirements.txt, venv, .env, credentials.json
   ls "E:/HOTEL WEB/src/"       # should show the Next.js app
   ```
3. **Warmly greet the user and recap in one line** what they finished last session + what's next. Don't re-explain things they already learned (check "Concepts learned" below before explaining any term).
4. **Start M2** — Frontend integration (Next.js → Flask). Plan:
   - M2.1: Build lead-capture popup component with React `useState`
   - M2.2: Wire Call/WhatsApp buttons to open popup
   - M2.3: Controlled form (name + phone) with client-side validation
   - M2.4: POST to Flask `/lead` via `fetch` or `axios`
   - M2.5: **Enable CORS** on Flask (`pip install flask-cors`) — this is where we introduce **middleware concept** (user explicitly asked to learn this)
   - M2.6: On success → open `tel:` or `wa.me/` URL
   - M2.7: End-to-end test in browser
   - M2.8: UX polish (loading state, error toast)

**For the user — how to get your machine back to working state:**

1. Open PyCharm → `E:\HOTEL WEB` project
2. Verify bottom-right shows `Python 3.11 (HOTEL WEB)` (the venv). If not, point it back at `E:\HOTEL WEB\backend\venv\Scripts\python.exe`.
3. Open PyCharm's built-in terminal (bottom → Local tab). Should show `(venv)`. If not:
   ```bash
   cd "E:/HOTEL WEB/backend"
   venv\Scripts\Activate.ps1    # PowerShell — or: source venv/Scripts/activate for bash
   ```
4. Sanity check the backend still works:
   - Terminal 1: `python app.py` (leave running)
   - Terminal 2 (new one via `+`): `python test_api.py` — all 9 tests should pass
5. For Next.js dev server (we'll use this in M2):
   - New terminal at repo root (`E:\HOTEL WEB`) — NOT inside backend
   - `npm run dev` — starts Next.js on `http://localhost:3000`
   - Flask will still be on `:5000`; both run in parallel

---

## Current state of code (as of end of Session 2 — M1 complete)

### `backend/app.py`
Three routes: `GET /`, `GET /hostels`, `POST /lead`. `/lead` validates 4 required fields, allowlists 3 hostels + 2 actions (call/whatsapp), returns proper 400 for bad input, 201 for success. On success calls `sheets.append_lead(hostel, name, phone, action)` which writes a row to the matching sheet tab.

### `backend/sheets.py`
Google Sheets module. `_get_client()` caches an authorized `gspread` client using `credentials.json`. `append_lead(hostel, name, phone, action)` opens sheet by `SHEET_ID` from env, selects worksheet by hostel name, appends `[timestamp, name, phone, action, "NotActioned", ""]`.

### `backend/test_api.py`
9 test cases using `requests`: health, hostel list, valid Muskan lead, missing fields, wrong hostel, invalid action, not-JSON, valid Sanskriti lead, valid Sankalp lead. All 9 passing as of end of Session 2.

### `backend/requirements.txt`
Flask, requests, gspread, python-dotenv, google-auth (+ transitive deps).

### `backend/.env` (gitignored)
`SHEET_ID=1qmeTKsc5p3epssvdU9RImPVTTWddoLf_Dk3GwcCOJNE`

### `backend/credentials.json` (gitignored)
Google service account JSON key. Robot email: `id-hostel-bot@lalpur-hostels-backend.iam.gserviceaccount.com`. Shared with sheet as Editor.

### `backend/venv/` (gitignored)
Python 3.11.9 venv with everything installed.

### Next.js frontend (existing from before our work)
Lives at repo root — `src/app/`, `src/components/`, `src/data/hostels.ts`. Runs with `npm run dev` → `localhost:3000`. In M2 we'll add a lead-capture modal + wire it to Call/WhatsApp buttons.

### Google Sheet
`lalpur hostels sheet` at sheet ID above. 3 tabs: `Muskan Girls Hostel`, `Sanskriti Girls Hostel`, `Sankalp Boys Hostel`. Each tab: 6 columns (Timestamp, Name, Phone, Action, Actioned, Remarks). Column E has dropdown validation: `Actioned` / `NotActioned` / `some other issue`. Backend writes `NotActioned` as default.

---

## Concepts learned (vocabulary Pratik now knows — DO NOT re-teach these)

**From Session 1:**
- **Virtual environment (venv)** — per-project private toolbox for Python packages; keeps versions from conflicting across projects.
- **`pip`** — Python's package installer; installs into the active venv.
- **Activating a venv** — switches your terminal to use the project's private toolbox. Visible by `(venv)` prefix on the prompt.
- **`.gitignore`** — tells git to ignore certain paths. Use for anything big, machine-specific, re-generatable, or secret.
- **`**/` wildcard in .gitignore** — matches any depth of nested folders.
- **Secrets rule** — never commit `.env`, credentials, or API keys. Once pushed, assume leaked forever; rotate the credential.
- **`mkdir` makes folders, not files** — use IDE's "New File" option for files; `touch` (bash) or `New-Item` (PowerShell) from terminal.
- **Dunder `__name__`** — Python built-in variable. Equals `"__main__"` when file is run directly, the module name when imported.
- **Flask basics** — `@app.route("/path")` decorator registers a URL → function mapping. Return a dict and Flask auto-JSONs it. `app.run(debug=True, port=5000)` starts a dev server.
- **`localhost` / `127.0.0.1`** — "this very computer". **Port** — a numbered "door" on the machine; one program per port.
- **HTTP methods** — GET reads (data in URL), POST creates (data in body). PUT, PATCH, DELETE exist too.
- **HTTP status codes** — 200 OK, 201 Created, 400 Bad Request, 404 Not Found, 405 Method Not Allowed, 500 Internal Server Error.
- **Request body** — the data chunk sent with POST/PUT. `request.get_json(silent=True)` in Flask parses it safely.
- **`jsonify()` + status tuple** — `return jsonify({...}), 201` is Flask's way to set JSON body + HTTP status.
- **Input validation** — never trust client data; always check presence of fields, allowlist known values (use `set` for O(1) membership check).
- **`requests` library (Python)** — HTTP client for making requests from Python code. `.get(url)`, `.post(url, json={...})`. Pass `json=` (not `data=`) to auto-serialize + set Content-Type header.
- **`python -c "..."`** — run a one-off Python command inline without creating a file. Use `;` to separate statements. Good for quick debugging; use `.py` files for real scripts.
- **Separation of concerns** — split logic into modules (`app.py` = HTTP layer, `sheets.py` = data layer). Caller uses the module without knowing its internals.
- **`__file__`** — Python built-in = path to the current `.py` file. Useful to build paths relative to a module (e.g., `os.path.dirname(os.path.abspath(__file__))`).
- **Module-level caching with `global`** — declare a variable at module scope as `None`, initialize on first use, reuse thereafter. Avoids expensive re-auth on every call. Leading `_` = convention for "private, don't touch".
- **Environment variables + `.env`** — store config/secrets outside code. `load_dotenv()` (from `python-dotenv`) reads `.env` and populates `os.environ`. `os.environ["KEY"]` reads a value. Platform deploys work the same way — just set env vars in the platform's UI.
- **`python-dotenv` vs `dotenv`** — install name is `python-dotenv`, import name is `dotenv`. Common mismatch pattern in Python libraries.
- **Service account (Google Cloud)** — a robot Google user with its own email + JSON credentials. Used by backend code to access Google services (Sheets, Drive, etc.) without using your personal account. Principle of least privilege — share only specific resources with it.
- **Scopes** — permission tags in OAuth. We requested `spreadsheets` + `drive` scopes — robot can only do those things.
- **`gspread` library** — Python wrapper around Google Sheets API. `open_by_key(id)` → spreadsheet, `.worksheet(name)` → tab, `.append_row([...])` → new row at bottom.
- **ConnectionError vs 500** — ConnectionError = nothing listening; 500 = server up but crashed. Fundamentally different diagnoses.
- **`Ctrl+Alt+L` in PyCharm** — auto-format code to PEP 8 style.
- **Debug mode auto-reload** — `debug=True` makes Flask restart when you save `app.py`.

---

## Code the user has written (and why)

- **`backend/app.py`** — First Flask app. Teaches: routes, decorators, JSON return, POST vs GET, validation, status codes, sets for allowlists, f-strings, dict `.get()` for safe key access, list comprehensions for filtering.
- **`backend/test_api.py`** — API test harness using `requests`. Teaches: `requests.get`/`post`, `json=` parameter, `response.status_code` / `response.json()`, running a second terminal to call a server without stopping it.
- **`backend/requirements.txt`** — Generated by `pip freeze`. Teaches: reproducibility — anyone can `pip install -r requirements.txt` to rebuild the exact venv.
- **Root `.gitignore`** — Added Python section (venv, __pycache__, credentials). Teaches: what to keep out of git and why.
- **`backend/sheets.py`** — Google Sheets integration module. Teaches: module separation, credentials loading, module-level caching, `gspread` API, column-to-list mapping on `append_row`.
- **`backend/.env`** — Environment config file (gitignored). Teaches: secrets vs code, `SHEET_ID` as config, industry standard for deploy platforms.
- **`backend/credentials.json`** — Google service account JSON key (gitignored). Teaches: what enterprise auth credentials look like, treating files as passwords.

---

## M1.5 playbook (for next session — for AI to follow, not for user to read now)

1. Ask user to create a Google Sheet at sheets.google.com called "Lalpur Hostels Leads" with 3 tabs named exactly:
   - `Muskan Girls Hostel`
   - `Sanskriti Girls Hostel`
   - `Sankalp Boys Hostel`
   Header row on each tab: `Timestamp | Name | Phone | Action | Actioned? | Remarks`.
2. Walk through Google Cloud Console: create project → enable **Google Sheets API** + **Google Drive API** → IAM → Service Accounts → Create → Keys → Add Key → JSON → download.
3. Save JSON as `backend/credentials.json` (already gitignored).
4. Share the Google Sheet with the service account's email (find it in the JSON file under `client_email`) — give Editor access.
5. `pip install gspread` → `pip freeze > requirements.txt`.
6. Modify `app.py`: add helper that opens sheet by name, selects tab by hostel, appends a row `[timestamp, name, phone, action, "No", ""]`. Replace the `print(...)` in `capture_lead()`.
7. Re-run `test_api.py` — valid lead should now appear as a row in the Muskan tab.
8. Open the sheet on phone/laptop, confirm row exists.
9. Mark M1.5 complete; move to M1.6 (end-to-end polish).
