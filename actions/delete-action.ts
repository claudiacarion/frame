"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";

export const DeletePost = async (postId: string) => {
  const supabase = await createClient();

  await supabase.from("posts").delete().eq("id", postId).throwOnError();

  redirect("/");
};
