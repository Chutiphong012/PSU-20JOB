// src/components/FooterWrapper.tsx
'use client'; // ต้องใส่เพื่อให้ใช้ hook เช็ค URL ได้

import { usePathname } from 'next/navigation';
import Footer from './Footer'; // import Footer ตัวเดิมของคุณเข้ามา

export default function FooterWrapper() {
  const pathname = usePathname();

  // กำหนดรายการ path ที่ "ไม่ต้องการ" ให้แสดง Footer
  // เช่น หน้า /graduate และหน้าลูกๆ ของมันทั้งหมด
  const hiddenPaths = ['/graduate', '/login', '/register','/employer'];

  // เช็คว่า URL ปัจจุบัน ขึ้นต้นด้วยคำในรายการข้างบนหรือไม่
  const shouldHideFooter = hiddenPaths.some((path) => pathname.startsWith(path));

  // ถ้าใช่ ให้ return null (ไม่แสดงอะไรเลย)
  if (shouldHideFooter) {
    return null;
  }

  // ถ้าไม่ใช่ ก็แสดง Footer ตามปกติ
  return <Footer />;
}