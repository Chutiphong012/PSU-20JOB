'use client';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NewsHeader() {
  const { t } = useTranslation('news');

  return (
    <div className="mb-8">
      <Link href="/" className="inline-flex items-center gap-2 text-[#052A55] text-sm font-medium hover:underline mb-4 transition-colors">
          <ChevronLeft size={20} />
          {t('header.back_home')}
      </Link>
      <h1 className="text-[#052A55] text-3xl md:text-4xl font-semibold mb-2">{t('header.title')}</h1>
    </div>
  );
}