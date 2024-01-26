"use client";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Gem, LinkIcon } from "lucide-react";
import { isAddress } from "viem";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
import { BLOCKCHAIN_CONSTANTS } from "@/lib/constants";
import { useState } from "react";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;
import { useDebounce } from "use-debounce";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { useRouter } from "next/navigation";

export default function EngagedForm() {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const [spouseAddress, setSpouseAddress] = useState("");
  const [debouncedSpouseAddress] = useDebounce(spouseAddress, 500);

  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    abi: abi,
    address: VowedOnChainAddress as `0x${string}`,
    functionName: "getEngaged",
    args: [
      isAddress(debouncedSpouseAddress)
        ? debouncedSpouseAddress
        : BLOCKCHAIN_CONSTANTS.ZERO_ADDRESS,
    ],
  });

  useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      router.refresh();
    },
  });

  const handleSubmit = () => {
    if (!isAddress(debouncedSpouseAddress)) {
      setFormError("Please enter a valid wallet address!");
      return;
    }
    write?.();
  };

  return (
    <Card className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
      <CardHeader>
        <CardTitle>Get Engaged</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex w-full max-w-xl items-start gap-4 flex-col md:flex-row md:items-center">
            <Input
              type="text"
              className="bg-white text-black"
              placeholder="Spouse's wallet address"
              onChange={(e) => {
                setSpouseAddress(e.target.value.trim());
                setFormError("");
              }}
              value={spouseAddress}
            />
            <Button
              disabled={!write || !!formError || isLoading}
              onClick={handleSubmit}
              className="bg-white text-black hover:bg-gray-200"
            >
              Let's Engaged
              {isLoading ? (
                <Gem className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Gem className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
          {isSuccess && (
            <div className="text-sm text-green-300 italic">
              Congratulations! You are now engaged!
              <div className="flex items-center gap-1 bg-black bg-opacity-10 p-2 mt-2 text-white hover:text-gray-200 rounded-md overflow-auto">
                <LinkIcon size={14} />
                <a href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>
                  Check on Polygon Scan
                </a>
              </div>
            </div>
          )}
          <div className="text-sm italic">
            {isError && `Blockchain Transaction Error!`}
            {formError}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
