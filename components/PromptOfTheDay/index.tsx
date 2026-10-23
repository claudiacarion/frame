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

  if (isLoading) return <p className="text-center text-xl font-bold">your moment of the day</p>;

  if (isError) return <p className="text-center text-xl font-bold">sorry! we couldn&apos;t load today&apos;s prompt.</p>;

  if (!data) {
    return (
      <section className="text-center mb-6 p-4">
        <h2 className="text-3xl">no prompt for today yet</h2>
        <p className="text-md">check back soon for a new challenge!</p>
      </section>
    );
  }

  return (
    <section className="mb-6 p-4 text-center">
      <p className="text-xl font-bold">your moment of the day</p>
      <div className="bg-apricot w-fit mx-auto p-6 my-2 rounded-4xl">
        <h2 className="text-3xl">{data.title}</h2>
        <p className="text-md">{data.description}</p>
      </div>
    </section>
  );
};

export default PromptOfTheDay;
