/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { DeletePrompt } from "@/actions/deleteprompt-action";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { AllPromptsType } from "@/lib/supabase/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { toast } from "sonner";

const ManagePrompts = ({ prompts }: { prompts: AllPromptsType }) => {
  const router = useRouter();

  const sortedPrompts = [...prompts].sort((a, b) => b.date.localeCompare(a.date));

  const [selectedDate, setSelectedDate] = useState(sortedPrompts[0]?.date ?? "");

  const selectedPrompt = sortedPrompts.find(prompt => prompt.date === selectedDate);

  const { mutate, error, isPending } = useMutation({
    mutationFn: DeletePrompt,
    onSuccess: () => {
      setSelectedDate("");
      router.refresh();
      toast.success("prompt deleted", {
        duration: 3000,
      });
    },
    onError: error => {
      toast.error(error.message, {
        duration: 3000,
      });
    },
  });

  useEffect(() => {
    if (!prompts.some(prompt => prompt.date === selectedDate)) {
      setSelectedDate([...prompts].sort((a, b) => b.date.localeCompare(a.date))[0]?.date ?? "");
    }
  }, [prompts, selectedDate]);

  return (
    <div className="border-3 border-teal rounded-4xl p-8 w-full lg:w-1/2 mx-auto">
      <h2 className="text-center text-lg">manage prompts</h2>
      <div className="flex flex-col gap-3 mb-4">
        <label htmlFor="prompt-date">select a date</label>
        <select
          id="prompt-date"
          value={selectedDate}
          onChange={event => setSelectedDate(event.target.value)}
          className="bg-teal/20 text-black py-2 px-4 rounded-4xl w-1/2">
          {sortedPrompts.map(prompt => (
            <option key={prompt.id} value={prompt.date}>
              {prompt.date}
            </option>
          ))}
        </select>
      </div>

      {selectedPrompt && (
        <div className="rounded-4xl bg-lilac p-4 text-center">
          <p className="text-xl">{selectedPrompt.date}</p>
          <div className="my-4">
            <h3 className="text-3xl font-semibold">{selectedPrompt.title}</h3>
            <p className="text-md">{selectedPrompt.description}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              toast("delete this prompt?", {
                description: `prompt date: ${selectedPrompt.date}`,
                duration: Infinity,
                action: {
                  label: "delete",
                  onClick: () => mutate(selectedPrompt.id),
                },
                cancel: {
                  label: "cancel",
                  onClick: () => toast.dismiss(),
                },
              });
            }}
            disabled={isPending}
            className="button-secondary">
            {isPending ? <FontAwesomeIcon icon={faHourglass} /> : <FontAwesomeIcon icon={faTrashCan} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ManagePrompts;
