import Link from "next/link";
import { CenteredCard } from "@/components/CenteredCard";

export default function NotFound() {
  return (
    <CenteredCard title="Sayfa bulunamadı" subtitle="Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link href="/" className="btn btn-primary btn-block">
          Ana sayfaya dön
        </Link>
        <Link href="/support" className="btn btn-secondary btn-block">
          Destek
        </Link>
      </div>
    </CenteredCard>
  );
}
