#!/usr/bin/env python3
"""
إنشاء مستخدم مسؤول على Render
يستخدم هذا الملف للتأكد من وجود مستخدم مسؤول في قاعدة البيانات عند النشر على Render
"""
import os
import sys
from datetime import datetime
from werkzeug.security import generate_password_hash
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# استخدام اتصال قاعدة البيانات من التطبيق الرئيسي
from app import app, db
from models import User, UserRole

def create_default_admin():
    """إنشاء مستخدم مسؤول افتراضي إذا لم يكن موجوداً"""
    with app.app_context():
        # التحقق من وجود مستخدمين مسؤولين
        admin_exists = User.query.filter_by(role=UserRole.ADMIN.value).first()
        
        if admin_exists:
            logger.info(f"يوجد مستخدم مسؤول بالفعل: {admin_exists.username}")
            return
        
        # إنشاء مستخدم مسؤول افتراضي
        default_admin = User(
            username="admin",
            email="admin@example.com",
            password_hash=generate_password_hash("admin123"),
            role=UserRole.ADMIN.value,
            email_verified=True,
            created_at=datetime.now()
        )
        
        try:
            db.session.add(default_admin)
            db.session.commit()
            logger.info("تم إنشاء مستخدم مسؤول افتراضي بنجاح!")
            logger.info("اسم المستخدم: admin")
            logger.info("كلمة المرور: admin123")
            logger.info("يرجى تغيير كلمة المرور فور تسجيل الدخول الأول")
        except Exception as e:
            db.session.rollback()
            logger.error(f"خطأ أثناء إنشاء المستخدم المسؤول: {str(e)}")

if __name__ == "__main__":
    try:
        create_default_admin()
    except Exception as e:
        logger.error(f"خطأ: {str(e)}")