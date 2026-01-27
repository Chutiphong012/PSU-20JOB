// src/components/home/AnnouncementSection.tsx
'use client';

import { useTranslation, Trans } from 'react-i18next'; // [NEW]

export default function AnnouncementSection() {
  const { t } = useTranslation(['home', 'common']); // [NEW]

  return (
    <section className="py-10 md:py-16 font-['Prompt']">
      
      <div className="text-center mb-10 md:mb-16">
          <div className="mt-6 md:mt-10 mb-8 md:mb-12">
             <h1 className="text-[#1D3557] text-2xl md:text-4xl font-bold mb-2 md:mb-4 drop-shadow-sm leading-tight">
               {t('welcome_1')}<br className="md:hidden"/> {t('welcome_2')}
             </h1>
             <h2 className="text-[#1D3557] text-lg md:text-2xl font-semibold">
               {t('university')}
             </h2>
          </div>
        </div>

      <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container หลักตาม Design ที่ให้มา */}
        <div className="mb-10 md:mb-16">
          
          {/* หัวข้อ */}
          <h3 className="text-[#052A55] text-xl md:text-2xl font-semibold mb-4">
            {t('announcement.title')}
          </h3>
          
          {/* เส้นขีดคั่น */}
          <div className="h-1 w-full bg-[#2C526F] mb-6 md:mb-8 rounded-full"></div>
          
          {/* เนื้อหาเกริ่นนำ */}
          <p className="text-gray-600 font-light leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
            {t('announcement.intro')}
          </p>

          {/* Card ข้อมูล */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <h4 className="text-[#FF4D4D] text-base md:text-lg font-bold mb-4">
              {t('announcement.card_title')}
            </h4>
            
            <ul className="text-xs md:text-sm text-gray-500 font-light space-y-3 list-decimal list-inside leading-loose">
              <li>
                <Trans 
                  i18nKey="announcement.item_1" 
                                    t={t} // Pass t explicitly if needed, usually Trans uses context t but passing safe
                  components={{
                    1: <span className="text-[#FF4D4D] font-bold" />,
                    2: <span className="text-[#3A77CD] font-medium wrap-break-word" />
                  }} 
                />
              </li>
              <li>
                <Trans 
                  i18nKey="announcement.item_2" 
                  components={{
                    br: <br className="hidden md:block" />,
                    1: <span className="text-[#FF4D4D] font-bold" />,
                    2: <span className="text-[#3A77CD] font-medium" />
                  }} 
                />
              </li>
            </ul>
          </div>
          
        </div>

      </div>
    </section>
  );
}