"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CenteredCard } from "@/components/CenteredCard";
import { PasswordInput } from "@/components/PasswordInput";
import { postJson } from "@/lib/api";
import { site } from "@/lib/site";
import styles from "./forms.module.css";

// Mirrors the backend's validate_new_password: 8–72 bytes, at least one letter and one digit.
const rules = [
  { label: "En az 8 karakter", test: (p: string) => p.length >= 8 },
  { label: "En az bir harf", test: (p: string) => /\p{L}/u.test(p) },
  { label: "En az bir rakam", test: (p: string) => /\d/.test(p) },
];
const tooLong = (p: string) => new TextEncoder().encode(p).length > 72;

type Status = "idle" | "loading" | "success" | "error";

export function ResetPasswordFlow() {
  const token = useSearchParams().get("token");
  const [linkProblem, setLinkProblem] = useState<string | null>(token ? null : "Bu sıfırlama bağlantısı geçersiz veya eksik.");

  if (linkProblem) return <RequestNewLink reason={linkProblem} />;
  return <ResetForm token={token!} onLinkProblem={setLinkProblem} />;
}

function ResetForm({ token, onLinkProblem }: { token: string; onLinkProblem: (msg: string) => void }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const passed = rules.map((r) => r.test(password));
  const score = passed.filter(Boolean).length;
  const mismatch = confirm.length > 0 && confirm !== password;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (score < rules.length) {
      setError("Şifre en az 8 karakter olmalı ve harf ile rakam içermeli.");
      return;
    }
    if (tooLong(password)) {
      setError("Şifre en fazla 72 bayt olabilir.");
      return;
    }
    if (password !== confirm) {
      setError("Şifreler eşleşmiyor.");
      return;
    }
    setStatus("loading");
    try {
      await postJson("/api/v1/auth/reset-password", { token, new_password: password });
      setStatus("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Bir hata oluştu.";
      // Invalid or expired links can't be retried; offer a new one instead.
      if (/link/i.test(msg) && /(geçersiz|süresi)/i.test(msg)) {
        onLinkProblem(msg);
        return;
      }
      setError(msg);
      setStatus("error");
    }
  };

  const openApp = () => {
    const fallback = window.setTimeout(() => {
      if (!document.hidden) router.push("/");
    }, 1500);
    document.addEventListener("visibilitychange", () => window.clearTimeout(fallback), { once: true });
    window.location.href = site.appScheme;
  };

  if (status === "success") {
    return (
      <CenteredCard title="Şifren güncellendi" subtitle="Yeni şifrenle uygulamaya giriş yapabilirsin. Güvenliğin için diğer tüm oturumların kapatıldı.">
        <div className={styles.stack}>
          <div className={styles.successIcon} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <button type="button" className="btn btn-primary btn-block" onClick={openApp}>
            Uygulamayı aç
          </button>
          <Link href="/" className={styles.textLink}>
            Ana sayfaya dön
          </Link>
        </div>
      </CenteredCard>
    );
  }

  const meterColor = ["var(--outline)", "var(--error)", "var(--warning)", "var(--primary)"][score];

  return (
    <CenteredCard title="Yeni şifre belirle" subtitle="Hesabın için güçlü bir şifre oluştur.">
      <form onSubmit={submit} className={styles.form} noValidate>
        <PasswordInput
          id="new-password"
          label="Yeni şifre"
          value={password}
          onChange={setPassword}
          placeholder="En az 8 karakter"
          describedBy="password-rules"
          invalid={status === "error" && score < rules.length}
        />
        <div className={styles.strength}>
          <div className={styles.meter} aria-hidden="true">
            <div className={styles.meterFill} style={{ width: `${(score / rules.length) * 100}%`, background: meterColor }} />
          </div>
          <ul id="password-rules" className={styles.rules} aria-label="Şifre kuralları">
            {rules.map((r, i) => (
              <li key={r.label} className={passed[i] ? styles.ruleOk : undefined}>
                <span aria-hidden="true">{passed[i] ? "✓" : "•"}</span>
                {r.label}
                <span className="sr-only">{passed[i] ? " (karşılandı)" : " (karşılanmadı)"}</span>
              </li>
            ))}
          </ul>
        </div>
        <PasswordInput
          id="confirm-password"
          label="Şifre tekrar"
          value={confirm}
          onChange={setConfirm}
          placeholder="Şifreyi tekrar gir"
          invalid={mismatch}
          describedBy={mismatch ? "mismatch" : undefined}
        />
        {mismatch && (
          <p id="mismatch" className="hint" style={{ color: "var(--error)", marginTop: -8 }}>
            Şifreler eşleşmiyor.
          </p>
        )}
        <div aria-live="polite">
          {error && (
            <p className="alert alert-error" role="alert">
              {error}
            </p>
          )}
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <span className="spinner" aria-hidden="true" /> Güncelleniyor…
            </>
          ) : (
            "Şifremi güncelle"
          )}
        </button>
      </form>
    </CenteredCard>
  );
}

function RequestNewLink({ reason }: { reason: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Geçerli bir e-posta adresi gir.");
      return;
    }
    setStatus("loading");
    try {
      const res = await postJson<{ message?: string }>("/api/v1/auth/forgot-password", { email: email.trim() });
      setMessage(res.message || "Bu e-posta adresiyle bir hesap varsa yeni bir bağlantı gönderdik.");
      setStatus("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bir hata oluştu.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <CenteredCard title="E-postanı kontrol et" subtitle={message}>
        <p className={`muted ${styles.center}`}>Yeni bağlantı 1 saat geçerlidir. E-posta gelmediyse spam klasörüne bak.</p>
      </CenteredCard>
    );
  }

  return (
    <CenteredCard title="Yeni bağlantı iste" subtitle="Şifre sıfırlama bağlantıları tek kullanımlıktır ve 1 saat geçerlidir.">
      <form onSubmit={submit} className={styles.form} noValidate>
        <p className="alert alert-error" role="alert">
          {reason}
        </p>
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
          {error && <p className="alert alert-error">{error}</p>}
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={status === "loading"}>
          {status === "loading" ? (
            <>
              <span className="spinner" aria-hidden="true" /> Gönderiliyor…
            </>
          ) : (
            "Yeni bağlantı gönder"
          )}
        </button>
      </form>
    </CenteredCard>
  );
}
