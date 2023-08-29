# Hygraph ⨯ Meilisearch

Using [Hygraph webhooks]('https://hygraph.com/docs/api-reference/basics/webhooks') to sync data to [Meilisearch]('https://www.meilisearch.com/') Cloud on new published content.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/tleppik/hygraph-with-meilisearch)

(If you click this button, it will create a new repo for you that looks exactly like this one, and sets that repo up immediately for deployment on Netlify)

## How to use

### Set up Meiliesearch
* Create Meilisearch account
* Insert an Meilisearch index e.g. ``hygraph``

### Set up Hygraph Webhook
* Add [Webhook]('https://hygraph.com/docs/api-reference/basics/webhooks')
* Add a secret key** to sign the payload of your webhook

### Set up Project (Webhook)
* Enter your Meilisearch host url into ``.env`` as ``MEILISEARCH_URL``
* Enter your Meilisearch index name into ``.env`` as ``MEILISEARCH_INDEX``
* Enter your Meilisearch Admin API key into ``.env`` as ``MEILISEARCH_API_KEY``
* Enter your Hygraph Secret Key** into ``.env`` as ``HYGRAPH_WEBHOOK_TOKEN``


** [Hygraph signed webhooks]('https://hygraph.com/blog/introducing-signed-webhooks')