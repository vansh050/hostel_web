# Project 2 Roadmap — "Dreamjobcometrue"

> **Status (2026-05-12):** ACTIVELY KICKING OFF. Pratik pivoted from StaySense to a job-discovery/recommendation product on 2026-05-12 immediately after shipping Project 1. Same modern AI stack, different domain.
>
> **Working model:** Pratik types every line of code. Claude teaches concepts (with real-world + DSA analogies), gives code blocks for Pratik to type into files, reviews after, never writes via Edit/Write unless explicitly asked. The footer `📚 Phase N · M X.Y · Step a/b` appears on every learning-session reply.

---

## TL;DR

**Dreamjobcometrue** is a B2C, AI-native job-discovery platform for Indian job seekers (students + early-career professionals). User uploads resume → picks interests + dream companies → the system continuously surfaces matching, recently-posted jobs from a curated set of company career pages and job board APIs, ranked personally to that user, with AI-written cover letter drafts and one-screen "why this fits you" explanations.

The pivot from StaySense is **purely domain**. Every concept in the original plan transfers; this domain *adds* a few (document parsing, NER, web scraping mechanics, notification systems).

**User flow (the north star):**
1. User signs up, uploads PDF/DOCX resume
2. System parses + extracts skills, experience, dream-company list, salary expectations, location preferences
3. Continuously scrapes/ingests fresh job postings from curated sources (company career pages + APIs)
4. Match: hybrid retrieval (BM25 + dense embeddings + RRF + re-rank) ranks jobs personally
5. Daily/weekly digest email — "5 new jobs matching you" with AI-generated explanation per job
6. One-click "draft cover letter" via LLM agent that reads resume + JD + writes tailored cover
7. Track applications (status, follow-up reminders) — stays on the platform after applying

**Stack jump from Project 1:** Flask → FastAPI; single admin → multi-user with strict per-user data isolation; single instance → load-balanced + Redis-cached; no jobs → Celery (job scraping + notification fan-out); no AI → deep GenAI (LangChain/LangGraph/MCP/RAG/agents/evals/fine-tuning).

**Estimated timeline:** ~20-22 weeks (~5 months @ 6 hrs/wk). Buffer assumed.

---

## What you already bring from Project 1 (do NOT re-teach)

Pratik shipped a full-stack product end-to-end. He has hands-on knowledge of:

| Concept | Where he used it in Project 1 |
|---|---|
| **Python + Flask** | Backend API, routes, decorators |
| **Pydantic** | Validation, `extra="forbid"`, `model_dump(exclude_unset=True)` |
| **Postgres + SQLAlchemy ORM + Core** | Hostels/Leads schema, `session.get`, `select().join()`, GROUP BY + LEFT JOIN + FILTER |
| **Alembic migrations** | Versioned schema, autogenerate, configparser interpolation gotcha |
| **JWT auth** | Login, `secrets.compare_digest`, `@require_auth`, JWT subject for audit trails |
| **Audit logging** | Structured JSON logs, log-after-commit, PII-safe field-names-only |
| **HTTP semantics** | GET/POST/PATCH/PUT, 4xx vs 5xx, 404 vs 400 distinction |
| **CORS** | Allowlist, stable origins not per-deploy URLs |
| **Rate limiting** | Flask-Limiter, decorator stack order |
| **dotenv + 12-factor config** | Fail-fast envs, dev/prod isolation |
| **Render deploy** | gunicorn + Procfile, env vars, free-tier cold-start, lazy init |
| **Next.js 16 App Router** | File-system routing, server vs client, route groups, params as Promise |
| **React hooks** | `useState`, `useEffect` + cleanup, `useMemo`, custom hooks, rules of hooks |
| **React patterns** | Controlled inputs, async handlers, optimistic updates, `{data,loading,error}` triple, AbortController |
| **TypeScript** | Generics, unions, type narrowing, type-only imports |
| **Tailwind v4** | `@theme`, CSS custom props |
| **Vercel deploy** | Per-commit vs stable URLs, NEXT_PUBLIC_ env vars, mixed-content blocking |
| **Git** | 3-tree model, route-group refactor lessons |
| **PowerShell + curl debugging** | `--data-binary "@file"`, `$TOKEN`, JWT decode |

Project 2 builds *on top* of these. Claude says "you know this from M6.1" and moves on.

---

## What's NEW in Project 2 (the actual learning targets)

