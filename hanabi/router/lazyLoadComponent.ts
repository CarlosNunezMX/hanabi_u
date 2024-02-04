import { Component } from "hanabi/components/template";

interface LazyComponentI {
    url: string;
    component?: Component<any>;
    load(): Promise<Component<any>>
}
export class LazyLoadComponent implements LazyComponentI{
    url: string;
    component?: Component<any> | undefined;
    constructor(url: string){
        this.url = url;
    }

    load(): Promise<Component<any>>{
        console.log(this);
        
        return new Promise<Component<any>>((res, rej) => {
            import(this.url)
                .then((component) => {
                    console.log(component);
                    
                    if(!component.default){
                        rej("File imported successfully but component not fount!\nAt: " + this.url);
                    }

                    const response: Component<any> = component.default;
                    if(typeof response !== 'function'){
                        rej('Component has not a valid type!\nAt: ' + this.url)
                    }

                    // @ts-ignore
                    this.component = new response();
                    // @ts-ignore
                    res(new response());

                })

                .catch(err => {
                    rej("Import failed in file " + this.url + ' ' + err);
                })
        })
    }
}