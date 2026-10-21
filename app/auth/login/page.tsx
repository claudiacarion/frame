import Link from "next/link";
import LoginForm from "./form";

const LoginPage = () => {
  return (
    <div className="p-8">
      <LoginForm />
      <p className="text-center p-6">
        <Link href="/auth/signup" className=" hover:text-lilac ">
          need an account? sign up here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
