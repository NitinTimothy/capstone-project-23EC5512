# 📄 ACADEMIC PROJECT REPORT (v2.0)

## Project Title
**Smart Buy Advisor v2.0: Full Cash Payment vs. EMI (Standard & No-Cost) with Salary Pledge & Opportunity Cost Investment Simulator**

---

### 1. Abstract
In modern retail finance, consumers frequently evaluate purchasing decisions purely on immediate cash outlay rather than considering the **opportunity cost of capital**. *Smart Buy Advisor v2.0* extends conventional financial modeling by introducing a **Salary EMI Pledge Engine ($0-100\%$)** alongside initial capital investment compound simulations. Built using React 18, JavaScript ES6, and Web Storage API, this application allows users to simulate how pledging monthly EMI payments directly from salary keeps initial capital intact, maximizing wealth accumulation over the tenure. The application is compiled for static execution and hosted live on GitHub Pages.

---

### 2. Problem Statement
Consumers possessing sufficient cash to buy high-value items upfront often pay full cash to avoid perceived debt. In doing so, they sacrifice compound investment returns on their capital. Conversely, those opting for EMIs often fail to calculate the compounding advantage of leaving principal capital untouched when monthly EMIs are partially or fully serviced via regular salary income. There is a lack of practical tools visualizing this salary-backed compounding acceleration.

---

### 3. Project Objectives
1. Configure purchase price, down payment, EMI tenure, EMI scheme type, investment ROI, **Salary Pledge %**, and **Extra Capital Injections**.
2. Develop a real-time v2.0 financial engine simulating compound fund balances under variable salary contributions ($0-100\%$).
3. Provide side-by-side comparison metrics highlighting net savings, compound returns, and final wealth accumulated.
4. Host the static application on GitHub Pages for universal accessibility without backend dependencies.

---

### 4. Technical Architecture
- **User Interface Layer**: Built using React 18 functional components, custom hooks, range sliders, and CSS Grid/Flexbox layouts.
- **v2.0 Financial Engine**: Modular JS calculator (`calculatorEngine.js`) incorporating compound interest & salary pledge formulas.
- **Persistence Layer**: Web Storage API (`localStorage`) service for scenario management.
- **Deployment Build Pipeline**: Static asset compilation via Vite bundler (`base: './'`).

---

### 5. Mathematical Methodology & Formulas
- **Standard EMI Calculation**:
  $$E = \frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}$$
- **Salary-Pledged Compound Growth Schedule**:
  $$B_t = B_{t-1} \cdot (1 + m) - \left[ E \cdot \left(1 - \frac{S}{100}\right) \right]$$
  Where $S \in [0, 100]$ is the Salary Pledge percentage.
- **Net Wealth Impact**:
  $$\text{Final Fund Balance } (B_n) - (\text{Total Outflow Paid})$$

---

### 6. Results & Key Insights
- **100% Salary Pledge Acceleration**: Servicing 100% of the EMI from salary allows initial capital ($P$) to remain 100% untouched, resulting in maximum compound interest growth (e.g., earning ₹15,800+ in compound returns on a ₹1,20,000 purchase over 12 months at 12% ROI).
- **Hybrid Strategy (50% Pledge)**: Offers a balanced trade-off by halving fund withdrawals while maintaining steady wealth growth.

---

### 7. Conclusion & Future Scope
*Smart Buy Advisor v2.0* provides a comprehensive solution for personal purchasing and investment planning. Future work includes adding real-time stock/mutual fund API feeds and interactive visual charts (Recharts / Chart.js).
