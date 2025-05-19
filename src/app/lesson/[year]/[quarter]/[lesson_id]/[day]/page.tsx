"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLessonById } from "@/store/slices/lesson/lesson-slice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AccessibilityIcon as PsychologyAlt,
  Check,
  Share2,
} from "lucide-react";

export default function LessonDayPage(props: {
  params: Promise<{
    year: string;
    quarter: string;
    lesson_id: string;
    day: string;
  }>;
}) {
  const { year, quarter, lesson_id, day } = React.use(props.params);
  const dispatch = useAppDispatch();
  const { currentLesson, loading } = useAppSelector((state) => state.lesson);
  const [activeAITool, setActiveAITool] = useState<string | null>(null);
  const [reflection, setReflection] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [openVerseDialog, setOpenVerseDialog] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<{
    reference: string;
    text: string;
  } | null>(null);

  useEffect(() => {
    if (lesson_id) {
      dispatch(fetchLessonById({ lesson_id, year, quarter }));
    }
  }, [lesson_id, year, quarter, dispatch]);

  // Determine selected day index
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  useEffect(() => {
    if (currentLesson) {
      let parsedIndex = parseInt(day, 10) - 1;
      let valid =
        !isNaN(parsedIndex) &&
        currentLesson.daily_sections &&
        currentLesson.daily_sections[parsedIndex];
      if (valid) {
        setSelectedDayIndex(parsedIndex);
      } else {
        // fallback to "Sábado"
        const sabadoIdx = currentLesson.daily_sections.findIndex(
          (d) => d.title && d.title.toLowerCase().includes("sábado"),
        );
        setSelectedDayIndex(sabadoIdx >= 0 ? sabadoIdx : 0);
      }
    }
  }, [day, currentLesson]);

  const handleAIToolClick = (tool: string) => {
    setActiveAITool(activeAITool === tool ? null : tool);
  };

  const handleVerseClick = (verse: { reference: string; text: string }) => {
    setSelectedVerse(verse);
    setOpenVerseDialog(true);
  };

  const markAsStudied = () => {
    setIsCompleted(true);
    // In a real app, this would update the Redux store or make an API call
  };

  if (loading || !currentLesson) {
    return <div className="p-8 text-center">Cargando lección...</div>;
  }

  const dayData =
    selectedDayIndex !== null && currentLesson.daily_sections
      ? currentLesson.daily_sections[selectedDayIndex]
      : null;

  if (!dayData) {
    return (
      <div className="p-8 text-center">No se encontró el día solicitado.</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Image */}
      <div
        className="relative w-full h-40"
        style={{
          background: "#333",
        }}
      >
        <div className="absolute inset-0 flex items-end">
          <div className="container p-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              {dayData.title}
            </h1>
            <p className="text-white/90">
              {currentLesson.week_start_date
                ? currentLesson.week_start_date
                : currentLesson.week_start_date}{" "}
              –{" "}
              {currentLesson.week_end_date
                ? currentLesson.week_end_date
                : currentLesson.week_end_date}
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6 p-2">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold mb-2">Navegación de Lección</h3>
            <div className="grid grid-cols-7 gap-2">
              {["S", "D", "L", "M", "M", "J", "V"].map((dayLabel, i) => (
                <Button
                  key={i}
                  variant={selectedDayIndex === i ? "default" : "outline"}
                  className="w-full h-10"
                  asChild
                >
                  <a href={`/lesson/${year}/${quarter}/${lesson_id}/${i + 1}`}>
                    {dayLabel}
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lesson Content */}
      <div className="container py-8 full-width">
        <h2 className="text-2xl font-bold mb-4">Estudio de la Lección</h2>
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {dayData.content &&
            dayData.content.map((paragraph, index) => (
              <div key={index} className="group relative">
                {paragraph.includes("[notas]") ? (
                  <>
                    {" "}
                    <p className="text-lg leading-relaxed whitespace-pre-line text-justify">
                      {paragraph.replace("[notas]", "").replace(/\n/g, " ")}
                    </p>{" "}
                    <Textarea
                      placeholder="Escribe tus notas..."
                      className="mt-2 p-2 border rounded bg-gray-50 font-mono"
                      onClick={() =>
                        handleVerseClick({
                          reference: "Juan 1:1",
                          text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.",
                        })
                      }
                      onChange={(e) => setReflection(e.target.value)}
                    />{" "}
                  </>
                ) : (
                  <p className="text-lg leading-relaxed whitespace-pre-line text-justify">
                    {paragraph.replace(/\n/g, " ")}
                  </p>
                )}{" "}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleAIToolClick(`paragraph-${index}`)}
                >
                  {" "}
                  <PsychologyAlt className="h-5 w-5" />{" "}
                </Button>{" "}
                {activeAITool === `paragraph-${index}` && (
                  <Card className="mt-4">
                    {" "}
                    <CardContent className="p-4">
                      {" "}
                      <Tabs defaultValue="explain">
                        {" "}
                        <TabsList className="grid w-full grid-cols-3">
                          {" "}
                          <TabsTrigger value="explain">
                            Explicar
                          </TabsTrigger>{" "}
                          <TabsTrigger value="reflect">Reflexionar</TabsTrigger>{" "}
                          <TabsTrigger value="apply">Aplicar</TabsTrigger>{" "}
                        </TabsList>{" "}
                        <TabsContent value="explain" className="p-4">
                          {" "}
                          <p>
                            Este párrafo destaca la importancia de Jesús como el
                            medio definitivo por el cual Dios se ha comunicado
                            con la humanidad.
                          </p>{" "}
                        </TabsContent>{" "}
                        <TabsContent value="reflect" className="p-4">
                          {" "}
                          <p>
                            ¿De qué manera has experimentado la comunicación de
                            Dios en tu vida?
                          </p>{" "}
                        </TabsContent>{" "}
                        <TabsContent value="apply" className="p-4">
                          {" "}
                          <p>
                            Considera dedicar tiempo esta semana a estudiar más
                            profundamente quién es Jesús según Hebreos 1.
                          </p>{" "}
                        </TabsContent>{" "}
                      </Tabs>{" "}
                    </CardContent>{" "}
                  </Card>
                )}{" "}
              </div>
            ))}

          {/* Reflection Section */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Mi Reflexión</h2>
            <Textarea
              placeholder="Escribe tus pensamientos, preguntas o aplicaciones personales aquí..."
              className="min-h-32 mb-4"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
            />
            <div className="flex justify-between">
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Compartir con mi Grupo
              </Button>
              <Button
                onClick={markAsStudied}
                disabled={isCompleted}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                {isCompleted ? "Completado" : "Marcar como Estudiado"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bible Verse Dialog */}
      <Dialog open={openVerseDialog} onOpenChange={setOpenVerseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedVerse?.reference}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p>{selectedVerse?.text}</p>
          </div>
          <div className="mt-4">
            <Tabs defaultValue="rvr1960">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="rvr1960">RVR 1960</TabsTrigger>
              </TabsList>
              <TabsContent value="rvr1960" className="p-4">
                <p>{selectedVerse?.text}</p>
              </TabsContent>
              <TabsContent value="nvi" className="p-4">
                <p>Versión en NVI del texto bíblico seleccionado.</p>
              </TabsContent>
              <TabsContent value="dhh" className="p-4">
                <p>Versión en DHH del texto bíblico seleccionado.</p>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
