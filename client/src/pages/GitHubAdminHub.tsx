export default function GitHubAdminHub() {
  return (
    <div className="min-h-screen bg-[#f8faf7] px-4 py-20 text-slate-900">
      <main className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-bold tracking-[0.16em] text-emerald-700">إدارة المحتوى عبر GitHub</p>
        <h1 className="mt-3 text-4xl font-black leading-tight">لوحة محتوى بلا Firebase</h1>
        <p className="mt-5 leading-8 text-slate-600">تُحفظ التعديلات في ملفات الموقع داخل GitHub، ثم تعيد Vercel بناء الموقع ونشره. لا تحفظ هذه النسخة رسائل الزوار أو بياناتهم في الموقع.</p>
        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 leading-7 text-amber-950"><strong>خطوة ربط واحدة:</strong> بعد رفع هذه النسخة إلى مستودع GitHub وربطها بـ Vercel، افتحي <code className="rounded bg-amber-100 px-1.5 py-0.5" dir="ltr">/cms/</code> وسجّلي الدخول بحساب GitHub المصرّح له. لا تستخدمي المستودع القديم قبل أخذ نسخة احتياطية منه.</div>
        <a href="/cms/" className="mt-8 inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800">فتح لوحة محتوى GitHub</a>
      </main>
    </div>
  );
}
