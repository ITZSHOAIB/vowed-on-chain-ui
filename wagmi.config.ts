import {
  Chain,
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, configureChains, sepolia } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const projectId = `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`;

const localhost: Chain = {
  id: 31337,
  name: "localhost",
  network: "localhost",
  nativeCurrency: {
    decimals: 18,
    name: "VOC",
    symbol: "VOC",
  },
  rpcUrls: {
    public: { http: ["http://localhost:8545"] },
    default: { http: ["http://localhost:8545"] },
  },
};
export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    localhost,
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    zora,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
