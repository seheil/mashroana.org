# إعداد أمان Firestore وصلاحيات الإدارة

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

    match /tasks/{taskId} {
      allow read, create, update, delete: if admin();
    }

    match /contactMessages/{messageId} {
      allow create: if request.resource.data.keys().hasOnly([
        'name', 'email', 'phone', 'message', 'timestamp', 'read'
      ]);
      allow read, update, delete: if admin();
    }
  }
}
```

> لا تستبدلي قواعد الأمان بقواعد مفتوحة مثل `allow read, write: if true`. هذا قد يتيح الوصول إلى رسائل التواصل والمسودات وبيانات التشغيل.

## 3. راجعي حسابات Firebase Authentication

تأكدي أن كل بريد مستخدم في قائمة `admin()` موجود فعلياً في **Authentication → Users**. لا تنشئي رابط تسجيل عام للزوار. شاشة `/admin-login` مخصصة فقط للحسابات التي ينشئها فريق المؤسسة.

## 4. اختبري القواعد قبل الإطلاق

بعد نشر القواعد، سجلي الدخول بأحد حسابات الإدارة واختبري إضافة مشروع، ومادة إعلامية مسودة، ووثيقة منشورة. ثم افتحي الموقع في نافذة خاصة أو متصفح غير مسجل الدخول للتأكد من أن المحتوى المنشور فقط هو الظاهر، ومن عدم القدرة على فتح `/admin` أو قراءة الرسائل.

## مراجع

[1]: https://firebase.google.com/docs/firestore/security/get-started "Get started with Cloud Firestore Security Rules"
[2]: https://firebase.google.com/docs/firestore/security/rules-conditions "Writing conditions for Cloud Firestore Security Rules"
