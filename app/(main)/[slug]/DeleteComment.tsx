"use client";

import { DeleteCommentAction } from "@/actions/deletecomment-action";
import { faHourglass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteComment = ({ commentId }: { commentId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: DeleteCommentAction,
    onSettled: () => toast.success("comment deleted", {
      duration: 3000,
    }),
  });

  return (
    <button onClick={() => mutate(commentId)} className='px-2 py-1 rounded-4xl bg-lilac hover:bg-apricot hover:rotate-10 transition-transform text-[12px] font-bold'>
      {isPending ? (
        <FontAwesomeIcon icon={faHourglass} />
      ) : (
        <FontAwesomeIcon icon={faTrash} />
      )}
    </button>
  );
};

export default DeleteComment;
