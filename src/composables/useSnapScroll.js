import { onMounted, onUnmounted, ref } from 'vue'

export function useSnapScroll() {
  const currentSection = ref(0)
  const isScrolling = ref(false)
  const sections = ref([])
  const touchStartY = ref(0)

  const scrollToSection = (index) => {
    if (isScrolling.value || index < 0 || index >= sections.value.length) return

    isScrolling.value = true
    const targetSection = sections.value[index]
    const navHeight = 80

    // Плавная прокрутка к секции
    const targetPosition = index === 0 ? 0 : targetSection.offsetTop - navHeight

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })

    currentSection.value = index

    // Разблокируем прокрутку через время
    setTimeout(() => {
      isScrolling.value = false
    }, 800)
  }

  const findClosestSection = () => {
    const scrollPosition = window.pageYOffset + window.innerHeight / 2
    let closestIndex = 0
    let minDistance = Infinity

    sections.value.forEach((section, index) => {
      const sectionCenter = section.offsetTop + section.offsetHeight / 2
      const distance = Math.abs(scrollPosition - sectionCenter)

      if (distance < minDistance) {
        minDistance = distance
        closestIndex = index
      }
    })

    return closestIndex
  }

  const handleWheel = (e) => {
    if (isScrolling.value) {
      e.preventDefault()
      return
    }

    e.preventDefault()

    const delta = e.deltaY
    const threshold = 50 // Минимальная сила скролла для срабатывания

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        // Скролл вниз
        scrollToSection(currentSection.value + 1)
      } else {
        // Скролл вверх
        scrollToSection(currentSection.value - 1)
      }
    }
  }

  const handleKeyDown = (e) => {
    if (isScrolling.value) return

    switch(e.key) {
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault()
        scrollToSection(currentSection.value + 1)
        break
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault()
        scrollToSection(currentSection.value - 1)
        break
      case 'Home':
        e.preventDefault()
        scrollToSection(0)
        break
      case 'End':
        e.preventDefault()
        scrollToSection(sections.value.length - 1)
        break
    }
  }

  const handleTouchStart = (e) => {
    touchStartY.value = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    if (isScrolling.value) return

    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.value - touchEndY
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Свайп вверх - следующая секция
        scrollToSection(currentSection.value + 1)
      } else {
        // Свайп вниз - предыдущая секция
        scrollToSection(currentSection.value - 1)
      }
    }
  }

  const updateCurrentSection = () => {
    if (!isScrolling.value) {
      currentSection.value = findClosestSection()
    }
  }

  const init = () => {
    // Находим все секции
    sections.value = [
      document.querySelector('#home'),
      document.querySelector('#services'),
      document.querySelector('#process'),
      document.querySelector('#platforms'),
      document.querySelector('#cases'),
      document.querySelector('#testimonials'),
      document.querySelector('#contact')
    ].filter(Boolean)

    // Определяем текущую секцию
    currentSection.value = findClosestSection()

    // Добавляем обработчики только для десктопа
    const isMobile = window.innerWidth <= 768

    if (!isMobile) {
      document.addEventListener('wheel', handleWheel, { passive: false })
      document.addEventListener('keydown', handleKeyDown)
    } else {
      // Для мобильных - обработка тач событий
      document.addEventListener('touchstart', handleTouchStart, { passive: true })
      document.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    // Отслеживаем изменение размера окна
    window.addEventListener('resize', () => {
      const wasMobile = window.innerWidth <= 768
      if (wasMobile !== isMobile) {
        window.location.reload()
      }
    })
  }

  const destroy = () => {
    document.removeEventListener('wheel', handleWheel)
    document.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('touchstart', handleTouchStart)
    document.removeEventListener('touchend', handleTouchEnd)
  }

  onMounted(() => {
    setTimeout(init, 100)
  })

  onUnmounted(() => {
    destroy()
  })

  return {
    currentSection,
    scrollToSection
  }
}