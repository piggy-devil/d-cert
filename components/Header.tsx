import { UserButton } from "@/app/(auth)/_components/UserButton";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import { AuthLoaded } from "@/app/(auth)/_components/AuthLoaded";
import SigninButton from "@/app/(auth)/_components/SigninButton";
import { AuthUnLoaded } from "@/app/(auth)/_components/AuthUnLoaded";

export const Header = () => {
  return (
    <header className="px-4 py-6 lg:px-14 shadow-sm">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center lg:gap-x-16">
            <Logo />
            <Navigation />
          </div>
          <div>
            <AuthUnLoaded>
              <SigninButton />
            </AuthUnLoaded>
            <AuthLoaded>
              <UserButton afterSignOutUrl="/" />
            </AuthLoaded>
          </div>
        </div>
      </div>
    </header>
  );
};
