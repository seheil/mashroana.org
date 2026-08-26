import {
  DONATION_ADVISOR_EXPERTISE,
  DONATION_METHODS,
  FAQ_ITEMS,
  FOUNDATION_INFO,
  PROGRAMS,
} from "./foundation-knowledge";
import {
  getDonationRecommendation,
  parseArabicDonationAmount,
  type DonationPriorityInput,
} from "./donation-priority-engine";

export function getDonationAdvisorResponse(userMessage: string, priorities: DonationPriorityInput[]): string {
  const lower = userMessage.toLowerCase();
  const donationAmount = parseArabicDonationAmount(userMessage);
  const asksForDonationPlan = /قسم|قسّم|وزع|وزّع|توزيع|مبلغ/.test(lower);
  const mentionsDonation = /تبرع|اتبرع|دفع|جنيه|ألف|الف/.test(lower);
  const activePriorities = priorities.filter((priority) => priority.status === "published" && (!priority.endsAt || priority.endsAt >= Date.now()));

  if (lower.includes("إيصال") || lower.includes("تأكيد التحويل") || lower.includes("تأكيد التبرع")) {
    return "فتح رابط التبرع أو نسخ رقم التحويل لا يؤكد عملية تبرع. استخدم القناة الرسمية المناسبة، واحتفظ بالإيصال، ثم تواصل مع المؤسسة عبر WhatsApp أو الهاتف إذا احتجت متابعة أو توجيهاً.";
  }
  if (lower.includes("شفاف") || lower.includes("أين يذهب") || lower.includes("الثقة") || lower.includes("آمن")) {
    return "نلتزم بأن تكون التوصية واضحة: عند وجود أولوية منشورة، أذكر سببها والمبلغ المقترح لكل بند. وعند عدم وجود أولوية معتمدة، أقول صراحة إن التوزيع متوازن وليس إعلاناً عن حالة عاجلة. استخدم القنوات الرسمية واحتفظ بالإيصال، ويمكنك زيارة مركز الشفافية ومنهجية الأثر في الموقع.";
  }
  if (lower.includes("ماذا تستطيع") || lower.includes("خبرة") || lower.includes("تساعدني")) {
    return `أستطيع مساعدتك في:\n\n${DONATION_ADVISOR_EXPERTISE.map((item) => `• ${item}`).join("\n")}\n\nأرسل مبلغاً محدداً لأبدأ باقتراح عملي.`;
  }
  if (mentionsDonation && donationAmount) {
    return getDonationRecommendation(donationAmount, activePriorities).message;
  }
  if (lower.includes("أولوية") || lower.includes("عاجل") || lower.includes("مدارس") || lower.includes("حالة")) {
    if (activePriorities.length === 0) return "لا توجد أولوية مؤقتة منشورة ومعتمدة الآن. هذا يعني أنني لن أصف أي برنامج بأنه أشد احتياجاً دون بيانات من الإدارة. أستطيع اقتراح توزيع متوازن إذا أرسلت مبلغ التبرع، مثل: «اقترح تقسيم 1000 جنيه».";
    return `هذه أولويات منشورة ومعتمدة الآن:\n\n${activePriorities.slice(0, 3).map((priority) => `• ${priority.title}\n${priority.description}\nالسبب: ${priority.reason}`).join("\n\n")}\n\nأرسل مبلغك وسأقسمه بمبالغ دقيقة وفق هذه الأولويات.`;
  }
  if (asksForDonationPlan) {
    return "أرسلي قيمة المبلغ لأقترح توزيعاً دقيقاً. مثال: «أريد أن أتبرع بألف جنيه» أو «اقترح تقسيم 500 جنيه». لن أصف أي حالة بأنها عاجلة إلا إذا كانت المؤسسة قد نشرتها واعتمدتها.";
  }
  if (lower.includes("مشروع") || lower.includes("برنامج") || lower.includes("أنشطة")) {
    return `برامج المؤسسة (9 مجالات خيرية):\n\n${PROGRAMS.map((program) => `${program.icon} **${program.name}**\n${program.description}`).join("\n\n")}`;
  }
  if (lower.includes("تبرع") || lower.includes("دفع")) {
    return `طرق التبرع الرسمية:\n\n${DONATION_METHODS.map((method) => `• ${method.name}\n${method.details}`).join("\n\n")}\n\nفتح أي قناة لا يؤكد التحويل؛ احتفظ بالإيصال وتواصل مع المؤسسة إذا احتجت متابعة.`;
  }
  if (lower.includes("تواصل") || lower.includes("اتصال")) {
    return `يمكنك التواصل معنا عبر:\n\nالعنوان: ${FOUNDATION_INFO.address}\nالهاتف/WhatsApp: ${FOUNDATION_INFO.phone}\nTelegram: ${FOUNDATION_INFO.telegram}\nالموقع: ${FOUNDATION_INFO.website}`;
  }
  const faq = FAQ_ITEMS.find((item) => lower.includes(item.question.toLowerCase().split(" ")[0]));
  if (faq) return faq.answer;
  return "يمكنني شرح البرامج وطرق التبرع، أو اقتراح تقسيم دقيق للمبلغ الذي تكتبه. مثال: «أريد أن أتبرع بألف جنيه، كيف أقسمها؟»";
}
