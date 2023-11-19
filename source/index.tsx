import { Home } from "source/Home";
import { Router } from "hanabi/router/router";
const $app = document.getElementById('app');

if (!$app)
    throw new Error("Application element is undefined")

try {
    const HanabiRouter = new Router($app);
    HanabiRouter.addPage('/', new Home());

    HanabiRouter.enroute();
}
catch(err){
    alert("ApplicationError - Source\n" + String(err));
    console.error(err)
}