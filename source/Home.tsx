import { Component } from "hanabi/components/template";
import { LinkJSX } from "hanabi/components/jsx/link";
import BrowserCommon from "hanabi/wiiu/browser";
export class Home extends Component<void>{
    RouteName: string = "Home";
    State: any;


    render(): HTMLElement | JSX.Element {
        return <div>
            <img src="/public/Hanabi.png" class="hanabi_logo" width={128} alt="Hanabi Logo"/>
            <h1>Welcome to HanabiU</h1>
            <LinkJSX href="/help">Hello World</LinkJSX>
            <span>Try editing <code>source/Home.tsx</code> - Is Real WiiU? {String(BrowserCommon.isRealWiiU)}</span>
            <LinkJSX href="/sse">SSE Test</LinkJSX>
        </div>
    }

}