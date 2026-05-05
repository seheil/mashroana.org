import { useState } from "react";
import { galleryImages } from "@/../../shared/gallery-images";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "جميع المشاريع", nameEn: "All Projects" },
    { id: "social", name: "الخدمات الاجتماعية", nameEn: "Social Services" },
    { id: "education", name: "التعليم", nameEn: "Education" },
    { id: "economic", name: "التمكين الاقتصادي", nameEn: "Economic" },
    { id: "environment", name: "البيئة", nameEn: "Environment" },
    { id: "health", name: "الصحة", nameEn: "Health" },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">معرض المشاريع</h1>
          <p className="text-lg text-green-100">
            تعرف على مشاريعنا الخيرية والمبادرات المجتمعية
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border-2 border-green-600 hover:bg-green-50"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-600 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback to emoji if image not found
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-6xl">📁</div>`;
                      }
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">لا توجد مشاريع في هذه الفئة</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative h-96 bg-gradient-to-br from-green-400 to-green-600 overflow-hidden">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-8xl">📁</div>`;
                  }
                }}
              />
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedImage.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {selectedImage.titleEn}
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {selectedImage.description}
              </p>
              <p className="text-gray-600 text-sm mb-6">
                {selectedImage.descriptionEn}
              </p>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
