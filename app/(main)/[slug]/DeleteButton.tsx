"use client";
import { DeletePost } from "@/actions/delete-action";
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteButton = ({ id }: { id: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: DeletePost,
    onSettled: () => toast("Post deleted"),
  });

  return (
    <button className="button" onClick={() => mutate(id)}>
      {isPending ? "deleting..." : <FontAwesomeIcon icon={faTrashCan} />}
    </button>
  );
};

export default DeleteButton;
