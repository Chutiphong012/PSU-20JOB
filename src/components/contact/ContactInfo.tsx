
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import { useTranslation, Trans } from 'react-i18next';

export default function ContactInfo() {
  const { t } = useTranslation('contact');

  return (
    <div className="lg:col-span-1 space-y-6">
      {/* กล่องข้อมูลติดต่อ */}
      <div className="bg-white rounded-4xl p-8 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-[#18305D] mb-6">{t('info.title')}</h3>
        
        <div className="space-y-6">
          {/* ที่อยู่ */}
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2.5 rounded-full text-[#2666B0] shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">{t('info.address_label')}</div>
              <div className="text-[#18305D] text-sm font-medium leading-relaxed">
                <Trans i18nKey="info.address_value" t={t} components={{ br: <br /> }} />
              </div>
            </div>
          </div>

          {/* โทรศัพท์ */}
          <div className="flex items-start gap-4">
            <div className="bg-green-100 p-2.5 rounded-full text-green-600 shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">{t('info.phone_label')}</div>
              <div className="text-[#18305D] text-sm font-medium">074-286-971-3</div>
            </div>
          </div>

          {/* อีเมล */}
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-2.5 rounded-full text-purple-600 shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">{t('info.email_label')}</div>
              <div className="text-[#18305D] text-sm font-medium">pr@psu.ac.th</div>
            </div>
          </div>
          
          {/* ไลน์ */}
          <div className="flex items-start gap-4">
            <div className="bg-[#06C755]/20 p-2.5 rounded-full text-[#06C755] shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
               <div className="text-sm font-medium text-gray-500 mb-1">{t('info.line_label')}</div>
               <div className="text-[#18305D] text-sm font-medium">hmado_11</div>
            </div>
          </div>

          {/* เวลาทำการ */}
          <div className="flex items-start gap-4">
            <div className="bg-orange-100 p-2.5 rounded-full text-orange-500 shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 mb-1">{t('info.hours_label')}</div>
              <div className="text-[#18305D] text-sm font-medium">{t('info.hours_value')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* แผนที่ */}
      <div className="bg-gray-200 rounded-4xl overflow-hidden h-64 shadow-md border border-gray-100">
        <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.6729909249764!2d100.49578237587647!3d7.009497792992215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304d29b062535719%3A0xc31754972d32578b!2sPrince%20of%20Songkla%20University!5e0!3m2!1sen!2sth!4v1705030000000!5m2!1sen!2sth" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy"
            title="PSU Map"
        ></iframe>
      </div>
    </div>
  );
}