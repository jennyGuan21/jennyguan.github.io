<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(false);

onMounted(() => {
  isVisible.value = true;
});
</script>

<template>
  <section class="product-section" :class="{ 'is-visible': isVisible }">
    <div class="container">
      <div class="section-header">
          <h2 class="section-title">含权贸易产品</h2>
          <a href="#/product-center" class="view-all">查看全部</a>
        </div>
      
      <div class="product-grid">
        <div class="product-card blue">
          <div class="product-header">
            <h3 class="product-title">保价采购</h3>
          </div>
          <div class="product-content">
            <p class="product-description">
              为你在采购提供价格保护，锁定原材料成本，在价格上涨时仍能以约定价格采购，规避价格上涨的风险。
            </p>
            <a href="#" class="product-link">了解详情 ></a>
          </div>
        </div>
        
        <div class="product-card red">
          <div class="product-header">
            <h3 class="product-title">封顶销售</h3>
          </div>
          <div class="product-content">
            <p class="product-description">
              为生产户提供价格保护，锁定销售价格上限，在价格下跌时仍能以约定价格销售，同时保留价格上涨时的收益机会。
            </p>
            <a href="#" class="product-link">了解详情 ></a>
          </div>
        </div>
        
        <div class="product-card green">
          <div class="product-header">
            <h3 class="product-title">区间购销</h3>
          </div>
          <div class="product-content">
            <p class="product-description">
              在约定价格区间内享受更优惠的价格，既规避了价格大幅波动的风险，又能在区间内获得更好的成本优势。
            </p>
            <a href="#" class="product-link">了解详情 ></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-section {
  padding: 40px 0;
  background: white;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease;
  margin: 20px auto;
  max-width: 1200px;
  border: 1px solid #dcdcdd;
}

.product-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.view-all {
  color: #e60012;
  text-decoration: none;
  font-weight: 500;
  font-family: 'Courier New', monospace;
  transition: color 0.3s ease;
}

.view-all:hover {
  color: #b60005;
  text-decoration: underline;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  transform-style: preserve-3d;
  animation: float 6s ease-in-out infinite;
}

.product-card:nth-child(1) {
  animation-delay: 0s;
}

.product-card:nth-child(2) {
  animation-delay: 2s;
}

.product-card:nth-child(3) {
  animation-delay: 4s;
}

.product-card:hover {
  transform: translateY(-5px) rotateX(5deg) rotateY(5deg);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotateX(0) rotateY(0);
  }
  33% {
    transform: translateY(-10px) rotateX(2deg) rotateY(2deg);
  }
  66% {
    transform: translateY(5px) rotateX(-2deg) rotateY(-2deg);
  }
}

.product-card.blue .product-header {
  background: #b60005;
  color: white;
  padding: 15px;
}

.product-card.red .product-header {
  background: #ee7800;
  color: white;
  padding: 15px;
}

.product-card.green .product-header {
  background: #fabe00;
  color: white;
  padding: 15px;
}

.product-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}

.product-content {
  padding: 20px;
  background: #dedddd;
}

.product-description {
  color: #595757;
  line-height: 1.6;
  margin-bottom: 20px;
}

.product-link {
  color: #e60012;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.product-link:hover {
  color: #b60005;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>