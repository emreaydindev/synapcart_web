"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const strength = (() => {
    if (!newPassword) return 0;
    let s = 0;
    if (newPassword.length >= 8) s++;
    if (/[A-Z]/.test(newPassword)) s++;
    if (/[0-9]/.test(newPassword)) s++;
    if (/[^A-Za-z0-9]/.test(newPassword)) s++;
    return s;
  })();

  const strengthLabel = ["", "Zayıf", "Orta", "İyi", "Güçlü"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#6bdcff", "#55f0c4"][strength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!token) {
      setErrorMsg("Geçersiz veya eksik sıfırlama linki.");
      setStatus("error");
      return;
    }
    if (newPassword.length < 8) {
      setErrorMsg("Şifre en az 8 karakter olmalıdır.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("Şifreler eşleşmiyor.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: newPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Bir hata oluştu.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Bir hata oluştu.");
      setStatus("error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0f17",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow orbs */}
      <div
        style={{
          position: "fixed",
          top: "-160px",
          left: "-160px",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(107,220,255,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-120px",
          right: "-120px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(85,240,196,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Card */}
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "#151923",
          border: "1px solid #1e2738",
          borderRadius: "24px",
          padding: "40px 36px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(107,220,255,0.04)",
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #33d6ff, #55f0c4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z"
                  stroke="#0b1020"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="8" cy="8" r="2" fill="#0b1020" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#6bdcff",
              }}
            >
              SynapCart
            </span>
          </div>
        </div>

        {status === "success" ? (
          /* Success state */
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "rgba(85,240,196,0.12)",
                border: "1px solid rgba(85,240,196,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#55f0c4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2
              style={{
                margin: "0 0 12px",
                fontSize: "22px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              Şifre Güncellendi
            </h2>
            <p style={{ margin: "0 0 28px", fontSize: "14px", color: "#8e9bb3", lineHeight: "1.6" }}>
              Şifreniz başarıyla sıfırlandı. Artık yeni şifrenizle giriş yapabilirsiniz.
            </p>
            <button
              onClick={() => router.push("/")}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #33d6ff, #55f0c4)",
                border: "none",
                color: "#0b1020",
                fontSize: "15px",
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "0.3px",
              }}
            >
              Giriş Sayfasına Git
            </button>
          </div>
        ) : (
          /* Form state */
          <>
            <h1
              style={{
                margin: "0 0 8px",
                fontSize: "24px",
                fontWeight: 700,
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              Yeni Şifre Belirle
            </h1>
            <p
              style={{
                margin: "0 0 28px",
                fontSize: "14px",
                color: "#8e9bb3",
                textAlign: "center",
                lineHeight: "1.6",
              }}
            >
              Hesabınız için güçlü bir şifre oluşturun.
            </p>

            {!token && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "10px",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  marginBottom: "20px",
                  fontSize: "13px",
                  color: "#fca5a5",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span>⚠</span> Geçersiz veya eksik sıfırlama linki.
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* New password */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#b7c3d9",
                    marginBottom: "8px",
                    letterSpacing: "0.3px",
                  }}
                >
                  Yeni Şifre
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="En az 8 karakter"
                    required
                    style={{
                      width: "100%",
                      padding: "13px 44px 13px 16px",
                      background: "#0f141e",
                      border: "1px solid #1e2738",
                      borderRadius: "12px",
                      color: "#e8eef8",
                      fontSize: "15px",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#6bdcff44")}
                    onBlur={(e) => (e.target.style.borderColor = "#1e2738")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew((v) => !v)}
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      color: "#4a5568",
                      display: "flex",
                    }}
                  >
                    {showNew ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Strength bar */}
                {newPassword && (
                  <div style={{ marginTop: "8px" }}>
                    <div
                      style={{
                        height: "3px",
                        background: "#1e2738",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(strength / 4) * 100}%`,
                          background: strengthColor,
                          borderRadius: "4px",
                          transition: "width 0.3s ease, background 0.3s ease",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "11px", color: strengthColor, marginTop: "4px", display: "block" }}>
                      {strengthLabel}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#b7c3d9",
                    marginBottom: "8px",
                    letterSpacing: "0.3px",
                  }}
                >
                  Şifre Tekrar
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Şifreyi tekrar girin"
                    required
                    style={{
                      width: "100%",
                      padding: "13px 44px 13px 16px",
                      background: "#0f141e",
                      border: `1px solid ${
                        confirmPassword && confirmPassword !== newPassword
                          ? "rgba(239,68,68,0.4)"
                          : confirmPassword && confirmPassword === newPassword
                          ? "rgba(85,240,196,0.3)"
                          : "#1e2738"
                      }`,
                      borderRadius: "12px",
                      color: "#e8eef8",
                      fontSize: "15px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    style={{
                      position: "absolute",
                      right: "14px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      color: "#4a5568",
                      display: "flex",
                    }}
                  >
                    {showConfirm ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {(errorMsg || status === "error") && (
                <div
                  style={{
                    padding: "11px 14px",
                    borderRadius: "10px",
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    fontSize: "13px",
                    color: "#fca5a5",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>⚠</span> {errorMsg}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading" || !token}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  background:
                    status === "loading" || !token
                      ? "#1e2738"
                      : "linear-gradient(135deg, #33d6ff, #55f0c4)",
                  border: "none",
                  color: status === "loading" || !token ? "#4a5568" : "#0b1020",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: status === "loading" || !token ? "not-allowed" : "pointer",
                  marginTop: "4px",
                  letterSpacing: "0.3px",
                  transition: "opacity 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {status === "loading" ? (
                  <>
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        border: "2px solid #4a5568",
                        borderTopColor: "#6bdcff",
                        borderRadius: "50%",
                        display: "inline-block",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    İşleniyor...
                  </>
                ) : (
                  "Şifremi Güncelle"
                )}
              </button>
            </form>
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #3a4556; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}