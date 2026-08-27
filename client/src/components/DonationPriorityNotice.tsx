import { AlertCircle, CalendarDays, HeartHandshake } from "lucide-react";
import { Link } from "wouter";
import { staticSiteContent } from "@/content/static-content";
import type { FirestoreDonationPriority } from "@shared/firestore-schemas";

function priorityTimestamp(value: unknown) {
  if (typeof value === "number") return value;
  if (value && typeof (value as { toMillis?: () => number }).toMillis === "function") return (value as { toMillis: () => number }).toMillis();
  return 0;
}

function isActive(priority: FirestoreDonationPriority) {
  return priority.status === "published" && (!priority.endsAt || new Date(`${priority.endsAt}T23:59:59`).getTime() >= Date.now());
}

export default function DonationPriorityNotice() {
  const priorities = staticSiteContent.donationPriorities.filter(isActive).slice(0, 3);

  if (priorities.length === 0) return null;

  return (
    <section className="bg-rose-50 px-4 py-12" aria-labelledby="priority-notices-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="text-sm font-bold tracking-[0.14em] text-rose-700">يُحدّث من الإدارة</p><h2 id="priority-notices-title" className="mt-2 text-3xl font-black text-slate-900">أولويات دعم منشورة</h2><p className="mt-2 max-w-3xl leading-7 text-slate-600">تعرض هذه البطاقات فقط الاحتياجات التي اعتمدتها المؤسسة للنشر. لا يعني ظهورها تأكيداً لأي تحويل، ولا تُعرض أي حالة عند عدم وجود أولوية موثقة.</p></div><a href="#donate" className="w-fit rounded-xl bg-rose-700 px-5 py-3 font-bold text-white hover:bg-rose-800">اختر قناة الدعم</a></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {priorities.map((priority) => {
            const updatedAt = priorityTimestamp(priority.updatedAt || priority.publishedAt);
            return <article key={priority.id} className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-3"><span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${priority.kind === "urgent" ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"}`}>{priority.kind === "urgent" ? <AlertCircle className="h-5 w-5" aria-hidden="true" /> : <HeartHandshake className="h-5 w-5" aria-hidden="true" />}</span><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{priority.kind === "urgent" ? "أولوية عاجلة معتمدة" : priority.kind === "seasonal" ? "أولوية موسمية" : "احتياج برنامج"}</span></div><h3 className="mt-5 text-xl font-black text-slate-900">{priority.title}</h3><p className="mt-3 leading-7 text-slate-600">{priority.description}</p><p className="mt-4 rounded-xl bg-rose-50 p-3 text-sm leading-6 text-rose-950"><strong>لماذا الآن؟</strong> {priority.reason}</p>{priority.beneficiaryCount ? <p className="mt-3 text-sm font-semibold text-slate-700">{priority.beneficiaryCount.toLocaleString("ar-EG")} {priority.beneficiaryLabel || "مستفيداً"}</p> : null}{priority.targetAmount ? <p className="mt-1 text-sm text-slate-600">مستهدف معتمد: {priority.targetAmount.toLocaleString("ar-EG")} جنيه</p> : null}{updatedAt ? <p className="mt-4 flex items-center gap-2 text-xs text-slate-500"><CalendarDays className="h-4 w-4" aria-hidden="true" />آخر مراجعة: {new Date(updatedAt).toLocaleDateString("ar-EG")}</p> : null}</article>;
          })}
        </div>
        <div className="mt-6 text-center"><Link href="/contact" className="font-bold text-rose-800 hover:underline">تحتاج توجيهاً قبل التحويل؟ تواصل مع المؤسسة ←</Link></div>
      </div>
    </section>
  );
}
