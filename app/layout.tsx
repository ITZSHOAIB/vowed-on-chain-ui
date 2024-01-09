import "@/app/ui/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { inter } from "@/app/ui/fonts";
import { Navbar } from "@/components/ui/navbar";
import { Web3Providers } from "./providers/web3-providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Web3Providers>
          <Navbar />
          {children}
        </Web3Providers>
      </body>
    </html>
  );
}
