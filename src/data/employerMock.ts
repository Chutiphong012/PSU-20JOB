// src/data/employerMock.ts

// ----------------------------------------------------------------------
// 1. TYPE DEFINITIONS
// ----------------------------------------------------------------------

export interface QuestionOption {
  label: string;
  value: string | number;
  skipToPart?: number;
  header?: string;
  withInput?: boolean; 
  placeholder?: string;
}

export interface Condition {
  questionId: number;
  value: any;
}

export interface Question {
  id: number;
  page: number;
  section?: string;
  label: string;
  type: 
    | "text" 
    | "number"
    | "radio" 
    | "checkbox" 
    | "dropdown" 
    | "textarea" 
    | "date";
  required?: boolean;
  placeholder?: string;
  options?: string[] | QuestionOption[];
  disabledCondition?: Condition;
  note?: string;
}

export interface SectionStructure {
  id: number;
  label: string;
  subLabel?: string;
  count: number;
}


// ----------------------------------------------------------------------
// 2. MOCK DATA
// ----------------------------------------------------------------------

// --- ตอนที่ 1: ข้อมูลทั่วไป (ID: 1-10) ---
export const employerPart1: Question[] = [
  {
    id: 1, page: 1, section: "ข้อมูลทั่วไปเกี่ยวกับผู้ตอบแบบสอบถาม",
    label: "เพศ", type: "dropdown", placeholder: "เลือกคำตอบของคุณ",
    options: ["ชาย", "หญิง", "LGBTQ+"], required: true,
  },
  {
    id: 2, page: 1, label: "อายุ", type: "number",
    placeholder: "อายุต้องอยู่ระหว่าง 20 - 99", required: true,
  },
  {
    id: 3, page: 1, label: "ระดับตำแหน่งของท่านในหน่วยงาน", type: "radio",
    required: true,
    options: [
      { label: "ผู้บริหารระดับสูง/เจ้าของกิจการ", value: "high_level" },
      { label: "ผู้บริหารระดับกลาง/ผู้จัดการ", value: "mid_level" },
      { label: "ผู้บริหารระดับต้น/หัวหน้างาน", value: "low_level" },
      { label: "อื่น ๆ", value: "other", withInput: true, placeholder: "โปรดระบุตำแหน่ง" },
    ],
  },
  {
    id: 4, page: 2, section: "ความสัมพันธ์กับบัณฑิต",
    label: "ความสัมพันธ์กับบัณฑิต", type: "radio", required: true,
    options: [
      { label: "ผู้บังคับบัญชาระดับต้น", value: "direct_supervisor" },
      { label: "ผู้บังคับบัญชาโดยสายการบังคับบัญชา", value: "line_manager" },
      { label: "ผู้ร่วมงาน", value: "colleague" },
      { label: "อื่น ๆ", value: "other", withInput: true, placeholder: "โปรดระบุ" },
    ],
  },
  {
    id: 5, page: 2, label: "ระยะเวลาที่ได้ร่วมงานกับบัณฑิต", type: "radio", required: true,
    options: [
      { label: "น้อยกว่า 6 เดือน", value: "<6m" },
      { label: "6 - 12 เดือน", value: "6-12m" },
      { label: "มากกว่า 1 ปี", value: ">1y" },
      { label: "อื่น ๆ", value: "other", withInput: true, placeholder: "โปรดระบุ" },
    ],
  },
  {
    id: 6, page: 2, label: "ชื่อ-สกุล บัณฑิต ที่อยู่ในความดูแลของท่าน",
    type: "text", placeholder: "โปรดระบุชื่อ-สกุลบัณฑิตที่ท่านทำงานร่วมด้วย", required: true,
  },
  {
    id: 7, page: 3, section: "ข้อมูลหน่วยงานหรือสถานประกอบการ",
    label: "ลักษณะของหน่วยงาน", type: "radio", required: true,
    options: [
      { label: "หน่วยงานของรัฐ/องค์กรในกำกับของรัฐ", value: "gov" },
      { label: "บริษัทเอกชน/หน่วยงานเอกชน", value: "private" },
      { label: "รัฐวิสาหกิจ/องค์กรมหาชน", value: "state_enterprise" },
      { label: "อื่น ๆ", value: "other", withInput: true, placeholder: "โปรดระบุ" },
    ],
  },
  {
    id: 8, page: 3, label: "ชื่อหน่วยงานหรือสถานประกอบการ",
    type: "text", placeholder: "โปรดระบุชื่อหน่วยงานหรือสถานประกอบการ", required: true,
  },
  {
    id: 9, page: 3, label: "อีเมล", type: "text", placeholder: "example@email.com", required: true,
  },
  {
    id: 10, page: 3, label: "เว็บไซต์ (ถ้ามี)", type: "text", placeholder: "www.example.com", required: false,
  },
];

