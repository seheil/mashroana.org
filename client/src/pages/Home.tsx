import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, BookOpen, Gift, Phone, MessageCircle } from "lucide-react";
import { DONATION_METHODS } from "@shared/donation-config";
import { useState } from "react";
import { toast } from "sonner";

const STATS = {
  studentCount: 51,
  studentTarget: 100,
  orphanCount: 0,
  orphanTarget: 500,
  familyCount: 0,
  familyTarget: 1000,
  totalBeneficiaries: 51,
  totalBeneficiariesTarget: 2000,
};

const PROJECTS = [
  { id: 1, name: "الإغاثة الدولية", description: "مساعدة الدول المنكوبة", details: "نقدم المساعدات الإنسانية للدول التي تعاني من الأزمات والكوارث", goal: "الوصول إلى 10,000 شخص" },
  { id: 2, name: "تجهيز العرائس", description: "مساعدة الفتيات الفقيرات", details: "تجهيز الفتيات الفقيرات للزواج بكرامة وعفة", goal: "تجهيز 100 عروس سنوياً" },
  { id: 3, name: "كسوة الأعياد", description: "إفراح الأطفال الفقراء", details: "توفير ملابس جديدة للأطفال المحتاجين في الأعياد", goal: "كسوة 5,000 طفل" },
  { id: 4, name: "كفالة الأيتام", description: "رعاية الأطفال الأيتام", details: "توفير الرعاية والتعليم والصحة للأطفال الأيتام", goal: "كفالة 500 يتيم" },
  { id: 5, name: "المجمعات الخيرية", description: "مراكز خدمات متكاملة", details: "إنشاء مراكز تقدم خدمات صحية وتعليمية واجتماعية", goal: "إنشاء 10 مجمعات" },
  { id: 6, name: "زراعة النخيل", description: "مشروع اقتصادي مستدام", details: "زراعة النخيل لتوفير دخل مستدام للأسر الفقيرة", goal: "زراعة 1,000 نخلة" },
];

export default function Home() {
  const [donationForm, setDonationForm] = useState({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    amount: "",
    paymentMethod: "instapay",
    message: "",
  });

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!donationForm.amount || parseFloat(donationForm.amount) <= 0) {
      toast.error("الرجاء إدخال مبلغ صحيح");
      return;
    }

    toast.success("شكراً لتبرعك الكريم!");
    setDonationForm({
      donorName: "",
      donorEmail: "",
      donorPhone: "",
      amount: "",
      paymentMethod: "instapay",
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
          onClick={() => document.getElementById("donate-section")?.scrollIntoView({ behavior: "smooth" })}
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
              onClick={() => document.getElementById("donate-section")?.scrollIntoView({ behavior: "smooth" })}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <BookOpen className="w-6 h-6" />
                  الطالبات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-2">
                  {STATS.studentCount}
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${(STATS.studentCount / STATS.studentTarget) * 100}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-2">من {STATS.studentTarget}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <Users className="w-6 h-6" />
                  الأيتام
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-2">
                  {STATS.orphanCount}
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${(STATS.orphanCount / STATS.orphanTarget) * 100}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-2">من {STATS.orphanTarget}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <Heart className="w-6 h-6" />
                  الأسر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-2">
                  {STATS.familyCount}
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${(STATS.familyCount / STATS.familyTarget) * 100}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-2">من {STATS.familyTarget}</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <Gift className="w-6 h-6" />
                  المستفيدون
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-white mb-2">
                  {STATS.totalBeneficiaries}
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${(STATS.totalBeneficiaries / STATS.totalBeneficiariesTarget) * 100}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-2">من {STATS.totalBeneficiariesTarget}</p>
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
            {PROJECTS.map((project) => (
              <Card key={project.id} className="bg-slate-700 border-slate-600 hover:border-emerald-500 transition">
                <CardHeader>
                  <CardTitle className="text-emerald-400">{project.name}</CardTitle>
                  <CardDescription className="text-slate-400">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">{project.details}</p>
                  <div className="text-sm text-emerald-400">
                    الهدف: {project.goal}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate-section" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-400">تبرع الآن</h2>
          
          <form onSubmit={handleDonationSubmit} className="bg-slate-700 p-8 rounded-lg mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="اسمك (اختياري)"
                value={donationForm.donorName}
                onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })}
                className="bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="بريدك الإلكتروني (اختياري)"
                value={donationForm.donorEmail}
                onChange={(e) => setDonationForm({ ...donationForm, donorEmail: e.target.value })}
                className="bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="tel"
                placeholder="رقم الهاتف (اختياري)"
                value={donationForm.donorPhone}
                onChange={(e) => setDonationForm({ ...donationForm, donorPhone: e.target.value })}
                className="bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:border-emerald-500 focus:outline-none"
              />
              <input
                type="number"
                placeholder="المبلغ (بالجنيه)"
                value={donationForm.amount}
                onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })}
                className="bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <select
              value={donationForm.paymentMethod}
              onChange={(e) => setDonationForm({ ...donationForm, paymentMethod: e.target.value })}
              className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:border-emerald-500 focus:outline-none mb-4"
            >
              <option value="instapay">InstaPay</option>
              <option value="vodafone_cash">Vodafone Cash</option>
              <option value="etisalat_cash">Etisalat Cash</option>
              <option value="orange_cash">Orange Cash</option>
              <option value="bank_transfer">تحويل بنكي</option>
            </select>

            <textarea
              placeholder="رسالة (اختيارية)"
              value={donationForm.message}
              onChange={(e) => setDonationForm({ ...donationForm, message: e.target.value })}
              className="w-full bg-slate-600 text-white px-4 py-2 rounded border border-slate-500 focus:border-emerald-500 focus:outline-none mb-4"
              rows={3}
            />

            <Button 
              type="submit" 
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              تبرع الآن
            </Button>
          </form>

          {/* Payment Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-emerald-400">المحافظ الإلكترونية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(DONATION_METHODS.wallets).map(([key, wallet]) => (
                  <div key={key} className="text-slate-300">
                    <p className="font-semibold">{wallet.name}</p>
                    <p className="text-sm text-slate-400">{wallet.number}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="text-emerald-400">التحويل البنكي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(DONATION_METHODS.bankTransfer).map(([key, value]) => (
                  <div key={key} className="text-slate-300">
                    <p className="font-semibold text-sm">{key}</p>
                    <p className="text-sm text-slate-400">{value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-400">تواصل معنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-700 border-slate-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <Phone className="w-6 h-6" />
                  الواتساب
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {DONATION_METHODS.whatsapp.map((number: string) => (
                  <a 
                    key={number}
                    href={`https://wa.me/${number.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-emerald-400 hover:text-emerald-300 transition"
                  >
                    {number}
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
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
                  className="text-emerald-400 hover:text-emerald-300 transition"
                >
                  قناة مشروعنا إلى الجنة
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
