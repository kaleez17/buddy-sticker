import { useState, useEffect } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Skull Drip", category: "Gothic", price: 149, rating: 4.9, reviews: 87, emoji: "💀", tag: "BESTSELLER", desc: "Hand-drawn dripping skull, weatherproof vinyl. Perfect for helmets & fuel tanks.", sizes: ['3"', '5"', '8"'], colors: ["Black/White", "Forest/White", "Sky/Black"] },
  { id: 2, name: "Street Tiger", category: "Animals", price: 199, rating: 4.8, reviews: 63, emoji: "🐯", tag: "HOT", desc: "Aggressive tiger face in premium print style. Fade-resistant outdoor ink.", sizes: ['4"', '6"', '10"'], colors: ["Orange/Black", "White/Forest", "Sky/Gold"] },
  { id: 3, name: "Flame Rider", category: "Bikes", price: 249, rating: 5.0, reviews: 41, emoji: "🔥", tag: "NEW", desc: "Full-wrap flame kit for bikes & cars. UV-resistant, 5-year guarantee.", sizes: ["Kit S", "Kit M", "Kit L"], colors: ["Classic", "Forest Teal", "Sky Blue"] },
  { id: 4, name: "Oni Mask", category: "Gothic", price: 179, rating: 4.7, reviews: 52, emoji: "👹", tag: "TRENDING", desc: "Japanese oni demon mask, ultra-detailed linework on premium matte vinyl.", sizes: ['3"', '5"', '8"'], colors: ["Red/Black", "Forest/Gold", "Sky/White"] },
  { id: 5, name: "Chrome Eagle", category: "Patriotic", price: 219, rating: 4.8, reviews: 38, emoji: "🦅", tag: "POPULAR", desc: "Metallic chrome eagle spread wings. Mirror-finish vinyl, premium quality.", sizes: ['5"', '8"', '12"'], colors: ["Chrome", "Forest Gold", "Sky Silver"] },
  { id: 6, name: "Graffiti Tag", category: "Street", price: 99, rating: 4.6, reviews: 94, emoji: "✍️", tag: "VALUE PICK", desc: "Custom graffiti-style name tag. Each one handcrafted to order by Gopi.", sizes: ['4"', '6"', '10"'], colors: ["Multi", "Mono", "Nature"] },
  { id: 7, name: "Mecha Skull", category: "Gothic", price: 269, rating: 4.9, reviews: 29, emoji: "🤖", tag: "PREMIUM", desc: "Cyberpunk mechanical skull fusion. Holographic finish available.", sizes: ['5"', '8"', '12"'], colors: ["Holo", "Forest Chrome", "Sky/Black"] },
  { id: 8, name: "Serpent Wrap", category: "Bikes", price: 349, rating: 5.0, reviews: 18, emoji: "🐍", tag: "CUSTOM", desc: "Full serpent body wrap for bikes. Custom fit, Gopi's signature handcraft.", sizes: ["Kit S", "Kit M", "Kit L"], colors: ["Forest/Gold", "Sky/Silver", "Black/Teal"] },
];

const CATEGORIES = ["All", "Gothic", "Bikes", "Animals", "Street", "Patriotic"];

const REVIEWS = [
  { name: "Sooraj Kumar", rating: 5, text: "Got 3 of my works done here. Gopi is the reason I keep coming back. Extraordinary output every single time.", badge: "Local Guide", date: "3 months ago" },
  { name: "Praveen", rating: 5, text: "Gopi did an amazing job on my Aprilia RS457. The detailing was so good — lot of dedication and the result was the best.", badge: "Local Guide", date: "3 months ago" },
  { name: "Sadam Mathik", rating: 5, text: "Stunning work done by Gopi for my Verna. Give him time and space and the output will be exactly as you liked.", badge: "Verified", date: "1 month ago" },
];

// ── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --forest:     #2d6a4f;
    --forest-mid: #40916c;
    --forest-light: #74c69d;
    --sky:        #48cae4;
    --sky-light:  #90e0ef;
    --sky-pale:   #caf0f8;
    --cream:      #f8f9f0;
    --white:      #ffffff;
    --ink:        #1a2e22;
    --ink-mid:    #2d4a38;
    --muted:      #6b8f71;
    --border:     #d4e8da;
    --border-mid: #b8d9c0;
    --card-bg:    #f2f8f4;
    --shadow-sm:  0 2px 12px rgba(45,106,79,0.08);
    --shadow-md:  0 8px 32px rgba(45,106,79,0.12);
    --shadow-lg:  0 20px 60px rgba(45,106,79,0.16);
    --font-serif: 'Cormorant Garamond', Georgia, serif;
    --font-sans:  'DM Sans', sans-serif;
    --font-mono:  'DM Mono', monospace;
    --radius:     12px;
    --radius-lg:  20px;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--cream);
    color: var(--ink);
    font-family: var(--font-sans);
    overflow-x: hidden;
    line-height: 1.6;
  }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: var(--forest-light); border-radius: 10px; }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(248,249,240,0.92);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    padding: 0 40px;
    height: 68px;
    display: flex; align-items: center; justify-content: space-between;
  }
  .nav-logo {
    font-family: var(--font-serif);
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 1px;
    color: var(--ink);
    cursor: pointer;
    display: flex; align-items: center; gap: 8px;
  }
  .nav-logo-dot {
    width: 8px; height: 8px;
    background: var(--sky);
    border-radius: 50%;
    display: inline-block;
  }
  .nav-right { display: flex; align-items: center; gap: 32px; }
  .nav-links { display: flex; gap: 32px; }
  .nav-link {
    font-family: var(--font-sans);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: var(--muted);
    cursor: pointer;
    background: none; border: none;
    transition: color 0.2s;
    padding: 4px 0;
    position: relative;
  }
  .nav-link::after {
    content: '';
    position: absolute; bottom: -2px; left: 0; right: 0;
    height: 2px; background: var(--forest);
    transform: scaleX(0); transition: transform 0.2s;
    border-radius: 2px;
  }
  .nav-link:hover { color: var(--ink); }
  .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
  .nav-link.active { color: var(--ink); }

  .cart-btn {
    background: var(--forest);
    color: white; border: none;
    border-radius: var(--radius);
    padding: 10px 20px;
    display: flex; align-items: center; gap: 8px;
    font-family: var(--font-sans); font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
    position: relative;
  }
  .cart-btn:hover { background: var(--forest-mid); transform: translateY(-1px); box-shadow: var(--shadow-sm); }
  .cart-badge {
    background: var(--sky);
    color: var(--ink);
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 500;
    width: 20px; height: 20px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }

  /* ── HERO ── */
  .hero {
    min-height: 88vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 80px 40px;
    gap: 60px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; top: -200px; right: -200px;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(72,202,228,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero::after {
    content: '';
    position: absolute; bottom: -100px; left: -100px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(45,106,79,0.08) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-content { position: relative; z-index: 1; }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--sky-pale);
    color: var(--ink-mid);
    border: 1px solid var(--sky-light);
    font-family: var(--font-mono);
    font-size: 11px; font-weight: 500;
    letter-spacing: 1px;
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 28px;
  }
  .hero-badge-dot { width: 6px; height: 6px; background: var(--sky); border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }

  .hero-title {
    font-family: var(--font-serif);
    font-size: clamp(52px, 6vw, 88px);
    font-weight: 700;
    line-height: 1.0;
    color: var(--ink);
    margin-bottom: 8px;
    letter-spacing: -1px;
  }
  .hero-title-line2 {
    color: var(--forest);
    display: block;
  }
  .hero-subtitle {
    font-family: var(--font-serif);
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 400;
    color: var(--sky);
    letter-spacing: 4px;
    text-transform: uppercase;
    margin-bottom: 28px;
  }
  .hero-desc {
    font-size: 16px;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.8;
    max-width: 460px;
    margin-bottom: 44px;
  }
  .hero-desc strong { color: var(--ink); font-weight: 600; }
  .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; }

  .btn-primary {
    background: var(--forest);
    color: white; border: none;
    font-family: var(--font-sans); font-size: 15px; font-weight: 500;
    padding: 14px 32px;
    border-radius: var(--radius);
    cursor: pointer; transition: all 0.25s;
  }
  .btn-primary:hover { background: var(--forest-mid); transform: translateY(-2px); box-shadow: var(--shadow-md); }

  .btn-secondary {
    background: transparent;
    color: var(--forest); border: 1.5px solid var(--forest-light);
    font-family: var(--font-sans); font-size: 15px; font-weight: 500;
    padding: 14px 32px;
    border-radius: var(--radius);
    cursor: pointer; transition: all 0.25s;
  }
  .btn-secondary:hover { background: var(--card-bg); border-color: var(--forest); transform: translateY(-2px); }

  /* Hero Visual */
  .hero-visual {
    position: relative; z-index: 1;
    display: flex; align-items: center; justify-content: center;
  }
  .hero-card-stack { position: relative; width: 360px; height: 420px; }
  .hero-card {
    position: absolute;
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 12px;
  }
  .hero-card-back {
    width: 300px; height: 340px;
    top: 40px; right: 0;
    background: linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 100%);
    transform: rotate(6deg);
    border: none;
  }
  .hero-card-mid {
    width: 300px; height: 340px;
    top: 20px; right: 20px;
    background: linear-gradient(135deg, var(--sky) 0%, var(--sky-light) 100%);
    transform: rotate(-3deg);
    border: none;
  }
  .hero-card-front {
    width: 300px; height: 340px;
    top: 0; left: 0;
    padding: 32px;
  }
  .hero-card-emoji { font-size: 80px; line-height: 1; }
  .hero-card-name {
    font-family: var(--font-serif); font-size: 28px; font-weight: 700;
    color: var(--ink); text-align: center;
  }
  .hero-card-price {
    font-family: var(--font-mono); font-size: 22px;
    color: var(--forest); font-weight: 500;
  }
  .hero-card-tag {
    background: var(--sky-pale); color: var(--ink-mid);
    border: 1px solid var(--sky-light);
    font-family: var(--font-mono); font-size: 10px;
    padding: 4px 12px; border-radius: 100px;
    letter-spacing: 1px;
  }

  .hero-stats-row {
    display: flex; gap: 32px;
    margin-top: 48px;
    padding-top: 32px;
    border-top: 1px solid var(--border);
  }
  .hero-stat { }
  .hero-stat-num {
    font-family: var(--font-serif); font-size: 32px; font-weight: 700;
    color: var(--forest); line-height: 1;
  }
  .hero-stat-label {
    font-family: var(--font-sans); font-size: 12px;
    color: var(--muted); font-weight: 400; margin-top: 2px;
  }

  /* ── TICKER ── */
  .ticker {
    background: var(--forest);
    padding: 12px 0;
    overflow: hidden; white-space: nowrap;
  }
  .ticker-inner { display: inline-flex; animation: ticker 24s linear infinite; }
  .ticker-item {
    font-family: var(--font-sans); font-size: 13px; font-weight: 500;
    letter-spacing: 2px; color: rgba(255,255,255,0.85);
    padding: 0 32px; text-transform: uppercase;
  }
  .ticker-dot { color: var(--sky); margin: 0 8px; }
  @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }

  /* ── SECTIONS ── */
  .section { padding: 96px 40px; }
  .section-alt { background: white; }
  .section-tag {
    font-family: var(--font-mono); font-size: 11px; font-weight: 500;
    letter-spacing: 3px; color: var(--forest);
    text-transform: uppercase; margin-bottom: 10px;
  }
  .section-title {
    font-family: var(--font-serif);
    font-size: clamp(36px, 4vw, 56px);
    font-weight: 700; color: var(--ink);
    line-height: 1.1; letter-spacing: -0.5px;
  }
  .section-header { margin-bottom: 52px; }
  .section-header-row {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 52px; flex-wrap: wrap; gap: 16px;
  }

  /* ── FILTERS ── */
  .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 44px; }
  .filter-btn {
    background: transparent; color: var(--muted);
    border: 1px solid var(--border);
    font-family: var(--font-sans); font-size: 13px; font-weight: 500;
    padding: 8px 20px; border-radius: 100px;
    cursor: pointer; transition: all 0.2s;
  }
  .filter-btn:hover { color: var(--ink); border-color: var(--border-mid); }
  .filter-btn.active {
    background: var(--forest); color: white;
    border-color: var(--forest); box-shadow: var(--shadow-sm);
  }

  /* ── PRODUCT GRID ── */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 24px;
  }

  /* ── PRODUCT CARD ── */
  .product-card {
    background: white;
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all 0.3s;
    overflow: hidden;
  }
  .product-card:hover {
    border-color: var(--forest-light);
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
  }
  .card-img {
    height: 200px;
    background: linear-gradient(135deg, var(--card-bg) 0%, var(--sky-pale) 100%);
    display: flex; align-items: center; justify-content: center;
    font-size: 80px; position: relative;
    transition: background 0.3s;
  }
  .product-card:hover .card-img {
    background: linear-gradient(135deg, rgba(72,202,228,0.1) 0%, rgba(45,106,79,0.08) 100%);
  }
  .card-tag {
    position: absolute; top: 14px; right: 14px;
    background: white; color: var(--ink-mid);
    border: 1px solid var(--border);
    font-family: var(--font-mono); font-size: 9px; font-weight: 500;
    letter-spacing: 1.5px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 100px;
  }
  .card-tag.green { background: var(--forest); color: white; border-color: var(--forest); }
  .card-tag.sky { background: var(--sky); color: var(--ink); border-color: var(--sky); }

  .card-body { padding: 20px 22px 22px; }
  .card-category {
    font-family: var(--font-mono); font-size: 10px; font-weight: 500;
    letter-spacing: 2px; color: var(--forest);
    text-transform: uppercase; margin-bottom: 5px;
  }
  .card-name {
    font-family: var(--font-serif); font-size: 22px; font-weight: 700;
    color: var(--ink); margin-bottom: 10px;
  }
  .card-rating { display: flex; align-items: center; gap: 5px; margin-bottom: 16px; }
  .stars { display: flex; gap: 1px; }
  .star-filled { color: #f4a226; }
  .star-empty { color: var(--border-mid); }
  .rating-num {
    font-family: var(--font-mono); font-size: 12px; color: var(--muted); margin-left: 3px;
  }
  .card-footer { display: flex; align-items: center; justify-content: space-between; }
  .card-price {
    font-family: var(--font-serif); font-size: 26px; font-weight: 700; color: var(--ink);
  }
  .card-price-symbol { font-size: 16px; color: var(--muted); font-weight: 400; }
  .add-btn {
    background: var(--card-bg); color: var(--forest);
    border: 1.5px solid var(--forest-light);
    font-family: var(--font-sans); font-size: 13px; font-weight: 600;
    padding: 8px 18px; border-radius: var(--radius);
    cursor: pointer; transition: all 0.2s;
  }
  .add-btn:hover { background: var(--forest); color: white; border-color: var(--forest); }

  /* ── DETAIL PAGE ── */
  .detail-page { padding: 48px 40px; max-width: 1100px; margin: 0 auto; }
  .back-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: none; border: none; color: var(--muted);
    font-family: var(--font-sans); font-size: 14px; font-weight: 500;
    cursor: pointer; transition: color 0.2s; margin-bottom: 44px; padding: 0;
  }
  .back-btn:hover { color: var(--ink); }

  .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }
  .detail-img-wrap { position: relative; }
  .detail-img {
    aspect-ratio: 1;
    background: linear-gradient(135deg, var(--card-bg) 0%, var(--sky-pale) 100%);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    display: flex; align-items: center; justify-content: center;
    font-size: 140px;
  }
  .detail-img-tag {
    position: absolute; top: 18px; left: 18px;
    background: var(--forest); color: white;
    font-family: var(--font-mono); font-size: 10px; font-weight: 500;
    letter-spacing: 1.5px; text-transform: uppercase;
    padding: 5px 14px; border-radius: 100px;
  }

  .detail-info { }
  .detail-category {
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px;
    color: var(--forest); text-transform: uppercase; margin-bottom: 8px;
  }
  .detail-name {
    font-family: var(--font-serif);
    font-size: clamp(40px, 4vw, 60px);
    font-weight: 700; color: var(--ink);
    line-height: 1.0; letter-spacing: -0.5px; margin-bottom: 18px;
  }
  .detail-rating { display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
  .detail-price {
    font-family: var(--font-serif); font-size: 48px; font-weight: 700;
    color: var(--forest); margin-bottom: 6px;
  }
  .detail-price-note {
    font-family: var(--font-mono); font-size: 11px; color: var(--muted);
    letter-spacing: 0.5px; margin-bottom: 28px;
  }
  .detail-desc { font-size: 15px; color: var(--muted); line-height: 1.8; margin-bottom: 32px; }
  .detail-divider { height: 1px; background: var(--border); margin-bottom: 28px; }

  .option-label {
    font-family: var(--font-mono); font-size: 11px; font-weight: 500;
    letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 10px;
  }
  .option-group { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 24px; }
  .option-btn {
    background: transparent; color: var(--muted);
    border: 1px solid var(--border);
    font-family: var(--font-sans); font-size: 13px;
    padding: 8px 18px; border-radius: var(--radius);
    cursor: pointer; transition: all 0.2s;
  }
  .option-btn:hover { color: var(--ink); border-color: var(--border-mid); }
  .option-btn.selected { background: var(--forest); color: white; border-color: var(--forest); }

  .qty-row { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; }
  .qty-ctrl {
    display: flex; align-items: center;
    background: white; border: 1px solid var(--border);
    border-radius: var(--radius); overflow: hidden;
  }
  .qty-btn {
    background: none; color: var(--ink); border: none;
    width: 42px; height: 42px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.2s; font-size: 18px;
  }
  .qty-btn:hover { background: var(--card-bg); }
  .qty-num {
    width: 52px; height: 42px;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-mono); font-size: 16px; color: var(--ink);
    border-left: 1px solid var(--border); border-right: 1px solid var(--border);
  }
  .qty-label { font-family: var(--font-mono); font-size: 11px; color: var(--muted); letter-spacing: 1px; }

  .btn-add-large {
    width: 100%; background: var(--forest); color: white; border: none;
    font-family: var(--font-sans); font-size: 16px; font-weight: 600;
    padding: 18px; border-radius: var(--radius);
    cursor: pointer; transition: all 0.25s;
    letter-spacing: 0.5px;
  }
  .btn-add-large:hover { background: var(--forest-mid); transform: translateY(-2px); box-shadow: var(--shadow-md); }

  /* ── REVIEWS ── */
  .reviews-section { padding: 96px 40px; background: white; }
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px; margin-top: 52px;
  }
  .review-card {
    background: var(--cream); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 28px; position: relative;
    transition: all 0.25s;
  }
  .review-card:hover { box-shadow: var(--shadow-md); border-color: var(--border-mid); }
  .review-quote {
    font-family: var(--font-serif); font-size: 56px; line-height: 0.8;
    color: var(--forest-light); margin-bottom: 16px;
  }
  .review-text { font-size: 14px; color: var(--ink-mid); line-height: 1.75; margin-bottom: 20px; font-style: italic; }
  .review-footer { display: flex; align-items: center; justify-content: space-between; }
  .reviewer-name { font-family: var(--font-sans); font-size: 15px; font-weight: 600; color: var(--ink); }
  .reviewer-badge {
    display: inline-block;
    background: var(--sky-pale); color: var(--ink-mid);
    border: 1px solid var(--sky-light);
    font-family: var(--font-mono); font-size: 9px;
    padding: 3px 8px; border-radius: 100px; margin-top: 2px;
  }
  .review-stars-sm { display: flex; gap: 1px; }
  .review-date { font-family: var(--font-mono); font-size: 10px; color: var(--muted); margin-top: 4px; }

  /* ── ABOUT ── */
  .about-section { padding: 96px 40px; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .about-visual-wrap { position: relative; }
  .about-visual {
    background: linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 60%, var(--sky) 100%);
    border-radius: var(--radius-lg);
    padding: 56px 40px; text-align: center; color: white;
    box-shadow: var(--shadow-lg);
  }
  .about-visual-icon { font-size: 64px; margin-bottom: 16px; }
  .about-visual-name {
    font-family: var(--font-serif); font-size: 38px; font-weight: 700;
    letter-spacing: 1px; margin-bottom: 4px;
  }
  .about-visual-tagline { font-size: 13px; opacity: 0.75; letter-spacing: 1px; margin-bottom: 36px; }
  .about-visual-stats { display: flex; justify-content: center; gap: 32px; }
  .about-vs { }
  .about-vs-num { font-family: var(--font-serif); font-size: 40px; font-weight: 700; line-height: 1; }
  .about-vs-label { font-size: 11px; opacity: 0.7; margin-top: 2px; }

  .about-float-card {
    position: absolute; bottom: -20px; right: -20px;
    background: white; border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px 20px;
    box-shadow: var(--shadow-md);
    display: flex; align-items: center; gap: 12px;
  }
  .float-emoji { font-size: 28px; }
  .float-title { font-family: var(--font-sans); font-size: 13px; font-weight: 600; color: var(--ink); }
  .float-sub { font-family: var(--font-mono); font-size: 10px; color: var(--muted); }

  .about-text { }
  .about-title {
    font-family: var(--font-serif); font-size: clamp(36px, 3.5vw, 52px);
    font-weight: 700; color: var(--ink); line-height: 1.1;
    letter-spacing: -0.5px; margin-bottom: 20px;
  }
  .about-desc { font-size: 15px; color: var(--muted); line-height: 1.85; margin-bottom: 36px; }
  .info-list { display: flex; flex-direction: column; gap: 16px; }
  .info-item {
    display: flex; gap: 14px;
    padding: 16px 18px;
    background: white; border: 1px solid var(--border);
    border-radius: var(--radius); transition: all 0.2s;
  }
  .info-item:hover { border-color: var(--forest-light); }
  .info-icon-wrap {
    width: 36px; height: 36px;
    background: var(--card-bg); border: 1px solid var(--border);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; flex-shrink: 0;
  }
  .info-content { }
  .info-label { font-family: var(--font-mono); font-size: 10px; color: var(--forest); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 2px; }
  .info-value { font-size: 14px; color: var(--ink-mid); font-weight: 400; }

  /* ── CART SIDEBAR ── */
  .cart-overlay { position: fixed; inset: 0; background: rgba(26,46,34,0.4); z-index: 200; backdrop-filter: blur(4px); }
  .cart-sidebar {
    position: fixed; top: 0; right: 0; bottom: 0;
    width: 440px; max-width: 100%;
    background: var(--cream); border-left: 1px solid var(--border);
    z-index: 201; display: flex; flex-direction: column;
  }
  .cart-header {
    padding: 28px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    background: white;
  }
  .cart-title { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--ink); }
  .cart-count { font-family: var(--font-mono); font-size: 12px; color: var(--muted); margin-top: 2px; }
  .cart-close-btn { background: none; border: 1px solid var(--border); color: var(--muted); cursor: pointer; transition: all 0.2s; padding: 8px; border-radius: 8px; line-height: 1; font-size: 18px; }
  .cart-close-btn:hover { color: var(--ink); border-color: var(--border-mid); }
  .cart-items { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 14px; }
  .cart-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 40px; text-align: center; }
  .cart-empty-icon { font-size: 56px; opacity: 0.25; }
  .cart-empty-title { font-family: var(--font-serif); font-size: 24px; font-weight: 700; color: var(--ink); }
  .cart-empty-sub { font-size: 14px; color: var(--muted); }

  .cart-item {
    background: white; border: 1px solid var(--border);
    border-radius: var(--radius); padding: 16px;
    display: flex; gap: 14px; align-items: flex-start;
    transition: border-color 0.2s;
  }
  .cart-item:hover { border-color: var(--border-mid); }
  .cart-item-emoji {
    font-size: 36px; flex-shrink: 0;
    width: 56px; height: 56px;
    background: var(--card-bg); border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }
  .cart-item-info { flex: 1; min-width: 0; }
  .cart-item-name { font-family: var(--font-serif); font-size: 17px; font-weight: 700; color: var(--ink); }
  .cart-item-meta { font-family: var(--font-mono); font-size: 10px; color: var(--muted); margin-top: 2px; }
  .cart-item-bottom { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
  .cart-item-price { font-family: var(--font-serif); font-size: 18px; font-weight: 700; color: var(--forest); }
  .cart-item-qty { display: flex; align-items: center; gap: 0; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .qty-mini-btn { background: none; color: var(--ink); border: none; width: 28px; height: 28px; cursor: pointer; transition: background 0.2s; font-size: 14px; display: flex; align-items: center; justify-content: center; }
  .qty-mini-btn:hover { background: var(--card-bg); }
  .qty-mini-num { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 12px; color: var(--ink); border-left: 1px solid var(--border); border-right: 1px solid var(--border); }
  .remove-btn { background: none; border: none; color: var(--border-mid); cursor: pointer; transition: color 0.2s; font-size: 16px; line-height: 1; }
  .remove-btn:hover { color: #e63946; }

  .cart-footer { padding: 24px; border-top: 1px solid var(--border); background: white; }
  .cart-total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
  .cart-total-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; }
  .cart-total-amt { font-family: var(--font-serif); font-size: 34px; font-weight: 700; color: var(--ink); }
  .checkout-btn { width: 100%; background: var(--forest); color: white; border: none; font-family: var(--font-sans); font-size: 16px; font-weight: 600; padding: 16px; border-radius: var(--radius); cursor: pointer; transition: all 0.25s; }
  .checkout-btn:hover { background: var(--forest-mid); transform: translateY(-1px); box-shadow: var(--shadow-md); }

  /* ── CHECKOUT ── */
  .checkout-page { padding: 48px 40px; max-width: 1000px; margin: 0 auto; }
  .checkout-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; margin-top: 52px; }
  .form-section-title { font-family: var(--font-serif); font-size: 26px; font-weight: 700; color: var(--ink); margin-bottom: 20px; }
  .form-group { margin-bottom: 16px; }
  .form-label { font-family: var(--font-mono); font-size: 10px; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; margin-bottom: 6px; display: block; font-weight: 500; }
  .form-input {
    width: 100%; background: white; border: 1px solid var(--border);
    color: var(--ink); font-family: var(--font-sans); font-size: 14px;
    padding: 12px 16px; border-radius: var(--radius); outline: none; transition: all 0.2s;
  }
  .form-input:focus { border-color: var(--forest); box-shadow: 0 0 0 3px rgba(45,106,79,0.08); }
  .form-input::placeholder { color: var(--border-mid); }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .order-summary-card {
    background: white; border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: 28px; position: sticky; top: 88px;
  }
  .summary-title { font-family: var(--font-serif); font-size: 26px; font-weight: 700; color: var(--ink); margin-bottom: 20px; }
  .summary-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--border); gap: 12px; }
  .summary-item:last-of-type { border: none; }
  .summary-item-left { display: flex; align-items: center; gap: 12px; }
  .summary-emoji { font-size: 24px; width: 40px; height: 40px; background: var(--card-bg); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .summary-item-name { font-family: var(--font-sans); font-size: 14px; font-weight: 600; color: var(--ink); }
  .summary-item-meta { font-family: var(--font-mono); font-size: 10px; color: var(--muted); margin-top: 1px; }
  .summary-item-price { font-family: var(--font-serif); font-size: 18px; font-weight: 700; color: var(--ink); white-space: nowrap; }
  .summary-divider { height: 1px; background: var(--border); margin: 8px 0; }
  .summary-total-row { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; }
  .summary-total-label { font-family: var(--font-mono); font-size: 12px; letter-spacing: 1.5px; color: var(--muted); text-transform: uppercase; }
  .summary-total-amt { font-family: var(--font-serif); font-size: 36px; font-weight: 700; color: var(--forest); }

  .payment-options { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 0; }
  .payment-btn { background: var(--card-bg); color: var(--muted); border: 1px solid var(--border); font-family: var(--font-sans); font-size: 13px; font-weight: 500; padding: 10px 20px; border-radius: var(--radius); cursor: pointer; transition: all 0.2s; }
  .payment-btn:hover { color: var(--ink); border-color: var(--border-mid); }
  .payment-btn.selected { background: var(--sky-pale); color: var(--ink); border-color: var(--sky); }

  .place-order-btn { width: 100%; background: var(--forest); color: white; border: none; font-family: var(--font-sans); font-size: 16px; font-weight: 600; padding: 18px; border-radius: var(--radius); cursor: pointer; transition: all 0.25s; margin-top: 24px; letter-spacing: 0.5px; }
  .place-order-btn:hover { background: var(--forest-mid); transform: translateY(-2px); box-shadow: var(--shadow-md); }

  /* ── SUCCESS ── */
  .success-page { min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px 40px; }
  .success-circle { width: 88px; height: 88px; background: linear-gradient(135deg, var(--forest) 0%, var(--forest-mid) 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 36px; margin: 0 auto 28px; box-shadow: var(--shadow-md); }
  .success-title { font-family: var(--font-serif); font-size: 56px; font-weight: 700; color: var(--ink); margin-bottom: 12px; }
  .success-sub { font-size: 15px; color: var(--muted); margin-bottom: 40px; max-width: 400px; line-height: 1.7; }

  /* ── FOOTER ── */
  footer { background: var(--ink); padding: 56px 40px; }
  .footer-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 24px; }
  .footer-logo { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: white; display: flex; align-items: center; gap: 8px; }
  .footer-logo-dot { width: 8px; height: 8px; background: var(--sky); border-radius: 50%; }
  .footer-tagline { font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 2px; margin-top: 4px; }
  .footer-links { display: flex; gap: 24px; }
  .footer-link { font-family: var(--font-sans); font-size: 13px; color: rgba(255,255,255,0.5); cursor: pointer; transition: color 0.2s; }
  .footer-link:hover { color: rgba(255,255,255,0.9); }
  .footer-copy { font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.25); letter-spacing: 1px; }

  /* ── TOAST ── */
  .toast {
    position: fixed; bottom: 28px; right: 28px; z-index: 500;
    background: var(--ink); color: white;
    font-family: var(--font-sans); font-size: 14px; font-weight: 500;
    padding: 14px 20px; border-radius: var(--radius);
    display: flex; align-items: center; gap: 10px;
    box-shadow: var(--shadow-lg);
    animation: toastIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
    border-left: 3px solid var(--forest-light);
  }
  @keyframes toastIn { from{transform:translateX(80px) scale(0.9);opacity:0} to{transform:translateX(0) scale(1);opacity:1} }
  .toast-icon { font-size: 18px; }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .hero { grid-template-columns: 1fr; padding: 48px 20px; min-height: auto; gap: 40px; }
    .hero-visual { display: none; }
    .section { padding: 64px 20px; }
    .detail-grid { grid-template-columns: 1fr; gap: 32px; }
    .about-grid { grid-template-columns: 1fr; }
    .checkout-grid { grid-template-columns: 1fr; }
    .reviews-section { padding: 64px 20px; }
    .about-section { padding: 64px 20px; }
    .footer-inner { flex-direction: column; align-items: flex-start; }
  }
