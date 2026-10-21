import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import Comments from "./Comments";
import AddCommentForm from "./AddCommentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { slug } = await params;
  const { data, error } = await getSinglePost(slug);
  if (error) throw error;

  const isAuthor: boolean = user && data && user.id === data.user_id.id ? true : false;

  return (
    <div className="w-1/2 mx-auto m-8">
      <h1 className="text-center text-2xl">{data.title}</h1>
      <p className="text-center">by {data.user_id.username}</p>
      <div className="bg-lilac p-4 m-4 rounded-xl w-fit mx-auto text-center">
        {data.image && (
          <Image
            src={data.image}
            key={data.image}
            alt={data.slug}
            height={350}
            width={350}
            className="mx-auto rounded-xl w-87.5 h-87.5 lg:w-100 lg:h-100 object-cover"
          />
        )}
        {data.prompts && (
          <div className="p-4">
            {data.prompts.title && <h2 className="text-lg">{data.prompts.title.toLowerCase()}</h2>}
            {data.prompts.date && <p>{data.prompts.date}</p>}
          </div>
        )}
      </div>
      <div>
        {isAuthor && (
          <div className='flex gap-4 justify-center'>
            <Link href={`/${slug}/edit`}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </Link>
            <DeleteButton id={data.id} />
          </div>
        )}
      </div>
      <div className="border-3 border-teal rounded-4xl p-6 mx-auto my-8">
        <h2 className="text-xl">comments</h2>
        {user && <AddCommentForm postId={data.id} />}
        <Comments postId={data.id} isAuthor={isAuthor} userId={user ? user.id : null} />
      </div>
    </div>
  );
};

export default PostPage;
