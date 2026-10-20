import Link from "next/link";
import LoginForm from "./form";

const LoginPage = () => {
  return (
    <>
      <LoginForm />
      <Link href="/auth/signup">need an account? sign up here</Link>
    </>
  );
};

export default LoginPage;
