import { describe, expect, it } from "vitest";
import { getDonationAdvisorResponse } from "../shared/donation-advisor-response";
import type { DonationPriorityInput } from "../shared/donation-priority-engine";

const now = new Date("2026-08-26T12:00:00.000Z").getTime();
const livePriorities: DonationPriorityInput[] = [
  { id: "school", title: "الاستعداد للمدارس", description: "مستلزمات مدرسية موثقة", programId: "education-support", programName: "الدعم التعليمي", kind: "seasonal", status: "published", recommendationWeight: 50, reason: "أولوية مدرسية معتمدة.", sourceNote: "اعتماد داخلي", updatedAt: now },
  { id: "medical", title: "دعم علاجي معتمد", description: "احتياج علاجي موثق", programId: "health-motherhood", programName: "الصحة والأمومة والطفولة", kind: "urgent", status: "published", recommendationWeight: 30, reason: "أولوية علاجية معتمدة.", sourceNote: "اعتماد داخلي", updatedAt: now },
  { id: "families", title: "دعم أسر", description: "احتياج برنامج موثق", programId: "orphan-care", programName: "كفالة الأيتام", kind: "program", status: "published", recommendationWeight: 20, reason: "احتياج منشور.", sourceNote: "اعتماد داخلي", updatedAt: now },
];

describe("donation advisor responses", () => {
  it("answers the thousand-pound question with an exact honest balanced split", () => {
    const response = getDonationAdvisorResponse("أريد أن أتبرع بألف جنيه، كيف أقسمها؟", []);
    expect(response).toMatch(/٥٠٠|500/);
    expect(response).toMatch(/٣٠٠|300/);
    expect(response).toMatch(/٢٠٠|200/);
    expect(response).toContain("لا توجد أولوية مؤقتة منشورة ومعتمدة الآن");
  });

  it("uses administrator-published priorities for the same thousand-pound question", () => {
    const response = getDonationAdvisorResponse("أريد أن أتبرع بـ 1000 جنيه", livePriorities);
    expect(response).toContain("الاستعداد للمدارس");
    expect(response).toContain("دعم علاجي معتمد");
    expect(response).toContain("دعم أسر");
  });

  it("answers partnership, volunteering, privacy and media questions without inventing activity", () => {
    expect(getDonationAdvisorResponse("كيف أقدم شراكة مع شركة؟", [])).toContain("نموذج «كن شريكاً»");
    expect(getDonationAdvisorResponse("هل يوجد تطوع؟", [])).toContain("يمكنك التقدم من صفحة التطوع");
    expect(getDonationAdvisorResponse("كيف تحمون بياناتي وخصوصيتي؟", [])).toContain("الحد الأدنى من البيانات");
    expect(getDonationAdvisorResponse("أين مكتبة الصور والفيديو؟", [])).toContain("وافقت المؤسسة على نشرها فقط");
  });
});
