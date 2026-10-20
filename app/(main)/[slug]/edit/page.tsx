import { getSinglePost } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import EditPostForm from "./form";

const EditPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await getSinglePost(slug);
  if (user && data && user.id !== data.user_id.id) redirect("/auth/login");

  return (
    <>
      <h1>Edit your post!</h1>
      <EditPostForm initialValues={{ title: data!.title, image: data!.image }} postId={data!.id} />
    </>
  );
};

export default EditPostPage;
