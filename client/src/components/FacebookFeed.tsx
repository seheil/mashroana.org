import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface FacebookPost {
  id: string;
  text: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  link: string;
}

// بيانات تجريبية لمنشورات Facebook
const mockFacebookPosts: FacebookPost[] = [
  {
    id: '1',
    text: 'الحمد لله على نعمه! تم توزيع 150 شنطة غذائية على الأسر المحتاجة هذا الأسبوع. شكراً لكل من ساهم في هذا المشروع الخيري.',
    image: '🎁',
    likes: 324,
    comments: 45,
    shares: 28,
    timestamp: '2026-04-24',
    link: 'https://facebook.com/61582145746691/posts/123456'
  },
  {
    id: '2',
    text: 'مشروع غرس النخيل: تم زراعة 500 نخلة جديدة في محافظة الفيوم! 🌴 كل نخلة تمثل أمل وحياة جديدة. شارك معنا في هذا المشروع الخيري.',
    image: '🌴',
    likes: 512,
    comments: 78,
    shares: 95,
    timestamp: '2026-04-23',
    link: 'https://facebook.com/61582145746691/posts/123455'
  },
  {
    id: '3',
    text: 'عيادة طبية مجانية: قدمنا خدمات طبية لـ 200 مريض هذا الشهر. الفحوصات والأدوية والعلاجات كلها مجانية. 💊',
    image: '⚕️',
    likes: 287,
    comments: 52,
    shares: 41,
    timestamp: '2026-04-22',
    link: 'https://facebook.com/61582145746691/posts/123454'
  },
  {
    id: '4',
    text: 'برنامج كفالة الأيتام: 50 يتيم استفادوا من البرنامج هذا الشهر. تعليم، طعام، ملابس - كل احتياجاتهم مغطاة. 👨‍👧‍👦',
    image: '👨‍👧‍👦',
    likes: 456,
    comments: 89,
    shares: 67,
    timestamp: '2026-04-21',
    link: 'https://facebook.com/61582145746691/posts/123453'
  },
  {
    id: '5',
    text: 'شكراً لكل المتبرعين الكرماء! أنتم السبب في استمرار هذه المشاريع الخيرية. معاً نصنع الفرق. ❤️',
    image: '❤️',
    likes: 678,
    comments: 123,
    shares: 156,
    timestamp: '2026-04-20',
    link: 'https://facebook.com/61582145746691/posts/123452'
  }
];

export default function FacebookFeed() {
  const [posts, setPosts] = useState<FacebookPost[]>(mockFacebookPosts);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // يمكن هنا إضافة API call لجلب المنشورات الحقيقية من Facebook Graph API
    // للآن نستخدم البيانات التجريبية
    setIsLoading(false);
  }, []);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-4xl font-bold text-blue-600">آخر أخبارنا</h2>
            <span className="text-4xl">📱</span>
          </div>
          <p className="text-gray-600 text-lg">
            تابعنا على Facebook لمعرفة آخر المشاريع والإنجازات
          </p>
          <a
            href="https://www.facebook.com/61582145746691/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span>زيارة صفحتنا على Facebook</span>
            <ExternalLink size={20} />
          </a>
        </motion.div>

        {/* Posts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-blue-100"
            >
              {/* Post Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      م
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">مؤسسة مشروعنا إلى الجنة</h3>
                      <p className="text-sm text-gray-500">{post.timestamp}</p>
                    </div>
                  </div>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Image/Emoji */}
                {post.image && (
                  <div className="text-6xl text-center mb-4 p-4 bg-gray-50 rounded-lg">
                    {post.image}
                  </div>
                )}

                {/* Text */}
                <p className="text-gray-700 leading-relaxed mb-4 text-lg">
                  {post.text}
                </p>
              </div>

              {/* Post Stats */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>❤️ {post.likes.toLocaleString('ar-EG')} إعجاب</span>
                  <span>💬 {post.comments.toLocaleString('ar-EG')} تعليق</span>
                  <span>📤 {post.shares.toLocaleString('ar-EG')} مشاركة</span>
                </div>
              </div>

              {/* Post Actions */}
              <div className="px-6 py-3 flex gap-3 border-t border-gray-100">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Heart size={18} />
                  <span>إعجاب</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <MessageCircle size={18} />
                  <span>تعليق</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Share2 size={18} />
                  <span>مشاركة</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-3">تابعنا على وسائل التواصل</h3>
          <p className="mb-6 text-blue-100">
            لا تفوت أي خبر أو منشور جديد من مشاريعنا الخيرية
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.facebook.com/61582145746691/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Facebook
            </a>
            <a
              href="https://wa.me/201013128453"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://t.me/mashrouana"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Telegram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
