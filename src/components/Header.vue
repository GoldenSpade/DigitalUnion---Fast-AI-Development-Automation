<template>
  <!-- Navigation -->
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top py-3" :class="{ 'navbar-visible': isScrolled }">
    <div class="container">
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
    
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 50
    }
    
    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
    
    return {
      isScrolled
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