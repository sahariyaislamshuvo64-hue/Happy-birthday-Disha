const CONTENT = {

  // Target reveal moment (Year, Month: 0-indexed, Day, Hour, Minute, Second)
  targetDate: new Date(2026, 8, 6, 3, 10, 0),

  profileNotes: [
    "একটা সুন্দর স্মৃতি, যেটা সবসময় মনে থাকবে।",
    "তোমার হাসিটাই এই ছবিটার সবচেয়ে সুন্দর অংশ।",
    "এই মুহূর্তটা হয়তো ছোট, কিন্তু স্মৃতিটা অনেক বড়।",
    "এই দিনটা মনে পড়লেই ঠোঁটে হাসি চলে আসে।",
    "তোমার সাথে কাটানো প্রতিটা সময় আলাদা রকম সুন্দর।",
    "এই ছবিটা দেখলেই সেই দিনের কথা মনে পড়ে যায়।",
    "কিছু মুহূর্ত ক্যামেরার চেয়েও বেশি মনে গেঁথে থাকে।",
    "তোমার উপস্থিতি সবকিছু আরও রঙিন করে তোলে।",
    "এই স্মৃতিটা আমার কাছে খুব যত্নে রাখা।",
    "এমন আরও অনেক মুহূর্ত একসাথে কাটানোর অপেক্ষায়।"
  ],

  galleryCount: 30,

  stories: [
    { title: "প্রথম দেখা", preview: "সেই দিনটা আজও চোখে ভাসে, যেদিন প্রথম তোমার সাথে দেখা হয়েছিল।", body: "সেই দিনটা আজও চোখে ভাসে, যেদিন প্রথম তোমার সাথে দেখা হয়েছিল।\n\nহয়তো তখন বুঝিনি, কিন্তু সেই মুহূর্তটাই ছিল অনেক কিছুর শুরু। ছোট্ট একটা কথোপকথন, একটা হাসি — আর তারপর থেকে সবকিছু একটু একটু করে বদলে গেল।" },
    { title: "প্রথম হাসি", preview: "তোমার সেই হাসিটা দেখে মনে হয়েছিল, দিনটা হঠাৎ অনেক সুন্দর হয়ে গেল।", body: "তোমার সেই হাসিটা দেখে মনে হয়েছিল, দিনটা হঠাৎ অনেক সুন্দর হয়ে গেল।\n\nছোট ছোট মুহূর্তগুলোই আসলে সবচেয়ে বেশি মনে থেকে যায়। সেই হাসিটা আজও ঠিক ততটাই উজ্জ্বল, যতটা সেদিন ছিল।" },
    { title: "একটা সাধারণ বিকেল", preview: "কোনো বিশেষ কারণ ছাড়াই সেই বিকেলটা অনেক সুন্দর ছিল।", body: "কোনো বিশেষ কারণ ছাড়াই সেই বিকেলটা অনেক সুন্দর ছিল। শুধু কথা বলা, হাঁটা, আর একসাথে সময় কাটানো।\n\nকখনো কখনো সবচেয়ে ভালো স্মৃতিগুলো সবচেয়ে সাধারণ দিনেই তৈরি হয়।" },
    { title: "একটা ছোট্ট ঝগড়া", preview: "সেই ছোট্ট মান-অভিমানের গল্পটা এখন মনে পড়লে হাসি পায়।", body: "সেই ছোট্ট মান-অভিমানের গল্পটা এখন মনে পড়লে হাসি পায়। তখন মনে হয়েছিল অনেক বড় কিছু, কিন্তু আসলেটাও ছিল ভালোবাসারই একটা অংশ।\n\nঝগড়ার পরের সেই মিটমাটটা ছিল সবচেয়ে মিষ্টি অংশ।" },
    { title: "বৃষ্টির দিন", preview: "হঠাৎ বৃষ্টি নেমেছিল, আর আমরা দুজনেই ভিজে গিয়েছিলাম।", body: "হঠাৎ বৃষ্টি নেমেছিল, আর আমরা দুজনেই ভিজে গিয়েছিলাম। কেউ ছাতা খুঁজিনি, শুধু হেসেছিলাম।\n\nসেই বৃষ্টির গন্ধ আজও মনে করিয়ে দেয় সেই দিনটার কথা।" },
    { title: "মধ্যরাতের কথোপকথন", preview: "রাত জেগে কথা বলা, ঘুম না আসা, শুধু গল্প চলতেই থাকা।", body: "রাত জেগে কথা বলা, ঘুম না আসা, শুধু গল্প চলতেই থাকা। সময়ের কোনো হিসেব ছিল না সেই রাতে।\n\nএমন কিছু রাত থাকে যেগুলো সারাজীবন মনে রয়ে যায়।" },
    { title: "প্রথম উপহার", preview: "খুব সাধারণ একটা উপহার, কিন্তু তার পেছনের ভাবনাটা ছিল অনেক বড়।", body: "খুব সাধারণ একটা উপহার, কিন্তু তার পেছনের ভাবনাটা ছিল অনেক বড়। উপহারটা নয়, গুরুত্বপূর্ণ ছিল সেই যত্নটুকু।\n\nআজও সেটা রাখা আছে, ঠিক আগের মতোই যত্নে।" },
    { title: "একসাথে রান্না", preview: "রান্নাঘরে হুলুস্থুল, তবুও সেই বিকেলটা ছিল দারুণ মজার।", body: "রান্নাঘরে হুলুস্থুল, তবুও সেই বিকেলটা ছিল দারুণ মজার। কিছু পুড়ে গিয়েছিল, কিছু ঠিকঠাক হয়েছিল, কিন্তু হাসিটা থামেনি।\n\nএকসাথে করা সাধারণ কাজগুলোও অসাধারণ স্মৃতি হয়ে যায়।" },
    { title: "দূরত্বের দিনগুলো", preview: "দূরে থাকলেও, প্রতিদিনের ছোট ছোট কথায় কাছে থাকা যায়।", body: "দূরে থাকলেও, প্রতিদিনের ছোট ছোট কথায় কাছে থাকা যায়। বার্তার মাধ্যমেই যেন প্রতিদিনের গল্প ভাগ করে নেওয়া হতো।\n\nদূরত্ব সম্পর্ককে দুর্বল করেনি, বরং আরও মজবুত করেছে।" },
    { title: "একটা লম্বা হাঁটা", preview: "গন্তব্য ছিল না, শুধু হাঁটতে হাঁটতে কথা বলাটাই ছিল আসল উদ্দেশ্য।", body: "গন্তব্য ছিল না, শুধু হাঁটতে হাঁটতে কথা বলাটাই ছিল আসল উদ্দেশ্য। রাস্তাটা কখন শেষ হয়ে গেল বোঝাই যায়নি।\n\nএমন হাঁটাগুলোই সম্পর্ককে আরও গভীর করে তোলে।" },
    { title: "একটা ভুল বোঝাবুঝি", preview: "সব ঠিক হয়ে যাওয়ার আগে একটু কষ্ট হয়েছিল, কিন্তু শেষটা ছিল সুন্দর।", body: "সব ঠিক হয়ে যাওয়ার আগে একটু কষ্ট হয়েছিল, কিন্তু শেষটা ছিল সুন্দর। কথা বলে সব মিটিয়ে ফেলাটাই ছিল সবচেয়ে গুরুত্বপূর্ণ।\n\nভুল বোঝাবুঝির পরের বোঝাপড়াটাই সম্পর্ককে আরও মজবুত করে।" },
    { title: "একটা ছোট্ট চমক", preview: "একটা ছোট্ট, অপ্রত্যাশিত চমক পুরো দিনটাকে বদলে দিয়েছিল।", body: "একটা ছোট্ট, অপ্রত্যাশিত চমক পুরো দিনটাকে বদলে দিয়েছিল। কোনো বড় আয়োজন ছিল না, শুধু একটা ভালোবাসার ইঙ্গিত।\n\nছোট চমকগুলোই মাঝে মাঝে সবচেয়ে বেশি মনে দাগ কাটে।" },
    { title: "পরীক্ষার দিনগুলো", preview: "চাপের মধ্যেও একে অপরকে সাহস জোগানোর সেই দিনগুলো ভোলার নয়।", body: "চাপের মধ্যেও একে অপরকে সাহস জোগানোর সেই দিনগুলো ভোলার নয়। কঠিন সময়েও পাশে থাকাটাই আসল বন্ধুত্ব।\n\nসেই সময়ের ছোট ছোট উৎসাহই অনেক বড় শক্তি ছিল।" },
    { title: "একটা সিনেমার রাত", preview: "সিনেমা দেখতে বসে গল্পে এত মজা হয়েছিল যে সিনেমাটাই শেষ হয়নি ঠিকমতো।", body: "সিনেমা দেখতে বসে গল্পে এত মজা হয়েছিল যে সিনেমাটাই শেষ হয়নি ঠিকমতো। মাঝে মাঝে গল্প করাটাই আসল বিনোদন হয়ে যায়।\n\nসেই রাতের হাসাহাসি আজও মনে পড়ে।" },
    { title: "একটা কঠিন দিন", preview: "সব খারাপ দিনেও, একটা ভরসার কণ্ঠস্বর সবকিছু সহজ করে দেয়।", body: "সব খারাপ দিনেও, একটা ভরসার কণ্ঠস্বর সবকিছু সহজ করে দেয়। সেই দিন বুঝেছিলাম, পাশে থাকাটাই সবচেয়ে বড় সাহায্য।\n\nধন্যবাদ, সবসময় পাশে থাকার জন্য।" },
    { title: "একটা উৎসবের দিন", preview: "রঙে, আলোয় আর হাসিতে ভরা একটা দিন, যা কখনো ভোলার নয়।", body: "রঙে, আলোয় আর হাসিতে ভরা একটা দিন, যা কখনো ভোলার নয়। উৎসবের আনন্দটা তখনই সম্পূর্ণ হয়, যখন প্রিয় মানুষগুলো পাশে থাকে।\n\nসেই দিনের প্রতিটা ছবি আজও হাসি এনে দেয়।" },
    { title: "একটা ছোট্ট চিঠি", preview: "হাতে লেখা একটা চিঠি, যেটা এখনও যত্নে রাখা আছে।", body: "হাতে লেখা একটা চিঠি, যেটা এখনও যত্নে রাখা আছে। প্রতিটা লাইনে ছিল সততা আর ভালোবাসা।\n\nমাঝে মাঝে সেটা আবার পড়ে দেখি, আর সেই অনুভূতিটা আবার ফিরে আসে।" },
    { title: "একটা নতুন শুরু", preview: "নতুন কিছু শুরু করার সাহসটা পেয়েছিলাম পাশে থাকার জন্যই।", body: "নতুন কিছু শুরু করার সাহসটা পেয়েছিলাম পাশে থাকার জন্যই। একা হলে হয়তো এতটা সহজ হতো না।\n\nএভাবেই পাশে থাকার প্রতিটা মুহূর্ত অর্থবহ হয়ে ওঠে।" },
    { title: "আজকের দিন", preview: "আজকের দিনটা শুধু তোমার, আর এই ছোট্ট ওয়েবসাইটটা তার একটা ছোট্ট উপহার।", body: "আজকের দিনটা শুধু তোমার, আর এই ছোট্ট ওয়েবসাইটটা তার একটা ছোট্ট উপহার।\n\nপ্রতিটা ছবি, প্রতিটা লাইন, প্রতিটা নোট — সবকিছুই তৈরি হয়েছে একটাই কারণে: তোমাকে হাসাতে, আর জানাতে যে তুমি কতটা স্পেশাল।" },
    { title: "আগামীর গল্প", preview: "এই গল্পটা এখনও শেষ হয়নি — বরং সামনে আরও অনেক পাতা বাকি।", body: "এই গল্পটা এখনও শেষ হয়নি — বরং সামনে আরও অনেক পাতা বাকি। আরও অনেক হাসি, আরও অনেক স্মৃতি, আরও অনেক দিন একসাথে কাটানোর অপেক্ষায়।\n\nশুভ জন্মদিন, ডিশা। এই বছরটা হোক তোমার সবচেয়ে সুন্দর বছর।" }
  ],

  pinNotes: [
    "Happy Birthday Disha ❤️",
    "Stay happy always.",
    "Keep smiling.",
    "তোমার প্রতিটা দিন সুন্দর হোক।",
    "আজকের দিনটা শুধু তোমার।",
    "You deserve all the good things.",
    "তোমার হাসি সবচেয়ে সুন্দর।",
    "Never stop being you.",
    "এই বছরটা হোক তোমার সেরা বছর।",
    "So proud of you.",
    "তুমি অনেক স্পেশাল।",
    "Wishing you endless joy.",
    "তোমার স্বপ্নগুলো সত্যি হোক।",
    "You light up every room.",
    "ভালো থেকো, সবসময়।",
    "Here's to more memories together.",
    "তোমার হাসিমুখ দেখতেই ভালো লাগে।",
    "You matter, more than you know.",
    "শুভ জন্মদিন, প্রিয় মানুষ।",
    "Cheers to another beautiful year.",
    "তোমার জন্য অনেক অনেক ভালোবাসা।"
  ]
};

