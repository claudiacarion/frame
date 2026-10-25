"use client";
import { DeletePost } from "@/actions/delete-action";
import { faHourglassEnd, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteButton = ({ id }: { id: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: DeletePost,
    onSettled: () =>
      toast("post deleted", {
        duration: 3000,
      }),
  });

  return (
    <button onClick={() => mutate(id)} className="button-secondary">
      {isPending ? <FontAwesomeIcon icon={faHourglassEnd} /> : <FontAwesomeIcon icon={faTrash} />}
    </button>
  );
};

export default DeleteButton;
