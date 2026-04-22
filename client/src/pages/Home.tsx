import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Gift, Phone, MessageCircle, ExternalLink, Zap, Leaf, Building2, Sprout } from "lucide-react";
import { DONATION_METHODS, PROJECTS_DATA, STATISTICS } from "@shared/donation-config";
import { useState } from "react";
import { toast } from "sonner";
import { GardenCanvas } from "@/components/GardenCanvas";
import { HarvestDashboard } from "@/components/HarvestDashboard";
import { motion } from "framer-motion";

export default function Home() {
  const [donationForm, setDonationForm] = useState({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    amount: "",
    message: "",
  });
  const [showHarvest, setShowHarvest] = useState(false);

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

  const getProjectIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      Heart: <Heart className="w-6 h-6" />,
      Gift: <Gift className="w-6 h-6" />,
      Users: <Users className="w-6 h-6" />,
      Building2: <Building2 className="w-6 h-6" />,
      Leaf: <Leaf className="w-6 h-6" />,
    };
    return icons[iconName] || <Heart className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white" dir="rtl">
      {/* Sticky Donate Button */}
      <div className="fixed bottom-8 left-8 z-40 flex flex-col gap-3">
        <Button 
          size="lg" 
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg"
          onClick={() => window.open(DONATION_METHODS.instapay_link, "_blank")}
        >
          <Heart className="w-5 h-5 ml-2" />
          تبرع الآن
        </Button>
        <Button 
          size="lg" 
          className="bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg"
          onClick={() => setShowHarvest(true)}
        >
          <Sprout className="w-5 h-5 ml-2" />
          حصادك
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

      {/* Garden Canvas Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-800/50 to-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-center text-emerald-400">🌳 بستاننا الرقمي الحي</h2>
          <p className="text-center text-slate-300 mb-12 max-w-2xl mx-auto">
            كل تبرع يضيف عنصراً جديداً إلى بستاننا - نخلة جديدة، بئر ماء، أو زهرة أمل
          </p>
          <GardenCanvas />
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
                  الأسر المساعدة
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
            {PROJECTS_DATA.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`bg-gradient-to-br ${project.isSpecial ? 'from-amber-600 to-orange-700' : 'from-slate-700 to-slate-800'} border-emerald-500/30 hover:border-emerald-500/60 transition h-full flex flex-col`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-4xl">{getProjectIcon(project.icon || 'Heart')}</div>
                    </div>
                    <CardTitle className="text-xl text-white">{project.name}</CardTitle>
                    <CardDescription className="text-emerald-200">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-slate-300 mb-4 flex-1">{project.details}</p>
                    
                    {project.hasProgressBar && (
                      <div className="mb-4">
                        <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                          <div 
                            className="bg-emerald-400 h-2 rounded-full" 
                            style={{ width: `${(project.current! / project.target!) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-400">
                          {project.current?.toLocaleString()} / {project.target?.toLocaleString()} جنيه
                        </p>
                      </div>
                    )}
                    
                    <p className="text-sm font-semibold text-emerald-300 mb-4">{project.goal}</p>
                    
                    <Button 
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                      onClick={() => window.open(DONATION_METHODS.instapay_link, "_blank")}
                    >
                      <Heart className="w-4 h-4 ml-2" />
                      تبرع الآن
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-400">📸 إنجازاتنا من الواقع</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-slate-700 to-slate-800 border-emerald-500/30 overflow-hidden hover:border-emerald-500/60 transition">
                  <div className="w-full h-48 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <span className="text-6xl">🎯</span>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-emerald-400 mb-2">إنجاز {i}</h3>
                    <p className="text-slate-300 text-sm">قصة نجاح من مشاريعنا الخيرية</p>
                    <p className="text-xs text-slate-400 mt-2">* سيتم إضافة الصور الفعلية قريباً</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-emerald-400">تبرع الآن</h2>
          
          {/* Payment Methods */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-emerald-300 mb-6">طرق الدفع المتاحة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-0 cursor-pointer hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="text-3xl mb-2">📱</div>
                  <h4 className="text-white font-bold mb-2">InstaPay</h4>
                  <p className="text-blue-100 text-sm mb-4">تحويل فوري وآمن</p>
                  <Button 
                    className="w-full bg-white text-blue-600 hover:bg-blue-50"
                    onClick={() => window.open(DONATION_METHODS.instapay_link, "_blank")}
                  >
                    تبرع عبر InstaPay
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-600 to-green-700 border-0 cursor-pointer hover:shadow-lg transition">
                <CardContent className="p-6">
                  <div className="text-3xl mb-2">💰</div>
                  <h4 className="text-white font-bold mb-2">فودافون كاش</h4>
                  <p className="text-green-100 text-sm mb-4">{DONATION_METHODS.vodafone_cash}</p>
                  <Button 
                    className="w-full bg-white text-green-600 hover:bg-green-50"
                    onClick={() => {
                      toast.success(`رقم فودافون كاش: ${DONATION_METHODS.vodafone_cash}`);
                      navigator.clipboard.writeText(DONATION_METHODS.vodafone_cash);
                    }}
                  >
                    نسخ الرقم
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Donation Form */}
          <form onSubmit={handleDonationSubmit} className="bg-slate-800/50 rounded-lg p-6 border border-emerald-500/30">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="اسمك (اختياري)"
                value={donationForm.donorName}
                onChange={(e) => setDonationForm({...donationForm, donorName: e.target.value})}
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="email"
                placeholder="بريدك الإلكتروني (اختياري)"
                value={donationForm.donorEmail}
                onChange={(e) => setDonationForm({...donationForm, donorEmail: e.target.value})}
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="tel"
                placeholder="رقم الهاتف (اختياري)"
                value={donationForm.donorPhone}
                onChange={(e) => setDonationForm({...donationForm, donorPhone: e.target.value})}
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="number"
                placeholder="المبلغ (بالجنيه)"
                value={donationForm.amount}
                onChange={(e) => setDonationForm({...donationForm, amount: e.target.value})}
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <textarea
                placeholder="رسالة (اختيارية)"
                value={donationForm.message}
                onChange={(e) => setDonationForm({...donationForm, message: e.target.value})}
                className="w-full bg-slate-700 text-white placeholder-slate-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none h-24"
              />
              <Button 
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3"
              >
                <Heart className="w-5 h-5 ml-2" />
                تبرع عبر InstaPay
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-emerald-400">تواصل معنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href={`https://wa.me/${DONATION_METHODS.whatsapp.replace(/^0/, '20')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-green-600 to-green-700 p-8 rounded-lg hover:shadow-lg transition"
            >
              <MessageCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">الواتساب</h3>
              <p className="text-green-100">{DONATION_METHODS.whatsapp}</p>
            </a>
            <a
              href="https://t.me/mshro3nallgana"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-lg hover:shadow-lg transition"
            >
              <ExternalLink className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">التيليجرام</h3>
              <p className="text-blue-100">قناة مشروعنا إلى الجنة</p>
            </a>
          </div>
        </div>
      </section>

      {/* Harvest Dashboard Modal */}
      <HarvestDashboard isOpen={showHarvest} onClose={() => setShowHarvest(false)} />
    </div>
  );
}
