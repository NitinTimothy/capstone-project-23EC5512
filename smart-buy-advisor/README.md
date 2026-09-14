# 💡 Smart Buy Advisor v2.0 — Full Cash vs. EMI + Salary Pledge & Investment Growth Calculator

> **A React-powered financial decision engine that compares buying an item in Full Upfront Cash vs. EMI (Standard & No-Cost EMI) while leveraging Salary EMI Pledges ($0-100\%$) and compounding capital surplus in investment vehicles.**

---

## 📌 What's New in v2.0?
- **💼 Salary EMI Pledge ($0\%$ to $100\%$)**: Pledging monthly EMI payments directly from incoming salary keeps the initial invested capital ($P$) **100% untouched** in mutual funds / liquid funds, compounding at full annual ROI for maximum wealth acceleration!
- **💰 Additional Capital Injection**: Top-up the initial investment pool with lump-sum extra capital.
- **🌐 GitHub Pages Live Hosting Ready**: Configured with Vite relative static build asset pathing for instant online hosting on GitHub Pages.
- **📊 Enhanced Cashflow Breakdown**: Displays split EMI contributions (Salary Outflow vs. Fund Withdrawal) month-by-month.

---

## ✨ Key Features
- **⚡ Dual EMI Scheme Support**: Calculates both **No-Cost EMI** (with subvention discount) and **Standard EMI** (with annual interest rates).
- **💼 Salary Pledge Strategy Engine**: Toggle between 0% Fund Withdrawal, 50% Hybrid, or 100% Full Salary Pledge to visualize how compounding accelerates when capital remains untouched.
- **📈 Investment Growth Engine**: Simulates month-by-month compound growth of unspent capital in mutual funds or debt instruments.
- **📊 Real-time Cashflow Table**: Detailed breakdown showing monthly starting fund balance, ROI earned, Salary EMI contribution, Fund EMI withdrawal, and ending balance.
- **💾 LocalStorage CRUD**: Save, view, load, and delete comparison scenarios locally with zero external server requirement.
- **📱 Quick Presets**: One-click pre-filled presets for popular products (iPhone 16 Pro, Gaming Laptop, EV Scooter, 4K Smart TV).

---

## 🧮 Mathematical Formulas (v2.0)

### 1. Standard EMI Formula
$$E = \frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}$$

### 2. Salary Pledge Compound Schedule
$$B_t = B_{t-1} \cdot (1 + m) - \left[ E \cdot \left(1 - \frac{S}{100}\right) \right]$$
Where:
- $B_t$ = Remaining Investment Fund at month $t$
- $m$ = Monthly ROI rate ($\text{Annual ROI} / 12 / 100$)
- $E$ = Monthly EMI payment
- $S$ = Salary Pledge Percentage ($0\%$ to $100\%$)

---

## 🚀 Live Demo & How to Run

### Live Online (GitHub Pages)
Visit: **[https://nitintimothy.github.io/capstone-project-23EC5512/smart-buy-advisor/](https://nitintimothy.github.io/capstone-project-23EC5512/smart-buy-advisor/)**

### Local Development
```bash
# Navigate to project directory
cd smart-buy-advisor

# Install dependencies
npm install

# Build static production assets for GitHub Pages
npm run build

# Start local preview server
npm run dev
```

---

## 📄 Presentation & Documentation Deliverables
- 📑 **Formal Project Report**: See [`PROJECT_REPORT.md`](./PROJECT_REPORT.md)
- 📊 **Presentation Slides Deck**: See [`PRESENTATION_SLIDES.md`](./PRESENTATION_SLIDES.md)
