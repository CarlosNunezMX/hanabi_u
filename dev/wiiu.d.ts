import { HoldButton, ImageAPI_ErorCodes, tpValidity, HeldButtons } from "./enums";

interface ImageAPI {
    /**
     * 1 if browser is visible on GamePad. 0 if image preview is visible on GamePad. Read/write.
     */
    viewMode: 1 | 0;
    /**
     * Closes Image Preview mode. Returns true if successful.
     */
    end(): boolean;
    /**
     * Returns the most recent error code for Image Preview.
     */
    getErrorCode(): ImageAPI_ErorCodes;
}
interface VideoAPI {
    /**
     * 1 if browser is visible on GamePad. 0 if video is visible on GamePad. Read/write. 
     */
    viewMode: 1 | 0;
    /**
     * Stops the currently playing video. Returns true if successful.
     */
    end(): boolean;
}
interface Gamepad {
    /**
      * 1 if touch is present 
    */
    tpTouch: 1 | 0;
    tpValidity: tpValidity;

    /**
     * X position in screen coordinates
     */
    tpX: number;
    /**
     * Y position in screen coordinates
     */
    tpY: number;

    /**
     * Update and get realtime data
     */
    update(): Gamepad

    /**
     * X position in page coordinates
     */
    contentX: number;
    /**
     * Y position in page coordinates
     */
    contentY: number;

    /**
     * (L) - X deflection
     */
    lStickX: number;

    /**
     * (L) - Y deflection
     */
    lStickY: number;

    /**
     * (R) - X deflection
     */
    rStickX: number;

    /**
     * (R) - Y deflection
     */
    rStickY: number;

    hold: HoldButton

    /**
     * Force on X (horizontal) axis
     */
    accX: number

    /**
     * Force on Y (depth) axis
     */
    accY: number


    /**
     * Force on Z (vertical) axis
     */
    accZ: number

    /**
     * Rotation speed around X (horizontal) axis
     */
    gyroX: number;
    /**
     * Rotation speed around Y (depth) axis
     */
    gyroY: number;
    /**
     * Rotation speed around Z (vertical) axis
     */
    gyroZ: number;

    /**
     * Rotation around X (horizontal) axis
     */
    angleX: number;
    /**
     * Rotation around Y (depth) axis
     */
    angleY: number;
    /**
     * Rotation around Z (vertical) axis
     */
    angleZ: number;

    /**
     * X (horizontal) axis - X
     */
    dirXx: number;
    /**
     * X (horizontal) axis - Y
     */
    dirXy: number;
    /**
     * X (horizontal) axis	- Z
     */
    dirXz: number;

    /**
     * Y (depth) axis - X
     */
    dirYx: number;
    /**
     * Y (depth) axis - Y
     */
    dirYy: number;
    /**
     * Y (depth) axis - Z
     */
    dirYz: number;


    /**
     * Z (vertical) axis - X
     */
    dirZx: number;
    /**
     * Z (vertical) axis - Y
     */
    dirZy: number;
    /**
     * Z (vertical) axis - Z
     */
    dirZz: number;
}
interface Remote {
    update: () => Remote;
    /**
     * The variable wiiu.remote.held is a bitmask indicating all buttons currently being depressed on the Wii Remote.
     */
    held: HeldButtons;
    /**
     * Force on X (horizontal) axis
     */
    accX: number;

    /**
     * Force on Y (depth) axis
     */
    accY: number;

    /**
     * Force on Z (vertical) axis
     */
    accZ: number;
    /**
     * X position in page coordinates
     */
    contentX: number
    /**
     * Y position in page coordinates
     */
    contentY: number
    /**
     * Distance between Wii Remote and Sensor Bar
     */
    dpdDistance: number;

    /**
     * **UNKNOWN**
     */
    dpdRollX: number;
    /**
     * **UNKNOWN**
    */
    dpdRollY: number;

    dpdValidity: tpValidity;
    /**
     * X position in screen coordinates
     */
    dpdX: number
    /**
     * Y position in screen coordinates
     */
    dpdY: number;
    /**
     * 1 if cursor display is enabled
     */
    isCursorViewable: 1 | 0;
    /**
     * 1 if update method data is valid
     */
    isDataValid: 1 | 0;

    isEnabled: 1 | 0
    /**
     * Rotation around X (horizontal) axis
     */
    mplsAngX: number;
    /**
     * Rotation around Y (depth) axis
     */
    mplsAngY: number;
    /**
     * Rotation around Z (vertical) axis
     */
    mplsAngZ: number;
    /**
        * X (horizontal) axis	- X
    */
    mplsDirXx: number;
    /**
     * X (horizontal) axis	- Y
     */
    mplsDirXy: number;
    /**
     * X (horizontal) axis	- Z
     */
    mplsDirXz: number;
    /**
    * Y (depth) axis - X
    */
    mplsDirYx: number;
    /**
     * Y (depth) axis - Y
     */
    mplsDirYy: number;
    /**
     * Y (depth) axis - Z
     */
    mplsDirYz: number;

    /**
     * Z (vertical) axis - X
     */
    mplsDirZx: number;

    /**
     * Z (vertical) axis - Y
     */
    mplsDirZy: number;

    /**
     * Z (vertical) axis - Z
     */
    mplsDirZz: number;

    /**
     * Movement speed along X (horizontal) axis
     */
    mplsVelX: number;
    /**
     * Movement speed along Y (depth) axis
    */
    mplsVelY: number;
    /**
     * Movement speed along Z (vertical) axis
     */
    mplsVelZ: number;
}
interface BrowserAPI {
    /**
     * The wiiu.gamepad object allows Javascript functions to read the current state of the primary GamePad.
     * {@link https://wiiubrew.org/wiki/Internet_Browser#wiiu.gamepad **WiiUBrew**}
    */
    gamepad: Gamepad;

    /**
     * While Internet Browser exposes a wiiu.remote object, at the present time no way is known how to activate it. Presumedly it would allow Javascript functions to read the current state of the primary Wii Remote and its Motion Plus accessory.
     * {@link https://wiiubrew.org/wiki/Internet_Browser#wiiu.remote **WiiUBrew**}
     */
    remote: Remote;
    /**
     * The wiiu.videoplayer object controls the display of fullscreen HTML5 videos.
     * {@link https://wiiubrew.org/wiki/Internet_Browser#wiiu.videoplayer **WiiUBrew**}
     */
    videoplayer: VideoAPI;

    /**
     * The wiiu.imageview object manages the Image Preview feature.
     * {@link https://wiiubrew.org/wiki/Internet_Browser#wiiu.imageview **WiiUBrew**}
     */
    imageview: ImageAPI;
}
declare global {
    interface Window {
        wiiu: BrowserAPI
    };

    const wiiu: BrowserAPI;
}