import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@acme/ui";
import { ThemeProvider } from "@acme/ui/theme";
import { Toaster } from "@acme/ui/toast";

import { TRPCReactProvider } from "~/trpc/react";

import "~/app/globals.css";

import { env } from "~/env";
import { Footer } from "./_components/footer";
import { NavBar } from "./_components/nav-bar";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "NextIQ",
  description:
    "NextIQ helps you build your website. We are a small team founded by an international and experienced software engineer from Madagascar.",
  openGraph: {
    title: "NextIQ",
    description:
      "NextIQ helps you build your website. We are a small team founded by an international and experienced software engineer from Madagascar.",
    // url: "https://create-t3-turbo.vercel.app",
    siteName: "NextIQ",
  },
  twitter: {
    card: "summary_large_image",
    site: "@moonlightlykos",
    creator: "@moonlightlykos",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TRPCReactProvider>
            <div className="flex min-h-screen flex-col">
              <NavBar />
              {props.children}
              <Footer />
            </div>
          </TRPCReactProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
