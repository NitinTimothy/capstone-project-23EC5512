import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    # Set slide dimensions to widescreen 16:9
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Color Palette (Dark Theme)
    BG_COLOR = RGBColor(15, 23, 42)        # #0f172a (Dark Navy)
    CARD_BG = RGBColor(30, 41, 59)         # #1e293b (Card BG)
    ACCENT_BLUE = RGBColor(56, 189, 248)    # #38bdf8 (Vibrant Blue)
    ACCENT_GREEN = RGBColor(74, 222, 128)   # #4ade80 (Green)
    ACCENT_PURPLE = RGBColor(192, 132, 252) # #c084fc (Purple)
    TEXT_LIGHT = RGBColor(248, 250, 252)    # #f8fafc (White)
    TEXT_MUTED = RGBColor(148, 163, 184)    # #94a3b8 (Gray)

    def set_slide_background(slide):
        background = slide.background
        fill = background.fill
        fill.solid()
        fill.fore_color.rgb = BG_COLOR

    blank_layout = prs.slide_layouts[6] # Blank slide layout

    # Helper: Add Title Header to Slide
    def add_header(slide, title_text, category_text="SMART BUY ADVISOR v2.0"):
        # Header category
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(0.4))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = ACCENT_BLUE

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.7), Inches(11.7), Inches(0.8))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(24)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 1: Title Slide
    # -------------------------------------------------------------
    slide1 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide1)

    # Decorative Card in center
    card1 = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.5), Inches(1.2), Inches(10.333), Inches(5.1))
    card1.fill.solid()
    card1.fill.fore_color.rgb = CARD_BG
    card1.line.color.rgb = ACCENT_BLUE
    card1.line.width = Pt(1.5)

    tf1 = card1.text_frame
    tf1.word_wrap = True
    tf1.vertical_anchor = MSO_ANCHOR.MIDDLE

    p = tf1.paragraphs[0]
    p.text = "💡 SMART BUY ADVISOR v2.0"
    p.alignment = PP_ALIGN.CENTER
    p.font.size = Pt(16)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE

    p2 = tf1.add_paragraph()
    p2.text = "Full Cash vs. EMI + Salary Pledge &\nReal Effective Cost Calculator"
    p2.alignment = PP_ALIGN.CENTER
    p2.font.size = Pt(32)
    p2.font.bold = True
    p2.font.color.rgb = TEXT_LIGHT

    p3 = tf1.add_paragraph()
    p3.text = "\nCapstone Project (Subject Code: 23EC5512)"
    p3.alignment = PP_ALIGN.CENTER
    p3.font.size = Pt(16)
    p3.font.color.rgb = ACCENT_GREEN

    p4 = tf1.add_paragraph()
    p4.text = "Presenter: Nitin V Timothy | Reg No: 2403727710621136 | Class: ECE-C | SKCET"
    p4.alignment = PP_ALIGN.CENTER
    p4.font.size = Pt(13)
    p4.font.color.rgb = TEXT_MUTED

    p5 = tf1.add_paragraph()
    p5.text = "Live App: https://nitintimothy.github.io/capstone-project-23EC5512/smart-buy-advisor/"
    p5.alignment = PP_ALIGN.CENTER
    p5.font.size = Pt(12)
    p5.font.color.rgb = ACCENT_BLUE

    # -------------------------------------------------------------
    # SLIDE 2: The Core Problem & Dilemma
    # -------------------------------------------------------------
    slide2 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide2)
    add_header(slide2, "The Retail Buyer's Dilemma: Cash vs. Financing")

    # 2 Comparison Columns
    col1 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.8))
    col1.fill.solid()
    col1.fill.fore_color.rgb = CARD_BG
    col1.line.color.rgb = RGBColor(248, 113, 113)

    tf_c1 = col1.text_frame
    tf_c1.word_wrap = True
    p = tf_c1.paragraphs[0]
    p.text = "💵 Traditional Choice: Full Upfront Cash"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = RGBColor(248, 113, 113)

    bullets1 = [
        "Common Mindset: 'I have ₹1.1 Lakhs cash, so I will pay 100% upfront to avoid debt.'",
        "The Hidden Sacrifice: Paying full cash drains your savings liquidity on Day 1.",
        "Zero Growth: Your ₹1.1 Lakhs capital earns ₹0 in compound interest over the next 3 years.",
        "Total Out of Pocket Cost: Full 100% Item Price (₹1,10,000)."
    ]
    for b in bullets1:
        p_b = tf_c1.add_paragraph()
        p_b.text = "• " + b
        p_b.font.size = Pt(14)
        p_b.font.color.rgb = TEXT_LIGHT

    col2 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(6.8), Inches(1.8), Inches(5.7), Inches(4.8))
    col2.fill.solid()
    col2.fill.fore_color.rgb = CARD_BG
    col2.line.color.rgb = ACCENT_GREEN

    tf_c2 = col2.text_frame
    tf_c2.word_wrap = True
    p = tf_c2.paragraphs[0]
    p.text = "💡 Smart Choice: EMI + Investment Strategy"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GREEN

    bullets2 = [
        "Smart Strategy: Opt for No-Cost / Standard EMI while retaining your ₹1.0 Lakh savings.",
        "Capital Growth: Invest the retained ₹1.0 Lakh savings in mutual funds / liquid funds @ 12% ROI.",
        "Interest Offset: The investment returns earned (e.g. ₹43,077) offset the purchase price!",
        "Real Effective Item Cost: Reduced from ₹1,10,000 to only ₹66,923 (39.2% OFF!)."
    ]
    for b in bullets2:
        p_b = tf_c2.add_paragraph()
        p_b.text = "• " + b
        p_b.font.size = Pt(14)
        p_b.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 3: v2.0 Innovation - Salary EMI Pledge
    # -------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide3)
    add_header(slide3, "v2.0 Innovation: Salary EMI Pledge & Compound Growth")

    box3 = slide3.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(5.0))
    box3.fill.solid()
    box3.fill.fore_color.rgb = CARD_BG
    box3.line.color.rgb = ACCENT_PURPLE
    box3.line.width = Pt(1.5)

    tf3 = box3.text_frame
    tf3.word_wrap = True
    p = tf3.paragraphs[0]
    p.text = "💼 What is the Salary EMI Pledge Strategy?"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = ACCENT_PURPLE

    bullets3 = [
        "Salary Servicing: Buyer pledges a percentage (0% to 100%) of monthly EMI payments directly from incoming monthly salary income.",
        "100% Full Salary Pledge: By paying monthly EMIs from salary, the initial savings capital stays 100% untouched for the entire tenure!",
        "Compounding Acceleration: Because no money is withdrawn from the investment fund, compound interest accumulates at maximum velocity.",
        "Hybrid Flexibility: Users can choose 0% (Withdraw from Fund), 50% (Hybrid), or 100% (Full Salary Pledge) based on cashflow preferences."
    ]
    for b in bullets3:
        p_b = tf3.add_paragraph()
        p_b.text = "\n▶  " + b
        p_b.font.size = Pt(15)
        p_b.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 4: Real Effective Cost Result Architecture
    # -------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide4)
    add_header(slide4, "Real Effective Cost Result Depiction Architecture")

    # Formula Box
    box_f = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(2.0))
    box_f.fill.solid()
    box_f.fill.fore_color.rgb = CARD_BG
    box_f.line.color.rgb = ACCENT_BLUE

    tf_f = box_f.text_frame
    tf_f.word_wrap = True
    p = tf_f.paragraphs[0]
    p.text = "🧮 Mathematical Result Formula Architecture"
    p.font.size = Pt(18)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE

    p_f1 = tf_f.add_paragraph()
    p_f1.text = "Real Effective Cost of Item = Original Outflow (Down Payment + EMIs + Fees)  -  Investment Returns Earned (R_earned)"
    p_f1.font.size = Pt(15)
    p_f1.font.bold = True
    p_f1.font.color.rgb = ACCENT_GREEN

    p_f2 = tf_f.add_paragraph()
    p_f2.text = "Net Money Saved / Effective Discount = Full Upfront Cash Price  -  Real Effective Cost = R_earned"
    p_f2.font.size = Pt(15)
    p_f2.font.bold = True
    p_f2.font.color.rgb = ACCENT_PURPLE

    # 3 Summary Cards below
    card_a = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(4.1), Inches(3.7), Inches(2.7))
    card_a.fill.solid()
    card_a.fill.fore_color.rgb = CARD_BG
    card_a.line.color.rgb = RGBColor(248, 113, 113)
    tf_a = card_a.text_frame
    tf_a.word_wrap = True
    tf_a.paragraphs[0].text = "1. Original Outflow"
    tf_a.paragraphs[0].font.size = Pt(16)
    tf_a.paragraphs[0].font.bold = True
    tf_a.paragraphs[0].font.color.rgb = RGBColor(248, 113, 113)
    p_a = tf_a.add_paragraph()
    p_a.text = "\nTotal nominal cash paid for item (Down Payment + Processing Fees + All Monthly EMIs)."
    p_a.font.size = Pt(13)
    p_a.font.color.rgb = TEXT_LIGHT

    card_b = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.8), Inches(4.1), Inches(3.7), Inches(2.7))
    card_b.fill.solid()
    card_b.fill.fore_color.rgb = CARD_BG
    card_b.line.color.rgb = ACCENT_GREEN
    tf_b = card_b.text_frame
    tf_b.word_wrap = True
    tf_b.paragraphs[0].text = "2. Interest Offset"
    tf_b.paragraphs[0].font.size = Pt(16)
    tf_b.paragraphs[0].font.bold = True
    tf_b.paragraphs[0].font.color.rgb = ACCENT_GREEN
    p_b = tf_b.add_paragraph()
    p_b.text = "\nCompound returns earned by leaving principal capital invested in high-yield instruments."
    p_b.font.size = Pt(13)
    p_b.font.color.rgb = TEXT_LIGHT

    card_c = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.8), Inches(4.1), Inches(3.7), Inches(2.7))
    card_c.fill.solid()
    card_c.fill.fore_color.rgb = CARD_BG
    card_c.line.color.rgb = ACCENT_PURPLE
    tf_c = card_c.text_frame
    tf_c.word_wrap = True
    tf_c.paragraphs[0].text = "3. Real Out-of-Pocket Cost"
    tf_c.paragraphs[0].font.size = Pt(16)
    tf_c.paragraphs[0].font.bold = True
    tf_c.paragraphs[0].font.color.rgb = ACCENT_PURPLE
    p_c = tf_c.add_paragraph()
    p_c.text = "\nActual net money that left your pocket after deducting investment interest discount!"
    p_c.font.size = Pt(13)
    p_c.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 5: Real-World Case Study (iPhone 16 Pro)
    # -------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide5)
    add_header(slide5, "Case Study: iPhone 16 Pro (₹1,10,000 / 36m @ 12% ROI)")

    table_shape = slide5.shapes.add_table(5, 4, Inches(0.8), Inches(1.8), Inches(11.7), Inches(4.8))
    table = table_shape.table
    table.columns[0].width = Inches(3.5)
    table.columns[1].width = Inches(2.7)
    table.columns[2].width = Inches(2.7)
    table.columns[3].width = Inches(2.8)

    headers = ["Financial Component", "Option A (Full Cash)", "Option B (100% Salary Pledge)", "Net Advantage"]
    for i, h in enumerate(headers):
        cell = table.cell(0, i)
        cell.fill.solid()
        cell.fill.fore_color.rgb = CARD_BG
        p = cell.text_frame.paragraphs[0]
        p.text = h
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = ACCENT_BLUE

    data = [
        ["Original Outflow (Price + EMIs)", "₹1,10,000", "₹1,10,000", "Same Cash Outflow"],
        ["Investment Returns Earned", "₹0", "+₹43,077 (Interest)", "₹43,077 Interest Subvention"],
        ["Real Effective Out-of-Pocket Cost", "₹1,10,000", "₹66,923", "₹43,077 Less Out of Pocket"],
        ["Effective Discount / Savings", "0% OFF", "39.2% OFF", "₹43,077 Net Discount!"]
    ]

    for row_idx, row_data in enumerate(data):
        for col_idx, text in enumerate(row_data):
            cell = table.cell(row_idx + 1, col_idx)
            cell.fill.solid()
            cell.fill.fore_color.rgb = CARD_BG
            p = cell.text_frame.paragraphs[0]
            p.text = text
            p.font.size = Pt(13)
            p.font.color.rgb = ACCENT_GREEN if col_idx == 3 else TEXT_LIGHT
            if col_idx == 0 or row_idx == 2:
                p.font.bold = True

    # -------------------------------------------------------------
    # SLIDE 6: Interactive Application Features & UI
    # -------------------------------------------------------------
    slide6 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide6)
    add_header(slide6, "Application Features & UI Breakdown")

    features = [
        ("⚡ Dual EMI Schemes", "Supports both No-Cost EMI (0% interest with bank subvention) and Standard EMI (custom bank interest rates)."),
        ("💼 Salary Pledge Controls", "Interactive slider (0% to 100%) with instant preset buttons: 0% Fund, 50% Hybrid, 100% Full Salary Pledge."),
        ("📈 Cashflow Schedule Table", "Expandable month-by-month table showing starting fund, ROI interest earned, salary contribution, fund withdrawal, and ending balance."),
        ("💾 LocalStorage CRUD", "Client-side scenario persistence enabling users to save, load, view, and delete past calculations completely offline."),
        ("📱 Quick Product Presets", "One-click pre-filled parameters for iPhone 16 Pro, Gaming Laptop, EV Scooter, and 4K Smart TV.")
    ]

    for idx, (title, desc) in enumerate(features):
        row_y = Inches(1.8 + idx * 1.0)
        card_f = slide6.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), row_y, Inches(11.7), Inches(0.85))
        card_f.fill.solid()
        card_f.fill.fore_color.rgb = CARD_BG
        card_f.line.color.rgb = ACCENT_BLUE if idx % 2 == 0 else ACCENT_PURPLE

        tf = card_f.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title + "  —  "
        p.font.size = Pt(14)
        p.font.bold = True
        p.font.color.rgb = ACCENT_BLUE if idx % 2 == 0 else ACCENT_PURPLE

        run = p.add_run()
        run.text = desc
        run.font.size = Pt(13)
        run.font.bold = False
        run.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 7: Mathematical Formulas & Calculation Engine
    # -------------------------------------------------------------
    slide7 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide7)
    add_header(slide7, "Mathematical Methodology & Formulas")

    box_m = slide7.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(5.0))
    box_m.fill.solid()
    box_m.fill.fore_color.rgb = CARD_BG
    box_m.line.color.rgb = ACCENT_BLUE

    tf_m = box_m.text_frame
    tf_m.word_wrap = True

    formulas = [
        ("1. Standard Banking EMI Formula:", "E = [ P x r x (1+r)^n ] / [ (1+r)^n - 1 ]\n    (P = Financed Amount, r = Monthly interest rate, n = Tenure in months)"),
        ("2. Salary-Pledged Investment Schedule:", "B_t = B_{t-1} x (1 + m)  -  [ E x (1 - S/100) ]\n    (B_t = Month t Balance, m = Monthly ROI rate, S = Salary Pledge %)"),
        ("3. Real Effective Cost Out of Pocket:", "Real Effective Cost = Total Nominal Outflow  -  Total Investment Interest Returns (R_earned)"),
        ("4. Effective Savings & Discount Percentage:", "Net Savings = Full Cash Price - Real Effective Cost\nEffective Discount % = (Net Savings / Full Cash Price) x 100")
    ]

    for idx, (f_title, f_body) in enumerate(formulas):
        p = tf_m.paragraphs[0] if idx == 0 else tf_m.add_paragraph()
        p.text = f_title
        p.font.size = Pt(15)
        p.font.bold = True
        p.font.color.rgb = ACCENT_BLUE

        p_b = tf_m.add_paragraph()
        p_b.text = f_body + "\n"
        p_b.font.size = Pt(13)
        p_b.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 8: Technical Architecture & Tech Stack
    # -------------------------------------------------------------
    slide8 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide8)
    add_header(slide8, "Technical Architecture & Tech Stack")

    tech_cards = [
        ("⚛️ React 18 & Vite", "Functional components, hooks (useState, useMemo, useEffect), reactive state re-renders, and fast HMR bundler."),
        ("🎨 Custom CSS Design System", "Vanilla CSS with dark mode tokens, glassmorphism cards, responsive flex/grid layouts, and high-contrast typography."),
        ("💾 Web Storage API", "Browser localStorage wrapper service (storageService.js) facilitating offline CRUD persistence."),
        ("🧮 Pure JS Formula Engine", "Modular, decoupled mathematical engine (calculatorEngine.js) ensuring high code quality and testability.")
    ]

    for idx, (t_title, t_desc) in enumerate(tech_cards):
        col_idx = idx % 2
        row_idx = idx // 2
        x = Inches(0.8 + col_idx * 6.0)
        y = Inches(1.8 + row_idx * 2.5)

        card_t = slide8.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, x, y, Inches(5.7), Inches(2.2))
        card_t.fill.solid()
        card_t.fill.fore_color.rgb = CARD_BG
        card_t.line.color.rgb = ACCENT_PURPLE

        tf_t = card_t.text_frame
        tf_t.word_wrap = True
        p = tf_t.paragraphs[0]
        p.text = t_title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = ACCENT_PURPLE

        p_d = tf_t.add_paragraph()
        p_d.text = "\n" + t_desc
        p_d.font.size = Pt(13)
        p_d.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 9: GitHub Pages Live Hosting
    # -------------------------------------------------------------
    slide9 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide9)
    add_header(slide9, "Static Build & GitHub Pages Deployment")

    box9 = slide9.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(11.7), Inches(5.0))
    box9.fill.solid()
    box9.fill.fore_color.rgb = CARD_BG
    box9.line.color.rgb = ACCENT_GREEN

    tf9 = box9.text_frame
    tf9.word_wrap = True

    p = tf9.paragraphs[0]
    p.text = "🌐 100% Static Deployment Architecture"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = ACCENT_GREEN

    b9 = [
        "Vite Asset Relative Base Path: Configured base: './' in vite.config.js for subfolder static hosting.",
        "Production Compilation: Executed npm run build generating optimized bundle (index-Du4IAcsj.js & index-DtH4aDy6.css).",
        "Direct GitHub Pages Serving: Compiled assets published directly to repository subfolder.",
        "Zero White Screen / No Server Required: Runs 100% statically in any browser online or offline!"
    ]

    for text in b9:
        p_b = tf9.add_paragraph()
        p_b.text = "\n✓  " + text
        p_b.font.size = Pt(15)
        p_b.font.color.rgb = TEXT_LIGHT

    # -------------------------------------------------------------
    # SLIDE 10: Conclusion & Q&A
    # -------------------------------------------------------------
    slide10 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide10)

    card10 = slide10.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(1.5), Inches(1.2), Inches(10.333), Inches(5.1))
    card10.fill.solid()
    card10.fill.fore_color.rgb = CARD_BG
    card10.line.color.rgb = ACCENT_BLUE
    card10.line.width = Pt(1.5)

    tf10 = card10.text_frame
    tf10.word_wrap = True
    tf10.vertical_anchor = MSO_ANCHOR.MIDDLE

    p = tf10.paragraphs[0]
    p.text = "🎯 CONCLUSION & Q&A"
    p.alignment = PP_ALIGN.CENTER
    p.font.size = Pt(24)
    p.font.bold = True
    p.font.color.rgb = ACCENT_BLUE

    p2 = tf10.add_paragraph()
    p2.text = "\nSmart Buy Advisor v2.0 transforms retail purchase decision-making\nby converting opportunity returns into direct purchase discounts."
    p2.alignment = PP_ALIGN.CENTER
    p2.font.size = Pt(18)
    p2.font.color.rgb = TEXT_LIGHT

    p3 = tf10.add_paragraph()
    p3.text = "\n🌐 Live App: https://nitintimothy.github.io/capstone-project-23EC5512/smart-buy-advisor/\n📁 GitHub Repo: git@github.com:NitinTimothy/capstone-project-23EC5512.git"
    p3.alignment = PP_ALIGN.CENTER
    p3.font.size = Pt(14)
    p3.font.color.rgb = ACCENT_GREEN

    p4 = tf10.add_paragraph()
    p4.text = "\nThank You! Open for Questions & Live Presentation Demo."
    p4.alignment = PP_ALIGN.CENTER
    p4.font.size = Pt(16)
    p4.font.bold = True
    p4.font.color.rgb = ACCENT_PURPLE

    # Save presentation
    output_path = "PRESENTATION.pptx"
    prs.save(output_path)
    print(f"Presentation saved to {output_path}")

if __name__ == "__main__":
    create_presentation()
