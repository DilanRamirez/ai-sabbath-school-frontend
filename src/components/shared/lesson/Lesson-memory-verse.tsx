"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import React from "react";

interface LessonMemoryVerseProps {
  texts: string;
  // eslint-disable-next-line no-unused-vars
  onSelectVerse: (ref: string) => void;
}

export function LessonMemoryVerse({ texts }: LessonMemoryVerseProps) {
  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold mb-1">Versículo de Memoria</h3>
      <Card className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer p-2 rounded-lg shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-2">
            <BookOpen className="h-5 w-5 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium">{texts}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
