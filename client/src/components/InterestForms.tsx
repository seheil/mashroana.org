import { type ChangeEvent, type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { addPartnerInquiry, addVolunteerApplication } from "@/lib/firestore-ops";

const inputClass = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-emerald-500 transition focus:ring-2";
const labelClass = "block text-sm font-bold text-slate-800";

type SubmissionState = "idle" | "sending" | "success" | "error";

export function PartnerInquiryForm() {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [formData, setFormData] = useState({
    organizationName: "", sector: "", contactName: "", email: "", phone: "", cooperationType: "", programInterest: "", estimatedValue: "", timeline: "", notes: "", consent: false,
  });

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setStatus("idle");
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const updateConsent = (checked: boolean) => {
    setStatus("idle");
    setFormData((previous) => ({ ...previous, consent: checked }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await addPartnerInquiry(formData);
      setFormData({ organizationName: "", sector: "", contactName: "", email: "", phone: "", cooperationType: "", programInterest: "", estimatedValue: "", timeline: "", notes: "", consent: false });
      setStatus("success");
    } catch (error) {
      console.error("Partner inquiry submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="partner-inquiry" className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 md:p-8" aria-labelledby="partner-inquiry-title">
      <p className="text-sm font-bold tracking-[0.14em] text-emerald-700">نموذج تأهيل أولي</p>
      <h2 id="partner-inquiry-title" className="mt-2 text-3xl font-black text-slate-900">ابدأوا طلب شراكة أو منحة</h2>
      <p id="partner-inquiry-help" className="mt-3 max-w-3xl leading-7 text-slate-600">نطلب الحد الأدنى من المعلومات لفهم نوع التعاون المقترح. لا يمثل إرسال النموذج قبولاً للشراكة أو التزاماً مالياً من أي طرف.</p>
      {status === "success" && <p className="mt-5 rounded-xl border border-emerald-300 bg-white px-4 py-3 font-semibold text-emerald-800" role="status" aria-live="polite">تم استلام طلبكم. سيتواصل فريق المؤسسة عبر بيانات الاتصال المرسلة.</p>}
      {status === "error" && <p className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 font-semibold text-red-800" role="alert">تعذر إرسال الطلب الآن. يمكنكم التواصل مباشرة عبر صفحة الاتصال.</p>}
      <form onSubmit={submit} className="mt-6 grid gap-5 md:grid-cols-2" aria-describedby="partner-inquiry-help" aria-busy={status === "sending"}>
        <label className={labelClass}>اسم الجهة<input className={inputClass} name="organizationName" value={formData.organizationName} onChange={updateField} required autoComplete="organization" /></label>
        <label className={labelClass}>القطاع<select className={inputClass} name="sector" value={formData.sector} onChange={updateField} required><option value="">اختاروا القطاع</option><option value="شركة">شركة</option><option value="مؤسسة مانحة">مؤسسة مانحة</option><option value="بنك أو جهة مالية">بنك أو جهة مالية</option><option value="جهة حكومية أو تعليمية">جهة حكومية أو تعليمية</option><option value="أخرى">أخرى</option></select></label>
        <label className={labelClass}>اسم المسؤول عن التواصل<input className={inputClass} name="contactName" value={formData.contactName} onChange={updateField} required autoComplete="name" /></label>
        <label className={labelClass}>البريد الإلكتروني<input className={inputClass} type="email" name="email" value={formData.email} onChange={updateField} required autoComplete="email" /></label>
        <label className={labelClass}>رقم الهاتف <span className="font-normal text-slate-500">(اختياري)</span><input className={inputClass} type="tel" name="phone" value={formData.phone} onChange={updateField} autoComplete="tel" /></label>
        <label className={labelClass}>نوع التعاون<select className={inputClass} name="cooperationType" value={formData.cooperationType} onChange={updateField} required><option value="">اختاروا نوع التعاون</option><option value="تمويل برنامج">تمويل برنامج</option><option value="دعم عيني أو لوجستي">دعم عيني أو لوجستي</option><option value="تطوع مهني">تطوع مهني</option><option value="حملة موظفين">حملة موظفين</option><option value="حملة توعوية أو إعلامية">حملة توعوية أو إعلامية</option><option value="أخرى">أخرى</option></select></label>
        <label className={labelClass}>مجال البرنامج أو الاهتمام <span className="font-normal text-slate-500">(اختياري)</span><input className={inputClass} name="programInterest" value={formData.programInterest} onChange={updateField} placeholder="مثل: التعليم أو الصحة أو الإغاثة" /></label>
        <label className={labelClass}>النطاق أو القيمة التقديرية <span className="font-normal text-slate-500">(اختياري)</span><input className={inputClass} name="estimatedValue" value={formData.estimatedValue} onChange={updateField} placeholder="لا يُعد التزاماً" /></label>
        <label className={labelClass}>الإطار الزمني المتوقع <span className="font-normal text-slate-500">(اختياري)</span><input className={inputClass} name="timeline" value={formData.timeline} onChange={updateField} placeholder="مثل: الربع الأول من 2027" /></label>
        <label className={`${labelClass} md:col-span-2`}>ملاحظات إضافية <span className="font-normal text-slate-500">(اختياري)</span><textarea className={`${inputClass} min-h-32`} name="notes" value={formData.notes} onChange={updateField} /></label>
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700 md:col-span-2"><input type="checkbox" checked={formData.consent} onChange={(event) => updateConsent(event.target.checked)} required className="mt-1 h-4 w-4 accent-emerald-700" />أوافق على استخدام بيانات الاتصال هذه لمتابعة طلب الشراكة فقط، وفق سياسة الخصوصية بالمؤسسة.</label>
        <Button type="submit" disabled={status === "sending"} aria-disabled={status === "sending"} className="md:col-span-2 bg-emerald-700 py-3 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70">{status === "sending" ? "جاري الإرسال..." : "إرسال طلب الشراكة"}</Button>
      </form>
    </section>
  );
}

export function VolunteerApplicationForm() {
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", availability: "", areaOfInterest: "", skills: "", message: "", consent: false });

  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setStatus("idle");
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const updateConsent = (checked: boolean) => {
    setStatus("idle");
    setFormData((previous) => ({ ...previous, consent: checked }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await addVolunteerApplication(formData);
      setFormData({ name: "", email: "", phone: "", availability: "", areaOfInterest: "", skills: "", message: "", consent: false });
      setStatus("success");
    } catch (error) {
      console.error("Volunteer application submission error:", error);
      setStatus("error");
    }
  };

  return (
    <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8" aria-labelledby="volunteer-form-title">
      <h2 id="volunteer-form-title" className="text-3xl font-black text-slate-900">سجّل اهتمامك بالتطوع</h2>
      <p id="volunteer-form-help" className="mt-3 leading-7 text-slate-600">سنتواصل معك عند توفر فرصة مناسبة. إرسال النموذج لا يمثل قبولاً فورياً، ولا نطلب في هذه المرحلة أي وثائق شخصية حساسة.</p>
      {status === "success" && <p className="mt-5 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 font-semibold text-emerald-800" role="status" aria-live="polite">شكراً لاهتمامك. تم استلام طلب التطوع.</p>}
      {status === "error" && <p className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 font-semibold text-red-800" role="alert">تعذر إرسال الطلب الآن. تواصل معنا مباشرة عبر صفحة الاتصال.</p>}
      <form onSubmit={submit} className="mt-6 grid gap-5 md:grid-cols-2" aria-describedby="volunteer-form-help" aria-busy={status === "sending"}>
        <label className={labelClass}>الاسم<input className={inputClass} name="name" value={formData.name} onChange={updateField} required autoComplete="name" /></label>
        <label className={labelClass}>البريد الإلكتروني<input className={inputClass} type="email" name="email" value={formData.email} onChange={updateField} required autoComplete="email" /></label>
        <label className={labelClass}>رقم الهاتف <span className="font-normal text-slate-500">(اختياري)</span><input className={inputClass} type="tel" name="phone" value={formData.phone} onChange={updateField} autoComplete="tel" /></label>
        <label className={labelClass}>الوقت المتاح<select className={inputClass} name="availability" value={formData.availability} onChange={updateField} required><option value="">اختر الوقت المتاح</option><option value="ساعات محدودة أسبوعياً">ساعات محدودة أسبوعياً</option><option value="عطلات نهاية الأسبوع">عطلات نهاية الأسبوع</option><option value="حسب الحملات والفعاليات">حسب الحملات والفعاليات</option><option value="تطوع مهني عن بُعد">تطوع مهني عن بُعد</option></select></label>
        <label className={labelClass}>مجال المساهمة<select className={inputClass} name="areaOfInterest" value={formData.areaOfInterest} onChange={updateField} required><option value="">اختر مجالاً</option><option value="فعاليات وميدان">فعاليات وميدان</option><option value="إعلام وتصميم">إعلام وتصميم</option><option value="تعليم وتدريب">تعليم وتدريب</option><option value="دعم إداري أو تقني">دعم إداري أو تقني</option><option value="أخرى">أخرى</option></select></label>
        <label className={labelClass}>مهارات أو خبرة <span className="font-normal text-slate-500">(اختياري)</span><input className={inputClass} name="skills" value={formData.skills} onChange={updateField} /></label>
        <label className={`${labelClass} md:col-span-2`}>رسالة مختصرة <span className="font-normal text-slate-500">(اختياري)</span><textarea className={`${inputClass} min-h-28`} name="message" value={formData.message} onChange={updateField} /></label>
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-700 md:col-span-2"><input type="checkbox" checked={formData.consent} onChange={(event) => updateConsent(event.target.checked)} required className="mt-1 h-4 w-4 accent-emerald-700" />أوافق على استخدام بيانات الاتصال هذه للتواصل بشأن التطوع فقط، وفق سياسة الخصوصية بالمؤسسة.</label>
        <Button type="submit" disabled={status === "sending"} aria-disabled={status === "sending"} className="md:col-span-2 bg-emerald-700 py-3 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70">{status === "sending" ? "جاري الإرسال..." : "إرسال طلب التطوع"}</Button>
      </form>
    </section>
  );
}
