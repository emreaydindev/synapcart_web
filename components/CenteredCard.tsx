import Link from "next/link";
import { LogoMark } from "./Logo";
import styles from "./CenteredCard.module.css";

/** Single-task layout used by the reset-password and delete-account flows. */
export function CenteredCard({
  title,
  subtitle,
  children,
  wide = false,
}: {
  title: string;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`card ${styles.card} ${wide ? styles.wide : ""}`}>
        <Link href="/" className={styles.mark} aria-label="SynapCart ana sayfa">
          <LogoMark size={56} />
        </Link>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
