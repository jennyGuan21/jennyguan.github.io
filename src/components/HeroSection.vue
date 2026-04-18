<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <section class="hero" :class="{ 'is-visible': isVisible }">
    <div class="ink-blob ink-blob-1"></div>
    <div class="ink-blob ink-blob-2"></div>
    <div class="ink-blob ink-blob-3"></div>
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">
          聚烯烃产业金融风控平台
        </h1>
        <p class="hero-subtitle">
          稳定的供应链，为每一次护航
        </p>
        <p class="hero-description">
          为聚烯烃产业链客户提供专业的风险管理服务
        </p>
        <div class="hero-dots">
          <span class="dot active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  border: 1px solid #dcdcdd;
  margin: 60px auto 0;
  max-width: 1200px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease;
}

.ink-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: float 8s ease-in-out infinite;
}

.ink-blob-1 {
  width: 400px;
  height: 400px;
  background: #b60005;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.ink-blob-2 {
  width: 300px;
  height: 300px;
  background: #ee7800;
  bottom: -50px;
  right: -50px;
  animation-delay: 2s;
}

.ink-blob-3 {
  width: 200px;
  height: 200px;
  background: #fabe00;
  top: 50%;
  right: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

.hero.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #c6a86f;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-weight: bold;
}

.hero-description {
  font-size: 1.2rem;
  color: #b60005;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  font-weight: bold;
}

.hero-dots {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 2rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dcdcdd;
  transition: all 0.3s ease;
}

.dot.active {
  background: #e60012;
  width: 12px;
  height: 12px;
}

@media (max-width: 768px) {
  .hero {
    height: 400px;
    margin-top: 60px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-description {
    font-size: 0.9rem;
  }
}
</style>