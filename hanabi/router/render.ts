import { Component } from "../components/template";
import { Route } from "./route";
export class Render{
    private Element: HTMLElement;
    private lastComponent?: Component<any>;

    constructor(Element: HTMLElement){
        this.Element = Element;
    }
    private mountComponent(component: Component<any>, response: any){
        console.log("Mounting Component " + component.RouteName + "...");
            
            component.State = response;
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
    }
    render(component: Component<any>){
        console.log(component);
        
        if(this.lastComponent){
            const StyleSheet = this.lastComponent.Styles;
            if(StyleSheet)
                StyleSheet.umount();
            this.lastComponent.umount.bind(this.lastComponent)();
        }
        this.Element.innerHTML = '';
        document.title = component.RouteName;
        const Response = component.beforeMount.bind(component)()
        if(Response instanceof Promise)
            Response.then(res => this.mountComponent.bind(this)(component, res))
            .catch(err => {
                alert("Application Error\n" + String(err));
                console.log(err);
            })
        else this.mountComponent.bind(this)(component, Response);
        
    }
}