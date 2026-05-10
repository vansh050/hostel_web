# Project 2 Roadmap — "StaySense"

> Saved 2026-04-27. Start date: tentative late 2026, after Project 1 Phase 5 finishes.
>
> **Why this file exists:** When Pratik finishes Project 1 (the hostel website with GenAI features), he wants to roll directly into a deeper, larger project that uses every concept he learned and adds the heavy infrastructure topics he didn't cover yet — load balancers, nginx, multi-tenancy, ML at scale. This document is the plan.

---

## TL;DR

**StaySense** is a real-time hostel/PG recommendation platform for Indian Tier-2/3 cities. Multi-tenant B2B+B2C SaaS. Pratik's 3 hostels (Muskan, Sanskriti, Sankalp) become the first tenants. Other hostel owners list. Students/workers find their match via ML-driven recommendations + per-tenant AI chatbot.

The project is the natural extension of Project 1 (Lalpur Hostels) — same domain, but at scale.

**Estimated timeline:** ~5 months at 6 hrs/week. Concrete milestones below.

---

## Why this project (the rationale)

| Reason | Detail |
|---|---|
| **Extends Project 1 naturally** | Lalpur Hostels become tenant #1. No throwaway demo. |
| **Forces every concept Pratik wants** | Multi-tenancy → load balancers, caching, queues, sharding, observability |
| **Real ML, not toy ML** | Recommendation, ranking, embeddings, fine-tuning |
| **Real GenAI** | Per-tenant RAG, agents, function calling, evaluation framework |
| **Has business potential** | If it works for 3 hostels and 5 friends', it's a real B2B SaaS |
| **Portfolio-grade** | Multi-tenant ML platform = senior-level resume material |
| **Demoable from a phone** | "I built this" — concrete, impressive |

---

## Architecture (where every concept lives)

```
                            🌐 Internet
                                │
                                ▼
                       ┌────────────────┐
                       │  Cloudflare    │  ← CDN + DDoS protection
                       │  (free tier)   │
                       └───────┬────────┘
                               │
                               ▼
                       ┌────────────────┐
                       │     nginx      │  ← Reverse proxy + SSL + rate limit
                       │  (load balance) │     ⭐ Where you LEARN nginx
                       └───┬──────┬─────┘
                           │      │
                  ┌────────┘      └────────┐
                  ▼                        ▼
         ┌───────────────┐        ┌───────────────┐
         │  API Server 1  │        │  API Server 2  │  ← horizontally scaled
         │  (FastAPI)     │        │  (FastAPI)     │     ⭐ Load balancing
         └────┬──────┬───┘        └────┬──────┬───┘
              │      │                  │      │
              │      └──────┬───────────┘      │
              │             ▼                  │
              │      ┌─────────────┐           │
              │      │   Redis     │           │  ← Cache + queue + sessions
              │      │ (cache+queue)│          │     ⭐ Distributed caching
              │      └──┬──────┬───┘           │
              │         │      │               │
              ▼         ▼      ▼               ▼
       ┌───────────┐  ┌──────────┐  ┌──────────────────┐
       │ Postgres  │  │  Celery   │  │ ML Model Server  │
       │ (multi-   │  │  workers   │  │ (FastAPI + GPU?) │
       │ tenant)   │  │ (async)   │  │                  │
       └────┬──────┘  └─────┬────┘  └──────────────────┘
            │               │              ▲
            ▼               ▼              │ inference
       Tenant tables    Embedding jobs,    │
       Hostel data      RAG indexing,      │
       Bookings         review NLP,        │
       Reviews          scraping           │
                        │                  │
                        └──Vector DB───────┘
                           (Qdrant/Chroma)
                           ⭐ RAG storage
```

---

## Concept-to-layer mapping

| Layer | Concepts learned |
|---|---|
| Cloudflare | CDN, edge caching, DDoS basics |
| nginx | Reverse proxy, SSL termination, rate limiting, load balancing — ⭐ user-requested |
| Multi-server deploy | Horizontal scaling, statelessness |
| FastAPI | Modern async Python framework, type-safe (upgrade from Flask) |
| Redis | Caching, message queues, pub/sub |
| Postgres | Multi-tenant schema design, indexes, migrations |
| Celery | Background jobs, task queues |
| Vector DB | Embeddings, semantic search at scale |
| ML serving | Inference APIs, model versioning, A/B testing |
| Recommendation models | Collaborative filtering, content-based, hybrid |
| Observability | Prometheus, Grafana, structured logs, OpenTelemetry tracing |
| CI/CD | GitHub Actions, automated tests, blue-green deploys |
| Docker/Compose | Containers, multi-container orchestration |
| Optional: Kubernetes | Container orchestration at scale |

---

## Phase-by-phase breakdown

