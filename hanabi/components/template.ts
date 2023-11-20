export class Component<TState>{
    RouteName: string = "";
    State: TState | any= {};
    render(): HTMLElement | JSX.Element{return document.createElement('div')};
    // @ts-ignore
    beforeMount(): Promise<TState>{}
}