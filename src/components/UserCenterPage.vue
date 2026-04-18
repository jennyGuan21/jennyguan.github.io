<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const companyName = ref('示例公司')
const randomId = ref('UC' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'))
const router = useRouter()

const handleLogout = () => {
  // 退出登录逻辑
  console.log('退出登录')
  // 退出登录后跳转到登录页面
  router.push('/login')
}

const handleMenuItemClick = (item) => {
  // 处理菜单项点击
  console.log('点击菜单项:', item)
  // 这里可以添加实际的菜单项点击逻辑
}
</script>

<template>
  <div class="user-center-page">
    <div class="user-center-container">
      <div class="user-info">
        <div class="company-info">
          <input type="text" v-model="companyName" class="company-input">
        </div>
        <div class="id-info">
          <input type="text" v-model="randomId" class="id-input" readonly>
        </div>
      </div>
      
      <div class="menu-divider"></div>
      
      <div class="menu-container">
        <div class="menu-item" @click="handleMenuItemClick('我的信息')">
          我的信息
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item" @click="handleMenuItemClick('我的方案')">
          我的方案
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item" @click="handleMenuItemClick('有关于公司')">
          有关于公司
          <span class="info-icon">ⓘ</span>
        </div>
        <div class="menu-divider"></div>
        <div class="menu-item" @click="handleMenuItemClick('客服')">
          客服
        </div>
      </div>
      
      <div class="logout-button">
        <button class="btn-logout" @click="handleLogout">退出登录</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-center-page {
  min-height: 100vh;
  background: #e60012;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.user-center-container {
  background: #dedddd;
  border: 2px solid #595757;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.company-info, .id-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.company-input, .id-input {
  padding: 10px;
  border: 1px solid #595757;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  font-family: 'Courier New', monospace;
  text-align: center;
  width: 100%;
  max-width: 200px;
}

.menu-divider {
  height: 2px;
  background: #595757;
  margin: 10px 0;
}

.menu-container {
  margin: 20px 0;
}

.menu-item {
  padding: 15px;
  background: white;
  border: 1px solid #595757;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-item:hover {
  background: #f5f5f5;
  transform: translateY(-2px);
}

.info-icon {
  font-size: 1.2rem;
  color: #e60012;
}

.logout-button {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.btn-logout {
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

.btn-logout:hover {
  background: #595757;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .user-center-container {
    padding: 30px 20px;
  }
}
</style>
