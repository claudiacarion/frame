import { createClient } from "./browserClient";
import { type QueryData } from "@supabase/supabase-js";

export const getTodaysPosts = async (supabase: ReturnType<typeof createClient>) => {
  const { data: prompt, error: promptError } = await getTodaysPrompt(supabase);

  if (promptError) throw promptError;

  if (!prompt) {
    return supabase
      .from("posts")
      .select('*, prompts("title", "description"), user_id("id", "username")')
      .eq("id", "00000000-0000-0000-0000-000000000000");
  }

  return supabase
    .from("posts")
    .select('*, prompts("title", "description"), user_id("id", "username")')
    .eq("prompt_id", prompt.id)
    .order("created_at", { ascending: false });
};

export const getAllPosts = async (supabase: ReturnType<typeof createClient>) => {
  return await supabase.from("posts").select('*, prompts("title", "description"), user_id("id", "username")');
};

export const getSinglePost = async (slug: string) => {
  const supabase = createClient();
  return await supabase
    .from("posts")
    .select('*, prompts("title", "description"), user_id("id", "username")')
    .eq("slug", slug)
    .single();
};

export const searchPosts = async (searchTerm: string) => {
  const supabase = createClient();
  return await supabase.from("posts").select("title, slug").textSearch("title", searchTerm);
};

export const getPostComments = async (postId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .select('id, content, parent_comment_id, user_id("id", "username")')
    .eq("post_id", postId)
    .order("created_at", { ascending: false });
  return data;
};

export const getTodaysPrompt = async (supabase: ReturnType<typeof createClient>) => {
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Europe/Stockholm",
  });

  return await supabase.from("prompts").select("*").eq("date", today).maybeSingle();
};

export const getAllPrompts = async (supabase: ReturnType<typeof createClient>) => {
  return await supabase.from("prompts").select("*").order("date", { ascending: false });
};

export type HomePostsType = QueryData<ReturnType<typeof getAllPosts>>;

export type SinglePostType = QueryData<ReturnType<typeof getSinglePost>>;

export type SearchResultType = QueryData<ReturnType<typeof searchPosts>>;

export type CommentsType = QueryData<ReturnType<typeof getPostComments>>;

export type PromptsType = QueryData<ReturnType<typeof getTodaysPrompt>>;

export type AllPromptsType = QueryData<ReturnType<typeof getAllPrompts>>;
