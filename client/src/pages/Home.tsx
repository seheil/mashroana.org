import { useState } from "react";
import { foundationData } from "@/../../shared/foundation-data";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {foundationData.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            {foundationData.tagline}
          </p>
          <p className="text-lg mb-8 opacity-85 max-w-2xl mx-auto">
            نعمل على نشر الخير والعطف في المجتمع من خلال مشاريع خيرية متنوعة
          </p>
          <Button
            onClick={() => document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 text-lg font-bold"
          >
            تبرع الآن
          </Button>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            مشاريعنا الخيرية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foundationData.programs.map((program: any) => (
              <div
                key={program.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
              >
                <div className="text-4xl mb-3">{program.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {program.name}
                </h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Button
                  onClick={() => setSelectedProgram(program.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  تبرع الآن
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            طرق التبرع
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bank Misr */}
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-600">
              <h3 className="text-xl font-bold mb-3">🏦 حساب البنك</h3>
              <p className="text-gray-600 mb-2">بنك مصر</p>
              <div className="bg-white p-3 rounded border border-gray-200 mb-3 font-mono text-sm break-all">
                {foundationData.payment.bankMisr.accountNumber}
              </div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(foundationData.payment.bankMisr.accountNumber);
                  alert("تم نسخ رقم الحساب");
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                📋 نسخ رقم الحساب
              </Button>
            </div>

            {/* InstaPay */}
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold mb-3">💳 InstaPay</h3>
              <p className="text-gray-600 mb-3">تحويل فوري وآمن</p>
              <a
                href={foundationData.payment.instapay.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
              >
                🔗 تحويل عبر InstaPay
              </a>
            </div>

            {/* Vodafone Cash */}
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-red-600">
              <h3 className="text-xl font-bold mb-3">📱 Vodafone Cash</h3>
              <p className="text-gray-600 mb-2">رقم المحفظة</p>
              <div className="bg-white p-3 rounded border border-gray-200 mb-3 font-mono text-sm">
                {foundationData.payment.vodafoneCash.number}
              </div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(foundationData.payment.vodafoneCash.number);
                  alert("تم نسخ الرقم");
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                📋 نسخ الرقم
              </Button>
            </div>

            {/* WhatsApp */}
            <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-bold mb-3">💬 WhatsApp</h3>
              <p className="text-gray-600 mb-3">تواصل معنا مباشرة</p>
              <a
                href={foundationData.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-center"
              >
                💬 تواصل عبر WhatsApp
              </a>
            </div>
          </div>

          {/* Trust Message */}
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-gray-700 text-center">
              <span className="font-bold">✅ رسالة الأمان:</span> {foundationData.payment.trustMessage}
            </p>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            أعضاء مجلس الأمناء
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {foundationData.boardMembers.map((member: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 font-semibold">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            تواصل معنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">📍 العنوان</h3>
              <p className="text-gray-600">{foundationData.contact.address}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">📞 الهاتف</h3>
              <p className="text-gray-600">{foundationData.contact.phone}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">💬 Telegram</h3>
              <a
                href={foundationData.contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                انضم إلى قناتنا
              </a>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3">👥 Facebook</h3>
              <a
                href={foundationData.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                زيارة صفحتنا
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Modal */}

    </div>
  );
}
