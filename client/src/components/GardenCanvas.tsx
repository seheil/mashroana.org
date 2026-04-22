import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GardenItem {
  id: string;
  type: "tree" | "well" | "flower";
  x: number;
  y: number;
  delay: number;
}

export function GardenCanvas() {
  const [items, setItems] = useState<GardenItem[]>([
    // أشجار افتراضية
    { id: "tree-1", type: "tree", x: 20, y: 60, delay: 0 },
    { id: "tree-2", type: "tree", x: 50, y: 70, delay: 0.2 },
    { id: "tree-3", type: "tree", x: 80, y: 65, delay: 0.4 },
  ]);

  // محاكاة إضافة عنصر جديد عند التبرع
  useEffect(() => {
    const interval = setInterval(() => {
      if (items.length < 20) {
        const newItem: GardenItem = {
          id: `item-${Date.now()}`,
          type: ["tree", "well", "flower"][Math.floor(Math.random() * 3)] as "tree" | "well" | "flower",
          x: Math.random() * 90 + 5,
          y: Math.random() * 40 + 50,
          delay: 0,
        };
        setItems([...items, newItem]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="w-full h-96 bg-gradient-to-b from-sky-100 to-green-50 rounded-lg overflow-hidden relative border-2 border-green-200">
      {/* السماء */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200 to-transparent opacity-50" />

      {/* الأرض */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-b from-green-100 to-green-200" />

      {/* العناصر */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {items.map((item) => (
          <motion.g
            key={item.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay, duration: 0.6 }}
            style={{ x: `${item.x}%`, y: `${item.y}%` }}
          >
            {item.type === "tree" && (
              <g>
                {/* جذع الشجرة */}
                <rect x="-1" y="0" width="2" height="8" fill="#8B4513" />
                {/* أوراق الشجرة */}
                <circle cx="0" cy="-3" r="4" fill="#22c55e" />
                <circle cx="-2" cy="-1" r="3" fill="#16a34a" />
                <circle cx="2" cy="-1" r="3" fill="#16a34a" />
              </g>
            )}
            {item.type === "well" && (
              <g>
                {/* البئر */}
                <circle cx="0" cy="0" r="2" fill="#94a3b8" />
                <rect x="-3" y="-1" width="6" height="2" fill="#64748b" />
                <path d="M -2 1 Q 0 3 2 1" fill="#3b82f6" opacity="0.6" />
              </g>
            )}
            {item.type === "flower" && (
              <g>
                {/* الزهرة */}
                <circle cx="0" cy="0" r="1.5" fill="#fbbf24" />
                <circle cx="-1.5" cy="-1.5" r="1" fill="#f97316" />
                <circle cx="1.5" cy="-1.5" r="1" fill="#f97316" />
                <circle cx="-1.5" cy="1.5" r="1" fill="#f97316" />
                <circle cx="1.5" cy="1.5" r="1" fill="#f97316" />
              </g>
            )}
          </motion.g>
        ))}
      </svg>

      {/* عداد العناصر */}
      <div className="absolute top-4 left-4 bg-white/80 px-3 py-2 rounded-lg text-sm font-semibold text-green-700">
        🌳 {items.filter((i) => i.type === "tree").length} | 💧 {items.filter((i) => i.type === "well").length} | 🌸 {items.filter((i) => i.type === "flower").length}
      </div>
    </div>
  );
}