### Infrastructure & systems
- **FastAPI** (async Python, type-first, OpenAPI for free)
- **Async Python** (`async`/`await`, async DB drivers, async iteration)
- **Per-user data isolation** — every domain row has `user_id`, app filters by it AND Postgres Row-Level Security (RLS) policies enforce as a second line of defense
- **Redis** — cache, session store, pub/sub, rate-limit backend, Celery broker
- **Celery** — task queue, workers, scheduled scraping jobs (Celery Beat), retries, dead-letter queues
- **Docker + Docker Compose** — containerize each service, multi-service local stack
- **nginx** — reverse proxy, SSL, rate limiting, load balancing across FastAPI workers
- **CI/CD** — GitHub Actions: lint, typecheck, test, build container, deploy
- **Observability** — Sentry, OpenTelemetry tracing, Prometheus metrics, Grafana, structured logs
- **Database** — connection pooling (pgbouncer), index strategy with EXPLAIN, partial indexes, query plan reading
- **Zero-downtime deploys** — blue-green, backwards-compatible migrations
- **Object storage** — S3-compatible (Cloudflare R2 / Render disks) for raw resume files; metadata in Postgres
- **Encryption at rest** — resumes contain PII (phone, address); column-level encryption or whole-file encryption

### NEW in this domain (not in StaySense plan)
- **Document parsing** — PDF/DOCX → structured text. Tools: `pdfplumber`, `Unstructured`, vision-capable LLMs as fallback. Robust to messy resume formats.
- **Named Entity Recognition (NER)** — extract skills, companies, dates, locations, education from resume + JD text. Tools: spaCy (lightweight), HuggingFace transformers (powerful), or LLM-based extraction with structured output.
- **Web scraping mechanics** — Playwright (headless browser for JS-rendered pages), `httpx` for static, `BeautifulSoup` for parsing, polite rate-limiting (1 req/sec/host), respecting `robots.txt`, rotating user-agents.
- **Anti-bot evasion concepts** — fingerprint randomization, residential proxies, headless detection. Learn the *mechanics* on a sandbox site; production uses only ToS-clean sources.
- **Job board API integration** — Greenhouse boards (`boards.greenhouse.io/<company>`) and Lever boards have free public APIs; Indeed has partial API; SerpAPI/RSS for breadth.
- **Notification systems** — transactional email (Resend / Postmark / Mailgun), WhatsApp Business API (Twilio), scheduled digest delivery via Celery Beat.
- **Personalization with cold-start** — new users with no click history; bootstrap from resume-only matching, refine as click signals accumulate.

### Machine Learning
- **Embeddings** — vectors in ~1500-d space, cosine vs Euclidean vs dot-product
- **Vector databases** — Qdrant (recommended), pgvector (start here, free), Pinecone, Weaviate
- **Semantic search** — resume + JD as vectors, cosine similarity
- **Hybrid retrieval** — BM25 (lexical: "Python", "ML Engineer") + dense (semantic: resume vs JD) + Reciprocal Rank Fusion
- **Re-ranking** — Cohere Rerank or BGE-reranker as second-stage filter
- **Learning-to-rank** — LightGBM / sklearn ranker trained on click data (which job did user actually open/apply to?)
- **Evaluation metrics** — precision@k, recall@k, MRR, NDCG on a held-out test set
- **Click-through-rate prediction** — given (user_features, job_features) → P(click). Foundation for personalized ranking.
- **Cold-start strategies** — content-based fallback when no history exists

### GenAI / LLMs (deep)
- **LLM API basics** — Claude API, OpenAI API, structured outputs (XML/JSON), tool use
- **Prompt engineering** — system prompts, few-shot, chain-of-thought, role priming
- **Prompt caching** (Anthropic-specific, big cost win since system prompt is identical per user-session)
- **Streaming responses** — SSE from FastAPI to browser; never wait 5s for full output
- **RAG (Retrieval-Augmented Generation)** — chunking strategies, embedding model choice, retrieve → re-rank → generate → cite
- **Per-user RAG** — each user has their own "knowledge base" (their applied-to companies, saved jobs, prep notes, interview feedback) which the agent can reference
- **Domain RAG** — shared corpus: Glassdoor reviews, Levels.fyi salary data, community interview prep threads. Used to answer "what's interview process at Google?"
- **LangChain** — chains, memory, tools, output parsers
- **LangGraph** — stateful multi-step agents with checkpoints
- **LlamaIndex** — alternative RAG framework with strong indexing primitives
- **MCP (Model Context Protocol)** — wrap Dreamjobcometrue as an MCP server → user with Claude Desktop says "what should I apply to today?" and Claude queries their account
- **Agent patterns** — ReAct (Reason+Act), Plan-Execute, Reflexion
- **Tool use / function calling** — `search_jobs`, `parse_resume`, `extract_skills`, `generate_cover_letter`, `track_application`, `mark_applied`
- **Multimodal LLMs** — vision LLM (Claude/GPT-4o/Gemini) for resume PDFs in messy layouts where pdfplumber fails
- **Voice AI (optional)** — Whisper STT + ElevenLabs TTS for "interview practice with AI"
- **Local LLMs** — Ollama for on-device, llama.cpp, quantization (Q4/Q5/Q8)
- **Fine-tuning** — SFT on a small open model (Mistral-7B / Llama 3.1), LoRA / QLoRA for parameter-efficient adaptation. Use case: fine-tune on (resume_text, job_description, match_score) triples after collecting click data.
- **Guardrails** — PII redaction (resumes contain phones, emails, addresses), prompt-injection defense, refuse off-topic ("what's the weather?"), refuse discriminatory job postings
- **Evaluation** — RAGAS for retrieval quality, LangSmith for trace inspection, golden datasets, LLM-as-judge, regression testing for prompts in CI
- **Cost & latency engineering** — model cascading (Haiku for cheap intent classification → Sonnet for cover letter draft), batch API for daily-digest generation, aggressive prompt caching

