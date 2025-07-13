// recoil/videoAtom.ts
import { atom } from "recoil";

export interface Video{

  id: number;
  title: string;
  description: string;
  videoUrl:string
  thumbnailUrl: string;

  uploadedAt:Date,
  
  channel:string,
  channelUrl:string
  userId:number

}

export const VideoListAtom = atom<Video[]>({
  key: "videoList",
  default: [],
});
