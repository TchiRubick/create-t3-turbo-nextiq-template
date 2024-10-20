import type { TRPCRouterRecord } from "@trpc/server";
import { Resend } from "resend";
import { z } from "zod";

import { publicProcedure } from "../trpc";

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailRouter = {
  contact: publicProcedure
    .input(
      z.object({
        name: z.string(),
        phone: z.string(),
        email: z.string().email(),
        message: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const response = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.RESEND_RECIPIENT ?? "tchi.devica@gmail.com",
        subject: `Contact Request from ${input.name}`,
        html: `
          <html>
            <title>${input.name} want to contact you</title>
              <body>
                  <h2>Hello !</h2>
                  <p>
                    ${input.name} would like to reach you out ! Here's his/her message.
                  </p>
                  <section>
                    <p>${input.message}</p>
                  </section>
                  <section>
                    <p>
                      Please contact her back at ${input.email} or ${input.phone}
                    </p>
                  </section>
              </body>
          </Html>
        `,
      });

      return response;
    }),
} satisfies TRPCRouterRecord;
