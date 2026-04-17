import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart, Users, BookOpen, Handshake, Gift, Leaf, MessageSquare, Phone, Send, Copy, Check } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import { PAYMENT_METHODS, CONTACT_NUMBERS, SOCIAL_LINKS } from '@shared/donation-config';

const PROJECTS = [
  {
    id: 'international_relief',
    name: 'الإغاثة الدولية',
    description: 'دعم المتضررين في غزة والسودان واليمن',
    icon: '🌍',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'bride_preparation',
    name: 'تجهيز العرائس',
    description: 'دعم الفتيات اليتيمات في تجهيزهن',
    icon: '💍',
    color: 'from-pink-500 to-rose-500',
  },
  {
    id: 'holiday_clothing',
    name: 'كسوة الأعياد والمواسم',
    description: 'توفير الملابس والهدايا في المناسبات',
    icon: '👗',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'orphan_sponsorship',
    name: 'كفالة الأيتام',
    description: 'رعاية صحية وتعليمية ومعيشية شاملة',
    icon: '👶',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'charitable_complexes',
    name: 'المجمعات الخيرية',
    description: 'بناء وتطوير المنشآت الخدمية',
    icon: '🏢',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'palm_planting',
    name: 'زراعة النخيل',
    description: 'صدقات جارية من خلال الزراعة',
    icon: '🌴',
    color: 'from-amber-500 to-yellow-500',
  },
];

const CONTACT_NUMBERS_LIST = [
  CONTACT_NUMBERS.whatsapp1,
  CONTACT_NUMBERS.whatsapp2,
  CONTACT_NUMBERS.whatsapp3,
];

