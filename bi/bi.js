import {Hono} from 'hono'
import {logger} from 'hono/logger'
import {serveStatic} from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server';

const app = new Hono();

app.use('*', logger())

app.get('/', serveStatic({path: './index.html'}))
app.get('/public/*', serveStatic({
    root: './'
}))

app.get('/source/*', serveStatic({
    root: './'
}))
serve({
    fetch: app.fetch,
    port: 8080,
}, (i) => {
    console.log(`花火 HanabiU - Maded by CarlosNunezMX\n火 - Hono server started!\nListening in: ${i.address}:${i.port}`)
})