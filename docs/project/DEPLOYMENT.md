# RoastPulse — Dağıtım Kılavuzu

## Demo Hesap

- **E-posta:** demo@kadikoykavurma.com
- **Şifre:** demo123456

## Ortam Değişkenleri

### Backend
- `DATABASE_URL` — PostgreSQL bağlantı dizesi
- `JWT_SECRET` — JWT imzalama anahtarı
- `FRONTEND_URL` — https://roastpulse.vercel.app
- `PORT` — 8080 (Railway production)

### Frontend
- `NEXT_PUBLIC_API_URL` — https://roastpulse-backend-production.up.railway.app/api

## Demo URL'leri

- **Frontend:** https://roastpulse.vercel.app (alternatif: https://roastpulse-seven.vercel.app)
- **Backend API:** https://roastpulse-backend-production.up.railway.app/api
- **Health Check:** https://roastpulse-backend-production.up.railway.app/api/health

## Bulut Canlı Önizleme Linki

- **Google IDX Import:** https://idx.google.com/import?url=https://github.com/gorkemkyolai0666/roastpulse

Son güncelleme: 2026-06-19 — deploy doğrulandı; health servis adı düzeltildi.

## Yerel Geliştirme

```bash
# Backend
cd backend && npm install --legacy-peer-deps
npx prisma migrate deploy && npx prisma db seed
npm run start:prod

# Frontend
cd frontend && npm install && npm run dev
```

Portlar: Backend 4038, Frontend 3038
