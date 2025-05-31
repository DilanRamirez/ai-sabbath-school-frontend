// lessons/[lessonId]/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const LessonRedirectPage = () => {
  const router = useRouter();
  const params = useParams();
  const { lessonId, quarterId } = params;

  useEffect(() => {
    if (lessonId && quarterId) {
      router.replace(`/quarters/${quarterId}/lessons/${lessonId}/saturday`);
    }
  }, [lessonId, quarterId, router]);

  return null; // or a loading spinner
};

export default LessonRedirectPage;