const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const pad2 = n => String(n).padStart(2, '0');

function buildAmbient(){
  const starsFar = $('#layerStarsFar');
  const starsNear = $('#layerStarsNear');
  const hearts = $('#layerHearts');

  for (let i = 0; i < 60; i++){
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 1;
    s.style.width = s.style.height = `${size}px`;
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 3.6}s`;
    (i % 3 === 0 ? starsNear : starsFar).appendChild(s);
  }

  const heartGlyphs = ['♥','✦','❋'];
  for (let i = 0; i < 16; i++){
    const h = document.createElement('span');
    h.className = 'floaty-heart';
    h.textContent = heartGlyphs[i % heartGlyphs.length];
    h.style.left = `${Math.random() * 100}%`;
    h.style.top = `${100 + Math.random() * 30}%`;
    h.style.fontSize = `${0.7 + Math.random() * 1}rem`;
    h.style.animationDuration = `${10 + Math.random() * 10}s`;
    h.style.animationDelay = `${Math.random() * 12}s`;
    hearts.appendChild(h);
  }
}

function bindAmbientParallax(){
  const layers = $$('.ambient-layer');
  let targetX = 0, targetY = 0, curX = 0, curY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function raf(){
    curX += (targetX - curX) * 0.05;
    curY += (targetY - curY) * 0.05;
    const scrollY = window.scrollY || 0;
    layers.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth) || 0.03;
      const px = curX * depth * 160;
      const py = curY * depth * 160 + scrollY * depth * 0.4;
      layer.style.transform = `translate3d(${px}px, ${py}px, 0)`;
    });
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

let countdownTimer = null;

function startCountdown(){
  const target = CONTENT.targetDate.getTime();

  function tick(){
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0){
      clearInterval(countdownTimer);
      $('#cd-days').textContent = '00';
      $('#cd-hours').textContent = '00';
      $('#cd-mins').textContent = '00';
      $('#cd-secs').textContent = '00';
      goToReveal();
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    $('#cd-days').textContent = pad2(days);
    $('#cd-hours').textContent = pad2(hours);
    $('#cd-mins').textContent = pad2(mins);
    $('#cd-secs').textContent = pad2(secs);
  }
  tick();
  countdownTimer = setInterval(tick, 1000);
}

function bindCountdownTilt(){
  const card = $('#countdownCard');
  const scene = $('#countdownScene');
  if (!card) return;
  scene.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${py * -8}deg) rotateY(${px * 10}deg)`;
  });
  scene.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
  });
}

