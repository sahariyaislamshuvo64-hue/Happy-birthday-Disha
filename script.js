document.addEventListener('DOMContentLoaded', () => {

  // Target Countdown Date: 6 September 2026 03:10:00
  const targetDate = new Date('September 6, 2026 03:10:00').getTime();

  // DOM Elements
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('mins');
  const secsEl = document.getElementById('secs');

  const countdownCard = document.getElementById('countdownCard');
  const cake3DContainer = document.getElementById('cake3DContainer');
  const introStage = document.getElementById('introStage');
  const hangingBannerStage = document.getElementById('hangingBannerStage');
  const mainWebsite = document.getElementById('mainWebsite');

  // Particle Engine
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height + canvas.height;
      this.size = Math.random() * 4 + 1;
      this.speedY = Math.random() * -2 - 0.5;
      this.speedX = Math.random() * 1 - 0.5;
      this.opacity = Math.random() * 0.7 + 0.3;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      if (this.y < -10) this.reset();
    }
    draw() {
      ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 70; i++) particles.push(new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Countdown Logic & Sequence Switcher
  const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(timerInterval);
      triggerBirthdaySequence();
    } else {
      daysEl.innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
      hoursEl.innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      minsEl.innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      secsEl.innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
    }
  }, 1000);

  function triggerBirthdaySequence() {
    countdownCard.classList.add('hidden');
    cake3DContainer.classList.remove('hidden');

    // 4s Delay for Cake Reveal -> Banner -> Main Site Entry
    setTimeout(() => {
      introStage.style.transition = 'opacity 1s ease';
      introStage.style.opacity = '0';
      
      setTimeout(() => {
        introStage.classList.add('hidden');
        hangingBannerStage.classList.remove('hidden');
        document.body.classList.remove('is-locked');
        
        setTimeout(() => {
          mainWebsite.classList.remove('opacity-0');
        }, 800);
      }, 1000);
    }, 4000);
  }

  // Tilt 3D Parallax Effect for Glass Cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const rotX = (clientY - centerY) / 45;
    const rotY = (clientX - centerX) / 45;

    tiltCards.forEach(card => {
      card.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
    });
  });

  // Dynamic Injections: 10 Profile Photo Notes
  const notesAnchor = document.getElementById('profileNotesAnchor');
  const profileNotesText = [
    "একটা সুন্দর স্মৃতি, যেটা সবসময় মনে থাকবে।",
    "তোমার হাসিটাই এই ছবিটার সবচেয়ে সুন্দর অংশ।",
    "এই মুহূর্তটা হয়তো ছোট, কিন্তু স্মৃতিটা অনেক বড়।",
    "প্রতিটা দিন তোমার জন্য নতুন আনন্দ নিয়ে আসুক।",
    "জীবনের সুন্দরতম মুহূর্তগুলোর একটি।",
    "তোমার মেধা ও মিষ্টি মন সারাজীবন আলো ছড়াক।",
    "কিছু ছবি কথা বলে, এটা তেমনই একটা।",
    "স্মৃতির পাতায় বাঁধাই করা বিশেষ একটা দিন।",
    "সবসময় এরকম প্রাণবন্ত থেকো।",
    "জন্মদিনের অনেক অনেক ভালোবাসা ও শুভকামনা।"
  ];

  profileNotesText.forEach((note, index) => {
    const num = String(index + 1).padStart(2, '0');
    const card = document.createElement('div');
    card.className = 'glass-card photo-card tilt-card';
    card.innerHTML = `
      <img src="assets/images/photo${num}.jpg" alt="Photo ${num}" loading="lazy" onerror="this.src='[https://via.placeholder.com/400x300/1a1a2e/ffffff?text=Photo+$](https://via.placeholder.com/400x300/1a1a2e/ffffff?text=Photo+$){num}'">
      <div class="note-text">${note}</div>
    `;
    notesAnchor.appendChild(card);
  });

  // Dynamic Injections: 30 Gallery Cards
  const galleryGrid = document.getElementById('galleryGrid');
  for (let i = 1; i <= 30; i++) {
    const num = String(i).padStart(2, '0');
    const item = document.createElement('div');
    item.className = 'glass-card gallery-item tilt-card';
    item.innerHTML = `
      <img src="assets/images/gallery${num}.jpg" alt="Gallery Photo ${num}" data-index="${i}" loading="lazy" onerror="this.src='[https://via.placeholder.com/300x300/111827/ffffff?text=Memory+$](https://via.placeholder.com/300x300/111827/ffffff?text=Memory+$){num}'">
    `;
    galleryGrid.appendChild(item);
  }

  // Gallery Lightbox Modal Setup
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  let currentImgIndex = 1;

  galleryGrid.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      currentImgIndex = parseInt(e.target.getAttribute('data-index'));
      updateLightboxImg();
      lightboxModal.classList.remove('hidden');
    }
  });

  function updateLightboxImg() {
    const num = String(currentImgIndex).padStart(2, '0');
    lightboxImg.src = `assets/images/gallery${num}.jpg`;
    lightboxImg.onerror = () => {
      lightboxImg.src = `[https://via.placeholder.com/600x600/111827/ffffff?text=Memory+$](https://via.placeholder.com/600x600/111827/ffffff?text=Memory+$){num}`;
    };
  }

  document.querySelector('.lightbox-close').addEventListener('click', () => lightboxModal.classList.add('hidden'));
  document.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentImgIndex = currentImgIndex > 1 ? currentImgIndex - 1 : 30;
    updateLightboxImg();
  });
  document.querySelector('.lightbox-next').addEventListener('click', () => {
    currentImgIndex = currentImgIndex < 30 ? currentImgIndex + 1 : 1;
    updateLightboxImg();
  });

  // Dynamic Injections: 20 Golpo Stories
  const golpoGrid = document.getElementById('golpoGrid');
  for (let i = 1; i <= 20; i++) {
    const num = String(i).padStart(2, '0');
    const card = document.createElement('div');
    card.className = 'glass-card story-card tilt-card';
    card.innerHTML = `
      <div>
        <div class="story-num">GOLPO #${num}</div>
        <h3>গল্প নম্বর ${num}</h3>
        <p style="color:var(--text-sub); font-size:0.85rem; margin-top:8px;">জীবনের ছোট ছোট গল্পগুলোই একদিন বড় স্মৃতি হয়ে যায়...</p>
      </div>
      <button class="read-btn" data-title="গল্প নম্বর ${num}" data-body="এখানে গল্প নম্বর ${num}-এর বিস্তারিত বিবরণ থাকবে। আপনি পরবর্তীতে খুব সহজেই আপনার পছন্দের মূল গল্প দিয়ে এটি পরিবর্তন করে নিতে পারবেন।">Read More</button>
    `;
    golpoGrid.appendChild(card);
  }

  // Story Modal Logic
  const storyModal = document.getElementById('storyModal');
  const modalTitle = document.getElementById('modalStoryTitle');
  const modalBody = document.getElementById('modalStoryBody');

  golpoGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('read-btn')) {
      modalTitle.innerText = e.target.getAttribute('data-title');
      modalBody.innerText = e.target.getAttribute('data-body');
      storyModal.classList.remove('hidden');
    }
  });

  document.querySelector('.story-close').addEventListener('click', () => storyModal.classList.add('hidden'));

  // Dynamic Injections: 20+ Pin Board Notes
  const pinboardCanvas = document.getElementById('pinboardCanvas');
  const pinNotes = [
    "Happy Birthday Disha ❤️", "Stay happy always.", "Keep smiling.", "তোমার প্রতিটা দিন সুন্দর হোক।",
    "আজকের দিনটা শুধু তোমার।", "Make a wish! 🎂", "Dream big, achieve bigger.", "Best wishes on your birthday!",
    "চিরকাল এরকমই মিষ্টি থেকো।", "সারাজীবন সফল হও।", "সব স্বপ্ন সত্যি হোক।", "Lots of love & blessings.",
    "Shine brighter every day ✨", "Keep rocking!", "You deserve the best!", "সুন্দর একটি বছর কাটুক।",
    "Never stop dreaming 🌟", "Enjoy your special day!", "সবসময় হাসিখুশি থেকো।", "Cheers to another great year 🎉"
  ];

  pinNotes.forEach((text) => {
    const deg = Math.floor(Math.random() * 12 - 6);
    const note = document.createElement('div');
    note.className = 'paper-note';
    note.style.setProperty('--deg', `${deg}deg`);
    note.innerHTML = `<div class="pin"></div><p>${text}</p>`;
    pinboardCanvas.appendChild(note);
  });

  // Mobile Hamburger Toggle
  const hamburger = document.getElementById('hamburgerMenu');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => navLinks.classList.toggle('show'));

  // Audio Control
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;

  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicToggle.style.transform = 'scale(1)';
    } else {
      bgMusic.play().catch(() => {});
      musicToggle.style.transform = 'scale(1.1)';
    }
    isPlaying = !isPlaying;
  });
});
