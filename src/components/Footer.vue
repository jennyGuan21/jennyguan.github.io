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
        
        <div class="footer-links">
          <h3 class="link-title">快速链接</h3>
          <ul>
            <li><a href="#">首页</a></li>
            <li><a href="#">产品中心</a></li>
            <li><a href="#">智能测算</a></li>
            <li><a href="#">案例模拟</a></li>
          </ul>
        </div>
        
        <div class="footer-links">
          <h3 class="link-title">联系我们</h3>
          <p class="contact-item">
            <span class="contact-icon">📍</span>
            <span>公司地址：北京市朝阳区金融街88号</span>
          </p>
          <p class="contact-item">
            <span class="contact-icon">📧</span>
            <span>邮箱：contact@wenlian.com</span>
          </p>
          <p class="contact-item">
            <span class="contact-icon">📞</span>
            <span>电话：+86 10 8888 8888</span>
          </p>
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-brand {
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 20px;
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