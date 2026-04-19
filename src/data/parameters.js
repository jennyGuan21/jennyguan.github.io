/**
 * 系统参数配置
 */
export const PARAMETERS = {
  // 通用参数
  r: 0.018,              // 无风险利率（10年期国债利率）
  lambda: 0.15,         // 服务费加成
  m: 0.3,               // 保护价修正系数
  Z: 1.65,              // VaR 95%置信度
  
  // 方案偏好系数
  preference: {
    'stronger': { a: 0.6, beta: 0.8, h: 0.35 },  // 更强保护
    'balanced': { a: 1.0, beta: 1.0, h: 0.50 },  // 平衡方案
    'lowerFee': { a: 1.4, beta: 1.3, h: 0.70 }   // 更低费用
  },
  
  // 简化期权费经验系数
  optionFeeCoefficient: {
    baojia: 0.35,       // 保价采购
    fengding: 0.35,     // 封顶销售
    qujian: 0.25        // 区间结算
  },
  
  // 情景模拟步长
  priceScenarios: [-0.10, -0.05, 0, 0.05, 0.10],
  volatilityScenarios: [-0.10, 0, 0.10],
  
  // 周期取数规则
  periodRules: {
    '7': {
      spotPrice: '7天均价',
      futuresPrice: '7天均价',
      spotVol: '7天波动率',
      futuresVol: '7天波动率'
    },
    '15': {
      spotPrice: '7天均价',
      futuresPrice: '7天均价',
      spotVol: '15天波动率',
      futuresVol: '15天波动率'
    },
    '30': {
      spotPrice: '30天均价',
      futuresPrice: '30天均价',
      spotVol: '30天波动率',
      futuresVol: '30天波动率'
    },
    '60': {
      spotPrice: '60天均价',
      futuresPrice: '60天均价',
      spotVol: '60天波动率',
      futuresVol: '60天波动率'
    }
  }
}

/**
 * 产品类型映射
 */
export const PRODUCT_TYPES = {
  'price-protection': {
    name: '保价采购',
    description: '锁定采购成本上限，类似买入看涨期权'
  },
  'floor-price': {
    name: '封顶销售/库存护价',
    description: '锁定销售收入下限，类似买入看跌期权'
  },
  'range-settlement': {
    name: '区间结算',
    description: '将价格控制在一个区间，类似区间型含权结构'
  }
}

/**
 * 风险诉求映射
 */
export const RISK_CONCERNS = {
  'price_increase': '怕涨价',
  'price_decrease': '怕跌价',
  'price_volatility': '想稳定'
}

/**
 * 区域选项
 */
export const REGIONS = [
  { value: '华东', label: '华东' },
  { value: '华南', label: '华南' },
  { value: '华北', label: '华北' },
  { value: '华中', label: '华中' },
  { value: '西南', label: '西南' }
]

/**
 * 品种选项
 */
export const SYMBOLS = [
  { value: 'PP', label: 'PP (聚丙烯)' },
  { value: 'PE', label: 'PE (聚乙烯)' }
]