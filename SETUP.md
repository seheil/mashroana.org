# دليل الإعداد والتثبيت

## المتطلبات الأساسية

- **Node.js**: الإصدار 18 أو أحدث
- **pnpm**: مدير الحزم (يمكن تثبيته عبر `npm install -g pnpm`)
- **قاعدة بيانات**: MySQL 8+ أو TiDB
- **حساب Manus**: للمصادقة والخدمات المدمجة

## خطوات الإعداد

### 1. استنساخ المشروع

```bash
git clone https://github.com/yourusername/mashrouana-foundation.git
cd mashrouana-foundation
```

### 2. تثبيت المتطلبات

```bash
pnpm install
```

### 3. إعداد متغيرات البيئة

```bash
# انسخ ملف المثال
cp .env.example .env.local
```

ثم قم بتحديث القيم التالية في ملف `.env.local`:

#### قاعدة البيانات
```env
DATABASE_URL=mysql://username:password@localhost:3306/mashrouana
```

#### Manus OAuth
```env
VITE_APP_ID=your-app-id-from-manus
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
```

#### Manus APIs
```env
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-server-api-key
VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
```

#### معلومات المالك
```env
OWNER_NAME=مؤسسة مشروعنا إلى الجنة
OWNER_OPEN_ID=your-owner-id
```

#### معلومات التطبيق
```env
VITE_APP_TITLE=مؤسسة مشروعنا إلى الجنة
VITE_APP_LOGO=https://your-domain.com/logo.png
```

### 4. إعداد قاعدة البيانات

```bash
# توليد ملفات الهجرة
pnpm drizzle-kit generate

# تطبيق الهجرات (عبر لوحة التحكم أو الخادم)
pnpm drizzle-kit push
```

### 5. تشغيل الخادم

```bash
# تشغيل في وضع التطوير
pnpm dev
```

الموقع سيكون متاحاً على: `http://localhost:3000`

## الأوامر المهمة

```bash
# تشغيل الاختبارات
pnpm test

# بناء للإنتاج
pnpm build

# معاينة الإنتاج محلياً
pnpm preview

# فحص TypeScript
pnpm type-check

# تنسيق الكود
pnpm format

# فحص الكود
pnpm lint
```

## استكشاف الأخطاء

### خطأ: "DATABASE_URL is not defined"
- تأكد من وجود ملف `.env.local`
- تحقق من أن `DATABASE_URL` موجود ومكتوب بشكل صحيح

### خطأ: "Cannot connect to database"
- تأكد من تشغيل خادم MySQL/TiDB
- تحقق من بيانات الاتصال (المستخدم، كلمة المرور، المضيف)
- تأكد من وجود قاعدة البيانات

### خطأ: "OAuth configuration error"
- تأكد من صحة `VITE_APP_ID`
- تحقق من `OAUTH_SERVER_URL`
- تأكد من تسجيل التطبيق على Manus

### الخادم لا يبدأ
```bash
# امسح ذاكرة التخزين المؤقتة
rm -rf node_modules .next dist

# أعد تثبيت المتطلبات
pnpm install

# حاول مرة أخرى
pnpm dev
```

## النشر

### النشر على Manus
1. انقر على زر "Publish" في لوحة التحكم
2. اختر الإعدادات المطلوبة
3. انقر على "Deploy"

### النشر على خوادم أخرى
المشروع يدعم النشر على:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **Railway**: `railway up`
- **Render**: اتبع التعليمات على موقعهم

## الملفات المهمة

| الملف | الوصف |
|------|-------|
| `.env.local` | متغيرات البيئة المحلية (لا تُرفع على Git) |
| `drizzle/schema.ts` | مخطط قاعدة البيانات |
| `server/routers.ts` | مسارات tRPC |
| `client/src/App.tsx` | التطبيق الرئيسي |
| `shared/charity-projects.ts` | بيانات المشاريع |
| `shared/chatbot-knowledge.ts` | قاعدة معارف الـ Chatbot |

## الاختبارات

تشغيل الاختبارات:
```bash
pnpm test
```

الاختبارات تغطي:
- ✅ بيانات المشاريع والـ Chatbot
- ✅ لوحة التحكم الإدارية
- ✅ المصادقة والأمان
- ✅ حسابات الأثر

## الدعم والمساعدة

للمزيد من المساعدة:
- 📧 البريد الإلكتروني: info@mashrouana.org
- 💬 WhatsApp: 01013128453
- 🔗 Telegram: @mashrouana

---

**آخر تحديث**: أبريل 2026
