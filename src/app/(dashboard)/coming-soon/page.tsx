"use client";

import { useUserStore } from "@/stores/use-user-store";
import { useRouter } from "next/navigation";

export default function Page() {
	const { user, clearUser } = useUserStore();
	const router = useRouter();

	const handleLogout = () => {
		clearUser();
		router.push("/login");
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 text-center bg-linear-to-br from-blue-50 to-indigo-100">
			<p className="text-lg text-gray-700">Welcome, {user?.first_name ?? "User"}!</p>
			<h1 className="text-4xl font-bold text-indigo-800">Coming Soon</h1>
			<p className="text-muted-foreground max-w-md text-sm">
				We&apos;re working hard to bring you something amazing!
			</p>
			<button
				onClick={handleLogout}
				className="rounded-md bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
			>
				Logout
			</button>
		</main>
	);
}