function buildCandles(){
  const wrap = $('#candles');
  wrap.innerHTML = '';
  for (let i = 0; i < 5; i++){
    const c = document.createElement('div');
    c.className = 'candle';
    const flame = document.createElement('div');
    flame.className = 'flame';
    flame.style.animationDelay = `${Math.random() * 0.4}s`;
    c.appendChild(flame);
    wrap.appendChild(c);
  }
}

function burstConfetti(){
  const field = $('#confettiField');
  field.innerHTML = '';
  const colors = ['#e8b96a', '#ef9bb0', '#f3d9a4', '#f6c6d3', '#ffffff', '#c99bf0'];
  const count = 90;

  for (let i = 0; i < count; i++){
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    const color = colors[Math.floor(Math.random() * colors.length)];
    p.style.background = color;
    const angle = Math.random() * Math.PI * 2;
    const distance = 140 + Math.random() * 320;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 80;
    const z = (Math.random() - 0.5) * 300;
    const rot = Math.random() * 720 - 360;
    const delay = Math.random() * 200;
    const duration = 1400 + Math.random() * 900;

    p.style.transition = `transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity ${duration}ms ease ${delay}ms`;
    field.appendChild(p);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        p.style.opacity = '1';
        p.style.transform = `translate3d(${x}px, ${y + 260}px, ${z}px) rotate3d(1,1,0,${rot}deg)`;
      });
    });

    setTimeout(() => { p.style.opacity = '0'; }, delay + duration * 0.75);
  }
}

