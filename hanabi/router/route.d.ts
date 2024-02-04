import { Component } from "../components/template";
import { LazyLoadComponent } from "./lazyLoadComponent";

export type Route = {
    Root: string;
    Component: Component<any> | LazyLoadComponent;
}