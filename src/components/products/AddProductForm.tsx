"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addProductSchema } from "@/lib/validators";
import { createProductAction } from "@/lib/actions";
import BarcodeScannerDialog from "@/components/shared/BarcodeScannerDialog";
import { ScanBarcodeIcon, Loader2, Tag } from "lucide-react";

type AddProductFormValues = z.infer<typeof addProductSchema>;

export default function AddProductForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: "",
      description: "",
      mrp: 0,
      code: "",
      barcode: "",
      costPriceCode: "",
      lowInventoryFactor: 0,
    },
  });

  function onSubmit(data: AddProductFormValues) {
    startTransition(async () => {
      const result = await createProductAction(data);
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message || "Could not add product.",
          variant: "destructive",
        });
        if (result.errors) {
          result.errors.forEach(err => {
            form.setError(err.path[0] as keyof AddProductFormValues, { message: err.message });
          });
        }
      }
    });
  }

  const handleBarcodeScanned = (scannedBarcode: string) => {
    form.setValue("barcode", scannedBarcode, { shouldValidate: true });
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Organic Apples" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Detailed description of the product..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="mrp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MRP (Max Retail Price)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g., 2.99" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Code (SKU)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ORG-APL-001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
               <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Barcode</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="e.g., 1234567890123" {...field} />
                      </FormControl>
                      <Button type="button" variant="outline" onClick={() => setIsScannerOpen(true)} className="shrink-0">
                        <ScanBarcodeIcon className="mr-2 h-4 w-4" /> Scan
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <div className="grid md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="costPriceCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost Price / Less Code</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., C10 or L5" {...field} />
                      </FormControl>
                       <FormDescription>
                        Code to identify cost price or less percentage.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lowInventoryFactor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Low Inventory Factor</FormLabel>
                      <FormControl>
                        <Input type="number" step="1" placeholder="e.g., 10" {...field} />
                      </FormControl>
                      <FormDescription>
                        Minimum quantity to trigger low inventory warning.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isPending} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Product
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <BarcodeScannerDialog
        open={isScannerOpen}
        onOpenChange={setIsScannerOpen}
        onScanComplete={handleBarcodeScanned}
      />
    </>
  );
}
