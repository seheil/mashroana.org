import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectData {
  id: number;
  name: string;
  icon: string;
  cta: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  beneficiaries: number;
}

interface GardenElement {
  id: number;
  type: 'tree' | 'well' | 'plant';
  count: number;
  emoji: string;
}

interface Statistics {
  totalDonations: number;
  totalBeneficiaries: number;
  totalOrphans: number;
  totalPatients: number;
  totalStudents: number;
  totalFamilies: number;
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'projects' | 'garden' | 'stats' | 'contact'>('projects');
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: 1,
      name: 'غرس النخيل',
      icon: '🌴',
      cta: 'اغرس نخلة',
      description: 'شارك في زراعة النخيل',
      targetAmount: 50000,
      currentAmount: 32500,
      beneficiaries: 500
    },
    {
      id: 2,
      name: 'سقيا الماء',
      icon: '💧',
      cta: 'اسقِ أسرة',
      description: 'ساعد الأسر المحتاجة',
      targetAmount: 30000,
      currentAmount: 18750,
      beneficiaries: 300
    },
    {
      id: 3,
      name: 'كفالة الأيتام',
      icon: '👨‍👧‍👦',
      cta: 'اكفل أسرة',
      description: 'كفل يتيماً',
      targetAmount: 100000,
      currentAmount: 65000,
      beneficiaries: 200
    },
    {
      id: 4,
      name: 'الخدمات الطبية',
      icon: '⚕️',
      cta: 'ساهم في تخفيف ألم مريض',
      description: 'ساهم في علاج المرضى',
      targetAmount: 60000,
      currentAmount: 42000,
      beneficiaries: 450
    },
    {
      id: 5,
      name: 'المجمع الخيري',
      icon: '🏛️',
      cta: 'اشارك في السهم',
      description: 'استثمر في مشروع خيري',
      targetAmount: 200000,
      currentAmount: 125000,
      beneficiaries: 1000
    }
  ]);

  const [gardenElements, setGardenElements] = useState<GardenElement[]>([
    { id: 1, type: 'tree', count: 1250, emoji: '🌳' },
    { id: 2, type: 'well', count: 45, emoji: '🌊' },
    { id: 3, type: 'plant', count: 3500, emoji: '🌱' }
  ]);

  const [stats, setStats] = useState<Statistics>({
    totalDonations: 282250,
    totalBeneficiaries: 2450,
    totalOrphans: 200,
    totalPatients: 450,
    totalStudents: 800,
    totalFamilies: 1000
  });

  const [contactInfo, setContactInfo] = useState({
    whatsapp: '01013128453',
    telegram: '@mashrouana',
    facebook: 'https://www.facebook.com/61582145746691/',
    email: 'info@mashrouana.org'
  });

  const [editingProject, setEditingProject] = useState<ProjectData | null>(null);
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleSaveProject = (project: ProjectData) => {
    setProjects(projects.map(p => p.id === project.id ? project : p));
    setEditingProject(null);
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const handleUpdateGardenElement = (id: number, count: number) => {
    setGardenElements(gardenElements.map(e => e.id === id ? { ...e, count } : e));
  };

  const handleUpdateStat = (key: keyof Statistics, value: number) => {
    setStats({ ...stats, [key]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-green-700 mb-2">لوحة التحكم الإدارية</h1>
          <p className="text-gray-600">إدارة جميع بيانات المؤسسة والمشاريع والإحصائيات</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {(['projects', 'garden', 'stats', 'contact'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab === 'projects' && '📊 المشاريع'}
              {tab === 'garden' && '🌳 البستان'}
              {tab === 'stats' && '📈 الإحصائيات'}
              {tab === 'contact' && '📱 التواصل'}
            </button>
          ))}
        </div>

        {/* Save Message */}
        {showSaveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-6 p-4 bg-green-100 border-l-4 border-green-600 text-green-700 rounded"
          >
            ✅ تم حفظ التغييرات بنجاح!
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{project.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{project.name}</h3>
                      <p className="text-gray-600">{project.description}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">نص الزر</label>
                    <input
                      type="text"
                      value={project.cta}
                      onChange={(e) => {
                        const updated = { ...project, cta: e.target.value };
                        setEditingProject(updated);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">المبلغ المجمع (جنيه)</label>
                    <input
                      type="number"
                      value={project.currentAmount}
                      onChange={(e) => {
                        const updated = { ...project, currentAmount: parseInt(e.target.value) };
                        setEditingProject(updated);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">الهدف (جنيه)</label>
                    <input
                      type="number"
                      value={project.targetAmount}
                      onChange={(e) => {
                        const updated = { ...project, targetAmount: parseInt(e.target.value) };
                        setEditingProject(updated);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">عدد المستفيدين</label>
                    <input
                      type="number"
                      value={project.beneficiaries}
                      onChange={(e) => {
                        const updated = { ...project, beneficiaries: parseInt(e.target.value) };
                        setEditingProject(updated);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>التقدم</span>
                    <span>{Math.round((project.currentAmount / project.targetAmount) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full transition-all"
                      style={{ width: `${Math.min((project.currentAmount / project.targetAmount) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleSaveProject(editingProject || project)}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  حفظ التغييرات
                </button>
              </div>
            ))}
          </motion.div>
        )}

        {/* Garden Tab */}
        {activeTab === 'garden' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {gardenElements.map(element => (
              <div key={element.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{element.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {element.type === 'tree' && 'الأشجار المزروعة'}
                      {element.type === 'well' && 'الآبار المحفورة'}
                      {element.type === 'plant' && 'النباتات المزروعة'}
                    </h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={element.count}
                        onChange={(e) => handleUpdateGardenElement(element.id, parseInt(e.target.value))}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <span className="text-2xl font-bold text-green-600">{element.count.toLocaleString('ar-EG')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              { key: 'totalDonations' as const, label: 'إجمالي التبرعات (جنيه)', icon: '💰' },
              { key: 'totalBeneficiaries' as const, label: 'إجمالي المستفيدين', icon: '👥' },
              { key: 'totalOrphans' as const, label: 'عدد الأيتام', icon: '👨‍👧‍👦' },
              { key: 'totalPatients' as const, label: 'عدد المرضى', icon: '⚕️' },
              { key: 'totalStudents' as const, label: 'عدد الطلاب', icon: '📚' },
              { key: 'totalFamilies' as const, label: 'عدد الأسر', icon: '🏠' }
            ].map(stat => (
              <div key={stat.key} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{stat.icon}</span>
                  <h3 className="text-lg font-semibold text-gray-800">{stat.label}</h3>
                </div>
                <input
                  type="number"
                  value={stats[stat.key]}
                  onChange={(e) => handleUpdateStat(stat.key, parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
          </motion.div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {[
              { key: 'whatsapp', label: 'WhatsApp', icon: '📱' },
              { key: 'telegram', label: 'Telegram', icon: '💬' },
              { key: 'facebook', label: 'Facebook', icon: '📘' },
              { key: 'email', label: 'البريد الإلكتروني', icon: '📧' }
            ].map(contact => (
              <div key={contact.key} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{contact.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-800">{contact.label}</h3>
                </div>
                <input
                  type="text"
                  value={contactInfo[contact.key as keyof typeof contactInfo]}
                  onChange={(e) => setContactInfo({
                    ...contactInfo,
                    [contact.key]: e.target.value
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