---

## Architecture (where every concept lives)

```
                            🌐 Internet
                                │
                                ▼
                       ┌────────────────┐
                       │  Cloudflare    │  ← CDN, DDoS, edge cache
                       │   (free tier)  │
                       └───────┬────────┘
                               │
                               ▼
                       ┌────────────────┐
                       │     nginx      │  ← Reverse proxy + SSL + rate limit
                       │ (load balancer)│
                       └───┬──────┬─────┘
                           │      │
                  ┌────────┘      └────────┐
                  ▼                        ▼
         ┌────────────────┐       ┌────────────────┐
         │  FastAPI #1    │       │  FastAPI #2    │  ← horizontally scaled
         │  (async)       │       │  (async)       │     stateless workers
         └─┬──┬──┬────────┘       └─┬──┬──┬────────┘
           │  │  │                   │  │  │
           │  │  └──────────┬────────┘  │  │
           │  │             ▼           │  │
           │  │     ┌──────────────┐    │  │
           │  │     │    Redis     │    │  │  ← Cache + queue + pub/sub
           │  │     │ (multipurpose)│    │  │     + sessions + rate-limit store
           │  │     └─────┬────────┘    │  │
           │  │           │              │  │
           ▼  ▼           ▼              ▼  ▼
    ┌──────────────┐ ┌────────────┐ ┌──────────────┐
    │   Postgres   │ │  Celery    │ │ AI service   │
    │ (user-scoped │ │  workers   │ │ (LangChain + │
    │  + RLS)      │ │ (async +   │ │  LangGraph + │
    │ users, jobs, │ │  scrapers) │ │   MCP server)│
    │ matches,     │ └─────┬──────┘ └──────┬───────┘
    │ applications,│       │                │
    │ saved_jobs,  │       ├─ scrape company career pages every 6h
    │ click_logs   │       ├─ embed new jobs into Qdrant
    └──────┬───────┘       ├─ daily digest email per user
           │               ├─ re-rank model retraining (weekly)
           │               └─ resume parse on upload
           │                       │
           ▼                       ▼
   ┌────────────────┐      ┌──────────────────┐
   │  Object store  │      │   Vector DB      │
   │ (R2 / S3)      │      │   (Qdrant)       │
   │  raw resumes   │      │ - job_postings   │
   │  encrypted     │      │ - user_resumes   │
   └────────────────┘      │ - per-user notes │
                           └──────────────────┘

   External:  Resend (email) · Twilio WhatsApp · Anthropic API · Cohere Rerank · Greenhouse/Lever APIs
   Observability sidecar:  Sentry · OpenTelemetry → Tempo · Prometheus → Grafana
```

---

## Phase-by-phase breakdown

Every phase ends with a **deliverable** Pratik can show, plus explicit **learning outcomes**.

---

### Phase 0 — Bridge from Project 1 (~1 week, 3-4 sessions)

**Goal:** decide final scope, stand up empty FastAPI project.

