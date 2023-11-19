import { Component } from "./template";

export class NotFount extends Component<string>{
    RouteName: string = "Page not fount!";
    render(): JSX.Element | HTMLElement {
        return (
            <div>
                <h1>Ops...<span>Page not fount!</span></h1>
                <code>{this.State}</code>
            </div>
        )
    }

    beforeMount(): Promise<string> {
        return new Promise(res => {
            res(location.hash);
        })
    }
}