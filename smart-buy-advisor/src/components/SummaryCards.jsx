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
    fullCashCost,
    originalPurchaseOutflow,
    realEffectiveCost,
    netSavings,
    effectiveDiscountPercent,
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
              ? `Opting for ${emiScheme === 'nocost' ? 'No-Cost EMI' : 'EMI'} + Investment reduces your real item cost from ₹${totalPrice.toLocaleString('en-IN')} to ₹${realEffectiveCost.toLocaleString('en-IN')} — saving you ₹${netSavings.toLocaleString('en-IN')} (${effectiveDiscountPercent}% Effective Discount)!`
              : `Paying Full Upfront Cash is financially better for this configuration.`}
          </h3>
          <p>
            {salaryPledgePercent === 100
              ? `🔥 100% Salary Pledge Active: Your initial ₹${initialInvestedAmount.toLocaleString('en-IN')} capital stays 100% untouched for ${tenureMonths} months, earning ₹${totalReturnsEarned.toLocaleString('en-IN')} in interest returns to subsidize the item's purchase price!`
              : `By investing ₹${initialInvestedAmount.toLocaleString('en-IN')} upfront, your money earns ₹${totalReturnsEarned.toLocaleString('en-IN')} in interest returns, reducing your net cost for the item.`}
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
              <span>Original Item Price:</span> <strong>₹{totalPrice.toLocaleString('en-IN')}</strong>
            </li>
            <li>
              <span>Investment Interest Return Offset:</span> <strong className="text-muted">₹0</strong>
            </li>
            <li>
              <span>Effective Discount Earned:</span> <strong>0%</strong>
            </li>
            <li className="highlight-li">
              <span>Ending Investment Fund Balance:</span> <strong>₹0</strong>
            </li>
          </ul>

          <div className="net-outcome">
            <span>Real Effective Cost:</span>
            <span className="outcome-val text-red">₹{fullCashCost.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Card 2: Option B (EMI + Investment Strategy) */}
        <div className="card option-card emi-card">
          <div className="card-badge badge-green">Option B (Smart Buy Strategy)</div>
          <h2>💳 EMI + Investment Strategy</h2>
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
              <span>Nominal Purchase Price & Fees:</span>{' '}
              <strong>₹{originalPurchaseOutflow.toLocaleString('en-IN')}</strong>
            </li>
            <li>
              <span>Investment Interest Returns Earned:</span>{' '}
              <strong className="text-green">-₹{totalReturnsEarned.toLocaleString('en-IN')} (Offset)</strong>
            </li>
            <li>
              <span>Effective Savings / Discount Realized:</span>{' '}
              <strong className="text-green">₹{netSavings.toLocaleString('en-IN')} ({effectiveDiscountPercent}% OFF)</strong>
            </li>
            <li className="highlight-li">
              <span>Ending Accumulated Wealth Fund:</span>{' '}
              <strong className="text-green">₹{finalEndingFund.toLocaleString('en-IN')}</strong>
            </li>
          </ul>

          <div className="net-outcome">
            <span>Real Effective Cost Out-of-Pocket:</span>
            <span className="outcome-val text-green">
              ₹{realEffectiveCost.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
