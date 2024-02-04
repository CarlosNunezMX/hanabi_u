import 'hanabi/router/hana'
import { Home } from "source/Home";
import { Router } from "hanabi/router/router";
import { LazyLoadComponent } from 'hanabi/router/lazyLoadComponent';
Hana.debug = true;
const $app = document.getElementById('app');

const SSE_Component = new LazyLoadComponent('source/SSE');

if (!$app)
    throw new Error("Application element is undefined")

try {
    const HanabiRouter = new Router($app)
    HanabiRouter.addPage('/', new Home());
    HanabiRouter.addPage('/sse', SSE_Component);
    HanabiRouter.enroute.bind(HanabiRouter)();
}
catch(err){
    alert("ApplicationError - Source\n" + String(err));
    console.error(err)
}