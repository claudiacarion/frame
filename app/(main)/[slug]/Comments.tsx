import { getPostComments } from "@/lib/supabase/queries";
import DeleteComment from "./DeleteComment";
import AddCommentForm from "./AddCommentForm";

const Comments = async ({ postId, isAuthor, isAdmin, userId }: { postId: string; isAuthor: boolean; isAdmin: boolean; userId: string | null }) => {
  const comments = await getPostComments(postId);

  return (
    <div className="bg-white px-4">
      {comments && comments.length ? (
        comments
          .filter(comment => comment.parent_comment_id === null)
          .map(comment => (
            <div key={comment.id}>
              <div className="flex">
                <p className='mr-4'>
                  <span className='font-bold'>{comment.user_id.username} says</span> {comment.content}
                </p>
                {(isAuthor || isAdmin || userId === comment.user_id.id) && <DeleteComment commentId={comment.id} />}
              </div>
              <div className="ml-4 mt-2 flex flex-col gap-2">
                {comments
                  .filter(reply => reply.parent_comment_id === comment.id)
                  .map(reply => (
                    <div key={reply.id} className='flex'>
                      <p className='mr-4'>
                        <span className="font-bold">{reply.user_id.username} says</span> {reply.content}
                      </p>
                      {(isAuthor || isAdmin || userId === reply.user_id.id) && <DeleteComment commentId={reply.id} />}
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
