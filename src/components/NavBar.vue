<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false);
const router = useRouter();

const navigateToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <a href="#" class="logo">
          <span class="logo-text">稳链护行</span>
        </a>
      </div>
      
      <div class="navbar-menu" :class="{ 'is-open': isMenuOpen }">
        <ul class="navbar-links">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/product-center">产品中心</router-link></li>
          <li><router-link to="/calculation">智能测算</router-link></li>
          <li><router-link to="/case-simulation">案例模拟</router-link></li>
        </ul>
        
        <div class="navbar-actions">
          <button class="btn btn-primary" @click="navigateToLogin">用户中心</button>
        </div>
      </div>
      
      <button class="navbar-toggle" @click="isMenuOpen = !isMenuOpen">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #231815;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.navbar-brand .logo {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}

.navbar-menu {
  display: flex;
  align-items: center;
}

.navbar-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.navbar-links a,
.navbar-links router-link {
  text-decoration: none;
  color: white;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  display: inline-block;
}

.navbar-links a:hover,
.navbar-links router-link:hover {
  color: #c6a86f;
}

.navbar-links a::after,
.navbar-links router-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: #c6a86f;
  transition: width 0.3s ease;
}

.navbar-links a:hover::after,
.navbar-links router-link:hover::after {
  width: 100%;
}

.navbar-actions {
  margin-left: 2rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
}

.btn-primary {
  background: #e60012;
  color: white;
}

.btn-primary:hover {
  background: #b60005;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(230, 0, 18, 0.3);
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.navbar-toggle span {
  display: block;
  width: 100%;
  height: 3px;
  background: white;
  border-radius: 3px;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .navbar-toggle {
    display: flex;
  }
  
  .navbar-menu {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #231815;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }
  
  .navbar-menu.is-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .navbar-links {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .navbar-actions {
    margin-left: 0;
  }
}
</style>