import { AppStoreBadge } from "./AppStoreBadge";
import { PlayBadge } from "./PlayBadge";
import styles from "./StoreBadges.module.css";

/** Both store buttons, App Store first (iOS launches first). */
export function StoreBadges() {
  return (
    <div className={styles.row}>
      <AppStoreBadge />
      <PlayBadge />
    </div>
  );
}
