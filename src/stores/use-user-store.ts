import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	is_email_verified: boolean;
	profile_photo_url: string | null;
	created_at: string;
	updated_at: string;
};

type UserStore = {
	user: User | null;
	setUser: (user: User) => void;
	clearUser: () => void;
};

export const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
			clearUser: () => set({ user: null }),
		}),
		{
			name: "user-storage",
		},
	),
);