function goToReveal(){
  $('#stage-countdown').classList.add('stage-hidden');
  const revealStage = $('#stage-reveal');
  revealStage.classList.remove('stage-hidden');
  buildCandles();

  setTimeout(() => { burstConfetti(); }, 1500);
  setTimeout(() => { $('#revealHeadline').classList.add('show'); }, 2000);
}

function goToBanner(){
  $('#stage-reveal').classList.add('stage-hidden');
  $('#stage-banner').classList.remove('stage-hidden');
}

function enterMainSite(){
  $('#stage-banner').classList.add('stage-hidden');
  $('#mainSite').classList.remove('stage-hidden');
  document.body.style.overflowY = 'auto';
  window.scrollTo({ top: 0 });
}

function buildProfileGrid(){
  const grid = $('#profileGrid');
  grid.innerHTML = '';
  CONTENT.profileNotes.forEach((note, i) => {
    const idx = pad2(i + 1);
    const card = document.createElement('div');
    card.className = 'tilt-card';
    card.innerHTML = `
      <img src="assets/images/photo${idx}.jpg" alt="Memory ${idx}" loading="lazy">
      <div class="note"><span class="num">Photo ${idx}</span>${note}</div>
    `;
    grid.appendChild(card);
  });
  bindTilt($$('.tilt-card', grid));
}

