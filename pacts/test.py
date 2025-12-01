pip install pyjwt cryptography google-auth
python3 <<EOF
import google.auth
import google.auth.transport.requests
import jwt
import json
import time

sa = json.load(open("sa.json"))
now = int(time.time())

payload = {
    "iss": sa["client_email"],
    "sub": sa["client_email"],
    "aud": "/projects/214001571238/global/backendServices/6395675270010614410",
    "iat": now,
    "exp": now + 3600
}

signed_jwt = jwt.encode(payload, sa["private_key"], algorithm="RS256")
print(signed_jwt)
EOF


JWT=$(python3 generate_jwt.py)


curl -H "X-Goog-IAP-JWT-Assertion: $JWT" \
     https://your-lb-domain