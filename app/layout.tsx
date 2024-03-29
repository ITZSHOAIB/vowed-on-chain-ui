import "@/app/ui/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { inter } from "@/app/ui/fonts";
import { Navbar } from "@/components/ui/navbar";
import { Web3Providers } from "./providers/web3-providers";
import { SubNavbar } from "@/components/ui/sub-navbar";
import { ThemeProvider } from "./providers/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Web3Providers>
            <Navbar />
            <SubNavbar />
            {children}
          </Web3Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
