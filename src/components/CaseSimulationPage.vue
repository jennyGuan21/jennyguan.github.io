<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToCaseDetail = () => {
  router.push('/case-detail')
}
</script>

<template>
  <div class="case-simulation-page">
    <div class="case-simulation-container">
      <h1 class="page-title">案例模拟界面</h1>
      
      <div class="case-section">
        <h2 class="section-title">目前可能产生的极端情况</h2>
        <div class="case-buttons">
          <button class="case-btn" @click="navigateToCaseDetail">极端上涨</button>
          <button class="case-btn" @click="navigateToCaseDetail">极端下跌</button>
          <button class="case-btn" @click="navigateToCaseDetail">大幅振荡</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.case-simulation-page {
  min-height: 100vh;
  background: #e60012;
  padding: 80px 20px 40px;
}

.case-simulation-container {
  max-width: 1000px;
  margin: 0 auto;
  background: #dedddd;
  border: 2px solid #595757;
  border-radius: 4px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.page-title {
  text-align: center;
  color: #231815;
  margin-bottom: 60px;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.case-section {
  margin-top: 40px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 40px;
  font-family: 'Courier New', monospace;
  text-align: center;
}

.case-buttons {
  display: flex;
  justify-content: space-around;
  gap: 30px;
  margin-top: 40px;
}

.case-btn {
  flex: 1;
  max-width: 200px;
  padding: 20px;
  background: white;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.case-btn:hover {
  background: #231815;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .case-simulation-container {
    padding: 30px 20px;
  }
  
  .case-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .case-btn {
    width: 100%;
    max-width: 250px;
  }
}
</style>
