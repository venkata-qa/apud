# Pact Contract Publishing Guide (Node + TypeScript + Google Cloud IAP)

This guide shows how to:

1. Generate a Google Cloud IAP ID token.
2. Use that token as `PACT_BROKER_TOKEN`.
3. Publish Pact contracts from a Node + TypeScript project via `npm run pact:publish`.

---

## 1. Prerequisites

- You can open your Pact Broker URL in the browser (it’s protected by Google Cloud IAP).
- You have a Node + TypeScript project that generates Pact files into a directory such as `./pacts`.
- `gcloud` CLI is installed and initialized on your machine.

If you don’t have the Google Cloud SDK yet, on macOS:

```bash
brew install --cask google-cloud-sdk
gcloud init
```

Follow the prompts to log in and select the the correct project.

---

## 2. Find the IAP OAuth Client ID

You need the **OAuth 2.0 client ID** configured for IAP; this is used as the `audience` for the ID token.

1. Go to **Google Cloud Console**.
2. Ensure you are in the correct project.
3. Navigate to **Security → Identity-Aware Proxy**.
4. Find the resource that fronts your Pact Broker (Cloud Run, App Engine, Load Balancer, etc.).
5. Click it and look for **“OAuth 2.0 client ID”**. It looks like:

   ```text
   123456789012-abcdefg1234567890.apps.googleusercontent.com
   ```

Copy that value; we’ll refer to it as `OAUTH_CLIENT_ID`.

---

## 3. Log In to gcloud

In your terminal, log in with the **same Google account** that can access the Pact Broker through IAP:

```bash
gcloud auth login
```

Optionally set the project explicitly:

```bash
gcloud config set project YOUR_PROJECT_ID
```

You can confirm the current project with:

```bash
gcloud config get-value project
```

---

## 4. Generate an IAP ID Token

In your terminal, run:

```bash
# Replace with your values
OAUTH_CLIENT_ID="123456789012-abcdefg1234567890.apps.googleusercontent.com"
PACT_BROKER_BASE_URL="https://your-pact-broker-url.example.com"

# Generate an ID token for this audience
ID_TOKEN=$(gcloud auth print-identity-token --audiences="$OAUTH_CLIENT_ID")
```

You can verify it looks like a JWT (three `.`-separated parts, but we’ll just look at two):

```bash
echo "$ID_TOKEN" | cut -d'.' -f1-2
```

---

## 5. Export Environment Variables for Publishing

Your Node publish script will read these environment variables.

```bash
export PACT_BROKER_BASE_URL="$PACT_BROKER_BASE_URL"
export PACT_BROKER_TOKEN="$ID_TOKEN"

# Optional but recommended for versioning
export GIT_COMMIT="$(git rev-parse HEAD)"
export GIT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
export PACT_CONSUMER_TAG="main"
```

- `PACT_BROKER_BASE_URL`: the URL of your Pact Broker (behind IAP).
- `PACT_BROKER_TOKEN`: the Google IAP ID token you just generated.
- `GIT_COMMIT`: your commit SHA for traceability.
- `GIT_BRANCH`: your branch name.
- `PACT_CONSUMER_TAG`: optional tag(s) for the consumer version.

---

## 6. TypeScript Publish Script

Create a file: **`scripts/publishPacts.ts`**

```ts
// scripts/publishPacts.ts
import path from "path";
import { Publisher } from "@pact-foundation/pact-cli";

async function main() {
  const pactBroker = process.env.PACT_BROKER_BASE_URL;
  const pactBrokerToken = process.env.PACT_BROKER_TOKEN;

  if (!pactBroker) {
    throw new Error("PACT_BROKER_BASE_URL env var is required");
  }

  if (!pactBrokerToken) {
    throw new Error("PACT_BROKER_TOKEN env var is required (Google IAP token)");
  }

  const consumerVersion =
    process.env.GIT_COMMIT ||
    process.env.BUILD_NUMBER ||
    process.env.npm_package_version ||
    "dev";

  const opts = {
    pactBroker,
    pactBrokerToken, // Google IAP ID token goes here
    pactFilesOrDirs: [path.resolve(__dirname, "../pacts")],
    consumerVersion,
    branch: process.env.GIT_BRANCH,
    autoDetectVersionProperties: true,
    tags: process.env.PACT_CONSUMER_TAG
      ? process.env.PACT_CONSUMER_TAG.split(",")
      : undefined,
    verbose: true,
  };

  console.log("Publishing pacts with options:", {
    ...opts,
    pactBrokerToken: "***redacted***",
  });

  const publisher = new Publisher(opts);
  await publisher.publishPacts();

  console.log("✅ Pacts successfully published");
}

main().catch((err) => {
  console.error("❌ Failed to publish pacts", err);
  process.exit(1);
});
```

> Note: Make sure your Pact files are in `./pacts`. If they’re in a different folder, update the `pactFilesOrDirs` path accordingly.

---

## 7. Install Dependencies

From your project root, install the Pact CLI and ts-node (if you don’t already have it):

```bash
npm install --save-dev @pact-foundation/pact-cli ts-node
```

Or with yarn:

```bash
yarn add -D @pact-foundation/pact-cli ts-node
```

---

## 8. Add the npm Script

In your `package.json`, add a script entry:

```jsonc
{
  "scripts": {
    "pact:publish": "ts-node scripts/publishPacts.ts"
  }
}
```

Now `npm run pact:publish` (or `yarn pact:publish`) will execute your TypeScript publish script.

---

## 9. Run the Publish Command

With all environment variables set (from steps 4–5) and after your tests have generated the Pact files, run:

```bash
npm run pact:publish
# or
yarn pact:publish
```

If everything is set up correctly, you should see log output ending with:

```text
✅ Pacts successfully published
```

If there’s an error (e.g., 401/403), double-check:

- `OAUTH_CLIENT_ID` is the correct IAP client ID.
- The Google account used with `gcloud auth login` has access to the IAP-protected resource.
- `PACT_BROKER_BASE_URL` matches the URL behind IAP (the same one you open in the browser).
- The Pact files directory exists and contains Pact JSON files.

---

## 10. Quick One-Liner Flow (Summary)

Once you know your `OAUTH_CLIENT_ID` and broker URL, you can use this compact sequence whenever you want to publish:

```bash
OAUTH_CLIENT_ID="123456789012-abcdefg1234567890.apps.googleusercontent.com"
PACT_BROKER_BASE_URL="https://your-pact-broker-url.example.com"

ID_TOKEN=$(gcloud auth print-identity-token --audiences="$OAUTH_CLIENT_ID")

export PACT_BROKER_BASE_URL
export PACT_BROKER_TOKEN="$ID_TOKEN"
export GIT_COMMIT="$(git rev-parse HEAD)"
export GIT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

npm run pact:publish
```
