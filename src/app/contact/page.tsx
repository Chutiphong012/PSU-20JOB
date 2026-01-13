// src/app/contact/page.tsx
'use client';

// Import Components ที่เราทำไว้ ผ่าน index.ts ที่ทำในขั้นตอนที่ 1
import { ContactHeader, ContactInfo, ContactForm } from '@/components/contact';

export default function ContactPage() {
  return (
    <div className="font-['Prompt'] bg-[#F8F9FA] min-h-screen flex flex-col">
      
      {/* 1. ส่วนหัว Banner สีน้ำเงิน */}
      <ContactHeader />

      {/* 2. เนื้อหาหลัก แบ่ง 2 ฝั่ง */}
      <main className="grow container mx-auto px-4 py-12 max-w-300">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ฝั่งซ้าย: ข้อมูลติดต่อ + แผนที่ */}
            <ContactInfo />
            
            {/* ฝั่งขวา: ฟอร์มส่งข้อความ */}
            <ContactForm />
            
        </div>
      </main>

    </div>
  );
}