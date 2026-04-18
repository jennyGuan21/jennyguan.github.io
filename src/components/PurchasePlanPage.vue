<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const savePlan = () => {
  // 保存方案的逻辑
  console.log('保存方案')
  // 弹出保存成功的消息
  alert('保存成功')
  // 跳转到首页
  router.push('/')
}

const understandProduct = () => {
  // 跳转到科普页面
  router.push('/science')
}
</script>

<template>
  <div class="purchase-plan-page">
    <div class="purchase-plan-container">
      <h1 class="page-title">采购方案</h1>
      
      <div class="stats-section">
        <div class="stats-row">
          <div class="stat-card">
            <h3 class="stat-title">现货均价</h3>
            <div class="stat-value">8,500</div>
          </div>
          <div class="stat-card">
            <h3 class="stat-title">期货均价</h3>
            <div class="stat-value">8,500</div>
          </div>
          <div class="stat-card">
            <h3 class="stat-title">波动率</h3>
            <div class="stat-value">20.0%</div>
          </div>
        </div>
        
        <div class="stats-row">
          <div class="stat-card">
            <h3 class="stat-title">当前价格</h3>
            <div class="stat-value price">8,500</div>
            <div class="stat-unit">元/吨</div>
          </div>
          <div class="stat-card highlight">
            <h3 class="stat-title">推荐方案</h3>
            <div class="stat-value">保价采购</div>
            <div class="stat-desc">锁定最高采购价格，确保成本可控</div>
          </div>
          <div class="stat-card">
            <h3 class="stat-title">合约价格</h3>
            <div class="stat-value price">8,755</div>
            <div class="stat-unit">最高采购价8755.00，最高价775.00</div>
          </div>
          <div class="stat-card">
            <h3 class="stat-title">风险变化</h3>
            <div class="stat-value price">50.0</div>
            <div class="stat-unit">风险指数比例</div>
          </div>
        </div>
      </div>
      
      <div class="charts-section">
        <div class="chart-wrapper">
          <h3 class="chart-title">价格保护关系</h3>
          <div class="chart-container">
            <div class="chart-placeholder">
              <div class="y-axis">
                <div class="y-tick">12,000</div>
                <div class="y-tick">10,000</div>
                <div class="y-tick">8,000</div>
                <div class="y-tick">6,000</div>
                <div class="y-tick">4,000</div>
                <div class="y-tick">2,000</div>
                <div class="y-tick">0</div>
              </div>
              <div class="x-axis">
                <div class="x-tick">-30%</div>
                <div class="x-tick">-20%</div>
                <div class="x-tick">-10%</div>
                <div class="x-tick">0%</div>
                <div class="x-tick">10%</div>
                <div class="x-tick">20%</div>
                <div class="x-tick">30%</div>
              </div>
              <div class="x-label">市场价格变化</div>
              <div class="chart-legend">
                <div class="legend-item">
                  <div class="legend-color no-plan"></div>
                  <span>不做方案</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color with-plan"></div>
                  <span>做方案</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="chart-wrapper">
          <h3 class="chart-title">风险对比</h3>
          <div class="chart-container">
            <div class="bar-chart-placeholder">
              <div class="bar-group">
                <div class="bar-label">不做方案</div>
                <div class="bars">
                  <div class="bar no-plan"></div>
                  <div class="bar with-plan"></div>
                </div>
              </div>
              <div class="bar-group">
                <div class="bar-label">价格下跌50%</div>
                <div class="bars">
                  <div class="bar no-plan"></div>
                  <div class="bar with-plan"></div>
                </div>
              </div>
              <div class="bar-group">
                <div class="bar-label">价格上涨50%</div>
                <div class="bars">
                  <div class="bar no-plan"></div>
                  <div class="bar with-plan"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="scenario-section">
        <h3 class="section-title">情景模拟</h3>
        <table class="scenario-table">
          <thead>
            <tr>
              <th>场景</th>
              <th>市场价</th>
              <th>不做方案</th>
              <th>做方案</th>
              <th>差额</th>
              <th>解读</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>大幅下跌</td>
              <td>7225</td>
              <td>7225</td>
              <td>7395</td>
              <td>170</td>
              <td>成本增加170.00元/吨</td>
            </tr>
            <tr>
              <td>中等下跌</td>
              <td>7820</td>
              <td>7820</td>
              <td>7990</td>
              <td>170</td>
              <td>成本增加170.00元/吨</td>
            </tr>
            <tr>
              <td>小幅波动</td>
              <td>8500</td>
              <td>8500</td>
              <td>8670</td>
              <td>170</td>
              <td>成本增加170.00元/吨</td>
            </tr>
            <tr>
              <td>中等上涨</td>
              <td>9180</td>
              <td>9180</td>
              <td>8925</td>
              <td>-255</td>
              <td>节省成本255.00元/吨</td>
            </tr>
            <tr>
              <td>大幅上涨</td>
              <td>9775</td>
              <td>9775</td>
              <td>8925</td>
              <td>-850</td>
              <td>节省成本850.00元/吨</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="sensitivity-section">
        <h3 class="section-title">价格敏感性</h3>
        <table class="sensitivity-table">
          <thead>
            <tr>
              <th></th>
              <th>基准</th>
              <th>波动率敏感性</th>
              <th></th>
              <th>周期敏感性</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>-10%</td>
              <td>156.40 (-4.4%)</td>
              <td>-10%</td>
              <td>153.10 (-6.0%)</td>
              <td>-7天</td>
              <td>148.85 (-12.4%)</td>
            </tr>
            <tr>
              <td>-5%</td>
              <td>162.60 (-0.6%)</td>
              <td>-5%</td>
              <td>161.10 (-1.5%)</td>
              <td>-3天</td>
              <td>158.65 (-3.4%)</td>
            </tr>
            <tr>
              <td>基准</td>
              <td>170.00 (0.0%)</td>
              <td>基准</td>
              <td>170.00 (0.0%)</td>
              <td>基准</td>
              <td>170.00 (0.0%)</td>
            </tr>
            <tr>
              <td>+5%</td>
              <td>177.60 (+4.5%)</td>
              <td>+5%</td>
              <td>178.10 (+4.8%)</td>
              <td>+3天</td>
              <td>178.95 (+5.3%)</td>
            </tr>
            <tr>
              <td>+10%</td>
              <td>185.40 (+9.1%)</td>
              <td>+10%</td>
              <td>187.00 (+10.0%)</td>
              <td>+7天</td>
              <td>190.25 (+11.9%)</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="interpretation-section">
        <h3 class="section-title">智能解读</h3>
        <p class="interpretation-text">
          基于您的测算和需求的模式，我们推荐保价采购方案，可降低约50%的价格风险，在30天周期内，您的最高采购价格将锁定在约为8925元/吨，综合考虑您的价格需求和平衡偏好，此方案在当前市场环境下被判断为最适合的。
        </p>
        <div class="disclaimer">
          <p>本产品意在为用户提供交易所需的风险，从而了解风险如何被缩小，如有意向签署交易订单，请与相关部门交流后获得更为详细的方案。</p>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="btn-save" @click="savePlan">保存至我的方案</button>
        <button class="btn-understand" @click="understandProduct">了解该方案所用金融产品</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.purchase-plan-page {
  min-height: 100vh;
  background: #e60012;
  padding: 80px 20px 40px;
}

