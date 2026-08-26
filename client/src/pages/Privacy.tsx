import { useState } from "react";
import { foundationData } from "@/../../shared/foundation-data";

type Language = "ar" | "en";

const content: Record<Language, { title: string; updated: string; intro: string; statusTitle: string; status: string[]; sections: Array<{ title: string; body: string }> }> = {
  ar: {
    title: "الخصوصية واستخدام البيانات",
    updated: "آخر تحديث: 26 أغسطس 2026",
    intro: "تشرح هذه الصفحة ما يجمعه الموقع في النماذج العامة، ولماذا نحتاجه، وما لا يدّعي الموقع القيام به. وهي ملخص تشغيلي للموقع وليست بديلاً عن أي التزامات قانونية أو وثائق داخلية تعتمدها المؤسسة لاحقاً.",
    statusTitle: "الحالة الحالية للخدمات الرقمية",
    status: ["نماذج التواصل والشراكة والتطوع تجمع بيانات الاتصال والرسالة أو الطلب المرسل فقط.", "لا يعالج هذا الموقع بطاقات دفع أو مبالغ تبرع؛ فتح روابط التحويل أو المحفظة لا يعني تأكيد تبرع داخل الموقع.", "لا توجد حالياً نشرة بريدية أو CRM أو اشتراك تسويقي آلي عبر الموقع."],
    sections: [
      { title: "1. ما البيانات التي نجمعها؟", body: "عند إرسال نموذج التواصل: الاسم والبريد الإلكتروني ورقم الهاتف (إن أدخل) والرسالة.\n\nعند طلب شراكة: اسم الجهة والقطاع وبيانات مسؤول التواصل ونوع التعاون والتفاصيل التي يختار مقدم الطلب مشاركتها.\n\nعند طلب تطوع: الاسم ووسيلة التواصل والوقت والمجال والمهارات والرسالة التي يختار مقدم الطلب مشاركتها. لا تطلب هذه النماذج وثائق هوية أو بيانات مالية أو معلومات حساسة عن المستفيدين." },
      { title: "2. لماذا نستخدمها؟", body: "نستخدم البيانات للرد على الرسالة، أو فرز طلب الشراكة أو التطوع، أو ترتيب خطوة متابعة مناسبة. لا نستخدم الموافقة على نموذج الشراكة أو التطوع كإذن مستقل لإرسال رسائل تسويقية." },
      { title: "3. التبرع وبيانات الدفع", body: "يعرض الموقع قنوات تبرع رسمية أو روابط انتقال إليها. لا يجمع الموقع رقم البطاقة أو رقم الحساب أو قيمة التحويل، ولا يستطيع تأكيد إتمام التبرع من مجرد الضغط على رابط أو نسخ رقم. عند الشك، تواصل مع المؤسسة قبل التحويل." },
      { title: "4. الوصول إلى البيانات والاحتفاظ بها", body: "تظهر طلبات النماذج لفريق المؤسسة المصرح له في لوحة الإدارة بعد تطبيق قواعد الوصول المناسبة. تُحفظ البيانات بالقدر اللازم للرد والمتابعة وسجل التشغيل، وتراجع المؤسسة مدة الاحتفاظ التفصيلية قبل إطلاق CRM أو حملة مراسلات. لا تشارك بيانات الطلبات للعامة." },
      { title: "5. المشاركة والحماية", body: "لا يفترض الموقع أن المؤسسة تشارك البيانات مع جهات تسويقية. قد يلزم مشاركة حد أدنى من المعلومات مع مقدم خدمة تقني لتشغيل الموقع أو عند وجود التزام رسمي، وفق ما توافق عليه المؤسسة. يعتمد منع الوصول غير المصرح به على تطبيق قواعد Firestore وإدارة حسابات المسؤولين؛ ولذلك تظل مراجعة هذه الإعدادات خطوة لازمة قبل الإطلاق." },
      { title: "6. طلب التصحيح أو إيقاف المتابعة", body: "يمكنك طلب تصحيح بياناتك أو عدم متابعة طلبك بالتواصل مع المؤسسة وذكر نوع النموذج الذي أرسلته. قد تطلب المؤسسة معلومات معقولة للتحقق من هوية مقدم الطلب قبل تنفيذ الطلب، وقد تحتفظ بالحد الأدنى الذي يلزم لسجل تشغيلي أو التزام واجب." },
      { title: "7. التحديثات", body: "ستُحدّث هذه الصفحة عند إضافة بوابة دفع، أو نشرة بريدية، أو CRM، أو فترة احتفاظ معتمدة، أو تغيير جوهري في طريقة استخدام البيانات." },
    ],
  },
  en: {
    title: "Privacy and Data Use",
    updated: "Last updated: 26 August 2026",
    intro: "This page explains what the public website collects through its forms, why it is needed, and what the website does not claim to do. It is an operational website notice, not a substitute for future legal or internal policies approved by the foundation.",
    statusTitle: "Current digital-service status",
    status: ["Contact, partnership, and volunteer forms collect only the contact details and request content that a visitor submits.", "This website does not process payment cards or donation amounts. Opening a transfer or wallet link is not a confirmed donation on this website.", "There is currently no newsletter, automated CRM, or marketing subscription through this website."],
    sections: [
      { title: "1. Data we collect", body: "Contact form: name, email, optional phone number, and message.\n\nPartnership enquiry: organisation, sector, contact details, proposed collaboration, and any details the enquirer chooses to share.\n\nVolunteer enquiry: name, contact details, availability, area of interest, skills, and any message the applicant chooses to share. These forms do not ask for identity documents, financial data, or sensitive beneficiary information." },
      { title: "2. Why we use it", body: "We use submitted data to reply to a message, review a partnership enquiry, review volunteer interest, or arrange a relevant next step. Consent to a partnership or volunteer form is not separate permission for marketing messages." },
      { title: "3. Donations and payment data", body: "The website lists official donation channels or links to them. It does not collect card numbers, bank-account numbers, or transfer values, and cannot confirm a donation simply because a visitor opened a link or copied a number. If unsure, contact the foundation before transferring." },
      { title: "4. Access and retention", body: "Form submissions are intended for authorised foundation staff in the administration dashboard after appropriate access rules are applied. Data is retained only as needed for response, follow-up, and operational records. A detailed retention schedule must be approved before a CRM or email campaign is introduced. Form submissions are not public." },
      { title: "5. Sharing and protection", body: "The website does not assume that the foundation shares data with marketing parties. The minimum necessary information may be processed by technical providers that run the site, or where an official obligation applies, subject to the foundation’s approval. Protection depends on applying Firestore rules and controlling administrator accounts; reviewing those settings remains necessary before launch." },
      { title: "6. Correction or stopping follow-up", body: "You can ask to correct your information or stop follow-up by contacting the foundation and stating which form you submitted. The foundation may request reasonable identity verification and may retain the minimum necessary information for an operational record or required obligation." },
      { title: "7. Updates", body: "This notice will be updated if a payment gateway, newsletter, CRM, approved retention period, or material change to data use is introduced." },
    ],
  },
};

