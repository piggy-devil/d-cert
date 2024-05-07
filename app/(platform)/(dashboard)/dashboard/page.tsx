import { NewButton } from "../_components/New";

const DashboardPage = () => {
  return (
    <div className="ml-20">
      <span>Workspaces</span>
      <div className="w-60 mt-10">
        <NewButton />
      </div>
    </div>
  );
};

export default DashboardPage;
