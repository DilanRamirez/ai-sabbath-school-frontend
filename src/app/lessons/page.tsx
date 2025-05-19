"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAllLessons } from "@/store/slices/lessons/lessons-slice";

export default function LessonsPage() {
  const dispatch = useAppDispatch();
  const { all: lessons, loading } = useAppSelector((state) => state.lessons);

  useEffect(() => {
    dispatch(fetchAllLessons());
  }, [dispatch]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Lecciones de Escuela Sabática</h1>

      <Tabs defaultValue="adult" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="adult">Edición para Adultos</TabsTrigger>
          <TabsTrigger value="inverse">InVerse</TabsTrigger>
        </TabsList>
        {loading && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        {/* Adult Lessons */}
        <TabsContent value="adult" className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <Card key={lesson.lesson_id}>
                <CardContent className="pl-8 pr-8">
                  <CardTitle className="mb-0">
                    {lesson.metadata.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mb-2">
                    {lesson.metadata.week_start_date} -{" "}
                    {lesson.metadata.week_end_date}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/lesson/${lesson.year}/${lesson.quarter}/${lesson.lesson_id}/1`}
                    className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    {"Comenzar Estudio"}
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
