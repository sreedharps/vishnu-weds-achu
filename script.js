/**
 * ==============================================================================
 * WEDDING INVITATION SCRIPT
 * Couple: Vishnu & Achu
 * Ceremony: December 12, 2026 (11:00 AM - 11:45 AM)
 * ==============================================================================
 */

// ------------------------------------------------------------------------------
// 💍 WEDDING CONFIGURATION
// ------------------------------------------------------------------------------
const WEDDING_CONFIG = {
  groomName: "Vishnu",
  groomParents: "Sureshkumar & Reni",
  brideName: "Achu",
  brideParents: "Ravikumar & Thankamma",

  // Target countdown date: December 12, 2026 11:00:00 (Muhurtham Start)
  weddingDate: "2026-12-12T11:00:00",

  // Venues
  ceremonyVenue: "Michael Plaza Convention Center, Ramapuram, Keralam",
  ceremonyMapUrl: "https://www.google.com/maps/search/?api=1&query=Michael+Plaza+Convention+Center+Ramapuram+Kerala",

  receptionVenue: "St. Mary's Auditorium, Pulickalkavala",
  receptionMapUrl: "https://www.google.com/maps/search/?api=1&query=St+Marys+Auditorium+Pulickalkavala",

  // Contact Numbers
  contactPrimary: "9447602408",
  contactSecondary: "7034325403",

  // Contact number (International format: 919447602408)
  whatsappNumber: "919447602408"
};

// ------------------------------------------------------------------------------
// ⏳ LIVE COUNTDOWN TIMER (Target: Dec 12, 2026 11:00:00 AM)
// ------------------------------------------------------------------------------
function initCountdownTimer() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const subtitleEl = document.getElementById("countdownSubtitle");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const targetTime = new Date(WEDDING_CONFIG.weddingDate).getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      if (subtitleEl) {
        subtitleEl.textContent = "🎉 The auspicious Muhurtham has arrived! Wishing Vishnu & Achu a lifetime of joy!";
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// ------------------------------------------------------------------------------
// 🖼️ PHOTO GALLERY & LIGHTBOX
// ------------------------------------------------------------------------------
let currentLightboxIndex = 0;
let galleryImagesList = [];

function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  if (!lightbox || galleryItems.length === 0) return;

  galleryImagesList = Array.from(galleryItems).map(item => {
    const img = item.querySelector("img");
    const caption = item.querySelector(".gallery-overlay-text");
    return {
      src: img ? img.src : "",
      alt: img ? img.alt : "Wedding Moment",
      caption: caption ? caption.textContent.trim() : "Vishnu & Achu"
    };
  });

  function showLightbox(index) {
    if (index < 0) index = galleryImagesList.length - 1;
    if (index >= galleryImagesList.length) index = 0;
    currentLightboxIndex = index;

    const data = galleryImagesList[currentLightboxIndex];
    if (lightboxImg && data) {
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
    }
    if (lightboxCaption && data) {
      lightboxCaption.textContent = data.caption;
    }
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function hideLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener("click", () => showLightbox(idx));
  });

  if (closeBtn) closeBtn.addEventListener("click", hideLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => showLightbox(currentLightboxIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showLightbox(currentLightboxIndex + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) hideLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") hideLightbox();
    if (e.key === "ArrowLeft") showLightbox(currentLightboxIndex - 1);
    if (e.key === "ArrowRight") showLightbox(currentLightboxIndex + 1);
  });
}

// ------------------------------------------------------------------------------
// 🎵 GENTLE TRADITIONAL WEDDING MUSIC SYNTHESIZER (Web Audio API)
// ------------------------------------------------------------------------------
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;

function initMusicPlayer() {
  const musicToggleBtn = document.getElementById("musicToggleBtn");
  if (!musicToggleBtn) return;

  // Raag Bhupali soothing pentatonic frequencies (Sa, Re, Ga, Pa, Dha)
  const raagNotes = [
    261.63, // Sa
    293.66, // Re
    329.63, // Ga
    392.00, // Pa
    440.00, // Dha
    523.25, // Sa'
    440.00,
    392.00,
    329.63,
    293.66
  ];

  let noteIndex = 0;

  function playTone(freq, duration) {
    if (!audioCtx || !isMusicPlaying) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio playback notice:", e);
    }
  }

  function startMelody() {
    if (musicInterval) clearInterval(musicInterval);
    playTone(raagNotes[noteIndex % raagNotes.length], 1.2);
    noteIndex++;

    musicInterval = setInterval(() => {
      if (!isMusicPlaying) return;
      playTone(raagNotes[noteIndex % raagNotes.length], 1.2);
      noteIndex++;
    }, 700);
  }

  musicToggleBtn.addEventListener("click", () => {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }

    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    isMusicPlaying = !isMusicPlaying;

    if (isMusicPlaying) {
      musicToggleBtn.classList.add("playing");
      musicToggleBtn.setAttribute("title", "Pause Festive Music");
      startMelody();
      showToast("🎵 Playing festive traditional tune");
    } else {
      musicToggleBtn.classList.remove("playing");
      musicToggleBtn.setAttribute("title", "Play Festive Music");
      if (musicInterval) clearInterval(musicInterval);
      showToast("🔇 Music paused");
    }
  });
}

