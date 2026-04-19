<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'

const activeStep = ref(1)
const productType = ref('price-protection')
const variety = ref('PP')
const quantity = ref(500)
const period = ref('30')
const region = ref('华东')
const preference = ref('balanced')
const targetPrice = ref(7850)
const lowerPrice = ref(7500)
const upperPrice = ref(8000)
const contact = ref('')
const calculationResult = ref(null)
const loading = ref(false)
const error = ref('')
const marketData = ref({
  spotPrice: 7600,
  futuresPrice: 7550,
  spotVol: 0.15,
  futuresVol: 0.18,
  updateTime: '2026-04-19 16:00'
})

const router = useRouter()

// 监听产品类型变化，显示或隐藏价格区间输入
const showRangePrice = ref(false)

watch(productType, (newValue) => {
  showRangePrice.value = newValue === 'range-settlement'
  // 根据产品类型重置目标价格
  if (newValue === 'price-protection') {
    targetPrice.value = 7850
  } else if (newValue === 'floor-price') {
    targetPrice.value = 7350
  } else {
    lowerPrice.value = 7500
    upperPrice.value = 8000
  }
})

// 计算当前产品名称
const productName = computed(() => {
  const names = {
    'price-protection': '保价采购',
    'floor-price': '封顶销售',
    'range-settlement': '区间结算'
  }
  return names[productType.value] || '保价采购'
})

// 方案偏好选项
const preferenceOptions = [
  { value: 'stronger', label: '更强保护' },
  { value: 'balanced', label: '平衡方案' },
  { value: 'lowerFee', label: '更低费用' }
]

// 周期选项
const periodOptions = [
  { value: '7', label: '7天' },
  { value: '15', label: '15天' },
  { value: '30', label: '30天' },
  { value: '60', label: '60天' }
]

// 获取市场数据
const fetchMarketData = async () => {
  try {
    const response = await fetch(`http://localhost:8080/api/market/price?symbol=${variety.value}`)
    if (response.ok) {
      const data = await response.json()
      marketData.value = data
    }
  } catch (err) {
    console.error('获取市场数据失败:', err)
  }
}

// 调用后端计算API
const handleGeneratePlan = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // 优先尝试调用后端API
    const requestData = {
      direction: productType.value === 'price-protection' ? 'purchase' : 'sales',
      symbol: variety.value,
      quantity: quantity.value,
      periodDays: parseInt(period.value),
      concern: productType.value === 'price-protection' ? 'price_increase' : productType.value === 'floor-price' ? 'price_decrease' : 'price_volatility',
      preference: preference.value,
      region: region.value
    }
    
    let apiEndpoint
    if (productType.value === 'price-protection') {
      apiEndpoint = 'http://localhost:8080/api/calculation/baojia'
    } else if (productType.value === 'floor-price') {
      apiEndpoint = 'http://localhost:8080/api/calculation/fengding'
    } else {
      apiEndpoint = 'http://localhost:8080/api/calculation/qujian'
    }
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    
    if (response.ok) {
      const result = await response.json()
      calculationResult.value = result
      console.log('计算结果:', result)
      // 存储计算结果到localStorage
      localStorage.setItem('calculationResult', JSON.stringify(result))
      localStorage.setItem('productType', productType.value)
      localStorage.setItem('quantity', quantity.value.toString())
      localStorage.setItem('period', period.value)
      localStorage.setItem('variety', variety.value)
      // 跳转到过渡页
      router.push('/transition')
    } else {
      // 后端API失败，使用模拟数据
      console.log('后端API失败，使用模拟数据')
      const mockResult = generateMockResult()
      calculationResult.value = mockResult
      // 存储计算结果到localStorage
      localStorage.setItem('calculationResult', JSON.stringify(mockResult))
      localStorage.setItem('productType', productType.value)
      localStorage.setItem('quantity', quantity.value.toString())
      localStorage.setItem('period', period.value)
      localStorage.setItem('variety', variety.value)
      // 跳转到过渡页
      router.push('/transition')
    }
  } catch (err) {
    console.error('计算失败:', err)
    // 网络错误，使用模拟数据
    const mockResult = generateMockResult()
    calculationResult.value = mockResult
    // 存储计算结果到localStorage
    localStorage.setItem('calculationResult', JSON.stringify(mockResult))
    localStorage.setItem('productType', productType.value)
    localStorage.setItem('quantity', quantity.value.toString())
    localStorage.setItem('period', period.value)
    localStorage.setItem('variety', variety.value)
    // 跳转到过渡页
    router.push('/transition')
  } finally {
    loading.value = false
  }
}

