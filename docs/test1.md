# DTP – Quality Engineering Maturity Assessment

**Date:** [Insert Date]  
**Author:** [Your Name], QA Lead  

---

## 1. Opportunity

- Establish a modular, shift-left QA model where both frontend (React Native mobile/web) and backend (Java microservices) teams independently validate their components before integration.
- Introduce robust Functional Testing at all levels — including unit, UI flows, and API behavior — integrated into CI pipelines.
- Embed a full spectrum of Non-Functional Testing (NFT) including:
  - ✅ Accessibility (axe-core, Lighthouse, RN Inspector)
  - ✅ Performance (bundle size, API latency, render speed)
  - ✅ Risk-based testing (FMEA)
  - ✅ Operational Acceptance Testing (OAT) to ensure production readiness
- Implement live dashboards for test outcomes, NFT metrics, and release readiness.
- Deliver OTA-ready, business-configurable modules through pre-integrated validation and automation.

---

## 2. Modular Engineering Landscape

| Stream           | Details                                                                 |
|------------------|-------------------------------------------------------------------------|
| Frontend         | React Native (mobile/native + web); modular components (e.g., Booking)  
|                  | Packaged as NPM modules; pipelines in Azure DevOps  
|                  | Shell app exists (demo-only); not used for automated validation  
| Backend          | Java microservices; GitHub/GCP CI; support modular UI via REST APIs  
| Integration Layer| Occurs after FE/BE validation; API handshake + business flow assembly  
| Final Delivery   | My Bupa app renders assembled flows from validated modules  

---

## 3. QA Strategy – Target Model

| Stage                 | Responsibility         | Goal                                                             |
|-----------------------|------------------------|------------------------------------------------------------------|
| Unit Testing          | Frontend + Backend     | High coverage, early validation                                  |
| UI Testing            | Frontend squads        | Detox/Playwright + shell app automation                          |
| API/Contract Testing  | Backend + shared effort| Pact-based FE↔BE testing + 3rd-party API validation              |
| Performance Testing   | Backend + optional FE  | k6, Lighthouse, bundle size, render speed                        |
| Accessibility         | Frontend squads        | axe-core, RN Inspector, Lighthouse                               |
| Risk Testing (FMEA)   | Shared                 | Squad workshops to define failure scenarios                      |
| OAT Readiness         | Shared                 | Checklist-based validation before integration                    |

---

## 4. Current Gaps & Interventions

| Area                 | Gap                            | Recommended Intervention                                            |
|----------------------|---------------------------------|---------------------------------------------------------------------|
| Shell App            | Not used for testing            | Automate shell app tests for RN components pre-publish              |
| Contract Testing     | Missing or inconsistent         | Standardize Pact usage and enforce as CI gate                       |
| Accessibility        | No checks in CI                 | Introduce axe-core + Lighthouse with severity thresholds            |
| Performance          | No baseline or tracking         | Track bundle size, render latency, API perf with k6/Lighthouse      |
| Risk Testing (FMEA)  | Not practiced                   | Embed FMEA in planning; trace risks to validation/OAT steps         |
| Test Ownership       | Undefined                       | Assign test layers clearly across squads and lifecycle stages       |
| Test Data Management | Inconsistent, partially manual  | See Section 9                                                       |
| CI Observability     | No unified view                 | Build cross-squad QA dashboards for coverage, contracts, OAT        |

---

## 5. QA Ownership Model

| Stream   | Owned Test Types                                          | Exit Criteria Before Integration                                      |
|----------|-----------------------------------------------------------|------------------------------------------------------------------------|
| Frontend | Unit, Detox/UI, A11y, Performance, Pact Contracts          | Shell app pass, a11y check, test coverage ≥ threshold                  |
| Backend  | Unit, Integration, Pact, Performance, Mock APIs           | Contracts verified, metrics published, CI gate passed                 |
| Shared   | FMEA, OAT Checklist, Integration handshake                | All validations complete, OAT criteria met                            |

---

## 6. Implementation Roadmap

