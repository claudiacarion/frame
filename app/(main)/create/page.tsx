import PromptOfTheDay from "@/components/PromptOfTheDay";
import CreatePostForm from "./form";

const CreatePage = () => {
  return (
    <div className="p-8">
      <PromptOfTheDay />
      <CreatePostForm />
    </div>
  );
};

export default CreatePage;
