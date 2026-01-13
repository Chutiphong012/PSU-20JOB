'use client';

import { Suspense } from 'react';

import { NewsHeader, NewsList } from "@/components/news";

export default function NewsPage() {
  return (
    <div className="font-['Prompt'] bg-[#F2F2F2] min-h-screen flex flex-col">
  
      <main className="grow container mx-auto px-4 py-8 md:py-10 max-w-300">
        <NewsHeader />
        
        {/* ต้อง Wrap ด้วย Suspense เพราะข้างในมีการใช้ useSearchParams */}
        <Suspense fallback={<div>กำลังโหลดข้อมูล...</div>}>
           <NewsList />
        </Suspense>
      </main>
 
    </div>
  );
}