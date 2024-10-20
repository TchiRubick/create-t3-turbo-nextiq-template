"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { getSection } from "@acme/cms";
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
import { Textarea } from "@acme/ui/textarea";

import { api } from "~/trpc/react";

const contactFormSection = getSection("contact-form");

interface FormData {
  name: string;
  email: string;
  message: string;
  phone: string;
}

const zFormSchema = z.object({
  name: z
    .string()
    .min(5, contactFormSection["input-full-name"]["error-message"]),
  email: z.string().email(contactFormSection["input-email"]["error-message"]),
  message: z
    .string()
    .min(10, contactFormSection["input-message"]["error-message"]),
  phone: z.string().min(10, contactFormSection["input-phone"]["error-message"]),
});

export const ContactForm = () => {
  const { mutateAsync } = api.email.contact.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(zFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    await mutateAsync(data);
  };

  return (
    <div className="mt-8 lg:mx-6 lg:w-1/2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {contactFormSection.title}
            </CardTitle>
            <CardDescription>{contactFormSection.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                {contactFormSection["input-full-name"].label}
              </Label>
              <Input
                type="text"
                placeholder={contactFormSection["input-full-name"].placeholder}
                {...register("name")}
                className="min-h-12"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">
                {contactFormSection["input-phone"].label}
              </Label>
              <Input
                type="tel"
                placeholder={contactFormSection["input-phone"].placeholder}
                {...register("phone", {
                  required: contactFormSection["input-phone"]["error-message"],
                })}
                className="min-h-12"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">
                {contactFormSection["input-email"].label}
              </Label>
              <Input
                type="email"
                placeholder={contactFormSection["input-email"].placeholder}
                {...register("email")}
                className="min-h-12"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">
                {contactFormSection["input-message"].label}
              </Label>
              <Textarea
                {...register("message")}
                placeholder={contactFormSection["input-message"].label}
                className="min-h-32"
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">{contactFormSection.button}</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
