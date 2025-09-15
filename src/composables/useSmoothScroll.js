import { onMounted, onUnmounted } from 'vue'

export function useSmoothScroll() {
  let currentScroll = 0
  let targetScroll = 0
  let animationId = null

  const lerp = (start, end, factor) => {
    return start + (end - start) * factor
  }

  const smoothScrollAnimation = () => {
    currentScroll = lerp(currentScroll, targetScroll, 0.08) // Плавность (меньше = плавнее)

    if (Math.abs(currentScroll - targetScroll) > 0.5) {
      window.scrollTo(0, currentScroll)
      animationId = requestAnimationFrame(smoothScrollAnimation)
    } else {
      window.scrollTo(0, targetScroll)
      cancelAnimationFrame(animationId)
    }
  }

  const handleWheel = (e) => {
    e.preventDefault()

    const delta = e.deltaY
    const speed = 0.8 // Скорость прокрутки (меньше = медленнее)

    targetScroll += delta * speed
    targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight))

    if (!animationId) {
      currentScroll = window.pageYOffset
      animationId = requestAnimationFrame(smoothScrollAnimation)
    }
  }

  const handleKeyDown = (e) => {
    const keys = {
      38: -100, // Arrow Up
      40: 100,  // Arrow Down
      33: -window.innerHeight * 0.9, // Page Up
      34: window.innerHeight * 0.9,  // Page Down
      36: -document.body.scrollHeight, // Home
      35: document.body.scrollHeight   // End
    }

    if (keys[e.keyCode]) {
      e.preventDefault()
      targetScroll += keys[e.keyCode]
      targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight))

      if (!animationId) {
        currentScroll = window.pageYOffset
        animationId = requestAnimationFrame(smoothScrollAnimation)
      }
    }
  }

  const init = () => {
    // Проверяем, не мобильное ли устройство
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    if (!isMobile) {
      document.addEventListener('wheel', handleWheel, { passive: false })
      document.addEventListener('keydown', handleKeyDown)

      // Инициализация начальных значений
      currentScroll = window.pageYOffset
      targetScroll = window.pageYOffset
    }
  }

  const destroy = () => {
    document.removeEventListener('wheel', handleWheel)
    document.removeEventListener('keydown', handleKeyDown)
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
  }

  onMounted(() => {
    init()
  })

  onUnmounted(() => {
    destroy()
  })

  return {
    scrollToPosition: (position) => {
      targetScroll = position
      if (!animationId) {
        currentScroll = window.pageYOffset
        animationId = requestAnimationFrame(smoothScrollAnimation)
      }
    }
  }
}