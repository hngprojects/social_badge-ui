export type ProfileAvatarUploadProps = {
  previewUrl: string;
  onUploadClick: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
