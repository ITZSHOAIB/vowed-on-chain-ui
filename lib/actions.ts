"use server";

import { wagmiConfig } from "@/wagmi.config";
import { prepareWriteContract, writeContract } from "@wagmi/core";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;

export async function writeContractMethod(
  functionName: string,
  args: any[],
  path: string
) {
  try {
    const config = await prepareWriteContract({
      abi: abi,
      address: VowedOnChainAddress as `0x${string}`,
      functionName: "getEngaged",
      args: ["0xDEA14b696560Ae12bB3809d3E05ad525952cAa3c"],
    });
    const result = await writeContract(config);
    console.log(result);
  } catch (error) {
    console.error("Contract Error: ", error);
    // throw new Error("Failed to write to contract.");
  }

  revalidatePath(path);
  redirect(path);
}
