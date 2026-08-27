import Providers from "@/app/providers";
import { cn } from "@/utils/cn";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | bot-flow Admin",
    default: "bot-flow Admin",
  },
  description: "bot-flow operations and analytics admin dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="zh-CN"
      className={cn("h-full overflow-hidden antialiased", geistInter.className)}
    >
      <body className="h-full overflow-hidden bg-background-gray-secondary_alt_2">
        <ThemeProvider defaultTheme="light" enableSystem>
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
