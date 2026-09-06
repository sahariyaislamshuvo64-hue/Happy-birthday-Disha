
/* =========================================================
   Happy Birthday Disha — script.js
   Vanilla JS, no frameworks/libraries.
   Edit the CONFIG block below to personalize everything.
   ========================================================= */

/* =============== CONFIG (edit this) =============== */
const CONFIG = {
  NAME: "Disha",
  BIRTHDAY: "2026-09-06T03:10:00",     // YYYY-MM-DDTHH:MM:SS, local device time
  INTRO_DATE_TEXT: "06 September 2026 • 3:10 AM",

  PHOTO_COUNT: 30,
  PHOTO_DIR: "images/",                 // expects photo1.jpg ... photo30.jpg
  PHOTO_CAPTION_PREFIX: "Memory",       // caption shown under each photo in lightbox

  NOTE_COUNT: 20,
  NOTES: [
    "তোমার হাসিটাই আমার প্রিয় সুর 🎵",
    "শুভ জন্মদিন, লক্ষ্মীটি 🎂",
    "তুমি থাকলে সব ঠিক হয়ে যায় ❤️",
    "এই বছরটা তোমার হোক, পুরোপুরি তোমার",
    "ভালোবাসি, আজও প্রথম দিনের মতোই",
    "তোমার সাথে কাটানো প্রতিটা মুহূর্ত স্পেশাল",
    "তুমি আমার সবচেয়ে সুন্দর অভ্যাস",
    "তোমার চোখে আমি আমার বাড়ি খুঁজে পাই",
    "তুমি হাসলে পৃথিবীটা সুন্দর লাগে",
    "তোমার যত্নই আমার শক্তি",
    "তুমি আমার সবচেয়ে বড় পাওয়া",
    "প্রতিদিন তোমাকে নতুন করে ভালোবাসি",
    "তোমার কণ্ঠস্বর আমার প্রিয় গান",
    "তুমি আমার শান্তির জায়গা",
    "তোমার সাথে থাকা মানেই ঘরে ফেরা",
    "তোমার স্বপ্নগুলো আমারও স্বপ্ন",
    "তোমাকে ছাড়া কিছুই সম্পূর্ণ নয়",
    "তুমি আমার প্রিয় গল্পের নায়িকা",
    "তোমার জন্মদিন মানে উৎসবের দিন",
    "চিরকাল তোমার পাশে থাকতে চাই"
  ],

  STORY: [
    { icon: "✨", title: "The Beginning",         text: "একটা ছোট্ট পরিচয়..." },
    { icon: "💫", title: "First Special Memory",  text: "সেই বিশেষ মুহূর্ত..." },
    { icon: "❤️", title: "Beautiful Memories",    text: "একসাথে কাটানো সুন্দর সময়..." },
    { icon: "🥰", title: "Best Moments",          text: "যে মুহূর্তগুলো মনে থাকবে..." },
    { icon: "🎂", title: "Today",                 text: "আজ তোমার বিশেষ দিন..." }
  ],

  LETTER_TEXT:
`Disha,

তোমার জন্য আজকের দিনটা লেখা হলো ভালোবাসা দিয়ে।

[এখানে তোমার নিজের কথাগুলো, স্মৃতি বা অনুভূতি যোগ করো।]

শুভ জন্মদিন, Disha ❤️
তোমার হাসিটা সবসময় এমনই সুন্দর থাকুক।`,

  MUSIC_SRC: "audio/birthday.mp3"
};
/* =============== END CONFIG =============== */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------
   LOADING SCREEN
--------------------------------------------------------- */
(function loadingScreen(){
  const fill = document.getElementById('loadingFill');
  const pct = document.getElementById('loadingPct');
  const screen = document.getElementById('loadingScreen');
  const introDate = document.getElementById('introDate');
  const introScene = document.getElementById('introScene');
  let done = false;

  function finish(){
    if (done) return;
    done = true;
    if (fill) fill.style.width = '100%';
    if (pct) pct.textContent = '100%';
    setTimeout(() => {
      if (screen) screen.classList.add('fade-out');
      setTimeout(() => {
        if (screen) screen.classList.add('hidden');
        if (introDate) introDate.textContent = CONFIG.INTRO_DATE_TEXT;
        if (introScene) introScene.classList.remove('hidden');
      }, 600);
    }, 200);
  }

  // Safety net
  setTimeout(finish, 3000);

  if (!fill || !pct || !screen) { finish(); return; }

  let p = 0;
  const step = () => {
    try {
      p += Math.random() * 18 + 6;
      if (p >= 100) { finish(); return; }
      fill.style.width = p + '%';
      pct.textContent = Math.round(p) + '%';
      setTimeout(step, 140);
    } catch (e) {
      finish();
    }
  };
  step();
})();

