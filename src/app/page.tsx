import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, ArchiveRestore, ShoppingCart, PackageSearch } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-center mb-12">
        <PackageSearch size={64} className="mx-auto mb-4 text-primary" />
        <h1 className="text-5xl font-bold font-headline text-primary">Welcome to Thok Wali Shop</h1>
        <p className="text-xl text-muted-foreground mt-2">Your streamlined inventory management solution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg">
          <CardHeader className="items-center text-center">
            <PlusCircle className="h-12 w-12 text-primary mb-3" />
            <CardTitle className="font-headline text-2xl">Add Product</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">Easily add new products to your inventory system.</p>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <Link href="/add-product">
                Add Product
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg">
          <CardHeader className="items-center text-center">
            <ArchiveRestore className="h-12 w-12 text-primary mb-3" />
            <CardTitle className="font-headline text-2xl">Low Inventory</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">View products that are running low on stock.</p>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <Link href="/low-inventory">
                View Low Stock
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-lg">
          <CardHeader className="items-center text-center">
            <ShoppingCart className="h-12 w-12 text-primary mb-3" />
            <CardTitle className="font-headline text-2xl">Sell Product</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">Record sales and update your stock levels quickly.</p>
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
              <Link href="/sell-product">
                Sell Product
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
