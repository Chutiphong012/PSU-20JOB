//src/app/(employer)/employer/page.tsx

"use client";

import { useRouter } from "next/navigation"; // 1. เรียกใช้ Router
import { InstructionStep } from "@/components/employer"; // เรียก Component คำชี้แจง

export default function EmployerPage() {
  const router = useRouter();

  const handleStart = () => {
    // 2. เมื่อกดปุ่ม ให้ย้ายไปหน้าแบบสอบถาม
    router.push("/employer/questionnaire");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* แสดงหน้าคำชี้แจง */}
      <InstructionStep onNext={handleStart} />
    </main>
  );
}