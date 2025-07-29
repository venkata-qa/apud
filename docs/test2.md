# DTP – Quality Engineering Maturity Assessment

**Date:** [Insert Date]  
**Author:** [Your Name], QA Lead

---

## 1. Opportunity

- Establish a modular, shift-left QA model where both frontend (React Native mobile/web) and backend (Java microservices) teams validate their components before integration.
- Introduce robust Functional Testing at all levels — including unit, UI flows, and API behavior — integrated into CI pipelines.
- Embed a full spectrum of Non-Functional Testing (NFT) including:
  - ✅ Accessibility (e.g., axe-core, Lighthouse)
  - ✅ Performance (bundle size, API latency, render speed)
  - ✅ Risk-based testing (FMEA)
  - ✅ Operational Acceptance Testing (OAT)
- Integrate all testing into CI/CD pipelines to enforce pre-merge and pre-release quality gates.
- Implement dashboards for test outcomes, NFT metrics, and release readiness.
- Deliver OTA-ready, business-configurable modules through validated, decoupled releases.

---

## 2. Modular Engineering Landscape

| Stream            | Details                                                                 |
|-------------------|-------------------------------------------------------------------------|
| Frontend          | React Native (mobile/native + web); modular components (e.g., Booking). Shell app (demo only); not yet automated. Azure DevOps CI. |
| Backend           | Java microservices; GitHub/GCP CI; supports modular UI via REST APIs.   |
| Integration Layer | Occurs after FE/BE validation; API handshake + flow composition.        |
| Final Delivery    | My Bupa app renders validated modules in business-configured flows.     |

---

## 3. QA Strategy – Target Model

| Stage                | Responsibility           | Goal                                                             |
|----------------------|--------------------------|------------------------------------------------------------------|
| Unit Testing         | FE + BE squads           | High coverage, early feedback via CI.                           |
| UI Testing           | Frontend squads          | Pre-integration validation using shell app automation.          |
| API/Contract Testing | Backend + shared         | Enforced contract tests (e.g., Pact) in CI.                     |
| Performance Testing  | Backend + optional FE    | Perf baselines for APIs and mobile/web apps.                    |
| Accessibility        | Frontend squads          | CI-integrated validation for a11y compliance.                   |
| Risk Testing (FMEA)  | Shared                   | Validate failure scenarios and coverage.                        |
| OAT Readiness        | Shared                   | Checklist-based quality gate in pre-release pipeline.           |

---

## 4. Gaps & Interventions

| Area                 | Gap                            | Recommended Intervention                                          |
|----------------------|---------------------------------|-------------------------------------------------------------------|
| Shell App            | Not used for validation         | Automate shell app tests in CI.                                   |
| Contract Testing     | Informal                        | Standardize and gate via CI with Pact (or equivalent).            |
| Accessibility        | Not automated                   | Add CI hooks for axe-core, Lighthouse, RN Inspector.              |
| Performance          | Not measured                    | Integrate k6, Lighthouse for baseline checks.                     |
| Test Ownership       | Unclear                         | Define lifecycle test ownership per squad.                        |
| Integration Failures | Late stage                      | Validate upstream, shift left with contracts + dashboards.        |
| Test Data            | Inconsistent                    | Standardize and automate in CI.                                   |
| Observability        | No unified view                 | Build dashboards for test, coverage, and OAT compliance.          |

---

## 5. QA Ownership Model

| Stream    | Owned Test Types                                           | Exit Criteria Before Integration                                 |
|-----------|-------------------------------------------------------------|------------------------------------------------------------------|
| Frontend  | Unit, Detox/UI, A11y, Performance, Contract (consumer side) | Shell app green, a11y verified, coverage met                     |
| Backend   | Unit, Contract, Integration, Performance                    | Contract validated, metrics reported                             |
| Shared    | FMEA, OAT Checklist, Integration Testing                    | All validations passed, dashboards updated                       |

---

## 6. Roadmap

| Phase    | Initiative                                                | Timeline   |
|----------|------------------------------------------------------------|------------|
| Phase 1  | Define test ownership model per squad                     | Week 1–2   |
| Phase 2  | Shell app automation, enable Detox + a11y checks          | Week 2–4   |
| Phase 3  | Pilot contract testing tool (e.g., Pact)                  | Week 4–6   |
| Phase 4  | Add performance checks into CI pipelines                  | Week 6–8   |
| Phase 5  | FMEA workshops, define and automate OAT templates         | Week 8–10  |
| Phase 6  | Build test dashboards for readiness, coverage, and trends | Week 10–12 |

---

## 7. Metrics, Reporting & Dashboards

### 📊 Key Metrics

- Test Coverage % by type (unit, UI, contract)
- Contract Validation (match/mismatch reports)
- A11y Score (CI violations by severity)
- Performance Baselines (bundle, latency, render)
- OAT Completion %
- Flakiness & Fail Trends
- Test Execution Reports (total, pass/fail, duration)
- Requirement Traceability (linked stories/tests)

### 📈 Outputs

- Reports (JUnit XML, Allure, custom dashboards)
- Traceability Matrix (requirements → tests → results)
- Test Status and OAT published via CI into dashboards

---

## 8. Common Capability Interventions

| Capability              | Description                                                                    |
|-------------------------|--------------------------------------------------------------------------------|
| CI/CD Test Integration  | Embed unit, UI, API, NFT, and OAT validations in every pipeline stage.         |
| Test Reporting          | Generate structured reports + real-time dashboards from CI stages.            |
| Test Data Management    | Reusable templates, tagging, provisioning, teardown in CI.                     |
| Traceability            | Map tests to features/requirements using tags or test management tooling.     |
| Tooling Evaluation      | Pilot tools before standardizing; enforce CI compatibility and usability.      |
| Accessibility & A/B     | Add a11y in CI; establish a strategy for variant testing.                      |
| Performance Checks      | Include k6/Lighthouse tests in each build or release pipeline.                 |
| Risk-Based Testing      | Use FMEA to prioritize automation efforts.                                     |
| OAT Governance          | Automate checklist validation and dashboard publishing before release.        |

---

This document serves as an initial QA assessment for DTP and will inform the Test Strategy to follow.
