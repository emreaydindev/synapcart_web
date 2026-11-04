import styles from "./LegalPage.module.css";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

/** Long-form document layout with a table of contents (privacy, terms, support). */
export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro?: React.ReactNode;
  updated?: string;
  sections: LegalSection[];
}) {
  return (
    <div className={`container ${styles.wrap}`}>
      <header className={styles.head}>
        <h1>{title}</h1>
        {updated && <p className={styles.updated}>Son güncelleme: {updated}</p>}
        {intro && <div className={styles.intro}>{intro}</div>}
      </header>
      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="İçindekiler">
          <p className={styles.tocTitle}>İçindekiler</p>
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>{s.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <article className={styles.prose}>
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}>
                <span className={styles.num}>{i + 1}.</span> {s.title}
              </h2>
              {s.body}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
