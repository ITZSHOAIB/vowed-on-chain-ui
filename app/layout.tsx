import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";
import { Navbar } from "@/components/ui/navbar";
import { SubNavbar } from "@/components/ui/sub-navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <SubNavbar />
        {children}
      </body>
    </html>
  );
}
