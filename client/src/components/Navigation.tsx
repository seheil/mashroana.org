import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { staticSiteContent } from "@/content/static-content";
import { mergeNavigationContent } from "@shared/content-studio-defaults";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = mergeNavigationContent(staticSiteContent.settings.navigation);

  const navItems = navigation.items.filter((item) => item.enabled);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" aria-label="التنقل الرئيسي">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" aria-label="الانتقال إلى الصفحة الرئيسية">
            <div className="text-2xl font-bold text-green-600" aria-hidden="true">🌱</div>
            <span className="hidden md:inline text-lg font-bold text-gray-800">
              {navigation.brandShortName}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8" aria-label="روابط الموقع">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-green-600 font-semibold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Donate Button */}
          <div className="hidden md:flex gap-4">
            <a
              href="/#donate"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition-colors"
            >
              {navigation.donateLabel}
            </a>
            <Link
              href="/admin"
              className="text-gray-600 hover:text-gray-800 font-semibold"
            >
              الإدارة
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "إغلاق قائمة التنقل" : "فتح قائمة التنقل"}
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-navigation" className="md:hidden pb-4 border-t border-gray-200" aria-label="روابط التنقل على الهاتف">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-green-600 font-semibold"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="/#donate"
              className="block mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center"
              onClick={() => setIsOpen(false)}
            >
              {navigation.donateLabel}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
