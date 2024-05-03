import SigninButton from "@/app/(auth)/_components/SigninButton";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <SigninButton />
          </div>
        </div>
      </div>
    </div>
  );
};
