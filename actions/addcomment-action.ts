'use server'

import { createClient } from "@/lib/supabase/serverClient";
import { commentSchema } from "./schemas";
import z from "zod";
import { revalidatePath } from 'next/cache';

export const AddComment = async ({
  commentData,
  postId,
  parentCommentId
}: {
  commentData: z.infer<typeof commentSchema>;
  postId: string;
  parentCommentId: string | null;
}) => {
  const supabase = await createClient();
  const parsedData = commentSchema.parse(commentData);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("log in to comment");

  await supabase
    .from("comments")
    .insert({ post_id: postId, user_id: user.id, parent_comment_id: parentCommentId ?? null, ...parsedData })
    .throwOnError();

    revalidatePath("/")
};
