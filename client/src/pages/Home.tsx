import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, BookOpen, Gift, Phone, MessageCircle, ExternalLink, Zap } from "lucide-react";
import { DONATION_METHODS, PROJECTS_DATA, STATISTICS } from "@shared/donation-config";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [donationForm, setDonationForm] = useState({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    amount: "",
    message: "",
  });

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donationForm.amount || parseFloat(donationForm.amount) <= 0) {
      toast.error("الرجاء إدخال مبلغ صحيح");
      return;
    }

    // فتح InstaPay مباشرة
    window.open(DONATION_METHODS.instapay_link, "_blank");
    toast.success("تم فتح InstaPay - شكراً لتبرعك الكريم!");
    
    setDonationForm({
      donorName: "",
      donorEmail: "",
      donorPhone: "",
      amount: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white" dir="rtl">
      {/* Sticky Donate Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <Button 
          size="lg" 
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg"
          onClick={() => window.open(DONATION_METHODS.instapay_link, "_blank")}
        >
          <Heart className="w-5 h-5 ml-2" />
          تبرع الآن
        </Button>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-emerald-400">
            مؤسسة مشروعنا إلى الجنة
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-emerald-300">
            للأعمال الخيرية
          </h2>
          <p className="text-2xl md:text-3xl mb-12 text-emerald-200 font-light">
            خطوتك نحو الجنة تبدأ من هنا
          </p>
          <p className="text-lg md:text-xl mb-12 text-slate-300 leading-relaxed">
            نعمل على نشر الخير والعطف في المجتمع من خلال مشاريع خيرية متنوعة تهدف إلى تحسين حياة المحتاجين والمستضعفين
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
              onClick={() => window.open(DONATION_METHODS.instapay_link, "_blank")}
            >
              <Heart className="w-5 h-5 ml-2" />
              تبرع الآن
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-emerald-400 text-emerald-400 hover:bg-emerald-400/10"
              onClick={() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              <MessageCircle className="w-5 h-5 ml-2" />
              تواصل معنا
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-400">إحصائياتنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-slate-700 to-slate-800 border-emerald-500/30 hover:border-emerald-500/60 transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <Users className="w-6 h-6" />
                  الأيتام المكفولون
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-2">
                  {STATISTICS.orphans.current}
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${(STATISTICS.orphans.current / STATISTICS.orphans.target) * 100}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-2">من {STATISTICS.orphans.target}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-700 to-slate-800 border-emerald-500/30 hover:border-emerald-500/60 transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <Heart className="w-6 h-6" />
                  الأسر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-2">
                  {STATISTICS.families.current}
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${(STATISTICS.families.current / STATISTICS.families.target) * 100}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-2">من {STATISTICS.families.target}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-700 to-slate-800 border-emerald-500/30 hover:border-emerald-500/60 transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <Gift className="w-6 h-6" />
                  المستفيدون
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-2">
                  {STATISTICS.totalBeneficiaries.current}
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${(STATISTICS.totalBeneficiaries.current / STATISTICS.totalBeneficiaries.target) * 100}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-2">من {STATISTICS.totalBeneficiaries.target}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-400">مشاريعنا الخيرية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS_DATA.map((project) => (
              <Card 
                key={project.id} 
                className={`bg-gradient-to-br border-emerald-500/30 hover:border-emerald-500/60 transition overflow-hidden ${
                  project.isSpecial 
                    ? "from-emerald-900/20 to-slate-800 lg:col-span-2" 
                    : "from-slate-700 to-slate-800"
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-emerald-400 text-xl">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-300">{project.details}</p>
                  
                  {project.hasProgressBar ? (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-emerald-400 font-semibold">السهم: 1000 جنيه</span>
                        <span className="text-slate-400">
                          {project.current?.toLocaleString('ar-EG')} / {project.target?.toLocaleString('ar-EG')}
                        </span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all" 
                          style={{ width: `${((project.current || 0) / (project.target || 1)) * 100}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-400">
                        {Math.round(((project.current || 0) / (project.target || 1)) * 100)}% من الهدف
                      </p>
                      <div className="bg-slate-700/50 p-4 rounded-lg mt-4 space-y-2">
                        <p className="text-emerald-300 font-semibold">🤍 شارك في الخير الدائم:</p>
                        <ul className="text-slate-300 text-sm space-y-1">
                          <li>⛔ صدقة جارية في بناء مسجد</li>
                          <li>⛔ مركز طبي لعلاج المرضى</li>
                          <li>⛔ مؤسسة خيرية وتجهيز العرائس</li>
                          <li>⛔ مشغل للنساء الأرامل والمطلقات</li>
                          <li>⛔ مكان تعليم علوم شرعية</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="text-emerald-400 font-semibold">{project.goal}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-400">إنجازاتنا من الواقع</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-gradient-to-br from-slate-700 to-slate-800 border-emerald-500/30 overflow-hidden hover:border-emerald-500/60 transition">
                <div className="w-full h-48 bg-gradient-to-br from-emerald-500/20 to-slate-700 flex items-center justify-center">
                  <div className="text-center">
                    <Gift className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
                    <p className="text-slate-400">صورة الإنجاز #{i}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-emerald-400 font-bold mb-2">إنجاز {i}</h3>
                  <p className="text-slate-300 text-sm">قصة نجاح من مشاريعنا الخيرية</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-slate-400 mt-8">* سيتم إضافة صور الإنجازات الفعلية قريباً</p>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate-section" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-400">تبرع الآن</h2>
          
          <div className="space-y-6">
            {/* Quick Donate Button */}
            <Button 
              size="lg"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white text-lg py-6"
              onClick={() => window.open(DONATION_METHODS.instapay_link, "_blank")}
            >
              <Zap className="w-6 h-6 ml-2" />
              تبرع عبر InstaPay مباشرة
            </Button>

            {/* Donation Form */}
            <form onSubmit={handleDonationSubmit} className="bg-slate-700/50 p-6 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="اسمك (اختياري)"
                  value={donationForm.donorName}
                  onChange={(e) => setDonationForm({...donationForm, donorName: e.target.value})}
                  className="bg-slate-600 text-white placeholder-slate-400 rounded px-4 py-2 border border-slate-500 focus:border-emerald-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="بريدك الإلكتروني (اختياري)"
                  value={donationForm.donorEmail}
                  onChange={(e) => setDonationForm({...donationForm, donorEmail: e.target.value})}
                  className="bg-slate-600 text-white placeholder-slate-400 rounded px-4 py-2 border border-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="رقم الهاتف (اختياري)"
                  value={donationForm.donorPhone}
                  onChange={(e) => setDonationForm({...donationForm, donorPhone: e.target.value})}
                  className="bg-slate-600 text-white placeholder-slate-400 rounded px-4 py-2 border border-slate-500 focus:border-emerald-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="المبلغ (بالجنيه)"
                  value={donationForm.amount}
                  onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})}
                  className="bg-slate-600 text-white placeholder-slate-400 rounded px-4 py-2 border border-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <textarea
                placeholder="رسالة (اختيارية)"
                value={donationForm.message}
                onChange={(e) => setDonationForm({...donationForm, message: e.target.value})}
                rows={3}
                className="w-full bg-slate-600 text-white placeholder-slate-400 rounded px-4 py-2 border border-slate-500 focus:border-emerald-500 focus:outline-none"
              />

              <Button 
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <ExternalLink className="w-5 h-5 ml-2" />
                تبرع عبر InstaPay
              </Button>
            </form>

            {/* Payment Methods */}
            <div className="bg-slate-700 p-6 rounded-lg">
              <h3 className="text-emerald-400 font-bold mb-4">طرق الدفع المتاحة</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <p className="text-slate-300"><span className="font-semibold">InstaPay:</span> {DONATION_METHODS.instapay_number}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-400">تواصل معنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-700 to-slate-800 border-emerald-500/30 hover:border-emerald-500/60 transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <Phone className="w-6 h-6" />
                  الواتساب
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href={`https://wa.me/${DONATION_METHODS.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-2"
                >
                  {DONATION_METHODS.whatsapp}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-700 to-slate-800 border-emerald-500/30 hover:border-emerald-500/60 transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <MessageCircle className="w-6 h-6" />
                  التيليجرام
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://t.me/mshro3nallgana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-2"
                >
                  قناة مشروعنا إلى الجنة
                  <ExternalLink className="w-4 h-4" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8 px-4 text-center text-slate-400">
        <p>جميع الحقوق محفوظة © 2026 مؤسسة مشروعنا إلى الجنة للأعمال الخيرية</p>
      </footer>
    </div>
  );
}
