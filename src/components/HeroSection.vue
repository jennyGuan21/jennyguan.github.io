<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import hero1 from '../assets/hero-1.jpg';
import hero2 from '../assets/hero-2.jpg';
import hero3 from '../assets/hero-3.jpg';

const isVisible = ref(false);
const currentSlide = ref(0);
const intervalId = ref(null);

// 图片列表，用户需要将这些图片放在 src/assets/ 目录下
const slides = [
  {
    image: hero1, // 四联创业集团展会照片
    title: '聚烯烃产业金融风控平台',
    subtitle: '稳定的供应链，为每一次护航',
    description: '为聚烯烃产业链客户提供专业的风险管理服务'
  },
  {
    image: hero2, // 四联创业喜报
    title: '四联创业喜报',
    subtitle: '连续5年荣登中国民企500强榜单',
    description: '专业的风险管理服务提供商'
  },
  {
    image: hero3, // 四联创业办公大楼
    title: '聚烯烃产业金融风控平台',
    subtitle: '稳定的供应链，为每一次护航',
    description: '为聚烯烃产业链客户提供专业的风险管理服务'
  }
];

onMounted(() => {
  isVisible.value = true;
  // 自动轮播
  startAutoSlide();
});

onUnmounted(() => {
  // 清理定时器
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});

const startAutoSlide = () => {
  intervalId.value = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  }, 5000);
};

const goToSlide = (index) => {
  currentSlide.value = index;
  // 重置自动轮播
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
  startAutoSlide();
};
</script>

<template>
  <section class="hero" :class="{ 'is-visible': isVisible }">
    <div class="carousel-container">
      <div class="carousel-slides">
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="carousel-slide"
          :class="{ active: currentSlide === index }"
        >
          <img :src="slide.image" :alt="slide.title" class="slide-image" />
          <div class="slide-content">
            <h1 class="hero-title">{{ slide.title }}</h1>
            <p class="hero-subtitle">{{ slide.subtitle }}</p>
            <p class="hero-description">{{ slide.description }}</p>
          </div>
        </div>
      </div>
      
      <div class="carousel-dots">
        <span 
          v-for="(slide, index) in slides" 
          :key="index"
          class="dot"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
      
      <button class="carousel-arrow prev" @click="goToSlide((currentSlide - 1 + slides.length) % slides.length)">
        ←
      </button>
      <button class="carousel-arrow next" @click="goToSlide((currentSlide + 1) % slides.length)">
        →
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 500px;
  margin: 60px auto 0;
  max-width: 1200px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease;
  border: 1px solid #dcdcdd;
  background: #c6a86f;
}

.hero.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.carousel-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.carousel-slides {
  position: relative;
  height: 100%;
  width: 100%;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease, transform 0.5s ease;
  transform: scale(0.95);
}

.carousel-slide.active {
  opacity: 1;
  transform: scale(1);
  z-index: 1;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
  padding: 30px;
  border-radius: 4px;
  max-width: 800px;
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

.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #dcdcdd;
  transition: all 0.3s ease;
  cursor: pointer;
}

.dot.active {
  background: #e60012;
  width: 12px;
  height: 12px;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;
}

.carousel-arrow:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.carousel-arrow.prev {
  left: 20px;
}

.carousel-arrow.next {
  right: 20px;
}

@media (max-width: 768px) {
  .hero {
    height: 400px;
    margin-top: 60px;
  }
  
  .slide-content {
    padding: 20px;
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
  
  .carousel-arrow {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  
  .carousel-arrow.prev {
    left: 10px;
  }
  
  .carousel-arrow.next {
    right: 10px;
  }
}
</style>