import type { Metadata } from 'next';
import { Outfit, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { ThemeProvider } from '@/lib/theme-context';

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-outfit',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RoastPulse — Kahve Kavurma Atölyesi Yönetimi',
  description: 'Kahve kavurma atölyenizi dijital olarak yönetin. Yeşil çekirdek stoku, kavurma profilleri, toptan siparişler ve cupping seansları.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning className={`${outfit.variable} ${robotoMono.variable}`}>
      <body className="min-h-screen antialiased font-body">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
