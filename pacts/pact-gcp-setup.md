# Pact Broker on GCP Cloud Run

This repository contains infrastructure and configuration for running **Pact Broker** in **Google Cloud Run** backed by a remote **PostgreSQL** instance.

## Architecture Overview

```
Developer / CI ----> Cloud Run (Pact Broker) ----> PostgreSQL
                               |                     
                               |                     
                      Google IAM Authentication      
```

### Key Points

* Pact Broker container deploys to Cloud Run.
* PostgreSQL database has its own hostname and runs outside Cloud Run.
* Pact Broker UI loads without additional username/password.
* Access is secured by **Google Cloud IAM**, not by Pact Broker basic auth.

## Accessing the Pact Broker

### Browser

* When logged in with your organization Google account, the UI opens directly.
* In Incognito mode, you are redirected to Google Login.

This confirms the service is protected by Cloud IAM.

### Permissions

No Pact Broker credentials are required because Cloud Run handles IAM-level auth.

## Cloud Run Configuration

These environment variables must be configured in Cloud Run:

```
PACT_BROKER_DATABASE_ADAPTER=postgres
PACT_BROKER_DATABASE_HOST=<DB_HOST>
PACT_BROKER_DATABASE_PORT=5432
PACT_BROKER_DATABASE_NAME=<DB_NAME>
PACT_BROKER_DATABASE_USERNAME=<DB_USER>
PACT_BROKER_DATABASE_PASSWORD=<DB_PASSWORD>
```

Cloud Run provides the container `PORT` automatically.

## Local Testing

You must authenticate using a **service account**, not your user account.

### Step 1: activate service account

```
gcloud auth activate-service-account <SERVICE_ACCOUNT_EMAIL> \
  --key-file=<PATH_TO_KEY> \
  --project=<PROJECT_ID>
```

### Step 2: generate an identity token

```
ID_TOKEN=$(gcloud auth print-identity-token \
  --audiences="https://<CLOUD_RUN_URL>")
```

### Step 3: curl the service

```
curl -i -H "Authorization: Bearer $ID_TOKEN" \
  "https://<CLOUD_RUN_URL>/"
```

If successful, you will see `HTTP 200` and Pact Broker HTML.

## GitHub Actions Integration

Store the service account JSON as a GitHub secret.

### Example workflow snippet

```yaml
- name: Set up gcloud
  uses: google-github-actions/setup-gcloud@v2
  with:
    project_id: ${{ secrets.GCP_PROJECT_ID }}
    service_account_key: ${{ secrets.GCP_SA_KEY }}
    export_default_credentials: true

- name: Get Identity Token
  id: token
  run: |
    ID_TOKEN=$(gcloud auth print-identity-token \
      --audiences="https://${{ secrets.PACT_BROKER_URL }}")
    echo "id_token=$ID_TOKEN" >> $GITHUB_OUTPUT

- name: Publish pacts to Pact Broker
  env:
    PACT_BROKER_BASE_URL: "https://${{ secrets.PACT_BROKER_URL }}"
    PACT_BROKER_TOKEN: "${{ steps.token.outputs.id_token }}"
  run: |
    npx pact-broker publish ./pacts \
      --consumer-app-version 1.0.0 \
      --branch main \
      --broker-base-url "$PACT_BROKER_BASE_URL"
```

### Using Pact CLI / `npx pact-broker` with IAP

Cloud Run is protected by IAM, so Pact CLI must send a Bearer token.

We use the **IAP Identity Token** as the broker token:

```
export PACT_BROKER_BASE_URL=https://<CLOUD_RUN_URL>
export PACT_BROKER_TOKEN=$ID_TOKEN

npx pact-broker publish ./pacts \
  --consumer-app-version 1.0.0 \
  --branch main
```

This works because Pact CLI sends:

```
Authorization: Bearer <token>
```

and IAP validates the token before the request reaches Pact Broker.

## Authentication Flow Diagram

```
    Developer / CI
         |
         | (1) Request Pact Broker
         v
 +------------------+
 |  Cloud Run URL   |
 +------------------+
         |
         | (2) Google IAM/IAP checks ID token
         v
 +------------------+
 |    Pact Broker   |
 +------------------+
         |
         | (3) Pact Broker routes to DB
         v
 +------------------+
 |   PostgreSQL     |
 +------------------+
```

* If the request has a valid IAP token → allowed
* If missing → `401 invalid iap credentials: empty token`

---

## Enabling Basic Auth (instead of IAP)

If you want Pact Broker to authenticate directly, disable IAP/Require Auth in Cloud Run and set these environment variables:

```
PACT_BROKER_BASIC_AUTH_USERNAME=<USER>
PACT_BROKER_BASIC_AUTH_PASSWORD=<PASSWORD>
```

Optional read-only credentials:

```
PACT_BROKER_BASIC_AUTH_READ_ONLY_USERNAME=<USER>
PACT_BROKER_BASIC_AUTH_READ_ONLY_PASSWORD=<PASSWORD>
```

Then calls become simple:

```
export PACT_BROKER_USERNAME=<USER>
export PACT_BROKER_PASSWORD=<PASSWORD>
```

---

## Making Cloud Run Internal Only

To block external access and rely only on private networking:

### Option A: Restrict ingress

Set Cloud Run ingress to:

```
Internal only
```

### Option B: Use Serverless VPC Connector

Attach a VPC connector, then set:

```
Egress: All traffic
```

### Option C: Expose only via Internal Load Balancer

* Cloud Run → Internal HTTP Load Balancer → Private IP

This makes Pact Broker reachable only from your corporate network/VPC.

---

## Troubleshooting CI/CD Authentication

### 401 invalid iap credentials: empty token

Cause:

* No `Authorization: Bearer <token>` header.

Fix:

```
export PACT_BROKER_TOKEN=$(gcloud auth print-identity-token ...)
```

### invalid account type for --audiences

You used a **user** account.
Use a service account:

```
gcloud auth activate-service-account ...
```

### Cannot access broker in browser

* You are not logged in with your corporate Google account
* Your Google IAM permissions are missing

### Pact CLI complains about auth

Use:

```
export PACT_BROKER_TOKEN=$ID_TOKEN
```

---

## Deploying to Cloud Run

### Step 1: Build image

```
docker build -t gcr.io/<PROJECT_ID>/pact-broker .
```

### Step 2: Push to GCR or Artifact Registry

```
docker push gcr.io/<PROJECT_ID>/pact-broker
```

### Step 3: Deploy

```
gcloud run deploy pact-broker \
  --image=gcr.io/<PROJECT_ID>/pact-broker \
  --platform=managed \
  --region=<REGION> \
  --allow-unauthenticated  # unless using IAM/IAP
```

### Step 4: Set environment variables

In Cloud Run UI or CLI:

```
PACT_BROKER_DATABASE_HOST=<DB_HOST>
PACT_BROKER_DATABASE_NAME=<DB_NAME>
PACT_BROKER_DATABASE_USERNAME=<DB_USER>
PACT_BROKER_DATABASE_PASSWORD=<DB_PASSWORD>
```

---

## Common Issues

### `invalid account type for --audiences requires valid service account`

You are trying to use a **user account** instead of a service account.

### UI opens directly when logged in

Expected behavior.

### UI redirects to Google in Incognito

Expected behavior.

## Security Notes

* Pact Broker is not publicly accessible without authentication.
* Google IAM controls access.
* Basic Auth is not configured in Pact Broker.

## Summary

* Pact Broker + Cloud Run setup is working correctly.
* Authentication is handled by Google IAM.
* PostgreSQL database connection is configured via environment variables.
* CI/CD and local scripts must use a service account identity token.
