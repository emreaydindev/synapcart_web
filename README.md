# SynapCart Web

SynapCart'ın web sitesi: tanıtım sayfası, yasal sayfalar (gizlilik, kullanım koşulları), destek, hesap silme ve şifre sıfırlama. Next.js ile geliştirildi ve OpenNext ile **Cloudflare Workers** üzerinde yayınlanır.

| Ortam | Adres |
|---|---|
| Production | `https://synapcart.emreaydin.dev` |
| Staging | `https://staging.synapcart.emreaydin.dev` |

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
| `/.well-known/apple-app-site-association` | iOS Universal Links (şifre sıfırlama bağlantıları uygulamada açılır) |

## Teknik yığın

- Next.js 16 (App Router), React 19, TypeScript
- Düz CSS (CSS değişkenleri ve CSS modülleri), Plus Jakarta Sans (yerel font)
- Deploy: Cloudflare Workers (`@opennextjs/cloudflare`, `wrangler.jsonc`)

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

## Deploy (Cloudflare Workers)

`NEXT_PUBLIC_*` değerleri build sırasında koda gömülür:
- production değerleri `.env.production` dosyasından gelir (`api.synapcart.emreaydin.dev`);
- staging değerlerini `deploy:staging` betiği komut satırında verir.

```bash
npx wrangler login
npm run deploy           # https://synapcart.emreaydin.dev
npm run deploy:staging   # https://staging.synapcart.emreaydin.dev
npm run preview          # production build'i yerelde workerd ile çalıştırır
```

- Custom domain'leri wrangler deploy sırasında oluşturur. `synapcart.emreaydin.dev` alanı aynı Cloudflare hesabında olmalıdır.
- `public/` altındaki dosyaların başlıkları (`.well-known` dosyalarının JSON content-type'ı dahil) `public/_headers` içindedir.
- GitHub Actions (`.github/workflows/deploy.yml`) her push'ta lint ve build çalıştırır. `main` dalını staging'e deploy eder; `v*` etiketlerini production'a deploy eder. Gereken repo secret'ları: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

### Mağaza öncesi yapılacaklar (OWNER)

1. `public/.well-known/assetlinks.json`: Play Console'daki uygulama imzalama SHA-256 değerini yaz.
2. `public/.well-known/apple-app-site-association`: `REPLACE_WITH_TEAM_ID` yerine Apple Developer Team ID'yi yaz.
3. `lib/site.ts`: `appStoreUrl` ve `appStoreId` değerlerini App Store Connect'teki Apple ID ile, destek e-postasını ve veri sorumlusunu gerçek bilgilerle değiştir. Gerçek id girildiğinde iOS Smart App Banner kendiliğinden açılır.
