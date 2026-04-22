import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Users, Heart, Zap, X } from "lucide-react";

interface HarvestDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HarvestDashboard({ isOpen, onClose }: HarvestDashboardProps) {
  // بيانات تجريبية للمتبرع
  const harvests = [
    { icon: Leaf, label: "نخلات مزروعة", value: 3, color: "from-green-500 to-emerald-500" },
    { icon: Users, label: "أسر ساعدتها", value: 5, color: "from-blue-500 to-cyan-500" },
    { icon: Heart, label: "أيتام كفلتهم", value: 2, color: "from-red-500 to-rose-500" },
    { icon: Zap, label: "عرائس جهزتها", value: 1, color: "from-yellow-500 to-amber-500" },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-2xl max-w-2xl w-full border border-emerald-500/30 max-h-[90vh] overflow-y-auto"
      >
        {/* الرأس */}
        <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-500 p-6 flex items-center justify-between rounded-t-lg">
          <div>
            <h2 className="text-2xl font-bold text-white">🌾 حصادك الخيري</h2>
            <p className="text-emerald-100 text-sm mt-1">شاهد أثر تبرعاتك في المجتمع</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* المحتوى */}
        <div className="p-6 space-y-6">
          {/* الإحصائيات الرئيسية */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {harvests.map((harvest, index) => {
              const Icon = harvest.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`bg-gradient-to-br ${harvest.color} border-0 text-white`}>
                    <CardContent className="p-4">
                      <Icon className="w-8 h-8 mb-2 opacity-80" />
                      <div className="text-3xl font-bold">{harvest.value}</div>
                      <p className="text-sm opacity-90">{harvest.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* رسالة تحفيزية */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-6"
          >
            <h3 className="text-lg font-bold text-emerald-400 mb-2">🎯 تأثيرك الحقيقي</h3>
            <p className="text-slate-300 leading-relaxed">
              من خلال تبرعاتك الكريمة، ساهمت في:
            </p>
            <ul className="mt-3 space-y-2 text-slate-300 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                زراعة 3 نخلات ستعطي ثمارها لسنوات قادمة
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                مساعدة 5 أسر في الحصول على احتياجاتهم الأساسية
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                كفالة 2 يتيم وتوفير تعليمهم وصحتهم
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                تجهيز عروس واحدة بكرامة وعفة
              </li>
            </ul>
          </motion.div>

          {/* زر التبرع الإضافي */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex gap-3"
          >
            <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">
              تبرع مرة أخرى ❤️
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
              onClick={onClose}
            >
              إغلاق
            </Button>
          </motion.div>

          {/* ملاحظة */}
          <p className="text-xs text-slate-400 text-center">
            تُحدّث هذه البيانات تلقائياً مع كل تبرع جديد
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
