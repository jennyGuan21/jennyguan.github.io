<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as echarts from 'echarts'

const router = useRouter()
const route = useRoute()

const riskAgreed = ref(false)
const canSubmit = computed(() => riskAgreed.value)

// 接收计算结果
const calculationResult = ref(null)
const productInfo = reactive({
  productType: '保价采购',
  variety: 'PP (聚丙烯)',
  quantity: 1000,
  period: 90,
  region: '华东',
  targetPrice: 9000
})

// 从路由参数获取计算结果
onMounted(() => {
  if (route.query.result) {
    try {
      calculationResult.value = JSON.parse(route.query.result)
      // 更新产品信息
      if (route.query.productType) {
        productInfo.productType = route.query.productType === 'price-protection' ? '保价采购' : route.query.productType === 'floor-price' ? '封顶销售' : '区间结算'
      }
      if (route.query.quantity) {
        productInfo.quantity = parseInt(route.query.quantity)
      }
      if (route.query.period) {
        productInfo.period = parseInt(route.query.period)
      }
      if (route.query.variety) {
        productInfo.variety = route.query.variety === 'PP' ? 'PP (聚丙烯)' : 'PE (聚乙烯)'
      }
      if (calculationResult.value.strikeSpot) {
        productInfo.targetPrice = calculationResult.value.strikeSpot
      }
    } catch (error) {
      console.error('解析计算结果失败:', error)
    }
  }
  
  // 初始化图表
  setTimeout(() => {
    initComparisonChart()
  }, 100)
})

const backToAnalysis = () => {
  router.push('/calculation')
}

const submitApplication = () => {
  if (canSubmit.value) {
    router.push('/success')
  }
}

const handleRiskAgreeChange = (event) => {
  riskAgreed.value = event.target.checked
}

// 查看案例参考
const viewCase = () => {
  router.push('/case-baojia')
}

// 生成方案摘要（这里只是模拟，实际可能需要生成PDF或其他格式）
const generateSummary = () => {
  alert('方案摘要已生成，请查收邮件！')
}

// 初始化对比图表
const initComparisonChart = () => {
  try {
    // 这里使用ECharts代替Chart.js，因为项目中已经使用了ECharts
    const chartDom = document.getElementById('comparison-chart')
    if (chartDom && typeof chartDom === 'object' && chartDom.nodeType === 1) {
      const chart = echarts.init(chartDom)
      
      // 使用计算结果或默认值
      const basePrice = calculationResult.value?.strikeSpot || productInfo.targetPrice || 9000
      const fee = calculationResult.value?.feePerTon || 108 // 费用分摊到每吨
      const spotPrice = calculationResult.value?.spotPrice || basePrice
      
      // 生成市场价格范围
      const minPrice = Math.max(spotPrice * 0.8, basePrice - 1500)
      const maxPrice = Math.min(spotPrice * 1.2, basePrice + 1500)
      const marketPrices = Array.from({length: 21}, (_, i) => minPrice + i * (maxPrice - minPrice) / 20)
      
      chart.setOption({
        title: {
          text: '收益/成本对比',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: marketPrices.map(p => Math.round(p)),
          name: '到期日市场价格 (元/吨)',
          nameLocation: 'middle',
          nameGap: 30
        },
        yAxis: {
          type: 'value',
          name: '实际采购成本 (元/吨)',
          min: Math.min(...marketPrices) - 200
        },
        series: [
          {
            name: productInfo.productType + '方案',
            type: 'line',
            data: marketPrices.map(price => Math.min(price, basePrice) + fee),
            lineStyle: {
              color: '#e60012',
              width: 2
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(230, 0, 18, 0.3)' },
                { offset: 1, color: 'rgba(230, 0, 18, 0.1)' }
              ])
            },
            smooth: true
          },
          {
            name: '普通采购方案',
            type: 'line',
            data: marketPrices,
            lineStyle: {
              color: '#9e9e9e',
              width: 2,
              type: 'dashed'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(158, 158, 158, 0.3)' },
                { offset: 1, color: 'rgba(158, 158, 158, 0.1)' }
              ])
            },
            smooth: true
          }
        ]
      })
    }
  } catch (error) {
    console.error('图表初始化失败:', error)
  }
}

