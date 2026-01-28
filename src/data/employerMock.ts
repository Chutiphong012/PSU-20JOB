// src/data/employerMock.ts

export interface LocalizedText {
  th: string;
  en: string;
}

// ----------------------------------------------------------------------
// 1. TYPE DEFINITIONS
// ----------------------------------------------------------------------

export interface QuestionOption {
  label: LocalizedText | string;
  value: string | number;
  skipToPart?: number;
  header?: LocalizedText | string;
  headerStyle?: string;
  withInput?: boolean; 
  placeholder?: LocalizedText | string;
  icon?: string;
}

export interface Condition {
  questionId: number;
  value: any;
}

export interface SubField {
  id: string;
  label: LocalizedText | string;
  type?: "text" | "number" | "dropdown";
  placeholder?: LocalizedText | string;
  options?: string[] | QuestionOption[];
  required?: boolean;
}

export interface Question {
  id: number;
  page: number;
  section?: LocalizedText | string;
  label: LocalizedText | string;
  type: 
    | "text" 
    | "number"
    | "radio" 
    | "checkbox" 
    | "dropdown" 
    | "textarea" 
    | "date"
    | "rating"
    | "address_group";
  required?: boolean;
  placeholder?: LocalizedText | string;
  options?: string[] | QuestionOption[];
  disabledCondition?: Condition;
  note?: string;
  subFields?: SubField[];
}

export interface SectionStructure {
  id: number;
  label: LocalizedText | string;
  subLabel?: LocalizedText | string;
  count: number;
}


// ----------------------------------------------------------------------
// 2. MOCK DATA
// ----------------------------------------------------------------------

