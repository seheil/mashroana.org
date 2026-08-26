import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Home, Mail, Sprout } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-emerald-50 via-slate-50 to-slate-100 px-4" dir="rtl" aria-labelledby="not-found-title">
      <Card className="w-full max-w-xl border-0 bg-white/90 shadow-xl backdrop-blur-sm">
        <CardContent className="pb-8 pt-8 text-center">
          <div className="mb-6 flex justify-center"><div className="rounded-full bg-amber-50 p-5"><AlertCircle className="h-12 w-12 text-amber-600" aria-hidden="true" /></div></div>
          <p className="text-sm font-black tracking-[0.18em] text-emerald-700">404</p>
          <h1 id="not-found-title" className="mt-2 text-3xl font-black text-slate-900">الصفحة غير متاحة</h1>
          <p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">قد يكون الرابط غير صحيح أو تم نقل الصفحة. يمكنك العودة إلى الرئيسية، أو استكشاف البرامج، أو التواصل مع المؤسسة مباشرة.</p>
          <div id="not-found-button-group" className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button type="button" onClick={() => setLocation("/")} className="gap-2 bg-emerald-700 px-5 py-2.5 font-bold text-white hover:bg-emerald-800"><Home className="h-4 w-4" aria-hidden="true" />العودة للرئيسية</Button>
            <Button type="button" variant="outline" onClick={() => setLocation("/projects")} className="gap-2 border-emerald-700 px-5 py-2.5 font-bold text-emerald-800 hover:bg-emerald-50"><Sprout className="h-4 w-4" aria-hidden="true" />المشاريع والبرامج</Button>
            <Button type="button" variant="outline" onClick={() => setLocation("/contact")} className="gap-2 px-5 py-2.5 font-bold text-slate-700 hover:bg-slate-50"><Mail className="h-4 w-4" aria-hidden="true" />تواصل معنا <ArrowLeft className="h-4 w-4" aria-hidden="true" /></Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
