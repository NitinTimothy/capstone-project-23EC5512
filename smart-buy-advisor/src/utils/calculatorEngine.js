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

  // --- Investment Growth Simulation v2.0 ---
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
    
    // Fund grows by interest, then only the unpledged portion of EMI is withdrawn from the fund
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

  // Wealth & Savings Comparisons
  const fullCashOutflow = P;

  // Total Outflow considering Salary contribution
  const totalActualOutflow = D + processingFee + totalEmiOutflow;
  
  // Effective Net Cost = Total Paid (Down + Processing + All EMIs) minus Final Accumulated Fund Balance
  const effectiveEmiNetOutflow = (D + processingFee + (monthlyEmi * n)) - (finalEndingFund - extraCash);

  // Net Savings compared to paying Full Cash
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
    effectiveEmiNetOutflow: Math.round(effectiveEmiNetOutflow),
    netSavings: Math.round(netSavings),
    percentageSavings,
    isEmiBetter,
    monthlySchedule,
  };
}
