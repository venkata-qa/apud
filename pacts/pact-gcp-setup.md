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

- name: Test Pact Broker
  run: |
    curl -i -H "Authorization: Bearer ${{ steps.token.outputs.id_token }}" \
      "https://${{ secrets.PACT_BROKER_URL }}/"
```

No Pact Broker username/password/token is needed because IAM protects the endpoint.

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
