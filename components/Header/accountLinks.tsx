import { Logout } from "@/actions/logout-action";
import { createClient } from "@/lib/supabase/serverClient";
import { faCalendarDay, faPlus, faRightFromBracket, faRightToBracket, faUnlock, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div className="flex w-full items-center gap-4">
      {user ? (
        <>
          <div className="bg-lilac py-2 px-4 rounded-4xl text-sm min-w-0 max-w-40 shrink-0 whitespace-nowrap truncate">hi, {username}</div>
          <div className="flex gap-4">
            {role === "admin" && (
              <Link href="/admin" className="button-secondary text-sm">
                <FontAwesomeIcon icon={faUnlock} />
              </Link>
            )}
            <Link href="/past-prompts" className="button-secondary text-sm">
              <FontAwesomeIcon icon={faCalendarDay} />
            </Link>
            <Link href="/create" className="button-secondary text-sm">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
            <div onClick={Logout} className="button-secondary text-sm">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </div>
          </div>
        </>
      ) : (
        <>
          <Link href="/auth/login" className="button-secondary text-sm">
            <FontAwesomeIcon icon={faRightToBracket} />
          </Link>
          <Link href="/auth/signup" className="button-secondary text-sm">
            <FontAwesomeIcon icon={faUserPlus} />
          </Link>
        </>
      )}
    </div>
  );
};

export default AccountLinks;
