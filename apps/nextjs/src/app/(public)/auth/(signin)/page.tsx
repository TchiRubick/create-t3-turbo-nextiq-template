import Link from "next/link";

import { getSection } from "@acme/cms";
import { signin } from "@acme/lucia/actions";
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

const loginFormSection = getSection("signin-form");

const SigninPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <form action={signin} className="mx-auto max-w-sm">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">{loginFormSection.title}</CardTitle>
            <CardDescription>{loginFormSection.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="identifier">
                {loginFormSection["username-input"].label}
              </Label>
              <Input
                name="identifier"
                id="identifier"
                placeholder={loginFormSection["username-input"].placeholder}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">
                {loginFormSection["password-input"].label}
              </Label>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder={loginFormSection["password-input"].placeholder}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full">{loginFormSection.button}</Button>
            <div className="mt-4 text-center text-sm">
              {loginFormSection["no-account-text"]}
              <Link href="/auth/signup" className="underline">
                {loginFormSection["no-account-link-text"]}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default SigninPage;
