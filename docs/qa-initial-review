# 🧪 QA Strategy & Assessment – Initial Review

**Date:** [Insert Date]  
**Author:** [Your Name], QA Lead  

---

## 🎯 Purpose

This document summarizes current testing practices across the program and outlines opportunities to enhance quality and efficiency in a collaborative way. The focus is on building upon existing efforts and enabling scalable, proactive quality practices as part of continuous delivery.

---

## 🧩 Product & Architecture Overview

### Modular Frontend Products (React Native)

The following user-facing services are developed as independent React Native components:

- Booking Service  
- Health Assessment  
- Questionnaire Service  
- Medical Support Services (MSS)  
- Genomics  

These components are:

- Built using **React Native**
- Packaged as **NPM modules**
- Integrated into the **My Bupa** container app

### My Bupa App

- Hosts and renders the modular services  
- Coordinates mobile and web experiences  
- Currently manages testing after integration

### Planned Evolution: OTA Updates

The program is exploring **Over-the-Air (OTA) delivery** to enable more flexible, modular releases.  
This will increase the importance of **pre-release validation and automation**.

---

## 🏗️ Technology & Delivery Stack

| Layer       | Tools / Platforms                                      |
|-------------|--------------------------------------------------------|
| Frontend    | React Native, JavaScript, Azure DevOps                 |
| Backend     | Java, REST APIs, GitHub + GCP                          |
| CMS         | Sitecore                                               |
| Testing     | Unit testing, Wiremock, Checkmarx, static code scans   |

---

## ✅ Current Testing Practices Overview

### Frontend Teams

- Unit testing implemented across services  
- Linting, static code checks, and security scans in CI  
- Services published as NPM modules  
- Testing primarily occurs **after integration** into My Bupa  
- OTA delivery architecture is under consideration

### Backend Teams

- Unit and API testing in place  
- Some contract testing (e.g., MSS)  
- Wiremock used for mocks  
- CI/CD managed in GitHub and GCP

---

## 🔍 QA Opportunities

There are opportunities to enhance early validation, test automation, and non-functional coverage to support ongoing platform evolution.

| Area                   | Opportunity                                                                 |
|------------------------|------------------------------------------------------------------------------|
| Early Testing          | Validate earlier in the lifecycle (e.g. pre-merge, pre-publish)              |
| Test Ownership         | Support squads in testing their services before integration                  |
| Shell App Testing      | Automate sample app to test services in isolation                            |
| UI & E2E Coverage      | Add automation for key flows (Detox, Playwright)                             |
| Accessibility          | Introduce checks via axe-core, Lighthouse, RN Accessibility Inspector        |
| Performance Testing    | Monitor bundle size, render times, and API latency                           |
| Cross-Browser Support  | Validate web variants across target browsers/devices                         |
| Release Readiness      | Define OAT test criteria and checklists                                      |
| Risk-Based Testing     | Use FMEA to identify high-risk scenarios and validate failure handling       |

---

## 🔄 In-Flight & Proposed Enhancements

| Theme                | Initiative                                                                 |
|----------------------|----------------------------------------------------------------------------|
| Shift Left Testing   | Validate earlier (PR, CI, pre-publish gates)                               |
| QA in CI             | Add automated gates for unit, shell app, a11y, and performance tests       |
| Collaborative QA     | Engage squads in FMEA + OAT planning and implementation                    |
| Tooling Alignment    | Standardize across Detox, Cypress, k6, Lighthouse, axe-core                |
| Feedback Visibility  | Add dashboards for test outcomes and regressions                           |
| Pilot Programs       | Identify 1–2 services for UI test and OTA validation POCs                  |

---

## 📍 Next Steps

| Task                          | Description                                      | Target     |
|-------------------------------|--------------------------------------------------|------------|
| Align with squads             | Share this assessment and gather feedback        | [Insert]   |
| Define test ownership model   | Clarify lifecycle responsibilities               | [Insert]   |
| Enable shell app testing      | Automate NPM package validation                  | [Insert]   |
| Pilot test automation         | Start with key services (e.g., Questionnaire)    | [Insert]   |
| Begin FMEA & OAT workshops    | Collaborate on risk and readiness planning       | [Insert]   |

---

## 🧩 Closing Thoughts

The program already has a strong foundation in modular architecture, pipelines, and unit testing. These enhancements aim to *build upon that work* — improving test coverage, shifting quality earlier, and preparing for more modular delivery models such as OTA.

By working collaboratively across squads, we can evolve QA into a scalable, efficient, and proactive part of the development lifecycle.

