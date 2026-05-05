# مؤسسة مشروعنا إلى الجنة - ملخص المشروع

## نظرة عامة

موقع ويب احترافي لمؤسسة مشروعنا إلى الجنة للأعمال الخيرية، مصمم ليكون:
- ✅ متوافق مع الجوال (Responsive)
- ✅ دعم كامل للعربية والـ RTL
- ✅ متصل بـ Firebase للمصادقة وتخزين البيانات
- ✅ لوحة تحكم إدارية آمنة
- ✅ جاهز لـ Google Ad Grants

## المميزات الرئيسية

### 1. الواجهة الأمامية (Frontend)

#### الصفحات الرئيسية:
- **الصفحة الرئيسية (Home):** عرض احترافي للمؤسسة مع أزرار CTA
- **عن المؤسسة (About):** معلومات عن المؤسسة والرسالة
- **المشاريع (Programs):** عرض 5 مشاريع خيرية مع تفاصيل
- **المعرض (Gallery):** صور من المشاريع والفعاليات
- **التبرع (Donate):** نموذج تبرع ذكي مع طرق دفع متعددة
- **تواصل معنا (Contact):** نموذج اتصال متصل بـ Firestore
- **سياسة الخصوصية (Privacy):** معلومات الخصوصية والشروط

#### المكونات التفاعلية:
- أزرار عائمة (Floating Buttons): WhatsApp, Telegram, InstaPay
- نموذج تبرع ذكي يحسب الأثر التلقائي
- عداد الأشجار المزروعة
- إحصائيات حية (الأيتام، الأسر، المرضى، الطلاب)

### 2. لوحة التحكم الإدارية (Admin Dashboard)

#### المصادقة:
- تسجيل دخول آمن باستخدام Firebase Authentication
- حماية الصفحات من الوصول غير المصرح

#### التبويبات:
1. **لوحة التحكم:**
   - عرض وتحديث الإحصائيات (الأيتام، الطلاب، المرضى، الأسر)
   - حفظ البيانات في Firestore

2. **المعرض:**
   - ملاحظة واضحة: "رفع الصور قيد التطوير"
   - سيتم تفعيل Firebase Storage لاحقاً

3. **الرسائل:**
   - عرض جميع الرسائل المستلمة من نموذج الاتصال
   - عرض معلومات المرسل والتاريخ والوقت
   - تحديث فوري من Firestore

### 3. Backend & Database

#### Firebase Services:
- **Authentication:** تسجيل دخول آمن للمسؤولين
- **Firestore:** تخزين الإحصائيات والرسائل
- **Cloud Storage:** (قيد التطوير) لتخزين صور المعرض

#### Collections:
```
Firestore Database:
├── settings/
│   └── counters
│       ├── orphans: 1250
│       ├── students: 2100
│       ├── patients: 5600
│       └── families: 3400
└── messages/
    └── {auto-generated}
        ├── name: string
        ├── email: string
        ├── phone: string
        ├── message: string
        ├── timestamp: timestamp
        └── read: boolean
```

## المتطلبات التقنية

### الأدوات والمكتبات:
- **React 19:** إطار العمل الأساسي
- **Vite:** بناء وتطوير سريع
- **Tailwind CSS 4:** تصميم احترافي
- **Firebase SDK:** المصادقة وقاعدة البيانات
- **Wouter:** التوجيه (Routing)
- **Lucide React:** الأيقونات

### المتطلبات:
- Node.js 22+
- npm/pnpm
- Firebase Project

## التثبيت والتشغيل

### التثبيت المحلي:

```bash
# استنساخ المشروع
git clone <repository-url>
cd mashrouana-foundation

# تثبيت المكتبات
pnpm install

# تشغيل خادم التطوير
pnpm dev

# الدخول إلى http://localhost:3000
```

### البناء للإنتاج:

```bash
# بناء المشروع
pnpm build

# اختبار البناء محلياً
pnpm preview
```

## الاختبارات

### تشغيل الاختبارات:

```bash
# تشغيل جميع الاختبارات
pnpm test

# مراقبة الاختبارات (Watch mode)
pnpm test:watch

# تغطية الاختبارات
pnpm test:coverage
```

