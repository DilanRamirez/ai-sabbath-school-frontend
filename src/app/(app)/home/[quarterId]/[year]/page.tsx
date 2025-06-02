"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function QuarterYearRedirectPage() {
  const { quarterId, year } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (quarterId && year) {
      router.replace(`/home/${quarterId}/${year}/lessons`);
    }
  }, [quarterId, router, year]);

  return null;
}
