# تعليمات النشر للموقع على Render

## متطلبات النشر

1. قاعدة بيانات PostgreSQL
2. بيئة تشغيل Python 3.9+

## المتغيرات البيئية المطلوبة:

```
# إعدادات قاعدة البيانات
DATABASE_URL=postgresql://username:password@hostname:port/database_name
PGDATABASE=database_name
PGHOST=hostname
PGPORT=port
PGUSER=username
PGPASSWORD=password

# سر الجلسة (مطلوب)
SESSION_SECRET=your_secure_random_string

# إعدادات تيليجرام (اختياري)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

## خطوات النشر على Render:

1. قم بإنشاء قاعدة بيانات PostgreSQL جديدة على Render.
2. قم بإنشاء خدمة Web Service جديدة مع الإعدادات التالية:
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn --bind 0.0.0.0:$PORT main:app`
3. قم بإضافة المتغيرات البيئية المذكورة أعلاه في إعدادات Environment.
4. قم بتحميل حزمة الملفات هذه مباشرة.

## إنشاء مستخدم مسؤول:

سيتم إنشاء مستخدم مسؤول افتراضي تلقائيًا عند تشغيل التطبيق لأول مرة.
- اسم المستخدم: `admin`
- كلمة المرور: `admin123`

إذا واجهت مشكلة، قم بتنفيذ الأمر التالي عبر Shell:
```
python create_admin_for_render.py
```

## ملاحظات هامة:

1. تم تصحيح مشكلة "ModuleNotFoundError: No module named 'fix_modals_register'" بإضافة الملف المطلوب.
2. مجلدات التحميل ستكون فارغة عند البداية وستمتلئ عند رفع الملفات.

تم إعداد حزمة النشر الأساسية هذه بتاريخ: 2025-05-11 14:09:04
