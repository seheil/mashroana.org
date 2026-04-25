import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, ExternalLink, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { trpc } from '@/lib/trpc';

interface FacebookPost {
  id: string;
  text: string;
  timestamp: string;
  link: string;
  likes: number;
  comments: number;
  shares: number;
}

export default function FacebookFeed() {
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // استخدام tRPC للحصول على منشورات Facebook
  const { data, isLoading: isFetching, error: fetchError } = trpc.facebook.getPosts.useQuery();

  useEffect(() => {
    if (data) {
      setPosts(data.posts);
      setIsLoading(false);
      if (data.error) {
        setError(data.error);
      }
    }
  }, [data]);

  useEffect(() => {
    if (fetchError) {
      setError('حدث خطأ في جلب المنشورات');
      setIsLoading(false);
    }
  }, [fetchError]);

  useEffect(() => {
    setIsLoading(isFetching);
  }, [isFetching]);

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

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="animate-spin text-blue-600" size={40} />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-4 bg-yellow-100 border-l-4 border-yellow-600 text-yellow-700 rounded mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && posts.length > 0 && (
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
        )}

        {/* No Posts State */}
        {!isLoading && posts.length === 0 && !error && (
          <div className="text-center py-12 text-gray-600">
            <p className="text-lg">لا توجد منشورات متاحة حالياً</p>
          </div>
        )}

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
