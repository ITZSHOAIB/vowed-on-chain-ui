"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Gem } from "lucide-react";
import { isAddress } from "viem";
import { writeContractMethod } from "@/lib/actions";

const FormSchema = z.object({
  address: z
    .string()
    .trim()
    .refine((data) => isAddress(data), {
      message: "Must be a valid wallet address.",
    }),
});

export default function EngagementForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      address: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      //   console.log(data.address);
      await writeContractMethod("getEngaged", [data.address], "/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spouse's Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="Spouse's Wallet Address" {...field} />
              </FormControl>
              <FormDescription>Enter the address carefully...</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          Engaged <Gem size="16" className="ml-2" />
        </Button>
      </form>
    </Form>
  );
}
