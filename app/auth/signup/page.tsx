import Link from "next/link";
import SignUpForm from "./form";

const SignUpPage = () => {
  return (
    <div className="p-8">
      <SignUpForm />
      <p className="text-center p-6">
        <Link href="/auth/login" className=" hover:text-lilac ">
          have an account? log in here
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
