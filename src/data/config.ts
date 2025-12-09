export const siteConfig = {
  name: "Omair Malic",
  title: "Freelance Python Expert & Fullstack Web Developer",
  tagline: "Building powerful automation tools and modern web applications",
  email: "omairmalic28@gmail.com",
  location: "Philippines",
  about: {
    headline: "From Web Scraping to Full-Stack Development",
    paragraphs: [
      "I'm Omair Malic, a freelance Python developer based in the Philippines with deep expertise in web scraping, data extraction, and automation. I've built robust scraping solutions that handle complex websites, anti-bot measures, and large-scale data pipelines.",
      "Now I'm expanding into full-stack web development, creating end-to-end solutions — from backend APIs to beautiful, responsive frontends. My goal is to combine my data engineering background with modern web technologies.",
      "I believe in clean code, continuous learning, and building products that make a difference. Let's create something amazing together.",
    ],
  },
};

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "David R.",
    role: "E-commerce Business Owner",
    company: "US",
    content: "Needed someone to scrape competitor prices daily. Omair set up the whole system - it just runs on its own now and dumps everything into a Google Sheet. Took about 2 weeks. Had some back and forth on the proxy setup but he figured it out.",
  },
  {
    name: "Marcus T.",
    role: "Amazon Seller",
    company: "Australia",
    content: "Omair helped me pull Keepa data for my product research. Saved me from manually checking hundreds of ASINs. Quick turnaround, fair price. Would hire again for similar work.",
  },
  {
    name: "Jennifer L.",
    role: "Marketing Agency Owner",
    company: "Canada",
    content: "We needed to collect lead data from multiple sources. Omair wrote scripts that handled everything including some tricky sites with bot protection. Good communication, delivered what he promised.",
  },
  {
    name: "Ryan K.",
    role: "Startup Founder",
    company: "Singapore",
    content: "Hired Omair for a price monitoring project. He built both the scraper and a simple dashboard to view the data. Knows his stuff with Python. The code was clean and well-documented which made handoff easy.",
  },
];

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: "backend" | "frontend" | "tools" | "databases" | "other";
}

export const skills: Skill[] = [
  // Backend & Python
  { name: "Python", level: "expert", category: "backend" },
  { name: "Web Scraping (BeautifulSoup, Scrapy, Selenium)", level: "expert", category: "backend" },
  { name: "Requests & HTTPX", level: "expert", category: "backend" },
  { name: "FastAPI", level: "intermediate", category: "backend" },
  { name: "Django", level: "intermediate", category: "backend" },
  { name: "Flask", level: "intermediate", category: "backend" },
  { name: "REST APIs", level: "advanced", category: "backend" },
  
  // Frontend (Learning/Building)
  { name: "HTML & CSS", level: "intermediate", category: "frontend" },
  { name: "JavaScript", level: "intermediate", category: "frontend" },
  { name: "TypeScript", level: "beginner", category: "frontend" },
  { name: "React", level: "beginner", category: "frontend" },
  { name: "Next.js", level: "beginner", category: "frontend" },
  { name: "Tailwind CSS", level: "beginner", category: "frontend" },
  
  // Databases
  { name: "PostgreSQL", level: "intermediate", category: "databases" },
  { name: "MongoDB", level: "intermediate", category: "databases" },
  { name: "SQLite", level: "advanced", category: "databases" },
  { name: "Redis", level: "beginner", category: "databases" },
  
  // Tools & DevOps
  { name: "Git & GitHub", level: "advanced", category: "tools" },
  { name: "Docker", level: "intermediate", category: "tools" },
  { name: "Linux/Bash", level: "intermediate", category: "tools" },
  { name: "VS Code", level: "advanced", category: "tools" },
];

export interface CodeSnippet {
  code: string;
  language: string;
  explanation: string;
}

export interface Project {
  title: string;
  description: string;
  duration: string;
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  codeSnippet?: CodeSnippet;
}

