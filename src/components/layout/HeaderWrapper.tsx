// src/components/layout/HeaderWrapper.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation'; 
import Header from './Header';
import HeaderLoggedIn from './HeaderLoggedIn';

export default function HeaderWrapper() {
  const { isLoggedIn, isLoading } = useAuth();
  const pathname = usePathname(); 

  // กำหนดหน้าเว็บที่ *ไม่ต้องการ* ให้แสดง Header
  const hiddenPaths = [
    '/graduate/questionnaire','/graduate/instructions' ,'/employer' ,'/employer/questionnaire','/employer/instructions'

  ];

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  if (isLoading) {
    return <Header />; 
  }

  return isLoggedIn ? <HeaderLoggedIn /> : <Header />;
}