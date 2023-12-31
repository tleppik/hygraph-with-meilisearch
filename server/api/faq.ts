import { MeiliSearch } from 'meilisearch'
import { FAQ, convertToFAQ } from "~/server/utils/schemes/faq";
import { verifyWebhookSignature } from "~/server/utils/signature";

export default defineEventHandler(async (event) => {

    if (event.node.req.method !== 'POST') {
        throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
    }

    if (event.node.req.method === 'POST') {

        try {

            const body = await readBody(event);

            // check secret key and validation
            const secret = process.env.HYGRAPH_WEBHOOK_TOKEN;
            const signature = event.node.req.headers['gcms-signature'];
            const isValid = verifyWebhookSignature( body, signature, secret );

            if (!isValid) {
                throw createError({ statusCode: 403, statusMessage: 'No Permissions '})
            }

            const article = body;
            const document: FAQ = convertToFAQ(article);

            const meilisearch = {
                host: process.env.MEILISEARCH_URL,
                apiKey: process.env.MEILISEARCH_API_KEY,
                index: process.env.MEILISEARCH_INDEX
            }

            const client = new MeiliSearch({
                host: meilisearch.host,
                apiKey: meilisearch.apiKey,
            });

            if (client === null) {
                throw createError({ statusCode: 500, statusMessage: 'meilisearch client is null' })
            }

            const index = client.index(meilisearch.index);
            if (client === null) {
                throw createError({ statusCode: 500, statusMessage: 'meilisearch index is null' })
            }

            // add or replace documents
            // /indexes/{index_uid}/documents
            let response = await index.addDocuments([
                document
            ]);
            return response;

        } catch (err) {
            throw createError({ statusCode: 403, statusMessage: err.message })
        }
    }
})