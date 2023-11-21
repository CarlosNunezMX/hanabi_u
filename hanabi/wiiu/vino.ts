import { Mii } from "./jsx";
import type { UserHandled } from "./types";
class VinoCommon{
    User: UserHandled;
    Slot: number = vino.act_getCurrentSlotNo();
    Lang: string = vino.info_getLanguage();
    AgeDivision: number = vino.act_getAgeDivision(this.Slot);    
    Avadible: boolean = !!window.vino;
    
    constructor(){
        this.User = this.HandleMii();
    }
    private HandleMii(): UserHandled{
        return {
            Mii: vino.act_getMiiImage(this.Slot),
            MiiTypes: new Array(7).map((_, i) => vino.act_getMiiImageEx(this.Slot, i)),
            Name: vino.act_getName(this.Slot),
            pid: vino.act_getPid(this.Slot),
        }
    }

    GetMiiImage(jsx: boolean){
        if(jsx)
            return Mii(this.User);

        const $img = document.createElement('img');
        $img.src = this.User.Mii;
        $img.alt = this.User.Name + " Mii";

        return $img;
    }
}
export default new VinoCommon();

