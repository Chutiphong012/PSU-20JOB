// src/components/graduate/GraduateProfileContent.tsx

'use client';

import { graduateProfileData } from '@/data/graduateData'; // [Restored]
import { useTranslation } from 'react-i18next'; // [NEW]

interface GraduateProfileContentProps {
  user: any;
}

export default function GraduateProfileContent({ user }: GraduateProfileContentProps) {
  const { t } = useTranslation('graduate'); // [NEW]
  const displayData = graduateProfileData;

  return (
    <main className="grow w-full">
       <div className="flex flex-col gap-5"> {/* เว้นระยะห่างระหว่างกล่องหัวข้อกับกล่องเนื้อหา */}
         
         {/* 1. กล่อง Header: แยกออกมาเป็นชิ้นเดียว มุมโค้งรอบตัว */}
         <div className="bg-[#15158A] px-8 py-5 rounded-xl shadow-sm flex items-center">
             <h1 className="text-white text-xl md:text-2xl font-bold">
                 {t('profile.title', 'ข้อมูลส่วนตัว')}
             </h1>
         </div>

         {/* 2. กล่อง Content: แยกออกมาเป็นอีกชิ้น สีฟ้าอ่อน มุมโค้งรอบตัว */}
         <div className="bg-[#81BFFE26] px-8 py-8 rounded-xl shadow-sm h-full">
             
             <div className="flex flex-col gap-5"> 
                 {displayData.map((item, index) => (
                     <div 
                         key={index} 
                         className="flex flex-col md:flex-row items-start md:items-center"
                     >
                         {/* Label */}
                         <div className="w-full md:w-[35%] lg:w-[30%] text-gray-500 font-medium text-base mb-1 md:mb-0">
                             {t(item.label)}
                         </div>
                         
                         {/* Value */}
                         <div className="w-full md:w-[65%] lg:w-[70%] text-black text-lg wrap-break-word">
                             {item.value}
                         </div>
                     </div>
                 ))}
             </div>

         </div>

       </div>
    </main>
  );
}   