import { wagmiConfig } from "@/wagmi.config";
import { readContract } from "@wagmi/core";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;
import { unstable_noStore as noStore } from "next/cache";

export async function readContractMethod(functionName: string, args?: any[]) {
  noStore();
  try {
    const result = await readContract(wagmiConfig, {
      abi: abi,
      address: VowedOnChainAddress as `0x${string}`,
      functionName,
      args,
    });
    return result;
  } catch (error) {
    console.error("Contract Error: ", error);
    throw new Error("Failed to read contract.");
  }
}
