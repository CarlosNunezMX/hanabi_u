import { Component } from "hanabi/components/template";
import { LinkJSX } from "hanabi/components/jsx/link";
import { HanabiSSE_Event, SSE } from "hanabi/SSE/sse";

export class SSE_Testing extends Component<any> {
    RouteName: string = "SSE Testing";
    SSE = new SSE("/sse_testing")
    render(): HTMLElement | JSX.Element {
        let Sse = this.SSE.JSX.bind(this.SSE)
        return <div>
            <h1>SSE Testing</h1>
            <p>Send a POST request to <code>/sse_testing</code></p>

            <Sse/>

            <LinkJSX href="/">Go back home</LinkJSX>
        </div>
    }

    onPost(event: HanabiSSE_Event, element: HTMLDivElement){
        return (
            <p>Recived: {event.data}</p>
        )
    }

    Mounted(): void {
        this.SSE.start.bind(this.SSE)();
        this.SSE.addEvent('update', this.onPost);
    } 
    umount(): void | Promise<void> {
        this.SSE.unmounth.bind(this.SSE)()
    }
}