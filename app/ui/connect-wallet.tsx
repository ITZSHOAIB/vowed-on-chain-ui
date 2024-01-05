"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CircleUser, Unplug, Wallet } from "lucide-react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from "wagmi";
import WalletOption from "./wallet-option";

const truncateAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-6)}`;

export default function ConnectWallet() {
  const { connectors, connect } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return !isConnected ? (
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
  ) : (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">
          <span className="hidden md:inline-block">Connected</span>
          <Wallet className="md:ml-2 h-4 w-4 text-green-700" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex flex-col justify-center gap-y-3">
          <div className="flex gap-2">
            {ensAvatar ? (
              <img alt="ENS Avatar" src={ensAvatar} />
            ) : (
              <CircleUser />
            )}
            {address && (
              <>
                {ensName
                  ? `${ensName} (${truncateAddress(address)})`
                  : truncateAddress(address)}
              </>
            )}
          </div>
          <Button variant="destructive" onClick={() => disconnect()}>
            Disconnect <Unplug className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
