'use client';
import { useTranslation } from 'react-i18next';

export default function AdminLogin() {
  const { t } = useTranslation('auth');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <h2 className="text-2xl font-semibold text-[#18305D] text-center mb-4">{t('admin.title')}</h2>

        {/* PSU Passport */}
        <button className="w-full bg-[#001C54] hover:bg-[#001235] text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-md">
            <span className="font-semibold tracking-wide">{t('admin.psu_passport')}</span>
        </button>

        <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-white text-gray-400">{t('admin.or_email')}</span>
            </div>
        </div>

        {/* Email Form */}
        <form className="space-y-4">
            <div className="space-y-1">
                <input 
                    type="email" 
                    placeholder={t('admin.email_placeholder')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#18305D] focus:ring-1 focus:ring-[#18305D] transition-all text-sm"
                />
            </div>
            <div className="space-y-1">
                <input 
                    type="password" 
                    placeholder={t('admin.password_placeholder')}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#18305D] focus:ring-1 focus:ring-[#18305D] transition-all text-sm"
                />
            </div>
            
            <button className="w-full bg-[#0F3661] hover:bg-[#09223D] text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
                {t('admin.btn_login')}
            </button>
        </form>
    </div>
  );
}