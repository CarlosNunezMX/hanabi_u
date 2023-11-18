export class Component<TState>{
    RouteName: string = "";
    State: TState | any= {};
    render(): HTMLElement | JSX.Element{return (<h1></h1>)};
    // @ts-ignore
    beforeMount(): Promise<TState>{}
}