// 生成模拟计算结果
const generateMockResult = () => {
  // 使用从市场数据接口获取的价格作为基础
  const basePrice = marketData.value.spotPrice
  const futuresPrice = marketData.value.futuresPrice || (basePrice - 50)
  const futurePrice = basePrice * 1.085 // 模拟8.5%的涨幅
  const protectedPrice = basePrice * 1.033 // 模拟3.3%的保护价格
  const feePerTon = 85
  const totalFee = feePerTon * quantity.value
  
  return {
    spotPrice: basePrice,
    futuresPrice: futuresPrice,
    strikeSpot: protectedPrice,
    feePerTon: feePerTon,
    totalFee: totalFee,
    allInPrice: protectedPrice + feePerTon,
    varBefore: (futurePrice - basePrice) * quantity.value,
    varAfter: (protectedPrice - basePrice) * quantity.value + totalFee,
    reductionRate: 0.515,
    scenarios: [
      { priceChange: -0.10, futurePrice: basePrice * 0.9, costWithoutProtection: basePrice * 0.9 * quantity.value, costWithProtection: basePrice * 0.9 * quantity.value + totalFee, savings: -totalFee },
      { priceChange: -0.05, futurePrice: basePrice * 0.95, costWithoutProtection: basePrice * 0.95 * quantity.value, costWithProtection: basePrice * 0.95 * quantity.value + totalFee, savings: -totalFee },
      { priceChange: 0, futurePrice: basePrice, costWithoutProtection: basePrice * quantity.value, costWithProtection: basePrice * quantity.value + totalFee, savings: -totalFee },
      { priceChange: 0.05, futurePrice: basePrice * 1.05, costWithoutProtection: basePrice * 1.05 * quantity.value, costWithProtection: Math.min(basePrice * 1.05, protectedPrice) * quantity.value + totalFee, savings: (basePrice * 1.05 - protectedPrice) * quantity.value - totalFee },
      { priceChange: 0.10, futurePrice: basePrice * 1.1, costWithoutProtection: basePrice * 1.1 * quantity.value, costWithProtection: protectedPrice * quantity.value + totalFee, savings: (basePrice * 1.1 - protectedPrice) * quantity.value - totalFee }
    ],
    sensitivities: [
      { factor: '价格', change: -0.10, impact: '费用不变，保护效果增强' },
      { factor: '价格', change: 0.10, impact: '费用不变，保护效果减弱' },
      { factor: '波动率', change: -0.10, impact: '费用降低，保护范围缩小' },
      { factor: '波动率', change: 0.10, impact: '费用增加，保护范围扩大' },
      { factor: '周期', change: 15, impact: '费用降低，保护效果减弱' },
      { factor: '周期', change: 60, impact: '费用增加，保护效果增强' }
    ]
  }
}

// 页面加载时获取市场数据
onMounted(() => {
  fetchMarketData()
})

// 监听品种变化，更新市场数据
watch(variety, () => {
  fetchMarketData()
})

const handleResetParams = () => {
  // 重置参数
  productType.value = 'price-protection'
  variety.value = 'PP'
  quantity.value = 500
  period.value = '30'
  region.value = '华东'
  preference.value = 'balanced'
  targetPrice.value = 7850
  lowerPrice.value = 7500
  upperPrice.value = 8000
  contact.value = ''
  showRangePrice.value = false
  calculationResult.value = null
}
</script>

