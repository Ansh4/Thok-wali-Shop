import { z } from 'zod';

export const addProductSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters." }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500),
  mrp: z.coerce.number().positive({ message: "MRP must be a positive number." }),
  code: z.string().min(2, { message: "Product code must be at least 2 characters." }).max(50),
  barcode: z.string().min(5, { message: "Barcode must be at least 5 characters." }).max(50),
  costPriceCode: z.string().min(1, { message: "Cost Price/Less Code cannot be empty."}).max(50, {message: "Cost Price/Less Code must be at most 50 characters."}),
  lowInventoryFactor: z.coerce.number().int().min(0, { message: "Low inventory factor must be a non-negative integer." }),
});

export const sellProductSchema = z.object({
  barcode: z.string().min(5, { message: "Barcode must be at least 5 characters." }).max(50),
  quantity: z.coerce.number().int().positive({ message: "Quantity must be a positive integer." }),
});
