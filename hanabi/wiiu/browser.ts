export class BrowserCommon{
    isRealWiiU = !!window.wiiu;

    LStickPos(){
        const state = wiiu.gamepad.update()
        return {
            x: state.lStickX,
            y: state.lStickY
        };
    }


    RStickPos(){
        const state = wiiu.gamepad.update();
        return {
            x: state.rStickX,
            y: state.rStickY
        }
    }

    usePolyfill(){
        return new Promise<void>(e => {
            if(!window.wiiu || !!wiiu){
                console.log("Using polyfill...")
                import('./browser.polyfill')
                    .then(pollyfill => {
                        console.log("Polyfill is loaded!")
                        e();
                    })
            }
            e();
        })
    }
}

export default new BrowserCommon()