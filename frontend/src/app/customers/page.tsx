'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { BottomNavLayout } from '@/components/bottom-nav-layout';

interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  phone: string;
  email?: string;
  address?: string;
  city?: string;
  notes?: string;
}

const emptyForm = {
  companyName: '',
  contactName: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  notes: '',
};

export default function CustomersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  const loadCustomers = () => {
    setLoading(true);
    api.getCustomers()
      .then(setCustomers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (user) loadCustomers(); }, [user]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.createCustomer(form);
      setShowForm(false);
      setForm(emptyForm);
      loadCustomers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) return;
    setError('');
    try {
      await api.deleteCustomer(id);
      loadCustomers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Hata oluştu');
    }
  };

  const filtered = customers.filter((c) =>
    `${c.companyName} ${c.contactName} ${c.phone} ${c.email || ''} ${c.city || ''} ${c.notes || ''}`.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse" style={{ color: 'var(--text-muted)' }}>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <BottomNavLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Müşteriler</h1>
          <p className="mt-1" style={{ color: 'var(--text-muted)' }}>{customers.length} kayıtlı müşteri</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary shrink-0">
          {showForm ? 'İptal' : 'Yeni Müşteri'}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-lg mb-4 text-sm" style={{ background: 'rgba(192, 57, 43, 0.1)', color: 'var(--danger)' }}>
          {error}
        </div>
      )}

      {showForm && (
        <div className="card mb-6">
          <h2 className="font-display text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Yeni Müşteri</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Firma adı *" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="input-field" required />
            <input type="text" placeholder="Yetkili kişi" value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} className="input-field" />
            <input type="tel" placeholder="Telefon *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" required />
            <input type="email" placeholder="E-posta" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
            <input type="text" placeholder="Adres" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="input-field md:col-span-2" />
            <input type="text" placeholder="Şehir" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-field" />
            <input type="text" placeholder="Notlar (örn: orta kavurma tercihi)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-field" />
            <div className="md:col-span-2"><button type="submit" className="btn-primary">Kaydet</button></div>
          </form>
        </div>
      )}

      <input
        type="search"
        placeholder="Müşteri ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input-field mb-4 max-w-md"
        aria-label="Müşteri ara"
      />

      {loading ? (
        <div className="animate-pulse py-12 text-center" style={{ color: 'var(--text-muted)' }}>Yükleniyor...</div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center" style={{ color: 'var(--text-muted)' }}>
          {search ? 'Aramanızla eşleşen müşteri bulunamadı' : 'Henüz müşteri kaydı bulunmuyor'}
        </div>
      ) : (
        <div className="card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <th className="text-left p-4 font-medium" style={{ color: 'var(--text-muted)' }}>Firma</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell" style={{ color: 'var(--text-muted)' }}>Yetkili</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell" style={{ color: 'var(--text-muted)' }}>Telefon</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell" style={{ color: 'var(--text-muted)' }}>Şehir</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell" style={{ color: 'var(--text-muted)' }}>Notlar</th>
                  <th className="text-right p-4 font-medium" style={{ color: 'var(--text-muted)' }}>İşlem</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                    <td className="p-4 font-medium" style={{ color: 'var(--text-primary)' }}>{c.companyName}</td>
                    <td className="p-4 hidden md:table-cell" style={{ color: 'var(--text-muted)' }}>{c.contactName || '—'}</td>
                    <td className="p-4 hidden md:table-cell" style={{ color: 'var(--text-muted)' }}>{c.phone}</td>
                    <td className="p-4 hidden lg:table-cell" style={{ color: 'var(--text-muted)' }}>{c.city || '—'}</td>
                    <td className="p-4 hidden lg:table-cell max-w-[200px] truncate" style={{ color: 'var(--text-muted)' }}>{c.notes || '—'}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(c.id)} className="text-xs px-3 py-1 rounded-lg" style={{ color: 'var(--danger)' }}>Sil</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </BottomNavLayout>
  );
}
