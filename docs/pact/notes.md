
# Consumer‑Driven Contract Testing (Pact) – Rollout Strategy

**Context**  
- Frontend: React Native mobile today, Web later – single monorepo.  
- Backends: Java microservices (each in its own repo): **booking-service**, **questionnaire-service**, **genomics-service**.  
- Squads: Product‑aligned (Booking, Questionnaire, Genomics) with separate FE/BE squads.  
- No BFF layer.

---
## 1) Goals (What “good” looks like)
- **Prevent breaking changes** between frontends and services before release.
- **Faster autonomous delivery** for squads via safe deploy gates (`can‑i‑deploy`).
- **Clear ownership** of API contracts per domain (Booking, Questionnaire, Genomics).
- **Traceability**: who can deploy where, which versions are compatible.

**Non‑goals**  
- Replacing component/UI tests or service unit tests.  
- End‑to‑end tests across all services.

---
## 2) Architecture (No BFF)
- Create a **consumer ↔ provider** contract per domain:  
  - `booking-client` (FE) → `booking-service` (BE)  
  - `questionnaire-client` → `questionnaire-service`  
  - `genomics-client` → `genomics-service`
- Contracts focus on the **API client layer** used by screens—not on UI components.

**Why**: small, focused contracts; clear squad ownership; easy to evolve interfaces independently.

---
## 3) Repository Layout & Ownership
**Frontend monorepo**
```
/apps/mobile
/apps/web
/packages/api-clients/
  booking/          # OWNED by Booking FE squad
    src/
    __tests__/contract/   # Pact tests here
  questionnaire/
  genomics/
/packages/pact-helpers/    # shared setup, publish scripts
```
**Backend repos** (one per service)
```
booking-service/   # OWNED by Booking BE squad
questionnaire-service/   # OWNED by Questionnaire BE squad
genomics-service/   # OWNED by Genomics BE squad
```

**Pacticipant names**  
- Consumers: `booking-client`, `questionnaire-client`, `genomics-client`  
- Providers: `booking-service`, `questionnaire-service`, `genomics-service`

---
## 4) Tooling & Conventions
- **Pact JS v3** (`@pact-foundation/pact`) for consumers (TypeScript).
- **pact‑jvm** (JUnit 5) for providers (Java).
- **Pact Broker** (self‑hosted or PactFlow SaaS) for sharing contracts, pending pacts, and deploy checks.
- **Matchers everywhere** (`like`, `eachLike`, `regex`) to avoid brittle tests.
- **Provider states** to create deterministic test data (e.g., *“questionnaire 42 exists”*).
- **Tagging**: publish with `--branch`; tag versions on promotion with environment (`test`, `staging`, `prod`).

---
## 5) CI/CD Integration
**Consumers (Azure DevOps)**
1. Run contract tests only for changed client packages.  
2. Publish pacts to Broker with branch + commit SHA.  
3. (Optional) Gate web deploys with `can‑i‑deploy`.

**Providers (GitHub Actions)**
1. Spin up service in test mode.  
2. Verify pacts from Broker with **pending** enabled.  
3. Publish verification results with branch + SHA.  
4. Gate deploys with `can‑i‑deploy` to `staging` and `prod`.

---
## 6) Governance (lightweight)
- **CODEOWNERS**: FE squads own their client packages; BE squads own provider verification tests.  
- **State naming** convention: `<entity> <id> exists`, `<entity> not found`, `<user> has no <entity>`.
- **Change policy**: Consumer adds/changes field → publishes pact (pending). Provider verifies on a branch, implements, merges, deploys via `can‑i‑deploy`.
- **Dashboards**: Use Broker UI to view matrices (who can deploy where) per domain.

---
## 7) Rollout Plan (4 sprints)
**Sprint 1**  
- Stand up Broker (or onboard to PactFlow).  
- Extract `packages/api-clients/questionnaire` with 1–2 endpoints (e.g., *GET /questionnaires/:id*).  
- Add RN consumer pact tests; publish to Broker.  
- Add provider verification to **questionnaire-service**.

**Sprint 2**  
- Turn on **pending pacts** and start using `can‑i‑deploy` to gate provider deploys to **staging**.  
- Extend to error shapes (404/401) and list endpoints.

**Sprint 3**  
- Replicate pattern for **Booking** domain (top 2 endpoints: e.g., *GET /bookings/:id*, *POST /bookings*).  
- Add environment tags on promotion (`test`, `staging`).

**Sprint 4**  
- Add **Prod** `can‑i‑deploy` gate for providers (**booking-service**, **questionnaire-service**, **genomics-service**).  
- Add Web app tests (reusing the same clients).  
- Establish monthly contract review (quick 15‑min triage of pending pacts).

---
## 8) Risks & Mitigations
- **Over‑specified contracts** → brittle: *Mitigate with matchers and minimal required fields.*  
- **Flaky verification due to data**: *Use provider states; avoid calling real downstreams.*  
- **Cross‑repo coordination pain**: *Broker + pending pacts + clear ownership reduces sync meetings.*  
- **Pipeline noise**: *Run consumer tests only on changed client packages; cache dependencies.*

---
## 9) Success Metrics
- Mean time to detect API breaking change (goal: before merge to main).  
- % of provider releases passing `can‑i‑deploy` on first try (target ≥ 90%).  
- Lead time from FE change request to BE deploy (trend down).  
- Contract coverage: # endpoints with contracts per domain (trend up).

---
## 10) Appendix – Helpful Snippets
**Consumer publish (Azure DevOps)**
```
npx pact-broker publish ./pacts   --consumer-app-version "$BUILD_SOURCEVERSION"   --branch "$BUILD_SOURCEBRANCHNAME"   --broker-base-url "$PACT_BROKER_URL"   --broker-token "$PACT_BROKER_TOKEN"
```

**Provider verify (Gradle)**
```
./gradlew test   -Dpact.verifier.publishResults=true   -Dpact.provider.version=$GIT_SHA   -Dpact.provider.branch=$GIT_BRANCH   -Dpact.verifier.enablePending=true
```

**Deploy gate**
```
npx pact-broker can-i-deploy   --pacticipant questionnaire-service   --version $GIT_SHA   --to-environment staging   --broker-base-url $PACT_BROKER_URL   --broker-token $PACT_BROKER_TOKEN

npx pact-broker can-i-deploy   --pacticipant booking-service   --version $GIT_SHA   --to-environment staging   --broker-base-url $PACT_BROKER_URL   --broker-token $PACT_BROKER_TOKEN

npx pact-broker can-i-deploy   --pacticipant genomics-service   --version $GIT_SHA   --to-environment staging   --broker-base-url $PACT_BROKER_URL   --broker-token $PACT_BROKER_TOKEN
```

**Domain-specific directory skeleton (frontend)**
```
/packages/api-clients/
  questionnaire/
    src/index.ts
    __tests__/contract/getById.pact.test.ts
  booking/
    src/index.ts
    __tests__/contract/createBooking.pact.test.ts
  genomics/
    src/index.ts
    __tests__/contract/getGenomicProfile.pact.test.ts
/packages/pact-helpers/
```

**Provider state examples**
- `questionnaire 42 exists`  
- `questionnaire 404 not found`  
- `booking 123 exists` / `booking 123 cancelled`  
- `user 321 has no bookings`  
- `genomic profile GP-9 exists` / `genomic profile not found`

---
**Ask**  
- Approve the rollout plan.  
- Nominate FE/BE champions per domain to own the first contracts.  
- Provide Broker URL/token as CI secrets in Azure and GitHub.
