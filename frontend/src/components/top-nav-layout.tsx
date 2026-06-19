'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Panel' },
  { href: '/customers', label: 'Müşteriler' },
  { href: '/roast-profiles', label: 'Formüller' },
  { href: '/green-beans', label: 'Hammaddeler' },
  { href: '/orders', label: 'Siparişler' },
  { href: '/cuppings', label: 'Randevular' },
];

export function BottomNavLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: 'var(--bg-nav)', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-3 shrink-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-lg"
                style={{ background: 'linear-gradient(135deg, #b76e79, #d4959e)', color: '#2d1b4e' }}
              >
                S
              </div>
              <div className="hidden sm:block">
                <div className="font-display text-lg font-bold leading-tight" style={{ color: 'var(--text-nav)' }}>
                  RoastPulse
                </div>
                <div className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-nav-muted)' }}>
                  Parfüm Atölyesi
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      active ? 'text-white' : 'hover:text-white'
                    )}
                    style={{
                      background: active ? 'rgba(183, 110, 121, 0.25)' : 'transparent',
                      color: active ? '#faf7f2' : 'var(--text-nav-muted)',
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-xs truncate max-w-[140px]" style={{ color: 'var(--text-nav-muted)' }}>
                {user?.firstName} {user?.lastName}
              </span>
              <button
                onClick={toggle}
                className="p-2 rounded-lg text-sm transition-colors"
                style={{ background: 'var(--bg-nav-hover)', color: 'var(--text-nav)' }}
                aria-label="Tema değiştir"
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs transition-colors"
                style={{ background: 'var(--bg-nav-hover)', color: 'var(--text-nav-muted)' }}
              >
                Çıkış
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg"
                style={{ color: 'var(--text-nav)' }}
                aria-label="Menüyü aç"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <nav
            className="lg:hidden border-t px-4 py-3 space-y-1"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'var(--bg-nav)' }}
          >
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm font-medium"
                  style={{
                    background: active ? 'rgba(183, 110, 121, 0.25)' : 'transparent',
                    color: active ? '#faf7f2' : 'var(--text-nav-muted)',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-3 rounded-lg text-sm sm:hidden"
              style={{ color: 'var(--text-nav-muted)' }}
            >
              Çıkış
            </button>
          </nav>
        )}
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">{children}</main>
    </div>
  );
}
