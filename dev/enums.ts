export enum tpValidity {
    VALID,
    X_INVALID,
    Y_INVALID,
    BOTH_INVALID
}
export enum HoldButton {
    LStickLeft = 1073741824,
    LStickRight = 536870912,
    LStickUp = 268435456,
    LStickDown = 134217728,
    RStickLeft = 67108864,
    RStickRight = 33554432,
    RStickUp = 16777216,
    RStickDown = 8388608,
    LStickClick = 262144,
    RStickClick = 131072,
    TVButton = 65536,
    AButton = 32768,
    BButton = 16384,
    XButton = 8192,
    YButton = 4096,
    DirectionPadLeft = 2048,
    DirectionPadRight = 1024,
    DirectionPadUp = 512,
    DirectionPadDown = 256,
    ZLButton = 128,
    ZRButton = 64,
    LButton = 32,
    RButton = 16,
    StartButton = 8,
    SelectButton = 4,
    HomeButton = 2,
}

export enum HeldButtons {
    PlusButton = 4096,
    DPadUp = 2048,
    DPadDown = 1024,
    DPadRight = 512,
    DPadLeft = 256,
    HomeButton = 128,
    MinusButton = 16,
    AButton = 8,
    BButton = 4,
    TwoButton = 2,
    OneButton = 1,
}

export enum ImageAPI_ErorCodes{
    NotError = -1,
    /**
     * Unsupported image format
     */
    ImageFormatNotSupported = 202,
    /**
     * Image dimensions too large
     */
    ImageTooLarge = 203,
    /**
     * File size too large
     */
    SizeTooLarge = 204,
    /**
     * Too many pixels in progressive-mode JPEG
     */
    TooManyPixels = 205
}