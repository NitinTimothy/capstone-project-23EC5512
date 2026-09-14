/**
 * Smart Buy Advisor v2.0 - Financial Engine
 * Calculates Full Cash vs. Standard/No-Cost EMI with Opportunity Growth,
 * Salary EMI Pledge (% paid from salary), and Additional Capital Injections.
 * 
 * Result Architecture:
 * Real Effective Cost of Item = Total Original Cost (Price + Interest + Fees) - Investment Returns Earned.
 * Net Savings = Cash Cost - Real Effective Cost.
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
    salaryPledgePercent = 0, // 0% to 100% of EMI paid from monthly salary
    additionalCapital = 0, // Extra lump-sum cash injected into investment pool
  } = params;

  const P = Number(totalPrice) || 0;
  const D = Math.min(Number(downPayment) || 0, P);
  const n = Math.max(Number(tenureMonths) || 1, 1);
  const processingFee = (P * (Number(processingFeePercent) || 0)) / 100;
  const principalToFinance = P - D;

  let monthlyEmi = 0;
  let totalBankInterestPaid = 0;
  let totalEmiOutflow = 0;

  if (emiScheme === 'nocost') {
    monthlyEmi = principalToFinance / n;
    totalBankInterestPaid = 0;
    totalEmiOutflow = D + monthlyEmi * n + processingFee;
  } else {
    const r = (Number(annualInterestRate) || 0) / 12 / 100;
    if (r > 0) {
      monthlyEmi =
        (principalToFinance * r * Math.pow(1 + r, n)) /
        (Math.pow(1 + r, n) - 1);
    } else {
      monthlyEmi = principalToFinance / n;
    }
    const totalEmiOnly = monthlyEmi * n;
    totalBankInterestPaid = Math.max(0, totalEmiOnly - principalToFinance);
    totalEmiOutflow = D + totalEmiOnly + processingFee;
  }

  // --- Salary Pledge & Cashflow Breakdown ---
  const pledgeFactor = Math.min(100, Math.max(0, Number(salaryPledgePercent) || 0)) / 100;
  const emiFromSalaryMonthly = monthlyEmi * pledgeFactor;
  const emiFromFundMonthly = monthlyEmi * (1 - pledgeFactor);

  const totalSalaryContributed = emiFromSalaryMonthly * n;
  const totalEmiFromFund = emiFromFundMonthly * n;

  // --- Investment Growth Simulation ---
  const extraCash = Math.max(0, Number(additionalCapital) || 0);
  const initialInvestedAmount = Math.max(0, P - D - processingFee) + extraCash;
  const monthlyRoiRate = (Number(annualRoi) || 0) / 12 / 100;

  let currentBalance = initialInvestedAmount;
  let totalReturnsEarned = 0;
  const monthlySchedule = [];

  for (let month = 1; month <= n; month++) {
    const monthStartBalance = currentBalance;
    const interestEarnedThisMonth = monthStartBalance * monthlyRoiRate;
    totalReturnsEarned += interestEarnedThisMonth;
    
    // Fund grows by monthly ROI interest, then unpledged EMI is withdrawn
    const balanceAfterGrowth = monthStartBalance + interestEarnedThisMonth;
    currentBalance = Math.max(0, balanceAfterGrowth - emiFromFundMonthly);

    monthlySchedule.push({
      month,
      startBalance: Math.round(monthStartBalance),
      interestEarned: Math.round(interestEarnedThisMonth),
      emiFromSalary: Math.round(emiFromSalaryMonthly),
      emiFromFund: Math.round(emiFromFundMonthly),
      endBalance: Math.round(currentBalance),
    });
  }

  const finalEndingFund = Math.round(currentBalance);
  const returnsEarnedRound = Math.round(totalReturnsEarned);

  // --- Real Cost & Savings Depiction Architecture ---

  // 1. Option A (Full Cash):
  // You pay P out of pocket today. No interest earned. Real Cost = P.
  const fullCashCost = P;

  // 2. Option B (EMI + Investment):
  // Original Nominal Outflow = Down Payment + Processing Fee + Total EMIs
  const originalPurchaseOutflow = Math.round(D + processingFee + (monthlyEmi * n));

  // Real Effective Cost = Original Purchase Outflow minus Investment Returns Earned (Discount Subvention)
  const realEffectiveCost = Math.max(0, Math.round(originalPurchaseOutflow - returnsEarnedRound));

  // Net Savings / Money Saved = Full Cash Cost - Real Effective Cost
  const netSavings = Math.round(fullCashCost - realEffectiveCost);
  const effectiveDiscountPercent = ((netSavings / P) * 100).toFixed(1);

  const isEmiBetter = netSavings > 0;

  return {
    itemName,
    totalPrice: P,
    downPayment: D,
    tenureMonths: n,
    emiScheme,
    annualRoi,
    salaryPledgePercent: Math.round(pledgeFactor * 100),
    additionalCapital: extraCash,
    processingFee: Math.round(processingFee),
    monthlyEmi: Math.round(monthlyEmi),
    emiFromSalaryMonthly: Math.round(emiFromSalaryMonthly),
    emiFromFundMonthly: Math.round(emiFromFundMonthly),
    totalSalaryContributed: Math.round(totalSalaryContributed),
    totalBankInterestPaid: Math.round(totalBankInterestPaid),
    totalEmiOutflow: Math.round(totalEmiOutflow),
    initialInvestedAmount: Math.round(initialInvestedAmount),
    totalReturnsEarned: returnsEarnedRound,
    finalEndingFund,
    fullCashCost,
    originalPurchaseOutflow,
    realEffectiveCost,
    netSavings,
    effectiveDiscountPercent,
    isEmiBetter,
    monthlySchedule,
  };
}
