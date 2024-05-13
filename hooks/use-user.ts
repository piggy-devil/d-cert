import { useSession } from "next-auth/react";

export const useUser = () => {
  const { data: session, status } = useSession();
  const user = session?.user ?? null;
  const isLoaded = status === "authenticated";
  const isLoading = status === "loading";

  return { user, isLoaded, isLoading };
};
