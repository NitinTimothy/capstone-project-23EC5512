# 💡 Smart Buy Advisor v2.0 — Full Cash vs. EMI + Salary Pledge & Real Cost Calculator

> **A React-powered financial decision engine that compares buying an item in Full Upfront Cash vs. EMI (Standard & No-Cost EMI) while using Investment Returns ($R_{earned}$) to subsidize and discount the Real Effective Out-of-Pocket Cost of the item.**

---

## 📌 Result Depiction Architecture (v2.0 Refined)

When you buy an item via EMI & retain your savings capital in an investment vehicle:
1. **Original Purchase Outflow ($C_{original}$)**: The total cash paid out of pocket (Down Payment + Fees + EMIs).
2. **Investment Return Offset ($R_{earned}$)**: The compound interest earned by leaving your principal savings invested.
3. **Real Effective Cost Out-of-Pocket**:
   $$\text{Real Effective Cost} = C_{original} - R_{earned}$$
4. **Net Money Saved / Effective Discount**:
   $$\text{Money Saved} = \text{Full Cash Price} - \text{Real Effective Cost} = R_{earned}$$

### Example Case Study (iPhone 16 Pro @ ₹1,10,000, 36 Months @ 12% ROI)
- **Full Cash (Option A)**: You pay **₹1,10,000** today out of pocket. Real Cost = **₹1,10,000**.
- **EMI + Investment (Option B)**:
  - Down Payment: ₹10,000
  - 36 EMIs from Salary @ ₹2,778/mo: ₹1,00,000
  - Original Total Paid: **₹1,10,000**
  - Investment Returns Earned (12% ROI on ₹1,00,000): **-₹43,077** (Discount Offset)
  - **Real Effective Cost of Item**: **₹66,923**!
  - **Effective Discount Realized**: **₹43,077 (39.2% OFF)**!

---

## 🚀 Live Online App (GitHub Pages)
Visit: **[https://nitintimothy.github.io/capstone-project-23EC5512/smart-buy-advisor/](https://nitintimothy.github.io/capstone-project-23EC5512/smart-buy-advisor/)**

---

## 📄 Presentation & Documentation Deliverables
- 📑 **Formal Project Report**: See [`PROJECT_REPORT.md`](./PROJECT_REPORT.md)
- 📊 **Presentation Slides Deck**: See [`PRESENTATION_SLIDES.md`](./PRESENTATION_SLIDES.md)
