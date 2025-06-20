import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import { AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LowInventoryDisplayProps {
  products: Product[];
}

export default function LowInventoryDisplay({ products }: LowInventoryDisplayProps) {
  if (products.length === 0) {
    return (
      <Alert className="max-w-lg mx-auto bg-green-50 border-green-200 shadow-md rounded-lg">
        <Info className="h-5 w-5 text-green-600" />
        <AlertTitle className="font-headline text-green-700">All Good!</AlertTitle>
        <AlertDescription className="text-green-600">
          No products are currently low on stock. Keep up the good work!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
       <Alert variant="destructive" className="bg-destructive/10 border-destructive/30 shadow-md rounded-lg">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <AlertTitle className="font-headline text-destructive">Attention Needed</AlertTitle>
        <AlertDescription className="text-destructive/80">
          The following products have reached their low inventory threshold. Consider restocking soon.
        </AlertDescription>
      </Alert>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
