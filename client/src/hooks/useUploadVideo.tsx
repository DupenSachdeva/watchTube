import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/config";


export function  useVideoUpload() {

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);


  const uploadVideoinHook = async (videoPayload: {
    videoFile: File | null ;
    thumbnail: File | null | undefined;
    title: string;
    description: string;
    visibility: string;
  }) => {

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    try {

      const formData = new FormData();

      if (videoPayload.videoFile) {
        formData.append("video", videoPayload.videoFile, videoPayload.videoFile.name);
      }
      if (videoPayload.thumbnail) {
        formData.append("thumbnail", videoPayload.thumbnail, videoPayload.thumbnail.name);
      }

      formData.append("title", videoPayload.title);
      formData.append("description", videoPayload.description);
      formData.append("visibility", videoPayload.visibility);

      const res = await axios.post(
        `${BACKEND_URL  }/video/upload`,
        formData,
        {
          headers: {
            Authorization: ` ${localStorage.getItem("token")}`,
          },
          timeout: 180000,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percent);
          },
        }
      );


    } catch (err: any) {
      setError(err.message || "Upload failed");
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadVideoinHook, isUploading, uploadProgress, error };
}
