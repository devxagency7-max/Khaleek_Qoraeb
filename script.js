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

// iOS Safari Helper Detection
document.addEventListener('DOMContentLoaded', () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    if (isIOS && isSafari) {
        const helper = document.getElementById('ios-helper');
        if (helper) helper.style.display = 'block';
    }
});
