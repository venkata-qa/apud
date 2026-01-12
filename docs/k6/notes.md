# 🎤 Speaker Notes — k6 Demo & Knowledge Sharing Session

---

## Slide 1 — Title  
### Performance Testing with k6

**Speaker Notes:**

Good morning everyone.  
Today I’m going to explain how we use k6 for performance testing — what it is, why we use it, and how it helps us prevent production issues.

This session is not about deep coding. It’s about understanding:

- What k6 does  
- How QA can benefit from it  
- How it improves release quality and system stability  

---

## Slide 2 — Agenda

**Speaker Notes:**

Here’s what we’ll cover today:

- Basics of performance testing  
- Introduction to k6  
- How k6 works  
- A sample test  
- Metrics and reports  
- How we use it in our QA process  

We’ll keep it simple and practical.

---

## Slide 3 — What is Performance Testing?

**Speaker Notes:**

Performance testing checks:

- How fast the system responds  
- How stable it is under load  
- How many users it can handle at once  

There are different types:

- **Load testing:** normal expected traffic  
- **Stress testing:** pushing system to its limit  
- **Spike testing:** sudden traffic surge  
- **Soak testing:** long-running stability  

This helps us understand how the system behaves before going live.

---

## Slide 4 — Why Performance Testing is Important

**Speaker Notes:**

Most production issues are not functional bugs — they are performance problems.

Examples:

- APIs become slow during peak hours  
- Requests start timing out  
- System crashes under load  
- Memory leaks after long usage  

These directly impact customers and business:

- Poor user experience  
- Revenue loss  
- SLA violations  
- High support tickets  

So performance testing is critical before release.

---

## Slide 5 — What is k6?

**Speaker Notes:**

k6 is a modern performance testing tool from Grafana.

It is:

- Open-source  
- Script-based using JavaScript  
- Very fast and lightweight  
- Designed for QA and developers  
- Easy to integrate into CI/CD pipelines  

We mainly use it for:

- API performance testing  
- Backend services  
- Microservices  
- Authentication flows  

---

## Slide 6 — Why We Use k6

**Speaker Notes:**

We use k6 because:

- It is easy to learn — uses JavaScript  
- It runs from command line — very simple  
- Scripts can be stored in Git  
- We can define pass/fail criteria  
- It integrates well with dashboards like Grafana  
- It supports cloud execution for high load  

Overall, it fits well into modern QA and DevOps practices.

---

## Slide 7 — How k6 Works (Architecture)

**Speaker Notes:**

This is how k6 works:

1. We write a test script in JavaScript  
2. k6 engine reads the script and creates Virtual Users  
3. These virtual users send HTTP requests to our APIs  
4. k6 collects performance metrics  
5. Finally, it generates reports  

Important concepts:

- **Virtual Users:** simulated users  
- **Iterations:** one complete test loop  
- **Scenarios:** load pattern  
- **Thresholds:** pass/fail rules  
- **Metrics:** performance data  

---

## Slide 8 — Sample k6 Test Script

**Speaker Notes:**

This is a simple k6 script.

We define:

- 10 virtual users  
- Test duration of 30 seconds  

Each user:

- Calls an API  
- Checks if status is 200  
- Waits for 1 second  

This simulates real users hitting our system.

---

## Slide 9 — Load Pattern Example

**Speaker Notes:**

This is a real-life load pattern.

- Ramp up to 20 users in 2 minutes  
- Maintain 20 users for 5 minutes  
- Ramp down to zero  

This mimics how real traffic increases and decreases gradually instead of suddenly.

---

## Slide 10 — Metrics Collected by k6

**Speaker Notes:**

k6 automatically collects performance metrics such as:

- Average response time  
- 95th percentile response time  
- Requests per second  
- Error rate  
- Active users  

These help us understand:

- How fast the system is  
- How stable it is  
- Whether it can handle the load  

---

## Slide 11 — Thresholds (Pass/Fail Criteria)

**Speaker Notes:**

Thresholds define success or failure.

For example:

- 95% of requests must be under 500 milliseconds  
- Error rate must be below 1%  

If thresholds fail, the test automatically fails.  
This helps us use k6 in automation and CI pipelines.

---

## Slide 12 — How We Use k6 in QA Process

**Speaker Notes:**

This is our typical performance testing flow:

1. Identify critical APIs  
2. Write k6 test scripts  
3. Run tests locally  
4. Run them in CI  
5. Analyze reports  
6. Share results with Dev team  
7. Fix issues and retest  

This makes performance testing part of regular QA activity.

---

## Slide 13 — Example Test Types We Run

**Speaker Notes:**

We run different tests at different stages:

- Load tests before release  
- Stress tests for capacity planning  
- Regression tests on every build  
- Spike tests for big campaigns  
- Soak tests for stability  

Each test gives us confidence in system reliability.

---

## Slide 14 — Reporting & Visualization

**Speaker Notes:**

k6 provides multiple reporting options:

- CLI summary after every run  
- HTML reports  
- Grafana dashboards  
- CI reports  

We mainly look at:

- Response time trends  
- Error spikes  
- Throughput changes  
- Resource usage  

This helps identify bottlenecks early.

---

## Slide 15 — Best Practices

**Speaker Notes:**

Some best practices we follow:

- Start with small loads  
- Use realistic test data  
- Store scripts in Git  
- Define thresholds  
- Automate in CI  
- Test before production  

Performance testing should be continuous, not one-time.

---

## Slide 16 — Value to QA & Business

**Speaker Notes:**

For QA:

- We catch performance issues early  
- Improve release confidence  
- Reduce firefighting  

For business:

- Better customer experience  
- Higher system reliability  
- Lower production risk  

So k6 directly contributes to product quality.

---

## Slide 17 — Summary

**Speaker Notes:**

To summarize:

- k6 is our performance testing tool  
- It simulates real users  
- Measures speed, stability, and scalability  
- Helps prevent production issues  
- Is integrated into our QA process  

---

## Slide 18 — Q&A

**Speaker Notes:**

That’s all from my side.

I’m happy to take any questions or feedback.
