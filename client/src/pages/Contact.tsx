import { type ChangeEvent, type FormEvent, useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setSubmissionError("");
    setIsSubmitting(true);

    try {
      await addContactMessage(formData);
      setSubmitted(true);
      window.setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmissionError("تعذر إرسال الرسالة الآن. تحققي من الاتصال أو تواصلي معنا عبر WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-12 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-4xl font-bold">تواصل معنا</h1>
          <p className="text-lg opacity-90">نحن هنا للإجابة على أسئلتك</p>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg border-l-4 border-green-600 bg-green-50 p-6">
              <h2 className="mb-3 text-xl font-bold text-gray-800">📍 العنوان</h2>
              <p className="text-gray-600">{foundationData.contact.address}</p>
            </div>
            <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-6">
              <h2 className="mb-3 text-xl font-bold text-gray-800">📞 الهاتف</h2>
              <p className="text-gray-600">{foundationData.contact.phone}</p>
              <a href={`tel:${foundationData.contact.phone}`} className="mt-2 inline-block font-semibold text-blue-600 hover:text-blue-800">
                اتصل الآن
              </a>
            </div>
            <div className="rounded-lg border-l-4 border-green-500 bg-green-50 p-6">
              <h2 className="mb-3 text-xl font-bold text-gray-800">💬 WhatsApp</h2>
              <p className="mb-3 text-gray-600">تواصل معنا مباشرة عبر WhatsApp</p>
              <a href={foundationData.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-block rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600">
                💬 فتح WhatsApp
              </a>
            </div>
            <div className="rounded-lg border-l-4 border-blue-600 bg-blue-50 p-6">
              <h2 className="mb-3 text-xl font-bold text-gray-800">📱 Telegram</h2>
              <p className="mb-3 text-gray-600">انضم إلى قناتنا على Telegram</p>
              <a href={foundationData.contact.telegram} target="_blank" rel="noopener noreferrer" className="inline-block rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700">
                📱 فتح Telegram
              </a>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">أرسل لنا رسالة</h2>
            {submitted && (
              <div className="mb-6 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="status" aria-live="polite">
                تم استلام رسالتك بنجاح! سنرد عليك قريباً.
              </div>
            )}
            {submissionError && (
              <div className="mb-6 rounded border border-red-300 bg-red-50 px-4 py-3 text-red-800" role="alert">
                {submissionError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4" aria-describedby="contact-form-help">
              <p id="contact-form-help" className="text-sm leading-6 text-gray-600">الحقول المعلَّمة مطلوبة. نستخدم بياناتك للرد على رسالتك فقط.</p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-semibold text-gray-700">الاسم</label>
                  <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="name" className="w-full rounded border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="أدخل اسمك" />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-semibold text-gray-700">البريد الإلكتروني</label>
                  <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange} required autoComplete="email" className="w-full rounded border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="بريدك الإلكتروني" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-phone" className="mb-2 block font-semibold text-gray-700">رقم الهاتف</label>
                <input id="contact-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" className="w-full rounded border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="رقم هاتفك" />
              </div>
              <div>
                <label htmlFor="contact-message" className="mb-2 block font-semibold text-gray-700">الرسالة</label>
                <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} required rows={6} className="w-full rounded border border-gray-300 px-4 py-2 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-200" placeholder="اكتب رسالتك هنا..." />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 py-3 font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70">
                {isSubmitting ? "جاري الإرسال..." : "إرسال الرسالة"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-4 py-16" aria-labelledby="location-heading">
        <div className="mx-auto max-w-4xl">
          <h2 id="location-heading" className="mb-6 text-2xl font-bold text-gray-800">موقعنا</h2>
          <div className="flex h-96 items-center justify-center rounded-lg bg-gray-300">
            <p className="text-gray-600">عنوان المؤسسة: {foundationData.contact.address}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
