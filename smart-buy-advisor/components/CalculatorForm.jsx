import React from 'react';

export default function CalculatorForm({ formData, onChange, onReset }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  return (
    <div className="card calculator-card">
      <div className="card-header">
        <h2>⚙️ Purchase Parameters</h2>
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
            (e.g., 12% for Mutual Funds / Equity, 7% for Debt/FD)
          </small>
        </div>
      </form>
    </div>
  );
}
