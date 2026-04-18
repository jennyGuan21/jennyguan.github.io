<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const isVisible = ref(false);
const router = useRouter();

onMounted(() => {
  isVisible.value = true;
});

const navigateToCaseSimulation = () => {
  router.push('/case-simulation');
};
</script>

<template>
  <section class="case-analysis" :class="{ 'is-visible': isVisible }">
    <div class="container">
      <div class="case-content">
        <button class="btn btn-outline case-btn" @click="navigateToCaseSimulation">案例模拟分析</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.case-analysis {
  padding: 40px 0;
  background: white;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease;
  margin: 20px auto;
  max-width: 1200px;
  border: 1px solid #dcdcdd;
}

.case-analysis.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.container {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 20px;
}

.case-content {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dedddd;
  padding: 30px;
  border: 1px solid #dcdcdd;
  border-radius: 4px;
}

.case-btn {
  padding: 12px 40px;
  font-size: 1.1rem;
  border-radius: 4px;
  background: transparent;
  color: #231815;
  border: 2px solid #595757;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.case-btn:hover {
  background: #595757;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(89, 87, 87, 0.4);
}

@media (max-width: 768px) {
  .case-btn {
    width: 100%;
    max-width: 250px;
  }
}
</style>