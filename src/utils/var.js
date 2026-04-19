/**
 * 计算VaR（Value at Risk）
 * @param {Object} params - 参数对象
 * @param {number} params.spotPrice - 现货价格
 * @param {number} params.quantity - 数量
 * @param {number} params.volatility - 波动率
 * @param {number} params.T - 时间（年）
 * @param {number} params.Z - 置信系数（默认1.65，对应95%置信度）
 * @returns {number} VaR值
 */
export function calculateVaR(params) {
  const { spotPrice, quantity, volatility, T, Z = 1.65 } = params
  
  // 计算日波动率
  const dailyVolatility = volatility / Math.sqrt(252) // 252个交易日
  
  // 计算持有期波动率
  const periodVolatility = dailyVolatility * Math.sqrt(T * 365) // 转换为实际天数
  
  // 计算VaR
  const varValue = spotPrice * quantity * Z * periodVolatility
  
  return varValue
}

/**
 * 计算风险改善率
 * @param {number} varBefore - 未保护时的VaR
 * @param {number} varAfter - 保护后的VaR
 * @returns {number} 风险改善率
 */
export function calculateRiskReductionRate(varBefore, varAfter) {
  if (varBefore === 0) return 0
  return Math.abs(varBefore - varAfter) / varBefore
}

/**
 * 计算保价采购后的VaR
 * @param {Object} params - 参数对象
 * @param {number} params.spotPrice - 现货价格
 * @param {number} params.quantity - 数量
 * @param {number} params.volatility - 波动率
 * @param {number} params.T - 时间（年）
 * @param {number} params.K - 保护价格
 * @param {number} params.totalFee - 总费用
 * @param {number} params.Z - 置信系数
 * @returns {number} 保护后的VaR
 */
export function calculateProtectedVaR(params) {
  const { spotPrice, quantity, volatility, T, K, totalFee, Z = 1.65 } = params
  
  // 计算最坏情况下的成本
  const worstCaseCost = Math.min(spotPrice * (1 + volatility * Math.sqrt(T) * Z), K) * quantity + totalFee
  
  // 计算基准成本
  const baseCost = spotPrice * quantity
  
  // 计算保护后的VaR
  const varAfter = Math.max(worstCaseCost - baseCost, 0)
  
  return varAfter
}