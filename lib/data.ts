import { wagmiConfig } from "@/wagmi.config";
import { readContract, prepareWriteContract } from "@wagmi/core";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;
import { unstable_noStore as noStore } from "next/cache";

export async function readContractMethod(functionName: string, args?: any[]) {
  noStore();
  try {
    const config = await prepareWriteContract({
      abi: abi,
      address: VowedOnChainAddress as `0x${string}`,
      functionName: "getEngaged",
      args: ["0xDEA14b696560Ae12bB3809d3E05ad525952cAa3c"],
    });
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
