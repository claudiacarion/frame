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
    <div className="w-full">
      {data.length ? (
        data.map(post => (
          <Link
            href={`/${post.slug}`}
            key={post.id}
            className="block bg-lilac p-4 m-4 rounded-xl w-fit mx-auto text-center">
            {post.image && (
              <div className="relative " key={post.id}>
                <Image
                  src={post.image}
                  alt={post.title}
                  height={50}
                  width={50}
                  className="object-cover h-50 w-50 rounded-xl"
                />
              </div>
            )}
            <div className="p-2">
              <h4 className="text-center">{post.title}</h4>
              <p>{post.user_id.username}</p>
            </div>
          </Link>
        ))
      ) : (
        <h2 className="w-full text-center">be the first to post today.</h2>
      )}
    </div>
  );
};

export default HomePosts;
