import React, { useState } from 'react';

export default function CashflowSchedule({ schedule }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!schedule || schedule.length === 0) return null;

  return (
    <div className="card schedule-card">
      <div
        className="schedule-header-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h2>📊 Month-by-Month Cashflow & Compound Schedule (v2.0)</h2>
        <button className="toggle-btn">{isOpen ? '🔼 Hide Table' : '🔽 View Breakdown'}</button>
      </div>

      {isOpen && (
        <div className="table-responsive">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Starting Fund (₹)</th>
                <th>ROI Interest Earned (₹)</th>
                <th>Paid from Salary (₹)</th>
                <th>Withdrawn from Fund (₹)</th>
                <th>Ending Balance (₹)</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.month}>
                  <td>Month {row.month}</td>
                  <td>₹{row.startBalance.toLocaleString('en-IN')}</td>
                  <td className="text-green">+₹{row.interestEarned.toLocaleString('en-IN')}</td>
                  <td className="text-purple">₹{row.emiFromSalary.toLocaleString('en-IN')}</td>
                  <td className="text-red">-₹{row.emiFromFund.toLocaleString('en-IN')}</td>
                  <td className="font-bold">₹{row.endBalance.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
