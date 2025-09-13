<template>
  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top py-3" :class="{ 'navbar-visible': isScrolled }">
    <div class="container-fluid px-2">
      <a class="navbar-brand" href="#">
        <span style="color: var(--accent-pink);">DIGITAL</span>UNION
      </a>

      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Product</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Service</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
        </ul>

        <div class="d-flex">
          <button class="btn btn-login">Login</button>
          <button class="btn btn-signup">Sign up</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Header',
  setup() {
    const isScrolled = ref(false)
    const isMobile = ref(false)
    
    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768
    }
    
    const handleScroll = () => {
      if (isMobile.value) {
        isScrolled.value = true // На мобильных всегда показываем навбар
      } else {
        isScrolled.value = window.scrollY > 50 // На десктопе только при скролле
      }
    }
    
    const handleResize = () => {
      checkMobile()
      handleScroll()
    }
    
    const handleClickOutside = (event) => {
      const navbar = document.querySelector('.navbar-collapse')
      const toggler = document.querySelector('.navbar-toggler')
      
      if (navbar && toggler && !navbar.contains(event.target) && !toggler.contains(event.target)) {
        if (navbar.classList.contains('show')) {
          toggler.click()
        }
      }
    }
    
    onMounted(() => {
      checkMobile()
      handleScroll()
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleResize)
      document.addEventListener('click', handleClickOutside)
    })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('click', handleClickOutside)
    })
    
    return {
      isScrolled,
      isMobile
    }
  }
}
</script>

<style scoped>
/* ===== NAVBAR ===== */
.navbar {
  height: 80px;
  background: transparent;
  backdrop-filter: none;
  transform: translateY(-100%);
  transition: all 0.3s ease;
}

.navbar-visible {
  background: rgba(31, 31, 46, 0.9);
  backdrop-filter: blur(10px);
  transform: translateY(0);
}

/* Burger кнопка */
.navbar-toggler {
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 4px 8px;
}

.navbar-toggler:focus {
  box-shadow: none;
  outline: none;
}

.navbar-toggler:active {
  box-shadow: none;
  outline: none;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='m4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  width: 20px;
  height: 20px;
}

/* Показываем burger только на маленьких экранах */
@media (min-width: 992px) {
  .navbar-toggler {
    display: none !important;
  }
}

/* Фон для выпадающего меню на мобильных */
@media (max-width: 991px) {
  .navbar-collapse {
    background: rgba(31, 31, 46, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 10px;
    margin-top: 10px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .navbar-nav {
    margin-bottom: 15px;
  }
  
  .navbar-nav .nav-link {
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .navbar-nav .nav-item:last-child .nav-link {
    border-bottom: none;
  }
  
  .d-flex {
    flex-direction: column;
    gap: 10px;
  }
  
  .btn-login, .btn-signup {
    width: 100%;
    text-align: center;
    margin-left: 0 !important;
  }
}

.navbar-brand {
  font-family: "Mulish", sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  color: white !important;
}

.navbar-nav .nav-link {
  font-family: "Mulish", sans-serif;
  font-weight: 300;
  color: white !important;
  margin: 0 10px;
}

.navbar-nav .nav-link:hover {
  opacity: 0.8;
}

.btn-login {
  font-family: "Mulish", sans-serif;
  font-weight: 300;
  color: white;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-login:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.btn-signup {
  font-family: "Mulish", sans-serif;
  font-weight: 600;
  background: var(--accent-green);
  color: #1f1f2e;
  border: none;
  padding: 8px 20px;
  border-radius: 25px;
  margin-left: 10px;
  transition: all 0.3s ease;
}

.btn-signup:hover {
  background: #c3d63a;
  color: #1f1f2e;
}
</style>