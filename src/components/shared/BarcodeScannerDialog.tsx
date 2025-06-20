"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScanBarcode } from 'lucide-react';

interface BarcodeScannerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScanComplete: (barcode: string) => void;
}

export default function BarcodeScannerDialog({ open, onOpenChange, onScanComplete }: BarcodeScannerDialogProps) {
  const [barcode, setBarcode] = useState('');

  const handleSubmit = () => {
    if (barcode.trim()) {
      onScanComplete(barcode.trim());
      setBarcode(''); // Reset for next scan
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-headline">
            <ScanBarcode className="text-primary" />
            Scan Barcode (Simulation)
          </DialogTitle>
          <DialogDescription>
            Enter the barcode manually. In a real app, this would use your device camera.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="barcode-input" className="text-right">
              Barcode
            </Label>
            <Input
              id="barcode-input"
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              className="col-span-3"
              placeholder="e.g., 1234567890123"
              autoFocus
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Submit Barcode
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
