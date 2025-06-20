export interface Product {
  id: string;
  name: string;
  description: string;
  mrp: number;
  code: string;
  barcode: string;
  costPriceCode: string; // New field
  lowInventoryFactor: number;
  currentStock: number;
}

export type ProductFormData = Omit<Product, 'id' | 'currentStock'>;

export type SellProductFormData = {
  barcode: string;
  quantity: number;
};
