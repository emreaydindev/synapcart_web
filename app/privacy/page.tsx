import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "SynapCart'ın hangi kişisel verileri, hangi amaçla işlediği, kimlerle paylaştığı ve ne kadar sakladığı.",
  alternates: { canonical: "/privacy" },
};

const mail = <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>;

const sections: LegalSection[] = [
  {
    id: "veri-sorumlusu",
    title: "Veri sorumlusu",
    body: (
      <>
        <p>
          Bu politika, SynapCart mobil uygulaması ve synapcart.emreaydin.dev web sitesi (birlikte “Hizmet”) için geçerlidir. 6698 sayılı
          Kişisel Verilerin Korunması Kanunu (“KVKK”) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (“GDPR”) kapsamında veri
          sorumlusu <strong>{site.controller}</strong>’dir.
        </p>
        <p>Kişisel verilerinle ilgili her türlü soru ve talep için bize {mail} adresinden ulaşabilirsin.</p>
      </>
    ),
  },
  {
    id: "toplanan-veriler",
    title: "Topladığımız veriler",
    body: (
      <>
        <table>
          <thead>
            <tr>
              <th scope="col">Kategori</th>
              <th scope="col">Veriler</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hesap bilgileri</td>
              <td>E-posta adresi, ad soyad, şifre (yalnızca tek yönlü bcrypt hash olarak), dil ve para birimi tercihi, kayıt tarihi.</td>
            </tr>
            <tr>
              <td>Sohbet içeriği</td>
              <td>Asistana yazdığın mesajlar, asistanın cevapları, sohbet başlıkları ve cevaplarla birlikte gösterilen ürün sonuçları.</td>
            </tr>
            <tr>
              <td>Favoriler</td>
              <td>Favorilediğin ürünlerin adı, fiyatı, para birimi, mağazası, bağlantısı, görseli ve eklenme tarihi.</td>
            </tr>
            <tr>
              <td>Abonelik bilgileri</td>
              <td>
                Premium satın alırsan mağazanın verdiği satın alma kimliği (Google Play satın alma belirteci veya App Store işlem
                kimliği), plan türü ve bitiş tarihi. Kart bilgilerin bize hiçbir zaman ulaşmaz; ödemeyi Apple veya Google alır.
              </td>
            </tr>
            <tr>
              <td>Bildirim bilgileri</td>
              <td>Fiyat alarmlarını açarsan cihazına bildirim gönderebilmek için Firebase Cloud Messaging cihaz belirteci.</td>
            </tr>
            <tr>
              <td>Teknik veriler</td>
              <td>
                IP adresi, istek zamanı ve hata kayıtları gibi sunucu günlükleri. Mesaj içerikleri ve şifreler günlüklere yazılmaz.
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Reklam göstermiyoruz, reklam kimliğini okumuyoruz ve üçüncü taraf izleme ya da analiz araçları kullanmıyoruz. Konum,
          rehber, kamera veya mikrofon erişimi istemiyoruz.
        </p>
      </>
    ),
  },
  {
    id: "amaclar",
    title: "Verileri hangi amaçlarla ve hangi hukuki sebeple işliyoruz?",
    body: (
      <ul>
        <li>
          <strong>Hesabını oluşturmak ve oturum açmanı sağlamak</strong>: sözleşmenin kurulması ve ifası (KVKK m. 5/2-c, GDPR m.
          6/1-b).
        </li>
        <li>
          <strong>Sorularını yanıtlamak ve ürün aramak</strong>: mesajın ve son birkaç mesajlık sohbet geçmişin, cevabı
          oluşturmak için yapay zekâ modeline; mesajından türetilen arama ifadesi ise ürün arama hizmetine gönderilir.
          Sözleşmenin ifası.
        </li>
        <li>
          <strong>Favorileri, sohbet geçmişini ve tercihlerini saklamak</strong>: sözleşmenin ifası.
        </li>
        <li>
          <strong>Premium aboneliğini doğrulamak ve fiyat alarmı göndermek</strong>: sözleşmenin ifası.
        </li>
        <li>
          <strong>Şifre sıfırlama ve hesap silme e-postaları göndermek</strong>: sözleşmenin ifası.
        </li>
        <li>
          <strong>Kötüye kullanımı önlemek ve güvenliği sağlamak</strong> (istek sınırlama, hata ayıklama): meşru menfaat (KVKK
          m. 5/2-f, GDPR m. 6/1-f).
        </li>
        <li>
          <strong>Yasal yükümlülükleri yerine getirmek</strong>: hukuki yükümlülük (KVKK m. 5/2-ç, GDPR m. 6/1-c).
        </li>
      </ul>
    ),
  },
  {
    id: "paylasim",
    title: "Verileri kimlerle paylaşıyoruz?",
    body: (
      <>
        <p>Verilerini satmıyoruz. Hizmeti sunabilmek için yalnızca aşağıdaki hizmet sağlayıcılarla, gerektiği kadar paylaşıyoruz:</p>
        <table>
          <thead>
            <tr>
              <th scope="col">Sağlayıcı</th>
              <th scope="col">Amaç</th>
              <th scope="col">Paylaşılan veri</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google (Gemini API)</td>
              <td>Sorunun alışverişle ilgili olup olmadığını anlamak, arama ifadesi çıkarmak ve ürün analizini yazmak</td>
              <td>Mesajın, son sohbet geçmişin, adın, dil tercihin ve bulunan ürünler</td>
            </tr>
            <tr>
              <td>SerpApi (Google Alışveriş araması)</td>
              <td>Ürün ve fiyat aramak</td>
              <td>Arama ifadesi, dil ve ülke/para birimi bilgisi</td>
            </tr>
            <tr>
              <td>Cloudflare</td>
              <td>
                Sunucu, veritabanı (D1) ve web sitesi barındırma; şifre sıfırlama ve hesap silme e-postalarını göndermek
              </td>
              <td>
                Hizmette saklanan tüm veriler; web sitesini ziyaret ettiğinde IP adresi ve istek bilgileri; e-posta adresin ve
                e-posta içeriği
              </td>
            </tr>
            <tr>
              <td>Google Play</td>
              <td>Android’de abonelik satın alma ve doğrulama</td>
              <td>Satın alma belirteci ve abonelik durumu</td>
            </tr>
            <tr>
              <td>Apple (App Store)</td>
              <td>iPhone’da abonelik satın alma ve doğrulama</td>
              <td>İşlem kimliği, abonelik durumu ve hesabına bağlı anonim kimlik (appAccountToken)</td>
            </tr>
            <tr>
              <td>Google (Firebase Cloud Messaging)</td>
              <td>Fiyat alarmı bildirimleri (iPhone’da Apple Push Notification service üzerinden)</td>
              <td>Cihaz belirteci ve bildirim içeriği</td>
            </tr>
          </tbody>
        </table>
        <p>
          Bunların dışında verilerini yalnızca yasal olarak zorunlu olduğumuzda yetkili kamu kurumlarıyla paylaşırız. Ürün
          bağlantısına tıklayıp bir mağazaya gittiğinde, o mağazanın kendi gizlilik politikası geçerli olur.
        </p>
      </>
    ),
  },
  {
    id: "yurt-disi",
    title: "Yurt dışına aktarım",
    body: (
      <p>
        Yukarıdaki sağlayıcıların sunucuları Türkiye dışında (ağırlıklı olarak ABD ve AB’de) bulunur. Bu nedenle verilerin, KVKK
        m. 9 ve GDPR’ın V. Bölümü kapsamında, sağlayıcıların standart sözleşme hükümleri ve sunduğu güvenceler çerçevesinde yurt
        dışına aktarılır. Hizmeti kullanarak bu aktarımın Hizmetin sunulması için zorunlu olduğunu kabul etmiş olursun.
      </p>
    ),
  },
  {
    id: "saklama",
    title: "Ne kadar saklıyoruz?",
    body: (
      <ul>
        <li>Hesap bilgileri, favoriler ve tercihler: hesabını silene kadar.</li>
        <li>Sohbetler: sohbeti ya da hesabını silene kadar. Uygulamadaki çekmeceden tek tek sohbet silebilirsin.</li>
        <li>Şifre sıfırlama bağlantıları 1 saat, hesap silme bağlantıları 24 saat geçerlidir ve tek kullanımlıktır.</li>
        <li>Abonelik kayıtları: abonelik süresince ve yasal saklama yükümlülükleri boyunca.</li>
        <li>Sunucu günlükleri: barındırma sağlayıcısının kısa süreli saklama süresi boyunca.</li>
      </ul>
    ),
  },
  {
    id: "silme",
    title: "Hesabını ve verilerini silmek",
    body: (
      <>
        <p>
          Uygulamada <strong>Profil › Hesabı sil</strong> adımını izleyebilir ya da <Link href="/delete-account">hesap silme
          sayfasından</Link> e-posta onayıyla silme talebi oluşturabilirsin. Onayladığın anda hesabın, sohbetlerin, mesajların ve
          favorilerin veritabanımızdan kalıcı olarak silinir ve tüm oturumların kapanır.
        </p>
        <p>
          Hesabını silmek App Store veya Google Play aboneliğini otomatik olarak iptal etmez; aboneliği satın aldığın mağazadan
          ayrıca iptal etmelisin.
        </p>
      </>
    ),
  },
  {
    id: "guvenlik",
    title: "Güvenlik",
    body: (
      <p>
        Uygulama ile sunucu arasındaki tüm trafik HTTPS ile şifrelenir. Şifreler bcrypt ile hash’lenir; sıfırlama ve silme
        bağlantıları veritabanında yalnızca hash olarak tutulur. Oturum belirtecin cihazında saklanır ve yedeklere dahil edilmez.
        Şifreni değiştirdiğinde ya da sıfırladığında diğer tüm oturumların kapanır. Hiçbir sistem tamamen güvenli değildir; bir
        güvenlik ihlali olursa yasaların öngördüğü şekilde seni ve ilgili kurumları bilgilendiririz.
      </p>
    ),
  },
  {
    id: "haklar",
    title: "Hakların",
    body: (
      <>
        <p>KVKK m. 11 ve GDPR kapsamında şu haklara sahipsin:</p>
        <ul>
          <li>Kişisel verilerinin işlenip işlenmediğini öğrenme ve bunlara erişme,</li>
          <li>Yanlış ya da eksik verilerin düzeltilmesini isteme (ad ve tercihlerini uygulamadan kendin de değiştirebilirsin),</li>
          <li>Verilerinin silinmesini veya yok edilmesini isteme,</li>
          <li>Verilerinin aktarıldığı üçüncü kişileri öğrenme,</li>
          <li>İşlemeye itiraz etme ve işlemenin kısıtlanmasını isteme,</li>
          <li>Verilerinin taşınabilir bir biçimde sana verilmesini isteme,</li>
          <li>Kanuna aykırı işleme nedeniyle zarara uğradıysan zararın giderilmesini talep etme.</li>
        </ul>
        <p>
          Taleplerini {mail} adresine iletebilirsin; en geç 30 gün içinde yanıtlarız. Ayrıca Kişisel Verileri Koruma Kurumu’na
          veya bulunduğun ülkedeki veri koruma otoritesine şikâyette bulunma hakkın saklıdır.
        </p>
      </>
    ),
  },
  {
    id: "cocuklar",
    title: "Çocuklar",
    body: (
      <p>
        Hizmet 13 yaşın altındaki çocuklara yönelik değildir ve bilerek bu yaştaki çocuklardan veri toplamayız. Böyle bir durumu
        fark edersen bize yaz; ilgili hesabı sileriz.
      </p>
    ),
  },
  {
    id: "degisiklikler",
    title: "Bu politikadaki değişiklikler",
    body: (
      <p>
        Politikayı zaman zaman güncelleyebiliriz. Önemli değişiklikleri uygulama içinde veya e-posta ile duyururuz. Güncel sürüm
        her zaman bu sayfadadır ve üstteki tarih son değişikliği gösterir.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      updated={site.legalUpdated}
      intro={
        <p>
          SynapCart’ı kullanırken hangi verilerini işlediğimizi, neden işlediğimizi ve bu veriler üzerindeki haklarını sade bir
          dille anlattık. Kısaca: yalnızca Hizmeti sunmak için gereken verileri topluyoruz, reklam veya izleme yapmıyoruz ve
          hesabını istediğin an silebilirsin.
        </p>
      }
      sections={sections}
    />
  );
}
