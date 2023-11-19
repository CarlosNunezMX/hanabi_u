import { Component } from "hanabi/components/template";

export class Home extends Component<void>{
    RouteName: string = "Home";
    State: any;

    beforeMount(): Promise<void> {
        return new Promise(res => res());
    }

    render(): HTMLElement | JSX.Element {
        return <div>
            <img src="/public/hanabi.png" class="hanabi_logo" width={128} alt="Hanabi Logo"/>
            <h1>Welcome to HanabiU</h1>
            <span>Try editing <code>source/Home.tsx</code></span>
        </div>
    }
}