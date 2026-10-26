import { getSinglePost, getUserRole } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import Comments from "./Comments";
import AddCommentForm from "./AddCommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { notFound } from 'next/navigation';

const PostPage = async ({ params }: { params: { date: string; slug: string } }) => {
  console.log("POST PAGE COMPONENT REACHED");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { date, slug } = await params;
  const { data, error } = await getSinglePost(slug);
  if (error || !data) notFound();
  if (data.prompts?.date !== date) notFound();

  const { data: profile } = user ? await getUserRole(supabase, user.id) : { data: null };

  const isAuthor: boolean = user && data && user.id === data.user_id.id ? true : false;
  const isAdmin = profile?.role === "admin";

  return (
    <div className="px-6 lg:w-1/2 mx-auto m-8">
      <h1 className="text-center text-3xl whitespace-normal break-words">{data.title}</h1>
      <p className="text-center text-md">by {data.user_id.username}</p>
      <div className="bg-lilac p-4 m-4 rounded-xl w-fit mx-auto text-center">
        {data.image && (
          <Image
            src={data.image}
            key={data.image}
            alt={data.slug}
            height={1000}
            width={1000}
            className="mx-auto rounded-xl w-87.5 h-87.5 lg:w-100 lg:h-100 object-cover"
          />
        )}
        {data.prompts && (
          <div className="p-4">
            {data.prompts.title && <h2 className="text-lg">{data.prompts.title}</h2>}
            {data.prompts.date && <p>{data.prompts.date}</p>}
          </div>
        )}
      </div>
      <div>
        {(isAuthor || isAdmin) && (
          <div className="flex gap-4 justify-center">
            {isAuthor && (
              <button className="button-secondary">
                <Link href={`/${data.prompts.date}/${slug}/edit`}>
                  <FontAwesomeIcon icon={faPen} />
                </Link>
              </button>
            )}
            <DeleteButton id={data.id} />
          </div>
        )}
      </div>
      <div className="border-3 border-teal rounded-4xl p-6 mx-auto my-8">
        <h2 className="text-xl">comments</h2>
        {user && <AddCommentForm postId={data.id} />}
        <Comments postId={data.id} isAuthor={isAuthor} isAdmin={isAdmin} userId={user ? user.id : null} />
      </div>
    </div>
  );
};

export default PostPage;
