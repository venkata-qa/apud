# DTP – Quality Engineering Maturity Assessment  
📅 Date: [Insert Date]  
✍️ Author: Hymnal, QA Lead  

---

## 1. Opportunity  

The DTP ecosystem follows a **modular product architecture**, where multiple frontend and backend squads independently build reusable, customizable modules (e.g., Booking App, Questionnaire). These modules are integrated by business teams into business-configured flows and delivered via the **My Bupa native mobile app**, with future support planned for web platforms.

There is a significant opportunity to establish a **mature, shift-left QA strategy** that ensures quality at the component, integration, and system levels before delivery.  

### Key Objectives:
- Embed **functional testing** across frontend, backend, and integration layers  
- Shift-left unit and integration tests into each squad's CI pipelines  
- Establish robust **regression validation** for modular releases  
- Implement **Non-Functional Testing (NFT)**, including performance, accessibility, and risk-based testing  
- Automate **Operational Acceptance Testing (OAT)** and readiness dashboards  
- Enable **OTA-ready** module delivery backed by full validation

---

## 2. Modular Engineering Landscape  

| Stream             | Description |
|--------------------|-------------|
| **Frontend**       | Built using React Native for mobile, with future web support. Squads own modular apps (e.g., Booking, Questionnaire). Azure DevOps CI. Functional testing via unit, Detox (UI/screen-level), and linting. |
| **Backend**        | Java microservices exposed via REST APIs. GitHub/GCP CI. Unit and functional logic tested with JUnit + Mockito. Limited contract testing in place. |
| **Integration Layer** | Occurs after FE and BE components are validated. Handshake validated using staging environments and business flow composition. |
| **Delivery Channel** | Business teams compose validated modules into flows. Delivered into **My Bupa app** (mobile-native). Web delivery planned in future roadmap. |

---

## 3. QA Strategy – Target Model  

| Stage                      | Responsibility         | Goal |
|----------------------------|------------------------|------|
| **Frontend Functional Testing** | Frontend squads         | Validate component/screen logic, interactions, and UI behavior using unit and Detox tests |
| **Backend Functional Testing**  | Backend squads          | Validate service-level logic and functional correctness using JUnit + Mockito |
| **Integration Testing**         | Shared                  | Validate full business flow across FE + BE using shell app and real API interactions |
| **Regression Testing**          | Shared + QA Lead        | Maintain stable regression packs for core modules; validate with every build or major release |
| **Unit Testing**                | All squads              | Validate logic and flows at lowest level with high coverage |
| **UI Testing (Detox)**          | Frontend squads         | Automate screen-level flows in shell app to prevent regressions |
| **API/Contract Testing**        | Backend + Shared        | Validate producer and consumer contracts (e.g., Pact); enforce in CI |
| **Performance Testing**         | Backend + optional FE   | Establish API latency, bundle size, and render speed baselines |
| **Accessibility Testing**       | Frontend squads         | Integrate a11y tools (axe-core, RN Inspector, Lighthouse) in CI |
| **Risk-Based Testing (FMEA)**   | Shared                  | Prioritize validation for high-impact failure modes |
| **Operational Acceptance (OAT)**| Shared                  | Automate release readiness checklists and dashboards |

---

## 4. Gaps & Interventions  

| Area                   | Gap                                  | Recommended Intervention |
|------------------------|---------------------------------------|---------------------------|
| Frontend Functional Testing | Screen-level flows validated informally | Define and automate test scenarios using Detox + shell app |
| Backend Functional Testing  | Business logic validated inconsistently | Expand JUnit + Mockito coverage with functional flows |
| Integration Testing         | Happens late, manually              | Automate using shell app + staging APIs |
| Regression Testing          | Not standardized or automated       | Build and maintain per-module regression suites |
| Shell App Usage             | Not fully used for testing          | Use for UI + flow validation in CI |
| Contract Testing            | Limited coverage, informal          | Integrate Pact (or equivalent) with CI gates |
| Accessibility               | Not enforced in CI                  | Add CI steps for axe-core, Lighthouse, RN Inspector |
| Performance                 | No consistent measurement           | Add k6 for APIs and Lighthouse for frontend into CI |
| Test Ownership              | No formal lifecycle definitions     | Assign and document test types by squad responsibility |
| Test Data                   | Manual, inconsistent                | Automate setup/teardown of test data in CI |
| Observability               | No centralized view of test health  | Build unified dashboards with traceability and readiness metrics |

---

## 5. QA Ownership Model  

| Stream     | Owned Test Types                                           | Exit Criteria Before Integration |
|------------|------------------------------------------------------------|----------------------------------|
| **Frontend** | Unit, Functional (screen logic), Detox, A11y, Performance, Consumer Contracts | Shell app flows green, coverage threshold met, a11y checks passed |
| **Backend**  | Unit, Functional (business logic), Provider Contracts, Performance | API logic validated, contract match verified, mock/stage test pass |
| **Shared**   | Integration Testing, Regression, FMEA, OAT               | E2E scenarios passed, regression green, dashboards updated |

---

## 6. Roadmap  

| Phase     | Initiative                                               | Timeline     |
|-----------|----------------------------------------------------------|--------------|
| Phase 1   | Define and publish test ownership model per squad        | Week 1–2     |
| Phase 2   | Automate shell app (Detox) + accessibility validations   | Week 2–4     |
| Phase 3   | Standardize contract testing using Pact or equivalent    | Week 4–6     |
| Phase 4   | Integrate performance testing tools (k6, Lighthouse)     | Week 6–8     |
| Phase 5   | Facilitate FMEA workshops + build OAT governance         | Week 8–10    |
| Phase 6   | Build test dashboards for readiness, traceability        | Week 10–12   |
| Phase 7   | Define and automate regression suites per module         | Week 12–14   |

---

## 7. Metrics, Reporting & Dashboards  

📊 **Key Metrics**  
- Test Coverage % by type (unit, functional, UI, contract)  
- Contract Match Rate (consumer/producer)  
- Accessibility Score (per build, per screen)  
- Performance Metrics (API latency, bundle size, render time)  
- Regression Pass Rate (%)  
- Functional Scenario Pass Rate  
- OAT Checklist Completion (%)  
- Flakiness trends, Test execution time  
- Requirement ↔ Test Case ↔ Result traceability  

📈 **Outputs**  
- CI-integrated reports (JUnit XML, Allure)  
- Real-time dashboards (coverage, readiness, regression health)  
- Test traceability matrix linked to user stories and features  
- OTA release readiness view with OAT status

---

## 8. Common Capability Interventions  

| Capability               | Description |
|--------------------------|-------------|
| **CI/CD Test Integration**   | Embed all test types (unit, UI, contract, NFT) in pipelines |
| **Test Reporting**           | Standardize JUnit/Allure; generate dashboards for real-time view |
| **Test Data Management**     | Automate provisioning, tagging, and teardown in CI |
| **Traceability**             | Link features → tests → results using tags or tools |
| **Tooling Evaluation**       | Pilot tools before enforcing; ensure CI compatibility |
| **Accessibility Compliance** | Automate a11y checks across screens/modules |
| **Performance Validation**   | Include performance benchmarks in every build |
| **Risk-Based Testing**       | Apply FMEA to prioritize automation efforts |
| **Regression Strategy**      | Define and maintain core regression packs per product module |
| **OAT Governance**           | Automate checklist validation, surface pre-release status in dashboards |

---

_This document provides a comprehensive QA maturity baseline for the DTP program. It defines current gaps, strategic direction, and next steps towards robust, scalable, and release-ready quality practices for both mobile and future web delivery._

