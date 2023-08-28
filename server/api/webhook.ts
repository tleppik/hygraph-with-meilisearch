export default defineEventHandler(async  (event) => {
    
    if (event.node.req.method === 'GET') {
        return "wrong type";
    }

    if(event.node.req.method === 'POST') {
        const body = await readBody(event);       
        return { body } 
    }
  })