<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as echarts from 'echarts'

const route = useRoute()
const router = useRouter()
const activeTab = ref('保价采购')

const tabs = ['保价采购', '封顶销售', '区间结算']

const switchTab = (tab) => {
  activeTab.value = tab
}

const navigateToCalculation = () => {
  router.push('/calculation')
}

const navigateToCase = (caseType) => {
  if (caseType === '保价采购') {
    router.push('/case-baojia')
  } else if (caseType === '封顶销售') {
    router.push('/case-fengding')
  } else if (caseType === '区间结算') {
    router.push('/case-qujian')
  }
}

// 初始化图表
const initCharts = () => {
  // 保价采购图表
  const priceProtectionDom = document.getElementById('price-protection-chart')
  if (priceProtectionDom) {
    const priceProtectionChart = echarts.init(priceProtectionDom)
    const basePrice = 9000
    const marketPrices = Array.from({length: 21}, (_, i) => basePrice - 2000 + i * 200)
    
    priceProtectionChart.setOption({
      title: {
        text: '保价采购结算价格对比',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: marketPrices,
        name: '到期日市场价格 (元/吨)',
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: {
        type: 'value',
        name: '实际采购成本 (元/吨)',
        min: Math.min(...marketPrices) - 500
      },
      series: [
        {
          name: '保价采购方案',
          type: 'line',
          data: marketPrices.map(price => Math.min(price, basePrice)),
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
  
  // 封顶销售图表
  const floorPriceDom = document.getElementById('floor-price-chart')
  if (floorPriceDom) {
    const floorPriceChart = echarts.init(floorPriceDom)
    const basePrice = 9000
    const marketPrices = Array.from({length: 21}, (_, i) => basePrice - 2000 + i * 200)
    
    floorPriceChart.setOption({
      title: {
        text: '封顶销售结算价格对比',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: marketPrices,
        name: '到期日市场价格 (元/吨)',
        nameLocation: 'middle',
        nameGap: 30
      },
      yAxis: {
        type: 'value',
        name: '实际销售收益 (元/吨)',
        min: Math.min(...marketPrices) - 500
      },
      series: [
        {
          name: '封顶销售方案',
          type: 'line',
          data: marketPrices.map(price => Math.max(price, basePrice)),
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
          name: '普通销售方案',
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
  
  // 区间结算图表
  const rangeSettlementDom = document.getElementById('range-settlement-chart')
  if (rangeSettlementDom) {
    const rangeSettlementChart = echarts.init(rangeSettlementDom)
    const basePrice = 9000
    const lowerBound = basePrice - 500  // K1
    const upperBound = basePrice + 500  // K2
    const marketPrices = Array.from({length: 21}, (_, i) => basePrice - 1500 + i * 150)
    
    rangeSettlementChart.setOption({
      title: {
        text: '区间结算价格对比',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: marketPrices,
        name: '到期日市场价格 (元/吨)',
        nameLocation: 'middle',
        nameGap: 30,
        axisLine: {
          lineStyle: {
            color: '#333'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '实际结算价格 (元/吨)',
        min: Math.min(...marketPrices) - 500
      },
      series: [
        {
          name: '区间结算方案',
          type: 'line',
          data: marketPrices.map(price => {
            // 实现Z型结构：价格上涨到K2后不再上涨，价格下跌时跟随市场价格
            if (price >= upperBound) {
              return upperBound
            }
            return price
          }),
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
          name: '普通交易方案',
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
      ],
      graphic: [
        {
          type: 'line',
          shape: {
            x1: marketPrices.indexOf(upperBound),
            y1: 0,
            x2: marketPrices.indexOf(upperBound),
            y2: 1
          },
          style: {
            stroke: 'rgba(0, 0, 0, 0.3)',
            lineWidth: 1,
            lineDash: [5, 5]
          },
          bounding: 'raw',
          z: 100
        },
        {
          type: 'text',
          left: marketPrices.indexOf(upperBound) * 100 / (marketPrices.length - 1) + '%',
          top: '10%',
          style: {
            text: '上限 K2',
            fill: 'rgba(0, 0, 0, 0.6)'
          },
          z: 100
        }
      ]
    })
  }
}

onMounted(() => {
  // 检查URL参数，如果有type参数，就设置activeTab为对应的产品类型
  const productType = route.query.type
  if (productType && tabs.includes(productType)) {
    activeTab.value = productType
  }
  
  // 初始化图表
  setTimeout(() => {
    initCharts()
  }, 100)
})

// 监听标签切换，重新初始化图表
watch(activeTab, () => {
  // 增加延迟，确保DOM已经完全渲染
  setTimeout(() => {
    initCharts()
  }, 300)
})

// 监听窗口大小变化，重新调整图表大小
window.addEventListener('resize', () => {
  const priceProtectionChart = echarts.getInstanceByDom(document.getElementById('price-protection-chart'))
  if (priceProtectionChart) {
    priceProtectionChart.resize()
  }
  
  const floorPriceChart = echarts.getInstanceByDom(document.getElementById('floor-price-chart'))
  if (floorPriceChart) {
    floorPriceChart.resize()
  }
  
  const rangeSettlementChart = echarts.getInstanceByDom(document.getElementById('range-settlement-chart'))
  if (rangeSettlementChart) {
    rangeSettlementChart.resize()
  }
})
</script>

<template>
  <div class="product-center-page">
    <div class="product-center-container">
      <h1 class="page-title">产品中心</h1>
      
      <div class="product-nav">
        <button 
          v-for="tab in tabs" 
          :key="tab"
          :class="['nav-tab', { active: activeTab === tab }]"
          @click="switchTab(tab)"
        >
          {{ tab }}
        </button>
      </div>
      
      <div class="product-content">
        <div v-if="activeTab === '保价采购'" class="tab-content">
          <div class="product-header">
            <h2>保价采购</h2>
            <button class="btn-apply" @click="navigateToCalculation">立即测算</button>
          </div>
          
          <div class="product-description">
            <p>为你在采购提供价格保护，锁定原材料成本，在价格上涨时仍能以约定价格采购，规避价格上涨的风险。</p>
            <p>保价采购是一种原材料价格风险管理的创新金融工具。当你预计未来原材料价格可能上涨时，企业可以通过缴纳少量的保价费用，锁定原材料价格，当市场价格上涨时，企业仍可以以约定的保价价格采购，从而规避价格上涨的风险。</p>
          </div>
          
          <div class="product-params">
            <h3>产品参数</h3>
            <div class="params-grid">
              <div class="param-item">
                <span class="param-label">最小量</span>
                <span class="param-value">50吨</span>
              </div>
              <div class="param-item">
                <span class="param-label">最大量</span>
                <span class="param-value">5000吨</span>
              </div>
              <div class="param-item">
                <span class="param-label">服务费率</span>
                <span class="param-value">1.5%</span>
              </div>
              <div class="param-item">
                <span class="param-label">最长周期</span>
                <span class="param-value">180天</span>
              </div>
            </div>
          </div>
          
          <div class="applicable-scenario">
            <h3>适用场景</h3>
            <p>适用于需要采购原材料的企业，担心原材料价格上涨的企业，希望锁定原材料成本的企业，规避原材料价格上涨风险的企业。</p>
          </div>
          
          <div class="product-features">
            <h3>产品特点</h3>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">1</div>
                <div class="feature-content">
                  <h4>锁定采购实际价格</h4>
                  <p>协议价格为最终结算价格，无论市场价格如何波动，始终按照约定价格结算。</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">2</div>
                <div class="feature-content">
                  <h4>支付固定服务费</h4>
                  <p>只支付固定的服务费，无其他额外费用，成本可控，风险可预期。</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">3</div>
                <div class="feature-content">
                  <h4>保价价格下跌时保护</h4>
                  <p>当市场价格低于保价价格时，企业可以选择按市场价格采购，同时仍可获得部分补偿。</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">4</div>
                <div class="feature-content">
                  <h4>灵活的结算方式</h4>
                  <p>提供多种结算方式，满足不同企业的需求，减少企业的资金压力。</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="applicable-objects">
            <h3>适用对象</h3>
            <div class="objects-grid">
              <div class="object-item">
                <div class="object-icon">1</div>
                <div class="object-content">
                  <h4>下游加工厂</h4>
                  <p>担心原材料价格上涨，希望锁定生产成本，提高产品竞争力的加工企业。</p>
                </div>
              </div>
              <div class="object-item">
                <div class="object-icon">2</div>
                <div class="object-content">
                  <h4>贸易商</h4>
                  <p>希望锁定采购成本，稳定销售价格，提高盈利稳定性的贸易企业。</p>
                </div>
              </div>
              <div class="object-item">
                <div class="object-icon">3</div>
                <div class="object-content">
                  <h4>终端采购企业</h4>
                  <p>计划未来采购原材料，担心价格上涨，希望锁定采购成本的终端企业。</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="price-mechanism">
            <h3>价格机制</h3>
            <div class="mechanism-content">
              <h4>结算价格计算公式</h4>
              <div class="formula-section">
                <p>当锁定期结束时，结算价格的计算方式如下：</p>
                <p>当市场价格 ≤ 保价价格时：</p>
                <p>结算价格 = 市场价格 × 数量</p>
                <p>当市场价格 > 保价价格时：</p>
                <p>结算价格 = 保价价格 × 数量</p>
              </div>
              
              <div class="chart-section">
                <h4>保价采购结算价格示意图</h4>
                <div class="chart-container">
                  <div id="price-protection-chart" style="width: 100%; height: 400px;"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="case-illustration">
            <h3>案例说明</h3>
            <div class="case-content">
              <h4>某塑料加工厂保价采购案例</h4>
              <p>某塑料加工厂预计6个月后需要采购1000吨PP原料，当前市场价格为8500元/吨。若担心未来价格上涨，可选择保价采购服务。</p>
              <p><strong>场景一：价格上涨至9000元/吨</strong></p>
              <p>市场价格为9000元/吨，企业仍按保价价格8500元/吨采购，节省成本：(9000 - 8500) × 1000 = 500,000元</p>
              <p><strong>场景二：价格下跌至8450元/吨</strong></p>
              <p>市场价格为8450元/吨，企业按市场价格采购，实际成本：8450 × 1000 = 8,450,000元（参考值）</p>
            </div>
            <button class="btn-case-detail" @click="navigateToCase('保价采购')">查看完整案例</button>
          </div>
        </div>
        
        <div v-else-if="activeTab === '封顶销售'" class="tab-content">
          <div class="product-header">
            <h2>封顶销售</h2>
            <button class="btn-apply" @click="navigateToCalculation">立即测算</button>
          </div>
          
          <div class="product-description">
            <p>为你销售/库存提供价格保护，锁定销售收入底线，在价格下跌时仍能以约定价格结算，规避价格下跌风险。</p>
            <p>封顶销售是一种销售与库存价格风险管理的创新金融工具。当你预计未来产品价格可能下跌时，企业可以通过缴纳少量护价费用，锁定销售底价，当市场价格下跌时，企业仍可以按约定护价价格销售，从而规避价格下跌风险。</p>
          </div>
          
          <div class="product-params">
            <h3>产品参数</h3>
            <div class="params-grid">
              <div class="param-item">
                <span class="param-label">最小量</span>
                <span class="param-value">50吨</span>
              </div>
              <div class="param-item">
                <span class="param-label">最大量</span>
                <span class="param-value">5000吨</span>
              </div>
              <div class="param-item">
                <span class="param-label">服务费率</span>
                <span class="param-value">1.5%</span>
              </div>
              <div class="param-item">
                <span class="param-label">最长周期</span>
                <span class="param-value">180天</span>
              </div>
            </div>
          </div>
          
          <div class="applicable-scenario">
            <h3>适用场景</h3>
            <p>适用于有销售计划或持有库存的企业，担心产品价格下跌的企业，希望锁定销售收入的企业，规避价格下跌风险的企业。</p>
          </div>
          
          <div class="product-features">
            <h3>产品特点</h3>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">1</div>
                <div class="feature-content">
                  <h4>锁定销售底价</h4>
                  <p>协议价格为最终结算底价，无论市场价格如何下跌，始终不低于约定价格结算。</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">2</div>
                <div class="feature-content">
                  <h4>支付固定服务费</h4>
                  <p>只支付固定服务费，无其他额外费用，收益可控，风险可预期。</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">3</div>
                <div class="feature-content">
                  <h4>价格上涨时享收益</h4>
                  <p>当市场价格高于护价价格时，企业可按市场价格销售，享受上涨收益。</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">4</div>
                <div class="feature-content">
                  <h4>灵活结算方式</h4>
                  <p>提供多种结算方式，适配企业回款与库存周转节奏。</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="applicable-objects">
            <h3>适用对象</h3>
            <div class="objects-grid">
              <div class="object-item">
                <div class="object-icon">1</div>
                <div class="object-content">
                  <h4>上游生产企业</h4>
                  <p>担心产品跌价、希望锁定生产利润、稳定经营收益的生产型企业。</p>
                </div>
              </div>
              <div class="object-item">
                <div class="object-icon">2</div>
                <div class="object-content">
                  <h4>贸易商</h4>
                  <p>持有库存待售、希望锁定销售收益、控制敞口风险的贸易企业。</p>
                </div>
              </div>
              <div class="object-item">
                <div class="object-icon">3</div>
                <div class="object-content">
                  <h4>库存持有企业</h4>
                  <p>有库存积压、担心价格下跌、希望守住收入底线的企业。</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="price-mechanism">
            <h3>价格机制</h3>
            <div class="mechanism-content">
              <h4>结算价格计算公式</h4>
              <div class="formula-section">
                <p>当护价期结束时，结算价格计算方式如下：</p>
                <p>当市场价格 ≥ 护价价格时：</p>
                <p>结算价格 = 市场价格 × 数量</p>
                <p>当市场价格 ＜ 护价价格时：</p>
                <p>结算价格 = 护价价格 × 数量</p>
              </div>
              
              <div class="chart-section">
                <h4>封顶销售结算价格示意图</h4>
                <div class="chart-container">
                  <div id="floor-price-chart" style="width: 100%; height: 400px;"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="case-illustration">
            <h3>案例说明</h3>
            <div class="case-content">
              <h4>某化工企业封顶销售案例</h4>
              <p>某化工企业预计6个月后销售1000吨PE原料，当前市场价格8500元/吨。担心未来价格下跌，选择封顶销售服务。</p>
              <p><strong>场景一：价格下跌至8000元/吨</strong></p>
              <p>市场价格8000元/吨，企业仍按护价价格8500元/吨结算，保住收入：(8500-8000)×1000 = 500,000元</p>
              <p><strong>场景二：价格上涨至8600元/吨</strong></p>
              <p>市场价格8600元/吨，企业按市场价销售，实际收入：8600×1000 = 8,600,000元</p>
            </div>
            <button class="btn-case-detail" @click="navigateToCase('封顶销售')">查看完整案例</button>
          </div>
        </div>
        
        <div v-else-if="activeTab === '区间结算'" class="tab-content">
          <div class="product-header">
            <h2>区间结算</h2>
            <button class="btn-apply" @click="navigateToCalculation">立即测算</button>
          </div>
          
          <div class="product-description">
            <p>为采购/销售/库存提供价格平滑管理，把价格锁定在安全区间，不赌涨跌，稳定预算与经营节奏。</p>
            <p>区间结算是一种双向价格风险管理工具。企业不想判断市场涨跌方向，只需设定价格区间，区间内按市场价结算，超出区间按区间边界结算，实现价格波动可控、经营更稳定。</p>
          </div>
          
          <div class="product-params">
            <h3>产品参数</h3>
            <div class="params-grid">
              <div class="param-item">
                <span class="param-label">最小量</span>
                <span class="param-value">50吨</span>
              </div>
              <div class="param-item">
                <span class="param-label">最大量</span>
                <span class="param-value">5000吨</span>
              </div>
              <div class="param-item">
                <span class="param-label">服务费率</span>
                <span class="param-value">0.8%–1.2%</span>
              </div>
              <div class="param-item">
                <span class="param-label">最长周期</span>
                <span class="param-value">180天</span>
              </div>
            </div>
          </div>
          
          <div class="applicable-scenario">
            <h3>适用场景</h3>
            <p>适用于持续采购/销售/库存管理的企业，担心价格大幅波动、不想赌涨跌、希望稳定预算与接单节奏的企业。</p>
          </div>
          
          <div class="product-features">
            <h3>产品特点</h3>
            <div class="features-grid">
              <div class="feature-item">
                <div class="feature-icon">1</div>
                <div class="feature-content">
                  <h4>价格装进安全区间</h4>
                  <p>设定上下限，超出边界按边界价结算，波动被“装在箱子里”。</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">2</div>
                <div class="feature-content">
                  <h4>费用更低、性价比高</h4>
                  <p>双向温和保护，服务费显著低于单边保价/护价。</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">3</div>
                <div class="feature-content">
                  <h4>区间内随行就市</h4>
                  <p>区间内按市场价结算，保留合理收益空间，不浪费行情。</p>
                </div>
              </div>
              <div class="feature-item">
                <div class="feature-icon">4</div>
                <div class="feature-content">
                  <h4>全场景适配</h4>
                  <p>采购、销售、库存均可使用，一套方案稳全程。</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="applicable-objects">
            <h3>适用对象</h3>
            <div class="objects-grid">
              <div class="object-item">
                <div class="object-icon">1</div>
                <div class="object-content">
                  <h4>稳定预算型加工企业</h4>
                  <p>需要稳定报价、稳定成本、不想被波动打乱接单节奏的企业。</p>
                </div>
              </div>
              <div class="object-item">
                <div class="object-icon">2</div>
                <div class="object-content">
                  <h4>长期购销贸易商</h4>
                  <p>持续采销、希望平滑盈亏、控制整体风险的贸易企业。</p>
                </div>
              </div>
              <div class="object-item">
                <div class="object-icon">3</div>
                <div class="object-content">
                  <h4>稳健经营型企业</h4>
                  <p>不追求单边暴利、只想要经营确定性、风险中性的企业。</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="price-mechanism">
            <h3>价格机制</h3>
            <div class="mechanism-content">
              <h4>结算价格计算公式</h4>
              <div class="formula-section">
                <p>当结算期结束时，结算价格计算方式如下：</p>
                <p>市场价格 ＜ 区间下限：结算价格 = 区间下限 × 数量</p>
                <p>区间下限 ≤ 市场价格 ≤ 区间上限：结算价格 = 市场价格 × 数量</p>
                <p>市场价格 ＞ 区间上限：结算价格 = 区间上限 × 数量</p>
              </div>
              
              <div class="chart-section">
                <h4>区间结算价格示意图</h4>
                <div class="chart-container">
                  <div id="range-settlement-chart" style="width: 100%; height: 400px;"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="case-illustration">
            <h3>案例说明</h3>
            <div class="case-content">
              <h4>某塑编企业区间结算案例</h4>
              <p>某企业未来6个月持续采购PP原料，当前价8500元/吨，设定区间：8200–8800元/吨。</p>
              <p><strong>场景一：价格涨至9000元/吨（超上限）</strong></p>
              <p>按上限8800元/吨结算，控制成本上限。</p>
              <p><strong>场景二：价格跌至7900元/吨（超下限）</strong></p>
              <p>按下限8200元/吨结算，守住预算底线。</p>
              <p><strong>场景三：价格在8200–8800之间</strong></p>
              <p>按市场价正常结算，灵活享受行情。</p>
            </div>
            <button class="btn-case-detail" @click="navigateToCase('区间结算')">查看完整案例</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-center-page {
  min-height: 100vh;
  background: #c6a86f;
  padding: 80px 20px 40px;
}

.product-center-container {
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

.product-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  border-bottom: 2px solid #595757;
  padding-bottom: 10px;
}

.nav-tab {
  padding: 10px 20px;
  background: #231815;
  color: white;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.nav-tab:hover {
  background: #595757;
  transform: translateY(-2px);
}

.nav-tab.active {
  background: #e60012;
  border-color: #e60012;
}

.product-content {
  min-height: 400px;
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-content h2 {
  color: #231815;
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.tab-content p {
  color: #595757;
  line-height: 1.6;
  margin-bottom: 15px;
  font-family: 'Courier New', monospace;
}

.tab-content ul {
  color: #595757;
  line-height: 1.6;
  margin-left: 20px;
  margin-bottom: 15px;
  font-family: 'Courier New', monospace;
}

.tab-content li {
  margin-bottom: 8px;
}

/* 保价采购页面样式 */
.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #dcdcdd;
}

.product-header h2 {
  margin: 0;
}

.btn-apply {
  padding: 10px 20px;
  background: #e60012;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.btn-apply:hover {
  background: #b60005;
  transform: translateY(-2px);
}

.product-description {
  margin-bottom: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

.product-params {
  margin-bottom: 30px;
}

.params-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.param-item {
  padding: 15px;
  background: #f5f5f5;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.param-label {
  font-weight: bold;
  color: #595757;
  font-family: 'Courier New', monospace;
}

.param-value {
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.applicable-scenario {
  margin-bottom: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

.product-features {
  margin-bottom: 30px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.feature-item {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

.feature-icon {
  width: 30px;
  height: 30px;
  background: #e60012;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  flex-shrink: 0;
}

.feature-content h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.feature-content p {
  margin: 0;
  color: #595757;
  font-family: 'Courier New', monospace;
}

.applicable-objects {
  margin-bottom: 30px;
}

.objects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.object-item {
  display: flex;
  gap: 15px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

.object-icon {
  width: 30px;
  height: 30px;
  background: #e60012;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  flex-shrink: 0;
}

.object-content h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.object-content p {
  margin: 0;
  color: #595757;
  font-family: 'Courier New', monospace;
}

.price-mechanism {
  margin-bottom: 30px;
}

.mechanism-content {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

.formula-section {
  margin-bottom: 30px;
}

.chart-section {
  margin-top: 30px;
}

.chart-container {
  padding: 20px;
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  text-align: center;
  height: 450px;
}

.chart-placeholder {
  padding: 20px;
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  text-align: center;
}

.chart-title {
  font-weight: bold;
  margin-bottom: 20px;
  color: #231815;
  font-family: 'Courier New', monospace;
}

.chart-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.chart-line {
  width: 80%;
  height: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.chart-line.market-price {
  background: #ee7800;
}

.chart-line.protected-price {
  background: #fabe00;
}

.chart-line.settlement-price {
  background: #b60005;
}

.case-illustration {
  margin-bottom: 30px;
}

.case-content {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 20px;
}

.btn-case-detail {
  padding: 10px 20px;
  background: #231815;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.btn-case-detail:hover {
  background: #595757;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .product-center-container {
    padding: 30px 20px;
  }
  
  .product-nav {
    flex-direction: column;
    align-items: center;
  }
  
  .nav-tab {
    width: 100%;
    max-width: 200px;
  }
  
  .product-content {
    padding: 20px;
  }
  
  .product-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .params-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .objects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
