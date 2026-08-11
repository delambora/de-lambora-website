"use client";

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ImageCropperProps = {
  image: string;
  aspect: number;
  onCancel: () => void;
  onComplete: (file: File) => void;
};

export default function ImageCropper({
  image,
  aspect,
  onCancel,
  onComplete,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    useState<CropArea | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropComplete = useCallback(
    (_croppedArea: CropArea, croppedAreaPixels: CropArea) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  async function createCroppedImage() {
    if (!croppedAreaPixels) return;

    setProcessing(true);

    try {
      const croppedFile = await getCroppedImg(
        image,
        croppedAreaPixels
      );

      onComplete(croppedFile);
    } catch (error) {
      console.error("Crop failed:", error);
      alert("Unable to crop this image. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-bgElev border border-hairline">

        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-hairline">
          <div>
            <h2 className="font-serif text-xl font-light text-white">
              Position your image
            </h2>

            <p className="text-xs text-white/50 mt-1">
              Drag the image and zoom until the composition looks right.
            </p>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="text-white/60 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>

        {/* CROP AREA */}
        <div className="relative w-full h-[55vh] min-h-[320px] bg-black">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            objectFit="contain"
            showGrid={true}
          />
        </div>

        {/* CONTROLS */}
        <div className="px-5 py-5 border-t border-hairline">

          <div className="flex items-center gap-4">
            <span className="text-xs text-white/60">
              Zoom
            </span>

            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) =>
                setZoom(Number(e.target.value))
              }
              className="flex-1"
            />

            <span className="text-xs text-white/50 w-10 text-right">
              {zoom.toFixed(1)}×
            </span>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">

            <button
              type="button"
              onClick={onCancel}
              disabled={processing}
              className="border border-hairline px-6 py-3 text-xs tracking-[0.15em] uppercase text-white/80 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={createCroppedImage}
              disabled={processing}
              className="bg-wine hover:bg-wineDeep px-7 py-3 text-xs tracking-[0.15em] uppercase text-white disabled:opacity-50"
            >
              {processing
                ? "Processing..."
                : "Apply Crop"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}


/* -------------------------------------------------------
   CREATE CROPPED IMAGE
------------------------------------------------------- */

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: CropArea
): Promise<File> {
  const image = await loadImage(imageSrc);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not create canvas context.");
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(
      (result) => resolve(result),
      "image/jpeg",
      0.92
    )
  );

  if (!blob) {
    throw new Error("Could not create cropped image.");
  }

  return new File(
    [blob],
    `cropped-${Date.now()}.jpg`,
    {
      type: "image/jpeg",
    }
  );
}


/* -------------------------------------------------------
   LOAD IMAGE
------------------------------------------------------- */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));

    image.src = src;
  });
}
