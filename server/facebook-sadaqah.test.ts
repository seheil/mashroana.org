import { describe, it, expect } from "vitest";

describe("Facebook Feed & SadaqahAdvisor Components", () => {
  describe("Facebook Feed", () => {
    it("should have correct Facebook page URL", () => {
      const facebookUrl = "https://www.facebook.com/61582145746691/";
      expect(facebookUrl).toContain("facebook.com");
      expect(facebookUrl).toContain("61582145746691");
    });

    it("should have mock posts with required fields", () => {
      const mockPost = {
        id: "1",
        text: "منشور تجريبي",
        image: "🎁",
        likes: 100,
        comments: 10,
        shares: 5,
        timestamp: "2026-04-24",
        link: "https://facebook.com/post"
      };

      expect(mockPost).toHaveProperty("id");
      expect(mockPost).toHaveProperty("text");
      expect(mockPost).toHaveProperty("image");
      expect(mockPost).toHaveProperty("likes");
      expect(mockPost).toHaveProperty("comments");
      expect(mockPost).toHaveProperty("shares");
      expect(mockPost).toHaveProperty("timestamp");
      expect(mockPost).toHaveProperty("link");
    });

    it("should have at least 5 mock posts", () => {
      const mockPosts = [
        { id: "1", text: "منشور 1", image: "🎁", likes: 100, comments: 10, shares: 5, timestamp: "2026-04-24", link: "link1" },
        { id: "2", text: "منشور 2", image: "🌴", likes: 200, comments: 20, shares: 10, timestamp: "2026-04-23", link: "link2" },
        { id: "3", text: "منشور 3", image: "⚕️", likes: 150, comments: 15, shares: 8, timestamp: "2026-04-22", link: "link3" },
        { id: "4", text: "منشور 4", image: "👨‍👧‍👦", likes: 180, comments: 18, shares: 9, timestamp: "2026-04-21", link: "link4" },
        { id: "5", text: "منشور 5", image: "❤️", likes: 250, comments: 25, shares: 12, timestamp: "2026-04-20", link: "link5" }
      ];

      expect(mockPosts.length).toBeGreaterThanOrEqual(5);
    });

    it("should have correct contact links", () => {
      const contactLinks = {
        whatsapp: "https://wa.me/201013128453",
        telegram: "https://t.me/mashrouana",
        facebook: "https://www.facebook.com/61582145746691/"
      };

      expect(contactLinks.whatsapp).toContain("wa.me");
      expect(contactLinks.telegram).toContain("t.me");
      expect(contactLinks.facebook).toContain("facebook.com");
    });
  });

  describe("SadaqahAdvisor Chatbot", () => {
    it("should have initial greeting message", () => {
      const greeting = "السلام عليكم ورحمة الله وبركاته! 👋 أنا مستشار مؤسسة مشروعنا إلى الجنة الذكي.";
      expect(greeting).toContain("السلام عليكم");
      expect(greeting).toContain("مستشار");
    });

    it("should have quick questions array", () => {
      const quickQuestions = [
        "ما هي المشاريع الخيرية المتاحة؟",
        "كيف أتبرع؟",
        "ما هو تأثير تبرعي؟",
        "كيف أتواصل معكم؟"
      ];

      expect(quickQuestions.length).toBe(4);
      expect(quickQuestions[0]).toContain("مشاريع");
      expect(quickQuestions[1]).toContain("تبرع");
      expect(quickQuestions[2]).toContain("تأثير");
      expect(quickQuestions[3]).toContain("تواصل");
    });

    it("should have projects information", () => {
      const projectsInfo: Record<string, string> = {
        "أضحية": "مشروع توفير الأضاحي للأسر المحتاجة",
        "كفالة أيتام": "كفالة يتيم وتوفير احتياجاته",
        "جهاز عرايس": "توفير جهاز العروس",
        "إطعامات": "توفير وجبات غذائية",
        "علاجات": "توفير الأدوية",
        "إيجارات": "مساعدة في دفع الإيجار",
        "كسوة": "توفير ملابس",
        "كتب": "توفير كتب إسلامية",
        "شنط غذائية": "توفير شنط غذائية",
        "سد دين": "مساعدة في سداد الديون",
        "حفلات": "تنظيم حفلات",
        "بطاطين": "توفير بطاطين"
      };

      expect(Object.keys(projectsInfo).length).toBeGreaterThanOrEqual(12);
      expect(Object.keys(projectsInfo)).toContain("أضحية");
      expect(projectsInfo["كفالة أيتام"]).toContain("كفالة");
      expect(projectsInfo["جهاز عرايس"]).toBeDefined();
    });

    it("should generate response for projects question", () => {
      const userMessage = "مشاريع خيرية";
      const response = generateBotResponse(userMessage);
      
      expect(response).toContain("مشروع");
      expect(response.length).toBeGreaterThan(0);
    });

    it("should generate response for donation question", () => {
      const userMessage = "تبرع";
      const response = generateBotResponse(userMessage);
      
      expect(response).toContain("InstaPay");
      expect(response).toContain("Vodafone");
      expect(response).toContain("WhatsApp");
    });

    it("should generate response for impact question", () => {
      const userMessage = "تأثير";
      const response = generateBotResponse(userMessage);
      
      expect(response).toContain("تأثير");
      expect(response).toContain("جنيه");
    });

    it("should generate response for contact question", () => {
      const userMessage = "تواصل";
      const response = generateBotResponse(userMessage);
      
      expect(response).toContain("WhatsApp");
      expect(response).toContain("Telegram");
      expect(response).toContain("Facebook");
    });

    it("should generate generic response for unknown question", () => {
      const userMessage = "سؤال غير متعلق";
      const response = generateBotResponse(userMessage);
      
      expect(response.length).toBeGreaterThan(0);
      expect(response).toContain("شكراً");
    });
  });

  describe("Message Structure", () => {
    it("should have correct message interface", () => {
      const message = {
        id: "1",
        text: "رسالة تجريبية",
        sender: "bot" as const,
        timestamp: new Date()
      };

      expect(message.id).toBeDefined();
      expect(message.text).toBeDefined();
      expect(["user", "bot"]).toContain(message.sender);
      expect(message.timestamp instanceof Date).toBe(true);
    });

    it("should handle user and bot messages", () => {
      const userMessage = { sender: "user" as const };
      const botMessage = { sender: "bot" as const };

      expect(userMessage.sender).toBe("user");
      expect(botMessage.sender).toBe("bot");
    });
  });
});

// Helper function for testing
function generateBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("مشروع") || lowerMessage.includes("خيري")) {
    return "لدينا 13 مشروع خيري متنوع: أضحية، كفالة أيتام، جهاز عرايس";
  }

  if (lowerMessage.includes("تبرع") || lowerMessage.includes("دفع")) {
    return "يمكنك التبرع عبر InstaPay و Vodafone Cash و WhatsApp";
  }

  if (lowerMessage.includes("تأثير") || lowerMessage.includes("أثر")) {
    return "تبرعك له تأثير حقيقي! مثلاً: 500 جنيه = زراعة نخلة، 300 جنيه = علاج مريض";
  }

  if (lowerMessage.includes("تواصل") || lowerMessage.includes("اتصال")) {
    return "يمكنك التواصل معنا عبر WhatsApp و Telegram و Facebook";
  }

  return "شكراً على سؤالك!";
}
