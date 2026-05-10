/**
 * Foundation Knowledge Base
 * Contains all information about the foundation, its programs, and donation guidance
 */

export interface FoundationInfo {
  name: string;
  arabicName: string;
  address: string;
  phone: string;
  telegram: string;
  website: string;
  boardMembers: string[];
}

export interface Program {
  id: string;
  name: string;
  icon: string;
  description: string;
  priority: "high" | "medium" | "low";
  type: "urgent" | "sustainable" | "seasonal" | "ongoing";
  impactMessage: string;
  donationSuggestion: number; // percentage of donation
}

export interface DonationMethod {
  id: string;
  name: string;
  details: string;
  trustMessage: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FOUNDATION_INFO: FoundationInfo = {
  name: "Mashrouana Foundation for Charitable Works",
  arabicName: "مؤسسة مشروعنا إلى الجنة للأعمال الخيرية",
  address: "39 شارع علي قاسم، حدائق المعادي، القاهرة",
  phone: "01013128453",
  telegram: "https://t.me/mshro3nallgana",
  website: "mashroana.org",
  boardMembers: [
    "حنان جمال محمد مرسي – رئيس مجلس الأمناء",
    "جمال محمد مرسي السيد – نائب رئيس مجلس الأمناء",
    "عمر إبراهيم علي عبدالحميد – الأمين العام",
    "مروة جمال محمد مرسي – أمين الصندوق",
    "هنادي عبدالحميد أحمد سيد – عضو",
  ],
};

export const PROGRAMS: Program[] = [
  {
    id: "orphan-care",
    name: "كفالة الأيتام",
    icon: "👨‍👩‍👧‍👦",
    description: "دعم شهري للأطفال الأيتام والأسر المحتاجة يشمل الغذاء والتعليم والرعاية الأساسية",
    priority: "high",
    type: "ongoing",
    impactMessage: "كل تبرع يوفر رعاية شاملة لطفل يتيم",
    donationSuggestion: 30,
  },
  {
    id: "education-support",
    name: "الدعم التعليمي",
    icon: "📚",
    description: "مساعدة الطلاب بالدعم التعليمي والدروس الخصوصية والمساعدات الدراسية",
    priority: "high",
    type: "ongoing",
    impactMessage: "كل تبرع يساعد طالباً في تحسين مستواه الدراسي",
    donationSuggestion: 25,
  },
  {
    id: "sewing-workshop",
    name: "مشغل الخياطة",
    icon: "🪡",
    description: "مشروع تحت التأسيس لتدريب وتوظيف النساء - صدقة جارية مستدامة",
    priority: "medium",
    type: "sustainable",
    impactMessage: "كل تبرع يساهم في بناء مشروع يوفر فرص عمل دائمة",
    donationSuggestion: 15,
  },
  {
    id: "water-trees",
    name: "سقيا الماء وزراعة الأشجار",
    icon: "🌳",
    description: "مشاريع مستدامة طويلة الأجل للفائدة البيئية والمجتمعية",
    priority: "medium",
    type: "sustainable",
    impactMessage: "كل تبرع يساهم في أجر مستمر وفائدة بيئية",
    donationSuggestion: 15,
  },
  {
    id: "seasonal-relief",
    name: "المساعدات الموسمية والإغاثية",
    icon: "📦",
    description: "صناديق غذائية ودعم ملابس ومساعدات عائلية طارئة",
    priority: "high",
    type: "urgent",
    impactMessage: "كل تبرع يوفر إغاثة فورية للعائلات المحتاجة",
    donationSuggestion: 20,
  },
  {
    id: "eid-sacrifices",
    name: "صكوك الأضاحي",
    icon: "🐑",
    description: "مشروع موسمي في عيد الأضحى لتوزيع اللحوم على الأسر المحتاجة",
    priority: "medium",
    type: "seasonal",
    impactMessage: "كل تبرع يوفر فرحة عيد لعائلة محتاجة",
    donationSuggestion: 10,
  },
  {
    id: "health-motherhood",
    name: "الصحة والأمومة والطفولة",
    icon: "🏥",
    description: "دعم أساسي للرعاية الصحية واحتياجات الأسر",
    priority: "high",
    type: "ongoing",
    impactMessage: "كل تبرع يساهم في توفير رعاية صحية للمحتاجين",
    donationSuggestion: 10,
  },
  {
    id: "special-needs",
    name: "ذوو الاحتياجات الخاصة",
    icon: "♿",
    description: "مساعدة الأشخاص ذوي الاحتياجات الخاصة",
    priority: "medium",
    type: "ongoing",
    impactMessage: "كل تبرع يحسن حياة شخص ذي احتياجات خاصة",
    donationSuggestion: 10,
  },
  {
    id: "institutional-development",
    name: "التطوير المؤسسي",
    icon: "🏢",
    description: "تحسين أنظمة وخدمات المؤسسة",
    priority: "low",
    type: "ongoing",
    impactMessage: "كل تبرع يساهم في تطوير خدمات المؤسسة",
    donationSuggestion: 5,
  },
];

export const DONATION_METHODS: DonationMethod[] = [
  {
    id: "bank-misr",
    name: "حساب بنك مصر",
    details: "5540001000008278",
    trustMessage: "جميع التبرعات تتم عبر قنوات رسمية تابعة للمؤسسة لضمان الشفافية والأمان",
  },
  {
    id: "instapay",
    name: "InstaPay",
    details: "https://ipn.eg/S/hanan.gamal97/instapay/7EswbJ",
    trustMessage: "تحويل فوري وآمن عبر InstaPay",
  },
  {
    id: "vodafone-cash",
    name: "Vodafone Cash",
    details: "01013128453",
    trustMessage: "تحويل آمن عبر محفظة Vodafone",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    details: "01013128453",
    trustMessage: "تواصل مباشر عبر WhatsApp للاستفسار عن طرق التبرع",
  },
];

export const FAQ_ITEMS: FAQ[] = [
  {
    id: "how-to-donate",
    question: "كيف أتبرع؟",
    answer: `يمكنك التبرع بعدة طرق:
1. تحويل بنكي: حساب بنك مصر 5540001000008278
2. InstaPay: https://ipn.eg/S/hanan.gamal97/instapay/7EswbJ
3. Vodafone Cash: 01013128453
4. التواصل المباشر عبر WhatsApp: 01013128453

جميع التبرعات تتم عبر قنوات رسمية لضمان الشفافية والأمان.`,
    category: "donation",
  },
  {
    id: "foundation-location",
    question: "أين مقر المؤسسة؟",
    answer: "مقر المؤسسة: 39 شارع علي قاسم، حدائق المعادي، القاهرة",
    category: "contact",
  },
  {
    id: "foundation-activities",
    question: "ما هي أنشطة المؤسسة؟",
    answer: `المؤسسة تعمل في 9 مجالات خيرية:
1. كفالة الأيتام
2. الدعم التعليمي
3. مشغل الخياطة (تحت التأسيس)
4. سقيا الماء وزراعة الأشجار
5. المساعدات الموسمية والإغاثية
6. صكوك الأضاحي
7. الصحة والأمومة والطفولة
8. ذوو الاحتياجات الخاصة
9. التطوير المؤسسي`,
    category: "programs",
  },
  {
    id: "donation-safety",
    question: "هل التبرع آمن؟",
    answer: "نعم، جميع التبرعات تتم عبر قنوات رسمية تابعة للمؤسسة لضمان الشفافية والأمان. المؤسسة مسجلة وموثوقة.",
    category: "trust",
  },
  {
    id: "contact-us",
    question: "كيف أتواصل معكم؟",
    answer: `يمكنك التواصل معنا عبر:
- الهاتف/WhatsApp: 01013128453
- Telegram: https://t.me/mshro3nallgana
- الموقع: mashroana.org
- العنوان: 39 شارع علي قاسم، حدائق المعادي، القاهرة`,
    category: "contact",
  },
  {
    id: "volunteering",
    question: "هل يوجد فرص تطوع؟",
    answer: "نعم، نرحب بالمتطوعين. يرجى التواصل معنا مباشرة عبر الهاتف أو WhatsApp على 01013128453 للاستفسار عن فرص التطوع.",
    category: "volunteering",
  },
  {
    id: "bank-account",
    question: "ما هو رقم الحساب البنكي؟",
    answer: "حساب بنك مصر: 5540001000008278",
    category: "donation",
  },
  {
    id: "instapay-link",
    question: "هل يوجد رابط InstaPay؟",
    answer: "نعم، رابط InstaPay: https://ipn.eg/S/hanan.gamal97/instapay/7EswbJ",
    category: "donation",
  },
  {
    id: "sewing-workshop-status",
    question: "هل مشغل الخياطة قائم؟",
    answer: "مشغل الخياطة حالياً تحت التأسيس. إنه مشروع مستدام يهدف لتدريب وتوظيف النساء. يعتبر من مشاريع الصدقة الجارية.",
    category: "programs",
  },
  {
    id: "best-project",
    question: "ما أفضل مشروع أتبرع له؟",
    answer: `يعتمد على أهدافك:
- إذا كنت تبحث عن أجر مستمر طويل المدى: مشغل الخياطة وسقيا الماء من أفضل المشاريع
- إذا كنت تريد دعماً عاجلاً مباشراً: كفالة الأيتام والإغاثة من أكثر المجالات احتياجاً
- يمكنك تقسيم التبرع بين أكثر من مشروع لتحقيق أثر متوازن`,
    category: "donation-guidance",
  },
];

/**
 * Get intelligent donation recommendation based on amount
 */
export function getIntelligentDonationRecommendation(amount: number): {
  projects: Array<{ project: Program; amount: number }>;
  message: string;
} {
  const recommendations = [];
  let message = `لتبرع ${amount} جنيه بأثر متوازن، نقترح عليك:\n\n`;

  // High priority ongoing projects get more
  const orphanCare = PROGRAMS.find((p) => p.id === "orphan-care")!;
  const educationSupport = PROGRAMS.find((p) => p.id === "education-support")!;
  const seasonalRelief = PROGRAMS.find((p) => p.id === "seasonal-relief")!;
  const sewingWorkshop = PROGRAMS.find((p) => p.id === "sewing-workshop")!;
  const waterTrees = PROGRAMS.find((p) => p.id === "water-trees")!;

  const orphanAmount = Math.floor((amount * 30) / 100);
  const educationAmount = Math.floor((amount * 25) / 100);
  const reliefAmount = Math.floor((amount * 20) / 100);
  const sewingAmount = Math.floor((amount * 15) / 100);
  const waterAmount = amount - orphanAmount - educationAmount - reliefAmount - sewingAmount;

  recommendations.push(
    { project: orphanCare, amount: orphanAmount },
    { project: educationSupport, amount: educationAmount },
    { project: seasonalRelief, amount: reliefAmount },
    { project: sewingWorkshop, amount: sewingAmount },
    { project: waterTrees, amount: waterAmount }
  );

  recommendations.forEach(({ project, amount: amt }) => {
    if (amt > 0) {
      message += `• ${project.icon} ${project.name}: ${amt} جنيه\n`;
      message += `  ${project.impactMessage}\n\n`;
    }
  });

  return { projects: recommendations, message };
}
