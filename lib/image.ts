import pako from "pako";

export const resizeImage = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<File> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Failed to create Blob"));
          return;
        }

        const resizedFile = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });

        resolve(resizedFile);
      }, file.type);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(file);
  });
};

export const compressData = (data: string) => {
  const uint8Data = new TextEncoder().encode(data); // Convert string to Uint8Array
  const compressed = pako.gzip(uint8Data);
  const compressedArray = Array.from(compressed); // Convert Uint8Array to array of numbers
  return btoa(String.fromCharCode.apply(null, compressedArray));
};