/* ---------------------------------------------------------
   START CELEBRATION -> reveal app
--------------------------------------------------------- */
document.getElementById('startBtn')?.addEventListener('click', () => {
  document.getElementById('introScene')?.classList.add('hidden');
  document.getElementById('app')?.classList.remove('hidden');
  const npc = document.getElementById('navPhotoCount'); if (npc) npc.textContent = CONFIG.PHOTO_COUNT;
  const nnc = document.getElementById('navNoteCount'); if (nnc) nnc.textContent = CONFIG.NOTE_COUNT;
  window.scrollTo(0, 0);
  startMusic();
  initRevealObserver();
});

/* ---------------------------------------------------------
   BACKGROUND PARTICLES (stars + floating hearts + gold dust)
--------------------------------------------------------- */
(function bgParticles(){
  const canvas = document.getElementById('bgParticles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h;
  function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  const count = prefersReducedMotion ? 0 : (window.innerWidth < 500 ? 35 : 60);
  const particles = Array.from({length: count}, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.6,
    speed: Math.random() * 0.25 + 0.05,
    twinkle: Math.random() * Math.PI * 2,
    gold: Math.random() > 0.6
  }));

  function draw(){
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.twinkle += 0.02;
      const alpha = 0.35 + Math.sin(p.twinkle) * 0.35;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold ? `rgba(243,205,138,${alpha})` : `rgba(255,255,255,${alpha * 0.8})`;
      ctx.fill();
      p.y += p.speed;
      if (p.y > h) { p.y = -5; p.x = Math.random() * w; }
    });
    requestAnimationFrame(draw);
  }
  if (!prefersReducedMotion) draw();
})();

/* ---------------------------------------------------------
   HAMBURGER NAV
--------------------------------------------------------- */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navSheet = document.getElementById('navSheet');
hamburgerBtn?.addEventListener('click', () => {
  const open = navSheet.classList.toggle('open');
  hamburgerBtn.setAttribute('aria-expanded', open);
});
navSheet?.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navSheet.classList.remove('open');
  });
});

/* ---------------------------------------------------------
   BACK TO TOP
--------------------------------------------------------- */
const backTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backTop?.classList.toggle('hidden', window.scrollY < 400);
});
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------------------------------------------------------
   SCROLL REVEAL
--------------------------------------------------------- */
function initRevealObserver(){
  const items = document.querySelectorAll('.reveal, .timeline-item');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in-view'); });
  }, { threshold: 0.15 });
  items.forEach(i => obs.observe(i));
}

/* ---------------------------------------------------------
   COUNTDOWN
--------------------------------------------------------- */
const TARGET_DATE = new Date(CONFIG.BIRTHDAY);
function pad(n){ return String(n).padStart(2, '0'); }
function tickCountdown(){
  const diff = TARGET_DATE - new Date();
  if (diff <= 0){
    clearInterval(timerHandle);
    document.getElementById('timerGrid')?.classList.add('hidden');
    document.getElementById('itsYourDay')?.classList.remove('hidden');
    launchFireworks();
    burstConfetti();
    spawnBalloons(6);
    return;
  }
  const cdDays = document.getElementById('cd-days'); if (cdDays) cdDays.textContent = pad(Math.floor(diff / 86400000));
  const cdHours = document.getElementById('cd-hours'); if (cdHours) cdHours.textContent = pad(Math.floor((diff % 86400000) / 3600000));
  const cdMins = document.getElementById('cd-mins'); if (cdMins) cdMins.textContent = pad(Math.floor((diff % 3600000) / 60000));
  const cdSecs = document.getElementById('cd-secs'); if (cdSecs) cdSecs.textContent = pad(Math.floor((diff % 60000) / 1000));
}
const timerHandle = setInterval(tickCountdown, 1000);
tickCountdown();

