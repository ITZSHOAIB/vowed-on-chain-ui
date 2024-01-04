import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function Navbar() {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a
            href="https://flowbite.com"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              VowedOnChain
            </span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Button>
              <span className="hidden md:inline-block">Connect Wallet</span>
              <Wallet className="md:ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
