"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Gift } from "lucide-react";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
import { useContractRead, useWalletClient } from "wagmi";
import { BLOCKCHAIN_CONSTANTS } from "@/lib/constants";
import { Skeleton } from "../ui/skeleton";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;

export default function GiftBalance() {
  // const balance = await readContractMethod("getGiftBalance");
  const { data: walletClient } = useWalletClient();
  const { data, status } = useContractRead({
    abi: abi,
    address: VowedOnChainAddress as `0x${string}`,
    functionName: "getGiftBalance",
    account: walletClient?.account,
  });

  return (
    <>
      <Card className="w-full bg-green-500 bg-opacity-10 border-2 border-green-500 border-opacity-30">
        <CardHeader>
          <CardTitle className="text-xl text-nowrap flex items-center gap-2">
            Gift Balance
            <Gift />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(!walletClient || !status) && <Skeleton className="w-full h-6" />}
          {walletClient && status === BLOCKCHAIN_CONSTANTS.STATUS.ERROR && (
            <span>Error!</span>
          )}
          {walletClient && status === BLOCKCHAIN_CONSTANTS.STATUS.SUCCESS && (
            <span>{data.toString() / 10 ** 18}</span>
          )}
        </CardContent>
      </Card>
    </>
  );
}
