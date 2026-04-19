<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import PriceSection from './components/PriceSection.vue'
import ProductSection from './components/ProductSection.vue'
import QuickCalculation from './components/QuickCalculation.vue'
import CaseAnalysis from './components/CaseAnalysis.vue'
import Footer from './components/Footer.vue'
import Loading from './components/Loading.vue'

const router = useRouter()
const isLoading = ref(false)

onMounted(() => {
  // 添加路由守卫
  router.beforeEach((to, from, next) => {
    isLoading.value = true
    next()
  })
  
  router.afterEach(() => {
    // 模拟加载时间
    setTimeout(() => {
      isLoading.value = false
    }, 800)
  })
})
</script>

<template>
  <div class="app">
    <NavBar />
    <Loading v-if="isLoading" />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <div v-if="$route.path === '/'" class="home-content">
      <HeroSection />
      <PriceSection />
      <ProductSection />
      <QuickCalculation />
      <CaseAnalysis />
      <Footer />
    </div>
  </div>
</template>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #231815;
  background: #c6a86f;
}

.app {
  min-height: 100vh;
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #dcdcdd;
}

::-webkit-scrollbar-thumb {
  background: #595757;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #231815;
}

/* 路由过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.home-content {
  min-height: calc(100vh - 60px);
}
</style>
