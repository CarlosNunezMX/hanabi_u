import { HeldButtons, HoldButton, tpValidity } from "dev/enums";
import { BrowserAPI } from "dev/wiiu";

var wiiu: BrowserAPI = {
    gamepad: {
        accX: Math.random(),
        accY: Math.random(),
        accZ: Math.random(),
        angleX: Math.random(),
        angleY: Math.random(),
        angleZ: Math.random(),
        contentX: Math.random(),
        contentY: Math.random(),
        dirXx: Math.random(),
        dirXy: Math.random(),
        dirXz: Math.random(),
        dirYx: Math.random(),
        dirYy: Math.random(),
        dirYz: Math.random(),
        dirZx: Math.random(),
        dirZy: Math.random(),
        dirZz: Math.random(),
        gyroX: Math.random(),
        gyroY: Math.random(),
        gyroZ: Math.random(),
        // @ts-ignore
        hold: (() => {
            let x = Object.keys(HoldButton)
            let r = Math.floor((Math.random() * x.length) + 0);
            return HoldButton[r];
        })(),
        lStickX: Math.random(),
        lStickY: Math.random(),
        rStickX: Math.random(),
        rStickY: Math.random(),
        // @ts-ignore
        tpTouch: Math.floor(Math.random()),
        // @ts-ignore
        tpValidity: (() => {
            let x = Object.keys(tpValidity)
            let r = Math.floor((Math.random() * x.length) + 0);
            return tpValidity[r];
        })(),
        tpX: Math.random(),
        tpY: Math.random(),
        update() {
            return this
        }
    },

    videoplayer: {
        end() {
            console.log("Video Ended!")
            return true;
        },
        viewMode: 0
    },
    
    remote: {
        accX: Math.random(),
        accY: Math.random(),
        accZ: Math.random(),
        contentX: Math.random(),
        contentY: Math.random(),
        dpdDistance: Math.random(),
        dpdRollX: Math.random(),
        dpdRollY: Math.random(),
        // @ts-ignore
        dpdValidity: (() => {
            let x = Object.keys(tpValidity)
            let r = Math.floor((Math.random() * x.length) + 0);
            return tpValidity[r];
        })(),
        dpdX: Math.random(),
        dpdY: Math.random(),
        // @ts-ignore
        held: (() => {
            let x = Object.keys(HeldButtons)
            let r = Math.floor((Math.random() * x.length) + 0);
            return HeldButtons[r];
        })(),
        isCursorViewable: 0,
        isDataValid: 1,
        isEnabled: 1,
        mplsAngX: Math.random(),
        mplsAngY: Math.random(),
        mplsAngZ: Math.random(),
        mplsDirXx: Math.random(),
        mplsDirXy: Math.random(),
        mplsDirXz: Math.random(),
        mplsDirYx: Math.random(),
        mplsDirYy: Math.random(),
        mplsDirYz: Math.random(),
        mplsDirZx: Math.random(),
        mplsDirZy: Math.random(),
        mplsDirZz: Math.random(),
        mplsVelX: Math.random(),
        mplsVelY: Math.random(),
        mplsVelZ: Math.random(),
        update() {
            return this;
        },
    },
    imageview: {
        end() {
            console.log(`wiiu.imageview.end()`);
            return true;
        },

        getErrorCode() {
            return -1;
        },

        viewMode: 0
    }
}

window.wiiu = wiiu;