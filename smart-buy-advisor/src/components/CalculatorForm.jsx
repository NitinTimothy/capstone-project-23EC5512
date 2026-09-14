import React from 'react';

export default function CalculatorForm({ formData, onChange, onReset }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  const handlePledgePreset = (percent) => {
    onChange({ ...formData, salaryPledgePercent: percent });
  };

  return (
    <div className="card calculator-card">
      <div className="card-header">
        <h2>⚙️ Purchase & Investment Parameters (v2.0)</h2>
        <button className="reset-btn" onClick={onReset}>
          Reset Inputs
        </button>
      </div>

      <form className="form-grid">
        <div className="form-group full-width">
          <label>Item / Entity Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            placeholder="e.g., iPhone 16 Pro, Car, Laptop"
          />
        </div>

        <div className="form-group">
          <label>Total Item Price (₹)</label>
          <input
            type="number"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleInputChange}
            min="1000"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label>Down Payment (₹)</label>
          <input
            type="number"
            name="downPayment"
            value={formData.downPayment}
            onChange={handleInputChange}
            min="0"
            step="1000"
          />
        </div>

        <div className="form-group">
          <label>EMI Scheme Type</label>
          <div className="radio-group">
            <label className={`radio-btn ${formData.emiScheme === 'nocost' ? 'active' : ''}`}>
              <input
                type="radio"
                name="emiScheme"
                value="nocost"
                checked={formData.emiScheme === 'nocost'}
                onChange={handleInputChange}
              />
              ⚡ No-Cost EMI
            </label>
            <label className={`radio-btn ${formData.emiScheme === 'standard' ? 'active' : ''}`}>
              <input
                type="radio"
                name="emiScheme"
                value="standard"
                checked={formData.emiScheme === 'standard'}
                onChange={handleInputChange}
              />
              🏦 Standard EMI
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Tenure (Months): {formData.tenureMonths}</label>
          <input
            type="range"
            name="tenureMonths"
            value={formData.tenureMonths}
            onChange={handleInputChange}
            min="3"
            max="36"
            step="3"
          />
          <div className="range-ticks">
            <span>3m</span>
            <span>6m</span>
            <span>12m</span>
            <span>18m</span>
            <span>24m</span>
            <span>36m</span>
          </div>
        </div>

        {formData.emiScheme === 'standard' && (
          <div className="form-group">
            <label>Bank EMI Interest Rate (% p.a.)</label>
            <input
              type="number"
              name="annualInterestRate"
              value={formData.annualInterestRate}
              onChange={handleInputChange}
              min="0"
              max="30"
              step="0.5"
            />
          </div>
        )}

        <div className="form-group">
          <label>Processing Fee (% of Price)</label>
          <input
            type="number"
            name="processingFeePercent"
            value={formData.processingFeePercent}
            onChange={handleInputChange}
            min="0"
            max="5"
            step="0.5"
          />
        </div>

        <div className="form-group">
          <label>Expected Investment ROI (% p.a.)</label>
          <input
            type="number"
            name="annualRoi"
            value={formData.annualRoi}
            onChange={handleInputChange}
            min="0"
            max="25"
            step="0.5"
          />
          <small className="help-text">
            (e.g., 12% Mutual Funds, 7% FD/Debt)
          </small>
        </div>

        {/* --- v2.0 Features --- */}
        <div className="form-group full-width v2-section">
          <div className="v2-header">
            <label className="v2-label">
              💼 Salary EMI Pledge (% Paid from Monthly Salary): <strong>{formData.salaryPledgePercent}%</strong>
            </label>
            <div className="v2-btn-group">
              <button
                type="button"
                className={`v2-preset-btn ${Number(formData.salaryPledgePercent) === 0 ? 'active' : ''}`}
                onClick={() => handlePledgePreset(0)}
              >
                0% (All from Fund)
              </button>
              <button
                type="button"
                className={`v2-preset-btn ${Number(formData.salaryPledgePercent) === 50 ? 'active' : ''}`}
                onClick={() => handlePledgePreset(50)}
              >
                50% (Hybrid)
              </button>
              <button
                type="button"
                className={`v2-preset-btn ${Number(formData.salaryPledgePercent) === 100 ? 'active' : ''}`}
                onClick={() => handlePledgePreset(100)}
              >
                100% (Full Salary Pledge)
              </button>
            </div>
          </div>
          <input
            type="range"
            name="salaryPledgePercent"
            value={formData.salaryPledgePercent}
            onChange={handleInputChange}
            min="0"
            max="100"
            step="10"
          />
          <small className="help-text">
            {Number(formData.salaryPledgePercent) === 100
              ? '✨ 100% Salary Pledge: Your initial capital stays 100% untouched and compounds at full annual ROI for maximum wealth growth!'
              : `Pay ${formData.salaryPledgePercent}% of EMI from monthly salary, remaining ${100 - formData.salaryPledgePercent}% from invested capital.`}
          </small>
        </div>

        <div className="form-group full-width">
          <label>💰 Extra Capital Injection (₹)</label>
          <input
            type="number"
            name="additionalCapital"
            value={formData.additionalCapital}
            onChange={handleInputChange}
            min="0"
            step="5000"
            placeholder="e.g., 20000 extra cash to invest"
          />
          <small className="help-text">
            Additional lump-sum added to your initial investment pool at the same ROI.
          </small>
        </div>
      </form>
    </div>
  );
}
