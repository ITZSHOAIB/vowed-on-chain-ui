"use client";
import { BLOCKCHAIN_CONSTANTS, MarriageStatus } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Heart } from "lucide-react";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
import { useContractRead } from "wagmi";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;

export default function MartialStatus() {
  // const status = await readContractMethod("getMaritalStatus");
  const { data, status } = useContractRead({
    abi: abi,
    address: VowedOnChainAddress as `0x${string}`,
    functionName: "getMaritalStatus",
  });

  console.log(data);

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-nowrap flex items-center gap-2">
            Marital Status
            <Heart />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {status === BLOCKCHAIN_CONSTANTS.STATUS.LOADING && (
            <span>Loading...</span>
          )}
          {status === BLOCKCHAIN_CONSTANTS.STATUS.ERROR && <span>Error</span>}
          {status === BLOCKCHAIN_CONSTANTS.STATUS.SUCCESS && (
            <>
              {data === MarriageStatus.Single && <span>Single</span>}
              {data === MarriageStatus.Engaged && <span>Engaged</span>}
              {data === MarriageStatus.Married && <span>Married</span>}
              {data === MarriageStatus.Divorced && <span>Divorced</span>}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
