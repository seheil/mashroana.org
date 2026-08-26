import { useState, useEffect } from "react";
import { subscribeToAchievements } from "@/lib/firestore-ops";
import { FirestoreAchievement } from "@shared/firestore-schemas";

export default function Achievements() {
  const [achievements, setAchievements] = useState<FirestoreAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const unsubscribe = subscribeToAchievements((achievementsList) => {
        setAchievements(achievementsList);
        setLoading(false);
        setError(null);
      }, () => {
        setError("حدث خطأ في تحميل الإنجازات. يرجى المحاولة لاحقاً.");
        setLoading(false);
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    } catch (err) {
      console.error("Error loading achievements:", err);
      setError("حدث خطأ في تحميل الإنجازات. يرجى المحاولة لاحقاً.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">جاري تحميل الإنجازات...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🏆 إنجازاتنا</h1>
          <p className="text-xl text-gray-600">تعرف على ما حققناه من إنجازات على مدار السنوات</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {achievements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد إنجازات متاحة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
                  {achievement.imagePath ? (
                    <img
                      src={achievement.imagePath}
                      alt={`توثيق ${achievement.title}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl">{achievement.icon}</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">{achievement.title}</h3>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                      {achievement.year}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{achievement.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {achievement.orphans ? (
                      <div className="bg-green-50 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-green-600">{achievement.orphans}</div>
                        <div className="text-xs text-gray-600">أيتام</div>
                      </div>
                    ) : null}
                    {achievement.students ? (
                      <div className="bg-blue-50 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-blue-600">{achievement.students}</div>
                        <div className="text-xs text-gray-600">طالب</div>
                      </div>
                    ) : null}
                    {achievement.patients ? (
                      <div className="bg-red-50 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-red-600">{achievement.patients}</div>
                        <div className="text-xs text-gray-600">مريض</div>
                      </div>
                    ) : null}
                    {achievement.families ? (
                      <div className="bg-yellow-50 p-3 rounded text-center">
                        <div className="text-2xl font-bold text-yellow-600">{achievement.families}</div>
                        <div className="text-xs text-gray-600">أسرة</div>
                      </div>
                    ) : null}
                  </div>
                  <p className="border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">
                    تُحدّث بيانات هذا الإنجاز ومؤشراته من لوحة إدارة المؤسسة.
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
