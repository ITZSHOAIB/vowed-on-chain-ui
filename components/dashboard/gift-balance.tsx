import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Gift } from "lucide-react";
import { readContractMethod } from "@/lib/data";

export default async function GiftBalance() {
  const balance = await readContractMethod("getGiftBalance");

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-nowrap flex items-center gap-2">
            Gift Balance
            <Gift />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span>{balance.toString() / 10 ** 18}</span>
        </CardContent>
      </Card>
    </>
  );
}