/* ---------------------------------------------------------
   CAKE CUT
--------------------------------------------------------- */
const cakeStage = document.getElementById('cakeStage');
const cakeBtn = document.getElementById('cakeBtn');
function cutCake(){
  if (!cakeStage || cakeStage.classList.contains('is-cut')) return;
  cakeStage.classList.add('is-cut');
  if (cakeBtn) cakeBtn.textContent = 'শুভ জন্মদিন! 🎉';
  document.getElementById('wishDone')?.classList.remove('hidden');
  burstConfetti();
  launchFireworks();
  spawnBalloons(4);
}
cakeStage?.addEventListener('click', cutCake);
cakeBtn?.addEventListener('click', cutCake);

/* ---------------------------------------------------------
   GALLERY
--------------------------------------------------------- */
const galleryGrid = document.getElementById('galleryGrid');
const photoList = [];
if (galleryGrid) {
  for (let i = 1; i <= CONFIG.PHOTO_COUNT; i++){
    const src = CONFIG.PHOTO_DIR + 'photo' + i + '.jpg';
    photoList.push({ src, caption: `${CONFIG.PHOTO_CAPTION_PREFIX} ${i}` });

    const card = document.createElement('button');
    card.className = 'photo-card';
    card.setAttribute('aria-label', 'Open photo ' + i);

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.src = src;
    img.alt = `${CONFIG.PHOTO_CAPTION_PREFIX} ${i}`;
    img.addEventListener('error', () => {
      img.remove();
      const fallback = document.createElement('div');
      fallback.className = 'ph-fallback';
      fallback.innerHTML = `<span>📷</span><span class="num">photo${i}.jpg</span>`;
      card.appendChild(fallback);
    }, { once: true });

    card.appendChild(img);
    card.addEventListener('click', () => openLightbox(i - 1));
    galleryGrid.appendChild(card);
  }
}

/* ---------------------------------------------------------
   LIGHTBOX
--------------------------------------------------------- */
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lbImage');
const lbCaption = document.getElementById('lbCaption');
let lbIndex = 0;

function openLightbox(index){
  lbIndex = index;
  renderLightbox();
  lightbox?.classList.remove('hidden');
}

function renderLightbox(){
  const item = photoList[lbIndex];
  if (!item) return;
  if (lbImage) {
    lbImage.src = item.src;
    lbImage.alt = item.caption;
    lbImage.onerror = () => { 
      if (lbCaption) lbCaption.textContent = item.caption + ' (ছবি এখনো যোগ করা হয়নি)'; 
    };
  }
  if (lbCaption) lbCaption.textContent = item.caption;
}

document.getElementById('lbClose')?.addEventListener('click', () => lightbox?.classList.add('hidden'));
document.getElementById('lbPrev')?.addEventListener('click', () => { lbIndex = (lbIndex - 1 + photoList.length) % photoList.length; renderLightbox(); });
document.getElementById('lbNext')?.addEventListener('click', () => { lbIndex = (lbIndex + 1) % photoList.length; renderLightbox(); });
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.add('hidden'); });

// swipe support
let touchStartX = null;
lightbox?.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
lightbox?.addEventListener('touchend', (e) => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) {
    lbIndex = dx > 0
      ? (lbIndex - 1 + photoList.length) % photoList.length
      : (lbIndex + 1) % photoList.length;
    renderLightbox();
  }
  touchStartX = null;
});

/* ---------------------------------------------------------
   OUR STORY TIMELINE
--------------------------------------------------------- */
const timeline = document.getElementById('timeline');
if (timeline) {
  CONFIG.STORY.forEach(item => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `<h3>${item.icon} ${item.title}</h3><p class="bangla">${item.text}</p>`;
    timeline.appendChild(el);
  });
}

/* ---------------------------------------------------------
   SPECIAL NOTES CAROUSEL
--------------------------------------------------------- */
const notesTrack = document.getElementById('notesTrack');
const noteCounter = document.getElementById('noteCounter');
const pastelColors = ['#fdf1a8', '#c9ecff', '#ffd6e7', '#d8ffd6', '#ffe3c2', '#e3d6ff'];
let noteIndex = 0;