<template>
  <div class="calculation-page">
    <div class="calculation-container">
      <h1 class="page-title">智能测算</h1>
      <p class="page-description">输入相关参数，快速测算不同价格风险管理方案的成本与收益，帮助您做出最优决策。</p>
      
      <div class="grid-container">
        <!-- 左侧参数输入区 -->
        <div class="left-section">
          <div class="form-section">
            <h3 class="section-title">参数设置</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label>产品类型 <span class="required">*</span>：</label>
                <select v-model="productType" class="form-select">
                  <option value="price-protection">保价采购</option>
                  <option value="floor-price">保底销售</option>
                  <option value="range-settlement">区间结算</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>品种 <span class="required">*</span>：</label>
                <select v-model="variety" class="form-select">
                  <option value="PP">PP (聚丙烯)</option>
                  <option value="PE">PE (聚乙烯)</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>数量 (吨) <span class="required">*</span>：</label>
                <input type="number" v-model.number="quantity" class="form-input" min="1" max="100000" required>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>期限 (天) <span class="required">*</span>：</label>
                <select v-model="period" class="form-select">
                  <option value="30">30天</option>
                  <option value="60">60天</option>
                  <option value="90">90天</option>
                  <option value="180">180天</option>
                  <option value="365">365天</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>区域 <span class="required">*</span>：</label>
                <select v-model="region" class="form-select">
                  <option value="华东">华东</option>
                  <option value="华南">华南</option>
                  <option value="华北">华北</option>
                  <option value="华中">华中</option>
                  <option value="西南">西南</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>方案偏好 <span class="required">*</span>：</label>
                <select v-model="preference" class="form-select">
                  <option v-for="option in preferenceOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>期限 (天) <span class="required">*</span>：</label>
                <select v-model="period" class="form-select">
                  <option v-for="option in periodOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
            
            <!-- 目标价格 - 单一价格 -->
            <div v-if="!showRangePrice" class="form-row">
              <div class="form-group">
                <label>目标价格 (元/吨) <span class="required">*</span>：</label>
                <input type="number" v-model.number="targetPrice" class="form-input" min="5000" max="20000" required>
              </div>
            </div>
            
            <!-- 目标价格 - 价格区间 -->
            <div v-else class="form-row">
              <div class="form-group range-price">
                <label>价格区间 (元/吨) <span class="required">*</span>：</label>
                <div class="range-inputs">
                  <input type="number" v-model.number="lowerPrice" class="form-input" min="5000" max="20000" placeholder="区间下限" required>
                  <span class="range-separator">-</span>
                  <input type="number" v-model.number="upperPrice" class="form-input" min="5000" max="20000" placeholder="区间上限" required>
                </div>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>联系方式 <span class="required">*</span>：</label>
                <input type="text" v-model="contact" class="form-input" placeholder="请输入您的手机号码或邮箱" required>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 右侧市场信息区 -->
        <div class="right-section">
          <!-- 市场信息 -->
          <div class="info-card">
            <h3 class="card-title">市场信息</h3>
            
            <!-- 市场参考价 -->
            <div class="market-price">
              <h4 class="info-title">市场参考价</h4>
              <div class="price-value">{{ marketData.spotPrice ? marketData.spotPrice.toLocaleString() : 0 }} 元/吨</div>
              <div class="price-update">更新时间：{{ marketData.updateTime }}</div>
            </div>
            
            <!-- 历史价格走势 -->
            <div class="price-trend">
              <h4 class="info-title">历史价格走势</h4>
              <div class="trend-container">
                <div class="trend-labels">
                  <span>1个月前</span>
                  <span>现在</span>
                </div>
                <div class="trend-bar">
                  <div class="trend-progress" style="width: 60%"></div>
                </div>
                <div class="trend-values">
                  <span>8,500 元/吨</span>
                  <span>9,000 元/吨</span>
                </div>
              </div>
            </div>
            
            <!-- 市场预测 -->
            <div class="market-prediction">
              <h4 class="info-title">市场预测</h4>
              <div class="prediction-container">
                <div class="prediction-item">
                  <span class="prediction-label">看涨</span>
                  <span class="prediction-percentage">60%</span>
                </div>
                <div class="prediction-bar">
                  <div class="prediction-progress" style="width: 60%"></div>
                </div>
                <p class="prediction-desc">根据历史数据分析，未来3个月内价格上涨的可能性较大。</p>
              </div>
            </div>
          </div>
          
          <!-- 费用说明 -->
          <div class="info-card">
            <h3 class="card-title">费用说明</h3>
            <ul class="fee-list">
              <li>• 费用一般为货物价值的0.5%-2%</li>
              <li>• 根据市场波动情况调整</li>
              <li>• 期限越长，费用越高</li>
              <li>• 具体费用将在测算结果中显示</li>
            </ul>
          </div>
        </div>
      </div>
      
      <!-- 结果展示区 -->
      <div v-if="calculationResult" class="results-section">
        <h3 class="section-title">测算结果</h3>
        
        <!-- 核心结果卡片 -->
        <div class="result-cards">
          <div class="result-card">
            <h4 class="card-title">核心数据</h4>
            <div class="card-content">
              <div class="result-item">
                <span class="label">当前价格：</span>
                <span class="value">{{ calculationResult && calculationResult.spotPrice ? calculationResult.spotPrice.toLocaleString() : 0 }} 元/吨</span>
              </div>
              <div class="result-item">
                <span class="label">保护价格：</span>
                <span class="value">{{ calculationResult && calculationResult.strikeSpot ? calculationResult.strikeSpot.toLocaleString() : 0 }} 元/吨</span>
              </div>
              <div class="result-item">
                <span class="label">每吨费用：</span>
                <span class="value">{{ calculationResult && calculationResult.feePerTon ? calculationResult.feePerTon.toLocaleString() : 0 }} 元/吨</span>
              </div>
              <div class="result-item">
                <span class="label">总费用：</span>
                <span class="value">{{ calculationResult && calculationResult.totalFee ? calculationResult.totalFee.toLocaleString() : 0 }} 元</span>
              </div>
              <div class="result-item">
                <span class="label">综合采购价：</span>
                <span class="value">{{ calculationResult && calculationResult.allInPrice ? calculationResult.allInPrice.toLocaleString() : 0 }} 元/吨</span>
              </div>
            </div>
          </div>
          
          <div class="result-card">
            <h4 class="card-title">风险对比</h4>
            <div class="card-content">
              <div class="result-item">
                <span class="label">未保护风险：</span>
                <span class="value">{{ calculationResult && calculationResult.varBefore ? calculationResult.varBefore.toLocaleString() : 0 }} 元</span>
              </div>
              <div class="result-item">
                <span class="label">保护后风险：</span>
                <span class="value">{{ calculationResult && calculationResult.varAfter ? calculationResult.varAfter.toLocaleString() : 0 }} 元</span>
              </div>
              <div class="result-item">
                <span class="label">风险改善率：</span>
                <span class="value">{{ calculationResult && calculationResult.reductionRate ? (calculationResult.reductionRate * 100).toFixed(1) : 0 }}%</span>
              </div>
              <div class="result-item risk-savings">
                <span class="label">风险减少：</span>
                <span class="value savings">{{ calculationResult && calculationResult.varBefore && calculationResult.varAfter ? (calculationResult.varBefore - calculationResult.varAfter).toLocaleString() : 0 }} 元</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 情景分析表格 -->
        <div class="scenario-table">
          <h4 class="table-title">情景分析</h4>
          <table class="data-table">
            <thead>
              <tr>
                <th>价格变动</th>
                <th>未来价格</th>
                <th>未保护成本</th>
                <th>保护后成本</th>
                <th>节省金额</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(scenario, index) in calculationResult.scenarios" :key="index">
                <td>{{ scenario.priceChange ? (scenario.priceChange * 100).toFixed(0) : 0 }}%</td>
                <td>{{ scenario.futurePrice ? scenario.futurePrice.toLocaleString() : 0 }} 元/吨</td>
                <td>{{ scenario.costWithoutProtection ? scenario.costWithoutProtection.toLocaleString() : 0 }} 元</td>
                <td>{{ scenario.costWithProtection ? scenario.costWithProtection.toLocaleString() : 0 }} 元</td>
                <td :class="{ 'positive': scenario.savings > 0, 'negative': scenario.savings < 0 }">
                  {{ scenario.savings > 0 ? '+' : '' }}{{ scenario.savings ? scenario.savings.toLocaleString() : 0 }} 元
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- 敏感性分析 -->
        <div class="sensitivity-analysis">
          <h4 class="table-title">敏感性分析</h4>
          <table class="data-table">
            <thead>
              <tr>
                <th>影响因素</th>
                <th>变动幅度</th>
                <th>影响结果</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in calculationResult.sensitivities" :key="index">
                <td>{{ item.factor }}</td>
                <td>{{ typeof item.change === 'number' && item.change > 0 ? '+' : '' }}{{ item.change }}%</td>
                <td>{{ item.impact }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- 错误提示 -->
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <!-- 底部操作按钮区 -->
      <div class="button-section">
        <button class="btn-reset" @click="handleResetParams" :disabled="loading">重置参数</button>
        <button class="btn-generate" @click="handleGeneratePlan" :disabled="loading">
          <span v-if="loading">计算中...</span>
          <span v-else>生成方案</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculation-page {
  min-height: 100vh;
  background: #c6a86f;
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

.grid-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;
  margin-bottom: 40px;
}

.left-section {
  grid-column: 1;
}

.right-section {
  grid-column: 2;
}

.form-section {
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 30px;
  font-family: 'Courier New', monospace;
}

.form-row {
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  font-size: 1rem;
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.required {
  color: #e60012;
}

.form-select,
.form-input {
  padding: 10px;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1rem;
  font-family: 'Courier New', monospace;
  background: white;
}

.range-price {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 10px;
}

.range-inputs .form-input {
  flex: 1;
}

.range-separator {
  font-size: 1.2rem;
  font-weight: bold;
  color: #231815;
}

.info-card {
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
}

.info-title {
  font-size: 1rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 10px;
  font-family: 'Courier New', monospace;
}

.market-price {
  margin-bottom: 30px;
}

.price-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #e60012;
  margin-bottom: 5px;
  font-family: 'Courier New', monospace;
}

.price-update {
  font-size: 0.9rem;
  color: #595757;
  font-family: 'Courier New', monospace;
}

.price-trend {
  margin-bottom: 30px;
}

.trend-container {
  background: #f5f5f5;
  border-radius: 4px;
  padding: 15px;
}

.trend-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
  color: #595757;
  font-family: 'Courier New', monospace;
}

