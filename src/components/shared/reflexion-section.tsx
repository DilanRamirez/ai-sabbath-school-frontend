"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Share2, Check } from "lucide-react";

interface ReflectionSectionProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (v: string) => void;
  onMarkStudied: () => void;
  isCompleted: boolean;
}

export function ReflectionSection({
  value,
  onChange,
  onMarkStudied,
  isCompleted,
}: ReflectionSectionProps) {
  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-xl font-bold mb-4">Mi Reflexión</h2>
      <Textarea
        placeholder="Escribe tus pensamientos..."
        className="min-h-32 mb-4"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex justify-between">
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" /> Compartir
        </Button>
        <Button
          onClick={onMarkStudied}
          disabled={isCompleted}
          className="gap-2"
        >
          <Check className="h-4 w-4" />
          {isCompleted ? "Completado" : "Marcar como Estudiado"}
        </Button>
      </div>
    </div>
  );
}
