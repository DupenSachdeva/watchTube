import { atom, type AtomEffect } from "recoil";

export interface ChannelData {
  name: string;
  description: string;
  pictureUrl: string | null;
  about: string;
}



export const channelAtom = atom<ChannelData>({
  key: 'channelAtom',
  default: {
    name: '',
    description: '',
    pictureUrl: null,
    about: '',
  },
});