import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <div className="mt-20 ml-20">
      <div>{user.name}</div>
      {/* <div>{user.role}</div> */}
    </div>
  );
};

export default Home;
