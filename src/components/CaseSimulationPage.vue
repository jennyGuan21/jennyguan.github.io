<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CASES, getCaseData } from '../data/cases'

const router = useRouter()
const route = useRoute()
const showDetail = ref(false)
const currentCase = ref(null)

const caseStudies = [
  {
    id: 1,
    title: '保价采购案例：某制造企业规避原材料价格上涨风险',
    description: '通过保价采购方案，该企业成功锁定了PP原材料价格，避免了价格上涨带来的成本增加。',
    result: '节省成本约120万元',
    category: '保价采购',
    background: '某制造企业是PP原材料的主要消耗方，月均采购量约500吨。2025年第三季度，企业预计未来3个月PP价格可能上涨，希望通过价格风险管理工具锁定采购成本，确保生产计划的稳定性和产品定价的合理性。',
    parameters: {
      productType: '保价采购',
      variety: 'PP (聚丙烯)',
      quantity: '1,500 吨',
      period: '90 天',
      protectedPrice: '8,800 元/吨',
      feeRatio: '1.0%'
    },
    solution: '企业与平台签订保价采购协议，约定在未来90天内以8,800元/吨的价格采购1,500吨PP原材料，费用为货物价值的1.0%（即132,000元）。到期结算规则：若到期日市场价格高于8,800元/吨，则按8,800元/吨结算；若到期日市场价格低于或等于8,800元/吨，则按市场价格结算。',
    comparison: {
      normalCost: '14,400,000 元',
      protectedCost: '13,332,000 元',
      saving: '1,068,000 元',
      marketPrice: '9,600元/吨',
      increase: '9.1%'
    }
  },
  {
    id: 2,
    title: '保底销售案例：某贸易公司保障产品利润',
    description: '面对市场价格下跌趋势，该公司通过保底销售方案，确保了产品的最低销售价格。',
    result: '保障利润约80万元',
    category: '保底销售',
    background: '某贸易公司持有大量PE库存，预计未来6个月市场价格可能下跌，希望通过价格风险管理工具保障销售收益，避免库存贬值带来的损失。',
    parameters: {
      productType: '保底销售',
      variety: 'PE (聚乙烯)',
      quantity: '2,000 吨',
      period: '180 天',
      protectedPrice: '9,200 元/吨',
      feeRatio: '1.2%'
    },
    solution: '企业与平台签订保底销售协议，约定在未来180天内以不低于9,200元/吨的价格销售2,000吨PE原材料，费用为货物价值的1.2%（即220,800元）。到期结算规则：若到期日市场价格低于9,200元/吨，则按9,200元/吨结算；若到期日市场价格高于或等于9,200元/吨，则按市场价格结算。',
    comparison: {
      normalRevenue: '16,800,000 元',
      protectedRevenue: '18,179,200 元',
      protection: '1,379,200 元',
      marketPrice: '8,400元/吨',
      decrease: '8.7%'
    }
  },
  {
    id: 3,
    title: '区间结算案例：某化工企业优化采购成本',
    description: '通过区间结算方案，该企业在价格波动区间内获得了更优惠的结算价格。',
    result: '采购成本降低约5%',
    category: '区间结算',
    background: '某化工企业需要长期采购乙二醇原料，预计未来价格将在一定区间内波动，希望通过价格风险管理工具获得更优惠的采购价格，同时控制价格波动风险。',
    parameters: {
      productType: '区间结算',
      variety: '乙二醇',
      quantity: '3,000 吨',
      period: '120 天',
      lowerBound: '5,000 元/吨',
      upperBound: '5,500 元/吨',
      feeRatio: '0.8%'
    },
    solution: '企业与平台签订区间结算协议，约定在未来120天内，若乙二醇价格在5,000-5,500元/吨之间，则按市场价下浮3%结算；若价格超出该区间，则按市场价格结算。费用为货物价值的0.8%（即126,000元）。',
    comparison: {
      normalCost: '15,750,000 元',
      rangeCost: '14,985,000 元',
      saving: '765,000 元',
      marketPrice: '5,250元/吨',
      savingPercent: '5%'
    }
  }
]

