import { Admin } from "@/lib/supabase/admin";
import CreatePromptForm from "./form";
import Prompts from "@/app/(main)/admin/ManagePrompts";
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
    <div className="p-8">
      <div className='text-center mb-4'>
        <h1 className="text-3xl">admin dashboard</h1>
        <p>manage your daily photography prompts here.</p>
      </div>
      <CreatePromptForm />
      <Prompts prompts={prompts} />
    </div>
  );
}
