"use client";

import { CreatePost } from "@/actions/createpost-action";
import { createPostSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { faHourglass, faPlus } from "@fortawesome/free-solid-svg-icons";
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

  const { mutate, error, isPending } = useMutation({
    mutationFn: CreatePost,
  });

  if (error) console.log(error);

  return (
    <div className="bg-lilac rounded-4xl p-8 w-1/3 mx-auto">
      <h1 className='text-center text-lg'>create a post</h1>
      <form
        onSubmit={handleSubmit(values => {
          const imageForm = new FormData();
          if (values.image) imageForm.append("image", values.image[0]);
          mutate({ title: values.title, image: imageForm });
        })}
        className="flex flex-col gap-4">
        <label htmlFor="title">title*</label>
        <input {...register("title")} placeholder="title" className='bg-white text-black py-2 px-4 rounded-4xl' />
        {errors.title && <ErrorMessage error={errors.title.message!} />}

        <label htmlFor="image">image*</label>
        <input {...register("image")} type="file" className='bg-white text-black py-2 px-4 rounded-4xl' />
        {errors.image && <ErrorMessage error={errors.image.message!} />}

        <button className="button-secondary w-fit mx-auto">{isPending ? <FontAwesomeIcon icon={faHourglass} /> : <FontAwesomeIcon icon={faPlus} />}
        </button>
        {error && <ErrorMessage error={error.message} />}
      </form>
    </div>
  );
};
export default CreatePostForm;
