import { useState } from "react";

export default function Privacy() {
  const [language, setLanguage] = useState<"ar" | "en">("ar");

  const content = {
    ar: {
      title: "سياسة الخصوصية",
      lastUpdated: "آخر تحديث: 25 أبريل 2026",
      sections: [
        {
          title: "1. مقدمة",
          content:
            "مؤسسة مشروعنا إلى الجنة تحترم خصوصيتك وتلتزم بحماية بيانات المستخدمين. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك الشخصية.",
        },
        {
          title: "2. المعلومات التي نجمعها",
          content:
            "قد نجمع المعلومات التالية عند زيارتك لموقعنا أو تفاعلك معنا:\n• الاسم والبريد الإلكتروني ورقم الهاتف\n• معلومات الاتصال والعنوان\n• بيانات التبرع والمعاملات\n• معلومات الجهاز والمتصفح\n• سجل الزيارات والنقرات",
        },
        {
          title: "3. كيفية استخدام المعلومات",
          content:
            "نستخدم المعلومات التي نجمعها للأغراض التالية:\n• معالجة التبرعات والمعاملات المالية\n• التواصل معك بشأن تبرعاتك ومشاريعنا\n• تحسين خدماتنا والموقع الإلكتروني\n• الامتثال للمتطلبات القانونية\n• إرسال النشرات الإخبارية (إذا وافقت)",
        },
        {
          title: "4. حماية البيانات",
          content:
            "نتخذ تدابير أمنية مناسبة لحماية بيانات المستخدمين من الوصول غير المصرح به أو التعديل أو الكشف. نستخدم تشفير SSL وكلمات مرور قوية وأنظمة حماية متقدمة.",
        },
        {
          title: "5. مشاركة البيانات",
          content:
            "لا نشارك بيانات المستخدمين مع أطراف ثالثة إلا في الحالات التالية:\n• مع شركائنا المصرفيين لمعالجة التبرعات\n• عند الامتثال للقوانين واللوائح\n• بموافقة صريحة منك",
        },
        {
          title: "6. حقوقك",
          content:
            "لديك الحق في:\n• الوصول إلى بيانات المستخدمين الخاصة بك\n• تصحيح المعلومات غير الدقيقة\n• حذف بيانات المستخدمين (مع بعض الاستثناءات)\n• الاعتراض على معالجة بيانات المستخدمين\n• سحب الموافقة في أي وقت",
        },
        {
          title: "7. ملفات تعريف الارتباط",
          content:
            "يستخدم موقعنا ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم. يمكنك تعطيل ملفات تعريف الارتباط من خلال إعدادات متصفحك.",
        },
        {
          title: "8. التغييرات على السياسة",
          content:
            "قد نحدث هذه السياسة من وقت لآخر. سيتم إخطارك بأي تغييرات جوهرية عبر البريد الإلكتروني أو من خلال إشعار بارز على الموقع.",
        },
        {
          title: "9. التواصل معنا",
          content:
            "إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا عبر:\nالبريد الإلكتروني: contact@mashroana.org\nالهاتف: 01013128453\nالعنوان: 39 شارع علي قاسم، حدائق المعادي، القاهرة",
        },
      ],
    },
    en: {
      title: "Privacy Policy",
      lastUpdated: "Last Updated: April 25, 2026",
      sections: [
        {
          title: "1. Introduction",
          content:
            "Mashroana Foundation respects your privacy and is committed to protecting user data. This policy explains how we collect, use, and protect your personal information.",
        },
        {
          title: "2. Information We Collect",
          content:
            "We may collect the following information when you visit our website or interact with us:\n• Name, email, and phone number\n• Contact and address information\n• Donation and transaction data\n• Device and browser information\n• Visit history and clicks",
        },
        {
          title: "3. How We Use Information",
          content:
            "We use the information we collect for the following purposes:\n• Processing donations and financial transactions\n• Communicating with you about your donations and our projects\n• Improving our services and website\n• Complying with legal requirements\n• Sending newsletters (if you consent)",
        },
        {
          title: "4. Data Protection",
          content:
            "We implement appropriate security measures to protect user data from unauthorized access, modification, or disclosure. We use SSL encryption, strong passwords, and advanced protection systems.",
        },
        {
          title: "5. Data Sharing",
          content:
            "We do not share user data with third parties except in the following cases:\n• With our banking partners to process donations\n• When complying with laws and regulations\n• With your explicit consent",
        },
        {
          title: "6. Your Rights",
          content:
            "You have the right to:\n• Access your personal data\n• Correct inaccurate information\n• Delete your data (with some exceptions)\n• Object to data processing\n• Withdraw consent at any time",
        },
        {
          title: "7. Cookies",
          content:
            "Our website uses cookies to improve user experience. You can disable cookies through your browser settings.",
        },
        {
          title: "8. Policy Changes",
          content:
            "We may update this policy from time to time. You will be notified of any material changes via email or through a prominent notice on the website.",
        },
        {
          title: "9. Contact Us",
          content:
            "If you have any questions about this privacy policy, please contact us at:\nEmail: contact@mashroana.org\nPhone: +20 101 312 8453\nAddress: 39 Ali Qassem Street, Maadi Gardens, Cairo",
        },
      ],
    },
  };

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">{currentContent.title}</h1>
            <p className="text-lg opacity-90">{currentContent.lastUpdated}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage("ar")}
              className={`px-4 py-2 rounded font-bold ${
                language === "ar"
                  ? "bg-white text-green-600"
                  : "bg-green-500 text-white hover:bg-green-400"
              }`}
            >
              العربية
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded font-bold ${
                language === "en"
                  ? "bg-white text-green-600"
                  : "bg-green-500 text-white hover:bg-green-400"
              }`}
            >
              English
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={language === "ar" ? "text-right" : "text-left"}>
            {currentContent.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
