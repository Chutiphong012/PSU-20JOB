// src/data/assessmentMock.ts

// ✅ New Interface for Multi-language Support (Same as questionnaireMock)
export interface LocalizedText {
  th: string;
  en: string;
}

export interface AssessmentTheme {
  main: string;        // สีหลัก (Text, Active Button)
  bgAnswered: string;  // สีพื้นหลังเมื่อตอบแล้ว
  hoverText: string;   // สี Text เมื่อ Hover
  gradientClass: string; // Tailwind Class สำหรับ Gradient Hover
}

export interface AssessmentQuestion {
  id: string;
  label: LocalizedText; // ✅ Changed to LocalizedText
}

export interface AssessmentCategory {
  id: string;
  title: LocalizedText; // ✅ Changed to LocalizedText
  subTitle: LocalizedText; // ✅ Changed to LocalizedText
  questions: AssessmentQuestion[];
  theme: AssessmentTheme; 
}

export const ratingOptions = [
  { value: 1, label: { th: "น้อยที่สุด", en: "Least" } },
  { value: 2, label: { th: "น้อย", en: "Less" } },
  { value: 3, label: { th: "ปานกลาง", en: "Moderate" } },
  { value: 4, label: { th: "มาก", en: "Much" } },
  { value: 5, label: { th: "มากที่สุด", en: "Most" } },
];

export const assessmentPageContent = {
  title: {
    th: "การประเมินตนเอง",
    en: "Self-Assessment",
  },
  description: {
    th: "ปัจจุบันคิดว่าท่านมีทักษะ/ความรู้ด้านต่าง ๆ ในระดับใด",
    en: "At what level do you think you possess the following skills/knowledge?",
  },
};

