document.addEventListener("DOMContentLoaded", () => {
  // Target Time: 6 September 2026, 03:10:00
  const targetTime = new Date("September 6, 2026 03:10:00").getTime();

  const cdDays = document.getElementById("cdDays");
  const cdHours = document.getElementById("cdHours");
  const cdMinutes = document.getElementById("cdMinutes");
  const cdSeconds = document.getElementById("cdSeconds");

  const countdownOverlay = document.getElementById("countdownOverlay");
  const countdownCard = document.getElementById("countdownCard");
  const cake3DModule = document.getElementById("cake3DModule");
  const revealTitle3D = document.getElementById("revealTitle3D");
  const clothBanner = document.getElementById("clothBanner");
  const spatialApp = document.getElementById("spatialApp");
  const skipCountdown = document.getElementById("skipCountdown");

  let isTriggered = false;

  // Realtime Countdown Engine
  function runTimer() {
    const now = new Date().getTime();
    const gap = targetTime - now;

    if (gap <= 0 && !isTriggered) {
      launchBirthdayReveal();
      return;
    }

    if (gap > 0) {
      const d = Math.floor(gap / (1000 * 60 * 60 * 24));
      const h = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((gap % (1000 * 60)) / 1000);

      cdDays.textContent = d < 10 ? "0" + d : d;
      cdHours.textContent = h < 10 ? "0" + h : h;
      cdMinutes.textContent = m < 10 ? "0" + m : m;
      cdSeconds.textContent = s < 10 ? "0" + s : s;
    }
  }

  const timerLoop = setInterval(runTimer, 1000);
  runTimer();

  skipCountdown.addEventListener("click", () => {
    clearInterval(timerLoop);
    launchBirthdayReveal();
  });

  // Reveal Sequence
  function launchBirthdayReveal() {
    isTriggered = true;
    countdownCard.classList.add("hidden-node");

    cake3DModule.classList.remove("hidden-node");

    setTimeout(() => {
      revealTitle3D.classList.remove("hidden-node");
      burstSpatialParticles();

      setTimeout(() => {
        countdownOverlay.style.display = "none";
        clothBanner.classList.remove("hidden-node");
        spatialApp.classList.remove("hidden-node");
      }, 3500);

    }, 2000);
  }

  // Particle Canvas Engine
  const canvas = document.getElementById("spatialCanvas");
  const ctx = canvas.getContext("2d");
  let nodes = [];

  function adjustCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", adjustCanvas);
  adjustCanvas();

  class SpatialParticle {
    constructor(x, y, isExplosion = false) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.radius = isExplosion ? Math.random() * 6 + 3 : Math.random() * 2.5 + 1;
      this.vx = isExplosion ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 0.6;
      this.vy = isExplosion ? (Math.random() - 0.5) * 8 : (Math.random() - 0.5) * 0.6 - 0.3;
      this.fill = isExplosion 
        ? `hsl(${Math.random() * 360}, 100%, 65%)` 
        : `rgba(56, 189, 248, ${Math.random() * 0.45})`;
    }
    step() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    render() {
      ctx.fillStyle = this.fill;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function generateBackground() {
    nodes = [];
    for (let i = 0; i < 70; i++) nodes.push(new SpatialParticle());
  }
  generateBackground();

  function burstSpatialParticles() {
    for (let i = 0; i < 150; i++) {
      nodes.push(new SpatialParticle(canvas.width / 2, canvas.height / 2, true));
    }
  }

  function renderLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(n => {
      n.step();
      n.render();
    });
    requestAnimationFrame(renderLoop);
  }
  renderLoop();

  // Navigation System
  const navLinks = document.querySelectorAll(".nav-link");
  const appPages = document.querySelectorAll(".app-page");
  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const pageTarget = link.getAttribute("data-target");

      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      appPages.forEach(p => {
        p.id === pageTarget ? p.classList.add("active-page") : p.classList.remove("active-page");
      });

      mobileMenu.classList.remove("open");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  navToggle.addEventListener("click", () => mobileMenu.classList.toggle("open"));

  // Audio Control
  const spatialAudioBtn = document.getElementById("spatialAudioBtn");
  const bgAudio = document.getElementById("bgAudio");
  let playing = false;

  spatialAudioBtn.addEventListener("click", () => {
    if (playing) {
      bgAudio.pause();
      spatialAudioBtn.classList.remove("playing");
    } else {
      bgAudio.play().then(() => spatialAudioBtn.classList.add("playing")).catch(() => {});
    }
    playing = !playing;
  });

  // 3D Tilt Effect on Mouse Move
  document.addEventListener("mousemove", (e) => {
    const tiltNodes = document.querySelectorAll(".tilt-node");
    const mX = e.clientX / window.innerWidth - 0.5;
    const mY = e.clientY / window.innerHeight - 0.5;

    tiltNodes.forEach(node => {
      node.style.transform = `rotateY(${mX * 14}deg) rotateX(${-mY * 14}deg)`;
    });
  });

  // Populate Pinboard (20 Notes)
  const pinboardContainer = document.getElementById("pinboardContainer");
  const pinNotes = [
    "Happy Birthday Disha ❤️", "Stay happy always.", "Keep smiling.", "তোমার প্রতিটা দিন সুন্দর হোক।",
    "আজকের দিনটা শুধু তোমার।", "Shine like a star! ✨", "Best wishes to you!", "Dream big, fly high.",
    "মেপল পাতার মতো রঙিন হোক জীবন।", "সব স্বপ্ন সত্যি হোক।", "Stay awesome always!", "May success follow you.",
    "Happiness looks good on you.", "Have an incredible year ahead!", "Stay blessed always.",
    "স্মৃতিগুলো চিরকাল থাকুক।", "Enjoy every single moment.", "A very special birthday!",
    "চিরদিন এমন মিষ্টি থেকো।", "Cheers to another great year! 🥂"
  ];

  pinNotes.forEach(text => {
    const rot = (Math.random() - 0.5) * 12;
    const item = document.createElement("div");
    item.className = "pin-card-3d";
    item.style.transform = `rotate(${rot}deg)`;
    item.innerHTML = `<div class="pin-dot"></div><p>${text}</p>`;
    pinboardContainer.appendChild(item);
  });

  // Populate Gallery Grid (30 Items)
  const galleryGrid = document.getElementById("galleryGrid");
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lbImage");
  let activeIndex = 0;

  for (let i = 1; i <= 30; i++) {
    const pad = i < 10 ? "0" + i : i;
    const card = document.createElement("div");
    card.className = "liquid-card-3d gallery-item-3d tilt-node";
    card.innerHTML = `<img src="assets/images/photo${pad}.jpg" loading="lazy" alt="Gallery Photo ${i}" onerror="this.src='https://via.placeholder.com/300x300/1e293b/fff?text=Photo+${pad}'">`;
    card.addEventListener("click", () => openLightbox(i - 1));
    galleryGrid.appendChild(card);
  }

  function openLightbox(idx) {
    activeIndex = idx;
    const pad = (idx + 1) < 10 ? "0" + (idx + 1) : (idx + 1);
    lbImage.src = `assets/images/photo${pad}.jpg`;
    lightbox.style.display = "flex";
  }

  document.getElementById("closeLb").addEventListener("click", () => lightbox.style.display = "none");
  document.getElementById("prevLb").addEventListener("click", () => openLightbox((activeIndex - 1 + 30) % 30));
  document.getElementById("nextLb").addEventListener("click", () => openLightbox((activeIndex + 1) % 30));

  // Populate Golpo Grid (20 Stories)
  const golpoGrid = document.getElementById("golpoGrid");
  const storyModal = document.getElementById("storyModal");
  const storyTag = document.getElementById("storyTag");
  const storyTitle = document.getElementById("storyTitle");
  const storyBody = document.getElementById("storyBody");

  for (let i = 1; i <= 20; i++) {
    const pad = i < 10 ? "0" + i : i;
    const card = document.createElement("div");
    card.className = "liquid-card-3d golpo-card tilt-node";
    card.innerHTML = `
      <div>
        <span class="badge-tag-glow">STORY #${pad}</span>
        <h3>মিষ্টি গল্পের শিরোনাম ${pad}</h3>
        <p>এটি একটি সুন্দর স্মৃতির ছোট্ট ঝলক। দিশার জন্মদিনের এই বিশেষ দিনে পুরনো গল্পগুলো নতুন করে মনে করার এক মিষ্টি মুহূর্ত...</p>
      </div>
      <button class="ios-liquid-btn" style="align-self: flex-start; margin-top: 10px; padding: 8px 20px; font-size: 0.8rem;">Read Story ➔</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      storyTag.textContent = `STORY #${pad}`;
      storyTitle.textContent = `মিষ্টি গল্পের শিরোনাম ${pad}`;
      storyBody.innerHTML = `
        <p>এখানে থাকবে সম্পূর্ণ গল্পের মূল লেখা। দিশার জীবনের সুন্দর কোনো স্মৃতি, বিশেষ মুহূর্ত কিংবা অনুভূতির প্রকাশ যা এই দিনটিকে আরও স্মরণীয় করে তোলে।</p>
        <br>
        <p>প্রতিটি গল্পে লুকিয়ে আছে কিছু না বলা কথা, হাসি আর ভালোবাসার মুহূর্ত। শুভ জন্মদিন দিশা!</p>
      `;
      storyModal.style.display = "flex";
    });

    golpoGrid.appendChild(card);
  }

  document.getElementById("closeStory").addEventListener("click", () => storyModal.style.display = "none");
});
