import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { PlayBadge } from "@/components/PlayBadge";
import { plans, site } from "@/lib/site";
import styles from "./page.module.css";

const features = [
  {
    title: "Doğal dilde ara",
    text: "“40.000 TL altı kamerası iyi telefon” gibi yaz. Filtrelerle uğraşmadan ne istediğini anlatman yeterli.",
    icon: "M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z",
  },
  {
    title: "Yapay zekâ analizi",
    text: "Bulunan ürünlerin artılarını, eksilerini ve hangisinin sana uygun olduğunu kısa ve net bir özetle anlatır.",
    icon: "M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3ZM19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z",
  },
  {
    title: "Mağazalar arası fiyatlar",
    text: "Sonuçlar Google Alışveriş’teki mağazalardan, senin para biriminde gelir. Tek dokunuşla satıcıya git.",
    icon: "M3 9h18M5 9l1-5h12l1 5M5 9v11h14V9M9 20v-6h6v6",
  },
  {
    title: "Favoriler ve karşılaştırma",
    text: "Beğendiklerini favorilere ekle; Premium ile 4 ürüne kadar yan yana karşılaştır.",
    icon: "M12 21s-7.5-4.6-9.5-9.3C1.1 8.3 3.3 4.5 7 4.5c2 0 3.6 1.1 5 2.8 1.4-1.7 3-2.8 5-2.8 3.7 0 5.9 3.8 4.5 7.2C19.5 16.4 12 21 12 21Z",
  },
  {
    title: "Fiyat alarmları",
    text: "Premium’da favori ürünün fiyatı belirlediğin seviyeye düşünce bildirim al.",
    icon: "M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0",
  },
  {
    title: "Türkçe ve İngilizce",
    text: "Uygulama ve asistanın cevapları seçtiğin dilde. TRY, USD ve EUR desteği.",
    icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20",
  },
];

const steps = [
  { n: "1", title: "Ne aradığını yaz", text: "Bütçeni, kullanım amacını ve önemsediğin özellikleri sohbet eder gibi anlat." },
  { n: "2", title: "Asistan araştırsın", text: "SynapCart soruyu anlar, mağazalarda arar ve uygun ürünleri toplar." },
  { n: "3", title: "En iyisini seç", text: "Kısa özeti oku, ürünleri incele, favorile ya da doğrudan satıcıya git." },
];

const comparison: { label: string; free: string | boolean; premium: string | boolean }[] = [
  { label: "Günlük mesaj", free: String(plans.free.messages), premium: String(plans.premium.messages) },
  { label: "Arama başına ürün", free: String(plans.free.products), premium: String(plans.premium.products) },
  { label: "Derin analiz", free: false, premium: true },
  { label: "Fiyat alarmları", free: false, premium: true },
  { label: "Ürün karşılaştırma", free: false, premium: true },
  { label: "Sohbet geçmişi", free: plans.free.history, premium: plans.premium.history },
];

const faqs = [
  {
    q: "SynapCart ücretli mi?",
    a: `Hayır, temel kullanım ücretsizdir: günde ${plans.free.messages} mesaj ve arama başına ${plans.free.products} ürün. Daha fazlası için isteğe bağlı Premium aboneliği vardır.`,
  },
  {
    q: "Ürünleri SynapCart mı satıyor?",
    a: "Hayır. SynapCart bir alışveriş asistanıdır; ürünleri Google Alışveriş’teki mağazalardan bulur. Satın alma, ödeme, kargo ve iade işlemleri ilgili satıcıyla yapılır.",
  },
  {
    q: "Fiyatlar güncel mi?",
    a: "Fiyatlar arama anında mağazalardan alınır ve kısa bir süre önbelleğe alınabilir. Satın almadan önce satıcının sayfasındaki son fiyatı kontrol et.",
  },
  {
    q: "Premium aboneliğimi nasıl iptal ederim?",
    a: "Abonelikler Google Play üzerinden yönetilir. Google Play › Profil › Ödemeler ve abonelikler › Abonelikler bölümünden istediğin zaman iptal edebilirsin; dönem sonuna kadar Premium devam eder.",
  },
  {
    q: "Verilerim güvende mi?",
    a: "Şifren güvenli biçimde (hash) saklanır, bağlantılar HTTPS ile şifrelenir. Hangi verileri neden işlediğimizi Gizlilik Politikası’nda anlattık.",
    link: { href: "/privacy", label: "Gizlilik Politikası" },
  },
  {
    q: "Hesabımı nasıl silerim?",
    a: "Uygulamada Profil › Hesabı sil adımlarını izleyebilir ya da web üzerinden silme talebi oluşturabilirsin. Hesabın, sohbetlerin ve favorilerin kalıcı olarak silinir.",
    link: { href: "/delete-account", label: "Hesap silme" },
  },
];

