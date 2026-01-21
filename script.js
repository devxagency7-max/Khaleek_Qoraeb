// JavaScript logic for the خليك قريب website

/**
 * Generates and downloads a vCard 3.0 file
 */
function saveContact() {
    // vCard 3.0 Template
    const vcard = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "FN;CHARSET=UTF-8:خليك قريب - مكالمات فقط",
        "ORG;CHARSET=UTF-8:خليك قريب",
        "TEL;TYPE=CELL:01211335670",
        "TEL;TYPE=CELL:01276555844",
        "TEL;TYPE=CELL:01201560926",
        "NOTE;CHARSET=UTF-8:الأرقام مكالمات فقط",
        "END:VCARD"
    ].join("\r\n");

    // Create a Blob with UTF-8 encoding
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "khalikareeb.vcf");
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    // Show success feedback
    showToast("✅ تم تحميل جهة الاتصال");
}


/**
 * Displays a temporary toast notification
 * @param {string} message 
 */
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Floating Phone Menu Toggle
function togglePhoneMenu() {
    const menu = document.getElementById('phoneMenu');
    menu.classList.toggle('show');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const container = document.querySelector('.floating-contact-container');
    const menu = document.getElementById('phoneMenu');
    if (menu && container && !container.contains(e.target)) {
        menu.classList.remove('show');
    }
});

// Detect iOS for vCard instructions
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (isIOS) {
    const helper = document.getElementById('ios-helper');
    if (helper) {
        helper.style.display = 'block';
    }
}

// --- Multi-Language Support ---
const translations = {
    ar: {
        "logo-text": "خليك قريب",
        "subtitle": "كل روابط التواصل الرسمية",
        "download-title": "تحميل التطبيق",
        "chat-note": "التواصل عبر الدردشة متاح فقط داخل التطبيق",
        "social-title": "روابط التواصل",
        "fb-text": "فيسبوك - Facebook",
        "ig-text": "إنستجرام - Instagram",
        "tk-text": "تيك توك - TikTok",
        "save-title": "حفظ جهة الاتصال",
        "save-btn": "حفظ جهة الاتصال على الهاتف",
        "ios-helper": "بعد التحميل، افتح الملف لإضافة جهة الاتصال",
        "toast-success": "✅ تم تحميل جهة الاتصال",
        "lang-btn": "English"
    },
    en: {
        "logo-text": "Stay Close",
        "subtitle": "All official contact links",
        "download-title": "Download the App",
        "chat-note": "Direct chat is only available inside the app",
        "social-title": "Connect with Us",
        "fb-text": "Facebook",
        "ig-text": "Instagram",
        "tk-text": "TikTok",
        "save-title": "Save Contact",
        "save-btn": "Save Contact to Phone",
        "ios-helper": "After downloading, open the file to add the contact",
        "toast-success": "✅ Contact downloaded successfully",
        "lang-btn": "العربية"
    }
};

let currentLang = localStorage.getItem('siteLang') || 'ar';

function updateUI() {
    const texts = translations[currentLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (texts[key]) {
            el.textContent = texts[key];
        }
    });

    // Update Language Toggle Button
    const btnText = document.querySelector('.lang-text');
    if (btnText) btnText.textContent = texts['lang-btn'];

    // Update Direction and Lang attribute
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
}

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    localStorage.setItem('siteLang', currentLang);
    updateUI();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', updateUI);
