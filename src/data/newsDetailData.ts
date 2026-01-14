// src/data/newsDetailData.ts

//mock อันนี้แค่อิงจาก figma ปรับได้ในอนาคต

export interface NewsSection {
  title: string;
  type: 'list' | 'text' | 'html'; // ประเภทการแสดงผล: รายการ, ข้อความ, หรือ HTML
  content: string[] | string;
  isFullWidth?: boolean; // กินพื้นที่เต็ม 2 ช่องหรือไม่
}

export interface NewsDetail {
  id: string;
  type: 'ประกาศ' | 'รายงาน'; // ใช้กำหนดสี Theme ได้ (ฟ้า/ม่วง)
  date: string;
  title: string;
  highlightText: string;
  sections: NewsSection[];
}

// ข้อมูลจำลอง (แก้ไขข้อความตรงนี้ได้เลย)
export const mockNewsData: NewsDetail = {
  id: "1",
  type: "ประกาศ",
  date: "15 ธันวาคม 2567",
  title: "เปิดระบบแบบสอบถามสำหรับบัณฑิตประจำปี 2567",
  highlightText: "มหาวิทยาลัยเปิดให้บัณฑิตที่สำเร็จการศึกษาในปี 2567 กรอกแบบสอบถามเกี่ยวกับภาวะการมีงานทำและความพึงพอใจในการศึกษา เพื่อนำข้อมูลไปพัฒนาหลักสูตรและการจัดการเรียนการสอน",
  sections: [
    {
      title: "วัตถุประสงค์",
      type: "list",
      content: [
        "เพื่อวิจัยสถานะและประเมินผลการจัดการศึกษา",
        "เพื่อนำข้อมูลที่ได้มาวิเคราะห์สู่การวางแผนพัฒนาหลักสูตร",
        "เพื่อวิเคราะห์ความพึงพอใจต่อการเรียนการสอน"
      ],
      isFullWidth: false
    },
    {
      title: "ระยะเวลาการเปิดระบบ",
      type: "html",
      content: "เปิดให้กรอกข้อมูลตั้งแต่วันที่ <span class='font-medium text-[#18305D]'>15 ธันวาคม 2567</span> ถึง <span class='font-medium text-[#18305D]'>31 มกราคม 2568</span>",
      isFullWidth: false
    },
    {
      title: "ความสำคัญของข้อมูล",
      type: "text",
      content: "ข้อมูลที่ได้รับจะถูกนำไปวิเคราะห์และรายงานต่อคณะกรรมการบริหาร เพื่อวางแผนพัฒนาหลักสูตร ปรับปรุงการเรียนการสอน และเสริมสร้างทักษะที่จำเป็นให้กับนักศึกษารุ่นต่อไป",
      isFullWidth: true
    },
    {
      title: "การรักษาความลับ",
      type: "text",
      content: "ข้อมูลทั้งหมดจะถูกเก็บเป็นความลับและใช้เพื่อการวิเคราะห์ทางสถิติเท่านั้น จะไม่มีการเปิดเผยข้อมูลส่วนบุคคล",
      isFullWidth: true
    }
  ]
};