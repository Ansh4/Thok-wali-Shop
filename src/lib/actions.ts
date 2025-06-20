"use server";

import { z } from 'zod';
import { addProductSchema, sellProductSchema } from './validators';
import { addProduct as dbAddProduct, getProductByBarcode, sellProductItem as dbSellProductItem } from './data';
import type { Product, ProductFormData } from '@/types';
import { revalidatePath } from 'next/cache';

export async function createProductAction(
  data: ProductFormData
): Promise<{ success: boolean; message: string; product?: Product; errors?: z.ZodIssue[] }> {
  const validationResult = addProductSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, message: "Validation failed.", errors: validationResult.error.errors };
  }

  try {
    const newProduct = await dbAddProduct(validationResult.data);
    revalidatePath('/');
    revalidatePath('/low-inventory');
    revalidatePath('/add-product');
    return { success: true, message: "Product added successfully!", product: newProduct };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, message: "Failed to add product. Please try again." };
  }
}

export async function sellProductAction(
  data: { barcode: string; quantity: number }
): Promise<{ success: boolean; message: string; product?: Product; errors?: z.ZodIssue[] }> {
  const validationResult = sellProductSchema.safeParse(data);

  if (!validationResult.success) {
    return { success: false, message: "Validation failed.", errors: validationResult.error.errors };
  }

  try {
    const result = await dbSellProductItem(validationResult.data.barcode, validationResult.data.quantity);
    if (result.success) {
      revalidatePath('/low-inventory');
      revalidatePath('/sell-product');
    }
    return result;
  } catch (error) {
    console.error("Error selling product:", error);
    return { success: false, message: "Failed to sell product. An unexpected error occurred." };
  }
}

export async function fetchProductByBarcodeAction(barcode: string): Promise<Product | null> {
  if (!barcode || barcode.trim() === "") {
    return null;
  }
  try {
    const product = await getProductByBarcode(barcode);
    return product || null;
  } catch (error) {
    console.error("Error fetching product by barcode:", error);
    return null;
  }
}
