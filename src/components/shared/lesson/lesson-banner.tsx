"use client";

import React from "react";

interface LessonBannerProps {
  title: string;
  weekStart: string;
  weekEnd: string;
  backgroundUrl?: string;
}

export function LessonBanner({
  title,
  weekStart,
  weekEnd,
  backgroundUrl,
}: LessonBannerProps) {
  return (
    <div
      className="relative w-full h-40 bg-gray-800"
      style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40 flex items-end">
        <div className="container p-6">
          <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
          <p className="text-white/90">
            {weekStart} – {weekEnd}
          </p>
        </div>
      </div>
    </div>
  );
}
