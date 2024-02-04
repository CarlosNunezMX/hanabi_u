import { DynamicStyleSheet, StyleSheet } from "hanabi/styles/dynamic";
import { NotFount } from "../components/notFount";
import { Component } from "../components/template";
import { Render } from "./render";
import type { Route } from "./route";
import { LazyLoadComponent } from "./lazyLoadComponent";

export class Router {
    private Element: HTMLElement;
    private Render: Render;
    private notFount = new NotFount();
    private Routes: Route[] = [];
    constructor(Element: HTMLElement) {
        this.Element = Element;
        this.Render = new Render(this.Element);
        this.events.bind(this)()
        this.addPage.bind(this)('/404', this.notFount);
    }
    addPage(route: string, component: Component<any> | LazyLoadComponent) {
        const isRegistered = this.Routes.some(_route => _route.Root === route);
        if (isRegistered)
            throw new Error("Route is registered!");

        this.Routes.push({
            Component: component,
            Root: route
        });

        return this;
    }

    setNotFoundPage(Page: Component<string>) {
        // @ts-ignore
        this.notFount = Page;
        return this;
    }

    enroute() {
        const hash = location.hash;
        let route = hash.replace('#', "");
        if (route === '') {
            route = '/'
        }

        console.log("[Hanabi] - Enrouting " + route);

        const componentIndex = this.Routes.findIndex(r => r.Root === route);
        const component = this.Routes[componentIndex];
        if (!component) {
            return location.hash = "/404"
        }
        if (component.Component instanceof LazyLoadComponent && !component.Component.component) {
            return component.Component.load.bind(this.Routes[componentIndex].Component)()
                .then(response => this.callLoader.bind(this)(this.Routes[componentIndex]))
                .catch(err => {throw err})
        }

        return this.callLoader.bind(this)(component);

    }

    callLoader(component: Route) {
        if (component.Component instanceof LazyLoadComponent) {
            if (!component.Component.component)
                throw "Component is not loaded!";

            const ComponentStyles = component.Component.component.Styles;
            if (ComponentStyles)
                ComponentStyles.mount.bind(ComponentStyles)();
            return this.Render.render.bind(this.Render)(component.Component.component);
        }

        const ComponentStyles = component.Component.Styles;
        if (ComponentStyles)
            ComponentStyles.mount.bind(ComponentStyles)();
        return this.Render.render.bind(this.Render)(component.Component);
    }
    events() {
        window.addEventListener('hashchange', this.enroute.bind(this))
    }
}