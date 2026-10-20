"use client";

import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/browserClient";
import { getTodaysPrompt } from "@/lib/supabase/queries";

const PromptOfTheDay = () => {
  const supabase = createClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todays-prompt"],
    queryFn: async () => {
      const { data, error } = await getTodaysPrompt(supabase);

      if (error) throw error;

      return data;
    },
    staleTime: 60_000,
  });

  if (isLoading) return <p>today&apos;s prompt...</p>;

  if (isError) return <p>sorry! we couldn&apos;t load today&apos;s prompt.</p>;

  if (!data) {
    return (
      <section className="mb-6 border p-4">
        <h2>no prompt for today yet</h2>
        <p>check back soon for a new challenge!</p>
      </section>
    );
  }

  return (
    <section className="mb-6 border p-4">
      <h2 className="text-xl font-bold">today&apos;s prompt</h2>
      <h3>{data.title.toLowerCase()}</h3>
      <p>{data.description.toLowerCase()}</p>
    </section>
  );
};

export default PromptOfTheDay;
