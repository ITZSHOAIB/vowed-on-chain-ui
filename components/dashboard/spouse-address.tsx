import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Copy, User } from "lucide-react";
import { readContractMethod } from "@/lib/data";
import { truncateAddress } from "@/lib/utils";
import { Button } from "../ui/button";

export default async function SpouseAddress() {
  const spouseAddress = await readContractMethod("getSpouseAddress");

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-nowrap flex items-center gap-2">
            Spouse
            <User />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span>{truncateAddress(spouseAddress.toString())}</span>
          <Button variant="ghost" size="icon" className="ml-1">
            <Copy size="14" />
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
