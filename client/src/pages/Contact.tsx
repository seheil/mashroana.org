import { useState } from "react";
import { foundationData } from "@/../../shared/foundation-data";
import { Button } from "@/components/ui/button";
import { addContactMessage } from "@/lib/firestore-ops";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await addContactMessage(formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Error sending message:", err);
      alert("حدث خطأ في إرسال الرسالة");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">تواصل معنا</h1>
          <p className="text-lg opacity-90">نحن هنا للإجابة على أسئلتك</p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Address */}
            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
              <h3 className="text-xl font-bold mb-3 text-gray-800">📍 العنوان</h3>
              <p className="text-gray-600">{foundationData.contact.address}</p>
            </div>

            {/* Phone */}
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold mb-3 text-gray-800">📞 الهاتف</h3>
              <p className="text-gray-600">{foundationData.contact.phone}</p>
              <a
                href={`tel:${foundationData.contact.phone}`}
                className="text-blue-600 hover:text-blue-800 font-semibold mt-2 inline-block"
              >
                اتصل الآن
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="text-xl font-bold mb-3 text-gray-800">💬 WhatsApp</h3>
              <p className="text-gray-600 mb-3">تواصل معنا مباشرة عبر WhatsApp</p>
              <a
                href={foundationData.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                💬 فتح WhatsApp
              </a>
            </div>

            {/* Telegram */}
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold mb-3 text-gray-800">📱 Telegram</h3>
              <p className="text-gray-600 mb-3">انضم إلى قناتنا على Telegram</p>
              <a
                href={foundationData.contact.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                📱 فتح Telegram
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              أرسل لنا رسالة
            </h2>
            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                ✅ تم استلام رسالتك بنجاح! سنرد عليك قريباً.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    الاسم
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                    placeholder="أدخل اسمك"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                    placeholder="بريدك الإلكتروني"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                  placeholder="رقم هاتفك"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  الرسالة
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
              >
                إرسال الرسالة
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section (placeholder) */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">موقعنا</h2>
          <div className="bg-gray-300 rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-600">خريطة الموقع - {foundationData.contact.address}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
