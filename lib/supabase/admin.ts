import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

export const Admin = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase.from("users").select("role").eq("id", user.id).single();

  if (error || profile?.role !== "admin") {
    redirect("/");
  }

  return user;
};
