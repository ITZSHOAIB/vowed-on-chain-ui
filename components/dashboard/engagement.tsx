import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
