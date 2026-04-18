<script setup>
import { ref, onMounted } from 'vue';

const text = 'FinAlgo平台为年轻用户和金融商务人士提供专业的金融算法工具，帮助您做出更明智的金融决策。我们的平台集成了先进的AI技术，为您提供精准的数据分析和预测，让金融分析变得简单高效。';
const displayText = ref('');
const isTyping = ref(true);
const currentIndex = ref(0);

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
  typeWriter();
});

const typeWriter = () => {
  if (currentIndex.value < text.length) {
    displayText.value += text.charAt(currentIndex.value);
    currentIndex.value++;
    setTimeout(typeWriter, 50);
  } else {
    isTyping.value = false;
  }
};
</script>

<template>
  <section class="feature-section" :class="{ 'is-visible': isVisible }">
    <div class="container">
      <div class="feature-content">
        <div class="feature-text">
          <h2 class="section-title">平台特色</h2>
          <p class="typewriter-text">
            {{ displayText }}
            <span class="cursor" v-if="isTyping">|</span>
          </p>
          <ul class="feature-list">
            <li class="feature-item">
              <span class="feature-check">✓</span>
              <span>先进的AI算法技术</span>
            </li>
            <li class="feature-item">
              <span class="feature-check">✓</span>
              <span>实时市场数据更新</span>
            </li>
            <li class="feature-item">
              <span class="feature-check">✓</span>
              <span>个性化金融分析</span>
            </li>
            <li class="feature-item">
              <span class="feature-check">✓</span>
              <span>专业的投资建议</span>
            </li>
            <li class="feature-item">
              <span class="feature-check">✓</span>
              <span>用户友好的界面设计</span>
            </li>
          </ul>
          <button class="btn btn-primary">了解更多</button>
        </div>
        <div class="feature-image">
          <div class="image-container">
            <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20financial%20technology%20dashboard%20with%20charts%20and%20data%20visualization&image_size=landscape_16_9" alt="金融技术仪表盘" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-section {
  padding: 100px 0;
  background: #dedddd;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease;
  margin: 20px auto;
  max-width: 1200px;
  border: 1px solid #dcdcdd;
}

.feature-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.feature-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.section-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}

.typewriter-text {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;
  white-space: pre-line;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  background: #d4af37;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 2.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #333;
}

.feature-check {
  color: #d4af37;
  font-weight: bold;
  margin-right: 1rem;
  font-size: 1.2rem;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1.1rem;
  font-family: inherit;
}

.btn-primary {
  background: #d4af37;
  color: white;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

.btn-primary:hover {
  background: #b8942f;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(212, 175, 55, 0.4);
}

.feature-image {
  position: relative;
}

.image-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  transform: rotate(2deg);
  transition: all 0.3s ease;
  background: #dedddd;
  padding: 20px;
}

.image-container:hover {
  transform: rotate(0deg) scale(1.05);
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
}

@media (max-width: 992px) {
  .feature-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .feature-image {
    order: -1;
  }
}

@media (max-width: 768px) {
  .feature-section {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .typewriter-text {
    font-size: 1rem;
  }
  
  .feature-item {
    font-size: 1rem;
  }
}
</style>