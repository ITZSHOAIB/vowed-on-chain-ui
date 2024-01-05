import { http, createConfig, cookieStorage, createStorage } from "wagmi";
import { base, mainnet } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";

const projectId = `${process.env.WALLETCONNECT_PROJECT_ID}`;

export const wagmiConfig = createConfig({
  chains: [mainnet, base],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
  },
});
