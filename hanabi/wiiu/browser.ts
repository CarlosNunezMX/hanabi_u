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
            if(!window.wiiu || !wiiu){
                Hana.log('Polyfill for wiiu is loading!', 'LOG')
                import('./browser.polyfill')
                    .then(pollyfill => {
                        Hana.log('Polyfill for wiiu loaded!', 'LOG')
                        e();
                    })
            }
            e();
        })
    }
}

export default new BrowserCommon()