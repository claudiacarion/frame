"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { revalidatePath } from "next/cache";

export const DeleteCommentAction = async (commentId: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.from("comments").delete().eq("id", commentId).single();
  if (error) console.log(error);

  revalidatePath("/");
};
