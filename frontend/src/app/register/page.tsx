'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    email: '', password: '', firstName: '', lastName: '', roasteryName: '', city: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(form);
      router.push('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Kayıt başarısız');
    } finally {
      setLoading(false);
    }
  };

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="card w-full max-w-md">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-lg" style={{ background: 'var(--copper)', color: 'white' }}>R</div>
            <div>
              <span className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>RoastPulse</span>
              <p className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>Kavurma Atölyesi</p>
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Kayıt Ol</h1>
          <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>Kahve kavurma atölyeniz için yeni hesap oluşturun</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(192, 57, 43, 0.1)', color: 'var(--danger)' }}>
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Ad</label>
              <input type="text" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Soyad</label>
              <input type="text" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} className="input-field" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>E-posta</label>
            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="input-field" placeholder="ornek@kavurma.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Şifre</label>
            <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} className="input-field" placeholder="En az 6 karakter" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Kavurma Atölyesi Adı</label>
            <input type="text" value={form.roasteryName} onChange={(e) => update('roasteryName', e.target.value)} className="input-field" placeholder="Örn: Kadıköy Kavurma" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>Şehir</label>
            <input type="text" value={form.city} onChange={(e) => update('city', e.target.value)} className="input-field" placeholder="Örn: İstanbul" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'Hesap oluşturuluyor...' : 'Kayıt Ol'}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
          Zaten hesabınız var mı?{' '}
          <Link href="/login" className="font-medium" style={{ color: 'var(--accent)' }}>Giriş Yapın</Link>
        </p>
      </div>
    </div>
  );
}
