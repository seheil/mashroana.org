// بيانات التبرع والتواصل
export const DONATION_METHODS = {
  whatsapp: "01013128453",
  vodafone_cash: "01013128453", // نفس رقم الواتس
  instapay_link: "https://ipn.eg/S/hanan.gamal97/instapay/7EswbJ",
  instapay_number: "010",
};

// الإحصائيات
export const STATISTICS = {
  orphans: { current: 0, target: 500 },
  families: { current: 0, target: 1000 },
  totalBeneficiaries: { current: 51, target: 2000 },
  complex: { current: 500000, target: 2000000 }, // المجمع الخيري
};

export const PROJECTS_DATA = [
  {
    id: 1,
    name: "تجهيز العرائس",
    description: "مساعدة الفتيات الفقيرات",
    details: "تجهيز الفتيات الفقيرات للزواج بكرامة وعفة",
    goal: "تجهيز 100 عروس سنوياً",
    icon: "Heart",
  },
  {
    id: 2,
    name: "كسوة الأعياد",
    description: "إفراح الأطفال الفقراء",
    details: "توفير ملابس جديدة للأطفال المحتاجين في الأعياد",
    goal: "كسوة 5,000 طفل",
    icon: "Gift",
  },
  {
    id: 3,
    name: "كفالة الأيتام",
    description: "رعاية الأطفال الأيتام",
    details: "توفير الرعاية والتعليم والصحة للأطفال الأيتام",
    goal: "كفالة 500 يتيم",
    icon: "Users",
  },
  {
    id: 4,
    name: "المجمع الخيري",
    description: "مشروع استثماري خيري متكامل",
    details: "هدفنا بناء مجمع خيري شامل يضم مسجد، مركز طبي، مؤسسة خيرية، مشغل للنساء الأرامل والمطلقات، ومركز تعليم علوم شرعية",
    goal: "السهم بـ 1000 جنيه - شارك في الخير الدائم",
    isSpecial: true,
    hasProgressBar: true,
    current: 500000,
    target: 2000000,
    icon: "Building2",
  },
  {
    id: 5,
    name: "زراعة النخيل",
    description: "مشروع اقتصادي مستدام",
    details: "زراعة النخيل لتوفير دخل مستدام للأسر الفقيرة",
    goal: "زراعة 1,000 نخلة",
    icon: "Leaf",
  },
];
