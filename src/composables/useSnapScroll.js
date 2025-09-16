import { onMounted, onUnmounted, ref } from 'vue'

export function useSnapScroll() {
  const currentSection = ref(0)
  const sections = ref([])

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

  const updateCurrentSection = () => {
    currentSection.value = findClosestSection()
  }

  const init = () => {
    sections.value = [
      document.querySelector('#home'),
      document.querySelector('#services'),
      document.querySelector('#process'),
      document.querySelector('#platforms'),
      document.querySelector('#cases'),
      document.querySelector('#testimonials'),
      document.querySelector('#contact')
    ].filter(Boolean)

    currentSection.value = findClosestSection()

    window.addEventListener('scroll', updateCurrentSection)
  }

  const destroy = () => {
    window.removeEventListener('scroll', updateCurrentSection)
  }

  onMounted(() => {
    setTimeout(init, 100)
  })

  onUnmounted(() => {
    destroy()
  })

  return {
    currentSection
  }
}