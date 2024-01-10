// Will be used when Rainbowkit v2 available with Wagmi v2

import { readContract, getConfig } from "@wagmi/core";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;
import { unstable_noStore as noStore } from "next/cache";
// import { wagmiConfig } from "@/wagmi.config";

export async function readContractMethod(functionName: string, args?: any[]) {
  noStore();
  try {
    const rees = getConfig();
    console.log(rees);
    const result = await readContract({
      // ...wagmiConfig,
      abi: abi,
      address: VowedOnChainAddress as `0x${string}`,
      functionName,
      args,
      chainId: 31337,
    });
    return result;
  } catch (error) {
    console.error("Contract Error: ", error);
    throw new Error("Failed to read contract.");
  }
}
