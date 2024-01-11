import { Component } from "../components/template";
import { Route } from "./route";
export class Render{
    private Element: HTMLElement;
    private lastComponent?: Component<any>;

    constructor(Element: HTMLElement){
        this.Element = Element;
    }
    render(component: Component<any>){
        if(this.lastComponent){
            this.lastComponent.umount.bind(this.lastComponent)();
        }
        this.Element.innerHTML = '';
        document.title = component.RouteName;

        component.beforeMount.bind(component)()
        .then(res => {
            console.log("Mounting Component " + component.RouteName + "...");
            
            component.State = res;
            const data = component.render.bind(component)();
            
            if(!(data instanceof HTMLElement)){
                this.Element.innerHTML = data.toString();
            }else {
                this.Element.appendChild(data);
            }
            console.log(component);
            
            component.Mounted.bind(component)();
            console.log("Component " + component.RouteName + " mounted!")

            this.lastComponent = component;
        })
        .catch(err => {
            alert("Application Error\n" + String(err));
            console.log(err);
            
        })
    }
}