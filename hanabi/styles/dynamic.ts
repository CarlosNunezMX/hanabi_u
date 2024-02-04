export class StyleSheet {
    url: string;
    cache: boolean;
    styleSheet?: HTMLLinkElement;
    cached?: boolean = false;
    mounted? = false;

    constructor(stylesheet: StyleSheet) {
        this.cache = stylesheet.cache;
        this.url = stylesheet.url
    }
}

export class DynamicStyleSheet {
    PageStyleSheets: StyleSheet[] = [];
    mounted = false;
    mountCatche(){
        this.PageStyleSheets.forEach((e, index) => {
            if(!e.cache || e.cached)
                return;
            const $style = document.createElement('link');
            $style.rel = "stylesheet";
            $style.href = e.url;

            $style.onload = (event) => {
                document.body.removeChild($style);
            }

            document.body.appendChild($style);
            this.PageStyleSheets[index].styleSheet = $style;
            this.PageStyleSheets[index].cached = true;

        })
    }
    
    constructor(initialState: StyleSheet[]){
        this.PageStyleSheets = initialState;
        this.mountCatche.bind(this)();
    }

    appendStyle(stylesheet: StyleSheet){
        this.PageStyleSheets.push(stylesheet);
        if(stylesheet.cache)
            this.mountCatche.bind(this)();
        if(this.mounted)
            this.mount.bind(this)()

    }

    umount(){
        this.PageStyleSheets.forEach((e, i) => {
            if(!e.styleSheet)
                throw "Cannot unload a element who is not appended to document body";
            document.body.removeChild(e.styleSheet);
            this.PageStyleSheets[i].mounted = false;
        })
        this.mounted = false;
    }

    mount(){
        this.PageStyleSheets.forEach(($e, index) => {
            if($e.mounted)
                return;
            const $style = document.createElement('link');
            $style.rel = "stylesheet";
            $style.href = $e.url;

            document.body.appendChild($style);
            this.PageStyleSheets[index].styleSheet = $style;
            this.PageStyleSheets[index].mounted = true;
        })
    }
}