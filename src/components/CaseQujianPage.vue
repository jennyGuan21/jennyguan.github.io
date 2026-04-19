<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const backToCaseList = () => {
  router.push('/case-simulation')
}

const navigateToCalculation = () => {
  router.push('/calculation')
}
</script>

<template>
  <div class="case-simulation-page">
    <div class="case-simulation-container">
      <h1 class="page-title">案例演示</h1>
      <p class="page-description">了解其他企业如何通过我们的平台方案有效管理价格风险，优化采购成本，保障销售收益。</p>
      
      <!-- 案例详情 -->
      <div class="case-detail">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title case-title">区间结算案例：某化工企业优化采购成本</h2>
          </div>
          <div class="card-body">
            <!-- 案例背景区 -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-4">案例背景</h3>
              <div class="bg-gray-50 p-4 rounded">
                <p class="case-description">某化工企业需要长期采购乙二醇原料，预计未来价格将在一定区间内波动，希望通过价格风险管理工具获得更优惠的采购价格，同时控制价格波动风险。</p>
              </div>
            </div>
            
            <!-- 参数设定区 -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-4">参数设定</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-gray-50 p-4 rounded">
                  <p class="text-gray-600">产品类型</p>
                  <p class="font-semibold">区间结算</p>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                  <p class="text-gray-600">品种</p>
                  <p class="font-semibold">乙二醇</p>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                  <p class="text-gray-600">数量</p>
                  <p class="font-semibold">3,000 吨</p>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                  <p class="text-gray-600">期限</p>
                  <p class="font-semibold">120 天</p>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                  <p class="text-gray-600">价格区间</p>
                  <p class="font-semibold">5,000 元/吨 - 5,500 元/吨</p>
                </div>
                <div class="bg-gray-50 p-4 rounded">
                  <p class="text-gray-600">费用比例</p>
                  <p class="font-semibold">0.8%</p>
                </div>
              </div>
            </div>
            
            <!-- 方案说明区 -->
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-4">方案说明</h3>
              <div class="bg-gray-50 p-4 rounded">
                <p class="case-solution">企业与平台签订区间结算协议，约定在未来120天内，若乙二醇价格在5,000-5,500元/吨之间，则按市场价下浮3%结算；若价格超出该区间，则按市场价格结算。费用为货物价值的0.8%（即126,000元）。</p>
              </div>
            </div>
            
            <!-- 结果对比区 -->
            <div>
              <h3 class="text-xl font-semibold mb-4">结果对比</h3>
              <div class="bg-gray-50 p-4 rounded">
                <p class="mb-4">
                  到期日市场价格为5,250元/吨，在约定区间内。
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h4 class="font-semibold mb-2">普通采购/销售方案</h4>
                    <p class="text-gray-600 mb-1">采购成本</p>
                    <p class="text-2xl font-bold text-primary">15,750,000 元</p>
                  </div>
                  <div>
                    <h4 class="font-semibold mb-2">区间结算方案</h4>
                    <p class="text-gray-600 mb-1">采购成本</p>
                    <p class="text-2xl font-bold text-success">14,985,000 元</p>
                  </div>
                </div>
                <div class="mt-6 p-4 bg-success/10 rounded">
                  <p class="text-success font-bold text-lg case-result">节省成本：765,000 元</p>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="btn-group">
              <button class="btn btn-outline" @click="backToCaseList">返回案例列表</button>
              <button class="btn btn-primary" @click="navigateToCalculation">我的风险检测</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.case-simulation-page {
  min-height: 100vh;
  background: #c6a86f;
  padding: 80px 20px 40px;
}

.case-simulation-container {
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
  margin-bottom: 20px;
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.page-description {
  text-align: center;
  color: #595757;
  margin-bottom: 40px;
  font-size: 1rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Courier New', monospace;
}

.card {
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 20px;
  background: #f5f5f5;
  border-bottom: 1px solid #dcdcdd;
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.card-body {
  padding: 20px;
}

.card-footer {
  padding: 20px;
  background: #f5f5f5;
  border-top: 1px solid #dcdcdd;
  text-align: center;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.btn-primary {
  background: #e60012;
  color: white;
}

.btn-primary:hover {
  background: #b60005;
  transform: translateY(-2px);
}

.btn-outline {
  background: white;
  color: #231815;
  border: 2px solid #595757;
}

.btn-outline:hover {
  background: #231815;
  color: white;
  transform: translateY(-2px);
}

.case-description {
  line-height: 1.6;
  color: #595757;
}

.case-solution {
  line-height: 1.6;
  color: #595757;
}

.case-result {
  margin: 0;
}

.text-primary {
  color: #e60012;
}

.text-success {
  color: #4caf50;
}

.text-gray-600 {
  color: #757575;
}

.bg-gray-50 {
  background-color: #f9f9f9;
}

.bg-success\/10 {
  background-color: rgba(76, 175, 80, 0.1);
}

.p-4 {
  padding: 1rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.mb-8 {
  margin-bottom: 2rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.rounded {
  border-radius: 0.25rem;
}

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.gap-4 {
  gap: 1rem;
}

.gap-8 {
  gap: 2rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.font-semibold {
  font-weight: 600;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.font-bold {
  font-weight: 700;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

@media (max-width: 768px) {
  .case-simulation-container {
    padding: 30px 20px;
  }
  
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  .grid-cols-3 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  .btn-group {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 250px;
  }
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>