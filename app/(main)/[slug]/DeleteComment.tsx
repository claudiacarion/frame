'use client'

import { DeleteCommentAction } from "@/actions/deletecomment-action";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from "@tanstack/react-query";

const DeleteComment = ({ commentId }: { commentId: string }) => {
  const { mutate } = useMutation({
    mutationFn: DeleteCommentAction,
  });

  return (
    <div onClick={() => mutate(commentId)}>
      <FontAwesomeIcon icon={faTrashCan} className='cursor-pointer'/>
    </div>
  );
};

export default DeleteComment;