export const assessmentData: AssessmentCategory[] = [
  // 1. Soft Skills (สีชมพู)
  {
    id: "soft_skills",
    title: { th: "ทักษะทางสังคม", en: "Social Skills" },
    subTitle: { th: "(Basic soft skills)", en: "(Basic soft skills)" },
    theme: {
      main: "#D9436A",
      bgAnswered: "#FFF0F4",
      hoverText: "#D9436A",
      gradientClass: "from-[#FF9A9E] to-[#FECFEF]",
    },
    questions: [
      { id: "s2_q1", label: { th: "ทักษะการนำเสนอและการสื่อสาร", en: "Oral communication and presentation skills" } },
      { id: "s2_q2", label: { th: "การทำงานเป็นทีม", en: "Teamwork" } },
      { id: "s2_q3", label: { th: "ด้านมนุษยสัมพันธ์", en: "Interpersonal skills" } },
      { id: "s2_q4", label: { th: "ความยืดหยุ่นทางความคิด", en: "Flexibility" } },
      { id: "s2_q5", label: { th: "การสร้างแรงจูงใจ/แรงขับภายในตนเอง", en: "Motivation and proactivity" } },
      { id: "s2_q6", label: { th: "การมีความคิดริเริ่ม", en: "Initiative" } },
      { id: "s2_q7", label: { th: "การจัดการด้านอารมณ์/สภาพจิตใจ", en: "Stress resilience" } },
    ],
  },
  // 2. Digital Skills (สีเขียว)
  {
    id: "digital_skills",
    title: { th: "ทักษะด้านเทคโนโลยี/Digital", en: "Technology/Digital Skills" },
    subTitle: { th: "(Digital and technical skills)", en: "(Digital and technical skills)" },
    theme: {
      main: "#7CB342", 
      bgAnswered: "#F6FBF2", 
      hoverText: "#7CB342",
      gradientClass: "from-[#AED581] to-[#DCEDC8]",
    },
    questions: [
      { id: "s2_q8", label: { th: "ความรู้ด้านอินเทอร์เน็ตและซอฟแวร์", en: "Knowledge of Internet & software knowledge" } },
      { id: "s2_q9", label: { th: "ความรู้เกี่ยวกับ Social media", en: "Knowledge of social media" } },
      { id: "s2_q10", label: { th: "ความรู้เกี่ยวกับการวิเคราะห์ข้อมูลเพื่อความได้เปรียบทางธุรกิจ", en: "Knowledge of Analytics and real time practices" } },
      { id: "s2_q11", label: { th: "ความรู้เกี่ยวกับ E-commerce", en: "Knowledge of E-commerce" } },
      { id: "s2_q12", label: { th: "ความรู้และการประยุกต์ใช้โมบายเทคโนโลยี", en: "Knowledge of Mobile" } },
      { id: "s2_q13", label: { th: "ความรู้ด้านการตลาดด้วยเครื่องมือค้นหาบนอินเทอร์เน็ต", en: "SEO & SEM" } },
    ],
  },
  // 3. Marketing Skills (สีม่วง)
  {
    id: "marketing_skills",
    title: { th: "ทักษะด้านการจัดการธุรกิจ", en: "Business Management Skills" },
    subTitle: { th: "(Core marketing skills)", en: "(Core marketing skills)" },
    theme: {
      main: "#9C27B0",
      bgAnswered: "#F3E5F5", 
      hoverText: "#9C27B0",
      gradientClass: "from-[#CE93D8] to-[#E1BEE7]",
    },
    questions: [
      { id: "s2_q14", label: { th: "ความรู้ด้านการตลาดพื้นฐาน", en: "Basic Marketing" } },
      { id: "s2_q15", label: { th: "การวางแผนกลยุทธ์", en: "Strategic Planning" } },
      { id: "s2_q16", label: { th: "การบริหารจัดการแบรนด์", en: "Brand Management" } },
      { id: "s2_q17", label: { th: "การสื่อสารทางการตลาด", en: "Marketing Communication" } },
    ],
  },
  // 4. Analytical Skills (สีน้ำตาล)
  {
    id: "analytical_skills",
    title: { th: "ทักษะด้านการวิเคราะห์/สังเคราะห์", en: "Analytical/Synthesis Skills" },
    subTitle: { th: "(Analytical skills)", en: "(Analytical skills)" },
    theme: {
      main: "#8D6E63", 
      bgAnswered: "#EFEBE9", 
      hoverText: "#8D6E63",
      gradientClass: "from-[#D7CCC8] to-[#BCAAA4]",
    },
    questions: [
      { id: "s2_q18", label: { th: "ทักษะการแก้ปัญหา", en: "Problem-solving" } },
      { id: "s2_q19", label: { th: "มีแนวคิดที่ดีและความคิดเชิงวิเคราะห์", en: "Good conceptual and analytical skills" } },
      { id: "s2_q20", label: { th: "ความรู้ด้านการขับเคลื่อนหรือการดำเนินงานด้วยข้อมูล", en: "Data-driven/data-oriented" } },
      { id: "s2_q21", label: { th: "ความรู้ด้านสถิติ", en: "Statistical knowledge" } },
      { id: "s2_q22", label: { th: "ความสามารถด้านสังเคราะห์ข้อมูลและสามารถนำไปใช้ปฏิบัติได้", en: "Ability to synthesize information into meaningful and actionable reports" } },
      { id: "s2_q23", label: { th: "การคิดเชิงวิพากษ์", en: "Critical thinking" } },
    ],
  },
  // ✅ 5. Customer Insights Skills (สีฟ้าอมเขียว/Teal - เพิ่มใหม่ตามรูป)
  {
    id: "customer_skills",
    title: { th: "ทักษะด้านลูกค้า", en: "Customer Skills" },
    subTitle: { th: "(Customer insights skills)", en: "(Customer insights skills)" },
    theme: {
      main: "#00838F",
      bgAnswered: "#E0F7FA",
      hoverText: "#00838F",
      gradientClass: "from-[#4DD0E1] to-[#B2EBF2]",
    },
    questions: [
      { id: "s2_q24", label: { th: "ความเข้าใจในผู้บริโภค", en: "Understanding consumers" } },
      { id: "s2_q25", label: { th: "จิตวิทยาผู้บริโภค", en: "Consumer psychology" } },
      { id: "s2_q26", label: { th: "ความสามารถด้านการดูแลลูกค้า", en: "Ability to handle customers" } },
      { id: "s2_q27", label: { th: "ทักษะการบริการ", en: "Service skills" } },
      { id: "s2_q28", label: { th: "การบริหารความสัมพันธ์ลูกค้า", en: "CRM" } },
    ],
  }
];