.trend-bar {
  height: 10px;
  background: #dcdcdd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.trend-progress {
  height: 100%;
  background: #e60012;
  border-radius: 5px;
}

.trend-values {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #595757;
  font-family: 'Courier New', monospace;
}

.market-prediction {
  margin-bottom: 20px;
}

.prediction-container {
  background: #f5f5f5;
  border-radius: 4px;
  padding: 15px;
}

.prediction-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9rem;
  font-family: 'Courier New', monospace;
}

.prediction-label {
  font-weight: bold;
  color: #231815;
}

.prediction-percentage {
  color: #e60012;
  font-weight: bold;
}

.prediction-bar {
  height: 10px;
  background: #dcdcdd;
  border-radius: 5px;
  margin-bottom: 10px;
}

.prediction-progress {
  height: 100%;
  background: #e60012;
  border-radius: 5px;
}

.prediction-desc {
  font-size: 0.9rem;
  color: #595757;
  line-height: 1.4;
  font-family: 'Courier New', monospace;
}

.fee-list {
  font-size: 0.9rem;
  color: #595757;
  line-height: 1.6;
  font-family: 'Courier New', monospace;
  list-style: none;
  padding: 0;
  margin: 0;
}

.fee-list li {
  margin-bottom: 10px;
}

.button-section {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn-reset,
.btn-generate {
  padding: 15px 40px;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.btn-reset {
  background: white;
  color: #231815;
}

.btn-reset:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
}

.btn-generate {
  background: #231815;
  color: white;
}

.btn-generate:hover {
  background: #595757;
  transform: translateY(-2px);
}

.results-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid #595757;
}

