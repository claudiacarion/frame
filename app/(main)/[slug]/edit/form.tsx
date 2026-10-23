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
import { faHourglass, faPlus } from "@fortawesome/free-solid-svg-icons";

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

  const { mutate, error, isPending } = useMutation({
    mutationFn: EditPost,
  });

  return (
    <div className="bg-lilac rounded-4xl p-8 w-full lg:w-1/3 mx-auto">
      <h1 className="text-center text-lg">edit your post</h1>
      <form
        onSubmit={handleSubmit(values => {
          let imageForm = undefined;
          if (values.image && typeof values.image !== "string") {
            imageForm = new FormData();
            imageForm.append("image", values.image[0]);
          }
          mutate({ postdata: { title: values.title, image: imageForm }, postId });
        })}
        className="flex flex-col gap-4">
        <label htmlFor="title">title</label>
        <input {...register("title")} placeholder="title" className="bg-white text-black py-2 px-4 rounded-4xl" />
        {errors.title && <ErrorMessage error={errors.title.message!.toLowerCase()} />}

        <h5>original image</h5>
        {initialValues.image && (
          <Image
            src={initialValues.image}
            alt={initialValues.title}
            height={1000}
            width={1000}
            className="mx-auto rounded-xl w-87.5 h-87.5 lg:w-100 lg:h-100 object-cover"
          />
        )}

        <label htmlFor="image">new image</label>
        <input {...register("image")} type="file" className="bg-white text-black py-2 px-4 rounded-4xl" />
        {errors.image && <ErrorMessage error={errors.image.message!.toLowerCase()} />}

        <button className="button-secondary w-fit mx-auto">
          {isPending ? <FontAwesomeIcon icon={faHourglass} /> : <FontAwesomeIcon icon={faPlus} />}
        </button>
        {error && <ErrorMessage error={error.message.toLowerCase()} />}
      </form>
    </div>
  );
};

export default EditPostForm;
