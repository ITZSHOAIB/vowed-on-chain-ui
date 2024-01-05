import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import ConnectWallet from "./connect-wallet";

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
            <ConnectWallet />
          </div>
        </div>
      </nav>
    </>
  );
}
