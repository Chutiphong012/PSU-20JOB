// src/components/home/AnnouncementSection.tsx
'use client';

export default function AnnouncementSection() {
  return (
    <section className="py-10 md:py-16 font-['Prompt']">
      
      <div className="text-center mb-10 md:mb-16">
          <div className="mt-6 md:mt-10 mb-8 md:mb-12">
             <h1 className="text-[#1D3557] text-2xl md:text-4xl font-bold mb-2 md:mb-4 drop-shadow-sm leading-tight">
               ยินดีต้อนรับสู่ ระบบฐานข้อมูล<br className="md:hidden"/> ภาวะการมีงานทำของบัณฑิต
             </h1>
             <h2 className="text-[#1D3557] text-lg md:text-2xl font-semibold">
               มหาวิทยาลัยสงขลานครินทร์
             </h2>
          </div>
        </div>

      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container หลักตาม Design ที่ให้มา */}
        <div className="mb-10 md:mb-16">
          
          {/* หัวข้อ */}
          <h3 className="text-[#052A55] text-xl md:text-2xl font-semibold mb-4">
            คำชี้แจง
          </h3>
          
          {/* เส้นขีดคั่น */}
          <div className="h-1 w-full bg-[#2C526F] mb-6 md:mb-8 rounded-full"></div>
          
          {/* เนื้อหาเกริ่นนำ */}
          <p className="text-gray-600 font-light leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
            ระบบฐานข้อมูลภาวะการมีงานทำของบัณฑิตมหาวิทยาลัยสงขลานครินทร์ได้รับการพัฒนาขึ้นเพื่อติดตามและประเมินผลการมีงานทำของบัณฑิตภายหลังสำเร็จการศึกษา
          </p>

          {/* Card ข้อมูล */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <h4 className="text-[#FF4D4D] text-base md:text-lg font-bold mb-4">
              แบบสอบถามนี้มี 2 ส่วน (ต้องตอบทุกส่วน)
            </h4>
            
            <ul className="text-xs md:text-sm text-gray-500 font-light space-y-3 list-decimal list-inside leading-loose">
              <li>
                การบันทึกข้อมูล กรุณาตอบข้อมูลให้สมบูรณ์ กรณีที่มีข้อมูลในเรื่อง ๆ นั้น ให้ใส่{' '}
                <span className="text-[#FF4D4D] font-bold">-</span>{' '}
                <span className="text-[#3A77CD] font-medium wrap-break-word">
                  (อย่าเว้นไว้ เพราะระบบจะไม่สามารถบันทึก และผ่านไปยัง หน้าถัดไป)
                </span>
              </li>
              <li>
                เมื่อบันทึกข้อมูลเสร็จแล้ว กรณีที่ไม่สามารถพิมพ์ใบรับรองได้ทันที บัณฑิตสามารถเข้ามา Print{' '}
                <br className="hidden md:block" />
                ใบรับรองได้ในภายหลัง ให้ไปที่หัวข้อ{' '}
                <span className="text-[#FF4D4D] font-bold">"พิมพ์ใบรายงาน"</span>{' '}
                <span className="text-[#3A77CD] font-medium">
                  โดยไม่ต้องบันทึกข้อมูลใหม่!!!
                </span>
              </li>
            </ul>
          </div>
          
        </div>

      </div>
    </section>
  );
}