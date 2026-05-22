import { LoginForm } from "../components/login-form";

const Page = () => {
	return (
		<div className="h-full flex flex-col justify-center gap-7">
			<div className="page-info sm:leading-20">
				<h1 className="page-title font-semibold text-[40px] sm:text-[52px]">
					Log in
				</h1>
				<p className="font-medium text-base sm:text-[18px] text-[#978B8A]">
					Welcome back to your account
				</p>
			</div>

			<LoginForm />
		</div>
	);
};

export default Page;
