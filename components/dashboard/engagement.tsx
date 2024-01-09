import { Gem } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import EngagementForm from "./engagement-form";

export default function Engagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Engaged</CardTitle>
      </CardHeader>
      <CardContent>
        <EngagementForm />
      </CardContent>
    </Card>
  );
}