// --- ตอนที่ 1: ข้อมูลทั่วไป (ID: 1-10) ---
// --- ตอนที่ 1: ข้อมูลทั่วไป (ID: 1-10) ---
export const employerPart1: Question[] = [
  {
    id: 1, page: 1, section: { th: "ข้อมูลทั่วไปเกี่ยวกับผู้ตอบแบบสอบถาม", en: "General Information about Respondent" },
    label: { th: "เพศ", en: "Gender" }, type: "dropdown", placeholder: { th: "เลือกคำตอบของคุณ", en: "Select your answer" },
    options: [
      { label: { th: "ชาย", en: "Male" }, value: "male" },
      { label: { th: "หญิง", en: "Female" }, value: "female" },
      { label: { th: "LGBTQ+", en: "LGBTQ+" }, value: "lgbtq" }
    ], required: true,
  },
  {
    id: 2, page: 1, label: { th: "อายุ", en: "Age" }, type: "number",
    placeholder: { th: "อายุต้องอยู่ระหว่าง 20 - 99", en: "Age must be between 20 - 99" }, required: true,
  },
  {
    id: 3, page: 1, label: { th: "ระดับตำแหน่งของท่านในหน่วยงาน", en: "Your Position Level" }, type: "radio",
    required: true,
    options: [
      { label: { th: "ผู้บริหารระดับสูง/เจ้าของกิจการ", en: "Senior Executive / Business Owner" }, value: "high_level" },
      { label: { th: "ผู้บริหารระดับกลาง/ผู้จัดการ", en: "Middle Management / Manager" }, value: "mid_level" },
      { label: { th: "ผู้บริหารระดับต้น/หัวหน้างาน", en: "Junior Management / Supervisor" }, value: "low_level" },
      { label: { th: "อื่น ๆ", en: "Other" }, value: "other", withInput: true, placeholder: { th: "โปรดระบุตำแหน่ง", en: "Please specify position" } },
    ],
  },
  {
    id: 4, page: 2, section: { th: "ความสัมพันธ์กับบัณฑิต", en: "Relationship with Graduate" },
    label: { th: "ความสัมพันธ์กับบัณฑิต", en: "Relationship with Graduate" }, type: "radio", required: true,
    options: [
      { label: { th: "ผู้บังคับบัญชาระดับต้น", en: "Direct Supervisor" }, value: "direct_supervisor" },
      { label: { th: "ผู้บังคับบัญชาโดยสายการบังคับบัญชา", en: "Line Manager" }, value: "Line Manager" },
      { label: { th: "ผู้ร่วมงาน", en: "Colleague" }, value: "colleague" },
      { label: { th: "อื่น ๆ", en: "Other" }, value: "other", withInput: true, placeholder: { th: "โปรดระบุ", en: "Please specify" } },
    ],
  },
  {
    id: 5, page: 2, label: { th: "ระยะเวลาที่ได้ร่วมงานกับบัณฑิต", en: "Duration of working with Graduate" }, type: "radio", required: true,
    options: [
      { label: { th: "น้อยกว่า 6 เดือน", en: "Less than 6 months" }, value: "<6m" },
      { label: { th: "6 - 12 เดือน", en: "6 - 12 months" }, value: "6-12m" },
      { label: { th: "มากกว่า 1 ปี", en: "More than 1 year" }, value: ">1y" },
      { label: { th: "อื่น ๆ", en: "Other" }, value: "other", withInput: true, placeholder: { th: "โปรดระบุ", en: "Please specify" } },
    ],
  },
  {
    id: 6, page: 2, label: { th: "ชื่อ-สกุล บัณฑิต ที่อยู่ในความดูแลของท่าน", en: "Name-Surname of Graduate under your supervision" },
    type: "text", placeholder: { th: "โปรดระบุชื่อ-สกุลบัณฑิตที่ท่านทำงานร่วมด้วย", en: "Please specify name-surname of graduate" }, required: true,
  },
  {
    id: 7, page: 3, section: { th: "ข้อมูลหน่วยงานหรือสถานประกอบการ", en: "Organization Information" },
    label: { th: "ลักษณะของหน่วยงาน", en: "Organization Type" }, type: "radio", required: true,
    options: [
      { label: { th: "หน่วยงานของรัฐ/องค์กรในกำกับของรัฐ", en: "Government Agency / State-supervised Org" }, value: "gov" },
      { label: { th: "บริษัทเอกชน/หน่วยงานเอกชน", en: "Private Company" }, value: "private" },
      { label: { th: "รัฐวิสาหกิจ/องค์กรมหาชน", en: "State Enterprise / Public Org" }, value: "state_enterprise" },
      { label: { th: "อื่น ๆ", en: "Other" }, value: "other", withInput: true, placeholder: { th: "โปรดระบุ", en: "Please specify" } },
    ],
  },
  {
    id: 8, page: 3, label: { th: "ชื่อหน่วยงานหรือสถานประกอบการ", en: "Organization Name" },
    type: "text", placeholder: { th: "โปรดระบุชื่อหน่วยงานหรือสถานประกอบการ", en: "Please specify organization name" }, required: true,
  },
  {
    id: 9, page: 3, label: { th: "อีเมล", en: "Email" }, type: "text", placeholder: { th: "example@email.com", en: "example@email.com" }, required: true,
  },
  {
    id: 10, page: 3, label: { th: "เว็บไซต์ (ถ้ามี)", en: "Website (Optional)" }, type: "text", placeholder: { th: "www.example.com", en: "www.example.com" }, required: false,
  },
];

