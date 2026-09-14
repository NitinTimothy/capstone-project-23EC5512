import React from 'react';

export default function SavedScenarios({ scenarios, onLoad, onDelete, onClearAll }) {
  if (!scenarios || scenarios.length === 0) {
    return (
      <div className="card saved-scenarios-card">
        <h2>📁 Saved Comparison Scenarios</h2>
        <p className="no-data">No saved scenarios yet. Click "Save Scenario" above to record your calculations!</p>
      </div>
    );
  }

  return (
    <div className="card saved-scenarios-card">
      <div className="card-header">
        <h2>📁 Saved Comparison Scenarios ({scenarios.length})</h2>
        <button className="clear-all-btn" onClick={onClearAll}>
          🗑️ Clear All
        </button>
      </div>

      <div className="scenarios-list">
        {scenarios.map((item) => (
          <div key={item.id} className="scenario-item">
            <div className="scenario-info">
              <h4>{item.itemName}</h4>
              <p className="scenario-meta">
                Price: ₹{(item.totalPrice || 0).toLocaleString('en-IN')} | Tenure: {item.tenureMonths}m |{' '}
                {item.emiScheme === 'nocost' ? 'No-Cost EMI' : 'Standard EMI'}
              </p>
            </div>

            <div className="scenario-savings">
              <span className={`savings-badge ${item.isEmiBetter ? 'badge-green' : 'badge-red'}`}>
                {item.isEmiBetter
                  ? `Saves ₹${(item.netSavings || 0).toLocaleString('en-IN')}`
                  : 'Full Cash Better'}
              </span>
            </div>

            <div className="scenario-actions">
              <button className="action-btn load-btn" onClick={() => onLoad(item)}>
                Load
              </button>
              <button className="action-btn delete-btn" onClick={() => onDelete(item.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
