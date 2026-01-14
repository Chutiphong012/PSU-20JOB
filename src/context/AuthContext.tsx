// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  user: any;
  login: (name: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // เช็คสถานะเมื่อเข้าเว็บครั้งแรก
  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    const userName = localStorage.getItem("userName");
    
    if (status === "true") {
      setIsLoggedIn(true);
      setUser({ name: userName, role: "บัณฑิต" });
    }
    setIsLoading(false);
  }, []);

  const login = (name: string) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userName", name);
    setIsLoggedIn(true);
    setUser({ name: name, role: "บัณฑิต" });
    
    // ✅ แก้ไขตรงนี้: สั่งให้ไปหน้า /graduate ทันทีที่ล็อกอินเสร็จ
    router.push('/graduate'); 
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUser(null);
    
    // Logout แล้วกลับหน้าแรก
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);