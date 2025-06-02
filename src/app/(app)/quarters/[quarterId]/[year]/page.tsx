"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function QuarterYearRedirectPage() {
  const { quarterId, year } = useParams();
  const router = useRouter();

  useEffect(() => {
    console.log(
      "Redirecting to lessons page for quarterId:",
      quarterId,
      "and year:",
      year,
    );
    if (quarterId && year) {
      router.replace(`/quarters/${quarterId}/${year}/lessons`);
    }
  }, [quarterId, router, year]);

  return null;
}
