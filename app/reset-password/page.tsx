import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordFlow } from "@/components/forms/ResetPasswordFlow";

// Linked from the backend's reset email: {APP_FRONTEND_URL}/reset-password?token=…  Keep this path.
export const metadata: Metadata = {
  title: "Yeni şifre belirle",
  description: "SynapCart hesabın için yeni bir şifre belirle.",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordFlow />
    </Suspense>
  );
}
