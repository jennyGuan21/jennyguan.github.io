<script setup>
import { ref, onMounted } from 'vue';

const tools = [
  {
    title: '股票预测算法',
    description: '基于机器学习的股票价格预测工具，帮助您做出更明智的投资决策',
    icon: '📊',
    category: '投资分析'
  },
  {
    title: '风险评估工具',
    description: '全面评估投资组合的风险水平，提供风险控制建议',
    icon: '⚠️',
    category: '风险管理'
  },
  {
    title: '财务规划计算器',
    description: '根据您的财务状况，制定个性化的财务规划方案',
    icon: '💰',
    category: '个人理财'
  },
  {
    title: '市场情绪分析',
    description: '分析市场情绪，预测市场趋势，把握投资时机',
    icon: '😃',
    category: '市场分析'
  },
  {
    title: '外汇交易助手',
    description: '提供实时外汇行情和交易建议，优化外汇交易策略',
    icon: '💱',
    category: '外汇交易'
  },
  {
    title: '加密货币分析',
    description: '分析加密货币市场，提供投资建议和趋势预测',
    icon: '🔒',
    category: '加密货币'
  }
];

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <section class="tools-section" :class="{ 'is-visible': isVisible }">
    <div class="container">
      <h2 class="section-title">算法工具</h2>
      <p class="section-subtitle">我们提供多种专业的金融算法工具，满足不同用户的需求</p>
      
      <div class="tools-grid">
        <div 
          v-for="(tool, index) in tools" 
          :key="index"
          class="tool-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="tool-icon">{{ tool.icon }}</div>
          <div class="tool-category">{{ tool.category }}</div>
          <h3 class="tool-title">{{ tool.title }}</h3>
          <p class="tool-description">{{ tool.description }}</p>
          <button class="btn btn-primary">立即使用</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tools-section {
  padding: 100px 0;
  background: #f8f9fa;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease;
}

.tools-section.is-visible {
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

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.tool-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s ease forwards;
}

.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #d4af37, #f0d98c);
}

.tool-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.tool-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
}

.tool-category {
  background: #f0d98c;
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
}

.tool-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.tool-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.btn {
  padding: 0.5rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
}

.btn-primary {
  background: #d4af37;
  color: white;
  width: 100%;
}

.btn-primary:hover {
  background: #b8942f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .tools-section {
    padding: 60px 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .tool-card {
    padding: 1.5rem;
  }
}
</style>