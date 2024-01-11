"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import EngagedForm from "./engaged-form";

export default function Engaged() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Engaged</CardTitle>
      </CardHeader>
      <CardContent>
        <EngagedForm />
      </CardContent>
    </Card>
  );
}
