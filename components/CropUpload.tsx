use client";

import { useEffect, useRef, useState } from "react";

type CropUploadProps = {
  name: string;
  aspectRatio: number;
  label?: string;
  accept?: string;
  className?: string;
};

export default function CropUpload({
  name,
  aspectRatio,
  label = "Upload image",
  accept = "image/*",
  className = "",
}: CropUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [zoom, setZoom] = useState(1);
  const [positionX, setPositionX] = useState(50);
  const [positionY, setPositionY] = useState(50);
  const [outputFile, setOutputFile] = useState<File | null>(null);

  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }

    const url = URL.createObjectURL(file);

    setImageSrc(url);
    setFileName(file.name);
    setZoom(1);
    setPositionX(50);
    setPositionY(50);
    setOutputFile(null);
  }

  async function createCroppedFile(): Promise<File | null> {
    if (!imageSrc) return null;

    const image = new Image();

    image.src = imageSrc;

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject();
    });

    /*
      We create a 1600px-wide output.

      The height is calculated from the selected
      banner/tile aspect ratio.
    */

    const outputWidth = 1600;
    const outputHeight = Math.round(outputWidth / aspectRatio);

    const canvas = document.createElement("canvas");

    canvas.width = outputWidth;
    canvas.height = outputHeight;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    /*
      Determine the "cover" scale.

      This makes sure the entire crop area
      is filled without stretching the image.
    */

    const imageRatio = image.width / image.height;

    let baseWidth: number;
    let baseHeight: number;

    if (imageRatio > aspectRatio) {
      baseHeight = outputHeight;
      baseWidth = baseHeight * imageRatio;
    } else {
      baseWidth = outputWidth;
      baseHeight = baseWidth / imageRatio;
    }

    const scaledWidth = baseWidth * zoom;
    const scaledHeight = baseHeight * zoom;

    /*
      positionX and positionY are percentages.

      50 / 50 = centered
      0 / 0 = top-left
      100 / 100 = bottom-right
    */

    const maxOffsetX = Math.max(
      0,
      scaledWidth - outputWidth
    );

    const maxOffsetY = Math.max(
      0,
      scaledHeight - outputHeight
    );

    const x =
      -(maxOffsetX * (positionX / 100));

    const y =
      -(maxOffsetY * (positionY / 100));

    ctx.drawImage(
      image,
      x,
      y,
      scaledWidth,
      scaledHeight
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }

          const extension = "jpg";

          const newFileName =
            fileName.replace(/\.[^/.]+$/, "") +
            "-cropped." +
            extension;

          resolve(
            new File(
              [blob],
              newFileName,
              {
                type: "image/jpeg",
              }
            )
          );
        },
        "image/jpeg",
        0.92
      );
    });
  }

  async function handleCrop() {
    try {
      const cropped = await createCroppedFile();

      if (!cropped) {
        alert("Unable to crop the image.");
        return;
      }

      setOutputFile(cropped);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while cropping the image.");
    }
  }

  function removeImage() {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }

    setImageSrc(null);
    setFileName("");
    setZoom(1);
    setPositionX(50);
    setPositionY(50);
    setOutputFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  /*
    Important:

    The cropped file is placed into a hidden input
    as a File object using DataTransfer.

    This means your existing server action can
    continue receiving it through FormData.
  */

  useEffect(() => {
    if (!outputFile || !inputRef.current) return;

    const dataTransfer = new DataTransfer();

    dataTransfer.items.add(outputFile);

    inputRef.current.files = dataTransfer.files;
  }, [outputFile]);

  const cropPreviewHeight =
    320 / aspectRatio;

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="eyebrow block mb-2">
          {label}
        </label>

        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className="text-sm"
        />
      </div>

      {imageSrc && (
        <div className="space-y-5">

          {/* CROP AREA */}
          <div>
            <p className="text-xs text-sand mb-2">
              Position your image
            </p>

            <div
              ref={previewRef}
              className="relative w-full max-w-xl overflow-hidden bg-black"
              style={{
                aspectRatio: aspectRatio,
              }}
            >
              <img
                src={imageSrc}
                alt="Crop preview"
                className="absolute max-w-none select-none"
                draggable={false}
                style={{
                  width: `${zoom * 100}%`,
                  height: "auto",
                  left: `${positionX}%`,
                  top: `${positionY}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* CROP FRAME */}
              <div className="absolute inset-0 pointer-events-none border-2 border-white/80">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                  <div className="border-r border-white/20" />
                  <div className="border-r border-white/20" />
                  <div />

                  <div className="border-r border-white/20 border-t" />
                  <div className="border-r border-white/20 border-t" />
                  <div className="border-t" />

                  <div className="border-r border-white/20 border-t" />
                  <div className="border-r border-white/20 border-t" />
                  <div className="border-t" />
                </div>
              </div>
            </div>
          </div>

          {/* POSITION CONTROLS */}
          <div className="space-y-4 max-w-xl">

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span>Horizontal position</span>
                <span className="text-sand">
                  {Math.round(positionX)}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={positionX}
                onChange={(e) =>
                  setPositionX(Number(e.target.value))
                }
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span>Vertical position</span>
                <span className="text-sand">
                  {Math.round(positionY)}%
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={positionY}
                onChange={(e) =>
                  setPositionY(Number(e.target.value))
                }
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-2">
                <span>Zoom</span>
                <span className="text-sand">
                  {zoom.toFixed(1)}×
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="3"
                step="0.05"
                value={zoom}
                onChange={(e) =>
                  setZoom(Number(e.target.value))
                }
                className="w-full"
              />
            </div>

          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3">

            <button
              type="button"
              onClick={handleCrop}
              className="bg-wine hover:bg-wineDeep px-6 py-3 text-sm tracking-wide"
            >
              Use this crop
            </button>

            <button
              type="button"
              onClick={removeImage}
              className="border border-hairline px-6 py-3 text-sm tracking-wide hover:border-wineLight"
            >
              Remove
            </button>

          </div>

          {outputFile && (
            <div className="border border-hairline p-4 max-w-xl">
              <p className="text-sm">
                ✓ Image crop ready
              </p>

              <p className="text-xs text-sand mt-1">
                {outputFile.name}
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
