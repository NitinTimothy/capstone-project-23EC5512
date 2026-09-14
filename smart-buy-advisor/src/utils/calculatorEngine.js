/**
 * Smart Buy Advisor v2.0 - Financial Engine
 * Calculates Full Cash vs. Standard/No-Cost EMI with Opportunity Growth,
 * Salary EMI Pledge (% paid from salary), and Additional Capital Injections.
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
  let totalInterestPaid = 0;
  let totalEmiOutflow = 0;

  if (emiScheme === 'nocost') {
    monthlyEmi = principalToFinance / n;
    totalInterestPaid = 0;
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
    totalInterestPaid = Math.max(0, totalEmiOnly - principalToFinance);
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

  // --- Clear Financial Position Metrics ---

  // Option A (Full Cash):
  // You pay P today. Net Position = -P (Item acquired, fund = 0).
  const fullCashOutflow = P;
  const optionANetPosition = -P;

  // Option B (EMI + Investment):
  // Total Out-of-Pocket Cash Paid over tenure = Down Payment + Processing Fee + (Monthly EMI from Salary * n) + (Monthly EMI from Fund * n)
  // Total Cash Paid out of pocket = D + processingFee + (monthlyEmi * n).
  const optionBTotalCashPaid = D + processingFee + (monthlyEmi * n);

  // Remaining Investment Fund at Month n (excluding extra injected capital for fair item comparison)
  const netFundAccumulated = finalEndingFund - extraCash;

  // Net Wealth Position for Option B = Accumulated Fund minus Total Cash Spent out of pocket
  // If positive, user has made a NET PROFIT! If negative, user has a NET COST.
  const optionBNetPosition = netFundAccumulated - optionBTotalCashPaid;

  // Relative Net Advantage of Option B over Option A (Full Cash)
  // Net Advantage = Option B Net Position - Option A Net Position
  // = (netFundAccumulated - optionBTotalCashPaid) - (-P)
  const netWealthAdvantage = optionBNetPosition - optionANetPosition;

  const isEmiBetter = netWealthAdvantage > 0;
  const percentageSavings = ((netWealthAdvantage / P) * 100).toFixed(1);

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
    totalInterestPaid: Math.round(totalInterestPaid),
    totalEmiOutflow: Math.round(totalEmiOutflow),
    initialInvestedAmount: Math.round(initialInvestedAmount),
    totalReturnsEarned: Math.round(totalReturnsEarned),
    finalEndingFund,
    fullCashOutflow,
    optionANetPosition,
    optionBTotalCashPaid: Math.round(optionBTotalCashPaid),
    optionBNetPosition: Math.round(optionBNetPosition),
    netWealthAdvantage: Math.round(netWealthAdvantage),
    netSavings: Math.round(netWealthAdvantage),
    percentageSavings,
    isEmiBetter,
    monthlySchedule,
  };
}