function bindTilt(cards){
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${py * -10}deg) rotateY(${px * 12}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

function buildPinboard(){
  const board = $('#pinboard');
  board.innerHTML = '';
  CONTENT.pinNotes.forEach((text) => {
    const note = document.createElement('div');
    note.className = 'pin-note';
    const rotation = (Math.random() * 12 - 6).toFixed(1);
    note.style.transform = `rotate(${rotation}deg)`;
    note.innerHTML = `<span class="pin"></span>${text}`;
    board.appendChild(note);
  });
}

let galleryImages = [];
let lightboxIndex = 0;

function buildGallery(){
  const grid = $('#galleryGrid');
  grid.innerHTML = '';
  galleryImages = [];
  for (let i = 1; i <= CONTENT.galleryCount; i++){
    const idx = pad2(i);
    const src = `assets/images/photo${idx}.jpg`;
    galleryImages.push(src);
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="${src}" alt="Gallery photo ${idx}" loading="lazy">`;
    item.addEventListener('click', () => openLightbox(i - 1));
    grid.appendChild(item);
  }
}

function openLightbox(index){
  lightboxIndex = index;
  $('#lbImage').src = galleryImages[lightboxIndex];
  $('#lightbox').classList.add('open');
  $('#lightbox').setAttribute('aria-hidden', 'false');
}
function closeLightbox(){
  $('#lightbox').classList.remove('open');
  $('#lightbox').setAttribute('aria-hidden', 'true');
}
function stepLightbox(delta){
  lightboxIndex = (lightboxIndex + delta + galleryImages.length) % galleryImages.length;
  $('#lbImage').src = galleryImages[lightboxIndex];
}

function bindLightbox(){
  $('#lbClose').addEventListener('click', closeLightbox);
  $('#lbPrev').addEventListener('click', () => stepLightbox(-1));
  $('#lbNext').addEventListener('click', () => stepLightbox(1));
  $('#lightbox').addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightbox(); });

  document.addEventListener('keydown', (e) => {
    if (!$('#lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });

  let touchStartX = null;
  const lb = $('#lightbox');
  lb.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) stepLightbox(dx > 0 ? -1 : 1);
    touchStartX = null;
  }, { passive: true });
}

function buildGolpo(){
  const grid = $('#golpoGrid');
  grid.innerHTML = '';
  CONTENT.stories.forEach((story, i) => {
    const num = pad2(i + 1);
    const card = document.createElement('div');
    card.className = 'story-card';
    card.innerHTML = `
      <span class="story-num">Golpo ${num}</span>
      <h3 class="story-title">${story.title}</h3>
      <p class="story-preview">${story.preview}</p>
      <button class="story-read" type="button" data-index="${i}">Read More</button>
    `;
    grid.appendChild(card);
  });
  $$('.story-read', grid).forEach(btn => {
    btn.addEventListener('click', () => openStoryModal(parseInt(btn.dataset.index, 10)));
  });
  bindTilt($$('.story-card', grid));
}

function openStoryModal(index){
  const story = CONTENT.stories[index];
  $('#storyModalNumber').textContent = `Golpo ${pad2(index + 1)}`;
  $('#storyModalTitle').textContent = story.title;
  $('#storyModalBody').textContent = story.body;
  $('#storyModal').classList.add('open');
  $('#storyModal').setAttribute('aria-hidden', 'false');
}
function closeStoryModal(){
  $('#storyModal').classList.remove('open');
  $('#storyModal').setAttribute('aria-hidden', 'true');
}

function bindStoryModal(){
  $('#storyClose').addEventListener('click', closeStoryModal);
  $('#storyModal').addEventListener('click', (e) => { if (e.target.id === 'storyModal') closeStoryModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $('#storyModal').classList.contains('open')) closeStoryModal();
  });
}

function showPage(pageName){
  $$('.page').forEach(p => p.classList.remove('active'));
  $(`#page-${pageName}`).classList.add('active');
  $$('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageName);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  $('#navLinks').classList.remove('open');
  $('#navToggle').classList.remove('open');
}

function bindNav(){
  $$('.nav-link, .nav-brand').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });
  $('#navToggle').addEventListener('click', () => {
    $('#navToggle').classList.toggle('open');
    $('#navLinks').classList.toggle('open');
    const expanded = $('#navToggle').classList.contains('open');
    $('#navToggle').setAttribute('aria-expanded', String(expanded));
  });

  const scrollHint = $('.scroll-hint');
  if (scrollHint){
    scrollHint.addEventListener('click', (e) => {
      e.preventDefault();
      $('#' + scrollHint.dataset.scroll).scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function bindMusic(){
  const btn = $('#musicBtn');
  const audio = $('#bgMusic');
  let playing = false;

  btn.addEventListener('click', () => {
    if (!playing){
      audio.play().then(() => {
        playing = true;
        btn.classList.add('playing');
        btn.setAttribute('aria-pressed', 'true');
      }).catch(() => {});
    } else {
      audio.pause();
      playing = false;
      btn.classList.remove('playing');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildAmbient();
  bindAmbientParallax();

  bindCountdownTilt();
  startCountdown();

  $('#skipIntro').addEventListener('click', () => { clearInterval(countdownTimer); goToReveal(); });
  $('#continueToBanner').addEventListener('click', goToBanner);
  $('#enterSite').addEventListener('click', enterMainSite);

  buildProfileGrid();
  buildPinboard();
  buildGallery();
  buildGolpo();

  bindNav();
  bindLightbox();
  bindStoryModal();
  bindMusic();

  document.body.style.overflowY = 'hidden';
});

