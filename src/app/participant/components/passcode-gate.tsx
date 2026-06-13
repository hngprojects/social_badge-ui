"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validateBadgeAccess } from "@/app/features/templates/services/templates";
import { Lock } from "lucide-react";

interface PasscodeGateProps {
	slug: string;
	onSuccess: () => void;
}

export default function PasscodeGate({ slug, onSuccess }: PasscodeGateProps) {
	const [accessCode, setAccessCode] = useState("");
	const [isValidating, setIsValidating] = useState(false);

	const handleVerify = async (e: React.FormEvent) => {
		e.preventDefault();
		if (accessCode.length < 4) {
			toast.error("Access code must be at least 4 characters.");
			return;
		}

		setIsValidating(true);
		try {
			await validateBadgeAccess(slug, accessCode);
			toast.success("Access granted!");
			onSuccess();
		} catch (error: unknown) {
			const message = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || "Invalid access code. Please try again.";
			toast.error(message);
		} finally {
			setIsValidating(false);
		}
	};

	return (
		<div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-primary-100 flex flex-col items-center text-center space-y-6">
			<div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
				<Lock size={32} />
			</div>

			<div className="space-y-2">
				<h2 className="text-2xl font-bold text-gray-900">Protected Badge</h2>
				<p className="text-gray-500 text-sm">
					This badge is protected. Please enter the access code provided by the organizer to continue.
				</p>
			</div>

			<form onSubmit={handleVerify} className="w-full space-y-4">
				<div className="space-y-1.5">
					<label htmlFor="accessCode" className="block text-xs font-bold uppercase tracking-wider text-[#595959] text-left">
						Access Code
					</label>
					<Input
						id="accessCode"
						type="password"
						placeholder="Enter access code"
						value={accessCode}
						onChange={(e) => setAccessCode(e.target.value)}
						className="h-12 px-4 rounded-xl border-[`#BDBDBD`] bg-[`#F6F6F6`] text-[`#595959`] text-sm font-medium focus-visible:ring-primary-500/20 focus-visible:border-primary-500"
						disabled={isValidating}
						autoFocus
						maxLength={10}
					/>
				</div>

			<Button
				type="submit"
				variant="cta"
				className="w-full h-12 rounded-full font-semibold"
				disabled={isValidating || accessCode.length < 4}
			>
				{isValidating ? "Verifying..." : "Verify Access"}
			</Button>
			</form>
		</div>
	);
}
