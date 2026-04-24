import { describe, it, expect } from "vitest";
import { CHARITY_PROJECTS, DEFAULT_GARDEN_ELEMENTS } from "../shared/charity-projects";
import { CHATBOT_SYSTEM_PROMPT, PROACTIVE_QUESTIONS, PROJECTS_FOR_CHATBOT } from "../shared/chatbot-knowledge";

describe("Admin Dashboard - Charity Projects", () => {
  it("يجب أن تحتوي قائمة المشاريع على 13 مشروع خيري", () => {
    expect(CHARITY_PROJECTS.length).toBe(13);
  });

  it("يجب أن يحتوي كل مشروع على جميع الحقول المطلوبة", () => {
    CHARITY_PROJECTS.forEach(project => {
      expect(project).toHaveProperty("id");
      expect(project).toHaveProperty("name");
      expect(project).toHaveProperty("arabicName");
      expect(project).toHaveProperty("description");
      expect(project).toHaveProperty("icon");
      expect(project).toHaveProperty("color");
      expect(project).toHaveProperty("suggestedAmount");
      expect(project).toHaveProperty("impactDescription");
      expect(project).toHaveProperty("category");
    });
  });

  it("يجب أن تكون معرفات المشاريع فريدة", () => {
    const ids = CHARITY_PROJECTS.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("يجب أن تكون جميع المبالغ المقترحة أرقام موجبة", () => {
    CHARITY_PROJECTS.forEach(project => {
      expect(project.suggestedAmount).toBeGreaterThan(0);
      expect(typeof project.suggestedAmount).toBe("number");
    });
  });

  it("يجب أن تحتوي جميع المشاريع على أيقونة", () => {
    CHARITY_PROJECTS.forEach(project => {
      expect(project.icon).toBeTruthy();
      expect(typeof project.icon).toBe("string");
    });
  });
});

describe("Admin Dashboard - Garden Elements", () => {
  it("يجب أن تحتوي قائمة عناصر البستان على 4 عناصر افتراضية", () => {
    expect(DEFAULT_GARDEN_ELEMENTS.length).toBe(4);
  });

  it("يجب أن تحتوي عناصر البستان على أنواع صحيحة", () => {
    const validTypes = ["tree", "palm", "well", "flower"];
    DEFAULT_GARDEN_ELEMENTS.forEach(element => {
      expect(validTypes).toContain(element.type);
    });
  });

  it("يجب أن تحتوي جميع عناصر البستان على معرف فريد", () => {
    const ids = DEFAULT_GARDEN_ELEMENTS.map(e => e.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("يجب أن تبدأ عناصر البستان بعدد صفر من الأشجار", () => {
    DEFAULT_GARDEN_ELEMENTS.forEach(element => {
      expect(element.count).toBe(0);
      expect(element.donatedAmount).toBe(0);
    });
  });
});

describe("Chatbot Knowledge Base", () => {
  it("يجب أن يحتوي نظام الـ Chatbot على رسالة نظام واضحة", () => {
    expect(CHATBOT_SYSTEM_PROMPT).toBeTruthy();
    expect(CHATBOT_SYSTEM_PROMPT).toContain("مؤسسة مشروعنا إلى الجنة");
  });

  it("يجب أن تحتوي الأسئلة الاستباقية على 5 أسئلة على الأقل", () => {
    expect(PROACTIVE_QUESTIONS.length).toBeGreaterThanOrEqual(5);
  });

  it("يجب أن تحتوي قائمة المشاريع على 13 مشروع خيري", () => {
    expect(PROJECTS_FOR_CHATBOT.length).toBe(13);
  });

  it("يجب أن يحتوي كل مشروع في قائمة الـ Chatbot على الحقول المطلوبة", () => {
    PROJECTS_FOR_CHATBOT.forEach(project => {
      expect(project).toHaveProperty("id");
      expect(project).toHaveProperty("name");
      expect(project).toHaveProperty("emoji");
      expect(project).toHaveProperty("amount");
      expect(project).toHaveProperty("impact");
    });
  });

  it("يجب أن تكون جميع المبالغ في قائمة الـ Chatbot موجبة", () => {
    PROJECTS_FOR_CHATBOT.forEach(project => {
      expect(project.amount).toBeGreaterThan(0);
    });
  });

  it("يجب أن تحتوي جميع الأسئلة على نصوص عربية", () => {
    PROACTIVE_QUESTIONS.forEach(question => {
      expect(question).toMatch(/[\u0600-\u06FF]/); // نطاق الأحرف العربية
    });
  });

  it("يجب أن تحتوي الرسالة النظامية على معلومات التواصل", () => {
    expect(CHATBOT_SYSTEM_PROMPT).toContain("WhatsApp");
    expect(CHATBOT_SYSTEM_PROMPT).toContain("Telegram");
  });

  it("يجب أن تحتوي الرسالة النظامية على تحذير من الإغاثة الدولية", () => {
    expect(CHATBOT_SYSTEM_PROMPT).toContain("100% محلي");
    expect(CHATBOT_SYSTEM_PROMPT).toContain("مصر");
  });
});

describe("Data Consistency", () => {
  it("يجب أن تتطابق عدد المشاريع في جميع الملفات", () => {
    expect(CHARITY_PROJECTS.length).toBe(PROJECTS_FOR_CHATBOT.length);
  });

  it("يجب أن تحتوي جميع المشاريع على أسماء عربية", () => {
    CHARITY_PROJECTS.forEach(project => {
      expect(project.arabicName).toMatch(/[\u0600-\u06FF]/);
    });
  });

  it("يجب أن تحتوي جميع المشاريع على وصف", () => {
    CHARITY_PROJECTS.forEach(project => {
      expect(project.description).toBeTruthy();
      expect(project.description.length).toBeGreaterThan(0);
    });
  });

  it("يجب أن تحتوي جميع المشاريع على وصف الأثر", () => {
    CHARITY_PROJECTS.forEach(project => {
      expect(project.impactDescription).toBeTruthy();
      expect(project.impactDescription).toContain("=");
    });
  });
});
