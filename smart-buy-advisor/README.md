# 💡 Smart Buy Advisor — Full Cash vs. EMI + Investment Growth Calculator

> **A React-powered financial decision engine that compares buying an item in Full Upfront Cash vs. EMI (Standard & No-Cost EMI) while investing the retained cash surplus.**

---

## 📌 Project Overview
When purchasing expensive items like smartphones, laptops, cars, or home appliances, buyers often debate whether to pay **Full Upfront Cash** or take an **EMI**. 

If a buyer has the full cash ready, taking an EMI allows them to retain most of their principal capital upfront. By investing this unspent principal in liquid/mutual funds earning interest (e.g., 10-12% ROI), the investment returns often exceed the EMI processing fees/interest! 

**Smart Buy Advisor** automates this comparison in real-time to show users exactly how much money they save by choosing an EMI + Investment strategy over full cash outlay.

---

## ✨ Key Features
- **⚡ Dual EMI Scheme Support**: Calculates both **No-Cost EMI** (with bank subvention discount) and **Standard EMI** (with annual interest rates).
- **📈 Investment Growth Engine**: Simulates month-by-month compound growth of unspent capital in mutual funds or debt instruments.
- **📊 Real-time Cashflow Table**: Detailed breakdown showing monthly starting fund balance, ROI earned, EMI withdrawn, and ending surplus balance.
- **💾 LocalStorage CRUD**: Save, view, load, and delete comparison scenarios locally with zero external server requirement.
- **📱 Quick Presets**: One-click pre-filled presets for popular products (iPhone 16 Pro, Gaming Laptop, EV Scooter, 4K Smart TV).
- **🌐 100% Offline Compatible**: Built for plug-and-play college presentations and offline demonstrations.

---

## 🛠️ Technology Stack
- **Frontend Framework**: React 18 (Vite)
- **Styling**: Vanilla CSS (Custom Design System, Flexbox, CSS Grid, Glassmorphism Cards)
- **State & Data Handling**: React Hooks (`useState`, `useMemo`, `useEffect`), Web Storage API (`localStorage`)
- **Build Tool**: Vite

---

## 🧮 Mathematical Formulas Used

### 1. Standard EMI Formula
$$E = \frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}$$
Where:
- $E$ = Monthly EMI
- $P$ = Financed Principal Amount ($Total Price - Down Payment$)
- $r$ = Monthly interest rate ($\text{Annual Interest Rate} / 12 / 100$)
- $n$ = Loan tenure in months

### 2. Investment Compound Growth Schedule
$$B_t = B_{t-1} \cdot (1 + m) - E$$
Where:
- $B_t$ = Remaining Investment Fund at month $t$
- $m$ = Monthly ROI rate ($\text{Annual ROI} / 12 / 100$)
- $E$ = Monthly EMI payment

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation Steps
```bash
# 1. Clone the repository
git clone <your-github-repo-url>

# 2. Navigate to project directory
cd react-day-1

# 3. Install dependencies
npm install

# 4. Start Vite development server
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

---

## 📄 Presentation & Documentation Deliverables
- 📑 **Formal Project Report**: See [`PROJECT_REPORT.md`](./PROJECT_REPORT.md)
- 📊 **Presentation Slides Deck**: See [`PRESENTATION_SLIDES.md`](./PRESENTATION_SLIDES.md)
