// تفعيل قسم الأسئلة الشائعة
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل الأسئلة الشائعة
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // إغلاق جميع الأسئلة الأخرى
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // تبديل حالة السؤال الحالي
                item.classList.toggle('active');
            });
        });
    }
    
    // تفعيل العداد للإحصائيات
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.getAttribute('data-value'));
                    let startValue = 0;
                    const duration = 2000;
                    const increment = finalValue / (duration / 16);
                    
                    const updateCounter = () => {
                        startValue += increment;
                        if (startValue < finalValue) {
                            target.textContent = Math.floor(startValue);
                            requestAnimationFrame(updateCounter);
                        } else {
                            target.textContent = finalValue;
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                    observer.unobserve(target);
                }
            });
        }, options);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }
    
    // تفعيل التبديل بين اللغات
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            document.body.classList.toggle('arabic-mode');
            
            // تغيير اتجاه النص
            if (document.body.classList.contains('arabic-mode')) {
                document.documentElement.setAttribute('dir', 'rtl');
                languageToggle.textContent = 'English';
            } else {
                document.documentElement.setAttribute('dir', 'ltr');
                languageToggle.textContent = 'العربية';
            }
        });
    }
});