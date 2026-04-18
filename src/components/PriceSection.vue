<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePriceStore } from '@/stores/price';

const isVisible = ref(false);
const priceStore = usePriceStore();

// 获取价格数据
const priceData = computed(() => priceStore.getAllPrices);
const priceRange = computed(() => priceStore.getPriceRange);
const todayPrice = computed(() => priceStore.getTodayPrice);

// 计算每个价格对应的Y坐标
const getYCoordinate = (price) => {
  const { min, max } = priceRange.value;
  const range = max - min;
  return 100 - ((price - min) / range) * 100;
};

// 生成L华北煤制价格路径
const chartPathLHuabei = computed(() => {
  if (priceData.value.length === 0) return '';
  
  const stepX = 90 / (priceData.value.length - 1); // 90% width for data
  let path = '';
  
  priceData.value.forEach((item, index) => {
    const x = (5 + index * stepX).toFixed(2); // 5% left margin
    const y = (10 + (getYCoordinate(item.L_huabei) * 0.7)).toFixed(2); // 10% top margin, 70% height for data
    if (index === 0) {
      path += `M ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
    }
  });
  
  return path;
});

// 生成L期货主力价格路径
const chartPathLFutures = computed(() => {
  if (priceData.value.length === 0) return '';
  
  const stepX = 90 / (priceData.value.length - 1); // 90% width for data
  let path = '';
  
  priceData.value.forEach((item, index) => {
    const x = (5 + index * stepX).toFixed(2); // 5% left margin
    const y = (10 + (getYCoordinate(item.L_futures) * 0.7)).toFixed(2); // 10% top margin, 70% height for data
    if (index === 0) {
      path += `M ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
    }
  });
  
  return path;
});

// 生成PP华东煤制价格路径
const chartPathPPHuadong = computed(() => {
  if (priceData.value.length === 0) return '';
  
  const stepX = 90 / (priceData.value.length - 1); // 90% width for data
  let path = '';
  
  priceData.value.forEach((item, index) => {
    const x = (5 + index * stepX).toFixed(2); // 5% left margin
    const y = (10 + (getYCoordinate(item.PP_huadong) * 0.7)).toFixed(2); // 10% top margin, 70% height for data
    if (index === 0) {
      path += `M ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
    }
  });
  
  return path;
});

// 生成PP期货主力价格路径
const chartPathPPFutures = computed(() => {
  if (priceData.value.length === 0) return '';
  
  const stepX = 90 / (priceData.value.length - 1); // 90% width for data
  let path = '';
  
  priceData.value.forEach((item, index) => {
    const x = (5 + index * stepX).toFixed(2); // 5% left margin
    const y = (10 + (getYCoordinate(item.PP_futures) * 0.7)).toFixed(2); // 10% top margin, 70% height for data
    if (index === 0) {
      path += `M ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
    }
  });
  
  return path;
});

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <section class="price-section" :class="{ 'is-visible': isVisible }">
    <div class="container">
      <div class="price-header">
        <h2 class="section-title">今日价格行情</h2>
        <a href="https://quote.21cp.com/?byjpc" target="_blank" class="view-more">查看更多 ></a>
      </div>
      
      <div class="price-content">
        <div class="price-table">
          <div class="price-item">
            <div class="price-label">聚乙烯(PE)</div>
            <div class="price-value">{{ todayPrice.PE }}</div>
          </div>
          <div class="price-item">
            <div class="price-label">聚丙烯</div>
            <div class="price-value">{{ todayPrice.PP }}</div>
          </div>
          <div class="price-item">
            <div class="price-label">乙二醇</div>
            <div class="price-value">{{ todayPrice.EG }}</div>
          </div>
          <div class="price-item">
            <div class="price-label">苯乙烯</div>
            <div class="price-value">{{ todayPrice.SM }}</div>
          </div>
        </div>
        
        <div class="price-chart">
          <div class="chart-container">
            <img src="@/assets/price-chart.png" alt="煤制价格及期货主力价格走势" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.price-section {
  padding: 40px 0;
  background: white;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease;
  margin: 20px auto;
  max-width: 1200px;
  border: 1px solid #dcdcdd;
}

.price-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
}

.price-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dcdcdd;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #231815;
  margin: 0;
  font-family: 'Courier New', monospace;
}

.view-more {
  color: #e60012;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.view-more:hover {
  color: #b60005;
}

.price-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
}

.price-table {
  background: #dedddd;
  padding: 20px;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
}

.price-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #dcdcdd;
}

.price-item:last-child {
  border-bottom: none;
}

.price-label {
  font-weight: 500;
  color: #595757;
}

.price-value {
  font-weight: bold;
  color: #231815;
}

.price-chart {
  background: #dedddd;
  padding: 20px;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
}

.chart-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #595757;
  margin-bottom: 15px;
}

.chart-container {
  height: 400px;
  position: relative;
  background: #dedddd;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  overflow: hidden;
}



@media (max-width: 768px) {
  .price-content {
    grid-template-columns: 1fr;
  }
  
  .price-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .chart-container {
    height: 150px;
  }
}
</style>