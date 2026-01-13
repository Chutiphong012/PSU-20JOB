'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLoggedIn: boolean;
  user: any; // หรือระบุ Type ให้ชัดเจน
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
    
    // ใช้ router.push แทน window.location เพื่อความเร็ว
    router.push('/'); 
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);