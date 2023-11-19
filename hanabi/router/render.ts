import { Component } from "../components/template";
import { Route } from "./route";

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

            if(!(data instanceof HTMLElement))
                return this.Element.innerHTML = data.toString();
    
        this.Element.appendChild(data);
        })
        .catch(err => {
            alert("Application Error" + String(err));
            console.log(err);
            
        })
    }
}