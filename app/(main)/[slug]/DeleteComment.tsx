"use client";

import { DeleteCommentAction } from "@/actions/deletecomment-action";
import { faHourglass, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteComment = ({ commentId }: { commentId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: DeleteCommentAction,
    onSettled: () => toast.success("comment deleted"),
  });

  return (
    <div onClick={() => mutate(commentId)}>
      {isPending ? (
        <FontAwesomeIcon icon={faHourglass} />
      ) : (
        <FontAwesomeIcon icon={faTrashCan} className="cursor-pointer pl-4" />
      )}
    </div>
  );
};

export default DeleteComment;
