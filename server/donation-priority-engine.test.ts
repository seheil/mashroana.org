import { describe, expect, it } from "vitest";
import { getDonationRecommendation, parseArabicDonationAmount, type DonationPriorityInput } from "../shared/donation-priority-engine";

const now = new Date("2026-08-26T12:00:00.000Z").getTime();

const publishedPriorities: DonationPriorityInput[] = [
  { id: "school", title: "الاستعداد للمدارس", description: "", programId: "education-support", programName: "الدعم التعليمي", kind: "seasonal", status: "published", recommendationWeight: 50, reason: "أولوية تعليمية منشورة من الإدارة.", sourceNote: "اعتماد داخلي", publishedAt: now, updatedAt: now },
  { id: "medical", title: "دعم علاجي معتمد", description: "", programId: "health-motherhood", programName: "الصحة والأمومة والطفولة", kind: "urgent", status: "published", recommendationWeight: 30, reason: "أولوية علاجية منشورة من الإدارة.", sourceNote: "اعتماد داخلي", publishedAt: now, updatedAt: now },
  { id: "families", title: "دعم أسر", description: "", programId: "orphan-care", programName: "كفالة الأيتام", kind: "program", status: "published", recommendationWeight: 20, reason: "احتياج برنامج منشور من الإدارة.", sourceNote: "اعتماد داخلي", publishedAt: now, updatedAt: now },
];

describe("donation priority engine", () => {
  it("allocates an exact thousand pounds across live priorities", () => {
    const recommendation = getDonationRecommendation(1000, publishedPriorities, now);
    expect(recommendation.mode).toBe("live-priorities");
    expect(recommendation.allocations.map((allocation) => allocation.amount)).toEqual([500, 300, 200]);
    expect(recommendation.allocations.reduce((sum, allocation) => sum + allocation.amount, 0)).toBe(1000);
    expect(recommendation.message).toContain("أولويات منشورة ومعتمدة");
  });

  it("does not use drafts or expired priorities in its advice", () => {
    const recommendation = getDonationRecommendation(500, [
      ...publishedPriorities,
      { ...publishedPriorities[0], id: "draft", status: "draft", recommendationWeight: 100 },
      { ...publishedPriorities[1], id: "expired", endsAt: now - 1, recommendationWeight: 100 },
    ], now);
    expect(recommendation.allocations.map((allocation) => allocation.priorityId)).not.toContain("draft");
    expect(recommendation.allocations.map((allocation) => allocation.priorityId)).not.toContain("expired");
  });

  it("falls back to an honest balanced allocation when no live priority exists", () => {
    const recommendation = getDonationRecommendation(1000, [], now);
    expect(recommendation.mode).toBe("balanced");
    expect(recommendation.allocations.map((allocation) => allocation.amount)).toEqual([500, 300, 200]);
    expect(recommendation.message).toContain("لا توجد أولوية مؤقتة منشورة ومعتمدة الآن");
  });

  it("understands common Arabic wording for one thousand pounds without inventing a number", () => {
    expect(parseArabicDonationAmount("أريد أن أتبرع بألف جنيه")).toBe(1000);
    expect(parseArabicDonationAmount("أريد التبرع بـ ١٠٠٠ جنيه")).toBe(1000);
    expect(parseArabicDonationAmount("أريد التبرع بنصف ألف")).toBe(500);
    expect(parseArabicDonationAmount("أريد التبرع اليوم")).toBeNull();
  });
});
