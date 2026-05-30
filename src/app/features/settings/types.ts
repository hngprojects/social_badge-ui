import { User } from "@/stores/use-user-store";

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
