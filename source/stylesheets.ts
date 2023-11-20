import { StyleSheet } from "hanabi/styles/dynamic";
import Styles from "hanabi/styles/dynamic";

const HomeStyleSheet = new StyleSheet({
    cache: false,
    url: '/public/css/style.css',
    mounthOn: '/'
});

const MicroSheet = new StyleSheet({
    cache: true,
    url: '/public/css/micro.css',
    mounthOn: '*',
})

const NotFountStyleSheet = new StyleSheet({
    cache: true,
    mounthOn: '/404',
    url: '/public/css/notFount.css'
})

const Manager = new Styles()
    .addStyleSheet(HomeStyleSheet)
    .addStyleSheet(NotFountStyleSheet)
    .addStyleSheet(MicroSheet);
    
export default Manager;