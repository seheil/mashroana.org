import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FOUNDATION_INFO,
  PROGRAMS,
  DONATION_METHODS,
  FAQ_ITEMS,
  getIntelligentDonationRecommendation,
} from "@shared/foundation-knowledge";

// Re-export types for client usage
export type { FoundationInfo, Program, DonationMethod, FAQ } from "@shared/foundation-knowledge";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "ما هي مشاريع المؤسسة؟",
  "كيف أتبرع بذكاء؟",
  "ما هي طرق التبرع؟",
  "كيف أتواصل معكم؟",
];

export function SadaqahAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      text: `السلام عليكم ورحمة الله وبركاته 👋

أنا مساعد ${FOUNDATION_INFO.arabicName} الذكي.

يسعدني مساعدتك في:
✅ معرفة مشاريع المؤسسة
✅ الحصول على إرشادات تبرع ذكية
✅ معرفة طرق التبرع الآمنة
✅ الإجابة على أسئلتك

كيف يمكنني مساعدتك اليوم؟`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();

    // الأسئلة عن المشاريع
    if (
      lower.includes("مشروع") ||
      lower.includes("برنامج") ||
      lower.includes("أنشطة")
    ) {
      let response = "مشاريع المؤسسة (9 مجالات خيرية):\n\n";
      PROGRAMS.forEach((p: any) => {
        response += `${p.icon} **${p.name}**\n${p.description}\n\n`;
      });
      return response;
    }

    // الأسئلة عن التبرع الذكي
    if (
      lower.includes("تبرع") &&
      (lower.includes("جنيه") || lower.includes("كم"))
    ) {
      const amountMatch = userMessage.match(/(\d+)\s*جنيه/);
      if (amountMatch) {
        const amount = parseInt(amountMatch[1]);
        const recommendation = getIntelligentDonationRecommendation(amount);
        return recommendation.message;
      }
      return `يمكنك توزيع تبرعك بطريقة متوازنة:
- 30% لكفالة الأيتام (احتياج مستمر)
- 25% للدعم التعليمي
- 20% للمساعدات الموسمية
- 15% لمشغل الخياطة (صدقة جارية)
- 10% لسقيا الماء والأشجار

هذا يضمن أثراً متوازناً.`;
    }

    // الأسئلة عن طرق التبرع
    if (lower.includes("تبرع") || lower.includes("دفع")) {
      let response = "طرق التبرع الآمنة:\n\n";
      DONATION_METHODS.forEach((m: any) => {
        response += `💳 ${m.name}\n${m.details}\n\n`;
      });
      response += `\n${DONATION_METHODS[0].trustMessage}`;
      return response;
    }

    // الأسئلة عن التواصل
    if (lower.includes("تواصل") || lower.includes("اتصال")) {
      return `يمكنك التواصل معنا عبر:

📍 العنوان: ${FOUNDATION_INFO.address}
📱 الهاتف/WhatsApp: ${FOUNDATION_INFO.phone}
💬 Telegram: ${FOUNDATION_INFO.telegram}
🌐 الموقع: ${FOUNDATION_INFO.website}

نحن هنا لمساعدتك!`;
    }

    // الأسئلة الشائعة
    const faq = FAQ_ITEMS.find((f: any) =>
      f.question.toLowerCase().includes(lower.split(" ")[0])
    );
    if (faq) {
      return faq.answer;
    }

    // الرد العام
    return `شكراً على سؤالك! 😊

يمكنك:
• اختيار مشروع خيري
• التبرع مباشرة
• التواصل معنا

كيف يمكنني مساعدتك بشكل أكثر تحديداً؟`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 500);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(question),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl z-40 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageCircle size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed z-50 bg-white rounded-xl shadow-2xl border border-emerald-200 ${
              isMinimized
                ? "bottom-8 right-8 w-80 h-16"
                : "bottom-8 right-8 w-96 h-[600px] flex flex-col"
            }`}
            dir="rtl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <div>
                  <h3 className="font-bold">مساعد المؤسسة الذكي</h3>
                  <p className="text-xs text-emerald-100">نحن هنا لمساعدتك</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-white/20 p-1 rounded transition"
                >
                  {isMinimized ? (
                    <Maximize2 size={18} />
                  ) : (
                    <Minimize2 size={18} />
                  )}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 p-1 rounded transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.sender === "user"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-emerald-100 text-gray-800 rounded-br-none"
                            : "bg-emerald-500 text-white rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">
                          {message.text}
                        </p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString("ar-EG", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-end"
                    >
                      <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg rounded-bl-none">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                          <div
                            className="w-2 h-2 bg-white rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <div className="px-4 py-3 bg-white border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2 font-semibold">
                      أسئلة سريعة:
                    </p>
                    <div className="space-y-2">
                      {QUICK_QUESTIONS.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickQuestion(question)}
                          className="w-full text-right text-sm px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded border border-emerald-200 transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200 flex gap-2 rounded-b-xl">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage()
                    }
                    placeholder="اكتب رسالتك..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SadaqahAdvisor;
