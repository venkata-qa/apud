# DTP – Quality Engineering Maturity Assessment  
📅 Date: [Insert Date]  
✍️ Author: Hymnal, Test Lead  

---

## 1. Context & Opportunity  

DTP is designed around modular, reusable product components — such as Booking, Questionnaire, etc. These modules are developed by dedicated frontend and backend squads and later customised by business teams to form end-to-end flows. These flows are deployed into the **My Bupa mobile app**, with web support planned.

This modularity offers flexibility but introduces complexity for quality:  
- Testing often happens late (post-integration)  
- Integration issues are discovered too close to release  
- No clear framework exists for validating multi-product business flows  

This assessment outlines the current QA landscape and proposes an actionable roadmap to shift quality earlier, increase automation, and make release readiness visible.

---

## 2. Current Engineering Setup  

| Layer         | Description |
|---------------|-------------|
| **Frontend**  | React Native for mobile; future support for web. Azure DevOps CI in place. Unit tests, Detox, linting, and Checkmate used across squads. |
| **Backend**   | Java-based microservices (GitHub + GCP CI). JUnit and Mockito used for logic testing; partial contract validation occurs. |
| **Integration** | Business teams configure product modules into flows. Shell app exists, but is underused for automated testing. |
| **Deployment**  | Final flows are published to the **My Bupa mobile app**. OTA updates supported. Web channel planned. |

---

## 3. Functional Testing Layers  

Testing currently happens in isolation within teams. We need to validate at both **product-level (FE ↔ BE)** and **flow-level (multi-product)**.

| Level                         | What It Covers                                         | Who Owns It        |
|-------------------------------|--------------------------------------------------------|--------------------|
| **Frontend Functional Testing**   | Component and screen logic validation (unit + Detox)     | Frontend squads    |
| **Backend Functional Testing**    | Business logic and service response (unit + Mockito)     | Backend squads     |
| **Product-Level Integration Testing** | End-to-end testing for one product’s FE ↔ BE handshake   | Shared product squad (FE + BE) |
| **Business Flow Integration Testing** | Flow of multiple products combined (e.g., Questionnaire → Booking) | Shared QA / Test Lead |
| **Deployment Validation (App Level)** | Final check of composed flow inside My Bupa app          | Shared / Release QA Team |

---

## 4. Capability Summary & Gaps  

| Area                          | Current State                        | Gap / Missing                                   | Intervention |
|-------------------------------|--------------------------------------|--------------------------------------------------|--------------|
| **Frontend Unit Testing**     | ✅ CI integrated                      | –                                               | Maintain test coverage and thresholds             |
| **Backend Unit Testing**      | ✅ CI integrated                      | –                                               | Continue logic-level validation with Mockito      |
| **Frontend Functional Testing** | ⚠️ Detox used by some squads         | Not consistent across modules                   | Define test scenarios per product and automate    |
| **Backend Functional Testing**  | ⚠️ Logic validation using Mockito    | No formal functional coverage for real-world data | Add functional tests with staging/test data       |
| **Product-Level Integration**   | ❌ Manual shell app testing          | No automated FE ↔ BE integration validation      | Automate per-product integration via shell app    |
| **Business Flow Integration**   | ❌ Not defined or tested             | Risk of failure across composed flows           | Define and automate multi-product flows in CI     |
| **Regression Testing**          | ❌ Not standardised                  | No repeatable coverage across modules           | Build reusable regression packs per product       |
| **Contract Testing**            | ⚠️ Informal contract checks          | Not enforced in CI pipelines                    | Integrate Pact and block merges on mismatch       |
| **Accessibility Testing**       | ⚠️ Tools known, not embedded         | Not enforced as a gate                          | Add axe-core, RN Inspector, Lighthouse to CI      |
| **Performance Testing**         | ❌ Not consistently measured         | No baseline or trends                           | Add k6 (API) + Lighthouse (FE) to pipelines       |
| **Risk-Based Testing (FMEA)**   | ❌ Not practiced                     | Testing not prioritised by risk                 | Host FMEA workshops; focus on critical flows      |
| **OAT Readiness**               | ❌ Informal                          | No checklist or automated readiness gate        | Define and enforce OAT per release/build          |
| **Test Data Management**        | ❌ Manual or inconsistent            | Fragile, non-repeatable environments            | Create reusable templates + automated teardown    |
| **Observability & Dashboards**  | ❌ Not in place                      | No visibility on test or release health         | Build CI dashboards for test results, OAT, etc.   |
| **Ownership Model**             | ❌ Unclear across layers             | Confusion on who owns what                      | Define & document per-squad responsibilities      |

