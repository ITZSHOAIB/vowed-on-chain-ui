"use client";
import { useContractRead, useWalletClient } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import EngagedForm from "./engaged-form";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
import { Skeleton } from "../ui/skeleton";
import { BLOCKCHAIN_CONSTANTS, MarriageStatus } from "@/lib/constants";
import UpdateEngaged from "./update-engaged";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;

export default function MarriageAction() {
  const { data: walletClient } = useWalletClient();
  const { data, status } = useContractRead({
    abi: abi,
    address: VowedOnChainAddress as `0x${string}`,
    functionName: "getMaritalStatus",
    account: walletClient?.account,
  });

  return (
    <>
      {(!walletClient || !status) && (
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-full h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex w-full max-w-xl items-start gap-4 flex-col md:flex-row md:items-center">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-1/3 h-10" />
          </CardContent>
        </Card>
      )}
      {walletClient && status === BLOCKCHAIN_CONSTANTS.STATUS.ERROR && (
        <Card>
          <CardHeader>
            <CardTitle>Error!</CardTitle>
          </CardHeader>
        </Card>
      )}
      {walletClient && status === BLOCKCHAIN_CONSTANTS.STATUS.SUCCESS && (
        <>
          {data === MarriageStatus.Single && <EngagedForm />}
          {data === MarriageStatus.Engaged && <UpdateEngaged />}
          {data === MarriageStatus.Married && <span>Married</span>}
          {data === MarriageStatus.Divorced && <span>Divorced</span>}
        </>
      )}
    </>
  );
}
