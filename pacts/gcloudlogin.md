I’ll assume:

You can already open the broker URL in your browser after logging in with your Google account.

You have the OAuth 2.0 client ID for the IAP-protected app (if not, I’ll show how to find it too).

0. One-time setup: install and init gcloud (if not done)

On your Mac:

Install the Google Cloud SDK (if you haven’t):

brew install --cask google-cloud-sdk


Initialize:

gcloud init


Follow the prompts to log in and select the correct project.

If you already use gcloud on this machine, you can skip this.

1. Find the IAP OAuth client ID (“audience”)

You need the OAuth 2.0 client ID that IAP uses for your Pact Broker.

Go to Google Cloud Console in your browser.

Make sure you’re in the right project (same one your broker runs in).

Navigate to:
Security → Identity-Aware Proxy.

Find the line for the resource that fronts your Pact Broker:

e.g. Cloud Run service, App Engine app, HTTPS Load Balancer, etc.

Click it, then look for “OAuth 2.0 client ID”.
It will look something like:

123456789012-abcdefg1234567890.apps.googleusercontent.com


Copy that somewhere – we’ll call it OAUTH_CLIENT_ID.

2. Log in to gcloud with the same Google identity

In your terminal:

gcloud auth login


A browser window opens; log in with the same Google account that can access the Pact Broker via IAP.

Close the browser window when it says “You are now authenticated”.

(If you’re already logged in with that account for this project, you might not need this, but running it doesn’t hurt.)

Optionally set the project explicitly:

gcloud config set project YOUR_PROJECT_ID


You can see your current project with:

gcloud config get-value project

3. Generate the ID token

Now you’ll ask Google to mint an ID token for that IAP client.

In your terminal:

# 1. Set variables (replace with your own values)

OAUTH_CLIENT_ID="123456789012-abcdefg1234567890.apps.googleusercontent.com"  # from step 1
PACT_BROKER_BASE_URL="https://your-pact-broker-url.example.com"            # same URL you use in browser

# 2. Print an identity token for that audience
ID_TOKEN=$(gcloud auth print-identity-token --audiences="$OAUTH_CLIENT_ID")


You can quickly verify it looks like a JWT:

echo "$ID_TOKEN" | cut -d'.' -f1-2


You should see two base64-y segments separated by a dot.

4. Export env vars for your Node publish script

Now wire this into the variables your TypeScript script expects:

export PACT_BROKER_BASE_URL="$PACT_BROKER_BASE_URL"
export PACT_BROKER_TOKEN="$ID_TOKEN"


(If your script uses other env vars like GIT_COMMIT, GIT_BRANCH, set those too.)

Example:

export GIT_COMMIT="$(git rev-parse HEAD)"
export GIT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

5. Run the publish command

From your project root:

npm run pact:publish
# or
yarn pact:publish


Your script should now send:

Authorization: Bearer <ID_TOKEN>


on every request to the broker, and IAP will accept it as long as:

The token was minted with the correct --audiences (your IAP client ID), and

The Google user you logged in as has access through IAP.

If something goes wrong you’ll usually see:

401 Unauthorized / 403 Forbidden – check that:

the same user has IAP access,

the client ID is correct,

you used print-identity-token (not access token).

Quick recap as a “one-liner style” flow

Once you’ve found OAUTH_CLIENT_ID and know your broker URL, each time you want to publish you can basically do:

OAUTH_CLIENT_ID="123456789012-abcdefg1234567890.apps.googleusercontent.com"
PACT_BROKER_BASE_URL="https://your-pact-broker-url.example.com"

ID_TOKEN=$(gcloud auth print-identity-token --audiences="$OAUTH_CLIENT_ID")

export PACT_BROKER_BASE_URL
export PACT_BROKER_TOKEN="$ID_TOKEN"

npm run pact:publish
