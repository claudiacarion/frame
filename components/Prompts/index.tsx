/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { DeletePrompt } from "@/actions/deleteprompt-action";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AllPromptsType } from "@/lib/supabase/queries";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

const AdminPrompts = ({ prompts }: { prompts: AllPromptsType }) => {
  const router = useRouter();

  const sortedPrompts = [...prompts].sort((a, b) => b.date.localeCompare(a.date));

  const [selectedDate, setSelectedDate] = useState(sortedPrompts[0]?.date ?? "");

  const selectedPrompt = sortedPrompts.find(prompt => prompt.date === selectedDate);

  const { mutate, error, isPending } = useMutation({
    mutationFn: DeletePrompt,
    onSuccess: () => {
      setSelectedDate("");
      router.refresh();
    },
  });

  useEffect(() => {
    if (!prompts.some(prompt => prompt.date === selectedDate)) {
      setSelectedDate([...prompts].sort((a, b) => b.date.localeCompare(a.date))[0]?.date ?? "");
    }
  }, [prompts, selectedDate]);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">manage prompts</h2>

      <div className="space-y-2">
        <label htmlFor="prompt-date" className="block font-medium">
          select a date
        </label>

        <select
          id="prompt-date"
          value={selectedDate}
          onChange={event => setSelectedDate(event.target.value)}
          className="w-full rounded-md border p-2">
          {sortedPrompts.map(prompt => (
            <option key={prompt.id} value={prompt.date}>
              {prompt.date}
            </option>
          ))}
        </select>
      </div>

      {selectedPrompt && (
        <div className="space-y-2 rounded-lg border p-4">
          <p className="text-sm text-gray-500">{selectedPrompt.date}</p>

          <h3 className="text-xl font-semibold">{selectedPrompt.title.toLowerCase()}</h3>

          <p>{selectedPrompt.description.toLowerCase()}</p>

          <button
            type="button"
            onClick={() => {
              if (window.confirm(`are you sure you want to delete the prompt for ${selectedPrompt.date}?`)) {
                mutate(selectedPrompt.id);
              }
            }}
            disabled={isPending}
            className="rounded bg-red-400 px-4 py-2 text-white disabled:opacity-50">
            {isPending ? "deleting..." : <FontAwesomeIcon icon={faTrashCan} />}
          </button>

          {error && <ErrorMessage error={error.message} />}
        </div>
      )}
    </section>
  );
};

export default AdminPrompts;
