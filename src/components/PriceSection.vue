<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePriceStore } from '@/stores/price';

const isVisible = ref(false);
const priceStore = usePriceStore();

// 价格数据模拟
const priceData = ref({
  pp: {
    today: 8950,
    change: -50,
    changePercent: -0.55,
    yesterday: 9000,
    weekAgo: 9100,
    monthAgo: 9200
  },
  pe: {
    today: 9200,
    change: 30,
    changePercent: 0.33,
    yesterday: 9170,
    weekAgo: 9150,
    monthAgo: 9000
  },
  eg: {
    today: 5200,
    change: -20,
    changePercent: -0.38,
    yesterday: 5220,
    weekAgo: 5250,
    monthAgo: 5300
  },
  sm: {
    today: 7800,
    change: 50,
    changePercent: 0.64,
    yesterday: 7750,
    weekAgo: 7700,
    monthAgo: 7600
  }
});

// 模拟价格更新
const updatePrices = () => {
  // 随机生成价格变化
  const updatePrice = (currentPrice) => {
    const change = Math.floor(Math.random() * 100) - 50; // -50 到 49 的随机数
    return Math.max(0, currentPrice + change);
  };
  
  priceData.value = {
    pp: {
      ...priceData.value.pp,
      today: updatePrice(priceData.value.pp.today),
      change: priceData.value.pp.today - priceData.value.pp.yesterday,
      changePercent: ((priceData.value.pp.today - priceData.value.pp.yesterday) / priceData.value.pp.yesterday * 100).toFixed(2)
    },
    pe: {
      ...priceData.value.pe,
      today: updatePrice(priceData.value.pe.today),
      change: priceData.value.pe.today - priceData.value.pe.yesterday,
      changePercent: ((priceData.value.pe.today - priceData.value.pe.yesterday) / priceData.value.pe.yesterday * 100).toFixed(2)
    },
    eg: {
      ...priceData.value.eg,
      today: updatePrice(priceData.value.eg.today),
      change: priceData.value.eg.today - priceData.value.eg.yesterday,
      changePercent: ((priceData.value.eg.today - priceData.value.eg.yesterday) / priceData.value.eg.yesterday * 100).toFixed(2)
    },
    sm: {
      ...priceData.value.sm,
      today: updatePrice(priceData.value.sm.today),
      change: priceData.value.sm.today - priceData.value.sm.yesterday,
      changePercent: ((priceData.value.sm.today - priceData.value.sm.yesterday) / priceData.value.sm.yesterday * 100).toFixed(2)
    }
  };
};

// 定时更新价格
onMounted(() => {
  isVisible.value = true;
  
  // 每30秒更新一次价格
  setInterval(updatePrices, 30000);
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
            <div class="price-value">{{ priceData.pe.today }}</div>
            <div class="price-change" :class="{ 'positive': priceData.pe.change >= 0, 'negative': priceData.pe.change < 0 }">
              {{ priceData.pe.change >= 0 ? '+' : '' }}{{ priceData.pe.change }} ({{ priceData.pe.changePercent }}%)
            </div>
          </div>
          <div class="price-item">
            <div class="price-label">聚丙烯</div>
            <div class="price-value">{{ priceData.pp.today }}</div>
            <div class="price-change" :class="{ 'positive': priceData.pp.change >= 0, 'negative': priceData.pp.change < 0 }">
              {{ priceData.pp.change >= 0 ? '+' : '' }}{{ priceData.pp.change }} ({{ priceData.pp.changePercent }}%)
            </div>
          </div>
          <div class="price-item">
            <div class="price-label">乙二醇</div>
            <div class="price-value">{{ priceData.eg.today }}</div>
            <div class="price-change" :class="{ 'positive': priceData.eg.change >= 0, 'negative': priceData.eg.change < 0 }">
              {{ priceData.eg.change >= 0 ? '+' : '' }}{{ priceData.eg.change }} ({{ priceData.eg.changePercent }}%)
            </div>
          </div>
          <div class="price-item">
            <div class="price-label">苯乙烯</div>
            <div class="price-value">{{ priceData.sm.today }}</div>
            <div class="price-change" :class="{ 'positive': priceData.sm.change >= 0, 'negative': priceData.sm.change < 0 }">
              {{ priceData.sm.change >= 0 ? '+' : '' }}{{ priceData.sm.change }} ({{ priceData.sm.changePercent }}%)
            </div>
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
  flex-direction: column;
  padding: 15px 0;
  border-bottom: 1px solid #dcdcdd;
}

.price-label {
  font-weight: 500;
  color: #595757;
  margin-bottom: 5px;
}

.price-value {
  font-weight: bold;
  color: #231815;
  font-size: 1.1rem;
}

.price-change {
  font-size: 0.8rem;
  margin-top: 5px;
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

.price-change {
  font-size: 0.8rem;
  margin-top: 5px;
}

.price-change.positive {
  color: #4caf50;
}

.price-change.negative {
  color: #f44336;
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