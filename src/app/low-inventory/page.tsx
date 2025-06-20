import LowInventoryDisplay from "@/components/products/LowInventoryDisplay";
import { getLowInventoryProducts } from "@/lib/data";
import { ArchiveRestore } from "lucide-react";

export const revalidate = 0; // Revalidate on every request

export default async function LowInventoryPage() {
  const lowStockProducts = await getLowInventoryProducts();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <ArchiveRestore size={48} className="mx-auto mb-3 text-primary" />
        <h1 className="text-4xl font-bold font-headline text-primary">Low Inventory Products</h1>
        <p className="text-lg text-muted-foreground mt-1">Products that need your attention for restocking.</p>
      </div>
      <LowInventoryDisplay products={lowStockProducts} />
    </div>
  );
}