onMounted(() => {
  // 初始化图表
  setTimeout(() => {
    initComparisonChart()
  }, 100)
})
</script>

<template>
  <div class="purchase-plan-page">
    <div class="purchase-plan-container">
      <h1 class="page-title">方案摘要</h1>
      <p class="page-description">请确认以下方案信息无误，阅读风险揭示后提交申请。</p>
      
      <!-- 基本信息区 -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="card-title">基本信息</h3>
        </div>
        <div class="card-body">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="info-subtitle">方案信息</h4>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-label">产品类型：</span>
                  <span class="info-value">{{ productInfo.productType }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">品种：</span>
                  <span class="info-value">{{ productInfo.variety }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">数量：</span>
                  <span class="info-value">{{ productInfo.quantity ? productInfo.quantity.toLocaleString() : 0 }} 吨</span>
                </div>
                <div class="info-item">
                  <span class="info-label">期限：</span>
                  <span class="info-value">{{ productInfo.period }} 天</span>
                </div>
                <div class="info-item">
                  <span class="info-label">区域：</span>
                  <span class="info-value">{{ productInfo.region }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">目标价格：</span>
                  <span class="info-value">{{ productInfo.targetPrice ? productInfo.targetPrice.toLocaleString() : 0 }} 元/吨</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="info-subtitle">联系信息</h4>
              <div class="info-list">
                <div class="info-item">
                  <span class="info-label">联系人：</span>
                  <span class="info-value">张三</span>
                </div>
                <div class="info-item">
                  <span class="info-label">联系电话：</span>
                  <span class="info-value">138****5678</span>
                </div>
                <div class="info-item">
                  <span class="info-label">公司名称：</span>
                  <span class="info-value">XX制造有限公司</span>
                </div>
                <div class="info-item">
                  <span class="info-label">电子邮箱：</span>
                  <span class="info-value">zhangsan@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 定价与风险摘要区 -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="card-title">定价与风险摘要</h3>
        </div>
        <div class="card-body">
          <div class="section-stack">
            <div class="info-block">
              <h4 class="info-subtitle">费用信息</h4>
              <div class="info-block-content">
                <div class="info-item">
                  <span class="info-label">费用比例：</span>
                  <span class="info-value">{{ calculationResult && calculationResult.feePerTon && calculationResult.spotPrice ? ((calculationResult.feePerTon / calculationResult.spotPrice) * 100).toFixed(2) + '%' : '1.2%' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">费用金额：</span>
                  <span class="info-value">{{ calculationResult && calculationResult.totalFee ? calculationResult.totalFee.toLocaleString() + ' 元' : '108,000 元' }}</span>
                </div>
              </div>
            </div>
            
            <div class="info-block">
              <h4 class="info-subtitle">结算规则</h4>
              <div class="info-block-content">
                <p class="rule-intro">到期结算时，根据市场价格与约定价格的比较，按以下规则执行：</p>
                <ul class="rule-list" v-if="productInfo.productType === '保价采购'">
                  <li>若市场价格高于约定价格（{{ productInfo.targetPrice ? productInfo.targetPrice.toLocaleString() : 0 }}元/吨），则按约定价格结算</li>
                  <li>若市场价格低于或等于约定价格（{{ productInfo.targetPrice ? productInfo.targetPrice.toLocaleString() : 0 }}元/吨），则按市场价格结算</li>
                </ul>
                <ul class="rule-list" v-else-if="productInfo.productType === '封顶销售'">
                  <li>若市场价格低于约定价格（{{ productInfo.targetPrice ? productInfo.targetPrice.toLocaleString() : 0 }}元/吨），则按约定价格结算</li>
                  <li>若市场价格高于或等于约定价格（{{ productInfo.targetPrice ? productInfo.targetPrice.toLocaleString() : 0 }}元/吨），则按市场价格结算</li>
                </ul>
                <ul class="rule-list" v-else-if="productInfo.productType === '区间结算'">
                  <li>若市场价格高于区间上限（{{ productInfo.targetPrice ? productInfo.targetPrice.toLocaleString() : 0 }}元/吨），则按区间上限结算</li>
                  <li>若市场价格低于区间下限（{{ productInfo.targetPrice ? (productInfo.targetPrice * 0.96).toLocaleString() : 0 }}元/吨），则按区间下限结算</li>
                  <li>若市场价格在区间内，则按市场价格结算</li>
                </ul>
              </div>
            </div>
            
            <div class="info-block">
              <h4 class="info-subtitle">预期收益分析</h4>
              <div class="info-block-content">
                <p class="rule-intro">根据当前市场情况和历史数据分析，预计到期日市场价格可能出现以下情况：</p>
                <div class="收益-list">
                  <div class="收益-item">
                    <span>价格上涨至9,500元/吨（概率60%）：</span>
                    <span class="收益-positive">净收益约392,000元</span>
                  </div>
                  <div class="收益-item">
                    <span>价格保持不变（概率25%）：</span>
                    <span class="收益-positive">净收益约92,000元</span>
                  </div>
                  <div class="收益-item">
                    <span>价格下跌至8,500元/吨（概率15%）：</span>
                    <span class="收益-negative">净损失约108,000元</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 风险揭示区 -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="card-title">风险揭示</h3>
        </div>
        <div class="card-body">
          <div class="risk-content">
            <p class="risk-title">请仔细阅读以下风险提示：</p>
            <ul class="risk-list">
              <li>本产品具有一定的风险，若市场价格变动方向与预期相反，可能导致您支付的费用无法获得相应回报。</li>
              <li>您应根据自身的风险承受能力、财务状况和交易需求谨慎选择本产品。</li>
              <li>过往业绩不代表未来表现，历史数据仅供参考，不构成对未来市场走势的预测。</li>
              <li>本产品的最终结算价格以到期日的市场价格为准，不受其他因素影响。</li>
              <li>如您对本产品有任何疑问，请在提交申请前咨询我们的客服人员。</li>
            </ul>
            <div class="risk-agree">
              <input type="checkbox" id="risk-agree" @change="handleRiskAgreeChange">
              <label for="risk-agree">我已阅读并理解上述风险提示，确认接受相关风险</label>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 核心结果区 -->
      <div class="mb-8">
        <h2 class="section-title">核心结果</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 保价采购结果 -->
          <div class="result-card">
            <div class="result-header">
              <h3 class="result-title">{{ productInfo.productType }}成本</h3>
              <div class="result-value">{{ calculationResult && calculationResult.allInPrice ? calculationResult.allInPrice.toLocaleString() + ' 元/吨' : '8,950 元/吨' }}</div>
            </div>
            <div class="mt-4">
              <p class="result-label">当前市场价格</p>
              <p class="result-value">{{ calculationResult && calculationResult.spotPrice ? calculationResult.spotPrice.toLocaleString() + ' 元/吨' : '9,200 元/吨' }}</p>
            </div>
            <div class="mt-4">
              <p class="result-label">预计节省</p>
              <p class="result-value result-positive">{{ calculationResult && calculationResult.spotPrice && calculationResult.allInPrice ? (calculationResult.spotPrice - calculationResult.allInPrice).toFixed(0) + ' 元/吨' : '250 元/吨' }}</p>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200">
              <p class="result-label">总节省金额</p>
              <p class="result-value result-positive">{{ calculationResult && calculationResult.spotPrice && calculationResult.allInPrice && productInfo.quantity ? ((calculationResult.spotPrice - calculationResult.allInPrice) * productInfo.quantity).toLocaleString() + ' 元' : '250,000 元' }}</p>
            </div>
          </div>
          
          <!-- 费用信息 -->
          <div class="result-card">
            <div class="result-header">
              <h3 class="result-title">费用信息</h3>
              <div class="result-value">{{ calculationResult && calculationResult.feePerTon && calculationResult.spotPrice ? ((calculationResult.feePerTon / calculationResult.spotPrice) * 100).toFixed(2) + '%' : '1.2%' }}</div>
            </div>
            <div class="mt-4">
              <p class="result-label">费用金额</p>
              <p class="result-value">{{ calculationResult && calculationResult.totalFee ? calculationResult.totalFee.toLocaleString() + ' 元' : '108,000 元' }}</p>
            </div>
            <div class="mt-4">
              <p class="result-label">费用说明</p>
              <p class="result-text">费用为货物价值的{{ calculationResult && calculationResult.feePerTon && calculationResult.spotPrice ? ((calculationResult.feePerTon / calculationResult.spotPrice) * 100).toFixed(2) + '%' : '1.2%' }}，到期结算时一并收取。</p>
            </div>
          </div>
          
          <!-- 风险评估 -->
          <div class="result-card">
            <div class="result-header">
              <h3 class="result-title">风险评估</h3>
              <div class="result-value">{{ calculationResult ? (calculationResult.reductionRate > 0.5 ? '低' : '中') : '低' }}</div>
            </div>
            <div class="mt-4">
              <p class="result-label">风险说明</p>
              <p class="result-text" v-if="productInfo.productType === '保价采购'">当前市场价格高于保价，若市场价格下跌至保价以下，您仍需按保价购买，可能产生额外成本。</p>
              <p class="result-text" v-else-if="productInfo.productType === '封顶销售'">当前市场价格低于保底价格，若市场价格上涨至保底以上，您仍需按保底价格销售，可能损失部分收益。</p>
              <p class="result-text" v-else-if="productInfo.productType === '区间结算'">市场价格在区间内波动时按市场价结算，超出区间时按边界价格结算，有效控制价格风险。</p>
            </div>
            <div class="mt-4">
              <p class="result-label">风险缓解建议</p>
              <p class="result-text">可考虑分批采购或设置更合理的价格区间，平衡成本和风险。</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 收益/成本对比图区 -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="card-title">收益/成本对比</h3>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <div id="comparison-chart" style="width: 100%; height: 400px;"></div>
          </div>
          <div class="mt-4 text-sm text-gray-600 text-center">
            <p>横轴：到期日市场价格</p>
            <p>纵轴：实际成本/收益</p>
          </div>
        </div>
      </div>
      
      <!-- 风险与情景分析区 -->
      <div class="mb-8">
        <h2 class="section-title">风险与情景分析</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 情景1 -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">情景一：价格上涨</h3>
            </div>
            <div class="card-body">
              <p class="mb-4">若到期日市场价格上涨至 <strong>9,500 元/吨</strong></p>
              <ul class="list-disc pl-5 mb-4">
                <li>普通采购成本：9,500 元/吨</li>
                <li>保价采购成本：9,000 元/吨</li>
                <li>节省：500 元/吨</li>
              </ul>
              <p class="result-positive font-semibold">净收益：392,000 元（已扣除费用）</p>
            </div>
          </div>
          
          <!-- 情景2 -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">情景二：价格不变</h3>
            </div>
            <div class="card-body">
              <p class="mb-4">若到期日市场价格保持在 <strong>9,200 元/吨</strong></p>
              <ul class="list-disc pl-5 mb-4">
                <li>普通采购成本：9,200 元/吨</li>
                <li>保价采购成本：9,000 元/吨</li>
                <li>节省：200 元/吨</li>
              </ul>
              <p class="result-positive font-semibold">净收益：92,000 元（已扣除费用）</p>
            </div>
          </div>
          
          <!-- 情景3 -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">情景三：价格下跌</h3>
            </div>
            <div class="card-body">
              <p class="mb-4">若到期日市场价格下跌至 <strong>8,500 元/吨</strong></p>
              <ul class="list-disc pl-5 mb-4">
                <li>普通采购成本：8,500 元/吨</li>
                <li>保价采购成本：8,500 元/吨（按市场价格结算）</li>
                <li>节省：0 元/吨</li>
              </ul>
              <p class="result-negative font-semibold">净损失：108,000 元（支付的费用）</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 系统建议区 -->
      <div class="card mb-8">
        <div class="card-header">
          <h3 class="card-title">系统建议</h3>
        </div>
        <div class="card-body">
          <div class="flex items-start">
            <div class="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
              <span class="text-primary text-xl">💡</span>
            </div>
            <div>
              <p class="system-suggestion">当前市场价格高于保价，建议执行保价采购方案。根据历史数据分析，未来3个月内价格上涨的可能性较大（60%），采用保价采购方案可以有效锁定当前价格，避免价格上涨带来的成本增加。</p>
              
              <div class="mt-6">
                <h4 class="text-lg font-semibold mb-2">优化建议</h4>
                <ul class="list-disc pl-5">
                  <li>考虑将采购数量分为2-3批，降低一次性决策风险</li>
                  <li>可适当调整保价水平，平衡成本和保障程度</li>
                  <li>密切关注市场动态，及时调整采购策略</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 确认与提交区 -->
      <div class="submit-section">
        <button type="button" class="btn btn-outline" @click="backToAnalysis">返回修改</button>
        <button type="button" class="btn btn-primary" :disabled="!canSubmit" @click="submitApplication">提交申请</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.purchase-plan-page {
  min-height: 100vh;
  background: #c6a86f;
  padding: 80px 20px 40px;
}

.purchase-plan-container {
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
  margin-bottom: 2rem;
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

.grid {
  display: grid;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.gap-6 {
  gap: 1.5rem;
}

.info-subtitle {
  font-size: 1rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.info-label {
  color: #595757;
  font-family: 'Courier New', monospace;
}

.info-value {
  font-weight: 500;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.section-stack {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-block {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #dcdcdd;
}

.info-block:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.info-block-content {
  background: #f9f9f9;
  border-radius: 4px;
  padding: 1rem;
}

.rule-intro {
  color: #595757;
  margin-bottom: 0.75rem;
  font-family: 'Courier New', monospace;
  line-height: 1.5;
}

.rule-list {
  list-style: disc;
  padding-left: 1.5rem;
  color: #595757;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
}

.rule-list li {
  margin-bottom: 0.5rem;
}

.收益-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.收益-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: #595757;
  font-family: 'Courier New', monospace;
}

.收益-positive {
  color: #4caf50;
  font-weight: 500;
}

.收益-negative {
  color: #e60012;
  font-weight: 500;
}

.risk-content {
  background: #f9f9f9;
  border-radius: 4px;
  padding: 1rem;
}

.risk-title {
  color: #e60012;
  font-weight: 500;
  margin-bottom: 1rem;
  font-family: 'Courier New', monospace;
}

.risk-list {
  list-style: disc;
  padding-left: 1.5rem;
  color: #595757;
  font-family: 'Courier New', monospace;
  line-height: 1.6;
}

.risk-list li {
  margin-bottom: 0.5rem;
}

.risk-agree {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
}

.risk-agree input[type="checkbox"] {
  margin-right: 0.5rem;
  width: 18px;
  height: 18px;
}

.risk-agree label {
  color: #231815;
  font-family: 'Courier New', monospace;
  cursor: pointer;
}

.submit-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 2rem;
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

.btn-primary:hover:not(:disabled) {
  background: #595757;
  transform: translateY(-2px);
}

.btn-primary:disabled {
  background: #dcdcdd;
  border-color: #dcdcdd;
  cursor: not-allowed;
}

@media (min-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
}

.result-card {
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.result-title {
  font-size: 1rem;
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
  margin: 0;
}

.result-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.result-label {
  color: #595757;
  margin-bottom: 0.25rem;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
}

.result-text {
  color: #595757;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
}

.result-positive {
  color: #4caf50;
  font-weight: 500;
}

.result-negative {
  color: #e60012;
  font-weight: 500;
}

.system-suggestion {
  color: #595757;
  line-height: 1.6;
  font-family: 'Courier New', monospace;
  margin-bottom: 1rem;
}

.button-section {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.bg-primary\/10 {
  background-color: rgba(230, 0, 18, 0.1);
}

.text-primary {
  color: #e60012;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.mt-6 {
  margin-top: 1.5rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.flex {
  display: flex;
}

.items-start {
  align-items: flex-start;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.w-10 {
  width: 2.5rem;
}

.h-10 {
  height: 2.5rem;
}

.rounded-full {
  border-radius: 9999px;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.mr-4 {
  margin-right: 1rem;
}

.border-t {
  border-top: 1px solid #dcdcdd;
}

.border-gray-200 {
  border-color: #e5e7eb;
}

.pl-5 {
  padding-left: 1.25rem;
}

.list-disc {
  list-style-type: disc;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-gray-600 {
  color: #757575;
}

.text-center {
  text-align: center;
}

.chart-container {
  padding: 1rem;
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  height: 450px;
}

@media (max-width: 768px) {
  .purchase-plan-container {
    padding: 30px 20px;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
  
  .submit-section {
    flex-direction: column;
    align-items: center;
  }
  
  .button-section {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 250px;
  }
  
  .flex {
    flex-direction: column;
  }
  
  .mr-4 {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>