'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import { BottomNavLayout } from '@/components/bottom-nav-layout';
import { getRoastLevelLabel, getBeanOriginLabel } from '@/lib/utils';

interface RoastProfile {
  id: string;
  name: string;
  origin: string;
  variety: string;
  roastLevel: string;
  chargeTemp: number;
  dropTemp: number;
  durationMin: number;
  description?: string;
}

const emptyForm = {
  name: '',
  origin: '',
  variety: '',
  roastLevel: 'medium',
  chargeTemp: '200',
  dropTemp: '215',
  durationMin: '12',
  description: '',
};

export default function RoastProfilesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profiles, setProfiles] = useState<RoastProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  const loadProfiles = () => {
    setLoading(true);
    api.getRoastProfiles()
      .then(setProfiles)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (user) loadProfiles(); }, [user]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.createRoastProfile({
        name: form.name,
        origin: form.origin || undefined,
        variety: form.variety || undefined,
        roastLevel: form.roastLevel,
        chargeTemp: parseInt(form.chargeTemp, 10) || 200,
        dropTemp: parseInt(form.dropTemp, 10) || 215,
        durationMin: parseInt(form.durationMin, 10) || 12,
        description: form.description || undefined,
      });
      setShowForm(false);
      setForm(emptyForm);
      loadProfiles();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Hata oluştu');
    }
  };

  const filtered = profiles.filter((p) =>
    `${p.name} ${p.origin} ${p.variety} ${getRoastLevelLabel(p.roastLevel)}`.toLowerCase().includes(search.toLowerCase())
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
          <h1 className="font-display text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Kavurma Profilleri</h1>
          <p className="mt-1" style={{ color: 'var(--text-muted)' }}>{profiles.length} kayıtlı profil</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary shrink-0">
          {showForm ? 'İptal' : 'Yeni Profil'}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-lg mb-4 text-sm" style={{ background: 'rgba(192, 57, 43, 0.1)', color: 'var(--danger)' }}>
          {error}
        </div>
      )}

      {showForm && (
        <div className="card mb-6">
          <h2 className="font-display text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Yeni Kavurma Profili</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Profil adı *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
            <input type="text" placeholder="Menşei (örn: ethiopia)" value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} className="input-field" />
            <input type="text" placeholder="Çeşit (örn: Heirloom)" value={form.variety} onChange={(e) => setForm({ ...form, variety: e.target.value })} className="input-field" />
            <select value={form.roastLevel} onChange={(e) => setForm({ ...form, roastLevel: e.target.value })} className="input-field">
              <option value="light">Açık Kavurma</option>
              <option value="medium">Orta Kavurma</option>
              <option value="medium_dark">Orta-Koyu</option>
              <option value="dark">Koyu Kavurma</option>
            </select>
            <input type="number" placeholder="Charge sıcaklığı (°C)" value={form.chargeTemp} onChange={(e) => setForm({ ...form, chargeTemp: e.target.value })} className="input-field" />
            <input type="number" placeholder="Drop sıcaklığı (°C)" value={form.dropTemp} onChange={(e) => setForm({ ...form, dropTemp: e.target.value })} className="input-field" />
            <input type="number" placeholder="Süre (dk)" value={form.durationMin} onChange={(e) => setForm({ ...form, durationMin: e.target.value })} className="input-field" />
            <textarea placeholder="Açıklama" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field md:col-span-2 min-h-[80px]" />
            <div className="md:col-span-2"><button type="submit" className="btn-primary">Kaydet</button></div>
          </form>
        </div>
      )}

      <input
        type="search"
        placeholder="Profil ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input-field mb-4 max-w-md"
        aria-label="Profil ara"
      />

      {loading ? (
        <div className="animate-pulse py-12 text-center" style={{ color: 'var(--text-muted)' }}>Yükleniyor...</div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center" style={{ color: 'var(--text-muted)' }}>
          {search ? 'Aramanızla eşleşen profil bulunamadı' : 'Henüz kavurma profili bulunmuyor'}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((profile) => (
            <div key={profile.id} className="card">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-display text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{profile.name}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                    {profile.origin ? getBeanOriginLabel(profile.origin) : '—'}
                    {profile.variety && ` · ${profile.variety}`}
                  </p>
                </div>
                <span className="badge-gold text-xs shrink-0">{getRoastLevelLabel(profile.roastLevel)}</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <span className="block text-xs" style={{ color: 'var(--text-muted)' }}>Charge</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{profile.chargeTemp}°C</span>
                </div>
                <div>
                  <span className="block text-xs" style={{ color: 'var(--text-muted)' }}>Drop</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{profile.dropTemp}°C</span>
                </div>
                <div>
                  <span className="block text-xs" style={{ color: 'var(--text-muted)' }}>Süre</span>
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{profile.durationMin} dk</span>
                </div>
              </div>
              {profile.description && (
                <p className="text-xs mt-3 pt-3 border-t" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
                  {profile.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </BottomNavLayout>
  );
}
