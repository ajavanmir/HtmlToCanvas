/*
Copyright amir javanmir
Released on: Aug 19, 2025
*/
let button = document.getElementById("screenshotBtn");
let partScreen = document.getElementById("formToCapture");
let addPart = document.getElementById("about");

button.addEventListener("click", async function (e) {
    try {
        button.disabled = true;
        button.textContent = "در حال ساخت اسکرین‌ شات...";
        const data = await captureSiteToBase64("#formToCapture", "#about", { scale: 2, useCORS: true });

        let downloadLink = document.createElement("a");
        downloadLink.href = data;
        downloadLink.download = `screenshot-${new Date().toISOString().slice(0, 10)}.png`;
        downloadLink.click();
    } catch (error) {
        console.error("Error:" + error.message || error);
    } finally {
        button.disabled = false;
        button.textContent = 'ارسال فرم';
    }
});

async function captureSiteToBase64(select, addPart, opts) {
    const original = document.querySelector(select);
    if (!original) throw new Error('Element not found: ' + select);

    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = (opts.width || original.offsetWidth) + 'px';
    wrapper.style.height = (opts.height || window.innerHeight) + 'px';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';
    wrapper.style.background = opts.background || '#fff';

    const cloned = original.cloneNode(true);
    cloned.style.boxSizing = 'border-box';
    cloned.style.width = (opts.width || original.offsetWidth) + 'px';

    copyFormValues(original, cloned);

    if (addPart) {
        const src = document.querySelector(addPart);
        if (src) {
            const textPreview = document.createElement('div');
            textPreview.style.whiteSpace = 'pre-wrap';
            textPreview.style.lineHeight = '1.6';
            textPreview.style.borderTop = '1px dashed #ccc';
            textPreview.style.padding = '20px';
            textPreview.style.direction = 'rtl';
            textPreview.textContent = src.value.replace(/([\u0600-\u06FF])(\d)/g, '$1 $2').replace(/(\d)([\u0600-\u06FF])/g, '$1 $2');
            cloned.appendChild(textPreview);
        }
    }
    wrapper.appendChild(cloned);
    document.body.appendChild(wrapper);
    try {
        let base64;

        const canvas = await html2canvas(cloned, {
            scale: opts.scale || 2,
            logging: false,
            backgroundColor: opts.background || '#fff',
            width: original.offsetWidth,
            scrollX: 0,
            scrollY: 0,
            useCORS: !!opts.useCORS
        }).then(response => {
            base64 = response.toDataURL('image/png', 1.0)
        });
        return base64;
    } finally {
        document.body.removeChild(wrapper);
    }
}

function copyFormValues(original, cloned) {
    const selectors = 'input,textarea,select';
    const origControls = Array.from(original.querySelectorAll(selectors));
    origControls.forEach((orig) => {
        let clone = null;
        if (orig.name) clone = cloned.querySelector(`[name="${orig.name}"]`);
        if (!clone && orig.id) clone = cloned.querySelector(`#${orig.id}`);
        if (!clone) {
            const candidates = Array.from(cloned.querySelectorAll(orig.tagName.toLowerCase()));
            const index = Array.from(original.querySelectorAll(orig.tagName.toLowerCase())).indexOf(orig);
            clone = candidates[index] || null;
        }
        if (!clone) return;

        if (orig.tagName == 'INPUT') {
            const type = orig.type;
            if (type === 'checkbox' || type === 'radio') clone.checked = orig.checked;
            else clone.value = orig.value;
        } else if (orig.tagName === 'TEXTAREA') {
            clone.value = orig.value;
        } else if (orig.tagName === 'SELECT') {
            clone.selectedIndex = orig.selectedIndex;
        }
    })
}
