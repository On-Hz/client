import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { uploadUserProfileImage } from "@/features/mypage/profile/api/updateUserProfileImageApi";
import { Button, ModalLayout } from "@/shared/ui";
import { useAuthStore, useModalStore } from "@/shared/stores";
import getCroppedImg from "../lib/cropImageUtils";

interface Props {
  open: boolean;
  onClose: () => void;
  imageFile: File;
}

export const ProfileImageCropModal: React.FC<Props> = ({ open, onClose, imageFile }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const { openModal } = useModalStore();
  const { setAuth, token, user, deviceId } = useAuthStore();

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleUpload = async () => {
    if (!croppedAreaPixels) return;

    const croppedBlob = await getCroppedImg(URL.createObjectURL(imageFile), croppedAreaPixels);
    if (!croppedBlob) return;

    const croppedFile = new File([croppedBlob], "croppedImage.jpeg", { type: "image/jpeg" });

    try {
      const updatedUser = await uploadUserProfileImage(croppedFile);
   
      if (user) {
        setAuth(token, updatedUser, deviceId || "");
      }

      openModal("alertModal", {
        type: "success",
        message: "프로필 이미지가 변경되었습니다."
      });
      onClose();
    } catch (err: any) {
      console.error("이미지 업로드 실패:", err);
    }
  };

  return (
    <ModalLayout open={open} onClose={onClose} showCloseButton={true}>
      <div className="w-[300px] h-[400px] relative bg-black">
        <Cropper
          image={URL.createObjectURL(imageFile)}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div className="mt-4 flex justify-between">
        <Button text="취소" onClick={onClose} />
        <Button text="완료" onClick={handleUpload} />
      </div>
    </ModalLayout>
  );
};
