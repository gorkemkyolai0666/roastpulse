'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { BottomNavLayout } from '@/components/bottom-nav-layout';
import { formatDateTime, getStatusBadgeClass, getStatusLabel, getCuppingTypeLabel } from '@/lib/utils';

interface Customer {
  id: string;
  companyName: string;
  contactName?: string;
}

interface Cupping {
  id: string;
  date: string;
  type: string;
  status: string;
  duration?: number;
  notes?: string;
  roasterName?: string;
  customer?: Customer;
}

const emptyForm = {
  date: '',
  type: 'sample_tasting',
  customerId: '',
  duration: '45',
  notes: '',
  roasterName: '',
};

export default function CuppingsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [cuppings, setCuppings] = useState<Cupping[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  const loadData = () => {
    setLoading(true);
    Promise.all([api.getCuppings(), api.getCustomers()])
      .then(([cuppingList, customerList]) => {
        setCuppings(cuppingList);
        setCustomers(customerList);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (user) loadData(); }, [user]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.createCupping({
        customerId: form.customerId,
        date: new Date(form.date).toISOString(),
        type: form.type,
        duration: parseInt(form.duration, 10) || 45,
        notes: form.notes || undefined,
        roasterName: form.roasterName || undefined,
      });
      setShowForm(false);
      setForm(emptyForm);
      loadData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Hata oluştu');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu cupping seansını silmek istediğinize emin misiniz?')) return;
    setError('');
    try {
      await api.deleteCupping(id);
      loadData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Hata oluştu');
    }
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    setError('');
    try {
      await api.updateCupping(id, { status });
      loadData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Hata oluştu');
    }
  };

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
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Cupping Seansları</h1>
          <p className="mt-1" style={{ color: 'var(--text-muted)' }}>{cuppings.length} seans</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary shrink-0">
          {showForm ? 'İptal' : 'Yeni Seans'}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-lg mb-4 text-sm" style={{ background: 'rgba(192, 57, 43, 0.1)', color: 'var(--danger)' }}>
          {error}
        </div>
      )}

      {showForm && (
        <div className="card mb-6">
          <h2 className="font-display text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Yeni Cupping Seansı</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Müşteri *</label>
              <select value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })} className="input-field" required>
                <option value="">Seçin</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>{c.companyName}{c.contactName ? ` (${c.contactName})` : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Tür</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="input-field">
                <option value="quality_check">Kalite Kontrolü</option>
                <option value="sample_tasting">Numune Tadımı</option>
                <option value="training">Eğitim</option>
                <option value="wholesale_visit">Toptan Ziyaret</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Tarih & Saat *</label>
              <input type="datetime-local" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" required />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Süre (dk)</label>
              <input type="number" min="15" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="input-field" />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Kavurmacı</label>
              <input type="text" value={form.roasterName} onChange={(e) => setForm({ ...form, roasterName: e.target.value })} className="input-field" placeholder="Opsiyonel" />
            </div>
            <div>
              <label className="block text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Not</label>
              <input type="text" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-field" />
            </div>
            <div className="md:col-span-2"><button type="submit" className="btn-primary">Kaydet</button></div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="animate-pulse py-12 text-center" style={{ color: 'var(--text-muted)' }}>Yükleniyor...</div>
      ) : cuppings.length === 0 ? (
        <div className="card p-12 text-center" style={{ color: 'var(--text-muted)' }}>
          Henüz cupping seansı bulunmuyor
        </div>
      ) : (
        <div className="space-y-3">
          {cuppings.map((cupping) => (
            <div key={cupping.id} className="card flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {cupping.customer?.companyName || '—'}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {getCuppingTypeLabel(cupping.type)} — {formatDateTime(cupping.date)}
                  {cupping.duration ? ` · ${cupping.duration} dk` : ''}
                </div>
                {cupping.roasterName && (
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Kavurmacı: {cupping.roasterName}</div>
                )}
                {cupping.notes && (
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{cupping.notes}</div>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={getStatusBadgeClass(cupping.status)}>{getStatusLabel(cupping.status)}</span>
                {cupping.status === 'scheduled' && (
                  <button onClick={() => handleStatusUpdate(cupping.id, 'confirmed')} className="btn-primary text-xs px-3 py-1">Onayla</button>
                )}
                {cupping.status === 'confirmed' && (
                  <button onClick={() => handleStatusUpdate(cupping.id, 'in_progress')} className="btn-primary text-xs px-3 py-1">Başlat</button>
                )}
                {cupping.status === 'in_progress' && (
                  <button onClick={() => handleStatusUpdate(cupping.id, 'completed')} className="btn-primary text-xs px-3 py-1">Tamamla</button>
                )}
                <button onClick={() => handleDelete(cupping.id)} className="text-xs px-3 py-1 rounded-lg" style={{ color: 'var(--danger)' }}>Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </BottomNavLayout>
  );
}
