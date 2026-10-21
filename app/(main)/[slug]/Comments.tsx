import { getPostComments } from "@/lib/supabase/queries";
import DeleteComment from "./DeleteComment";
import AddCommentForm from "./AddCommentForm";

const Comments = async ({ postId, isAuthor, userId }: { postId: string; isAuthor: boolean; userId: string | null }) => {
  const comments = await getPostComments(postId);

  return (
    <div className="bg-white px-4">
      {comments && comments.length ? (
        comments
          .filter(comment => comment.parent_comment_id === null)
          .map(comment => (
            <div key={comment.id}>
              <div className="flex">
                <p>
                  {comment.user_id.username} says {comment.content}
                </p>
                {(isAuthor || userId === comment.user_id.id) && <DeleteComment commentId={comment.id} />}
              </div>
              <div className="ml-8">
                {comments
                  .filter(reply => reply.parent_comment_id === comment.id)
                  .map(reply => (
                    <div key={reply.id} className='flex'>
                      <p>
                        {reply.user_id.username} says {reply.content}
                      </p>
                      {(isAuthor || userId === reply.user_id.id) && <DeleteComment commentId={reply.id} />}
                    </div>
                  ))}
              </div>
              {userId && <AddCommentForm postId={postId} parentCommentId={comment.id} isReply />}
            </div>
          ))
      ) : (
        <h2>start a conversation.</h2>
      )}
    </div>
  );
};

export default Comments;
