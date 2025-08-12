# BUPA DTP Insights & Execution

## Slide 1
DTP – Quality Engineering Insights & Execution Path
From Product-Level Testing to System-Level Automation
Including BDD, Unified Cross-Platform Test Automation Framework, and Governance

## Slide 2
QE Capabilities – Current vs. Target State
Category | Testing Type / Activity | Current State | To-Be State | Priority | 
--- | --- | --- | --- | --- | ---
Frontend Automation | FE-only functional automation | Manual component tests only | Automated mobile-native UI flows (Detox/Appium) in CI/CD | High | 
Backend Automation | API functional automation | Manual Postman API checks | Automated API functional coverage  in CI/CD | High | 
Contract Testing | FE <-> BE or BE <-> BE contract verification | Not done | Pact tests integrated in pipelines to verify FE↔BE contracts | Medium | 
Product-Level E2E | FE↔BE integration automation | Manual product testing | Automated shell-app UI/API tests | High | 
System-Level E2E | Multi-product flow automation | Manual multi-product flows | Automated multi-product business flows | Medium | 
Accessibility Testing | Accessibility automation | Manual checks only | Automated accessibility checks (axe-core, Lighthouse) | High | 
Performance Testing | Performance automation | Not performed | Automated performance baselines (k6, Jmeter,  Lighthouse) | Medium | 
FMEA | Risk-based testing practice | Not performed | Identify high-risk failure modes; prioritise and simulate in test planning | Low | 
OAT | Operational readiness testing | Not performed | Execute readiness checks (failover, recovery, scaling) before release | Low | 
QA Dashboards | Test visibility dashboards | None | Dashboards for test coverage, pass rate, flakiness, Release readiness | Medium | 
BDD | Business-readable automation | Not implemented | Introduce BDD (Gherkin)  in testing for shared understanding across teams | High | 
Unified Framework | Cross-platform framework | Not implemented | Single automation framework covering UI, API, performance, accessibility, across mobile, web, and mobile web | High | 
Test Data Management* | E2E test data setup | Not fully explored | Evaluate the need for reusable, consistent test data sets | High | 

## Slide 3
Execution TimeLine
Phase / Sprint | Capability | Key Activities
--- | --- | ---
3 | Mobile Native UI Automation | POC using Detox/Appium/Maestro for FE-only flows
CI/CD integration with quality gates
Roll-out to one product squad
4 | API Functional Automation | POC using REST Assured/Postman/Karate/PlayWright
CI/CD integration and reporting
Roll-out to backend teams
5 | Contract Testing | POC using Pact for FE↔BE
CI/CD integration enforcing contracts
Roll-out to FE & BE squads
6 | Product-Level E2E Automation | POC in shell app with accessibility & performance checks
CI/CD integration
Roll-out to product teams
7 | Accessibility Automation | POC for k6 (API) and Lighthouse (UI)
CI/CD integration
Roll-out to all products
8 | Performance Automation | POC using axe-core for accessibility
CI/CD integration
Roll-out to all products
9 | QE Dashboards | Build dashboards for coverage, pass rate, flakiness, readiness
Integrate into CI/CD pipelines
10 | Scaling & System-Level E2E | Apply unified framework to all squads
Automate multi-product system-level E2E flows
11 | FMEA Implementation | Identify high-risk operational scenarios (service outage, API errors, CPU/memory)
Automate test coverage for prioritized scenarios
12 | OAT Implementation | Define OAT checklist and operational readiness criteria
Automate failover, recovery, scaling, and monitoring/alerting validation in CI/CD

## Slide 4
Impact and Advantages
If We Continue As-Is (Impacts)
Late defect detection leading to higher cost and rework
Manual regression increases release cycle time
No automated readiness proof before release
Lack of visibility for leadership on release readiness
Operational failure scenarios remain untested
Inconsistent quality and coverage across squads
If We Implement This Plan (Advantages)
Defects caught earlier with step-by-step capability roll-out
Faster releases through automated regression and quality gates
Clear 'integration-ready' and 'release-ready' signals before production
Real-time dashboards for coverage, pass rate, and readiness
Reusable frameworks applied consistently across products and squads
Risk-based coverage with FMEA for operational scenarios
Improved UX & compliance through accessibility and performance checks
Operational resilience validated via OAT
Future-proof unified framework for mobile native, web, and mobile web
Shared BDD language for better dev-business collaboration