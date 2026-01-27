'use client';

import { useState } from 'react';
import GraduateLogin from './GraduateLogin';
import AdminLogin from './AdminLogin';
import { useTranslation } from 'react-i18next';

export default function LoginForm() {
  const { t } = useTranslation('auth'); // [NEW] Namespace
  const [activeTab, setActiveTab] = useState<'graduate' | 'admin'>('graduate');

  return (
    <div className="w-full md:w-1/2 flex flex-col p-2 md:p-6">
        {/* Tabs Header */}
        <div className="flex border-b border-gray-200 mb-8">
            <button 
                onClick={() => setActiveTab('graduate')}
                className={`flex-1 pb-4 text-sm md:text-base font-medium transition-all relative ${
                    activeTab === 'graduate' 
                    ? 'text-[#18305D]' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
            >
                {t('tab_graduate')}
                {activeTab === 'graduate' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#18305D] rounded-t-full"></div>
                )}
            </button>
            <button 
                onClick={() => setActiveTab('admin')}
                className={`flex-1 pb-4 text-sm md:text-base font-medium transition-all relative ${
                    activeTab === 'admin' 
                    ? 'text-[#18305D]' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
            >
                {t('tab_admin')}
                {activeTab === 'admin' && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#18305D] rounded-t-full"></div>
                )}
            </button>
        </div>

        {/* Content Switcher */}
        <div className="flex-1 flex flex-col justify-center">
            {activeTab === 'graduate' ? <GraduateLogin /> : <AdminLogin />}
        </div>
    </div>
  );
}