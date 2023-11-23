import {Hono} from 'hono'
import {logger} from 'hono/logger'
import {serveStatic} from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server';
import { writeFileSync } from 'fs';

const app = new Hono();

app.use('*', logger())

app.get('/', serveStatic({path: './index.html'}))
app.get('/public/*', serveStatic({
    root: './'
}))

app.get('/source/*', serveStatic({
    root: './'
}));

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