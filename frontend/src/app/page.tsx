'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse" style={{ color: 'var(--text-muted)' }}>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      <header
        className="sticky top-0 z-30 backdrop-blur-md border-b"
        style={{ background: 'rgba(250, 243, 235, 0.85)', borderColor: 'var(--border-color)' }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg"
              style={{ background: 'var(--copper)', color: 'white' }}
            >
              R
            </div>
            <div>
              <span className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                RoastPulse
              </span>
              <p className="text-[10px] tracking-widest uppercase leading-none" style={{ color: 'var(--text-muted)' }}>
                Kavurma Atölyesi
              </p>
            </div>
          </Link>
          <nav className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm hidden sm:inline-flex px-4 py-2 rounded-lg font-medium border transition-colors"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              Giriş Yap
            </Link>
            <Link href="/register" className="btn-primary text-sm">Kayıt Ol</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: 'radial-gradient(ellipse at 70% 20%, rgba(184, 115, 51, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(44, 24, 16, 0.15) 0%, transparent 50%)',
            }}
          />
          <div className="max-w-6xl mx-auto px-6 py-20 md:py-32 relative">
            <div className="max-w-2xl">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6 font-medium"
                style={{ color: 'var(--accent)' }}
              >
                Kahve Kavurma Atölyesi SaaS
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] mb-8" style={{ color: 'var(--text-primary)' }}>
                Her kavurma,<br />
                <span style={{ color: 'var(--accent)' }}>bir sanat eseri</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-lg" style={{ color: 'var(--text-muted)' }}>
                Yeşil çekirdek stoğundan kavurma profillerine, toptan siparişlerden cupping seanslarına — kavurma atölyenizin tüm ritmini tek platformda yönetin.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register" className="btn-primary px-8 py-3 text-base">Atölyeni Aç</Link>
                <Link
                  href="/login"
                  className="px-8 py-3 text-base rounded-lg font-medium border transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  Demo Hesap
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
          <div className="max-w-6xl mx-auto px-6 py-20">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  num: '01',
                  title: 'Kavurma Profilleri',
                  desc: 'Charge, drop sıcaklığı ve süreyi kaydedin. Her çekirdek için tekrarlanabilir kavurma reçeteleri oluşturun.',
                },
                {
                  num: '02',
                  title: 'Yeşil Çekirdek Stoku',
                  desc: 'Menşei, işlem yöntemi ve hasat yılına göre envanterinizi kg bazında takip edin.',
                },
                {
                  num: '03',
                  title: 'Cupping & Sipariş',
                  desc: 'Numune tadımları, kalite kontrolü ve toptan siparişleri tek panelden yönetin.',
                },
              ].map((item) => (
                <article key={item.num}>
                  <span
                    className="font-display text-4xl font-bold block mb-4"
                    style={{ color: 'var(--border-color)' }}
                  >
                    {item.num}
                  </span>
                  <h3 className="font-display text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {item.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20">
          <div
            className="rounded-2xl p-10 md:p-16 text-center"
            style={{ background: 'linear-gradient(135deg, var(--espresso) 0%, var(--espresso-light) 100%)' }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--cream)' }}>
              Kavurma atölyenizi dijitalleştirmeye hazır mısınız?
            </h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--text-nav-muted)' }}>
              Ücretsiz kayıt olun ve kahve kavurma atölyenizi dakikalar içinde yönetmeye başlayın.
            </p>
            <Link href="/register" className="btn-primary inline-block px-10 py-3">
              Hemen Başlayın
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
        RoastPulse &copy; 2026 — Kahve kavurma atölyesi yönetim platformu
      </footer>
    </div>
  );
}
