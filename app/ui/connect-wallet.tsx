"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Wallet } from "lucide-react";
import { useConnect } from "wagmi";
import WalletOption from "./wallet-option";

export default function ConnectWallet() {
  const { connectors, connect } = useConnect();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <span className="hidden md:inline-block">Connect Wallet</span>
          <Wallet className="md:ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col justify-center gap-y-3">
          {connectors.map((connector) => (
            <WalletOption
              key={connector.uid}
              connector={connector}
              onClick={() => connect({ connector })}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
