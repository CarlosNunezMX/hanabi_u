import Styles from "hanabi/styles/dynamic";
import { NotFount } from "../components/notFount";
import { Component } from "../components/template";
import { Render } from "./render";
import type { Route } from "./route";

export class Router {
    private Element: HTMLElement;
    private Render: Render;
    private notFount = new NotFount();
    private Routes: Route[] = [];
    private StyleSheetController?: Styles;
    constructor(Element: HTMLElement){
        this.Element = Element;
        this.Render = new Render(this.Element);
        this.events.bind(this)()
        this.addPage.bind(this)('/404', this.notFount);
    }
    setStyles(styles: Styles){
        this.StyleSheetController = styles;
        this.StyleSheetController.addRequired()
        return this;
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

    setNotFoundPage(Page: Component<any>){
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
    
        if(this.StyleSheetController)
            this.StyleSheetController.process.bind(this.StyleSheetController)(route);
        return this.Render.render(component.Component);
    }

    events(){
        window.addEventListener('hashchange', this.enroute.bind(this))
    }
}