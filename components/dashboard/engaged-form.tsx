"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Gem } from "lucide-react";
import { isAddress } from "viem";
import { useContractWrite } from "wagmi";
import artifact from "@/artifacts/VowedOnChain.json";
import contractAddress from "@/artifacts/contract-address.json";
import { BLOCKCHAIN_CONSTANTS } from "@/lib/constants";
import { useState } from "react";
const { abi } = artifact;
const { VowedOnChainAddress } = contractAddress;
import { useDebounce } from "use-debounce";

export default function EngagedForm() {
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

  const handleSubmit = () => {
    if (!isAddress(debouncedSpouseAddress)) {
      setFormError("Please enter a valid wallet address!");
      return;
    }
    console.log(debouncedSpouseAddress);
    write?.();
  };

  return (
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
          Let's Engaged{" "}
          {isLoading ? (
            <Gem className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <Gem className="ml-2 h-4 w-4" />
          )}
        </Button>
      </div>
      {isSuccess && (
        <div className="text-sm text-gray-600 italic">
          Congratulations! You are now engaged!
          <div>Transaction Hash: {data?.hash}</div>
        </div>
      )}
      <div className="text-sm text-destructive italic">
        {isError && `Blockchain Transaction Error!`}
        {formError}
      </div>
    </div>
  );
}
