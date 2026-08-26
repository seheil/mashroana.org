import type {
  FirestoreHomepageContent,
  FirestoreHomepageSectionContent,
  FirestoreNavigationContent,
  FirestoreNavigationItem,
  HomepageSectionId,
} from "./firestore-schemas";

export const HOMEPAGE_SECTION_IDS: HomepageSectionId[] = ["impact", "priorities", "programs", "partnerships", "media", "donate"];

export const HOMEPAGE_SECTION_LABELS: Record<HomepageSectionId, string> = {
  impact: "مؤشرات الأثر",
  priorities: "أولويات التبرع",
  programs: "البرامج",
  partnerships: "الشراكات",
  media: "المحتوى المرئي",
  donate: "قسم التبرع",
};

export const PROTECTED_NAVIGATION_IDS = ["home", "contact"] as const;

const section = (value: FirestoreHomepageSectionContent): FirestoreHomepageSectionContent => ({ ...value });

export const DEFAULT_HOMEPAGE_CONTENT: Required<Pick<FirestoreHomepageContent, "hero" | "impact" | "priorities" | "programs" | "partnerships" | "media" | "donate" | "sectionOrder">> = {
  hero: {
    eyebrow: "مؤسسة أهلية تعمل من أجل أثر إنساني مسؤول",
    title: "نحوّل العطاء إلى برامج واضحة، وأثر يمكن متابعته.",
    description: "تعمل المؤسسة في مجالات الرعاية والتعليم والصحة والإغاثة والتمكين، مع مسارات تبرع وتواصل وشراكة واضحة.",
    primaryCtaLabel: "ادعم برنامجاً الآن",
    secondaryCtaLabel: "شراكة أو منحة",
  },
  impact: { enabled: true, eyebrow: "", title: "مؤشرات الأثر", description: "", ctaLabel: "" },
  priorities: { enabled: true, eyebrow: "", title: "", description: "", ctaLabel: "" },
  programs: { enabled: true, eyebrow: "برامجنا", title: "برامج ذات أولوية مجتمعية", description: "تُحدّث البرامج مباشرة من لوحة الإدارة، لتبقى الصفحة العامة متسقة مع ما تنفذه المؤسسة فعلياً.", ctaLabel: "كل البرامج ←" },
  partnerships: { enabled: true, eyebrow: "للشركات والجهات المانحة", title: "الشراكة الناجحة تبدأ بتحديد الأثر قبل التمويل.", description: "نرتب مساراً للمحادثة يتضمن مجال البرنامج، والفئة المستفيدة، ومؤشرات المتابعة، والوثائق المتاحة وفق سياسة النشر بالمؤسسة.", ctaLabel: "اعرف المزيد عن الشراكات" },
  media: { enabled: true, eyebrow: "من أرض الواقع", title: "المحتوى المرئي جزء من توثيق الأثر، وليس زينة.", description: "تجمع مكتبة المؤسسة الصور والفيديوهات المصرح بنشرها مع وصف يوضح البرنامج والسياق وحقوق الاستخدام.", ctaLabel: "زيارة مكتبة الوسائط ←" },
  donate: { enabled: true, eyebrow: "ساهم بأمان", title: "اختر وسيلة التبرع المناسبة لك", description: "للتأكد من وصول التبرع إلى القناة الصحيحة، استخدم البيانات الرسمية أدناه أو تواصل مع المؤسسة مباشرة قبل التحويل.", ctaLabel: "" },
  sectionOrder: ["impact", "priorities", "programs", "partnerships", "media", "donate"],
};

export const DEFAULT_NAVIGATION_ITEMS: FirestoreNavigationItem[] = [
  { id: "home", label: "الرئيسية", href: "/", enabled: true, order: 0 },
  { id: "about", label: "عن المؤسسة", href: "/about", enabled: true, order: 1 },
  { id: "projects", label: "المشاريع", href: "/projects", enabled: true, order: 2 },
  { id: "achievements", label: "إنجازاتنا", href: "/achievements", enabled: true, order: 3 },
  { id: "media", label: "المكتبة", href: "/media", enabled: true, order: 4 },
  { id: "transparency", label: "الشفافية", href: "/transparency", enabled: true, order: 5 },
  { id: "partnerships", label: "الشراكات", href: "/partnerships", enabled: true, order: 6 },
  { id: "volunteer", label: "تطوع", href: "/volunteer", enabled: true, order: 7 },
  { id: "donate", label: "تبرع", href: "/#donate", enabled: true, order: 8 },
  { id: "contact", label: "تواصل معنا", href: "/contact", enabled: true, order: 9 },
];

export const DEFAULT_NAVIGATION_CONTENT: Required<FirestoreNavigationContent> = {
  brandShortName: "مؤسسة مشروعنا",
  donateLabel: "تبرع الآن",
  footerDescription: "مؤسسة أهلية تعمل من أجل عطاء مسؤول وأثر يمكن متابعته.",
  items: DEFAULT_NAVIGATION_ITEMS,
};

export function mergeHomepageContent(content?: FirestoreHomepageContent): typeof DEFAULT_HOMEPAGE_CONTENT {
  const source = content || {};
  const validOrder = (source.sectionOrder || []).filter((id): id is HomepageSectionId => HOMEPAGE_SECTION_IDS.includes(id));
  const sectionOrder = [...validOrder, ...HOMEPAGE_SECTION_IDS.filter((id) => !validOrder.includes(id))];
  return {
    hero: { ...DEFAULT_HOMEPAGE_CONTENT.hero, ...source.hero },
    impact: section({ ...DEFAULT_HOMEPAGE_CONTENT.impact, ...source.impact }),
    priorities: section({ ...DEFAULT_HOMEPAGE_CONTENT.priorities, ...source.priorities }),
    programs: section({ ...DEFAULT_HOMEPAGE_CONTENT.programs, ...source.programs }),
    partnerships: section({ ...DEFAULT_HOMEPAGE_CONTENT.partnerships, ...source.partnerships }),
    media: section({ ...DEFAULT_HOMEPAGE_CONTENT.media, ...source.media }),
    donate: section({ ...DEFAULT_HOMEPAGE_CONTENT.donate, ...source.donate }),
    sectionOrder,
  };
}

export function mergeNavigationContent(content?: FirestoreNavigationContent): Required<FirestoreNavigationContent> {
  const sourceById = new Map((content?.items || []).map((item) => [item.id, item]));
  const items = DEFAULT_NAVIGATION_ITEMS.map((item) => {
    const update = sourceById.get(item.id);
    const protectedItem = PROTECTED_NAVIGATION_IDS.includes(item.id as (typeof PROTECTED_NAVIGATION_IDS)[number]);
    return {
      ...item,
      ...update,
      href: protectedItem ? item.href : (update?.href || item.href),
      enabled: protectedItem ? true : update?.enabled ?? item.enabled,
    };
  }).sort((first, second) => first.order - second.order);
  return {
    brandShortName: content?.brandShortName || DEFAULT_NAVIGATION_CONTENT.brandShortName,
    donateLabel: content?.donateLabel || DEFAULT_NAVIGATION_CONTENT.donateLabel,
    footerDescription: content?.footerDescription || DEFAULT_NAVIGATION_CONTENT.footerDescription,
    items,
  };
}
