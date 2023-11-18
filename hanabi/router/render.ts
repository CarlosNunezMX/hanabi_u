import { Component } from "../components/template.js";
import { Route } from "./route.js";

export class Render{
    private Element: HTMLElement;
    constructor(Element: HTMLElement){
        this.Element = Element;
    }

    render(component: Component<any>){
        this.Element.innerHTML = '';
        document.title = component.RouteName;

        component.beforeMount()
        .then(res => {
            component.State = res;
            const data = component.render.bind(component)();

            if(typeof data === 'string')
                return this.Element.innerHTML = data;
            // @ts-ignore
            this.Element.appendChild(data);
        })
        .catch(err => {
            alert("Application Error" + String(err));
        })
    }
}