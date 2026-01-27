'use client'; // ต้องมีเพราะใช้ useState

import { useState } from 'react';
import { Send, User, Mail, Phone, FileText, MessageSquare, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
  const { t } = useTranslation('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() !== '' && formData.subject.trim() !== '') {
      setShowPopup(true); 
    } else {
      alert(t('form.validation_error'));
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); 
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-4xl p-8 md:p-10 shadow-md border border-gray-100 h-full">
        <h3 className="text-xl font-semibold text-[#18305D] mb-8">{t('form.title')}</h3>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* ... ใส่ Input Fields ต่างๆ (เหมือนใน Code เดิม) ... */}
             {/* เพื่อความกระชับ ผมยกตัวอย่าง 1 ช่องนะครับ */}
             <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('form.name_label')} <span className="text-red-500">*</span></label>
                <div className="relative">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('form.name_placeholder')} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2666B0] focus:ring-1 focus:ring-[#2666B0] transition-all text-sm" required />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
            </div>
             {/* ... ใส่ Inputs อื่นๆ: Email, Phone, Subject, Message ... */}
             
             {/* ส่วน Email */}
             <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('form.email_label')}</label>
                <div className="relative">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('form.email_placeholder')} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2666B0] focus:ring-1 focus:ring-[#2666B0] transition-all text-sm" />
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
            </div>
           </div>

           {/* ส่วน Subject, Message และ ปุ่ม Submit ใส่ตรงนี้ ... */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('form.phone_label')}</label>
                    <div className="relative">
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('form.phone_placeholder')} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2666B0] focus:ring-1 focus:ring-[#2666B0] transition-all text-sm" />
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">{t('form.subject_label')} <span className="text-red-500">*</span></label>
                    <div className="relative">
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={t('form.subject_placeholder')} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2666B0] focus:ring-1 focus:ring-[#2666B0] transition-all text-sm" required />
                        <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                </div>
           </div>
           
           <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('form.message_label')}</label>
                <div className="relative">
                    <textarea rows={6} name="message" value={formData.message} onChange={handleChange} placeholder={t('form.message_placeholder')} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2666B0] focus:ring-1 focus:ring-[#2666B0] transition-all text-sm resize-none"></textarea>
                    <MessageSquare className="absolute left-3.5 top-4 text-gray-400 w-4 h-4" />
                </div>
            </div>

            <div>
                <button type="submit" className="bg-[#18305D] text-white px-8 py-3 rounded-xl font-medium text-sm hover:bg-[#122446] transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl active:translate-y-0.5">
                    <Send size={18} /> {t('form.submit_btn')}
                </button>
            </div>

        </form>
      </div>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-4xl p-8 md:p-12 flex flex-col items-center justify-center max-w-100 w-full shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="mb-6">
                    <Check className="w-16 h-16 text-[#00AA00]" strokeWidth={2.5} /> 
                </div>
                <h3 className="text-2xl font-bold text-[#1D1D1D] mb-2 text-center">{t('popup.success_title')}</h3>
                <p className="text-gray-500 font-light text-center text-sm mb-8 leading-relaxed">
                    {t('popup.success_desc')}
                </p>
                <button onClick={handleClosePopup} className="bg-[#1D3557] hover:bg-[#152a48] text-white text-base font-medium px-10 py-2.5 rounded-lg shadow-md transition-colors w-32">
                    {t('popup.close_btn')}
                </button>
            </div>
        </div>
      )}
    </div>
  );
}
