import { SignupForm } from "../components/signup-form";

const Page = () => {
  return (
    <>
      <div className="page-info sm:leading-20">
        <h1 className="page-title font-semibold text-[40px] sm:text-[52px]">
          Create Account
        </h1>
        <p className="font-medium text-base sm:text-[18px] text-[#978B8A]">
          Sign up and create an account with Social Badge
        </p>
      </div>

      <SignupForm />
    </>
  );
};

export default Page;