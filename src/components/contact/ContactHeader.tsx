
import { useTranslation } from 'react-i18next';

export default function ContactHeader() {
  const { t } = useTranslation('contact');

  return (
    <div className="bg-[#08155F] text-white py-16 md:py-24 text-center px-4">
      <h1 className="text-3xl md:text-5xl font-semibold mb-4">{t('header.title')}</h1>
      <p className="text-blue-100 font-light text-sm md:text-base">
        {t('header.subtitle')}
      </p>
    </div>
  );
}