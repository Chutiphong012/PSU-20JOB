// src/data/questionnaireMock.ts

// ✅ New Interface for Multi-language Support
export interface LocalizedText {
  th: string;
  en: string;
}

export interface QuestionOption {
  label: LocalizedText; // Changed to LocalizedText
  value: string;
  skipToPart?: number;
  header?: LocalizedText; // Changed to LocalizedText
  headerStyle?: string;
  icon?: string;
}

export interface Condition {
  questionId: number;
  value: any;
}

export interface SubField {
  name: string;
  label: LocalizedText;
  placeholder?: LocalizedText;
  size?: "full" | "half" | "third";
  type?: "text" | "dropdown";
}

export interface SectionStructure {
  id: number | string; // ✅ Modified
  label: LocalizedText;
  subLabel: LocalizedText;
  count: number;
}

export const studentInfoMock = {
  institute: "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่",
  faculty: "วิทยาศาสตร์",
  department: "วิทยาการคอมพิวเตอร์",
  degree: "ปริญญาตรี",
  major: "เทคโนโลยีสารสนเทศ",
  curriculum: "วิทยาศาสตรบัณฑิต",
  nameTH: "นายภูณทัศน์ แซ่ไล่",
  nameEN: "MR. PUNATHAT SAELAIO",
  studentID: "6310210xxx",
  nationalID: "1 9098 00xxx xx x",
};

export interface Question {
  id: number | string; // ✅ Modified: number | string
  label: LocalizedText; // Changed to LocalizedText
  type:
    | "dropdown"
    | "radio"
    | "address_group"
    | "rating"
    | "checkbox"
    | "textarea";
  page: number;
  disabledCondition?: Condition;
  placeholder?: LocalizedText; // Changed to LocalizedText
  options?: QuestionOption[]; // Note: We will standardize to object array
  subFields?: SubField[];
  // ✅ New Field: Header (แสดงหัวข้อหมวดหมู่เหนือคำถาม)
  header?: LocalizedText;
  condition?: Condition; // Show/Hide Logic
  colSpan?: 1 | 2; // For Grid Layout (1 = half, 2 = full)
  required?: boolean;
}

export const section1Structure = [
    {
        id: 1,
        label: { th: "ตอนที่ 1 ข้อมูลทั่วไป", en: "Part 1 General Information" },
        subLabel: { th: "", en: "" },
        count: 5
    },
    {
        id: 2,
        label: { th: "ตอนที่ 2 การสมัครงานและการทำงาน", en: "Part 2 Job Application and Work" },
        subLabel: { th: "(สำหรับผู้มีงานทำแล้ว)", en: "(For those currently employed)" },
        count: 9
    },
    {
        id: 3,
        label: { th: "ตอนที่ 3 การสมัครงานและการทำงาน", en: "Part 3 Job Application and Work" },
        subLabel: { th: "(สำหรับผู้ที่ยังไม่ได้ทำงาน)", en: "(For those unemployed)" },
        count: 8
    },
    {
        id: 4,
        label: { th: "ตอนที่ 4 การศึกษาต่อ", en: "Part 4 Further Study" },
        subLabel: { th: "(สำหรับผู้ศึกษาต่อ)", en: "(For those continuing education)" },
        count: 5
    },
    {
        id: 5,
        label: { th: "ตอนที่ 5 ข้อเสนอแนะ", en: "Part 5 Suggestions" },
        subLabel: { th: "", en: "" },
        count: 6
    }
];