`;

// ── HELPERS ───────────────────────────────────────────────────────────────────
function Stars({ count, size = 12 }) {
  return (
    <div className="stars">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.floor(count) ? "#f4a226" : "#d4e8da", fontSize: size }}>★</span>
      ))}
    </div>
  );
}

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return (
    <div className="toast">
      <span className="toast-icon">✓</span>
      {msg}
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState(null);
  const [orderDone, setOrderDone] = useState(false);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const showToast = (msg) => setToast(msg);

  const addToCart = (product, size, color, qty = 1) => {
    const key = `${product.id}-${size}-${color}`;
    setCart(prev => {
      const exists = prev.find(i => i.key === key);
      if (exists) return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { key, ...product, size, color, qty }];
    });
    showToast(`${product.name} added to cart`);
  };
  const removeFromCart = (key) => setCart(prev => prev.filter(i => i.key !== key));
  const updateQty = (key, delta) => setCart(prev =>
    prev.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
  );

  const filteredProducts = filter === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  const navTo = (p) => { setPage(p); window.scrollTo(0, 0); };

  return (
    <>
      <style>{G}</style>
      <div className="app">
        {/* NAV */}
        <nav className="nav">
          <div className="nav-logo" onClick={() => navTo("home")}>
            <span className="nav-logo-dot" />
            Buddy Sticker Shop
          </div>
          <div className="nav-right">
            <div className="nav-links">
              {["home","shop","about"].map(p => (
                <button key={p} className={`nav-link${page===p?" active":""}`} onClick={() => navTo(p)}>
                  {p.charAt(0).toUpperCase()+p.slice(1)}
                </button>
              ))}
            </div>
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              <span>🛒</span>
              Cart
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </nav>

        {/* PAGES */}
        {page === "home" && (
          <HomePage
            navTo={navTo}
            addToCart={addToCart}
            filter={filter}
            setFilter={setFilter}
            filteredProducts={filteredProducts}
            setSelectedProduct={setSelectedProduct}
          />
        )}
        {page === "shop" && (
          <ShopPage
            filter={filter}
            setFilter={setFilter}
            filteredProducts={filteredProducts}
            setSelectedProduct={setSelectedProduct}
            navTo={navTo}
            addToCart={addToCart}
          />
        )}
        {page === "detail" && selectedProduct && (
          <DetailPage product={selectedProduct} navTo={navTo} addToCart={addToCart} />
        )}
        {page === "checkout" && !orderDone && (
          <CheckoutPage cart={cart} cartTotal={cartTotal} onOrder={() => { setOrderDone(true); setCart([]); }} navTo={navTo} />
        )}
        {page === "checkout" && orderDone && (
          <SuccessPage navTo={navTo} setOrderDone={setOrderDone} />
        )}
        {page === "about" && <AboutPage navTo={navTo} />}

        {/* FOOTER */}
        <footer>
          <div className="footer-inner">
            <div>
              <div className="footer-logo"><span className="footer-logo-dot" /> Buddy</div>
              <div className="footer-tagline">STICKER SHOP · ADYAR, CHENNAI</div>
            </div>
            <div className="footer-links">
              {["home","shop","about"].map(p => (
                <span key={p} className="footer-link" onClick={() => navTo(p)}>
                  {p.charAt(0).toUpperCase()+p.slice(1)}
                </span>
              ))}
            </div>
            <div className="footer-copy">© 2025 BUDDY STICKER SHOP</div>
          </div>
        </footer>

        {/* CART */}
        {cartOpen && (
          <>
            <div className="cart-overlay" onClick={() => setCartOpen(false)} />
            <div className="cart-sidebar">
              <div className="cart-header">
                <div>
                  <div className="cart-title">Your Cart</div>
                  <div className="cart-count">{cartCount} {cartCount === 1 ? "item" : "items"}</div>
                </div>
                <button className="cart-close-btn" onClick={() => setCartOpen(false)}>✕</button>
              </div>
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">🛒</div>
                  <div className="cart-empty-title">Your cart is empty</div>
                  <div className="cart-empty-sub">Add some stickers to get started</div>
                  <button className="btn-primary" style={{marginTop:8}} onClick={() => { setCartOpen(false); navTo("shop"); }}>
                    Browse Shop
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map(item => (
                      <div key={item.key} className="cart-item">
                        <div className="cart-item-emoji">{item.emoji}</div>
                        <div className="cart-item-info">
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-meta">{item.size} · {item.color}</div>
                          <div className="cart-item-bottom">
                            <div className="cart-item-price">₹{item.price * item.qty}</div>
                            <div style={{display:"flex",alignItems:"center",gap:8}}>
                              <div className="cart-item-qty">
                                <button className="qty-mini-btn" onClick={() => updateQty(item.key,-1)}>−</button>
                                <span className="qty-mini-num">{item.qty}</span>
                                <button className="qty-mini-btn" onClick={() => updateQty(item.key,1)}>+</button>
                              </div>
                              <button className="remove-btn" onClick={() => removeFromCart(item.key)}>✕</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-footer">
                    <div className="cart-total-row">
                      <span className="cart-total-label">Total</span>
                      <span className="cart-total-amt">₹{cartTotal}</span>
                    </div>
                    <button className="checkout-btn" onClick={() => { setCartOpen(false); navTo("checkout"); }}>
                      Proceed to Checkout →
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
      </div>
    </>
  );
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomePage({ navTo, addToCart, filter, setFilter, filteredProducts, setSelectedProduct }) {
  const tickerItems = ["Custom Stickers","Bike Wraps","Car Decals","Helmet Art","Weatherproof Vinyl","Premium Quality","Made in Chennai"];

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Adyar, Chennai · Est. 2020
          </div>
          <h1 className="hero-title">
            Stick Your
            <span className="hero-title-line2">Story</span>
          </h1>
          <div className="hero-subtitle">Buddy Sticker Shop</div>
          <p className="hero-desc">
            <strong>Gopi's handcraft</strong> brings your wildest designs to life.
            From bike wraps to car decals — premium weatherproof vinyl,
            crafted with care in Chennai.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navTo("shop")}>Shop Now</button>
            <button className="btn-secondary" onClick={() => navTo("about")}>Our Story</button>
          </div>
          <div className="hero-stats-row">
            <div className="hero-stat">
              <div className="hero-stat-num">4.5★</div>
              <div className="hero-stat-label">Google Rating</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">105+</div>
              <div className="hero-stat-label">Happy Customers</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">5 Yrs</div>
              <div className="hero-stat-label">Guarantee</div>
            </div>
          </div>
        </div>

        {/* Hero card stack */}
        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="hero-card hero-card-back" />
            <div className="hero-card hero-card-mid" />
            <div className="hero-card hero-card-front">
              <div className="hero-card-emoji">🐍</div>
              <div className="hero-card-name">Serpent Wrap</div>
              <div className="hero-card-price">₹349</div>
              <div className="hero-card-tag">CUSTOM WORK</div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-inner">
          {[...tickerItems,...tickerItems].map((t,i) => (
            <span key={i} className="ticker-item">
              {t}<span className="ticker-dot"> ✦ </span>
            </span>
          ))}
        </div>
      </div>

      {/* FEATURED */}
      <section className="section">
        <div className="section-header-row">
          <div>
            <div className="section-tag">// Featured Products</div>
            <h2 className="section-title">Fresh Drops</h2>
          </div>
          <button className="btn-secondary" onClick={() => navTo("shop")} style={{whiteSpace:"nowrap"}}>
            View All →
          </button>
        </div>
        <div className="filters">
          {CATEGORIES.map(c => (
            <button key={c} className={`filter-btn${filter===c?" active":""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>
        <div className="product-grid">
          {filteredProducts.slice(0,4).map(p => (
            <ProductCard
              key={p.id} product={p}
              onView={() => { setSelectedProduct(p); navTo("detail"); }}
              onAdd={(e) => { e.stopPropagation(); addToCart(p, p.sizes[0], p.colors[0]); }}
            />
          ))}
        </div>
      </section>

      <ReviewsSection />
    </>
  );
}

