import { useState, useRef, useEffect } from 'react';
import { Heart, Leaf, Droplets, Users, BookOpen, FileText, ChevronDown, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  { id: 1, name: 'غرس النخيل', icon: Leaf, color: 'from-green-600 to-green-400', cta: 'اغرس نخلة', description: 'شارك في زراعة النخيل وساهم في تحسين البيئة' },
  { id: 2, name: 'سقيا الماء', icon: Droplets, color: 'from-blue-600 to-blue-400', cta: 'اسقِ أسرة', description: 'ساعد الأسر المحتاجة بتوفير المياه النظيفة' },
  { id: 3, name: 'كفالة الأيتام', icon: Users, color: 'from-purple-600 to-purple-400', cta: 'اكفل أسرة', description: 'كفل يتيماً وغيّر حياته للأفضل' },
  { id: 4, name: 'الخدمات الطبية', icon: Heart, color: 'from-red-600 to-red-400', cta: 'اشفِ مريضاً', description: 'ساهم في علاج المرضى المحتاجين' },
  { id: 5, name: 'المجمع الخيري', icon: BookOpen, color: 'from-amber-600 to-amber-400', cta: 'اشارك في السهم', description: 'استثمر في مشروع خيري شامل' },
];

const documents = [
  { title: 'الميادين الـ 14', description: 'مجالات عمل المؤسسة الشاملة' },
  { title: 'التفاصيل الرسمية', description: 'معلومات التسجيل والترخيص' },
  { title: 'التقارير السنوية', description: 'تقارير الإنجازات والأثر الاجتماعي' },
];

export default function Home() {
  const [donations, setDonations] = useState(0);
  const [trees, setTrees] = useState(0);
  const gardenRef = useRef<HTMLDivElement>(null);

  const scrollToGarden = () => {
    gardenRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-blue-50">
      {/* Floating Action Button */}
      <motion.button
        onClick={scrollToGarden}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl z-40 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Leaf size={20} />
        <span>ازرع شجرة الآن</span>
      </motion.button>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-green-700 mb-4"
        >
          مؤسسة مشروعنا إلى الجنة
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl text-green-600 mb-6"
        >
          خطوتك نحو الجنة تبدأ من هنا
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-700 max-w-2xl mx-auto mb-8"
        >
          نعمل على نشر الخير والعطف في المجتمع من خلال مشاريع خيرية متنوعة تهدف إلى تحسين حياة المحتاجين والمستضعفين
        </motion.p>
        <motion.button
          onClick={scrollToGarden}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-600 to-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
        >
          تبرع الآن
        </motion.button>
      </section>

      {/* Interactive Garden Section */}
      <section ref={gardenRef} className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">بستاننا الرقمي الحي</h2>
          
          {/* Garden Canvas */}
          <div className="bg-gradient-to-b from-blue-100 to-green-100 rounded-2xl p-8 mb-8 min-h-96 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-6xl"
                  initial={{ x: Math.random() * 300, y: Math.random() * 300 }}
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, delay: i * 0.2, repeat: Infinity }}
                  style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
                >
                  🌴
                </motion.div>
              ))}
            </div>
            
            <div className="text-center z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-8xl mb-4"
              >
                🌳
              </motion.div>
              <p className="text-2xl font-bold text-green-700">
                {trees} نخلة مزروعة
              </p>
              <p className="text-gray-600 mt-2">
                شكراً لمساهمتك في تخضير المجتمع
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <motion.div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center" whileHover={{ scale: 1.05 }}>
              <p className="text-3xl font-bold text-green-700">{donations.toLocaleString()}</p>
              <p className="text-gray-600">جنيه تم التبرع به</p>
            </motion.div>
            <motion.div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center" whileHover={{ scale: 1.05 }}>
              <p className="text-3xl font-bold text-blue-700">{trees}</p>
              <p className="text-gray-600">نخلة مزروعة</p>
            </motion.div>
            <motion.div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg text-center" whileHover={{ scale: 1.05 }}>
              <p className="text-3xl font-bold text-amber-700">500,000</p>
              <p className="text-gray-600">من 2,000,000 جنيه</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">مشاريعنا الخيرية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -10 }}
                  className={`bg-gradient-to-br ${project.color} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <Icon size={40} className="mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                  <p className="mb-6 opacity-90">{project.description}</p>
                  <button className="w-full bg-white text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                    {project.cta}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Official Documents Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">وثائقنا الرسمية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {documents.map((doc, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-200 hover:border-green-400 transition-colors cursor-pointer"
              >
                <FileText className="text-green-600 mb-3" size={32} />
                <h3 className="font-bold text-gray-800 mb-2">{doc.title}</h3>
                <p className="text-gray-600 text-sm">{doc.description}</p>
              </motion.div>
            ))}
          </div>

          {/* 14 Fields Display */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-green-700 mb-6">الأربعة عشر ميدان لعملنا</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                'المساعدات الاجتماعية',
                'الأنشطة الصحية',
                'رعاية الطفولة',
                'الخدمات الثقافية والتعليمية',
                'رعاية الأسرة',
                'رعاية الفئات الخاصة',
                'التنمية الاقتصادية',
                'حماية البيئة',
                'الصداقة بين الشعوب',
                'النشاط الأدبي',
                'التنظيم والإدارة',
                'تنظيم الأسرة',
                'رعاية الشيخوخة',
                'أصحاب المعاشات'
              ].map((field, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg p-3 text-center font-semibold text-green-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  {idx + 1}. {field}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">نموذج التبرع</h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">المبلغ (بالجنيه)</label>
                <input
                  type="number"
                  placeholder="أدخل المبلغ"
                  onChange={(e) => setDonations(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">اسمك (اختياري)</label>
                <input
                  type="text"
                  placeholder="أدخل اسمك"
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">بريدك الإلكتروني (اختياري)</label>
                <input
                  type="email"
                  placeholder="أدخل بريدك"
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setTrees(trees + 1)}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition-shadow"
              >
                تبرع عبر InstaPay
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-12">تواصل معنا</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://wa.me/201013128453"
              className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              <MessageCircle size={32} className="mx-auto mb-3" />
              واتساب: 01013128453
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://t.me/mshro3nallgana"
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              <MessageCircle size={32} className="mx-auto mb-3" />
              قناة التيليجرام
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