// --- ตอนที่ 2: ความพึงพอใจ (ID: 11-25) ---
// --- ตอนที่ 2: ความพึงพอใจ (ID: 11-25) ---
export const employerPart2: Question[] = [
  { id: 11, page: 4, label: { th: "1. ความซื่อสัตย์ สุจริต มีวินัย", en: "1. Honesty, integrity, and discipline" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 12, page: 4, label: { th: "2. ความรับผิดชอบต่อตนเองและสังคม", en: "2. Responsibility to self and society" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 13, page: 4, label: { th: "3. ความร่วมมือทำงานที่เป็นประโยชน์ต่อส่วนรวม ด้วยความเสียสละ", en: "3. Cooperation for public benefit with sacrifice" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 14, page: 4, label: { th: "4. ปฏิบัติตามบนพื้นฐานจรรยาบรรณวิชาการและวิชาชีพ", en: "4. Adherence to academic and professional ethics" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 15, page: 4, label: { th: "5. ความรู้ในสาขาที่เรียน และสามารถประยุกต์ร่วมกับความรู้อื่นที่จำเป็นในการปฏิบัติงาน", en: "5. Knowledge in major and application with other necessary knowledge" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 16, page: 5, label: { th: "6. ความใฝ่รู้ ค้นคว้าและวิเคราะห์ข้อมูลได้ด้วยตนเอง สามารถแก้ปัญหาอย่างเป็นระบบ", en: "6. Eagerness to learn, research, and self-analysis" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 17, page: 5, label: { th: "7. ความคิดริเริ่มสร้างสรรค์ นำเสนอแนวคิดใหม่ ๆ สามารถคิดวิเคราะห์โดยบูรณาการความรู้ที่หลากหลายเพื่อพัฒนางาน", en: "7. Creativity and innovation" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 18, page: 5, label: { th: "8. ใช้กระบวนการค้นหาความรู้และกระบวนการวิจัยที่เป็นระบบเพื่อพัฒนางาน", en: "8. Use of systematic research processes" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 19, page: 5, label: { th: "9. ปรับตัวเข้ากับสภาพแวดล้อมและสังคม มีมนุษยสัมพันธ์ มีส่วนร่วมในการแก้ปัญหาขององค์กร", en: "9. Adaptability and social relations" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 20, page: 5, label: { th: "10. ยอมรับความแตกต่างทางวัฒนธรรม เข้าใจและเห็นใจผู้อื่น สามารถควบคุมอารมณ์ และอยู่ร่วมกับผู้อื่นได้", en: "10. Acceptance of cultural differences and empathy" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 21, page: 6, label: { th: "11. ทำงานเป็นทีม ยอมรับและปฏิบัติตามกฎระเบียบ รับฟังและแลกเปลี่ยนความคิดเห็นผู้อื่น", en: "11. Teamwork and rule compliance" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 22, page: 6, label: { th: "12. มีภาวะผู้นำ กล้าคิด กล้าทำสิ่งใหม่ ๆ สามารถบริหารจัดการแบ่งงาน และติดตามงานได้อย่างเหมาะสม", en: "12. Leadership and management" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 23, page: 6, label: { th: "13. สามารถใช้เทคโนโลยีสารสนเทศ ค้นหาความรู้ การปฏิบัติงาน สร้างงาน และนำเสนองาน", en: "13. IT skills for work and presentation" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 24, page: 6, label: { th: "14. สามารถติดต่อสื่อสารกับผู้อื่นได้ถูกต้อง ชัดเจน โดยเลือกใช้สื่อที่เหมาะสมกับสถานการณ์", en: "14. Communication skills" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 25, page: 6, label: { th: "15. สามารถใช้ภาษาอังกฤษ/ภาษาต่างประเทศ เพื่อการติดต่อสื่อสาร ทั้งการพูด ฟัง และเขียน", en: "15. English/Foreign language skills" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
];

// --- ตอนที่ 3: ทักษะทางวิชาชีพ (Branching) ---
export const employerPart3Categories: Question = {
  id: 30, page: 7, label: { th: "ทักษะทางวิชาชีพ", en: "Professional Skills" }, type: "radio", required: true,
  options: [
    { label: { th: "คณะพยาบาลศาสตร์", en: "Faculty of Nursing" }, value: "nursing" },
    { label: { th: "คณะการแพทย์แผนไทย", en: "Faculty of Traditional Thai Medicine" }, value: "thai_medicine" },
    { label: { th: "คณะแพทยศาสตร์", en: "Faculty of Medicine" }, value: "medicine" },
    { label: { th: "คณะแพทยศาสตร์ สาขาวิชากายภาพบำบัด", en: "Faculty of Medicine (Physical Therapy)" }, value: "physical_therapy" },
    { label: { th: "คณะแพทยศาสตร์ สาขาวิชารังสี", en: "Faculty of Medicine (Radiology)" }, value: "radiology" },
    { label: { th: "คณะทันตแพทยศาสตร์", en: "Faculty of Dentistry" }, value: "dentistry" },
    { label: { th: "คณะเภสัชศาสตร์", en: "Faculty of Pharmaceutical Sciences" }, value: "pharmacy" },
    { label: { th: "คณะเทคนิคการแพทย์", en: "Faculty of Medical Technology" }, value: "medical_tech" },
    { label: { th: "สาขาครุศาสตร์และสาขาศึกษาศาสตร์", en: "Education" }, value: "education" },
    { label: { th: "อื่น ๆ", en: "Other" }, value: "other", withInput: true, placeholder: { th: "โปรดระบุ", en: "Please specify" } },
  ],
};

export const professionalQuestions: Record<string, Question[]> = {
  nursing: [
    { id: 31, page: 8, label: { th: "สามารถปฏิบัติทักษะการพยาบาลอย่างเป็นองค์รวมโดยประยุกต์ใช้ศาสตร์และศิลปะทางการพยาบาล", en: "Able to perform holistic nursing skills by applying nursing science and art" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 32, page: 8, label: { th: "สามารถปฏิบัติการสร้างเสริมสุขภาพการป้องกันโรค การรักษาพยาบาลการบำบัดและการบรรเทาอาการ และการฟื้นฟูสุขภาพ", en: "Able to perform health promotion, disease prevention, treatment, symptom relief, and rehabilitation" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 33, page: 8, label: { th: "สามารถปฏิบัติการพยาบาลด้วยความเมตตา กรุณา โดยยึดมั่นในคุณธรรม จริยธรรม กฎหมาย และสิทธิของผู้ป่วย", en: "Able to practice nursing with compassion while adhering to ethics, laws, and patient rights" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 34, page: 8, label: { th: "สามารถปฏิบัติการพยาบาลโดยคำนึงถึงความเป็นปัจเจกบุคคล และความหลากหลายทางวัฒนธรรม", en: "Able to practice nursing considering individual differences and cultural diversity" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 35, page: 8, label: { th: "สามารถบริหารทีมการพยาบาล ทีมสหวิชาชีพ และการทำงานในชุมชน/ในหน่วยบริการสุขภาพ", en: "Able to manage nursing teams, multidisciplinary teams, and work in community/health service units" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],

  thai_medicine: [
    { id: 41, page: 8, label: { th: "ความสามารถในการทำหัตถการทางการแพทย์แผนไทยประยุกต์ตามมาตรฐานวิชาชีพสาขาการแพทย์แผนไทย", en: "Ability to perform Thai traditional medicine procedures according to professional standards" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],

  medicine: [
    { id: 51, page: 8, label: { th: "สามารถสังเกตอากัปกิริยาท่าทีของผู้ป่วยและญาติ", en: "Able to observe patient and relative behaviors" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 52, page: 8, label: { th: "สามารถซักประวัติและตรวจร่างกายผู้ป่วยได้อย่างครอบคลุมและเหมาะสม", en: "Able to take comprehensive and appropriate patient history and physical examination" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 53, page: 8, label: { th: "สามารถตรวจและแปลผลโดยเครื่องมือพื้นฐานและการตรวจทางห้องปฏิบัติการ โดยคำนึงถึงความคุ้มค่าและเหมาะสม", en: "Able to examine and interpret results using basic instruments and laboratory tests cost-effectively" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 54, page: 8, label: { th: "การมีทักษะในการให้การดูแลรักษา และทำหัตถการที่จำเป็น", en: "Having skills in providing treatment and performing necessary procedures" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],

  physical_therapy: [
    { id: 61, page: 8, label: { th: "สามารถปฏิบัติทักษะทางวิชาชีพกายภาพบำบัด ในการตรวจประเมิน วินิจฉัยทางกายภาพ บำบัด ป้องกัน บำบัดรักษา ฟื้นฟูและส่งเสริมสุขภาพแก่ผู้ใช้บริการตามมาตรฐาน", en: "Able to perform physical therapy skills in assessment, diagnosis, treatment, prevention, rehabilitation and health promotion according to standards" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],

  radiology: [
    { id: 71, page: 8, label: { th: "สามารถปฏิบัติทักษะทางวิชาชีพในการตรวจประเมิน วินิจฉัย ผู้ใช้บริการตามมาตรฐาน", en: "Able to perform professional skills in assessment and diagnosis according to standards" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],
  
  dentistry: [
    { id: 81, page: 8, label: { th: "สามารถรวบรวมข้อมูลโดยการซักประวัติ และการตรวจ ประเมินสภาวะผู้ป่วยได้อย่างถูกต้อง เป็นระบบตามมาตรฐานวิชาชีพ", en: "Able to collect data through history taking and patient assessment systematically according to professional standards" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 82, page: 8, label: { th: "สามารถวินิจฉัยเบื้องต้นและวินิจฉัยแยกโรค โดยการแปลผลที่ได้จากข้อมูลต่างๆ", en: "Able to make preliminary and differential diagnosis by interpreting various data" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 83, page: 8, label: { th: "สามารถวางแผนการรักษา โดยใช้หลักสุขภาพองค์รวมและการมีส่วนร่วมของผู้ป่วย ทำการให้คำปรึกษา", en: "Able to plan treatment using holistic health principles with patient participation and provide consultation" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 84, page: 8, label: { th: "สามารถจัดการรักษา ฟื้นฟูสภาพในช่องปาก รวมทั้งติดตามและประเมินผลการรักษาได้อย่างเหมาะสม", en: "Able to manage treatment, oral rehabilitation, and appropriately follow up and evaluate treatment outcomes" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 85, page: 8, label: { th: "สามารถจัดการสภาวะแทรกซ้อนและภาวะฉุกเฉินทางทันตกรรม", en: "Able to manage complications and dental emergencies" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 86, page: 8, label: { th: "ความสามารถส่งเสริมสุขภาพและป้องกันโรคในช่องปาก ทั้งระดับบุคคล ครอบครัวและชุมชน โดยใช้หลักสุขภาพองค์รวม", en: "Ability to promote oral health and prevent disease at individual, family, and community levels using holistic health principles" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],

  pharmacy: [
    { id: 91, page: 8, label: { th: "สามารถปฏิบัติงานในการแก้ไขปัญหาในสถานการณ์จริง สุขภาพแก่ผู้ใช้บริการตามมาตรฐาน", en: "Able to solve problems in real situations and provide health services according to standards" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 92, page: 8, label: { th: "สามารถปฏิบัติงานเกี่ยวกับการให้การบริบาลทางเภสัชกรรมและบริหารจัดการเรื่องยา และมีทักษะในการแก้ไข", en: "Able to provide pharmaceutical care, drug management, and problem-solving skills" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 93, page: 8, label: { th: "สามารถปฏิบัติงานเกี่ยวกับระบบสุขภาพ ระบบยาและการคุ้มครองผู้บริโภค", en: "Able to work on health systems, drug systems, and consumer protection" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],

  medical_tech: [
    { id: 101, page: 8, label: { th: "สามารถปฏิบัติงานได้อย่างมีคุณภาพตามมาตรฐานวิชาชีพ และมาตรฐานอื่น ๆ ที่เกี่ยวข้อง", en: "Able to perform quality work according to professional and related standards" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 102, page: 8, label: { th: "สามารถปฏิบัติงานในการสร้างเสริมสุขภาพ ป้องกัน ช่วยวินิจฉัย ติดตามการรักษา และเฝ้าระวังโรค ให้กับผู้ใช้บริการชุมชนและสังคม", en: "Able to work in health promotion, prevention, diagnosis assistance, treatment monitoring, and disease surveillance for community and society" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 103, page: 8, label: { th: "สามารถรวบรวมข้อมูลการปฏิบัติงานทางเทคนิคการแพทย์ วิเคราะห์สังเคราะห์ผลงาน และนำเสนอเพื่อแก้ปัญหา", en: "Able to collect medical technology work data, analyze and synthesize results, and present solutions" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 104, page: 8, label: { th: "สามารถเลือกใช้เทคโนโลยีที่เหมาะสมในการปฏิบัติงานทางเทคนิคการแพทย์ และการดูแลสุขภาพ", en: "Able to select appropriate technology for medical technology work and healthcare" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 105, page: 8, label: { th: "ให้คำปรึกษา แนะนำ หรืออธิบายเกี่ยวกับการตรวจทางเทคนิคการแพทย์ แก่ผู้เกี่ยวข้องอย่างเหมาะสม", en: "Provide appropriate consultation, advice, or explanation about medical technology tests to relevant parties" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],

  education: [
    { id: 111, page: 8, label: { th: "ความเชี่ยวชาญในการจัดการเรียนรู้ที่มีรูปแบบหลากหลายอย่างสร้างสรรค์", en: "Expertise in creative and diverse learning management" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 112, page: 8, label: { th: "ความเชี่ยวชาญในการจัดการเรียนรู้สำหรับผู้เรียนที่หลากหลายอย่างมีนวัตกรรม", en: "Expertise in innovative learning management for diverse learners" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 113, page: 8, label: { th: "ความเชี่ยวชาญในการจัดการเรียนรู้ที่จะสอนอย่างบูรณาการ", en: "Expertise in integrated teaching and learning management" }, type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],

};

/// ตอนที่ 4: ความคิดเห็น และข้อเสนอแนะ (ID: 121-123)
export const employerPart4: Question[] = [
  {
    id: 121, page: 9,
    label: { th: "คุณลักษณะที่ท่านเห็นว่าเป็นจุดเด่น/จุดแข็งของบัณฑิตมหาวิทยาลัยสงขลานครินทร์ (โปรดระบุ)", en: "Attributes you consider as strengths of PSU graduates (Please specify)" },
    type: "textarea", required: true, placeholder: { th: "ระบุคำตอบของท่าน", en: "Specify your answer" }
  },
  {
    id: 122, page: 9,
    label: { th: "คุณลักษณะที่ท่านเห็นว่าควรปรับปรุง ของบัณฑิตมหาวิทยาลัยสงขลานครินทร์ (โปรดระบุ)", en: "Attributes you consider should be improved of PSU graduates (Please specify)" },
    type: "textarea", required: true, placeholder: { th: "ระบุคำตอบของท่าน", en: "Specify your answer" }
  },
  {
    id: 123, page: 9,
    label: { th: "ข้อเสนอแนะอื่น ๆ (โปรดระบุ)", en: "Other suggestions (Please specify)" },
    type: "textarea", required: true, placeholder: { th: "ระบุคำตอบของท่าน", en: "Specify your answer" }
  },
];


// --- Structure สำหรับ Sidebar (แก้ไข Count ให้ตรงจริง) ---
export const employerStructure: SectionStructure[] = [
  {
    id: 1, label: { th: "ตอนที่ 1 ข้อมูลทั่วไป", en: "Part 1 General Information" },
    subLabel: { th: "ข้อมูลทั่วไปเกี่ยวกับหน่วยงานและผู้ตอบแบบสอบถาม", en: "General info about organization and respondent" },
    count: 9, // มี 10 ข้อ แต่ required 9 ข้อ (อีเมล required, เว็บไซต์ไม่ required)
  },
  {
    id: 2, label: { th: "ตอนที่ 2 ความพึงพอใจ", en: "Part 2 Satisfaction" },
    subLabel: { th: "ระดับความพึงพอใจของนายจ้างหรือผู้ใช้บัณฑิตต่อการปฏิบัติงานของบัณฑิต", en: "Satisfaction level of employer regarding graduate performance" },
    count: 15,
  },
  {
    id: 3, label: { th: "ตอนที่ 3 ทักษะทางวิชาชีพ", en: "Part 3 Professional Skills" },
    subLabel: { th: "ระดับความพึงพอใจทักษะทางจิตพิสัยของสาขาวิชาชีพ", en: "Satisfaction level of professional skills" },
    count: 6, // 1 (เลือกคณะ) + 5 (คำถามคณะ)
  },
  {
    id: 4, label: { th: "ตอนที่ 4 ข้อเสนอแนะ", en: "Part 4 Suggestions" },
    subLabel: { th: "ความคิดเห็น และข้อเสนอแนะ", en: "Comments and Suggestions" },
    count: 1,
  },
];