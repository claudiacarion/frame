import { Logout } from "@/actions/logout-action";
import { createClient } from "@/lib/supabase/serverClient";
import Link from "next/link";

const AccountLinks = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username = null;
  let role = null;

  if (user) {
    const { data } = await supabase.from("users").select("username, role").eq("id", user.id).single();

    username = data?.username;
    role = data?.role;
  }

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <div>hello, {username}!</div>

          <div className="flex gap-4">
            {role === "admin" && (
              <Link href="/admin" className="button-secondary">
                admin
              </Link>
            )}
            <Link href="/create" className="button-secondary">
              create post
            </Link>
            <div onClick={Logout} className="button-secondary">
              log out
            </div>
          </div>
        </>
      ) : (
        <>
          <Link href="/auth/login" className="button-secondary">
            log in
          </Link>
          <Link href="/auth/signup" className="button-secondary">
            sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default AccountLinks;