### Phase 1 — Foundation (~3 weeks)
- Multi-service FastAPI backend
- Multi-tenant Postgres schema (tenants, hostels, users, bookings, reviews, listings)
- Alembic migrations
- Docker Compose: Postgres + Redis + 2 API instances + nginx
- Migrate Lalpur Hostels' data from Project 1
- Deploy on Render (multi-service)

### Phase 2 — Search & ML basics (~4 weeks)
- Recommender v1: filter-based (location, budget, gender)
- Recommender v2: embeddings + similarity search
- Vector DB: Qdrant or Chroma
- ML ranking model (PyTorch or sklearn)
- Hot-query Redis caching

### Phase 3 — Async & background jobs (~3 weeks)
- Celery for async tasks (booking confirmations, review scraping)
- Scheduled jobs (daily re-index, refresh recommendations)
- Webhooks (payment integration optional)
- Monitoring: Prometheus + Grafana on Docker

### Phase 4 — GenAI features at scale (~5 weeks)
- Per-tenant RAG: each hostel's policies/FAQs → its own vector index
- Tenant-aware chatbot
- LLM agent with function calling (query DB live)
- Review sentiment analysis (HuggingFace transformers)
- Evaluation framework (golden dataset, LLM-as-judge)

### Phase 5 — Scale & production (~3 weeks)
- nginx config: SSL, rate limiting, load balancing
- Horizontal scaling of FastAPI workers
- Connection pooling, query optimization
- Read replicas for Postgres (optional)
- Blue-green deployment via GitHub Actions

### Phase 6 — Observability & polish (~2 weeks)
- Sentry for error tracking
- Distributed tracing (OpenTelemetry)
- Admin dashboard for tenants
- Landing page + onboarding flow
- Demo from phone

**Total: ~20 weeks (~5 months @ 6 hrs/wk)**

---

## When to start

**Recommendation:** after Project 1's Phase 5 (GenAI features) wraps. Tentative kick-off: **late October / November 2026**.

Why this timing:
- Pratik will have shipped Project 1's chatbot + RAG → knows the basics
- Project 2 lets him do those same things AT SCALE (multi-tenant, optimized)
- Concepts are deepened, not repeated
- By then he'll naturally feel ready for "what's next?"

```
2026-04 to 2026-07   Project 1 Phases 1-3 (web + DB + jobs)
2026-08 to 2026-10   Project 1 Phases 4-5 (GenAI features)
2026-11 onwards      Project 2 — StaySense
2027-04 ish          Project 2 done → senior-tier engineer
```

---

## Alternative project ideas (in case StaySense doesn't excite future-Pratik)

### Alternative A — "DocSense": Document Intelligence Platform
B2B SaaS where small businesses upload PDFs/contracts and get AI Q&A, classification, compliance flagging.
- **Pros:** B2B, real revenue, all the ML/RAG concepts
- **Cons:** Less tied to hostels, more abstract

### Alternative B — "PriceProphet": Hostel Pricing Optimizer
ML model that predicts demand for hostels and suggests dynamic pricing.
- **Pros:** Tightly tied to Project 1, time-series ML, real ROI
- **Cons:** Smaller scope, fewer infra concepts, less GenAI

### Alternative C — "EduMatch": Tutor/Coaching Platform
Same multi-tenant pattern as StaySense, but for tutors/coaching centers in Ranchi.
- **Pros:** Larger market, similar architecture, easy to validate locally
- **Cons:** Diverges from hostel domain

---

## Pre-reading (optional, for downtime before kickoff)

Don't binge. ~30 min/week is plenty. The real learning happens when building.

- **System Design:** *"System Design Interview"* by Alex Xu — covers everything Project 2 uses
- **nginx:** Official Beginner's Guide — nginx.org/en/docs/beginners_guide.html
- **Docker:** docs.docker.com/get-started
- **Multi-tenancy:** Search "multi-tenant SaaS architecture" — read 3-4 articles
- **FastAPI:** fastapi.tiangolo.com/tutorial/ (better than Flask docs for learning async patterns)

---

## How to come back to this

When Project 1 wraps, Pratik should:

1. Read this file top to bottom
2. Look at his Project 1 codebase — appreciate what he built
3. Decide: still excited about StaySense? Or has the alternative grown on him?
4. Tell Claude: *"let's start Project 2 — going with [StaySense / DocSense / PriceProphet / EduMatch / something new]"*
5. Claude will then create a fresh `LEARNING_PROJECT2.md` and a Phase 1 milestone breakdown

This file is the seed. Future-Pratik decides if it grows into the actual project or pivots.

---

## Final note

The user explicitly asked to save this plan after the M3 deployment celebration on 2026-04-27. He shipped Phase 1 (the live hostel website) the same day. He's serious about the long game.