// --- ตอนที่ 2: ความพึงพอใจ (ID: 11-25) ---
export const employerPart2: Question[] = [
  { id: 11, page: 4, label: "1. ความซื่อสัตย์ สุจริต มีวินัย", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 12, page: 4, label: "2. ความรับผิดชอบต่อตนเองและสังคม", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 13, page: 4, label: "3. ความร่วมมือทำงานที่เป็นประโยชน์ต่อส่วนรวม ด้วยความเสียสละ", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 14, page: 4, label: "4. ปฏิบัติตามบนพื้นฐานจรรยาบรรณวิชาการและวิชาชีพ", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 15, page: 4, label: "5. ความรู้ในสาขาที่เรียน และสามารถประยุกต์ร่วมกับความรู้อื่นที่จำเป็นในการปฏิบัติงาน", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 16, page: 5, label: "6. ความใฝ่รู้ ค้นคว้าและวิเคราะห์ข้อมูลได้ด้วยตนเอง สามารถแก้ปัญหาอย่างเป็นระบบ", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 17, page: 5, label: "7. ความคิดริเริ่มสร้างสรรค์ นำเสนอแนวคิดใหม่ ๆ สามารถคิดวิเคราะห์โดยบูรณาการความรู้ที่หลากหลายเพื่อพัฒนางาน", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 18, page: 5, label: "8. ใช้กระบวนการค้นหาความรู้และกระบวนการวิจัยที่เป็นระบบเพื่อพัฒนางาน", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 19, page: 5, label: "9. ปรับตัวเข้ากับสภาพแวดล้อมและสังคม มีมนุษยสัมพันธ์ มีส่วนร่วมในการแก้ปัญหาขององค์กร", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 20, page: 5, label: "10. ยอมรับความแตกต่างทางวัฒนธรรม เข้าใจและเห็นใจผู้อื่น สามารถควบคุมอารมณ์ และอยู่ร่วมกับผู้อื่นได้", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 21, page: 6, label: "11. ทำงานเป็นทีม ยอมรับและปฏิบัติตามกฎระเบียบ รับฟังและแลกเปลี่ยนความคิดเห็นผู้อื่น", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 22, page: 6, label: "12. มีภาวะผู้นำ กล้าคิด กล้าทำสิ่งใหม่ ๆ สามารถบริหารจัดการแบ่งงาน และติดตามงานได้อย่างเหมาะสม", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 23, page: 6, label: "13. สามารถใช้เทคโนโลยีสารสนเทศ ค้นหาความรู้ การปฏิบัติงาน สร้างงาน และนำเสนองาน", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 24, page: 6, label: "14. สามารถติดต่อสื่อสารกับผู้อื่นได้ถูกต้อง ชัดเจน โดยเลือกใช้สื่อที่เหมาะสมกับสถานการณ์", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  { id: 25, page: 6, label: "15. สามารถใช้ภาษาอังกฤษ/ภาษาต่างประเทศ เพื่อการติดต่อสื่อสาร ทั้งการพูด ฟัง และเขียน", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
];

// --- ตอนที่ 3: ทักษะทางวิชาชีพ (Branching) ---
export const employerPart3Categories: Question = {
  id: 30, page: 7, label: "ทักษะทางวิชาชีพ", type: "radio", required: true,
  options: [
    { label: "คณะพยาบาลศาสตร์", value: "nursing" },
    { label: "คณะการแพทย์แผนไทย", value: "thai_medicine" },
    { label: "คณะแพทยศาสตร์", value: "medicine" },
    { label: "คณะแพทยศาสตร์ สาขาวิชากายภาพบำบัด", value: "physical_therapy" },
    { label: "คณะแพทยศาสตร์ สาขาวิชารังสี", value: "radiology" },
    { label: "คณะทันตแพทยศาสตร์", value: "dentistry" },
    { label: "คณะเภสัชศาสตร์", value: "pharmacy" },
    { label: "คณะเทคนิคการแพทย์", value: "medical_tech" },
    { label: "สาขาครุศาสตร์และสาขาศึกษาศาสตร์", value: "education" },
    { label: "อื่น ๆ", value: "other", withInput: true, placeholder: "โปรดระบุ" },
  ],
};

export const professionalQuestions: Record<string, Question[]> = {
  nursing: [
    { id: 31, page: 8, label: "สามารถปฏิบัติทักษะการพยาบาลอย่างเป็นองค์รวมโดยประยุกต์ใช้ศาสตร์และศิลปะทางการพยาบาล", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 32, page: 8, label: "สามารถปฏิบัติการสร้างเสริมสุขภาพการป้องกันโรค การรักษาพยาบาลการบำบัดและการบรรเทาอาการ และการฟื้นฟูสุขภาพ", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 33, page: 8, label: "สามารถปฏิบัติการพยาบาลด้วยความเมตตา กรุณา โดยยึดมั่นในคุณธรรม จริยธรรม กฎหมาย และสิทธิของผู้ป่วย", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 34, page: 8, label: "สามารถปฏิบัติการพยาบาลโดยคำนึงถึงความเป็นปัจเจกบุคคล และความหลากหลายทางวัฒนธรรม", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 35, page: 8, label: "สามารถบริหารทีมการพยาบาล ทีมสหวิชาชีพ และการทำงานในชุมชน/ในหน่วยบริการสุขภาพ", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],

  thai_medicine: [
    { 
      id: 41, 
      page: 8, 
      label: "ความสามารถในการทำหัตถการทางการแพทย์แผนไทยประยุกต์ตามมาตรฐานวิชาชีพสาขาการแพทย์แผนไทย", 
      type: "radio", 
      required: true, 
      options: ["1", "2", "3", "4", "5"] 
    },
  ],

  medicine: [
    { id: 51, page: 8, label: "สามารถสังเกตอากัปกิริยาท่าทีของผู้ป่วยและญาติ", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 52, page: 8, label: "สามารถซักประวัติและตรวจร่างกายผู้ป่วยได้อย่างครอบคลุมและเหมาะสม", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 53, page: 8, label: "สามารถตรวจและแปลผลโดยเครื่องมือพื้นฐานและการตรวจทางห้องปฏิบัติการ โดยคำนึงถึงความคุ้มค่าและเหมาะสม", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
    { id: 54, page: 8, label: "การมีทักษะในการให้การดูแลรักษา และทำหัตถการที่จำเป็น", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],
  physical_therapy: [
    { id: 61, page: 8, label: "สามารถปฏิบัติทักษะทางวิชาชีพกายภาพบำบัด ในการตรวจประเมิน วินิจฉัยทางกายภาพ บำบัด ป้องกัน บำบัดรักษา ฟื้นฟูและส่งเสริมสุขภาพแก่ผู้ใช้บริการตามมาตรฐาน", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],

  radiology: [
    { id: 71, page: 8, label: "สามารถปฏิบัติทักษะทางวิชาชีพในการตรวจประเมิน วินิจฉัย ผู้ใช้บริการตามมาตรฐาน", type: "radio", required: true, options: ["1", "2", "3", "4", "5"] },
  ],
  
  dentistry: [
    { 
      id: 81, page: 8, 
      label: "สามารถรวบรวมข้อมูลโดยการซักประวัติ และการตรวจ ประเมินสภาวะผู้ป่วยได้อย่างถูกต้อง เป็นระบบตามมาตรฐานวิชาชีพ", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 82, page: 8, 
      label: "สามารถวินิจฉัยเบื้องต้นและวินิจฉัยแยกโรค โดยการแปลผลที่ได้จากข้อมูลต่างๆ", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 83, page: 8, 
      label: "สามารถวางแผนการรักษา โดยใช้หลักสุขภาพองค์รวมและการมีส่วนร่วมของผู้ป่วย ทำการให้คำปรึกษา", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 84, page: 8, 
      label: "สามารถจัดการรักษา ฟื้นฟูสภาพในช่องปาก รวมทั้งติดตามและประเมินผลการรักษาได้อย่างเหมาะสม", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 85, page: 8, 
      label: "สามารถจัดการสภาวะแทรกซ้อนและภาวะฉุกเฉินทางทันตกรรม", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 86, page: 8, 
      label: "ความสามารถส่งเสริมสุขภาพและป้องกันโรคในช่องปาก ทั้งระดับบุคคล ครอบครัวและชุมชน โดยใช้หลักสุขภาพองค์รวม", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
  ],

  pharmacy: [
    { 
      id: 91, page: 8, 
      label: "สามารถปฏิบัติงานในการแก้ไขปัญหาในสถานการณ์จริง สุขภาพแก่ผู้ใช้บริการตามมาตรฐาน", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 92, page: 8, 
      label: "สามารถปฏิบัติงานเกี่ยวกับการให้การบริบาลทางเภสัชกรรมและบริหารจัดการเรื่องยา และมีทักษะในการแก้ไข", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 93, page: 8, 
      label: "สามารถปฏิบัติงานเกี่ยวกับระบบสุขภาพ ระบบยาและการคุ้มครองผู้บริโภค", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
  ],

  medical_tech: [
    { 
      id: 101, page: 8, 
      label: "สามารถปฏิบัติงานได้อย่างมีคุณภาพตามมาตรฐานวิชาชีพ และมาตรฐานอื่น ๆ ที่เกี่ยวข้อง", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 102, page: 8, 
      label: "สามารถปฏิบัติงานในการสร้างเสริมสุขภาพ ป้องกัน ช่วยวินิจฉัย ติดตามการรักษา และเฝ้าระวังโรค ให้กับผู้ใช้บริการชุมชนและสังคม", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 103, page: 8, 
      label: "สามารถรวบรวมข้อมูลการปฏิบัติงานทางเทคนิคการแพทย์ วิเคราะห์สังเคราะห์ผลงาน และนำเสนอเพื่อแก้ปัญหา", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 104, page: 8, 
      label: "สามารถเลือกใช้เทคโนโลยีที่เหมาะสมในการปฏิบัติงานทางเทคนิคการแพทย์ และการดูแลสุขภาพ", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 105, page: 8, 
      label: "ให้คำปรึกษา แนะนำ หรืออธิบายเกี่ยวกับการตรวจทางเทคนิคการแพทย์ แก่ผู้เกี่ยวข้องอย่างเหมาะสม", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
  ],

  education: [
    { 
      id: 111, page: 8, 
      label: "ความเชี่ยวชาญในการจัดการเรียนรู้ที่มีรูปแบบหลากหลายอย่างสร้างสรรค์", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 112, page: 8, 
      label: "ความเชี่ยวชาญในการจัดการเรียนรู้สำหรับผู้เรียนที่หลากหลายอย่างมีนวัตกรรม", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
    { 
      id: 113, page: 8, 
      label: "ความเชี่ยวชาญในการจัดการเรียนรู้ที่จะสอนอย่างบูรณาการ", 
      type: "radio", required: true, options: ["1", "2", "3", "4", "5"] 
    },
  ],

};

/// ตอนที่ 4: ความคิดเห็น และข้อเสนอแนะ (ID: 121-123)
export const employerPart4: Question[] = [
  {
    id: 121, page: 9,
    label: "คุณลักษณะที่ท่านเห็นว่าเป็นจุดเด่น/จุดแข็งของบัณฑิตมหาวิทยาลัยสงขลานครินทร์ (โปรดระบุ)",
    type: "textarea", required: true, placeholder: "ระบุคำตอบของท่าน"
  },
  {
    id: 122, page: 9,
    label: "คุณลักษณะที่ท่านเห็นว่าควรปรับปรุง ของบัณฑิตมหาวิทยาลัยสงขลานครินทร์ (โปรดระบุ)",
    type: "textarea", required: true, placeholder: "ระบุคำตอบของท่าน"
  },
  {
    id: 123, page: 9,
    label: "ข้อเสนอแนะอื่น ๆ (โปรดระบุ)",
    type: "textarea", required: true, placeholder: "ระบุคำตอบของท่าน"
  },
];


// --- Structure สำหรับ Sidebar (แก้ไข Count ให้ตรงจริง) ---
export const employerStructure: SectionStructure[] = [
  {
    id: 1, label: "ตอนที่ 1 ข้อมูลทั่วไป",
    subLabel: "ข้อมูลทั่วไปเกี่ยวกับหน่วยงานและผู้ตอบแบบสอบถาม",
    count: 9, // มี 10 ข้อ แต่ required 9 ข้อ (อีเมล required, เว็บไซต์ไม่ required)
  },
  {
    id: 2, label: "ตอนที่ 2 ความพึงพอใจ",
    subLabel: "ระดับความพึงพอใจของนายจ้างหรือผู้ใช้บัณฑิตต่อการปฏิบัติงานของบัณฑิต",
    count: 15,
  },
  {
    id: 3, label: "ตอนที่ 3 ทักษะทางวิชาชีพ",
    subLabel: "ระดับความพึงพอใจทักษะทางจิตพิสัยของสาขาวิชาชีพ",
    count: 6, // 1 (เลือกคณะ) + 5 (คำถามคณะ)
  },
  {
    id: 4, label: "ตอนที่ 4 ข้อเสนอแนะ",
    subLabel: "ความคิดเห็น และข้อเสนอแนะ",
    count: 1,
  },
];