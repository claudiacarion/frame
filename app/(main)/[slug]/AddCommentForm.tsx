"use client";

import { AddComment } from "@/actions/addcomment-action";
import { commentSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { faPaperPlane, faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddCommentForm = ({
  postId,
  parentCommentId,
  isReply = false,
}: {
  postId: string;
  parentCommentId?: string;
  isReply?: boolean;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  const { mutate, error } = useMutation({
    mutationFn: AddComment,
    onSuccess: () => reset(),
    onSettled: () => toast("comment added"),
  });

  return (
    <form
      onSubmit={handleSubmit(values =>
        mutate({
          commentData: { content: values.content },
          postId,
          parentCommentId: parentCommentId ?? null,
        }),
      )}
      className={`flex flex-col gap-3 w-full items-end py-4 rounded-2xl`}>
      <textarea
        {...register("content")}
        placeholder={isReply ? "write a reply..." : "what's your take?"}
        className={`p-2 rounded-xl w-full bg-teal/20 text-sm mx-auto`}
      />

      {errors.content && <ErrorMessage error={errors.content.message!} />}

      <button type="submit" className="w-fit button-secondary text-xs">
        {isReply ? <FontAwesomeIcon icon={faReply} /> : <FontAwesomeIcon icon={faPaperPlane} />}
      </button>

      {error && <ErrorMessage error={error.message} />}
    </form>
  );
};

export default AddCommentForm;
