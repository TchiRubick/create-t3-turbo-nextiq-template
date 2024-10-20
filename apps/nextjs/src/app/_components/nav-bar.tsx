import Link from "next/link";
import { Anchor, User } from "lucide-react";

import { Button } from "@acme/ui/button";
import { ThemeToggle } from "@acme/ui/theme";

import { api } from "~/trpc/server";
import { SignoutButton } from "./signout-button";

export const NavBar = async () => {
  const isLoggedIn = await api.auth.isLoggedIn();

  return (
    <header className="flex h-14 items-center px-4 lg:px-6">
      <Link className="flex items-center justify-center" href="#">
        <Anchor className="h-6 w-6" />
        <span className="sr-only">Navy</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/contact"
        >
          Contact
        </Link>
        <Link href={isLoggedIn ? "/edit-profile" : "/auth"}>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <User className="h-6 w-6" />
          </Button>
        </Link>

        <ThemeToggle />

        {isLoggedIn && <SignoutButton />}
      </nav>
    </header>
  );
};
