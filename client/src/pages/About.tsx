import { foundationData } from "@/../../shared/foundation-data";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">عن المؤسسة</h1>
          <p className="text-lg opacity-90">تعرف على رسالتنا وأهدافنا</p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">من نحن؟</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {foundationData.about.content}
            </p>
          </div>
        </div>
      </section>

      {/* Board Members */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            أعضاء مجلس الأمناء
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {foundationData.boardMembers.map((member: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-semibold text-sm">
                      {member.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            قيمنا الأساسية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
              <h3 className="text-xl font-bold mb-3 text-gray-800">🤝 الشفافية</h3>
              <p className="text-gray-600">
                نؤمن بالشفافية الكاملة في جميع تعاملات المؤسسة والتبرعات
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold mb-3 text-gray-800">❤️ الرحمة</h3>
              <p className="text-gray-600">
                نعمل بروح الرحمة والعطف تجاه جميع المحتاجين والفقراء
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
              <h3 className="text-xl font-bold mb-3 text-gray-800">🎯 الكفاءة</h3>
              <p className="text-gray-600">
                نسعى لتقديم أفضل خدمات بأعلى مستويات الكفاءة والمهنية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            معلومات التواصل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-3">📍 العنوان</h3>
              <p className="text-gray-600">{foundationData.contact.address}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-3">📞 الهاتف</h3>
              <p className="text-gray-600">{foundationData.contact.phone}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
