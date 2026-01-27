// src/data/newsDetailData.ts

//mock อันนี้แค่อิงจาก figma ปรับได้ในอนาคต

export interface MultiLangString {
  th: string;
  en: string;
}

export interface NewsSection {
  title: MultiLangString;
  type: 'list' | 'text' | 'html'; // ประเภทการแสดงผล: รายการ, ข้อความ, หรือ HTML
  content: MultiLangString[] | MultiLangString;
  isFullWidth?: boolean; // กินพื้นที่เต็ม 2 ช่องหรือไม่
}

export interface NewsDetail {
  id: string;
  type: 'announcement' | 'report'; // ใช้กำหนดสี Theme ได้ (ฟ้า/ม่วง)
  date: string; // ISO format suggested for robustness
  title: MultiLangString;
  highlightText: MultiLangString;
  sections: NewsSection[];
}

// ข้อมูลจำลอง (แก้ไขข้อความตรงนี้ได้เลย)
export const mockNewsData: NewsDetail = {
  id: "1",
  type: "announcement",
  date: "2024-12-15",
  title: {
    th: "เปิดระบบแบบสอบถามสำหรับบัณฑิตประจำปี 2567",
    en: "Opening of the Graduate Survey System for 2024"
  },
  highlightText: {
    th: "มหาวิทยาลัยเปิดให้บัณฑิตที่สำเร็จการศึกษาในปี 2567 กรอกแบบสอบถามเกี่ยวกับภาวะการมีงานทำและความพึงพอใจในการศึกษา เพื่อนำข้อมูลไปพัฒนาหลักสูตรและการจัดการเรียนการสอน",
    en: "The university invites graduates of the class of 2024 to complete a survey on employment status and educational satisfaction, to use the data for curriculum development and teaching improvement."
  },
  sections: [
    {
      title: {
        th: "วัตถุประสงค์",
        en: "Objectives"
      },
      type: "list",
      content: [
        { th: "เพื่อวิจัยสถานะและประเมินผลการจัดการศึกษา", en: "To research the status and evaluate educational management" },
        { th: "เพื่อนำข้อมูลที่ได้มาวิเคราะห์สู่การวางแผนพัฒนาหลักสูตร", en: "To analyze obtained data for curriculum development planning" },
        { th: "เพื่อวิเคราะห์ความพึงพอใจต่อการเรียนการสอน", en: "To analyze satisfaction with teaching and learning" }
      ],
      isFullWidth: false
    },
    {
      title: {
        th: "ระยะเวลาการเปิดระบบ",
        en: "System Opening Period"
      },
      type: "html",
      content: {
        th: "เปิดให้กรอกข้อมูลตั้งแต่วันที่ <span class='font-medium text-[#18305D]'>15 ธันวาคม 2567</span> ถึง <span class='font-medium text-[#18305D]'>31 มกราคม 2568</span>",
        en: "Open for submission from <span class='font-medium text-[#18305D]'>15 December 2024</span> to <span class='font-medium text-[#18305D]'>31 January 2025</span>"
      },
      isFullWidth: false
    },
    {
      title: {
        th: "ความสำคัญของข้อมูล",
        en: "Importance of Information"
      },
      type: "text",
      content: {
        th: "ข้อมูลที่ได้รับจะถูกนำไปวิเคราะห์และรายงานต่อคณะกรรมการบริหาร เพื่อวางแผนพัฒนาหลักสูตร ปรับปรุงการเรียนการสอน และเสริมสร้างทักษะที่จำเป็นให้กับนักศึกษารุ่นต่อไป",
        en: "The information received will be analyzed and reported to the executive committee to plan curriculum development, improve teaching, and enhance necessary skills for the next generation of students."
      },
      isFullWidth: true
    },
    {
      title: {
        th: "การรักษาความลับ",
        en: "Confidentiality"
      },
      type: "text",
      content: {
        th: "ข้อมูลทั้งหมดจะถูกเก็บเป็นความลับและใช้เพื่อการวิเคราะห์ทางสถิติเท่านั้น จะไม่มีการเปิดเผยข้อมูลส่วนบุคคล",
        en: "All data will be kept confidential and used for statistical analysis only. Personal information will not be disclosed."
      },
      isFullWidth: true
    }
  ]
};