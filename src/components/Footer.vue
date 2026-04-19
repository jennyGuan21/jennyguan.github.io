<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="logo">
            <span class="logo-text">稳链护行</span>
          </div>
          <p class="brand-description">
            聚烯烃产业金融风控平台，为聚烯烃产业链客户提供专业的风险管理服务
          </p>
        </div>
        
        <div class="footer-info">
          <h3 class="link-title">四联创业集团股份有限公司</h3>
          <p class="contact-item">
            <span class="contact-icon">📞</span>
            <span>联系电话：010-81361789</span>
          </p>
          <p class="contact-item">
            <span class="contact-icon">📍</span>
            <span>北京市房山区燕山东流水路7号</span>
          </p>
          <div class="company-intro">
            <p>四联创业集团股份有限公司（简称四联创业集团）成立于2001年，总部位于北京市房山区，是一家以石油化工产品流通为主营业务的民营企业。公司主营聚乙烯、聚丙烯、合成橡胶等产品，广泛应用于农业、包装、汽车等领域。集团注册资本1.16亿元，法定代表人为廖承涛，在全国设有20余家分支机构及30余家子公司，构建了覆盖主流塑料消费地的分销网络，并通过自建仓储物流在30余城市布局40多个仓库，与中石化、中石油等大型化工企业保持长期合作。连续多年入选中国民营企业500强，2025年营业收入366.07亿元，位列第362位。</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: black;
  color: white;
  padding: 60px 0;
  margin: 20px auto;
  max-width: 1200px;
  border: 1px solid #dcdcdd;
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

.footer-brand {
  text-align: center;
  margin-bottom: 20px;
}

.footer-info {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.company-intro {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.company-intro p {
  color: #dcdcdd;
  line-height: 1.6;
  font-size: 0.9rem;
  margin: 0;
}

.logo-text {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
  display: block;
  margin-bottom: 1rem;
}

.brand-description {
  color: #c6a86f;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.footer-links h3 {
  color: #c6a86f;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.8rem;
}

.footer-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #c6a86f;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: white;
  line-height: 1.6;
}

.contact-icon {
  margin-right: 1rem;
  font-size: 1.2rem;
  color: #c6a86f;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .footer-brand {
    grid-column: 1;
  }
}
</style>