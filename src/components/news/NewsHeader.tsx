'use client';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function NewsHeader() {
  return (
    <div className="mb-8">
      <Link href="/" className="inline-flex items-center gap-2 text-[#052A55] text-sm font-medium hover:underline mb-4 transition-colors">
          <ChevronLeft size={20} />
          กลับไปหน้าหลัก
      </Link>
      <h1 className="text-[#052A55] text-3xl md:text-4xl font-semibold mb-2">ข่าวประชาสัมพันธ์</h1>
    </div>
  );
}