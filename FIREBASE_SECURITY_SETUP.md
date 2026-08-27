# إعداد أمان Firestore وصلاحيات الإدارة — سجل مؤرشف

> لم تعد هذه التعليمات جزءاً من إعداد الموقع الحالي. قررت المؤسسة اعتماد GitHub وVercel فقط، من دون Firebase أو Firestore أو Firebase Storage. لا تطبقي القواعد أدناه على مشروع Firebase ما لم يُتخذ قرار جديد ومكتوب بالعودة إليه. إعداد الموقع الحالي موثق في `docs/GITHUB_VERCEL_CMS_SETUP.md`.

هذه الخطوة **ضرورية قبل النشر**. الكود يربط لوحة الإدارة بـ Firebase Authentication وFirestore، لكن قواعد Firestore تُدار داخل مشروع Firebase نفسه ولا تُنشر تلقائياً مع موقع الويب.

## 1. حددي بريد مسؤولي الموقع

في Firebase Console، أنشئي فقط حسابات Firebase Authentication الخاصة بالفريق الذي سيدير الموقع. ثم استبدلي البريد الوارد في `ADMIN_EMAIL_1@example.com` داخل القواعد التالية بالبريد الحقيقي لكل مسؤول. يمكن إضافة بريد آخر داخل القائمة عند الحاجة.

## 2. طبّقي قواعد Firestore

افتحي **Firebase Console → Firestore Database → Rules**، ثم الصقي القواعد التالية وانشريها. هذه القواعد تجعل البرامج والإنجازات والإعدادات متاحة للعرض العام، لكنها تقصر عمليات الإنشاء والتعديل والحذف على مسؤولي المؤسسة. كما تسمح بنموذج التواصل العام بإنشاء رسالة، من دون السماح لأي زائر بقراءة الرسائل.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth != null;
    }

    function admin() {
      return signedIn()
        && request.auth.token.email in [
          'ADMIN_EMAIL_1@example.com'
          // أضيفي هنا بريد كل مسؤول إضافي، مع فاصلة بعد السطر السابق.
        ];
    }

    match /projects/{projectId} {
      allow read: if true;
      allow create, update, delete: if admin();
    }

    match /achievements/{achievementId} {
      allow read: if true;
      allow create, update, delete: if admin();
    }

    match /settings/{settingsId} {
      allow read: if true;
      allow create, update, delete: if admin();
    }

    // المواد المنشورة فقط تظهر للعامة. المسودات متاحة للمسؤولين فقط.
    match /media/{mediaId} {
      allow read: if resource.data.status == 'published' || admin();
      allow create, update, delete: if admin();
    }

    // الوثائق المنشورة فقط تظهر للعامة. المسودات متاحة للمسؤولين فقط.
    match /documents/{documentId} {
      allow read: if resource.data.status == 'published' || admin();
      allow create, update, delete: if admin();
    }

    // تظهر أولويات التبرع المنشورة فقط للعامة وللمساعد الذكي.
    // لا تظهر المسودات أو الأولويات المغلقة إلا لمسؤولي المؤسسة.
    match /donationPriorities/{priorityId} {
      allow read: if resource.data.status == 'published' || admin();
      allow create, update, delete: if admin();
    }

    match /tasks/{taskId} {
      allow read, create, update, delete: if admin();
    }

    match /contactMessages/{messageId} {
      allow create: if request.resource.data.keys().hasOnly([
        'name', 'email', 'phone', 'message', 'timestamp', 'read'
      ]);
      allow read, update, delete: if admin();
    }

    match /partnerInquiries/{inquiryId} {
      allow create: if request.resource.data.keys().hasOnly([
        'organizationName', 'sector', 'contactName', 'email', 'phone',
        'cooperationType', 'programInterest', 'estimatedValue', 'timeline',
        'notes', 'consent', 'status', 'timestamp'
      ]) && request.resource.data.consent == true;
      allow read, update, delete: if admin();
    }

    match /volunteerApplications/{applicationId} {
      allow create: if request.resource.data.keys().hasOnly([
        'name', 'email', 'phone', 'availability', 'areaOfInterest',
        'skills', 'message', 'consent', 'status', 'timestamp'
      ]) && request.resource.data.consent == true;
      allow read, update, delete: if admin();
    }
  }
}
```

> لا تستبدلي قواعد الأمان بقواعد مفتوحة مثل `allow read, write: if true`. هذا قد يتيح الوصول إلى رسائل التواصل والمسودات وبيانات التشغيل.

## 3. راجعي حسابات Firebase Authentication

تأكدي أن كل بريد مستخدم في قائمة `admin()` موجود فعلياً في **Authentication → Users**. لا تنشئي رابط تسجيل عام للزوار. شاشة `/admin-login` مخصصة فقط للحسابات التي ينشئها فريق المؤسسة.

## 4. اختبري القواعد قبل الإطلاق

بعد نشر القواعد، سجلي الدخول بأحد حسابات الإدارة واختبري إضافة مشروع، ومادة إعلامية مسودة، ووثيقة منشورة، وأولوية تبرع مسودة ثم أولوية منشورة. تأكدي من ظهور الأخيرة في الصفحة الرئيسية والمساعد، وعدم ظهور المسودة أو الأولوية المغلقة للزائر. ثم أرسلي طلب شراكة وطلب تطوع تجريبيين من نافذة خاصة للتأكد من حفظهما وإتاحتهما للمسؤول فقط. افتحي الموقع في نافذة خاصة أو متصفح غير مسجل الدخول للتأكد من أن المحتوى المنشور فقط هو الظاهر، ومن عدم القدرة على فتح `/admin` أو قراءة الرسائل أو الطلبات.

## مراجع

[1]: https://firebase.google.com/docs/firestore/security/get-started "Get started with Cloud Firestore Security Rules"
[2]: https://firebase.google.com/docs/firestore/security/rules-conditions "Writing conditions for Cloud Firestore Security Rules"
