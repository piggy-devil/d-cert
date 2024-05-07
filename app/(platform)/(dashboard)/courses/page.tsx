import { EmptyCourse } from "../_components/EmptyCourse";
import { NewButton } from "../_components/New";

const CouresPage = () => {
  return (
    <div className="ml-20">
      <span>Workspaces</span>
      <div className="w-60 mt-10">
        {/* <NewButton /> */}
        <EmptyCourse />
      </div>
    </div>
  );
};

export default CouresPage;
