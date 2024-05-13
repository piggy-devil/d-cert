"use client";

import { useUser } from "@/hooks/use-user";

type Props = {
  children: React.ReactNode;
};

export const AuthLoading = ({ children }: Props) => {
  const { isLoading } = useUser();

  if (isLoading) {
    return <div>{children}</div>;
  }
};
