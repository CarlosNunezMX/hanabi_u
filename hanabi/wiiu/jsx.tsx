import type { UserHandled } from "./types";

export function Mii(User: UserHandled){
    return <img src={User.Mii} alt={User.Name + " Mii"}/>
}