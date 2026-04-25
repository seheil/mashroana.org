# تعليمات الإعداد السريع

## 🚀 البدء السريع (5 دقائق)

### المتطلبات

- حساب GitHub
- Cloudflare (اختياري - للدومين المخصص)

### الخطوات

#### 1️⃣ إنشاء مستودع GitHub

```bash
# انسخ هذا الأمر في Terminal
git clone https://github.com/YOUR_USERNAME/mashroana.org.git
cd mashroana.org
```

#### 2️⃣ رفع الملفات

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 3️⃣ تفعيل GitHub Pages

في GitHub:
- Settings → Pages
- Branch: main
- Folder: / (root)
- Save

#### 4️⃣ ربط الدومين (اختياري)

في Cloudflare:
- DNS → Add Record
- Type: CNAME
- Name: mashroana.org
- Target: YOUR_USERNAME.github.io

---

## 📝 تحديث الموقع

```bash
# عدّل الملفات
# ثم:
git add .
git commit -m "تحديث: وصف التغيير"
git push origin main
```

---

## ✅ التحقق

- [ ] الموقع يعمل على `https://mashroana.org`
- [ ] الاتصال آمن (🔒)
- [ ] جميع الصور تظهر بشكل صحيح
- [ ] الروابط تعمل بشكل صحيح
- [ ] الموقع يعمل على الهاتف

---

## 🆘 حل المشاكل

### الموقع لا يظهر

- انتظر 5-10 دقائق لنشر التغييرات
- امسح الذاكرة المؤقتة (Ctrl+Shift+Delete)
- تحقق من أن الملفات موجودة في المستودع

### الدومين لا يعمل

- تحقق من إعدادات Cloudflare
- انتظر 24-48 ساعة لانتشار DNS
- تأكد من أن CNAME صحيح

### الصور لا تظهر

- تحقق من أن الملفات موجودة في مجلد `assets/`
- تحقق من مسارات الصور في HTML

---

## 📞 الدعم

للمساعدة:
- اترك Issue في GitHub
- تواصل عبر Facebook
- أرسل بريد إلكتروني

---

**آخر تحديث**: 25 أبريل 2026
