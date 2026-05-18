export interface PhotoUploadProps {
  photoPreview: string;
  onUpload: (file: File, preview: string) => void;
}
