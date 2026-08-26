import { Link } from "wouter";
import { useEffect, useState } from "react";
import { foundationData } from "@/../../shared/foundation-data";
import { subscribeToSettings } from "@/lib/firestore-ops";
import { mergeNavigationContent } from "@shared/content-studio-defaults";

export default function Footer() {
  const [navigation, setNavigation] = useState(() => mergeNavigationContent());

  useEffect(() => subscribeToSettings((settings) => setNavigation(mergeNavigationContent(settings.navigation))), []);

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4">عن المؤسسة</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {navigation.footerDescription}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-sm">
              {navigation.items.filter((item) => item.enabled).map((item) => <li key={item.id}><Link href={item.href} className="text-gray-400 hover:text-white">{item.label}</Link></li>)}
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="text-gray-400 hover:text-white">
                  بيان الإتاحة
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 {foundationData.contact.address}</li>
              <li>📞 {foundationData.contact.phone}</li>
              <li>
                <a
                  href={foundationData.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  💬 WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={foundationData.contact.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  📱 Telegram
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">تابعنا</h3>
            <div className="flex gap-4">
              <a
                href={foundationData.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center"
                aria-label="صفحة المؤسسة على فيسبوك"
              >
                <span aria-hidden="true">f</span>
              </a>
              <a
                href={foundationData.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 w-10 h-10 rounded-full flex items-center justify-center"
                aria-label="التواصل مع المؤسسة عبر واتساب"
              >
                <span aria-hidden="true">W</span>
              </a>
              <a
                href={foundationData.contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center"
                aria-label="قناة المؤسسة على تيليجرام"
              >
                <span aria-hidden="true">T</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          {/* Trust Message */}
          <div className="bg-green-900 bg-opacity-30 rounded-lg p-4 mb-6 border border-green-700">
            <p className="text-center text-sm text-green-100">
              ✅ {foundationData.payment.trustMessage}
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm">
            <p>
              © 2026 مؤسسة مشروعنا إلى الجنة للأعمال الخيرية. جميع الحقوق
              محفوظة.
            </p>
            <p className="mt-2">
              تم تطويره بـ ❤️ لخدمة المجتمع
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
