import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const observeElements = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in')
    animatedElements.forEach(element => {
      observer.observe(element)
    })

    return observer
  }

  let observer = null

  onMounted(() => {
    setTimeout(() => {
      observer = observeElements()
    }, 100)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}