import { useState, useCallback } from "react";
import { Area } from "react-easy-crop";
import getCroppedImg from "../lib/profileImageCropUtils";

export const useCropProfileImage = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const initWithFile = (file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async (): Promise<Blob | null> => {
    if (!imageSrc || !croppedAreaPixels) return null;
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      return croppedBlob;
    } catch (e) {
      console.error("이미지 크롭 실패:", e);
      return null;
    }
  }, [imageSrc, croppedAreaPixels]);

  return {
    imageSrc,
    setImageSrc,
    crop,
    setCrop,
    zoom,
    setZoom,
    onCropComplete,
    showCroppedImage,
    initWithFile,
  };
};
