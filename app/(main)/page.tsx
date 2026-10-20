import HomePosts from "@/components/HomePosts";
import PromptOfTheDay from "@/components/PromptOfTheDay";
import { getTodaysPosts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await getTodaysPosts(supabase);

  if (error) throw error;

  return (
    <div className="h-full">
      <PromptOfTheDay />
      {data && <HomePosts posts={data} />}
    </div>
  );
}
