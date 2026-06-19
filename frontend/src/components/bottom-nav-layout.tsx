'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Flame, Coffee, ShoppingBag, Beaker, Moon, Sun, LogOut } from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Panel', icon: LayoutDashboard },
  { href: '/customers', label: 'Müşteriler', icon: Users },
  { href: '/roast-profiles', label: 'Profiller', icon: Flame },
  { href: '/green-beans', label: 'Çekirdek', icon: Coffee },
  { href: '/orders', label: 'Sipariş', icon: ShoppingBag },
  { href: '/cuppings', label: 'Cupping', icon: Beaker },
];

export function BottomNavLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0 md:flex-row">
      <aside
        className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r"
        style={{ background: 'var(--bg-nav)', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg"
              style={{ background: 'var(--copper)', color: 'white' }}
            >
              R
            </div>
            <div>
              <div className="font-display text-lg font-bold" style={{ color: 'var(--text-nav)' }}>RoastPulse</div>
              <div className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-nav-muted)' }}>
                Kavurma Atölyesi
              </div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors')}
                style={{
                  background: active ? 'rgba(184, 115, 51, 0.25)' : 'transparent',
                  color: active ? 'var(--copper-light)' : 'var(--text-nav-muted)',
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t space-y-2" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <p className="text-xs truncate px-1" style={{ color: 'var(--text-nav-muted)' }}>{user?.email}</p>
          <div className="flex gap-2">
            <button onClick={toggle} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs" style={{ color: 'var(--text-nav-muted)' }}>
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
              {isDark ? 'Açık' : 'Koyu'}
            </button>
            <button onClick={handleLogout} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs" style={{ color: 'var(--roast-red)' }}>
              <LogOut size={14} /> Çıkış
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-64">
        <header
          className="md:hidden sticky top-0 z-30 px-4 py-3 flex items-center justify-between border-b"
          style={{ background: 'var(--bg-nav)', borderColor: 'rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm" style={{ background: 'var(--copper)', color: 'white' }}>R</div>
            <span className="font-display font-bold text-sm" style={{ color: 'var(--text-nav)' }}>RoastPulse</span>
          </div>
          <button onClick={toggle} style={{ color: 'var(--text-nav-muted)' }}>
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6">{children}</div>
      </main>

      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t flex justify-around py-2"
        style={{ background: 'var(--bg-nav)', borderColor: 'rgba(255,255,255,0.06)' }}
        aria-label="Ana navigasyon"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-0.5 px-2 py-1 min-w-[56px]"
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={20} style={{ color: active ? 'var(--copper-light)' : 'var(--text-nav-muted)' }} />
              <span className="text-[10px] font-medium" style={{ color: active ? 'var(--copper-light)' : 'var(--text-nav-muted)' }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
