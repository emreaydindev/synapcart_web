import { site } from "@/lib/site";
import styles from "./PlayBadge.module.css";

/** Store button. Swap for Google's official badge artwork once the listing is live. */
export function PlayBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={site.playUrl}
      className={`${styles.badge} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="SynapCart'ı Google Play'den indir"
    >
      <svg width="26" height="28" viewBox="0 0 24 26" aria-hidden="true">
        <path d="M1.2.6 13.4 12.8 1.2 25a1.7 1.7 0 0 1-.7-1.4V2c0-.6.3-1.1.7-1.4Z" fill="#33D6FF" />
        <path d="m17.5 8.7-4.1 4.1 4.1 4.1 4.6-2.6c1.3-.8 1.3-2.2 0-3l-4.6-2.6Z" fill="#F5C451" />
        <path d="M13.4 12.8 1.2 25c.5.4 1.2.4 1.9 0l14.4-8.1-4.1-4.1Z" fill="#F87171" />
        <path d="M13.4 12.8 17.5 8.7 3.1.6C2.4.2 1.7.2 1.2.6l12.2 12.2Z" fill="#2DD4B4" />
      </svg>
      <span className={styles.text}>
        <span className={styles.small}>Hemen indir</span>
        <span className={styles.big}>Google Play</span>
      </span>
    </a>
  );
}
