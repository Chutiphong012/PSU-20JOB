
import { SectionStructure, Question, QuestionOption } from "./questionnaireMock";

// ✅ Re-export standard interface
export { type SectionStructure, type Question };

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

// ✅ Standard Options 1-5
export const ratingOptions: QuestionOption[] = [
  { value: "1", label: { th: "น้อยที่สุด", en: "Least" } },
  { value: "2", label: { th: "น้อย", en: "Less" } },
  { value: "3", label: { th: "ปานกลาง", en: "Moderate" } },
  { value: "4", label: { th: "มาก", en: "Much" } },
  { value: "5", label: { th: "มากที่สุด", en: "Most" } },
];

// ✅ 1. Standard Structure (For Sidebar & Navigation)
export const assessmentStructure: SectionStructure[] = [
  { 
    id: "soft_skills", 
    label: { th: "ทักษะทางสังคม", en: "Social Skills" }, 
    subLabel: { th: "(Basic soft skills)", en: "(Basic soft skills)" },
    count: 7
  },
  { 
    id: "digital_skills", 
    label: { th: "ทักษะด้านเทคโนโลยี/Digital", en: "Technology/Digital Skills" }, 
    subLabel: { th: "(Digital and technical skills)", en: "(Digital and technical skills)" },
    count: 6
  },
  { 
    id: "marketing_skills", 
    label: { th: "ทักษะด้านการจัดการธุรกิจ", en: "Business Management Skills" }, 
    subLabel: { th: "(Core marketing skills)", en: "(Core marketing skills)" },
    count: 4
  },
  { 
    id: "analytical_skills", 
    label: { th: "ทักษะด้านการวิเคราะห์/สังเคราะห์", en: "Analytical/Synthesis Skills" }, 
    subLabel: { th: "(Analytical skills)", en: "(Analytical skills)" },
    count: 6
  },
  { 
    id: "customer_skills", 
    label: { th: "ทักษะด้านลูกค้า", en: "Customer Skills" }, 
    subLabel: { th: "(Customer insights skills)", en: "(Customer insights skills)" },
    count: 5
  },
];

// ✅ 2. Questions mapped to flattened list (or could be grouped, but flat is easier for single renderer if filtering by page/group)
// But to use QuestionnaireRenderer effectively with "Sub-parts", we can have separate arrays OR one big array filtered by "page" (where page = category index + 1)
// Let's use "page" to represent "category index + 1" to match existing logic.

