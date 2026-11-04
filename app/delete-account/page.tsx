import type { Metadata } from "next";
import { Suspense } from "react";
import { DeleteAccountFlow } from "@/components/forms/DeleteAccountFlow";

export const metadata: Metadata = {
  title: "Hesabı sil",
  description: "SynapCart hesabını ve tüm verilerini kalıcı olarak silme talebi oluştur.",
  alternates: { canonical: "/delete-account" },
};

export default function DeleteAccountPage() {
  return (
    <Suspense>
      <DeleteAccountFlow />
    </Suspense>
  );
}
