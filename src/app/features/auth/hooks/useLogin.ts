import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../services/auth";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ApiError } from "@/app/features/auth/types";
import { useUserStore } from "@/stores/use-user-store";
import { resendVerifyEmail } from "../services/auth";
export const useLogin = () => {
	const router = useRouter();
	const { setUser } = useUserStore();

	const {
		mutate: login,
		isPending: isLoading,
		isError,
	} = useMutation({
		mutationFn: loginApi,

		onSuccess: (data) => {
			setUser(data.data.user);
			toast.success("Login successful!");
			router.push("/dashboard");
		},
		onError: (error, data) => {
			const axiosError = error as AxiosError<ApiError>;
			const status = axiosError.response?.status;
			const message =
				axiosError.response?.data?.message || "Login failed. Please try again.";

			if (status === 403 && message === "Please verify your email") {
				const email = data.email;
				resendVerifyEmail({ email });
				toast.error(
					"Your email is not verified. We've sent you a new verification link — please check your inbox.",
				);
				return;
			}


			if (status === 401 && message.toLowerCase() === "invalid credentials") {
				toast.error(
					"Invalid Email or Password. Please try again.",
				);
				return;
			}


			toast.error(message);
		},
	});

	return { login, isLoading, isError };
};
