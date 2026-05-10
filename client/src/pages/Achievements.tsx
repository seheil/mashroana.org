import { useState } from "react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  image: string;
  year: number;
  impact: string;
}

export default function Achievements() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "توزيع المساعدات الغذائية",
      description: "توزيع آلاف السلال الغذائية على الأسر المحتاجة",
      image: "/achievements/food-distribution.jpg",
      year: 2024,
      impact: "5000+ أسرة استفادت",
    },
    {
      id: "2",
      title: "دعم الطلاب المحتاجين",
      description: "توفير المستلزمات الدراسية والدعم التعليمي",
      image: "/achievements/education-support.jpg",
      year: 2024,
      impact: "2500+ طالب استفاد",
    },
    {
      id: "3",
      title: "رعاية الأيتام",
      description: "توفير الرعاية الشاملة والدعم النفسي للأيتام",
      image: "/achievements/orphan-care.jpg",
      year: 2024,
      impact: "1250+ يتيم تحت الرعاية",
    },
    {
      id: "4",
      title: "العيادات الطبية المجانية",
      description: "فتح عيادات طبية مجانية لخدمة المحتاجين",
      image: "/achievements/medical-clinic.jpg",
      year: 2024,
      impact: "5600+ مريض تم فحصهم",
    },
    {
      id: "5",
      title: "مشاريع التمكين الاقتصادي",
      description: "دعم المشاريع الصغيرة لتمكين الأسر اقتصادياً",
      image: "/achievements/economic-empowerment.jpg",
      year: 2024,
      impact: "3400+ أسرة استفادت",
    },
    {
      id: "6",
      title: "غرس الأشجار والنخيل",
      description: "مشروع غرس آلاف الأشجار والنخيل المثمرة",
      image: "/achievements/tree-planting.jpg",
      year: 2024,
      impact: "10000+ شجرة مزروعة",
    },
    {
      id: "7",
      title: "المساعدات الموسمية",
      description: "توزيع المساعدات والملابس خلال الأعياد",
      image: "/achievements/seasonal-aid.jpg",
      year: 2023,
      impact: "3000+ أسرة استفادت",
    },
    {
      id: "8",
      title: "برامج التدريب والتوظيف",
      description: "برامج تدريبية وتوظيف للشباب والنساء",
      image: "/achievements/training-program.jpg",
      year: 2023,
      impact: "500+ شخص تم تدريبهم",
    },
  ];

  const years = Array.from(new Set(achievements.map((a) => a.year))).sort(
    (a, b) => b - a
  );
  const filteredAchievements = selectedYear
    ? achievements.filter((a) => a.year === selectedYear)
    : achievements;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">إنجازاتنا</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            رحلة العطاء والخير المستمرة
          </p>
          <p className="text-lg opacity-85 max-w-2xl mx-auto">
            شاهد الإنجازات التي حققتها مؤسسة مشروعنا إلى الجنة في خدمة المجتمع
          </p>
        </div>
      </section>

      {/* Year Filter */}
      <section className="py-8 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setSelectedYear(null)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedYear === null
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border-2 border-gray-300 hover:border-green-600"
              }`}
            >
              جميع السنوات
            </button>
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedYear === year
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-700 border-2 border-gray-300 hover:border-green-600"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            {selectedYear ? `إنجازات ${selectedYear}` : "جميع الإنجازات"}
          </h2>

          {filteredAchievements.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">لا توجد إنجازات في هذه السنة</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  {/* Image Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-6xl">
                    {achievement.id === "1" && "🍎"}
                    {achievement.id === "2" && "📚"}
                    {achievement.id === "3" && "👶"}
                    {achievement.id === "4" && "⚕️"}
                    {achievement.id === "5" && "💼"}
                    {achievement.id === "6" && "🌳"}
                    {achievement.id === "7" && "🎁"}
                    {achievement.id === "8" && "🎓"}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-800 flex-1">
                        {achievement.title}
                      </h3>
                      <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full whitespace-nowrap ml-2">
                        {achievement.year}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{achievement.description}</p>

                    {/* Impact */}
                    <div className="bg-green-50 border-l-4 border-green-600 p-3 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>الأثر:</strong> {achievement.impact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            إحصائيات الإنجازات
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {achievements.length}
              </div>
              <p className="text-gray-600">مشروع منجز</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {new Set(achievements.map((a) => a.year)).size}
              </div>
              <p className="text-gray-600">سنوات من العطاء</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                20000+
              </div>
              <p className="text-gray-600">مستفيد مباشر</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                ∞
              </div>
              <p className="text-gray-600">الأثر المستمر</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">كن جزءاً من رحلة العطاء</h2>
          <p className="text-lg mb-8 opacity-90">
            ساهم معنا في تحقيق المزيد من الإنجازات والمشاريع الخيرية
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/#donate"
              className="bg-white text-green-600 hover:bg-gray-100 font-bold py-3 px-8 rounded transition"
            >
              تبرع الآن
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-3 px-8 rounded transition"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
