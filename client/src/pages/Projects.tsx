import { useState } from "react";
import { staticSiteContent } from "@/content/static-content";
import { FirestoreProject } from "@shared/firestore-schemas";
import { Button } from "@/components/ui/button";
import { ProgramIcon } from "@/components/ProgramIcon";

export default function Projects() {
  const projects: FirestoreProject[] = staticSiteContent.projects;
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">مشاريعنا الخيرية</h1>
          <p className="text-xl text-gray-600">تعرف على المجالات التي نعمل فيها لخدمة المجتمع</p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد مشاريع منشورة حالياً في ملف المحتوى.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 cursor-pointer"
                onClick={() => setSelectedProgram(selectedProgram === project.id ? null : (project.id || null))}
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800"><ProgramIcon id={project.id} className="h-7 w-7" /></div>
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