### الاختبارات المتضمنة:
- ✅ 91 اختبار Vitest
- ✅ اختبارات Firebase Integration
- ✅ اختبارات Gallery
- ✅ اختبارات Admin Dashboard
- ✅ اختبارات Contact Form
- ✅ اختبارات RTL والعربية

## إعداد Firebase

### الخطوات الأساسية:

1. **إنشاء Firebase Project:**
   - اذهب إلى [Firebase Console](https://console.firebase.google.com)
   - أنشئ مشروع جديد

2. **تفعيل Authentication:**
   - فعّل Email/Password authentication
   - أضف مستخدم إداري

3. **إنشاء Firestore Database:**
   - أنشئ قاعدة بيانات Firestore
   - أنشئ المجموعات المطلوبة

4. **إضافة Credentials:**
   - انسخ بيانات الاعتماد من Firebase Console
   - أضفها إلى متغيرات البيئة

**للمزيد:** اطلع على [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## النشر والإنتاج

### خطوات النشر:

1. **اختبار نهائي:**
   ```bash
   pnpm test
   pnpm build
   ```

2. **إنشاء Checkpoint:**
   - في Manus Dashboard، انقر على "Save Checkpoint"

3. **النشر:**
   - انقر على "Publish"
   - اختر الـ Checkpoint الأخير

4. **التحقق:**
   - اختبر جميع الصفحات والمميزات

**للمزيد:** اطلع على [DEPLOYMENT.md](./DEPLOYMENT.md)

## Google Ad Grants

الموقع جاهز لـ Google Ad Grants بفضل:
- ✅ صفحة About واضحة
- ✅ صفحة Contact مع معلومات تواصل
- ✅ صفحة Privacy Policy
- ✅ عدم وجود ادعاءات مضللة
- ✅ رسالة خيرية واضحة

## البنية المشروع

```
mashrouana-foundation/
├── client/
│   ├── src/
│   │   ├── pages/          # الصفحات الرئيسية
│   │   ├── components/     # المكونات المعاد استخدامها
│   │   ├── lib/           # المكتبات والإعدادات
│   │   ├── hooks/         # React hooks مخصصة
│   │   ├── App.tsx        # التوجيه الرئيسي
│   │   └── main.tsx       # نقطة الدخول
│   ├── public/            # الملفات الثابتة
│   └── index.html         # HTML الرئيسي
├── server/
│   ├── routers.ts         # tRPC procedures
│   ├── db.ts              # مساعدات قاعدة البيانات
│   └── tests/             # الاختبارات
├── shared/
│   ├── foundation-data.ts # بيانات المؤسسة
│   └── gallery-images.ts  # بيانات المعرض
├── drizzle/               # إعدادات قاعدة البيانات
├── FIREBASE_SETUP.md      # دليل إعداد Firebase
├── DEPLOYMENT.md          # دليل النشر
└── README.md              # التوثيق الرئيسي
```

## متغيرات البيئة

```
# Firebase
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# Manus
VITE_APP_ID=...
VITE_APP_TITLE=مؤسسة مشروعنا إلى الجنة
VITE_OAUTH_PORTAL_URL=...
```

## الدعم والصيانة

### المهام الدورية:
- **أسبوعي:** تحقق من الرسائل الجديدة
- **شهري:** راجع الإحصائيات والأرقام
- **ربع سنوي:** تحديث المحتوى والصور
- **سنوي:** مراجعة شاملة وتحديثات الأمان

### الاتصال:
- البريد الإلكتروني: `admin@mashrouana.org`
- الهاتف: `+20 101 312 8453`
- WhatsApp: نفس الرقم

## الترخيص

جميع الحقوق محفوظة لمؤسسة مشروعنا إلى الجنة للأعمال الخيرية.

## المساهمة

للمساهمة في المشروع:
1. انسخ المشروع
2. أنشئ فرع جديد
3. اجعل التغييرات
4. أرسل طلب دمج (Pull Request)

---

**آخر تحديث:** 2026-05-05
**الإصدار:** 1.0.0
**الحالة:** جاهز للإنتاج ✅
