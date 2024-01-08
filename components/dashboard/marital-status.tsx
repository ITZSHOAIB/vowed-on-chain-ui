import { MarriageStatus } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Heart } from "lucide-react";
import { readContractMethod } from "@/lib/data";

export default async function MartialStatus() {
  const status = await readContractMethod("getMaritalStatus");
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
          {status === MarriageStatus.Single && <span>Single</span>}
          {status === MarriageStatus.Engaged && <span>Engaged</span>}
          {status === MarriageStatus.Married && <span>Married</span>}
          {status === MarriageStatus.Divorced && <span>Divorced</span>}
        </CardContent>
      </Card>
    </>
  );
}
