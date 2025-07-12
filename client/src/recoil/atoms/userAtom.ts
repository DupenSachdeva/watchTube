import { atom } from "recoil";

export const usernameAtom = atom<string | null>({
  key: 'usernameAtom',
  default: null,
});

export const usernameEmail = atom<string | null>({
    key:"useremailAtom",
    default:null,
})

export const userinfo = atom<string | null>({
    key:"userinfpAtom",
    default:null,
})