---

## 5. QA Ownership Model  

| Stream               | Test Responsibilities                                                    | Exit Criteria |
|----------------------|---------------------------------------------------------------------------|---------------|
| **Frontend Squads**  | Unit tests, screen tests (Detox), A11y, consumer contracts                | Linting passed, Detox green, contract verified   |
| **Backend Squads**   | Unit tests, business logic, provider contracts, performance (API)         | Contract match, key scenarios tested             |
| **Product Teams**    | FE ↔ BE integration testing per product                                   | API + UI validated via shell app or mocks        |
| **Shared QA / Test Lead** | Business flow validation (multi-product), regression, FMEA, OAT     | End-to-end flow green, dashboards updated        |
| **Release QA**       | Final app deployment & OTA readiness                                      | OAT checklist passed, dashboards green           |

---

## 6. Why Shift-Left and CI/CD Are Critical  

Given these integration and coverage gaps, we must **shift quality left** and run all validation through our CI/CD pipelines.

### Why Shift-Left:
- Defects caught early are cheaper to fix
- Squads own and validate their modules before integration
- Reduces reliance on late-stage QA or release blockers

### CI/CD Enables:
- Tests to run on every commit/build
- Quality gates before merging or releasing
- Dashboards to give full visibility (per product & flow)

By embracing this model, we reduce manual QA overhead, avoid late surprises, and ensure faster, safer OTA delivery — mobile today, web tomorrow.

---

## 7. Roadmap  

| Phase     | Initiative                                                           | Timeline     |
|-----------|----------------------------------------------------------------------|--------------|
| Phase 1   | Define and publish test ownership matrix per squad                   | Week 1–2     |
| Phase 2   | Automate shell app testing per product (Detox)                       | Week 2–4     |
| Phase 3   | Add accessibility checks into CI pipelines (axe-core, Lighthouse)   | Week 2–4     |
| Phase 4   | Standardise contract testing with Pact and enforce in CI            | Week 4–6     |
| Phase 5   | Integrate performance testing (k6 for APIs, Lighthouse for frontend) | Week 6–8     |
| Phase 6   | Run FMEA workshops, prioritise high-risk scenarios                   | Week 8–10    |
| Phase 7   | Define and automate regression suites per product                    | Week 10–12   |
| Phase 8   | Define and automate business flow integration testing (multi-product) | Week 12–14   |
| Phase 9   | Build test dashboards (coverage, flakiness, OAT readiness)           | Week 14–16   |

---

## 8. Metrics & Reporting  

📊 **Key Metrics**
- Test Coverage by Type: Unit / UI / Contract / Functional
- Product-level integration test pass rate
- Flow-level (multi-product) flow coverage %
- Regression Pack Health
- Accessibility Violations (by severity)
- Performance trends (API latency, render times)
- Contract Match Rate
- Flaky test ratio
- OAT Checklist Completion
- Requirement ↔ Test Case ↔ Result Traceability

📈 **Outputs**
- JUnit / Allure reports in CI pipelines
- Dashboards showing readiness per product and flow
- OTA Readiness View (build health + checklists)
- Traceability matrix (stories → tests → results)

---

## 9. Capability Improvements  

| Capability                   | Description |
|------------------------------|-------------|
| **CI/CD Test Gates**         | All validations (unit → OAT) integrated into pipeline and enforced before merge |
| **Regression Strategy**      | Define reusable packs for each product; run on every release |
| **Integration Testing**      | Automate FE ↔ BE integration (per product), and business flow validation (multi-product) |
| **Contract Testing**         | Use Pact; fail builds with mismatches |
| **Accessibility**            | Enforce a11y checks using axe-core, RN Inspector, Lighthouse |
| **Performance Testing**      | Track latency, size, render using k6 + Lighthouse |
| **OAT Governance**           | Automate pre-release checklist + visibility in CI dashboard |
| **Test Data Management**     | Automate setup/teardown with reusable templates |
| **Observability**            | Surface test and release health in one place |
| **Ownership Clarity**        | Publish test responsibility matrix across squads and QA layers |

---

### Final Thoughts  

This assessment outlines a clear view of where we stand — and a realistic, phased approach to improve.

By pushing quality left, automating early, and validating both product and business flows, we ensure that every feature shipped is:

✅ Functional  
✅ Stable  
✅ Configurable  
✅ Release-ready

And most importantly, **owned by the teams who build it**.

---
