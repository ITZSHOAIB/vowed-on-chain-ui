import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Send } from "lucide-react";

export default function MarriageProposal() {
  return (
    <Card className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
      <CardHeader>
        <CardTitle>Send Marriage Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          You are about to send a marriage proposal to your fiance. Please check
          the spouse details before sending.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="bg-white text-black hover:bg-gray-200">
          Send Proposal <Send className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
