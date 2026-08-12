import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderAdmin from "@/components/Header";
import { Toaster } from "sonner";
import "@workspace/ui/globals.css";
import { Providers } from "@/lib";
import { cn } from "@workspace/ui/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <Providers>
          <main>
            <HeaderAdmin />
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
