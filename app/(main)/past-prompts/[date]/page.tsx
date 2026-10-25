import { createClient } from "@/lib/supabase/serverClient";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const PromptPage = async ({ params }: { params: { date: string } }) => {
  const { date } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase.from("prompts").select("*").eq("date", date).single();

  if (error || !data) notFound();

  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("id, title, image, slug, user_id(username)")
    .eq("prompt_id", data.id)
    .order("created_at", { ascending: true });

  if (postsError) throw postsError;

  return (
    <div className="w-full px-6 mx-auto my-8">
      <section className="mb-6 p-4 text-center">
        <div className="bg-apricot w-fit mx-auto px-8 py-3 my-2 rounded-4xl">
        <p className="text-xl">{data.date}</p>
          <h2 className="text-3xl">{data.title}</h2>
          <p className="text-md">{data.description}</p>
        </div>
      </section>
      <h2 className="text-2xl font-bold mb-6">posts ({posts?.length ?? 0})</h2>
      {posts && posts.length > 0 ? (
        <div className="mx-auto md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {posts.map(post => (
            <Link
              key={post.id}
              href={`/${post.slug}`}
              className="block p-3 m-4 rounded-xl w-fit mx-auto text-center hover-apricot">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1000}
                  height={1000}
                  className="aspect-square md:w-65 md:h-65 object-cover rounded-xl"
                />
              )}
              <h3 className="font-bold text-lg mt-3 md:w-65 truncate">{post.title}</h3>
              <p>by {post.user_id?.username}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center">No photos have been posted for this prompt</p>
      )}
    </div>
  );
};

export default PromptPage;
