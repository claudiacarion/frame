"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { Admin } from "@/lib/supabase/admin";

export const DeletePrompt = async (promptId: string) => {
  await Admin();

  const supabase = await createClient();

  const { error } = await supabase.from("prompts").delete().eq("id", promptId);

  if (error) {
    if (error.code === "23503") {
      throw new Error("some posts are using the prompt so it cannot be deleted");
    }
    throw new Error("something went wrong. try again later");
  }

  return;
};