.purchase-plan-container {
  max-width: 1400px;
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

.stats-section {
  margin-bottom: 40px;
}

.stats-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: center;
}

.stat-card {
  flex: 1;
  max-width: 250px;
  padding: 20px;
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stat-card.highlight {
  border: 2px solid #e60012;
}

.stat-title {
  font-size: 1rem;
  color: #595757;
  margin-bottom: 10px;
  font-family: 'Courier New', monospace;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.stat-value.price {
  color: #b60005;
}

.stat-unit {
  font-size: 0.85rem;
  color: #595757;
  margin-top: 5px;
  font-family: 'Courier New', monospace;
}

.stat-desc {
  font-size: 0.85rem;
  color: #595757;
  margin-top: 10px;
  line-height: 1.4;
  font-family: 'Courier New', monospace;
}

.charts-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 40px;
}

.chart-wrapper {
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.chart-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
}

.chart-container {
  min-height: 300px;
  position: relative;
}

.chart-placeholder {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
}

.y-axis {
  position: absolute;
  left: 20px;
  top: 20px;
  bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60px;
}

.y-tick {
  font-size: 0.8rem;
  color: #595757;
  text-align: right;
  font-family: 'Courier New', monospace;
}

.x-axis {
  position: absolute;
  left: 80px;
  right: 20px;
  bottom: 40px;
  display: flex;
  justify-content: space-between;
  height: 20px;
}

.x-tick {
  font-size: 0.8rem;
  color: #595757;
  font-family: 'Courier New', monospace;
}

.x-label {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.chart-legend {
  position: absolute;
  bottom: 80px;
  right: 20px;
  display: flex;
  gap: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.legend-color.no-plan {
  background: #898989;
}

.legend-color.with-plan {
  background: #b60005;
}

.bar-chart-placeholder {
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  height: 250px;
  padding: 20px;
}

.bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.bar-label {
  font-size: 0.8rem;
  color: #595757;
  margin-bottom: 10px;
  text-align: center;
  font-family: 'Courier New', monospace;
}

.bars {
  display: flex;
  gap: 5px;
}

.bar {
  width: 40px;
  border-radius: 4px 4px 0 0;
}

.bar.no-plan {
  background: #898989;
  height: 150px;
}

.bar.with-plan {
  background: #b60005;
  height: 80px;
}

.bar-group:nth-child(2) .bar.no-plan {
  height: 120px;
}

.bar-group:nth-child(2) .bar.with-plan {
  height: 90px;
}

.bar-group:nth-child(3) .bar.no-plan {
  height: 180px;
}

.bar-group:nth-child(3) .bar.with-plan {
  height: 70px;
}

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
}

.scenario-section,
.sensitivity-section,
.interpretation-section {
  margin-bottom: 40px;
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.scenario-table,
.sensitivity-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Courier New', monospace;
}

.scenario-table th,
.scenario-table td,
.sensitivity-table th,
.sensitivity-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #dcdcdd;
  font-size: 0.9rem;
}

.scenario-table th,
.sensitivity-table th {
  background: #f5f5f5;
  font-weight: bold;
  color: #231815;
}

.scenario-table td,
.sensitivity-table td {
  color: #595757;
}

.interpretation-text {
  color: #595757;
  line-height: 1.6;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  margin-bottom: 20px;
}

.disclaimer {
  padding: 15px;
  background: #f5f5f5;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  margin-top: 20px;
}

.disclaimer p {
  color: #595757;
  line-height: 1.6;
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 40px;
}

.btn-save,
.btn-understand {
  padding: 12px 30px;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.btn-save {
  background: #e60012;
  color: white;
  border-color: #e60012;
}

.btn-save:hover {
  background: #b60005;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(230, 0, 18, 0.3);
}

.btn-understand {
  background: white;
  color: #231815;
}

.btn-understand:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .purchase-plan-container {
    padding: 30px 20px;
  }
  
  .stats-row {
    flex-direction: column;
    align-items: center;
  }
  
  .stat-card {
    max-width: 100%;
    width: 100%;
  }
  
  .charts-section {
    grid-template-columns: 1fr;
  }
  
  .scenario-table,
  .sensitivity-table {
    font-size: 0.8rem;
  }
  
  .scenario-table th,
  .scenario-table td,
  .sensitivity-table th,
  .sensitivity-table td {
    padding: 8px;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-save,
  .btn-understand {
    width: 100%;
    max-width: 250px;
  }
}
</style>