export default function Privacy() {
  const [language, setLanguage] = useState<Language>("ar");
  const current = content[language];

  return (
    <div className="min-h-screen bg-[#f8faf7] text-slate-900" dir={language === "ar" ? "rtl" : "ltr"}>
      <section className="bg-gradient-to-br from-[#123c2c] via-[#18563d] to-emerald-700 px-4 py-14 text-white">
        <div className="mx-auto flex max-w-4xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div><h1 className="text-4xl font-black">{current.title}</h1><p className="mt-3 text-emerald-50">{current.updated}</p></div>
          <div className="flex gap-2" aria-label="لغة سياسة الخصوصية"><button type="button" aria-pressed={language === "ar"} onClick={() => setLanguage("ar")} className={`rounded-lg px-4 py-2 font-bold ${language === "ar" ? "bg-white text-emerald-800" : "bg-emerald-600 text-white hover:bg-emerald-500"}`}>العربية</button><button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")} className={`rounded-lg px-4 py-2 font-bold ${language === "en" ? "bg-white text-emerald-800" : "bg-emerald-600 text-white hover:bg-emerald-500"}`}>English</button></div>
        </div>
      </section>
      <main className="mx-auto max-w-4xl space-y-8 px-4 py-14">
        <p className="text-lg leading-8 text-slate-600">{current.intro}</p>
        <section className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6" aria-labelledby="privacy-status-title"><h2 id="privacy-status-title" className="text-2xl font-black text-slate-900">{current.statusTitle}</h2><ul className="mt-4 space-y-3 leading-7 text-slate-700">{current.status.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="font-black text-emerald-700">✓</span><span>{item}</span></li>)}</ul></section>
        <section className="space-y-6">{current.sections.map((section) => <article key={section.title} className="rounded-2xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-black text-slate-900">{section.title}</h2><p className="mt-3 whitespace-pre-line leading-8 text-slate-600">{section.body}</p></article>)}</section>
        <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-2xl font-black">{language === "ar" ? "التواصل بشأن بياناتك" : "Contact about your data"}</h2><p className="mt-3 leading-7 text-slate-600">{language === "ar" ? "استخدم WhatsApp أو الهاتف الرسمي للمؤسسة، واذكر باختصار نوع الطلب: تواصل، شراكة، أو تطوع." : "Use the foundation’s official WhatsApp or phone channel and briefly state the request type: contact, partnership, or volunteer."}</p><div className="mt-5 flex flex-wrap gap-3"><a href={foundationData.contact.whatsapp} target="_blank" rel="noreferrer" className="rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800">WhatsApp</a><a href={`tel:${foundationData.contact.phone}`} className="rounded-xl border border-emerald-700 px-5 py-3 font-bold text-emerald-800 hover:bg-emerald-50">{foundationData.contact.phone}</a></div></section>
      </main>
    </div>
  );
}
