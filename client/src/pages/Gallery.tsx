import { useState } from "react";

const sampleGalleryImages = [
  {
    id: 1,
    title: "مشروع كفالة الأيتام",
    description: "توفير الرعاية والتعليم للأيتام",
    image: "🏫",
  },
  {
    id: 2,
    title: "الدعم التعليمي",
    description: "توفير المنح الدراسية والكتب",
    image: "📚",
  },
  {
    id: 3,
    title: "التمكين الاقتصادي",
    description: "دعم المشاريع الصغيرة والمتوسطة",
    image: "💼",
  },
  {
    id: 4,
    title: "زراعة النخيل",
    description: "مشروع زراعة النخيل والأشجار المثمرة",
    image: "🌴",
  },
  {
    id: 5,
    title: "الخدمات الصحية",
    description: "توفير الخدمات الطبية والعلاجية",
    image: "⚕️",
  },
  {
    id: 6,
    title: "الإغاثة الاجتماعية",
    description: "تقديم المساعدات الاجتماعية للأسر المحتاجة",
    image: "🤝",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof sampleGalleryImages)[0] | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">معرض المشاريع</h1>
          <p className="text-lg text-green-100">
            تعرف على مشاريعنا الخيرية والمبادرات المجتمعية
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleGalleryImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="bg-gradient-to-br from-green-400 to-green-600 h-48 flex items-center justify-center text-6xl">
                {item.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="text-8xl mb-4">{selectedImage.image}</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedImage.title}
              </h2>
              <p className="text-gray-600 text-lg">
                {selectedImage.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
