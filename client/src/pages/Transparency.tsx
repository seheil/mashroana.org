import { useEffect, useState } from "react";
import { Link } from "wouter";
import { subscribeToDocuments, subscribeToSettings } from "@/lib/firestore-ops";
import type { FirestoreDocument, FirestoreSettings } from "@shared/firestore-schemas";

const categories: Record<FirestoreDocument["category"], string> = {
  registration: "التسجيل والترخيص",
  governance: "الحوكمة",
  financial: "البيانات المالية",
  annual_report: "التقارير السنوية",
  policy: "السياسات",
  other: "وثائق أخرى",
};

const emptySettings: FirestoreSettings = { orphans: 0, students: 0, patients: 0, families: 0 };
const documentsUnavailable = "لا توجد وثائق منشورة متاحة للعرض في الوقت الحالي. يمكن للشركاء طلب الحزمة المناسبة من المؤسسة.";

export default function Transparency() {
  const [documents, setDocuments] = useState<FirestoreDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [settings, setSettings] = useState<FirestoreSettings>(emptySettings);

  useEffect(() => {
    let resolved = false;
    const timeoutId = window.setTimeout(() => {
      if (resolved) return;
      setError(documentsUnavailable);
      setLoading(false);
    }, 6000);

    const unsubscribe = subscribeToDocuments(
      (items) => {
        resolved = true;
        window.clearTimeout(timeoutId);
        setDocuments(items.filter((item) => item.status === "published"));
        setError("");
        setLoading(false);
      },
      () => {
        resolved = true;
        window.clearTimeout(timeoutId);
        setError(documentsUnavailable);
        setLoading(false);
      }
    );

    return () => {
      window.clearTimeout(timeoutId);
      unsubscribe();
    };
  }, [loadAttempt]);

  useEffect(() => subscribeToSettings(setSettings), []);

  const retryLoad = () => {
    setError("");
    setLoading(true);
    setLoadAttempt((attempt) => attempt + 1);
  };

  return (
    <div className="min-h-screen bg-[#f8faf7]">
      <section className="bg-[#123c2c] px-4 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold tracking-[0.16em] text-emerald-200">الثقة تبدأ بالمعلومة</p>
          <h1 className="mt-3 text-4xl font-black md:text-6xl">{settings.transparencyHeadline || "الشفافية والحوكمة"}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/90">{settings.transparencyDescription || "نعرض هنا ما توافق المؤسسة على نشره من وثائق وسياسات وتقارير، مع الالتزام بحماية بيانات المستفيدين والمعلومات الحساسة."}</p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-12 px-4 py-14">
        <section className="grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-bold text-emerald-700">01</p><h2 className="mt-3 text-xl font-black">حوكمة واضحة</h2><p className="mt-2 whitespace-pre-line leading-7 text-slate-600">{settings.transparencyGovernance || "تعريف بالأدوار المؤسسية ومجلس الأمناء والسياسات المعتمدة عند توافرها للنشر."}</p></article>
          <article className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-bold text-emerald-700">02</p><h2 className="mt-3 text-xl font-black">أثر قابل للمتابعة</h2><p className="mt-2 whitespace-pre-line leading-7 text-slate-600">{settings.transparencyImpact || "مؤشرات مرتبطة بالبرامج وفترتها الزمنية ومصدرها، لا ادعاءات عامة بلا سياق."}</p></article>
          <article className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-bold text-emerald-700">03</p><h2 className="mt-3 text-xl font-black">وثائق منظمة</h2><p className="mt-2 whitespace-pre-line leading-7 text-slate-600">{settings.transparencyDocuments || "تقارير وملفات مصنفة لتيسير العناية الواجبة للشركاء والجهات المانحة."}</p></article>
        </section>

        <section className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="font-bold text-emerald-800">منهجية الأثر وجودة البيانات</p><p className="mt-1 max-w-3xl text-sm leading-7 text-slate-600">تعرّف على ما الذي يجب أن يتوافر قبل نشر رقم أو مؤشر أثر باسم المؤسسة.</p></div><Link href="/impact-methodology" className="w-fit rounded-xl bg-emerald-700 px-4 py-2.5 font-bold text-white hover:bg-emerald-800">عرض المنهجية</Link></div>
        </section>

        <section>
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between"><div><h2 className="text-3xl font-black">{settings.transparencyDocumentsTitle || "الوثائق المنشورة"}</h2><p className="mt-2 text-slate-600">تُحدّث الوثائق من لوحة الإدارة بعد المراجعة والموافقة على النشر.</p></div><Link href="/partnerships" className="font-bold text-emerald-800 hover:underline">طلب معلومات شراكة ←</Link></div>
          {loading && <div className="py-14 text-center text-slate-500" role="status">جاري تحميل الوثائق...</div>}
          {!loading && error && <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900" role="status"><p>{error}</p><button type="button" onClick={retryLoad} className="mt-4 rounded-lg border border-amber-400 px-4 py-2 font-bold hover:bg-amber-100">إعادة المحاولة</button></div>}
          {!loading && !error && documents.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"><h3 className="font-bold">لا توجد وثائق منشورة حالياً</h3><p className="mx-auto mt-2 max-w-xl leading-7 text-slate-600">سيتم نشر الوثائق التي تعتمد المؤسسة مشاركتها هنا تباعاً. يمكن للشركاء التواصل لطلب حزمة العناية الواجبة المناسبة.</p></div>}
          {!loading && !error && documents.length > 0 && <div className="mt-6 grid gap-4 md:grid-cols-2">{documents.map((documentItem) => <article key={documentItem.id} className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-bold text-emerald-700">{categories[documentItem.category]}</p><h3 className="mt-2 text-xl font-black">{documentItem.title}</h3><p className="mt-2 leading-7 text-slate-600">{documentItem.description}</p><div className="mt-5 flex items-center justify-between"><span className="text-sm text-slate-500">{documentItem.year || "—"}</span><a href={documentItem.documentUrl} target="_blank" rel="noreferrer" className="font-bold text-emerald-800 hover:underline">عرض الوثيقة</a></div></article>)}</div>}
        </section>
      </main>
    </div>
  );
}
