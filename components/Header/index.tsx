import Link from "next/link";
import AccountLinks from "./accountLinks";
import Search from "./search";
import Logo from "../Logo";

const Header = () => {
  return (
    <header>
      <div  className="bg-teal p-6">
      <div className='flex justify-between items-center w-2/3 mx-auto mb-2'>
        <Link href="/" className="flex items-center">
          <Logo />
          <h2 className="text-[40px]">frame</h2>
        </Link>
        <div className="justify-self-end">
          <AccountLinks />
        </div>
      </div>
      <Search />
      </div>
      <div className='flex w-full'>
        <div className='bg-apricot h-1 w-full'/>
        <div className='bg-lilac h-1 w-full'/>
        <div className='bg-black h-1 w-full'/>
      </div>
    </header>
  );
};

export default Header;
