import { useState, useRef } from 'react';
import { Heart, Leaf, Droplets, Users, BookOpen, FileText, ChevronDown, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import DonationModal from '@/components/DonationModal';
import { ORGANIZATION_FIELDS } from '@shared/fields-data';
import FacebookFeed from "@/components/FacebookFeed";

const projects = [
  { 
    id: 1, 
    name: 'غرس النخيل', 
    arabicName: 'غرس النخيل',
    icon: '🌴', 
    color: 'from-green-600 to-green-400', 
    cta: 'اغرس نخلة', 
    description: 'شارك في زراعة النخيل وساهم في تحسين البيئة' 
  },
  { 
    id: 2, 
    name: 'سقيا الماء', 
    arabicName: 'سقيا الماء',
    icon: '💧', 
    color: 'from-blue-600 to-blue-400', 
    cta: 'اسقِ أسرة', 
    description: 'ساعد الأسر المحتاجة بتوفير المياه النظيفة' 
  },
  { 
    id: 3, 
    name: 'كفالة الأيتام', 
    arabicName: 'كفالة الأيتام',
    icon: '👨‍👧‍👦', 
    color: 'from-purple-600 to-purple-400', 
    cta: 'اكفل أسرة', 
    description: 'كفل يتيماً وغيّر حياته للأفضل' 
  },
  { 
    id: 4, 
    name: 'الخدمات الطبية', 
    arabicName: 'الخدمات الطبية',
    icon: '⚕️', 
    color: 'from-red-600 to-red-400', 
    cta: 'ساهم في تخفيف ألم مريض', 
    description: 'ساهم في علاج المرضى المحتاجين' 
  },
  { 
    id: 5, 
    name: 'المجمع الخيري', 
    arabicName: 'المجمع الخيري',
    icon: '🏛️', 
    color: 'from-amber-600 to-amber-400', 
    cta: 'اشارك في السهم', 
    description: 'استثمر في مشروع خيري شامل' 
  },
];

const documents = [
  { title: 'الميادين الـ 14', description: 'مجالات عمل المؤسسة الشاملة' },
  { title: 'التفاصيل الرسمية', description: 'معلومات التسجيل والترخيص' },
  { title: 'التقارير السنوية', description: 'تقارير الإنجازات والأثر الاجتماعي' },
];

export default function Home() {
  const [donations, setDonations] = useState(0);
  const [trees, setTrees] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gardenRef = useRef<HTMLDivElement>(null);

  const scrollToGarden = () => {
    gardenRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const openDonationModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-blue-50" dir="rtl">
      {/* Floating Action Button */}
      <motion.button
        onClick={scrollToGarden}
        className="fixed bottom-8 left-8 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl z-40 flex items-center gap-2"
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

      {/* Projects Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">مشاريعنا الخيرية</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-200"
              >
                <div className="text-5xl mb-4">{project.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-6">{project.description}</p>
                <motion.button
                  onClick={() => openDonationModal(project)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                >
                  {project.cta}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Garden Section */}
      <section ref={gardenRef} className="py-20 px-4 bg-gradient-to-b from-green-50 to-blue-50">
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
                transition={{ type: 'spring', stiffness: 100 }}
                className="text-7xl mb-6"
              >
                🌳
              </motion.div>
              <h3 className="text-3xl font-bold text-green-700 mb-2">عدد الأشجار المزروعة</h3>
              <motion.p
                key={trees}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-5xl font-bold text-green-600"
              >
                {trees}
              </motion.p>
              <p className="text-gray-600 mt-4">كل تبرع يضيف شجرة جديدة إلى بستاننا</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'الأيتام المكفولين', value: 1250 },
              { label: 'الأسر المساعدة', value: 3400 },
              { label: 'المرضى المعالجين', value: 5600 },
              { label: 'الطلاب المدعومين', value: 2100 },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg p-4 text-center shadow-md"
              >
                <p className="text-2xl font-bold text-green-600">{stat.value}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Transparency Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">الشفافية والثقة</h2>
          
          {/* Documents */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {documents.map((doc, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg border border-green-200 transition-all cursor-pointer"
              >
                <FileText className="text-green-600 mb-3 mx-auto" size={32} />
                <h3 className="font-bold text-gray-800 mb-2">{doc.title}</h3>
                <p className="text-gray-600 text-sm">{doc.description}</p>
              </motion.div>
            ))}
          </div>

          {/* 14 Fields Display */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-green-700 mb-6">الأربعة عشر ميدان لعملنا</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ORGANIZATION_FIELDS.map((field, idx) => (
                <motion.div
                  key={field.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg p-3 text-center font-semibold text-green-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  {idx + 1}. {field.name}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FacebookFeed />

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-white">
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

      {/* Donation Modal */}
      {selectedProject && (
        <DonationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          project={selectedProject}
        />
      )}
    </div>
  );
}
