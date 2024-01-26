"use client";
import { LinkIcon, PenLine } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
import { BLOCKCHAIN_CONSTANTS } from "@/lib/constants";
import { isAddress } from "viem";
import { useRouter } from "next/navigation";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;

export default function UpdateEngaged() {
  const router = useRouter();
  const [formError, setFormError] = useState("");
  const [spouseAddress, setSpouseAddress] = useState("");
  const [debouncedSpouseAddress] = useDebounce(spouseAddress, 500);

  const { data, isLoading, isSuccess, isError, write } = useContractWrite({
    abi: abi,
    address: VowedOnChainAddress as `0x${string}`,
    functionName: "updateSpouseAddress",
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

  console.log(isSuccess);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Spouse's Address</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex w-full max-w-xl items-start gap-4 flex-col md:flex-row md:items-center">
            <Input
              type="text"
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
            >
              Update
              {isLoading ? (
                <PenLine className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <PenLine className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
          {isSuccess && (
            <div className="text-sm text-green-700 italic">
              Congratulations! You are now engaged!
              <div className="flex  items-center gap-1 bg-secondary p-2 mt-2 text-primary rounded-md overflow-auto">
                <LinkIcon size={14} />
                <a href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>
                  Check on Polygon Scan
                </a>
              </div>
            </div>
          )}
          <div className="text-sm text-destructive italic">
            {isError && `Blockchain Transaction Error!`}
            {formError}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
