/**
 * المشاريع الخيرية الـ 12 الرسمية
 * البيانات الأساسية لكل مشروع خيري
 */

export interface CharityProject {
  id: number;
  name: string;
  arabicName: string;
  description: string;
  icon: string;
  color: string;
  suggestedAmount: number;
  impactDescription: string;
  category: string;
}

export const CHARITY_PROJECTS: CharityProject[] = [
  {
    id: 1,
    name: "Sacrifice",
    arabicName: "أضحية",
    description: "توفير الأضاحي للأسر المحتاجة في العيد",
    icon: "🐑",
    color: "from-amber-500 to-orange-500",
    suggestedAmount: 1500,
    impactDescription: "كل 1500 جنيه = أضحية واحدة توزع على أسرة محتاجة",
    category: "Social Aid"
  },
  {
    id: 2,
    name: "Orphan Sponsorship",
    arabicName: "كفالة أيتام",
    description: "كفالة يتيم وتوفير احتياجاته الأساسية",
    icon: "👨‍👧",
    color: "from-pink-500 to-rose-500",
    suggestedAmount: 500,
    impactDescription: "كل 500 جنيه = كفالة شهرية لطفل يتيم",
    category: "Motherhood & Childhood"
  },
  {
    id: 3,
    name: "Bride Furnishing",
    arabicName: "جهاز عرايس",
    description: "توفير جهاز العروس للفتيات المحتاجات",
    icon: "💍",
    color: "from-red-500 to-rose-500",
    suggestedAmount: 3000,
    impactDescription: "كل 3000 جنيه = جهاز عروس كامل لفتاة محتاجة",
    category: "Social Aid"
  },
  {
    id: 4,
    name: "Meals for Families",
    arabicName: "إطعامات للأسر والمرضى",
    description: "توفير وجبات غذائية صحية للأسر المحتاجة والمرضى",
    icon: "🍲",
    color: "from-yellow-500 to-amber-500",
    suggestedAmount: 200,
    impactDescription: "كل 200 جنيه = وجبات غذائية لأسرة واحدة",
    category: "Social Aid"
  },
  {
    id: 5,
    name: "Medical Treatment",
    arabicName: "علاجات مرضى",
    description: "توفير الأدوية والعلاجات للمرضى المحتاجين",
    icon: "💊",
    color: "from-blue-500 to-cyan-500",
    suggestedAmount: 300,
    impactDescription: "كل 300 جنيه = علاج شامل لمريض واحد",
    category: "Healthcare"
  },
  {
    id: 6,
    name: "Rent Assistance",
    arabicName: "إيجارات لأسر",
    description: "مساعدة الأسر المحتاجة على دفع الإيجار",
    icon: "🏠",
    color: "from-green-500 to-emerald-500",
    suggestedAmount: 1000,
    impactDescription: "كل 1000 جنيه = مساعدة في دفع إيجار شهري",
    category: "Social Aid"
  },
  {
    id: 7,
    name: "Children Clothing",
    arabicName: "كسوة أطفال",
    description: "توفير ملابس للأطفال (العيد، المدارس، الفصول)",
    icon: "👕",
    color: "from-purple-500 to-indigo-500",
    suggestedAmount: 250,
    impactDescription: "كل 250 جنيه = ملابس كاملة لطفل واحد",
    category: "Motherhood & Childhood"
  },
  {
    id: 8,
    name: "Islamic Books",
    arabicName: "كتب طلبة علم",
    description: "توفير الكتب الإسلامية والعلمية لطلبة العلم",
    icon: "📚",
    color: "from-indigo-500 to-purple-500",
    suggestedAmount: 150,
    impactDescription: "كل 150 جنيه = مجموعة كتب لطالب علم واحد",
    category: "Education"
  },
  {
    id: 9,
    name: "Food Packages",
    arabicName: "شنط غذائية",
    description: "توزيع شنط غذائية متنوعة على الأسر المحتاجة",
    icon: "🎁",
    color: "from-orange-500 to-red-500",
    suggestedAmount: 300,
    impactDescription: "كل 300 جنيه = شنطة غذائية لأسرة واحدة",
    category: "Social Aid"
  },
  {
    id: 10,
    name: "Debt Relief",
    arabicName: "سد دين",
    description: "مساعدة الأشخاص على سداد ديونهم",
    icon: "💳",
    color: "from-teal-500 to-cyan-500",
    suggestedAmount: 500,
    impactDescription: "كل 500 جنيه = مساعدة في سداد دين",
    category: "Social Aid"
  },
  {
    id: 11,
    name: "Children Events",
    arabicName: "حفلات للأطفال",
    description: "تنظيم حفلات وفعاليات للأطفال المحتاجين",
    icon: "🎉",
    color: "from-pink-500 to-purple-500",
    suggestedAmount: 400,
    impactDescription: "كل 400 جنيه = حفلة فرح لمجموعة أطفال",
    category: "Motherhood & Childhood"
  },
  {
    id: 12,
    name: "Blankets",
    arabicName: "شراء بطاطين",
    description: "توفير البطاطين الدافئة للأسر المحتاجة",
    icon: "🛏️",
    color: "from-blue-500 to-indigo-500",
    suggestedAmount: 200,
    impactDescription: "كل 200 جنيه = بطانية دافئة لأسرة واحدة",
    category: "Social Aid"
  },
  {
    id: 13,
    name: "School Supplies",
    arabicName: "أدوات مدارس",
    description: "توفير الأدوات والمستلزمات المدرسية للطلاب المحتاجين",
    icon: "✏️",
    color: "from-green-500 to-teal-500",
    suggestedAmount: 250,
    impactDescription: "كل 250 جنيه = أدوات مدرسية كاملة لطالب واحد",
    category: "Education"
  }
];

/**
 * إحصائيات المشاريع (قابلة للتحديث من لوحة التحكم)
 */
export interface ProjectStatistics {
  projectId: number;
  totalDonations: number;
  beneficiaries: number;
  completedProjects: number;
  lastUpdated: string;
}

/**
 * بيانات البستان الرقمي (قابلة للتحديث)
 */
export interface GardenElement {
  id: string;
  type: "tree" | "palm" | "well" | "flower";
  name: string;
  arabicName: string;
  x: number;
  y: number;
  count: number;
  donatedAmount: number;
  lastAdded: string;
}

export const DEFAULT_GARDEN_ELEMENTS: GardenElement[] = [
  {
    id: "palm-trees",
    type: "palm",
    name: "Palm Trees",
    arabicName: "أشجار النخيل",
    x: 50,
    y: 30,
    count: 0,
    donatedAmount: 0,
    lastAdded: new Date().toISOString()
  },
  {
    id: "fruit-trees",
    type: "tree",
    name: "Fruit Trees",
    arabicName: "الأشجار المثمرة",
    x: 70,
    y: 40,
    count: 0,
    donatedAmount: 0,
    lastAdded: new Date().toISOString()
  },
  {
    id: "wells",
    type: "well",
    name: "Water Wells",
    arabicName: "الآبار",
    x: 30,
    y: 60,
    count: 0,
    donatedAmount: 0,
    lastAdded: new Date().toISOString()
  },
  {
    id: "flowers",
    type: "flower",
    name: "Flowers",
    arabicName: "الزهور",
    x: 60,
    y: 70,
    count: 0,
    donatedAmount: 0,
    lastAdded: new Date().toISOString()
  }
];
