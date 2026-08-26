export type DonationPriorityKind = "urgent" | "seasonal" | "program";
export type DonationPriorityStatus = "draft" | "published" | "closed";

export interface DonationPriorityInput {
  id: string;
  title: string;
  description: string;
  programId: string;
  programName: string;
  kind: DonationPriorityKind;
  status: DonationPriorityStatus;
  recommendationWeight: number;
  reason: string;
  sourceNote: string;
  publishedAt?: number;
  endsAt?: number;
  updatedAt?: number;
}

export interface DonationAllocation {
  priorityId?: string;
  title: string;
  programId: string;
  programName: string;
  amount: number;
  kind: DonationPriorityKind | "balanced";
  reason: string;
}

export interface DonationRecommendation {
  amount: number;
  mode: "live-priorities" | "balanced";
  allocations: DonationAllocation[];
  message: string;
  reviewedAt?: number;
}

const BALANCED_PROGRAMS = [
  { programId: "orphan-care", programName: "كفالة الأيتام", title: "رعاية الأيتام والأسر", weight: 50 },
  { programId: "education-support", programName: "الدعم التعليمي", title: "دعم التعليم", weight: 30 },
  { programId: "health-motherhood", programName: "الصحة والأمومة والطفولة", title: "الرعاية الصحية", weight: 20 },
];

function exactWeightedAmounts(amount: number, weights: number[]): number[] {
  const normalizedWeights = weights.map((weight) => Math.max(0, weight));
  const totalWeight = normalizedWeights.reduce((sum, weight) => sum + weight, 0) || normalizedWeights.length;
  const raw = normalizedWeights.map((weight) => (amount * (weight || 1)) / totalWeight);
  const values = raw.map(Math.floor);
  let remainder = amount - values.reduce((sum, value) => sum + value, 0);

  raw
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((first, second) => second.fraction - first.fraction || first.index - second.index)
    .forEach(({ index }) => {
      if (remainder > 0) {
        values[index] += 1;
        remainder -= 1;
      }
    });

  return values;
}

function isPublishedAndActive(priority: DonationPriorityInput, now: number) {
  return priority.status === "published" && (!priority.endsAt || priority.endsAt >= now);
}

function toArabicMoney(amount: number) {
  return `${amount.toLocaleString("ar-EG")} جنيه`;
}

/** Parses common Arabic donation amounts without guessing an amount when none is stated. */
export function parseArabicDonationAmount(input: string): number | null {
  const normalizedDigits = input
    .replace(/[٠-٩]/g, (digit) => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/٬/g, "")
    .replace(/،/g, " ");
  const numericMatch = normalizedDigits.match(/(?:ب|بـ)?\s*(\d{1,7})\s*(?:جنيه|جنيهًا|جنيه مصري|ج)?/i);
  if (numericMatch) {
    const amount = Number(numericMatch[1]);
    return amount > 0 ? amount : null;
  }
  const words = normalizedDigits
    .split(/[^\u0621-\u064A]+/)
    .filter(Boolean)
    .map((word) => word.replace(/^ب/, ""));
  const hasWord = (...candidates: string[]) => words.some((word) => candidates.includes(word));
  if (hasWord("نصف") && hasWord("ألف", "الف")) return 500;
  if (hasWord("ألفين", "الفين")) return 2000;
  if (hasWord("ثلاثة", "ثلاث") && hasWord("آلاف", "الاف")) return 3000;
  if (hasWord("ألف", "الف")) return 1000;
  return null;
}

export function getDonationRecommendation(
  amount: number,
  priorities: DonationPriorityInput[],
  now = Date.now()
): DonationRecommendation {
  const normalizedAmount = Math.max(1, Math.floor(Number.isFinite(amount) ? amount : 0));
  const activePriorities = priorities
    .filter((priority) => isPublishedAndActive(priority, now))
    .sort((first, second) => second.recommendationWeight - first.recommendationWeight || (second.updatedAt || 0) - (first.updatedAt || 0));

  if (activePriorities.length > 0) {
    const count = normalizedAmount >= 500 ? Math.min(3, activePriorities.length) : Math.min(2, activePriorities.length);
    const selected = activePriorities.slice(0, count);
    const amounts = exactWeightedAmounts(normalizedAmount, selected.map((priority) => priority.recommendationWeight));
    const allocations = selected.map((priority, index) => ({
      priorityId: priority.id,
      title: priority.title,
      programId: priority.programId,
      programName: priority.programName,
      amount: amounts[index],
      kind: priority.kind,
      reason: priority.reason,
    }));
    const newestReview = selected.reduce((latest, priority) => Math.max(latest, priority.updatedAt || priority.publishedAt || 0), 0) || undefined;
    const lines = allocations.map((allocation) => `• ${allocation.title}: ${toArabicMoney(allocation.amount)} — ${allocation.reason}`).join("\n");
    return {
      amount: normalizedAmount,
      mode: "live-priorities",
      allocations,
      reviewedAt: newestReview,
      message: `لديك ${toArabicMoney(normalizedAmount)}. هذا اقتراح مبني على أولويات منشورة ومعتمدة من المؤسسة الآن:\n\n${lines}\n\nالمبلغ المقترح موزع بالكامل، لكنه لا يؤكد التحويل. يرجى استخدام إحدى القنوات الرسمية والاحتفاظ بإيصال التحويل.`,
    };
  }

  const count = normalizedAmount >= 500 ? 3 : normalizedAmount >= 150 ? 2 : 1;
  const selected = BALANCED_PROGRAMS.slice(0, count);
  const amounts = exactWeightedAmounts(normalizedAmount, selected.map((program) => program.weight));
  const allocations = selected.map((program, index) => ({
    title: program.title,
    programId: program.programId,
    programName: program.programName,
    amount: amounts[index],
    kind: "balanced" as const,
    reason: "توزيع متوازن معلن عند عدم وجود أولوية مؤقتة منشورة.",
  }));
  const lines = allocations.map((allocation) => `• ${allocation.title}: ${toArabicMoney(allocation.amount)}`).join("\n");

  return {
    amount: normalizedAmount,
    mode: "balanced",
    allocations,
    message: `لديك ${toArabicMoney(normalizedAmount)}. لا توجد أولوية مؤقتة منشورة ومعتمدة الآن، لذلك نقترح توزيعاً متوازناً لا يصف أي حالة بأنها أشد احتياجاً:\n\n${lines}\n\nيمكنك اختيار برنامج واحد بدلاً من ذلك، أو التواصل مع المؤسسة إن أردت توجيه التبرع لحالة أو حملة محددة.`,
  };
}