onMounted(() => {
  const caseId = route.query.id
  const caseType = route.query.type
  
  if (caseId) {
    const caseStudy = caseStudies.find(c => c.id.toString() === caseId)
    if (caseStudy) {
      showDetail.value = true
      currentCase.value = caseStudy
    }
  } else if (caseType) {
    // 根据类型参数显示对应的案例
    if (caseType === 'baojia' || caseType === 'qujian') {
      // 使用新的案例数据
      const caseData = getCaseData(caseType)
      if (caseData) {
        showDetail.value = true
        currentCase.value = {
          id: caseType,
          title: caseData.title,
          tags: caseData.tags,
          scenario: caseData.scenario,
          currentPrice: caseData.currentPrice,
          futurePrice: caseData.futurePrice,
          quantity: caseData.quantity,
          period: caseData.period,
          withoutPlan: caseData.withoutPlan,
          withPlan: caseData.withPlan,
          riskTips: caseData.riskTips,
          simpleVersion: caseData.simpleVersion
        }
      }
    } else {
      // 使用原有案例数据
      let caseStudy
      if (caseType === 'fengding') {
        caseStudy = caseStudies.find(c => c.id === 2)
      }
      
      if (caseStudy) {
        showDetail.value = true
        currentCase.value = caseStudy
      }
    }
  }
})

const viewCaseDetail = (caseStudy) => {
  showDetail.value = true
  currentCase.value = caseStudy
}

const backToCaseList = () => {
  showDetail.value = false
  currentCase.value = null
}

// 获取一眼看懂版标签
const getSimpleVersionLabel = (key) => {
  const labels = {
    currentPrice: '当前价格',
    futurePrice: '30天后市场价',
    withoutPlan: '不做方案',
    withPlan: '做方案后',
    riskReduction: '风险少暴露',
    recommendedRange: '建议区间',
    effect: '核心效果'
  }
  return labels[key] || key
}
</script>