if (notesTrack) {
  CONFIG.NOTES.slice(0, CONFIG.NOTE_COUNT).forEach((text, i) => {
    const slide = document.createElement('div');
    slide.className = 'note-slide';
    const sticky = document.createElement('div');
    sticky.className = 'sticky';
    sticky.style.background = pastelColors[i % pastelColors.length];
    sticky.style.transform = `rotate(${(i % 2 === 0 ? -1 : 1) * (2 + (i % 3))}deg)`;
    sticky.textContent = text;
    slide.appendChild(sticky);
    notesTrack.appendChild(slide);
  });
}

function renderNoteIndex(){
  if (notesTrack) notesTrack.style.transform = `translateX(-${noteIndex * 100}%)`;
  if (noteCounter) noteCounter.textContent = `${pad(noteIndex + 1)} / ${CONFIG.NOTE_COUNT}`;
}
document.getElementById('notePrev')?.addEventListener('click', () => {
  noteIndex = (noteIndex - 1 + CONFIG.NOTE_COUNT) % CONFIG.NOTE_COUNT;
  renderNoteIndex();
});
document.getElementById('noteNext')?.addEventListener('click', () => {
  noteIndex = (noteIndex + 1) % CONFIG.NOTE_COUNT;
  renderNoteIndex();
});
if (notesTrack) renderNoteIndex();

/* ---------------------------------------------------------
   SECRET LETTER
--------------------------------------------------------- */
const envelopeBtn = document.getElementById('envelopeBtn');
const letterPaper = document.getElementById('letterPaper');
const letterTypedText = document.getElementById('letterTypedText');
let letterOpened = false;

envelopeBtn?.addEventListener('click', () => {
  if (letterOpened) return;
  letterOpened = true;
  envelopeBtn.classList.add('open');
  setTimeout(() => {
    letterPaper?.classList.remove('hidden');
    typeLetter(CONFIG.LETTER_TEXT);
  }, 500);
});

function typeLetter(text){
  if (!letterTypedText) return;
  let i = 0;
  letterTypedText.textContent = '';
  const speed = prefersReducedMotion ? 0 : 14;
  if (speed === 0) { letterTypedText.textContent = text; return; }
  (function typeStep(){
    letterTypedText.textContent = text.slice(0, i);
    i++;
    if (i <= text.length) setTimeout(typeStep, speed);
  })();
}

/* ---------------------------------------------------------
   FINAL SURPRISE
--------------------------------------------------------- */
const giftBox = document.getElementById('giftBox');
giftBox?.addEventListener('click', () => {
  if (giftBox.classList.contains('opened')) return;
  giftBox.classList.add('opened');
  document.getElementById('finalCelebration')?.classList.remove('hidden');
  burstConfetti();
  launchFireworks();
  spawnBalloons(5);
});

/* ---------------------------------------------------------
   MUSIC PLAYER + VISUALIZER
--------------------------------------------------------- */
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const vizBars = document.querySelectorAll('#viz i');
if (bgMusic) bgMusic.src = CONFIG.MUSIC_SRC;

let audioCtx, analyser, sourceNode, freqData, vizRunning = false;

function setupVisualizer(){
  if (audioCtx || !bgMusic) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 32;
    freqData = new Uint8Array(analyser.frequencyBinCount);
    sourceNode = audioCtx.createMediaElementSource(bgMusic);
    sourceNode.connect(analyser);
    analyser.connect(audioCtx.destination);
  } catch (e) { /* visualizer unsupported */ }
}

function runVisualizer(){
  if (!analyser || vizRunning || !bgMusic) return;
  vizRunning = true;
  (function loop(){
    if (bgMusic.paused) { vizRunning = false; vizBars.forEach(b => b.style.height = '3px'); return; }
    analyser.getByteFrequencyData(freqData);
    vizBars.forEach((bar, i) => {
      const val = freqData[i * 2] || 0;
      bar.style.height = (3 + (val / 255) * 12) + 'px';
    });
    requestAnimationFrame(loop);
  })();
}

function startMusic(){
  if (!bgMusic) return;
  setupVisualizer();
  bgMusic.volume = 0.6;
  bgMusic.play().then(() => runVisualizer()).catch(() => { /* autoplay blocked */ });
}

musicBtn?.addEventListener('click', () => {
  if (!bgMusic) return;
  setupVisualizer();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  if (bgMusic.paused){
    bgMusic.play().then(runVisualizer).catch(() => {});
  } else {
    bgMusic.pause();
  }
});

