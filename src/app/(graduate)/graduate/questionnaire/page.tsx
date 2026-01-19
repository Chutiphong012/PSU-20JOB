// src/app/(graduate)/graduate/questionnaire/page.tsx
"use client";

import { useState, useCallback, Suspense } from "react";
import { QuestionnaireSidebar, QuestionnaireForm } from "@/components/graduate";
import { useSearchParams } from "next/navigation";

function QuestionnaireContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const [partsProgress, setPartsProgress] = useState<Record<number, number>>({});
  const [completedParts, setCompletedParts] = useState<number[]>([]);
  const [showSidebar, setShowSidebar] = useState(mode !== "success");

  const TOTAL_PARTS = 5;
  const overallProgress = Math.round(
    Object.values(partsProgress).reduce((a, b) => a + b, 0) / TOTAL_PARTS
  );

  const handleProgressUpdate = useCallback((partId: number, percent: number) => {
    setPartsProgress((prev) => {
      if (prev[partId] === percent) return prev;
      return { ...prev, [partId]: percent };
    });
  }, []);

  const handlePartComplete = useCallback((partId: number) => {
    setCompletedParts((prev) => {
      if (prev.includes(partId)) return prev;
      return [...prev, partId];
    });
  }, []);

  return (
    // ✅ ใช้ gap-0 ในมือถือ และ md:gap-6 ใน PC
    <div className="flex flex-col lg:flex-row gap-0 md:gap-6 items-start w-full">
      {showSidebar && (
        <div className="hidden lg:block w-75 shrink-0 transition-all duration-500">
          <QuestionnaireSidebar
            part1Progress={partsProgress[1] || 0}
            completedSections={completedParts}
            overallProgress={overallProgress}
          />
        </div>
      )}

      <main className="flex-1 w-full transition-all duration-500">
        <QuestionnaireForm
          onProgressUpdate={handleProgressUpdate}
          onPartComplete={handlePartComplete}
          onComplete={() => setShowSidebar(false)}
          initialStep={mode === "success" ? "success" : "check"}
        />
      </main>
    </div>
  );
}

export default function QuestionnairePage() {
  return (
    // ✅ เอา Container ออกในมือถือ (px-0) เพื่อให้กล่องขาวชนขอบเครื่อง
    <div className="min-h-screen bg-[#F8F9FA] py-0 md:py-8 font-['Prompt']">
      <div className="w-full max-w-screen-2xl mx-auto px-0 md:px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionnaireContent />
        </Suspense>
      </div>
    </div>
  );
}