// src/data/questionnaireMock.ts

// --------------------------------------------------------
// 1. Interfaces (ประกาศ Types ทั้งหมดที่ต้องใช้)
// --------------------------------------------------------

export interface QuestionOption {
    label: string;
    value: string;
    skipToPart?: number;
    header?: string;      // หัวข้อคั่นกลุ่ม
    headerStyle?: string; // สีหัวข้อ
}

export interface Condition {
    questionId: number;
    value: any; // ค่าที่ "ถ้าตรงกัน" แล้วจะให้ Disable ข้อนี้
}

export interface Question {
    id: number;
    label: string;
    type: 'dropdown' | 'radio' | 'address_group';
    page: number; // ✅ ระบุว่าข้อนี้อยู่หน้าไหน (1, 2, 3...)
    disabledCondition?: Condition; // ✅ เงื่อนไขการปิดใช้งาน
    placeholder?: string;
    options?: string[] | QuestionOption[];
    subFields?: any[];
}

// --------------------------------------------------------
// 2. Student Info Data (ข้อมูลส่วนตัวนักศึกษา - ต้องมีส่วนนี้!)
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
// 3. Question Data Part 1 (ข้อมูลคำถามพร้อม Logic หน้าและเงื่อนไข)
// --------------------------------------------------------
export const questionPart1: Question[] = [
  {
    id: 4,
    page: 1, 
    label: "ภูมิลำเนา",
    type: "dropdown",
    placeholder: "เลือกจังหวัด",
    options: ["กรุงเทพมหานคร", "สงขลา", "เชียงใหม่", "ภูเก็ต", "ยะลา", "ปัตตานี"]
  },
  {
    id: 5,
    page: 1,
    label: "สัญชาติ",
    type: "dropdown",
    placeholder: "เลือกสัญชาติ",
    options: ["ไทย", "จีน", "อื่นๆ"]
  },
  {
    id: 6,
    page: 1,
    label: "สถานภาพสมรส",
    type: "radio",
    options: ["โสด", "สมรส", "หย่าร้าง/ม่าย"]
  },
  {
    id: 7,
    page: 2,
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
    page: 3,
    label: "รูปแบบประสบการณ์ระหว่างเรียนในมหาวิทยาลัยตรงกับข้อใด",
    type: "radio",
    options: [
        { label: "ไม่ได้ฝึกงาน/สหกิจ/ประสบการณ์วิชาชีพ และอื่น ๆ", value: "no_experience" }, 
        { label: "ฝึกงาน", value: "internship" },
        { label: "สหกิจศึกษา", value: "cooperative" },
        { label: "ฝึกงานและสหกิจศึกษา", value: "both" },
        { label: "ฝึกประสบการณ์วิชาชีพ (วิทยาศาสตร์สุขภาพ, ศึกษาศาสตร์)", value: "professional_training" }
    ]
  },
  {
    id: 9,
    page: 3,
    label: "ลักษณะการออกปฏิบัติประสบการณ์ระหว่างเรียน",
    type: "radio",
    // ✅ Logic: ถ้าข้อ 8 (questionId) ตอบ "no_experience" (value) -> ให้ Disable ข้อนี้
    disabledCondition: {
        questionId: 8,
        value: "no_experience"
    },
    options: [
        "ปฏิบัติงานในประเทศ",
        "ปฏิบัติงานต่างประเทศ"
    ]
  },
  {
    id: 10,
    page: 4,
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
    page: 4,
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
    page: 5,
    label: "สถานภาพการทำงานปัจจุบัน",
    type: "radio",
    options: [
        // กลุ่ม 1: มีงานทำแล้ว
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
        
        // กลุ่ม 2: ไม่มีงานทำ
        { 
            label: "ยังไม่เคยมีงานทำ", 
            value: "not_working_1", 
            skipToPart: 3, 
            header: "ไม่มีงานทำ ( ระบบจะนำไปยังตอนที่ 3 )",
            headerStyle: "text-[#1890FF]"
        }, 
        
        // กลุ่ม 3: ศึกษาต่อ
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

// src/data/questionnaireMock.ts

// ... (Code เดิมส่วน Interface และ Part 1) ...

// --------------------------------------------------------
// 4. Question Data Part 2 (การทำงาน)
// --------------------------------------------------------
export const questionPart2: Question[] = [
    // --- หน้า 1: สถานที่ทำงาน (ข้อ 16 ในรูป) ---
    {
        id: 16,
        page: 1,
        label: "สถานที่ทำงานปัจจุบัน",
        type: "address_group",
        subFields: [
            { name: "companyName", label: "ชื่อหน่วยงาน", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
            { name: "department", label: "แผนก/สาขา", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
            { name: "businessType", label: "ประเภทกิจการ", type: "dropdown", placeholder: "เลือกประเภทกิจการ", size: "full" }, 
            { name: "businessSize", label: "ขนาดของกิจการ", placeholder: "กรอกคำตอบของคุณ...", size: "full" },
            { name: "addressNo", label: "ที่ตั้งเลขที่", placeholder: "123", size: "half" },
            { name: "building", label: "อาคาร/ตึก", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
            { name: "street", label: "ถนน", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
            { name: "soi", label: "ตรอก/ซอย", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
            { name: "province", label: "จังหวัด", type: "dropdown", placeholder: "เลือกจังหวัด", size: "half" },
            { name: "district", label: "อำเภอ", type: "dropdown", placeholder: "เลือกอำเภอ", size: "half" },
            { name: "subDistrict", label: "ตำบล/แขวง", type: "dropdown", placeholder: "เลือกตำบล/แขวง", size: "half" },
            { name: "zipcode", label: "รหัสไปรษณีย์", type: "dropdown", placeholder: "zip code", size: "half" },
            { name: "officePhone", label: "โทรศัพท์ที่ทำงาน", placeholder: "เช่น 02-xxx-xxxx", size: "half" },
            { name: "bossName", label: "ชื่อผู้บังคับบัญชา", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
            { name: "bossPosition", label: "ตำแหน่งผู้บังคับบัญชา", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
            { name: "bossEmail", label: "อีเมลผู้บังคับบัญชา/หน่วยงาน", placeholder: "เช่น example@email.com", size: "full" },
        ]
    },

    // --- หน้า 2: รายละเอียดงาน (ข้อ 13, 14, 15) ---
    {
        id: 13,
        page: 2,
        label: "ประเภทงานที่ทำ",
        type: "dropdown",
        placeholder: "เลือกประเภทงาน",
        options: [
            "ข้าราชการ", "พนักงานรัฐวิสาหกิจ", "พนักงานบริษัทเอกชน", "ดำเนินธุรกิจอิสระ/เจ้าของกิจการ"
        ]
    },
    {
        id: 14,
        page: 2,
        label: "ชื่อตำแหน่งงานที่ทำ",
        type: "address_group", // ประยุกต์ใช้เพื่อแสดง Text Input เดี่ยวๆ
        subFields: [
             { name: "position", label: "", placeholder: "ระบุตำแหน่งงาน เช่น UX/UI Design", size: "full" }
        ]
    },
    {
        id: 15,
        page: 2,
        label: "เงินเดือน/รายได้เฉลี่ยต่อเดือน",
        type: "address_group", 
        subFields: [
             { name: "salary", label: "", placeholder: "ระบุเงินเดือน", size: "full" }
        ]
    },

    // --- หน้า 3: ทักษะและระยะเวลา (ข้อ 17, 18) ---
    {
        id: 17,
        page: 3,
        label: "ท่านคิดว่า ความรู้ความสามารถพิเศษด้านใดที่ช่วยให้ท่านได้งาน",
        type: "radio",
        options: [
            "ด้านภาษาต่างประเทศ",
            "ด้านการใช้คอมพิวเตอร์",
            "ด้านกิจกรรมสันทนาการ",
            "ด้านศิลปะ",
            "ด้านกีฬา",
            "ด้านนาฏศิลป์/ดนตรีขับร้อง",
            "อื่น ๆ"
        ]
    },
    {
        id: 18,
        page: 3,
        label: "หลังจากสำเร็จการศึกษาแล้ว ท่านได้ทำงานในระยะเวลาเท่าไหร่",
        type: "radio",
        options: [
            "หางานได้ก่อนจบการศึกษา",
            "1 - 2 เดือน",
            "3 - 6 เดือน",
            "7 - 9 เดือน",
            "10 - 12 เดือน",
            "มากกว่า 1 ปี",
            "เป็นงานเดิมที่ได้ก่อนมาศึกษาหรือได้ระหว่างการศึกษา"
        ]
    },

    // --- หน้า 4: ความพึงพอใจและการศึกษาต่อ (ข้อ 19, 20, 21) ---
    {
        id: 19,
        page: 4,
        label: "ลักษณะงานที่ทำตรงกับสาขาที่ท่านได้สำเร็จการศึกษาหรือไม่",
        type: "radio",
        options: ["ตรงสาขา", "ไม่ตรงสาขา"]
    },
    {
        id: 20,
        page: 4,
        label: "ท่านมีความพึงพอใจต่องานที่ทำหรือไม่",
        type: "radio",
        options: ["พอใจ", "ไม่พอใจ"]
    },
    {
        id: 21,
        page: 4,
        label: "ความต้องการศึกษาต่อ",
        type: "radio",
        options: [
            // ✅ Logic 1: ต้องการ -> ไปตอนที่ 4
            { label: "ต้องการศึกษาต่อ", value: "want_study", skipToPart: 4 },
            // ✅ Logic 2: ไม่ต้องการ -> ไปตอนที่ 5
            { label: "ไม่ต้องการศึกษาต่อ", value: "no_study", skipToPart: 5 }
        ]
    }
];


// src/data/questionnaireMock.ts

// ... (Code เดิม Part 1, Part 2) ...

// --------------------------------------------------------
// 5. Question Data Part 3 (การหางาน)
// --------------------------------------------------------
export const questionPart3: Question[] = [
    // --- หน้า 1: สาเหตุที่ยังไม่ได้ทำงาน (ข้อ 22, 23) ---
    {
        id: 22,
        page: 1,
        label: "สาเหตุที่ยังไม่ได้ทำงาน",
        type: "radio",
        options: [
            "ยังไม่ประสงค์ทำงาน",
            "รอฟังคำตอบจากหน่วยงาน",
            "หางานทำไม่ได้",
            "ต้องการประกอบอาชีพอิสระ",
            "อื่น ๆ"
        ]
    },
    {
        id: 23,
        page: 1,
        label: "ท่านมีปัญหาในการหางานทำหลังสำเร็จการศึกษาหรือไม่",
        type: "radio",
        options: ["ไม่มีปัญหา", "มีปัญหา"]
    },

    // --- หน้า 2: ความต้องการทำงาน (ข้อ 24, 25, 26) ---
    {
        id: 24,
        page: 2,
        label: "ความต้องการทำงาน",
        type: "radio",
        options: [
            { label: "ทำงานในประเทศ", value: "domestic" },
            { label: "ทำงานต่างประเทศ", value: "abroad" },
            { label: "ทั้งในประเทศและต่างประเทศ", value: "both" }
        ]
    },
    {
        id: 25,
        page: 2,
        label: "ประเทศที่ต้องการทำงาน",
        type: "dropdown", // หรือ address_group ที่มี dropdown ก็ได้ แต่ในที่นี้ใช้ dropdown เดี่ยวๆ ให้ง่าย
        placeholder: "เลือกประเทศที่ต้องการทำงาน",
        // ✅ Logic: ถ้าข้อ 24 ตอบ "ทำงานในประเทศ" (domestic) -> ให้ Disable ข้อนี้
        disabledCondition: {
            questionId: 24,
            value: "domestic"
        },
        options: ["สหรัฐอเมริกา", "อังกฤษ", "ออสเตรเลีย", "ญี่ปุ่น", "เกาหลีใต้", "สิงคโปร์", "จีน", "อื่น ๆ"] 
    },
    {
        id: 26,
        page: 2,
        label: "ตำแหน่งที่ต้องการทำงาน",
        type: "address_group",
        subFields: [
             { name: "position", label: "", placeholder: "กรอกคำตอบของคุณ...", size: "full" }
        ]
    },

    // --- หน้า 3: ทักษะและการศึกษาต่อ (ข้อ 27, 28, 29) ---
    {
        id: 27,
        page: 3,
        label: "ความต้องการพัฒนาทักษะ หลักสูตร",
        type: "address_group",
        subFields: [
             { name: "skill", label: "", placeholder: "กรอกคำตอบของคุณ...", size: "full" }
        ]
    },
    {
        id: 28,
        page: 3,
        label: "ความประสงค์ในการเปิดเผยข้อมูลแก่นายจ้าง/สถานประกอบการ เพื่อพิจารณาบรรจุงาน",
        type: "radio",
        options: [
            "ไม่ยินยอมเปิดเผยข้อมูล",
            "ยินยอมเปิดเผยข้อมูล"
        ]
    },
    {
        id: 29,
        page: 3,
        label: "ความต้องการศึกษาต่อ",
        type: "radio",
        options: [
            // ✅ Logic 1: ต้องการ -> ไปตอนที่ 4
            { label: "ต้องการศึกษาต่อ", value: "want_study", skipToPart: 4 },
            // ✅ Logic 2: ไม่ต้องการ -> ไปตอนที่ 5
            { label: "ไม่ต้องการศึกษาต่อ", value: "no_study", skipToPart: 5 }
        ]
    }
];