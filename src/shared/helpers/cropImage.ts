export const getCroppedImg = (imageSrc: string, crop: any): Promise<Blob | null> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.crossOrigin = "anonymous";
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
  
        if (!ctx) return reject(null);
        ctx.drawImage(
          image,
          crop.x,
          crop.y,
          crop.width,
          crop.height,
          0,
          0,
          crop.width,
          crop.height
        );
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      };
      image.onerror = (err) => reject(err);
    });
  };
  