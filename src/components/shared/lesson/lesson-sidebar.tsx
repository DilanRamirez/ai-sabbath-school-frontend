"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface LessonSidebarProps {
  selectedDay: number;
  // eslint-disable-next-line no-unused-vars
  onSelectDay: (dayIndex: number) => void;
}

const DAY_LABELS = ["S", "D", "L", "M", "M", "J", "V"];

export function LessonSidebar({
  selectedDay,
  onSelectDay,
}: LessonSidebarProps) {
  return (
    <div className=" pb-5">
      <div className="p-4 bg-white rounded shadow">
        <h3 className="font-bold mb-2">Navegación de Lección</h3>
        <div className="grid grid-cols-7 gap-2">
          {DAY_LABELS.map((label, i) => (
            <Button
              key={i}
              variant={selectedDay === i ? "default" : "outline"}
              className="w-full h-10"
              onClick={() => onSelectDay(i)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
