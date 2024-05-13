"use client";

import { useUser } from "@/hooks/use-user";

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-primary font-medium">
        ยินดีต้อนรับ{isLoaded ? ", " : " "}
        {user?.name}
      </h2>
      <p className="text-sm lg:text-base text-slate-800">
        This is Digital Certificate Platform
      </p>
    </div>
  );
};