export const projects: Project[] = [
  {
    title: "Axiom Trade Token Monitor",
    description: "Real-time crypto token monitoring tool for Axiom Trade platform with Discord webhook notifications and live dashboard for tracking new token launches.",
    duration: "Nov 2025",
    technologies: ["Python", "FastAPI", "React", "Vite", "Discord Webhooks", "REST API"],
    featured: false,
    codeSnippet: {
      language: "python",
      explanation: "Real-time token search with Discord notifications for new Solana token launches on Axiom Trade.",
      code: `import requests
import os
from datetime import datetime

API_URL = "https://api3.axiom.trade/search-v3"
DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")

seen_tokens = set()

def send_discord_notification(token):
    embed = {
        "title": f"New Token: {token.get('tokenName')}",
        "color": 0x00ff00,
        "fields": [
            {"name": "Ticker", "value": token.get('tokenTicker'), "inline": True},
            {"name": "Bonding Curve", "value": f"{token.get('bondingCurvePercent', 0)}%", "inline": True},
            {"name": "Liquidity (SOL)", "value": f"{token.get('liquiditySol', 0):.2f}", "inline": True},
        ],
        "timestamp": datetime.utcnow().isoformat()
    }
    requests.post(DISCORD_WEBHOOK_URL, json={"embeds": [embed]})

def poll_new_tokens():
    response = requests.get(API_URL, params={"isPumpSearch": "true"})
    tokens = response.json().get("tokens", [])
    
    for token in tokens:
        if token["tokenAddress"] not in seen_tokens:
            seen_tokens.add(token["tokenAddress"])
            send_discord_notification(token)`,
    },
  },
  {
    title: "Scraping System V3",
    description: "Advanced web scraping infrastructure with anti-detection, proxy rotation, and scalable architecture for high-volume data extraction.",
    duration: "Oct 2025 - Present",
    technologies: ["Python", "Scrapy", "Selenium", "Redis", "Docker"],
    featured: true,
    codeSnippet: {
      language: "python",
      explanation: "Base scraper class with status tracking, API communication, and job lifecycle management used across 50+ site-specific scrapers.",
      code: `import os
import logging
from abc import ABC, abstractmethod
from datetime import datetime
from typing import Dict, Any, Optional
from dataclasses import dataclass, asdict

@dataclass
class ScraperStatus:
    """Status information for a scraper instance"""
    scraper_id: str
    site: str
    strategy: str
    status: str  # idle, working, error, stopped
    current_job: Optional[str] = None
    jobs_completed: int = 0
    jobs_failed: int = 0
    started_at: str = ""
    last_activity: str = ""

class BaseScraper(ABC):
    """Base class for all scrapers"""
    
    def __init__(self, scraper_id: str, site: str, strategy: str = "api"):
        self.scraper_id = scraper_id
        self.site = site
        self.strategy = strategy
        self.api_url = os.getenv("API_URL", "http://localhost:8000")
        self.poll_interval = int(os.getenv("POLL_INTERVAL", "5"))
        self.max_retries = int(os.getenv("MAX_RETRIES", "3"))
        
        self.status = ScraperStatus(
            scraper_id=scraper_id,
            site=site,
            strategy=strategy,
            status="idle",
            started_at=datetime.utcnow().isoformat()
        )
        
        self.running = True
        self.current_job = None
        self.logger = logging.getLogger(f"{site}-{scraper_id}")
    
    @abstractmethod
    def scrape(self, url: str) -> Dict[str, Any]:
        """Site-specific scraping logic - implemented by subclasses"""
        pass
    
    def update_status(self, status: str, job_id: Optional[str] = None):
        self.status.status = status
        self.status.current_job = job_id
        self.status.last_activity = datetime.utcnow().isoformat()`,
    },
  },
  {
    title: "E-commerce Scraper",
    description: "Automated price monitoring and product data extraction across multiple e-commerce platforms with real-time alerts.",
    duration: "Aug 2025 - Present",
    technologies: ["Python", "BeautifulSoup", "Requests", "PostgreSQL", "FastAPI"],
    featured: true,
    codeSnippet: {
      language: "python",
      explanation: "Multi-strategy extraction using JSON-LD, meta tags, and HTML parsing for reliable product data across different site structures.",
      code: `import requests
from bs4 import BeautifulSoup
import json
from typing import Dict, Optional

class EnhancedScraper:
    """Enhanced product scraping with multiple extraction strategies"""
    
    def __init__(self, url: str):
        self.url = url
        self.soup = None
        self.json_ld_data = []
        self.meta_tags = {}
        self.product_json_ld = None
        self.parse()
        self.extract_structured_data()
    
    def parse(self):
        """Fetch and parse the webpage"""
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        response = requests.get(self.url, headers=headers)
        self.soup = BeautifulSoup(response.text, 'lxml')
    
    def extract_structured_data(self):
        """Extract JSON-LD and meta tags"""
        # Extract JSON-LD schemas
        for script in self.soup.find_all('script', type='application/ld+json'):
            try:
                data = json.loads(script.string)
                self.json_ld_data.append(data)
                if isinstance(data, dict) and data.get('@type') == 'Product':
                    self.product_json_ld = data
            except:
                pass
        
        # Extract OpenGraph and meta tags
        for tag in self.soup.find_all('meta'):
            if tag.get('property'):
                self.meta_tags[tag.get('property')] = tag.get('content')
            if tag.get('name'):
                self.meta_tags[tag.get('name')] = tag.get('content')
    
    def get_price(self) -> Optional[float]:
        """Get price using multiple strategies"""
        # Strategy 1: JSON-LD
        if self.product_json_ld:
            offers = self.product_json_ld.get('offers', {})
            if price := offers.get('price'):
                return float(price)
        # Strategy 2: Meta tags
        if price := self.meta_tags.get('product:price:amount'):
            return float(price)
        # Strategy 3: HTML parsing fallback
        return self._parse_price_from_html()`,
    },
  },
  {
    title: "Keepa System Project",
    description: "Amazon price tracking and analytics system integrating with Keepa API for historical price data and market insights.",
    duration: "Mar 2024 - Jul 2025",
    technologies: ["Python", "Keepa API", "Pandas", "Data Analysis"],
    featured: true,
    codeSnippet: {
      language: "python",
      explanation: "Async Keepa API client with token management, supporting Product Finder (KPF), Product Request (KPR), and Seller queries.",
      code: `import httpx
import asyncio
from typing import Dict, List, Optional, Any
from app.core.config import settings
import structlog

logger = structlog.get_logger()

class KeepaClient:
    """
    Keepa API client for all product operations.
    Token Rate: 65 tokens/minute with 1 hour expiry
    """
    
    def __init__(self):
        self.api_key = settings.keepa_api_key
        self.base_url = "https://api.keepa.com"
        self.domain = settings.keepa_domain  # 1 = US Amazon
        
    async def _make_request(self, endpoint: str, params: Dict[str, Any]) -> Dict:
        """Make authenticated request to Keepa API"""
        params["key"] = self.api_key
        params["domain"] = self.domain
        
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/{endpoint}", 
                params=params
            )
            response.raise_for_status()
            data = response.json()
            
            # Log token usage for rate limiting
            logger.info(
                "Keepa API request",
                endpoint=endpoint,
                tokens_consumed=data.get("tokensConsumed", 0),
                tokens_left=data.get("tokensLeft", 0)
            )
            return data
    
    async def product_finder(self, **filters) -> Dict[str, Any]:
        """KPF - Search products with 800+ filter parameters"""
        params = {k: v for k, v in filters.items() if v is not None}
        if "perPage" in params:
            params["perPage"] = min(params["perPage"], 10000)
        return await self._make_request("product", params)
    
    async def get_product(self, asin: str, history: bool = True) -> Dict:
        """KPR - Get single product with price history"""
        return await self._make_request("product", {
            "asin": asin, 
            "history": 1 if history else 0
        })`,
    },
  },
  {
    title: "CAPTCHA Solver",
    description: "Intelligent CAPTCHA solving solution for automated web scraping workflows, handling various CAPTCHA types.",
    duration: "Mar 2024 - Aug 2024",
    technologies: ["Python", "Machine Learning", "OCR", "Automation"],
    featured: true,
    codeSnippet: {
      language: "python",
      explanation: "Unified solver manager with multiple strategies (API, stealth browser) and automatic fallback with token caching.",
      code: `from typing import Optional, Dict
from solvers.base_solver import BaseSolver
from solvers.captcha_service import CaptchaServiceSolver
from solvers.stealth_solver import StealthSolver
from config import STRATEGY_PRIORITY, SOLVER_CONFIG
from utils.logger import setup_logger

logger = setup_logger()

class SolverManager:
    """Manages multiple solving strategies with fallback logic"""
    
    def __init__(self):
        self.solvers: Dict[str, BaseSolver] = {}
        self.token_cache: Dict[str, tuple] = {}  # {key: (token, timestamp)}
        self._initialize_solvers()
    
    def _initialize_solvers(self):
        """Initialize all available solvers"""
        try:
            self.solvers['api'] = CaptchaServiceSolver()
            logger.info("Initialized API solver")
        except Exception as e:
            logger.warning(f"Failed to init API solver: {e}")
        
        try:
            self.solvers['stealth'] = StealthSolver()
            logger.info("Initialized stealth solver")
        except Exception as e:
            logger.warning(f"Failed to init stealth solver: {e}")
    
    def solve(self, url: str, sitekey: str, use_cache=True) -> Optional[str]:
        """Solve CAPTCHA using available strategies with fallback"""
        # Check cache first
        if use_cache:
            if cached := self._get_cached_token(url, sitekey):
                logger.info("Using cached token")
                return cached
        
        # Try each strategy in priority order
        for strategy in STRATEGY_PRIORITY:
            solver = self.solvers.get(strategy)
            if not solver:
                continue
                
            logger.info(f"Trying strategy: {strategy}")
            for attempt in range(SOLVER_CONFIG['max_retries']):
                try:
                    token = solver.solve(url, sitekey)
                    if token:
                        self._cache_token(url, sitekey, token)
                        return token
                except Exception as e:
                    logger.warning(f"Attempt {attempt+1} failed: {e}")
        return None`,
    },
  },
  {
    title: "Undetectable Scraper",
    description: "Stealth web scraping tool designed to bypass anti-bot detection systems using browser fingerprinting and evasion techniques.",
    duration: "Mar 2024 - Jun 2024",
    technologies: ["Python", "Playwright", "Stealth Techniques", "Proxy Management"],
    featured: true,
    codeSnippet: {
      language: "python",
      explanation: "CDP Stealth Strategy with full JavaScript injection to mask automation detection and bypass Cloudflare Turnstile.",
      code: `from playwright.async_api import async_playwright
from strategies.base_strategy import BaseStrategy, ScraperResult

# Stealth JavaScript - masks automation detection
STEALTH_JS = """
() => {
    // Override navigator.webdriver
    Object.defineProperty(navigator, 'webdriver', {
        get: () => false,
    });
    
    // Mock permissions
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) => (
        parameters.name === 'notifications' ?
        Promise.resolve({ state: Notification.permission }) :
        originalQuery(parameters)
    );
    
    // Override plugins to look like real browser
    Object.defineProperty(navigator, 'plugins', {
        get: () => [
            { name: "Chrome PDF Plugin", filename: "internal-pdf-viewer" },
            { name: "Chrome PDF Viewer", filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai" }
        ],
    });
    
    // WebGL vendor override
    const getParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
        if (parameter === 37445) return 'Intel Inc.';
        if (parameter === 37446) return 'Intel Iris OpenGL Engine';
        return getParameter.call(this, parameter);
    };
}
"""

class CDPStealthStrategy(BaseStrategy):
    """CDP-based stealth scraping with Turnstile bypass"""
    
    async def create_stealth_context(self, playwright):
        browser = await playwright.chromium.launch(
            headless=True,
            args=["--disable-blink-features=AutomationControlled"]
        )
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            locale="en-US"
        )
        await context.add_init_script(STEALTH_JS)
        return context`,
    },
  },
  {
    title: "Telegram Bot",
    description: "Custom Telegram bot for automation, notifications, and data delivery from scraping pipelines.",
    duration: "Apr 2024 - May 2024",
    technologies: ["Python", "Telegram API", "Asyncio", "Bot Development"],
    featured: false,
    codeSnippet: {
      language: "python",
      explanation: "Async Telegram bot that sends scraping alerts and handles user commands for data queries.",
      code: `import os
from telegram import Update, Bot
from telegram.ext import Application, CommandHandler, ContextTypes

class ScrapingAlertBot:
    def __init__(self):
        # Token from environment variable
        self.token = os.getenv("TELEGRAM_BOT_TOKEN")
        self.app = Application.builder().token(self.token).build()
        self.setup_handlers()
    
    def setup_handlers(self):
        self.app.add_handler(CommandHandler("start", self.start))
        self.app.add_handler(CommandHandler("status", self.status))
        self.app.add_handler(CommandHandler("alerts", self.get_alerts))
    
    async def start(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        await update.message.reply_text(
            "Welcome! Use /status to check scraper status."
        )
    
    async def send_price_alert(self, chat_id: int, product: dict):
        message = f"""
🔔 Price Alert!

Product: {product['name']}
Old Price: \${product['old_price']}
New Price: \${product['new_price']}
Change: {product['change_percent']}%

🔗 {product['url']}
        """
        bot = Bot(token=self.token)
        await bot.send_message(chat_id=chat_id, text=message)`,
    },
  },
  {
    title: "BTCMarkets & CoinSpot Integration",
    description: "Crypto exchange integration tools for automated trading data extraction and analysis.",
    duration: "May 2024 - Jun 2024",
    technologies: ["Python", "REST APIs", "Crypto", "Data Pipelines"],
    featured: false,
    codeSnippet: {
      language: "python",
      explanation: "Unified crypto exchange client with secure API authentication and rate limiting.",
      code: `import os
import hmac
import hashlib
import time
import httpx
from abc import ABC, abstractmethod

class ExchangeClient(ABC):
    @abstractmethod
    async def get_balance(self) -> dict:
        pass

class BTCMarketsClient(ExchangeClient):
    BASE_URL = "https://api.btcmarkets.net"
    
    def __init__(self):
        # Credentials from environment - never in code
        self.api_key = os.getenv("BTCMARKETS_API_KEY")
        self.api_secret = os.getenv("BTCMARKETS_API_SECRET")
        self.client = httpx.AsyncClient()
    
    def _sign_request(self, method: str, path: str, data: str = ""):
        timestamp = str(int(time.time() * 1000))
        message = method + path + timestamp + data
        
        signature = hmac.new(
            self.api_secret.encode(),
            message.encode(),
            hashlib.sha512
        ).hexdigest()
        
        return {
            "BM-AUTH-APIKEY": self.api_key,
            "BM-AUTH-TIMESTAMP": timestamp,
            "BM-AUTH-SIGNATURE": signature,
        }
    
    async def get_balance(self) -> dict:
        path = "/v3/accounts/me/balances"
        headers = self._sign_request("GET", path)
        response = await self.client.get(
            f"{self.BASE_URL}{path}", headers=headers
        )
        return response.json()`,
    },
  },
  {
    title: "Facebook Auto-Comment",
    description: "Social media automation tool for scheduled commenting and engagement workflows.",
    duration: "Mar 2024 - Apr 2024",
    technologies: ["Python", "Selenium", "Automation", "Social Media"],
    featured: false,
    codeSnippet: {
      language: "python",
      explanation: "Scheduled social media automation with human-like delays and session management.",
      code: `import os
import random
import asyncio
from datetime import datetime, timedelta
from selenium import webdriver
from selenium.webdriver.common.by import By

class SocialAutomation:
    def __init__(self):
        self.driver = None
        self.session_file = "session_cookies.json"
    
    def human_delay(self, min_sec=1, max_sec=3):
        """Random delay to mimic human behavior."""
        time.sleep(random.uniform(min_sec, max_sec))
    
    def type_like_human(self, element, text: str):
        """Type text with random delays between keystrokes."""
        for char in text:
            element.send_keys(char)
            time.sleep(random.uniform(0.05, 0.15))
    
    async def schedule_post(
        self, 
        content: str, 
        scheduled_time: datetime
    ):
        """Schedule a post for a specific time."""
        delay = (scheduled_time - datetime.now()).total_seconds()
        
        if delay > 0:
            await asyncio.sleep(delay)
        
        await self.post_content(content)
    
    def save_session(self):
        """Save cookies to maintain login state."""
        cookies = self.driver.get_cookies()
        with open(self.session_file, "w") as f:
            json.dump(cookies, f)`,
    },
  },
  {
    title: "Portfolio Website",
    description: "This website! Built with Next.js and Tailwind CSS as part of my journey into full-stack development.",
    duration: "Nov 2025 - Present",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    featured: false,
    codeSnippet: {
      language: "typescript",
      explanation: "React component with Framer Motion animations for smooth scroll-triggered reveals.",
      code: `"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedSection({ 
  children, 
  className 
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px" 
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}`,
    },
  },
  {
    title: "Request-Based Automation",
    description: "Modular bulk signup and ticket automation system supporting multiple sites (Fusion Festival, Viagogo, Werder Bremen, Openstage) with TLS fingerprint spoofing, proxy rotation, and CLI interface.",
    duration: "Dec 2025",
    technologies: ["Python", "tls_client", "Proxy Rotation", "Multi-threading", "CLI"],
    featured: true,
    codeSnippet: {
      language: "python",
      explanation: "Modular signup tool with proxy rotation, multi-threading, and site-specific modules for bulk automation.",
      code: `import threading
from concurrent.futures import ThreadPoolExecutor
from typing import Optional
import tls_client

class ProxyRotator:
    def __init__(self, proxy_file: str):
        self.proxies = []
        self.lock = threading.Lock()
        with open(proxy_file, "r") as f:
            self.proxies = [l.strip() for l in f if l.strip()]
    
    def get_random(self) -> Optional[dict]:
        with self.lock:
            proxy = random.choice(self.proxies)
        # Format: host:port:user:pass
        return self._format_proxy(proxy)

class SignupModule:
    def __init__(self, proxy_rotator: ProxyRotator):
        self.proxy_rotator = proxy_rotator
        self.session = tls_client.Session(
            client_identifier="chrome_133",
            random_tls_extension_order=True
        )
    
    def process_batch(self, entries: list, workers: int = 10):
        with ThreadPoolExecutor(max_workers=workers) as executor:
            futures = [executor.submit(self.signup, e) for e in entries]
            for future in as_completed(futures):
                result = future.result()
                self.stats.add_success() if result else self.stats.add_failed()`,
    },
  },
  {
    title: "Auto-Strategy Production Scraper",
    description: "Intelligent web scraping system that automatically discovers and selects the optimal scraping strategy for any website with captcha handling.",
    duration: "Nov 2025",
    technologies: ["Python", "Playwright", "CDP", "Strategy Pattern"],
    featured: true,
    codeSnippet: {
      language: "python",
      explanation: "Strategy selector that automatically tests and chooses the best scraping approach based on site defenses.",
      code: `class StrategySelector:
    """Selects optimal scraping strategy based on defense profiles"""
    
    def __init__(self, profiles_dir: str, cdp_port: int = 9222):
        self.profile_loader = ProfileLoader(profiles_dir)
        self.strategies = {
            'requests': self._create_requests_strategy,
            'cdp_fetch': self._create_cdp_fetch_strategy,
            'cdp_navigate': self._create_cdp_navigate_strategy,
        }
        self.escalation_path = {
            'requests': 'cdp_fetch',
            'cdp_fetch': 'cdp_navigate',
            'cdp_navigate': None
        }
    
    def get_strategy_for_domain(self, domain: str):
        """Get optimal strategy based on saved profile"""
        profile = self.profile_loader.load_profile(domain)
        return self.select_strategy(profile)
    
    def escalate_strategy(self, current: str) -> Optional[str]:
        """Escalate to more robust strategy if current fails"""
        next_strategy = self.escalation_path.get(current)
        if next_strategy:
            print(f"[ESCALATE] {current} -> {next_strategy}")
        return next_strategy`,
    },
  },
  {
    title: "Hard-Defense Website Scraper",
    description: "Stealth scraper for heavily protected sites like DigiKey using undetected Chrome with parallel browser instances.",
    duration: "Nov 2024",
    technologies: ["Python", "undetected-chromedriver", "Threading", "Stealth"],
    featured: false,
    codeSnippet: {
      language: "python",
      explanation: "Stealth browser class with bot detection bypass and automatic browser rotation for sustained scraping.",
      code: `import undetected_chromedriver as uc
import random

class StealthBrowser:
    """Manages a stealth Chrome browser instance"""
    
    def __init__(self, worker_id):
        self.worker_id = worker_id
        self.driver = None
        self.products_processed = 0
        
    def start(self):
        """Initialize undetected Chrome driver"""
        options = uc.ChromeOptions()
        options.add_argument('--headless=new')
        options.add_argument('--disable-blink-features=AutomationControlled')
        options.add_argument(f'--window-size={1920 + random.randint(-100, 100)},{1080}')
        
        user_agents = [
            'Mozilla/5.0 Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 Chrome/121.0.0.0 Safari/537.36',
        ]
        options.add_argument(f'user-agent={random.choice(user_agents)}')
        
        self.driver = uc.Chrome(options=options, use_subprocess=True)
        self.driver.set_page_load_timeout(30)
        return True
    
    def should_restart(self):
        """Restart browser every 50 products to avoid detection"""
        return self.products_processed >= 50`,
    },
  },
  {
    title: "High-Concurrency Request Scraper",
    description: "Template-based async scraper with curl_cffi for TLS fingerprinting, adaptive rate limiting, and automatic retry handling.",
    duration: "Oct 2025",
    technologies: ["Python", "curl_cffi", "asyncio", "Proxy Rotation"],
    featured: false,
    codeSnippet: {
      language: "python",
      explanation: "Async scraper with TLS impersonation and adaptive rate limiting for high-volume extraction.",
      code: `from curl_cffi import requests
import asyncio, random

class AutoSiteScraper:
    def __init__(self):
        self.semaphore = asyncio.Semaphore(300)
        self.error_tracker = ErrorRateTracker(window_size=100)
        self.impersonations = ["chrome120", "chrome119", "safari17_0"]

    async def fetch(self, url):
        impersonation = random.choice(self.impersonations)
        headers = {"User-Agent": self._get_ua(impersonation)}
        async with requests.AsyncSession(
            impersonate=impersonation,
            proxies={"http": self.proxy},
            timeout=30
        ) as session:
            resp = await session.get(url, headers=headers)
            return resp.text

    def rate_limit(self):
        """Adaptive rate limiting based on error rate"""
        error_rate = self.error_tracker.error_rate()
        delay = 0.15 * (1 + (error_rate * 5))
        if error_rate > 0.6:
            time.sleep(30)  # Cooldown
        time.sleep(delay)`,
    },
  },
  {
    title: "Contentful CMS Automation",
    description: "Automated product data pipeline for Contentful CMS with barcode validation, image uploads, and ingredient processing.",
    duration: "Sep 2024",
    technologies: ["Python", "Contentful API", "Supabase", "Threading"],
    featured: false,
    codeSnippet: {
      language: "python",
      explanation: "Thread-safe Contentful API client with caching for high-volume product uploads.",
      code: `import requests
import threading

BASE_URL = f"https://api.contentful.com/spaces/{SPACE_ID}/environments/{ENVIRONMENT}"
upc_check_lock = threading.Lock()
checked_upcs_cache = {}

def is_upc_in_contentful(upc: str, ean: str = None) -> bool:
    """Thread-safe check if UPC exists in Contentful with caching."""
    cache_key = f"{upc}|{ean or ''}"
    
    with upc_check_lock:
        if cache_key in checked_upcs_cache:
            return checked_upcs_cache[cache_key]
    
    url = f"{BASE_URL}/entries"
    params = {"query": upc, "limit": 40}
    
    for attempt in range(5):
        resp = requests.get(url, headers=headers, params=params)
        if resp.status_code == 429:
            time.sleep(min(int(resp.headers.get('Retry-After', 60)), 30))
            continue
        
        exists = resp.json().get("total", 0) > 0
        with upc_check_lock:
            checked_upcs_cache[cache_key] = exists
        return exists`,
    },
  },
  {
    title: "Scraping Infrastructure V3",
    description: "Systemd-based infrastructure for managing 30-50+ concurrent scrapers with FastAPI control system and real-time dashboard.",
    duration: "Sep 2024",
    technologies: ["Python", "FastAPI", "Systemd", "Redis", "Linux"],
    featured: false,
    codeSnippet: {
      language: "python",
      explanation: "FastAPI endpoint for managing scraper services via systemd with real-time status monitoring.",
      code: `from fastapi import FastAPI, HTTPException
import subprocess
import redis

app = FastAPI()
redis_client = redis.Redis()

@app.post("/scrapers/{scraper_id}/start")
async def start_scraper(scraper_id: str):
    """Start a scraper service via systemd"""
    service_name = f"scraper-{scraper_id}"
    result = subprocess.run(
        ["systemctl", "start", service_name],
        capture_output=True
    )
    if result.returncode != 0:
        raise HTTPException(500, f"Failed to start {service_name}")
    
    redis_client.hset(f"scraper:{scraper_id}", "status", "running")
    return {"status": "started", "service": service_name}

@app.get("/scrapers/{scraper_id}/status")
async def get_status(scraper_id: str):
    """Get real-time scraper status from Redis"""
    status = redis_client.hgetall(f"scraper:{scraper_id}")
    return {"scraper_id": scraper_id, **status}`,
    },
  },
  {
    title: "Spekter Agency Automation",
    description: "Game API automation tool that replicates browser requests for automated gameplay flow execution.",
    duration: "Nov 2024",
    technologies: ["Python", "Requests", "API Automation", "Session Management"],
    featured: false,
    codeSnippet: {
      language: "python",
      explanation: "API client that replicates browser session for automated game flow execution.",
      code: `import requests
import time

class SpekterAgencyAPI:
    def __init__(self, bearer_token: str):
        self.base_url = "https://api.app.spekteragency.io"
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {bearer_token}",
            "Content-Type": "application/json",
            "Origin": "https://app.spekteragency.io",
            "App-Version": "0.6.2"
        })

    def run_full_flow(self, play_id: str) -> bool:
        """Execute complete game flow: start -> end -> claim"""
        if not self.start_stage(play_id):
            return False
        time.sleep(1)
        
        if not self.end_stage(play_id):
            return False
        time.sleep(1)
        
        return self.claim_stage_reward(play_id)
    
    def start_stage(self, play_id: str):
        resp = self.session.post(f"{self.base_url}/startStage/", json={"playId": play_id})
        return resp.status_code == 200`,
    },
  },
  {
    title: "Auto Cursor Tool",
    description: "Desktop application built with Tauri for managing Cursor editor machine ID backups and restoration across platforms.",
    duration: "Nov 2024",
    technologies: ["Rust", "Tauri", "React", "TypeScript", "SQLite"],
    featured: false,
    codeSnippet: {
      language: "rust",
      explanation: "Rust backend for cross-platform machine ID management with secure file operations.",
      code: `use std::path::PathBuf;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct MachineId {
    pub dev_device_id: String,
    pub mac_machine_id: String,
    pub machine_id: String,
    pub sqm_id: String,
}

#[tauri::command]
pub fn get_cursor_path() -> Result<PathBuf, String> {
    #[cfg(target_os = "windows")]
    let base = std::env::var("APPDATA").map_err(|e| e.to_string())?;
    
    #[cfg(target_os = "macos")]
    let base = dirs::home_dir()
        .ok_or("Home dir not found")?
        .join("Library/Application Support");
    
    Ok(PathBuf::from(base).join("Cursor"))
}

#[tauri::command]
pub fn restore_machine_id(backup_path: String) -> Result<(), String> {
    let backup: MachineId = serde_json::from_str(
        &std::fs::read_to_string(&backup_path).map_err(|e| e.to_string())?
    ).map_err(|e| e.to_string())?;
    
    // Update storage.json and SQLite database
    update_storage_json(&backup)?;
    update_sqlite_db(&backup)?;
    Ok(())
}`,
    },
  },
  {
    title: "Auto Glean Dashboard",
    description: "React dashboard for managing and monitoring web scraping operations with real-time job status and CSV uploads.",
    duration: "Oct 2024",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "shadcn-ui"],
    featured: false,
    codeSnippet: {
      language: "typescript",
      explanation: "TypeScript API service for scraping job management with type-safe requests.",
      code: `import { SiteJob } from '@/types';

export async function uploadProductsCsv(
  siteId: string,
  file: File
): Promise<{ rows: number }> {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(\`/api/sites/\${siteId}/upload\`, {
    method: 'POST',
    body: formData
  });
  return response.json();
}

export async function startScrape(siteId: string): Promise<{ jobId: string }> {
  const response = await fetch(\`/api/sites/\${siteId}/start\`, {
    method: 'POST'
  });
  return response.json();
}

export async function getJobStatus(siteId: string): Promise<Partial<SiteJob>> {
  const response = await fetch(\`/api/sites/\${siteId}/status\`);
  return response.json();
}`,
    },
  },
  {
    title: "VizionCrypto System",
    description: "Crypto inventory management system with integrated scraping pipelines for market data collection and analysis.",
    duration: "Sep 2024",
    technologies: ["Python", "Data Pipelines", "CSV Processing", "Automation"],
    featured: false,
    codeSnippet: {
      language: "python",
      explanation: "Inventory tracking system with CSV processing for crypto product management.",
      code: `import csv
from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime

@dataclass
class CryptoProduct:
    sku: str
    name: str
    price: float
    quantity: int
    last_updated: datetime

class InventoryManager:
    def __init__(self, csv_path: str):
        self.csv_path = csv_path
        self.products: List[CryptoProduct] = []
        self.load_inventory()
    
    def load_inventory(self):
        """Load products from CSV file"""
        with open(self.csv_path, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                self.products.append(CryptoProduct(
                    sku=row['sku'],
                    name=row['name'],
                    price=float(row['price']),
                    quantity=int(row['quantity']),
                    last_updated=datetime.now()
                ))
    
    def update_prices(self, price_data: dict):
        """Batch update prices from scraped data"""
        for product in self.products:
            if product.sku in price_data:
                product.price = price_data[product.sku]
                product.last_updated = datetime.now()`,
    },
  },
  {
    title: "Multi-Retailer HTML Parser",
    description: "Production-grade HTML parsing system for major e-commerce retailers including Apple, Nike, Sephora, IKEA, Gap, Old Navy, and Lululemon with catalog schema output.",
    duration: "Dec 2025",
    technologies: ["Python", "BeautifulSoup", "JSON Schema", "Data Extraction"],
    featured: true,
    codeSnippet: {
      language: "python",
      explanation: "Base parser class with directory traversal, progress tracking, and multi-format output for retailer product extraction.",
      code: `from abc import ABC, abstractmethod
from typing import List, Dict, Any
from bs4 import BeautifulSoup
import json, csv, os

class BaseParser(ABC):
    """Base class for all retailer parsers"""
    
    def __init__(self, retailer_name: str, country: str):
        self.retailer_name = retailer_name
        self.country = country
        self.products = []
    
    @abstractmethod
    def parse_file(self, file_path: str) -> List[Dict[str, Any]]:
        """Parse a single file - implemented by each retailer"""
        pass
    
    def parse_directory(self, directory_path: str) -> List[Dict[str, Any]]:
        """Parse all HTML files with progress tracking"""
        all_products = []
        total_files = sum(1 for r, d, f in os.walk(directory_path) 
                        for file in f if self.is_valid_file(file))
        
        for root, dirs, files in os.walk(directory_path):
            for file in files:
                if self.is_valid_file(file):
                    products = self.parse_file(os.path.join(root, file))
                    if products:
                        all_products.extend(products)
        return all_products
    
    def to_json(self, products: List[Dict], output_path: str):
        """Export to Tyler's catalog schema JSON"""
        with open(output_path, 'w') as f:
            json.dump({"products": products}, f, indent=2)`,
    },
  },
];

export const skillCategories = {
  backend: { label: "Backend & Python", color: "bg-blue-500" },
  frontend: { label: "Frontend", color: "bg-green-500" },
  databases: { label: "Databases", color: "bg-purple-500" },
  tools: { label: "Tools & DevOps", color: "bg-orange-500" },
  other: { label: "Other", color: "bg-gray-500" },
};

export const skillLevels = {
  beginner: { label: "Learning", width: "w-1/4", color: "bg-slate-400" },
  intermediate: { label: "Intermediate", width: "w-2/4", color: "bg-slate-500" },
  advanced: { label: "Advanced", width: "w-3/4", color: "bg-slate-600" },
  expert: { label: "Expert", width: "w-full", color: "bg-slate-800" },
};
