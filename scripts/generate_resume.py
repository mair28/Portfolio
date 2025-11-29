from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

output_path = r"C:\Users\oomalic\Documents\OMAIR\portfolio-website\public\resume.pdf"

# Colors
slate800 = HexColor("#1e293b")
slate700 = HexColor("#334155")
slate600 = HexColor("#475569")
slate400 = HexColor("#94a3b8")
slate200 = HexColor("#e2e8f0")
slate100 = HexColor("#f1f5f9")
white = HexColor("#ffffff")
accent = HexColor("#3b82f6")

c = canvas.Canvas(output_path, pagesize=letter)
width, height = letter

# Sidebar
sidebar_w = 2.3 * inch
c.setFillColor(slate800)
c.rect(0, 0, sidebar_w, height, fill=True, stroke=False)

# === SIDEBAR CONTENT ===
y = height - 45

# Name
c.setFillColor(white)
c.setFont("Helvetica-Bold", 22)
c.drawString(20, y, "OMAIR")
y -= 32
c.drawString(20, y, "MALIC")

# Title with accent line
y -= 18
c.setFillColor(accent)
c.rect(20, y, 40, 3, fill=True, stroke=False)
y -= 18
c.setFont("Helvetica", 9)
c.setFillColor(slate200)
c.drawString(20, y, "Python Expert &")
y -= 13
c.drawString(20, y, "Fullstack Web Developer")

# Contact Section
y -= 35
c.setFillColor(white)
c.setFont("Helvetica-Bold", 10)
c.drawString(20, y, "CONTACT")
y -= 5
c.setFillColor(accent)
c.rect(20, y, 55, 2, fill=True, stroke=False)

y -= 20
c.setFont("Helvetica", 8)
c.setFillColor(slate200)
# Email icon (envelope shape)
c.setFillColor(slate400)
c.rect(20, y-2, 10, 7, fill=True, stroke=False)
c.setFillColor(slate200)
c.drawString(35, y, "omairmalic28@gmail.com")
y -= 18
# Location icon
c.setFillColor(slate400)
c.circle(25, y+3, 4, fill=True, stroke=False)
c.setFillColor(slate200)
c.drawString(35, y, "Philippines (Remote)")

# Core Skills Section
y -= 40
c.setFillColor(white)
c.setFont("Helvetica-Bold", 10)
c.drawString(20, y, "CORE EXPERTISE")
y -= 5
c.setFillColor(accent)
c.rect(20, y, 85, 2, fill=True, stroke=False)

skills = [
    ("Python Development", 95),
    ("Web Scraping", 95),
    ("Anti-Bot Bypass", 90),
    ("API Development", 85),
    ("Data Automation", 90),
    ("Browser Automation", 85),
]

y -= 22
for skill, level in skills:
    c.setFont("Helvetica", 8)
    c.setFillColor(slate200)
    c.drawString(20, y, skill)
    y -= 12
    # Bar background
    c.setFillColor(slate700)
    c.roundRect(20, y, 120, 6, 3, fill=True, stroke=False)
    # Bar fill
    c.setFillColor(accent)
    c.roundRect(20, y, 120 * (level/100), 6, 3, fill=True, stroke=False)
    y -= 16

# Tech Stack
y -= 20
c.setFillColor(white)
c.setFont("Helvetica-Bold", 10)
c.drawString(20, y, "TECH STACK")
y -= 5
c.setFillColor(accent)
c.rect(20, y, 70, 2, fill=True, stroke=False)

tech_categories = [
    ("Scraping:", "Scrapy, Selenium, Playwright, BeautifulSoup, HTTPX"),
    ("Backend:", "FastAPI, Django, Flask, REST APIs"),
    ("Frontend:", "React, Next.js, TypeScript"),
    ("Database:", "PostgreSQL, MongoDB, Redis"),
    ("DevOps:", "Docker, AWS, Git, Linux"),
]

y -= 18
c.setFont("Helvetica", 7)
for cat, items in tech_categories:
    c.setFillColor(accent)
    c.drawString(20, y, cat)
    c.setFillColor(slate200)
    # Wrap long text
    lines = simpleSplit(items, "Helvetica", 7, 105)
    x_offset = 20 + c.stringWidth(cat, "Helvetica", 7) + 3
    for i, line in enumerate(lines):
        if i == 0:
            c.drawString(x_offset, y, line)
        else:
            c.drawString(20, y, line)
        y -= 11
    if len(lines) == 1:
        y -= 0

# === MAIN CONTENT ===
mx = sidebar_w + 22
mw = width - sidebar_w - 44
y = height - 45

# Professional Summary
c.setFillColor(slate800)
c.setFont("Helvetica-Bold", 12)
c.drawString(mx, y, "PROFESSIONAL SUMMARY")
y -= 6
c.setStrokeColor(accent)
c.setLineWidth(2)
c.line(mx, y, mx + 130, y)

y -= 18
c.setFont("Helvetica", 9)
c.setFillColor(slate600)
summary = "Specialized Python developer focused on web scraping, data extraction, and automation solutions. I build robust systems that handle complex anti-bot measures, process millions of data points, and deliver reliable results. My solutions help businesses gain competitive intelligence, automate repetitive tasks, and scale their data operations efficiently."
for line in simpleSplit(summary, "Helvetica", 9, mw):
    c.drawString(mx, y, line)
    y -= 13

