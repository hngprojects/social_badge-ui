import { SignupForm } from "../components/signup-form";

const Page = () => {
	return (
		<div className="flex h-[600px] flex-col md:h-[700px]">
			<div className="page-info sm:leading-20">
				<h1 className="page-title font-semibold text-[35px] sm:text-[52px] md:text-[40px]">
					Create Account
				</h1>
				<p className="mb-2 text-base font-medium text-[16px] text-[#595959] md:text-[18px]">
					Sign up and create an account with Flare Tag
				</p>
			</div>

			<div className="overflow-y-auto">
				<SignupForm />
			</div>
		</div>
	);
};

export default Page;
