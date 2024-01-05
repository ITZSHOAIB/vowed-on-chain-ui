import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";
import { Navbar } from "@/components/ui/navbar";
import { SubNavbar } from "@/components/ui/sub-navbar";
import { headers } from "next/headers";
import { State, cookieToInitialState } from "wagmi";
import { wagmiConfig } from "./wagmi.config";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  ) as State;

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers initialState={initialState}>
          <Navbar />
          <SubNavbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
