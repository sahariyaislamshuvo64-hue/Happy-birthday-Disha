document.addEventListener("DOMContentLoaded", () => {
  // --- Target Date: 6 September 2026, 03:10:00 ---
  const targetDate = new Date("September 6, 2026 03:10:00").getTime();

  // Element Selectors
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const countdownOverlay = document.getElementById("countdownOverlay");
  const countdownCard = document.getElementById("countdownCard");
  const cakeContainer = document.getElementById("cake3DContainer");
  const birthdayText3D = document.getElementById("birthdayText3D");
  const bannerContainer = document.getElementById("bannerContainer");
  const mainApp = document.getElementById("mainApp");
  const skipBtn = document.getElementById("skipBtn");

  let isRevealed = false;

  // --- Countdown Logic ---
  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0 && !isRevealed) {
      triggerBirthdayReveal();
      return;
    }

    if (distance > 0) {
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = d < 10 ? "0" + d : d;
      hoursEl.textContent = h < 10 ? "0" + h : h;
      minutesEl.textContent = m < 10 ? "0" + m : m;
      secondsEl.textContent = s < 10 ? "0" + s : s;
    }
  }

  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();

  // --- Skip / Manual Reveal ---
  skipBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    triggerBirthdayReveal();
  });

  // --- Cinematic Reveal Sequence ---
  function triggerBirthdayReveal() {
    isRevealed = true;
    countdownCard.classList.add("hidden-element");

    // Show Cake
    cakeContainer.classList.remove("hidden-element");

    setTimeout(() => {
      // Show Glowing 3D Text & Particles Burst
      birthdayText3D.classList.remove("hidden-element");
      triggerConfettiBurst();

      setTimeout(() => {
        // Hide Overlay & Show Hanging Banner + Main App
        countdownOverlay.style.display = "none";
        bannerContainer.classList.remove("hidden-element");
        mainApp.classList.remove("hidden-element");
      }, 3500);

    }, 2000);
  }

  // --- Background Particle & Confetti Canvas ---
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor(x, y, isConfetti = false) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.size = isConfetti ? Math.random() * 8 + 4 : Math.random() * 3 + 1;
      this.speedX = isConfetti ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 0.8;
      this.speedY = isConfetti ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 0.8 - 0.2;
      this.color = isConfetti 
        ? `hsl(${Math.random() * 360}, 100%, 60%)` 
        : `rgba(56, 189, 248, ${Math.random() * 0.5})`;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  function triggerConfettiBurst() {
    for (let i = 0; i < 120; i++) {
      particles.push(new Particle(canvas.width / 2, canvas.height / 2, true));
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // --- Navigation & Page Management ---
  const navBtns = document.querySelectorAll(".nav-btn");
  const pages = document.querySelectorAll(".page-section");
  const mobileMenuBtn = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-target");

      navBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      pages.forEach(p => {
        if (p.id === target) {
          p.classList.add("active-page");
        } else {
          p.classList.remove("active-page");
        }
      });

      mobileNav.classList.remove("open");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("open");
  });

  // --- Audio Control ---
  const musicBtn = document.getElementById("musicBtn");
  const bgMusic = document.getElementById("bgMusic");
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (isPlaying) {
      bgMusic.pause();
      musicBtn.classList.remove("playing");
    } else {
      bgMusic.play().then(() => {
        musicBtn.classList.add("playing");
      }).catch(() => {
        alert("Audio playback interaction needed.");
      });
    }
    isPlaying = !isPlaying;
  });

  // --- 3D Mouse Parallax Tilt for Cards ---
  document.addEventListener("mousemove", (e) => {
    const cards = document.querySelectorAll(".tilt-card");
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    cards.forEach(card => {
      card.style.transform = `rotateY(${mouseX * 15}deg) rotateX(${-mouseY * 15}deg)`;
    });
  });

  // --- Populate 20 Pin Board Notes ---
  const pinboardGrid = document.getElementById("pinboardGrid");
  const pinNotesData = [
    "Happy Birthday Disha ❤️", "Stay happy always.", "Keep smiling.", "তোমার প্রতিটা দিন সুন্দর হোক।",
    "আজকের দিনটা শুধু তোমার।", "Shine like a star! ✨", "Best wishes to you!", "Dream big, fly high.",
    "মেপল পাতার মতো রঙিন হোক জীবন।", "সব স্বপ্ন সত্যি হোক।", "Stay awesome always!", "May success follow you.",
    "Happiness looks good on you.", "have an incredible year ahead!", "Stay blessed always.",
    "স্মৃতিগুলো চিরকাল থাকুক।", "Enjoy every single moment.", "a very special birthday!",
    "চিরদিন এমন মিষ্টি থেকো।", "Cheers to another great year! 🥂"
  ];

  pinNotesData.forEach((text, i) => {
    const rotation = (Math.random() - 0.5) * 12; // Subtle random 3D rotations
    const note = document.createElement("div");
    note.className = "pin-note-3d";
    note.style.transform = `rotate(${rotation}deg)`;
    note.innerHTML = `<div class="pin-head"></div><p>${text}</p>`;
    pinboardGrid.appendChild(note);
  });

  // --- Populate Gallery (30 Images with Lazy Loading) ---
  const galleryGrid = document.getElementById("galleryGrid");
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  let currentImgIdx = 0;

  for (let i = 1; i <= 30; i++) {
    const padNum = i < 10 ? "0" + i : i;
    const card = document.createElement("div");
    card.className = "glass-card-3d gallery-card-3d tilt-card";
    card.innerHTML = `
      <img src="assets/images/photo${padNum}.jpg" 
           loading="lazy" 
           alt="Gallery Photo ${i}" 
           onerror="this.src='https://via.placeholder.com/300x300/1e293b/fff?text=Photo+${padNum}'">
    `;
    card.addEventListener("click", () => openLightbox(i - 1));
    galleryGrid.appendChild(card);
  }

  function openLightbox(index) {
    currentImgIdx = index;
    const padNum = (index + 1) < 10 ? "0" + (index + 1) : (index + 1);
    lightboxImg.src = `assets/images/photo${padNum}.jpg`;
    lightboxModal.style.display = "flex";
  }

  document.getElementById("closeLightbox").addEventListener("click", () => {
    lightboxModal.style.display = "none";
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    currentImgIdx = (currentImgIdx - 1 + 30) % 30;
    openLightbox(currentImgIdx);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentImgIdx = (currentImgIdx + 1) % 30;
    openLightbox(currentImgIdx);
  });

  // --- Populate Golpo Page (20 Story Cards) ---
  const golpoGrid = document.getElementById("golpoGrid");
  const storyModal = document.getElementById("storyModal");
  const storyModalNumber = document.getElementById("storyModalNumber");
  const storyModalTitle = document.getElementById("storyModalTitle");
  const storyModalBody = document.getElementById("storyModalBody");

  for (let i = 1; i <= 20; i++) {
    const numTag = i < 10 ? "0" + i : i;
    const card = document.createElement("div");
    card.className = "glass-card-3d golpo-card-3d tilt-card";
    card.innerHTML = `
      <div>
        <span class="badge-tag">STORY #${numTag}</span>
        <h3>গল্পের শিরোনাম ${numTag}</h3>
        <p>এটি একটি সুন্দর স্মৃতির ছোট্ট ঝলক। দিশার জন্মদিনের এই বিশেষ দিনে পুরনো গল্পগুলো নতুন করে মনে করার এক মিষ্টি মুহূর্ত...</p>
      </div>
      <button class="ios-btn-sm" style="align-self: flex-start; margin-top: 10px;">Read More ➔</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      storyModalNumber.textContent = `STORY #${numTag}`;
      storyModalTitle.textContent = `গল্পের শিরোনাম ${numTag}`;
      storyModalBody.innerHTML = `
        <p>এখানে থাকবে সম্পূর্ণ গল্পের মূল লেখা। দিশার জীবনের সুন্দর কোনো স্মৃতি, বিশেষ মুহূর্ত কিংবা অনুভূতির প্রকাশ যা এই দিনটিকে আরও স্মরণীয় করে তোলে।</p>
        <br>
        <p>প্রতিটি গল্পে লুকিয়ে আছে কিছু না বলা কথা, হাসি আর ভালোবাসার মুহূর্ত। শুভ জন্মদিন দিশা!</p>
      `;
      storyModal.style.display = "flex";
    });

    golpoGrid.appendChild(card);
  }

  document.getElementById("closeStory").addEventListener("click", () => {
    storyModal.style.display = "none";
  });
});

