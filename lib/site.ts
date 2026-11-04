// Site-wide constants. Values marked OWNER must be confirmed by the app owner
// before the App Store / Play Store submissions (see synapcart/docs/ROADMAP.md).

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://synapcart.emreaydin.dev").replace(/\/$/, "");

export const site = {
  name: "SynapCart",
  description:
    "SynapCart, ne aradığını sohbetle anlatabildiğin yapay zekâ destekli alışveriş asistanı. Ürünleri bulur, mağazalar arasında fiyatları karşılaştırır ve senin için en iyisini önerir.",
  packageName: "com.neilb.synapcart",
  playUrl: "https://play.google.com/store/apps/details?id=com.neilb.synapcart",
  // OWNER: replace with the App Store URL (apps.apple.com/app/id<Apple ID>) once the app record exists.
  appStoreUrl: "https://apps.apple.com/app/synapcart/id0000000000",
  appStoreId: "0000000000",
  appleSubscriptionsUrl: "https://apps.apple.com/account/subscriptions",
  playSubscriptionsUrl: "https://play.google.com/store/account/subscriptions",
  appScheme: "synapcart://login",
  // OWNER: replace with the real support inbox and the data controller's details.
  supportEmail: "destek@synapcart.emreaydin.dev",
  controller: "SynapCart geliştirici ekibi",
  legalUpdated: "4 Kasım 2026",
} as const;

export const nav = [
  { href: "/#ozellikler", label: "Özellikler" },
  { href: "/#fiyatlandirma", label: "Fiyatlandırma" },
  { href: "/#sss", label: "SSS" },
  { href: "/support", label: "Destek" },
] as const;

// Mirrors synapcart_backend src/services/plan.ts (and both apps' paywall copy).
// Change all three together. Daily message quotas reset at 00:00 UTC.
export const plans = {
  free: { messages: 5, products: 3, history: "Son 10 sohbet" },
  premium: { messages: 100, products: 8, history: "Sınırsız", compare: 4 },
} as const;
