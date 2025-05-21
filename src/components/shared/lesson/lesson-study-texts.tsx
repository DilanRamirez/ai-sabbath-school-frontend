"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface LessonStudyTextsProps {
  texts: string;
  // eslint-disable-next-line no-unused-vars
  onSelectVerse: (ref: string) => void;
}

export function LessonStudyTexts({
  texts,
  onSelectVerse,
}: LessonStudyTextsProps) {
  return (
    <div className="mb-5">
      <h3 className="text-lg font-semibold mb-1">
        Lee para el estudio de esta semana
      </h3>
      <div className="flex flex-wrap gap-2">
        {texts
          .split(";")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((verse, i) => (
            <Button
              key={i}
              variant="link"
              className="p-0 text-primary"
              onClick={() => onSelectVerse(verse)}
            >
              {verse}
            </Button>
          ))}
      </div>
    </div>
  );
}
