<script setup>
import { ref, onMounted } from 'vue';

const features = [
  {
    title: '智能算法分析',
    description: '利用先进的AI算法，为您提供精准的金融数据分析和预测',
    icon: '📊'
  },
  {
    title: '数据可视化',
    description: '将复杂的金融数据转化为直观的图表，帮助您快速理解市场趋势',
    icon: '📈'
  },
  {
    title: '投资组合管理',
    description: '智能管理您的投资组合，优化资产配置，降低风险',
    icon: '💼'
  },
  {
    title: '实时市场监控',
    description: '实时监控全球金融市场动态，及时把握投资机会',
    icon: '🌍'
  }
];

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <section class="core-features" :class="{ 'is-visible': isVisible }">
    <div class="container">
      <h2 class="section-title">核心功能</h2>
      <p class="section-subtitle">我们提供四大核心功能，满足您的金融分析需求</p>
      
      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="feature-card"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="paper-effect">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.core-features {
  padding: 100px 0;
  background: white;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease;
}

.core-features.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: #666;
  text-align: center;
  margin-bottom: 4rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  perspective: 1000px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

.paper-effect {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
}

.paper-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #d4af37, #f0d98c);
}

.paper-effect:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
  animation: float 3s ease-in-out infinite;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.feature-description {
  color: #666;
  line-height: 1.6;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .core-features {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .paper-effect {
    padding: 2rem;
  }
}
</style>