import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { signOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
        <div className="flex gap-4 mb-6 bg-white rounded-lg shadow p-4">
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

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">إدارة المعرض</h2>
            <p className="text-gray-600 mb-4">
              يمكنك إضافة الصور من خلال Firebase Storage Console
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <p className="text-blue-800">
                <strong>ملاحظة:</strong> لإضافة صور جديدة، استخدم Firebase Storage Console
              </p>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">الرسائل</h2>
            <p className="text-gray-600">
              سيتم عرض الرسائل المرسلة من نموذج الاتصال هنا
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
