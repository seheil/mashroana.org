import { foundationData } from "@/../../shared/foundation-data";

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
      {/* WhatsApp Button */}
      <a
        href={foundationData.contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        title="تواصل معنا عبر WhatsApp"
        aria-label="تواصل مع المؤسسة عبر واتساب"
      >
        <span className="text-2xl" aria-hidden="true">💬</span>
      </a>

      {/* Telegram Button */}
      <a
        href={foundationData.contact.telegram}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        title="تابعنا على Telegram"
        aria-label="تابع المؤسسة عبر تيليجرام"
      >
        <span className="text-2xl" aria-hidden="true">📱</span>
      </a>

      {/* InstaPay Button */}
      <a
        href={foundationData.payment.instapay.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-500 hover:bg-purple-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        title="تبرع عبر InstaPay"
        aria-label="فتح قناة التبرع الرسمية عبر إنستاباي"
      >
        <span className="text-2xl" aria-hidden="true">💳</span>
      </a>

      {/* Donate Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
        title="تبرع الآن"
        aria-label="العودة إلى أعلى الصفحة لاستكشاف خيارات الدعم"
      >
        <span className="text-2xl" aria-hidden="true">❤️</span>
      </button>
    </div>
  );
}
