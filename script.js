// ===========================
// Elements References
// ===========================
const envelopeContainer = document.getElementById("envelope-container");
const letterContainer = document.getElementById("letter-container");
const letterWindow = document.querySelector(".letter-window");

// Buttons
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

// Steps
const initialContent = document.getElementById("initial-content");
const step1Container = document.getElementById("step1-container");
const step2Container = document.getElementById("step2-container");
const step3Container = document.getElementById("step3-container");
const stepFinalContainer = document.getElementById("step-final-container");

// Next Buttons
const nextToStep2Btn = document.getElementById("next-to-step2");
const nextToStep3Btn = document.getElementById("next-to-step3");
const nextToFinalBtn = document.getElementById("next-to-final");

// ===========================
// ✨ SPECIAL FUNCTION: AUTO SCALING ✨
// ===========================
function resizeContent() {
    const screenWidth  = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isPortrait   = screenWidth < 500 && screenHeight > screenWidth; // เงื่อนไขเดียวกับ media query

    let scale = 1;

    if (isPortrait) {
        // ---- แนวตั้ง: scale จาก HEIGHT ----
        // เปลี่ยน targetHeight ได้เลยครับ (ควรตรงกับความสูงจริงของกล่องตอน portrait)
        const targetHeight = 700;
        const margin = 40;
        if (screenHeight < targetHeight + margin) {
            scale = (screenHeight - margin) / targetHeight;
        }
    } else {
        // ---- แนวนอน: scale จาก WIDTH (เหมือนเดิม) ----
        const targetWidth = 800;
        const margin = 40;
        if (screenWidth < targetWidth + margin) {
            scale = (screenWidth - margin) / targetWidth;
        }
    }

    letterWindow.style.setProperty('--scale-factor', scale);
}

// เรียกใช้ทุกครั้งที่โหลดหรือหมุนจอ
window.addEventListener('resize', resizeContent);
window.addEventListener('load', resizeContent);


// ===========================
// 1. Click Envelope
// ===========================
envelopeContainer.addEventListener("click", () => {
    const music = document.getElementById('bg-music');
    music.volume = 0.4;
    music.play();

    resizeContent();

    envelopeContainer.style.display = "none";
    letterContainer.style.display = "flex";
    
    setTimeout(() => {
        letterWindow.classList.add("open");
    }, 50);

    envelopeContainer.classList.add('fade-out');
});

// ===========================
// 2. Logic Button NO
// ===========================
function moveNoButton(e) {
    if(e) e.preventDefault();

    const isMobile = window.innerWidth < 768;
    const maxMove = isMobile ? 80 : 150; 

    const moveX = (Math.random() * maxMove * 2) - maxMove;
    const moveY = (Math.random() * maxMove * 2) - maxMove;

    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

// ===========================
// 3. Story Flow
// ===========================
yesBtn.addEventListener("click", () => {
    initialContent.style.display = "none";
    step1Container.style.display = "flex";
});
nextToStep2Btn.addEventListener("click", () => {
    step1Container.style.display = "none";
    step2Container.style.display = "flex";
});
nextToStep3Btn.addEventListener("click", () => {
    step2Container.style.display = "none";
    step3Container.style.display = "flex";
});
nextToFinalBtn.addEventListener("click", () => {
    step3Container.style.display = "none";
    stepFinalContainer.style.display = "flex";
});
