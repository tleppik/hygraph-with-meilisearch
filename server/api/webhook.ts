import { MeiliSearch } from 'meilisearch'
import { astToHtmlString } from '@graphcms/rich-text-html-renderer';

export default defineEventHandler(async (event) => {

    // if(event.node.req.headers['Authorization']) {
    //     console.log("Authorization", event.node.req.headers['Authorization']);
    // }

    if (event.node.req.method === 'GET') {
        throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
    }

    if (event.node.req.method === 'POST') {

        try {
            const article = await readBody(event);
            const faq = article;
    
            const locale = faq.data.localizations;
            const content = locale[0].answer.raw;
    
            const answer = astToHtmlString({
                content,
            });
    
            const document = {
                id: faq.data.id,
                created: faq.data.createdAt,
                answer: answer,
                question: locale[0].question
            }

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