export default function Home() {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [donationForm, setDonationForm] = useState({
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    amount: '',
    paymentMethod: 'instapay' as const,
    message: '',
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { data: stats } = trpc.statistics.get.useQuery();
  const { data: projects } = trpc.projects.list.useQuery();
  const createDonation = trpc.donations.create.useMutation();
  const createContact = trpc.contact.create.useMutation();

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationForm.amount) {
      toast.error('يرجى إدخال المبلغ');
      return;
    }
    
    try {
      await createDonation.mutateAsync({
        ...donationForm,
        amount: parseFloat(donationForm.amount),
      });
      toast.success('شكراً لتبرعك! سيتم التواصل معك قريباً');
      setShowDonationModal(false);
      setDonationForm({
        donorName: '',
        donorEmail: '',
        donorPhone: '',
        amount: '',
        paymentMethod: 'instapay',
        message: '',
      });
    } catch (error) {
      toast.error('حدث خطأ في معالجة التبرع');
    }
  };

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createContact.mutateAsync(contactForm);
      toast.success('تم إرسال رسالتك بنجاح!');
      setShowContactModal(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error('حدث خطأ في إرسال الرسالة');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white" dir="rtl">
      {/* Sticky Donation Button */}
      <div className="fixed bottom-8 left-8 z-40">
        <Button
          onClick={() => setShowDonationModal(true)}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full px-8 py-6 text-lg shadow-2xl animate-pulse"
        >
          <Heart className="ml-2 h-5 w-5" />
          تبرع الآن
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            مؤسسة مشروعنا إلى الجنة
          </h1>
          <p className="text-2xl md:text-3xl text-emerald-300 mb-8 font-semibold">
            خطوتك نحو الجنة تبدأ من هنا
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            نعمل على نشر الخير والعطف في المجتمع من خلال مشاريع خيرية متنوعة تهدف إلى تحسين حياة المحتاجين
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowDonationModal(true)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-lg"
            >
              <Heart className="ml-2 h-5 w-5" />
              تبرع الآن
            </Button>
            <Button
              onClick={() => setShowContactModal(true)}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-6 text-lg rounded-lg"
            >
              <MessageSquare className="ml-2 h-5 w-5" />
              تواصل معنا
            </Button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">إحصائياتنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Students */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{stats?.studentCount || 51}</h3>
              <p className="text-gray-600 mb-4">طالبة بالمعهد</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${((stats?.studentCount || 51) / (stats?.studentTarget || 100)) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">من {stats?.studentTarget || 100}</p>
            </Card>

            {/* Orphans */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{stats?.orphanCount || 0}</h3>
              <p className="text-gray-600 mb-4">يتيم مرعي</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-pink-600 h-2 rounded-full"
                  style={{ width: `${((stats?.orphanCount || 0) / (stats?.orphanTarget || 500)) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">من {stats?.orphanTarget || 500}</p>
            </Card>

            {/* Families */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{stats?.familyCount || 0}</h3>
              <p className="text-gray-600 mb-4">أسرة مرعية</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${((stats?.familyCount || 0) / (stats?.familyTarget || 1000)) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">من {stats?.familyTarget || 1000}</p>
            </Card>

            {/* Total Beneficiaries */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">{stats?.totalBeneficiaries || 51}</h3>
              <p className="text-gray-600 mb-4">مستفيد سنوياً</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-emerald-600 h-2 rounded-full"
                  style={{ width: `${((stats?.totalBeneficiaries || 51) / (stats?.totalBeneficiariesTarget || 2000)) * 100}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">من {stats?.totalBeneficiariesTarget || 2000}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Institute Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">المعهد العلمي</h2>
          
          <Card className="p-12 border-2 border-blue-200">
            <div className="flex items-start gap-6 mb-8">
              <div className="bg-blue-100 rounded-full p-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">نظام الثماني سنوات</h3>
                <p className="text-gray-600 text-lg">
                  برنامج تعليمي متكامل يهدف إلى تخريج كوادر علمية متخصصة وداعيات المستقبل
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">الأهداف</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ تعليم العلوم الشرعية الأساسية</li>
                  <li>✓ تطوير مهارات البحث العلمي</li>
                  <li>✓ إعداد داعيات مؤهلات</li>
                  <li>✓ بناء شخصية إسلامية قوية</li>
                </ul>
              </div>

              <div className="bg-emerald-50 p-6 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-3">المميزات</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ منهج شامل ومتطور</li>
                  <li>✓ كوادر تعليمية متخصصة</li>
                  <li>✓ بيئة تعليمية محفزة</li>
                  <li>✓ متابعة مستمرة للطالبات</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-lg text-center">
              <p className="text-lg font-semibold mb-2">تكلفة كفالة الطالب</p>
              <p className="text-4xl font-bold">1200 جنيه</p>
              <p className="text-sm mt-2 opacity-90">تشمل الكتب والمصاحف والمستلزمات التعليمية</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">أعمالنا ومشاريعنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project) => (
              <Card
                key={project.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className={`bg-gradient-to-r ${project.color} h-32 flex items-center justify-center text-6xl`}>
                  {project.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{project.name}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Button
                    onClick={() => setShowDonationModal(true)}
                    variant="outline"
                    className="w-full"
                  >
                    تبرع لهذا المشروع
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">تواصل معنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-2xl font-bold mb-8">طرق التواصل</h3>
              
              <div className="space-y-6">
                {/* WhatsApp Numbers */}
                <div>
                  <p className="text-emerald-300 font-semibold mb-4 flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    أرقام الواتساب
                  </p>
                  <div className="space-y-2">
                    {CONTACT_NUMBERS_LIST.map((number) => (
                      <a
                        key={number}
                        href={`https://wa.me/20${number.slice(1)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block bg-emerald-600 hover:bg-emerald-700 p-3 rounded-lg text-center transition-colors"
                      >
                        {number}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Telegram */}
                <div>
                  <p className="text-blue-300 font-semibold mb-4">قناة التيليجرام</p>
                  <a
                    href={SOCIAL_LINKS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-center transition-colors"
                  >
                    @mshro3nallgana
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-bold mb-8">أرسل لنا رسالة</h3>
              <Button
                onClick={() => setShowContactModal(true)}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 text-lg"
              >
                <Send className="ml-2 h-5 w-5" />
                فتح نموذج التواصل
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-8 px-4 text-center border-t border-slate-800">
        <p>© 2024 مؤسسة مشروعنا إلى الجنة للأعمال الخيرية. جميع الحقوق محفوظة.</p>
        {user?.role === 'admin' && (
          <Button
            onClick={() => navigate('/admin')}
            variant="outline"
            className="mt-4"
          >
            لوحة التحكم
          </Button>
        )}
      </footer>

      {/* Donation Modal */}
      <Dialog open={showDonationModal} onOpenChange={setShowDonationModal}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>تبرع الآن</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleDonation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">الاسم (اختياري)</label>
              <Input
                placeholder="اسمك الكريم"
                value={donationForm.donorName}
                onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">البريد الإلكتروني (اختياري)</label>
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={donationForm.donorEmail}
                onChange={(e) => setDonationForm({ ...donationForm, donorEmail: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">رقم الهاتف (اختياري)</label>
              <Input
                placeholder="رقم هاتفك"
                value={donationForm.donorPhone}
                onChange={(e) => setDonationForm({ ...donationForm, donorPhone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">المبلغ (جنيه) *</label>
              <Input
                type="number"
                placeholder="المبلغ المراد التبرع به"
                value={donationForm.amount}
                onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">طريقة الدفع</label>
              <select
                className="w-full border rounded-md p-2"
                value={donationForm.paymentMethod}
                onChange={(e) => setDonationForm({ ...donationForm, paymentMethod: e.target.value as any })}
              >
                {Object.entries(PAYMENT_METHODS).map(([key, method]) => (
                  <option key={key} value={key}>
                    {method.name}
                  </option>
                ))}
              </select>
              
              {/* Payment Method Details */}
              {donationForm.paymentMethod && PAYMENT_METHODS[donationForm.paymentMethod as keyof typeof PAYMENT_METHODS] && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-semibold text-slate-900 mb-2">
                    {(PAYMENT_METHODS[donationForm.paymentMethod as keyof typeof PAYMENT_METHODS] as any)?.name}
                  </p>
                  <div className="space-y-2 text-sm">
                    {(PAYMENT_METHODS[donationForm.paymentMethod as keyof typeof PAYMENT_METHODS] as any)?.accountNumber && (
                      <div className="flex items-center justify-between bg-white p-2 rounded">
                        <span className="text-gray-600">
                          {(donationForm.paymentMethod as string) === 'bank_transfer' ? 'IBAN:' : 'الرقم:'}
                        </span>
                        <span className="font-mono font-semibold text-slate-900">
                          {(PAYMENT_METHODS[donationForm.paymentMethod as keyof typeof PAYMENT_METHODS] as any)?.accountNumber}
                        </span>
                      </div>
                    )}
                    {(PAYMENT_METHODS[donationForm.paymentMethod as keyof typeof PAYMENT_METHODS] as any)?.bankName && (
                      <div className="text-gray-600">
                        <span>البنك: </span>
                        <span className="font-semibold">
                          {(PAYMENT_METHODS[donationForm.paymentMethod as keyof typeof PAYMENT_METHODS] as any)?.bankName}
                        </span>
                      </div>
                    )}
                    {(PAYMENT_METHODS[donationForm.paymentMethod as keyof typeof PAYMENT_METHODS] as any)?.swiftCode && (
                      <div className="text-gray-600">
                        <span>SWIFT Code: </span>
                        <span className="font-semibold">
                          {(PAYMENT_METHODS[donationForm.paymentMethod as keyof typeof PAYMENT_METHODS] as any)?.swiftCode}
                        </span>
                      </div>
                    )}
                    <p className="text-gray-600 text-xs pt-2">
                      {(PAYMENT_METHODS[donationForm.paymentMethod as keyof typeof PAYMENT_METHODS] as any)?.description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">رسالة (اختيارية)</label>
              <Textarea
                placeholder="اكتب رسالتك..."
                value={donationForm.message}
                onChange={(e) => setDonationForm({ ...donationForm, message: e.target.value })}
                rows={3}
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
              <p className="text-xs text-amber-800">
                ملاحظة: بعد تأكيد التبرع، سيتم التواصل معك من قبل فريقنا لإكمال عملية الدفع بالطريقة المختارة.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              disabled={createDonation.isPending}
            >
              {createDonation.isPending ? 'جاري المعالجة...' : 'تأكيد التبرع'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Contact Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="max-w-md" dir="rtl">
          <DialogHeader>
            <DialogTitle>تواصل معنا</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleContact} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">الاسم *</label>
              <Input
                placeholder="اسمك الكريم"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">البريد الإلكتروني *</label>
              <Input
                type="email"
                placeholder="بريدك الإلكتروني"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">رقم الهاتف *</label>
              <Input
                placeholder="رقم هاتفك"
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">الموضوع *</label>
              <Input
                placeholder="موضوع رسالتك"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">الرسالة *</label>
              <Textarea
                placeholder="اكتب رسالتك..."
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
              disabled={createContact.isPending}
            >
              {createContact.isPending ? 'جاري الإرسال...' : 'إرسال الرسالة'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
