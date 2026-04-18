<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isVisible = ref(false);
const router = useRouter();

onMounted(() => {
  isVisible.value = true;
});

const navigateToCalculation = () => {
  router.push('/calculation');
};
</script>

<template>
  <section class="quick-calculation" :class="{ 'is-visible': isVisible }">
    <div class="container">
      <div class="calculation-content">
        <h2 class="calculation-title">快速测算：为您提供最合适的方案</h2>
        <button class="btn btn-primary calculate-btn" @click="navigateToCalculation">立即测算</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quick-calculation {
  padding: 40px 0;
  background: white;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease;
  margin: 20px auto;
  max-width: 1200px;
  border: 1px solid #dcdcdd;
}

.quick-calculation.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
}

.calculation-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #dedddd;
  padding: 30px;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
}

.calculation-title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #231815;
  margin: 0;
  flex: 1;
  font-family: 'Courier New', monospace;
}

.calculate-btn {
  padding: 12px 30px;
  font-size: 1.1rem;
  border-radius: 25px;
  background: #e60012;
  color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calculate-btn:hover {
  background: #b60005;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(230, 0, 18, 0.4);
}

@media (max-width: 768px) {
  .calculation-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  
  .calculation-title {
    font-size: 1.1rem;
  }
  
  .calculate-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>