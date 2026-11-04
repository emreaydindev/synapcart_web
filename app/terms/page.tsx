import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { plans, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kullanım Koşulları",
  description: "SynapCart uygulamasının ve Premium aboneliğinin kullanım koşulları.",
  alternates: { canonical: "/terms" },
};

const mail = <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>;

const sections: LegalSection[] = [
  {
    id: "kabul",
    title: "Koşulların kabulü",
    body: (
      <p>
        SynapCart mobil uygulamasını veya web sitesini (“Hizmet”) kullanarak bu Kullanım Koşulları’nı ve{" "}
        <Link href="/privacy">Gizlilik Politikası</Link>’nı kabul etmiş olursun. Koşulları kabul etmiyorsan Hizmeti kullanma.
        Hizmet {site.controller} tarafından sunulur.
      </p>
    ),
  },
  {
    id: "hizmet",
    title: "Hizmetin tanımı",
    body: (
      <>
        <p>
          SynapCart, ne aradığını doğal dilde anlatmana göre ürün arayan, mağazalardaki fiyatları listeleyen ve yapay zekâ ile
          kısa bir analiz sunan bir alışveriş asistanıdır.
        </p>
        <p>
          <strong>SynapCart bir satıcı veya pazar yeri değildir.</strong> Ürünleri satmaz, ödeme almaz, kargo, garanti veya iade
          süreçlerinde taraf değildir. Bir ürün bağlantısına tıkladığında ilgili mağazanın sitesine gidersin ve satın alma o
          mağazanın koşullarına tabidir.
        </p>
      </>
    ),
  },
  {
    id: "yapay-zeka",
    title: "Yapay zekâ cevapları ve fiyatlar",
    body: (
      <ul>
        <li>Asistanın cevapları yapay zekâ ile otomatik üretilir; hatalı, eksik veya güncel olmayan bilgi içerebilir.</li>
        <li>
          Fiyatlar ve stok durumu arama anında üçüncü taraf kaynaklardan alınır, kısa süre önbelleğe alınabilir ve mağazadaki son
          fiyattan farklı olabilir. Satın almadan önce satıcının sayfasını kontrol et.
        </li>
        <li>Cevaplar profesyonel, hukuki veya finansal tavsiye değildir. Satın alma kararı tamamen sana aittir.</li>
      </ul>
    ),
  },
  {
    id: "hesap",
    title: "Hesabın",
    body: (
      <ul>
        <li>Hizmeti kullanmak için en az 13 yaşında olmalısın. 18 yaşından küçüksen veli veya vasinin onayıyla kullanmalısın.</li>
        <li>Kayıt sırasında doğru bilgi vermeli ve şifreni gizli tutmalısın. Hesabındaki etkinliklerden sen sorumlusun.</li>
        <li>
          Hesabını istediğin zaman uygulamadan ya da <Link href="/delete-account">hesap silme sayfasından</Link> silebilirsin.
        </li>
      </ul>
    ),
  },
  {
    id: "kullanim",
    title: "Kabul edilebilir kullanım",
    body: (
      <>
        <p>Hizmeti kullanırken şunları yapmamayı kabul edersin:</p>
        <ul>
          <li>Yasa dışı ürün veya hizmet aramak ya da Hizmeti yasa dışı amaçlarla kullanmak,</li>
          <li>Hizmeti otomatik araçlarla toplu sorgulamak, kazımak veya kullanım sınırlarını aşmaya çalışmak,</li>
          <li>Sistemlerimize yetkisiz erişmeye, güvenliği aşmaya veya Hizmeti aksatmaya çalışmak,</li>
          <li>Asistanı zararlı, nefret içeren veya başkalarının haklarını ihlal eden içerik üretmeye yönlendirmek.</li>
        </ul>
        <p>Bu kurallara aykırı kullanımda hesabını askıya alabilir veya kapatabiliriz.</p>
      </>
    ),
  },
  {
    id: "planlar",
    title: "Ücretsiz plan ve Premium",
    body: (
      <>
        <p>
          Ücretsiz plan günde {plans.free.messages} mesaj ve arama başına {plans.free.products} ürün içerir. Premium daha yüksek
          limitler ({plans.premium.messages} mesaj/gün, arama başına {plans.premium.products} ürün), derin analiz, fiyat alarmları,
          ürün karşılaştırma ve sınırsız sohbet geçmişi sunar. Limitler ve özellikler Hizmetin sürdürülebilirliği için
          değiştirilebilir; Premium aboneler aleyhine önemli değişiklikleri önceden duyururuz.
        </p>
      </>
    ),
  },
  {
    id: "abonelik",
    title: "Abonelik, yenileme ve iptal",
    body: (
      <ul>
        <li>Premium, Google Play üzerinden aylık veya yıllık otomatik yenilenen abonelik olarak satılır. Güncel fiyat satın alma ekranında gösterilir.</li>
        <li>Ödeme, satın alma onaylandığında Google Play hesabından tahsil edilir.</li>
        <li>
          Abonelik, dönem bitmeden en az 24 saat önce iptal edilmezse aynı süre ve fiyatla otomatik olarak yenilenir. Fiyat
          değişikliklerinde Google Play seni önceden bilgilendirir.
        </li>
        <li>
          İstediğin zaman <strong>Google Play › Profil › Ödemeler ve abonelikler › Abonelikler</strong> bölümünden iptal
          edebilirsin. İptal ettiğinde Premium, ödediğin dönemin sonuna kadar devam eder.
        </li>
        <li>Ücretsiz deneme sunulursa, deneme bitmeden iptal etmediğin sürece ücretli aboneliğe dönüşür.</li>
        <li>Hesabını silmek aboneliği iptal etmez; aboneliği Google Play’den ayrıca iptal etmelisin.</li>
      </ul>
    ),
  },
  {
    id: "iade",
    title: "İade",
    body: (
      <p>
        Ödemeler Google Play tarafından işlendiği için iade talepleri{" "}
        <a href="https://support.google.com/googleplay/answer/2479637" target="_blank" rel="noopener noreferrer">
          Google Play iade politikasına
        </a>{" "}
        tabidir ve Google Play üzerinden yapılır. Teknik bir sorun nedeniyle Premium’dan yararlanamadıysan {mail} adresine yaz; Google
        Play’in izin verdiği ölçüde yardımcı oluruz. 6502 sayılı Tüketicinin Korunması Hakkında Kanun’dan doğan hakların saklıdır.
      </p>
    ),
  },
  {
    id: "fikri-mulkiyet",
    title: "Fikri mülkiyet",
    body: (
      <p>
        SynapCart adı, logosu, uygulaması ve web sitesi bize aittir. Ürün adları, görselleri ve markaları ilgili sahiplerinindir ve
        yalnızca bilgilendirme amacıyla gösterilir. Yazdığın mesajların hakları sende kalır; Hizmeti sunabilmemiz için bunları
        işlememize izin verirsin.
      </p>
    ),
  },
  {
    id: "sorumluluk",
    title: "Sorumluluğun sınırlandırılması",
    body: (
      <p>
        Hizmet “olduğu gibi” sunulur. Kesintisiz veya hatasız çalışacağını garanti etmeyiz. Üçüncü taraf mağazaların ürünleri,
        fiyatları, teslimatı veya iadeleri ile yapay zekâ cevaplarına dayanarak verdiğin kararlardan doğan zararlardan, yürürlükteki
        mevzuatın izin verdiği ölçüde sorumlu değiliz. Bu sınırlama, kasıt veya ağır ihmal hâllerinde ve tüketici mevzuatının
        emredici hükümlerinde geçerli değildir.
      </p>
    ),
  },
  {
    id: "fesih",
    title: "Hizmetin sona ermesi",
    body: (
      <p>
        Hesabını istediğin zaman silebilirsin. Bu koşulları ihlal edersen hesabını kapatabiliriz. Hizmeti tamamen sonlandırırsak
        bunu makul bir süre önce duyururuz.
      </p>
    ),
  },
  {
    id: "degisiklik",
    title: "Koşullardaki değişiklikler",
    body: (
      <p>
        Bu koşulları güncelleyebiliriz. Önemli değişiklikleri uygulama içinde veya e-posta ile duyururuz. Değişiklikten sonra
        Hizmeti kullanmaya devam etmen güncel koşulları kabul ettiğin anlamına gelir.
      </p>
    ),
  },
  {
    id: "hukuk",
    title: "Uygulanacak hukuk ve iletişim",
    body: (
      <p>
        Bu koşullar Türkiye Cumhuriyeti hukukuna tabidir. Tüketici işlemlerinde Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri
        yetkilidir. Soruların için {mail} adresine yazabilirsin.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Kullanım Koşulları"
      updated={site.legalUpdated}
      intro={<p>SynapCart’ı kullanmadan önce lütfen bu koşulları oku. Premium aboneliği ve iadeler hakkındaki bölümler özellikle önemlidir.</p>}
      sections={sections}
    />
  );
}
