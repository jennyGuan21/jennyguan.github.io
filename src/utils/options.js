/**
 * 标准正态分布累积分布函数
 */
function normCDF(x) {
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911
  
  const sign = x < 0 ? -1 : 1
  x = Math.abs(x) / Math.sqrt(2)
  
  const t = 1.0 / (1.0 + p * x)
  const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  
  return 0.5 * (1.0 + sign * erf)
}

/**
 * 看涨期权（BS模型）
 * @param {Object} params - 参数对象
 * @param {number} params.F0 - 期货价格
 * @param {number} params.K - 执行价格
 * @param {number} params.r - 无风险利率
 * @param {number} params.sigma - 波动率
 * @param {number} params.T - 时间（年）
 * @returns {number} 期权价格
 */
export function calculateCallOption(params) {
  const { F0, K, r, sigma, T } = params
  
  if (T === 0) return Math.max(F0 - K, 0)
  
  const d1 = (Math.log(F0 / K) + 0.5 * sigma * sigma * T) / (sigma * Math.sqrt(T))
  const d2 = d1 - sigma * Math.sqrt(T)
  
  const callPrice = Math.exp(-r * T) * (F0 * normCDF(d1) - K * normCDF(d2))
  return callPrice
}

/**
 * 看跌期权（BS模型）
 * @param {Object} params - 参数对象
 * @param {number} params.F0 - 期货价格
 * @param {number} params.K - 执行价格
 * @param {number} params.r - 无风险利率
 * @param {number} params.sigma - 波动率
 * @param {number} params.T - 时间（年）
 * @returns {number} 期权价格
 */
export function calculatePutOption(params) {
  const { F0, K, r, sigma, T } = params
  
  if (T === 0) return Math.max(K - F0, 0)
  
  const d1 = (Math.log(F0 / K) + 0.5 * sigma * sigma * T) / (sigma * Math.sqrt(T))
  const d2 = d1 - sigma * Math.sqrt(T)
  
  const putPrice = Math.exp(-r * T) * (K * normCDF(-d2) - F0 * normCDF(-d1))
  return putPrice
}

/**
 * 计算区间期权（看跌期权 - 看涨期权）
 * @param {Object} params - 参数对象
 * @returns {number} 区间期权价格
 */
export function calculateRangeOption(params) {
  const { F0, lowerK, upperK, r, sigma, T } = params
  
  const putPrice = calculatePutOption({ F0, K: lowerK, r, sigma, T })
  const callPrice = calculateCallOption({ F0, K: upperK, r, sigma, T })
  
  return putPrice - callPrice
}