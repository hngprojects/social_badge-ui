'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { PhotoUploadProps } from '../../types/home';
import { ImageCropper } from '@/components/image-cropper';

export function PhotoUpload({ photoPreview, onUpload }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [isCropperOpen, setIsCropperOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setTempImage(reader.result as string);
      setIsCropperOpen(true);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="flex items-center gap-3  hover:bg-neutral-150  px-4 py-3 cursor-pointer transition-colors group h-[74px] bg-stone-100 rounded-[10px] outline  -outline-offset-1 outline-stone-200 "
    >
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full overflow-hidden bg-neutral-800 flex items-center justify-center shrink-0">
        {photoPreview ? (
          <Image
            src={photoPreview}
            alt="avatar"
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-xs font-bold">T</span>
        )}
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-800 leading-tight">Upload your photo</p>
        <p className="text-xs text-neutral-400 truncate">JPG / PNG · or use initials</p>
      </div>

      {/* Add / change dot */}
      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-600 transition-colors">
        <span
          className="text-white text-base font-light leading-none"
          style={{ marginTop: '-1px' }}
        >
          {photoPreview ? '✓' : '+'}
        </span>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {tempImage && (
        <ImageCropper
          open={isCropperOpen}
          image={tempImage}
          onCropComplete={async (croppedImage) => {
            setIsCropperOpen(false);
            setTempImage(null);
            
            try {
              const res = await fetch(croppedImage);
              const blob = await res.blob();
              const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' });
              onUpload(file, croppedImage);
            } catch (err) {
              console.error("Failed to convert cropped image to file:", err);
              // Fallback if needed, though fetch(base64) is reliable
              onUpload(new File([], 'cropped-image.jpg'), croppedImage);
            }
          }}
          onCancel={() => {
            setIsCropperOpen(false);
            setTempImage(null);
          }}
          aspectRatio={1}
        />
      )}
    </div>
  );
}