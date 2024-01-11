import { JSXNode } from "../jsx/index";
export interface HanabiSSE_Event extends MessageEvent<any> {
    hanabi: {
        Append: (Element: JSX.Element | HTMLElement) => void;
    }
}
export class SSE {
    $el?: HTMLDivElement;
    private Manager?: EventSource;
    SSE_ID = `sse-priv-${Date.now().toString()}`
    private URL: string;
    constructor(url: string) {
        this.URL = url;
    }
    JSX(){
        return (
            <div id={this.SSE_ID}></div>
        )
    }
    JSDom(){
        let el = document.createElement('div');
        el.id = this.SSE_ID;

        return el;
    }

    Append(Element: JSX.Element | HTMLElement){
        if(!this.$el)
            throw "Start your instance before add an event!";

        if(Element instanceof HTMLElement){
            this.$el.appendChild(Element);
            return;
        }

        if(Element instanceof JSXNode){
            // @ts-ignore
            return this.$el.innerHTML += Element.toString()
        }
    }

    addEvent(event: string, callback: (event: HanabiSSE_Event, element: HTMLDivElement) => void | JSX.Element | HTMLElement | Promise<HTMLElement | JSX.Element>){
        if(!this.Manager)
            throw "Start your instance before add an event!";

        this.Manager.addEventListener(event, (ev) => {
            if(!this.$el)
                throw "Start your instance before add an event!";
            // @ts-ignore
            let eventProccess: HanabiSSE_Event = ev;

            eventProccess.hanabi = {
                Append: this.Append.bind(this)
            };
            let result = callback(eventProccess, this.$el);
            //  If is an dom element not promise
            if(result instanceof HTMLElement){
                this.$el.innerHTML = "";
                this.$el.appendChild(result);
                return;
            }

            if(result instanceof JSXNode){
                // @ts-ignore
                return this.$el.innerHTML = result.toString()
            }

            if(result instanceof Promise){
                result.then((res) => {
                    if(!this.$el)
                        throw "Start your instance before add an event!";
                    if(res instanceof HTMLElement){
                        this.$el.innerHTML = "";
                        this.$el.appendChild(res);
                        return;
                    }
        
                    if(res instanceof JSXNode){
                        // @ts-ignore
                        return this.$el.innerHTML = res.toString()
                    }
                })
            }
        })
    } 
    start(){
        this.$el = document.querySelector<HTMLDivElement>(`#${this.SSE_ID}`)!;
        this.$el.innerText = "Hello World"
        this.Manager = new EventSource(this.URL);
    }

    unmounth(){
        if(!this.Manager)
            return;
        this.Manager.close();
        console.log("Closed SSE connection.", this.Manager.CLOSED);
        
    }
}