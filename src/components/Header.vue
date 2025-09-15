<template>
  <!-- Hero Section -->
  <section class="hero-section">
    <img src="/images/header/header-main-pattern.png" alt="Pattern" class="pattern-bg">

    <div class="container">
      <!-- Title at the top -->
      <div class="row">
        <div class="col-12">
          <h1 class="hero-title">
            Fast development with<br>
            <span class="highlight typewriter-text">{{ currentText }}</span>
            <span v-if="showCursor" class="cursor">|</span>
          </h1>
        </div>
      </div>

      <!-- Image in the center -->
      <div class="row">
        <div class="col-12">
          <div class="hero-image-container">
            <img src="/images/header/header-center-img.png" alt="AI Head" class="hero-main-image">

            <!-- Floating Icons -->
            <img src="/images/header/header-icon-image.png" alt="Image" class="floating-icon" style="top: 5%; left: 21%; width: 160px;">
            <img src="/images/header/header-icon-eye.png" alt="Eye" class="floating-icon" style="top: 5%; right: 21%; width: 170px;">
            <img src="/images/header/header-icon-hi.png" alt="Hi" class="floating-icon" style="bottom: 2%; left: 20%; width: 180px;">
            <img src="/images/header/header-icon-message.png" alt="Message" class="floating-icon" style="bottom: 2%; right: 18%; width: 190px;">
          </div>
        </div>
      </div>

      <!-- Buttons at the bottom -->
      <div class="row">
        <div class="col-12">
          <div class="mt-4">
            <button class="btn btn-demo">
              <img src="/images/header/header-play-ico.png" alt="Play" class="btn-icon">
              Start Building
            </button>
            <button class="btn btn-voice">
              <img src="/images/header/header-microphone-ico.png" alt="AI" class="btn-icon">
              AI Assistant
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentText = ref('')
const showCursor = ref(true)

const texts = [
  'AI-Powered Development',
  'Smart Automation Tools',
  'Intelligent Web Solutions',
  'AI-Driven Innovation',
  'Automated Website Creation'
]

let currentTextIndex = 0
let currentCharIndex = 0
let isDeleting = false
let typewriterInterval = null
let cursorInterval = null

const typeEffect = () => {
  const text = texts[currentTextIndex]

  if (isDeleting) {
    currentText.value = text.substring(0, currentCharIndex - 1)
    currentCharIndex--
  } else {
    currentText.value = text.substring(0, currentCharIndex + 1)
    currentCharIndex++
  }

  let speed = isDeleting ? 80 : 120
  speed += Math.random() * 100

  if (!isDeleting && currentCharIndex === text.length) {
    speed = 2500
    isDeleting = true
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false
    currentTextIndex = (currentTextIndex + 1) % texts.length
    speed = 500
  }

  typewriterInterval = setTimeout(typeEffect, speed)
}

const startCursorBlink = () => {
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value
  }, 530)
}

onMounted(() => {
  typeEffect()
  startCursorBlink()
})

onUnmounted(() => {
  if (typewriterInterval) clearTimeout(typewriterInterval)
  if (cursorInterval) clearInterval(cursorInterval)
})
</script>

<style scoped>
/* ===== HERO SECTION ===== */
.hero-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
  padding: 0;
  overflow-x: hidden;
}

@media (max-width: 991px) {
  .hero-section {
    margin-top: 30px;
  }
  
  .hero-title {
    font-size: clamp(1.7rem, 4vw, 3rem) !important;
  }
}

.hero-title {
  font-family: "Manrope", sans-serif;
  font-weight: 800;
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.2;
  margin-bottom: clamp(1rem, 3vh, 2rem);
  z-index: 3 !important;
}

.hero-title .highlight {
  color: var(--primary-purple);
}

.typewriter-text {
  display: inline-block;
  min-height: 1.2em;
}

.cursor {
  color: var(--accent-pink);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-image-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-main-image {
  max-width: min(720px, 55vh);
  width: 100%;
  height: auto;
  z-index: 2;
  position: relative;
  display: block;
  margin: 0 auto clamp(1rem, 2vh, 1.5rem);
  border: 10px solid white;
  border-radius: 50%;
}

.pattern-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
  z-index: 0;
  max-width: 100vw;
}

/* ===== FLOATING ICONS ===== */
.floating-icon {
  position: absolute;
  animation: float 3s ease-in-out infinite;
}

.floating-icon:nth-child(2) {
  animation-delay: -0.5s;
}
.floating-icon:nth-child(3) {
  animation-delay: -1s;
}
.floating-icon:nth-child(4) {
  animation-delay: -1.5s;
}
.floating-icon:nth-child(5) {
  animation-delay: -2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* ===== BUTTONS ===== */
.btn-demo {
  font-family: "Mulish", sans-serif;
  font-weight: 400;
  background: var(--accent-pink);
  color: #1f1f2e;
  border: none;
  padding: clamp(12px, 2vh, 15px) clamp(20px, 4vw, 30px);
  border-radius: 50px;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  margin-right: 40px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.btn-demo:hover {
  background: #e070d9;
  color: #1f1f2e;
  transform: translateY(-2px);
}

.btn-voice {
  font-family: "Mulish", sans-serif;
  font-weight: 400;
  background: var(--accent-green);
  color: #1f1f2e;
  border: none;
  padding: clamp(12px, 2vh, 15px) clamp(20px, 4vw, 30px);
  border-radius: 50px;
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  margin-bottom: 10px;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  position: relative;
}

.btn-voice:hover {
  background: #c3d63a;
  color: #1f1f2e;
  transform: translateY(-2px);
}

.btn-icon {
  width: 20px;
  margin-right: 15px;
}

.btn-demo::after {
  content: "";
  margin-left: 6px;
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  width: 1px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.3);
}

.btn-voice::after {
  content: "";
  position: absolute;
  margin-left: 6px;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  width: 1px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.3);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .hero-section {
    padding: clamp(20px, 4vh, 30px) 15px clamp(30px, 6vh, 50px);
  }

  .hero-title {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    margin-bottom: clamp(1rem, 4vw, 1.5rem);
  }

  .hero-main-image {
    max-width: min(280px, 45vh);
    margin-bottom: clamp(1rem, 4vw, 1.5rem);
  }

  .btn-demo,
  .btn-voice {
    width: 100%;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    display: block;
    padding: 12px 20px;
    font-size: 1rem;
  }

  .floating-icon {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 15px 10px 25px;
  }
  
  .hero-title {
    font-size: clamp(1.2rem, 6vw, 1.8rem);
    line-height: 1.3;
  }
  
  .hero-main-image {
    max-width: min(220px, 35vh);
  }
  
  .btn-demo,
  .btn-voice {
    max-width: 100%;
    padding: 10px 15px;
    font-size: 0.9rem;
  }
}

@media (max-height: 700px) {
  .hero-section {
    justify-content: space-around;
    padding: 15px 0 20px;
  }
  
  .hero-title {
    margin-bottom: 1rem;
  }
  
  .hero-main-image {
    max-width: min(480px, 40vh);
    margin: 0 auto 1rem;
  }
  
  .btn-demo, .btn-voice {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

@media (max-height: 600px) {
  .hero-section {
    min-height: calc(100vh - 60px);
    padding: 10px 0 15px;
  }
  
  .hero-main-image {
    max-width: min(400px, 35vh);
  }
  
  .floating-icon {
    display: none;
  }
}
</style>