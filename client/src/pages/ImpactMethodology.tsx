import { Link } from "wouter";

const measurementSteps = [
  { number: "01", title: "تعريف المخرج", text: "نحدد ما الذي تم تقديمه أو إنجازه فعلياً داخل البرنامج، من دون تحويل النية أو الخطة إلى نتيجة منشورة." },
  { number: "02", title: "تحديد الفترة", text: "يرتبط كل مؤشر منشور بفترة زمنية واضحة، حتى لا تختلط النتائج المتراكمة بنتائج حملة أو عام محدد." },
  { number: "03", title: "تسجيل المصدر", text: "نسجل مصدر المعلومة، مثل سجل تنفيذ أو وثيقة مراجعة أو تقرير برنامج، قبل اعتماد الرقم للنشر." },
  { number: "04", title: "المراجعة والنشر", text: "يراجع المسؤول المعتمد السياق والخصوصية قبل النشر، ثم يحدّث المؤشر أو يؤرشفه عند تغير مصدره." },
];

export default function ImpactMethodology() {
  return (
    <div className="min-h-screen bg-[#f8faf7] text-slate-900">
      <section className="bg-gradient-to-bl from-[#123c2c] via-[#18563d] to-emerald-700 px-4 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold tracking-[0.16em] text-emerald-100">منهجية الأثر وجودة البيانات</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">نشر معلومة قابلة للفهم والمراجعة، لا رقم منفصل عن سياقه</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-emerald-50">توضح هذه الصفحة المبادئ التي تعتمدها المؤسسة عند توثيق الأثر ونشره. وهي لا تستبدل التقرير المالي أو التقييم المستقل، ولا تعني أن كل مؤشر جاهز للنشر في كل وقت.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="/transparency" className="rounded-xl bg-white px-5 py-3 font-bold text-[#123c2c]">مركز الشفافية</Link><Link href="/partnerships" className="rounded-xl border border-white/40 px-5 py-3 font-bold text-white hover:bg-white/10">طلب معلومات شراكة</Link></div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-14 px-4 py-16">
        <section className="grid gap-5 md:grid-cols-3" aria-label="مبادئ نشر الأثر">
          <article className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-bold text-emerald-700">المبدأ الأول</p><h2 className="mt-3 text-2xl font-black">لا رقم بلا سياق</h2><p className="mt-3 leading-7 text-slate-600">لا ينشر رقم من دون اسم البرنامج أو النشاط، والفترة، ووصف ما الذي يمثله المؤشر.</p></article>
          <article className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-bold text-emerald-700">المبدأ الثاني</p><h2 className="mt-3 text-2xl font-black">لا أثر بلا مصدر</h2><p className="mt-3 leading-7 text-slate-600">تُحفظ مرجعية داخلية للمصدر قبل اعتماد أي معلومة عامة، ويُراجع الوصف عند تغير المصدر أو نطاقه.</p></article>
          <article className="rounded-2xl bg-white p-6 shadow-sm"><p className="text-sm font-bold text-emerald-700">المبدأ الثالث</p><h2 className="mt-3 text-2xl font-black">لا توثيق على حساب الكرامة</h2><p className="mt-3 leading-7 text-slate-600">لا تُنشر بيانات تعريفية أو صور أو قصص حساسة للمستفيدين لمجرد دعم مؤشر أو مادة إعلامية.</p></article>
        </section>

        <section className="rounded-3xl bg-white p-7 shadow-sm md:p-9" aria-labelledby="measurement-cycle-title">
          <p className="text-sm font-bold tracking-[0.14em] text-emerald-700">دورة اعتماد المؤشر</p>
          <h2 id="measurement-cycle-title" className="mt-2 text-3xl font-black">أربع خطوات قبل ظهور الرقم للجمهور</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {measurementSteps.map((step) => <article key={step.number} className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><p className="font-black text-emerald-700">{step.number}</p><h3 className="mt-3 text-lg font-black">{step.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p></article>)}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-3xl bg-[#153f2e] p-7 text-white md:p-8">
            <p className="font-bold text-emerald-200">قالب المؤشر المعتمد</p>
            <h2 className="mt-3 text-3xl font-black">ما الذي يجب أن يكون معروفاً قبل النشر؟</h2>
            <dl className="mt-6 space-y-4 text-sm leading-7 text-emerald-50"><div><dt className="font-black text-white">اسم المؤشر</dt><dd>مثال وصفي محدد، لا عبارة عامة مثل «أثر كبير».</dd></div><div><dt className="font-black text-white">البرنامج والفترة</dt><dd>المجال الذي يخصه الرقم وتاريخ بدايته ونهايته أو تاريخ آخر تحديث.</dd></div><div><dt className="font-black text-white">طريقة الاحتساب والمصدر</dt><dd>تفسير موجز للمقام أو العدد ووثيقة أو سجل المتابعة المرجعي.</dd></div><div><dt className="font-black text-white">مسؤول الاعتماد</dt><dd>الشخص أو الدور الذي راجع البيانات، دون نشر بياناته الشخصية ما لم تعتمد المؤسسة ذلك.</dd></div></dl>
          </div>
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-7 md:p-8">
            <p className="font-bold text-amber-800">عند عدم اكتمال البيانات</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">نوضح الحالة بدلاً من ملء الفراغ</h2>
            <p className="mt-4 leading-8 text-slate-700">عند غياب مصدر أو فترة تحقق، يظهر المؤشر بوصفه «قيد التوثيق» أو لا يُنشر. لا يُستبدل الرقم بمعدل تقديري ولا يُعاد استخدام مؤشر قديم باعتباره جديداً.</p>
            <p className="mt-5 rounded-xl bg-white/80 p-4 text-sm leading-7 text-slate-700">يمكن للشركاء طلب معلومات إضافية من خلال <Link href="/partnerships" className="font-bold text-emerald-800 underline">نموذج الشراكة</Link>، وتحدد المؤسسة ما يمكن مشاركته وفق خصوصية المستفيدين وسياسة النشر.</p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-7 md:p-9">
          <h2 className="text-3xl font-black">حدود ما يمكن أن تقوله الأرقام</h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-600">قد يوضح المؤشر عدد خدمة أو نشاط تم تنفيذه، لكنه لا يكفي بمفرده لإثبات تغير طويل المدى في حياة المستفيدين. لذلك تفرّق المؤسسة بين المخرجات المباشرة والنتائج الأوسع، وتذكر حدود البيانات عند إعداد التقارير أو المواد الموجهة للجهات المانحة.</p>
        </section>
      </main>
    </div>
  );
}
