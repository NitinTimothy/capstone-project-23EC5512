import React from 'react';

export default function Header({ onSelectPreset }) {
  const presets = [
    { label: '📱 iPhone 16 Pro', price: 130000, tenure: 12, roi: 12, scheme: 'nocost' },
    { label: '💻 Gaming Laptop', price: 95000, tenure: 12, roi: 11, scheme: 'nocost' },
    { label: '🚗 EV Scooter', price: 145000, tenure: 24, roi: 12, scheme: 'standard', rate: 13 },
    { label: '📺 4K Smart TV', price: 55000, tenure: 9, roi: 10, scheme: 'nocost' },
  ];

  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="logo-icon">💡</div>
        <div>
          <h1>Smart Buy Advisor</h1>
          <p className="subtitle">Full Cash vs. EMI + Salary Pledge & Investment Growth Calculator</p>
        </div>
      </div>
      <div className="preset-bar">
        <span className="preset-label">Quick Presets:</span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            className="preset-btn"
            onClick={() => onSelectPreset(p)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </header>
  );
}
