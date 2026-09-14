import React from 'react';

export default function SummaryCards({ result, onSave }) {
  if (!result) return null;

  const {
    itemName,
    totalPrice,
    monthlyEmi,
    tenureMonths,
    totalEmiOutflow,
    initialInvestedAmount,
    totalReturnsEarned,
    finalEndingFund,
    optionANetPosition,
    optionBTotalCashPaid,
    optionBNetPosition,
    netWealthAdvantage,
    isEmiBetter,
    emiScheme,
    salaryPledgePercent,
    emiFromSalaryMonthly,
    emiFromFundMonthly,
    totalSalaryContributed,
    additionalCapital,
  } = result;

  return (
    <div className="summary-section">
      {/* Smart Verdict Banner */}
      <div className={`verdict-banner ${isEmiBetter ? 'verdict-positive' : 'verdict-warning'}`}>
        <div className="verdict-icon">{isEmiBetter ? '🚀' : '⚠️'}</div>
        <div className="verdict-content">
          <h3>
            {isEmiBetter
              ? `Opting for ${emiScheme === 'nocost' ? 'No-Cost EMI' : 'EMI'} + ${salaryPledgePercent}% Salary Pledge leaves you ₹${netWealthAdvantage.toLocaleString('en-IN')} wealthier than Paying Full Cash!`
              : `Paying Full Upfront Cash is financially better for this configuration.`}
          </h3>
          <p>
            {salaryPledgePercent === 100
              ? `🔥 100% Salary Pledge Strategy: Your initial ₹${initialInvestedAmount.toLocaleString('en-IN')} capital stays 100% untouched for ${tenureMonths} months, earning ₹${totalReturnsEarned.toLocaleString('en-IN')} in compound returns to build a final wealth fund of ₹${finalEndingFund.toLocaleString('en-IN')}!`
              : `By investing ₹${initialInvestedAmount.toLocaleString('en-IN')} upfront, your money earns ₹${totalReturnsEarned.toLocaleString('en-IN')} in returns, leaving you with ₹${finalEndingFund.toLocaleString('en-IN')} remaining balance after paying all EMIs.`}
          </p>
        </div>
        <button className="save-scenario-btn" onClick={onSave}>
          💾 Save Scenario
        </button>
      </div>

      {/* Side by Side Option Cards */}
      <div className="cards-grid">
        {/* Card 1: Option A (Full Upfront Cash) */}
        <div className="card option-card cash-card">
          <div className="card-badge">Option A</div>
          <h2>💵 Full Upfront Cash</h2>
          <p className="card-desc">Pay 100% item price out of pocket on day 1</p>

          <div className="metric-box">
            <span className="metric-label">Immediate Cash Outflow</span>
            <span className="metric-value text-red">₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>

          <ul className="details-list">
            <li>
              <span>Monthly EMI Outflow:</span> <strong>₹0</strong>
            </li>
            <li>
              <span>Salary Outflow:</span> <strong>₹0</strong>
            </li>
            <li>
              <span>Investment Returns Earned:</span> <strong>₹0</strong>
            </li>
            <li className="highlight-li">
              <span>Final Wealth Fund at Month {tenureMonths}:</span> <strong>₹0</strong>
            </li>
          </ul>

          <div className="net-outcome">
            <span>Net Financial Cost:</span>
            <span className="outcome-val text-red">₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Card 2: Option B (EMI + Investment Strategy) */}
        <div className="card option-card emi-card">
          <div className="card-badge badge-green">Option B (Smart Strategy)</div>
          <h2>💳 EMI + Investment & Salary Pledge</h2>
          <p className="card-desc">
            Pay EMI ({salaryPledgePercent}% Salary / {100 - salaryPledgePercent}% Fund) & invest capital @ {result.annualRoi}% ROI
          </p>

          <div className="metric-box">
            <span className="metric-label">Total Monthly EMI</span>
            <span className="metric-value text-blue">
              ₹{monthlyEmi.toLocaleString('en-IN')} <small>/ mo ({tenureMonths} mos)</small>
            </span>
            <div className="pledge-breakdown">
              <span className="text-purple">💼 ₹{emiFromSalaryMonthly.toLocaleString('en-IN')}/mo from Salary ({salaryPledgePercent}%)</span>
              <span className="text-muted"> | 🏦 ₹{emiFromFundMonthly.toLocaleString('en-IN')}/mo from Fund</span>
            </div>
          </div>

          <ul className="details-list">
            <li>
              <span>Initial Capital Invested:</span>{' '}
              <strong>₹{initialInvestedAmount.toLocaleString('en-IN')}</strong>
            </li>
            <li>
              <span>Total Out-of-Pocket Cash Paid:</span>{' '}
              <strong className="text-muted">₹{optionBTotalCashPaid.toLocaleString('en-IN')}</strong>
            </li>
            <li>
              <span>Total Compound Returns Earned:</span>{' '}
              <strong className="text-green">+₹{totalReturnsEarned.toLocaleString('en-IN')}</strong>
            </li>
            <li className="highlight-li">
              <span>Final Accumulated Wealth Fund:</span>{' '}
              <strong className="text-green">₹{finalEndingFund.toLocaleString('en-IN')}</strong>
            </li>
          </ul>

          <div className="net-outcome">
            <span>Net Financial Position:</span>
            <span className={`outcome-val ${optionBNetPosition >= 0 ? 'text-green' : 'text-red'}`}>
              {optionBNetPosition >= 0
                ? `+₹${optionBNetPosition.toLocaleString('en-IN')} Net Profit`
                : `₹${Math.abs(optionBNetPosition).toLocaleString('en-IN')} Net Cost`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
