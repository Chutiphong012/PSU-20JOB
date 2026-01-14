// src/data/questionnaireMock.ts

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

export const questionPart1 = [
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
      { name: "village", label: "หมู่บ้าน", placeholder: "กรอกคำตอบของคุณ...", size: "half" }, // ปรับตาม layout จริง
      { name: "houseNo", label: "บ้านเลขที่", placeholder: "123", size: "half" },
      { name: "moo", label: "หมู่ที่", placeholder: "123", size: "half" },
      { name: "alley", label: "ตรอก", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
      { name: "soi", label: "ซอย", placeholder: "กรอกคำตอบของคุณ...", size: "half" },
      { name: "road", label: "ถนน", placeholder: "กรอกคำตอบของคุณ...", size: "full" },
      { name: "province", label: "จังหวัด", type: "dropdown", placeholder: "เลือกจังหวัด", size: "third" },
      { name: "district", label: "อำเภอ", type: "dropdown", placeholder: "เลือกอำเภอ", size: "third" },
      { name: "subDistrict", label: "ตำบล/แขวง", type: "dropdown", placeholder: "เลือกตำบล/แขวง", size: "third" },
      { name: "zipcode", label: "รหัสไปรษณีย์", type: "dropdown", placeholder: "zip code", size: "half" }, // mockup as dropdown per image
      { name: "mobile", label: "โทรศัพท์มือถือ", placeholder: "เช่น 0812345678", size: "half" },
      { name: "email", label: "อีเมลที่ใช้ปัจจุบัน", placeholder: "เช่น example@email.com", size: "half" },
      { name: "emailBackup", label: "อีเมลสำรอง", placeholder: "เช่น example@email.com", size: "half" },
    ]
  }
];