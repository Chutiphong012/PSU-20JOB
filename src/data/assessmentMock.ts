// src/data/assessmentMock.ts

export interface AssessmentTheme {
  main: string;        // สีหลัก (Text, Active Button)
  bgAnswered: string;  // สีพื้นหลังเมื่อตอบแล้ว
  hoverText: string;   // สี Text เมื่อ Hover
  gradientClass: string; // Tailwind Class สำหรับ Gradient Hover
}

export interface AssessmentQuestion {
  id: string;
  label: string;
}

export interface AssessmentCategory {
  id: string;
  title: string;
  subTitle: string;
  questions: AssessmentQuestion[];
  theme: AssessmentTheme; // ✅ เก็บ Theme แยกรายหมวด
}

export const ratingOptions = [
  { value: 1, label: "น้อยที่สุด" },
  { value: 2, label: "น้อย" },
  { value: 3, label: "ปานกลาง" },
  { value: 4, label: "มาก" },
  { value: 5, label: "มากที่สุด" },
];

export const assessmentData: AssessmentCategory[] = [
  // 1. Soft Skills (สีชมพู)
  {
    id: "soft_skills",
    title: "ทักษะทางสังคม",
    subTitle: "(Basic soft skills)",
    theme: {
      main: "#D9436A",
      bgAnswered: "#FFF0F4",
      hoverText: "#D9436A",
      gradientClass: "from-[#FF9A9E] to-[#FECFEF]",
    },
    questions: [
      { id: "s2_q1", label: "ทักษะการนำเสนอและการสื่อสาร (Oral communication and presentation skills)" },
      { id: "s2_q2", label: "การทำงานเป็นทีม (Teamwork)" },
      { id: "s2_q3", label: "ด้านมนุษยสัมพันธ์ (Interpersonal skills)" },
      { id: "s2_q4", label: "ความยืดหยุ่นทางความคิด (Flexibility)" },
      { id: "s2_q5", label: "การสร้างแรงจูงใจ/แรงขับภายในตนเอง (Motivation and proactivity)" },
      { id: "s2_q6", label: "การมีความคิดริเริ่ม (Initiative)" },
      { id: "s2_q7", label: "การจัดการด้านอารมณ์/สภาพจิตใจ (Stress resilience)" },
    ],
  },
  // 2. Digital Skills (สีเขียว)
  {
    id: "digital_skills",
    title: "ทักษะด้านเทคโนโลยี/Digital",
    subTitle: "(Digital and technical skills)",
    theme: {
      main: "#7CB342", 
      bgAnswered: "#F6FBF2", 
      hoverText: "#7CB342",
      gradientClass: "from-[#AED581] to-[#DCEDC8]",
    },
    questions: [
      { id: "s2_q8", label: "ความรู้ด้านอินเทอร์เน็ตและซอฟแวร์ (Knowledge of Internet & software knowledge)" },
      { id: "s2_q9", label: "ความรู้เกี่ยวกับ Social media (Knowledge of social media)" },
      { id: "s2_q10", label: "ความรู้เกี่ยวกับการวิเคราะห์ข้อมูลเพื่อความได้เปรียบทางธุรกิจ (Knowledge of Analytics and real time practices)" },
      { id: "s2_q11", label: "ความรู้เกี่ยวกับ E-commerce (Knowledge of E-commerce)" },
      { id: "s2_q12", label: "ความรู้และการประยุกต์ใช้โมบายเทคโนโลยี (Knowledge of Mobile)" },
      { id: "s2_q13", label: "ความรู้ด้านการตลาดด้วยเครื่องมือค้นหาบนอินเทอร์เน็ต (SEO & SEM)" },
    ],
  },
  // 3. Marketing Skills (สีม่วง)
  {
    id: "marketing_skills",
    title: "ทักษะด้านการจัดการธุรกิจ",
    subTitle: "(Core marketing skills)",
    theme: {
      main: "#9C27B0",
      bgAnswered: "#F3E5F5", 
      hoverText: "#9C27B0",
      gradientClass: "from-[#CE93D8] to-[#E1BEE7]",
    },
    questions: [
      { id: "s2_q14", label: "ความรู้ด้านการตลาดพื้นฐาน (Basic Marketing)" },
      { id: "s2_q15", label: "การวางแผนกลยุทธ์ (Strategic Planning)" },
      { id: "s2_q16", label: "การบริหารจัดการแบรนด์ (Brand Management)" },
      { id: "s2_q17", label: "การสื่อสารทางการตลาด (Marketing Communication)" },
    ],
  },
  // 4. Analytical Skills (สีน้ำตาล)
  {
    id: "analytical_skills",
    title: "ทักษะด้านการวิเคราะห์/สังเคราะห์",
    subTitle: "(Analytical skills)",
    theme: {
      main: "#8D6E63", 
      bgAnswered: "#EFEBE9", 
      hoverText: "#8D6E63",
      gradientClass: "from-[#D7CCC8] to-[#BCAAA4]",
    },
    questions: [
      { id: "s2_q18", label: "ทักษะการแก้ปัญหา (Problem-solving)" },
      { id: "s2_q19", label: "มีแนวคิดที่ดีและความคิดเชิงวิเคราะห์ (Good conceptual and analytical skills)" },
      { id: "s2_q20", label: "ความรู้ด้านการขับเคลื่อนหรือการดำเนินงานด้วยข้อมูล (Data-driven/data-oriented)" },
      { id: "s2_q21", label: "ความรู้ด้านสถิติ (Statistical knowledge)" },
      { id: "s2_q22", label: "ความสามารถด้านสังเคราะห์ข้อมูลและสามารถนำไปใช้ปฏิบัติได้ (Ability to synthesize information into meaningful and actionable reports)" },
      { id: "s2_q23", label: "การคิดเชิงวิพากษ์ (Critical thinking)" },
    ],
  },
  // ✅ 5. Customer Insights Skills (สีฟ้าอมเขียว/Teal - เพิ่มใหม่ตามรูป)
  {
    id: "customer_skills",
    title: "ทักษะด้านลูกค้า",
    subTitle: "(Customer insights skills)",
    theme: {
      main: "#00838F",
      bgAnswered: "#E0F7FA",
      hoverText: "#00838F",
      gradientClass: "from-[#4DD0E1] to-[#B2EBF2]",
    },
    questions: [
      { id: "s2_q24", label: "ความเข้าใจในผู้บริโภค (Understanding consumers)" },
      { id: "s2_q25", label: "จิตวิทยาผู้บริโภค (Consumer psychology)" },
      { id: "s2_q26", label: "ความสามารถด้านการดูแลลูกค้า (Ability to handle customers)" },
      { id: "s2_q27", label: "ทักษะการบริการ (Service skills)" },
      { id: "s2_q28", label: "การบริหารความสัมพันธ์ลูกค้า (CRM)" },
    ],
  }
];