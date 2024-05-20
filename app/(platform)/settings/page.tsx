"use client";

import { useSession } from "next-auth/react";
import { SettingsForm } from "./_components/SettingsForm";
import { Loader2 } from "lucide-react";

const SettingsPage = () => {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading") {
    return (
      <div className="flex items-center">
        <Loader2 className="animate-spin duration-500 text-slate-400" />
      </div>
    );
  }

  if (!user) {
    return <div>No user data found.</div>;
  }

  return (
    <div className="mt-4">
      <SettingsForm
        name={user.name as string}
        email={user.email as string}
        role={user.role}
      />
    </div>
  );
};

export default SettingsPage;
