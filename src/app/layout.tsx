// src/app/layout.tsx
import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import FooterWrapper from '@/components/layout/FooterWrapper';
// 1. นำเข้า AuthProvider
import { AuthProvider } from '@/context/AuthContext'; 
import HeaderWrapper from '@/components/layout/HeaderWrapper'; 
import '@/styles/global.css';
import { Inter, Prompt } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["thai", "latin"],
  variable: "--font-prompt",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'ระบบภาวะการมีงานทำของบัณฑิต | มหาวิทยาลัยสงขลานครินทร์',
  description: 'ระบบฐานข้อมูลภาวะการมีงานทำของบัณฑิต มหาวิทยาลัยสงขลานครินทร์',
  keywords: 'PSU, มหาวิทยาลัยสงขลานครินทร์, งาน, บัณฑิต, การมีงานทำ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={`${inter.variable} ${prompt.variable} font-sans antialiased`}>
        <ThemeRegistry>
          
          {/* ✅ 2. ต้องเอา AuthProvider มาครอบเนื้อหาทั้งหมดตรงนี้ครับ */}
          <AuthProvider>
            
            <HeaderWrapper />
            
            <main style={{ minHeight: 'calc(100vh - 200px)' }}>{children}</main>
            
            <FooterWrapper />
            
          </AuthProvider>

        </ThemeRegistry>
      </body>
    </html>
  );
}