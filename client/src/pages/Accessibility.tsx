import { Link } from "wouter";
import { Accessibility as AccessibilityIcon, CheckCircle2, Mail, MonitorSmartphone } from "lucide-react";

const practices = [
  "دعم اللغة العربية واتجاه القراءة من اليمين إلى اليسار في الواجهة العامة.",
  "رابط لتجاوز عناصر التنقل والوصول مباشرة إلى المحتوى الرئيسي.",
  "تسميات واضحة للحقول ورسائل حالة قابلة للقراءة في النماذج العامة.",
  "دعم التنقل بلوحة المفاتيح، وإغلاق الحوارات بمفتاح Escape عند توفرها.",
  "احترام تفضيل تقليل الحركة في متصفح المستخدم.",
];

export default function Accessibility() {
  return (
    <main className="min-h-screen bg-[#f8faf7] text-slate-900" dir="rtl" aria-labelledby="accessibility-title">
      <section className="bg-[#123c2c] px-4 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="flex items-center gap-2 text-sm font-bold tracking-[0.16em] text-emerald-200"><AccessibilityIcon className="h-4 w-4" aria-hidden="true" />إتاحة عملية ومستمرة</p>
          <h1 id="accessibility-title" className="mt-4 text-4xl font-black md:text-6xl">بيان الإتاحة الرقمية</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/90">نعمل على جعل المعلومات العامة ومسارات التواصل والتبرع والشراكة أكثر سهولة للاستخدام. نراجع الموقع تدريجياً، ولا ندّعي توافقاً قانونياً أو تقنياً لم يتم التحقق منه بشكل مستقل.</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-10 px-4 py-14">
        <section className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-2xl font-black">ما نطبقه حالياً</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {practices.map((practice) => <div key={practice} className="flex gap-3 rounded-2xl bg-emerald-50 p-4 leading-7 text-slate-700"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />{practice}</div>)}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-100"><MonitorSmartphone className="h-7 w-7 text-emerald-700" aria-hidden="true" /><h2 className="mt-4 text-2xl font-black">حدود نعمل على تحسينها</h2><p className="mt-3 leading-8 text-slate-600">قد تعتمد بعض الصفحات على بيانات حية أو مواد تنشرها المؤسسة لاحقاً. سنواصل مراجعة البدائل النصية للوسائط، ورسائل الأخطاء، وتجربة الجوال ولوحة المفاتيح قبل الحملات العامة.</p></article>
          <article className="rounded-3xl bg-amber-50 p-7 ring-1 ring-amber-100"><Mail className="h-7 w-7 text-amber-700" aria-hidden="true" /><h2 className="mt-4 text-2xl font-black">اطلب مساعدة أو بديلًا</h2><p className="mt-3 leading-8 text-slate-700">إذا واجهت صعوبة في الوصول إلى معلومة أو نموذج، اذكر الصفحة ونوع المساعدة المطلوبة عبر صفحة التواصل. سنحاول تقديم البديل المناسب من القنوات الرسمية للمؤسسة.</p><Link href="/contact" className="mt-5 inline-flex rounded-xl bg-emerald-700 px-4 py-2.5 font-bold text-white hover:bg-emerald-800">تواصل معنا</Link></article>
        </section>

        <p className="text-sm text-slate-500">آخر مراجعة للنص: 26 أغسطس 2026.</p>
      </div>
    </main>
  );
}
