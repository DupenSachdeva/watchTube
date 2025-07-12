import { atom, type AtomEffect } from "recoil";

export interface ChannelData {
  name: string;
  description: string;
  pictureUrl: string | null;
  about: string;
}

const localStorageEffect = (key: string): AtomEffect<ChannelData> => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }

  onSet((newValue, _, isReset) => {
    if (isReset) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

export const channelAtom = atom<ChannelData>({
  key: 'channelAtom',
  default: {
    name: '',
    description: '',
    pictureUrl: null,
    about: '',
  },
  effects: [localStorageEffect('channelAtom')],
});