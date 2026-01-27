// src/components/layout/Footer.tsx
'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next'; // [NEW]
// ไม่จำเป็นต้องใช้ MUI แล้ว เพราะเราจะใช้ Tailwind ตาม Design ใหม่

export default function Footer() {
  const { t } = useTranslation('common'); // [NEW]
  
  // ฟังก์ชันช่วยเลื่อนหน้าจอขึ้นบนสุด (เพิ่ม smooth behavior เพื่อความนุ่มนวล)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#003C71] text-white py-10 md:pt-16 md:pb-8 font-['Prompt']">
      
      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- ส่วนเนื้อหาหลัก 3 คอลัมน์ --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12 text-center md:text-left">
          
          {/* คอลัมน์ 1: เกี่ยวกับเรา */}
          <div>
            <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-white">
              {t('footer.about')}
            </h3>
            <div className="space-y-4 text-sm text-white/80 font-light leading-relaxed mx-auto md:mx-0 max-w-xs md:max-w-none">
              <p className="font-medium text-white">{t('footer.about_desc_1')}</p>
              <p>
                {t('footer.about_desc_2')}
              </p>
            </div>
          </div>

          {/* คอลัมน์ 2: ลิงก์ด่วน */}
          <div>
            <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-white">
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-3 md:space-y-4 text-sm text-white/80 font-light">
              <li>
                <Link href="/" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="#" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t('footer.policy_alert')}
                </Link>
              </li>
              <li>
                <Link href="/news" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={scrollToTop} className="hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* คอลัมน์ 3: ติดต่อเรา */}
          <div>
            <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-white">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3 md:space-y-4 text-sm text-white/80 font-light">
              <li>{t('footer.office')}</li>
              <li>{t('footer.phone')} : 074-282068-9</li>
              <li>{t('footer.email')} : psu-job@psu.ac.th</li>
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
            {t('footer.cookie_text')}{' '}
            <Link href="/privacy" className="underline hover:text-white whitespace-nowrap">
              {t('footer.privacy_policy')}
            </Link>
          </div>

          {/* ปุ่มกด (Accept / Decline) */}
          <div className="flex flex-wrap justify-center gap-2">
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded shadow-sm transition-all backdrop-blur-sm cursor-pointer">
              {t('buttons.accept')}
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded shadow-sm transition-all backdrop-blur-sm cursor-pointer">
              {t('buttons.decline')}
            </button>
            <Link 
              href="/privacy" 
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded shadow-sm transition-all backdrop-blur-sm inline-block cursor-pointer"
            >
              {t('footer.privacy_policy')}
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}