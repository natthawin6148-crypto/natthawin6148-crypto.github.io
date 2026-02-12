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
// ฟังก์ชันย่อหน้าต่างให้พอดีจอมือถือ (รักษาสัดส่วนเดิมเป๊ะๆ)
// ===========================
function resizeContent() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // ขนาดเดิมที่เราล็อคไว้ใน CSS (800px)
    const targetWidth = 800; 
    const margin = 40; // เว้นขอบข้างนิดหน่อย

    // คำนวณว่าจอมือถือเล็กกว่าคอมกี่เท่า
    let scale = 1;
    if (screenWidth < targetWidth + margin) {
        scale = (screenWidth - margin) / targetWidth;
    }

    // ส่งค่า Scale ไปให้ CSS ใช้
    letterWindow.style.setProperty('--scale-factor', scale);
}

// เรียกใช้ฟังก์ชันย่อจอ ทุกครั้งที่โหลดหรือหมุนจอ
window.addEventListener('resize', resizeContent);
window.addEventListener('load', resizeContent);


// ===========================
// 1. Click Envelope
// ===========================
envelopeContainer.addEventListener("click", () => {
    const music = document.getElementById('bg-music');
    if(music) {
        music.volume = 0.4;
        music.play().catch(e => console.log("Audio prevent:", e));
    }

    resizeContent(); // คำนวณขนาดก่อนเปิด

    envelopeContainer.style.display = "none";
    letterContainer.style.display = "flex";
    
    setTimeout(() => {
        letterWindow.classList.add("open");
    }, 50);
});

// ===========================
// 2. Logic Button NO (รองรับทั้งเมาส์และนิ้วแตะ)
// ===========================
function moveNoButton(e) {
    if(e) e.preventDefault(); // กันกดโดน

    // ปรับระยะหนีตามขนาดหน้าจอ (ถ้าจอมือถือให้หนีน้อยลงหน่อย)
    const isMobile = window.innerWidth < 768;
    const maxMove = isMobile ? 80 : 150; 

    const moveX = (Math.random() * maxMove * 2) - maxMove;
    const moveY = (Math.random() * maxMove * 2) - maxMove;

    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

noBtn.addEventListener("mouseover", moveNoButton); // คอม
noBtn.addEventListener("touchstart", moveNoButton); // มือถือ/ไอแพด
noBtn.addEventListener("click", moveNoButton); // กันเหนียว

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