// ── SHOP ──────────────────────────────────────────────────────────────────────
function ShopPage({ filter, setFilter, filteredProducts, setSelectedProduct, navTo, addToCart }) {
  return (
    <section className="section">
      <div className="section-header">
        <div className="section-tag">// All Products</div>
        <h2 className="section-title">The Collection</h2>
      </div>
      <div className="filters">
        {CATEGORIES.map(c => (
          <button key={c} className={`filter-btn${filter===c?" active":""}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:11, color:"var(--muted)", letterSpacing:1.5, marginBottom:28 }}>
        {filteredProducts.length} products found
      </div>
      <div className="product-grid">
        {filteredProducts.map(p => (
          <ProductCard
            key={p.id} product={p}
            onView={() => { setSelectedProduct(p); navTo("detail"); }}
            onAdd={(e) => { e.stopPropagation(); addToCart(p, p.sizes[0], p.colors[0]); }}
          />
        ))}
      </div>
    </section>
  );
}

// ── PRODUCT CARD ──────────────────────────────────────────────────────────────
function ProductCard({ product: p, onView, onAdd }) {
  const tagClass = p.tag === "NEW" ? "green" : p.tag === "HOT" ? "sky" : "";
  return (
    <div className="product-card" onClick={onView}>
      <div className="card-img">
        <span>{p.emoji}</span>
        <span className={`card-tag ${tagClass}`}>{p.tag}</span>
      </div>
      <div className="card-body">
        <div className="card-category">{p.category}</div>
        <div className="card-name">{p.name}</div>
        <div className="card-rating">
          <Stars count={p.rating} />
          <span className="rating-num">{p.rating} ({p.reviews})</span>
        </div>
        <div className="card-footer">
          <div className="card-price">
            <span className="card-price-symbol">₹</span>{p.price}
          </div>
          <button className="add-btn" onClick={onAdd}>+ Add</button>
        </div>
      </div>
    </div>
  );
}

// ── DETAIL ────────────────────────────────────────────────────────────────────
function DetailPage({ product: p, navTo, addToCart }) {
  const [size, setSize] = useState(p.sizes[0]);
  const [color, setColor] = useState(p.colors[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navTo("shop")}>
        ← Back to Shop
      </button>
      <div className="detail-grid">
        <div className="detail-img-wrap">
          <div className="detail-img">{p.emoji}</div>
          <div className="detail-img-tag">{p.tag}</div>
        </div>
        <div className="detail-info">
          <div className="detail-category">{p.category}</div>
          <h1 className="detail-name">{p.name}</h1>
          <div className="detail-rating">
            <Stars count={p.rating} size={15} />
            <span style={{ fontFamily:"var(--font-mono)", fontSize:13, color:"var(--muted)", marginLeft:6 }}>
              {p.rating} · {p.reviews} reviews
            </span>
          </div>
          <div className="detail-price">₹{p.price}</div>
          <div className="detail-price-note">Tax included · Free delivery on orders over ₹999</div>
          <div className="detail-divider" />
          <p className="detail-desc">{p.desc}</p>

          <div className="option-label">Size</div>
          <div className="option-group">
            {p.sizes.map(s => (
              <button key={s} className={`option-btn${size===s?" selected":""}`} onClick={() => setSize(s)}>{s}</button>
            ))}
          </div>

          <div className="option-label">Colour</div>
          <div className="option-group">
            {p.colors.map(c => (
              <button key={c} className={`option-btn${color===c?" selected":""}`} onClick={() => setColor(c)}>{c}</button>
            ))}
          </div>

          <div className="qty-row">
            <div className="qty-ctrl">
              <button className="qty-btn" onClick={() => setQty(q => Math.max(1,q-1))}>−</button>
              <div className="qty-num">{qty}</div>
              <button className="qty-btn" onClick={() => setQty(q => q+1)}>+</button>
            </div>
            <span className="qty-label">Quantity</span>
          </div>

          <button className="btn-add-large" onClick={() => addToCart(p, size, color, qty)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ── REVIEWS ───────────────────────────────────────────────────────────────────
function ReviewsSection() {
  return (
    <section className="reviews-section">
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div className="section-tag">// What Customers Say</div>
        <h2 className="section-title">Real Reviews</h2>
        <div className="reviews-grid">
          {REVIEWS.map((r,i) => (
            <div key={i} className="review-card">
              <div className="review-quote">"</div>
              <p className="review-text">{r.text}</p>
              <div className="review-footer">
                <div>
                  <div className="reviewer-name">{r.name}</div>
                  <div className="reviewer-badge">{r.badge}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div className="review-stars-sm"><Stars count={r.rating} size={12} /></div>
                  <div className="review-date">{r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────────────────
function AboutPage({ navTo }) {
  return (
    <section className="about-section">
      <div className="about-grid">
        <div className="about-visual-wrap">
          <div className="about-visual">
            <div className="about-visual-icon">🎨</div>
            <div className="about-visual-name">Buddy</div>
            <div className="about-visual-tagline">Sticker Shop · Est. 2020</div>
            <div className="about-visual-stats">
              <div className="about-vs">
                <div className="about-vs-num">4.5★</div>
                <div className="about-vs-label">Rating</div>
              </div>
              <div className="about-vs">
                <div className="about-vs-num">105+</div>
                <div className="about-vs-label">Reviews</div>
              </div>
              <div className="about-vs">
                <div className="about-vs-num">5yr</div>
                <div className="about-vs-label">Warranty</div>
              </div>
            </div>
          </div>
          <div className="about-float-card">
            <div className="float-emoji">🏍️</div>
            <div>
              <div className="float-title">Bike & Car Wraps</div>
              <div className="float-sub">Gopi's signature work</div>
            </div>
          </div>
        </div>

        <div className="about-text">
          <div className="section-tag">// Our Story</div>
          <h2 className="about-title">Bringing Your Imagination to Reality</h2>
          <p className="about-desc">
            Buddy Sticker Shop is Chennai's premier destination for custom vinyl stickers,
            bike wraps, and car decals. Whether you walk in with a reference photo or
            just a vague idea — Gopi and the team will craft something that exceeds your
            expectations every single time.
          </p>
          <div className="info-list">
            <div className="info-item">
              <div className="info-icon-wrap">📍</div>
              <div className="info-content">
                <div className="info-label">Address</div>
                <div className="info-value">Shop No. 4, Corporation Shopping Complex, No. 24, Indira Nagar, Adyar, Chennai — 600020</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon-wrap">📞</div>
              <div className="info-content">
                <div className="info-label">Phone</div>
                <div className="info-value">072006 57003</div>
              </div>
            </div>
            <div className="info-item">
              <div className="info-icon-wrap">🕐</div>
              <div className="info-content">
                <div className="info-label">Hours</div>
                <div className="info-value">Monday – Saturday · Open until 9 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── CHECKOUT ──────────────────────────────────────────────────────────────────
function CheckoutPage({ cart, cartTotal, onOrder, navTo }) {
  const [payment, setPayment] = useState("UPI");
  return (
    <div className="checkout-page">
      <button className="back-btn" onClick={() => navTo("shop")}>← Continue Shopping</button>
      <div className="section-tag">// Secure Checkout</div>
      <h2 className="section-title">Checkout</h2>
      <div className="checkout-grid">
        <div>
          <div className="form-section-title">Delivery Details</div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" placeholder="Your full name" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="form-input" placeholder="+91 XXXXX XXXXX" />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="form-input" placeholder="your@email.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Street Address</label>
            <input className="form-input" placeholder="House / Flat, Street name" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" placeholder="Chennai" />
            </div>
            <div className="form-group">
              <label className="form-label">Pincode</label>
              <input className="form-input" placeholder="600020" />
            </div>
          </div>

          <div className="form-section-title" style={{marginTop:32}}>Payment Method</div>
          <div className="payment-options">
            {["UPI","Card","Cash on Delivery"].map(m => (
              <button key={m} className={`payment-btn${payment===m?" selected":""}`} onClick={() => setPayment(m)}>{m}</button>
            ))}
          </div>
          <button className="place-order-btn" onClick={onOrder}>Place Order →</button>
        </div>

        <div>
          <div className="order-summary-card">
            <div className="summary-title">Order Summary</div>
            {cart.map(item => (
              <div key={item.key} className="summary-item">
                <div className="summary-item-left">
                  <div className="summary-emoji">{item.emoji}</div>
                  <div>
                    <div className="summary-item-name">{item.name}</div>
                    <div className="summary-item-meta">{item.size} · {item.color} · ×{item.qty}</div>
                  </div>
                </div>
                <div className="summary-item-price">₹{item.price * item.qty}</div>
              </div>
            ))}
            <div className="summary-divider" />
            <div className="summary-total-row">
              <span className="summary-total-label">Total</span>
              <span className="summary-total-amt">₹{cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SUCCESS ───────────────────────────────────────────────────────────────────
function SuccessPage({ navTo, setOrderDone }) {
  return (
    <div className="success-page">
      <div className="success-circle">✓</div>
      <h1 className="success-title">Order Placed!</h1>
      <p className="success-sub">
        Thank you! Buddy Sticker Shop will reach out to confirm your order shortly.<br />
        <strong>072006 57003</strong>
      </p>
      <button className="btn-primary" onClick={() => { setOrderDone(false); navTo("home"); }}>
        Back to Home
      </button>
    </div>
  );
}