| Phase    | Initiative                                                   | Timeline     |
|----------|--------------------------------------------------------------|--------------|
| Phase 1  | Define lifecycle test ownership across squads                | Week 1–2     |
| Phase 2  | Enable shell app automation with Detox/axe-core              | Week 2–4     |
| Phase 3  | Set up Pact contract testing for internal & external APIs    | Week 4–6     |
| Phase 4  | Add performance benchmarks (k6, Lighthouse, bundle analysis) | Week 6–8     |
| Phase 5  | Run FMEA workshops, define and roll out OAT templates        | Week 8–10    |
| Phase 6  | Build and publish QA dashboards for contracts, coverage, readiness | Week 10–12 |

---

## 7. Live Test Reporting & Dashboards

### ✅ Goals

- Enable real-time quality visibility across streams  
- Automate reporting of coverage, defects, NFT, and OAT compliance  
- Track readiness state per module and reduce late surprises  

### 📊 Key Metrics

| Metric                 | Description                                               |
|------------------------|-----------------------------------------------------------|
| Test Coverage %        | Unit + UI + API + contract scope per product              |
| Contract Test Health   | Pact match/mismatch with provider APIs                    |
| Accessibility Score    | axe-core/Lighthouse metrics integrated in CI              |
| Performance Benchmarks | Bundle size, render speed, API latency                    |
| Test Stability & Trends| Fail rate history by stream, test flakiness               |
| OAT Readiness          | Completion rate of defined checklists                     |

### 🔧 Tools (to be evaluated)

| Layer             | Tools (Examples)                                  |
|-------------------|---------------------------------------------------|
| CI/CD             | Azure DevOps (Frontend), GitHub Actions (Backend) |
| Test Execution    | Jest, Detox, Cypress, Playwright, JUnit, Pact, k6 |
| Reporting         | Allure, ReportPortal, Codecov, SonarQube          |
| Contract Management| Pact Broker                                       |
| Dashboard Layer   | Power BI, Azure Dashboards, Grafana, or custom SPA|

---

## 8. Business Benefits

- 🚀 Accelerated OTA delivery with modular, testable services  
- 📉 Reduced production issues via early, automated validations  
- 📊 Visibility and traceability across testing outcomes  
- ✅ Operational confidence with OAT signoffs and risk coverage  
- ♿ Inclusive and performant product by design  
- 👥 Autonomous teams with clear test ownership and tooling alignment  

---

## 9. Test Data Management – Strategy & Approach

### Why It Matters

Inconsistent, manual test data setup leads to flaky tests, CI bottlenecks, and high maintenance cost.

### Goals

- Build consistent, reusable datasets for all test types  
- Automate provisioning for unit, UI, contract, and perf testing  
- Support environment tagging, scenario scoping, and teardown handling

### Approach

| Aspect               | Strategy                                                             |
|----------------------|----------------------------------------------------------------------|
| Data Design          | Reusable templates per module (e.g., Booking, MSS)                  |
| Tagging & Scoping    | Metadata like `@env=QA`, `@type=negative` for test orchestration    |
| Provisioning         | Setup via fixtures, preseed APIs, or CI setup scripts               |
| Environment Strategy | Use env-specific prefixes/namespacing to isolate data               |
| Cleanup              | TTL datasets, post-test deletion, or ephemeral environments         |
| Versioning           | Store scripts/templates in GitHub per squad                         |

---

## 10. Common Capability Interventions (Cross-Cutting)

- Application Infrastructure, Monitoring, and Deployment Automation  
- Continuous Integration & Delivery Pipelines  
- Accessibility, A/B Testing, and Secure Coding  
- Contract Testing (Pact), Feature Toggling, Canary Releases  
- Developer Sandboxes & Assistant Tools  
- Functional & Performance Testing in CI  
- Test Data Management Automation  
- Architecture & Engineering Strategy for QA at scale  
- Agile QE Governance: OAT, FMEA, Checklists  
- Quality Dashboards, Workflow Visualisation, SCM Integration  

