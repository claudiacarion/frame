import Link from "next/link";
import SignUpForm from './form';

const SignUpPage = () => {
  return (
    <>
      Sign up
      <Link href="/auth/login">Log in here</Link>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
