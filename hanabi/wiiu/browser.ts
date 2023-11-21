export class BrowserCommon{
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

    
}