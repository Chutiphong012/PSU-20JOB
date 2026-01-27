// src/components/login/GraduateLogin.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, User, Lock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; 
import { useTranslation } from 'react-i18next';

export default function GraduateLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useTranslation(['auth', 'common']);
  
  // State สลับหน้า: 'menu' = หน้าเลือกปุ่ม, 'form' = หน้ากรอก Member ID
  const [view, setView] = useState<'menu' | 'form'>('menu');

  // ฟังก์ชัน Login (จำลอง)
  const handleMemberLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // ในระบบจริงต้องเช็ค User/Pass ก่อน
    login("Graduate User"); // เรียกใช้ Context เพื่อ Login
  };

  // --- 1. หน้าเมนูเลือก (แสดง 2 ปุ่มใหญ่) ---
  if (view === 'menu') {
    return (
      <div className="space-y-6 text-center animate-in fade-in slide-in-from-right-4 duration-300">
          <h2 className="text-2xl font-semibold text-[#18305D] mb-4">{t('graduate.title')}</h2>
          
          {/* ปุ่ม ThaID */}
          <Link href="/login/thaid" className="w-full block">
              <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white p-4 rounded-2xl flex items-center gap-4 transition-all shadow-md group hover:-translate-y-1">
                  <div className="bg-white/20 p-2 rounded-xl">
                      <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                      <div className="text-lg font-bold">{t('graduate.btn_thaid.title')}</div>
                      <div className="text-xs text-blue-100 font-light">{t('graduate.btn_thaid.desc')}</div>
                  </div>
              </button>
          </Link>

          {/* เส้นคั่น OR */}
          <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-400">{t('graduate.or')}</span>
              </div>
          </div>

          {/* ปุ่ม Member ID (กดแล้วเปลี่ยน view เป็น 'form') */}
          <button 
            onClick={() => setView('form')}
            className="w-full bg-[#294A79] hover:bg-[#203B65] text-white p-4 rounded-2xl flex items-center gap-4 transition-all shadow-md group hover:-translate-y-1"
          >
              <div className="bg-white/10 p-2 rounded-xl">
                  <User className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                  <div className="text-lg font-bold">{t('graduate.btn_member.title')}</div>
                  <div className="text-xs text-gray-300 font-light">{t('graduate.btn_member.desc')}</div>
              </div>
          </button>

          <div className="pt-2">
              <Link href="/contact" className="text-sm text-[#3B82F6] hover:underline">
                  {t('graduate.forgot_password')}
              </Link>
          </div>
      </div>
    );
  }

  // --- 2. หน้าฟอร์ม Member ID (ตามรูปดีไซน์ใหม่) ---
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        
        {/* Header ย้อนกลับ */}
        <div className="flex items-center justify-between mb-2">
            <button 
                onClick={() => setView('menu')} 
                className="text-gray-400 hover:text-[#18305D] text-sm flex items-center gap-1 transition-colors"
            >
                <ArrowLeft size={16} /> {t('common:back')}
            </button>
        </div>

        <h2 className="text-2xl font-semibold text-[#18305D] text-center mb-6">{t('graduate.member_title')}</h2>

        {/* ปุ่มสลับไป ThaID (สีน้ำเงินเข้มตามรูป) */}
        <Link href="/login/thaid" className="block">
            <button className="w-full bg-[#294A79] hover:bg-[#203B65] text-white py-3 px-4 rounded-xl shadow-sm text-sm font-medium transition-all mb-6">
                {t('graduate.btn_switch_thaid')}
            </button>
        </Link>

        {/* Form Inputs */}
        <form onSubmit={handleMemberLogin} className="space-y-4">
            <div className="space-y-1">
                <label className="text-xs text-gray-500 ml-1">{t('graduate.member_id')}</label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <User size={18} />
                    </div>
                    <input 
                        type="text" 
                        placeholder={t('graduate.member_id_placeholder')}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#18305D] focus:ring-1 focus:ring-[#18305D] transition-all text-sm"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-xs text-gray-500 ml-1">{t('graduate.password')}</label>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <Lock size={18} />
                    </div>
                    <input 
                        type="password" 
                        placeholder={t('graduate.password_placeholder')}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#18305D] focus:ring-1 focus:ring-[#18305D] transition-all text-sm"
                    />
                </div>
            </div>
            
            <button type="submit" className="w-full bg-[#0F3661] hover:bg-[#09223D] text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all mt-4">
                {t('graduate.btn_login')}
            </button>
        </form>

        <div className="text-center pt-2">
            <Link href="/contact" className="text-sm text-[#3B82F6] hover:underline">
                {t('graduate.forgot_password')}
            </Link>
        </div>
    </div>
  );
}