function Check({ on }: { on: boolean }) {
  return on ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" role="img" aria-label="Var">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <span className="muted" role="img" aria-label="Yok">
      —
    </span>
  );
}

function Cell({ v }: { v: string | boolean }) {
  return typeof v === "boolean" ? <Check on={v} /> : <>{v}</>;
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: site.name,
    operatingSystem: "Android",
    applicationCategory: "ShoppingApplication",
    description: site.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "TRY" },
    inLanguage: ["tr", "en"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <span className="badge badge-outline">Yapay zekâ destekli alışveriş asistanı</span>
            <h1 className={styles.heroTitle}>
              Ne aradığını söyle, <span className="gradient-text">en iyisini</span> birlikte bulalım.
            </h1>
            <p className={styles.heroLead}>
              SynapCart sorunu anlar, mağazalarda arar, fiyatları karşılaştırır ve sana kısa, net bir öneri sunar. Saatlerce sekme
              gezmeye son.
            </p>
            <div className={styles.heroActions} id="indir">
              <PlayBadge />
              <Link href="#nasil-calisir" className="btn btn-secondary">
                Nasıl çalışır?
              </Link>
            </div>
            <p className={styles.heroNote}>Ücretsiz başla · Kredi kartı gerekmez</p>
          </div>

          <div className={styles.phone} aria-hidden="true">
            <div className={styles.phoneScreen}>
              <div className={styles.phoneTop}>
                <LogoMark size={22} />
                <span>SynapCart</span>
                <span className={styles.phoneBadge}>Ücretsiz</span>
              </div>
              <div className={styles.bubbleUser}>En iyi gürültü engelleyici kulaklık hangisi?</div>
              <div className={styles.bubbleAi}>
                <strong>Kısa özet</strong>
                <span>
                  Gürültü engelleme için <b>Sony WH-1000XM5</b> en güçlü seçenek; taşınabilirlik istiyorsan <b>AirPods Pro 2</b> öne
                  çıkıyor.
                </span>
              </div>
              <div className={styles.products}>
                {[
                  { name: "AirPods Pro 2", price: "₺8.499", store: "Hepsiburada" },
                  { name: "Sony WH-1000XM5", price: "₺11.999", store: "Trendyol" },
                ].map((p) => (
                  <div key={p.name} className={styles.product}>
                    <div className={styles.productImg}>
                      <span className={styles.price}>{p.price}</span>
                    </div>
                    <span className={styles.productName}>{p.name}</span>
                    <span className={styles.productStore}>{p.store}</span>
                  </div>
                ))}
              </div>
              <div className={styles.phoneInput}>Asistana sor…</div>
            </div>
          </div>
        </div>
      </section>

      <section id="ozellikler" className={`container ${styles.section}`} aria-labelledby="ozellikler-baslik">
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>Özellikler</span>
          <h2 id="ozellikler-baslik" className={styles.h2}>
            Akıllı alışverişin için ihtiyacın olan her şey
          </h2>
        </div>
        <ul className={styles.features}>
          {features.map((f) => (
            <li key={f.title} className={`card ${styles.feature}`}>
              <span className={styles.featureIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={f.icon} />
                </svg>
              </span>
              <h3>{f.title}</h3>
              <p className="muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="nasil-calisir" className={`container ${styles.section}`} aria-labelledby="nasil-baslik">
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>Nasıl çalışır?</span>
          <h2 id="nasil-baslik" className={styles.h2}>
            Üç adımda doğru ürün
          </h2>
        </div>
        <ol className={styles.steps}>
          {steps.map((s) => (
            <li key={s.n} className={styles.step}>
              <span className={styles.stepNum} aria-hidden="true">
                {s.n}
              </span>
              <h3>{s.title}</h3>
              <p className="muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="fiyatlandirma" className={`container ${styles.section}`} aria-labelledby="fiyat-baslik">
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>Fiyatlandırma</span>
          <h2 id="fiyat-baslik" className={styles.h2}>
            Ücretsiz başla, istersen Premium’a geç
          </h2>
          <p className="muted">Premium aylık veya yıllık abonelikle Google Play üzerinden sunulacak. Fiyatlar uygulamada gösterilir.</p>
        </div>
        <div className={styles.plans}>
          <div className={`card ${styles.plan}`}>
            <h3>Ücretsiz</h3>
            <p className={styles.planPrice}>₺0</p>
            <p className="muted">Günlük alışveriş soruların için.</p>
            <ul className={styles.planList}>
              <li>Günde {plans.free.messages} mesaj</li>
              <li>Arama başına {plans.free.products} ürün</li>
              <li>Favoriler</li>
              <li>{plans.free.history}</li>
            </ul>
          </div>
          <div className={`card ${styles.plan} ${styles.planPremium}`}>
            <div className={styles.planHead}>
              <h3>Premium</h3>
              <span className="badge badge-premium">Çok yakında</span>
            </div>
            <p className={styles.planPrice}>Aylık · Yıllık</p>
            <p className="muted">Daha fazla sonuç, daha derin analiz.</p>
            <ul className={styles.planList}>
              <li>Günde {plans.premium.messages} mesaj</li>
              <li>Arama başına {plans.premium.products} ürün ve derin analiz</li>
              <li>Fiyat alarmları</li>
              <li>4 ürüne kadar karşılaştırma</li>
              <li>Sınırsız sohbet geçmişi</li>
            </ul>
          </div>
        </div>

        <div className={`card ${styles.tableWrap}`}>
          <table className={styles.table}>
            <caption className="sr-only">Ücretsiz ve Premium planların karşılaştırması</caption>
            <thead>
              <tr>
                <th scope="col">Özellik</th>
                <th scope="col">Ücretsiz</th>
                <th scope="col" className={styles.premiumCol}>
                  Premium
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td>
                    <Cell v={row.free} />
                  </td>
                  <td className={styles.premiumCol}>
                    <Cell v={row.premium} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="sss" className={`container ${styles.section} ${styles.faqSection}`} aria-labelledby="sss-baslik">
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>SSS</span>
          <h2 id="sss-baslik" className={styles.h2}>
            Sık sorulan sorular
          </h2>
        </div>
        <div className={styles.faq}>
          {faqs.map((f) => (
            <details key={f.q} className={styles.faqItem}>
              <summary>{f.q}</summary>
              <p className="muted">
                {f.a}{" "}
                {f.link && (
                  <Link href={f.link.href} className={styles.inlineLink}>
                    {f.link.label}
                  </Link>
                )}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="container">
        <div className={`card ${styles.cta}`}>
          <LogoMark size={64} />
          <h2 className={styles.h2}>Bir sonraki alışverişini SynapCart’a sor</h2>
          <p className="muted">Ücretsiz indir, saniyeler içinde başla.</p>
          <PlayBadge />
        </div>
      </section>
    </>
  );
}
