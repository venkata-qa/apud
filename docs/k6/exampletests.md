# 🚀 k6 Performance Testing --- Example Scripts (With Purpose Comments)

This document contains practical k6 performance testing examples with
clear comments explaining the purpose of each test.

------------------------------------------------------------------------

## Example 1 --- Simple API Load Test

``` javascript
/**
 * PURPOSE:
 * This test simulates a small group of users continuously calling an API.
 * It helps verify:
 * - Basic performance under normal load
 * - API availability
 * - Response time SLA
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,            // Simulate 10 concurrent users
  duration: '30s',   // Run test for 30 seconds
};

export default function () {
  let res = http.get('https://test-api.example.com/users');

  // Validate API response
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  // Pause to simulate real user behavior
  sleep(1);
}
```

------------------------------------------------------------------------

## Example 2 --- Load Test with Ramp-Up Users

``` javascript
/**
 * PURPOSE:
 * This test simulates gradual traffic growth like real production usage.
 * It helps verify:
 * - System scalability
 * - Behavior under increasing load
 * - Stability at peak traffic
 */

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 20 }, // Gradually increase to 20 users
    { duration: '5m', target: 20 }, // Maintain peak load
    { duration: '2m', target: 0 },  // Gradually reduce load
  ],
};

export default function () {
  http.get('https://test-api.example.com/products');
  sleep(1);
}
```

------------------------------------------------------------------------

## Example 3 --- Test with Thresholds (Pass/Fail)

``` javascript
/**
 * PURPOSE:
 * This test validates performance SLAs automatically.
 * It is ideal for CI/CD pipelines to block bad releases.
 * It ensures:
 * - Response time stays within limits
 * - Error rate is acceptable
 */

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 15,
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must be under 500ms
    http_req_failed: ['rate<0.01'],   // Error rate must be below 1%
  },
};

export default function () {
  http.get('https://test-api.example.com/orders');
  sleep(1);
}
```

------------------------------------------------------------------------

## Example 4 --- Authentication Test (Login Flow)

``` javascript
/**
 * PURPOSE:
 * This test simulates users logging into the system.
 * It validates:
 * - Authentication performance
 * - Login API stability
 * - Token generation under load
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 5,
  duration: '30s',
};

export default function () {
  let payload = JSON.stringify({
    username: 'testuser',
    password: 'password123'
  });

  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let res = http.post('https://test-api.example.com/login', payload, params);

  check(res, {
    'login successful': (r) => r.status === 200,
    'token received': (r) => r.json('token') !== '',
  });

  sleep(1);
}
```

------------------------------------------------------------------------

## Example 5 --- Spike Test

``` javascript
/**
 * PURPOSE:
 * This test simulates a sudden traffic surge.
 * It helps verify:
 * - System resilience
 * - Auto-scaling behavior
 * - Stability during traffic spikes
 */

import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 5 },    // Normal traffic
    { duration: '10s', target: 50 },   // Sudden spike
    { duration: '1m', target: 5 },     // Back to normal
  ],
};

export default function () {
  http.get('https://test-api.example.com/search');
  sleep(1);
}
```

------------------------------------------------------------------------

## ▶️ How to Run Any Test

``` bash
k6 run test.js
```

------------------------------------------------------------------------

Happy Performance Testing with k6 🚀
