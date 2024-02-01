import { Component } from "hanabi/components/template";
import { LinkJSX } from "hanabi/components/jsx/link";
import BrowserCommon from "hanabi/wiiu/browser";
import { DynamicStyleSheet, StyleSheet } from "hanabi/styles/dynamic";

const StyleSheets: StyleSheet[] = [
    new StyleSheet({
        cache: true,
        url: "/public/css/micro.css",
    }),

    new StyleSheet({
        cache: false,
        url: '/public/css/style.css'
    })
]

export class Home implements Component<void>{
    RouteName: string = "Home";
    State: any;

    beforeMount(){};
    Mounted(){};
    umount(){};

    Styles: DynamicStyleSheet = new DynamicStyleSheet(StyleSheets);
    render(): HTMLElement | JSX.Element {
        return <div>
            <img src="/public/Hanabi.png" class="hanabi_logo" width={128} alt="Hanabi Logo"/>
            <h1>Welcome to HanabiU</h1>
            <LinkJSX href="/help">Hello World</LinkJSX>
            <span>Try editing <code>source/Home.tsx</code> - Is Real WiiU? {String(BrowserCommon.isRealWiiU)}</span>
            <LinkJSX href="/sse">SSE Test</LinkJSX>

            <a href="/">RELOAD</a>
        </div>
    }

}