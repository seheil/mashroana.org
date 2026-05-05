import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // TODO: Implement Firebase Authentication
      // For now, use a demo login
      if (email === "admin@mashroana.org" && password === "admin123") {
        localStorage.setItem("adminToken", "demo-token-" + Date.now());
        setLocation("/admin-dashboard");
      } else {
        setError("بيانات الدخول غير صحيحة");
      }
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🌱</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            لوحة التحكم
          </h1>
          <p className="text-gray-600">مؤسسة مشروعنا إلى الجنة</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
              placeholder="admin@mashroana.org"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
          >
            {loading ? "جاري الدخول..." : "دخول"}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>بيانات التجربة:</strong>
            <br />
            البريد: admin@mashroana.org
            <br />
            كلمة المرور: admin123
          </p>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          © 2026 مؤسسة مشروعنا إلى الجنة
        </p>
      </div>
    </div>
  );
}
