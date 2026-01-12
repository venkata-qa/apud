import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,            // 10 virtual users
  duration: '30s',   // test runs for 30 seconds
};

export default function () {
  let res = http.get('https://test-api.example.com/users');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}

