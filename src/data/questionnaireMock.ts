// src/data/questionnaireMock.ts

// --------------------------------------------------------
// 1. Interfaces
// --------------------------------------------------------
export interface QuestionOption {
    label: string;
    value: string;
    skipToPart?: number;
    header?: string;      // หัวข้อคั่นกลุ่ม
    headerStyle?: string; // สีหัวข้อ
}

export interface Question {
    id: number;
    label: string;
    type: 'dropdown' | 'radio' | 'address_group';
    placeholder?: string;
    options?: string[] | QuestionOption[];
    subFields?: any[];
}

// --------------------------------------------------------
// 2. Student Info Data (ส่วนที่ขาดหายไป)
// --------------------------------------------------------
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
    nationalID: "1 9098 00xxx xx x"
};

// --------------------------------------------------------
// 3. Question Data Part 1
// --------------------------------------------------------
export const questionPart1: Question[] = [
  {
    id: 4,
    label: "ภูมิลำเนา",
    type: "dropdown",
    placeholder: "เลือกจังหวัด",
    options: ["กรุงเทพมหานคร", "สงขลา", "เชียงใหม่", "ภูเก็ต", "ยะลา", "ปัตตานี"]
  },
  {
    id: 5,
    label: "สัญชาติ",
    type: "dropdown",
    placeholder: "เลือกสัญชาติ",
    options: ["ไทย", "จีน", "อื่นๆ"]
  },
  {
    id: 6,
    label: "สถานภาพสมรส",
    type: "radio",
    options: ["โสด", "สมรส", "หย่าร้าง/ม่าย"]
  },
  {
    id: 7,
    label: "ที่อยู่ปัจจุบัน/ที่อยู่ที่ติดต่อได้สะดวก",
    type: "address_group",
    subFields: [
      { name: "building", label: "ชื่ออาคาร/ตึก", placeholder: "กรอกคำตอบของคุณ...", size: "full" },
      { name: "roomNo", label: "หมายเลขห้อง", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
      { name: "village", label: "หมู่บ้าน", placeholder: "กรอกคำตอบของคุณ...", size: "half" }, 
      { name: "houseNo", label: "บ้านเลขที่", placeholder: "123", size: "half" },
      { name: "moo", label: "หมู่ที่", placeholder: "123", size: "half" },
      { name: "alley", label: "ตรอก", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
      { name: "soi", label: "ซอย", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
      { name: "road", label: "ถนน", placeholder: "กรอกคำตอบของคุณ...", size: "full" },
      { name: "province", label: "จังหวัด", type: "dropdown", placeholder: "เลือกจังหวัด", size: "third" },
      { name: "district", label: "อำเภอ", type: "dropdown", placeholder: "เลือกอำเภอ", size: "third" },
      { name: "subDistrict", label: "ตำบล/แขวง", type: "dropdown", placeholder: "เลือกตำบล/แขวง", size: "third" },
      { name: "zipcode", label: "รหัสไปรษณีย์", type: "dropdown", placeholder: "zip code", size: "half" }, 
      { name: "mobile", label: "โทรศัพท์มือถือ", placeholder: "เช่น 0812345678", size: "half" },
      { name: "email", label: "อีเมลที่ใช้ปัจจุบัน", placeholder: "เช่น example@email.com", size: "half" },
      { name: "emailBackup", label: "อีเมลสำรอง", placeholder: "เช่น example@email.com", size: "half" },
    ]
  },
  {
    id: 8,
    label: "รูปแบบประสบการณ์ระหว่างเรียนในมหาวิทยาลัยตรงกับข้อใด",
    type: "radio",
    options: [
        "ไม่ได้ฝึกงาน/สหกิจ/ประสบการณ์วิชาชีพ และอื่น ๆ",
        "ฝึกงาน",
        "สหกิจศึกษา",
        "ฝึกงานและสหกิจศึกษา",
        "ฝึกประสบการณ์วิชาชีพ (วิทยาศาสตร์สุขภาพ, ศึกษาศาสตร์)"
    ]
  },
  {
    id: 9,
    label: "ลักษณะการออกปฏิบัติประสบการณ์ระหว่างเรียน",
    type: "radio",
    options: [
        "ปฏิบัติงานในประเทศ",
        "ปฏิบัติงานต่างประเทศ"
    ]
  },
  {
    id: 10,
    label: "สถานะการเกณฑ์ทหารปัจจุบัน",
    type: "radio",
    options: [
        "อยู่ในระหว่างการเป็นทหารเกณฑ์",
        "อยู่ในช่วงผ่อนผันเกณฑ์ทหาร หรือได้รับการยกเว้น หรือการเกณฑ์ทหารมาแล้ว",
        "เพศหญิง"
    ]
  },
  {
    id: 11,
    label: "สถานะการเป็นนักบวชปัจจุบัน",
    type: "radio",
    options: [
        "ไม่ได้เป็นนักบวช",
        "อยู่ในระหว่างการเป็นนักบวช ระยะเวลาถึงกำหนดลาสิกขาน้อยกว่า 3 เดือน",
        "อยู่ในระหว่างการเป็นนักบวช ระยะเวลาถึงกำหนดลาสิกขา 4 เดือน - 1 ปี",
        "อยู่ในระหว่างการเป็นนักบวช ระยะเวลาถึงกำหนดลาสิกขามากกว่า 1 ปี",
        "อยู่ในระหว่างการเป็นนักบวช ระยะเวลาถึงกำหนดลาสิกขาไม่มีกำหนด"
    ]
  },
  {
    id: 12,
    label: "สถานภาพการทำงานปัจจุบัน",
    type: "radio",
    options: [
        // กลุ่ม 1: มีงานทำแล้ว (Header สีเทา)
        { 
            label: "มีงานทำก่อนการศึกษา อยู่ในสายงานเดิมหลังจบการศึกษา", 
            value: "working_1", 
            skipToPart: 2, 
            header: "มีงานทำแล้ว",
            headerStyle: "text-gray-500"
        },
        { label: "มีงานทำก่อนการศึกษา เปลี่ยนสายงานหลังจบการศึกษา", value: "working_2", skipToPart: 2 },
        { label: "มีงานทำก่อนการศึกษา อยู่ในสายงานเดิมหลังการศึกษา และเลื่อนระดับ", value: "working_3", skipToPart: 2 },
        { label: "ไม่มีงานทำก่อนการศึกษา มีงานทำหลังจบการศึกษา", value: "working_4", skipToPart: 2 },
        { label: "ไม่มีงานทำก่อนการศึกษา มีงานทำหลังจบการศึกษา และกำลังศึกษาต่อ", value: "working_5", skipToPart: 2 },
        
        // กลุ่ม 2: ไม่มีงานทำ (Header สีฟ้า ตามภาพ)
        { 
            label: "ยังไม่เคยมีงานทำ", 
            value: "not_working_1", 
            skipToPart: 3, 
            header: "ไม่มีงานทำ ( ระบบจะนำไปยังตอนที่ 3 )",
            headerStyle: "text-[#1890FF]"
        }, 
        
        // กลุ่ม 3: ศึกษาต่อ (Header สีฟ้า ตามภาพ)
        { 
            label: "ยังไม่เคยมีงานทำ และกำลังศึกษาต่อ", 
            value: "not_working_2", 
            skipToPart: 4, 
            header: "ศึกษาต่อ ( ระบบจะนำไปยังตอนที่ 4 )",
            headerStyle: "text-[#1890FF]"
        }, 
    ]
  }
];