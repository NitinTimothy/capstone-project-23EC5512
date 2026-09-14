import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

def create_docx():
    doc = Document()
    
    # Page Margins
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Styles
    COLOR_PRIMARY = RGBColor(15, 23, 42)     # Dark Navy #0f172a
    COLOR_ACCENT = RGBColor(14, 165, 233)   # Sky Blue #0ea5e9
    COLOR_DARK = RGBColor(30, 41, 59)       # Dark Slate #1e293b
    COLOR_GREEN = RGBColor(22, 163, 74)     # Emerald Green

    # Document Header Title
    title_p = doc.add_paragraph()
    title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run_t = title_p.add_run("ACADEMIC PROJECT REPORT\n")
    run_t.font.name = "Arial"
    run_t.font.size = Pt(11)
    run_t.font.bold = True
    run_t.font.color.rgb = COLOR_ACCENT

    run_main = title_p.add_run("Smart Buy Advisor v2.0: Full Cash vs. EMI + Salary Pledge & Real Effective Cost Calculator\n")
    run_main.font.name = "Arial"
    run_main.font.size = Pt(18)
    run_main.font.bold = True
    run_main.font.color.rgb = COLOR_PRIMARY

    run_sub = title_p.add_run("Subject Code: 23EC5512 — Capstone Project")
    run_sub.font.name = "Arial"
    run_sub.font.size = Pt(12)
    run_sub.font.bold = True
    run_sub.font.color.rgb = COLOR_DARK

    # Metadata Table
    meta_table = doc.add_table(rows=2, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    
    meta_data = [
        [("Student Name:", " Nitin V Timothy"), ("Register Number:", " 2403727710621136")],
        [("Degree & Dept:", " BE ECE (Class ECE-C)"), ("Institution:", " Sri Krishna College of Eng. & Tech.")]
    ]

    for row_idx, row_content in enumerate(meta_data):
        for col_idx, (label, val) in enumerate(row_content):
            cell = meta_table.cell(row_idx, col_idx)
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            r1 = p.add_run(label)
            r1.font.bold = True
            r1.font.size = Pt(10)
            r1.font.color.rgb = COLOR_PRIMARY
            r2 = p.add_run(val)
            r2.font.size = Pt(10)
            r2.font.color.rgb = COLOR_DARK

    doc.add_paragraph() # Spacer

    # Sections Content
    sections = [
        ("1. ABSTRACT", [
            "In modern retail finance, consumers frequently evaluate purchasing decisions purely on immediate cash outlay rather than considering the opportunity cost of capital.",
            "Smart Buy Advisor v2.0 extends conventional financial modeling by introducing a Salary EMI Pledge Engine (0% to 100%) alongside initial capital investment compound simulations.",
            "Built using React 18, JavaScript ES6, and Web Storage API, this application simulates how pledging monthly EMI payments directly from salary keeps initial savings capital 100% intact, maximizing compound wealth accumulation over the tenure.",
            "The application is compiled for static client-side execution and hosted live on GitHub Pages."
        ]),
        ("2. PROBLEM STATEMENT", [
            "Consumers possessing sufficient cash to buy high-value items upfront often pay 100% cash to avoid perceived debt. In doing so, they sacrifice compound investment returns on their savings capital.",
            "Conversely, those opting for EMIs often fail to calculate the compounding advantage of leaving principal capital untouched when monthly EMIs are partially or fully serviced via regular salary income.",
            "There is a lack of intuitive, real-time comparison tools visualizing this salary-backed compounding acceleration and the resulting real effective out-of-pocket cost of the purchase."
        ]),
        ("3. PROJECT OBJECTIVES", [
            "1. Interactive Inputs: Configure purchase price, down payment, EMI tenure, EMI scheme type (Standard vs. No-Cost), investment ROI, Salary Pledge %, and Extra Capital Injections.",
            "2. v2.0 Financial Engine: Develop a modular JS financial engine simulating compound fund balances under variable salary contributions (0% to 100%).",
            "3. Real Effective Cost Architecture: Calculate the exact real out-of-pocket cost of the item by deducting investment interest returns earned from nominal purchase outflows.",
            "4. Static GitHub Pages Hosting: Compile the application into static HTML/JS/CSS assets for offline and online hosting on GitHub Pages with zero server setup."
        ]),
        ("4. TECHNICAL ARCHITECTURE & TECH STACK", [
            "• User Interface Layer: Built using React 18 functional components, custom hooks (useState, useMemo, useEffect), range sliders, and CSS Grid/Flexbox layouts.",
            "• Financial Engine: Pure JavaScript module (calculatorEngine.js) implementing standard banking EMI formulas and monthly compound schedule iterations.",
            "• Web Storage Layer: LocalStorage wrapper service (storageService.js) facilitating client-side CRUD scenario management.",
            "• Build Pipeline: Compiled with Vite bundler (base: './') exporting optimized production static assets."
        ]),
        ("5. MATHEMATICAL METHODOLOGY & FORMULAS", [
            "• Standard EMI Formula:\n   E = [ P × r × (1+r)^n ] / [ (1+r)^n - 1 ]\n   (P = Financed Amount, r = Monthly interest rate, n = Tenure in months)",
            "• Salary-Pledged Investment Schedule:\n   B_t = B_{t-1} × (1 + m)  -  [ E × (1 - S/100) ]\n   (B_t = Month t balance, m = Monthly ROI rate, S = Salary Pledge %)",
            "• Real Effective Out-of-Pocket Cost:\n   Real Effective Cost = Original Outflow (Down Payment + Fees + EMIs)  -  Investment Returns Earned (R_earned)",
            "• Net Money Saved / Effective Discount:\n   Net Savings = Full Upfront Cash Price  -  Real Effective Cost"
        ])
    ]

    for title, paragraphs in sections:
        h = doc.add_paragraph()
        r_h = h.add_run(title)
        r_h.font.name = "Arial"
        r_h.font.size = Pt(14)
        r_h.font.bold = True
        r_h.font.color.rgb = COLOR_ACCENT

        for p_text in paragraphs:
            p_elem = doc.add_paragraph()
            r_p = p_elem.add_run(p_text)
            r_p.font.name = "Arial"
            r_p.font.size = Pt(11)
            r_p.font.color.rgb = COLOR_DARK
            p_elem.paragraph_format.line_spacing = 1.15

    # Case Study Table Header
    h_tbl = doc.add_paragraph()
    r_tbl = h_tbl.add_run("6. CASE STUDY & RESULTS ANALYSIS")
    r_tbl.font.name = "Arial"
    r_tbl.font.size = Pt(14)
    r_tbl.font.bold = True
    r_tbl.font.color.rgb = COLOR_ACCENT

    # Add Case Study Table
    table = doc.add_table(rows=5, cols=4)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    
    headers = ["Financial Metric", "Option A (Full Cash)", "Option B (100% Salary Pledge)", "Net Advantage"]
    for i, head in enumerate(headers):
        cell = table.cell(0, i)
        p = cell.paragraphs[0]
        r = p.add_run(head)
        r.font.bold = True
        r.font.size = Pt(10)
        r.font.color.rgb = COLOR_PRIMARY

    case_data = [
        ["Original Purchase Outflow", "₹1,10,000", "₹1,10,000", "Same Cash Outflow"],
        ["Investment Returns Earned", "₹0", "-₹43,077 (Offset)", "₹43,077 Interest Subvention"],
        ["Real Effective Out-of-Pocket Cost", "₹1,10,000", "₹66,923", "₹43,077 Less Out of Pocket"],
        ["Effective Discount Realized", "0% OFF", "39.2% OFF", "₹43,077 Net Discount!"]
    ]

    for r_idx, row_vals in enumerate(case_data):
        for c_idx, val in enumerate(row_vals):
            cell = table.cell(r_idx + 1, c_idx)
            p = cell.paragraphs[0]
            r = p.add_run(val)
            r.font.size = Pt(10)
            if c_idx == 3 or r_idx == 2:
                r.font.bold = True
                r.font.color.rgb = COLOR_GREEN
            else:
                r.font.color.rgb = COLOR_DARK

    doc.add_paragraph()

    # Conclusion Section
    h_c = doc.add_paragraph()
    r_hc = h_c.add_run("7. CONCLUSION & LINKS")
    r_hc.font.name = "Arial"
    r_hc.font.size = Pt(14)
    r_hc.font.bold = True
    r_hc.font.color.rgb = COLOR_ACCENT

    p_conc = doc.add_paragraph()
    r_conc = p_conc.add_run(
        "Smart Buy Advisor v2.0 successfully transforms retail purchase decision-making by demonstrating how opportunity returns "
        "subsidize the real out-of-pocket cost of high-value items. The project fulfills all course curriculum objectives and is deployed live.\n\n"
        "🌐 Live Application URL: https://nitintimothy.github.io/capstone-project-23EC5512/smart-buy-advisor/\n"
        "📁 GitHub Repository: git@github.com:NitinTimothy/capstone-project-23EC5512.git"
    )
    r_conc.font.name = "Arial"
    r_conc.font.size = Pt(11)
    r_conc.font.color.rgb = COLOR_DARK

    doc.save("PROJECT_REPORT.docx")
    print("Saved PROJECT_REPORT.docx")

def create_pdf():
    pdf_filename = "PROJECT_REPORT.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=54,
        leftMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    story = []
    styles = getSampleStyleSheet()

    # Custom Styles
    style_header_cat = ParagraphStyle(
        'HeaderCat',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=colors.HexColor("#0ea5e9"),
        alignment=1 # Center
    )

    style_header_title = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=colors.HexColor("#0f172a"),
        alignment=1
    )

    style_sub_title = ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#334155"),
        alignment=1
    )

    style_section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=colors.HexColor("#0ea5e9"),
        spaceBefore=14,
        spaceAfter=6
    )

    style_body = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=6
    )

    # Document Header
    story.append(Paragraph("ACADEMIC PROJECT REPORT", style_header_cat))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Smart Buy Advisor v2.0: Full Cash vs. EMI + Salary Pledge & Real Effective Cost Calculator", style_header_title))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Subject Code: 23EC5512 — Capstone Project", style_sub_title))
    story.append(Spacer(1, 10))

    # Metadata Table
    meta_data = [
        [Paragraph("<b>Student Name:</b> Nitin V Timothy", style_body), Paragraph("<b>Register Number:</b> 2403727710621136", style_body)],
        [Paragraph("<b>Degree & Dept:</b> BE ECE (Class ECE-C)", style_body), Paragraph("<b>Institution:</b> Sri Krishna College of Eng. & Tech.", style_body)]
    ]
    t_meta = Table(meta_data, colWidths=[250, 250])
    t_meta.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#f8fafc")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_meta)
    story.append(Spacer(1, 10))

    # Abstract Section
    story.append(Paragraph("1. ABSTRACT", style_section_heading))
    story.append(Paragraph("In modern retail finance, consumers frequently evaluate purchasing decisions purely on immediate cash outlay rather than considering the opportunity cost of capital.", style_body))
    story.append(Paragraph("Smart Buy Advisor v2.0 extends conventional financial modeling by introducing a <b>Salary EMI Pledge Engine (0% to 100%)</b> alongside initial capital investment compound simulations.", style_body))
    story.append(Paragraph("Built using React 18, JavaScript ES6, and Web Storage API, this application simulates how pledging monthly EMI payments directly from salary keeps initial savings capital 100% intact, maximizing compound wealth accumulation over the tenure.", style_body))
    story.append(Paragraph("The application is compiled for static client-side execution and hosted live on GitHub Pages.", style_body))

    # Problem Statement
    story.append(Paragraph("2. PROBLEM STATEMENT", style_section_heading))
    story.append(Paragraph("Consumers possessing sufficient cash to buy high-value items upfront often pay 100% cash to avoid perceived debt. In doing so, they sacrifice compound investment returns on their savings capital.", style_body))
    story.append(Paragraph("Conversely, those opting for EMIs often fail to calculate the compounding advantage of leaving principal capital untouched when monthly EMIs are partially or fully serviced via regular salary income.", style_body))
    story.append(Paragraph("There is a lack of intuitive, real-time comparison tools visualizing this salary-backed compounding acceleration and the resulting real effective out-of-pocket cost of the purchase.", style_body))

    # Project Objectives
    story.append(Paragraph("3. PROJECT OBJECTIVES", style_section_heading))
    story.append(Paragraph("1. <b>Interactive Inputs:</b> Configure purchase price, down payment, EMI tenure, EMI scheme type (Standard vs. No-Cost), investment ROI, Salary Pledge %, and Extra Capital Injections.", style_body))
    story.append(Paragraph("2. <b>v2.0 Financial Engine:</b> Develop a modular JS financial engine simulating compound fund balances under variable salary contributions (0% to 100%).", style_body))
    story.append(Paragraph("3. <b>Real Effective Cost Architecture:</b> Calculate the exact real out-of-pocket cost of the item by deducting investment interest returns earned from nominal purchase outflows.", style_body))
    story.append(Paragraph("4. <b>Static GitHub Pages Hosting:</b> Compile the application into static HTML/JS/CSS assets for offline and online hosting on GitHub Pages with zero server setup.", style_body))

    # Technical Architecture
    story.append(Paragraph("4. TECHNICAL ARCHITECTURE & TECH STACK", style_section_heading))
    story.append(Paragraph("• <b>User Interface Layer:</b> Built using React 18 functional components, custom hooks (useState, useMemo, useEffect), range sliders, and CSS Grid/Flexbox layouts.", style_body))
    story.append(Paragraph("• <b>Financial Engine:</b> Pure JavaScript module (calculatorEngine.js) implementing standard banking EMI formulas and monthly compound schedule iterations.", style_body))
    story.append(Paragraph("• <b>Web Storage Layer:</b> LocalStorage wrapper service (storageService.js) facilitating client-side CRUD scenario management.", style_body))
    story.append(Paragraph("• <b>Build Pipeline:</b> Compiled with Vite bundler (base: './') exporting optimized production static assets.", style_body))

    # Mathematical Methodology
    story.append(Paragraph("5. MATHEMATICAL METHODOLOGY & FORMULAS", style_section_heading))
    story.append(Paragraph("• <b>Standard Banking EMI Formula:</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;<i>E = [ P × r × (1+r)^n ] / [ (1+r)^n - 1 ]</i>", style_body))
    story.append(Paragraph("• <b>Salary-Pledged Investment Schedule:</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;<i>B_t = B_{t-1} × (1 + m) - [ E × (1 - S/100) ]</i>", style_body))
    story.append(Paragraph("• <b>Real Effective Out-of-Pocket Cost:</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;<i>Real Effective Cost = Original Outflow (Down Payment + Fees + EMIs) - Investment Returns Earned (R_earned)</i>", style_body))
    story.append(Paragraph("• <b>Net Money Saved & Effective Discount %:</b><br/>&nbsp;&nbsp;&nbsp;&nbsp;<i>Net Savings = Full Cash Price - Real Effective Cost<br/>&nbsp;&nbsp;&nbsp;&nbsp;Effective Discount % = (Net Savings / Full Cash Price) × 100</i>", style_body))

    # Case Study Table
    story.append(Paragraph("6. CASE STUDY & RESULTS ANALYSIS", style_section_heading))
    
    table_data = [
        [Paragraph("<b>Financial Metric</b>", style_body), Paragraph("<b>Option A (Full Cash)</b>", style_body), Paragraph("<b>Option B (100% Salary Pledge)</b>", style_body), Paragraph("<b>Net Advantage</b>", style_body)],
        [Paragraph("Original Purchase Outflow", style_body), Paragraph("₹1,10,000", style_body), Paragraph("₹1,10,000", style_body), Paragraph("Same Cash Outflow", style_body)],
        [Paragraph("Investment Returns Earned", style_body), Paragraph("₹0", style_body), Paragraph("-₹43,077 (Offset)", style_body), Paragraph("₹43,077 Interest Subvention", style_body)],
        [Paragraph("Real Effective Cost Out-of-Pocket", style_body), Paragraph("₹1,10,000", style_body), Paragraph("<b>₹66,923</b>", style_body), Paragraph("<b>₹43,077 Less Out of Pocket</b>", style_body)],
        [Paragraph("Effective Discount Realized", style_body), Paragraph("0% OFF", style_body), Paragraph("<b>39.2% OFF</b>", style_body), Paragraph("<b>₹43,077 Net Discount!</b>", style_body)]
    ]

    t_case = Table(table_data, colWidths=[130, 120, 130, 120])
    t_case.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_case)
    story.append(Spacer(1, 10))

    # Conclusion
    story.append(Paragraph("7. CONCLUSION & LIVE LINKS", style_section_heading))
    story.append(Paragraph("Smart Buy Advisor v2.0 successfully transforms retail purchase decision-making by demonstrating how opportunity returns subsidize the real out-of-pocket cost of high-value items.", style_body))
    story.append(Paragraph("<b>🌐 Live Application URL:</b> https://nitintimothy.github.io/capstone-project-23EC5512/smart-buy-advisor/", style_body))
    story.append(Paragraph("<b>📁 GitHub Repository:</b> git@github.com:NitinTimothy/capstone-project-23EC5512.git", style_body))

    doc.build(story)
    print("Saved PROJECT_REPORT.pdf")

if __name__ == "__main__":
    create_docx()
    create_pdf()
