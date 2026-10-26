import Link from "next/link";
import AccountLinks from "./accountLinks";
import Search from "./search";
import Logo from "../Logo";
import { createClient } from '@/lib/supabase/serverClient';

const Header = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  return (
    <header className="bg-teal sticky top-0 z-50">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row justify-between items-center w-2/3 mx-auto mb-4">
          <Link
            href="/"
            className="flex items-center active:-rotate-2 [@media(hover:hover)]:hover:-rotate-2 transition-transform">
            <Logo />
            <h2 className="text-[40px]">frame</h2>
          </Link>
          <div className="justify-self-end mt-4 lg:mt-0">
            <AccountLinks />
          </div>
        </div>
        {user && <Search />}
      </div>
      <div className="flex w-full">
        <div className="bg-apricot h-1 w-full" />
        <div className="bg-lilac h-1 w-full" />
        <div className="bg-black h-1 w-full" />
      </div>
    </header>
  );
};

export default Header;
