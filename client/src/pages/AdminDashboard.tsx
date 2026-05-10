import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  addProject,
  updateProject,
  deleteProject,
  getAllProjects,
  subscribeToProjects,
  updateSettings,
  getSettings,
  subscribeToSettings,
  getAllContactMessages,
  subscribeToContactMessages,
  addAchievement,
  updateAchievement,
  deleteAchievement,
  getAllAchievements,
  subscribeToAchievements,
} from "@/lib/firestore-ops";
import { FirestoreProject, FirestoreAchievement, FirestoreSettings } from "@shared/firestore-schemas";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Settings/Counters state
  const [counters, setCounters] = useState<FirestoreSettings>({
    orphans: 0,
    students: 0,
    patients: 0,
    families: 0,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Messages state
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Projects state
  const [projects, setProjects] = useState<FirestoreProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", icon: "" });
  const [addingProject, setAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editData, setEditData] = useState({ name: "", description: "", icon: "" });

  // Achievements state
  const [achievements, setAchievements] = useState<FirestoreAchievement[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Partial<FirestoreAchievement>>({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    orphans: 0,
    students: 0,
    patients: 0,
    families: 0,
    icon: "🎯",
    imagePath: "",
  });
  const [addingAchievement, setAddingAchievement] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<any>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      setLocation("/admin-login");
    }
  }, [user, loading, setLocation]);

  // Load data from Firestore
  useEffect(() => {
    if (user) {
      // Subscribe to settings
      const unsubscribeSettings = subscribeToSettings((settings) => {
        setCounters(settings);
      });

      // Subscribe to messages
      setLoadingMessages(true);
      const unsubscribeMessages = subscribeToContactMessages((msgs) => {
        setMessages(msgs);
        setLoadingMessages(false);
      });

      // Subscribe to projects
      setLoadingProjects(true);
      const unsubscribeProjects = subscribeToProjects((proj) => {
        setProjects(proj);
        setLoadingProjects(false);
      });

      // Subscribe to achievements
      setLoadingAchievements(true);
      const unsubscribeAchievements = subscribeToAchievements((ach) => {
        setAchievements(ach);
        setLoadingAchievements(false);
      });

      return () => {
        unsubscribeSettings();
        unsubscribeMessages();
        unsubscribeProjects();
        unsubscribeAchievements();
      };
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLocation("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // ============================================================================
  // SETTINGS/COUNTERS HANDLERS
  // ============================================================================

  const handleSaveCounters = async () => {
    try {
      setSaving(true);
      await updateSettings(counters);
      setMessage("✅ تم حفظ الإحصائيات بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في حفظ الإحصائيات");
      console.error("Error saving counters:", error);
    } finally {
      setSaving(false);
    }
  };

  // ============================================================================
  // PROJECTS HANDLERS
  // ============================================================================

  const handleAddProject = async () => {
    if (!newProject.name.trim()) {
      setMessage("❌ يرجى إدخال اسم المشروع");
      return;
    }

    try {
      setAddingProject(true);
      await addProject({
        name: newProject.name,
        description: newProject.description,
        icon: newProject.icon,
      });
      setNewProject({ name: "", description: "", icon: "" });
      setMessage("✅ تم إضافة المشروع بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في إضافة المشروع");
      console.error("Error adding project:", error);
    } finally {
      setAddingProject(false);
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProject?.id) return;

    try {
      setAddingProject(true);
      await updateProject(editingProject.id, {
        name: editData.name,
        description: editData.description,
        icon: editData.icon,
      });
      setEditingProject(null);
      setEditData({ name: "", description: "", icon: "" });
      setMessage("✅ تم تحديث المشروع بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في تحديث المشروع");
      console.error("Error updating project:", error);
    } finally {
      setAddingProject(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;

    try {
      await deleteProject(id);
      setMessage("✅ تم حذف المشروع بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في حذف المشروع");
      console.error("Error deleting project:", error);
    }
  };

  // ============================================================================
  // ACHIEVEMENTS HANDLERS
  // ============================================================================

  const handleAddAchievement = async () => {
    if (!newAchievement.title?.trim()) {
      setMessage("❌ يرجى إدخال عنوان الإنجاز");
      return;
    }

    try {
      setAddingAchievement(true);
      await addAchievement({
        title: newAchievement.title || "",
        description: newAchievement.description || "",
        year: newAchievement.year || new Date().getFullYear(),
        orphans: newAchievement.orphans || 0,
        students: newAchievement.students || 0,
        patients: newAchievement.patients || 0,
        families: newAchievement.families || 0,
        icon: newAchievement.icon || "🎯",
        imagePath: newAchievement.imagePath || "",
      });
      setNewAchievement({
        title: "",
        description: "",
        year: new Date().getFullYear(),
        orphans: 0,
        students: 0,
        patients: 0,
        families: 0,
        icon: "🎯",
        imagePath: "",
      });
      setMessage("✅ تم إضافة الإنجاز بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في إضافة الإنجاز");
      console.error("Error adding achievement:", error);
    } finally {
      setAddingAchievement(false);
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الإنجاز؟")) return;

    try {
      await deleteAchievement(id);
      setMessage("✅ تم حذف الإنجاز بنجاح");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("❌ خطأ في حذف الإنجاز");
      console.error("Error deleting achievement:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">لوحة التحكم الإدارية</h1>
            <p className="text-sm text-green-100">مرحباً: {user.email}</p>
          </div>
          <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white">
            تسجيل الخروج
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6 bg-white rounded-lg shadow p-4 flex-wrap">
          {[
            { id: "dashboard", label: "📊 لوحة التحكم" },
            { id: "projects", label: "📋 المشاريع" },
            { id: "achievements", label: "🏆 الإنجازات" },
            { id: "messages", label: "💬 الرسائل" },
            { id: "knowledge", label: "🧠 قاعدة المعرفة" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded font-semibold transition ${
                activeTab === tab.id
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded ${
              message.includes("❌")
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">الإحصائيات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {[
                { label: "عدد الأيتام", key: "orphans" },
                { label: "عدد الطلاب", key: "students" },
                { label: "عدد المرضى", key: "patients" },
                { label: "عدد الأسر", key: "families" },
              ].map((item) => (
                <div key={item.key}>
                  <label className="block text-gray-700 font-semibold mb-2">{item.label}</label>
                  <input
                    type="number"
                    value={counters[item.key as keyof FirestoreSettings] || 0}
                    onChange={(e) =>
                      setCounters({
                        ...counters,
                        [item.key]: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              ))}
            </div>
            <Button
              onClick={handleSaveCounters}
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {saving ? "جاري الحفظ..." : "حفظ الإحصائيات"}
            </Button>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">إدارة المشاريع</h2>

            {/* Add/Edit Project Form */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">
                {editingProject ? "تعديل المشروع" : "إضافة مشروع جديد"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="اسم المشروع"
                  value={editingProject ? editData.name : newProject.name}
                  onChange={(e) =>
                    editingProject
                      ? setEditData({ ...editData, name: e.target.value })
                      : setNewProject({ ...newProject, name: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="الوصف"
                  value={editingProject ? editData.description : newProject.description}
                  onChange={(e) =>
                    editingProject
                      ? setEditData({ ...editData, description: e.target.value })
                      : setNewProject({ ...newProject, description: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="الرمز (emoji)"
                  value={editingProject ? editData.icon : newProject.icon}
                  onChange={(e) =>
                    editingProject
                      ? setEditData({ ...editData, icon: e.target.value })
                      : setNewProject({ ...newProject, icon: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={editingProject ? handleUpdateProject : handleAddProject}
                  disabled={addingProject}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  {addingProject
                    ? "جاري المعالجة..."
                    : editingProject
                      ? "تحديث المشروع"
                      : "إضافة المشروع"}
                </Button>
                {editingProject && (
                  <Button
                    onClick={() => {
                      setEditingProject(null);
                      setEditData({ name: "", description: "", icon: "" });
                    }}
                    className="flex-1 bg-gray-400 hover:bg-gray-500 text-white"
                  >
                    إلغاء
                  </Button>
                )}
              </div>
            </div>

            {/* Projects List */}
            {loadingProjects && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">جاري تحميل المشاريع...</p>
              </div>
            )}
            {!loadingProjects && projects.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">لا توجد مشاريع حالياً</p>
              </div>
            )}
            {!loadingProjects && projects.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  إجمالي المشاريع: <strong>{projects.length}</strong>
                </p>
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {project.icon} {project.name}
                        </h3>
                        <p className="text-sm text-gray-600">{project.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingProject(project);
                            setEditData({
                              name: project.name,
                              description: project.description,
                              icon: project.icon,
                            });
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id!)}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === "achievements" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">إدارة الإنجازات</h2>

            {/* Add Achievement Form */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-4">إضافة إنجاز جديد</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="عنوان الإنجاز"
                  value={newAchievement.title || ""}
                  onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="number"
                  placeholder="السنة"
                  value={newAchievement.year || new Date().getFullYear()}
                  onChange={(e) => setNewAchievement({ ...newAchievement, year: parseInt(e.target.value) })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="الوصف"
                  value={newAchievement.description || ""}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="الرمز (emoji)"
                  value={newAchievement.icon || "🎯"}
                  onChange={(e) => setNewAchievement({ ...newAchievement, icon: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="number"
                  placeholder="عدد الأيتام"
                  value={newAchievement.orphans || 0}
                  onChange={(e) => setNewAchievement({ ...newAchievement, orphans: parseInt(e.target.value) || 0 })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="number"
                  placeholder="عدد الطلاب"
                  value={newAchievement.students || 0}
                  onChange={(e) => setNewAchievement({ ...newAchievement, students: parseInt(e.target.value) || 0 })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="number"
                  placeholder="عدد المرضى"
                  value={newAchievement.patients || 0}
                  onChange={(e) => setNewAchievement({ ...newAchievement, patients: parseInt(e.target.value) || 0 })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="number"
                  placeholder="عدد الأسر"
                  value={newAchievement.families || 0}
                  onChange={(e) => setNewAchievement({ ...newAchievement, families: parseInt(e.target.value) || 0 })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
                <input
                  type="text"
                  placeholder="مسار الصورة (مثال: /images/achievements/2024.jpg)"
                  value={newAchievement.imagePath || ""}
                  onChange={(e) => setNewAchievement({ ...newAchievement, imagePath: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <Button
                onClick={handleAddAchievement}
                disabled={addingAchievement}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                {addingAchievement ? "جاري الإضافة..." : "إضافة الإنجاز"}
              </Button>
            </div>

            {/* Achievements List */}
            {loadingAchievements && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">جاري تحميل الإنجازات...</p>
              </div>
            )}
            {!loadingAchievements && achievements.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">لا توجد إنجازات حالياً</p>
              </div>
            )}
            {!loadingAchievements && achievements.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  إجمالي الإنجازات: <strong>{achievements.length}</strong>
                </p>
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800">
                          {achievement.icon} {achievement.title} ({achievement.year})
                        </h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          {achievement.orphans ? `👨‍👩‍👧‍👦 ${achievement.orphans} أيتام | ` : ""}
                          {achievement.students ? `📚 ${achievement.students} طالب | ` : ""}
                          {achievement.patients ? `🏥 ${achievement.patients} مريض | ` : ""}
                          {achievement.families ? `👪 ${achievement.families} أسرة` : ""}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteAchievement(achievement.id!)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">الرسائل المستلمة</h2>
            {loadingMessages && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">جاري تحميل الرسائل...</p>
              </div>
            )}
            {!loadingMessages && messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">لا توجد رسائل حالياً</p>
              </div>
            )}
            {!loadingMessages && messages.length > 0 && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">
                  إجمالي الرسائل: <strong>{messages.length}</strong>
                </p>
                {messages.map((msg: any) => (
                  <div key={msg.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">{msg.name}</h3>
                        <p className="text-sm text-gray-600">{msg.email}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp ? new Date(msg.timestamp.toDate?.() || msg.timestamp).toLocaleDateString("ar-EG") : ""}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">☎️ {msg.phone}</p>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* KNOWLEDGE BASE TAB */}
        {activeTab === "knowledge" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">🧠 إدارة قاعدة المعرفة</h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6">
              <p className="text-blue-800 font-semibold">معلومات المؤسسة</p>
              <p className="text-blue-700 text-sm mt-2">المؤسسة: مؤسسة مشروعنا إلى الجنة للأعمال الخيرية</p>
              <p className="text-blue-700 text-sm">العنوان: 39 شارع علي قاسم، حدائق المعادي، القاهرة</p>
              <p className="text-blue-700 text-sm">الهاتف/WhatsApp: 01013128453</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded mb-6">
              <p className="text-green-800 font-semibold mb-3">المشاريع الخيرية ({projects.length})</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {projects.map((project) => (
                  <p key={project.id} className="text-green-700 text-sm">
                    {project.icon} {project.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-yellow-800 font-semibold">حالة قاعدة المعرفة</p>
              <p className="text-yellow-700 text-sm mt-2">✅ قاعدة المعرفة جاهزة وتعمل بكفاءة</p>
              <p className="text-yellow-700 text-sm">✅ المساعد الذكي يستخدم هذه المعلومات</p>
              <p className="text-yellow-700 text-sm">✅ البيانات مخزنة في Firestore</p>
              <p className="text-yellow-700 text-sm">✅ التحديثات فورية عبر Real-time Listeners</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
