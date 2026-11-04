// Site-wide constants. Values marked OWNER must be confirmed by the app owner
// before the Play Store submission (see synapcart/docs/ROADMAP.md).

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://synapcart.app").replace(/\/$/, "");

export const site = {
  name: "SynapCart",
  description:
    "SynapCart, ne aradığını sohbetle anlatabildiğin yapay zekâ destekli alışveriş asistanı. Ürünleri bulur, mağazalar arasında fiyatları karşılaştırır ve senin için en iyisini önerir.",
  packageName: "com.neilb.synapcart",
  playUrl: "https://play.google.com/store/apps/details?id=com.neilb.synapcart",
  appScheme: "synapcart://login",
  // OWNER: replace with the real support inbox and the data controller's details.
  supportEmail: "destek@synapcart.app",
  controller: "SynapCart geliştirici ekibi",
  legalUpdated: "4 Kasım 2026",
} as const;

export const nav = [
  { href: "/#ozellikler", label: "Özellikler" },
  { href: "/#fiyatlandirma", label: "Fiyatlandırma" },
  { href: "/#sss", label: "SSS" },
  { href: "/support", label: "Destek" },
] as const;

export const plans = {
  free: { messages: 5, products: 3, history: "Son 10 sohbet" },
  premium: { messages: 100, products: 8, history: "Sınırsız" },
} as const;
