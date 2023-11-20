import { Home } from "source/Home";
import { Router } from "hanabi/router/router";

import MyStyles from 'source/stylesheets';
const $app = document.getElementById('app');

if (!$app)
    throw new Error("Application element is undefined")

try {
    const HanabiRouter = new Router($app)
        .setStyles(MyStyles);
    HanabiRouter.addPage('/', new Home());

    HanabiRouter.enroute.bind(HanabiRouter)();
}
catch(err){
    alert("ApplicationError - Source\n" + String(err));
    console.error(err)
}