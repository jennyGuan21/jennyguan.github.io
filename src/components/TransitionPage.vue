<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const progress = ref(0)
const router = useRouter()

onMounted(() => {
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 2
    } else {
      clearInterval(interval)
    }
  }, 100)
})

const viewPlan = () => {
  // 从localStorage获取计算结果
  const storedResult = localStorage.getItem('calculationResult')
  if (storedResult) {
    try {
      const result = JSON.parse(storedResult)
      // 跳转到采购方案页面，传递计算结果
      router.push({
        path: '/purchase-plan',
        query: {
          result: storedResult,
          productType: localStorage.getItem('productType') || 'price-protection',
          quantity: localStorage.getItem('quantity') || 500,
          period: localStorage.getItem('period') || 30,
          variety: localStorage.getItem('variety') || 'PP'
        }
      })
    } catch (error) {
      console.error('解析计算结果失败:', error)
      router.push('/purchase-plan')
    }
  } else {
    router.push('/purchase-plan')
  }
}
</script>

<template>
  <div class="transition-page">
    <div class="transition-container">
      <div class="illustration">
        <div class="document">
          <div class="document-line"></div>
          <div class="document-line"></div>
          <div class="document-line"></div>
          <div class="document-line"></div>
        </div>
        <div class="pen"></div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: progress + '%' }"></div>
        </div>
        </div>
      
      <div class="message">
        <p class="main-message">您的方案在为您生成</p>
      </div>
      
      <button class="view-plan-btn" @click="viewPlan">查看已生成的方案</button>
    </div>
  </div>
</template>

<style scoped>
.transition-page {
  min-height: 100vh;
  background: #c6a86f;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.transition-container {
  max-width: 600px;
  width: 100%;
  background: #dedddd;
  border: 3px solid #231815;
  border-radius: 4px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.illustration {
  margin-bottom: 40px;
  position: relative;
  height: 300px;
}

.document {
  width: 180px;
  height: 200px;
  background: white;
  border: 3px solid #231815;
  border-radius: 4px;
  margin: 0 auto;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}

.document-line {
  width: 100%;
  height: 3px;
  background: #231815;
  margin-bottom: 20px;
  border-radius: 2px;
}

.pen {
  position: absolute;
  right: 120px;
  top: 100px;
  width: 100px;
  height: 15px;
  background: #231815;
  border-radius: 4px;
  transform: rotate(-30deg);
  transform-origin: left center;
}

.progress-bar {
  width: 250px;
  height: 15px;
  background: white;
  border: 2px solid #231815;
  border-radius: 4px;
  margin: 40px auto 20px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #e60012, #b60005);
  transition: width 0.3s ease;
}

.arrow {
  font-size: 2.5rem;
  color: #231815;
  margin-bottom: 10px;
}

.message {
  margin-top: 20px;
}

.dynamic-text {
  font-size: 1.2rem;
  color: #595757;
  margin-bottom: 10px;
  font-family: 'Courier New', monospace;
}

.main-message {
  font-size: 1.8rem;
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
  margin-bottom: 30px;
}

.view-plan-btn {
  padding: 15px 30px;
  background: #e60012;
  color: white;
  border: 2px solid #231815;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  margin-top: 20px;
}

.view-plan-btn:hover {
  background: #b60005;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(230, 0, 18, 0.3);
}

@media (max-width: 768px) {
  .transition-container {
    padding: 40px 20px;
  }
  
  .main-message {
    font-size: 1.5rem;
  }
  
  .view-plan-btn {
    padding: 12px 24px;
    font-size: 1rem;
  }
}
</style>
