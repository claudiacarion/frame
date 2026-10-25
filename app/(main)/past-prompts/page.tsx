import { getWeeksPrompts } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import Link from "next/link";

const PromptsPage = async () => {
  const supabase = await createClient();
  const { data: prompts, error } = await getWeeksPrompts(supabase);

  if (error) throw error;

  return (
    <div className="px-6 my-8">
      <h1 className="text-3xl font-bold text-center mb-8">the past week</h1>
      <div className="mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {prompts?.map(prompt => (
          <Link
            key={prompt.id}
            href={`/past-prompts/${prompt.date}`}
            className="block rounded-4xl p-6 text-center my-2 hover-lilac">
            <p>{prompt.date}</p>
            <h2 className="text-xl font-bold">{prompt.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PromptsPage;
