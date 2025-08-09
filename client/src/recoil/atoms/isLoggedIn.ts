import { atom } from "recoil";

export const isLoggedInatom = atom<boolean>({
   key:"loggedin",
   default:false
})