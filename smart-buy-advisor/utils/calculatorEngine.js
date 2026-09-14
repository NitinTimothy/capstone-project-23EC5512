/**
 * Smart Buy Advisor - Financial Engine
 * Calculates Full Cash vs. Standard EMI vs. No-Cost EMI with Opportunity Return Growth
 */

export function calculateBuyStrategy(params) {
  const {
    itemName = 'Gadget',
    totalPrice = 100000,
    downPayment = 0,
    tenureMonths = 12,
    emiScheme = 'nocost', // 'nocost' | 'standard'
    annualInterestRate = 14, // for standard EMI
    processingFeePercent = 1,
    annualRoi = 12, // Expected investment growth rate % p.a.
  } = params;

  const P = Number(totalPrice) || 0;
  const D = Math.min(Number(downPayment) || 0, P);
  const n = Math.max(Number(tenureMonths) || 1, 1);
  const processingFee = (P * (Number(processingFeePercent) || 0)) / 100;
  const principalToFinance = P - D;

  let monthlyEmi = 0;
  let totalInterestPaid = 0;
  let bankSubventionDiscount = 0;
  let totalEmiOutflow = 0;

  if (emiScheme === 'nocost') {
    // No Cost EMI: Merchant/Bank gives upfront discount equivalent to interest, so EMI = Principal / Months
    monthlyEmi = principalToFinance / n;
    totalInterestPaid = 0;
    // Estimated interest subvention (~ 12% equivalent discount)
    const discountRate = 0.12;
    bankSubventionDiscount = (principalToFinance * discountRate * n) / 12;
    totalEmiOutflow = D + monthlyEmi * n + processingFee;
  } else {
    // Standard EMI Formula: E = [P x r x (1+r)^n] / [(1+r)^n - 1]
    const r = (Number(annualInterestRate) || 0) / 12 / 100;
    if (r > 0) {
      monthlyEmi =
        (principalToFinance * r * Math.pow(1 + r, n)) /
        (Math.pow(1 + r, n) - 1);
    } else {
      monthlyEmi = principalToFinance / n;
    }
    const totalEmiOnly = monthlyEmi * n;
    totalInterestPaid = Math.max(0, totalEmiOnly - principalToFinance);
    totalEmiOutflow = D + totalEmiOnly + processingFee;
  }

  // --- Investment Growth Simulation ---
  // If user pays via EMI, unspent money (P - D - processingFee) remains invested in Mutual Fund / Liquid Fund at annualRoi %
  const initialInvestedAmount = Math.max(0, P - D - processingFee);
  const monthlyRoiRate = (Number(annualRoi) || 0) / 12 / 100;

  let currentBalance = initialInvestedAmount;
  let totalReturnsEarned = 0;
  const monthlySchedule = [];

  for (let month = 1; month <= n; month++) {
    const monthStartBalance = currentBalance;
    const interestEarnedThisMonth = monthStartBalance * monthlyRoiRate;
    totalReturnsEarned += interestEarnedThisMonth;
    
    // Balance grows by ROI interest, then EMI payment is withdrawn
    const balanceAfterGrowth = monthStartBalance + interestEarnedThisMonth;
    currentBalance = Math.max(0, balanceAfterGrowth - monthlyEmi);

    monthlySchedule.push({
      month,
      startBalance: Math.round(monthStartBalance),
      interestEarned: Math.round(interestEarnedThisMonth),
      emiPaid: Math.round(monthlyEmi),
      endBalance: Math.round(currentBalance),
    });
  }

  // Final Remaining Investment Balance at month n
  const finalEndingFund = Math.round(currentBalance);

  // Wealth Comparison
  // Option A (Full Cash): You pay P today. End fund balance = 0.
  const fullCashOutflow = P;
  
  // Option B (EMI + Investment): Total cash spent = totalEmiOutflow. Fund remaining at end = finalEndingFund.
  // Effective Net Outflow = totalEmiOutflow - finalEndingFund
  const effectiveEmiNetOutflow = totalEmiOutflow - finalEndingFund;

  // Net Cash Savings taking EMI vs Full Cash
  const netSavings = fullCashOutflow - effectiveEmiNetOutflow;
  const percentageSavings = ((netSavings / P) * 100).toFixed(1);

  const isEmiBetter = netSavings > 0;

  return {
    itemName,
    totalPrice: P,
    downPayment: D,
    tenureMonths: n,
    emiScheme,
    annualRoi,
    processingFee: Math.round(processingFee),
    monthlyEmi: Math.round(monthlyEmi),
    totalInterestPaid: Math.round(totalInterestPaid),
    totalEmiOutflow: Math.round(totalEmiOutflow),
    initialInvestedAmount: Math.round(initialInvestedAmount),
    totalReturnsEarned: Math.round(totalReturnsEarned),
    finalEndingFund,
    fullCashOutflow,
    effectiveEmiNetOutflow: Math.round(effectiveEmiNetOutflow),
    netSavings: Math.round(netSavings),
    percentageSavings,
    isEmiBetter,
    monthlySchedule,
  };
}
