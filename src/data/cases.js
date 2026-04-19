/**
 * 案例模拟数据
 */
export const CASES = {
  // 保价采购案例
  baojia: {
    title: '30天后要采购原料，价格一旦上涨，采购成本会增加多少？',
    tags: ['PP 原料', '采购企业', '30天周期', '担心涨价'],
    scenario: '某塑编企业计划在30天后采购PP原料500吨，用于下月生产排产。客户最担心的是：如果未来一个月原料价格突然上涨，将直接推高采购成本，压缩订单利润。',
    currentPrice: 7600,
    futurePrice: 8250,
    quantity: 500,
    period: 30,
    withoutPlan: {
      totalCost: 7600 * 500,
      futureCost: 8250 * 500,
      extraCost: (8250 - 7600) * 500
    },
    withPlan: {
      protectedPrice: 7850,
      fee: 42500,
      totalCost: 7850 * 500 + 42500,
      savings: (8250 * 500) - (7850 * 500 + 42500)
    },
    riskTips: '价格上涨时，采购企业最大的风险不是"多花一点"，而是原料成本失控后，订单利润被快速吞噬。通过保价采购，客户虽然支付一定服务费，但可以把采购成本上限控制在更容易管理的范围内。',
    simpleVersion: {
      currentPrice: '7,600元/吨',
      futurePrice: '8,250元/吨',
      withoutPlan: '多支出32.5万元',
      withPlan: '风险敞口缩小至约16万元',
      riskReduction: '约15.75万元'
    }
  },
  
  // 区间结算案例
  qujian: {
    title: '市场上下波动太大，不想赌方向，只想把价格控制在一个可接受区间里',
    tags: ['PP', '采购或销售企业', '60天周期', '想稳定'],
    scenario: '某下游加工企业未来两个月持续有采购和接单计划。客户既担心价格上涨推高原料成本，也担心价格剧烈波动影响报价和接单节奏。客户不想判断市场涨跌方向，只想把价格控制在一个更容易做预算的范围内。',
    currentPrice: 7750,
    upperPrice: 8350,
    lowerPrice: 7180,
    quantity: 800,
    period: 60,
    recommendedRange: {
      lower: 7500,
      upper: 8000
    },
    withoutPlan: {
      highCost: (8350 - 7750) * 800,
      lowRevenue: (7750 - 7180) * 800
    },
    riskTips: '很多企业真正想要的，并不是"押对方向赚最多"，而是"不要因为价格剧烈波动把经营节奏打乱"。区间结算更适合重视预算稳定、接单稳定和经营确定性的客户。',
    simpleVersion: {
      currentPrice: '7,750元/吨',
      recommendedRange: '7,500~8,000元/吨',
      effect: '价格波动被"装进箱子里"'
    }
  }
}

/**
 * 获取案例数据
 * @param {string} type - 案例类型
 * @returns {Object} 案例数据
 */
export function getCaseData(type) {
  return CASES[type] || null
}

/**
 * 案例列表
 */
export const CASE_LIST = [
  {
    id: 'baojia',
    name: '保价采购案例',
    description: '30天后采购原料，担心价格上涨'
  },
  {
    id: 'qujian',
    name: '区间结算案例',
    description: '不想赌涨跌，只想稳定经营'
  }
]