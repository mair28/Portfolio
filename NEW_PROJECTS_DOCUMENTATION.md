# New Project Documentation (Early 2026)

This document provides a technical overview of the major projects developed and integrated into the portfolio in January and February 2026. These projects represent a significant advancement in anti-detection, high-fidelity browser automation, and scalable data infrastructure.

---

## 1. Viagogo Crawler System
**Focus:** High-Fidelity Data Extraction & Monitoring
**Status:** Alpha/Production Ready
**Directory:** `C:\Users\oomalic\Documents\OMAIR\viagogo`

### Project Overview
A sophisticated Python-based crawler designed to track ticket listings on Viagogo. Unlike generic scrapers, this system maintains "location parity" by mimicking specific geographical contexts (e.g., US-based buyers) to ensure pricing accuracy (addressing the 4-5% price discrepancy caused by currency/location settings).

### Technical Highlights
- **AWS WAF Solver & Anti-Detection:** Uses `awswaf_solver` and `anti_detect.py` to bypass edge protection.
- **TLS Fingerprinting:** Leverages `curl_cffi` to impersonate specific Chrome versions (e.g., Chrome 124) at the TLS layer.
- **Dual-URL Strategy:** Discovers events using stable IDs and then persists canonical SEO slugs for high-fidelity extraction.
- **Infrastructure:** Containerized with Docker, using PostgreSQL for listing history and volume persistence.

### Key Components
- `viagogo_client.py`: Core client with WAF handling.
- `monitor.py`: Continuous scanning loop for target events.
- `db_loader.py`: Efficient PostgreSQL ingestion.

---

## 2. Ticketmaster Automation Suite
**Focus:** Human-Behavior Simulation & Farming
**Status:** Active/Production
**Directory:** `C:\Users\oomalic\Documents\OMAIR\ticketmaster`

### Project Overview
An advanced automation toolkit for Ticketmaster, pivoting from simple scraping to full "account farming" and price monitoring. The suite is designed to survive heavy bot-detection environments by simulating realistic human interactions.

### Technical Highlights
- **Human Simulation:** Implements `farming_behaviors.py` which uses `zendriver` (an automation-friendly driver) to mimic mouse movements, random delays, and natural typing.
- **Stealth Block Bypass:** Specifically targets the "Browsing Activity Has Been Paused" block variant using precise DOM detection rather than generic status code checks.
- **LocalProxyServer:** Uses a custom `proxyBasicAuth.py` to handle upstream proxy rotation with basic authentication seamlessly within the browser context.
- **Dynamic Region Support:** Loads regional configurations (US, UK, CA, AU, DE) via `tm_categories.json`.

---

## 3. SheerID Verification & DocGen
**Focus:** AI/Fraud Detection Evasion
**Status:** Advanced Research/Tooling
**Directory:** `C:\Users\oomalic\Documents\OMAIR\sheerID-verification`

### Project Overview
A comprehensive toolset for automating SheerID verification workflows for high-value services (Spotify, YouTube, Gemini). The project addresses the shift towards AI-based document review and TLS fingerprinting.

### Technical Highlights
- **`doc_generator.py`:** A sophisticated image processing module using Pillow (PIL) to generate "proof of eligibility" documents (Student IDs, Transcripts).
- **AI Evasion Techniques:**
    - **Noise Injection:** Adds random pixel noise to break template matching.
    - **Perspective Distortion:** Simulates a non-flat photograph of a document.
    - **JPEG Artifacts:** Mimics real photograph compression to deceive digital-clone detectors.
    - **Paper Textures:** Adds grain and cream-tinting to simulate physical paper aging.
- **TLS Fingerprint Spoofing:** Integrated `curl_cffi` to achieve a ~60-80% success rate by impersonating legitimate browser signatures.

---

## Technical Stack Summary (New Modules)
- **Language:** Python 3.11+
- **Automation:** Zendriver, Playwright, Camoufox, undetected-chromedriver.
- **Network:** curl_cffi (TLS Impersonation), Cloudscraper, HTTPX, LocalProxy.
- **Database:** PostgreSQL (Dockerized), SQLite (Local caching).
- **Imaging:** PIL/Pillow for dynamic document generation.
