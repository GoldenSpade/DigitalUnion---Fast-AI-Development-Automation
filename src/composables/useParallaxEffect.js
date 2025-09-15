import { onMounted, onUnmounted } from 'vue'

export function useParallaxEffect() {
  const handleScroll = () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll('.parallax')

    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })

    const floatingElements = document.querySelectorAll('.float-on-scroll')
    floatingElements.forEach(element => {
      const speed = element.dataset.floatSpeed || 0.1
      const yPos = Math.sin(scrolled * 0.001) * 20
      const xPos = Math.cos(scrolled * 0.001) * 10
      element.style.transform = `translate(${xPos}px, ${yPos}px)`
    })
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
}