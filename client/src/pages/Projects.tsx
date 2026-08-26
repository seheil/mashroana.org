import { useState, useEffect } from "react";
import { subscribeToProjects } from "@/lib/firestore-ops";
import { FirestoreProject } from "@shared/firestore-schemas";
import { Button } from "@/components/ui/button";

export default function Projects() {
  const [projects, setProjects] = useState<FirestoreProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let resolved = false;
    const timeoutId = window.setTimeout(() => {
      if (resolved) return;
      setError("لم تتوفر بيانات المشاريع في الوقت الحالي. نعرض البرامج فور اعتمادها؛ ويمكنكم التواصل مع المؤسسة للاستفسار.");
      setLoading(false);
    }, 6000);

    try {
      const unsubscribe = subscribeToProjects((projectsList) => {
        resolved = true;
        window.clearTimeout(timeoutId);
        setProjects(projectsList);
        setLoading(false);
        setError(null);
      }, () => {
        resolved = true;
        window.clearTimeout(timeoutId);
        setError("لم تتوفر بيانات المشاريع في الوقت الحالي. نعرض البرامج فور اعتمادها؛ ويمكنكم التواصل مع المؤسسة للاستفسار.");
        setLoading(false);
      });

      return () => {
        window.clearTimeout(timeoutId);
        if (unsubscribe) unsubscribe();
      };
    } catch (err) {
      console.error("Error loading projects:", err);
      resolved = true;
      window.clearTimeout(timeoutId);
      setError("لم تتوفر بيانات المشاريع في الوقت الحالي. نعرض البرامج فور اعتمادها؛ ويمكنكم التواصل مع المؤسسة للاستفسار.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">جاري تحميل المشاريع...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">مشاريعنا الخيرية</h1>
          <p className="text-xl text-gray-600">تعرف على المجالات التي نعمل فيها لخدمة المجتمع</p>
        </div>

        {error && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded mb-8" role="status">
            {error}
          </div>
        )}

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد مشاريع متاحة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer"
                onClick={() => setSelectedProgram(selectedProgram === project.id ? null : (project.id || null))}
              >
                <div className="text-4xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  {selectedProgram === project.id ? "إخفاء التفاصيل" : "عرض التفاصيل"}
                </Button>

                {selectedProgram === project.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      هذا المشروع يهدف إلى {project.description}. نحن نعمل بجد لتحقيق أهدافنا وخدمة المجتمع بأفضل
                      طريقة ممكنة.
                    </p>
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                      تبرع الآن
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
