// src/data/bannerData.ts

export interface BannerItem {
  id: number;
  image: string; // URL ของรูปภาพ
  alt: string;   // คำอธิบายรูปภาพ
  link?: string; // ลิ้งก์เมื่อกดที่รูป (เผื่ออนาคต)
}

export const bannerData: BannerItem[] = [
  {
    id: 1,
    // รูปตัวอย่าง
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    alt: "job",
    link: "/news"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop",
    alt: "พิธีพระราชทานปริญญาบัตร",
    link: "/reports"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop",
    alt: "กิจกรรมนักศึกษา",
    link: "/contact"
  }
];