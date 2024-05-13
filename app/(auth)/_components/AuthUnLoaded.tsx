"use client";

import { useUser } from "@/hooks/use-user";

type Props = {
  children: React.ReactNode;
};

export const AuthUnLoaded = ({ children }: Props) => {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return <>{children}</>;
  }
};
