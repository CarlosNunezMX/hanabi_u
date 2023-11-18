export function Link(href: string){
    const $link = document.createElement('a');
    $link.href = '#' + href;

    return $link;
}

export function LinkJSX(props: HTMLLinkElement){
    // @ts-ignore
    return (<a {...props} href={"#" + props.href}></a>)
}

