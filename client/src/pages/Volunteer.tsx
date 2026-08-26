import { VolunteerApplicationForm } from "@/components/InterestForms";
import { Link } from "wouter";

export default function Volunteer() {
  return (
    <div className="min-h-screen bg-[#f7fbf7] text-slate-900">
      <section className="bg-gradient-to-bl from-[#123c2c] via-[#18563d] to-emerald-700 px-4 py-20 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold tracking-[0.16em] text-emerald-100">تطوع مسؤول ومؤثر</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-6xl">ساهم بوقتك وخبرتك ضمن فرص واضحة ومحترمة</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50">نرحب بالمتطوعين في الفعاليات والميدان والإعلام والتعليم والدعم الإداري والتقني، وفق الحاجة الفعلية وخطوات تواصل منظمة.</p>
          <a href="#volunteer-process" className="mt-8 inline-block rounded-xl border border-white/40 px-5 py-3 font-bold text-white hover:bg-white/10">تعرف على خطوات الفرز والتواصل</a>
        </div>
      </section>
      <main className="mx-auto grid max-w-5xl gap-8 px-4 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-3xl bg-[#153f2e] p-7 text-white">
          <p className="font-bold text-emerald-200">قبل التسجيل</p>
          <h2 className="mt-3 text-2xl font-black">ما الذي نتوقعه من تجربة التطوع؟</h2>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-emerald-50">
            <li>تواصل صادق حول الوقت والخبرة المتاحة.</li>
            <li>احترام خصوصية المستفيدين وعدم تصوير أو نشر أي مادة دون إذن المؤسسة.</li>
            <li>التزام بتعليمات الفريق والمسؤول عن النشاط.</li>
            <li>عدم مشاركة بيانات شخصية أو وثائق حساسة في هذا النموذج الأولي.</li>
          </ul>
        </aside>
        <VolunteerApplicationForm />
      </main>
      <section id="volunteer-process" className="mx-auto max-w-5xl px-4 pb-16 scroll-mt-24" aria-labelledby="volunteer-process-title">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
          <p className="text-sm font-bold tracking-[0.14em] text-emerald-700">سياسة التعامل مع طلبات التطوع</p>
          <h2 id="volunteer-process-title" className="mt-2 text-3xl font-black text-slate-900">كيف نفرز الطلب ونتواصل بشكل مسؤول؟</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-600">هذه الخطوات تنظم طلب الاهتمام الأولي؛ وليست عقد عمل أو قبولاً تلقائياً. تُراجع المؤسسة هذه السياسة قبل إطلاق أي حملة تجنيد أو نشاط ميداني واسع.</p>
          <ol className="mt-7 grid gap-4 md:grid-cols-2">
            <li className="rounded-2xl bg-emerald-50 p-5"><strong className="text-emerald-900">1. الاستلام والمراجعة.</strong><p className="mt-2 text-sm leading-6 text-slate-700">يُسجل الطلب ويُراجع على أساس المجال المطلوب، والوقت المتاح، والمهارات، والاحتياج الفعلي للمؤسسة.</p></li>
            <li className="rounded-2xl bg-emerald-50 p-5"><strong className="text-emerald-900">2. التواصل عند الملاءمة.</strong><p className="mt-2 text-sm leading-6 text-slate-700">قد يطلب الفريق توضيحاً إضافياً أو يقترح فرصة مناسبة. لا يُضاف المتطوع إلى أي قائمة تسويق مستقلة من دون موافقة منفصلة.</p></li>
            <li className="rounded-2xl bg-emerald-50 p-5"><strong className="text-emerald-900">3. قبل بدء النشاط.</strong><p className="mt-2 text-sm leading-6 text-slate-700">توضح المؤسسة الدور والمشرف وقواعد السلوك والخصوصية وحماية المستفيدين قبل أي مشاركة ميدانية أو تواصل مع المستفيدين.</p></li>
            <li className="rounded-2xl bg-emerald-50 p-5"><strong className="text-emerald-900">4. القبول أو الاعتذار.</strong><p className="mt-2 text-sm leading-6 text-slate-700">يعتمد القبول على الحاجة والقدرة التشغيلية ومتطلبات الحماية. عند عدم توافر فرصة مناسبة، لا يمثل ذلك حكماً على المتطوع أو وعداً بفرصة لاحقة.</p></li>
          </ol>
          <p className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">لطلب تصحيح البيانات أو عدم متابعة الطلب، استخدم صفحة <Link href="/contact" className="font-bold text-emerald-800 underline">التواصل</Link> وحدد أن الرسالة تتعلق بطلب التطوع.</p>
        </div>
      </section>
    </div>
  );
}
