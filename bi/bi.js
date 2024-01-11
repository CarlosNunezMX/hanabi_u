import {Hono} from 'hono'
import {logger} from 'hono/logger'
import {serveStatic} from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server';
import { writeFileSync } from 'fs';
import {streamSSE} from 'hono/streaming'
const app = new Hono();

app.use('*', logger())

app.get('/', serveStatic({path: './index.html'}))
app.get('/public/*', serveStatic({
    root: './'
}))

app.get('/source/*', serveStatic({
    root: './'
}));

let i = 0;

app.post('/sse_testing', (c) => {
    i++
    return c.json({ok: true})
})


app.get('/sse_testing', (c) => {
    return streamSSE(c, async stream => {
        let lastI = undefined;
        while(true){
            await stream.writeSSE({
                data: i.toString(),
                event: 'update',
                id: i.toString()
            })

            await stream.sleep(1000)
        }
    })
})
app.post('/yoru', async c => {
    const body = await c.req.json();
    writeFileSync(`log(${Date.now()}).txt`, JSON.stringify(body));
    return c.json({ok: true});
})
serve({
    fetch: app.fetch,
    port: 5500,
}, (i) => {
    console.log(`花火 HanabiU - Maded by CarlosNunezMX\n火 - Hono server started!\nListening in: ${i.address}:${i.port}`)
})