.result-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.result-card {
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.result-card .card-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 15px;
  font-family: 'Courier New', monospace;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.result-item:last-child {
  border-bottom: none;
}

.result-item .label {
  font-size: 0.9rem;
  color: #595757;
  font-family: 'Courier New', monospace;
}

.result-item .value {
  font-size: 1rem;
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.result-item .savings {
  color: #e60012;
}

.scenario-table,
.sensitivity-analysis {
  margin-bottom: 30px;
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 15px;
  font-family: 'Courier New', monospace;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  font-family: 'Courier New', monospace;
}

.data-table th {
  background: #f5f5f5;
  font-weight: bold;
  color: #231815;
}

.data-table tr:hover {
  background: #f9f9f9;
}

.data-table .positive {
  color: #28a745;
  font-weight: bold;
}

.data-table .negative {
  color: #dc3545;
  font-weight: bold;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 15px;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Courier New', monospace;
}

.btn-generate:disabled,
.btn-reset:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

@media (max-width: 768px) {
  .calculation-container {
    padding: 30px 20px;
  }
  
  .grid-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .left-section,
  .right-section {
    grid-column: 1;
  }
  
  .result-cards {
    grid-template-columns: 1fr;
  }
  
  .data-table {
    font-size: 0.9rem;
  }
  
  .data-table th,
  .data-table td {
    padding: 8px;
  }
  
  .button-section {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-reset,
  .btn-generate {
    width: 100%;
    max-width: 250px;
  }
}
</style>
