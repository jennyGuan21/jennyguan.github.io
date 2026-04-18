<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToCalculation = () => {
  router.push('/calculation')
}
</script>

<template>
  <div class="case-detail-page">
    <div class="case-detail-container">
      <div class="content">
        <div class="form-section">
          <div class="form-item">
            <label>适用产品：</label>
            <div class="form-input"></div>
          </div>
          <div class="form-item">
            <label>核心风险：</label>
            <div class="form-input"></div>
          </div>
        </div>
        
        <div class="case-content">
          <div class="case-box"></div>
          <div class="case-box"></div>
          <div class="case-box"></div>
          <div class="case-box"></div>
        </div>
        
        <div class="disclaimer-section">
          <div class="disclaimer-box">
            <p>免责声明</p>
          </div>
        </div>
        
        <div class="risk-detection">
          <button class="risk-btn" @click="navigateToCalculation">我的风险检测</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.case-detail-page {
  min-height: 100vh;
  background: #e60012;
  padding: 80px 20px 40px;
}

.case-detail-container {
  max-width: 1000px;
  margin: 0 auto;
  background: #dedddd;
  border: 2px solid #595757;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.content {
  background: white;
  border: 1px solid #595757;
  border-radius: 4px;
  padding: 20px;
  min-height: 600px;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.form-item {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 10px;
  align-items: center;
  border: 1px solid #595757;
  padding: 10px;
}

.form-item label {
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
  white-space: nowrap;
}

.form-input {
  height: 30px;
  border: 1px solid #595757;
  border-radius: 4px;
}

.case-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
  border: 1px solid #595757;
  padding: 20px;
}

.case-box {
  border: 1px solid #595757;
  min-height: 200px;
}

.disclaimer-section {
  margin-bottom: 30px;
  border: 1px solid #595757;
  padding: 10px;
}

.disclaimer-box {
  border: 1px solid #595757;
  padding: 10px;
}

.disclaimer-box p {
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
  margin: 0;
}

.risk-detection {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.risk-btn {
  padding: 12px 30px;
  background: white;
  color: #231815;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.risk-btn:hover {
  background: #595757;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(89, 87, 87, 0.3);
}

@media (max-width: 768px) {
  .case-detail-container {
    padding: 20px 15px;
  }
  
  .form-item {
    grid-template-columns: 1fr;
  }
  
  .case-content {
    grid-template-columns: 1fr;
  }
}
</style>
