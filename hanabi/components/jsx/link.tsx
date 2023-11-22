// @ts-ignore
interface Link extends HTMLLinkElement{
     children: JSX.Element | string
};

export function LinkJSX(props: Partial<Link>){
    // @ts-ignore
    return (<a {...props} href={"#" + props.href}>{props.children}</a>)
}