import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { doc, getDoc, setDoc, collection, query, orderBy, onSnapshot, addDoc, deleteDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [counters, setCounters] = useState({
    orphans: 0,
    students: 0,
    patients: 0,
    families: 0,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", icon: "" });
  const [addingProject, setAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editData, setEditData] = useState({ name: "", description: "", icon: "" });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      setLocation("/admin-login");
    }
  }, [user, loading, setLocation]);

  // Load counters from Firestore
  useEffect(() => {
    if (user) {
      loadCounters();
      loadMessages();
      loadProjects();
    }
  }, [user]);

  const loadCounters = async () => {
    try {
      const docRef = doc(db, "settings", "counters");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCounters({
          orphans: data.orphans || 0,
          students: data.students || 0,
          patients: data.patients || 0,
          families: data.families || 0,
        });
      }
    } catch (err) {
      console.error("Error loading counters:", err);
    }
  };

  const loadMessages = async () => {
    try {
      setLoadingMessages(true);
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);
      });
      return unsubscribe;
    } catch (err) {
      console.error("Error loading messages:", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const loadProjects = async () => {
    try {
      setLoadingProjects(true);
      const projectsRef = collection(db, "projects");
      const q = query(projectsRef, orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const proj = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(proj);
      });
      return unsubscribe;
    } catch (err) {
      console.error("Error loading projects:", err);
    } finally {
      setLoadingProjects(false);
    }
  };

  const handleCounterChange = (key: string, value: number) => {
    setCounters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const docRef = doc(db, "settings", "counters");
      await setDoc(docRef, counters);
      setMessage("تم حفظ البيانات بنجاح!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("خطأ في حفظ البيانات: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddProject = async () => {
    if (!newProject.name || !newProject.description || !newProject.icon) {
      setMessage("الرجاء ملء جميع الحقول");
      return;
    }
    setAddingProject(true);
    setMessage("");
    try {
      const projectsRef = collection(db, "projects");
      await addDoc(projectsRef, {
        ...newProject,
        createdAt: serverTimestamp(),
      });
      setMessage("تم إضافة المشروع بنجاح!");
      setNewProject({ name: "", description: "", icon: "" });
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("خطأ في إضافة المشروع: " + err.message);
    } finally {
      setAddingProject(false);
    }
  };

  const handleEditProject = (project: any) => {
    setEditingProject(project.id);
    setEditData({
      name: project.name,
      description: project.description,
      icon: project.icon,
    });
  };

  const handleSaveEdit = async () => {
    if (!editingProject || !editData.name || !editData.description || !editData.icon) {
      setMessage("الرجاء ملء جميع الحقول");
      return;
    }
    try {
      const projectRef = doc(db, "projects", editingProject);
      await updateDoc(projectRef, editData);
      setMessage("تم تحديث المشروع بنجاح!");
      setEditingProject(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("خطأ في تحديث المشروع: " + err.message);
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا المشروع؟")) return;
    try {
      const projectRef = doc(db, "projects", projectId);
      await deleteDoc(projectRef);
      setMessage("تم حذف المشروع بنجاح!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage("خطأ في حذف المشروع: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLocation("/");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>جاري التحميل...</p>
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
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            تسجيل الخروج
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6 bg-white rounded-lg shadow p-4 flex-wrap">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded font-semibold transition ${
              activeTab === "dashboard"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            لوحة التحكم
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded font-semibold transition ${
              activeTab === "projects"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            المشاريع
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 py-2 rounded font-semibold transition ${
              activeTab === "gallery"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            المعرض
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 rounded font-semibold transition ${
              activeTab === "messages"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            الرسائل
          </button>
          <button
            onClick={() => setActiveTab("knowledge")}
            className={`px-4 py-2 rounded font-semibold transition ${
              activeTab === "knowledge"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🧠 قاعدة المعرفة
          </button>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-6 p-4 rounded ${
              message.includes("خطأ")
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300"
            }`}
          >
            {message}
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">الإحصائيات</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  عدد الأيتام
                </label>
                <input
                  type="number"
                  value={counters.orphans}
                  onChange={(e) =>
                    handleCounterChange("orphans", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  عدد الطلاب
                </label>
                <input
                  type="number"
                  value={counters.students}
                  onChange={(e) =>
                    handleCounterChange("students", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  عدد المرضى
                </label>
                <input
                  type="number"
                  value={counters.patients}
                  onChange={(e) =>
                    handleCounterChange("patients", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  عدد الأسر
                </label>
                <input
                  type="number"
                  value={counters.families}
                  onChange={(e) =>
                    handleCounterChange("families", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                />
              </div>
            </div>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6"
            >
              {saving ? "جاري الحفظ..." : "حفظ البيانات"}
            </Button>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">إدارة المشاريع</h2>
            
            {/* Add New Project Form */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 mb-8 border-l-4 border-green-600">
              <h3 className="text-lg font-bold mb-4">إضافة مشروع جديد</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">اسم المشروع</label>
                  <input
                    type="text"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="مثال: كفالة الأيتام"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">الأيقونة (emoji)</label>
                  <input
                    type="text"
                    value={newProject.icon}
                    onChange={(e) => setNewProject({ ...newProject, icon: e.target.value })}
                    placeholder="مثال: 👶"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                    maxLength={2}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">الوصف</label>
                  <input
                    type="text"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="وصف المشروع"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                  />
                </div>
              </div>
              <button
                onClick={handleAddProject}
                disabled={addingProject}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded disabled:bg-gray-400 transition"
              >
                {addingProject ? "جاري الإضافة..." : "✅ إضافة المشروع"}
              </button>
            </div>

            {/* Projects List */}
            {loadingProjects ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-2 text-gray-600">جاري تحميل المشاريع...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded">
                <p className="text-gray-500 text-lg">لا توجد مشاريع حالياً - أضف مشروع جديد</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-600 mb-4">إجمالي المشاريع: <strong>{projects.length}</strong></p>
                {projects.map((project: any) => (
                  <div key={project.id}>
                    {editingProject === project.id ? (
                      <div className="border-l-4 border-blue-600 bg-blue-50 rounded-lg p-4 mb-4">
                        <h3 className="text-lg font-bold mb-3 text-gray-800">تعديل المشروع</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                            placeholder="اسم المشروع"
                          />
                          <input
                            type="text"
                            value={editData.icon}
                            onChange={(e) => setEditData({ ...editData, icon: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                            placeholder="الأيقونة"
                            maxLength={2}
                          />
                          <input
                            type="text"
                            value={editData.description}
                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-600"
                            placeholder="الوصف"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded text-sm"
                          >
                            💾 حفظ
                          </button>
                          <button
                            onClick={() => setEditingProject(null)}
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-4 rounded text-sm"
                          >
                            ❌ إلغاء
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800">
                              {project.icon} {project.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                          </div>
                          <div className="flex gap-2 ml-2">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                            >
                              ✏️ تعديل
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                            >
                              🗑️ حذف
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )
            }
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">إدارة المعرض</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <div className="flex items-start">
                <div className="text-3xl mr-4">⏳</div>
                <div>
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">رفع الصور قيد التطوير</h3>
                  <p className="text-yellow-700 mb-3">
                    سيتم تفعيل خاصية رفع الصور إلى المعرض لاحقاً بعد إكمال إعدادات Firebase Storage.
                  </p>
                  <p className="text-yellow-600 text-sm">
                    حالياً، المعرض يعرض صور ثابتة. سيتم تحديث هذه الصفحة قريباً.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
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
                <p className="text-sm text-gray-600 mb-4">إجمالي الرسائل: <strong>{messages.length}</strong></p>
                {messages.map((msg: any) => (
                  <div key={msg.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">{msg.name}</h3>
                        <p className="text-sm text-gray-600">{msg.email}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleDateString("ar-EG") : ""}
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

        {/* Knowledge Base Tab */}
        {activeTab === "knowledge" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">🧠 إدارة قاعدة المعرفة</h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6">
              <p className="text-blue-800 font-semibold">معلومات المؤسسة</p>
              <p className="text-blue-700 text-sm mt-2">المؤسسة: مؤسسة مشروعنا إلى الجنة للأعمال الخيرية</p>
              <p className="text-blue-700 text-sm">العنوان: 39 شارع علي قاسم، حدائق المعادي، القاهرة</p>
              <p className="text-blue-700 text-sm">الهاتف/WhatsApp: 01013128453</p>
              <p className="text-blue-700 text-sm">Telegram: https://t.me/mshro3nallgana</p>
            </div>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded mb-6">
              <p className="text-green-800 font-semibold mb-3">المشاريع الخيرية (9 مجالات)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p className="text-green-700 text-sm">👨‍👩‍👧‍👦 كفالة الأيتام</p>
                <p className="text-green-700 text-sm">📚 الدعم التعليمي</p>
                <p className="text-green-700 text-sm">🪡 مشغل الخياطة (تحت التأسيس)</p>
                <p className="text-green-700 text-sm">🌳 سقيا الماء وزراعة الأشجار</p>
                <p className="text-green-700 text-sm">📦 المساعدات الموسمية والإغاثية</p>
                <p className="text-green-700 text-sm">🐑 صكوك الأضاحي</p>
                <p className="text-green-700 text-sm">🏥 الصحة والأمومة والطفولة</p>
                <p className="text-green-700 text-sm">♿ ذوو الاحتياجات الخاصة</p>
                <p className="text-green-700 text-sm">🏢 التطوير المؤسسي</p>
              </div>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded mb-6">
              <p className="text-purple-800 font-semibold mb-3">طرق التبرع الآمنة</p>
              <p className="text-purple-700 text-sm">💳 حساب بنك مصر: 5540001000008278</p>
              <p className="text-purple-700 text-sm">💳 InstaPay: https://ipn.eg/S/hanan.gamal97/instapay/7EswbJ</p>
              <p className="text-purple-700 text-sm">💳 Vodafone Cash: 01013128453</p>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-yellow-800 font-semibold">حالة قاعدة المعرفة</p>
              <p className="text-yellow-700 text-sm mt-2">✅ قاعدة المعرفة جاهزة وتعمل بكفاءة</p>
              <p className="text-yellow-700 text-sm">✅ المساعد الذكي يستخدم هذه المعلومات</p>
              <p className="text-yellow-700 text-sm">✅ إرشادات التبرع الذكية مفعلة</p>
              <p className="text-yellow-700 text-sm">✅ الإجابات على الأسئلة الشائعة متاحة</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

