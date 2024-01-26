"use client";
import clsx from "clsx";
import { HomeIcon, LayoutDashboard } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { ThemeToggler } from "./theme-toggler";

const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export function SubNavbar() {
  const pathname = usePathname();
  const { status } = useSession();
  const router = useRouter();

  useAccount({
    onConnect(data) {},
    onDisconnect() {
      if (pathname.startsWith("/dashboard")) {
        router.replace("/");
      }
    },
  });

  return (
    <nav className="bg-secondary">
      <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex flex-row font-medium mt-0 space-x-2 rtl:space-x-reverse text-sm">
            {links.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "flex grow items-center justify-center gap-1 rounded-md py-2 px-3 hover:bg-background md:flex-none md:justify-start md:p-2 md:px-3",
                    {
                      "bg-background": pathname === link.href,
                    }
                  )}
                >
                  <LinkIcon className="w-4" />
                  <p className="hidden md:block">{link.name}</p>
                </Link>
              );
            })}
          </div>
          <ThemeToggler />
        </div>
      </div>
    </nav>
  );
}
