"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Sparkles } from "lucide-react";

interface LessonContentProps {
  paragraphs: string[];
  // eslint-disable-next-line no-unused-vars
  onExplain: (paragraph: string) => void;
}

// eslint-disable-next-line no-unused-vars
export function LessonContent({ paragraphs, onExplain }: LessonContentProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {paragraphs.map((p, i) => (
        <div key={i} className="relative group">
          {p.includes("[notas]") ? (
            <Card
              key={i}
              className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer p-2 rounded-lg shadow-md"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <BookOpen className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {p.replace("[notas]", "").trim()}
                    </p>

                    <div className="mt-2">
                      <textarea
                        id={`notes-${i}`}
                        rows={4}
                        className="
                          mt-1
                          block
                          w-full
                          rounded-lg
                          border
                          border-input
                          bg-background
                          px-3
                          py-2
                          text-sm
                          text-foreground
                          placeholder:text-muted-foreground
                          focus:outline-none
                          focus:ring-2
                          focus:ring-primary
                          focus:ring-offset-1
                          resize-y
                        "
                        placeholder="Agregar tus notas..."
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(to bottom, transparent, transparent 1.5em, rgba(0, 0, 0, 0.05) 1.5em, rgba(0, 0, 0, 0.05) 1.6em)",
                          lineHeight: "1.5em",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <p className="text-lg leading-relaxed mr-10">{p}</p>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
          >
            <Sparkles className="h-5 w-5" />
          </Button>

          {activeIndex === i && (
            <Card className="mt-4">
              <CardContent>
                <Tabs defaultValue="explain">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="explain">Explicar</TabsTrigger>
                    <TabsTrigger value="reflect">Reflexionar</TabsTrigger>
                    <TabsTrigger value="apply">Aplicar</TabsTrigger>
                  </TabsList>
                  <TabsContent value="explain" className="p-4">
                    <p>Explicación generada...</p>
                  </TabsContent>
                  {/* reflect & apply content */}
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
}
