import { NotFount } from "../components/notFount.js";
import { Component } from "../components/template.js";
import { Render } from "./render.js";
import type { Route } from "./route.js";

export class Router {
    private Element: HTMLElement;
    private Render: Render;
    private notFount = new NotFount();
    private Routes: Route[] = [];
    constructor(Element: HTMLElement){
        this.Element = Element;
        this.Render = new Render(this.Element);
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
        let mainroute = this.Routes.find(route => route.Root === '/');
        const route = hash.replace('#', "");
        if(route === '' || route === '/'){
            if(!mainroute)
                return this.Render.render(this.notFount);

            return this.Render.render(mainroute.Component)
        }

        const component = this.Routes.find(r => r.Root === route);

        if(!component)
            return this.Render.render(this.notFount);

        return this.Render.render(component.Component);
    }

    events(){
        window.addEventListener('hashchange', this.enroute.bind(this))
    }
}