<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  // 模拟加载过程
  const timer = setTimeout(() => {
    isLoading.value = false
  }, 1000)
  
  return () => clearTimeout(timer)
})
</script>

<template>
  <div v-if="isLoading" class="loading-container">
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p class="loading-text">加载中...</p>
    </div>
  </div>
</template>

<style scoped>
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #e60012;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 5px solid #dedddd;
  border-top: 5px solid #231815;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #231815;
  font-family: 'Courier New', monospace;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
