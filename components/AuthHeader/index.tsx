import Link from "next/link";
import Logo from "../Logo";

const AuthHeader = () => {
  return (
    <header className="bg-teal p-6">
      <div className="flex justify-between items-center w-2/3 mx-auto">
        <Link href="/" className="flex items-center">
          <Logo />
          <h2 className="text-[40px]">frame</h2>
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;
