"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import { EmployerSidebar } from "./EmployerSidebar";
import {
  employerStructure,
  employerPart1,
  employerPart2,
  employerPart3Categories,
  employerPart4, // ✅ เพิ่ม Import ข้อมูล Part 4 มาใช้คำนวณ Progress
  professionalQuestions,
  Question,
} from "@/data/employerMock";
import { Part1GeneralInfo } from "../section1/Part1GeneralInfo";
import { Part2Satisfaction } from "../section1/Part2Satisfaction";
import { Part3ProfessionalSkills } from "../section1/Part3ProfessionalSkills";
import { Part4Suggestions } from "../section1/Part4Suggestions";
import GraduationCapGif from "@/assets/employer.gif";

interface FormProps {
  onComplete?: () => void;
}

export function EmployerQuestionnaireForm({ onComplete }: FormProps) {
  const [currentPart, setCurrentPart] = useState(1);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const topRef = useRef<HTMLDivElement>(null);

  // ✅ รองรับทั้ง number และ string (แก้ไข Error เส้นหยักสีแดง)
  const handleAnswer = (id: number | string, value: any) => {
    setAnswers((prev) => ({ ...prev, [id.toString()]: value }));
  };

  const scrollToTop = () => {
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  // ✅ อัปเดตเพื่อให้ระบบคำนวณ Progress ได้แม่นยำตามคำถามจริง
  const allPartsData: Record<number, Question[]> = useMemo(() => {
    const selectedCategory = answers[employerPart3Categories.id.toString()];
    const subQuestions = professionalQuestions[selectedCategory] || [];

    return {
      1: employerPart1,
      2: employerPart2,
      3: [employerPart3Categories, ...subQuestions],
      4: employerPart4, // ✅ ใช้ข้อมูลจริงจาก mock (ID 121, 122, 123)
    };
  }, [answers]);

  const { progressData, totalProgress } = useMemo(() => {
    let totalQuestions = 0;
    let totalAnswered = 0;
    const progressByPart: Record<number, number> = {};

    employerStructure.forEach((part) => {
      const questions = allPartsData[part.id] || [];
      // ✅ กรองเอาเฉพาะข้อที่ Required มาคำนวณ Progress
      const requiredQuestions = questions.filter((q) => q.required);
      const partTotal = requiredQuestions.length;

      const partAnswered = requiredQuestions.filter((q) => {
        const val = answers[q.id.toString()]; // ✅ ใช้ string key เสมอ
        return val !== undefined && val !== "" && val !== null;
      }).length;

      progressByPart[part.id] =
        partTotal === 0 ? 0 : Math.round((partAnswered / partTotal) * 100);

      totalQuestions += partTotal;
      totalAnswered += partAnswered;
    });

    const overall =
      totalQuestions === 0
        ? 0
        : Math.round((totalAnswered / totalQuestions) * 100);
    return { progressData: progressByPart, totalProgress: overall };
  }, [answers, allPartsData]);

  const isCurrentPartComplete = progressData[currentPart] === 100;
  const inProgressGradient = "from-[#33CCCC] via-[#85EDFD] to-[#2994FF]";
  const completeGradient = "from-[#2995FD] via-[#5CE1E6] to-[#2995FD]";

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-360 mx-auto bg-white rounded-none md:rounded-[30px] shadow-none md:shadow-2xl overflow-hidden min-h-screen lg:min-h-212.5 font-['Prompt']">
      {/* Sidebar */}
      <div
        className="w-full lg:w-85 shrink-0"
        style={{
          background: "linear-gradient(180deg, #003870 0%, #006BD6 100%)",
        }}
      >
        <EmployerSidebar
          structure={employerStructure}
          currentPart={currentPart}
          totalProgress={totalProgress}
          progressData={progressData}
          answers={answers}
          onPartChange={(partId) => {
            setCurrentPart(partId);
            scrollToTop();
          }}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col bg-white relative overflow-hidden">
        <div
          ref={topRef}
          className="absolute top-0 left-0 w-full h-px pointer-events-none"
        />

        <div className="shrink-0 w-full bg-white px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex bg-linear-to-r from-[#F0F7FF] via-[#F8FBFF] to-white/0 pr-12 sm:pr-20">
              <div className="w-1.5 bg-[#2B76E5] shrink-0"></div>
              <div className="pl-5 py-3">
                <h1 className="text-3xl md:text-4xl font-bold text-[#2B76E5] leading-none mb-2">
                  ตอนที่ {currentPart}
                </h1>
                <p className="text-[#6BA5F2] text-lg md:text-xl font-medium leading-tight">
                  {employerStructure[currentPart - 1]?.subLabel}
                </p>
              </div>
            </div>

            <div className="self-end md:self-center relative shrink-0">
              {isCurrentPartComplete ? (
                <div className="relative group overflow-hidden rounded-full min-w-27.5 md:min-w-30 h-8 md:h-9 flex items-center justify-center shadow-md">
                  <div
                    className={`absolute inset-0 bg-linear-to-r ${completeGradient} animate-shimmer-ltr`}
                  />
                  <span className="relative z-10 text-xs md:text-sm text-white font-bold">
                    Complete
                  </span>
                </div>
              ) : (
                <div className="relative group h-8 md:h-9 min-w-30 md:min-w-32.5 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 rounded-full bg-linear-to-r ${inProgressGradient} animate-shimmer-ltr p-0.5`}
                  >
                    <div className="h-full w-full bg-white rounded-full"></div>
                  </div>
                  <div className="relative flex items-center justify-center px-4 md:px-6 h-full overflow-hidden">
                    <span
                      className={`text-xs md:text-sm font-bold bg-linear-to-r ${inProgressGradient} bg-clip-text text-transparent animate-shimmer-ltr`}
                    >
                      In Progress
                    </span>
                  </div>
                  <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 bg-white px-1 z-20 rounded-full">
                    <Image
                      src={GraduationCapGif}
                      alt="Cap"
                      width={24}
                      height={24}
                      className="animate-rock w-6 h-6 md:w-7 md:h-7"
                      unoptimized
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 md:px-12 md:py-6">
          {currentPart === 1 && (
            <Part1GeneralInfo
              answers={answers}
              onAnswer={handleAnswer}
              onNextPart={() => {
                setCurrentPart(2);
                scrollToTop();
              }}
              onScrollToTop={scrollToTop}
            />
          )}

          {currentPart === 2 && (
            <Part2Satisfaction
              answers={answers}
              onAnswer={handleAnswer}
              onNextPart={() => {
                setCurrentPart(3);
                scrollToTop();
              }}
              onBackPart={() => {
                setCurrentPart(1);
                scrollToTop();
              }}
              onScrollToTop={scrollToTop}
            />
          )}

          {currentPart === 3 && (
            <Part3ProfessionalSkills
              answers={answers}
              onAnswer={handleAnswer}
              onNextPart={() => {
                setCurrentPart(4);
                scrollToTop();
              }}
              onBackPart={() => {
                setCurrentPart(2);
                scrollToTop();
              }}
              onScrollToTop={scrollToTop}
            />
          )}

          {currentPart === 4 && (
            <Part4Suggestions
              answers={answers}
              onAnswer={handleAnswer}
              onBackPart={() => {
                setCurrentPart(3);
                scrollToTop();
              }}
              onComplete={() => onComplete?.()}
              onScrollToTop={scrollToTop}
            />
          )}
        </div>
      </div>
    </div>
  );
}
