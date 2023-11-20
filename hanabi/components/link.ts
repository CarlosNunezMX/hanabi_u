export function Link(href: string){
    const $link = document.createElement('a');
    $link.href = '#' + href;

    return $link;
}