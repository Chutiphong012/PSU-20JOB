// src/components/common/WarningModal.tsx
"use client";

import { X } from "lucide-react";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WarningModal({ isOpen, onClose }: WarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 font-['Prompt'] p-4">
      <div className="relative bg-white rounded-3xl w-full max-w-120 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 p-8 flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full p-1.5 transition-colors"
        >
          <X size={20} />
        </button>

        {/* ✅ Custom Warning Icon (SVG) */}
        <div className="mb-5">
          <svg
            width="90"
            height="90"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* พื้นหลังสามเหลี่ยมสีแดง */}
            <path
              d="M10.29 3.86L1.82 18C1.64556 18.3024 1.55293 18.6453 1.55201 18.9945C1.55108 19.3437 1.64189 19.6871 1.81442 19.9894C1.98695 20.2917 2.23483 20.5417 2.53192 20.7132C2.82902 20.8847 3.16439 20.9715 3.503 20.9639H20.5C20.8434 20.9669 21.1828 20.875 21.4827 20.6978C21.7826 20.5206 22.0318 20.2647 22.2043 19.9569C22.3768 19.6492 22.4664 19.3009 22.4638 18.9489C22.4611 18.5969 22.3662 18.2536 22.189 17.954L13.719 3.814C13.5463 3.51371 13.2982 3.26526 13.0007 3.09496C12.7032 2.92466 12.3672 2.83887 12.028 2.84668C11.6888 2.85448 11.359 2.9556 11.0736 3.1394C10.7882 3.3232 10.5578 3.58296 10.407 3.891L10.29 3.86Z"
              fill="#C62828"
            />
            {/* เครื่องหมายตกใจสีขาว */}
            <path
              d="M12 9V13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 17H12.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Text Content */}
        <h3 className="text-xl md:text-2xl font-bold text-[#424242] mb-2 leading-tight">
          ระบบไม่สามารถบันทึกข้อมูลได้
        </h3>
        <p className="text-gray-500 text-base md:text-lg mb-8">
          กรุณาตอบคำถามใน{" "}
          <span className="text-[#C62828] font-bold">ตอนที่ 2</span> ให้ครบถ้วน
        </p>

        {/* Button */}
        <button
          onClick={onClose}
          className="w-full max-w-50 py-3 bg-[#1890FF] hover:bg-[#1580E3] text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-100 transition-all transform active:scale-95"
        >
          ตกลง
        </button>
      </div>
    </div>
  );
}
