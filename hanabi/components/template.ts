import { DynamicStyleSheet } from "hanabi/styles/dynamic";

export interface Component<TState>{
    RouteName: string;
    State: TState | any;
    render: () => HTMLElement | JSX.Element;
    beforeMount: () => Promise<any> | void;
    Mounted: () => void;
    Styles?: DynamicStyleSheet;
    umount: () => Promise<TState> | void;
}