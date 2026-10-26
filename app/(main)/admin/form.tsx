"use client";

import { CreatePrompt } from "@/actions/createprompt-action";
import { createPromptSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const CreatePromptForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof createPromptSchema>>({
    resolver: zodResolver(createPromptSchema),
  });

  const { mutate, error } = useMutation({
    mutationFn: CreatePrompt,
    onSuccess: (data) => {
      if (data?.error) {
        toast.error(data.error);
        return;
      }
      reset();
      router.refresh();
      toast.success("prompt added!");
    },
    onError: error => {
      toast.error("something went wrong. please try again.");
    },
  });

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(values => mutate(values))();
    }
  };

  return (
    <div className="bg-apricot rounded-4xl p-8 w-full lg:w-1/2 mx-auto mb-8">
      <h2 className="text-center text-lg">create a prompt</h2>
      <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col gap-3">
        <label htmlFor="title">prompt</label>
        <input
          id="title"
          maxLength={20}
          {...register("title")}
          placeholder="e.g. reflections"
          className="bg-white text-black py-2 px-4 rounded-4xl"
          onKeyDown={handleEnter}
        />
        {errors.title && <ErrorMessage error={errors.title.message!.toLowerCase()} />}

        <label htmlFor="description">description</label>
        <textarea
          id="description"
          maxLength={80}
          {...register("description")}
          placeholder="describe the challenge"
          rows={2}
          className="bg-white text-black py-2 px-4 rounded-4xl"
          onKeyDown={handleEnter}
        />
        {errors.description && <ErrorMessage error={errors.description.message!.toLowerCase()} />}

        <label htmlFor="date">date</label>
        <input id="date" type="date" {...register("date")} className="bg-white text-black py-2 px-4 rounded-4xl" />
        {errors.date && <ErrorMessage error={errors.date.message!.toLowerCase()} />}

        <button type="submit" className="button-primary w-fit mx-auto">
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {error && <ErrorMessage error={error.message.toLowerCase()} />}
      </form>
    </div>
  );
};

export default CreatePromptForm;