// ------------------------------------------------------------------------------
// 🎉 CELEBRATORY CONFETTI & PETALS
// ------------------------------------------------------------------------------
function triggerConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confettiPieces = [];
  const colors = ["#D4AF37", "#1B4332", "#F4E8C1", "#2D6A4F", "#FFD700", "#E8C15A"];
  const numPieces = 90;

  for (let i = 0; i < numPieces; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.5,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 6 - 3,
      isPetal: Math.random() > 0.45
    });
  }

  let animationFrameId;
  const startTime = Date.now();

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activePieces = 0;

    confettiPieces.forEach(p => {
      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.02) + p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y < canvas.height + 20) {
        activePieces++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.isPetal) {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }
        ctx.restore();
      }
    });

    if (activePieces > 0 && Date.now() - startTime < 6000) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrameId);
    }
  }

  animate();
}



// ------------------------------------------------------------------------------
// 💖 WISHES & BLESSINGS WALL (LocalStorage Guestbook)
// ------------------------------------------------------------------------------
const DEFAULT_WISHES = [
  {
    name: "Suresh & Reni Family",
    message: "With hearts full of love, we welcome everyone to bless Vishnu and Achu as they begin their sacred journey.",
    time: "Family"
  },
  {
    name: "Ravikumar & Thankamma Family",
    message: "May God shower Vishnu & Achu with abundant happiness, love, peace, and togetherness always.",
    time: "Family"
  },
  {
    name: "Well-wishers & Relatives",
    message: "Wishing the wonderful couple a blessed and joyous married life ahead! Excited to be there on Dec 12th! 💐",
    time: "Yesterday"
  }
];

function initWishesWall() {
  const wishesContainer = document.getElementById("wishesList");
  if (!wishesContainer) return;

  function loadWishes() {
    const stored = localStorage.getItem("wedding_wishes_vishnu_achu");
    const wishes = stored ? JSON.parse(stored) : DEFAULT_WISHES;

    wishesContainer.innerHTML = "";
    wishes.forEach(wish => {
      const card = document.createElement("div");
      card.className = "wish-card";
      card.innerHTML = `
        <div class="wish-quote-icon">“</div>
        <p class="wish-text">${escapeHtml(wish.message)}</p>
        <div class="wish-author">
          <span>${escapeHtml(wish.name)}</span>
          <span class="wish-time">${escapeHtml(wish.time)}</span>
        </div>
      `;
      wishesContainer.appendChild(card);
    });
  }

  loadWishes();
}

function saveWishLocally(name, message) {
  const stored = localStorage.getItem("wedding_wishes_vishnu_achu");
  const wishes = stored ? JSON.parse(stored) : [...DEFAULT_WISHES];

  wishes.unshift({
    name: name,
    message: message,
    time: "Just now"
  });

  localStorage.setItem("wedding_wishes_vishnu_achu", JSON.stringify(wishes.slice(0, 15)));
  initWishesWall();
}

function escapeHtml(string) {
  const div = document.createElement("div");
  div.innerText = string;
  return div.innerHTML;
}

// ------------------------------------------------------------------------------
// 📅 GOOGLE CALENDAR SYNC
// ------------------------------------------------------------------------------
function initCalendarButton() {
  const googleCalBtn = document.getElementById("addToGoogleCalBtn");
  if (!googleCalBtn) return;

  googleCalBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = encodeURIComponent("Wedding Ceremony of Vishnu & Achu");
    const details = encodeURIComponent("Wedding Ceremony of Vishnu (S/o Sureshkumar & Reni) & Achu (D/o Ravikumar & Thankamma). Muhurtham: 11:00 am - 11:45 am.");
    const location = encodeURIComponent("Michael Plaza Convention Center, Ramapuram, Keralam");
    const dates = "20261212T053000Z/20261212T100000Z";

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gcalUrl, "_blank");
  });
}

// ------------------------------------------------------------------------------
// 📲 WHATSAPP SHARE & NAVIGATION
// ------------------------------------------------------------------------------
function initShareAndNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  const shareBtn = document.getElementById("shareWhatsAppBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const shareUrl = window.location.href;
      const shareText = `✨ You are cordially invited to the wedding of *Vishnu & Achu*! 💍\n\n🗓️ *Date:* 12/12/2026 (Saturday)\n⏰ *Muhurtham:* 11:00 AM - 11:45 AM\n📍 *Venue:* Michael Plaza Convention Center, Ramapuram\n\nClick here to view the invitation & venue map:\n${shareUrl}`;
      const waShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      window.open(waShareUrl, "_blank");
    });
  }

  const celebrateBtn = document.getElementById("celebrateBtn");
  if (celebrateBtn) {
    celebrateBtn.addEventListener("click", () => {
      triggerConfetti();
      showToast("🎉 Showering love & blessings on Vishnu & Achu!");
    });
  }
}

// ------------------------------------------------------------------------------
// 🔔 TOAST MESSAGE
// ------------------------------------------------------------------------------
function showToast(message) {
  let toast = document.getElementById("toastMsg");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastMsg";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// ------------------------------------------------------------------------------
// 🚀 DOM READY
// ------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initCountdownTimer();
  initGalleryLightbox();
  initMusicPlayer();
  initWishesWall();
  initCalendarButton();
  initShareAndNavigation();

  // Gentle greeting confetti
  setTimeout(() => {
    triggerConfetti();
  }, 1000);
});
