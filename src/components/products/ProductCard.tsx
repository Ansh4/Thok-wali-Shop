import type { Product } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, TrendingDown, DollarSign, Tag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.currentStock <= product.lowInventoryFactor;

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-headline text-primary flex items-center gap-2">
            <Package size={24} /> {product.name}
          </CardTitle>
          {isLowStock && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertTriangle size={14} /> Low Stock
            </Badge>
          )}
        </div>
        <CardDescription className="pt-1">{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <DollarSign size={16} className="text-green-500"/> 
          <span>MRP:</span> <span className="font-semibold text-foreground">${product.mrp.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Package size={16} className="text-blue-500"/> 
          <span>Stock:</span> <span className={`font-semibold ${isLowStock ? 'text-destructive' : 'text-foreground'}`}>{product.currentStock}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span>Code:</span> <span className="font-semibold text-foreground">{product.code}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <TrendingDown size={16} className="text-orange-500"/> 
          <span>Low Factor:</span> <span className="font-semibold text-foreground">{product.lowInventoryFactor}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground"> {/* Barcode now takes half width */}
          <span>Barcode:</span> <span className="font-semibold text-foreground">{product.barcode}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground"> {/* New Cost Price Code field */}
          <Tag size={16} className="text-purple-500"/>
          <span>Cost Code:</span> <span className="font-semibold text-foreground">{product.costPriceCode}</span>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground pt-3">
        Product ID: {product.id}
      </CardFooter>
    </Card>
  );
}
