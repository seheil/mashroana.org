import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Send, X, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const INITIAL_GREETING = "السلام عليكم ورحمة الله وبركاته! 👋 أنا مستشار مؤسسة مشروعنا إلى الجنة الذكي. كيف يمكنني مساعدتك اليوم؟";

const QUICK_QUESTIONS = [
  "ما هي المشاريع الخيرية المتاحة؟",
  "كيف أتبرع؟",
  "ما هو تأثير تبرعي؟",
  "كيف أتواصل معكم؟"
];

const PROJECTS_INFO: Record<string, string> = {
  "أضحية": "مشروع توفير الأضاحي للأسر المحتاجة في العيد",
  "كفالة أيتام": "كفالة يتيم وتوفير احتياجاته من طعام وملابس وتعليم",
  "جهاز عرايس": "توفير جهاز العروس للفتيات المحتاجات",
  "إطعامات": "توفير وجبات غذائية صحية للأسر والمرضى",
  "علاجات": "توفير الأدوية والعلاجات الطبية",
  "إيجارات": "مساعدة الأسر في دفع الإيجار",
  "كسوة": "توفير ملابس للأطفال في المناسبات والفصول",
  "كتب": "توفير كتب إسلامية وعلمية لطلبة العلم",
  "شنط غذائية": "توفير شنط غذائية للأسر المحتاجة",
  "سد دين": "مساعدة الأشخاص في سداد ديونهم",
  "حفلات": "تنظيم حفلات وفعاليات للأطفال",
  "بطاطين": "توفير بطاطين دافئة في فصل الشتاء"
};

export function SadaqahAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "greeting",
      text: INITIAL_GREETING,
      sender: "bot",
      timestamp: new Date()
    }
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
    const lowerMessage = userMessage.toLowerCase();

    // الرد على الأسئلة الشائعة
    if (lowerMessage.includes("مشروع") || lowerMessage.includes("خيري")) {
      return "لدينا 13 مشروع خيري متنوع:\n\n🐑 أضحية\n👨‍👧 كفالة أيتام\n💍 جهاز عرايس\n🍲 إطعامات\n💊 علاجات\n🏠 إيجارات\n👕 كسوة\n📚 كتب\n🎁 شنط غذائية\n💳 سد دين\n🎉 حفلات\n🛏️ بطاطين\n🌴 غرس النخيل\n\nأي مشروع تود معرفة المزيد عنه؟";
    }

    if (lowerMessage.includes("تبرع") || lowerMessage.includes("دفع")) {
      return "يمكنك التبرع بعدة طرق:\n\n💳 InstaPay - تحويل مباشر\n📱 Vodafone Cash - محفظة رقمية\n💬 WhatsApp - التواصل المباشر\n\nاختر المشروع الذي تود التبرع له وسيظهر لك نموذج التبرع مع جميع الخيارات.";
    }

    if (lowerMessage.includes("تأثير") || lowerMessage.includes("أثر")) {
      return "تبرعك له تأثير حقيقي! مثلاً:\n\n🌴 500 جنيه = زراعة نخلة واحدة\n💊 300 جنيه = علاج مريض لشهر\n👨‍👧 1000 جنيه = كفالة يتيم شهراً\n🍲 200 جنيه = وجبات غذائية لأسرة\n\nكل تبرع صغير أو كبير يصنع فرقاً حقيقياً في حياة الناس.";
    }

    if (lowerMessage.includes("تواصل") || lowerMessage.includes("اتصال")) {
      return "يمكنك التواصل معنا عبر:\n\n📱 WhatsApp: 01013128453\n💬 Telegram: @mashrouana\n📧 البريد الإلكتروني: info@mashrouana.org\n📘 Facebook: facebook.com/61582145746691\n\nنحن هنا للإجابة على جميع استفساراتك!";
    }

    if (lowerMessage.includes("شكر") || lowerMessage.includes("شكراً")) {
      return "شكراً لك على طيبة قلبك! 💚 تبرعك يساهم في نشر الخير والعطف في المجتمع. جزاك الله خيراً وأثاب الله عملك.";
    }

    // البحث عن مشروع محدد
    for (const [project, description] of Object.entries(PROJECTS_INFO)) {
      if (lowerMessage.includes(project.toLowerCase())) {
        return `مشروع ${project}:\n\n${description}\n\nهل تود التبرع لهذا المشروع؟`;
      }
    }

    // الرد العام
    return "شكراً على سؤالك! 😊\n\nيمكنك:\n- اختيار مشروع خيري من الصفحة الرئيسية\n- التبرع مباشرة عبر الأزرار المتاحة\n- التواصل معنا للمزيد من المعلومات\n\nكيف يمكنني مساعدتك بشكل أكثر تحديداً؟";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // إضافة رسالة المستخدم
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // محاكاة تأخير الرد
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 500);
  };

  const handleQuickQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(question),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
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
              isMinimized ? "bottom-8 right-8 w-80 h-16" : "bottom-8 right-8 w-96 h-[600px] flex flex-col"
            }`}
            dir="rtl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-4 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <div>
                  <h3 className="font-bold">مستشار الصدقة الذكي</h3>
                  <p className="text-xs text-emerald-100">نحن هنا لمساعدتك</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-white/20 p-1 rounded transition"
                >
                  {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
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
                        message.sender === "user" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-emerald-100 text-gray-800 rounded-br-none"
                            : "bg-emerald-500 text-white rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString("ar-EG", {
                            hour: "2-digit",
                            minute: "2-digit"
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
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <div className="px-4 py-3 bg-white border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2 font-semibold">أسئلة سريعة:</p>
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
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="اكتب رسالتك..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4"
                  >
                    <Send size={18} />
                  </Button>
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
