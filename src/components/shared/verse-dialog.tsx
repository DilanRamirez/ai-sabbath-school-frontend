"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface VerseDialogProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
  reference?: string;
  text?: string;
}

export function VerseDialog({
  open,
  onOpenChange,
  reference,
  text,
}: VerseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{reference}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="rvr1960">
          <TabsList className="grid grid-cols-1 mb-2">
            <TabsTrigger value="rvr1960">RVR 1960</TabsTrigger>
          </TabsList>
          <TabsContent value="rvr1960">
            <div className="max-h-48 overflow-y-auto p-2">
              <p>{text}</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