export const questionsAssessment: Question[] = [
  // --- 1. Soft Skills (Page 1) ---
  { id: "s2_q1", page: 1, type: "rating", label: { th: "ทักษะการนำเสนอและการสื่อสาร", en: "Oral communication and presentation skills" }, options: ratingOptions, header: { th: "ทักษะทางสังคม (Social Skills)", en: "Social Skills" } },
  { id: "s2_q2", page: 1, type: "rating", label: { th: "การทำงานเป็นทีม", en: "Teamwork" }, options: ratingOptions },
  { id: "s2_q3", page: 1, type: "rating", label: { th: "ด้านมนุษยสัมพันธ์", en: "Interpersonal skills" }, options: ratingOptions },
  { id: "s2_q4", page: 1, type: "rating", label: { th: "ความยืดหยุ่นทางความคิด", en: "Flexibility" }, options: ratingOptions },
  { id: "s2_q5", page: 1, type: "rating", label: { th: "การสร้างแรงจูงใจ/แรงขับภายในตนเอง", en: "Motivation and proactivity" }, options: ratingOptions },
  { id: "s2_q6", page: 1, type: "rating", label: { th: "การมีความคิดริเริ่ม", en: "Initiative" }, options: ratingOptions },
  { id: "s2_q7", page: 1, type: "rating", label: { th: "การจัดการด้านอารมณ์/สภาพจิตใจ", en: "Stress resilience" }, options: ratingOptions },

  // --- 2. Digital Skills (Page 2) ---
  { id: "s2_q8", page: 2, type: "rating", label: { th: "ความรู้ด้านอินเทอร์เน็ตและซอฟแวร์", en: "Knowledge of Internet & software knowledge" }, options: ratingOptions, header: { th: "ทักษะด้านเทคโนโลยี (Digital Skills)", en: "Digital Skills" } },
  { id: "s2_q9", page: 2, type: "rating", label: { th: "ความรู้เกี่ยวกับ Social media", en: "Knowledge of social media" }, options: ratingOptions },
  { id: "s2_q10", page: 2, type: "rating", label: { th: "ความรู้เกี่ยวกับการวิเคราะห์ข้อมูลเพื่อความได้เปรียบทางธุรกิจ", en: "Knowledge of Analytics and real time practices" }, options: ratingOptions },
  { id: "s2_q11", page: 2, type: "rating", label: { th: "ความรู้เกี่ยวกับ E-commerce", en: "Knowledge of E-commerce" }, options: ratingOptions },
  { id: "s2_q12", page: 2, type: "rating", label: { th: "ความรู้และการประยุกต์ใช้โมบายเทคโนโลยี", en: "Knowledge of Mobile" }, options: ratingOptions },
  { id: "s2_q13", page: 2, type: "rating", label: { th: "ความรู้ด้านการตลาดด้วยเครื่องมือค้นหาบนอินเทอร์เน็ต", en: "SEO & SEM" }, options: ratingOptions },

  // --- 3. Marketing Skills (Page 3) ---
  { id: "s2_q14", page: 3, type: "rating", label: { th: "ความรู้ด้านการตลาดพื้นฐาน", en: "Basic Marketing" }, options: ratingOptions, header: { th: "ทักษะด้านการจัดการธุรกิจ (Business Skills)", en: "Business Management Skills" } },
  { id: "s2_q15", page: 3, type: "rating", label: { th: "การวางแผนกลยุทธ์", en: "Strategic Planning" }, options: ratingOptions },
  { id: "s2_q16", page: 3, type: "rating", label: { th: "การบริหารจัดการแบรนด์", en: "Brand Management" }, options: ratingOptions },
  { id: "s2_q17", page: 3, type: "rating", label: { th: "การสื่อสารทางการตลาด", en: "Marketing Communication" }, options: ratingOptions },

  // --- 4. Analytical Skills (Page 4) ---
  { id: "s2_q18", page: 4, type: "rating", label: { th: "ทักษะการแก้ปัญหา", en: "Problem-solving" }, options: ratingOptions, header: { th: "ทักษะด้านการวิเคราะห์ (Analytical Skills)", en: "Analytical Skills" } },
  { id: "s2_q19", page: 4, type: "rating", label: { th: "มีแนวคิดที่ดีและความคิดเชิงวิเคราะห์", en: "Good conceptual and analytical skills" }, options: ratingOptions },
  { id: "s2_q20", page: 4, type: "rating", label: { th: "ความรู้ด้านการขับเคลื่อนหรือการดำเนินงานด้วยข้อมูล", en: "Data-driven/data-oriented" }, options: ratingOptions },
  { id: "s2_q21", page: 4, type: "rating", label: { th: "ความรู้ด้านสถิติ", en: "Statistical knowledge" }, options: ratingOptions },
  { id: "s2_q22", page: 4, type: "rating", label: { th: "ความสามารถด้านสังเคราะห์ข้อมูลและสามารถนำไปใช้ปฏิบัติได้", en: "Ability to synthesize information into meaningful and actionable reports" }, options: ratingOptions },
  { id: "s2_q23", page: 4, type: "rating", label: { th: "การคิดเชิงวิพากษ์", en: "Critical thinking" }, options: ratingOptions },

  // --- 5. Customer Skills (Page 5) ---
  { id: "s2_q24", page: 5, type: "rating", label: { th: "ความเข้าใจในผู้บริโภค", en: "Understanding consumers" }, options: ratingOptions, header: { th: "ทักษะด้านลูกค้า (Customer Skills)", en: "Customer Skills" } },
  { id: "s2_q25", page: 5, type: "rating", label: { th: "จิตวิทยาผู้บริโภค", en: "Consumer psychology" }, options: ratingOptions },
  { id: "s2_q26", page: 5, type: "rating", label: { th: "ความสามารถด้านการดูแลลูกค้า", en: "Ability to handle customers" }, options: ratingOptions },
  { id: "s2_q27", page: 5, type: "rating", label: { th: "ทักษะการบริการ", en: "Service skills" }, options: ratingOptions },
  { id: "s2_q28", page: 5, type: "rating", label: { th: "การบริหารความสัมพันธ์ลูกค้า", en: "CRM" }, options: ratingOptions },
];