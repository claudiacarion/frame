"use client";
import { HomePostsType, getTodaysPosts } from "@/lib/supabase/queries";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";

const HomePosts = ({ posts }: { posts: HomePostsType }) => {
  const supabase = createClient();

  const { data } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const { data, error } = await getTodaysPosts(supabase);
      if (error) throw error;
      return data;
    },
    initialData: posts,
    staleTime: 1000,
  });

  return (
    <>
      {data.map(post => (
        <Link href={`/${post.slug}`} key={post.id} className="block border p-4 w-fit">
          <h4>{post.title}</h4>
          {post.image && (
            <div className="relative w-50 h-50" key={post.id}>
              <Image src={post.image} alt={post.title} fill sizes="200px" className="object-cover" />
            </div>
          )}
          <p>{post.user_id.username}</p>
        </Link>
      ))}
    </>
  );
};

export default HomePosts;