<template>
  <div class="case-simulation-page">
    <div class="case-simulation-container">
      <h1 class="page-title">案例演示</h1>
      <p class="page-description">了解其他企业如何通过我们的平台方案有效管理价格风险，优化采购成本，保障销售收益。</p>
      
      <!-- 案例列表 -->
      <div v-if="!showDetail" class="case-list">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="caseStudy in caseStudies" :key="caseStudy.id" class="card">
            <div class="card-header">
              <h3 class="card-title">{{ caseStudy.title }}</h3>
            </div>
            <div class="card-body">
              <p>{{ caseStudy.description }}</p>
              <div class="result-value positive mt-4">{{ caseStudy.result }}</div>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary" @click="viewCaseDetail(caseStudy)">查看详情</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 案例详情 -->
      <div v-else-if="showDetail && currentCase" class="case-detail">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title case-title">{{ currentCase.title }}</h2>
            <div v-if="currentCase.tags" class="case-tags">
              <span v-for="(tag, index) in currentCase.tags" :key="index" class="tag">{{ tag }}</span>
            </div>
          </div>
          <div class="card-body">
            <!-- 新案例格式 (保价采购和区间结算) -->
            <div v-if="currentCase.scenario" class="mb-8">
              <!-- 客户场景 -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4">客户场景</h3>
                <div class="bg-gray-50 p-4 rounded">
                  <p class="case-description">{{ currentCase.scenario }}</p>
                </div>
              </div>
              
              <!-- 数字大字版 -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4">一眼看懂版</h3>
                <div class="bg-gray-50 p-6 rounded">
                  <div v-if="currentCase.simpleVersion" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="(value, key) in currentCase.simpleVersion" :key="key" class="result-item">
                      <span class="label">{{ getSimpleVersionLabel(key) }}：</span>
                      <span class="value">{{ value }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 风险提示 -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4">风险提示</h3>
                <div class="bg-gray-50 p-4 rounded">
                  <p class="case-description">{{ currentCase.riskTips }}</p>
                </div>
              </div>
              
              <!-- 结果对比 -->
              <div v-if="currentCase.withoutPlan && currentCase.withPlan" class="mb-8">
                <h3 class="text-xl font-semibold mb-4">结果对比</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="bg-gray-50 p-4 rounded">
                    <h4 class="font-semibold mb-2">不做方案</h4>
                    <p class="text-gray-600 mb-1">当前参考总成本</p>
                    <p class="text-xl font-bold">{{ currentCase.withoutPlan.totalCost.toLocaleString() }} 元</p>
                    <p class="text-gray-600 mt-4 mb-1">30天后成本</p>
                    <p class="text-xl font-bold text-primary">{{ currentCase.withoutPlan.futureCost.toLocaleString() }} 元</p>
                    <p class="text-gray-600 mt-4 mb-1">多支出</p>
                    <p class="text-xl font-bold text-primary">{{ currentCase.withoutPlan.extraCost.toLocaleString() }} 元</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded">
                    <h4 class="font-semibold mb-2">做保价采购方案</h4>
                    <p class="text-gray-600 mb-1">保护价格</p>
                    <p class="text-xl font-bold">{{ currentCase.withPlan.protectedPrice.toLocaleString() }} 元/吨</p>
                    <p class="text-gray-600 mt-4 mb-1">总费用</p>
                    <p class="text-xl font-bold">{{ currentCase.withPlan.fee.toLocaleString() }} 元</p>
                    <p class="text-gray-600 mt-4 mb-1">总成本</p>
                    <p class="text-xl font-bold text-success">{{ currentCase.withPlan.totalCost.toLocaleString() }} 元</p>
                    <p class="text-gray-600 mt-4 mb-1">节约</p>
                    <p class="text-xl font-bold text-success">{{ currentCase.withPlan.savings.toLocaleString() }} 元</p>
                  </div>
                </div>
              </div>
              
              <!-- 区间结算结果对比 -->
              <div v-else-if="currentCase.recommendedRange" class="mb-8">
                <h3 class="text-xl font-semibold mb-4">结果对比</h3>
                <div class="bg-gray-50 p-4 rounded">
                  <p class="mb-4">建议区间：{{ currentCase.recommendedRange.lower.toLocaleString() }}~{{ currentCase.recommendedRange.upper.toLocaleString() }} 元/吨</p>
                  <p class="mb-4">市场超出区间后：按边界结算</p>
                  <p class="mb-4">核心效果：价格波动被"装进箱子里"</p>
                  <div class="mt-6 p-4 bg-success/10 rounded">
                    <p class="text-success font-bold text-lg">高于{{ currentCase.recommendedRange.upper.toLocaleString() }}，不再继续按更高价结算；低于{{ currentCase.recommendedRange.lower.toLocaleString() }}，不再继续按更低价结算；区间内按市场价结算</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- 原有案例格式 -->
            <div v-else>
              <!-- 案例背景区 -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4">案例背景</h3>
                <div class="bg-gray-50 p-4 rounded">
                  <p class="case-description">{{ currentCase.background }}</p>
                </div>
              </div>
              
              <!-- 参数设定区 -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4">参数设定</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="bg-gray-50 p-4 rounded">
                    <p class="text-gray-600">产品类型</p>
                    <p class="font-semibold">{{ currentCase.parameters.productType }}</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded">
                    <p class="text-gray-600">品种</p>
                    <p class="font-semibold">{{ currentCase.parameters.variety }}</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded">
                    <p class="text-gray-600">数量</p>
                    <p class="font-semibold">{{ currentCase.parameters.quantity }}</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded">
                    <p class="text-gray-600">期限</p>
                    <p class="font-semibold">{{ currentCase.parameters.period }}</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded">
                    <p class="text-gray-600" v-if="currentCase.parameters.protectedPrice">保价/保底价格</p>
                    <p class="text-gray-600" v-else-if="currentCase.parameters.lowerBound">价格区间</p>
                    <p class="font-semibold" v-if="currentCase.parameters.protectedPrice">{{ currentCase.parameters.protectedPrice }}</p>
                    <p class="font-semibold" v-else-if="currentCase.parameters.lowerBound">{{ currentCase.parameters.lowerBound }} - {{ currentCase.parameters.upperBound }}</p>
                  </div>
                  <div class="bg-gray-50 p-4 rounded">
                    <p class="text-gray-600">费用比例</p>
                    <p class="font-semibold">{{ currentCase.parameters.feeRatio }}</p>
                  </div>
                </div>
              </div>
              
              <!-- 方案说明区 -->
              <div class="mb-8">
                <h3 class="text-xl font-semibold mb-4">方案说明</h3>
                <div class="bg-gray-50 p-4 rounded">
                  <p class="case-solution">{{ currentCase.solution }}</p>
                </div>
              </div>
              
              <!-- 结果对比区 -->
              <div>
                <h3 class="text-xl font-semibold mb-4">结果对比</h3>
                <div class="bg-gray-50 p-4 rounded">
                  <p class="mb-4" v-if="currentCase.comparison.marketPrice">
                    到期日市场价格{{ currentCase.comparison.increase ? '上涨至' : '下跌至' }}{{ currentCase.comparison.marketPrice }}{{ currentCase.comparison.increase ? '，比签约时上涨了' + currentCase.comparison.increase : '，比签约时下跌了' + currentCase.comparison.decrease }}。
                  </p>
                  <p class="mb-4" v-else-if="currentCase.comparison.savingPercent">
                    到期日市场价格为{{ currentCase.comparison.marketPrice }}，在约定区间内。
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                      <h4 class="font-semibold mb-2">普通采购/销售方案</h4>
                      <p class="text-gray-600 mb-1" v-if="currentCase.comparison.normalCost">采购成本</p>
                      <p class="text-gray-600 mb-1" v-else-if="currentCase.comparison.normalRevenue">销售收益</p>
                      <p class="text-2xl font-bold text-primary" v-if="currentCase.comparison.normalCost">{{ currentCase.comparison.normalCost }}</p>
                      <p class="text-2xl font-bold text-primary" v-else-if="currentCase.comparison.normalRevenue">{{ currentCase.comparison.normalRevenue }}</p>
                    </div>
                    <div>
                      <h4 class="font-semibold mb-2">{{ currentCase.parameters.productType }}方案</h4>
                      <p class="text-gray-600 mb-1" v-if="currentCase.comparison.protectedCost">采购成本</p>
                      <p class="text-gray-600 mb-1" v-else-if="currentCase.comparison.protectedRevenue">销售收益</p>
                      <p class="text-2xl font-bold text-success" v-if="currentCase.comparison.protectedCost">{{ currentCase.comparison.protectedCost }}</p>
                      <p class="text-2xl font-bold text-success" v-else-if="currentCase.comparison.protectedRevenue">{{ currentCase.comparison.protectedRevenue }}</p>
                    </div>
                  </div>
                  <div class="mt-6 p-4 bg-success/10 rounded">
                    <p class="text-success font-bold text-lg case-result" v-if="currentCase.comparison.saving">节省成本：{{ currentCase.comparison.saving }}</p>
                    <p class="text-success font-bold text-lg case-result" v-else-if="currentCase.comparison.protection">保障收益：{{ currentCase.comparison.protection }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-outline" @click="backToCaseList">返回案例列表</button>
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

.result-value {
  font-size: 1.1rem;
  font-weight: bold;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
}

.result-value.positive {
  background: rgba(76, 175, 80, 0.1);
  color: #4caf50;
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

.case-title {
  font-size: 1.5rem;
}

.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.tag {
  background: #e60012;
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-family: 'Courier New', monospace;
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
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.result-item .value {
  font-weight: bold;
  color: #e60012;
  font-family: 'Courier New', monospace;
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
</style
