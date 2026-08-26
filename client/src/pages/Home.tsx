import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import DonationPriorityNotice from "@/components/DonationPriorityNotice";
import { subscribeToProjects, subscribeToSettings } from "@/lib/firestore-ops";
import { foundationData } from "@/../../shared/foundation-data";
import type { FirestoreProject, FirestoreSettings } from "@shared/firestore-schemas";

const initialCounters: FirestoreSettings = { orphans: 0, students: 0, patients: 0, families: 0 };

export default function Home() {
  const [projects, setProjects] = useState<FirestoreProject[]>([]);
  const [counters, setCounters] = useState<FirestoreSettings>(initialCounters);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState("");

  useEffect(() => {
    const unsubscribeProjects = subscribeToProjects((items) => {
      setProjects(items);
      setLoadingProjects(false);
    }, () => {
      setProjectsError("تعذر تحميل البرامج الآن. يمكنك زيارة صفحة التواصل أو المحاولة لاحقاً.");
      setLoadingProjects(false);
    });
    const unsubscribeSettings = subscribeToSettings(setCounters, () => setCounters(initialCounters));
    return () => {
      unsubscribeProjects();
      unsubscribeSettings();
    };
  }, []);

  const impactCards = [
    { label: "أيتام ضمن برامج الرعاية", value: counters.orphans, icon: "♡" },
    { label: "طلاب تلقوا دعماً", value: counters.students, icon: "⌁" },
    { label: "حالات صحية مدعومة", value: counters.patients, icon: "+" },
    { label: "أسر وصلها الدعم", value: counters.families, icon: "✦" },
  ];

  const hasVerifiedImpactValue = (value: number) => Number.isFinite(value) && value > 0;

  return (
    <div className="overflow-hidden bg-[#fbfcf9] text-slate-900">
      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#113d2c] px-4 pb-16 pt-24 text-white md:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(166,220,179,0.28),transparent_32%),radial-gradient(circle_at_89%_75%,rgba(231,191,112,0.2),transparent_30%)]" />
        <div className="absolute left-[7%] top-[16%] -z-10 h-40 w-40 rounded-full border border-emerald-100/15" />
        <div className="absolute bottom-[-140px] right-[-100px] -z-10 h-[410px] w-[410px] rounded-full border-[36px] border-emerald-200/10" />
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-emerald-100/25 bg-emerald-300/10 px-4 py-2 text-sm font-bold text-emerald-100">مؤسسة أهلية تعمل من أجل أثر إنساني مسؤول</p>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.24] tracking-tight md:text-6xl">{counters.heroTitle || "نحوّل العطاء إلى برامج واضحة، وأثر يمكن متابعته."}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-emerald-50/90">{counters.heroDescription || `${foundationData.name} تعمل في مجالات الرعاية والتعليم والصحة والإغاثة والتمكين، مع مسارات تبرع وتواصل وشراكة واضحة.`}</p>
            <div className="mt-9 flex flex-wrap gap-3"><a href="#donate" className="rounded-xl bg-[#e8c57a] px-6 py-3.5 font-black text-[#173a2c] transition hover:bg-[#f4d78f]">ادعم برنامجاً الآن</a><Link href="/partnerships" className="rounded-xl border border-white/35 px-6 py-3.5 font-bold text-white transition hover:bg-white/10">شراكة أو منحة</Link></div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-emerald-100"><span>✓ تواصل مباشر مع المؤسسة</span><span>✓ محتوى مؤسسي قابل للمراجعة</span><span>✓ خصوصية واحترام للمستفيدين</span></div>
          </div>
          <aside className="relative rounded-[2rem] border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-sm">
            <p className="text-sm font-bold text-emerald-200">رسالتنا</p>
            <p className="mt-4 text-2xl font-black leading-10">«{foundationData.tagline}»</p>
            <div className="mt-8 border-t border-white/15 pt-6"><p className="text-sm leading-7 text-emerald-50/85">نتيح للمانحين والشركاء متابعة البرامج، والتعرف على مجالات التعاون، والاطلاع على ما توافق المؤسسة على نشره من مؤشرات ووثائق.</p><Link href="/transparency" className="mt-5 inline-block font-bold text-[#f4d78f] hover:underline">استكشف الشفافية والحوكمة ←</Link></div>
          </aside>
        </div>
      </section>

      <section className="relative -mt-10 px-4" aria-labelledby="impact-summary-title"><h2 id="impact-summary-title" className="sr-only">مؤشرات الأثر المنشورة</h2><div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 rounded-3xl bg-white p-4 shadow-xl shadow-emerald-950/10 md:grid-cols-4 md:gap-4 md:p-6">{impactCards.map((card) => { const verified = hasVerifiedImpactValue(card.value); return <article key={card.label} className="rounded-2xl bg-[#f4f8f3] p-4 md:p-5"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-700 text-xl font-black text-white" aria-hidden="true">{card.icon}</span><p className="mt-4 text-2xl font-black text-[#123c2c] md:text-3xl" aria-live="polite">{verified ? card.value.toLocaleString("ar-EG") : "—"}</p><p className="mt-1 text-xs leading-5 text-slate-600 md:text-sm">{card.label}</p>{!verified && <p className="mt-1 text-xs font-semibold text-slate-500">قيد التوثيق</p>}</article>})}</div></section>

      <DonationPriorityNotice />

      <section className="mx-auto max-w-6xl px-4 py-20"><div className="flex flex-col gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-bold tracking-[0.14em] text-emerald-700">برامجنا</p><h2 className="mt-2 text-3xl font-black md:text-4xl">برامج ذات أولوية مجتمعية</h2><p className="mt-3 max-w-2xl leading-7 text-slate-600">تُحدّث البرامج مباشرة من لوحة الإدارة، لتبقى الصفحة العامة متسقة مع ما تنفذه المؤسسة فعلياً.</p></div><Link href="/projects" className="w-fit rounded-xl border border-emerald-700 px-5 py-3 font-bold text-emerald-800 hover:bg-emerald-50">كل البرامج ←</Link></div>{loadingProjects ? <div className="py-14 text-center text-slate-500">جاري تحميل البرامج...</div> : projectsError ? <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center leading-7 text-amber-950">{projectsError}</div> : projects.length === 0 ? <div className="py-14 text-center text-slate-500">ستظهر البرامج المعتمدة هنا فور إضافتها من لوحة الإدارة.</div> : <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{projects.slice(0, 6).map((project) => <article key={project.id} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">{project.icon || "✦"}</div><h3 className="mt-5 text-xl font-black">{project.name}</h3><p className="mt-3 min-h-14 leading-7 text-slate-600">{project.description}</p><a href="#donate" className="mt-5 inline-flex font-bold text-emerald-800 hover:underline">دعم هذا المجال ←</a></article>)}</div>}</section>

      <section className="bg-[#eef5ee] px-4 py-20"><div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center"><div className="rounded-3xl bg-[#153f2e] p-8 text-white shadow-xl"><p className="font-bold text-emerald-200">للشركات والجهات المانحة</p><h2 className="mt-3 text-3xl font-black leading-tight">{counters.partnershipTitle || "الشراكة الناجحة تبدأ بتحديد الأثر قبل التمويل."}</h2><p className="mt-4 leading-8 text-emerald-50/90">نرتب مساراً للمحادثة يتضمن مجال البرنامج، والفئة المستفيدة، ومؤشرات المتابعة، والوثائق المتاحة وفق سياسة النشر بالمؤسسة.</p><Link href="/partnerships" className="mt-7 inline-block rounded-xl bg-[#e8c57a] px-5 py-3 font-bold text-[#153f2e]">اعرف المزيد عن الشراكات</Link></div><div><p className="text-sm font-bold tracking-[0.14em] text-emerald-700">من أرض الواقع</p><h2 className="mt-3 text-3xl font-black">المحتوى المرئي جزء من توثيق الأثر، وليس زينة.</h2><p className="mt-4 leading-8 text-slate-600">تجمع مكتبة المؤسسة الصور والفيديوهات المصرح بنشرها مع وصف يوضح البرنامج والسياق وحقوق الاستخدام؛ لتمنح المجتمع والشركاء صورة أكثر مسؤولية عن العمل.</p><Link href="/media" className="mt-6 inline-block font-bold text-emerald-800 hover:underline">زيارة مكتبة الوسائط ←</Link></div></div></section>

      <section id="donate" className="scroll-mt-20 bg-white px-4 py-20"><div className="mx-auto max-w-6xl"><div className="max-w-3xl"><p className="text-sm font-bold tracking-[0.14em] text-emerald-700">ساهم بأمان</p><h2 className="mt-2 text-3xl font-black md:text-4xl">اختر وسيلة التبرع المناسبة لك</h2><p className="mt-3 leading-7 text-slate-600">للتأكد من وصول التبرع إلى القناة الصحيحة، استخدم البيانات الرسمية أدناه أو تواصل مع المؤسسة مباشرة قبل التحويل.</p></div><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4"><article className="rounded-2xl border border-slate-200 p-5"><p className="font-black">حساب بنك مصر</p><p className="mt-3 break-all rounded-lg bg-slate-50 p-3 font-mono text-sm">{foundationData.payment.bankMisr.accountNumber}</p><Button onClick={() => navigator.clipboard.writeText(foundationData.payment.bankMisr.accountNumber)} className="mt-4 w-full bg-[#123c2c] text-white hover:bg-[#0a2b1e]">نسخ الرقم</Button></article><article className="rounded-2xl border border-slate-200 p-5"><p className="font-black">InstaPay</p><p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">تحويل فوري عبر الرابط الرسمي للمؤسسة.</p><a href={foundationData.payment.instapay.link} target="_blank" rel="noreferrer" className="mt-4 block rounded-lg bg-[#1976d2] px-4 py-2.5 text-center font-bold text-white">فتح InstaPay</a></article><article className="rounded-2xl border border-slate-200 p-5"><p className="font-black">Vodafone Cash</p><p className="mt-3 rounded-lg bg-slate-50 p-3 font-mono text-sm">{foundationData.payment.vodafoneCash.number}</p><Button onClick={() => navigator.clipboard.writeText(foundationData.payment.vodafoneCash.number)} className="mt-4 w-full bg-red-600 text-white hover:bg-red-700">نسخ الرقم</Button></article><article className="rounded-2xl border border-slate-200 p-5"><p className="font-black">تواصل قبل التبرع</p><p className="mt-3 min-h-12 text-sm leading-6 text-slate-600">اطلب توجيهاً إلى البرنامج أو استفسر عن وسيلة التحويل.</p><a href={foundationData.contact.whatsapp} target="_blank" rel="noreferrer" className="mt-4 block rounded-lg bg-emerald-600 px-4 py-2.5 text-center font-bold text-white">WhatsApp</a></article></div><p className="mt-7 rounded-xl bg-amber-50 p-4 text-center text-sm leading-7 text-amber-950">{foundationData.payment.trustMessage}</p></div></section>
    </div>
  );
}
