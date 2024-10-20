"use client";

import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import type { UpdateUser } from "@acme/db";
import { zUpdateUser } from "@acme/db";
import { Button } from "@acme/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";

import { api } from "~/trpc/react";

export const EditProfileForm = () => {
  const { handleSubmit, register } = useForm<UpdateUser>({
    resolver: zodResolver(zUpdateUser),
  });
  const { mutateAsync, isPending } = api.user.update.useMutation();
  const { data: user, refetch } = api.auth.user.useQuery();

  const onSubmit = async (data: UpdateUser) => {
    await mutateAsync(data);
    await refetch();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, (e, d) => console.error(e, d))}>
      <Card className="mx-auto flex w-full max-w-3xl justify-evenly">
        <CardHeader className="h-full w-36 items-center justify-center">
          <label
            htmlFor="image"
            className="h-36 w-36 items-center text-gray-600"
          >
            {user?.image ? (
              <Image
                src={user.image}
                width={40}
                height={40}
                alt="Your profile picture"
                className="h-full w-full rounded-full"
              />
            ) : (
              <UserCircleIcon className="h-36 w-36 cursor-pointer hover:h-32 hover:w-32 hover:opacity-80" />
            )}
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="hidden"
            name="image"
          />
          <div className="flex flex-col justify-center text-center">
            <Label className="text-xl font-bold">{user?.username}</Label>
            <Label className="text-gray-500">{user?.email}</Label>
          </div>
        </CardHeader>
        <div className="w-2/3 min-w-20">
          <CardHeader>
            <CardTitle className="text-2xl">Edit Profile</CardTitle>
            <CardDescription>
              You can edit your information below.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullname">Full name</Label>
              <Input
                id="fullname"
                type="text"
                placeholder="John Doe"
                defaultValue={user?.username ?? ""}
                {...register("username")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="flex justify-end">
              {isPending ? "Saving..." : "Save"}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </form>
  );
};
