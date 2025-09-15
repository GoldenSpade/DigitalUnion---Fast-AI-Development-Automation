<template>
  <div class="scroll-indicator">
    <div
      v-for="(section, index) in sections"
      :key="index"
      class="indicator-dot"
      :class="{ active: currentSection === index }"
      @click="scrollToSection(index)"
      :title="section.name"
    >
      <span class="indicator-tooltip">{{ section.name }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  currentSection: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['scrollTo'])

const sections = ref([
  { name: 'Home', id: 'home' },
  { name: 'Services', id: 'services' },
  { name: 'Process', id: 'process' },
  { name: 'Platforms', id: 'platforms' },
  { name: 'Cases', id: 'cases' },
  { name: 'About', id: 'testimonials' },
  { name: 'Contact', id: 'contact' }
])

const scrollToSection = (index) => {
  const targetSection = document.querySelector(`#${sections.value[index].id}`)
  if (targetSection) {
    const navHeight = 80
    const targetPosition = index === 0 ? 0 : targetSection.offsetTop - navHeight

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}

const currentSection = ref(0)

const updateCurrentSection = () => {
  const scrollPosition = window.pageYOffset + window.innerHeight / 2
  let closestIndex = 0
  let minDistance = Infinity

  sections.value.forEach((section, index) => {
    const element = document.querySelector(`#${section.id}`)
    if (element) {
      const sectionCenter = element.offsetTop + element.offsetHeight / 2
      const distance = Math.abs(scrollPosition - sectionCenter)

      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    }
  })

  currentSection.value = closestIndex
}

onMounted(() => {
  window.addEventListener('scroll', updateCurrentSection)
  updateCurrentSection()
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateCurrentSection)
})
</script>

<style scoped>
.scroll-indicator {
  position: fixed;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.indicator-dot:hover {
  background: rgba(255, 255, 255, 0.5);
  transform: scale(1.2);
}

.indicator-dot.active {
  background: var(--blue-primary);
  border-color: var(--blue-primary);
  transform: scale(1.3);
}

.indicator-tooltip {
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(31, 31, 46, 0.95);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.indicator-dot:hover .indicator-tooltip {
  opacity: 1;
}

/* Скрываем на мобильных устройствах */
@media (max-width: 768px) {
  .scroll-indicator {
    display: none;
  }
}
</style>