import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import styles from "./SiteFooter.module.css";

const groups = [
  {
    title: "Ürün",
    links: [
      { href: "/#ozellikler", label: "Özellikler" },
      { href: "/#fiyatlandirma", label: "Fiyatlandırma" },
      { href: "/#sss", label: "Sık sorulan sorular" },
    ],
  },
  {
    title: "Yardım",
    links: [
      { href: "/support", label: "Destek" },
      { href: "/delete-account", label: "Hesabı sil" },
      { href: `mailto:${site.supportEmail}`, label: site.supportEmail },
    ],
  },
  {
    title: "Yasal",
    links: [
      { href: "/privacy", label: "Gizlilik Politikası" },
      { href: "/terms", label: "Kullanım Koşulları" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <Logo size={28} />
          <p className="muted">Yapay zekâ destekli alışveriş asistanın. Ne aradığını söyle, gerisini SynapCart halletsin.</p>
        </div>
        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title} className={styles.group}>
            <h2 className={styles.title}>{g.title}</h2>
            <ul>
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={`container ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} SynapCart</span>
        <span>Google Play ve Google Play logosu Google LLC&apos;nin ticari markalarıdır.</span>
      </div>
    </footer>
  );
}
