<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const activeStep = ref(1)
const businessRole = ref('采购方')
const variety = ref('PE')
const estimatedQuantity = ref('50-5000吨')
const planPeriod = ref('7天')
const coreDemand = ref('担心价格上涨')
const pricePreference = ref('中等')

const router = useRouter()

const handleGeneratePlan = () => {
  // 方案生成逻辑
  console.log('生成方案:', {
    businessRole: businessRole.value,
    variety: variety.value,
    estimatedQuantity: estimatedQuantity.value,
    planPeriod: planPeriod.value,
    coreDemand: coreDemand.value,
    pricePreference: pricePreference.value
  })
  // 跳转到过渡页
  router.push('/transition')
}
</script>

<template>
  <div class="calculation-page">
    <div class="calculation-container">
      <h1 class="page-title">智能测算</h1>
      
      <div class="step-navigation">
        <div class="step-box active">基本信息</div>
        <div class="arrow">→</div>
        <div class="step-box">方案生成</div>
        <div class="arrow">→</div>
        <div class="step-box">方案详情</div>
      </div>
      
      <div class="step-indicator">
        <div class="indicator-arrow">↓</div>
      </div>
      
      <div class="form-section">
        <p class="form-note">以下都是下拉选项</p>
        
        <div class="form-row">
          <div class="form-group">
            <label>业务角色：</label>
            <select v-model="businessRole" class="form-select">
              <option value="采购方">采购方</option>
              <option value="销售方">销售方</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>品种：</label>
            <select v-model="variety" class="form-select">
              <option value="PE">PE</option>
              <option value="PP">PP</option>
            </select>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label>预计数量：</label>
            <select v-model="estimatedQuantity" class="form-select">
              <option value="50-5000吨">50-5000吨</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>计划周期：</label>
            <select v-model="planPeriod" class="form-select">
              <option value="7天">7天</option>
              <option value="30天">30天</option>
              <option value="60天">60天</option>
            </select>
          </div>
        </div>
        
        <div class="core-demand-section">
          <h3>核心诉求</h3>
          <div class="demand-options">
            <div 
              class="demand-option" 
              :class="{ active: coreDemand === '担心价格上涨' }"
              @click="coreDemand = '担心价格上涨'"
            >
              担心价格上涨
            </div>
            <div 
              class="demand-option" 
              :class="{ active: coreDemand === '担心价格下跌' }"
              @click="coreDemand = '担心价格下跌'"
            >
              担心价格下跌
            </div>
            <div 
              class="demand-option" 
              :class="{ active: coreDemand === '希望价格稳定' }"
              @click="coreDemand = '希望价格稳定'"
            >
              希望价格稳定
            </div>
          </div>
        </div>
        
        <div class="price-preference-section">
          <h3>目标价格偏好</h3>
          <div class="price-slider">
            <div class="slider-track">
              <div 
                class="slider-thumb" 
                :class="{ active: pricePreference === '偏低' }"
                @click="pricePreference = '偏低'"
              ></div>
              <div 
                class="slider-thumb" 
                :class="{ active: pricePreference === '中等' }"
                @click="pricePreference = '中等'"
              ></div>
              <div 
                class="slider-thumb" 
                :class="{ active: pricePreference === '较高' }"
                @click="pricePreference = '较高'"
              ></div>
            </div>
            <div class="slider-labels">
              <div class="label-item">
                <span class="label-title">偏低</span>
                <span class="label-desc">保护程度较低<br>服务费低，适合风险承受高的企业</span>
              </div>
              <div class="label-item">
                <span class="label-title">中等</span>
                <span class="label-desc">平衡风险和成本，适合大多数企业</span>
              </div>
              <div class="label-item">
                <span class="label-title">较高</span>
                <span class="label-desc">保护程度高，服务费高，适用风险抵抗低的企业</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="generate-button">
          <button class="btn-generate" @click="handleGeneratePlan">方案生成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculation-page {
  min-height: 100vh;
  background: #e60012;
  padding: 80px 20px 40px;
}

.calculation-container {
  max-width: 1200px;
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
  margin-bottom: 40px;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.step-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.step-box {
  padding: 10px 20px;
  background: white;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.step-box.active {
  background: #e60012;
  color: white;
  border-color: #e60012;
}

.arrow {
  margin: 0 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #231815;
}

.step-indicator {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.indicator-arrow {
  font-size: 2rem;
  font-weight: bold;
  color: #231815;
}

.form-section {
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-note {
  font-size: 1.1rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 30px;
  font-family: 'Courier New', monospace;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-group label {
  font-size: 1rem;
  font-weight: bold;
  color: #231815;
  white-space: nowrap;
  font-family: 'Courier New', monospace;
}

.form-select {
  flex: 1;
  padding: 10px;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  background: white;
}

.core-demand-section {
  margin-bottom: 30px;
}

.core-demand-section h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
}

.demand-options {
  display: flex;
  gap: 20px;
}

.demand-option {
  flex: 1;
  padding: 15px;
  background: white;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.demand-option:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
}

.demand-option.active {
  background: #e60012;
  color: white;
  border-color: #e60012;
}

.price-preference-section {
  margin-bottom: 40px;
}

.price-preference-section h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
}

.price-slider {
  margin-bottom: 30px;
}

.slider-track {
  position: relative;
  height: 40px;
  background: #f5f5f5;
  border: 2px solid #595757;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 20px;
}

.slider-thumb {
  width: 20px;
  height: 20px;
  background: #595757;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-thumb:hover {
  transform: scale(1.2);
}

.slider-thumb.active {
  background: #e60012;
  transform: scale(1.3);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.label-item {
  flex: 1;
  text-align: center;
}

.label-title {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 10px;
  font-family: 'Courier New', monospace;
}

.label-desc {
  display: block;
  font-size: 0.9rem;
  color: #595757;
  line-height: 1.4;
  font-family: 'Courier New', monospace;
}

.generate-button {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.btn-generate {
  padding: 15px 40px;
  background: #231815;
  color: white;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.btn-generate:hover {
  background: #595757;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .calculation-container {
    padding: 30px 20px;
  }
  
  .form-row {
    flex-direction: column;
  }
  
  .demand-options {
    flex-direction: column;
  }
  
  .slider-labels {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
