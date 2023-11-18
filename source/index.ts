import {Router} from '../hanabi/router/router.js';

const $app = document.getElementById('app')
if(!$app){
    throw new Error('Couldnt find app element')
}
const hanabi_router = new Router($app);
console.log(hanabi_router);
