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
  channelId:number
  channelUrl:string
  userId:number
  subscriptions:number

}

export const VideoListAtom = atom<Video[]>({
  key: "videoList",
  default: [],
});
