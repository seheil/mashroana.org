import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import type { FirestoreDonationPriority, FirestoreProject } from "@shared/firestore-schemas";
import {
  addDonationPriority,
  deleteDonationPriority,
  subscribeToDonationPriorities,
  updateDonationPriority,
} from "@/lib/firestore-ops";

type PriorityDraft = Omit<FirestoreDonationPriority, "id" | "createdAt" | "updatedAt">;

const emptyDraft: PriorityDraft = {
  title: "",
  description: "",
  programId: "",
  programName: "",
  kind: "program",
  status: "draft",
  recommendationWeight: 50,
  reason: "",
  sourceNote: "",
  targetAmount: undefined,
  beneficiaryCount: undefined,
  beneficiaryLabel: "",
  publishedAt: undefined,
  endsAt: "",
};

const kindLabels = { urgent: "حالة/احتياج عاجل", seasonal: "أولوية موسمية", program: "احتياج برنامج" } as const;
const statusLabels = { draft: "مسودة داخلية", published: "منشور للموقع والمساعد", closed: "مغلق" } as const;

export default function DonationPriorityManager({ projects }: { projects: FirestoreProject[] }) {
  const [priorities, setPriorities] = useState<FirestoreDonationPriority[]>([]);
  const [draft, setDraft] = useState<PriorityDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToDonationPriorities(
      (items) => { setPriorities(items); setLoading(false); },
      () => { setLoading(false); setNotice("❌ تعذر تحميل الأولويات. تحققي من قواعد Firebase عند توفر laptop."); }
    );
    return unsubscribe;
  }, []);

  const reset = () => { setEditingId(null); setDraft(emptyDraft); };

  const selectProgram = (projectId: string) => {
    const project = projects.find((item) => item.id === projectId);
    setDraft({ ...draft, programId: projectId, programName: project?.name || "" });
  };

  const save = async () => {
    if (!draft.title.trim() || !draft.description.trim() || !draft.programId || !draft.programName || !draft.reason.trim() || !draft.sourceNote.trim()) {
      setNotice("❌ أكملي العنوان والوصف والبرنامج وسبب الأولوية ومصدرها قبل الحفظ.");
      return;
    }
    if (!Number.isFinite(draft.recommendationWeight) || draft.recommendationWeight < 1 || draft.recommendationWeight > 100) {
      setNotice("❌ درجة التوصية يجب أن تكون بين 1 و100.");
      return;
    }
    const payload: PriorityDraft = {
      ...draft,
      title: draft.title.trim(),
      description: draft.description.trim(),
      reason: draft.reason.trim(),
      sourceNote: draft.sourceNote.trim(),
      publishedAt: draft.status === "published" ? draft.publishedAt || Date.now() : undefined,
      endsAt: draft.endsAt || "",
      targetAmount: draft.targetAmount && draft.targetAmount > 0 ? draft.targetAmount : undefined,
      beneficiaryCount: draft.beneficiaryCount && draft.beneficiaryCount > 0 ? draft.beneficiaryCount : undefined,
      beneficiaryLabel: draft.beneficiaryLabel?.trim() || "",
    };
    try {
      setSaving(true);
      if (editingId) {
        await updateDonationPriority(editingId, payload);
        setNotice("✅ تم تحديث الأولوية. راجعيها قبل إبقائها منشورة.");
      } else {
        await addDonationPriority(payload);
        setNotice(payload.status === "published" ? "✅ نُشرت الأولوية للموقع والمساعد." : "✅ حُفظت الأولوية كمسودة داخلية.");
      }
      reset();
    } catch (error) {
      console.error("Donation priority save error:", error);
      setNotice("❌ تعذر حفظ الأولوية. تحققي من قواعد Firebase بعد تسجيل الدخول.");
    } finally {
      setSaving(false);
    }
  };

  const edit = (priority: FirestoreDonationPriority) => {
    setEditingId(priority.id || null);
    setDraft({
      title: priority.title,
      description: priority.description,
      programId: priority.programId,
      programName: priority.programName,
      kind: priority.kind,
      status: priority.status,
      recommendationWeight: priority.recommendationWeight,
      reason: priority.reason,
      sourceNote: priority.sourceNote,
      targetAmount: priority.targetAmount,
      beneficiaryCount: priority.beneficiaryCount,
      beneficiaryLabel: priority.beneficiaryLabel || "",
      publishedAt: priority.publishedAt,
      endsAt: priority.endsAt || "",
    });
  };

  const remove = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الأولوية؟")) return;
    try { await deleteDonationPriority(id); setNotice("✅ تم حذف الأولوية."); } catch { setNotice("❌ تعذر حذف الأولوية."); }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-rose-100 bg-gradient-to-l from-rose-50 to-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">أولويات التبرع والحملات</h2>
        <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600">هذه البيانات تتحكم في تنبيه الموقع واقتراحات مساعد التبرع. لا تنشري حالة عاجلة أو عدداً أو مستهدفاً إلا بعد مراجعة الإدارة وتسجيل مصدره. عند النشر، يقترح المساعد مبالغ دقيقة وفق «درجة التوصية» دون أن يؤكد أي تحويل مالي.</p>
        {notice && <p className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${notice.includes("❌") ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`} role="status">{notice}</p>}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="عنوان الأولوية، مثل: الاستعداد للمدارس" className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2" />
          <select value={draft.programId || ""} onChange={(event) => selectProgram(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2"><option value="">اختاري البرنامج المرتبط</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}</select>
          <textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="وصف محدد لما يحتاجه البرنامج أو الحملة" className="min-h-24 rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2 md:col-span-2" />
          <textarea value={draft.reason} onChange={(event) => setDraft({ ...draft, reason: event.target.value })} placeholder="لماذا تُعطى هذه الأولوية الآن؟ يظهر هذا التبرير للمتبرع." className="min-h-20 rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2" />
          <textarea value={draft.sourceNote} onChange={(event) => setDraft({ ...draft, sourceNote: event.target.value })} placeholder="مصدر التحقق الداخلي أو المرجع الإداري (لا يُنشر كاملاً)" className="min-h-20 rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2" />
          <select value={draft.kind} onChange={(event) => setDraft({ ...draft, kind: event.target.value as FirestoreDonationPriority["kind"] })} className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2"><option value="program">احتياج برنامج</option><option value="seasonal">أولوية موسمية</option><option value="urgent">حالة/احتياج عاجل</option></select>
          <select value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as FirestoreDonationPriority["status"] })} className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2"><option value="draft">مسودة داخلية</option><option value="published">منشور للموقع والمساعد</option><option value="closed">مغلق</option></select>
          <label className="text-sm font-bold text-slate-700">درجة التوصية للمساعد (1–100)<input type="number" min="1" max="100" value={draft.recommendationWeight} onChange={(event) => setDraft({ ...draft, recommendationWeight: Number(event.target.value) || 0 })} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2" /></label>
          <label className="text-sm font-bold text-slate-700">المستهدف المالي إن كان معتمداً (اختياري)<input type="number" min="0" value={draft.targetAmount || ""} onChange={(event) => setDraft({ ...draft, targetAmount: Number(event.target.value) || undefined })} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2" /></label>
          <label className="text-sm font-bold text-slate-700">عدد المستفيدين إن كان موثقاً (اختياري)<input type="number" min="0" value={draft.beneficiaryCount || ""} onChange={(event) => setDraft({ ...draft, beneficiaryCount: Number(event.target.value) || undefined })} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2" /></label>
          <input value={draft.beneficiaryLabel || ""} onChange={(event) => setDraft({ ...draft, beneficiaryLabel: event.target.value })} placeholder="وصف العدد، مثل: طالب يحتاج مستلزمات" className="rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2" />
          <label className="text-sm font-bold text-slate-700">ينتهي النشر في (اختياري)<input type="date" value={draft.endsAt || ""} onChange={(event) => setDraft({ ...draft, endsAt: event.target.value })} className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none ring-rose-500 focus:ring-2" /></label>
        </div>
        <div className="mt-5 flex gap-3"><Button onClick={save} disabled={saving} className="flex-1 bg-rose-700 text-white hover:bg-rose-800">{saving ? "جاري الحفظ..." : editingId ? "حفظ التعديلات" : "حفظ الأولوية"}</Button>{editingId && <Button variant="outline" onClick={reset}>إلغاء التعديل</Button>}</div>
      </section>

      {loading ? <div className="rounded-xl bg-white py-10 text-center text-slate-500">جاري تحميل الأولويات...</div> : priorities.length === 0 ? <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center text-slate-500">لا توجد أولويات منشورة أو مسودة بعد. لن يعرض الموقع تنبيهاً أو حالة عاجلة حتى تضيف الإدارة بيانات حقيقية.</div> : <section className="grid gap-4 lg:grid-cols-2">{priorities.map((priority) => <article key={priority.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold text-rose-700">{kindLabels[priority.kind]} · {statusLabels[priority.status]}</p><h3 className="mt-1 text-xl font-black text-slate-900">{priority.title}</h3><p className="mt-1 text-sm text-slate-600">{priority.programName}</p></div><span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-800">وزن {priority.recommendationWeight}</span></div><p className="mt-4 text-sm leading-6 text-slate-700">{priority.description}</p><p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-700"><strong>سبب الأولوية:</strong> {priority.reason}</p>{priority.beneficiaryCount && <p className="mt-2 text-sm text-slate-600">{priority.beneficiaryCount} {priority.beneficiaryLabel || "مستفيداً"}</p>}{priority.targetAmount && <p className="mt-1 text-sm text-slate-600">المستهدف المعتمد: {priority.targetAmount.toLocaleString("ar-EG")} جنيه</p>}<div className="mt-5 flex gap-2"><Button variant="outline" onClick={() => edit(priority)}>تعديل</Button><Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50" onClick={() => priority.id && remove(priority.id)}>حذف</Button></div></article>)}</section>}
    </div>
  );
}
