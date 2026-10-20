"use server";

import z from "zod";
import { editPostSchema } from "./schemas";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/supabase/upload-image";

export const EditPost = async ({ postdata, postId }: { postdata: z.infer<typeof editPostSchema>; postId: string }) => {
  const parsedData = editPostSchema.parse(postdata);

  const supabase = await createClient();

  const { data, error } = await supabase.from("posts").select("*").eq("id", postId).single();

  if (error) throw error;

  if (!data) throw new Error("Post not found");

  const imageFile = parsedData.image?.get("image");

  let imageUrl = data.image;

  if (imageFile instanceof File) {
    imageUrl = await uploadImage(imageFile);
  }

  const { data: updatedPost, error: updateError } = await supabase
    .from("posts")
    .update({
      title: parsedData.title,
      image: imageUrl,
    })
    .eq("id", postId)
    .select("slug")
    .single();

  if (updateError) throw updateError;

  redirect(`/${updatedPost.slug}`);
};
