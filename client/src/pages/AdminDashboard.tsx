import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [counters, setCounters] = useState({
    orphans: 150,
    students: 200,
    patients: 300,
    families: 100,
  });

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setLocation("/");
  };

  const handleCounterChange = (key: string, value: number) => {
    setCounters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // TODO: Save to Firebase
    alert("تم حفظ البيانات بنجاح!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">لوحة التحكم الإدارية</h1>
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
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === "dashboard"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            لوحة التحكم
          </button>
          <button
            onClick={() => setActiveTab("counters")}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === "counters"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            الإحصائيات
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === "gallery"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            المعرض
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-4 py-2 rounded font-semibold ${
              activeTab === "messages"
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            الرسائل
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 font-semibold mb-2">الأيتام</h3>
              <p className="text-4xl font-bold text-green-600">{counters.orphans}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 font-semibold mb-2">الطلاب</h3>
              <p className="text-4xl font-bold text-blue-600">{counters.students}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 font-semibold mb-2">المرضى</h3>
              <p className="text-4xl font-bold text-red-600">{counters.patients}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-gray-600 font-semibold mb-2">الأسر</h3>
              <p className="text-4xl font-bold text-purple-600">{counters.families}</p>
            </div>
          </div>
        )}

        {/* Counters Tab */}
        {activeTab === "counters" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">تحديث الإحصائيات</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  عدد الأيتام
                </label>
                <input
                  type="number"
                  value={counters.orphans}
                  onChange={(e) => handleCounterChange("orphans", parseInt(e.target.value))}
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
                  onChange={(e) => handleCounterChange("students", parseInt(e.target.value))}
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
                  onChange={(e) => handleCounterChange("patients", parseInt(e.target.value))}
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
                  onChange={(e) => handleCounterChange("families", parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
                />
              </div>
              <Button
                onClick={handleSave}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
              >
                حفظ التغييرات
              </Button>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">إدارة المعرض</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">اسحب الصور هنا أو انقر للاختيار</p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                اختر الصور
              </Button>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">الرسائل المستلمة</h2>
            <div className="text-center text-gray-600 py-8">
              لا توجد رسائل حالياً
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
