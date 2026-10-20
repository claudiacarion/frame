"use client";

import { CreatePost } from "@/actions/createpost-action";
import { createPostSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

const CreatePostForm = () => {
  const postImageSchema = createPostSchema.omit({ image: true }).extend({
    image: z.unknown().transform(value => {
      return value as FileList;
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postImageSchema),
  });

  const { mutate, error } = useMutation({
    mutationFn: CreatePost,
  });

  if (error) console.log(error);

  return (
    <div className="border w-1/3 mx-auto">
      <h2>Create a post!</h2>
      <form
        onSubmit={handleSubmit(values => {
          const imageForm = new FormData();
          if (values.image) imageForm.append("image", values.image[0]);
          mutate({ title: values.title, image: imageForm });
        })}
        className="flex flex-col">
        <label htmlFor="title">Title*</label>
        <input {...register("title")} placeholder="title" />
        {errors.title && <ErrorMessage error={errors.title.message!} />}

        <label htmlFor="image">Image*</label>
        <input {...register("image")} type="file" />
        {errors.image && <ErrorMessage error={errors.image.message!} />}

        <button type="submit" className="rounded bg-black p-2 text-white">
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};
export default CreatePostForm;
