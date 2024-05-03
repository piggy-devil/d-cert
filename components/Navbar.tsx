import SigninButton from "@/app/(auth)/_components/SigninButton";
// import { useSession } from "next-auth/react";
import Link from "next/link";

export const Navbar = () => {
  // const session = useSession();
  // const user = session.data?.user;

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        {/* <Logo /> */}
        <div className="ml-auto space-x-10">
          <Link href={"/client"}>Client Page</Link>
          <Link href={"/server"}>Server Page</Link>
          <Link href={"/middle"}>Middleware Protected Page</Link>
        </div>
        <div className="ml-auto">
          <SigninButton />
        </div>
      </div>
    </div>
  );
};
