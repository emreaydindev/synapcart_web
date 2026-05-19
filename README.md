# SynapCart Web

SynapCart'ın kullanıcıya yönelik web arayüzüdür. Next.js ile geliştirilmiş bu uygulama, şu an için yalnızca e-posta tabanlı şifre sıfırlama sayfasını barındırmaktadır ve Vercel üzerinde yayınlanmaktadır.

## Özellikler

- Şifre sıfırlama sayfası (token doğrulama, şifre güç göstergesi, hata yönetimi)
- SynapCart mobil uygulamasıyla uyumlu dark/neon tema
- Backend API ile otomatik entegrasyon (Render üzerindeki FastAPI servisi)

## Teknik Yığın

- **Framework:** Next.js 14 (App Router)
- **Dil:** TypeScript
- **Deploy:** Vercel

## Kurulum ve Başlatma

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Yapılandırma

Ana dizinde `.env.local` adında bir dosya oluşturun:

```ini
NEXT_PUBLIC_API_URL=http://localhost:8001
```

Production için bu değer Render'daki backend URL'iniz olmalıdır.

### 3. Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

### 4. Şifre Sıfırlama Sayfasını Test Et

```
http://localhost:3000/reset-password?token=test123
```

## Deploy (Vercel)

1. Repoyu GitHub'a push edin
2. [Vercel](https://vercel.com) üzerinde projeyi import edin
3. Environment variable olarak şunu ekleyin:

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

4. Deploy edin

## Proje Yapısı

```
synapcart-web/
├── app/
│   └── reset-password/
│       └── page.tsx      # Şifre sıfırlama sayfası
├── next.config.ts         # API proxy ayarları
└── .env.local             # Ortam değişkenleri (git'e ekleme)
```
