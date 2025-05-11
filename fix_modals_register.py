"""
إصلاح وتسجيل مسارات النوافذ المنبثقة
"""
from flask import Blueprint

# إنشاء بلوبرنت
modals_fix_bp = Blueprint('modals_fix', __name__, url_prefix='/modals')

def register_fix_modals(app):
    """
    تسجيل مسارات إصلاح النوافذ المنبثقة
    تُمرر من خلال هذه الدالة - وهي تضيف فقط البلوبرنت إلى التطبيق
    """
    app.register_blueprint(modals_fix_bp)
    return app