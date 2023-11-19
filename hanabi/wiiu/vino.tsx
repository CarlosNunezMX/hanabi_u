export type UserHandled = {
    Name: string;
    Mii: string;
    MiiTypes: string[];
    pid: number;
}

class VinoCommon{
    User: UserHandled;
    Slot: number = vino.act_getCurrentSlotNo();
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
            return (<img src={this.User.Mii} alt={this.User.Name + " Mii"}/>)

        const $img = document.createElement('img');
        $img.src = this.User.Mii;
        $img.alt = this.User.Name + " Mii";

        return $img;
    }
}
export default new VinoCommon();

