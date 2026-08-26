import { Link } from "wouter";

export default function MediaKit() {
  return (
    <div className="min-h-screen bg-[#f8faf7] text-slate-900">
      <section className="bg-gradient-to-bl from-[#123c2c] via-[#18563d] to-emerald-700 px-4 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold tracking-[0.16em] text-emerald-100">الإعلام والهوية المؤسسية</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">حزمة إعلامية تبدأ بالمعلومة الدقيقة والاستخدام المسؤول</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50">توضح هذه الصفحة ما يمكن طلبه من المؤسسة، وما لا يجوز افتراض إتاحته، وقواعد استخدام الاسم والهوية والمواد المرئية قبل أي نشر أو حملة مشتركة.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/media" className="rounded-xl bg-white px-5 py-3 font-bold text-[#123c2c]">مكتبة الوسائط</Link><Link href="/contact" className="rounded-xl border border-white/40 px-5 py-3 font-bold text-white hover:bg-white/10">طلب معلومات إعلامية</Link></div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-14 px-4 py-16">
        <section className="grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-bold text-emerald-700">متاح للمراجعة</p><h2 className="mt-3 text-2xl font-black">تعريف معتمد</h2><p className="mt-3 leading-7 text-slate-600">اسم المؤسسة بالعربية والإنجليزية، وصف موجز للرسالة ومجالات العمل، ووسائل الاتصال الرسمية المتاحة للنشر.</p></article>
          <article className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-bold text-emerald-700">بموافقة مسبقة</p><h2 className="mt-3 text-2xl font-black">شعار ومواد مرئية</h2><p className="mt-3 leading-7 text-slate-600">الملفات الأصلية للشعار أو المواد عالية الدقة لا تُفترض إتاحتها تلقائياً؛ يحدد الفريق الملف والغرض والنطاق وبيان الحقوق قبل التسليم.</p></article>
          <article className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-bold text-emerald-700">غير متاح للعامة</p><h2 className="mt-3 text-2xl font-black">بيانات حساسة</h2><p className="mt-3 leading-7 text-slate-600">لا تُشارك بيانات المستفيدين أو وسائل اتصالهم أو مواد غير معتمدة أو تفاصيل حالة فردية لأغراض إعلامية أو تسويقية.</p></article>
        </section>

        <section className="rounded-3xl bg-white p-7 shadow-sm md:p-9" aria-labelledby="identity-rules-title">
          <p className="text-sm font-bold tracking-[0.14em] text-emerald-700">سياسة الاسم والهوية</p>
          <h2 id="identity-rules-title" className="mt-2 text-3xl font-black">ما الذي يلزم قبل استخدام هوية المؤسسة؟</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><h3 className="font-black">الاستخدام المسموح بعد اعتماد مكتوب</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700"><li>ذكر الاسم الرسمي في مادة تعريفية أو خبر تعاون حقيقي.</li><li>استخدام شعار أو مادة قدمها الفريق للغرض والمدة المتفق عليهما.</li><li>الإشارة إلى شراكة موقعة أو معتمدة بالصياغة التي توافق عليها الأطراف.</li></ul></article>
            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-5"><h3 className="font-black">استخدام غير مسموح دون موافقة</h3><ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700"><li>تعديل الشعار أو دمجه في علامة أخرى أو استعماله كإقرار ضمني.</li><li>القول بوجود تمويل أو اعتماد أو شراكة قبل اتفاق واضح.</li><li>استخدام صور أو فيديوهات من وسائل التواصل أو المكتبة خارج بيان الحقوق المرافق لها.</li></ul></article>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-3xl bg-[#153f2e] p-7 text-white md:p-8"><p className="font-bold text-emerald-200">الوسائط وحماية الكرامة</p><h2 className="mt-3 text-3xl font-black">لا تكون الصورة دليلاً إذا أضرت بمن تظهره</h2><p className="mt-4 leading-8 text-emerald-50">لا تستخدم المؤسسة المادة المرئية لمجرد إثارة العاطفة. يجب احترام الموافقة والخصوصية والسياق وبيان الحقوق، وتجنب تحديد المواقع الدقيقة أو تفاصيل الحالات أو أي صياغة تقلل من كرامة المستفيدين.</p><Link href="/media" className="mt-6 inline-block font-bold text-emerald-200 underline">عرض المواد المنشورة وبياناتها</Link></div>
          <div className="rounded-3xl border border-slate-200 bg-white p-7 md:p-8"><p className="font-bold text-emerald-700">كيف تطلبون مادة أو معلومات؟</p><ol className="mt-5 space-y-4 text-sm leading-7 text-slate-700"><li><strong>1.</strong> وضحوا الجهة والغرض والقناة والموعد المقترح للنشر.</li><li><strong>2.</strong> حددوا المادة أو نوع المعلومات المطلوب ونطاق الاستخدام.</li><li><strong>3.</strong> ينتقي الفريق ما هو متاح ومرخص للنشر ويحدد أي تنويه لازم.</li><li><strong>4.</strong> احصلوا على موافقة مكتوبة قبل استخدام الاسم أو الشعار أو أي مادة غير عامة.</li></ol><Link href="/contact" className="mt-7 inline-block rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white hover:bg-emerald-800">التواصل مع المؤسسة</Link></div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-7 md:p-9"><h2 className="text-3xl font-black">تحديث الحزمة الإعلامية</h2><p className="mt-4 max-w-4xl leading-8 text-slate-600">تُضاف الملفات النهائية، التعريف المعتمد، والسياسات أو البيانات الصحفية إلى هذه الحزمة فقط بعد مراجعتها والموافقة على نشرها. لا تعرض الصفحة حالياً شعاراً أو ملفات تنزيل حتى تعتمد المؤسسة النسخ التي تريد مشاركتها.</p></section>
      </main>
    </div>
  );
}
