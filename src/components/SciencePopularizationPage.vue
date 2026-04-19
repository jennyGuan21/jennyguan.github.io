<script setup>
import { ref } from 'vue'

const activeCard = ref(1)

const cards = [
  {
    id: 1,
    title: '什么是期权',
    content: `期权是什么？
期权可以理解为一种"选择权"，也像一份"价格保险"。
它的作用不是帮企业赌市场方向，而是在价格剧烈波动时，帮助企业把最坏结果控制在更可接受的范围内。`
  },
  {
    id: 2,
    title: '期权有什么作用',
    content: `期权能解决什么问题？
对企业来说，期权最主要的作用有三个：
- 控制采购成本上升风险
- 保护销售收入和库存价值
- 提升预算稳定性和经营确定性`
  },
  {
    id: 3,
    title: '它和我们的产品有什么关系',
    content: `它怎么融入我们的产品？
我们把期权的底层逻辑，做成了三类更容易使用的方案：
- 保价采购：适合担心涨价的采购客户
- 库存价保：适合担心跌价的销售或库存客户
- 区间结算：适合更关注稳定经营的客户`
  },
  {
    id: 4,
    title: '客户需要懂复杂公式吗',
    content: `需要懂专业模型吗？
不需要。
系统会自动完成后台测算，客户只需要看懂几个核心结果：
- 当前价格
- 建议保护价或区间
- 服务费
- 风险变化`
  }
]
</script>

<template>
  <div class="science-page">
    <div class="science-container">
      <h1 class="page-title">期权科普</h1>
      
      <div class="content-wrapper">
        <div class="nav-section">
          <div 
            v-for="card in cards" 
            :key="card.id"
            class="nav-item"
            :class="{ active: activeCard === card.id }"
            @click="activeCard = card.id"
          >
            <div class="nav-card">
              <h3 class="nav-title">卡片 {{ card.id }}：{{ card.title }}</h3>
            </div>
          </div>
        </div>
        
        <div class="content-section">
          <div v-for="card in cards" :key="card.id" class="card-content" :class="{ active: activeCard === card.id }">
            <h2 class="card-title">{{ card.title }}</h2>
            <div class="card-text">
              <p v-for="(paragraph, index) in card.content.split('\n')" :key="index" class="paragraph">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.science-page {
  min-height: 100vh;
  background: #c6a86f;
  padding: 80px 20px 40px;
}

.science-container {
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

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.nav-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-right: 20px;
  border-right: 3px solid #595757;
}

.nav-item {
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-item:hover {
  transform: translateX(10px);
}

.nav-card {
  background: white;
  border: 2px solid #595757;
  border-radius: 4px;
  padding: 20px;
  transition: all 0.3s ease;
}

.nav-item.active .nav-card {
  background: #231815;
  border-color: #231815;
}

.nav-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #231815;
  margin: 0;
  font-family: 'Courier New', monospace;
}

.nav-item.active .nav-title {
  color: white;
}

.content-section {
  position: relative;
  min-height: 400px;
}

.card-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  transform: translateX(20px);
}

.card-content.active {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
  position: relative;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #231815;
  margin-bottom: 20px;
  font-family: 'Courier New', monospace;
}

.card-text {
  background: white;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
  padding: 25px;
}

.paragraph {
  color: #595757;
  line-height: 1.6;
  margin-bottom: 15px;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
}

.paragraph:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .science-container {
    padding: 30px 20px;
  }
  
  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .nav-section {
    border-right: none;
    border-bottom: 3px solid #595757;
    padding-right: 0;
    padding-bottom: 20px;
  }
  
  .nav-item:hover {
    transform: translateY(5px);
  }
}
</style>
