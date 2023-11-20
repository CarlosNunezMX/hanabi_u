export class StyleSheet {
    url: string;
    cache: boolean;
    mounthOn: '*' | string;
    styleSheet?: HTMLLinkElement;

    constructor(stylesheet: StyleSheet){
        this.cache = stylesheet.cache;
        this.mounthOn = stylesheet.mounthOn;
        this.url = stylesheet.url
    }
}
export default class Styles{
    Stylesheets: StyleSheet[] = [];
    Childrens: HTMLLinkElement[] = [];

    constructor(){

    }

    addRequired(){
        const required = this.Stylesheets.filter(style => {
            return style.cache || style.mounthOn === '*'
        });

        required.forEach(style => {
            // @ts-ignore
            document.head.appendChild(style.styleSheet);
        })
    }

    addStyleSheet(styles: StyleSheet){
        styles.styleSheet = this.createLink(styles);
        this.Stylesheets.push(styles);

        return this;
    }

    process(loc: string){
        const not = this.Stylesheets.filter(style => {
            return style.mounthOn !== '*' && (style.cache && loc !== style.mounthOn); 
        });

        console.log('Removing...', not);
        
        const yes = this.Stylesheets.filter(style => {
            return (loc === style.mounthOn); 
        });

        console.log("Adding...", yes);
        
        not.forEach(style => {
            // @ts-ignore
            document.head.removeChild(style.styleSheet)
        })
        // @ts-ignore
        yes.forEach(style => document.head.appendChild(style.styleSheet))

    }

    createLink(stylesheet: StyleSheet){
        const $stylesheet = document.createElement('link');
        $stylesheet.rel = "stylesheet";
        $stylesheet.setAttribute('data-page', stylesheet.url)
        $stylesheet.href = stylesheet.url;
        return $stylesheet;
    }
}