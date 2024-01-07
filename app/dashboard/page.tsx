"use client";
import { useReadContract } from "wagmi";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;

export default function Dashboard() {
  const {
    data: data,
    error: error,
    isSuccess: success,
  } = useReadContract({
    abi: abi,
    address: VowedOnChainAddress as `0x${string}`,
    functionName: "getMaritalStatus",
  });
  console.log("contract gift balance ", data, error, success);
  return <></>;
}
