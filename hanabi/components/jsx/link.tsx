export function LinkJSX(props: Partial<HTMLLinkElement>){
    // @ts-ignore
    return (<a {...props} href={"#" + props.href}>{props.children}</a>)
}