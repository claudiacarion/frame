"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import { loginSchema } from "./schemas";
import z from "zod";

export const Login = async (userdata: z.infer<typeof loginSchema>) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(userdata);
  if (error) {
    if (error.code === "invalid_credentials" || error.code === "email_not_confirmed") {
      return { error: "invalid email or password" };
    }
    throw error;
  }

  redirect("/");
};
