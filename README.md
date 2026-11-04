# SynapCart Web

SynapCart'ın web sitesi: tanıtım sayfası, yasal sayfalar (gizlilik, kullanım koşulları), destek, hesap silme ve şifre sıfırlama. Next.js ile geliştirildi ve Vercel üzerinde yayınlanır.

## Sayfalar

| Yol | İçerik |
|---|---|
| `/` | Tanıtım: özellikler, nasıl çalışır, Ücretsiz / Premium, SSS |
| `/privacy` | Gizlilik Politikası (KVKK ve GDPR) |
| `/terms` | Kullanım Koşulları (abonelik ve iade dahil) |
| `/support` | Destek ve iletişim |
| `/delete-account` | Hesap silme (uygulama adımları ve e-posta onaylı web talebi) |
| `/reset-password?token=…` | Şifre sıfırlama (backend'in gönderdiği e-postadaki bağlantı) |
| `/.well-known/assetlinks.json` | Android App Links doğrulaması |

## Teknik yığın

- Next.js 16 (App Router), React 19, TypeScript
- Düz CSS (CSS değişkenleri ve CSS modülleri), Plus Jakarta Sans (yerel font)
- Deploy: Vercel

## Kurulum

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.local`:

```ini
NEXT_PUBLIC_API_URL=http://localhost:8001   # zorunlu; backend adresi
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # kanonik URL, OpenGraph, sitemap
```

Uygulama `http://localhost:3000` adresinde çalışır. Şifre sıfırlamayı `http://localhost:3000/reset-password?token=test123` ile deneyebilirsin.

## Kontroller

```bash
npm run lint
npm run build
```

## Deploy (Vercel)

1. Projeyi Vercel'e import et.
2. `NEXT_PUBLIC_API_URL` (Render backend adresi) ve `NEXT_PUBLIC_SITE_URL` (ör. `https://synapcart.app`) ortam değişkenlerini ekle.
3. Alan adını (`synapcart.app`) Vercel'e yönlendir; uygulamanın derin bağlantıları ve backend'in `APP_FRONTEND_URL` değeri bu alan adını kullanır.
4. `public/.well-known/assetlinks.json` içindeki parmak izini Play Console'daki uygulama imzalama SHA-256 değeriyle değiştir.
