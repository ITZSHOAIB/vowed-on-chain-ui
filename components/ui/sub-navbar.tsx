"use client";
import clsx from "clsx";
import { HomeIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export function SubNavbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-50 dark:bg-gray-700">
      <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
          <div className="flex flex-row font-medium mt-0 space-x-2 rtl:space-x-reverse text-sm">
            {links.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    "flex text-muted-foreground grow items-center justify-center gap-1 bg-gray-50 p-2 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                    {
                      "bg-sky-100": pathname === link.href,
                    }
                  )}
                >
                  <LinkIcon className="w-4" />
                  <p className="hidden md:block">{link.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
