import { defineStore } from 'pinia'

export const usePriceStore = defineStore('price', {
  state: () => ({
    // 历史价格数据
    priceData: [
      { date: '2026/3/10', L_huabei: 7800, L_futures: 7767, PP_huadong: 7900, PP_futures: 7820 },
      { date: '2026/3/11', L_huabei: 8100, L_futures: 8154, PP_huadong: 8180, PP_futures: 8197 },
      { date: '2026/3/12', L_huabei: 8200, L_futures: 8236, PP_huadong: 8300, PP_futures: 8303 },
      { date: '2026/3/13', L_huabei: 8250, L_futures: 8416, PP_huadong: 8500, PP_futures: 8603 },
      { date: '2026/3/16', L_huabei: 8350, L_futures: 8677, PP_huadong: 8650, PP_futures: 8857 },
      { date: '2026/3/17', L_huabei: 8200, L_futures: 8496, PP_huadong: 8550, PP_futures: 8671 },
      { date: '2026/3/18', L_huabei: 8150, L_futures: 8431, PP_huadong: 8500, PP_futures: 8628 },
      { date: '2026/3/19', L_huabei: 8400, L_futures: 8916, PP_huadong: 8770, PP_futures: 9158 },
      { date: '2026/3/20', L_huabei: 8400, L_futures: 8818, PP_huadong: 8700, PP_futures: 9019 },
      { date: '2026/3/23', L_huabei: 8950, L_futures: 9523, PP_huadong: 9300, PP_futures: 9793 },
      { date: '2026/3/24', L_huabei: 8600, L_futures: 8918, PP_huadong: 9000, PP_futures: 9114 },
      { date: '2026/3/25', L_huabei: 8400, L_futures: 8715, PP_huadong: 8800, PP_futures: 8975 },
      { date: '2026/3/26', L_huabei: 8450, L_futures: 8767, PP_huadong: 8900, PP_futures: 9120 },
      { date: '2026/3/27', L_huabei: 8500, L_futures: 8868, PP_huadong: 9000, PP_futures: 9313 },
      { date: '2026/3/30', L_huabei: 8600, L_futures: 8804, PP_huadong: 9150, PP_futures: 9269 },
      { date: '2026/3/31', L_huabei: 8450, L_futures: 8614, PP_huadong: 9000, PP_futures: 9103 },
      { date: '2026/4/1', L_huabei: 8280, L_futures: 8380, PP_huadong: 8850, PP_futures: 8764 },
      { date: '2026/4/2', L_huabei: 8450, L_futures: 8625, PP_huadong: 9080, PP_futures: 9130 },
      { date: '2026/4/3', L_huabei: 8600, L_futures: 8799, PP_huadong: 9400, PP_futures: 9400 }
    ],
    // 今日价格数据
    todayPrice: {
      PE: 9200,
      PP: 8800,
      EG: 5200,
      SM: 7800
    }
  }),
  getters: {
    // 获取所有价格数据
    getAllPrices: (state) => state.priceData,
    // 获取今日价格
    getTodayPrice: (state) => state.todayPrice,
    // 获取价格范围
    getPriceRange: (state) => {
      const allPrices = state.priceData.flatMap(item => [
        item.L_huabei, 
        item.L_futures, 
        item.PP_huadong, 
        item.PP_futures
      ]);
      const min = Math.min(...allPrices) - 500;
      const max = Math.max(...allPrices) + 500;
      return { min, max };
    }
  },
  actions: {
    // 更新价格数据
    updatePriceData(newData) {
      this.priceData = newData;
    },
    // 更新今日价格
    updateTodayPrice(newPrice) {
      this.todayPrice = { ...this.todayPrice, ...newPrice };
    }
  }
})
