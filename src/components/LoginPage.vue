<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const verificationCode = ref('')
const router = useRouter()

const sendVerificationCode = () => {
  // 发送验证码的逻辑
  console.log('发送验证码到邮箱:', email.value)
  // 这里可以添加实际的发送验证码功能
}

const handleLogin = () => {
  // 登录逻辑
  console.log('登录:', { email: email.value, password: password.value, verificationCode: verificationCode.value })
  // 登录成功后跳转到用户中心
  router.push('/user-center')
}
</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <h2 class="login-title">用户登录</h2>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">邮箱：</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        
        <div class="form-group">
          <label for="password">密码：</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        
        <div class="form-group verification-code">
          <label for="verification-code">验证码：</label>
          <input type="text" id="verification-code" v-model="verificationCode" required>
          <button type="button" class="btn-send-code" @click="sendVerificationCode">发送至邮箱</button>
        </div>
        
        <button type="submit" class="btn-login">登录</button>
        
        <div class="register-link">
          没有账户默认注册新账户
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #e60012;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.login-container {
  background: #dedddd;
  border: 2px solid #595757;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.login-title {
  text-align: center;
  color: #231815;
  margin-bottom: 30px;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 1rem;
  color: #231815;
  font-weight: 500;
  font-family: 'Courier New', monospace;
}

.form-group input {
  padding: 10px;
  border: 1px solid #595757;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  font-family: 'Courier New', monospace;
}

.verification-code {
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.verification-code label {
  white-space: nowrap;
}

.verification-code input {
  flex: 1;
}

.btn-send-code {
  padding: 10px 15px;
  background: #e60012;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;
  font-family: 'Courier New', monospace;
}

.btn-send-code:hover {
  background: #b60005;
}

.btn-login {
  padding: 12px;
  background: #231815;
  color: white;
  border: 2px solid #595757;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.btn-login:hover {
  background: #595757;
  transform: translateY(-2px);
}

.register-link {
  text-align: center;
  font-size: 0.9rem;
  color: #595757;
  margin-top: 10px;
  font-family: 'Courier New', monospace;
}

@media (max-width: 768px) {
  .login-container {
    padding: 30px 20px;
  }
  
  .verification-code {
    flex-direction: column;
    align-items: stretch;
  }
  
  .verification-code label {
    white-space: normal;
  }
  
  .btn-send-code {
    width: 100%;
  }
}
</style>
