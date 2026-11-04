"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CenteredCard } from "@/components/CenteredCard";
import { postJson } from "@/lib/api";
import styles from "./forms.module.css";

type Status = "idle" | "loading" | "done" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DeleteAccountFlow() {
  const token = useSearchParams().get("token");
  return token ? <ConfirmDeletion token={token} /> : <RequestDeletion />;
}

function DeletedData() {
  return (
    <div className={styles.infoBox}>
      <p className={styles.infoTitle}>Neler silinir?</p>
      <ul className={styles.infoList}>
        <li>Hesap bilgilerin (ad, e-posta, şifre, tercihler)</li>
        <li>Tüm sohbetlerin ve mesajların</li>
        <li>Favorilerin ve fiyat alarmların</li>
      </ul>
      <p className={styles.infoNote}>
        Silme anında gerçekleşir ve geri alınamaz. Google Play aboneliğin otomatik iptal edilmez; onu{" "}
        <a href="https://play.google.com/store/account/subscriptions" target="_blank" rel="noopener noreferrer">
          Google Play’den
        </a>{" "}
        ayrıca iptal etmelisin.
      </p>
    </div>
  );
}

function RequestDeletion() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!EMAIL_RE.test(email.trim())) {
      setError("Geçerli bir e-posta adresi gir.");
      return;
    }
    setStatus("loading");
    try {
      const res = await postJson<{ message?: string }>("/api/v1/auth/delete-request", { email: email.trim() });
      setMessage(res.message || "Bu e-posta adresiyle bir hesap varsa onay bağlantısı gönderdik.");
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <CenteredCard title="E-postanı kontrol et" subtitle={message}>
        <div className={styles.stack}>
          <p className={`muted ${styles.center}`}>
            Bağlantı 24 saat geçerlidir. E-posta gelmediyse spam klasörüne bak ya da birkaç dakika sonra tekrar dene.
          </p>
          <button type="button" className="btn btn-secondary btn-block" onClick={() => setStatus("idle")}>
            Başka bir e-posta dene
          </button>
          <Link href="/" className="btn btn-secondary btn-block">
            Ana sayfaya dön
          </Link>
        </div>
      </CenteredCard>
    );
  }

  return (
    <CenteredCard
      wide
      title="Hesabını sil"
      subtitle="SynapCart hesabını ve tüm verilerini kalıcı olarak silebilirsin."
    >
      <div className={styles.stack}>
        <section aria-labelledby="uygulamada" className={styles.option}>
          <h2 id="uygulamada" className={styles.optionTitle}>
            Uygulamadan sil (önerilen)
          </h2>
          <ol className={styles.steps}>
            <li>SynapCart uygulamasını aç ve giriş yap.</li>
            <li>
              Sol menüden <strong>Profil</strong>’e git.
            </li>
            <li>
              En alttaki <strong>Hesabı sil</strong>’e dokun ve şifrenle onayla.
            </li>
          </ol>
        </section>

        <div className={styles.divider}>
          <span>veya</span>
        </div>

        <section aria-labelledby="web-ile" className={styles.option}>
          <h2 id="web-ile" className={styles.optionTitle}>
            Web üzerinden sil
          </h2>
          <p className="muted">
            Uygulamaya erişemiyorsan hesabına bağlı e-posta adresini gir. Silmeyi onaylaman için bir bağlantı göndereceğiz.
          </p>
          <form onSubmit={submit} className={styles.form} noValidate>
            <div className="field">
              <label htmlFor="email">E-posta</label>
              <input
                id="email"
                className="input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="ornek@eposta.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error || undefined}
                aria-describedby={error ? "email-error" : undefined}
                required
              />
            </div>
            <div aria-live="polite" id="email-error">
              {error && (
                <p className="alert alert-error" role="alert">
                  {error}
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Gönderiliyor…
                </>
              ) : (
                "Onay bağlantısı gönder"
              )}
            </button>
          </form>
        </section>

        <DeletedData />
      </div>
    </CenteredCard>
  );
}

function ConfirmDeletion({ token }: { token: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [understood, setUnderstood] = useState(false);

  const confirm = async () => {
    setError("");
    setStatus("loading");
    try {
      await postJson("/api/v1/auth/delete-confirm", { token });
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <CenteredCard title="Hesabın silindi" subtitle="Hesabın ve tüm verilerin kalıcı olarak silindi. SynapCart’ı kullandığın için teşekkürler.">
        <div className={styles.stack}>
          <div className={styles.successIcon} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <Link href="/" className="btn btn-secondary btn-block">
            Ana sayfaya dön
          </Link>
        </div>
      </CenteredCard>
    );
  }

  const expired = status === "error";

  return (
    <CenteredCard title="Hesap silmeyi onayla" subtitle="Bu işlem geri alınamaz. Devam etmeden önce lütfen aşağıdakileri oku.">
      <div className={styles.stack}>
        <DeletedData />
        <label className={styles.check}>
          <input type="checkbox" checked={understood} onChange={(e) => setUnderstood(e.target.checked)} />
          <span>Hesabımın ve tüm verilerimin kalıcı olarak silineceğini anlıyorum.</span>
        </label>
        <div aria-live="polite">
          {error && (
            <p className="alert alert-error" role="alert">
              {error}
            </p>
          )}
        </div>
        <button
          type="button"
          className="btn btn-danger btn-block"
          onClick={confirm}
          disabled={!understood || status === "loading"}
        >
          {status === "loading" ? (
            <>
              <span className="spinner" aria-hidden="true" /> Siliniyor…
            </>
          ) : (
            "Hesabımı kalıcı olarak sil"
          )}
        </button>
        {expired && (
          <Link href="/delete-account" className="btn btn-secondary btn-block">
            Yeni bağlantı iste
          </Link>
        )}
        <Link href="/" className={styles.textLink}>
          Vazgeç
        </Link>
      </div>
    </CenteredCard>
  );
}
