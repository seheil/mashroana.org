# Firebase Setup Guide - مؤسسة مشروعنا إلى الجنة

## Overview

هذا الدليل يشرح كيفية إعداد Firebase للموقع الخاص بمؤسسة مشروعنا إلى الجنة.

## Prerequisites

- Firebase Project (يمكن إنشاؤه من [Firebase Console](https://console.firebase.google.com))
- Admin access لـ Firebase Console
- Credentials من Firebase

## Firebase Services المستخدمة

### 1. Authentication (المصادقة)
- **الغرض:** تسجيل دخول المسؤولين إلى لوحة التحكم
- **الطريقة:** Email/Password
- **الملف:** `client/src/lib/firebase.ts`

### 2. Firestore Database (قاعدة البيانات)
- **الغرض:** تخزين البيانات
- **المجموعات:**
  - `settings/counters` - الإحصائيات (الأيتام، الطلاب، المرضى، الأسر)
  - `messages` - رسائل التواصل من نموذج الاتصال

### 3. Cloud Storage (التخزين السحابي)
- **الحالة:** قيد التطوير
- **الغرض:** تخزين صور المعرض (سيتم تفعيله لاحقاً)

## Setup Steps

### Step 1: Create Firebase Project

1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. انقر على "Create a new project"
3. أدخل اسم المشروع: `mashrouana-foundation`
4. اختر المنطقة الجغرافية
5. انقر على "Create project"

### Step 2: Enable Authentication

1. في Firebase Console، اذهب إلى **Authentication**
2. انقر على **Get started**
3. اختر **Email/Password**
4. فعّل **Email/Password** authentication
5. أضف مستخدم إداري:
   - Email: `admin@mashrouana.org`
   - Password: (كلمة مرور قوية)

### Step 3: Create Firestore Database

1. في Firebase Console، اذهب إلى **Firestore Database**
2. انقر على **Create database**
3. اختر **Start in test mode** (للتطوير)
4. اختر المنطقة الجغرافية
5. انقر على **Create**

### Step 4: Create Firestore Collections

#### Collection 1: settings/counters

```
Collection: settings
Document: counters
Fields:
  - orphans: number (1250)
  - students: number (2100)
  - patients: number (5600)
  - families: number (3400)
```

**خطوات الإنشاء:**
1. في Firestore، انقر على **Start collection**
2. أدخل اسم المجموعة: `settings`
3. أدخل معرّف الوثيقة: `counters`
4. أضف الحقول:
   - `orphans`: number = 1250
   - `students`: number = 2100
   - `patients`: number = 5600
   - `families`: number = 3400

#### Collection 2: messages

```
Collection: messages
Auto-generated document IDs
Fields:
  - name: string
  - email: string
  - phone: string
  - message: string
  - timestamp: timestamp
  - read: boolean (false)
```

**خطوات الإنشاء:**
1. انقر على **Start collection**
2. أدخل اسم المجموعة: `messages`
3. اترك معرّف الوثيقة فارغاً (سيتم إنشاؤه تلقائياً)
4. أضف حقل واحد مثالي:
   - `name`: string = "Test"
5. انقر على **Save**

### Step 5: Get Firebase Credentials

1. في Firebase Console، اذهب إلى **Project Settings** (⚙️)
2. انقر على **Service Accounts**
3. انقر على **Generate new private key**
4. احفظ الملف JSON

### Step 6: Configure Environment Variables

تم تكوين متغيرات البيئة التالية تلقائياً:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### Step 7: Set Firestore Security Rules

في Firestore Console، اذهب إلى **Rules** وأضف:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to settings/counters for all users
    match /settings/counters {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow write to messages for all users
    match /messages/{document=**} {
      allow create: if true;
      allow read, write: if request.auth != null;
    }
  }
}
```

انقر على **Publish**

## Testing Firebase Integration

### Test 1: Admin Login

1. اذهب إلى `/admin-login`
2. أدخل بيانات المسؤول:
   - Email: `admin@mashrouana.org`
   - Password: (كلمة المرور المحددة)
3. يجب أن تنجح عملية تسجيل الدخول

### Test 2: View Counters

1. بعد تسجيل الدخول، انقر على **لوحة التحكم**
2. يجب أن ترى الإحصائيات المحملة من Firestore:
   - الأيتام: 1250
   - الطلاب: 2100
   - المرضى: 5600
   - الأسر: 3400

### Test 3: Update Counters

1. غيّر قيمة أحد الإحصائيات
2. انقر على **حفظ البيانات**
3. يجب أن تظهر رسالة نجاح
4. تحقق من Firestore Console - يجب أن تكون القيمة محدثة

### Test 4: Contact Form

1. اذهب إلى صفحة **تواصل معنا**
2. ملء النموذج:
   - الاسم: "أحمد محمد"
   - البريد الإلكتروني: "ahmed@example.com"
   - الهاتف: "01012345678"
   - الرسالة: "رسالة تجريبية"
3. انقر على **إرسال**
4. يجب أن تظهر رسالة نجاح
5. تحقق من Firestore Console - يجب أن تظهر الرسالة في مجموعة `messages`

### Test 5: View Messages in Admin

1. سجّل الدخول كمسؤول
2. انقر على **الرسائل**
3. يجب أن ترى جميع الرسائل المرسلة
4. يجب أن تظهر معلومات الرسالة:
   - الاسم والبريد الإلكتروني
   - رقم الهاتف
   - محتوى الرسالة
   - التاريخ والوقت

## Troubleshooting

### المشكلة: "Firebase is not initialized"

**الحل:**
1. تحقق من ملف `client/src/lib/firebase.ts`
2. تأكد من أن جميع متغيرات البيئة موجودة
3. أعد تحميل الصفحة

### المشكلة: "Permission denied" عند قراءة البيانات

**الحل:**
1. تحقق من Firestore Security Rules
2. تأكد من أن القواعد تسمح بالقراءة
3. أعد نشر القواعد

### المشكلة: الرسائل لا تظهر في Admin

**الحل:**
1. تحقق من أن الرسالة تم حفظها في Firestore
2. تأكد من تسجيل الدخول كمسؤول
3. تحقق من وحدة التحكم (Console) من أجل الأخطاء

## Production Deployment

قبل النشر على الإنتاج:

1. **تغيير Firestore Rules:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /settings/counters {
         allow read: if true;
         allow write: if request.auth != null && 
           request.auth.token.email == 'admin@mashrouana.org';
       }
       
       match /messages/{document=**} {
         allow create: if true;
         allow read, write: if request.auth != null && 
           request.auth.token.email == 'admin@mashrouana.org';
       }
     }
   }
   ```

2. **تفعيل Cloud Storage** (عند الحاجة):
   - اذهب إلى **Storage**
   - انقر على **Get started**
   - اتبع الخطوات

3. **إعداد Domain:**
   - اربط نطاق مخصص (mashrouana.org)
   - استخدم Firebase Hosting

4. **النسخ الاحتياطية:**
   - فعّل النسخ الاحتياطية التلقائية
   - اختبر استعادة البيانات

## Support

للمزيد من المعلومات:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

---

**آخر تحديث:** 2026-05-05
**الإصدار:** 1.0.0
