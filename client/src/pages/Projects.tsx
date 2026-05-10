import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  createdAt?: any;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    try {
      setLoading(true);
      const projectsRef = collection(db, "projects");
      const q = query(projectsRef, orderBy("createdAt", "desc"));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const projectsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Project[];
        setProjects(projectsList);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      console.error("Error loading projects:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            مشاريعنا الخيرية
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            نعمل على نشر الخير والعطف في المجتمع
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            مشاريعنا الخيرية
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-600">جاري تحميل المشاريع...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">لا توجد مشاريع حالياً</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <div className="text-4xl mb-3">{project.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <Button
                    onClick={() => setSelectedProgram(project.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    تبرع الآن
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            كيف يمكنك المساهمة؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">💝</div>
              <h3 className="text-lg font-bold mb-2">تبرع مباشر</h3>
              <p className="text-gray-600">
                تبرع مباشر لأي من مشاريعنا الخيرية
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-lg font-bold mb-2">تطوع معنا</h3>
              <p className="text-gray-600">
                انضم إلى فريقنا وساهم في نشر الخير
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="text-4xl mb-3">📢</div>
              <h3 className="text-lg font-bold mb-2">شارك رسالتنا</h3>
              <p className="text-gray-600">
                ساعدنا في نشر رسالتنا الخيرية
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
