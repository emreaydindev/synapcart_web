import Link from "next/link";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="SynapCart ana sayfa">
          <Logo size={30} />
        </Link>
        <nav aria-label="Ana menü" className={styles.nav}>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/#indir" className={`btn btn-primary ${styles.cta}`}>
          Uygulamayı indir
        </Link>
      </div>
    </header>
  );
}
