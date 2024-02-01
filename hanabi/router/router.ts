import { DynamicStyleSheet, StyleSheet} from "hanabi/styles/dynamic";
import { NotFount } from "../components/notFount";
import { Component } from "../components/template";
import { Render } from "./render";
import type { Route } from "./route";

export class Router {
    private Element: HTMLElement;
    private Render: Render;
    private notFount = new NotFount();
    private Routes: Route[] = [];
    constructor(Element: HTMLElement){
        this.Element = Element;
        this.Render = new Render(this.Element);
        this.events.bind(this)()
        this.addPage.bind(this)('/404', this.notFount);
    }
    addPage(route: string, component: Component<any>){
        const isRegistered = this.Routes.some(_route => _route.Root === route);
        if(isRegistered)
            throw new Error("Route is registered!");
        
        this.Routes.push({
            Component: component,
            Root: route
        });
        
        return this;
    }

    setNotFoundPage(Page: Component<string>){
        // @ts-ignore
        this.notFount = Page;
        return this;
    }

    enroute(){
        const hash = location.hash;
        let route = hash.replace('#', "");
        if(route === ''){
            route = '/'
        }

        console.log("[Hanabi] - Enrouting " + route);
        
        const component = this.Routes.find(r => r.Root === route);
        if(!component){
            return location.hash = "/404"
        }
    
        const ComponentStyles = component.Component.Styles;
        if(ComponentStyles)
            ComponentStyles.mount.bind(ComponentStyles)();
        return this.Render.render(component.Component);
    }

    events(){
        window.addEventListener('hashchange', this.enroute.bind(this))
    }
}