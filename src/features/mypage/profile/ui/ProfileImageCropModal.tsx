import React, { useEffect } from "react";
import Cropper from "react-easy-crop";
import { Button, ModalLayout } from "@/shared/ui";
import { useAuthStore, useModalStore } from "@/shared/stores";
import { useCropProfileImage } from "../hooks/useProfileImageCrop";
import { updateUserProfileImage } from "../api/updateUserProfileImageApi";

interface Props {
  open: boolean;
  onClose: () => void;
  imageFile: File;
}

export const ProfileImageCropModal: React.FC<Props> = ({ open, onClose, imageFile }) => {
  const { setAuth, token, refreshToken, deviceId } = useAuthStore();
  const { openModal } = useModalStore();

  const {
    imageSrc,
    setCrop,
    setZoom,
    crop,
    zoom,
    onCropComplete,
    showCroppedImage,
    initWithFile,
  } = useCropProfileImage();
  
  useEffect(() => {
    const revoke = initWithFile(imageFile);
  
    return () => {
      revoke();
    };
  }, [imageFile]);

  const handleUpload = async () => {
    const croppedBlob = await showCroppedImage();
    if (!croppedBlob) return;

    const croppedFile = new File([croppedBlob], "croppedImage.jpeg", {
      type: "image/jpeg",
    });

    try {
      const updatedUser = await updateUserProfileImage(croppedFile);

      setAuth(token, refreshToken, updatedUser, deviceId || "");

      openModal("alertModal", {
        type: "success",
        message: "프로필 이미지가 변경되었습니다.",
      });
      onClose();
    } catch (err: any) {
      openModal("alertModal", {
        type: "error",
        message: "이미지 업로드 실패하였습니다.",
      });
      console.error("이미지 업로드 실패:", err);
    }
  };

  return (
    <ModalLayout open={open} onClose={onClose} showCloseButton={true}>
      <div className="w-[300px] h-[400px] relative bg-black">
      {imageSrc && (
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      )}
      </div>

      <div className="mt-4 flex justify-between">
        <Button text="취소" onClick={onClose} />
        <Button text="등록" onClick={handleUpload} />
      </div>
    </ModalLayout>
  );
};
