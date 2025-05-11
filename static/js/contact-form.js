/**
 * نظام نموذج التواصل
 * 
 * يتعامل مع نموذج التواصل ويرسله باستخدام AJAX
 * ويعرض رسائل النجاح أو الخطأ
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // الحصول على زر الإرسال وتغيير حالته
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            
            // التحقق من الحقول المطلوبة
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            if (!name || !email || !message) {
                // إظهار رسالة خطأ
                showMessage('danger', 'يرجى تعبئة جميع الحقول المطلوبة');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                return;
            }
            
            // إنشاء كائن FormData
            const formData = new FormData(this);
            
            // إرسال البيانات باستخدام fetch API مباشرة بالـ FormData
            fetch('/messaging/submit-contact', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // عرض رسالة النجاح وإعادة تعيين النموذج
                if (data.success) {
                    showMessage('success', data.message || 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً');
                    contactForm.reset();
                } else {
                    showMessage('danger', data.error || 'حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى لاحقاً');
                }
                
                // إعادة زر الإرسال إلى حالته الأصلية
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            })
            .catch(error => {
                console.error('Error submitting contact form:', error);
                
                // عرض رسالة الخطأ
                showMessage('danger', 'حدث خطأ أثناء إرسال الرسالة، يرجى المحاولة مرة أخرى لاحقاً');
                
                // إعادة زر الإرسال إلى حالته الأصلية
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
        });
    }
    
    // دالة لعرض رسائل النجاح أو الخطأ
    function showMessage(type, message) {
        // البحث عن حاوية الرسائل
        let messageContainer = document.querySelector('.contact-message-container');
        
        // إنشاء حاوية للرسائل إذا لم تكن موجودة
        if (!messageContainer) {
            messageContainer = document.createElement('div');
            messageContainer.className = 'contact-message-container mt-4';
            contactForm.parentNode.insertBefore(messageContainer, contactForm);
        }
        
        // إزالة أي رسائل سابقة
        messageContainer.innerHTML = '';
        
        // إنشاء رسالة جديدة
        const alertEl = document.createElement('div');
        alertEl.className = `alert ${type === 'success' ? 'alert-success' : 'alert-danger'} mb-4 text-right`;
        
        // استخدام طريقة أبسط لتكوين محتوى التنبيه
        const iconClass = type === 'success' ? 'check-circle' : 'exclamation-circle';
        alertEl.innerHTML = '<div class="flex items-center justify-between">' + 
                           '<div><i class="fas fa-' + iconClass + ' mr-2"></i>' + message + '</div>' +
                           '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                           '<span aria-hidden="true">&times;</span></button></div>';
        
        // إضافة الرسالة إلى الحاوية
        messageContainer.appendChild(alertEl);
        
        // التمرير إلى موقع الرسالة
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // إضافة زر الإغلاق
        const closeBtn = alertEl.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                alertEl.remove();
            });
        }
        
        // إخفاء الرسالة تلقائيًا بعد 5 ثوانٍ
        setTimeout(() => {
            alertEl.classList.add('fade');
            setTimeout(() => {
                alertEl.remove();
            }, 500);
        }, 5000);
    }
});