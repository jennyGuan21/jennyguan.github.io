<script setup>
import { ref } from 'vue'

const activeTab = ref('保价采购')

const tabs = ['保价采购', '封顶销售', '区间结算']

const switchTab = (tab) => {
  activeTab.value = tab
}
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
            <button class="btn-apply">立即申请</button>
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
                <div class="chart-placeholder">
                  <!-- 这里可以添加实际的图表 -->
                  <div class="chart-title">结算价格对比图</div>
                  <div class="chart-content">
                    <div class="chart-line market-price">市场价格</div>
                    <div class="chart-line protected-price">保价价格</div>
                    <div class="chart-line settlement-price">结算价格</div>
                  </div>
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
            <button class="btn-case-detail">查看完整案例</button>
          </div>
        </div>
        
        <div v-else-if="activeTab === '封顶销售'" class="tab-content">
          <h2>封顶销售</h2>
          <p>为生产户提供价格保护，锁定销售价格上限，在价格下跌时仍能以约定价格销售，同时保留价格上涨时的收益机会。</p>
          <p>封顶销售是一种为生产者提供价格保障的工具，通过设定销售价格的上限，生产者可以在价格下跌时获得保护，同时在价格上涨时仍能享受收益。</p>
          <p>封顶销售的优势：</p>
          <ul>
            <li>锁定最低销售价格</li>
            <li>保留价格上涨时的收益</li>
            <li>提高生产计划的稳定性</li>
            <li>增强市场竞争力</li>
          </ul>
        </div>
        
        <div v-else-if="activeTab === '区间结算'" class="tab-content">
          <h2>区间结算</h2>
          <p>在约定价格区间内享受更优惠的价格，既规避了价格大幅波动的风险，又能在区间内获得更好的成本优势。</p>
          <p>区间结算是一种灵活的定价机制，通过设定价格区间，买卖双方可以在区间内享受更优惠的价格，同时规避价格大幅波动的风险。</p>
          <p>区间结算的优势：</p>
          <ul>
            <li>价格区间内享受优惠价格</li>
            <li>规避价格大幅波动风险</li>
            <li>提高交易灵活性</li>
            <li>平衡买卖双方利益</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-center-page {
  min-height: 100vh;
  background: #e60012;
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
