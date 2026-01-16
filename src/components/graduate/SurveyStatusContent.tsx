    // src/components/graduate/SurveyStatusContent.tsx
    'use client';

    import { FileText, X } from 'lucide-react'; 
    import Link from 'next/link';

    export default function SurveyStatusContent() {
    return (
        <main className="grow w-full">
        <div className="flex flex-col gap-5">
            <div className="bg-[#15158A] px-8 py-5 rounded-[20px] shadow-sm flex items-center">
                <h1 className="text-white text-xl md:text-2xl font-bold">สถานะการตอบแบบสอบถาม</h1>
            </div>
            
            <div className="bg-white px-8 py-8 rounded-[20px] shadow-sm h-full border border-gray-100 min-h-125">
                
                {/* Banner */}
                <div className="bg-[#A50000] rounded-full p-2 pl-3 pr-2 flex flex-col md:flex-row items-center justify-between gap-4 mb-8 shadow-sm">
                    
                    <div className="flex items-center gap-4 pl-2">
                        <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm">
                            <X className="text-[#A50000]" size={26} strokeWidth={3} />
                        </div>
                        <span className="text-white text-xl font-bold tracking-wide">
                            ยังไม่กรอกแบบสอบถาม
                        </span>
                    </div>
                    
                    {/* แก้ไข Link ให้ไปหน้า /graduate/instruction */}
                    <Link href="/graduate/instructions">
                        <button 
                        className="group bg-white text-black px-6 py-2.5 rounded-full flex items-center gap-2 
                                    hover:bg-[#333333] hover:text-white hover:scale-105 transition-all duration-300 
                                    shadow-md border border-gray-100 cursor-pointer"
                        >
                            เริ่มกรอกแบบสอบถาม 
                            <FileText size={20} className="text-[#18305D] group-hover:text-white transition-colors duration-300" />
                        </button>
                    </Link>

                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 text-center h-64 flex flex-col items-center justify-center">
                    <h3 className="text-[#18305D] font-bold text-lg mb-2">ข้อปฏิบัติการรายงานตัว...</h3>
                    <p className="text-gray-400">เนื้อหาข้อตกลง...</p>
                </div>

            </div>
        </div>
        </main>
    );
    }