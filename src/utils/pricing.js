import { PARAMETERS } from '../data/parameters'
import { calculateCallOption, calculatePutOption, calculateRangeOption } from './options'
import { calculateVaR, calculateRiskReductionRate } from './var'

/**
 * 保价采购核心计算
 * @param {Object} params - 用户输入参数
 * @param {Object} marketData - 市场数据
 * @returns {Object} 计算结果
 */
export function calculateBaojia(params, marketData) {
  const { quantity, periodDays, preference } = params
  const { spotPrice, futuresPrice, spotVol, futuresVol } = marketData
  
  // 时间参数
  const T = periodDays / 360
  
  // 获取偏好系数
  const pref = PARAMETERS.preference[preference]
  
  // 现货保护价
  const strikeSpot = spotPrice * (1 + pref.a * spotVol * Math.sqrt(T) * PARAMETERS.m)
  
  // 基差
  const basis = spotPrice - futuresPrice
  
  // 期货执行价
  const strikeFutures = strikeSpot - basis
  
  // 看涨期权费（BS模型）
  const optionFeePerTon = calculateCallOption({
    F0: futuresPrice,
    K: strikeFutures,
    r: PARAMETERS.r,
    sigma: futuresVol,
    T
  })
  
  // 服务费
  const serviceFeePerTon = optionFeePerTon * PARAMETERS.lambda
  
  // 综合采购价
  const totalFeePerTon = optionFeePerTon + serviceFeePerTon
  const allInPrice = strikeSpot + totalFeePerTon
  
  // VaR计算
  const varBefore = calculateVaR({
    spotPrice, quantity, volatility: spotVol, T, Z: PARAMETERS.Z
  })
  
  const varAfter = calculateVaR({
    spotPrice: allInPrice, quantity, volatility: spotVol, T, Z: PARAMETERS.Z
  })
  
  const reductionRate = calculateRiskReductionRate(varBefore, varAfter)
  
  // 情景分析
  const scenarios = PARAMETERS.priceScenarios.map(delta => {
    const futurePrice = spotPrice * (1 + delta)
    const costWithoutProtection = futurePrice * quantity
    const costWithProtection = Math.min(futurePrice, strikeSpot) * quantity + totalFeePerTon * quantity
    return {
      priceChange: delta,
      futurePrice,
      costWithoutProtection,
      costWithProtection,
      savings: costWithoutProtection - costWithProtection
    }
  })
  
  return {
    spotPrice,
    futuresPrice,
    strikeSpot,
    feePerTon: totalFeePerTon,
    totalFee: totalFeePerTon * quantity,
    allInPrice,
    varBefore,
    varAfter,
    reductionRate,
    scenarios
  }
}

/**
 * 封顶销售/库存护价核心计算
 * @param {Object} params - 用户输入参数
 * @param {Object} marketData - 市场数据
 * @returns {Object} 计算结果
 */
export function calculateFengding(params, marketData) {
  const { quantity, periodDays, preference } = params
  const { spotPrice, futuresPrice, spotVol, futuresVol } = marketData
  
  // 时间参数
  const T = periodDays / 360
  
  // 获取偏好系数
  const pref = PARAMETERS.preference[preference]
  
  // 现货保护价
  const strikeSpot = spotPrice * (1 - pref.a * spotVol * Math.sqrt(T) * PARAMETERS.m)
  
  // 基差
  const basis = spotPrice - futuresPrice
  
  // 期货执行价
  const strikeFutures = strikeSpot - basis
  
  // 看跌期权费（BS模型）
  const optionFeePerTon = calculatePutOption({
    F0: futuresPrice,
    K: strikeFutures,
    r: PARAMETERS.r,
    sigma: futuresVol,
    T
  })
  
  // 服务费
  const serviceFeePerTon = optionFeePerTon * PARAMETERS.lambda
  
  // 综合费用
  const totalFeePerTon = optionFeePerTon + serviceFeePerTon
  const totalFee = totalFeePerTon * quantity
  
  // 收入保护下限
  const incomeFloor = strikeSpot * quantity - totalFee
  
  // VaR计算
  const varBefore = calculateVaR({
    spotPrice, quantity, volatility: spotVol, T, Z: PARAMETERS.Z
  })
  
  const varAfter = calculateVaR({
    spotPrice: strikeSpot, quantity, volatility: spotVol, T, Z: PARAMETERS.Z
  }) + totalFee
  
  const reductionRate = calculateRiskReductionRate(varBefore, varAfter)
  
  // 情景分析
  const scenarios = PARAMETERS.priceScenarios.map(delta => {
    const futurePrice = spotPrice * (1 + delta)
    const revenueWithoutProtection = futurePrice * quantity
    const revenueWithProtection = Math.max(futurePrice, strikeSpot) * quantity - totalFee
    return {
      priceChange: delta,
      futurePrice,
      revenueWithoutProtection,
      revenueWithProtection,
      savings: revenueWithProtection - revenueWithoutProtection
    }
  })
  
  return {
    spotPrice,
    futuresPrice,
    strikeSpot,
    feePerTon: totalFeePerTon,
    totalFee,
    incomeFloor,
    varBefore,
    varAfter,
    reductionRate,
    scenarios
  }
}

/**
 * 区间结算核心计算
 * @param {Object} params - 用户输入参数
 * @param {Object} marketData - 市场数据
 * @returns {Object} 计算结果
 */
export function calculateQujian(params, marketData) {
  const { quantity, periodDays, preference } = params
  const { spotPrice, futuresPrice, spotVol } = marketData
  
  // 时间参数
  const T = periodDays / 360
  
  // 获取偏好系数
  const pref = PARAMETERS.preference[preference]
  
  // 区间上下限
  const lowerSpot = spotPrice * (1 - pref.beta * spotVol * Math.sqrt(T) * PARAMETERS.m)
  const upperSpot = spotPrice * (1 + pref.beta * spotVol * Math.sqrt(T) * PARAMETERS.m)
  
  // 简化费用计算
  const optionFeePerTon = spotPrice * spotVol * Math.sqrt(T) * PARAMETERS.optionFeeCoefficient.qujian
  const serviceFeePerTon = optionFeePerTon * PARAMETERS.lambda
  const totalFeePerTon = optionFeePerTon + serviceFeePerTon
  const totalFee = totalFeePerTon * quantity
  
  // VaR计算
  const varBefore = calculateVaR({
    spotPrice, quantity, volatility: spotVol, T, Z: PARAMETERS.Z
  })
  
  const varAfter = calculateVaR({
    spotPrice, quantity, volatility: spotVol * pref.h, T, Z: PARAMETERS.Z
  }) + totalFee
  
  const reductionRate = calculateRiskReductionRate(varBefore, varAfter)
  
  // 情景分析
  const scenarios = PARAMETERS.priceScenarios.map(delta => {
    const futurePrice = spotPrice * (1 + delta)
    const settlementPrice = Math.max(lowerSpot, Math.min(futurePrice, upperSpot))
    const costWithoutProtection = futurePrice * quantity
    const costWithProtection = settlementPrice * quantity + totalFee
    return {
      priceChange: delta,
      futurePrice,
      settlementPrice,
      costWithoutProtection,
      costWithProtection,
      savings: costWithoutProtection - costWithProtection
    }
  })
  
  return {
    spotPrice,
    futuresPrice,
    lowerSpot,
    upperSpot,
    feePerTon: totalFeePerTon,
    totalFee,
    varBefore,
    varAfter,
    reductionRate,
    scenarios
  }
}