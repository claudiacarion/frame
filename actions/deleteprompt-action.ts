"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { Admin } from "@/lib/supabase/admin";

export const DeletePrompt = async (promptId: string) => {
  await Admin();

  const supabase = await createClient();

  const { error } = await supabase.from("prompts").delete().eq("id", promptId);

  if (error) throw error;

  return;
};