# What I Deliver Section
y -= 18
c.setFillColor(slate800)
c.setFont("Helvetica-Bold", 12)
c.drawString(mx, y, "WHAT I DELIVER")
y -= 6
c.setStrokeColor(accent)
c.line(mx, y, mx + 95, y)

deliverables = [
    ("High-Volume Data Extraction", "Scraping systems processing 500K+ pages daily with 99%+ accuracy"),
    ("Anti-Detection Solutions", "Bypass Cloudflare, DataDome, PerimeterX with stealth techniques"),
    ("Automated Monitoring", "Real-time price tracking, inventory alerts, competitor analysis"),
    ("Custom API Development", "FastAPI backends to serve and manage scraped data"),
    ("CAPTCHA Solving", "Automated solutions for reCAPTCHA, hCaptcha, Turnstile"),
]

y -= 16
for title, desc in deliverables:
    # Bullet point
    c.setFillColor(accent)
    c.circle(mx + 4, y + 3, 3, fill=True, stroke=False)
    
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(slate800)
    c.drawString(mx + 12, y, title)
    y -= 12
    c.setFont("Helvetica", 8)
    c.setFillColor(slate600)
    c.drawString(mx + 12, y, desc)
    y -= 16

# Experience
y -= 14
c.setFillColor(slate800)
c.setFont("Helvetica-Bold", 12)
c.drawString(mx, y, "EXPERIENCE")
y -= 6
c.setStrokeColor(accent)
c.line(mx, y, mx + 75, y)

# Timeline dot
y -= 18
c.setFillColor(accent)
c.circle(mx + 4, y + 4, 4, fill=True, stroke=False)
c.setStrokeColor(accent)
c.setLineWidth(1)
c.line(mx + 4, y, mx + 4, y - 85)

c.setFont("Helvetica-Bold", 10)
c.setFillColor(slate800)
c.drawString(mx + 14, y, "Python Developer & Automation Specialist")
c.setFont("Helvetica", 8)
c.setFillColor(accent)
c.drawRightString(width - 22, y, "Mar 2024 - Present")

y -= 14
c.setFillColor(slate600)
c.setFont("Helvetica-Oblique", 8)
c.drawString(mx + 14, y, "Freelance | Remote - Working with clients globally")

exp_points = [
    "Built 50+ custom scraping solutions for e-commerce, real estate, and finance sectors",
    "Developed anti-detection systems with proxy rotation, fingerprint spoofing, CAPTCHA bypass",
    "Created data pipelines processing millions of records with automated error recovery",
    "Delivered FastAPI backends for real-time data access and webhook integrations",
    "Worked with clients from US, Australia, Canada, Singapore, and Europe",
]

y -= 14
c.setFont("Helvetica", 8)
for point in exp_points:
    c.setFillColor(slate600)
    c.drawString(mx + 14, y, f"• {point}")
    y -= 12

# Key Projects
y -= 20
c.setFillColor(slate800)
c.setFont("Helvetica-Bold", 12)
c.drawString(mx, y, "FEATURED PROJECTS")
y -= 6
c.setStrokeColor(accent)
c.line(mx, y, mx + 115, y)

projects = [
    {
        "name": "Enterprise Scraping System V3",
        "date": "Oct 2025 - Present",
        "desc": "Large-scale infrastructure handling 500K+ daily extractions across 100+ e-commerce sites with automatic failover and retry logic."
    },
    {
        "name": "E-commerce Price Intelligence",
        "date": "Aug 2025 - Present",
        "desc": "Real-time competitor price monitoring with instant alerts, historical tracking, and trend analysis dashboard."
    },
    {
        "name": "Amazon Analytics Platform",
        "date": "Mar 2024 - Jul 2025",
        "desc": "Keepa API integration processing 10K+ ASINs daily for price history, sales rank tracking, and buy recommendations."
    },
    {
        "name": "Stealth Browser Framework",
        "date": "Mar 2024 - Aug 2024",
        "desc": "CDP-based automation with fingerprint randomization, successfully bypassing major protection services."
    },
]

y -= 16
for proj in projects:
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(slate800)
    c.drawString(mx, y, proj["name"])
    c.setFont("Helvetica", 7)
    c.setFillColor(accent)
    c.drawRightString(width - 22, y, proj["date"])
    y -= 12
    c.setFont("Helvetica", 8)
    c.setFillColor(slate600)
    desc_lines = simpleSplit(proj["desc"], "Helvetica", 8, mw - 5)
    for line in desc_lines:
        c.drawString(mx, y, line)
        y -= 11
    y -= 6

# Call to Action
y -= 10
c.setFillColor(slate100)
c.roundRect(mx - 5, y - 25, mw + 10, 35, 5, fill=True, stroke=False)
c.setFillColor(slate800)
c.setFont("Helvetica-Bold", 9)
c.drawCentredString(mx + mw/2, y - 5, "Ready to automate your data collection?")
c.setFont("Helvetica", 8)
c.setFillColor(slate600)
c.drawCentredString(mx + mw/2, y - 18, "Let's discuss your project: omairmalic28@gmail.com")

c.save()
print("Resume created successfully!")
