# Deployment Guide - مؤسسة مشروعنا إلى الجنة

## Overview

هذا الدليل يشرح كيفية نشر موقع مؤسسة مشروعنا إلى الجنة على الإنتاج.

## Pre-Deployment Checklist

- [ ] تم إكمال جميع الاختبارات بنجاح
- [ ] تم إعداد Firebase (Authentication, Firestore)
- [ ] تم إضافة مستخدم إداري في Firebase
- [ ] تم اختبار جميع المميزات محلياً
- [ ] تم مراجعة جميع الصفحات
- [ ] تم التحقق من RTL والعربية
- [ ] تم إنشاء checkpoint

## Deployment Steps

### Step 1: Final Testing

```bash
# تشغيل جميع الاختبارات
pnpm test

# بناء المشروع للإنتاج
pnpm build

# التحقق من عدم وجود أخطاء
pnpm build 2>&1 | grep -i error
```

### Step 2: Create Checkpoint

في واجهة Manus:
1. انقر على **Save Checkpoint**
2. أضف وصف: "Final version ready for production"
3. انقر على **Save**

### Step 3: Publish

في واجهة Manus:
1. انقر على **Publish** (في رأس الصفحة)
2. اختر الـ Checkpoint الأخير
3. انقر على **Publish**
4. انتظر اكتمال النشر

### Step 4: Verify Deployment

بعد النشر:
1. اذهب إلى الرابط المنشور
2. اختبر جميع الصفحات:
   - الصفحة الرئيسية
   - عن المؤسسة
   - المشاريع
   - المعرض
   - التبرع
   - تواصل معنا
   - سياسة الخصوصية

3. اختبر المميزات:
   - تسجيل الدخول الإداري
   - عرض الإحصائيات
   - إرسال رسالة تواصل
   - عرض الرسائل في Admin

## Domain Configuration

### Option 1: Use Manus Domain

الموقع متاح على:
- `https://mashrouana-ne8hfedf.manus.space`

### Option 2: Use Custom Domain

لربط نطاق مخصص (mashrouana.org):

1. في Manus Dashboard، اذهب إلى **Settings** → **Domains**
2. انقر على **Add custom domain**
3. أدخل النطاق: `mashrouana.org`
4. اتبع تعليمات DNS
5. انتظر التحقق (عادة 24-48 ساعة)

## Firebase Configuration for Production

### Update Security Rules

في Firebase Console، اذهب إلى **Firestore** → **Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to counters for all users
    match /settings/counters {
      allow read: if true;
      allow write: if request.auth != null && 
        request.auth.token.email == 'admin@mashrouana.org';
    }
    
    // Allow create for contact messages
    match /messages/{document=**} {
      allow create: if true;
      allow read, write: if request.auth != null && 
        request.auth.token.email == 'admin@mashrouana.org';
    }
  }
}
```

### Enable Backups

1. في Firebase Console، اذهب إلى **Firestore** → **Backups**
2. انقر على **Enable backups**
3. اختر تكرار النسخ الاحتياطية (يومي)

## Monitoring

### Check Deployment Status

في Manus Dashboard:
1. اذهب إلى **Dashboard**
2. تحقق من **Deployment Status**
3. تحقق من **Analytics** (إن وجد)

### Monitor Firebase

في Firebase Console:
1. اذهب إلى **Firestore** → **Usage**
2. راقب عدد القراءات والكتابات
3. تحقق من **Authentication** → **Users**

## Troubleshooting

### المشكلة: الموقع لا يحمّل

**الحل:**
1. تحقق من حالة النشر في Manus Dashboard
2. امسح ذاكرة التخزين المؤقت (Cache)
3. حاول في متصفح آخر

### المشكلة: Firebase غير متصل

**الحل:**
1. تحقق من متغيرات البيئة
2. تحقق من Firebase Console - هل الخدمات مفعّلة؟
3. تحقق من Security Rules

### المشكلة: الرسائل لا تُحفظ

**الحل:**
1. تحقق من Firestore Rules
2. تأكد من أن مجموعة `messages` موجودة
3. تحقق من وحدة التحكم (Console) من أجل الأخطاء

## Post-Deployment Tasks

### 1. Setup Google Ad Grants

للتقدم بطلب Google Ad Grants:
1. تأكد من وجود صفحات مطلوبة:
   - ✅ About (عن المؤسسة)
   - ✅ Contact (تواصل معنا)
   - ✅ Privacy Policy (سياسة الخصوصية)

2. تأكد من:
   - ✅ عدم وجود ادعاءات مضللة
   - ✅ وضوح الرسالة الخيرية
   - ✅ معلومات التواصل صحيحة

### 2. Setup Analytics

في Google Analytics:
1. أنشئ حساب جديد
2. أضف معرّف الموقع
3. أضف كود التتبع إلى الموقع

### 3. Setup Email Notifications

للحصول على إشعارات بالرسائل الجديدة:
1. في Firebase Console، اذهب إلى **Functions**
2. أنشئ Cloud Function لإرسال البريد الإلكتروني
3. أو استخدم خدمة طرف ثالث (مثل SendGrid)

### 4. Backup Strategy

- تفعيل النسخ الاحتياطية التلقائية في Firebase
- تنزيل نسخة احتياطية أسبوعية يدويًا
- اختبار استعادة البيانات شهريًا

## Rollback (في حالة المشاكل)

إذا حدثت مشاكل بعد النشر:

1. في Manus Dashboard، اذهب إلى **Version History**
2. اختر الإصدار السابق الذي كان يعمل
3. انقر على **Rollback**
4. تحقق من أن الموقع يعمل بشكل صحيح

## Performance Optimization

### Image Optimization

الصور الحالية ثابتة في `/public/images/`:
- تأكد من أن الصور مضغوطة
- استخدم صيغ حديثة (WebP)

### Caching

تفعيل HTTP caching:
- الصور الثابتة: 1 سنة
- CSS/JS: 1 شهر
- HTML: لا تخزن مؤقتاً

## Support & Maintenance

### Regular Tasks

- **أسبوعي:** تحقق من الرسائل الجديدة
- **شهري:** راجع الإحصائيات والأرقام
- **ربع سنوي:** تحديث المحتوى والصور
- **سنوي:** مراجعة شاملة وتحديثات الأمان

### Emergency Contact

للمشاكل الطارئة:
- البريد الإلكتروني: `admin@mashrouana.org`
- الهاتف: `+20 101 312 8453`
- WhatsApp: نفس الرقم

---

**آخر تحديث:** 2026-05-05
**الإصدار:** 1.0.0
