import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, ExternalLink, GripVertical, Save } from "lucide-react";
import type { FirestoreHomepageContent, FirestoreNavigationContent, FirestoreSettings, HomepageSectionId } from "@shared/firestore-schemas";
import { HOMEPAGE_SECTION_IDS, HOMEPAGE_SECTION_LABELS, PROTECTED_NAVIGATION_IDS, mergeAboutContent, mergeHomepageContent, mergeNavigationContent } from "@shared/content-studio-defaults";

type StudioProps = {
  settings: FirestoreSettings;
  saving?: boolean;
  onSave: (updates: Pick<FirestoreSettings, "homepage" | "navigation" | "about">) => Promise<void>;
};

const sectionFields: Array<keyof Pick<FirestoreHomepageContent, "programs" | "partnerships" | "media" | "donate">> = ["programs", "partnerships", "media", "donate"];

export default function ContentStudioManager({ settings, saving, onSave }: StudioProps) {
  const [homepage, setHomepage] = useState(() => mergeHomepageContent(settings.homepage));
  const [navigation, setNavigation] = useState(() => mergeNavigationContent(settings.navigation));
  const [about, setAbout] = useState(() => mergeAboutContent(settings.about));
  const [notice, setNotice] = useState("");

  useEffect(() => {
    setHomepage(mergeHomepageContent(settings.homepage));
    setNavigation(mergeNavigationContent(settings.navigation));
    setAbout(mergeAboutContent(settings.about));
  }, [settings.homepage, settings.navigation, settings.about]);

  const editableOrder = useMemo(() => homepage.sectionOrder, [homepage.sectionOrder]);

  const moveSection = (id: HomepageSectionId, direction: -1 | 1) => {
    const next = [...homepage.sectionOrder];
    const currentIndex = next.indexOf(id);
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= next.length) return;
    [next[currentIndex], next[nextIndex]] = [next[nextIndex], next[currentIndex]];
    setHomepage({ ...homepage, sectionOrder: next });
  };

  const moveNav = (id: string, direction: -1 | 1) => {
    const items = [...navigation.items];
    const currentIndex = items.findIndex((item) => item.id === id);
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= items.length) return;
    [items[currentIndex], items[nextIndex]] = [items[nextIndex], items[currentIndex]];
    setNavigation({ ...navigation, items: items.map((item, order) => ({ ...item, order })) });
  };

  const save = async () => {
    const heroComplete = homepage.hero.title?.trim() && homepage.hero.description?.trim() && homepage.hero.primaryCtaLabel?.trim();
    if (!heroComplete) {
      setNotice("أكملي عنوان ووصف وزر الواجهة الرئيسية قبل الحفظ.");
      return;
    }
    if (navigation.items.some((item) => !item.label.trim() || !item.href.startsWith("/"))) {
      setNotice("تأكدي أن لكل رابط اسماً وأنه يبدأ بعلامة /.");
      return;
    }
    setNotice("");
    await onSave({ homepage, navigation, about });
  };

  return (
    <div className="space-y-6 rounded-3xl bg-white p-5 shadow-sm md:p-7">
      <header className="flex flex-col gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-bold text-emerald-700">مركز إدارة المحتوى</p>
          <h2 className="mt-1 text-2xl font-black text-slate-950">الواجهة والأقسام والتنقل</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">حرري ما يراه الزائر مباشرة: العناوين والأوصاف والأزرار وإظهار الأقسام وترتيبها. المحتوى التشغيلي والوثائق والأولويات له تبويباته المتخصصة.</p>
        </div>
        <a href="/" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-200 px-4 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-50"><ExternalLink className="h-4 w-4" />فتح معاينة الموقع</a>
      </header>

      {notice && <div role="alert" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-bold text-amber-900">{notice}</div>}

      <section className="rounded-2xl border border-slate-200 p-5">
        <h3 className="text-lg font-black text-slate-900">واجهة الصفحة الرئيسية</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="md:col-span-2"><span className="mb-1 block text-sm font-bold">الشريط التعريفي الصغير</span><input value={homepage.hero.eyebrow || ""} onChange={(event) => setHomepage({ ...homepage, hero: { ...homepage.hero, eyebrow: event.target.value } })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label>
          <label className="md:col-span-2"><span className="mb-1 block text-sm font-bold">العنوان الرئيسي</span><input value={homepage.hero.title || ""} onChange={(event) => setHomepage({ ...homepage, hero: { ...homepage.hero, title: event.target.value } })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label>
          <label className="md:col-span-2"><span className="mb-1 block text-sm font-bold">الوصف</span><textarea value={homepage.hero.description || ""} onChange={(event) => setHomepage({ ...homepage, hero: { ...homepage.hero, description: event.target.value } })} className="min-h-24 w-full rounded-xl border border-slate-200 px-4 py-3" /></label>
          <label><span className="mb-1 block text-sm font-bold">زر التبرع</span><input value={homepage.hero.primaryCtaLabel || ""} onChange={(event) => setHomepage({ ...homepage, hero: { ...homepage.hero, primaryCtaLabel: event.target.value } })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label>
          <label><span className="mb-1 block text-sm font-bold">زر الشراكات</span><input value={homepage.hero.secondaryCtaLabel || ""} onChange={(event) => setHomepage({ ...homepage, hero: { ...homepage.hero, secondaryCtaLabel: event.target.value } })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label>
          <label><span className="mb-1 block text-sm font-bold">عنوان الرسالة الجانبية</span><input value={homepage.hero.sideLabel || ""} onChange={(event) => setHomepage({ ...homepage, hero: { ...homepage.hero, sideLabel: event.target.value } })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label>
          <label><span className="mb-1 block text-sm font-bold">زر الرسالة الجانبية</span><input value={homepage.hero.sideCtaLabel || ""} onChange={(event) => setHomepage({ ...homepage, hero: { ...homepage.hero, sideCtaLabel: event.target.value } })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label>
          <label className="md:col-span-2"><span className="mb-1 block text-sm font-bold">نص الرسالة الجانبية البارز</span><input value={homepage.hero.sideTitle || ""} onChange={(event) => setHomepage({ ...homepage, hero: { ...homepage.hero, sideTitle: event.target.value } })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label>
          <label className="md:col-span-2"><span className="mb-1 block text-sm font-bold">وصف الرسالة الجانبية</span><textarea value={homepage.hero.sideDescription || ""} onChange={(event) => setHomepage({ ...homepage, hero: { ...homepage.hero, sideDescription: event.target.value } })} className="min-h-20 w-full rounded-xl border border-slate-200 px-4 py-3" /></label>
          <label className="md:col-span-2"><span className="mb-1 block text-sm font-bold">نقاط الثقة — نقطة في كل سطر</span><textarea value={(homepage.hero.trustPoints || []).join("\n")} onChange={(event) => setHomepage({ ...homepage, hero: { ...homepage.hero, trustPoints: event.target.value.split("\n").map((point) => point.trim()).filter(Boolean).slice(0, 4) } })} className="min-h-24 w-full rounded-xl border border-slate-200 px-4 py-3" /></label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 p-5">
        <h3 className="text-lg font-black text-slate-900">الأقسام وترتيب ظهورها</h3>
        <p className="mt-1 text-sm text-slate-600">يمكن إخفاء أي قسم من الواجهة أو تحريك ترتيبه، بما في ذلك صندوق الأولويات. لا تُنشأ أولوية تبرع من هذه البطاقة؛ استخدمي تبويب الأولويات للمحتوى والتواريخ وحالة النشر.</p>
        <div className="mt-4 space-y-3">
          {editableOrder.map((id, index) => {
            const item = homepage[id];
            return <article key={id} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><GripVertical className="h-4 w-4 text-slate-400" /><strong>{HOMEPAGE_SECTION_LABELS[id]}</strong></div><div className="flex items-center gap-2"><button type="button" onClick={() => setHomepage({ ...homepage, [id]: { ...item, enabled: !item.enabled } })} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold">{item.enabled ? <><Eye className="h-4 w-4" />ظاهر</> : <><EyeOff className="h-4 w-4" />مخفي</>}</button><button type="button" aria-label={`تحريك ${HOMEPAGE_SECTION_LABELS[id]} للأعلى`} onClick={() => moveSection(id, -1)} disabled={index === 0} className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"><ArrowUp className="h-4 w-4" /></button><button type="button" aria-label={`تحريك ${HOMEPAGE_SECTION_LABELS[id]} للأسفل`} onClick={() => moveSection(id, 1)} disabled={index === editableOrder.length - 1} className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"><ArrowDown className="h-4 w-4" /></button></div></div>{sectionFields.includes(id as (typeof sectionFields)[number]) && <div className="mt-4 grid gap-3 md:grid-cols-2"><input value={item.eyebrow || ""} onChange={(event) => setHomepage({ ...homepage, [id]: { ...item, eyebrow: event.target.value } })} placeholder="النص الصغير فوق العنوان" className="rounded-lg border border-slate-200 px-3 py-2" /><input value={item.title || ""} onChange={(event) => setHomepage({ ...homepage, [id]: { ...item, title: event.target.value } })} placeholder="العنوان" className="rounded-lg border border-slate-200 px-3 py-2" /><textarea value={item.description || ""} onChange={(event) => setHomepage({ ...homepage, [id]: { ...item, description: event.target.value } })} placeholder="الوصف" className="min-h-20 rounded-lg border border-slate-200 px-3 py-2 md:col-span-2" /><input value={item.ctaLabel || ""} onChange={(event) => setHomepage({ ...homepage, [id]: { ...item, ctaLabel: event.target.value } })} placeholder="نص الزر أو الرابط" className="rounded-lg border border-slate-200 px-3 py-2 md:col-span-2" /></div>}</article>;
          })}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 p-5">
        <h3 className="text-lg font-black text-slate-900">التنقل والتذييل</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2"><label><span className="mb-1 block text-sm font-bold">اسم المؤسسة المختصر</span><input value={navigation.brandShortName} onChange={(event) => setNavigation({ ...navigation, brandShortName: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label><label><span className="mb-1 block text-sm font-bold">زر التبرع</span><input value={navigation.donateLabel} onChange={(event) => setNavigation({ ...navigation, donateLabel: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label><label className="md:col-span-2"><span className="mb-1 block text-sm font-bold">وصف التذييل</span><textarea value={navigation.footerDescription} onChange={(event) => setNavigation({ ...navigation, footerDescription: event.target.value })} className="min-h-20 w-full rounded-xl border border-slate-200 px-4 py-3" /></label></div>
        <div className="mt-5 space-y-3">{navigation.items.map((item, index) => { const protectedItem = PROTECTED_NAVIGATION_IDS.includes(item.id as (typeof PROTECTED_NAVIGATION_IDS)[number]); return <div key={item.id} className="grid gap-3 rounded-xl border border-slate-200 p-3 md:grid-cols-[auto_1fr_1fr_auto]"><button type="button" onClick={() => setNavigation({ ...navigation, items: navigation.items.map((entry) => entry.id === item.id ? { ...entry, enabled: protectedItem ? true : !entry.enabled } : entry) })} disabled={protectedItem} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold disabled:cursor-not-allowed disabled:opacity-60">{item.enabled ? "ظاهر" : "مخفي"}</button><input aria-label={`اسم رابط ${item.label}`} value={item.label} onChange={(event) => setNavigation({ ...navigation, items: navigation.items.map((entry) => entry.id === item.id ? { ...entry, label: event.target.value } : entry) })} className="rounded-lg border border-slate-200 px-3 py-2" /><input aria-label={`مسار رابط ${item.label}`} value={item.href} disabled={protectedItem} onChange={(event) => setNavigation({ ...navigation, items: navigation.items.map((entry) => entry.id === item.id ? { ...entry, href: event.target.value } : entry) })} className="rounded-lg border border-slate-200 px-3 py-2 disabled:bg-slate-100" /><div className="flex gap-1"><button type="button" onClick={() => moveNav(item.id, -1)} disabled={index === 0} className="rounded-lg border border-slate-200 p-2 disabled:opacity-40"><ArrowUp className="h-4 w-4" /></button><button type="button" onClick={() => moveNav(item.id, 1)} disabled={index === navigation.items.length - 1} className="rounded-lg border border-slate-200 p-2 disabled:opacity-40"><ArrowDown className="h-4 w-4" /></button></div></div>; })}</div>
      </section>

      <section className="rounded-2xl border border-slate-200 p-5">
        <h3 className="text-lg font-black text-slate-900">صفحة عن المؤسسة</h3>
        <p className="mt-1 text-sm text-slate-600">عدّلي الرسالة وبطاقات مجالات العمل والنصوص التعريفية. بيانات مجلس الأمناء نفسها تظل معتمدة من المصدر الرسمي ولا تُحرر هنا.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-2"><label className="md:col-span-2"><span className="mb-1 block text-sm font-bold">الرسالة المختصرة</span><input value={about.tagline} onChange={(event) => setAbout({ ...about, tagline: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label><label><span className="mb-1 block text-sm font-bold">عنوان مجالات العمل</span><input value={about.workAreasHeading} onChange={(event) => setAbout({ ...about, workAreasHeading: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label><label><span className="mb-1 block text-sm font-bold">عنوان الحوكمة</span><input value={about.governanceTitle} onChange={(event) => setAbout({ ...about, governanceTitle: event.target.value })} className="w-full rounded-xl border border-slate-200 px-4 py-3" /></label><label className="md:col-span-2"><span className="mb-1 block text-sm font-bold">وصف مجالات العمل</span><textarea value={about.workAreasDescription} onChange={(event) => setAbout({ ...about, workAreasDescription: event.target.value })} className="min-h-20 w-full rounded-xl border border-slate-200 px-4 py-3" /></label></div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">{about.workAreas.map((area, index) => <article key={area.mark} className="rounded-xl bg-slate-50 p-4"><p className="text-sm font-bold text-emerald-700">البطاقة {index + 1}</p><div className="mt-3 grid gap-3"><input value={area.title} aria-label={`عنوان البطاقة ${index + 1}`} onChange={(event) => setAbout({ ...about, workAreas: about.workAreas.map((entry, entryIndex) => entryIndex === index ? { ...entry, title: event.target.value } : entry) })} className="rounded-lg border border-slate-200 px-3 py-2" /><textarea value={area.text} aria-label={`وصف البطاقة ${index + 1}`} onChange={(event) => setAbout({ ...about, workAreas: about.workAreas.map((entry, entryIndex) => entryIndex === index ? { ...entry, text: event.target.value } : entry) })} className="min-h-20 rounded-lg border border-slate-200 px-3 py-2" /></div></article>)}</div>
      </section>

      <button type="button" onClick={save} disabled={saving} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3.5 font-black text-white hover:bg-emerald-800 disabled:opacity-60"><Save className="h-5 w-5" />{saving ? "جاري حفظ التعديلات..." : "حفظ إعدادات الواجهة"}</button>
    </div>
  );
}
