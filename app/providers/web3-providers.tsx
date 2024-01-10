"use client";

import * as React from "react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import { WagmiConfig } from "wagmi";
import { chains, wagmiConfig } from "@/wagmi.config";
import { SessionProvider } from "next-auth/react";

const appInfo = {
  appName: "VowedOnChain",
};

export function Web3Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const getSiweMessageOptions: GetSiweMessageOptions = () => ({
    statement: "Sign in to The VowedOnChain App",
  });

  return (
    <WagmiConfig config={wagmiConfig}>
      <SessionProvider refetchInterval={0}>
        <RainbowKitSiweNextAuthProvider
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <RainbowKitProvider chains={chains} appInfo={appInfo}>
            {mounted && children}
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
}
