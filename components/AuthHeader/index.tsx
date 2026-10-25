import Link from "next/link";
import Logo from "../Logo";

const AuthHeader = () => {
  return (
    <header className="bg-teal ">
      <div className="flex justify-center items-center mx-auto p-6">
        <Link
          href="/"
          className="flex items-center active:-rotate-2 [@media(hover:hover)]:hover:-rotate-2 transition-transform">
          <Logo />
          <h2 className="text-[40px]">frame</h2>
        </Link>
      </div>
      <div className="flex w-full">
        <div className="bg-apricot h-1 w-full" />
        <div className="bg-lilac h-1 w-full" />
        <div className="bg-black h-1 w-full" />
      </div>
    </header>
  );
};

export default AuthHeader;