**Sub-milestones:**
- **M0.1** Re-read this roadmap end-to-end; lock final scope
- **M0.2** Create fresh repo + GitHub remote. Recommendation: `E:\DREAMJOB\`, separate Vercel + Render projects.
- **M0.3** Create `LEARNING_PROJECT2.md` journal modeled on Project 1's `LEARNING.md`
- **M0.4** Stub: `pyproject.toml`, `.gitignore`, `Dockerfile` skeleton, `docker-compose.yml` skeleton, FastAPI hello-world
- **M0.5** Run FastAPI locally via `uvicorn`; hit `GET /` returns JSON

**Deliverable:** empty FastAPI app on `localhost:8000`, repo on GitHub, journal initialized.

**Learning outcomes:** FastAPI hello-world; `uvicorn` vs `gunicorn`; ASGI vs WSGI mental model.

---

### Phase 1 — User-Scoped Foundation (~3-4 weeks)

**Goal:** authenticated, per-user-isolated FastAPI backend with versioned migrations, deployed.

**Sub-milestones:**
- **M1.1** FastAPI app structure (`app/`, `api/`, `db/`, `models/`, `schemas/`, `core/`)
- **M1.2** Async SQLAlchemy + `asyncpg` driver + Alembic
- **M1.3** Schema design — `users`, `resumes`, `dream_companies`, `interests`, `job_postings` (shared), `matches`, `applications`, `saved_jobs`, `click_logs`. User-scoped tables have `user_id` FK; job_postings is global.
- **M1.4** Postgres Row-Level Security policies — every user-scoped table has a policy `user_id = current_setting('app.current_user_id')::int`. Defense in depth.
- **M1.5** User registration + login — hashed passwords (`argon2`), JWT with refresh tokens, "forgot password" flow with email reset
- **M1.6** Email verification on signup (deferred to Phase 3 if Resend setup blocks)
- **M1.7** File upload endpoint — `POST /resume` accepts PDF/DOCX (max 5MB), stores raw file in object storage (Render disk or R2), metadata row in `resumes`
- **M1.8** Dockerize: `Dockerfile` (multi-stage), `docker-compose.yml` (api + postgres + redis), local stack via `docker compose up`
- **M1.9** Deploy to Render multi-service (api + postgres + redis), env vars, custom domain optional

**Deliverable:** Pratik registers, logs in, uploads his own resume, sees confirmation. Another user trying to read his resume gets 403 (RLS-enforced).

**Learning outcomes:** FastAPI structure, async Python, per-user data isolation patterns, RLS, password hashing, multi-stage Docker, file upload + object storage, refresh-token flow.

---

### Phase 2 — Resume Parsing + Job Matching v1 (~4-5 weeks)

**Goal:** the matching engine. From naive keyword filter to vector + ranking.

**Sub-milestones:**
- **M2.1** Resume parser — accept PDF/DOCX; try `pdfplumber` first; fall back to vision-LLM (Claude or GPT-4o) for messy layouts. Extract: name, contact, skills (list), experience (job titles + dates + companies), education, projects. Store structured + raw text.
- **M2.2** NER for skills/companies/locations — start with `spaCy` (free, fast, decent), promote to LLM-based extraction with structured output when accuracy matters. Build a controlled skill taxonomy (~500 canonical skills) so "Py" / "Python" / "Python 3" all map to one canonical entity.
- **M2.3** Job ingest pipeline — seed by manually adding 50-100 job postings to the DB. Real ingestion comes in Phase 3.
- **M2.4** Filter-based matching v1 — `GET /jobs?skills=python,ml&location=remote&min_salary=8L` (pure SQL WHERE)
- **M2.5** Intro to embeddings — math + intuition + model choice (OpenAI `text-embedding-3-small` vs BGE-small local). Embed each resume + each job description; store as `pgvector` column.
- **M2.6** Semantic matching v2 — query: resume vector → nearest-neighbor jobs via cosine. Compare results to v1.
- **M2.7** Move to Qdrant (dedicated vector DB) when pgvector hits its scale ceiling. Learn the trade-offs hands-on.
- **M2.8** Hybrid matching v3 — BM25 (Postgres full-text or OpenSearch) on skill keywords + dense on full text + Reciprocal Rank Fusion. Demonstrably better than either alone on the eval set.
- **M2.9** Re-ranker v4 — top-50 from hybrid → Cohere Rerank or BGE-reranker → top-10 personalized
- **M2.10** Click logging — every `GET /jobs/<id>` click + every `save` + every `mark_applied` writes to `click_logs`. The eval signal for Phase 4+.
- **M2.11** Learning-to-rank v5 — train LightGBM ranker on click data (offline eval before deploy)
- **M2.12** Cold-start handling — new user with no clicks: rank purely by resume↔JD hybrid score
- **M2.13** Redis hot-query cache — identical queries within 5 min serve from Redis
- **M2.14** Evaluation harness — precision@10, MRR, NDCG, click-through rate

**Deliverable:** Pratik uploads his real resume, types "ML engineer remote India", sees 10 plausible jobs ranked. Saves a few, clicks others. Stats panel shows his match scores.

**Learning outcomes:** PDF/DOCX parsing, NER, embeddings (intuition + math), pgvector vs Qdrant, hybrid retrieval, re-ranking, click logs as eval signal, learning-to-rank, cold-start, Redis caching strategies.

---

### Phase 3 — Async Jobs, Scraping, Notifications, Observability (~3-4 weeks)

**Goal:** keep the job database fresh; notify users; production-ready observability.

**Sub-milestones:**
- **M3.1** Celery + Redis broker — first async task: send welcome email via Resend after signup
- **M3.2** Idempotent task design — retries don't double-send / double-charge
- **M3.3** **Curated scraper #1: Greenhouse-hosted boards** — Greenhouse exposes `boards-api.greenhouse.io/v1/boards/<company>/jobs` (public, ToS-clean). Build a Celery task that ingests ~20 companies (Razorpay, Cred, Zerodha, Atlassian, Stripe, etc.) every 6 hours. Each new job → embed → upsert into Qdrant + Postgres.
- **M3.4** **Curated scraper #2: Lever-hosted boards** — similar public API (`api.lever.co/v0/postings/<company>`)
- **M3.5** **Curated scraper #3: First-party career pages** — Playwright headless browser on 30 hand-picked company career URLs (Google careers, Microsoft careers, etc.). Respectful: 1 req/sec/host, robots.txt check, user-agent disclosure.
- **M3.6** **Scraping mechanics learning module (LEARNING ONLY — not shipped to prod):** build a Naukri scraper to learn anti-bot evasion concepts. Code stays in `experiments/`, does not run in production. Tools: Playwright stealth, residential proxy concepts, fingerprint randomization. Treat as a study exercise — you'll never run it against live Naukri.
- **M3.7** Celery Beat scheduled jobs — daily digest email at 8am IST per user with their top-5 matches; weekly re-index of stale jobs
- **M3.8** Dead-letter queue for failed tasks; alerts on DLQ depth > N
- **M3.9** Notification delivery via Resend (email) — branded template with the 5 matches + "why this fits you" one-liner per job (LLM-generated, cached)
- **M3.10** WhatsApp notifications (optional, gated behind explicit user opt-in) — Twilio WhatsApp Business API
- **M3.11** Sentry integration — uncaught exceptions with full traceback + user context
- **M3.12** Structured JSON logging, shipped to free aggregator (Better Stack, Axiom, or Loki self-hosted)
- **M3.13** OpenTelemetry distributed tracing — span from nginx → FastAPI → Postgres → Celery → vector DB
- **M3.14** Prometheus metrics + Grafana dashboard — p50/p95/p99 latency, scraper success rate, embeddings/min, notification deliverability
- **M3.15** GitHub Actions CI — lint (ruff) → typecheck (mypy/pyright) → tests (pytest) → build container
- **M3.16** GitHub Actions CD — green main → deploy to Render via API

**Deliverable:** every morning at 8 IST, Pratik gets an email "5 new jobs matching you" with AI-written one-liners explaining each match. The job DB has 2000+ fresh postings updated every 6 hours.

**Learning outcomes:** Celery + Redis as broker, task idempotency, web scraping mechanics (politely + at scale), notification systems, observability triad (metrics + logs + traces), CI/CD pipelines.

---

### Phase 4 — GenAI: RAG, Agents, MCP, Evals (~6-8 weeks) ⭐ THE BIG ONE

**Goal:** every modern AI capability integrated, evaluated, production-grade. Roughly half the project by time.

**Sub-milestones:**

**M4.1 — LLM basics (1 wk):** Claude API hello-world, prompt structure, structured outputs (XML/JSON), streaming via SSE. Prompt caching for repeated system prompts. First feature: AI-written "why this job matches you" one-liner shown next to every recommendation.

**M4.2 — Cover-letter generator (1 wk):** Tool-use agent. `generate_cover_letter(job_id)` → loads resume + JD → drafts a tailored cover letter → streams to UI → user edits → saves. Logs each generation for eval.

**M4.3 — Per-user RAG (1.5 wk):** Each user has a private knowledge base — their saved jobs, applied jobs, notes from interviews, employer feedback. Indexed in a user-scoped Qdrant collection. Agent can answer "what did I tell Razorpay about my CRDT experience?"

**M4.4 — Domain RAG (1 wk):** Shared corpus — Glassdoor reviews (legally-obtained samples), Levels.fyi salary data, community interview prep threads. Indexed once. Agent answers "what's interview process at Google for SDE-II?" with citations.

**M4.5 — Chunking + retrieval quality (0.5 wk):** Fixed-size vs semantic vs hierarchical chunking. A/B test on golden eval set. Measure faithfulness + relevance with RAGAS.

**M4.6 — Hybrid RAG (1 wk):** Same hybrid retrieval pattern as recsys (BM25 + dense + RRF + re-rank) but feeding LLM context.

**M4.7 — Job-search agent (1.5 wk):** Multi-turn agent. Tools: `search_jobs`, `filter_by_company`, `filter_by_salary`, `apply`, `save_for_later`, `compare_jobs`. Conversation: "I want remote ML roles paying 30L+ at startups" → agent clarifies → searches → presents → handles follow-ups.

**M4.8 — LangChain refactor (1 wk):** Refactor M4.1-4.7 to LangChain primitives. Learn chains, memory, output parsers. Note where LangChain helps vs adds noise.

**M4.9 — LangGraph stateful agent (1 wk):** Multi-step: requirement gathering → search → present → refine → apply → follow-up reminder. State checkpointed in Redis so user can resume after closing the tab.

**M4.10 — MCP server (0.5 wk):** Wrap Dreamjobcometrue as an MCP server. Anyone with Claude Desktop runs `dreamjobcometrue-mcp` and says "Claude, what should I apply to today?" — Claude calls the MCP server's tools, queries the user's account, returns ranked suggestions. **Portfolio-grade.**

**M4.11 — Guardrails (0.5 wk):** Prompt-injection defense (instructional firewall), PII redaction on input (mask phone/email before sending resume text to LLM) AND output, refuse off-topic, refuse generating cover letters for jobs the user has flagged as suspicious.

**M4.12 — Evaluation framework (1 wk):** Golden dataset of 100 (resume, query, expected-top-10-jobs) tuples. RAGAS for RAG quality. LangSmith for trace inspection. LLM-as-judge for cover letter quality. Regression tests run in CI when prompts change.

**M4.13 — Cost & latency engineering (0.5 wk):** Model cascading — Haiku for "is this query off-topic?" classifier, Sonnet for cover letter generation. Prompt-cache audit. Batch API for daily-digest generation. Per-user $$/mo budget alarms.

**M4.14 — Optional advanced (variable):**
- **Fine-tuning with LoRA** — fine-tune Mistral-7B on (resume_text, job_description, match_label) data once you have 1000+ click signals. Serve via Ollama for cost-free inference.
- **Multimodal** — vision LLM for messy resume PDFs that pdfplumber fails on. Already partial in M2.1; here we measure quality lift.
- **Voice AI** — "interview practice with AI": Whisper STT → behavioral-interview agent → ElevenLabs TTS. User practices answering common questions, gets feedback.
- **GraphRAG** — extract entity graph (people, companies, skills, projects) from resume text; use graph traversal for queries like "find jobs at companies where I have a connection".

**Deliverable:** A user can have a full conversation: upload resume → "I want SDE-II at FAANG, India, ₹40L+" → agent searches → presents top-5 with explanations → user picks one → agent drafts cover letter → user edits → saves → next day reminded to follow up. All evaluated with regression tests.

**Learning outcomes:** the entire 2026 modern AI stack, hands-on, end-to-end, evaluated. By the end of Phase 4, every concept in the "AI side" pre-reading list has shipping code attached.

---

### Phase 5 — Scale, Performance & Security (~3 weeks)

**Goal:** make it production-grade. The 99% case is fast; the 1% case is handled.

**Sub-milestones:**
- **M5.1** nginx prod config — SSL via Let's Encrypt, HTTP/2, gzip, security headers (CSP, HSTS), rate-limit zones per endpoint
- **M5.2** FastAPI horizontal scaling — multiple workers behind nginx, sessions in Redis (truly stateless)
- **M5.3** Postgres connection pooling via pgbouncer; tune pool size
- **M5.4** Read replica for Postgres (optional)
- **M5.5** Query optimization — EXPLAIN ANALYZE on slow queries, indexes on `(user_id, created_at DESC)`, partial indexes for `WHERE applied_at IS NULL`
- **M5.6** Background-job priority queues — user-facing (cover letter generation) has dedicated queue, never blocked by slow batch (daily scraping)
- **M5.7** Auth hardening — refresh-token rotation, revocation, suspicious-login detection (unusual IP/UA)
- **M5.8** Resume encryption at rest — column-level or whole-file. Decrypt only in-memory for processing; never log decrypted contents.
- **M5.9** Blue-green deploys via GitHub Actions — zero-downtime, instant rollback
- **M5.10** Expand-contract migrations — never break old code mid-deploy

**Deliverable:** p95 < 200ms for ranking endpoint, < 1s for chatbot first-token; can deploy without users noticing.

**Learning outcomes:** "works" vs "works at scale" — pools, indexes, query plans, deploy strategies, security headers, encryption at rest.

---

### Phase 6 — Polish, Launch, Real Users (~2-3 weeks)

**Goal:** put it in front of real job seekers (start with Pratik's friends/network).

**Sub-milestones:**
- **M6.1** User dashboard — editorial style (Fraunces + saffron from Project 1 if Pratik wants brand continuity, OR pivot to a tech-feeling palette). Multi-page: jobs feed, saved, applied, profile, settings.
- **M6.2** Public landing page — explain Dreamjobcometrue to a job-seeker. SEO-ready.
- **M6.3** Onboarding flow — sign up → upload resume → pick interests → see first 5 matches in < 60s
- **M6.4** "Refer a friend" — viral loop with rewards (free Pro month, etc.)
- **M6.5** Documentation site — auto-generated from FastAPI OpenAPI + handwritten guides
- **M6.6** First 5 real users from Pratik's network — onboard, watch them use it, fix what breaks
- **M6.7** Demo from phone — public URL Pratik can show anyone

**Deliverable:** 5 real users actively using the platform; one of them gets an interview from a job suggested by the system.

**Learning outcomes:** product polish, real-user feedback loops, viral mechanics.

---

### Phase 7 (optional, stretch) — Above-and-beyond

- **Kubernetes** — graduate from Render to managed K8s. Learn pods, services, ingress, HPA.
- **Event-driven architecture** — Redis Streams or Kafka for the scraping pipeline (decouple ingest from match).
- **A/B testing framework** — feature flags (GrowthBook/Unleash), assign users to ranking-algorithm variants, measure lift in click-through rate.
- **Mobile app** — React Native / Expo, share auth + design tokens with web.
- **B2B pivot layer** — sell to colleges / training institutes; they get analytics across their cohort of students.
- **Stripe billing** — free tier + Pro tier (unlimited cover letters, priority queue, more daily digests).

---

## Timeline (realistic)

```
2026-05  Phase 0  bridge + repo setup                              [~1 wk]
2026-05  Phase 1  user-scoped FastAPI foundation                   [~4 wks]
2026-06  Phase 2  resume parsing + matching v1→v5                  [~5 wks]
2026-07  Phase 3  scraping + notifications + observability + CI/CD [~4 wks]
2026-08  Phase 4  GenAI (RAG, agents, MCP, evals)                  [~7 wks] ← longest
2026-10  Phase 5  scale + perf + security                          [~3 wks]
2026-11  Phase 6  polish + first real users                        [~3 wks]
2026-12  Phase 7  stretch (only if motivated)
```

---

## Risks + decision points

| Risk | Mitigation |
|---|---|
| **Resume PII handling** | Encryption at rest (M5.8), audit logs (from Project 1), explicit consent on upload, account-deletion endpoint, never log decrypted resumes |
| **LLM cost** | Phase 4 M4.13 is dedicated cost engineering. Prompt caching + Haiku-first cascading + batch API keeps cost minimal. Personal budget alert at $20/mo. |
| **Scraping legal exposure** | Production uses ONLY ToS-clean sources (Greenhouse/Lever public APIs, first-party career pages with `robots.txt` respect). Naukri scraper is a LEARNING-ONLY module in `experiments/`, never runs in prod. |
| **Anti-bot arms race** | Don't fight LinkedIn/Naukri. Stick to first-party + APIs. Saves time + lawyer fees. |
| **Cold-start (new user, no clicks)** | Resume-only matching for first 10 interactions; bootstraps signal naturally |
| **Scope creep — Phase 4 is huge** | Sub-milestones M4.14 are explicitly optional; stop when basics are evaluated and shipping |
| **GenAI burnout** | Buffer + permission to skip M4.14. Phases 0-3 + M4.1-13 already cover every key concept. |
| **Single dev bus factor** | Document everything in `LEARNING_PROJECT2.md` as you go |
| **AI stack obsoletes** | Treat LangChain/LlamaIndex as replaceable glue; learn fundamentals (embeddings, retrieval, prompting) which don't obsolete |
| **Render free Postgres expires 2026-08-08** | Plan migration mid-Phase 3 / early Phase 4. Move to Neon (free, no expiry) or upgrade Render. |

---

## Pre-reading (skim, don't binge — ~30 min/week before kickoff)

**Infrastructure side:**
- **System Design Interview** by Alex Xu — covers most of what Project 2 uses
- **nginx Beginner's Guide** — nginx.org/en/docs/beginners_guide.html
- **Docker** — docs.docker.com/get-started
- **Multi-tenancy patterns** — search "multi-tenant SaaS architecture", esp. Auth0's overview
- **FastAPI tutorial** — fastapi.tiangolo.com/tutorial/
- **Async Python** — realpython.com/async-io-python/

**Domain-specific (new for this project):**
- **Web scraping ethics & law** — search "ethical web scraping 2025", read the HiQ vs LinkedIn case summary
- **Playwright docs** — playwright.dev (the headless-browser piece)
- **Resume parsing** — Affinda / Sovren blogs (commercial parsers explain the problem space; open-source: Unstructured-IO, spaCy NER recipes)

**AI / GenAI side:**
- **LangChain docs** — python.langchain.com → "Tutorials → Chatbot" then "Tutorials → Agent"
- **LangGraph** — langchain-ai.github.io/langgraph/
- **MCP spec** — modelcontextprotocol.io (read once, one sitting)
- **Anthropic Engineering blog** — prompt caching, tool use, agent patterns
- **OpenAI Cookbook** — github.com/openai/openai-cookbook
- **RAG techniques** — "Advanced RAG" series by LlamaIndex blog; Pinecone learning center
- **Vector search math** — 1-hour read on cosine vs Euclidean vs dot-product
- **LLM fine-tuning** — HuggingFace course Ch 7; small classifier first, then LoRA
- **Evaluation** — RAGAS docs + Hamel Husain's "LLM evals" blog post

---

## Alternative project ideas (preserved in case Pratik pivots again)

### Alternative A — "StaySense" (the previous Project 2 plan)
Multi-tenant hostel recommendation platform for Indian Tier-2/3 cities. Pratik's 3 hostels as tenants #1-3. Same modern AI stack, hostel domain. Detailed plan was the previous version of this file (in git history at commit `c25c09b`).

### Alternative B — "DocSense": Document Intelligence Platform
B2B SaaS where small businesses upload PDFs/contracts → AI Q&A, classification, compliance. Pros: B2B revenue. Cons: more abstract, less personal use case.

### Alternative C — "PriceProphet": Hostel Pricing Optimizer
ML model that predicts demand for Project-1 hostels and suggests dynamic pricing. Pros: tightly tied to Project 1, time-series ML. Cons: smaller scope, less GenAI.

### Alternative D — "EduMatch": Tutor/Coaching Platform
Same multi-tenant pattern, but for tutors/coaching centers in Ranchi. Pros: large market, similar architecture. Cons: diverges from your domain expertise.

---

## How sessions will run (the collab contract)

1. **Claude teaches concept** — what + why + real-world analogy + DSA mapping
2. **Claude gives a code block** Pratik types into a file (Claude does NOT use Edit/Write)
3. **Pratik types it, saves, says "done"**
4. **Claude reviews** via Read and either approves or course-corrects
5. **Test the slice** — curl / browser / pytest as appropriate
6. **Footer tracker** on every reply: `📚 Phase N · M X.Y · Step a/b`

**Different from Project 1:** Pratik types **everything** including UI markup. Slower, deeper.

**Exception:** purely boilerplate scaffolding (`.gitignore`, lockfiles, generated migration shells) — Claude can offer to write after asking once.

---

## Session 1 plan (when Pratik says "let's start")

1. Re-read this file together (10 min) — verify scope still fits
2. Confirm final project name (currently `Dreamjobcometrue` — Pratik can refine)
3. Decide repo location — recommendation: `E:\DREAMJOB\`, fresh `git init`, fresh GitHub repo
4. Create `LEARNING_PROJECT2.md` modeled on Project 1's journal
5. Initialize `project_current_milestone.md` memory to Project 2 Phase 0 M0.1
6. Verify tooling — Python version, Docker installed, choice of `uv` vs `pip`, IDE setup
7. Start M0.1 (the read-through *is* M0.1 if Pratik agrees)

---

## Final note

Project 1 proved Pratik can ship. Project 2 proves Pratik can architect.

The plan is ambitious. The plan is also flexible — phases compose, sub-milestones are skippable, the timeline is realistic-not-aggressive. The goal isn't to race; it's to come out the other end able to architect any production AI-native B2C product from first principles.

> **History:**
> - Saved 2026-04-27 as "StaySense" hostel platform plan
> - Substantially expanded 2026-05-11 (modern AI stack additions)
> - Re-architected 2026-05-12 for full code authorship + deep AI integration
> - **Pivoted 2026-05-12 to Dreamjobcometrue** (job-discovery domain) per Pratik's redirection; all concepts preserved, domain re-themed
