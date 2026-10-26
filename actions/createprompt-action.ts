"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { createPromptSchema } from "./schemas";
import { Admin } from "@/lib/supabase/admin";
import z from "zod";

export const CreatePrompt = async (promptData: z.infer<typeof createPromptSchema>) => {
  const parsedData = createPromptSchema.parse(promptData);

  await Admin();

  const supabase = await createClient();

  const { data: existingPrompt, error: checkError } = await supabase
    .from("prompts")
    .select("id")
    .eq("date", parsedData.date)
    .maybeSingle();

  if (checkError) throw checkError;

  if (existingPrompt) {
    return { error: "a prompt already exists for this date" };
  }

  const { error } = await supabase.from("prompts").insert(parsedData);
  if (error) throw error;

  return { success: true };
};
