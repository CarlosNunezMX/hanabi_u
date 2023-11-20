import { Component } from "./template";

export class NotFount extends Component<string>{
    RouteName: string = "Page not fount!";
    render(): JSX.Element | HTMLElement {
        const $div = document.createElement("div")
        const $image = document.createElement('img');

        $image.src = "/public/hanabi.png";
        $image.alt = "Hanabi U Logo"
        const $h1 = document.createElement('h1');
        $h1.innerText = 'Ops...'

        const $span = document.createElement('span')
        $span.innerText = 'Page not found!';

        $h1.appendChild($span);
        
        const $button = document.createElement('a');
        $button.href = "#/";
        $button.innerText = "Go back to secure."
        const $code = document.createElement('code');
        $code.innerText = this.State;
        $div.appendChild($image)
        $div.appendChild($h1);
        $div.appendChild($code)
        $div.appendChild($button)
        return $div
    }

    beforeMount(): Promise<string> {
        return new Promise(res => {
            res(location.hash);
        })
    }
}