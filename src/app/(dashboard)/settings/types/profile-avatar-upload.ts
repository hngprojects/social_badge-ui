export type ProfileAvatarUploadProps = {
  previewUrl: string;
  onUploadClick: () => void;
  onRemove: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
