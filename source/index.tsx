import 'hanabi/router/hana'
import { Home } from "source/Home";
import { Router } from "hanabi/router/router";
import MyStyles from 'source/stylesheets';
import { SSE_Testing } from 'source/SSE';
Hana.debug = true;
const $app = document.getElementById('app');

if (!$app)
    throw new Error("Application element is undefined")

try {
    const HanabiRouter = new Router($app)
        .setStyles(MyStyles);
    HanabiRouter.addPage('/', new Home());
    HanabiRouter.addPage('/sse', new SSE_Testing())
    HanabiRouter.enroute.bind(HanabiRouter)();
}
catch(err){
    alert("ApplicationError - Source\n" + String(err));
    console.error(err)
}