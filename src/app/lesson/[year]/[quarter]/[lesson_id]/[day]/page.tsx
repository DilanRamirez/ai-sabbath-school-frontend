"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchLessonById } from "@/store/slices/lesson/lesson-slice";
import { fetchBibleText } from "@/lib/utils";
import { LessonBanner } from "@/components/shared/lesson/lesson-banner";
import { LessonSidebar } from "@/components/shared/lesson/lesson-sidebar";
import { LessonStudyTexts } from "@/components/shared/lesson/lesson-study-texts";
import { LessonContent } from "@/components/shared/lesson/lesson-content";
import { ReflectionSection } from "@/components/shared/reflexion-section";
import { VerseDialog } from "@/components/shared/verse-dialog";
import { LessonMemoryVerse } from "@/components/shared/lesson/Lesson-memory-verse";

export default function LessonDayPage({
  params,
}: {
  params: Promise<{
    year: string;
    quarter: string;
    lesson_id: string;
    day?: string;
  }>;
}) {
  const { year, quarter, lesson_id, day } = React.use(params);
  const dispatch = useAppDispatch();
  const { currentLesson, loading } = useAppSelector((s) => s.lesson);

  const [selectedDay, setSelectedDay] = useState(0);
  const [reflection, setReflection] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [verseDialog, setVerseDialog] = useState<{
    ref: string;
    txt: string;
  } | null>(null);

  // Fetch lesson
  useEffect(() => {
    dispatch(fetchLessonById({ year, quarter, lesson_id }));
  }, [dispatch, year, quarter, lesson_id]);

  // Determine initial day
  useEffect(() => {
    if (currentLesson) {
      const idx = day ? parseInt(day, 10) - 1 : -1;
      if (idx >= 0 && currentLesson.daily_sections[idx]) {
        setSelectedDay(idx);
      } else {
        const sab = currentLesson.daily_sections.findIndex((d) =>
          d.day.toLowerCase().includes("sabado"),
        );
        setSelectedDay(sab >= 0 ? sab : 0);
      }
    }
  }, [currentLesson, day]);

  const handleVerseClick = async (ref: string) => {
    const txt = await fetchBibleText(ref);
    setVerseDialog({ ref, txt: txt || "Texto no disponible." });
  };

  if (loading || !currentLesson) {
    return <div className="p-8 text-center">Cargando lección...</div>;
  }

  const section = currentLesson.daily_sections[selectedDay];

  return (
    <div className="flex flex-col min-h-screen">
      <LessonBanner
        title={section.title}
        weekStart={currentLesson.week_start_date}
        weekEnd={currentLesson.week_end_date}
      />

      <main className="flex-1 container py-8 full-width">
        <LessonSidebar selectedDay={selectedDay} onSelectDay={setSelectedDay} />

        {section.day.toLowerCase() === "sabado" && (
          <>
            <LessonMemoryVerse
              texts={section.memory_verse || ""}
              onSelectVerse={handleVerseClick}
            />
            <LessonStudyTexts
              texts={section.study_texts || ""}
              onSelectVerse={handleVerseClick}
            />
          </>
        )}

        <LessonContent
          paragraphs={section.content}
          // eslint-disable-next-line no-undef
          onExplain={(p) => console.log("Explain:", p)}
        />

        <ReflectionSection
          value={reflection}
          onChange={setReflection}
          onMarkStudied={() => setIsCompleted(true)}
          isCompleted={isCompleted}
        />
      </main>

      <VerseDialog
        open={!!verseDialog}
        onOpenChange={(open) => !open && setVerseDialog(null)}
        reference={verseDialog?.ref}
        text={verseDialog?.txt}
      />
    </div>
  );
}
