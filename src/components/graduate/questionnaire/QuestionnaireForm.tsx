// src/components/graduate/questionnaire/QuestionnaireForm.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, AlertTriangle, GraduationCap } from 'lucide-react';
import { studentInfoMock, questionPart1 } from '@/data/questionnaireMock';

export function QuestionnaireForm() {
  // State สำหรับสลับหน้า: 'check' = หน้าตรวจสอบข้อมูล, 'form' = หน้าแบบสอบถาม
  const [step, setStep] = useState<'check' | 'form'>('check');

  return (
    <div className="grow bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 h-fit">
      {step === 'check' ? (
        <InfoCheckStep onNext={() => setStep('form')} />
      ) : (
        <QuestionListStep onBack={() => setStep('check')} />
      )}
    </div>
  );
}

// --------------------------------------------------------
// ส่วนที่ 1: หน้าตรวจสอบข้อมูล (Info Check Step) - ตามภาพ image_c6e845
// --------------------------------------------------------
function InfoCheckStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col gap-6">
       {/* Header */}
       <div>
          <span className="text-[#1890FF] text-sm font-medium">ส่วนที่ 1 ภาวะการมีงานทำของบัณฑิต</span>
          <h1 className="text-[#18305D] text-3xl font-bold mt-2">ตอนที่ 1 ข้อมูลทั่วไป</h1>
       </div>

       {/* Warning Box */}
       <div className="bg-[#FFFBE6] border border-[#FFE58F] rounded-lg p-4 flex gap-3 items-start">
          <AlertTriangle className="text-[#FAAD14] shrink-0 mt-0.5" size={20} />
          <div>
              <h3 className="text-[#D46B08] font-bold text-base">โปรดตรวจสอบความถูกต้องของข้อมูล</h3>
              <p className="text-[#D46B08] text-sm">ข้อมูลส่วนนี้ดึงมาจากฐานข้อมูลของระบบ หากข้อมูลไม่ถูกต้อง กรุณาติดต่อหน่วยงานที่รับผิดชอบเพื่อดำเนินการแก้ไข</p>
          </div>
       </div>

       {/* Info Card */}
       <div className="bg-[#F8FAFC] rounded-2xl p-6 md:p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-sm md:text-base">
             
             {/* Row 1 */}
             <div className="flex flex-col gap-1">
                <span className="text-gray-500">1. ชื่อสถาบัน</span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.institute}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-gray-500">ระดับการศึกษา</span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.degree}</span>
             </div>

             {/* Row 2 */}
             <div className="flex flex-col gap-1">
                <span className="text-gray-500">คณะ</span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.faculty}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-gray-500">ภาควิชา</span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.department}</span>
             </div>

             {/* Row 3 */}
             <div className="flex flex-col gap-1">
                <span className="text-gray-500">สาขาวิชา</span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.major}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-gray-500">หลักสูตร</span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.curriculum}</span>
             </div>

             <div className="col-span-1 md:col-span-2 border-t border-gray-200 my-2"></div>

             {/* Row 4 */}
             <div className="flex flex-col gap-1">
                <span className="text-gray-500">2. ชื่อ (ไทย)</span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.nameTH}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-gray-500">นามสกุล</span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.nameTH.split(' ')[1] || '-'}</span>
             </div>

             {/* Row 5 */}
             <div className="flex flex-col gap-1">
                <span className="text-gray-500">(อังกฤษ)</span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.nameEN}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-gray-500"></span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.nameEN.split(' ').slice(2).join(' ') || '-'}</span>
             </div>

             <div className="col-span-1 md:col-span-2 border-t border-gray-200 my-2"></div>

             {/* Row 6 */}
             <div className="flex flex-col gap-1">
                <span className="text-gray-500">3. เลขที่บัตรประชาชน</span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.nationalID}</span>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-gray-500">รหัสนักศึกษา</span>
                <span className="text-[#18305D] font-semibold">{studentInfoMock.studentID}</span>
             </div>

          </div>
       </div>

       {/* Actions Buttons */}
       <div className="flex flex-col-reverse md:flex-row gap-4 justify-end mt-4">
          <button className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors">
             ข้อมูลไม่ถูกต้อง ติดต่อแอดมิน
          </button>
          <button 
            onClick={onNext}
            className="px-6 py-2.5 rounded-lg bg-[#1890FF] text-white font-bold hover:bg-[#1580e3] transition-colors shadow-sm"
          >
             ข้อมูลถูกต้อง เริ่มทำแบบสอบถาม
          </button>
       </div>
    </div>
  );
}


