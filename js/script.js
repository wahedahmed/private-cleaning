/**
 * شركة التنظيف - ملف الجافا سكريبت الرئيسي
 * يحتوي على وظائف تبديل اللغة وتفعيل القائمة المتنقلة
 */

// تحميل المستند
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة القائمة المتنقلة
    initMobileMenu();
    
    // تهيئة نموذج الاتصال
    initContactForm();
});

/**
 * تبديل اللغة بين العربية والإنجليزية
 */
function toggleLanguage() {
    const htmlElement = document.getElementById('htmlElement');
    const currentDir = htmlElement.getAttribute('dir');
    const langToggleText = document.querySelector('.lang-text');
    
    // تبديل اتجاه الصفحة واللغة
    if (currentDir === 'rtl') {
        // تغيير إلى الإنجليزية
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', 'en');
        langToggleText.textContent = 'العربية';
        
        // تحديث جميع النصوص إلى الإنجليزية
        updateTextsToEnglish();
    } else {
        // تغيير إلى العربية
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.setAttribute('lang', 'ar');
        langToggleText.textContent = 'English';
        
        // تحديث جميع النصوص إلى العربية
        updateTextsToArabic();
    }
}

/**
 * تحديث النصوص إلى اللغة الإنجليزية
 */
function updateTextsToEnglish() {
    // تحديث العناصر التي تحتوي على سمة data-en
    const elementsWithDataEn = document.querySelectorAll('[data-en]');
    elementsWithDataEn.forEach(element => {
        // حفظ النص العربي الأصلي إذا لم يكن محفوظًا بالفعل
        if (!element.hasAttribute('data-ar')) {
            element.setAttribute('data-ar', element.textContent);
        }
        // تعيين النص الإنجليزي
        element.textContent = element.getAttribute('data-en');
    });
    
    // تحديث عناصر الإدخال التي تحتوي على سمة data-en-placeholder
    const inputsWithDataEnPlaceholder = document.querySelectorAll('[data-en-placeholder]');
    inputsWithDataEnPlaceholder.forEach(input => {
        // حفظ النص العربي الأصلي إذا لم يكن محفوظًا بالفعل
        if (!input.hasAttribute('data-ar-placeholder')) {
            input.setAttribute('data-ar-placeholder', input.getAttribute('placeholder'));
        }
        // تعيين النص الإنجليزي
        input.setAttribute('placeholder', input.getAttribute('data-en-placeholder'));
    });
    
    // تحديث عناصر الاختيار
    updateSelectOptions('en');
    
    // تحديث عنوان الصفحة
    document.title = "Premium Cleaning Company | Professional Cleaning Services";
}

/**
 * تحديث النصوص إلى اللغة العربية
 */
function updateTextsToArabic() {
    // تحديث العناصر التي تحتوي على سمة data-ar
    const elementsWithDataAr = document.querySelectorAll('[data-ar]');
    elementsWithDataAr.forEach(element => {
        // تعيين النص العربي
        element.textContent = element.getAttribute('data-ar');
    });
    
    // تحديث عناصر الإدخال التي تحتوي على سمة data-ar-placeholder
    const inputsWithDataArPlaceholder = document.querySelectorAll('[data-ar-placeholder]');
    inputsWithDataArPlaceholder.forEach(input => {
        // تعيين النص العربي
        input.setAttribute('placeholder', input.getAttribute('data-ar-placeholder'));
    });
    
    // تحديث عناصر الاختيار
    updateSelectOptions('ar');
    
    // تحديث عنوان الصفحة
    document.title = "شركة التنظيف المتميزة | خدمات تنظيف احترافية";
}

/**
 * تحديث خيارات عناصر الاختيار حسب اللغة
 */
function updateSelectOptions(language) {
    const selectElements = document.querySelectorAll('select');
    
    selectElements.forEach(select => {
        const options = select.querySelectorAll('option');
        
        options.forEach(option => {
            if (language === 'en' && option.hasAttribute('data-en')) {
                // حفظ النص العربي الأصلي إذا لم يكن محفوظًا بالفعل
                if (!option.hasAttribute('data-ar')) {
                    option.setAttribute('data-ar', option.textContent);
                }
                // تعيين النص الإنجليزي
                option.textContent = option.getAttribute('data-en');
            } else if (language === 'ar' && option.hasAttribute('data-ar')) {
                // تعيين النص العربي
                option.textContent = option.getAttribute('data-ar');
            }
        });
    });
}

/**
 * تهيئة القائمة المتنقلة
 */
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuToggle && mainMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
        });
        
        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (!mainMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                mainMenu.classList.remove('active');
            }
        });
    }
}

/**
 * تهيئة نموذج الاتصال
 */
function initContactForm() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // هنا يمكن إضافة التحقق من صحة النموذج وإرساله
            const formData = new FormData(quoteForm);
            const formValues = {};
            
            for (const [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // عرض رسالة نجاح (في الإنتاج الفعلي، سيتم إرسال البيانات إلى الخادم)
            alert('تم إرسال طلبك بنجاح! سنتواصل معك قريبًا.');
            quoteForm.reset();
        });
    }
}

/**
 * تمرير الصفحة بسلاسة عند النقر على الروابط
 */
document.addEventListener('click', function(event) {
    const target = event.target;
    
    // التحقق مما إذا كان العنصر المنقور عليه هو رابط داخلي
    if (target.tagName === 'A' && target.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        
        const targetId = target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
});

/**
 * تحريك العناصر عند التمرير
 */
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const scrollElements = document.querySelectorAll('.scroll-animate');
    
    scrollElements.forEach(element => {
        if (scrollPosition > element.offsetTop - window.innerHeight + 100) {
            element.classList.add('visible');
        }
    });
});