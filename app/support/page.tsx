import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Destek",
  description: "SynapCart için yardım: şifre sıfırlama, abonelik yönetimi, hesap silme ve iletişim.",
  alternates: { canonical: "/support" },
};

const mail = <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>;

const sections: LegalSection[] = [
  {
    id: "iletisim",
    title: "Bize ulaş",
    body: (
      <>
        <p>
          Her türlü soru, öneri ve hata bildirimi için {mail} adresine yaz. Genellikle 2 iş günü içinde yanıtlıyoruz.
        </p>
        <p>Bir hata bildiriyorsan şunları eklersen daha hızlı yardımcı olabiliriz:</p>
        <ul>
          <li>Telefon modelin ve Android sürümün,</li>
          <li>Uygulama sürümü (Profil ekranının en altında yazar),</li>
          <li>Ne yaptığın, ne beklediğin ve ne olduğu; varsa ekran görüntüsü.</li>
        </ul>
        <p>Lütfen e-postalarında şifreni asla paylaşma.</p>
      </>
    ),
  },
  {
    id: "sifre",
    title: "Şifremi unuttum",
    body: (
      <ol>
        <li>Uygulamada giriş ekranındaki <strong>Şifremi unuttum</strong> bağlantısına dokun.</li>
        <li>Hesabına bağlı e-posta adresini gir.</li>
        <li>Gelen e-postadaki bağlantıyı 1 saat içinde aç ve yeni şifreni belirle.</li>
      </ol>
    ),
  },
  {
    id: "abonelik",
    title: "Premium aboneliği yönetmek",
    body: (
      <>
        <p>
          Abonelikler Google Play üzerinden yönetilir. İptal etmek veya ödeme yöntemini değiştirmek için{" "}
          <a href="https://play.google.com/store/account/subscriptions" target="_blank" rel="noopener noreferrer">
            Google Play abonelikleri
          </a>{" "}
          sayfasını aç ya da uygulamada <strong>Profil › Aboneliği yönet</strong> adımını izle.
        </p>
        <p>
          İade talepleri Google Play üzerinden yapılır. Ayrıntılar için <Link href="/terms#iade">Kullanım Koşulları</Link>’na
          bak.
        </p>
      </>
    ),
  },
  {
    id: "hesap-silme",
    title: "Hesabımı silmek istiyorum",
    body: (
      <p>
        Uygulamada <strong>Profil › Hesabı sil</strong> adımını kullanabilir ya da uygulamaya erişemiyorsan{" "}
        <Link href="/delete-account">hesap silme sayfasından</Link> e-posta onayıyla silme talebi gönderebilirsin.
      </p>
    ),
  },
  {
    id: "sorunlar",
    title: "Sık karşılaşılan sorunlar",
    body: (
      <>
        <h3>Asistan geç cevap veriyor</h3>
        <p>
          İlk istek sunucunun uyanması nedeniyle birkaç saniye sürebilir. Sorun devam ederse internet bağlantını kontrol edip
          tekrar dene.
        </p>
        <h3>“Günlük mesaj hakkın doldu” uyarısı</h3>
        <p>Ücretsiz planda günlük mesaj sınırı vardır ve her gün yenilenir. Daha fazlası için Premium’a geçebilirsin.</p>
        <h3>Fiyat mağazadakinden farklı</h3>
        <p>Fiyatlar arama anında alınır ve kısa süre önbelleğe alınır. Satın almadan önce mağazadaki son fiyatı kontrol et.</p>
        <h3>Uygulama dilini değiştirmek</h3>
        <p>
          <strong>Profil › Dil</strong> bölümünden Türkçe veya İngilizce seçebilirsin; asistanın cevapları da bu dile göre
          değişir.
        </p>
      </>
    ),
  },
];

export default function SupportPage() {
  return (
    <LegalPage
      title="Destek"
      intro={<p>SynapCart ile ilgili yardıma mı ihtiyacın var? Aşağıda en sık sorulan konuları bulabilir ya da bize doğrudan yazabilirsin.</p>}
      sections={sections}
    />
  );
}
