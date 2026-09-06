
const photoGallery = Array.from({length: 30}, (_, i) => 
    `https://picsum.photos/400/300?random=${i + 1}`
);

// Target Date: 06-09-2026 1:20 PM
const targetDate = new Date("September 6, 2026 13:20:00").getTime();

const countdownInterval = setInterval(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown-screen").style.display = "none";
        trigger3DBanner();
    } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, '0');
        document.getElementById("hours").innerText = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
    }
}, 1000);

function trigger3DBanner() {
    const banner = document.getElementById("banner-3d");
    banner.style.display = "flex";
    setTimeout(() => {
        banner.style.opacity = "0";
        setTimeout(() => {
            banner.style.display = "none";
            document.getElementById("main-content").style.display = "block";
            initStars();
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }, 1000);
    }, 4000);
}

function toggleNav() {
    const nav = document.getElementById("navLinks");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

// তোর দেওয়া নির্দিষ্ট ৩০টি ছবির নামের অ্যারো
const photoGallery = [
    "FB_IMG_1755072234905.jpg",
    "FB_IMG_1758384891305.jpg",
    "IMG-20241115-WA0015~3.jpg",
    "IMG-20250518-WA0065.jpg",
    "IMG-20250629-WA0000.jpg",
    "IMG-20250629-WA0020.jpg",
    "IMG-20250630-WA0001.jpg",
    "IMG-20250921-WA0007.jpg",
    "IMG_1718467955702.jpg",
    "IMG_1756393251764.jpg",
    "IMG_1758384847409.jpg",
    "Messenger_creation_008D4634-712F-4B07-A0FE-E38382F02FA1.jpeg",
    "Messenger_creation_0ABBDCC0-762F-4E46-A43F-CAF86CBE9B2C.jpeg",
    "Messenger_creation_9B76B2B3-5CCA-4DF5-A6C8-3AEF9861B73F.jpeg",
    "Messenger_creation_B23C9E01-B61A-4AF5-9E8F-8E359C7E43A9.jpeg",
    "Messenger_creation_F8E1372F-15B3-4B88-AA16-9EF15FE8B91E.jpeg",
    "Messenger_creation_FB351AF0-F050-4AB5-9D76-89B076180C28~2.jpeg",
    "Screenshot_20240614-130150~2.jpg",
    "Screenshot_20240614-130609~2.jpg",
    "Screenshot_20240823-154950~2.jpg",
    "Screenshot_20240921-125122~2.jpg",
    "Screenshot_20250111-120355~2.jpg",
    "Screenshot_20250501-144233.jpg",
    "Screenshot_20250508-152816.jpg",
    "Screenshot_20250528-094823.jpg",
    "Screenshot_20250706-144032.jpg",
    "Screenshot_20250924-174952.jpg",
    "Screenshot_20251005-181223.jpg",
    "Screenshot_20251012-143302.jpg",
    "Snapchat-1167169927.jpg"
];

const billboard = document.getElementById("billboard");
const pinboardGrid = document.getElementById("pinboard-grid");

photoGallery.forEach((filename, idx) => {
    const src = `images/${filename}`;

    // Billboard Slide
    const slide = document.createElement("div");
    slide.className = "billboard-slide";
    slide.innerHTML = `<img src="${src}" onerror="this.src='https://picsum.photos/400/300?random=${idx}'">`;
    billboard.appendChild(slide);

    // Sticky Note Slide
    const note = document.createElement("div");
    note.className = "sticky-note";
    note.innerHTML = `
        <img src="${src}" onerror="this.src='https://picsum.photos/400/300?random=${idx}'">
        <p><strong>Memory #${idx + 1}</strong></p>
        <p style="font-size: 0.8rem;">Forever Together ❤️</p>
    `;
    pinboardGrid.appendChild(note);
});

let currentSlide = 0;
const slides = document.querySelectorAll(".billboard-slide");
setTimeout(() => {
    slides[0].classList.remove("active");
    currentSlide = 1;
    slides[currentSlide].classList.add("active");
    setInterval(() => {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }, 3000);
}, 5000);

function initStars() {
    const canvas = document.getElementById("star-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({length: 80}, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5 + 0.2
    }));

    function animateStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ffffff";
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            star.y += star.speed;
            if (star.y > canvas.height) star.y = 0;
        });
        requestAnimationFrame(animateStars);
    }
    animateStars();
}

function shareToFacebook() {
    html2canvas(document.body).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Disha-Birthday-Special.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
