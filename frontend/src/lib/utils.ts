import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateTime(date: string | Date) {
  return new Date(date).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(amount);
}

export function getStatusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    completed: 'badge-success',
    shipped: 'badge-success',
    confirmed: 'badge-success',
    packed: 'badge-gold',
    scheduled: 'badge-info',
    quoted: 'badge-info',
    roasting: 'badge-warning',
    in_progress: 'badge-warning',
    cancelled: 'badge-danger',
    no_show: 'badge-danger',
  };
  return map[status] || 'badge-info';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    scheduled: 'Planlandı',
    confirmed: 'Onaylandı',
    in_progress: 'Devam Ediyor',
    completed: 'Tamamlandı',
    cancelled: 'İptal',
    no_show: 'Gelmedi',
    quoted: 'Teklif',
    roasting: 'Kavruluyor',
    packed: 'Paketlendi',
    shipped: 'Sevk Edildi',
  };
  return labels[status] || status;
}

export function getCuppingTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    quality_check: 'Kalite Kontrolü',
    sample_tasting: 'Numune Tadımı',
    training: 'Eğitim',
    wholesale_visit: 'Toptan Ziyaret',
  };
  return labels[type] || type;
}

export function getRoastLevelLabel(level: string): string {
  const labels: Record<string, string> = {
    light: 'Açık Kavurma',
    medium: 'Orta Kavurma',
    medium_dark: 'Orta-Koyu',
    dark: 'Koyu Kavurma',
  };
  return labels[level] || level;
}

export function getBeanOriginLabel(origin: string): string {
  const labels: Record<string, string> = {
    ethiopia: 'Etiyopya',
    colombia: 'Kolombiya',
    brazil: 'Brezilya',
    kenya: 'Kenya',
    guatemala: 'Guatemala',
    indonesia: 'Endonezya',
    turkey: 'Türkiye',
    other: 'Diğer',
  };
  return labels[origin] || origin;
}

export function getProcessingLabel(processing: string): string {
  const labels: Record<string, string> = {
    washed: 'Yıkanmış',
    natural: 'Doğal',
    honey: 'Bal İşlem',
    anaerobic: 'Anaerobik',
    other: 'Diğer',
  };
  return labels[processing] || processing;
}

export function getOrderStatusLabel(status: string): string {
  return getStatusLabel(status);
}
