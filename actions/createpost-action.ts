"use server";

import { createClient } from "@/lib/supabase/serverClient";
import { createPostSchema } from "./schemas";
import { slugify } from "@/lib/supabase/slugify";
import z from "zod";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/supabase/upload-image";
import { getTodaysPrompt } from "@/lib/supabase/queries";

export const CreatePost = async (postdata: z.infer<typeof createPostSchema>) => {
  const parsedData = createPostSchema.parse(postdata);
  const slug = slugify(parsedData.title);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized Access");

  const { data: prompt, error: promptError } = await getTodaysPrompt(supabase);

  if (promptError) throw promptError;

  if (!prompt) {
    throw new Error("No prompt found for today.");
  }

  const imageFile = postdata.image.get("image");
  if (!(imageFile instanceof File)) throw new Error("Image required");

  const imageUrl = await uploadImage(imageFile);

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...parsedData, slug: slug, image: imageUrl, user_id: user.id, prompt_id: prompt.id });

  if (error) {
    if (error.code === "23505") {
      throw new Error("this title is already in use. please choose a different one.");
    }
    throw new Error("something went wrong. try again later");
  }

  redirect(`/${prompt.date}/${slug}`);
};
