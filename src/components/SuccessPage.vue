<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const backToHome = () => {
  router.push('/')
}

const newPlan = () => {
  router.push('/calculation')
}
</script>

<template>
  <div class="success-page">
    <!-- 成功提示区 -->
    <section class="success-section">
      <div class="success-container">
        <div class="success-content">
          <div class="success-icon">
            <div class="icon-circle">
              <span class="check-icon">✓</span>
            </div>
          </div>
          <h1 class="success-title">申请提交成功</h1>
          <p class="success-desc">您的价格风险管理方案申请已成功提交，我们的专业团队将在1个工作日内与您联系，为您提供进一步的服务。</p>
          
          <!-- 方案信息卡区 -->
          <div class="plan-card">
            <div class="card-header">
              <h3 class="card-title">方案信息</h3>
            </div>
            <div class="card-body">
              <div class="plan-grid">
                <div class="plan-item">
                  <p class="plan-label">申请编号</p>
                  <p class="plan-value">PR202604120001</p>
                </div>
                <div class="plan-item">
                  <p class="plan-label">提交时间</p>
                  <p class="plan-value">2026-04-12 15:30:45</p>
                </div>
                <div class="plan-item">
                  <p class="plan-label">产品类型</p>
                  <p class="plan-value">保价采购</p>
                </div>
                <div class="plan-item">
                  <p class="plan-label">品种</p>
                  <p class="plan-value">PP (聚丙烯)</p>
                </div>
                <div class="plan-item">
                  <p class="plan-label">数量</p>
                  <p class="plan-value">1,000 吨</p>
                </div>
                <div class="plan-item">
                  <p class="plan-label">期限</p>
                  <p class="plan-value">90 天</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 后续操作按钮区 -->
          <div class="button-group">
            <button type="button" class="btn btn-outline" @click="backToHome">返回首页</button>
            <button type="button" class="btn btn-primary" @click="newPlan">再测一个方案</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 后续服务说明区 -->
    <section class="service-section">
      <div class="service-container">
        <h2 class="service-title">后续服务流程</h2>
        <div class="service-grid">
          <div class="service-item">
            <div class="service-number">1</div>
            <h3 class="service-step-title">方案审核</h3>
            <p class="service-desc">我们的专业团队将审核您提交的方案</p>
          </div>
          
          <div class="service-item">
            <div class="service-number">2</div>
            <h3 class="service-step-title">电话沟通</h3>
            <p class="service-desc">客服人员将与您电话沟通确认方案细节</p>
          </div>
          
          <div class="service-item">
            <div class="service-number">3</div>
            <h3 class="service-step-title">协议签署</h3>
            <p class="service-desc">双方确认无误后签署正式协议</p>
          </div>
          
          <div class="service-item">
            <div class="service-number">4</div>
            <h3 class="service-step-title">方案执行</h3>
            <p class="service-desc">按照协议约定执行价格风险管理方案</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.success-page {
  min-height: 100vh;
  background: white;
  padding-top: 80px;
}

.success-section {
  padding: 4rem 1.5rem;
  background: white;
}

.success-container {
  max-width: 1200px;
  margin: 0 auto;
}

.success-content {
  max-width: 42rem;
  margin: 0 auto;
  text-align: center;
}

.success-icon {
  margin-bottom: 1.5rem;
}

.icon-circle {
  width: 5rem;
  height: 5rem;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.check-icon {
  font-size: 2.5rem;
  color: #4caf50;
  font-weight: bold;
}

.success-title {
  font-size: 1.875rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.success-desc {
  color: #595757;
  margin-bottom: 2rem;
  line-height: 1.6;
  font-family: 'Courier New', monospace;
}

.plan-card {
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: left;
}

.card-header {
  padding: 15px 20px;
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

.plan-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.plan-item {
  text-align: left;
}

.plan-label {
  color: #595757;
  margin-bottom: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.plan-value {
  font-weight: 600;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.btn-outline {
  background: white;
  color: #231815;
}

.btn-outline:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
}

.btn-primary {
  background: #231815;
  color: white;
  border-color: #231815;
}

.btn-primary:hover {
  background: #595757;
  transform: translateY(-2px);
}

.service-section {
  padding: 3rem 1.5rem;
  background: #f9f9f9;
}

.service-container {
  max-width: 1200px;
  margin: 0 auto;
}

.service-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #231815;
  text-align: center;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;
}

.service-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.service-item {
  text-align: center;
}

.service-number {
  width: 4rem;
  height: 4rem;
  background: rgba(230, 0, 18, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
}

.service-number span {
  color: #e60012;
  font-weight: bold;
  font-size: 1.25rem;
  font-family: 'Courier New', monospace;
}

.service-step-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #231815;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
}

.service-desc {
  color: #595757;
  line-height: 1.5;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .success-section {
    padding: 3rem 1rem;
  }
  
  .plan-grid {
    grid-template-columns: 1fr;
  }
  
  .button-group {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 250px;
  }
  
  .service-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .service-grid {
    grid-template-columns: 1fr;
  }
}
</style>