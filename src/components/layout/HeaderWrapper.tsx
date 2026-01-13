// src/components/layout/HeaderWrapper.tsx
'use client';

import { useAuth } from '@/context/AuthContext'; // เรียกใช้ Hook
import Header from './Header';
import HeaderLoggedIn from './HeaderLoggedIn';

export default function HeaderWrapper() {
  const { isLoggedIn, isLoading } = useAuth(); // ดึงค่าจาก Context กลาง

  // แสดง Header ธรรมดาไปก่อนระหว่างโหลด (กันกระพริบ)
  if (isLoading) {
    return <Header />; 
  }

  return isLoggedIn ? <HeaderLoggedIn /> : <Header />;
}