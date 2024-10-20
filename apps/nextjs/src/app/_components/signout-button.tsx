"use client";

import { useRouter } from "next/navigation";

import { Button } from "@acme/ui/button";

import { api } from "~/trpc/react";

export const SignoutButton = () => {
  const { mutate } = api.auth.signOut.useMutation();

  const router = useRouter();

  const handleClickSignout = () => {
    mutate();
    router.push("/");
  };

  return (
    <Button variant="destructive" onClick={handleClickSignout}>
      Sign out
    </Button>
  );
};
