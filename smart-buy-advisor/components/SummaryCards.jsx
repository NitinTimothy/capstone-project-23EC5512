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
    effectiveEmiNetOutflow,
    netSavings,
    percentageSavings,
    isEmiBetter,
    emiScheme,
  } = result;

  return (
    <div className="summary-section">
      {/* Smart Recommendation Banner */}
      <div className={`verdict-banner ${isEmiBetter ? 'verdict-positive' : 'verdict-warning'}`}>
        <div className="verdict-icon">{isEmiBetter ? '🎉' : '⚠️'}</div>
        <div className="verdict-content">
          <h3>
            {isEmiBetter
              ? `Opting for ${emiScheme === 'nocost' ? 'No-Cost EMI' : 'EMI'} + Investing saves you ₹${netSavings.toLocaleString('en-IN')}!`
              : `Full Cash payment is more economical for this setup.`}
          </h3>
          <p>
            {isEmiBetter
              ? `By investing the unspent ₹${initialInvestedAmount.toLocaleString('en-IN')} upfront, your money earns ₹${totalReturnsEarned.toLocaleString('en-IN')} in returns, leaving you with ₹${finalEndingFund.toLocaleString('en-IN')} after paying off all EMIs.`
              : `High EMI interest or low investment ROI offsets opportunity returns.`}
          </p>
        </div>
        <button className="save-scenario-btn" onClick={onSave}>
          💾 Save Scenario
        </button>
      </div>

      {/* Side by Side Option Cards */}
      <div className="cards-grid">
        {/* Card 1: Full Cash */}
        <div className="card option-card cash-card">
          <div className="card-badge">Option A</div>
          <h2>💵 Full Upfront Cash</h2>
          <p className="card-desc">Pay total amount on day 1</p>

          <div className="metric-box">
            <span className="metric-label">Immediate Outflow</span>
            <span className="metric-value text-red">₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>

          <ul className="details-list">
            <li>
              <span>Monthly EMI:</span> <strong>₹0</strong>
            </li>
            <li>
              <span>Unspent Capital Invested:</span> <strong>₹0</strong>
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

        {/* Card 2: EMI + Investment */}
        <div className="card option-card emi-card">
          <div className="card-badge badge-green">Option B (Recommended)</div>
          <h2>💳 EMI + Investment Strategy</h2>
          <p className="card-desc">
            Pay monthly EMI & invest retained cash @ {result.annualRoi}% ROI
          </p>

          <div className="metric-box">
            <span className="metric-label">Monthly EMI Payment</span>
            <span className="metric-value text-blue">
              ₹{monthlyEmi.toLocaleString('en-IN')} <small>/ mo ({tenureMonths} mos)</small>
            </span>
          </div>

          <ul className="details-list">
            <li>
              <span>Initial Capital Invested:</span>{' '}
              <strong>₹{initialInvestedAmount.toLocaleString('en-IN')}</strong>
            </li>
            <li>
              <span>Total EMI Outflow ({tenureMonths} mos):</span>{' '}
              <strong className="text-red">₹{totalEmiOutflow.toLocaleString('en-IN')}</strong>
            </li>
            <li>
              <span>Investment Returns Earned:</span>{' '}
              <strong className="text-green">+₹{totalReturnsEarned.toLocaleString('en-IN')}</strong>
            </li>
            <li className="highlight-li">
              <span>Remaining Surplus Fund:</span>{' '}
              <strong className="text-green">₹{finalEndingFund.toLocaleString('en-IN')}</strong>
            </li>
          </ul>

          <div className="net-outcome">
            <span>Effective Net Cost:</span>
            <span className="outcome-val text-green">
              ₹{effectiveEmiNetOutflow.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
