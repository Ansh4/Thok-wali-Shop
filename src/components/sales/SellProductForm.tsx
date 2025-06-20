"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useState, useTransition, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { sellProductSchema } from "@/lib/validators";
import { sellProductAction, fetchProductByBarcodeAction } from "@/lib/actions";
import BarcodeScannerDialog from "@/components/shared/BarcodeScannerDialog";
import type { Product } from "@/types";
import { ScanBarcodeIcon, ShoppingCart, Package, Info, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type SellProductFormValues = z.infer<typeof sellProductSchema>;

export default function SellProductForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [barcodeError, setBarcodeError] = useState<string | null>(null);
  const [isFetchingProduct, setIsFetchingProduct] = useState(false);

  const form = useForm<SellProductFormValues>({
    resolver: zodResolver(sellProductSchema),
    defaultValues: {
      barcode: "",
      quantity: 1,
    },
  });

  const barcodeValue = form.watch("barcode");

  useEffect(() => {
    setScannedProduct(null); // Reset product info when barcode changes
    setBarcodeError(null);
    if (barcodeValue && barcodeValue.length >= 5) { // Assuming min barcode length is 5
      const fetchProduct = async () => {
        setIsFetchingProduct(true);
        const product = await fetchProductByBarcodeAction(barcodeValue);
        if (product) {
          setScannedProduct(product);
          setBarcodeError(null);
        } else {
          setScannedProduct(null);
          setBarcodeError("Product with this barcode not found.");
        }
        setIsFetchingProduct(false);
      };
      // Debounce or delay fetching if needed, for now direct fetch
      fetchProduct();
    }
  }, [barcodeValue]);


  function onSubmit(data: SellProductFormValues) {
    if (!scannedProduct) {
      toast({
        title: "Error",
        description: "No product selected. Please scan or enter a valid barcode.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const result = await sellProductAction(data);
      if (result.success && result.product) {
        toast({
          title: "Success!",
          description: `${result.message} New stock for ${result.product.name}: ${result.product.currentStock}`,
        });
        setScannedProduct(result.product); // Update displayed stock
        form.reset({ barcode: data.barcode, quantity: 1 }); // Keep barcode, reset qty
      } else {
        toast({
          title: "Error",
          description: result.message || "Could not sell product.",
          variant: "destructive",
        });
        if (result.errors) {
           result.errors.forEach(err => {
            form.setError(err.path[0] as keyof SellProductFormValues, { message: err.message });
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
      <Card className="w-full max-w-xl mx-auto shadow-xl rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary flex items-center gap-2">
            <ShoppingCart className="h-8 w-8" /> Sell Product
          </CardTitle>
          <CardDescription>Scan or enter product barcode, then specify quantity to sell.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Barcode</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="Scan or enter barcode" {...field} />
                      </FormControl>
                      <Button type="button" variant="outline" onClick={() => setIsScannerOpen(true)} className="shrink-0">
                        <ScanBarcodeIcon className="mr-2 h-4 w-4" /> Scan
                      </Button>
                    </div>
                    {isFetchingProduct && <p className="text-sm text-muted-foreground flex items-center gap-1 pt-1"><Loader2 className="h-4 w-4 animate-spin" /> Checking barcode...</p>}
                    <FormMessage />
                    {barcodeError && !isFetchingProduct && <p className="text-sm font-medium text-destructive pt-1">{barcodeError}</p>}
                  </FormItem>
                )}
              />

              {scannedProduct && (
                <Alert className="bg-accent/20 border-accent/50 shadow-sm rounded-lg">
                  <Package className="h-5 w-5 text-accent" />
                  <AlertTitle className="font-headline text-accent">{scannedProduct.name}</AlertTitle>
                  <AlertDescription>
                    Current Stock: {scannedProduct.currentStock} | MRP: ${scannedProduct.mrp.toFixed(2)}
                  </AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" step="1" placeholder="e.g., 1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending || !scannedProduct || isFetchingProduct} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sell Product
              </Button>
            </form>
          </Form>
        </CardContent>
         {scannedProduct && scannedProduct.currentStock <= scannedProduct.lowInventoryFactor && (
          <CardFooter>
             <Alert variant="destructive" className="w-full text-sm">
              <Info className="h-4 w-4"/>
              <AlertTitle>Low Stock Warning!</AlertTitle>
              <AlertDescription>
                This product will be critically low or out of stock after this sale.
              </AlertDescription>
            </Alert>
          </CardFooter>
        )}
      </Card>
      <BarcodeScannerDialog
        open={isScannerOpen}
        onOpenChange={setIsScannerOpen}
        onScanComplete={handleBarcodeScanned}
      />
    </>
  );
}
