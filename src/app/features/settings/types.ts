import { ProfileFormValues } from "@/schemas/profile";
import { User } from "@/stores/use-user-store";
import { FieldErrors, UseFormRegister } from "react-hook-form";

// profile tab
export type DeleteProfileResponse = {
  status: "success";
  message: string;
  data: {
    id: string;
  };
};

export type UpdateProfileResponse = {
  status: "success";
  message: string;
  data: User;
};

export type ProfileFieldErrors = Partial<
  Record<"firstName" | "lastName" | "role", string>
>;

export type ProfileAvatarUploadProps = {
  previewUrl: string;
  onUploadClick: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ProfileInputProps = {
	register: UseFormRegister<ProfileFormValues>;
    errors: FieldErrors<ProfileFormValues>;
	// values: ProfileFormValues;
	firstNameAtMax?: boolean;
	lastNameAtMax?: boolean;
	roleAtMax?: boolean;
	email?: string;
};

// NOTIFICATIONS TAB
export type NotificationPreferences = {
  email_template_published: boolean;
  email_new_signin: boolean;
  notify_badge_creation: boolean;
  notify_daily_digest: boolean;
  notify_weekly_report: boolean;
  updated_at: string;
};


export type UpdateNotificationPreferencesPayload = Partial<
  Pick<
    NotificationPreferences,
    | "notify_badge_creation"
    | "notify_daily_digest"
    | "notify_weekly_report"
  >
>;

export type NotificationPreferenceCardKey =
  | "badgeClaims"
  | "dailyDigest"
  | "weeklyReport";

  
  export type ImplementedNotificationPreference =
    keyof UpdateNotificationPreferencesPayload;
  
  
  export type NotificationPreferencesResponse = {
    status: "success";
    message: string;
    data: NotificationPreferences;
  };
  
  export type UpdateNotificationPreferencesResponse =  NotificationPreferencesResponse;
  

  