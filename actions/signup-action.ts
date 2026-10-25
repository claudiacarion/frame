"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import z from "zod";
import { signUpSchema } from "./schemas";

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
  const supabase = await createClient();

  const { data: existingUser, error: checkError } = await supabase
    .from("users")
    .select("id")
    .eq("username", userdata.username)
    .maybeSingle();

  if (checkError) {
    throw checkError;
  }

  if (existingUser) {
    return {
      error: "this username is already taken. please choose another one.",
    };
  }

  const { data: existingEmail, error: emailCheckError } = await supabase
    .from("users")
    .select("id")
    .eq("email", userdata.email)
    .maybeSingle();

  if (emailCheckError) {
    throw emailCheckError;
  }

  if (existingEmail) {
    return { error: "this email address is already in use." };
  }

  const { error } = await supabase.auth.signUp({
    email: userdata.email,
    password: userdata.password,
    options: {
      data: {
        username: userdata.username,
      },
    },
  });

  if (error) {
    throw error;
  }

  redirect("/");
};
