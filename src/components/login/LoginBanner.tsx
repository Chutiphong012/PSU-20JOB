'use client';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function LoginBanner() {
  return (
    <div className="w-full md:w-1/2 relative bg-gray-100 rounded-4xl overflow-hidden group min-h-75 md:min-h-full">
        {/* ปุ่มย้อนกลับ */}
        <div className="absolute top-6 left-6 z-10">
            <Link 
                href="/" 
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:bg-white transition-all shadow-sm"
            >
                <ChevronLeft size={16} /> ย้อนกลับ
            </Link>
        </div>

        {/* รูปภาพ */}
        <div className="w-full h-full relative">
            <img 
                src="https://placehold.co/600x800/18305D/ffffff?text=Welcome+PSU+Job" 
                alt="Login Banner" 
                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent pointer-events-none"></div>
        </div>
    </div>
  );
}