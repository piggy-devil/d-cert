"use client";

import { useUser } from "@/hooks/use-user";

type Props = {
  children: React.ReactNode;
};

export const AuthLoaded = ({ children }: Props) => {
  const { isLoaded } = useUser();

  if (isLoaded) {
    return <>{children}</>;
  }
};
