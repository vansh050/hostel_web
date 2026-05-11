# Project 2 Roadmap — "StaySense"

> **Status (2026-05-12):** ACTIVELY KICKING OFF. Pratik shipped Project 1 (Lalpur Hostels admin portal) the previous night and rolled directly into Project 2 the same week.
>
> **Working model:** Pratik types every line of code. Claude teaches concepts (with real-world + DSA analogies), gives code blocks for Pratik to type into files, reviews after, and never writes via Edit/Write unless explicitly asked. The footer `📚 Phase N · M X.Y · Step a/b` appears on every learning-session reply.

---

## TL;DR

**StaySense** is a real-time, multi-tenant, AI-native hostel/PG recommendation platform for Indian Tier-2/3 cities. Pratik's 3 hostels (Muskan, Sanskriti, Sankalp) become tenants #1-3. Other hostel owners onboard. Students/workers find their match via:

- **ML-driven recommendations** (filter → embeddings → hybrid retrieval → re-rank → personalize)
- **Per-tenant AI chatbots** (RAG over each hostel's policies + agent function-calling into the DB)
- **AI receptionist** (voice → STT → agent → TTS, optional)
- **Tenant admin dashboards** with their own analytics, lead pipelines, review summaries

**Stack jump from Project 1:** Flask → FastAPI; single-tenant → multi-tenant; single instance → load-balanced + Redis-cached; no jobs → Celery; no AI → deep GenAI stack (LangChain/LangGraph/MCP/RAG/agents/evals/fine-tuning).

**Estimated timeline:** ~20-22 weeks (~5 months @ 6 hrs/wk). Realistic: longer, because the AI parts have steep learning curves and there's no rush.

---

## What you already bring from Project 1 (do NOT re-teach)

Pratik shipped a full-stack product end-to-end. He has working hands-on knowledge of:

| Concept | Where he used it in Project 1 |
|---|---|
| **Python + Flask** | Backend API, routes, decorators |
| **Pydantic** | Request validation, `extra="forbid"`, partial updates with `model_dump(exclude_unset=True)` |
| **Postgres + SQLAlchemy ORM + Core** | Hostels/Leads schema, `session.get` (identity map), `select().filter().join()`, GROUP BY + LEFT JOIN + FILTER aggregates |
| **Alembic migrations** | Versioned schema, autogenerate, configparser interpolation gotcha |
| **JWT auth** | Login, `secrets.compare_digest`, `@require_auth` decorator, JWT subject for audit trails |
| **Audit logging** | Structured JSON logs, log-after-commit ordering, PII-safe field-names-only |
| **HTTP semantics** | GET vs POST vs PATCH vs PUT, 4xx vs 5xx, 404 vs 400 distinction |
| **CORS** | Flask-CORS, allowlist, stable origins not per-deploy URLs |
| **Rate limiting** | Flask-Limiter, decorator stack order |
| **dotenv + 12-factor config** | `os.environ["X"]` fail-fast vs `.get()`, dev/prod isolation |
| **Google Sheets API** | OAuth service account, dual-write pattern |
| **Render deploy** | gunicorn + Procfile, env vars, cold-start lazy init, free-tier limits |
| **Next.js 16 App Router** | File-system routing, server vs client components, route groups, metadata, params as Promise |
| **React hooks** | `useState`, `useEffect` + cleanup, `useMemo` for memoization, custom hooks, rules of hooks |
| **React patterns** | Controlled inputs, async event handlers with try/catch/finally, optimistic updates, `{data, loading, error}` triple, AbortController cleanup |
| **TypeScript** | Generic types, union types, type narrowing with `"in"`, type-only imports |
| **Tailwind v4** | `@theme` block, CSS custom properties, utility-first composition |
| **Vercel deploy** | Per-commit deployment URLs vs stable production domain, NEXT_PUBLIC_ env vars, mixed-content blocking |
| **Git** | 3-tree model, route group refactor with proper `git mv` vs partial `git add`, force-push danger |
| **PowerShell + curl debugging** | `--data-binary "@file"` pattern, `$TOKEN` variable, JWT decoding |

Project 2 **builds on top** of these. We will not re-explain `useState` or what JWT is. When Project 1 already taught a concept, Claude says "you know this from M6.1" and moves on.

---

## What's NEW in Project 2 (the actual learning targets)

### Infrastructure & systems
- **FastAPI** (async Python, type-first, OpenAPI for free)
- **Async Python** (`async`/`await`, async DB drivers, async iteration)
- **Multi-tenancy** — schemas for it (shared-DB shared-schema with `tenant_id` column, vs shared-DB separate-schema, vs DB-per-tenant) + Postgres Row-Level Security (RLS)
- **Subdomain or path-based tenant resolution** (`muskan.staysense.app` vs `staysense.app/t/muskan`)
- **Redis** — caching layer, session store, pub/sub, rate-limit backend, Celery broker
- **Celery** — task queue, workers, scheduled jobs (Celery Beat), retries, dead-letter queues
- **Docker + Docker Compose** — containerize each service, multi-service local stack
- **nginx** — reverse proxy, SSL termination, rate limiting, load balancing across FastAPI workers
- **CI/CD** — GitHub Actions: lint, test, build container, deploy
- **Observability** — Sentry, OpenTelemetry tracing, Prometheus metrics, Grafana dashboards, structured logs aggregator
- **Database** — connection pooling (pgbouncer), read replicas (optional), index strategy with EXPLAIN, partial indexes, query plan reading
- **Zero-downtime deploys** — blue-green via GitHub Actions, backwards-compatible migrations
- **Production secrets** — Doppler / Render env / Vercel env, secret rotation hygiene

### Machine Learning
- **Embeddings** — what they are mathematically (vectors in ~1500-d space), cosine vs Euclidean vs dot-product
- **Vector databases** — Qdrant (recommended for multi-tenant), Pinecone, Weaviate, Milvus, Chroma; index types (HNSW, IVF)
- **Semantic search** — turn queries into vectors, find nearest neighbors
- **Hybrid retrieval** — BM25 (lexical) + dense vectors fused with Reciprocal Rank Fusion
- **Re-ranking** — Cohere Rerank or BGE-reranker as a second-stage filter
- **Classical ML for ranking** — sklearn / PyTorch, click-through-rate prediction, LightGBM
- **Content-based vs collaborative filtering** — pros/cons
- **Recommendation systems** — implicit feedback, cold-start, exploration vs exploitation
- **Evaluation metrics** — precision@k, recall@k, MRR, NDCG

### GenAI / LLMs (deep)
- **LLM API basics** — Claude API, OpenAI API, structured outputs, tool use
- **Prompt engineering** — system prompts, few-shot, chain-of-thought, role priming
- **Prompt caching** (Anthropic-specific, big cost win)
- **Streaming responses** — Server-Sent Events from FastAPI to browser; never make users wait
- **RAG (Retrieval-Augmented Generation)** — chunking strategies (fixed, semantic, hierarchical), embedding model choice, retrieval, re-rank, generation, citations
- **Per-tenant RAG** — each hostel has its own corpus + index; query routing
- **LangChain** — chains, memory, tools, output parsers (start here)
- **LangGraph** — stateful multi-step agents with checkpoints
- **LlamaIndex** — alternative RAG framework with strong indexing primitives
- **MCP (Model Context Protocol)** — Anthropic's open standard; build StaySense as an MCP server so any AI client (Claude Desktop, etc.) can plug in
- **Agent patterns** — ReAct (Reason + Act), Plan-Execute, Reflexion
- **Tool use / function calling** — define schema, let LLM pick + call, return result, loop until done
- **Multimodal LLMs** — vision (Claude / GPT-4o / Gemini) for hostel photo analysis
- **Voice AI** — Whisper STT, ElevenLabs TTS, real-time loop
- **Local LLMs** — Ollama for on-device, llama.cpp, quantization (Q4/Q5/Q8 trade-offs)
- **Fine-tuning** — supervised fine-tuning (SFT) on a small open model, LoRA / QLoRA for parameter-efficient adaptation
- **Guardrails** — prompt injection defense, PII redaction, off-topic blocking (Guardrails AI, NeMo Guardrails)
- **Evaluation** — RAGAS, LangSmith, golden datasets, LLM-as-judge, regression testing for prompts
- **Cost & latency engineering** — model cascading (cheap model first, escalate), caching, batching

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
                       │ (load balancer)│     + tenant subdomain routing
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
           │  │     │ (multipurpose)│    │  │     + session + rate-limit store
           │  │     └─────┬────────┘    │  │
           │  │           │              │  │
           ▼  ▼           ▼              ▼  ▼
    ┌──────────────┐ ┌────────────┐ ┌──────────────┐
    │   Postgres   │ │  Celery    │ │ ML / GenAI   │
    │ (multi-tenant│ │  workers   │ │  service     │
    │ schema + RLS)│ │ (async fan)│ │ (LangChain + │
    └──────┬───────┘ └─────┬──────┘ │  LangGraph + │
           │               │         │   MCP)       │
           ▼               ▼         └──────┬───────┘
   Tenants, hostels,   - Embed new listing │
   listings, bookings, - Re-index RAG      │ embeddings
   reviews, users,     - Scrape competitor │ + retrieval
   conversations       - Send notifications│
                       - Generate weekly   ▼
                         summaries  ┌──────────────┐
                                    │  Vector DB   │
                                    │   (Qdrant)   │
                                    │ tenant-      │
                                    │ scoped       │
                                    │ collections  │
                                    └──────────────┘

   Observability sidecar:  Sentry · OpenTelemetry → Tempo · Prometheus → Grafana
```

---

## Phase-by-phase breakdown

Every phase ends with a **deliverable** Pratik can show, plus explicit **learning outcomes**.

---

### Phase 0 — Bridge from Project 1 (~1 week, 3-4 sessions)

**Goal:** decide the actual scope and stand up the empty project.

**Sub-milestones:**
- **M0.1** Read this roadmap top-to-bottom; lock or pivot the working title (StaySense / DocSense / PriceProphet / EduMatch)
- **M0.2** Create fresh repo + GitHub remote; decide directory (recommendation: separate dir, separate repo, separate Vercel + Render projects)
- **M0.3** Create `LEARNING_PROJECT2.md` journal (mirrors Project 1's `LEARNING.md` pattern)
- **M0.4** Stub: `pyproject.toml`, `.gitignore`, `Dockerfile` skeleton, `docker-compose.yml` skeleton, FastAPI hello-world
- **M0.5** Run FastAPI locally via `uvicorn`, hit `GET /` returns JSON

**Deliverable:** empty FastAPI app running on `localhost:8000`, repo on GitHub, journal initialized.

**Learning outcomes:** FastAPI hello-world; understand `uvicorn` vs `gunicorn`; ASGI vs WSGI mental model.

---

### Phase 1 — Multi-tenant Foundation (~3-4 weeks)

**Goal:** an authenticated, multi-tenant FastAPI backend with versioned migrations, deployed.

**Sub-milestones:**
- **M1.1** FastAPI app structure (`app/`, `api/`, `db/`, `models/`, `schemas/`, `core/`)
- **M1.2** Async SQLAlchemy + async Postgres driver (`asyncpg`) + Alembic
- **M1.3** Multi-tenant schema design — `tenants`, `tenant_users`, `hostels`, `listings`, `bookings`, `reviews` tables, every domain row has `tenant_id`
- **M1.4** Tenant resolution middleware — read `X-Tenant-Slug` header (or subdomain) → load tenant → inject into request context
- **M1.5** Postgres Row-Level Security policies for tenant isolation (defense in depth: even if app code forgets `WHERE tenant_id = ?`, the DB enforces it)
- **M1.6** Auth: per-user JWT signed with tenant_id claim + tenant API keys for service-to-service
- **M1.7** Login + register endpoints, hashed passwords (`argon2` or `bcrypt`), refresh tokens
- **M1.8** Migrate Lalpur Hostels' Project 1 data into tenant #1 via a one-off Alembic data migration
- **M1.9** Dockerize: `Dockerfile` (multi-stage build), `docker-compose.yml` (api + postgres + redis), local stack up via `docker compose up`
- **M1.10** Deploy to Render multi-service (api + postgres + redis), env vars, custom domain optional

**Deliverable:** logged-in user can hit `GET /hostels` and see only their tenant's data. Trying to access another tenant's data returns 403 (RLS-enforced).

**Learning outcomes:** FastAPI structure, async Python, multi-tenancy patterns (3 models with trade-offs), RLS, password hashing, Docker multi-stage builds, multi-service Render deploy.

**Why this matters:** every B2B SaaS Pratik will ever build needs this foundation. It's the layer everything else assumes.

---

### Phase 2 — Search, Recommendations & Embeddings (~4-5 weeks)

**Goal:** the recommendation engine. From naive filters to vector + ranking.

**Sub-milestones:**
- **M2.1** Filter-based recommender v1: `GET /recommend?city=ranchi&budget=8000&gender=girls` — pure SQL WHERE clauses. Tenant-scoped.
- **M2.2** Intro to embeddings — math, intuition, picking a model (OpenAI `text-embedding-3-small` vs BGE-small for local). Embed every hostel description, store as `pgvector` column.
- **M2.3** Semantic search v2: query text → embedding → cosine-similarity SQL query (`pgvector` ORDER BY `description <=> query_vec`). Compare results to v1.
- **M2.4** Add a dedicated vector DB (Qdrant) — when pgvector hits its limits, move to Qdrant. Learn the trade-offs.
- **M2.5** Hybrid retrieval v3: BM25 (Postgres full-text or OpenSearch) + dense + Reciprocal Rank Fusion. Measurably better than either alone.
- **M2.6** Re-ranker v4: top-50 from hybrid → Cohere Rerank or BGE-reranker → top-10 personalized
- **M2.7** Click-through logging — every recommendation → which hostel was clicked → eval signal
- **M2.8** Learning-to-rank model v5: train a LightGBM ranker on the click logs (offline eval first)
- **M2.9** Redis hot-query cache — same query within 5 min serves from Redis, not DB+vectors
- **M2.10** Evaluation harness: precision@10, MRR, NDCG on a held-out test set

**Deliverable:** A query like "budget girls' PG with mess near MIT Ranchi for ₹8k/month" returns ranked results that visibly beat naive filters.

**Learning outcomes:** vector embeddings (intuition + math), cosine vs euclidean vs dot-product, pgvector vs dedicated vector DB, hybrid retrieval, re-ranking, learning-to-rank, recsys eval metrics, Redis caching strategies (cache-aside, write-through).

---

### Phase 3 — Async Jobs, Observability, CI/CD (~3 weeks)

**Goal:** the production-readiness layer. Async work, monitoring, automated deploys.

**Sub-milestones:**
- **M3.1** Celery + Redis broker — first async task: send welcome email after signup
- **M3.2** Idempotent task design — retries don't double-charge / double-send
- **M3.3** Celery Beat scheduled jobs — daily re-index of vector DB, weekly digest emails
- **M3.4** Dead-letter queue for failed tasks; alerts on DLQ depth > N
- **M3.5** Sentry integration — uncaught exceptions land with full traceback + user/tenant context
- **M3.6** Structured logging in JSON, shipped to a free aggregator (Better Stack, Axiom, or Loki self-hosted)
- **M3.7** OpenTelemetry distributed tracing — see the full request span from nginx → FastAPI → Postgres → Celery → vector DB
- **M3.8** Prometheus metrics exposed at `/metrics`; Grafana dashboard with p50/p95/p99 latency, RPS, error rate
- **M3.9** GitHub Actions CI: on push → lint (ruff) → typecheck (mypy / pyright) → tests (pytest) → build container
- **M3.10** GitHub Actions CD: on green main → deploy via Render's API or push container to registry

**Deliverable:** when something breaks in prod, you find out within 30 seconds (Sentry alert) and can debug from the trace (OpenTelemetry).

**Learning outcomes:** Celery + Redis as broker, task idempotency, observability triad (metrics + logs + traces), CI/CD pipelines, semantic versioning of containers.

---

### Phase 4 — GenAI: RAG, Agents, MCP, Evals (~6-8 weeks) ⭐ THE BIG ONE

**Goal:** every modern AI capability integrated, evaluated, and production-grade. This phase is roughly half the project by time.

**Sub-milestones:**

**M4.1 — LLM basics (1 wk):** Claude API hello-world, prompt structure, structured outputs (XML or JSON), streaming responses to the browser via SSE. Prompt caching for repeated system prompts.

**M4.2 — Per-tenant RAG v1 (1.5 wk):** Each tenant has policies/FAQs/listings ingested → chunked → embedded → indexed in a tenant-scoped Qdrant collection. Query routes to the right tenant's collection. Return answer with citations.

**M4.3 — Chunking strategies (0.5 wk):** Fixed-size vs semantic vs hierarchical vs late-chunking. A/B test on the eval set.

**M4.4 — Hybrid RAG (1 wk):** Same hybrid retrieval as recsys (BM25 + dense + RRF + re-rank), now used to feed the LLM. Quality jump is measurable.

**M4.5 — Tool use / function calling (1 wk):** Define tools: `search_hostels`, `check_availability`, `book_tour`, `get_reviews`. LLM picks + calls + uses results. Loop until LLM stops calling tools.

**M4.6 — LangChain (1 wk):** Refactor M4.1-4.5 into LangChain primitives. Learn chains, memory (conversation history), output parsers. Note where LangChain helps vs hurts.

**M4.7 — LangGraph stateful agents (1 wk):** Multi-step workflows: gather requirements → search → present → answer follow-up → book. State persists across turns, checkpointed in Redis.

**M4.8 — MCP server (0.5 wk):** Wrap StaySense's data + tools as an MCP server. Anyone running Claude Desktop can plug in and query their hostel data. This is portfolio-grade.

**M4.9 — Guardrails (0.5 wk):** Prompt injection defense (instructional firewall), PII redaction on input AND output, off-topic refusal, tenant data leakage prevention.

**M4.10 — Evaluation framework (1 wk):** Golden dataset of 100 Q&A pairs per tenant. RAGAS for faithfulness/relevance scores. LangSmith for trace inspection. LLM-as-judge for nuanced quality. Regression tests run in CI when prompts change.

**M4.11 — Cost & latency engineering (0.5 wk):** Model cascading (Haiku for cheap → Sonnet for hard), prompt caching audit, batch API for non-realtime work. Measure cost-per-conversation.

**M4.12 — Optional advanced (variable):**
- **Fine-tuning with LoRA** — fine-tune Mistral-7B on hostel domain Q&A; serve via Ollama
- **Multimodal** — Claude/GPT-4o reads hostel photos, generates descriptions, compares amenities visually
- **Voice AI** — Whisper STT → agent → ElevenLabs TTS for inquiry calls
- **GraphRAG** — extract entity graph (hostels, amenities, locations) from reviews; use graph traversal for structured queries

**Deliverable:** a working tenant-specific chatbot that can answer policy questions with citations, search the catalog, check availability, and book a tour — all evaluated against a golden dataset with regression tests.

**Learning outcomes:** end-to-end modern AI stack. By the end of Phase 4, Pratik will have hands-on experience with every concept that matters in 2026 GenAI.

---

### Phase 5 — Scale, Performance & Security (~3 weeks)

**Goal:** make it actually production-grade. The 99% case is fast; the 1% case is handled.

**Sub-milestones:**
- **M5.1** nginx prod config — SSL via Let's Encrypt, HTTP/2, gzip, cache headers, security headers (CSP, HSTS), rate limit zones per endpoint
- **M5.2** FastAPI horizontal scaling — multiple workers behind nginx, sticky sessions disabled (truly stateless), session in Redis
- **M5.3** Postgres connection pooling via pgbouncer; tune pool size
- **M5.4** Read replica for Postgres (optional, if traffic justifies)
- **M5.5** Query optimization — EXPLAIN ANALYZE on slow queries, add indexes, partial indexes for `WHERE actioned = false`
- **M5.6** Background job priority queues — user-facing work (chatbot) has its own queue, never blocked by slow batch jobs
- **M5.7** Auth hardening — refresh token rotation, revocation, suspicious-login detection
- **M5.8** Multi-region awareness — if Render expands or you move to AWS, what changes
- **M5.9** Blue-green deploys via GitHub Actions — zero-downtime, instant rollback
- **M5.10** Database migrations in prod — expand-contract pattern, never break old code mid-deploy

**Deliverable:** p95 latency < 200ms for the recommendation endpoint, < 1s for chatbot first-token; can deploy without anyone noticing.

**Learning outcomes:** the difference between "works" and "works at scale" — connection pools, indexes, query plans, deploy strategies, security headers.

---

### Phase 6 — Polish, Launch, Real Users (~2-3 weeks)

**Goal:** put it in front of real hostel owners and real students.

**Sub-milestones:**
- **M6.1** Tenant admin dashboard — re-use Project 1's editorial style, but multi-tenant. Each tenant sees only their own data.
- **M6.2** Public landing page — explain StaySense to hostel owners (B2B) and students (B2C). SEO-ready.
- **M6.3** Onboarding flow — new hostel owner signs up → creates tenant → ingests their data → AI chatbot live within 10 min
- **M6.4** Billing (optional) — Stripe integration, free tier + paid tiers
- **M6.5** Documentation site — auto-generated from FastAPI OpenAPI + handwritten guides
- **M6.6** First non-Lalpur tenant — find one friend's hostel, onboard them, watch them use it, fix what breaks
- **M6.7** Demo from phone — public URL Pratik can show anyone

**Deliverable:** a real third party uses StaySense to manage their hostel.

**Learning outcomes:** product polish, real-user feedback loops, deployment maturity.

---

### Phase 7 (optional, stretch) — Above-and-beyond

- **Kubernetes** — graduate from Render to a managed K8s (DigitalOcean / GKE Autopilot). Learn pods, services, ingress, HPA.
- **Service mesh** — Istio or Linkerd. Probably overkill for 3 services; learn for resume.
- **Event-driven architecture** — Kafka or Redis Streams. Useful if StaySense grows to 50+ tenants with cross-tenant analytics.
- **Multi-region deploy** — read replicas in another region, geo-DNS routing.
- **A/B testing framework** — feature flags (Unleash / GrowthBook), assign tenants to recommendation algorithm variants, measure lift.
- **Mobile app** — React Native or Expo, share auth + design tokens with web.

---

## Timeline (realistic)

```
2026-05  Phase 0  bridge + repo setup
2026-05  Phase 1  multi-tenant FastAPI foundation                  [~4 wks]
2026-06  Phase 2  search + embeddings + recsys                     [~5 wks]
2026-07  Phase 3  async jobs + observability + CI/CD               [~3 wks]
2026-08  Phase 4  GenAI (RAG, agents, MCP, evals)                  [~7 wks] ← longest
2026-10  Phase 5  scale + perf + security                           [~3 wks]
2026-11  Phase 6  polish + first real tenant                        [~3 wks]
2026-12  Phase 7  stretch (only if motivated)
```

Buffer assumed: 1-2 weeks per phase. Real life happens.

---

## Alternative project ideas (in case StaySense doesn't excite future-Pratik)

### Alternative A — "DocSense": Document Intelligence Platform
B2B SaaS where small businesses upload PDFs/contracts and get AI Q&A, classification, compliance flagging.
- **Pros:** B2B, real revenue, all the ML/RAG concepts apply
- **Cons:** Less tied to hostels, more abstract, less domain knowledge advantage

### Alternative B — "PriceProphet": Hostel Pricing Optimizer
ML model that predicts demand for hostels and suggests dynamic pricing.
- **Pros:** Tightly tied to Project 1, time-series ML, real ROI
- **Cons:** Smaller scope, fewer infra concepts, less GenAI

### Alternative C — "EduMatch": Tutor/Coaching Platform
Same multi-tenant pattern as StaySense, but for tutors/coaching centers in Ranchi.
- **Pros:** Larger market, similar architecture, easy to validate locally
- **Cons:** Diverges from hostel domain

---

## Risks + decision points

| Risk | Mitigation |
|---|---|
| **Scope creep — adding too much in one phase** | Phases have hard deliverables; don't enter next phase until deliverable is met |
| **GenAI burnout — Phase 4 is huge** | Optional sub-milestones (M4.12) are explicitly optional; stop when basics are solid |
| **Render free tier limits** | Phase 1 stays on free; upgrade only when Phase 5 needs always-on |
| **Vector DB cost** | Start with pgvector (free, in Postgres); move to Qdrant only when scale demands |
| **LLM API cost** | Prompt caching + model cascading + Haiku-by-default keeps cost minimal; budget alert at $20/mo |
| **Single dev (Pratik) bus factor** | Document everything in `LEARNING_PROJECT2.md` as you go; future-Pratik or a collaborator can pick up |
| **AI moves fast — stack obsoletes** | Treat LangChain/LlamaIndex as replaceable glue; learn fundamentals (embeddings, retrieval, prompting) which don't obsolete |

---

## Pre-reading (skim, don't binge — ~30 min/week before kickoff)

**Infrastructure side:**
- **System Design:** *"System Design Interview"* by Alex Xu — Vol 1 covers everything Project 2 uses
- **nginx:** Official Beginner's Guide — nginx.org/en/docs/beginners_guide.html
- **Docker:** docs.docker.com/get-started
- **Multi-tenancy:** Search "multi-tenant SaaS architecture" — read 3-4 articles, esp. Auth0's overview
- **FastAPI:** fastapi.tiangolo.com/tutorial/ — better than Flask docs for async patterns
- **Async Python:** real-world async vs blocking, see realpython.com/async-io-python/

**AI / GenAI side:**
- **LangChain docs:** python.langchain.com — "Tutorials → Chatbot" then "Tutorials → Agent"
- **LangGraph:** langchain-ai.github.io/langgraph/ — stateful agents; AFTER plain LangChain
- **MCP spec:** modelcontextprotocol.io — short, one sitting
- **Anthropic Engineering blog:** anthropic.com/engineering — prompt caching, tool use, agent patterns
- **OpenAI Cookbook:** github.com/openai/openai-cookbook — production patterns
- **RAG techniques:** "Advanced RAG" series by LlamaIndex blog; Pinecone learning center
- **Vector search math:** 1-hour read on cosine vs Euclidean vs dot-product
- **LLM fine-tuning:** HuggingFace course Chapter 7 (free); start with a small classifier, then LoRA
- **Evaluation:** RAGAS docs + Hamel Husain's "LLM evals" blog post — without evals you're flying blind

---

## How sessions will run (the collab contract)

Same as Project 1's teaching style, with one change:

1. **Claude teaches concept** — what it is, why it exists, real-world analogy, DSA mapping
2. **Claude gives a code block** Pratik types into a file (Claude does NOT use Edit/Write)
3. **Pratik types it, saves, says "done"**
4. **Claude reviews** (via Read) and either approves or course-corrects
5. **Test the slice** — curl / browser / pytest as appropriate
6. **Footer tracker** on every reply: `📚 Phase N · M X.Y · Step a/b`

**What's different vs Project 1:** Pratik types **everything**, including UI markup. No shortcut. Slower, deeper.

**Exceptions:** purely boilerplate scaffolding (`.gitignore`, lockfiles) — Claude can offer to write after asking once.

---

## Session 1 plan (when Pratik says "let's start")

1. Re-read this file together (10 min) — verify scope still fits
2. Confirm working title (StaySense or pivot)
3. Decide repo location — recommendation: `E:\STAYSENSE\` (separate from `E:\HOTEL WEB\`), fresh `git init`, fresh GitHub repo
4. Create `LEARNING_PROJECT2.md` modeled on Project 1's journal
5. Initialize `project_current_milestone.md` memory to point at Project 2 Phase 0 M0.1
6. Verify tooling: Python version, Docker installed, `uv` or `pip` choice, IDE setup
7. Start M0.1 (the read-through is itself M0.1 if Pratik agrees)

---

## Final note

Project 1 proved Pratik can ship. Project 2 proves Pratik can architect.

The plan is ambitious. The plan is also flexible — phases compose, sub-milestones are skippable, the timeline is realistic-not-aggressive. The goal isn't to race; it's to come out the other end able to build any production AI-native B2B SaaS from first principles.

Saved 2026-04-27. Substantially expanded 2026-05-11. Re-architected for full code authorship + deep AI integration 2026-05-12.
