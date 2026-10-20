import Link from "next/link";
import AccountLinks from "./accountLinks";
import Search from "./search";
import Logo from "../Logo";

const Header = () => {
  return (
    <header className="grid grid-cols-3 justify-end items-center bg-teal py-6 px-60 2xl:px-90">
      <Link href="/" className="flex items-center">
        <Logo />
        <h2 className="text-[40px]">frame</h2>
      </Link>
      <Search />
      <div className="justify-self-end">
        <AccountLinks />
      </div>
    </header>
  );
};

export default Header;
