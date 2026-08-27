import { useEffect, useState } from "react";
import { Link } from "wouter";
import { foundationData } from "@/../../shared/foundation-data";
import { staticSiteContent } from "@/content/static-content";
import { mergeAboutContent } from "@shared/content-studio-defaults";

export default function About() {
  const settings = staticSiteContent.settings;
  const about = mergeAboutContent(settings.about);

  return (
    <div className="min-h-screen bg-[#fbfcf9] text-slate-900">
      <section className="bg-[#123c2c] px-4 py-20 text-white"><div className="mx-auto max-w-6xl"><p className="text-sm font-bold tracking-[0.16em] text-emerald-200">من نحن</p><h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">{settings.aboutHeadline || "مؤسسة تعمل بروح العطاء، وبمنهج يقدّر الثقة والدليل."}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50/90">{settings.aboutDescription || `${foundationData.name} هي مؤسسة خيرية تسعى لخدمة المجتمع عبر برامج إنسانية وتنموية، وبناء شراكات تساعد على الوصول إلى أثر مسؤول وقابل للمتابعة.`}</p></div></section>
      <main className="mx-auto max-w-6xl space-y-16 px-4 py-16">
      <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-start"><div><p className="font-bold text-emerald-700">رسالتنا</p><h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">{about.tagline}</h2><p className="mt-5 whitespace-pre-line leading-8 text-slate-700">{settings.aboutMission || "نركز على جعل التبرع والتعاون مساراً عملياً: برنامج واضح، وفئة مستفيدة محددة، وتوثيق مناسب، وتواصل صريح مع أصحاب المصلحة. ولا نستبدل هذا الالتزام بأرقام أو قصص غير موثقة."}</p></div><aside className="rounded-3xl border border-emerald-100 bg-emerald-50 p-7"><p className="text-sm font-bold text-emerald-700">التزامنا العلني</p><p className="mt-4 whitespace-pre-line leading-8 text-slate-700">{settings.aboutCommitments || "نشر ما توافق المؤسسة على مشاركته من معلومات ووثائق.\nاحترام خصوصية المستفيدين في كل مادة مرئية أو قصة أثر.\nتوجيه الشركاء إلى بيانات البرنامج والمؤشرات المتاحة.\nتحديث المحتوى والبرامج من لوحة عمليات موحدة."}</p></aside></section>
        <section><div className="max-w-3xl"><p className="font-bold text-emerald-700">مجالات العمل</p><h2 className="mt-3 text-3xl font-black">{about.workAreasHeading}</h2><p className="mt-3 leading-7 text-slate-600">{about.workAreasDescription}</p></div><div className="mt-8 grid gap-5 md:grid-cols-2">{about.workAreas.map((area) => <article key={area.mark} className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100"><span className="text-sm font-black text-emerald-700">{area.mark}</span><h3 className="mt-4 text-xl font-black">{area.title}</h3><p className="mt-3 leading-7 text-slate-600">{area.text}</p></article>)}</div></section>
        <section className="grid gap-8 rounded-3xl bg-slate-950 p-8 text-white md:grid-cols-2"><div><p className="font-bold text-emerald-300">الحوكمة والثقة</p><h2 className="mt-3 text-3xl font-black">{about.governanceTitle}</h2></div><div className="leading-8 text-slate-200">{about.governanceDescription}</div></section>
        <section className="grid gap-8 md:grid-cols-2"><div className="rounded-3xl border border-slate-200 bg-white p-8"><h2 className="text-2xl font-black">مجلس الأمناء</h2><p className="mt-3 leading-7 text-slate-600">{about.boardIntro}</p><div className="mt-6 space-y-3">{foundationData.boardMembers.map((member: { name: string; position: string }) => <div key={member.name} className="rounded-xl bg-slate-50 p-4"><p className="font-bold">{member.name}</p><p className="mt-1 text-sm text-emerald-800">{member.position}</p></div>)}</div></div><div className="rounded-3xl bg-[#eaf4eb] p-8"><h2 className="text-2xl font-black text-[#123c2c]">{about.institutionalContactTitle}</h2><p className="mt-3 leading-7 text-slate-700">{about.institutionalContactDescription}</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/partnerships" className="rounded-xl bg-[#123c2c] px-5 py-3 font-bold text-white">{about.partnershipCtaLabel}</Link><Link href="/transparency" className="rounded-xl border border-[#123c2c] px-5 py-3 font-bold text-[#123c2c]">{about.transparencyCtaLabel}</Link></div></div></section>
      </main>
    </div>
  );
}
