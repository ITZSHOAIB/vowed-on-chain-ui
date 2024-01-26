"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Copy, User } from "lucide-react";
import { truncateAddress } from "@/lib/utils";
import { Button } from "../ui/button";
import { BLOCKCHAIN_CONSTANTS } from "@/lib/constants";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
import { useContractRead, useWalletClient } from "wagmi";
import { Skeleton } from "../ui/skeleton";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;

export default function SpouseAddress() {
  // const spouseAddress = await readContractMethod("getSpouseAddress");
  const { data: walletClient } = useWalletClient();
  const { data, status } = useContractRead({
    abi: abi,
    address: VowedOnChainAddress as `0x${string}`,
    functionName: "getSpouseAddress",
    account: walletClient?.account,
  });

  return (
    <>
      <Card className="w-full bg-yellow-500 bg-opacity-10 border-2 border-black-500 border-opacity-30">
        <CardHeader>
          <CardTitle className="text-xl text-nowrap flex items-center gap-2">
            Spouse
            <User />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {(!walletClient || !status) && <Skeleton className="w-full h-6" />}
          {walletClient && status === BLOCKCHAIN_CONSTANTS.STATUS.ERROR && (
            <span>Error!</span>
          )}
          {walletClient && status === BLOCKCHAIN_CONSTANTS.STATUS.SUCCESS && (
            <>
              {data === BLOCKCHAIN_CONSTANTS.ZERO_ADDRESS ? (
                <>
                  <span className="text-gray-500 italic">No spouse</span>
                </>
              ) : (
                <>
                  <span>{truncateAddress(data.toString())}</span>
                  <Button variant="ghost" size="icon" className="ml-1 h-6 w-6">
                    <Copy size="14" />
                  </Button>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
