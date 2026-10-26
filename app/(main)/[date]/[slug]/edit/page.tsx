import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import { notFound, redirect } from "next/navigation";
import EditPostForm from "./form";

const EditPostPage = async ({ params }: { params: { date: string; slug: string } }) => {
  const { date, slug } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await getSinglePost(slug);
  if (user && data && user.id !== data.user_id.id) redirect("/auth/login");
  if (error || !data) notFound();

  return (
    <div className="p-8">
      <EditPostForm initialValues={{ title: data!.title, image: data!.image }} postId={data!.id} />
    </div>
  );
};

export default EditPostPage;
