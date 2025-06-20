import type { Product, ProductFormData } from '@/types';

let products: Product[] = [
  { id: '1', name: 'Sample Product A', description: 'This is a sample product.', mrp: 100, code: 'SP001', barcode: '1234567890123', costPriceCode: 'C10', lowInventoryFactor: 5, currentStock: 10 },
  { id: '2', name: 'Sample Product B', description: 'Another great sample item.', mrp: 25.50, code: 'SP002', barcode: '9876543210987', costPriceCode: 'L5', lowInventoryFactor: 10, currentStock: 8 },
  { id: '3', name: 'Low Stock Item C', description: 'This item is running low.', mrp: 49.99, code: 'LS003', barcode: '1122334455667', costPriceCode: 'C15', lowInventoryFactor: 15, currentStock: 12 },
];

// Simulate database interactions with a delay
const simulateDBDelay = () => new Promise(resolve => setTimeout(resolve, 300));

export async function getProducts(): Promise<Product[]> {
  await simulateDBDelay();
  return [...products];
}

export async function getProductByBarcode(barcode: string): Promise<Product | undefined> {
  await simulateDBDelay();
  return products.find(p => p.barcode === barcode);
}

export async function addProduct(productData: ProductFormData): Promise<Product> {
  await simulateDBDelay();
  const newProduct: Product = {
    ...productData,
    id: String(Date.now() + Math.random()), // Simple unique ID
    currentStock: 0, // New products start with 0 stock, or could be an input
  };
  products.push(newProduct);
  return newProduct;
}

export async function getLowInventoryProducts(): Promise<Product[]> {
  await simulateDBDelay();
  return products.filter(p => p.currentStock <= p.lowInventoryFactor);
}

export async function sellProductItem(barcode: string, quantitySold: number): Promise<{ success: boolean; message: string; product?: Product }> {
  await simulateDBDelay();
  const productIndex = products.findIndex(p => p.barcode === barcode);
  if (productIndex === -1) {
    return { success: false, message: 'Product not found.' };
  }
  if (products[productIndex].currentStock < quantitySold) {
    return { success: false, message: `Not enough stock. Available: ${products[productIndex].currentStock}` };
  }
  products[productIndex].currentStock -= quantitySold;
  return { success: true, message: 'Product sold successfully.', product: products[productIndex] };
}

// For demonstration, allow updating stock directly (e.g. after adding a product one might update its stock)
export async function updateProductStock(productId: string, newStock: number): Promise<Product | undefined> {
  await simulateDBDelay();
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex > -1) {
    products[productIndex].currentStock = newStock;
    return products[productIndex];
  }
  return undefined;
}
