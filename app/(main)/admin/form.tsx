"use client";

import { CreatePrompt } from "@/actions/createprompt-action";
import { createPromptSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CreatePromptForm = () => {
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
    onSuccess: () => reset(),
    onSettled: () => toast("prompt added"),
  });

  return (
    <div className="mx-auto w-full max-w-xl border p-6">
      <h2 className="mb-4 text-xl font-semibold">create a prompt</h2>

      <form onSubmit={handleSubmit(values => mutate(values))} className="flex flex-col gap-3">
        <label htmlFor="title">prompt</label>
        <input id="title" {...register("title")} placeholder="e.g. reflections" className="rounded border p-2" />
        {errors.title && <ErrorMessage error={errors.title.message!} />}

        <label htmlFor="description">description</label>
        <textarea
          id="description"
          {...register("description")}
          placeholder="describe the challenge"
          rows={4}
          className="rounded border p-2"
        />
        {errors.description && <ErrorMessage error={errors.description.message!.toLowerCase()} />}

        <label htmlFor="date">date</label>
        <input id="date" type="date" {...register("date")} className="rounded border p-2" />
        {errors.date && <ErrorMessage error={errors.date.message!.toLowerCase()} />}

        <button type="submit" className="rounded bg-black p-2 text-white">
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {error && <ErrorMessage error={error.message.toLowerCase()} />}
      </form>
    </div>
  );
};

export default CreatePromptForm;
