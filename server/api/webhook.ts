export default defineEventHandler(async (event) => {

    if (event.node.req.method === 'GET') {
        throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
    }

    if (event.node.req.method === 'POST') {
        const body = await readBody(event);
        try {

            const host: string = process.env.HYGRAPH_API;
            const token: string = process.env.HYGRAPH_TOKEN;

            // add or replace documents
            // /indexes/{index_uid}/documents
            const resp = await fetch(host, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": token
                },
                body: body
            });

            const data = await resp.json();
            if (data === null) {
                throw new Error('data is null');
            }

            return { body }

        } catch (err) {
            throw createError({ statusCode: 403, statusMessage: err.message })
        }
    }
})