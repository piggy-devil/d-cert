import getSession from "@/lib/getSession";

const page = async () => {
  const session = await getSession();
  if (!session || !session.user)
    return <div className="text-red-500 mt-20 p-5">You Need To Sign In</div>;
  return (
    <div className="mt-20">This is a server Page and must be protected</div>
  );
};

export default page;
