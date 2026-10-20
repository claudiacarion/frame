import { Admin } from "@/lib/supabase/admin";
import CreatePromptForm from "./form";
import Prompts from "@/components/Prompts";
import { getAllPrompts } from '@/lib/supabase/queries';
import { createClient } from '@/lib/supabase/serverClient';

export default async function AdminPage() {
  await Admin();

  const supabase = await createClient();
  const { data: prompts, error } = await getAllPrompts(supabase);

  if (error) {
    throw new Error("Failed to load prompts.");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">admin dashboard</h1>
        <p className="mt-2 text-gray-600">manage your daily photography prompts here.</p>
      </div>

      <CreatePromptForm />
      <Prompts prompts={prompts ?? []} />
    </div>
  );
}
