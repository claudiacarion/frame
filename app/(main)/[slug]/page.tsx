import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import Link from "next/link";
import Comments from "./Comments";
import AddCommentForm from "./AddCommentForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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
    <div>
      <div>
        <h1>{data.title}</h1>
        <h4>{data.user_id.username}</h4>
        {data.image && <Image src={data.image} key={data.image} alt={data.slug} height={350} width={350} />}
      </div>
      {data.prompts && (
        <div>
          {data.prompts.title && <p>{data.prompts.title}</p>}
          {data.prompts.description && <p>{data.prompts.description}</p>}
        </div>
      )}
      <div>
        {isAuthor && (
          <div>
            <Link href={`/${slug}/edit`}><FontAwesomeIcon icon={faPenToSquare} /></Link>
            <DeleteButton id={data.id} />
          </div>
        )}
      </div>
      <div className="bg-lilac p-8 w-1/2 mx-auto">
        {user && <AddCommentForm postId={data.id} />}
        <Comments postId={data.id} isAuthor={isAuthor} userId={user ? user.id : null} />
      </div>
    </div>
  );
};

export default PostPage;