// --------------------------------------------------------
// ส่วนที่ 2: หน้าแบบสอบถาม (Question List Step) - ตามภาพ image_c6e863, image_c6e887
// --------------------------------------------------------
function QuestionListStep({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col gap-6">
       
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <span className="text-[#1890FF] text-sm font-medium">ส่วนที่ 1 ภาวะการมีงานทำของบัณฑิต</span>
                <h1 className="text-[#1890FF] text-3xl font-bold mt-1">ตอนที่ 1 ข้อมูลทั่วไป</h1>
            </div>
            {/* Status Badge */}
            <div className="flex items-center gap-2 bg-white text-[#1890FF] px-4 py-1.5 rounded-full text-sm font-bold border border-[#1890FF] shadow-sm">
                <GraduationCap size={16} />
                In Progress
            </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-6">
            <div className="bg-[#1890FF] h-full w-[20%] rounded-full shadow-sm"></div>
        </div>

        {/* --- Render Fields from Mock Data --- */}
        <div className="flex flex-col gap-6">
            {questionPart1.map((question) => (
                <div key={question.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow bg-white">
                    <label className="block text-[#18305D] font-bold mb-4 text-base">
                        ข้อที่ {question.id} <br />
                        <span className="text-lg">{question.label}</span>
                    </label>

                    {/* Case 1: Dropdown */}
                    {question.type === 'dropdown' && (
                         <div className="relative">
                            <select className="w-full appearance-none border border-gray-200 rounded-lg px-4 py-3 text-gray-500 bg-white focus:outline-none focus:border-[#1890FF] focus:ring-2 focus:ring-[#1890FF]/10 cursor-pointer">
                                <option>{question.placeholder}</option>
                                {question.options?.map(opt => <option key={opt}>{opt}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                         </div>
                    )}

                    {/* Case 2: Radio (Design ตามภาพ image_c6e863 - กล่องขาว) */}
                    {question.type === 'radio' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {question.options?.map((opt, idx) => (
                                <label key={idx} className="flex items-center gap-3 border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-[#1890FF] transition-colors group bg-white">
                                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-[#1890FF] flex items-center justify-center shrink-0">
                                        {/* วงกลมด้านในเมื่อเลือก */}
                                        {/* <div className="w-2.5 h-2.5 bg-[#1890FF] rounded-full hidden"></div> */}
                                    </div>
                                    <span className="text-gray-700 font-medium">{opt}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {/* Case 3: Address Group (Design ตามภาพ image_c6e887) */}
                    {question.type === 'address_group' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-4 gap-y-6">
                            {question.subFields?.map((field: any, idx) => {
                                // คำนวณ Span ของ Grid ตาม config ใน mock
                                const spanClass = 
                                    field.size === 'full' ? 'md:col-span-2 lg:col-span-6' : 
                                    field.size === 'half' ? 'md:col-span-1 lg:col-span-3' : 
                                    field.size === 'third' ? 'md:col-span-1 lg:col-span-2' : 'col-span-full';

                                return (
                                    <div key={idx} className={spanClass}>
                                        <label className="block text-gray-700 font-medium mb-2 text-sm">{field.label}</label>
                                        {field.type === 'dropdown' ? (
                                             <div className="relative">
                                                <select className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2.5 text-gray-500 bg-white focus:outline-none focus:border-[#1890FF]">
                                                    <option>{field.placeholder}</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                             </div>
                                        ) : (
                                            <input 
                                                type="text" 
                                                placeholder={field.placeholder}
                                                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-gray-700 focus:outline-none focus:border-[#1890FF] placeholder:text-gray-300"
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                </div>
            ))}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-4 justify-end mt-4 pt-4 border-t border-gray-100">
             <button 
                onClick={onBack}
                className="px-8 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
             >
                ย้อนกลับ
             </button>
             <button className="px-8 py-2.5 rounded-lg bg-[#888888] text-white font-bold cursor-not-allowed">
                ถัดไป
             </button>
        </div>

    </div>
  );
}