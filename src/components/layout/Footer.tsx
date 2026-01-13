// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
// ไม่จำเป็นต้องใช้ MUI แล้ว เพราะเราจะใช้ Tailwind ตาม Design ใหม่

export default function Footer() {
  
  // ฟังก์ชันช่วยเลื่อนหน้าจอขึ้นบนสุด (เพิ่ม smooth behavior เพื่อความนุ่มนวล)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-linear-to-b from-[#1129B1] to-[#08155F] text-white py-10 md:pt-16 md:pb-8 font-['Prompt']">
      
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- ส่วนเนื้อหาหลัก 3 คอลัมน์ --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12 text-center md:text-left">
          
          {/* คอลัมน์ 1: เกี่ยวกับเรา */}
          <div>
            <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-[#ACDDE8]">
              เกี่ยวกับเรา
            </h3>
            <div className="space-y-4 text-sm text-white/80 font-light leading-relaxed mx-auto md:mx-0 max-w-xs md:max-w-none">
              <p className="font-medium text-white">PSU Job Portal</p>
              <p>
                เป็นแพลตฟอร์มสำหรับติดตามภาวะการมีงานทำของบัณฑิตมหาวิทยาลัยสงขลานครินทร์ 
                เพื่อรวบรวมข้อมูลและนำไปพัฒนาหลักสูตร
              </p>
            </div>
          </div>

          {/* คอลัมน์ 2: ลิงก์ด่วน */}
          <div>
            <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-[#ACDDE8]">
              ลิงก์ด่วน
            </h3>
            <ul className="space-y-3 md:space-y-4 text-sm text-white/80 font-light">
              <li>
                <Link href="/" onClick={scrollToTop} className="hover:text-white transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="#" onClick={scrollToTop} className="hover:text-white transition-colors">
                  คำชี้แจง
                </Link>
              </li>
              <li>
                <Link href="/news" onClick={scrollToTop} className="hover:text-white transition-colors">
                  ข่าวประชาสัมพันธ์
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={scrollToTop} className="hover:text-white transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* คอลัมน์ 3: ติดต่อเรา */}
          <div>
            <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-[#ACDDE8]">
              ติดต่อเรา
            </h3>
            <ul className="space-y-3 md:space-y-4 text-sm text-white/80 font-light">
              <li>สำนักงาน / งานบริหารและสารสนเทศ</li>
              <li>โทรศัพท์ : 074-282068-9</li>
              <li>E-Mail : psu-job@psu.ac.th</li>
              <li>
                Facebook :{' '}
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors underline decoration-white/30 hover:decoration-white"
                >
                  Facebook Fanpage
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* --- เส้นขีดคั่น --- */}
        <div className="border-t border-white/10 mb-6 md:mb-8"></div>

        {/* --- ส่วนล่าง: Cookies & Buttons --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-light text-white/80">
          
          {/* ข้อความ Cookie */}
          <div className="text-center md:text-left max-w-md">
            เราใช้คุกกี้เพื่อเพิ่มประสิทธิภาพและประสบการณ์ที่ดีในการใช้เว็บไซต์ ท่านสามารถศึกษารายละเอียดการใช้คุกกี้ได้ที่{' '}
            <Link href="/privacy" className="underline hover:text-white whitespace-nowrap">
              Privacy policy
            </Link>
          </div>

          {/* ปุ่มกด (Accept / Decline) */}
          <div className="flex flex-wrap justify-center gap-2">
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded shadow-sm transition-all backdrop-blur-sm cursor-pointer">
              ยอมรับ
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded shadow-sm transition-all backdrop-blur-sm cursor-pointer">
              ไม่ยอมรับ
            </button>
            <Link 
              href="/privacy" 
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded shadow-sm transition-all backdrop-blur-sm inline-block cursor-pointer"
            >
              Privacy Policy
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}