export const questionPart1: Question[] = [
  {
    id: 4,
    page: 1,
    label: { th: "ภูมิลำเนา", en: "Domicile" },
    type: "dropdown",
    placeholder: { th: "เลือกจังหวัด", en: "Select Province" },
    options: [
      { label: { th: "กรุงเทพมหานคร", en: "Bangkok" }, value: "bangkok" },
      { label: { th: "สงขลา", en: "Songkhla" }, value: "songkhla" },
      { label: { th: "เชียงใหม่", en: "Chiang Mai" }, value: "chiang_mai" },
      { label: { th: "ภูเก็ต", en: "Phuket" }, value: "phuket" },
      { label: { th: "ยะลา", en: "Yala" }, value: "yala" },
      { label: { th: "ปัตตานี", en: "Pattani" }, value: "pattani" }
    ],
  },
  {
    id: 5,
    page: 1,
    label: { th: "สัญชาติ", en: "Nationality" },
    type: "dropdown",
    placeholder: { th: "เลือกสัญชาติ", en: "Select Nationality" },
    options: [
       { label: { th: "ไทย", en: "Thai" }, value: "thai" },
       { label: { th: "จีน", en: "Chinese" }, value: "chinese" },
       { label: { th: "อื่นๆ", en: "Other" }, value: "other" }
    ],
  },
  {
    id: 6,
    page: 1,
    label: { th: "สถานภาพสมรส", en: "Marital Status" },
    type: "radio",
    options: [
        { label: { th: "โสด", en: "Single" }, value: "single" },
        { label: { th: "สมรส", en: "Married" }, value: "married" },
        { label: { th: "หย่าร้าง/ม่าย", en: "Divorced/Widowed" }, value: "divorced_widowed" }
    ],
  },
  {
    id: 7,
    page: 2,
    label: { th: "ที่อยู่ปัจจุบัน/ที่อยู่ที่ติดต่อได้สะดวก", en: "Current Address / Contact Address" },
    type: "address_group",
    subFields: [
      { name: "building", label: { th: "ชื่ออาคาร/ตึก", en: "Building" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "full" },
      { name: "roomNo", label: { th: "หมายเลขห้อง", en: "Room No." }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "village", label: { th: "หมู่บ้าน", en: "Village" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "houseNo", label: { th: "บ้านเลขที่", en: "House No." }, placeholder: { th: "123", en: "123" }, size: "half" },
      { name: "moo", label: { th: "หมู่ที่", en: "Moo" }, placeholder: { th: "123", en: "123" }, size: "half" },
      { name: "alley", label: { th: "ตรอก", en: "Alley" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "soi", label: { th: "ซอย", en: "Soi" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "road", label: { th: "ถนน", en: "Road" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "full" },
      { name: "province", label: { th: "จังหวัด", en: "Province" }, type: "dropdown", placeholder: { th: "เลือกจังหวัด", en: "Select Province" }, size: "third" },
      { name: "district", label: { th: "อำเภอ", en: "District" }, type: "dropdown", placeholder: { th: "เลือกอำเภอ", en: "Select District" }, size: "third" },
      { name: "subDistrict", label: { th: "ตำบล/แขวง", en: "Sub-district" }, type: "dropdown", placeholder: { th: "เลือกตำบล/แขวง", en: "Select Sub-district" }, size: "third" },
      { name: "zipcode", label: { th: "รหัสไปรษณีย์", en: "Zipcode" }, type: "dropdown", placeholder: { th: "zip code", en: "Zip code" }, size: "half" },
      { name: "mobile", label: { th: "โทรศัพท์มือถือ", en: "Mobile Phone" }, placeholder: { th: "เช่น 0812345678", en: "e.g., 0812345678" }, size: "half" },
      { name: "email", label: { th: "อีเมลที่ใช้ปัจจุบัน", en: "Current Email" }, placeholder: { th: "เช่น example@email.com", en: "e.g., example@email.com" }, size: "half" },
      { name: "emailBackup", label: { th: "อีเมลสำรอง", en: "Backup Email" }, placeholder: { th: "เช่น example@email.com", en: "e.g., example@email.com" }, size: "half" },
    ],
  },
  {
    id: 8,
    page: 3,
    label: { th: "รูปแบบประสบการณ์ระหว่างเรียนในมหาวิทยาลัยตรงกับข้อใด", en: "What type of experience during university matches yours?" },
    type: "radio",
    options: [
      { label: { th: "ไม่ได้ฝึกงาน/สหกิจ/ประสบการณ์วิชาชีพ และอื่น ๆ", en: "No internship/co-op/professional experience, etc." }, value: "no_experience" },
      { label: { th: "ฝึกงาน", en: "Internship" }, value: "internship" },
      { label: { th: "สหกิจศึกษา", en: "Cooperative Education" }, value: "cooperative" },
      { label: { th: "ฝึกงานและสหกิจศึกษา", en: "Both Internship and Cooperative Education" }, value: "both" },
      { label: { th: "ฝึกประสบการณ์วิชาชีพ (วิทยาศาสตร์สุขภาพ, ศึกษาศาสตร์)", en: "Professional Training (Health Science, Education)" }, value: "professional_training" },
    ],
  },
  {
    id: 9,
    page: 3,
    label: { th: "ลักษณะการออกปฏิบัติประสบการณ์ระหว่างเรียน", en: "Characteristics of practice experience during study" },
    type: "radio",
    disabledCondition: {
      questionId: 8,
      value: "no_experience",
    },
    options: [
      { label: { th: "ปฏิบัติงานในประเทศ", en: "Domestic practice" }, value: "domestic" },
      { label: { th: "ปฏิบัติงานต่างประเทศ", en: "International practice" }, value: "international" },
    ],
  },
  {
    id: 10,
    page: 4,
    label: { th: "สถานะการเกณฑ์ทหารปัจจุบัน", en: "Current military conscription status" },
    type: "radio",
    options: [
      { label: { th: "อยู่ในระหว่างการเป็นทหารเกณฑ์", en: "Currently serving as conscript" }, value: "serving" },
      { label: { th: "อยู่ในช่วงผ่อนผันเกณฑ์ทหาร หรือได้รับการยกเว้น หรือการเกณฑ์ทหารมาแล้ว", en: "Deferred, exempted, or already served" }, value: "exempted" },
      { label: { th: "เพศหญิง", en: "Female" }, value: "female" },
    ],
  },
  {
    id: 11,
    page: 4,
    label: { th: "สถานะการเป็นนักบวชปัจจุบัน", en: "Current ordination status" },
    type: "radio",
    options: [
      { label: { th: "ไม่ได้เป็นนักบวช", en: "Not ordained" }, value: "not_ordained" },
      { label: { th: "อยู่ในระหว่างการเป็นนักบวช ระยะเวลาถึงกำหนดลาสิกขาน้อยกว่า 3 เดือน", en: "Ordained, disrobing in less than 3 months" }, value: "ordained_3m" },
      { label: { th: "อยู่ในระหว่างการเป็นนักบวช ระยะเวลาถึงกำหนดลาสิกขา 4 เดือน - 1 ปี", en: "Ordained, disrobing in 4 months - 1 year" }, value: "ordained_1y" },
      { label: { th: "อยู่ในระหว่างการเป็นนักบวช ระยะเวลาถึงกำหนดลาสิกขามากกว่า 1 ปี", en: "Ordained, disrobing in more than 1 year" }, value: "ordained_more" },
      { label: { th: "อยู่ในระหว่างการเป็นนักบวช ระยะเวลาถึงกำหนดลาสิกขาไม่มีกำหนด", en: "Ordained indefinitely" }, value: "ordained_indefinite" },
    ],
  },
  {
    id: 12,
    page: 5,
    label: { th: "สถานภาพการทำงานปัจจุบัน", en: "Current employment status" },
    type: "radio",
    options: [
      {
        label: { th: "มีงานทำก่อนการศึกษา อยู่ในสายงานเดิมหลังจบการศึกษา", en: "Had job before study, same career after graduation" },
        value: "working_1",
        skipToPart: 2,
        header: { th: "มีงานทำแล้ว", en: "Employed" },
        headerStyle: "text-gray-500",
      },
      { label: { th: "มีงานทำก่อนการศึกษา เปลี่ยนสายงานหลังจบการศึกษา", en: "Had job before study, changed career after graduation" }, value: "working_2", skipToPart: 2 },
      { label: { th: "มีงานทำก่อนการศึกษา อยู่ในสายงานเดิมหลังการศึกษา และเลื่อนระดับ", en: "Had job before study, same career with promotion" }, value: "working_3", skipToPart: 2 },
      { label: { th: "ไม่มีงานทำก่อนการศึกษา มีงานทำหลังจบการศึกษา", en: "No job before study, employed after graduation" }, value: "working_4", skipToPart: 2 },
      { label: { th: "ไม่มีงานทำก่อนการศึกษา มีงานทำหลังจบการศึกษา และกำลังศึกษาต่อ", en: "No job before study, employed after and continuing study" }, value: "working_5", skipToPart: 2 },
      {
        label: { th: "ยังไม่เคยมีงานทำ", en: "Never been employed" },
        value: "not_working_1",
        skipToPart: 3,
        header: { th: "ไม่มีงานทำ ( ระบบจะนำไปยังตอนที่ 3 )", en: "Unemployed (System will navigate to Part 3)" },
        headerStyle: "text-[#1890FF]",
      },
      {
        label: { th: "ยังไม่เคยมีงานทำ และกำลังศึกษาต่อ", en: "Never been employed and continuing study" },
        value: "not_working_2",
        skipToPart: 4,
        header: { th: "ศึกษาต่อ ( ระบบจะนำไปยังตอนที่ 4 )", en: "Further Study (System will navigate to Part 4)" },
        headerStyle: "text-[#1890FF]",
      },
    ],
  },
];

export const questionPart2: Question[] = [
  {
    id: 16,
    page: 1,
    label: { th: "สถานที่ทำงานปัจจุบัน", en: "Current Workplace" },
    type: "address_group",
    subFields: [
      { name: "companyName", label: { th: "ชื่อหน่วยงาน", en: "Organization Name" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "full" },
      { name: "department", label: { th: "แผนก/สาขา", en: "Department/Branch" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "businessType", label: { th: "ประเภทกิจการ", en: "Business Type" }, type: "dropdown", placeholder: { th: "เลือกประเภทกิจการ", en: "Select Business Type" }, size: "half" },
      { name: "businessSize", label: { th: "ขนาดของกิจการ", en: "Business Size" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "addressNo", label: { th: "ที่ตั้งเลขที่", en: "Address No." }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "building", label: { th: "อาคาร/ตึก", en: "Building" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "street", label: { th: "ถนน", en: "Street" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "soi", label: { th: "ตรอก/ซอย", en: "Alley/Soi" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "province", label: { th: "จังหวัด", en: "Province" }, type: "dropdown", placeholder: { th: "เลือกจังหวัด", en: "Select Province" }, size: "third" },
      { name: "district", label: { th: "อำเภอ", en: "District" }, type: "dropdown", placeholder: { th: "เลือกอำเภอ", en: "Select District" }, size: "third" },
      { name: "subDistrict", label: { th: "ตำบล/แขวง", en: "Sub-district" }, type: "dropdown", placeholder: { th: "เลือกตำบล/แขวง", en: "Select Sub-district" }, size: "third" },
      { name: "zipcode", label: { th: "รหัสไปรษณีย์", en: "Zipcode" }, placeholder: { th: "zip code", en: "Zip code" }, size: "half" },
      { name: "officePhone", label: { th: "โทรศัพท์ที่ทำงาน", en: "Office Phone" }, placeholder: { th: "เช่น 02-xxx-xxxx", en: "e.g. 02-xxx-xxxx" }, size: "half" },
      { name: "bossName", label: { th: "ชื่อผู้บังคับบัญชา", en: "Supervisor Name" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "bossPosition", label: { th: "ตำแหน่งผู้บังคับบัญชา", en: "Supervisor Position" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "half" },
      { name: "bossEmail", label: { th: "อีเมลผู้บังคับบัญชา/หน่วยงาน", en: "Supervisor Email" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "full" },
    ],
  },
  {
    id: 13,
    page: 2,
    label: { th: "ประเภทงานที่ทำ", en: "Type of Job" },
    type: "dropdown",
    placeholder: { th: "เลือกประเภทงาน", en: "Select Job Type" },
    options: [
      { label: { th: "ข้าราชการ", en: "Government Officer" }, value: "government" },
      { label: { th: "พนักงานรัฐวิสาหกิจ", en: "State Enterprise Employee" }, value: "state_enterprise" },
      { label: { th: "พนักงานบริษัทเอกชน", en: "Private Company Employee" }, value: "private" },
      { label: { th: "ดำเนินธุรกิจอิสระ/เจ้าของกิจการ", en: "Self-Employed/Business Owner" }, value: "self_employed" },
    ],
  },
  {
    id: 14,
    page: 2,
    label: { th: "ชื่อตำแหน่งงานที่ทำ", en: "Job Position" },
    type: "address_group",
    subFields: [
      { 
        name: "position", 
        label: { th: "", en: "" }, 
        placeholder: { th: "ระบุตำแหน่งงาน เช่น UX/UI Design", en: "Specify Job Position e.g. UX/UI Design" }, 
        size: "full" as const 
      }
    ],
  },
  {
    id: 15,
    page: 2,
    label: { th: "เงินเดือน/รายได้เฉลี่ยต่อเดือน", en: "Salary / Average Monthly Income" },
    type: "address_group",
    subFields: [
      { 
        name: "salary", 
        label: { th: "", en: "" }, 
        placeholder: { th: "ระบุเงินเดือน", en: "Specify Salary" }, 
        size: "full" as const 
      }
    ],
  },
  {
    id: 17,
    page: 3,
    label: { th: "ท่านคิดว่า ความรู้ความสามารถพิเศษด้านใดที่ช่วยให้ท่านได้งาน", en: "What special skills do you think helped you get the job?" },
    type: "radio",
    options: [
      { label: { th: "ด้านภาษาต่างประเทศ", en: "Foreign Languages" }, value: "foreign_languages" },
      { label: { th: "ด้านการใช้คอมพิวเตอร์", en: "Computer Skills" }, value: "computer" },
      { label: { th: "ด้านกิจกรรมสันทนาการ", en: "Recreational Activities" }, value: "recreation" },
      { label: { th: "ด้านศิลปะ", en: "Art" }, value: "art" },
      { label: { th: "ด้านกีฬา", en: "Sports" }, value: "sports" },
      { label: { th: "ด้านนาฏศิลป์/ดนตรีขับร้อง", en: "Performing Arts/Music" }, value: "performing_arts" },
      { label: { th: "อื่น ๆ", en: "Other" }, value: "other" },
    ],
  },
  {
    id: 18,
    page: 3,
    label: { th: "หลังจากสำเร็จการศึกษาแล้ว ท่านได้ทำงานในระยะเวลาเท่าไหร่", en: "How long did it take you to find a job after graduation?" },
    type: "radio",
    options: [
      { label: { th: "หางานได้ก่อนจบการศึกษา", en: "Got a job before graduation" }, value: "before_graduation" },
      { label: { th: "1 - 2 เดือน", en: "1 - 2 months" }, value: "1_2_months" },
      { label: { th: "3 - 6 เดือน", en: "3 - 6 months" }, value: "3_6_months" },
      { label: { th: "7 - 9 เดือน", en: "7 - 9 months" }, value: "7_9_months" },
      { label: { th: "10 - 12 เดือน", en: "10 - 12 months" }, value: "10_12_months" },
      { label: { th: "มากกว่า 1 ปี", en: "More than 1 year" }, value: "more_than_1_year" },
      { label: { th: "เป็นงานเดิมที่ได้ก่อนมาศึกษาหรือได้ระหว่างการศึกษา", en: "Same job as before or during study" }, value: "same_job" },
    ],
  },
  {
    id: 19,
    page: 4,
    label: { th: "ลักษณะงานที่ทำตรงกับสาขาที่ท่านได้สำเร็จการศึกษาหรือไม่", en: "Does your job match your field of study?" },
    type: "radio",
    options: [
      { label: { th: "ตรงสาขา", en: "Matched" }, value: "matched" },
      { label: { th: "ไม่ตรงสาขา", en: "Not Matched" }, value: "not_matched" },
    ],
  },
  {
    id: 20,
    page: 4,
    label: { th: "ท่านมีความพึงพอใจต่องานที่ทำหรือไม่", en: "Are you satisfied with your job?" },
    type: "radio",
    options: [
      { label: { th: "พอใจ", en: "Satisfied" }, value: "satisfied" },
      { label: { th: "ไม่พอใจ", en: "Not Satisfied" }, value: "not_satisfied" },
    ],
  },
  {
    id: 21,
    page: 4,
    label: { th: "ความต้องการศึกษาต่อ", en: "Desire to continue education" },
    type: "radio",
    options: [
      { label: { th: "ต้องการศึกษาต่อ", en: "Want to continue education" }, value: "want_study", skipToPart: 4 },
      { label: { th: "ไม่ต้องการศึกษาต่อ", en: "Do not want to continue education" }, value: "no_study", skipToPart: 5 },
    ],
  },
];

export const questionPart3: Question[] = [
  {
    id: 22,
    page: 1,
    label: { th: "สาเหตุที่ยังไม่ได้ทำงาน", en: "Reason for unemployment" },
    type: "radio",
    options: [
      { label: { th: "ยังไม่ประสงค์ทำงาน", en: "Do not want to work yet" }, value: "not_want_work" },
      { label: { th: "รอฟังคำตอบจากหน่วยงาน", en: "Waiting for response" }, value: "waiting" },
      { label: { th: "หางานทำไม่ได้", en: "Cannot find a job" }, value: "cannot_find" },
      { label: { th: "ต้องการประกอบอาชีพอิสระ", en: "Want to be self-employed" }, value: "self_employed" },
      { label: { th: "อื่น ๆ", en: "Other" }, value: "other" },
    ],
  },
  {
    id: 23,
    page: 1,
    label: { th: "ท่านมีปัญหาในการหางานทำหลังสำเร็จการศึกษาหรือไม่", en: "Did you have problems finding a job after graduation?" },
    type: "radio",
    options: [
      { label: { th: "ไม่มีปัญหา", en: "No problem" }, value: "no_problem" },
      { label: { th: "มีปัญหา", en: "Have problem" }, value: "have_problem" },
    ],
  },
  {
    id: 24,
    page: 2,
    label: { th: "ความต้องการทำงาน", en: "Work preference" },
    type: "radio",
    options: [
      { label: { th: "ทำงานในประเทศ", en: "Work in country" }, value: "domestic" },
      { label: { th: "ทำงานต่างประเทศ", en: "Work abroad" }, value: "abroad" },
      { label: { th: "ทั้งในประเทศและต่างประเทศ", en: "Both in country and abroad" }, value: "both" },
    ],
  },
  {
    id: 25,
    page: 2,
    label: { th: "ประเทศที่ต้องการทำงาน", en: "Preferred country for work" },
    type: "dropdown",
    placeholder: { th: "เลือกประเทศที่ต้องการทำงาน", en: "Select Country" },
    disabledCondition: {
      questionId: 24,
      value: "domestic",
    },
    options: [
      { label: { th: "สหรัฐอเมริกา", en: "USA" }, value: "usa" },
      { label: { th: "อังกฤษ", en: "UK" }, value: "uk" },
      { label: { th: "ออสเตรเลีย", en: "Australia" }, value: "australia" },
      { label: { th: "ญี่ปุ่น", en: "Japan" }, value: "japan" },
      { label: { th: "เกาหลีใต้", en: "South Korea" }, value: "south_korea" },
      { label: { th: "สิงคโปร์", en: "Singapore" }, value: "singapore" },
      { label: { th: "จีน", en: "China" }, value: "china" },
      { label: { th: "อื่น ๆ", en: "Other" }, value: "other" },
    ],
  },
  {
    id: 26,
    page: 2,
    label: { th: "ตำแหน่งที่ต้องการทำงาน", en: "Preferred Position" },
    type: "address_group",
    subFields: [
      { name: "position", label: { th: "", en: "" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "full" as const },
    ],
  },
  {
    id: 27,
    page: 3,
    label: { th: "ความต้องการพัฒนาทักษะ หลักสูตร", en: "Desired skills/courses development" },
    type: "address_group",
    subFields: [
      { name: "skill", label: { th: "", en: "" }, placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." }, size: "full" as const },
    ],
  },
  {
    id: 28,
    page: 4,
    label: { th: "ความประสงค์ในการเปิดเผยข้อมูลแก่นายจ้าง/สถานประกอบการ เพื่อพิจารณาบรรจุงาน", en: "Consent to disclose information to employers for recruitment" },
    type: "radio",
    options: [
      { label: { th: "ไม่ยินยอมเปิดเผยข้อมูล", en: "Do not consent" }, value: "no_consent" },
      { label: { th: "ยินยอมเปิดเผยข้อมูล", en: "Consent" }, value: "consent" },
    ],
  },
  {
    id: 29,
    page: 3,
    label: { th: "ความต้องการศึกษาต่อ", en: "Desire to continue education" },
    type: "radio",
    options: [
      { label: { th: "ต้องการศึกษาต่อ", en: "Want to continue education" }, value: "want_study", skipToPart: 4 },
      { label: { th: "ไม่ต้องการศึกษาต่อ", en: "Do not want to continue education" }, value: "no_study", skipToPart: 5 },
    ],
  },
];

export const questionPart4: Question[] = [
  {
    id: 30,
    page: 1,
    label: { th: "ระดับการศึกษาที่ท่านต้องการศึกษาต่อ/กำลังศึกษาต่อ", en: "Level of education you want to study/are studying" },
    type: "dropdown",
    placeholder: { th: "เลือกระดับการศึกษา", en: "Select Level" },
    options: [
      { label: { th: "ประกาศนียบัตรบัณฑิต", en: "Graduate Diploma" }, value: "graduate_diploma" },
      { label: { th: "ปริญญาโท", en: "Master's Degree" }, value: "masters" },
      { label: { th: "ประกาศนียบัตรบัณฑิตชั้นสูง", en: "Higher Graduate Diploma" }, value: "higher_graduate_diploma" },
      { label: { th: "ปริญญาเอก", en: "Doctoral Degree" }, value: "doctoral" },
    ],
  },
  {
    id: 31,
    page: 1,
    label: { th: "สาขาวิชาที่ท่านต้องการศึกษา/กำลังศึกษา", en: "Field of study you want to study/are studying" },
    type: "radio",
    options: [
      { label: { th: "สาขาวิชาเดิม", en: "Same Major" }, value: "same_major" },
      { label: { th: "สาขาวิชาอื่นที่ไม่ใช่สาขาวิชาเดิม", en: "Other Major" }, value: "other_major" },
    ],
  },
  {
    id: 32,
    page: 2,
    label: { th: "ประเภทของสถาบันการศึกษา/มหาวิทยาลัยที่ท่านต้องการศึกษาต่อ/กำลังศึกษาต่อ", en: "Type of institution/university" },
    type: "radio",
    options: [
      { label: { th: "รัฐบาล", en: "Government" }, value: "government" },
      { label: { th: "เอกชน", en: "Private" }, value: "private" },
      { label: { th: "ต่างประเทศ", en: "International" }, value: "international" },
    ],
  },
  {
    id: 33,
    page: 2,
    label: { th: "เหตุผลที่ทำให้ท่านตัดสินใจศึกษาต่อ", en: "Reason for continuing education" },
    type: "radio",
    options: [
      { label: { th: "เป็นความต้องการของบิดา/มารดา หรือผู้ปกครอง", en: "Parent's/Guardian's desire" }, value: "parents" },
      { label: { th: "งานที่ต้องการใช้ภูมิสูงกว่าปริญญาตรี", en: "Job requires higher than Bachelor's degree" }, value: "job_requirement" },
      { label: { th: "ได้รับทุนการศึกษาต่อ", en: "Received scholarship" }, value: "scholarship" },
      { label: { th: "เป็นความต้องการของตนเอง", en: "Own desire" }, value: "own_desire" },
      { label: { th: "อื่น ๆ", en: "Other" }, value: "other" },
    ],
  },
  {
    id: 34,
    page: 2,
    label: { th: "ท่านมีปัญหาในการศึกษาต่อหรือไม่", en: "Do you have problems with continuing education?" },
    type: "radio",
    options: [
      { label: { th: "ไม่มีปัญหา", en: "No problem" }, value: "no_problem", skipToPart: 5 },
      { label: { th: "มีปัญหา", en: "Have problem" }, value: "have_problem", skipToPart: 5 },
    ],
  },
];

export const questionPart5: Question[] = [
  {
    id: 35,
    page: 1,
    label: { th: "ความพึงพอใจที่มีต่อหลักสูตรที่สำเร็จการศึกษา", en: "Satisfaction with the graduated curriculum" },
    type: "rating",
    options: [
      { label: { th: "น้อยที่สุด", en: "Least" }, value: "1" },
      { label: { th: "น้อย", en: "Less" }, value: "2" },
      { label: { th: "ปานกลาง", en: "Moderate" }, value: "3" },
      { label: { th: "มาก", en: "Much" }, value: "4" },
      { label: { th: "มากที่สุด", en: "Most" }, value: "5" },
    ],
  },
  {
    id: 36,
    page: 1,
    label: { th: "ความพึงพอใจที่มีต่อความเป็นอยู่ในมหาวิทยาลัยเชิงกายภาพ เช่น บรรยากาศ สภาพแวดล้อม", en: "Satisfaction with university life (physical env.)" },
    type: "rating",
    options: [
      { label: { th: "น้อยที่สุด", en: "Least" }, value: "1" },
      { label: { th: "น้อย", en: "Less" }, value: "2" },
      { label: { th: "ปานกลาง", en: "Moderate" }, value: "3" },
      { label: { th: "มาก", en: "Much" }, value: "4" },
      { label: { th: "มากที่สุด", en: "Most" }, value: "5" },
    ],
  },
  {
    id: 37,
    page: 2,
    label: { th: "ท่านคิดว่าในหลักสูตรของสถาบัน ควรเพิ่มรายวิชาหรือความรู้ในเรื่องใดที่จะเอื้อประโยชน์ต่อการประกอบอาชีพของท่านได้มากขึ้น (ตอบได้มากกว่า 1 ข้อ)", en: "What subjects or knowledge should be added to the curriculum to benefit your career? (Multiple answers allowed)" },
    type: "checkbox",
    options: [
      { label: { th: "ภาษาอังกฤษ", en: "English" }, value: "english", icon: "languages" },
      { label: { th: "ภาษาจีน", en: "Chinese" }, value: "chinese", icon: "message-circle" },
      { label: { th: "ภาษาในอาเซียน", en: "ASEAN Languages" }, value: "asean", icon: "globe" },
      { label: { th: "บัญชี", en: "Accounting" }, value: "accounting", icon: "calculator" },
      { label: { th: "คอมพิวเตอร์", en: "Computer" }, value: "computer", icon: "laptop" },
      { label: { th: "การใช้งานอินเตอร์เน็ต", en: "Internet Usage" }, value: "internet", icon: "wifi" },
      { label: { th: "การฝึกปฏิบัติจริง", en: "Practical Training" }, value: "practice", icon: "wrench" },
      { label: { th: "เทคนิคการวิจัย", en: "Research Techniques" }, value: "research", icon: "file-search" },
      { label: { th: "อื่น ๆ", en: "Other" }, value: "other", icon: "more-horizontal" },
    ],
  },
  {
    id: 38,
    page: 2,
    label: { th: "ข้อเสนอแนะเกี่ยวกับหลักสูตรและสาขาวิชาที่เรียน", en: "Suggestions for curriculum and major" },
    type: "textarea",
    placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." },
  },
  {
    id: 39,
    page: 2,
    label: { th: "ข้อเสนอแนะเกี่ยวกับการบริการของมหาวิทยาลัย", en: "Suggestions for university services" },
    type: "textarea",
    placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." },
  },
  {
    id: 40,
    page: 2,
    label: { th: "ข้อเสนอแนะอื่นๆ", en: "Other Suggestions" },
    type: "textarea",
    placeholder: { th: "กรอกคำตอบของคุณ...", en: "Fill your answer..." },
  },
];