# 📊 COLLEGE PRESENTATION SLIDES (5-Minute Viva Deck v2.0)

## Slide 1: Title & Introduction
- **Project Title**: Smart Buy Advisor v2.0 — Full Cash vs. EMI + Salary Pledge & Investment Calculator
- **Tech Stack**: React 18, JavaScript ES6, HTML5, CSS3, Web Storage API (localStorage), Vite
- **Presenter**: Nitin V Timothy (Reg No: 2403727710621136, BE ECE)
- **Live Demo Link**: `https://nitintimothy.github.io/capstone-project-23EC5512/smart-buy-advisor/`

---

## Slide 2: The Core Dilemma & v2.0 Innovation
- **Scenario**: "I have ₹1.2 Lakhs cash. Should I buy a laptop in full cash or opt for 12 months No-Cost EMI?"
- **The Misconception**: Paying full cash feels safe, but forfeits 12 months of compound interest on ₹1.2 Lakhs!
- **v2.0 Innovation — Salary EMI Pledge**: What if the buyer pledges to pay 100% of monthly EMIs from their monthly salary income?
- **Result**: The ₹1.2 Lakhs initial cash stays **100% untouched** in mutual funds, compounding at full annual ROI!

---

## Slide 3: Interactive Features
1. **Purchase Controls**: Item Price, Down Payment, Tenure (3-36 months), EMI Scheme (Standard vs. No-Cost).
2. **Salary Pledge Slider ($0-100\%$)**:
   - `0%`: EMI withdrawn from fund balance.
   - `50%`: Hybrid (half from salary, half from fund).
   - `100%`: Full Salary Pledge (capital stays 100% untouched).
3. **Extra Capital Injection**: Top-up initial investment pool.
4. **Month-by-Month Schedule**: Table showing Salary Paid vs Fund Withdrawn per month.
5. **LocalStorage CRUD**: Save, load, and delete comparison scenarios locally.

---

## Slide 4: Mathematical Model (v2.0)
- **Standard EMI Formula**:
  $$E = \frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}$$
- **Salary-Pledged Compound Growth**:
  $$B_t = B_{t-1} \cdot (1 + m) - \left[ E \cdot \left(1 - \frac{S}{100}\right) \right]$$

---

## Slide 5: Real-World Case Study (iPhone 16 Pro @ ₹1,20,000)
- **Option A (Full Upfront Cash)**: Total Outflow = ₹1,20,000. Ending Fund = ₹0.
- **Option B (12m No-Cost EMI + 100% Salary Pledge @ 12% ROI)**:
  - Initial Capital Invested: ₹1,18,800.
  - Monthly EMI Paid from Salary: ₹10,000/mo.
  - Fund Balance Withdrawal: **₹0/month!**
  - Total Investment Returns Earned: **+₹15,068**.
  - **Final Accumulated Wealth Fund: ₹1,33,868!**

---

## Slide 6: Technical Architecture
- **Component Hierarchy**:
  - `Header.jsx`: Branding & Presets
  - `CalculatorForm.jsx`: Sliders, Inputs, Salary Pledge controls
  - `SummaryCards.jsx`: Wealth acceleration metrics & Verdict Banner
  - `CashflowSchedule.jsx`: Tabular monthly breakdown
  - `SavedScenarios.jsx`: LocalStorage scenario history
  - `calculatorEngine.js`: v2.0 Pure JS financial formulas

---

## Slide 7: GitHub Pages Deployment (Option A)
- Static compilation using Vite (`base: './'`).
- Builds production distribution bundles (`npm run build`).
- Hosted statically live on GitHub Pages — zero server setup required!

---

## Slide 8: Conclusion & Key Learnings
- Demonstrates advanced financial compounding models applied to everyday retail purchases.
- Fulfills 100% of curriculum topics (React Components, Hooks, State, LocalStorage, Form Validation, Static Build & Deployment).

---

## Slide 9: Live Demo & Q&A
- *Live Demo at: https://nitintimothy.github.io/capstone-project-23EC5512/smart-buy-advisor/*
- *Open for Questions.*
