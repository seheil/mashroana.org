import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { staticSiteContent } from "@/content/static-content";
import type { FirestoreMediaItem } from "@shared/firestore-schemas";

export default function MediaLibrary() {
  const items = staticSiteContent.media.filter((item) => item.status === "published");
  const [category, setCategory] = useState("all");
  const [activeItem, setActiveItem] = useState<FirestoreMediaItem | null>(null);
  const settings = staticSiteContent.settings;
  const activeTriggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeActiveItem = useCallback(() => {
    setActiveItem(null);
    window.setTimeout(() => activeTriggerRef.current?.focus(), 0);
  }, []);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(items.map((item) => item.category).filter(Boolean)))],
    [items]
  );
  const visibleItems = category === "all" ? items : items.filter((item) => item.category === category);

  useEffect(() => {
    if (!activeItem) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeActiveItem();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1']), video[controls]"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeItem, closeActiveItem]);

  return (
    <div className="min-h-screen bg-[#f8faf7] text-slate-900">
      <section className="relative overflow-hidden bg-[#123c2c] px-4 py-20 text-white">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-amber-200/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-bold tracking-[0.16em] text-emerald-200">من أرض الواقع</p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">{settings.mediaHeadline || "مكتبة الأثر المرئي"}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50/90">
            {settings.mediaDescription || "صور وفيديوهات موثقة من برامج المؤسسة، تُعرض مع وصف وسياق يحترم خصوصية المستفيدين وحقوق النشر."}
          </p>
          <Link href="/media-kit" className="mt-6 inline-block rounded-xl border border-white/40 px-4 py-2.5 font-bold text-white hover:bg-white/10">الحزمة الإعلامية وسياسة الاستخدام</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex flex-wrap gap-2" aria-label="تصفية محتوى المكتبة">
          {categories.map((itemCategory) => (
            <button
              key={itemCategory}
              type="button"
              onClick={() => setCategory(itemCategory)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${category === itemCategory ? "bg-emerald-700 text-white shadow-sm" : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-emerald-50"}`}
            >
              {itemCategory === "all" ? "كل المواد" : itemCategory}
            </button>
          ))}
        </div>

        {visibleItems.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-xl font-bold">ستتوفر مواد موثقة قريباً</h2>
            <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">نحن لا نستخدم صوراً تجريبية في مكتبة الأثر. ستظهر هنا المواد التي تعتمد المؤسسة نشرها وتوثق سياقها.</p>
          </div>
        )}
        {visibleItems.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleItems.map((item) => (
              <article key={item.id} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg">
                <button type="button" onClick={(event) => { activeTriggerRef.current = event.currentTarget; setActiveItem(item); }} className="block w-full text-right" aria-label={`فتح ${item.title}`}>
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    {item.kind === "video" ? <iframe src={item.mediaUrl} title={item.title} className="h-full w-full" sandbox="allow-scripts allow-same-origin allow-presentation" /> : <img src={item.mediaUrl} alt={item.altText} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}
                  </div>
                  <div className="p-5">
                    <div className="mb-3 flex items-center justify-between gap-3 text-xs font-bold"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-800">{item.category}</span><span className="text-slate-400">{item.kind === "video" ? "فيديو" : "صورة"}</span></div>
                    <h2 className="text-xl font-black">{item.title}</h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white px-4 py-14">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-3xl bg-emerald-50 p-8 md:grid-cols-[1.3fr_0.7fr] md:items-center">
          <div><h2 className="text-3xl font-black text-[#123c2c]">هل تمثلون شركة أو جهة مانحة؟</h2><p className="mt-3 leading-7 text-slate-700">يمكن لفريقكم الاطلاع على برامجنا ومؤشرات أثرنا ومسار الشراكة، ثم التواصل مباشرة لطلب ملف المؤسسة والوثائق المتاحة.</p></div>
          <Link href="/partnerships" className="rounded-xl bg-[#123c2c] px-5 py-3 text-center font-bold text-white transition hover:bg-[#0b2a1e]">استكشفوا فرص الشراكة</Link>
        </div>
      </section>

      {activeItem && <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeActiveItem(); }}><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="media-dialog-title" aria-describedby="media-dialog-description" className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white"><div className="bg-slate-950">{activeItem.kind === "video" ? <iframe src={activeItem.mediaUrl} title={activeItem.title} className="h-[65vh] w-full" sandbox="allow-scripts allow-same-origin allow-presentation" allowFullScreen /> : <img src={activeItem.mediaUrl} alt={activeItem.altText} className="max-h-[65vh] w-full object-contain" />}</div><div className="p-6"><div className="flex items-start justify-between gap-5"><div><p className="text-sm font-bold text-emerald-700">{activeItem.category}</p><h2 id="media-dialog-title" className="mt-1 text-2xl font-black">{activeItem.title}</h2></div><button ref={closeButtonRef} type="button" onClick={closeActiveItem} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold" aria-label="إغلاق عرض الوسائط">إغلاق</button></div><p id="media-dialog-description" className="mt-4 leading-8 text-slate-700">{activeItem.description}</p>{(activeItem.location || activeItem.capturedAt) && <p className="mt-4 text-sm text-slate-500">{activeItem.location ? `الموقع: ${activeItem.location}` : ""}{activeItem.location && activeItem.capturedAt ? " · " : ""}{activeItem.capturedAt ? `التاريخ: ${activeItem.capturedAt}` : ""}</p>}<p className="mt-3 text-xs leading-5 text-slate-500">حقوق النشر: {activeItem.rightsNote}</p></div></div></div>}
    </div>
  );
}
