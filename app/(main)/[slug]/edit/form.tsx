"use client";

import ErrorMessage from "@/components/ErrorMessage";
import { type Tables } from "@/lib/supabase/database.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPostSchema } from "@/actions/schemas";
import { useMutation } from "@tanstack/react-query";
import { EditPost } from "@/actions/edit-action";
import z from "zod";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const EditPostForm = ({
  initialValues,
  postId,
}: {
  initialValues: Pick<Tables<"posts">, "title" | "image">;
  postId: string;
}) => {
  const postImageSchema = editPostSchema.omit({ image: true }).extend({
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
    defaultValues: {
      title: initialValues.title,
      image: initialValues.image,
    },
  });

  const { mutate, error } = useMutation({
    mutationFn: EditPost,
  });

  return (
    <div className="border w-1/3 mx-auto">
      <h2>create a post</h2>
      <form
        onSubmit={handleSubmit(values => {
          let imageForm = undefined;
          if (values.image && typeof values.image !== "string") {
            imageForm = new FormData();
            imageForm.append("image", values.image[0]);
          }

          mutate({ postdata: { title: values.title, image: imageForm }, postId });
        })}
        className="flex flex-col">
        <label htmlFor="title">title*</label>
        <input {...register("title")} placeholder="title" />
        {errors.title && <ErrorMessage error={errors.title.message!.toLowerCase()} />}

        <h5>original image:</h5>
        {initialValues.image && <Image src={initialValues.image} alt={initialValues.title} height={200} width={200} />}

        <label htmlFor="image">new image*</label>
        <input {...register("image")} type="file" />
        {errors.image && <ErrorMessage error={errors.image.message!.toLowerCase()} />}

        <button type="submit" className="rounded bg-black p-2 text-white">
          <FontAwesomeIcon icon={faPlus} />
        </button>
        {error && <ErrorMessage error={error.message.toLowerCase()} />}
      </form>
    </div>
  );
};

export default EditPostForm;