/* ---------------------------------------------------------
   BALLOONS
--------------------------------------------------------- */
const balloonLayer = document.getElementById('balloonLayer');
const balloonColors = ['#f8a9c8', '#f3cd8a', '#c99bea', '#9bd8ea', '#f4816e'];
function spawnBalloons(n){
  if (prefersReducedMotion || !balloonLayer) return;
  for (let i = 0; i < n; i++){
    setTimeout(() => {
      const b = document.createElement('div');
      b.className = 'balloon';
      const color = balloonColors[Math.floor(Math.random() * balloonColors.length)];
      b.style.background = `radial-gradient(circle at 35% 30%, #fff6, ${color})`;
      b.style.left = Math.random() * 85 + 'vw';
      b.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
      const duration = 7 + Math.random() * 4;
      b.style.animation = `floatUp ${duration}s ease-in forwards`;
      b.addEventListener('click', () => {
        burstConfettiAt(b.getBoundingClientRect());
        b.remove();
      });
      balloonLayer.appendChild(b);
      setTimeout(() => b.remove(), duration * 1000 + 200);
    }, i * 250);
  }
}

/* ---------------------------------------------------------
   CONFETTI
--------------------------------------------------------- */
function burstConfetti(){
  burstConfettiAt({ left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 });
}
function burstConfettiAt(rect){
  if (prefersReducedMotion) return;
  const colors = ['#f8a9c8', '#f3cd8a', '#c99bea', '#fff'];
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;
  const total = 22;
  for (let i = 0; i < total; i++){
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = originX + 'px';
    p.style.top = originY + 'px';
    p.style.width = '7px';
    p.style.height = '11px';
    p.style.background = colors[i % colors.length];
    document.body.appendChild(p);
    const angle = Math.random() * Math.PI * 2;
    const dist = 70 + Math.random() * 150;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40;
    p.animate([
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy + 220}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
    ], { duration: 1100 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' });
    setTimeout(() => p.remove(), 1700);
  }
}

/* ---------------------------------------------------------
   FIREWORKS
--------------------------------------------------------- */
const fireworksCanvas = document.getElementById('fireworksCanvas');
let fwCtx = null;
if (fireworksCanvas) fwCtx = fireworksCanvas.getContext('2d');
let fwParticles = [];
let fwRunning = false;

function resizeFw(){
  if (!fireworksCanvas) return;
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
}
resizeFw();
window.addEventListener('resize', resizeFw);

function launchFireworks(){
  if (prefersReducedMotion || !fireworksCanvas) return;
  const bursts = 3;
  for (let b = 0; b < bursts; b++){
    setTimeout(() => createFirework(
      Math.random() * fireworksCanvas.width * 0.7 + fireworksCanvas.width * 0.15,
      Math.random() * fireworksCanvas.height * 0.35 + fireworksCanvas.height * 0.1
    ), b * 350);
  }
  if (!fwRunning) fwLoop();
}

function createFirework(x, y){
  const colors = ['#f8a9c8', '#f3cd8a', '#c99bea', '#9bd8ea', '#ffffff'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const count = 26;
  for (let i = 0; i < count; i++){
    const angle = (Math.PI * 2 * i) / count;
    const speed = 2 + Math.random() * 2.5;
    fwParticles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color
    });
  }
}

function fwLoop(){
  if (!fwCtx || !fireworksCanvas) return;
  fwRunning = true;
  fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  fwParticles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.035;
    p.life -= 0.018;
    fwCtx.globalAlpha = Math.max(p.life, 0);
    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
    fwCtx.fillStyle = p.color;
    fwCtx.fill();
  });
  fwCtx.globalAlpha = 1;
  fwParticles = fwParticles.filter(p => p.life > 0);
  if (fwParticles.length > 0){
    requestAnimationFrame(fwLoop);
  } else {
    fwRunning = false;
    fwCtx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
  }
}

/* ---------------------------------------------------------
   HIDDEN EASTER EGG
--------------------------------------------------------- */
let easterTaps = 0;
const easterHeart = document.getElementById('easterHeart');
const easterMessage = document.getElementById('easterMessage');
easterHeart?.addEventListener('click', () => {
  easterTaps++;
  if (easterTaps >= 5){
    easterTaps = 0;
    easterMessage?.classList.remove('hidden');
    burstConfettiAt(easterHeart.getBoundingClientRect());
    setTimeout(() => easterMessage?.classList.add('hidden'), 2600);
  }
});
